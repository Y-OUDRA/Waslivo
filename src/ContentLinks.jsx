const projectServices = {
  automotive: 'websites', education: 'development', ecommerce: 'commerce', restaurant: 'websites',
  dental: 'websites', property: 'development', 'facilities-services': 'websites',
  'beauty-store': 'commerce', 'interior-design': 'websites', 'resort-hotel': 'websites',
}
const articleServices = {
  'website-brief': 'websites', 'brand-site': 'identity', 'mobile-first': 'websites',
}
const articleMarkets = { 'website-brief': 'sa', 'brand-site': 'ae', 'mobile-first': 'ma' }

export function ProjectServiceLink({ id, english = false }) {
  const service = projectServices[id]
  if (!service) return null
  const names = english
    ? { websites: 'Website design', development: 'Custom website development', commerce: 'E-commerce websites' }
    : { websites: 'تصميم المواقع الإلكترونية', development: 'تطوير المواقع المخصصة', commerce: 'تصميم المتاجر الإلكترونية' }
  return <section className="container content-context-link"><h2>{english ? 'Planning a similar website?' : 'تخطط لموقع مشابه؟'}</h2><p>{english ? 'This is an illustrative design concept. Learn how we scope a service for your own business.' : 'هذا نموذج تصميمي توضيحي. تعرّف على طريقة تحديد الخدمة المناسبة لمشروعك.'}</p><a href={`${english ? '/en' : ''}/services/${service}`}>{names[service]}</a></section>
}

export function ArticleContextLinks({ id, english = false }) {
  const service = articleServices[id]
  const market = articleMarkets[id]
  const serviceNames = english
    ? { websites: 'Website design service', identity: 'Visual identity service' }
    : { websites: 'خدمة تصميم المواقع', identity: 'خدمة الهوية البصرية' }
  const marketNames = english
    ? { sa: 'Websites for Saudi Arabia', ae: 'Websites for the UAE', ma: 'Websites for Morocco' }
    : { sa: 'تصميم مواقع للسعودية', ae: 'تصميم مواقع للإمارات', ma: 'إنشاء مواقع للمغرب' }
  return <nav className="content-context-link" aria-label={english ? 'Related guides' : 'روابط ذات صلة'}>
    <h2>{english ? 'Put these ideas to work' : 'طبّق هذه الأفكار على مشروعك'}</h2>
    <div><a href={`${english ? '/en' : ''}/services/${service}`}>{serviceNames[service]}</a><a href={`${english ? '/en' : ''}/${market}`}>{marketNames[market]}</a></div>
  </nav>
}
