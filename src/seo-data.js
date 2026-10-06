import { articles, projects, services } from './v2-data'
import { enArticles, enProjects, enServices } from './english-data'
import { frArticles, frProjects, frServices } from './french-data'
import { marketCodes, markets } from './market-data'
import { site } from './site-config'

export const SITE_URL = site.url
const logo = `${SITE_URL}${site.logo}`
const defaultImage = `${SITE_URL}/assets/visuals/hero-main.webp`
const socialProfiles = Object.values(site.social)
const arPages = {
  '/': ['تصميم وتطوير مواقع إلكترونية احترافية | وصليفو', 'وصليفو تصمم وتطوّر مواقع إلكترونية ومتاجر رقمية بهوية تناسب أعمالك، مع تجربة واضحة ومتجاوبة ودعم بعد الإطلاق.'],
  '/services': ['خدمات تصميم وتطوير المواقع والهوية | وصليفو', 'اكتشف خدمات وصليفو في تصميم المواقع وتطويرها، المتاجر الإلكترونية، تطبيقات الجوال، الشعارات والهوية البصرية.'],
  '/portfolio': ['أعمالنا ونماذج تصميم المواقع | وصليفو', 'تصفح نماذج وصليفو لتصميم وتطوير مواقع في العقارات والمطاعم والتعليم والعيادات والتجارة الإلكترونية وغيرها.'],
  '/about': ['من نحن وطريقة عملنا | وصليفو', 'تعرف على وصليفو وطريقتها في تحويل أفكار الأعمال إلى مواقع وتجارب رقمية واضحة وعملية.'],
  '/packages': ['باقات تصميم المواقع الإلكترونية | وصليفو', 'باقات مرنة لتصميم وتطوير موقعك الإلكتروني، تبدأ بفهم احتياجاتك وتحديد نطاق العمل والسعر بعد مناقشة المشروع.'],
  '/contact': ['تواصل مع وصليفو لمناقشة مشروعك', 'أخبر وصليفو عن فكرتك أو مشروعك الإلكتروني عبر واتساب أو نموذج التواصل للحصول على عرض يناسب احتياجاتك.'],
  '/blog': ['مقالات عن تصميم المواقع والهوية الرقمية | وصليفو', 'أفكار عملية من وصليفو عن تخطيط المواقع وتصميم الهوية الرقمية وتجربة المستخدم على الجوال.'],
  '/privacy': ['سياسة الخصوصية | وصليفو', 'تعرف على طريقة عمل نموذج التواصل في موقع وصليفو وكيفية مراجعة رسالة واتساب قبل إرسالها.'],
  '/terms': ['الشروط والأحكام | وصليفو', 'اطلع على شروط استخدام موقع وصليفو وطريقة تحديد نطاق المشاريع ومخرجاتها وجدولها وأسعارها.'],
}
const enPages = {
  '/': ['Website Design & Development | WASLIVO', 'WASLIVO designs and develops professional websites, online stores, and digital experiences that reflect your business and work across devices.'],
  '/services': ['Website Design, Development & Branding Services | WASLIVO', 'Explore WASLIVO services for website design, custom development, e-commerce, mobile apps, logos, and brand identity.'],
  '/portfolio': ['Website Design Portfolio & Concepts | WASLIVO', 'Explore WASLIVO website concepts for real estate, restaurants, education, clinics, e-commerce, and other industries.'],
  '/about': ['About WASLIVO | Digital Design Studio', 'Learn how WASLIVO combines business goals, clear content, design, and development to create useful digital experiences.'],
  '/packages': ['Website Design Packages | WASLIVO', 'Explore flexible website design and development packages. We define the scope and final price after discussing your project needs.'],
  '/contact': ['Contact WASLIVO About Your Project', 'Tell WASLIVO about your website or digital project through WhatsApp or the contact form to discuss the right next step.'],
  '/blog': ['Website Design & Digital Identity Articles | WASLIVO', 'Read practical WASLIVO articles about planning a website, strengthening your digital identity, and improving mobile usability.'],
  '/privacy': ['Privacy Policy | WASLIVO', 'Learn how the WASLIVO contact form prepares a WhatsApp message for you to review before sending.'],
  '/terms': ['Terms & Conditions | WASLIVO', 'Read the WASLIVO website terms and how project scope, deliverables, timing, and pricing are agreed.'],
}
const frPages = {
  '/': ['Création de sites web et développement | WASLIVO', 'WASLIVO conçoit des sites web, boutiques en ligne et expériences numériques adaptés à votre activité et à tous les écrans.'],
  '/services': ['Création de sites, développement et identité | WASLIVO', 'Découvrez nos services de création de sites web, développement sur mesure, e-commerce, applications et identité de marque.'],
  '/portfolio': ['Réalisations et concepts de sites web | WASLIVO', 'Explorez nos concepts de sites pour l’immobilier, la restauration, l’éducation, la santé et le commerce en ligne.'],
  '/about': ['À propos de WASLIVO | Studio numérique', 'Découvrez comment WASLIVO associe les objectifs de votre activité, le contenu, le design et le développement.'],
  '/packages': ['Forfaits de création de sites web | WASLIVO', 'Des forfaits flexibles de création de sites. Nous définissons le périmètre et le prix final après discussion de vos besoins.'],
  '/contact': ['Contacter WASLIVO pour votre projet', 'Présentez votre projet de site ou votre idée numérique à WASLIVO par WhatsApp ou avec le formulaire de contact.'],
  '/blog': ['Articles sur la création de sites et le design | WASLIVO', 'Des conseils pratiques sur la planification d’un site, l’identité numérique et l’expérience mobile.'],
  '/privacy': ['Politique de confidentialité | WASLIVO', 'Découvrez comment les formulaires de WASLIVO utilisent vos données de contact pour donner suite à votre demande.'],
  '/terms': ['Conditions générales | WASLIVO', 'Consultez les conditions de WASLIVO et la manière dont le périmètre, les livrables et les prix sont convenus.'],
}

