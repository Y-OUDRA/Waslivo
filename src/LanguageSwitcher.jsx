export default function LanguageSwitcher({ path = '/', english = false, lang = english ? 'en' : 'ar' }) {
  const localPath = path.replace(/^\/(en|fr)(?=\/|$)/, '') || '/'
  const localized = code => code === 'ar' ? localPath : `/${code}${localPath === '/' ? '' : localPath}`
  const labels = { ar: 'العربية', en: 'English', fr: 'Français' }
  const current = { ar: 'اللغة الحالية', en: 'current language', fr: 'langue actuelle' }
  return <div className="language-switch" role="group" aria-label={lang === 'ar' ? 'اللغة' : lang === 'fr' ? 'Langue' : 'Language'} dir="ltr">
    {['en', 'ar', 'fr'].map((code, index) => <span className="language-option" key={code}>
      {index > 0 && <span className="language-divider" aria-hidden="true">|</span>}
      <a href={localized(code)} lang={code} className={lang === code ? 'active' : ''} aria-current={lang === code ? 'page' : undefined} aria-label={`${labels[code]}${lang === code ? ` — ${current[lang]}` : ''}`}>{code.toUpperCase()}</a>
    </span>)}
  </div>
}
