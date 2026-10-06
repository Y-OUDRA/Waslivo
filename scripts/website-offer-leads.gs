// WASLIVO website-offer lead receiver. Deploy as a Google Apps Script Web App
// under the same Google account that owns the lead spreadsheet.
// The spreadsheet ID below refers to the verified sheet created for this page.
const SPREADSHEET_ID = '198ndUT_4hWDJJUb-CLjMs4u_biyTggYdy69X9zmpG80';
const SHEET_NAME = 'Website Leads';

function doPost(event) {
  let requestId = '';
  let targetOrigin = 'https://waslivo.agency';
  try {
    const data = JSON.parse(event.parameter && event.parameter.payload || '{}');
    requestId = clean(data.requestId, 80);
    const pageUrl = clean(data.page_url, 500);
    targetOrigin = responseOrigin(pageUrl) || targetOrigin;
    if (!/^[a-f0-9-]{36}$/.test(requestId)) return respond(false, '', targetOrigin);
    if (data.website) return respond(false, requestId, targetOrigin);
    const fullName = clean(data.fullName, 100);
    const phone = String(data.phone == null ? '' : data.phone).trim().slice(0, 20);
    const businessActivity = clean(data.businessActivity, 120);
    const digits = phone.startsWith('+') ? phone.slice(1) : '';
    if (fullName.length < 2 || businessActivity.length < 2 || digits.length < 8 || digits.length > 15 || !digits.split('').every(char => char >= '0' && char <= '9')) {
      return respond(false, requestId, targetOrigin);
    }
    if (!responseOrigin(pageUrl)) {
      return respond(false, requestId, targetOrigin);
    }
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Missing Website Leads sheet');
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const cache = CacheService.getScriptCache();
      if (!cache.get(requestId)) {
        sheet.appendRow([
          new Date(), fullName, clean(phone, 20), businessActivity,
          clean(data.source, 200), clean(data.utm_source, 200), clean(data.utm_medium, 200),
          clean(data.utm_campaign, 200), clean(data.utm_content, 200), clean(data.utm_term, 200),
          pageUrl, clean(data.referrer, 500),
        ]);
        cache.put(requestId, '1', 21600);
      }
    } finally {
      lock.releaseLock();
    }
    return respond(true, requestId, targetOrigin);
  } catch (error) {
    console.error(error);
    return respond(false, requestId, targetOrigin);
  }
}

function responseOrigin(pageUrl) {
  const live = 'https://waslivo.agency/website-offer';
  const preview = 'http://127.0.0.1:4173/website-offer';
  if ([live, live + '/'].includes(pageUrl) || pageUrl.startsWith(live + '/?') || pageUrl.startsWith(live + '/#')) return 'https://waslivo.agency';
  if ([preview, preview + '/'].includes(pageUrl) || pageUrl.startsWith(preview + '/?') || pageUrl.startsWith(preview + '/#')) return 'http://127.0.0.1:4173';
  return '';
}

function clean(value, maxLength) {
  const text = String(value == null ? '' : value).trim().slice(0, maxLength);
  // Prevent spreadsheet formulas supplied by visitors from executing in Sheets.
  return ['=', '+', '-', '@'].includes(text[0]) ? "'" + text : text;
}

function respond(success, requestId, targetOrigin) {
  const message = JSON.stringify({type: 'waslivo-lead-result', success: success, requestId: requestId});
  return HtmlService.createHtmlOutput('<!doctype html><script>window.top.postMessage(' + message + ',' + JSON.stringify(targetOrigin) + ')</script>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
