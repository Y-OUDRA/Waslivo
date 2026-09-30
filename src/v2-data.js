import {services as sourceServices,projects as sourceProjects,articles,whatsapp,whatsappNumber} from './siteData';
import projectAssetManifest from './project-assets-manifest.json';

export {articles,whatsapp,whatsappNumber};

export const services=sourceServices.map((item,index)=>({
  ...item,
  title:index===0?'تصميم مواقع إلكترونية احترافية':index===1?'تطوير مواقع مخصصة':index===5?'تصميم الهوية البصرية':index===6?'تصميم منشورات السوشيال ميديا':item.title,
  image:['visuals/service-web.webp','visuals/service-development.webp','visuals/service-commerce.webp','visuals/service-apps.webp','visuals/service-logo.webp','visuals/service-identity.webp','visuals/service-social-new.webp'][index]
}));

const existing=Object.fromEntries(sourceProjects.map(project=>[project.id,project]));
const projectDefinitions=[
  {id:'automotive',assetId:'01-auto-services',filter:'الشركات والخدمات',featured:true},
  {id:'education',assetId:'02-education-platform',filter:'التعليم',featured:true,title:'منصة تعليمية',summary:'تصوّر لمنصة تقدم البرامج والدورات مع تسجيل واضح ومنظم.',goal:'عرض البرامج التعليمية ومحتواها بطريقة تسهّل الاختيار.',solution:'تصنيفات الدورات، صفحات تفاصيل، ومسار تسجيل مباشر.',features:['قائمة برامج','تفاصيل الدورات','نموذج تسجيل','لوحة محتوى']},
  {id:'ecommerce',assetId:'03-home-decor-store',filter:'المتاجر الإلكترونية',featured:true,title:'متجر ديكور منزلي',summary:'تصوّر لمتجر يعرض قطع الديكور ضمن فئات واضحة وتجربة شراء مريحة.',goal:'مساعدة الزائر على استكشاف المنتجات وفهم تفاصيلها قبل الطلب.',solution:'صفحات منتجات مرتبة، صور واضحة، ومسار شراء مختصر.',features:['صفحات منتجات','فئات واضحة','سلة مشتريات','تجربة جوال']},
  {id:'restaurant',assetId:'04-restaurant',filter:'المطاعم',featured:true},
  {id:'dental',assetId:'05-dental-clinic',filter:'العيادات',featured:true},
  {id:'property',assetId:'06-real-estate',filter:'العقارات',featured:true},
  {id:'facilities-services',assetId:'07-facilities-services',filter:'الشركات والخدمات',title:'موقع شركة خدمات وإدارة مرافق',summary:'تصوّر لموقع يعرّف بخدمات إدارة المرافق ويجعل طلب الاستفسار واضحاً.',goal:'عرض نطاق الخدمات ومجالات العمل بصورة منظمة.',solution:'أقسام واضحة للخدمات، معلومات عن آلية العمل، ومسار مباشر للتواصل.',features:['عرض الخدمات','مجالات العمل','طلب استفسار','تجربة جوال']},
  {id:'beauty-store',assetId:'08-beauty-store',filter:'المتاجر الإلكترونية',title:'متجر إلكتروني للعناية والجمال',summary:'تصوّر لمتجر يعرض منتجات العناية والجمال بطريقة مرتبة وسهلة التصفح.',goal:'مساعدة الزائر على اكتشاف المنتجات واختيار ما يناسبه.',solution:'فئات منتجات واضحة، صفحات تفاصيل، وتجربة شراء مناسبة للجوال.',features:['فئات المنتجات','صفحات التفاصيل','سلة مشتريات','تصميم متجاوب']},
  {id:'interior-design',assetId:'09-interior-design',filter:'التصميم الداخلي',title:'موقع أعمال التصميم الداخلي',summary:'تصوّر لموقع يعرض مشاريع التصميم الداخلي وخدمات الاستوديو.',goal:'تقديم الأعمال السابقة والخدمات في تجربة بصرية واضحة.',solution:'معرض مشاريع، صفحات خدمات، ومسار مباشر لمناقشة مشروع جديد.',features:['معرض أعمال','عرض الخدمات','تفاصيل المشاريع','طلب استشارة']},
  {id:'resort-hotel',assetId:'10-resort-hotel',filter:'الضيافة',title:'موقع منتجع وضيافة',summary:'تصوّر لموقع يعرّف بتجربة الإقامة والمرافق وخيارات الحجز.',goal:'مساعدة الزائر على استكشاف المكان واختيار تجربة الإقامة.',solution:'صور واضحة، عرض للمرافق والغرف، ومسار بسيط للاستفسار عن الحجز.',features:['عرض الغرف','المرافق','معلومات الإقامة','طلب حجز']}
];
const assetMap=Object.fromEntries(projectAssetManifest.map(entry=>[entry.id,entry]));
export const projects=projectDefinitions.map((definition,index)=>{
  const {assetId,...fields}=definition;
  const asset=assetMap[assetId];
  const base=`/images/projects/${assetId}`;
  return {...existing[definition.id],...fields,images:{full:`${base}/${asset.full}`,desktop:`${base}/${asset.desktop}`,mobile:`${base}/${asset.mobile}`},number:String(index+1).padStart(2,'0')};
});
export const featuredProject=projects.find(item=>item.id==='property');
export const filters=['الكل','العقارات','المطاعم','المتاجر الإلكترونية','العيادات','الشركات والخدمات','التعليم','التصميم الداخلي','الضيافة'];

export const faqItems=[
  ['ما هي تكلفة تصميم الموقع؟','تبدأ الباقات من 799 ريال. يختلف السعر النهائي بحسب الصفحات والوظائف والمحتوى، ونحدده بعد مناقشة التفاصيل.'],
  ['كم يستغرق تنفيذ المشروع؟','يعتمد الجدول على نطاق العمل وجاهزية المحتوى. نحدد المراحل والمدة المتوقعة في عرض المشروع.'],
  ['هل يمكنني طلب تعديلات؟','نعم. نتفق على مراحل المراجعة والتعديلات ضمن نطاق العمل قبل البدء.'],
  ['هل الموقع متجاوب مع الجوال؟','نعم، نصمم ونختبر الواجهة على أحجام الشاشات المختلفة.'],
  ['هل يمكن ربط الموقع بواتساب؟','نعم، يمكن إضافة أزرار ورسائل جاهزة تساعد العملاء على التواصل مباشرة.'],
  ['هل تقدمون دعماً بعد الإطلاق؟','يمكن الاتفاق على خطة للدعم والتحديثات بعد الإطلاق بحسب احتياج المشروع.'],
  ['هل يمكنكم تطوير متجر إلكتروني؟','نعم. نحدد المنصة والمنتجات ومتطلبات الدفع والتوصيل معك قبل التنفيذ.'],
  ['هل يمكنكم تصميم تطبيق جوال؟','نعم. نبدأ بتحديد أهداف التطبيق وشاشاته ووظائفه الأساسية.']
];