export const indexablePaths = [
  ...Object.keys(arPages),
  ...services.map(item => `/services/${item.id}`),
  ...projects.map(item => `/portfolio/${item.id}`),
  ...articles.map(item => `/blog/${item.id}`),
  ...marketCodes.map(code => `/${code}`),
].flatMap(path => [path, path === '/' ? '/en' : `/en${path}`, path === '/' ? '/fr' : `/fr${path}`])

export function getSeo(path) {
  const normalized = path.replace(/\/$/, '') || '/'
  const english = normalized === '/en' || normalized.startsWith('/en/')
  const french = normalized === '/fr' || normalized.startsWith('/fr/')
  const localPath = english || french ? normalized.replace(/^\/(en|fr)(?=\/|$)/, '') || '/' : normalized
  const lang = french ? 'fr' : english ? 'en' : 'ar'
  const table = french ? frPages : english ? enPages : arPages
  let [title, description] = table[localPath] || []
  let image = defaultImage
  let kind = 'page'
  let parent = null
  let entity = null
  const contentProjects = french ? frProjects : english ? enProjects : projects
  const contentServices = french ? frServices : english ? enServices : services
  const contentArticles = french ? frArticles : english ? enArticles : articles
  const marketCode = localPath.slice(1)
  if (markets[marketCode]) {
    entity = markets[marketCode]
    const copy = french ? null : entity[lang]
    title = french ? `Création de sites web pour les entreprises en ${({sa:'Arabie saoudite',ae:'Émirats arabes unis',kw:'Koweït',qa:'Qatar',ma:'Maroc'})[marketCode]} | WASLIVO` : copy.title
    description = french ? `WASLIVO conçoit des sites web clairs et adaptés au mobile pour les entreprises qui s’adressent aux clients en ${({sa:'Arabie saoudite',ae:'Émirats arabes unis',kw:'Koweït',qa:'Qatar',ma:'Maroc'})[marketCode]}.` : copy.description
    kind = 'market'
  } else if (localPath.startsWith('/portfolio/')) {
    entity = contentProjects.find(item => localPath === `/portfolio/${item.id}`)
    if (entity) {
      title = `${entity.title} | ${french ? 'Réalisations WASLIVO' : english ? 'WASLIVO Portfolio' : 'أعمال وصليفو'}`
      description = entity.summary
      image = `${SITE_URL}${entity.previewImage || entity.images.desktop}`
      kind = 'project'
      parent = '/portfolio'
    }
  } else if (localPath.startsWith('/services/')) {
    entity = contentServices.find(item => localPath === `/services/${item.id}`)
    if (entity) {
      title = `${entity.title} | ${english || french ? 'WASLIVO' : 'وصليفو'}`
      description = entity.detail || entity.short
      image = `${SITE_URL}/assets/${entity.image}`
      kind = 'service'
      parent = '/services'
    }
  } else if (localPath.startsWith('/blog/')) {
    entity = contentArticles.find(item => localPath === `/blog/${item.id}`)
    if (entity) {
      title = `${entity.title} | ${english || french ? 'WASLIVO' : 'وصليفو'}`
      description = entity.intro
      const index = contentArticles.findIndex(item => item.id === entity.id)
      image = `${SITE_URL}/assets/${['visuals/blog-brief.webp', 'visuals/blog-brand.webp', 'visuals/blog-mobile.webp'][index]}`
      kind = 'article'
      parent = '/blog'
    }
  }
  if (!title) return null
  const url = `${SITE_URL}${normalized === '/' ? '/' : normalized}`
  const arUrl = `${SITE_URL}${localPath === '/' ? '/' : localPath}`
  const enUrl = `${SITE_URL}/en${localPath === '/' ? '' : localPath}`
  const frUrl = `${SITE_URL}/fr${localPath === '/' ? '' : localPath}`
  const hreflangs = kind === 'market'
    ? [[`ar-${entity.region}`, arUrl], [`en-${entity.region}`, enUrl], ['fr', frUrl], ['x-default', arUrl]]
    : [['ar', arUrl], ['en', enUrl], ['fr', frUrl], ['x-default', arUrl]]
  return { path: normalized, localPath, lang, title, description, image, url, arUrl, enUrl, frUrl, hreflangs, kind, parent, entity }
}

