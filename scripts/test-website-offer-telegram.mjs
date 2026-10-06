import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(new URL('./website-offer-leads.gs', import.meta.url), 'utf8')
const rows = []
const notifications = []
const cache = new Map()
let telegramStatus = 200
const context = {
  console: { warn() {}, error() {} },
  SpreadsheetApp: { openById: () => ({ getSheetByName: () => ({ appendRow: row => rows.push(row) }) }) },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  CacheService: { getScriptCache: () => ({ get: id => cache.get(id), put: (id, value) => cache.set(id, value) }) },
  PropertiesService: { getScriptProperties: () => ({ getProperty: key => ({ TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: '1234' })[key] }) },
  UrlFetchApp: { fetch: (url, options) => {
    notifications.push({ url, options })
    return { getResponseCode: () => telegramStatus }
  } },
  HtmlService: {
    XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
    createHtmlOutput: html => ({ html, setXFrameOptionsMode() { return this } }),
  },
}
vm.createContext(context)
vm.runInContext(source, context)

const lead = requestId => ({ parameter: { payload: JSON.stringify({
  requestId, fullName: 'Test Lead', phone: '+212600000000',
  businessActivity: 'Coffee shop', page_url: 'https://waslivo.agency/website-offer/',
}) } })
const id = '123e4567-e89b-42d3-a456-426614174000'
assert.match(context.doPost(lead(id)).html, /"success":true/)
assert.equal(rows.length, 1)
assert.equal(notifications.length, 1)
assert.equal(notifications[0].url, 'https://api.telegram.org/bottest-token/sendMessage')
assert.equal(JSON.parse(notifications[0].options.payload).disable_notification, false)
assert.match(JSON.parse(notifications[0].options.payload).text, /Test Lead/)

assert.match(context.doPost(lead(id)).html, /"success":true/)
assert.equal(rows.length, 1)
assert.equal(notifications.length, 1)

telegramStatus = 503
assert.match(context.doPost(lead('123e4567-e89b-42d3-a456-426614174001')).html, /"success":true/)
assert.equal(rows.length, 2)
assert.equal(notifications.length, 2)
console.log('Telegram notification after a new saved lead, deduplication, and failure isolation passed.')
