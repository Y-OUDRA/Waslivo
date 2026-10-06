(() => {
  'use strict';

  const leadEndpoint = 'https://script.google.com/macros/s/AKfycby02V_kAjWMqVcmCfQNqFEBv17g2yudAUU06c1W0jQ6q6el5eFcHIMbhUeMQAKmCWhJIw/exec';
  const lang = ['en', 'fr'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ar';
  const copy = {
    ar: {success:'تم استلام طلبك', successDetail:'شكراً لك! سنتواصل معك عبر واتساب لمناقشة تفاصيل إنشاء موقعك والخطوة التالية.', error:'تعذّر تأكيد طلبك', errorDetail:'لم نتأكد من حفظ بياناتك. اضغط إعادة المحاولة، أو تواصل معنا عبر واتساب.', pending:'جاري تأكيد طلبك', pendingDetail:'نحفظ بياناتك الآن. ستظهر رسالة التأكيد بعد وصول الطلب.', waiting:'ما زلنا نؤكد وصول طلبك، شكراً على انتظارك.', frame:'تأكيد طلب الموقع'},
    en: {success:'We received your request', successDetail:'Thank you! We will contact you on WhatsApp to discuss your website and the next steps.', error:'We could not confirm your request', errorDetail:'We could not verify that your details were saved. Try again or contact us on WhatsApp.', pending:'Confirming your request', pendingDetail:'We are saving your details. Confirmation will appear when your request arrives.', waiting:'We are still confirming your request. Thank you for waiting.', frame:'Confirm website request'},
    fr: {success:'Nous avons reçu votre demande', successDetail:'Merci ! Nous vous contacterons sur WhatsApp pour discuter de votre site et des prochaines étapes.', error:'Impossible de confirmer votre demande', errorDetail:'Nous n’avons pas pu vérifier l’enregistrement de vos données. Réessayez ou contactez-nous sur WhatsApp.', pending:'Confirmation de votre demande', pendingDetail:'Nous enregistrons vos données. La confirmation apparaîtra dès réception de votre demande.', waiting:'Nous vérifions toujours votre demande. Merci de patienter.', frame:'Confirmer la demande de site'}
  }[lang];
  const pendingKey = 'waslivo_website_offer_pending';
  const submittedKey = 'waslivo_website_offer_submitted';
  const mark = document.getElementById('status-mark');
  const heading = document.getElementById('status-heading');
  const description = document.getElementById('status-description');
  const retryButton = document.getElementById('retry-button');
  const successActions = document.getElementById('thank-you-actions');
  let sending = false;

  const showSuccess = () => {
    mark.className = 'mark';
    mark.textContent = '✓';
    heading.textContent = copy.success;
    description.textContent = copy.successDetail;
    retryButton.hidden = true;
    successActions.hidden = false;
  };
  const showError = () => {
    mark.className = 'mark error';
    mark.textContent = '!';
    heading.textContent = copy.error;
    description.textContent = copy.errorDetail;
    retryButton.hidden = false;
    successActions.hidden = true;
  };
  const showPending = () => {
    mark.className = 'mark pending';
    mark.textContent = '';
    heading.textContent = copy.pending;
    description.textContent = copy.pendingDetail;
    retryButton.hidden = true;
    successActions.hidden = true;
  };

  const submitToSheet = payload => new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    frame.name = `waslivo-lead-${payload.requestId}`;
    frame.title = copy.frame;
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
      description.textContent = copy.waiting;
    }, 7000);
    try {
      const result = await submitToSheet(payload);
      if (result.success !== true) throw new Error('Submission not confirmed');
      sessionStorage.removeItem(pendingKey);
      sessionStorage.setItem(submittedKey, '1');
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', {service: 'website_design', market: 'saudi_arabia'});
      if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track('Lead', {service: 'website_design'});
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
