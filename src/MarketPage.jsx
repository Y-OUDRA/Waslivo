import { markets, marketCodes } from './market-data'
import { projects, services, whatsapp } from './v2-data'
import { enProjects, enServices } from './english-data'
import './market-page.css'

const serviceIds = ['websites', 'development', 'commerce', 'apps']
const route = (path, english) => `${english ? '/en' : ''}${path}`

export default function MarketPage({ code, english = false }) {
  const market = markets[code]
  if (!market) return null
  const copy = market[english ? 'en' : 'ar']
  const catalog = english ? enServices : services
  const portfolio = english ? enProjects : projects
  const label = english ? market.country : market.countryAr
  const enquiry = english
    ? `Hello WASLIVO, I would like to discuss a website for customers in ${market.country}.`
    : `مرحباً وصليفو، أود مناقشة موقع إلكتروني يخدم عملاء في ${market.countryAr}.`

  return <div className="market-page">
    <section className="market-hero">
      <div className="container">
        <nav className="market-breadcrumb" aria-label={english ? 'Breadcrumb' : 'مسار الصفحة'}>
          <a href={route('/', english)}>{english ? 'Home' : 'الرئيسية'}</a><span aria-hidden="true">/</span><span>{label}</span>
        </nav>
        <span className="eyebrow">{english ? 'Websites for your audience' : 'مواقع تناسب جمهورك'}</span>
        <h1>{copy.h1}</h1>
        <p>{copy.intro}</p>
        <div className="market-actions">
          <a className="button button-gold" href={whatsapp(enquiry)} target="_blank" rel="noopener noreferrer">{english ? 'Discuss your project' : 'ناقش مشروعك معنا'}</a>
          <a className="button button-outline" href={route('/portfolio', english)}>{english ? 'Explore our concepts' : 'شاهد نماذج الأعمال'}</a>
        </div>
      </div>
    </section>
    <section className="section container market-explainer">
      <div><h2>{copy.focusTitle}</h2><p>{copy.focus}</p></div>
      <div><h2>{copy.approachTitle}</h2><p>{copy.approach}</p></div>
    </section>
    <section className="section market-services"><div className="container">
      <h2>{english ? `Services for businesses serving ${label}` : `خدمات تناسب مشاريع تستهدف ${label}`}</h2>
      <div className="market-link-grid">{serviceIds.map(id => {
        const service = catalog.find(item => item.id === id)
        return <a key={id} href={route(`/services/${id}`, english)}><strong>{service.title}</strong><span>{service.short}</span></a>
      })}</div>
    </div></section>
    <section className="section container market-projects">
      <h2>{english ? 'Relevant design concepts' : 'نماذج تصميمية ذات صلة'}</h2>
      <p>{english ? 'These are illustrative concepts, not claims of completed client work.' : 'هذه تصوّرات تصميمية توضيحية، وليست ادعاءً بتنفيذ مشاريع لعملاء.'}</p>
      <div className="market-link-grid">{copy.projects.map(id => {
        const project = portfolio.find(item => item.id === id)
        return <a key={id} href={route(`/portfolio/${id}`, english)}><strong>{project.title}</strong><span>{project.summary}</span></a>
      })}</div>
    </section>
    <section className="section market-faq"><div className="container">
      <h2>{english ? 'Common questions' : 'أسئلة شائعة'}</h2>
      {copy.faq.map(([question, answer]) => <div className="market-answer" key={question}><h3>{question}</h3><p>{answer}</p></div>)}
      <p className="market-closing">{english ? 'Tell us what your business offers, which audience it serves, and what visitors should do next.' : 'أخبرنا عن نشاطك وجمهورك والخطوة التي تريد من الزائر اتخاذها، لنحدد معاً نطاق الموقع المناسب.'}</p>
      <a className="button button-gold" href={route('/contact', english)}>{english ? 'Contact WASLIVO' : 'تواصل مع وصليفو'}</a>
    </div></section>
  </div>
}

export function MarketLinks({ english = false }) {
  return <nav className="market-links" aria-label={english ? 'Markets served' : 'الأسواق التي نخدمها'}>
    <span>{english ? 'Websites for your market' : 'مواقع تناسب سوقك'}</span>
    <div>{marketCodes.map(code => <a key={code} href={route(`/${code}`, english)}>{english ? markets[code].country : markets[code].countryAr}</a>)}</div>
  </nav>
}
