import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const requestId = '123e4567-e89b-42d3-a456-426614174000'
const pendingKey = 'waslivo_website_offer_pending'
const submittedKey = 'waslivo_website_offer_submitted'
const storage = new Map()
const sessionStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.delete(key),
}
const classList = () => ({ add() {}, remove() {}, toggle() {} })
const element = extra => ({ textContent: '', className: '', hidden: false, classList: classList(), setAttribute() {}, removeAttribute() {}, addEventListener() {}, remove() {}, ...extra })

let submitHandler
let destination
let beaconBody
const fields = {
  fullName: element({ value: 'Test Visitor', focus() {} }),
  phone: element({ value: '0551234567', focus() {} }),
  businessActivity: element({ value: 'Test business', focus() {} }),
  website: element({ value: '' }),
}
const form = element({
  elements: fields,
  querySelector: () => element({ innerHTML: 'Submit', disabled: false }),
  addEventListener: (event, handler) => { if (event === 'submit') submitHandler = handler },
})
const toggle = element({ getAttribute: () => 'false' })
const header = element({ querySelector: () => toggle, contains: () => false })
const ids = new Map([
  ['website-lead-form', form], ['form-message', element()],
  ['lead-form', element({ getBoundingClientRect: () => ({ bottom: 100 }) })],
  ['sticky-cta', element()], ['site-header', header], ['primary-nav', element()],
  ['year', element()], ['name-error', element()], ['phone-error', element()], ['business-error', element()],
])
const location = { href: 'https://waslivo.agency/website-offer/', search: '', assign: url => { destination = url } }
runInNewContext(readFileSync(new URL('../public/website-offer/app.js', import.meta.url), 'utf8'), {
  document: { getElementById: id => ids.get(id), querySelectorAll: () => [], addEventListener() {}, body: { classList: classList() } },
  window: { addEventListener() {}, matchMedia: () => ({ matches: false }), scrollY: 0 },
  navigator: { sendBeacon: (_url, body) => { beaconBody = body; return true } },
  sessionStorage, location, URLSearchParams, crypto: { randomUUID: () => requestId },
  IntersectionObserver: class { observe() {} }, Date, setTimeout, clearTimeout,
})
assert.equal(typeof submitHandler, 'function')
await submitHandler({ preventDefault() {} })
assert.equal(destination, '/website-offer/thank-you/')
const pending = JSON.parse(sessionStorage.getItem(pendingKey))
assert.equal(pending.requestId, requestId)
assert.equal(pending.phone, '+966551234567')
assert.equal(JSON.parse(beaconBody.get('payload')).requestId, requestId)

let retryHandler
let resultSuccess = false
let messageHandler
const status = new Map([
  ['status-mark', element()], ['status-heading', element()], ['status-description', element()],
  ['retry-button', element({ addEventListener: (_event, handler) => { retryHandler = handler } })],
  ['thank-you-whatsapp', element()],
])
const confirmDocument = {
  documentElement: { dataset: {} },
  getElementById: id => status.get(id),
  body: { append() {} },
  createElement: type => {
    if (type !== 'form') return element()
    return element({ append() {}, submit: () => messageHandler({ data: { type: 'waslivo-lead-result', success: resultSuccess, requestId } }) })
  },
}
runInNewContext(readFileSync(new URL('../public/website-offer/thank-you/confirm.js', import.meta.url), 'utf8'), {
  document: confirmDocument,
  window: { addEventListener: (_event, handler) => { messageHandler = handler }, removeEventListener() {} },
  sessionStorage, location: { hostname: 'waslivo.agency', search: '' },
  URLSearchParams, JSON, setTimeout, clearTimeout,
})
await Promise.resolve()
await Promise.resolve()
assert.equal(status.get('status-heading').textContent, 'تعذّر تأكيد طلبك')
assert.ok(sessionStorage.getItem(pendingKey), 'failed delivery stays available for retry')

resultSuccess = true
retryHandler()
await Promise.resolve()
await Promise.resolve()
assert.equal(status.get('status-heading').textContent, 'تم استلام طلبك')
assert.equal(sessionStorage.getItem(pendingKey), null)
assert.equal(sessionStorage.getItem(submittedKey), '1')
console.log('Website offer navigation, retry and confirmed delivery passed.')
