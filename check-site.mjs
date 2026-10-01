import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const manifest = JSON.parse(fs.readFileSync('.openai/hosting.json', 'utf8'))
assert.equal(manifest.static.directory, 'dist')
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
assert.equal(sitemap, fs.readFileSync('public/sitemap.xml', 'utf8'), 'Published sitemap differs from source')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]))
const known = new Set(urls.map(url => url.pathname))
assert.equal(urls.length, known.size, 'Duplicate sitemap URLs')
const htmlByPath = new Map()
const titles = new Set()
const descriptions = new Set()

function pageFile(pathname) { return pathname === '/' ? 'dist/index.html' : `dist${pathname}.html` }
function matchMeta(html, key, value) {
  const tag = [...html.matchAll(/<meta\s+[^>]*>/g)].map(match => match[0]).find(item => item.includes(`${key}="${value}"`))
  return tag?.match(/content="([^"]*)"/)?.[1]
}

for (const url of urls) {
  assert.equal(url.origin, 'https://waslivo.agency')
  const html = fs.readFileSync(pageFile(url.pathname), 'utf8')
  htmlByPath.set(url.pathname, html)
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  assert.ok(title, `Missing title on ${url.pathname}`)
  assert.ok(!titles.has(title), `Repeated title: ${title}`)
  titles.add(title)
  const description = matchMeta(html, 'name', 'description')
  assert.ok(description, `Missing description on ${url.pathname}`)
  assert.ok(!descriptions.has(description), `Repeated description on ${url.pathname}`)
  descriptions.add(description)
  assert.ok(html.includes(`<link rel="canonical" href="${url.href}"`), `Wrong canonical on ${url.pathname}`)
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one H1 on ${url.pathname}`)
  assert.ok(html.includes('id="root"><'), `Missing prerendered content on ${url.pathname}`)
  assert.ok(html.includes(`lang="${url.pathname.startsWith('/en') ? 'en' : 'ar'}"`), `Wrong language on ${url.pathname}`)
  assert.equal(matchMeta(html, 'name', 'robots'), 'index,follow,max-image-preview:large', `Unexpected robots tag on ${url.pathname}`)
  assert.equal(matchMeta(html, 'property', 'og:url'), url.href, `Wrong Open Graph URL on ${url.pathname}`)
  assert.ok(matchMeta(html, 'name', 'twitter:card'), `Missing Twitter card on ${url.pathname}`)
  const schema = html.match(/<script id="waslivo-structured-data" type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  assert.ok(schema, `Missing structured data on ${url.pathname}`)
  const graph = JSON.parse(schema)['@graph']
  assert.ok(graph.some(item => item['@type'] === 'WebPage'), `Missing WebPage schema on ${url.pathname}`)
  for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    if (ref.startsWith('/assets/') || ref.startsWith('/images/')) {
      assert.ok(fs.existsSync(path.join('dist', ref)), `Missing asset ${ref} on ${url.pathname}`)
    } else {
      assert.ok(known.has(ref.replace(/\/$/, '') || '/'), `Missing page ${ref} on ${url.pathname}`)
    }
  }
}

for (const [pathname, html] of htmlByPath) {
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)]
    .map(([, language, href]) => [language, new URL(href)])
  assert.ok(alternates.length >= 3, `Missing hreflang set on ${pathname}`)
  assert.equal(new Set(alternates.map(([language]) => language)).size, alternates.length, `Repeated hreflang on ${pathname}`)
  assert.ok(alternates.some(([, url]) => url.pathname === pathname), `Missing self hreflang on ${pathname}`)
  assert.ok(alternates.some(([language]) => language === 'x-default'), `Missing fallback hreflang on ${pathname}`)
  const ownSet = alternates.map(([language, url]) => `${language}:${url.href}`).sort().join('|')
  for (const [, url] of alternates) {
    assert.ok(known.has(url.pathname), `Hreflang target missing from sitemap: ${url.pathname}`)
    const target = htmlByPath.get(url.pathname)
    const targetSet = [...target.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)]
      .map(([, language, href]) => `${language}:${href}`).sort().join('|')
    assert.equal(targetSet, ownSet, `Non-reciprocal hreflang between ${pathname} and ${url.pathname}`)
  }
}

assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('content="noindex,follow"'), 'Missing noindex 404 page')
assert.ok(fs.readFileSync('dist/robots.txt', 'utf8').includes('Sitemap: https://waslivo.agency/sitemap.xml'), 'Missing sitemap in robots.txt')
console.log(`Verified ${urls.length} prerendered pages, unique metadata, reciprocal hreflang, structured data, links, and image assets.`)
