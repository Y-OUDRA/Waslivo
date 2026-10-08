import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('./website-offer-leads.gs', import.meta.url), 'utf8');
const tabs = new Map([['Website Leads', []]]);
const queueRows = [];
const notifications = [];
const cache = new Map();
const sheet = name => ({
  getName: () => name,
  getLastRow: () => tabs.get(name).length,
  appendRow: row => tabs.get(name).push(row),
  getDataRange: () => ({getValues:() => tabs.get(name)}),
  getRange: (row,column,_height,width) => ({setValues:values => tabs.get(name)[row-1].splice(column-1,width,...values[0])}),
});
const queueSheet = {getName:() => 'Telegram Queue',getLastRow:() => queueRows.length,appendRow:row => queueRows.push(row),getDataRange:() => ({getValues:() => queueRows}),getRange:(row,column,_height,width) => ({setValues:values => queueRows[row-1].splice(column-1,width,...values[0])})};
const context = {
  console:{warn(){},error(){}},
  SpreadsheetApp:{openById:() => ({getSheetByName:name => name === 'Telegram Queue' ? queueSheet : (tabs.has(name) ? sheet(name) : null),insertSheet:name => {if(name==='Telegram Queue')return queueSheet;tabs.set(name,[]);return sheet(name);}})},
  LockService:{getScriptLock:() => ({waitLock(){},tryLock(){return true},releaseLock(){}})},
  ScriptApp:{getProjectTriggers:() => [],newTrigger:() => ({timeBased(){return this},everyMinutes(){return this},create(){}})},
  CacheService:{getScriptCache:() => ({get:id => cache.get(id),put:(id,value) => cache.set(id,value)})},
  PropertiesService:{getScriptProperties:() => ({getProperty:key => ({TELEGRAM_BOT_TOKEN:'test-token',TELEGRAM_CHAT_ID:'1234'})[key]})},
  UrlFetchApp:{fetch:(_url,options) => {notifications.push(JSON.parse(options.payload).text);return {getResponseCode:() => 200};}},
  HtmlService:{XFrameOptionsMode:{ALLOWALL:'ALLOWALL'},createHtmlOutput:html => ({html,setXFrameOptionsMode(){return this;}})},
};
vm.createContext(context); vm.runInContext(source,context);
const id = '123e4567-e89b-42d3-a456-426614174002';
const payload = {service:'us_tiktok_ads_account_0_tax',requestId:id,fullName:'Test Lead',phone:'+212612345678',businessActivity:'Agency',monthlySpend:'3',quantity:'2',calculatedPrice:'1',language:'fr',page_url:'https://waslivo.agency/fr/tiktok-ads-account/?utm_source=tiktok',utm_source:'tiktok'};
const post = data => context.doPost({parameter:{payload:JSON.stringify(data)}}).html;
assert.match(post(payload),/"success":true/);
assert.equal(tabs.get('TikTok Account Leads').length,2);
assert.equal(tabs.get('TikTok Account Leads')[1][6],800); // Price is computed server-side.
assert.equal(tabs.get('TikTok Account Leads')[1][9],'tiktok');
assert.equal(notifications.length,0);
context.processTelegramQueue();
assert.match(notifications[0],/TikTok Ads Account/);
const shortForm = {...payload,requestId:'123e4567-e89b-42d3-a456-426614174006',monthlySpend:'',quantity:'1'};
assert.match(post(shortForm),/"success":true/);
assert.equal(tabs.get('TikTok Account Leads')[2][4],'');
assert.equal(tabs.get('TikTok Account Leads')[2][6],400);
context.processTelegramQueue();
assert.doesNotMatch(notifications[1],/ميزانية TikTok الشهرية/);
assert.match(post(payload),/"success":true/);
assert.equal(tabs.get('TikTok Account Leads').length,3);
assert.equal(notifications.length,2);
assert.match(post({...payload,requestId:'123e4567-e89b-42d3-a456-426614174003',quantity:'9'}),/"success":false/);
assert.match(post({...payload,requestId:'123e4567-e89b-42d3-a456-426614174004',page_url:'https://evil.example/tiktok-ads-account/'}),/"success":false/);
assert.match(post({...payload,requestId:'123e4567-e89b-42d3-a456-426614174005',quantity:'5+'}),/"success":true/);
assert.equal(tabs.get('TikTok Account Leads')[3][6],'Contact for details');
assert.equal(tabs.get('Website Leads').length,0);
console.log('TikTok account lead validation, server pricing, sheet routing, deduplication, and Telegram passed.');
