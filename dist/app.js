const translations = {
  en: {
    skip:'Skip to content',navWork:'Our work',navServices:'Services',navStudio:'The studio',navContact:'Start a project',
    heroEyebrow:'WASLIVO · WEB DESIGN STUDIO',heroTitle1:'A website that',heroTitle2:'brings you closer.',heroDescription:'Arabic and English websites that express the value of your business and make the next step feel simple.',heroCta:'Let’s talk about your project',heroSecondary:'Explore our designs',location:'Based in Morocco. Serving Saudi Arabia and the Gulf.',heroArtLabel:'FROM IDEA TO INTERFACE',showcaseNav:'Spaces · Details · Perspective',showcaseKicker:'ROOM TO BE YOURSELF',showcaseTitle:'Considered in every detail.',showcaseFoot:'Interiors with a different perspective',conceptLabel:'DESIGN CONCEPT · DEMONSTRATION',interiorAlt:'Contemporary living room with natural walnut, pale stone and a navy chair',strip1:'Arabic & English',strip2:'Made for mobile',strip3:'Connected to WhatsApp',
    workEyebrow:'01 / SELECTED CONCEPTS',workTitle:'Ideas, made visible.',workIntro:'Three ways to explore our approach. These are original demonstration projects, not previous client commissions.',previewInterior:'Room for living.',previewRenovation:'From vision.<br>To reality.',renovationTag1:'Renovation',renovationTag2:'Finishes',renovationTag3:'Delivery',previewFurniture:'Quiet<br>presence.',furnitureTag:'MATERIALS WORTH A CLOSER LOOK',project1Type:'INTERIOR DESIGN · CONCEPT',project1Title:'Forme — spaces with intention',project1Desc:'A visual project gallery, Arabic content, and a clear route to a consultation.',project2Type:'RENOVATION · CONCEPT',project2Title:'Build — clarity at every step',project2Desc:'Organised services and a straightforward process for requesting a quote.',project3Type:'FURNITURE SHOWROOM · CONCEPT',project3Title:'Object — considered simplicity',project3Desc:'Collections and materials brought together with direct WhatsApp enquiries.',workNote:'Open a concept to explore its direction. The interior image is AI-generated for demonstration.',
    servicesEyebrow:'02 / OUR SERVICES',servicesTitle:'A clear start. A defined scope.',servicesIntro:'We agree on your pages, content, and schedule before the first design takes shape.',service1Title:'Landing page',service1Desc:'One focused page for a service or campaign, with a clear reason to get in touch.',from:'From',sar:'SAR',sarMonth:'SAR / month',service1a:'Up to 6 sections in one language',service1b:'Responsive mobile design',service1c:'WhatsApp contact button',service2Title:'Business website',service2Desc:'A complete home for your business, services, and selected projects.',service2a:'Up to 5 pages in Arabic & English',service2b:'Project or service gallery',service2c:'Basic search engine setup',service3Title:'Ongoing care',service3Desc:'Support after launch, with a practical scope agreed around your website.',service3a:'Platform-appropriate technical updates',service3b:'Scheduled backups',service3c:'1 hour of small edits per month',discussPackage:'Discuss this package',pricingNote:'Indicative prices for a defined scope. Domain, hosting, translation, paid tools, and any applicable taxes are specified in your quote. Design packages include two revision rounds.',
    studioEyebrow:'03 / THE IDEA BEHIND WASLIVO',studioTitle:'Good design starts<br>with understanding.',studioDesc:'Waslivo is a web design studio based in Morocco, serving businesses in Saudi Arabia and the Gulf. Our name is inspired by “wasl”—connection. We build the connection between what you offer and what your customers need.',process1Title:'Understand',process1Desc:'We learn about your business and audience, then agree on the goal and scope.',process2Title:'Design',process2Desc:'We organise your content and design an interface that reflects your identity.',process3Title:'Build',process3Desc:'We develop the site and check its layouts and links on mobile and desktop.',process4Title:'Launch',process4Desc:'We review the final version together and arrange handover and agreed support.',
    faqEyebrow:'04 / BEFORE WE BEGIN',faqTitle:'Good questions.',faq1q:'Do you work with businesses outside Morocco?',faq1a:'Yes. We work remotely with businesses in Saudi Arabia and the Gulf, communicating in Arabic or English through WhatsApp and scheduled meetings.',faq2q:'How long does a website take?',faq2a:'It depends on the pages, features, and readiness of your content. We agree on a delivery schedule in your quote after understanding your project.',faq3q:'How does payment work?',faq3a:'Our proposed terms are 50% to start and 50% after preview approval, before launch and handover. We confirm the payment method and currency in your quote before any transfer.',faq4q:'Are the examples real client projects?',faq4a:'The current examples are demonstration concepts created to show our design approach. They are not previous commercial commissions or evidence of client results.',faq5q:'Can I update my website after handover?',faq5a:'We agree on content management before building. If you need to make updates yourself, the appropriate platform and guidance are included in the project scope.',
    contactEyebrow:'LET’S MAKE THE NEXT CONNECTION',contactTitle:'Your next chapter<br>starts with a conversation.',contactDesc:'Tell us about your business, what your website should achieve, and your ideal launch date.',contactCta:'Talk to us on WhatsApp',footerLocation:'From Morocco · For Saudi Arabia & the Gulf',dialogLabel:'DEMONSTRATION CONCEPT',close:'Close preview',
  }
};
const arabic = {};
document.querySelectorAll('[data-i18n]').forEach(el => { arabic[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-alt]').forEach(el => { arabic[el.dataset.alt] = el.alt; });
document.querySelectorAll('[data-label]').forEach(el => { arabic[el.dataset.label] = el.getAttribute('aria-label'); });
translations.ar = arabic;
const phone = '212633485489';
let language = 'ar';
const dialog = document.getElementById('project-dialog');
const projectContent = document.getElementById('project-content');
const arabicPackages = {'Landing page':'صفحة هبوط','Business website':'موقع أعمال','Website care':'العناية بالموقع'};
function whatsappUrl(packageName) {
  const message = language === 'ar'
    ? (packageName ? `مرحباً وصليفو، أود الاستفسار عن ${arabicPackages[packageName] || packageName}.` : 'مرحباً وصليفو، أرغب في مناقشة إنشاء موقع لنشاطي. اسم النشاط: \nالموقع الحالي إن وجد: \nالموعد المطلوب: ')
    : (packageName ? `Hello Waslivo, I would like to discuss your ${packageName} package.` : 'Hello Waslivo, I would like to discuss a website for my business. Business name: \nCurrent website (if any): \nTarget launch date: ');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
function updateWhatsAppLinks() {
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.href = whatsappUrl(link.dataset.package);
    link.target = '_blank'; link.rel = 'noopener noreferrer';
  });
}
function setLanguage(next) {
  language = next === 'en' ? 'en' : 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = translations[language][el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll('[data-alt]').forEach(el => { el.alt = translations[language][el.dataset.alt]; });
  document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', translations[language][el.dataset.label]); });
  const toggle = document.getElementById('language-toggle');
  toggle.textContent = language === 'ar' ? 'EN' : 'العربية';
  toggle.lang = language === 'ar' ? 'en' : 'ar';
  toggle.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.getElementById('main-nav').setAttribute('aria-label',language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation');
  document.title = language === 'ar' ? 'وصليفو — تصميم مواقع بالعربية والإنجليزية | Waslivo' : 'Waslivo — Arabic & English Websites for Gulf Businesses';
  document.querySelector('meta[name="description"]').content = language === 'ar' ? 'وصليفو استوديو لتصميم المواقع من المغرب، يخدم الشركات في السعودية والخليج. مواقع بالعربية والإنجليزية وتواصل مباشر عبر واتساب.' : 'Waslivo is a Morocco-based web design studio serving Saudi Arabia and the Gulf. Explore Arabic and English website concepts and discuss your project on WhatsApp.';
  updateWhatsAppLinks();
  try { localStorage.setItem('waslivo-language',language); } catch {}
}
document.getElementById('language-toggle').addEventListener('click',()=>setLanguage(language==='ar'?'en':'ar'));
document.getElementById('year').textContent = new Date().getFullYear();
let storedLanguage; try { storedLanguage = localStorage.getItem('waslivo-language'); } catch {}
setLanguage(storedLanguage || 'ar');

const demos = {
  interiors: {
    ar:{name:'فورم — مساحة للحياة.',kicker:'FORME / تصور لموقع استوديو تصميم داخلي',desc:'واجهة تمنح الصور مساحة للتعبير، وتعرّف الزائر على نوع المشاريع وأسلوب الاستوديو قبل طلب الاستشارة.',items:[['المساحات السكنية','عرض المشاريع حسب نوع المساحة، مع صور وتفاصيل المواد.'],['هوية الاستوديو','مساحة لتعريف الفريق وفلسفة التصميم بالمحتوى الحقيقي عند التنفيذ.'],['استشارة أولى','دعوة واضحة للتواصل ومشاركة احتياج العميل عبر واتساب.']]},
    en:{name:'Forme — room for living.',kicker:'FORME / INTERIOR DESIGN WEBSITE CONCEPT',desc:'An image-led interface that introduces the studio’s approach and project types before inviting a consultation.',items:[['Residential spaces','Projects organised by space, with photography and material details.'],['Studio identity','Room for the real team and design philosophy when the site is developed.'],['First consultation','A clear invitation to describe the project through WhatsApp.']]}
  },
  renovation: {
    ar:{name:'بُنيان — من رؤية إلى واقع.',kicker:'BUILD / تصور لموقع تجديد وتشطيبات',desc:'موقع يشرح الخدمات والنطاق ومراحل العمل بلغة واضحة. اختر خدمة لمعاينة طريقة تنظيم المحتوى.',items:[['التجديد','تنظيم المحتوى حول المساحة الحالية، والهدف من التجديد، والخدمات المطلوبة.'],['التشطيبات','عرض أنواع التشطيبات والخامات وخيارات التنفيذ، دون أسعار أو وعود غير مؤكدة.'],['مراحل العمل','معاينة الاحتياج، تحديد النطاق، عرض السعر، التنفيذ، ثم مراجعة التسليم.']]},
    en:{name:'Build — from vision to reality.',kicker:'BUILD / RENOVATION WEBSITE CONCEPT',desc:'A website that explains services, scope, and the working process in plain language. Select a service to explore the content structure.',items:[['Renovation','Content organised around the existing space, the desired change, and the services required.'],['Finishes','A place to explain finishes, materials, and delivery options without unverified prices or promises.'],['The process','Understand the space, define the scope, provide a quote, carry out the work, and review the handover.']]}
  },
  furniture: {
    ar:{name:'قطعة — حضور هادئ.',kicker:'OBJECT / تصور لموقع معرض أثاث',desc:'عرض بصري للمجموعات مع تفاصيل تساعد على الاستفسار عن القطعة المناسبة. اختر خامة لاستكشاف أسلوب عرض الخيارات.',items:[['جوز طبيعي','خامة دافئة لمجموعة ذات طابع هادئ. هذا مثال توضيحي لطريقة عرض الخامات.'],['قماش كحلي','لون عميق يضيف تبايناً إلى المساحة. يُحدَّد التوفر والمواصفات في موقع المتجر الفعلي.'],['حجر فاتح','درجة محايدة ذات ملمس بصري بسيط. الخيار معروض لتوضيح تجربة التصفح فقط.']]},
    en:{name:'Object — quiet presence.',kicker:'OBJECT / FURNITURE SHOWROOM WEBSITE CONCEPT',desc:'A visual collection with details that help visitors ask about the right piece. Select a material to explore how options could be presented.',items:[['Natural walnut','A warm material for a considered collection. This illustrates how material information can be presented.'],['Navy fabric','A deep accent for a balanced room. Actual specifications and availability belong on the real store website.'],['Pale stone','A quiet, neutral finish. This option demonstrates the browsing experience only.']]}
  }
};
function openProject(key) {
  const data = demos[key][language];
  const isArabic = language === 'ar';
  const footer = isArabic ? 'نموذج من ابتكار وصليفو. الأسماء والمحتوى لأغراض العرض، ولا تمثّل عملاء أو منتجات متاحة للبيع.' : 'An original Waslivo demonstration. Names and content are illustrative, not client commissions or products offered for sale.';
  const cta = isArabic ? 'أريد موقعاً بهذا الأسلوب' : 'Discuss a website in this style';
  projectContent.replaceChildren();
  const section = document.createElement('section'); section.className = 'demo';
  const kicker = document.createElement('p'); kicker.className='demo-kicker'; kicker.textContent=data.kicker;
  const heading = document.createElement('h2'); heading.id='dialog-title'; heading.textContent=data.name;
  const description = document.createElement('p'); description.className='demo-description'; description.textContent=data.desc;
  section.append(kicker,heading,description);
  if(key !== 'renovation'){
    const img = document.createElement('img');img.src='assets/interior.png';img.alt=translations[language].interiorAlt;img.className='demo-cover';img.width=1536;img.height=1024;section.append(img);
  }
  if(key==='interiors') {
    const grid = document.createElement('div'); grid.className='demo-grid';
    data.items.forEach(([title,text])=>{const article=document.createElement('article');const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=text;article.append(h,p);grid.append(article);});section.append(grid);
  } else {
    const tabs = document.createElement('div'); tabs.className='demo-tabs';tabs.setAttribute('role','group');tabs.setAttribute('aria-label',isArabic?'استكشف الخيارات':'Explore options');
    const panel = document.createElement('div');panel.className='demo-tab-content';panel.setAttribute('aria-live','polite');
    const setOption = index => {
      tabs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      panel.replaceChildren();const h=document.createElement('h3');h.textContent=data.items[index][0];const p=document.createElement('p');p.textContent=data.items[index][1];panel.append(h,p);
      if(key==='furniture'){const material=document.createElement('div');material.className='material-preview';const swatch=document.createElement('span');swatch.className='material-swatch';swatch.style.setProperty('--swatch',['#684732','#102a43','#ded5c5'][index]);swatch.setAttribute('aria-hidden','true');material.append(swatch);panel.append(material);}
    };
    data.items.forEach(([title],i)=>{const b=document.createElement('button');b.type='button';b.textContent=title;b.addEventListener('click',()=>setOption(i));tabs.append(b);});section.append(tabs,panel);setOption(0);
  }
  const foot=document.createElement('div');foot.className='demo-footer';const notice=document.createElement('p');notice.textContent=footer;const link=document.createElement('a');link.className='button dark';link.textContent=cta;link.href=`https://wa.me/${phone}?text=${encodeURIComponent(isArabic?`مرحباً وصليفو، أعجبني نموذج ${data.name} وأرغب في مناقشة موقع مشابه لنشاطي.`:`Hello Waslivo, I liked the ${data.name} concept and would like to discuss a similar website for my business.`)}`;link.target='_blank';link.rel='noopener noreferrer';foot.append(notice,link);section.append(foot);projectContent.append(section);
  dialog.showModal();document.body.style.overflow='hidden';
}
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>openProject(b.dataset.project)));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
