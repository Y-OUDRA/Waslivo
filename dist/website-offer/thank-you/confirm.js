(() => {
  'use strict';

  const leadEndpoint = 'https://script.google.com/macros/s/AKfycby02V_kAjWMqVcmCfQNqFEBv17g2yudAUU06c1W0jQ6q6el5eFcHIMbhUeMQAKmCWhJIw/exec';
  const pendingKey = 'waslivo_website_offer_pending';
  const submittedKey = 'waslivo_website_offer_submitted';
  const mark = document.getElementById('status-mark');
  const heading = document.getElementById('status-heading');
  const description = document.getElementById('status-description');
  const retryButton = document.getElementById('retry-button');
  const whatsappButton = document.getElementById('thank-you-whatsapp');
  let sending = false;

  const showSuccess = () => {
    mark.className = 'mark';
    mark.textContent = '✓';
    heading.textContent = 'تم استلام طلبك';
    description.textContent = 'شكراً لك! سنتواصل معك عبر واتساب لمناقشة تفاصيل إنشاء موقعك والخطوة التالية.';
    retryButton.hidden = true;
    whatsappButton.hidden = false;
  };
  const showError = () => {
    mark.className = 'mark error';
    mark.textContent = '!';
    heading.textContent = 'تعذّر تأكيد طلبك';
    description.textContent = 'لم نتأكد من حفظ بياناتك. اضغط إعادة المحاولة، أو تواصل معنا عبر واتساب.';
    retryButton.hidden = false;
    whatsappButton.hidden = false;
  };
  const showPending = () => {
    mark.className = 'mark pending';
    mark.textContent = '';
    heading.textContent = 'جاري تأكيد طلبك';
    description.textContent = 'نحفظ بياناتك الآن. ستظهر رسالة التأكيد بعد وصول الطلب.';
    retryButton.hidden = true;
    whatsappButton.hidden = true;
  };

  const submitToSheet = payload => new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    frame.name = `waslivo-lead-${payload.requestId}`;
    frame.title = 'تأكيد طلب الموقع';
    frame.hidden = true;
    document.body.append(frame);
    const postForm = document.createElement('form');
    postForm.method = 'POST';
    postForm.action = leadEndpoint;
    postForm.target = frame.name;
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

  const confirmLead = async () => {
    if (sending) return;
    const raw = sessionStorage.getItem(pendingKey);
    if (!raw) { showSuccess(); return; }
    let payload;
    try { payload = JSON.parse(raw); } catch { showError(); return; }
    if (!payload || !/^[a-f0-9-]{36}$/.test(payload.requestId || '')) { showError(); return; }
    sending = true;
    showPending();
    const slowTimer = setTimeout(() => {
      description.textContent = 'ما زلنا نؤكد وصول طلبك، شكراً على انتظارك.';
    }, 7000);
    try {
      const result = await submitToSheet(payload);
      if (result.success !== true) throw new Error('Submission not confirmed');
      sessionStorage.removeItem(pendingKey);
      sessionStorage.setItem(submittedKey, '1');
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', {service: 'website_design', market: 'saudi_arabia'});
      if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track('SubmitForm', {service: 'website_design'});
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({event: 'lead_form_submit', service: 'website_design', market: 'saudi_arabia'});
      showSuccess();
    } catch {
      showError();
    } finally {
      clearTimeout(slowTimer);
      sending = false;
    }
  };

  retryButton.addEventListener('click', confirmLead);
  if (document.documentElement.dataset.leadConfirmed === 'true' ||
      (location.hostname === '127.0.0.1' && new URLSearchParams(location.search).get('preview') === '1' && !sessionStorage.getItem(pendingKey))) {
    showSuccess();
  } else {
    confirmLead();
  }
})();
