import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, Headphones, Sparkles, TrendingUp } from 'lucide-react'

const values = [
  {
    title: 'تنفيذ منظم وواضح',
    description: 'من الفكرة إلى الإطلاق، نشتغل بخطوات واضحة وتواصل مباشر.',
    Icon: BadgeCheck,
  },
  {
    title: 'تصميم يعكس نشاطك',
    description: 'واجهة احترافية بهوية مناسبة تساعد مشروعك يظهر بشكل أفضل.',
    Icon: Sparkles,
  },
  {
    title: 'دعم بعد الإطلاق',
    description: 'نبقى معك بعد التسليم للمراجعة والمتابعة حسب الحاجة.',
    Icon: Headphones,
  },
]

export default function HomeTrust() {
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
        <div><span>لماذا وصليفو؟</span><h2 id="home-trust-title">نبني مواقع تعطي مشروعك حضوراً أقوى</h2></div>
        <p>نهتم بتفاصيل مشروعك من أول فكرة حتى ما بعد الإطلاق.</p>
      </div>
      <div className="home-trust-grid">
        <div className="home-trust-card home-trust-card-stat" style={{ '--trust-delay': '0ms' }}>
          <span className="home-trust-icon"><TrendingUp size={23} aria-hidden="true"/></span>
          <span className="home-trust-count" aria-hidden="true">+{count}</span>
          <span className="home-trust-visually-hidden">أكثر من 100 موقع وصفحة رقمية</span>
          <h3>موقع وصفحة رقمية</h3>
          <p>نماذج وتجارب رقمية تم العمل عليها باهتمام بالتفاصيل.</p>
        </div>
        {values.map(({ title, description, Icon }, index) => <div className="home-trust-card" style={{ '--trust-delay': `${(index + 1) * 80}ms` }} key={title}>
          <span className="home-trust-icon"><Icon size={23} aria-hidden="true"/></span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>)}
      </div>
    </div>
  </section>
}