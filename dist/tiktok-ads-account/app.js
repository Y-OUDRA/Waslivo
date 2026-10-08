(() => {
  'use strict';
  const lang = document.documentElement.lang;
  const copy = JSON.parse(document.getElementById('account-copy').textContent);
  const form = document.getElementById('account-lead-form');
  const header = document.getElementById('site-header');
  const nav = document.getElementById('primary-nav');
  const toggle = header.querySelector('.nav-toggle');
  const sticky = document.getElementById('account-sticky');
  const formSection = document.getElementById('lead-form');
  const pendingKey = 'waslivo_tiktok_account_pending';
  const event = (name, extra = {}) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({event:name, service:'us_tiktok_ads_account_0_tax', ...extra}); };
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
  const closeNav = () => { nav.classList.remove('header-nav-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label',copy.menu); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('header-nav-open',open); toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open ? copy.close : copy.menu); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeNav(); });
  const syncHeader = () => header.classList.toggle('header-scrolled',scrollY > 35);
  addEventListener('scroll',syncHeader,{passive:true}); syncHeader();
  let calculatorUsed = false;
  const budgetInput = document.getElementById('monthly-budget');
  const budgetRange = document.getElementById('budget-range');
  const result = document.getElementById('twenty-percent');
  const format = amount => `${new Intl.NumberFormat(lang === 'ar' ? 'en-US' : lang).format(amount)} DH`;
  const updateBudget = (value, source) => {
    const amount = Math.max(0,Math.min(1000000,Math.round(Number(value) || 0)));
    budgetInput.value = String(amount);
    budgetRange.value = String(Math.min(100000,amount));
    result.textContent = format(Math.round(amount * .2));
    if (source) {
      if (!calculatorUsed) { event('tiktok_account_calculator_start',{monthly_spend:amount}); calculatorUsed = true; }
      event('tiktok_account_calculator_change',{monthly_spend:amount,calculated_20_percent:Math.round(amount*.2)});
    }
  };
  budgetInput.addEventListener('input', () => updateBudget(budgetInput.value,true));
  budgetRange.addEventListener('input', () => updateBudget(budgetRange.value,true));
  const showSticky = () => { sticky.hidden = !(window.innerWidth <= 760 && document.querySelector('.account-hero').getBoundingClientRect().bottom < 0); document.body.classList.toggle('sticky-visible',!sticky.hidden); };
  addEventListener('scroll',showSticky,{passive:true}); addEventListener('resize',showSticky); showSticky();
  const ctaEvents = {hero:'tiktok_account_hero_cta_click',calculator:'tiktok_account_calculator_cta',comparison:'tiktok_account_comparison_cta',pricing:'tiktok_account_pricing_cta'};
  document.querySelectorAll('[data-cta]').forEach(link => link.addEventListener('click',() => event(ctaEvents[link.dataset.cta] || 'tiktok_account_cta_click',{placement:link.dataset.cta})));
  let formViewed = false;
  const formObserver = new IntersectionObserver(entries => { if (!formViewed && entries.some(entry => entry.isIntersecting)) { formViewed = true; event('tiktok_account_form_view'); formObserver.disconnect(); } },{threshold:.15});
  formObserver.observe(formSection);
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll('.account-section .account-heading, .account-budget-card, .account-calc-result, .account-compare article, .account-value-grid article, .account-timeline-step, .account-audience-grid > div, .account-pricing-card, .account-faq-list details');
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }, {threshold:.12,rootMargin:'0px 0px -24px 0px'});
    revealTargets.forEach((target,index) => {
      target.classList.add('account-reveal');
      target.style.setProperty('--reveal-delay',`${index % 4 * 65}ms`);
      revealObserver.observe(target);
    });
  }
  event('tiktok_account_page_view',{language:lang});
  const fields = {fullName:[form.elements.fullName,document.getElementById('name-error'),copy.errors[0]],phone:[form.elements.phone,document.getElementById('phone-error'),copy.errors[1]],businessActivity:[form.elements.businessActivity,document.getElementById('business-error'),copy.errors[2]]};
  Object.values(fields).forEach(([input,error]) => input.addEventListener('input',() => { error.textContent = ''; input.removeAttribute('aria-invalid'); }));
  const digitMap = '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹';
  const normalizePhone = raw => {
    let value = raw.replace(/[٠-٩۰-۹]/g,char => String(digitMap.indexOf(char)%10)).replace(/[\s().-]/g,'');
    if (/^0[567]\d{8}$/.test(value)) value = '+212' + value.slice(1);
    else if (/^212[567]\d{8}$/.test(value)) value = '+' + value;
    else if (/^00\d{8,15}$/.test(value)) value = '+' + value.slice(2);
    return /^\+[1-9]\d{7,14}$/.test(value) ? value : null;
  };
  const invalid = (key,bad) => { const [input,error,message] = fields[key]; error.textContent = bad ? message : ''; if (bad) input.setAttribute('aria-invalid','true'); else input.removeAttribute('aria-invalid'); return bad; };
  let started = false;
  form.addEventListener('focusin',() => { if (!started) { event('tiktok_account_form_start'); started = true; } });
  const params = new URLSearchParams(location.search);
  const attributionKey = 'waslivo_tiktok_account_attribution';
  let attribution = {};
  try { attribution = JSON.parse(sessionStorage.getItem(attributionKey) || '{}'); } catch { attribution = {}; }
  if (['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].some(key => params.has(key))) {
    attribution = {landing_page:location.href,referrer:document.referrer || ''};
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) attribution[key] = (params.get(key) || '').slice(0,200);
    try { sessionStorage.setItem(attributionKey,JSON.stringify(attribution)); } catch { /* Keep attribution in memory. */ }
  }
  const utm = key => attribution[key] || (params.get(key) || '').slice(0,200);
  const message = document.getElementById('form-message');
  const submit = form.querySelector('[type=submit]');
  form.addEventListener('submit',async e => {
    e.preventDefault(); if (submit.disabled) return;
    message.textContent = '';
    const fullName = form.elements.fullName.value.trim().replace(/\s+/g,' ');
    const phone = normalizePhone(form.elements.phone.value);
    const businessActivity = form.elements.businessActivity.value.trim().replace(/\s+/g,' ');
    const errors = [invalid('fullName',fullName.length<2),invalid('phone',!phone),invalid('businessActivity',businessActivity.length<2)];
    if (errors.some(Boolean)) { Object.values(fields).find(([,err]) => err.textContent)?.[0].focus(); event('tiktok_account_form_error',{reason:'validation'}); return; }
    if (form.elements.website.value) return;
    const payload = {service:'us_tiktok_ads_account_0_tax',requestId:crypto.randomUUID(),fullName,phone,businessActivity,monthlySpend:'',quantity:'1',calculatedPrice:'400',language:lang,source:utm('utm_source'),utm_source:utm('utm_source'),utm_medium:utm('utm_medium'),utm_campaign:utm('utm_campaign'),utm_content:utm('utm_content'),utm_term:utm('utm_term'),page_url:attribution.landing_page || location.href,referrer:attribution.referrer || document.referrer || '',website:''};
    submit.disabled = true; form.setAttribute('aria-busy','true'); message.textContent = copy.errors[4];
    try {
      sessionStorage.setItem(pendingKey,JSON.stringify(payload));
      sessionStorage.removeItem('waslivo_tiktok_account_confirmed');
      // The confirmation page sends once and waits for the server response.
      event('tiktok_account_form_submit',{number_of_accounts:1,calculated_price:400,utm_campaign:utm('utm_campaign')});
      location.assign(`${lang === 'ar' ? '' : '/' + lang}/tiktok-ads-account/thank-you/`);
    } catch {
      message.textContent = copy.errors[3]; submit.disabled = false; form.removeAttribute('aria-busy');
      event('tiktok_account_form_error',{reason:'storage'});
    }
  });
})();
