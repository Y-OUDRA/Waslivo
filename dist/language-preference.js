document.addEventListener('click', (event) => {
  const link = event.target.closest('.language-switch a[lang], .campaign-lang a[lang]');
  if (!link || !['ar', 'en', 'fr'].includes(link.lang)) return;
  document.cookie = `waslivo_lang=${link.lang}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
});
