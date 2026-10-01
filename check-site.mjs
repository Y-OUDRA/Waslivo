import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const manifest = JSON.parse(fs.readFileSync('.openai/hosting.json', 'utf8'))
assert.equal(manifest.static.directory, 'dist')
const urls = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]))
assert.equal(urls.length, new Set(urls.map(url => url.pathname)).size, 'Duplicate sitemap URLs')
const titles = new Set()

for (const url of urls) {
  assert.equal(url.origin, 'https://waslivo.agency')
  const file = url.pathname === '/' ? 'dist/index.html' : `dist${url.pathname}.html`
  const html = fs.readFileSync(file, 'utf8')
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  assert.ok(title, `Missing title on ${url.pathname}`)
  assert.ok(!titles.has(`${url.pathname.startsWith('/en') ? 'en' : 'ar'}:${title}`), `Repeated title: ${title}`)
  titles.add(`${url.pathname.startsWith('/en') ? 'en' : 'ar'}:${title}`)
  assert.ok(html.includes(`<link rel="canonical" href="${url.href}"`), `Wrong canonical on ${url.pathname}`)
  assert.ok(html.includes('<meta name="description"'), `Missing description on ${url.pathname}`)
  assert.ok(html.includes('<h1'), `Missing H1 on ${url.pathname}`)
  assert.ok(html.includes('id="root"><'), `Missing prerendered content on ${url.pathname}`)
  assert.ok(html.includes(`lang="${url.pathname.startsWith('/en') ? 'en' : 'ar'}"`), `Wrong language on ${url.pathname}`)
  assert.ok(html.includes('hreflang="ar"') && html.includes('hreflang="en"'), `Missing alternates on ${url.pathname}`)
  const schema = html.match(/<script id="waslivo-structured-data" type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  assert.ok(schema, `Missing structured data on ${url.pathname}`)
  JSON.parse(schema)
  for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    if (ref.startsWith('/assets/') || ref.startsWith('/images/')) {
      assert.ok(fs.existsSync(path.join('dist', ref)), `Missing asset ${ref} on ${url.pathname}`)
    } else {
      const target = ref === '/' ? 'dist/index.html' : `dist${ref.replace(/\/$/, '')}.html`
      assert.ok(fs.existsSync(target), `Missing page ${ref} on ${url.pathname}`)
    }
  }
}
assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('content="noindex,follow"'), 'Missing noindex 404 page')

console.log(`Verified ${urls.length} prerendered pages, metadata, structured data, links, and image assets.`)
