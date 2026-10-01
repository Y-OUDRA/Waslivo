import {useEffect,useRef} from 'react';
import {ArrowLeft,Code2,Headphones,Monitor,ShieldCheck,Smartphone,TrendingUp,Zap} from 'lucide-react';
import {whatsapp} from './v2-data';

const heroWhatsapp='مرحباً وصليفو، أود مناقشة مشروع موقع إلكتروني.';

function CodeWindow(){return <div className="home-hero-editor" aria-hidden="true">
  <div className="home-hero-editor-bar"><span/><span/><span/><small>WASLIVO / studio</small></div>
  <div className="home-hero-code" dir="ltr">
    <div><span className="code-purple">const</span> <span className="code-blue">waslivo</span> <span className="code-light">=</span> <span className="code-gold">{'{'}</span></div>
    <div className="code-indent"><span className="code-blue">services</span><span className="code-light">: [</span></div>
    <div className="code-indent-two"><span className="code-green">'Web Development'</span><span className="code-light">,</span></div>
    <div className="code-indent-two"><span className="code-green">'E-commerce'</span><span className="code-light">,</span></div>
    <div className="code-indent-two"><span className="code-green">'Mobile Apps'</span><span className="code-light">,</span></div>
    <div className="code-indent-two"><span className="code-green">'Brand Identity'</span></div>
    <div className="code-indent"><span className="code-light">],</span></div>
    <div className="code-indent"><span className="code-blue">approach</span><span className="code-light">: </span><span className="code-gold">'Design + Performance'</span><span className="code-light">,</span></div>
    <div className="code-indent"><span className="code-blue">status</span><span className="code-light">: </span><span className="code-green">'Ready to Build'</span></div>
    <div><span className="code-gold">{'}'}</span></div>
    <div className="code-spacer"><span className="code-purple">function</span> <span className="code-blue">launch</span><span className="code-gold">()</span> <span className="code-light">{'{'}</span></div>
    <div className="code-indent code-comment">// Your next digital chapter.</div>
    <div><span className="code-light">{'}'}</span></div>
  </div>
</div>}

const floatingCards=[
  {className:'card-security',Icon:ShieldCheck,label:'Performance',value:'سريع وآمن',valueEn:'Fast & secure'},
  {className:'card-growth',Icon:TrendingUp,label:'Growth',value:'جاهز للنمو',valueEn:'Ready to grow'},
  {className:'card-responsive',Icon:Smartphone,label:'Responsive',value:'كل الأجهزة',valueEn:'Every device'},
  {className:'card-custom',Icon:Code2,label:'Custom Build',value:'حسب مشروعك',valueEn:'Built for you'},
];

function HeroVisual({lang='ar'}){
  const visualRef=useRef(null);
  useEffect(()=>{
    const visual=visualRef.current;
    if(!visual)return;
    const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const move=event=>{
      if(!fine.matches||reduced.matches)return;
      const bounds=visual.getBoundingClientRect();
      const x=(event.clientX-bounds.left)/bounds.width-.5;
      const y=(event.clientY-bounds.top)/bounds.height-.5;
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        visual.style.setProperty('--panel-x',`${(x*5).toFixed(2)}px`);
        visual.style.setProperty('--panel-y',`${(y*5).toFixed(2)}px`);
        visual.style.setProperty('--card-x',`${(x*9).toFixed(2)}px`);
        visual.style.setProperty('--card-y',`${(y*9).toFixed(2)}px`);
      });
    };
    const reset=()=>{
      cancelAnimationFrame(frame);
      visual.style.setProperty('--panel-x','0px');
      visual.style.setProperty('--panel-y','0px');
      visual.style.setProperty('--card-x','0px');
      visual.style.setProperty('--card-y','0px');
    };
    visual.addEventListener('pointermove',move,{passive:true});
    visual.addEventListener('pointerleave',reset);
    return ()=>{cancelAnimationFrame(frame);visual.removeEventListener('pointermove',move);visual.removeEventListener('pointerleave',reset)};
  },[]);
  return <div className="home-hero-visual" ref={visualRef} aria-hidden="true">
    <div className="home-hero-editor-layer"><CodeWindow/></div>
    {floatingCards.map(({className,Icon,label,value,valueEn})=><div className={`home-hero-float ${className}`} key={className}><div className="home-hero-float-card"><span className="home-hero-float-icon"><Icon size={22}/></span><span><small>{label}</small><strong>{lang==='en'?valueEn:value}</strong></span></div></div>)}
  </div>;
}

export default function HomeHero({lang='ar'}){const english=lang==='en';return <section className="home-hero-premium" dir={english?'ltr':'rtl'}>
  <div className="container home-hero-layout">
    <div className="home-hero-copy">
      <span className="home-hero-eyebrow"><i/>{english?'Digital solutions for your business':'حلول رقمية لأعمالك'}</span>
      <h1><span>{english?'Build a digital presence':'نبني حضوراً رقمياً'}</span><em>{english?'that fits your ambition':'يليق بأعمالك'}</em></h1>
      <p>{english?'We design and develop websites and digital experiences that bring together thoughtful design, strong performance, and a clear user journey.':'نصمم ونطوّر مواقع إلكترونية وتجارب رقمية تجمع بين التصميم الاحترافي، الأداء القوي، وتجربة الاستخدام الواضحة.'}</p>
      <div className="home-hero-actions">
        <a className="home-hero-primary" href={whatsapp(english?'Hello WASLIVO, I would like to discuss a new website project.':heroWhatsapp)} target="_blank" rel="noopener noreferrer">{english?'Get a free consultation':'احصل على استشارة مجانية'} <ArrowLeft size={19}/></a>
        <a className="home-hero-secondary" href={english?'/en/portfolio':'/portfolio'}>{english?'Explore our work':'اطلع على أعمالنا'} <ArrowLeft size={19}/></a>
      </div>
      <div className="home-hero-trust" aria-label={english?'Why work with WASLIVO':'مميزات العمل مع وصليفو'}>
        <span><Monitor size={18}/>{english?'Responsive design':'تصميم متجاوب'}</span>
        <span><Zap size={18}/>{english?'Fast performance':'أداء سريع'}</span>
        <span><Headphones size={18}/>{english?'Ongoing support':'دعم ومتابعة'}</span>
      </div>
    </div>
    <HeroVisual lang={lang}/>
  </div>
</section>}
