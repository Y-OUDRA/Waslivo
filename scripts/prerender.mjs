import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const sitemap = await readFile(path.join(root, 'public', 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]))
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const builtAssets = [...template.matchAll(/<script type="module"[^>]*><\/script>|<link rel="stylesheet" crossorigin[^>]*>/g)].map(match => match[0]).join('\n')
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const jsonLd = value => JSON.stringify(value).replace(/</g, '\\u003c')

const vite = await createServer({ root, configFile: false, plugins: [react()], server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const [{ default: App }, { getSeo, getStructuredData, SITE_URL }] = await Promise.all([
    vite.ssrLoadModule('/src/WaslivoV2.jsx'),
    vite.ssrLoadModule('/src/seo-data.js'),
  ])
  for (const url of urls) {
    if (url.origin !== SITE_URL) throw new Error(`Unexpected sitemap origin: ${url}`)
    const seo = getSeo(url.pathname)
    if (!seo) throw new Error(`No SEO data for ${url.pathname}`)
    const markup = renderToString(React.createElement(App, { initialPath: url.pathname }))
    const head = [
      '<meta charset="UTF-8"/>',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>',
      '<meta name="theme-color" content="#09233b"/>',
      `<title>${escapeHtml(seo.title)}</title>`,
      `<meta name="description" content="${escapeHtml(seo.description)}"/>`,
      '<meta name="robots" content="index,follow,max-image-preview:large"/>',
      `<link rel="canonical" href="${escapeHtml(seo.url)}"/>`,
      `<link rel="alternate" hreflang="ar" href="${escapeHtml(seo.arUrl)}"/>`,
      `<link rel="alternate" hreflang="en" href="${escapeHtml(seo.enUrl)}"/>`,
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
      '<link rel="preconnect" href="https://fonts.googleapis.com"/>',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>',
      '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>',
      `<script id="waslivo-structured-data" type="application/ld+json">${jsonLd(getStructuredData(seo))}</script>`,
      builtAssets,
    ].join('\n')
    const dir = seo.lang === 'en' ? 'ltr' : 'rtl'
    const html = `<!doctype html><html lang="${seo.lang}" dir="${dir}"><head>${head}</head><body><div id="root">${markup}</div></body></html>`
    if (url.pathname === '/') {
      await writeFile(path.join(dist, 'index.html'), html)
    } else {
      const routePath = path.join(dist, url.pathname.slice(1))
      await mkdir(routePath, { recursive: true })
      await writeFile(path.join(routePath, 'index.html'), html)
      await writeFile(`${routePath}.html`, html)
    }
  }
  const notFound = renderToString(React.createElement(App, { initialPath: '/404' }))
  await writeFile(path.join(dist, '404.html'), `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="robots" content="noindex,follow"/><title>الصفحة غير موجودة | وصليفو</title><link rel="icon" href="/assets/favicon.svg"/>${builtAssets}</head><body><div id="root">${notFound}</div></body></html>`)
  console.log(`Prerendered ${urls.length} Arabic and English pages.`)
} finally {
  await vite.close()
}
