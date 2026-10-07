(() => {
  'use strict';
  const endpoint = 'https://script.google.com/macros/s/AKfycby02V_kAjWMqVcmCfQNqFEBv17g2yudAUU06c1W0jQ6q6el5eFcHIMbhUeMQAKmCWhJIw/exec';
  const pendingKey = 'waslivo_tiktok_account_pending';
  const confirmedKey = 'waslivo_tiktok_account_confirmed';
  const copy = JSON.parse(document.getElementById('thanks-copy').textContent);
  const heading = document.getElementById('status-heading');
  const description = document.getElementById('status-description');
  const mark = document.getElementById('status-mark');
  const retry = document.getElementById('retry-button');
  const actions = document.getElementById('thanks-actions');
  const summary = document.getElementById('thanks-summary');
  const nav = document.getElementById('primary-nav');
  const header = document.getElementById('site-header');
  const toggle = header.querySelector('.nav-toggle');
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
  toggle.addEventListener('click',() => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('header-nav-open',open); toggle.setAttribute('aria-expanded',String(open)); });
  nav.addEventListener('click',e => { if (e.target.closest('a')) { nav.classList.remove('header-nav-open'); toggle.setAttribute('aria-expanded','false'); } });
  const syncHeader = () => header.classList.toggle('header-scrolled',scrollY > 35);
  addEventListener('scroll',syncHeader,{passive:true}); syncHeader();
  let busy = false;
  const status = (kind,title,text) => { mark.className = `account-status-mark ${kind}`; heading.textContent = title; description.textContent = text; retry.hidden = kind !== 'error'; actions.hidden = kind !== 'success'; };
  const submitToSheet = payload => new Promise((resolve,reject) => {
    const frame = document.createElement('iframe'); frame.name = `waslivo-account-${payload.requestId}`; frame.title = 'Confirm lead'; frame.hidden = true; document.body.append(frame);
    const form = document.createElement('form'); form.method = 'POST'; form.action = endpoint; form.target = frame.name; form.hidden = true;
    const input = document.createElement('input'); input.name = 'payload'; input.value = JSON.stringify(payload); form.append(input); document.body.append(form);
    let settled = false;
    const cleanup = () => { clearTimeout(timer); removeEventListener('message',receive); form.remove(); frame.remove(); };
    const receive = e => {
      if (settled || e.source !== frame.contentWindow || !(/^https:\/\/(?:[a-z0-9-]+\.)?script\.googleusercontent\.com$/.test(e.origin) || e.origin === 'https://script.google.com') || e.data?.type !== 'waslivo-lead-result' || e.data.requestId !== payload.requestId) return;
      settled = true; cleanup(); resolve(e.data);
    };
    const timer = setTimeout(() => { if (!settled) { settled = true; cleanup(); reject(new Error('timeout')); } },25000);
    addEventListener('message',receive); form.submit();
  });
  const confirm = async () => {
    if (busy) return;
    const raw = sessionStorage.getItem(pendingKey);
    if (!raw) {
      if (sessionStorage.getItem(confirmedKey) === '1') { status('success',copy.success,copy.successText); return; }
      status('error',copy.error,copy.errorText); return;
    }
    let payload; try { payload = JSON.parse(raw); } catch { status('error',copy.error,copy.errorText); return; }
    if (!/^[a-f0-9-]{36}$/.test(payload.requestId || '') || payload.service !== 'us_tiktok_ads_account_0_tax') { status('error',copy.error,copy.errorText); return; }
    busy = true; status('',copy.pending,copy.pendingText);
    try {
      const result = await submitToSheet(payload);
      if (result.success !== true) throw new Error('rejected');
      sessionStorage.setItem(confirmedKey,'1'); sessionStorage.removeItem(pendingKey);
      summary.textContent = payload.quantity === '5+' ? `${payload.quantity} ${copy.accounts} · ${payload.phone}` : `${payload.quantity} × 400 DH = ${payload.calculatedPrice} DH · ${payload.phone}`;
      summary.hidden = false;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'tiktok_account_form_success',service:payload.service,quantity:payload.quantity,value:payload.quantity === '5+' ? undefined : Number(payload.calculatedPrice),currency:'MAD'});
      if (window.ttq?.track) window.ttq.track('Lead',{service:payload.service,quantity:payload.quantity});
      if (typeof window.fbq === 'function') window.fbq('track','Lead',{service:payload.service});
      status('success',copy.success,copy.successText);
    } catch {
      window.dataLayer = window.dataLayer || []; window.dataLayer.push({event:'tiktok_account_form_error',service:'us_tiktok_ads_account_0_tax',reason:'confirmation'});
      status('error',copy.error,copy.errorText);
    } finally { busy = false; }
  };
  retry.addEventListener('click',confirm); confirm();
})();
