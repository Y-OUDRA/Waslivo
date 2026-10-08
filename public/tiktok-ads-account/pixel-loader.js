(() => {
  'use strict';
  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    const script = document.createElement('script');
    script.src = '/website-offer/tiktok-pixel.js?v=20261006a';
    script.async = true;
    document.head.append(script);
  };

  // Keep conversion tracking ready while letting the form and page render first.
  if (location.pathname.includes('/thank-you/')) {
    load();
    return;
  }

  for (const event of ['pointerdown', 'keydown', 'touchstart', 'scroll']) {
    addEventListener(event, load, { once: true, passive: true });
  }
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 1800 });
  else setTimeout(load, 1200);
})();
