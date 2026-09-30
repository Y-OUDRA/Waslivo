import { BadgeCheck, Headphones, MessageCircle, MonitorSmartphone, Search, Sparkles, TrendingUp, Zap } from 'lucide-react'

const rows = [
  [
    { label: '+100 موقع وصفحة رقمية', Icon: BadgeCheck },
    { label: 'تصميم احترافي', Icon: Sparkles },
    { label: 'متجاوب على جميع الأجهزة', Icon: MonitorSmartphone },
    { label: 'أداء سريع', Icon: Zap },
    { label: 'ربط مباشر مع واتساب', Icon: MessageCircle },
  ],
  [
    { label: 'تجربة استخدام واضحة', Icon: BadgeCheck },
    { label: 'دعم بعد الإطلاق', Icon: Headphones },
    { label: 'جاهز للنمو', Icon: TrendingUp },
    { label: 'تهيئة لمحركات البحث', Icon: Search },
  ],
]

function Chip({ item }) {
  const { Icon, label } = item
  return <span className="home-trust-chip"><Icon size={17} strokeWidth={1.8} aria-hidden="true"/><span>{label}</span></span>
}

function MovingRow({ items, index }) {
  const repeatedItems = Array.from({ length: 4 }, () => items).flat()

  return <div className={`home-trust-row home-trust-row-${index + 1}`} aria-hidden="true">
    <div className="home-trust-track">
      {[0, 1].map(group => <div className="home-trust-group" key={group}>
        {repeatedItems.map((item, itemIndex) => <Chip item={item} key={`${group}-${itemIndex}`}/>)}
      </div>)}
    </div>
  </div>
}

export default function HomeTrust() {
  return <section className="home-trust" aria-label="مزايا العمل مع وصليفو">
    {rows.map((items, index) => <MovingRow items={items} index={index} key={index}/>)}
    <div className="home-trust-static">
      {rows.flat().map(item => <Chip item={item} key={item.label}/>)}
    </div>
  </section>
}
