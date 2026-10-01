import { projects, services } from './v2-data'
import { enProjects, enServices } from './english-data'
import { MarketLinks } from './MarketPage'

const content = {
  websites: {
    projects: ['property', 'dental', 'restaurant'],
    ar: [
      ['ما الذي تحتاجه قبل تصميم موقع إلكتروني؟', 'ابدأ بهدف الموقع، والخدمات التي تريد شرحها، وصور تملك حق استخدامها، ووسيلة التواصل التي تفضلها. نساعدك على ترتيب هذه العناصر قبل تصميم الصفحات.'],
      ['كم تكلفة تصميم موقع إلكتروني؟', 'تبدأ باقات وصليفو من 799 ريال. يختلف السعر النهائي بحسب عدد الصفحات والمحتوى والوظائف المطلوبة، ونحدده بعد مناقشة نطاق المشروع.'],
      ['هل سيكون الموقع متوافقاً مع الهاتف؟', 'نعم. نراجع التخطيط وحجم النصوص والأزرار على شاشات مختلفة قبل الإطلاق.'],
    ],
    en: [
      ['What do we need before designing a website?', 'Start with the website goal, your services, images you can use, and the contact path you prefer. We help organize these before designing the pages.'],
      ['How much does a website cost?', 'WASLIVO packages start at 799 SAR. The final price depends on the pages, content, and features, and is agreed after we define the scope.'],
      ['Will the site work on mobile?', 'Yes. We review layouts, text, and touch targets across screen sizes before launch.'],
    ],
  },
  development: {
    projects: ['education', 'property', 'facilities-services'],
    ar: [
      ['متى أحتاج إلى تطوير موقع مخصص؟', 'عندما يتطلب مشروعك وظيفة لا تغطيها الصفحات التعريفية، مثل الحجز أو إدارة المحتوى أو بوابة للعملاء، نحدد المتطلبات ونقارن الحلول قبل التطوير.'],
      ['هل يمكن ربط الموقع بأنظمة أخرى؟', 'قد يكون ذلك ممكناً بحسب واجهات الأنظمة وصلاحيات الوصول إليها. نراجع متطلبات الربط ونطاقه التقني قبل الاتفاق.'],
    ],
    en: [
      ['When do I need custom development?', 'When a basic information site cannot support a required workflow such as booking, content management, or a customer portal, we define the need and compare options first.'],
      ['Can the website connect to other systems?', 'Possibly, depending on the systems’ interfaces and available access. We assess the integration before agreeing on scope.'],
    ],
  },
  commerce: {
    projects: ['ecommerce', 'beauty-store'],
    ar: [
      ['ما الفرق بين موقع تعريفي ومتجر إلكتروني؟', 'الموقع التعريفي يشرح نشاطك ويجمع الاستفسارات. المتجر يضيف كتالوج منتجات وسلة ومسار طلب أو دفع، مع متطلبات تشغيل للتوصيل والمخزون حسب المنصة.'],
      ['هل يمكن ربط المتجر بالدفع والتوصيل؟', 'نعم، إذا دعمت المنصة ومزوّدو الخدمة التكامل المطلوب. نختار الخيارات المناسبة بعد معرفة السوق وطريقة تشغيل مشروعك.'],
    ],
    en: [
      ['What is the difference between a company site and a store?', 'A company site explains the business and collects enquiries. A store adds product pages, a cart, ordering or payment, and operational needs such as delivery and inventory.'],
      ['Can the store connect to payment and delivery?', 'Yes, when the chosen platform and providers support the integration. We confirm the fit for your market and workflow first.'],
    ],
  },
  apps: {
    projects: [],
    ar: [
      ['متى يحتاج المشروع إلى تطبيق جوال مستقل؟', 'إذا احتاج المستخدم إلى وظائف متكررة أو إشعارات أو تجربة لا يقدمها الموقع بسهولة، ندرس جدوى التطبيق ونحدد الوظائف الأساسية قبل البدء.'],
      ['كيف تبدأون تطوير التطبيق؟', 'نحدد الجمهور والمهام الأساسية والشاشات والتكاملات المطلوبة، ثم نتفق على نطاق التصميم والتطوير والاختبار.'],
    ],
    en: [
      ['When does a business need a separate mobile app?', 'If users need frequent workflows, notifications, or an experience a website cannot serve well, we assess the case and define core features first.'],
      ['How does app development begin?', 'We define the audience, key tasks, screens, and integrations, then agree on design, development, and testing scope.'],
    ],
  },
  logos: { projects: [], ar: [['ما الذي يشمله تصميم الشعار؟', 'نحدد شخصية العلامة واستخدامات الشعار ثم نصمم اتجاهاً مناسباً ونسلم الملفات المتفق عليها.']], en: [['What is included in logo design?', 'We define the brand character and logo uses, develop an appropriate direction, and deliver the agreed files.']] },
  identity: { projects: [], ar: [['ما الفرق بين الشعار والهوية البصرية؟', 'الشعار علامة واحدة، بينما الهوية البصرية نظام يحدد الألوان والخطوط وطريقة استخدام الصور والعناصر عبر نقاط التواصل.']], en: [['How is visual identity different from a logo?', 'A logo is one mark; a visual identity also defines colors, typography, imagery, and consistent use across channels.']] },
  social: { projects: [], ar: [['هل تصممون منشورات مناسبة لهوية العلامة؟', 'نعم. نحدد المقاسات والقوالب ونبرة التصميم وفق الهوية والمحتوى المتفق عليه، ونسلم الملفات الجاهزة للاستخدام.']], en: [['Can social designs match our visual identity?', 'Yes. We plan formats and templates around your identity and agreed content, then deliver usable design files.']] },
}

export default function ServiceSeo({ id, english = false }) {
  const data = content[id]
  if (!data) return null
  const prefix = english ? '/en' : ''
  const catalog = english ? enServices : services
  const portfolio = english ? enProjects : projects
  const related = catalog.filter(item => item.id !== id && ['websites', 'development', 'commerce', 'apps'].includes(item.id)).slice(0, 3)
  return <>
    <section className="section container market-faq service-seo" aria-label={english ? 'Service questions' : 'أسئلة عن الخدمة'}>
      <h2>{english ? 'Questions before you begin' : 'أسئلة قبل أن تبدأ'}</h2>
      {data[english ? 'en' : 'ar'].map(([question, answer]) => <div className="market-answer" key={question}><h3>{question}</h3><p>{answer}</p></div>)}
      <h2>{english ? 'Related services' : 'خدمات مرتبطة'}</h2>
      <div className="market-link-grid">{related.map(item => <a href={`${prefix}/services/${item.id}`} key={item.id}><strong>{item.title}</strong><span>{item.short}</span></a>)}</div>
      {data.projects.length > 0 && <><h2>{english ? 'Explore relevant concepts' : 'شاهد نماذج قريبة من الخدمة'}</h2><p>{english ? 'Illustrative design concepts, not completed client work.' : 'نماذج تصميمية توضيحية وليست أعمالاً منشورة لعملاء.'}</p><div className="market-link-grid">{data.projects.map(projectId => {
        const item = portfolio.find(project => project.id === projectId)
        return <a href={`${prefix}/portfolio/${projectId}`} key={projectId}><strong>{item.title}</strong><span>{item.summary}</span></a>
      })}</div></>}
    </section>
    <MarketLinks english={english}/>
  </>
}
