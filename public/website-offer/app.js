(() => {
  'use strict';

  const leadEndpoint = 'https://script.google.com/macros/s/AKfycby02V_kAjWMqVcmCfQNqFEBv17g2yudAUU06c1W0jQ6q6el5eFcHIMbhUeMQAKmCWhJIw/exec';
  const form = document.getElementById('website-lead-form');
  const message = document.getElementById('form-message');
  const submitButton = form.querySelector('button[type="submit"]');
  const formCard = document.getElementById('lead-form');
  const sticky = document.getElementById('sticky-cta');
  const header = document.getElementById('site-header');
  const nav = document.getElementById('primary-nav');
  const navToggle = header.querySelector('.nav-toggle');
  document.getElementById('year').textContent = new Date().getFullYear();

  const closeNav = () => {
    nav.classList.remove('header-nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'فتح القائمة');
  };
  navToggle.addEventListener('click', () => {
    const opening = navToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('header-nav-open', opening);
    navToggle.setAttribute('aria-expanded', String(opening));
    navToggle.setAttribute('aria-label', opening ? 'إغلاق القائمة' : 'فتح القائمة');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeNav(); });
  const syncHeader = () => header.classList.toggle('header-scrolled', window.scrollY > 35);
  window.addEventListener('scroll', syncHeader, {passive: true});
  syncHeader();

  document.querySelectorAll('.waslivo-process-timeline').forEach(timeline => {
    const steps = [...timeline.querySelectorAll('.waslivo-process-step')];
    const centered = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? centered.add(entry.target) : centered.delete(entry.target));
      if (!centered.size) return;
      const center = window.innerHeight / 2;
      const active = [...centered].reduce((best, step) => {
        const rect = step.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        return distance < best.distance ? {step, distance} : best;
      }, {step: null, distance: Infinity}).step;
      steps.forEach(step => {
        const selected = step === active;
        step.classList.toggle('is-active', selected);
        if (selected) step.setAttribute('aria-current', 'step');
        else step.removeAttribute('aria-current');
      });
    }, {rootMargin: '-35% 0px -35% 0px', threshold: 0});
    steps.forEach(step => observer.observe(step));
  });

  const digitMap = '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹';
  const latinDigits = value => value.replace(/[٠-٩۰-۹]/g, char => String(digitMap.indexOf(char) % 10));
  const normalizePhone = value => {
    let phone = latinDigits(value).replace(/[\s().-]/g, '');
    if (/^05\d{8}$/.test(phone)) return `+966${phone.slice(1)}`;
    if (/^5\d{8}$/.test(phone)) return `+966${phone}`;
    if (/^9665\d{8}$/.test(phone)) return `+${phone}`;
    if (/^009665\d{8}$/.test(phone)) return `+${phone.slice(2)}`;
    if (/^00\d{8,15}$/.test(phone)) phone = `+${phone.slice(2)}`;
    return /^\+\d{8,15}$/.test(phone) ? phone : null;
  };
  const fields = {
    fullName: {input: form.elements.fullName, error: document.getElementById('name-error')},
    phone: {input: form.elements.phone, error: document.getElementById('phone-error')},
    businessActivity: {input: form.elements.businessActivity, error: document.getElementById('business-error')},
  };
  const setFieldError = (key, text) => {
    fields[key].error.textContent = text;
    fields[key].input.setAttribute('aria-invalid', text ? 'true' : 'false');
  };
  Object.keys(fields).forEach(key => fields[key].input.addEventListener('input', () => setFieldError(key, '')));
  const setMessage = (text, kind = '') => { message.textContent = text; message.className = `form-message ${kind}`; };
  const requestId = crypto.randomUUID();

  const syncSticky = () => {
    const show = formCard.getBoundingClientRect().bottom < 0 && window.matchMedia('(max-width: 700px)').matches;
    sticky.hidden = !show;
    document.body.classList.toggle('sticky-visible', show);
  };
  const observer = new IntersectionObserver(syncSticky, {threshold: 0.1});
  observer.observe(formCard);
  window.addEventListener('scroll', syncSticky, {passive: true});
  window.addEventListener('resize', syncSticky);
  syncSticky();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitButton.disabled) return;
    setMessage('');
    const fullName = fields.fullName.input.value.trim().replace(/\s+/g, ' ');
    const phone = normalizePhone(fields.phone.input.value);
    const businessActivity = fields.businessActivity.input.value.trim().replace(/\s+/g, ' ');
    setFieldError('fullName', fullName.length < 2 ? 'اكتب اسمك الكامل.' : '');
    setFieldError('phone', !phone ? 'اكتب رقم جوال صحيحاً، مثل 0551234567.' : '');
    setFieldError('businessActivity', businessActivity.length < 2 ? 'اكتب نوع نشاطك.' : '');
    const invalid = Object.values(fields).find(field => field.error.textContent);
    if (invalid) { invalid.input.focus(); return; }
    if (form.elements.website.value) return;
    if (!leadEndpoint) {
      setMessage('استقبال الطلبات غير متاح مؤقتاً. حاول لاحقاً.', 'error');
      return;
    }

    const params = new URLSearchParams(location.search);
    const utm = key => params.get(key)?.slice(0, 200) || '';
    const payload = {
      requestId,
      fullName, phone, businessActivity,
      timestamp: new Date().toISOString(),
      source: utm('utm_source'),
      utm_source: utm('utm_source'),
      utm_medium: utm('utm_medium'),
      utm_campaign: utm('utm_campaign'),
      utm_content: utm('utm_content'),
      utm_term: utm('utm_term'),
      page_url: location.href,
      referrer: document.referrer || '',
      website: '',
    };
    submitButton.disabled = true;
    submitButton.textContent = 'جاري إرسال طلبك...';
    try {
      const result = await submitToSheet(payload);
      if (result.success !== true) throw new Error('Submission not confirmed');
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', {service: 'website_design', market: 'saudi_arabia'});
      if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track('SubmitForm', {service: 'website_design'});
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({event: 'lead_form_submit', service: 'website_design', market: 'saudi_arabia'});
      sessionStorage.setItem('waslivo_website_offer_submitted', '1');
      location.assign('/website-offer/thank-you/');
    } catch {
      setMessage('صار خطأ بسيط، حاول مرة ثانية.', 'error');
      submitButton.disabled = false;
      submitButton.innerHTML = 'احصل على عرض مجاني لمشروعك <span aria-hidden="true">↗</span>';
    }
  });

  function submitToSheet(payload) {
    return new Promise((resolve, reject) => {
      const frame = document.createElement('iframe');
      const frameName = `waslivo-lead-${payload.requestId}`;
      frame.name = frameName;
      frame.title = 'إرسال طلب الموقع';
      frame.hidden = true;
      document.body.append(frame);
      const postForm = document.createElement('form');
      postForm.method = 'POST';
      postForm.action = leadEndpoint;
      postForm.target = frameName;
      postForm.hidden = true;
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'payload';
      input.value = JSON.stringify(payload);
      postForm.append(input);
      document.body.append(postForm);
      let done = false;
      const cleanup = () => {
        clearTimeout(timer);
        window.removeEventListener('message', onMessage);
        postForm.remove();
        frame.remove();
      };
      const onMessage = event => {
        const data = event.data;
        if (!data || data.type !== 'waslivo-lead-result' || data.requestId !== payload.requestId || done) return;
        done = true;
        cleanup();
        resolve(data);
      };
      const timer = setTimeout(() => {
        if (done) return;
        done = true;
        cleanup();
        reject(new Error('Submission timeout'));
      }, 25000);
      window.addEventListener('message', onMessage);
      postForm.submit();
    });
  }
})();
