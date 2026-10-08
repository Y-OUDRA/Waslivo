import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(new URL('./website-offer-leads.gs', import.meta.url), 'utf8')
const rows = [['Timestamp','Full name','WhatsApp phone','Business activity','Source','UTM source','UTM medium','UTM campaign','UTM content','UTM term','Landing page URL','Referrer']]
const queueRows = []
const notifications = []
const cache = new Map()
let telegramStatus = 200
const context = {
  console: { warn() {}, error() {} },
  SpreadsheetApp: { openById: () => ({
    getSheetByName: name => name === 'Telegram Queue' ? queueSheet : (name === 'Website Leads' ? websiteSheet : null),
    insertSheet: () => queueSheet,
  }) },
  LockService: { getScriptLock: () => ({ waitLock() {}, tryLock() { return true }, releaseLock() {} }) },
  CacheService: { getScriptCache: () => ({ get: id => cache.get(id), put: (id, value) => cache.set(id, value) }) },
  ScriptApp: { getProjectTriggers: () => [], newTrigger: () => ({ timeBased() { return this }, everyMinutes() { return this }, create() {} }) },
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
const websiteSheet = {
  getName: () => 'Website Leads',
  getLastRow: () => rows.length,
  getLastColumn: () => rows[0]?.length || 0,
  appendRow: row => rows.push(row),
  getDataRange: () => ({ getValues: () => rows }),
  getRange: (row, column, _height, width) => ({
    getValues: () => [rows[row - 1].slice(column - 1, column - 1 + width)],
    setValue: value => { rows[row - 1][column - 1] = value },
  }),
}
const queueSheet = {
  getName: () => 'Telegram Queue',
  getLastRow: () => queueRows.length,
  appendRow: row => queueRows.push(row),
  getDataRange: () => ({ getValues: () => queueRows }),
  getRange: (row, column, _height, width) => ({ setValues: values => queueRows[row - 1].splice(column - 1, width, ...values[0]) }),
}
vm.createContext(context)
vm.runInContext(source, context)

const lead = requestId => ({ parameter: { payload: JSON.stringify({
  requestId, fullName: 'Test Lead', phone: '+212600000000',
  businessActivity: 'Coffee shop', page_url: 'https://waslivo.agency/website-offer/',
}) } })
const id = '123e4567-e89b-42d3-a456-426614174000'
assert.match(context.doPost(lead(id)).html, /"success":true/)
assert.equal(rows.length, 2)
assert.equal(rows[0][12], 'Request ID')
assert.equal(rows[1][12], id)
assert.equal(notifications.length, 0)
assert.equal(queueRows[1][3], 'PENDING')
assert.match(context.doPost({parameter:{action:'notify',requestId:id,page_url:'https://waslivo.agency/website-offer/'}}).html, /"success":true/)
assert.equal(notifications.length, 1)
assert.equal(queueRows[1][3], 'SENT')
context.processTelegramQueue()
assert.equal(notifications.length, 1)
assert.equal(queueRows[1][3], 'SENT')
assert.equal(notifications[0].url, 'https://api.telegram.org/bottest-token/sendMessage')
assert.equal(JSON.parse(notifications[0].options.payload).disable_notification, false)
assert.match(JSON.parse(notifications[0].options.payload).text, /Test Lead/)

assert.match(context.doPost(lead(id)).html, /"success":true/)
assert.equal(rows.length, 2)
assert.equal(notifications.length, 1)
assert.equal(queueRows.length, 2)

telegramStatus = 503
assert.match(context.doPost(lead('123e4567-e89b-42d3-a456-426614174001')).html, /"success":true/)
assert.equal(rows.length, 3)
assert.equal(notifications.length, 1)
context.doPost({parameter:{action:'notify',requestId:'123e4567-e89b-42d3-a456-426614174001',page_url:'https://waslivo.agency/website-offer/'}})
assert.equal(notifications.length, 2)
assert.equal(queueRows[2][3], 'PENDING')
context.processTelegramQueue()
assert.equal(notifications.length, 3)
assert.equal(queueRows[2][3], 'PENDING')
console.log('Lead confirmation is independent of Telegram latency; immediate notification, queued retries, and deduplication passed.')
