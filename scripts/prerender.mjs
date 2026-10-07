import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const builtAssets = [...template.matchAll(/<script type="module"[^>]*><\/script>|<link rel="stylesheet" crossorigin[^>]*>/g)].map(match => match[0]).join('\n')
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const jsonLd = value => JSON.stringify(value).replace(/</g, '\\u003c')
const verification = (name, value) => value && /^[A-Za-z0-9_-]+$/.test(value)
  ? `<meta name="${name}" content="${escapeHtml(value)}"/>` : ''

const vite = await createServer({ root, configFile: false, plugins: [react()], server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const [{ default: App }, { getSeo, getStructuredData, indexablePaths, SITE_URL }] = await Promise.all([
    vite.ssrLoadModule('/src/WaslivoV2.jsx'),
    vite.ssrLoadModule('/src/seo-data.js'),
  ])
  const seoPages = indexablePaths.map(pathname => getSeo(pathname))
  const arabicRoutes = seoPages.filter(page => page.lang === 'ar').map(page => page.path === '/' ? '/' : `${page.path}*`)
  const routes = JSON.stringify({ version: 1, include: [...arabicRoutes, '/website-offer/', '/tiktok-ads/', '/tiktok-ads-account/'], exclude: [] }, null, 2)
  await Promise.all([
    writeFile(path.join(root, 'public', '_routes.json'), routes),
    writeFile(path.join(dist, '_routes.json'), routes),
  ])
  if (seoPages.some(page => !page)) throw new Error('The SEO route registry includes a page without metadata')
  if (new Set(seoPages.map(page => page.path)).size !== seoPages.length) throw new Error('Duplicate SEO routes')
  const campaignUrls = ['', '/en', '/fr'].map(prefix => `${SITE_URL}${prefix}/tiktok-ads-account/`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...seoPages.map(page => page.url), ...campaignUrls].map(url => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`
  await Promise.all([
    writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap),
    writeFile(path.join(dist, 'sitemap.xml'), sitemap),
  ])
  for (const seo of seoPages) {
    if (new URL(seo.url).origin !== SITE_URL) throw new Error(`Unexpected sitemap origin: ${seo.url}`)
    const markup = renderToString(React.createElement(App, { initialPath: seo.path }))
    const head = [
      '<meta charset="UTF-8"/>',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>',
      '<meta name="theme-color" content="#09233b"/>',
      `<title>${escapeHtml(seo.title)}</title>`,
      `<meta name="description" content="${escapeHtml(seo.description)}"/>`,
      '<meta name="robots" content="index,follow,max-image-preview:large"/>',
      verification('google-site-verification', process.env.GOOGLE_SITE_VERIFICATION),
      verification('msvalidate.01', process.env.BING_SITE_VERIFICATION),
      `<link rel="canonical" href="${escapeHtml(seo.url)}"/>`,
      ...seo.hreflangs.map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${escapeHtml(href)}"/>`),
      `<meta property="og:type" content="${seo.kind === 'article' ? 'article' : 'website'}"/>`,
      `<meta property="og:site_name" content="WASLIVO"/>`,
      `<meta property="og:title" content="${escapeHtml(seo.title)}"/>`,
      `<meta property="og:description" content="${escapeHtml(seo.description)}"/>`,
      `<meta property="og:url" content="${escapeHtml(seo.url)}"/>`,
      `<meta property="og:image" content="${escapeHtml(seo.image)}"/>`,
      '<meta name="twitter:card" content="summary_large_image"/>',
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}"/>`,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}"/>`,
      `<meta name="twitter:image" content="${escapeHtml(seo.image)}"/>`,
      '<link rel="icon" href="/assets/favicon.svg"/>',
      '<script defer src="/language-preference.js"></script>',
      '<link rel="preconnect" href="https://fonts.googleapis.com"/>',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>',
      '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>',
      `<script id="waslivo-structured-data" type="application/ld+json">${jsonLd(getStructuredData(seo))}</script>`,
      builtAssets,
    ].join('\n')
    const dir = seo.lang === 'ar' ? 'rtl' : 'ltr'
    const html = `<!doctype html><html lang="${seo.lang}" dir="${dir}"><head>${head}</head><body><div id="root">${markup}</div></body></html>`
    if (seo.path === '/') {
      await writeFile(path.join(dist, 'index.html'), html)
    } else {
      const routePath = path.join(dist, seo.path.slice(1))
      await mkdir(routePath, { recursive: true })
      await writeFile(path.join(routePath, 'index.html'), html)
      await writeFile(`${routePath}.html`, html)
    }
  }
  const notFound = renderToString(React.createElement(App, { initialPath: '/404' }))
  await writeFile(path.join(dist, '404.html'), `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="robots" content="noindex,follow"/><title>الصفحة غير موجودة | وصليفو</title><link rel="icon" href="/assets/favicon.svg"/>${builtAssets}</head><body><div id="root">${notFound}</div></body></html>`)
  console.log(`Prerendered ${seoPages.length} Arabic, English, and French pages.`)
} finally {
  await vite.close()
}
