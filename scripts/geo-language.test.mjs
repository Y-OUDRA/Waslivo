import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { onRequest } from '../functions/_middleware.js';

const visit = async (path, country, headers = {}) => {
  const request = new Request(`https://waslivo.agency${path}`, { headers });
  request.cf = { country };
  return onRequest({ request, next: () => new Response('Arabic page') });
};

test('country selects Arabic, French, or English on the homepage', async () => {
  assert.equal((await visit('/', 'SA')).status, 200);
  assert.equal((await visit('/', 'FR')).headers.get('Location'), 'https://waslivo.agency/fr/');
  assert.equal((await visit('/', 'US')).headers.get('Location'), 'https://waslivo.agency/en/');
  assert.equal((await visit('/', undefined)).status, 200);
});

test('the selected language wins over country and query is retained', async () => {
  const response = await visit('/portfolio?utm_source=tiktok', 'FR', { Cookie: 'waslivo_lang=en' });
  assert.equal(response.headers.get('Location'), 'https://waslivo.agency/en/portfolio?utm_source=tiktok');
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal((await visit('/website-offer/', 'US', { Cookie: 'waslivo_lang=ar' })).status, 200);
});

test('the thank-you confirmation and explicit translated URLs remain stable', async () => {
  assert.equal((await visit('/website-offer/thank-you/', 'FR')).status, 200);
  assert.equal((await visit('/en/website-offer/', 'FR')).status, 200);
  assert.equal((await visit('/fr/portfolio', 'US')).status, 200);
  assert.equal((await visit('/', 'US', { 'User-Agent': 'Googlebot' })).status, 200);
});

test('multilingual countries follow their preferred browser language', async () => {
  assert.equal((await visit('/', 'CA', { 'Accept-Language': 'fr-CA,fr;q=0.9,en;q=0.8' })).headers.get('Location'), 'https://waslivo.agency/fr/');
  assert.equal((await visit('/', 'CA', { 'Accept-Language': 'en-CA,en;q=0.9' })).headers.get('Location'), 'https://waslivo.agency/en/');
});

test('Cloudflare routes cover Arabic pages without intercepting localized pages', () => {
  const routes = JSON.parse(readFileSync(new URL('../dist/_routes.json', import.meta.url), 'utf8'));
  assert.ok(routes.include.includes('/'));
  assert.ok(routes.include.includes('/website-offer/'));
  assert.ok(routes.include.includes('/tiktok-ads/'));
  assert.ok(routes.include.length <= 100);
  assert.ok(routes.include.every(route => route.length <= 100 && !route.startsWith('/en') && !route.startsWith('/fr')));
});
