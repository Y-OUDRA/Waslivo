import {useEffect,useRef,useState} from 'react';

const processSteps=[
  {
    number:'01',
    title:'فهم احتياجك',
    description:'نبدأ بفهم مشروعك، أهدافك، جمهورك، والخدمات التي تريد تقديمها. نجمع التفاصيل ونحدد الاتجاه المناسب قبل أن نبدأ التصميم أو التطوير.'
  },
  {
    number:'02',
    title:'التصميم وتجربة المستخدم',
    description:'نحوّل الفكرة إلى واجهة واضحة واحترافية، ونبني تجربة استخدام تناسب هوية مشروعك وتسهّل على الزائر الوصول لما يحتاجه.'
  },
  {
    number:'03',
    title:'التطوير والتنفيذ',
    description:'بعد اعتماد التصميم نبدأ مرحلة التطوير، مع الاهتمام بالأداء، السرعة، التوافق مع الجوال، وربط الخصائص المطلوبة حسب احتياج المشروع.'
  },
  {
    number:'04',
    title:'الإطلاق والتسليم',
    description:'بعد الاختبارات النهائية نطلق الموقع ونتأكد من أن كل شيء يعمل بشكل صحيح، ثم نسلّم المشروع ونبقى متاحين للدعم عند الحاجة.'
  }
];

function ProcessStep({step,active}){
  return <li className={`waslivo-process-step${active?' is-active':''}`} aria-current={active?'step':undefined}>
    <div className="waslivo-process-rail" aria-hidden="true">
      <span>{step.number}</span>
    </div>
    <article className="waslivo-process-card" dir="rtl">
      <span className="waslivo-process-ghost" aria-hidden="true">{step.number}</span>
      <div className="waslivo-process-card-content">
        <span className="waslivo-process-pill" dir="ltr">STEP {step.number}</span>
        <h3>الخطوة {step.number}: {step.title}</h3>
        <p>{step.description}</p>
      </div>
    </article>
  </li>;
}

export default function ProcessSection(){
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

  return <section className="section waslivo-process-section" id="process" dir="rtl" aria-labelledby="waslivo-process-title">
    <div className="container">
      <div className="waslivo-process-intro">
        <span>طريقة عملنا</span>
        <h2 id="waslivo-process-title">كيف نعمل؟</h2>
        <p>نتبع خطوات واضحة من بداية الفكرة إلى الإطلاق، حتى نضمن تنفيذ مشروعك باحتراف وبطريقة منظمة.</p>
      </div>
      <ol className="waslivo-process-timeline" ref={timelineRef}>
        {processSteps.map((step,index)=><ProcessStep key={step.number} step={step} active={index===activeIndex}/>)}
      </ol>
    </div>
  </section>;
}