export function getStructuredData(seo) {
  const organization = {
    '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: site.name, alternateName: site.arabicName,
    url: `${SITE_URL}/`, logo, description: 'Website design, development and digital identity studio.',
    contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'customer service', availableLanguage: ['Arabic', 'English', 'French'] },
    sameAs: socialProfiles,
  }
  const webpage = {
    '@type': 'WebPage', '@id': `${seo.url}#webpage`, url: seo.url, name: seo.title,
    description: seo.description, inLanguage: seo.lang, isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': organization['@id'] },
  }
  const graph = [webpage]
  if (seo.localPath === '/' || seo.localPath === '/about') graph.unshift(organization)
  if (seo.localPath === '/') graph.push({
    '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'WASLIVO',
    alternateName: 'وصليفو', publisher: { '@id': organization['@id'] }, inLanguage: ['ar', 'en', 'fr'],
  })
  if (seo.parent) {
    const localParent = seo.parent
    const parentPath = seo.lang === 'ar' ? localParent : `/${seo.lang}${localParent}`
    const parentSeo = getSeo(parentPath)
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${seo.url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: seo.lang === 'fr' ? 'Accueil' : seo.lang === 'en' ? 'Home' : 'الرئيسية', item: seo.lang === 'ar' ? `${SITE_URL}/` : `${SITE_URL}/${seo.lang}` },
        { '@type': 'ListItem', position: 2, name: parentSeo.title.split(' | ')[0], item: parentSeo.url },
        { '@type': 'ListItem', position: 3, name: seo.entity.title, item: seo.url },
      ],
    })
  }
  if (seo.kind === 'service') graph.push({
    '@type': 'Service', '@id': `${seo.url}#service`, name: seo.entity.title,
    description: seo.description, url: seo.url, provider: { '@id': organization['@id'] },
  })
  if (seo.kind === 'market') {
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${seo.url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: seo.lang === 'fr' ? 'Accueil' : seo.lang === 'en' ? 'Home' : 'الرئيسية', item: seo.lang === 'ar' ? `${SITE_URL}/` : `${SITE_URL}/${seo.lang}` },
        { '@type': 'ListItem', position: 2, name: seo.lang === 'fr' ? seo.title.split(' | ')[0] : seo.lang === 'en' ? seo.entity.country : seo.entity.countryAr, item: seo.url },
      ],
    })
    graph.push({
      '@type': 'Service', '@id': `${seo.url}#service`, name: seo.lang === 'fr' ? seo.title.split(' | ')[0] : seo.entity[seo.lang].h1,
      description: seo.description, url: seo.url, provider: { '@id': organization['@id'] },
      areaServed: { '@type': 'Country', name: seo.entity.country },
    })
  }
  if (seo.kind === 'article') graph.push({
    '@type': 'Article', '@id': `${seo.url}#article`, headline: seo.entity.title,
    description: seo.description, image: seo.image, inLanguage: seo.lang,
    mainEntityOfPage: { '@id': webpage['@id'] }, author: { '@id': organization['@id'] },
  })
  return { '@context': 'https://schema.org', '@graph': graph }
}
