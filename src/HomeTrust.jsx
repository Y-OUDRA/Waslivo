import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, Headphones, Sparkles, TrendingUp } from 'lucide-react'

const values = [
  {
    title: 'تنفيذ منظم وواضح',
    description: 'من الفكرة إلى الإطلاق، نشتغل بخطوات واضحة وتواصل مباشر.',
    titleEn: 'A clear, organized process',
    descriptionEn: 'From idea to launch, we work in clear steps and stay in direct contact.',
    Icon: BadgeCheck,
  },
  {
    title: 'تصميم يعكس نشاطك',
    description: 'واجهة احترافية بهوية مناسبة تساعد مشروعك يظهر بشكل أفضل.',
    titleEn: 'Design that reflects your business',
    descriptionEn: 'A professional interface and fitting identity help your project stand out.',
    Icon: Sparkles,
  },
  {
    title: 'دعم بعد الإطلاق',
    description: 'نبقى معك بعد التسليم للمراجعة والمتابعة حسب الحاجة.',
    titleEn: 'Support after launch',
    descriptionEn: 'We remain available for reviews and follow-up after delivery.',
    Icon: Headphones,
  },
]

export default function HomeTrust({ lang = 'ar' }) {
  const english = lang === 'en'
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(100)
      return
    }
    let frame
    const start = performance.now()
    const animate = now => {
      const progress = Math.min((now - start) / 1300, 1)
      setCount(Math.round(100 * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [visible])

  return <section ref={sectionRef} className={`home-trust${visible ? ' is-visible' : ''}`} aria-labelledby="home-trust-title">
    <div className="container">
      <div className="home-trust-heading">
        <div><span>{english?'Why WASLIVO?':'لماذا وصليفو؟'}</span><h2 id="home-trust-title">{english?'Websites that give your business a stronger presence':'نبني مواقع تعطي مشروعك حضوراً أقوى'}</h2></div>
        <p>{english?'We care about your project from the first idea through launch and beyond.':'نهتم بتفاصيل مشروعك من أول فكرة حتى ما بعد الإطلاق.'}</p>
      </div>
      <div className="home-trust-grid">
        <div className="home-trust-card home-trust-card-stat" style={{ '--trust-delay': '0ms' }}>
          <span className="home-trust-icon"><TrendingUp size={23} aria-hidden="true"/></span>
          <span className="home-trust-count" aria-hidden="true">+{count}</span>
          <span className="home-trust-visually-hidden">{english?'More than 100 websites and digital pages':'أكثر من 100 موقع وصفحة رقمية'}</span>
          <h3>{english?'Websites and digital pages':'موقع وصفحة رقمية'}</h3>
          <p>{english?'Digital examples and experiences crafted with attention to detail.':'نماذج وتجارب رقمية تم العمل عليها باهتمام بالتفاصيل.'}</p>
        </div>
        {values.map(({ title, description, titleEn, descriptionEn, Icon }, index) => <div className="home-trust-card" style={{ '--trust-delay': `${(index + 1) * 80}ms` }} key={title}>
          <span className="home-trust-icon"><Icon size={23} aria-hidden="true"/></span>
          <h3>{english?titleEn:title}</h3>
          <p>{english?descriptionEn:description}</p>
        </div>)}
      </div>
    </div>
  </section>
}
