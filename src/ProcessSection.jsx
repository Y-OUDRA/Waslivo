import {useEffect,useRef,useState} from 'react';

const processSteps=[
  {
    number:'01',
    title:'فهم احتياجك',
    description:'نبدأ بفهم مشروعك، أهدافك، جمهورك، والخدمات التي تريد تقديمها. نجمع التفاصيل ونحدد الاتجاه المناسب قبل أن نبدأ التصميم أو التطوير.',
    titleEn:'Understand your needs',
    descriptionEn:'We learn about your project, goals, audience, and services. Then we define the right direction before design or development begins.'
  },
  {
    number:'02',
    title:'التصميم وتجربة المستخدم',
    description:'نحوّل الفكرة إلى واجهة واضحة واحترافية، ونبني تجربة استخدام تناسب هوية مشروعك وتسهّل على الزائر الوصول لما يحتاجه.',
    titleEn:'Design and user experience',
    descriptionEn:'We turn the idea into a clear, professional interface that reflects your identity and helps visitors find what they need.'
  },
  {
    number:'03',
    title:'التطوير والتنفيذ',
    description:'بعد اعتماد التصميم نبدأ مرحلة التطوير، مع الاهتمام بالأداء، السرعة، التوافق مع الجوال، وربط الخصائص المطلوبة حسب احتياج المشروع.',
    titleEn:'Development and testing',
    descriptionEn:'Once the design is approved, we build and test it with attention to speed, mobile compatibility, and the agreed features.'
  },
  {
    number:'04',
    title:'الإطلاق والتسليم',
    description:'بعد الاختبارات النهائية نطلق الموقع ونتأكد من أن كل شيء يعمل بشكل صحيح، ثم نسلّم المشروع ونبقى متاحين للدعم عند الحاجة.',
    titleEn:'Launch and handover',
    descriptionEn:'After final checks, we launch the site, confirm that everything works, and remain available for support as needed.'
  }
];

function ProcessStep({step,active,lang}){
  return <li className={`waslivo-process-step${active?' is-active':''}`} aria-current={active?'step':undefined}>
    <div className="waslivo-process-rail" aria-hidden="true">
      <span>{step.number}</span>
    </div>
    <article className="waslivo-process-card" dir={lang==='en'?'ltr':'rtl'}>
      <span className="waslivo-process-ghost" aria-hidden="true">{step.number}</span>
      <div className="waslivo-process-card-content">
        <span className="waslivo-process-pill" dir="ltr">STEP {step.number}</span>
        <h3>{lang==='en'? 'Step ':'الخطوة '}{step.number}: {lang==='en'?step.titleEn:step.title}</h3>
        <p>{lang==='en'?step.descriptionEn:step.description}</p>
      </div>
    </article>
  </li>;
}

export default function ProcessSection({lang='ar'}){
  const timelineRef=useRef(null);
  const [activeIndex,setActiveIndex]=useState(0);

  useEffect(()=>{
    const steps=[...timelineRef.current?.querySelectorAll('.waslivo-process-step')||[]];
    if(!steps.length||!('IntersectionObserver' in window))return;
    const centered=new Set();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>entry.isIntersecting?centered.add(entry.target):centered.delete(entry.target));
      if(!centered.size)return;
      const viewportCenter=window.innerHeight/2;
      const closest=[...centered].reduce((best,node)=>{
        const rect=node.getBoundingClientRect();
        const distance=Math.abs(rect.top+rect.height/2-viewportCenter);
        return distance<best.distance?{node,distance}:best;
      },{node:null,distance:Infinity}).node;
      setActiveIndex(steps.indexOf(closest));
    },{rootMargin:'-35% 0px -35% 0px',threshold:0});
    steps.forEach(step=>observer.observe(step));
    return()=>observer.disconnect();
  },[]);

  return <section className="section waslivo-process-section" id="process" dir={lang==='en'?'ltr':'rtl'} aria-labelledby="waslivo-process-title">
    <div className="container">
      <div className="waslivo-process-intro">
        <span>{lang==='en'?'Our process':'طريقة عملنا'}</span>
        <h2 id="waslivo-process-title">{lang==='en'?'How we work':'كيف نعمل؟'}</h2>
        <p>{lang==='en'?'We follow clear steps from the first idea to launch, keeping the project organized and professionally delivered.':'نتبع خطوات واضحة من بداية الفكرة إلى الإطلاق، حتى نضمن تنفيذ مشروعك باحتراف وبطريقة منظمة.'}</p>
      </div>
      <ol className="waslivo-process-timeline" ref={timelineRef}>
        {processSteps.map((step,index)=><ProcessStep key={step.number} step={step} active={index===activeIndex} lang={lang}/>)}
      </ol>
    </div>
  </section>;
}
