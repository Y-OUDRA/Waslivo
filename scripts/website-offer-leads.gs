// WASLIVO website-offer lead receiver. Deploy as a Google Apps Script Web App
// under the same Google account that owns the lead spreadsheet.
// The spreadsheet ID below refers to the verified sheet created for this page.
const SPREADSHEET_ID = '198ndUT_4hWDJJUb-CLjMs4u_biyTggYdy69X9zmpG80';
const SHEET_NAME = 'Website Leads';
const ACCOUNT_SHEET_NAME = 'TikTok Account Leads';
const ACCOUNT_SERVICE = 'us_tiktok_ads_account_0_tax';

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
    const accountLead = data.service === ACCOUNT_SERVICE;
    const accountPage = /^(https:\/\/waslivo\.agency|http:\/\/127\.0\.0\.1:417[34])\/(?:en\/|fr\/)?tiktok-ads-account\/?(?:[?#].*)?$/.test(pageUrl);
    if (accountLead !== accountPage) return respond(false, requestId, targetOrigin);
    const quantity = String(data.quantity == null ? '' : data.quantity);
    const spend = String(data.monthlySpend == null ? '' : data.monthlySpend);
    const language = String(data.language == null ? '' : data.language);
    if (accountLead && (!['1','2','3','4','5+'].includes(quantity) || !/^(?:[0-6])?$/.test(spend) || !['ar','en','fr'].includes(language))) {
      return respond(false, requestId, targetOrigin);
    }
    const calculatedPrice = accountLead ? (quantity === '5+' ? 'Contact for details' : Number(quantity) * 400) : '';
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    let isNewLead = false;
    try {
      const cache = CacheService.getScriptCache();
      if (!cache.get(requestId)) {
        const book = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = accountLead ? (book.getSheetByName(ACCOUNT_SHEET_NAME) || book.insertSheet(ACCOUNT_SHEET_NAME)) : book.getSheetByName(SHEET_NAME);
        if (!sheet) throw new Error('Missing Website Leads sheet');
        if (accountLead) {
          if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp','Full name','WhatsApp phone','Business activity','Monthly TikTok spend','Number of accounts','Calculated price MAD','Service','Language','UTM source','UTM medium','UTM campaign','UTM content','UTM term','Referrer','Landing page URL','Request ID']);
          sheet.appendRow([new Date(),fullName,clean(phone,20),businessActivity,spend,quantity,calculatedPrice,ACCOUNT_SERVICE,language,clean(data.utm_source,200),clean(data.utm_medium,200),clean(data.utm_campaign,200),clean(data.utm_content,200),clean(data.utm_term,200),clean(data.referrer,500),pageUrl,requestId]);
        } else {
          sheet.appendRow([
            new Date(), fullName, clean(phone, 20), businessActivity,
            clean(data.source, 200), clean(data.utm_source, 200), clean(data.utm_medium, 200),
            clean(data.utm_campaign, 200), clean(data.utm_content, 200), clean(data.utm_term, 200),
            pageUrl, clean(data.referrer, 500),
          ]);
        }
        cache.put(requestId, '1', 21600);
        isNewLead = true;
      }
    } finally {
      lock.releaseLock();
    }
    // Telegram must never turn an already saved lead into a failed form response.
    if (isNewLead) notifyTelegramLead(fullName, phone, businessActivity, accountLead ? {quantity,spend,calculatedPrice} : null);
    return respond(true, requestId, targetOrigin);
  } catch (error) {
    console.error(error);
    return respond(false, requestId, targetOrigin);
  }
}

function notifyTelegramLead(fullName, phone, businessActivity, accountDetails) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const token = properties.getProperty('TELEGRAM_BOT_TOKEN');
    const chatId = properties.getProperty('TELEGRAM_CHAT_ID');
    if (!token || !chatId) {
      console.warn('Telegram lead notification is not configured');
      return false;
    }
    const text = [
      accountDetails ? '🔔 Lead جديد: TikTok Ads Account' : '🔔 Lead جديد من صفحة تصميم المواقع',
      'الاسم: ' + fullName,
      'الجوال: ' + phone,
      'النشاط: ' + businessActivity,
      ...(accountDetails ? ['عدد الحسابات: ' + accountDetails.quantity,...(accountDetails.spend ? ['ميزانية TikTok الشهرية: ' + accountDetails.spend] : []),'الثمن: ' + accountDetails.calculatedPrice + ' DH'] : []),
    ].join('\n');
    const response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({chat_id: chatId, text: text, disable_notification: false}),
      muteHttpExceptions: true,
      timeoutSeconds: 10,
    });
    if (response.getResponseCode() !== 200) {
      console.error('Telegram lead notification failed with HTTP ' + response.getResponseCode());
      return false;
    }
    return true;
  } catch (error) {
    // UrlFetch errors may contain the URL, so do not log the bot token.
    console.error('Telegram lead notification failed');
    return false;
  }
}

function logTelegramChatIds() {
  const token = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
  if (!token) throw new Error('Set TELEGRAM_BOT_TOKEN in Script Properties first');
  const response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getUpdates');
  const updates = JSON.parse(response.getContentText()).result || [];
  const ids = [...new Set(updates
    .map(update => update.message && update.message.chat)
    .filter(chat => chat && chat.type === 'private')
    .map(chat => chat.id))];
  console.log('Private Telegram chat IDs: ' + (ids.join(', ') || 'none; send /start to the bot and run again'));
}

function sendTelegramTest() {
  if (!notifyTelegramLead('اختبار', '—', 'تنبيه تجريبي من وصليفو')) {
    throw new Error('Telegram test notification failed');
  }
}

function responseOrigin(pageUrl) {
  const match = /^(https:\/\/waslivo\.agency|http:\/\/127\.0\.0\.1:417[34])\/(?:en\/|fr\/)?(?:website-offer|tiktok-ads-account)\/?(?:[?#].*)?$/.exec(pageUrl);
  if (match) return match[1];
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
