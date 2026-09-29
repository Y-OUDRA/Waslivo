import {services as sourceServices,projects as sourceProjects,articles,whatsapp,whatsappNumber} from './siteData';

export {articles,whatsapp,whatsappNumber};

export const services=sourceServices.map((item,index)=>({
  ...item,
  title:index===0?'تصميم مواقع إلكترونية احترافية':index===1?'تطوير مواقع مخصصة':index===5?'تصميم الهوية البصرية':index===6?'تصميم منشورات السوشيال ميديا':item.title,
  image:index===0?'hero-property-v2.webp':index===1?'studio-workspace.webp':index===2?'skincare.webp':index===3?'hero-studio.webp':index===4?'legal.webp':index===5?'about-studio-v2.webp':'coffee.webp'
}));

const extras=[
  {id:'ecommerce',title:'متجر منتجات مختارة',category:'المتاجر الإلكترونية',image:'skincare.webp',accent:'#ae835a',summary:'تصوّر لمتجر يعرض المنتجات ضمن فئات واضحة وتجربة شراء مريحة.',goal:'مساعدة الزائر على العثور على المنتجات وفهم تفاصيلها قبل الطلب.',solution:'صفحات منتجات مرتبة، صور واضحة، وعناصر ثقة ومسار شراء مختصر.',features:['صفحات منتجات','فئات واضحة','سلة مشتريات','تجربة جوال']},
  {id:'education',title:'منصة تعليمية',category:'التعليم',image:'education-v2.webp',accent:'#376fa8',summary:'تصوّر لمنصة تقدم البرامج والدورات مع تسجيل واضح ومنظم.',goal:'عرض البرامج التعليمية ومحتواها بطريقة تسهّل الاختيار.',solution:'تصنيفات الدورات، صفحات تفاصيل، ومسار تسجيل مباشر.',features:['قائمة برامج','تفاصيل الدورات','نموذج تسجيل','لوحة محتوى']}
];
const categoryMap={dental:'العيادات',restaurant:'المطاعم',property:'العقارات',legal:'الشركات والخدمات',beauty:'الهوية البصرية',automotive:'الشركات والخدمات',plumbing:'الشركات والخدمات'};
export const projects=[...sourceProjects,...extras].map((item,index)=>({...item,image:item.image.replace('.png','.webp'),filter:categoryMap[item.id]||item.category,featured:item.id==='property',number:String(index+1).padStart(2,'0')}));
export const featuredProject=projects.find(item=>item.featured);
export const filters=['الكل','العقارات','المطاعم','المتاجر الإلكترونية','العيادات','الشركات والخدمات','التعليم','الهوية البصرية'];

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


