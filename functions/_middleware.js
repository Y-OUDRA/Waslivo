// Keep the Arabic URLs as the canonical entry points. Visitors arriving there
// get the matching translation; explicit /en and /fr URLs stay untouched.
const arabicCountries = new Set([
  'AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KM', 'KW', 'LB', 'LY', 'MA',
  'MR', 'OM', 'PS', 'QA', 'SA', 'SD', 'SO', 'SY', 'TN', 'YE', 'DJ',
]);
const frenchCountries = new Set([
  'FR', 'MC', 'LU', 'SN', 'CI', 'BF', 'BJ', 'TG', 'GN', 'ML', 'NE',
  'CD', 'CG', 'GA', 'CF', 'TD', 'MG', 'HT', 'RW', 'BI', 'MU', 'SC',
]);
const multilingualCountries = new Set(['BE', 'CH', 'CA']);
const manualPreference = cookie => {
  const match = cookie.match(/(?:^|;\s*)waslivo_lang=(ar|en|fr)(?:;|$)/);
  return match?.[1];
};

export function preferredLanguage(request) {
  const selected = manualPreference(request.headers.get('Cookie') || '');
  if (selected) return selected;
  const country = request.cf?.country?.toUpperCase();
  if (!country || country === 'XX' || country === 'T1') return 'ar';
  if (arabicCountries.has(country)) return 'ar';
  if (frenchCountries.has(country)) return 'fr';
  if (multilingualCountries.has(country)) {
    return /^fr(?:-|,|;|$)/i.test(request.headers.get('Accept-Language') || '') ? 'fr' : 'en';
  }
  return 'en';
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method !== 'GET' && request.method !== 'HEAD') return context.next();
  if (/(?:googlebot|bingbot|duckduckbot|slurp|yandexbot|baiduspider|facebookexternalhit|twitterbot)/i.test(request.headers.get('User-Agent') || '')) return context.next();
  const url = new URL(request.url);
  const path = url.pathname;
  if (path.startsWith('/en/') || path === '/en' || path.startsWith('/fr/') || path === '/fr' ||
      path.startsWith('/website-offer/thank-you/') || /\.[a-z0-9]+$/i.test(path)) return context.next();
  const lang = preferredLanguage(request);
  if (lang === 'ar') return context.next();
  url.pathname = `/${lang}${path === '/' ? '/' : path}`;
  return new Response(null, {
    status: 302,
    headers: { Location: url.toString(), 'Cache-Control': 'private, no-store', Vary: 'Cookie, Accept-Language' },
  });
}
