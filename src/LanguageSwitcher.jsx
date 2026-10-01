export default function LanguageSwitcher({ path = '/', english = false }) {
  const englishPath = `/en${path === '/' ? '' : path}`
  return <div className="language-switch" role="group" aria-label={english ? 'Language' : 'اللغة'} dir="ltr">
    <a href={englishPath} lang="en" className={english ? 'active' : ''} aria-current={english ? 'page' : undefined} aria-label={english ? 'English, current language' : 'Switch to English'}>EN</a>
    <span className="language-divider" aria-hidden="true">|</span>
    <a href={path} lang="ar" className={english ? '' : 'active'} aria-current={english ? undefined : 'page'} aria-label={english ? 'Switch to Arabic' : 'العربية، اللغة الحالية'}>AR</a>
  </div>
}
