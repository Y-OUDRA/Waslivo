import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Diamond, Facebook, Headphones, Heart, HeartHandshake, Instagram, Layers3, Lightbulb, Menu, MessageCircle, Monitor, Palette, PenTool, Phone, Send, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star, TrendingUp, Wallet, X, Zap } from 'lucide-react'
import { whatsapp, whatsappNumber } from './v2-data'
import { enArticles, enFaq, enFilters, enProjects, enServices } from './english-data'
import HomeHero from './HomeHero'
import HomeTrust from './HomeTrust'
import ProcessSection from './ProcessSection'
import LanguageSwitcher from './LanguageSwitcher'
import MarketPage, { MarketLinks } from './MarketPage'
import { markets } from './market-data'
import { site } from './site-config'
import ServiceSeo from './ServiceSeo'
import { ProjectServiceLink, ArticleContextLinks } from './ContentLinks'

const asset = name => `/assets/${name}`
const enPath = path => path === '/' ? '/en' : `/en${path}`
const serviceIcons = { websites: Monitor, development: Code2, commerce: ShoppingBag, apps: Smartphone, logos: PenTool, identity: Diamond, social: Layers3 }
const nav = [['/', 'Home'], ['/services', 'Services'], ['/portfolio', 'Portfolio'], ['/packages', 'Packages'], ['/about', 'About'], ['/#process', 'How we work'], ['/#faq', 'FAQ'], ['/blog', 'Articles'], ['/contact', 'Contact']]
const defaultMessage = 'Hello WASLIVO, I would like to discuss a new website project.'

function Link({ to = '/', children, className = '', ...props }) {
  return <a href={enPath(to)} className={className} {...props}>{children}</a>
}
function WButton({ children = 'Contact us on WhatsApp', message = defaultMessage, kind = 'gold', className = '' }) {
  return <a href={whatsapp(message)} target="_blank" rel="noopener noreferrer" className={`button button-${kind} ${className}`}><MessageCircle size={18}/>{children}</a>
}
function Logo() {
  return <Link to="/" className="logo" aria-label="WASLIVO home"><img src={site.logo} alt="WASLIVO" width="142" height="69"/></Link>
}
function Header({ path }) {
  const [open, setOpen] = useState(false)
  return <header className="header">
    <div className="header-inner">
      <Logo/>
      <nav className={open ? 'header-nav header-nav-open' : 'header-nav'} aria-label="Main navigation">
        {nav.map(([to, label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className={path === to ? 'active' : ''}>{label}</Link>)}
        <WButton className="drawer-wa"/>
      </nav>
      <LanguageSwitcher path={path} english/>
      <WButton className="header-wa">Contact us on WhatsApp</WButton>
      <button className="nav-toggle" type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>
}
function TiktokIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
}
const socialLinks = [
  [site.social.instagram, 'Follow WASLIVO on Instagram', Instagram],
  [site.social.facebook, 'Follow WASLIVO on Facebook', Facebook],
  [site.social.tiktok, 'Follow WASLIVO on TikTok', TiktokIcon],
]
function Footer({path}) {
  return <footer className="footer"><div className="container footer-main">
    <div className="footer-brand"><Logo/><div className="footer-language-switch"><LanguageSwitcher path={path} english/></div><div className="footer-social"><span>Follow us</span><div className="footer-social-links">{socialLinks.map(([href, label, Icon]) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} key={href}><Icon size={20}/></a>)}</div></div></div>
    <div><h3>Quick links</h3>{nav.filter(([to]) => !to.includes('#')).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
    <div><h3>Services</h3>{enServices.slice(0, 6).map(s => <Link key={s.id} to={`/services/${s.id}`}>{s.title}</Link>)}</div>
    <div className="footer-contact"><h3>Contact</h3><p>We are here to answer your questions and discuss your next project.</p><WButton>Start a WhatsApp chat</WButton></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} WASLIVO. All rights reserved.</span><div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link></div></div></footer>
}
function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  return <div className={`section-title ${align === 'start' ? 'section-title-start' : ''}`}><span>{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
}
function CTA({ title = 'Have a project in mind?', copy = 'Let us turn it into a professional digital experience that reflects your brand and goals.', compact = false }) {
  return <section className={`cta ${compact ? 'cta-compact' : ''}`}><div className="container cta-content"><div><span className="eyebrow">Let us make something great together</span><h2>{title}</h2><p>{copy}</p></div><WButton>Contact us on WhatsApp <ArrowRight size={17}/></WButton></div></section>
}
function Hero({ variant = 'services', eyebrow, title, accent, description, primary = 'Contact us on WhatsApp', secondary, secondaryTo = '/portfolio', children }) {
  const image = { services: 'visuals/hero-main.webp', packages: 'visuals/hero-main.webp', about: 'about-studio-v2.webp', contact: 'visuals/contact-main.webp' }[variant]
  return <section className={`hero hero-${variant}`}><img className="hero-image" src={asset(image)} alt="" fetchPriority="high"/><div className="hero-gradient"/><div className="container hero-inner"><div className="hero-content"><span className="eyebrow">{eyebrow}</span><h1>{title}<em>{accent}</em></h1><p>{description}</p>{children}<div className="hero-actions"><WButton kind={variant === 'packages' ? 'green' : 'gold'}>{primary}</WButton>{secondary && (secondaryTo.startsWith('tel:') ? <a href={secondaryTo} className="button button-outline">{secondary}<ArrowRight size={18}/></a> : <Link to={secondaryTo} className="button button-outline">{secondary}<ArrowRight size={18}/></Link>)}</div></div></div>{variant === 'about' && <img className="hero-wall-logo" src={asset('waslivo-logo.webp')} alt="" aria-hidden="true"/>}</section>
}
function ServiceCard({ service, index, compact = false }) {
  const Icon = serviceIcons[service.id]
  return <Link to={`/services/${service.id}`} className={`service-card ${compact ? 'service-card-compact' : ''} ${index < 2 ? 'service-card-core' : ''}`}><div className="service-image"><img src={asset(service.image)} loading="lazy" alt=""/><span className="service-icon"><Icon/></span></div><div className="service-copy"><h3>{service.title}</h3><p>{service.short}</p><span className="inline-link">Explore service <ArrowRight size={15}/></span></div></Link>
}
function ServicesGrid({ home = false }) {
  return <section className={`section services-section ${home ? 'services-home' : ''}`} id="services"><div className="container"><SectionTitle eyebrow="Our services" title={home ? 'Digital solutions to help your business grow' : 'Everything you need for a professional digital presence'} description="From idea to launch, we provide the tools to build a digital presence that reflects your business."/><div className={`service-grid ${home ? 'service-grid-seven' : 'service-grid-page'}`}>{enServices.map((service, index) => <ServiceCard key={service.id} service={service} index={index} compact={home}/>)}</div></div></section>
}
function ProjectCard({ project, compact = false, preview = false }) {
  const image = preview && project.previewImage ? project.previewImage : project.images.desktop
  return <Link to={`/portfolio/${project.id}`} className={`project-card ${compact ? 'project-card-compact' : ''} ${preview ? `project-card-preview project-card-preview-${project.id}` : ''}`}><div className="project-visual project-visual-photo"><img src={image} alt={`Design preview of ${project.title}`} loading="lazy"/></div><div className="project-card-body"><span className="project-tag">{project.filter}</span><span className="project-concept">Website design & development</span><h3>{project.title}</h3><p>{project.summary}</p><span className="inline-link">View project <ArrowRight size={17}/></span></div></Link>
}
function HomePortfolio() {
  return <section className="home-portfolio"><div className="container"><div className="home-portfolio-head"><div><span className="eyebrow">Our work</span><h2>Projects we are proud to design</h2><p>Concepts across industries that show thoughtful design and a clear experience.</p></div><Link to="/portfolio" className="button button-gold">See more projects <ArrowRight size={17}/></Link></div><div className="home-project-row">{enProjects.filter(p => p.featured).map(p => <ProjectCard key={p.id} project={p} compact preview/>)}</div></div></section>
}
function FAQ({ aside = false }) {
  return <section className={`section faq-section ${aside ? 'faq-with-aside' : ''}`} id="faq"><div className="container"><SectionTitle eyebrow="FAQ" title="Clear answers to common questions" description="Helpful details before we start discussing your project."/><div className="faq-layout"><div className="faq-items">{enFaq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div>{aside && <div className="faq-picture"><img src={asset('visuals/faq-support.webp')} alt="Digital project planning workspace" loading="lazy"/><div><strong>Have another question?</strong><WButton>Ask us on WhatsApp</WButton></div></div>}</div></div></section>
}
function FAQAndCallout() {
  return <section className="section faq-callout" id="faq"><div className="container faq-callout-grid"><div><span className="eyebrow">FAQ</span><h2>Clear answers to common questions</h2><div className="faq-items">{enFaq.slice(0, 5).map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div></div><div className="work-callout"><img src={asset('visuals/faq-support.webp')} alt="" loading="lazy"/><div><h3>Have a project in mind?<br/>Let's bring it to life.</h3><p>Tell us about your idea.</p><WButton>Contact us on WhatsApp</WButton></div></div></div></section>
}
function Home() {
  return <><HomeHero lang="en"/><HomeTrust lang="en"/><ServicesGrid home/><HomePortfolio/><ProcessSection lang="en"/><FAQAndCallout/><MarketLinks english/><CTA compact/></>
}
function ServicesPage() {
  const values = [[Star, 'Distinctive modern design', 'Creative work shaped around your brand'], [Zap, 'A fit for your business', 'We understand the need before proposing a solution'], [HeartHandshake, 'Clear communication', 'We review important decisions with you'], [ShieldCheck, 'Careful delivery', 'We check the details before handover']]
  return <><Hero variant="services" eyebrow="Our services" title="Digital solutions" accent="for growing businesses" description="We offer website design and development, apps, and brand identity services to help build a professional presence." secondary="See our work"/><ServicesGrid/><div className="container service-values">{values.map(([Icon, title, copy]) => <div key={title}><Icon/><strong>{title}</strong><small>{copy}</small></div>)}</div><ProcessSection lang="en"/><FAQAndCallout/><CTA/></>
}
function ServiceDetail({ id }) {
  const service = enServices.find(s => s.id === id)
  if (!service) return <NotFound/>
  const Icon = serviceIcons[id]
  return <><Hero variant="services" eyebrow="Our services" title={service.title} accent="built around your business" description={service.detail} secondary="Explore our work"/><section className="section container service-detail"><div><span className="eyebrow">What we provide</span><h2>A practical solution starts with understanding you</h2><p>{service.detail}</p><div className="detail-points">{service.points.map(point => <div key={point}><Check/>{point}</div>)}</div><WButton message={`Hello WASLIVO, I would like to ask about ${service.title}.`}>Discuss your project</WButton></div><div className="service-detail-image"><img src={asset(service.image)} alt={service.title} loading="lazy"/><span><Icon/>{service.title}</span></div></section><ProcessSection lang="en"/><ServiceSeo id={id} english/><CTA title="Ready to get started?"/></>
}
function PortfolioPage() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? enProjects : enProjects.filter(project => project.filter === filter)
  return <><section className="portfolio-hero"><img src={asset('visuals/hero-main.webp')} alt=""/><div className="portfolio-hero-gradient"/><div className="container portfolio-hero-inner"><div><span className="eyebrow">Selected work</span><h1>From an idea to a digital experience<br/><em>that makes a difference</em></h1><p>We develop website concepts that combine a clear identity and a considered user experience.</p><div className="featured-info"><span>Real estate</span><h2>A platform for exploring properties</h2><p>Organized listings and details make it easier to request a viewing.</p><Link to="/portfolio/property" className="button button-gold">View project <ArrowUpRight size={17}/></Link></div></div></div></section><section className="section portfolio-page"><div className="container"><SectionTitle eyebrow="Our work" title="A collection of designs we are proud of" description="Explore original interface concepts across different industries."/><div className="portfolio-filters" role="group" aria-label="Filter projects">{enFilters.map(item => <button type="button" key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="portfolio-grid">{shown.map(project => <ProjectCard key={project.id} project={project} preview/>)}</div><div className="portfolio-bottom"><div className="portfolio-inquiry"><img src={asset('visuals/about-method.webp')} alt="Digital design workspace" loading="lazy"/><div><h2>Have a project idea?</h2><p>We turn ideas into digital experiences that fit your business.</p><WButton>Discuss your project</WButton></div></div></div></div></section><CTA compact/></>
}
function ProjectDetail({ id }) {
  const project = enProjects.find(p => p.id === id)
  if (!project) return <NotFound/>
  return <><section className="project-detail-hero"><div className="container"><div className="breadcrumbs"><Link to="/portfolio">Portfolio</Link><ArrowRight size={14}/><span>{project.title}</span></div><div className="project-detail-heading"><div><span className="eyebrow">{project.filter} · Design concept</span><h1>{project.title}</h1><p>{project.summary}</p></div><WButton message={`Hello WASLIVO, I saw the ${project.title} concept and would like to discuss a similar project.`}>I want something similar</WButton></div><div className="project-visual project-visual-photo project-visual-large"><picture><img src={project.images.desktop} width="1050" height="1050" alt={`Desktop view of ${project.title}`} fetchPriority="high"/></picture></div></div></section><section className="section project-narrative"><div className="container narrative-grid"><div><span className="eyebrow">Project goal</span><h2>Make decisions easier</h2><p>{project.goal}</p></div><div><span className="eyebrow">Design direction</span><h2>A clear identity and an easy journey</h2><p>{project.solution}</p></div></div></section><section className="section project-screens"><div className="container"><SectionTitle eyebrow="Key screens" title="Design across devices" description="Desktop and mobile views of the concept."/><div className="screen-grid demo-screen-grid"><div><div className="demo-preview-shell demo-preview-desktop"><div className="demo-preview-bar"><span className="demo-preview-dots"><i/><i/><i/></span><span>Desktop</span></div><img className="demo-screen-image" src={project.images.desktop} width="1050" height="1050" alt={`Desktop screen for ${project.title}`} loading="lazy"/></div><strong>Desktop view</strong></div><div className="mobile-screen-preview"><div className="demo-preview-shell demo-preview-mobile"><img className="demo-screen-image" src={project.images.mobile} width="353" height="1050" alt={`Mobile screen for ${project.title}`} loading="lazy"/></div><strong>Mobile view</strong></div></div></div></section><section className="section project-features"><div className="container"><SectionTitle eyebrow="What the concept includes" title="Useful elements on every screen"/><div className="feature-grid">{project.features.map((feature, index) => <div key={feature}><span>{String(index + 1).padStart(2, '0')}</span><Check/><h3>{feature}</h3></div>)}</div></div></section><section className="section container"><div className="related-head"><SectionTitle eyebrow="More concepts" title="Keep exploring" align="start"/><Link to="/portfolio" className="button button-outline">All projects <ArrowRight size={17}/></Link></div><div className="portfolio-grid">{enProjects.filter(p => p.id !== id).slice(0, 3).map(p => <ProjectCard key={p.id} project={p}/>)}</div></section><ProjectServiceLink id={id} english/><CTA/></>
}
function AboutPage() {
  const values = [[Diamond, 'Quality in the details', 'We care about what visitors see and what helps them understand your brand.'], [HeartHandshake, 'Clear communication', 'We discuss important decisions and work within an agreed scope.'], [Lightbulb, 'Tailored solutions', 'We choose what serves your project rather than adding features without purpose.'], [Heart, 'A human experience', 'We make the website comfortable and clear on every screen.']]
  return <><Hero variant="about" eyebrow="About us" title="Your creative partner" accent="for a meaningful digital presence" description="WASLIVO is a studio for website, app, and brand identity design. We turn ideas into experiences that help businesses grow and connect." primary="Start a conversation"/><section className="section container about-story"><div><span className="eyebrow">Our story</span><h2>From idea to real digital impact</h2><p>WASLIVO exists to make digital presence clearer and more expressive for every business. We begin with the idea and audience, then design an experience that balances beauty and ease of use.</p><p>We bring design, development, and identity together while paying attention to the content and details customers need before contacting you.</p></div><div className="about-story-image"><img src={asset('visuals/about-story.webp')} alt="Website design workspace" loading="lazy"/><span><Lightbulb/> Every brand deserves a digital presence that fits it.</span></div></section><section className="section values-section"><div className="container"><SectionTitle eyebrow="Our values" title="Principles behind every project" description="We put our client relationships and the visitor experience at the heart of every decision."/><div className="value-grid">{values.map(([Icon, title, copy]) => <div key={title}><Icon/><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section><section className="section container method-section"><div className="method-image"><img src={asset('visuals/about-method.webp')} alt="Website design process" loading="lazy"/></div><div><span className="eyebrow">Our approach</span><h2>How do we build a complete digital presence?</h2><p>We combine business goals, clear content, consistent visual design, and practical development. The result becomes a useful part of your customer journey.</p><Link to="/services" className="button button-outline">Explore our services <ArrowRight size={17}/></Link></div></section><ProcessSection lang="en"/><CTA title="Ready to build your digital presence?"/></>
}
const packages = [
  { name: 'Essential', lead: 'A professional start for your project', icon: PenTool, image: 'visuals/package-basic.webp', items: ['Clear professional website design', 'Core information pages', 'Responsive experience', 'Contact form and WhatsApp link', 'Basic search setup'] },
  { name: 'Advanced', lead: 'For growing businesses ready for more', icon: TrendingUp, image: 'visuals/package-advanced.webp', items: ['Brand-specific design', 'More organized pages and content', 'Additional features as needed', 'Expanded search setup', 'Agreed integrations'], balanced: true },
  { name: 'Custom', lead: 'Complete solutions for larger projects', icon: Diamond, image: 'visuals/package-custom.webp', items: ['Fully tailored design and development', 'Advanced project-specific features', 'A store, system, or dedicated portal', 'External service integration', 'Agreed support and further development'], dark: true },
]
function PackagesPage() {
  return <><Hero variant="packages" eyebrow="Packages" title="Flexible packages" accent="for your project" description="Every project has different requirements. We tailor the scope to your goals and confirm the details and final price together." primary="Discuss your project" secondary="Send project details" secondaryTo="/contact"><div className="price-box"><Wallet/><div>Packages start at <strong>799 SAR</strong><small>The final price is set after discussing your scope and requirements.</small></div></div></Hero><section className="section packages-section"><div className="container"><SectionTitle eyebrow="Choose your fit" title="Packages designed to support growth" description="Flexible starting points for different needs, with room to tailor the scope."/><div className="package-grid">{packages.map(pkg => { const Icon = pkg.icon; return <div className={`package-card ${pkg.dark ? 'package-card-dark' : ''}`} key={pkg.name}>{pkg.balanced && <span className="package-ribbon">Balanced choice</span>}<div className="package-title"><Icon/><div><h3>{pkg.name}</h3><p>{pkg.lead}</p></div></div><img src={asset(pkg.image)} alt="" loading="lazy"/><ul>{pkg.items.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul><WButton kind={pkg.dark ? 'outline' : 'gold'} message={`Hello WASLIVO, I would like to discuss the ${pkg.name} package.`}>Discuss this package</WButton></div> })}</div></div></section><ProcessSection lang="en"/><section className="section package-extras"><div className="container extras-layout"><div><span className="eyebrow">Optional additions</span><h2>Add the features your project needs</h2><p>We define every addition clearly in the proposal.</p><div className="extra-list">{['Online store', 'Appointment booking', 'External integrations', 'Professional content', 'Brand identity', 'Support and maintenance'].map(item => <span key={item}><Check size={15}/>{item}</span>)}</div></div><div className="extras-callout"><h3>Ready to begin?</h3><p>Tell us what you need and we will prepare a tailored proposal.</p><WButton kind="green">Contact us on WhatsApp</WButton></div></div></section><FAQ/><CTA compact/></>
}
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Website', budget: '', brief: '' })
  const [error, setError] = useState('')
  const change = event => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = event => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.brief.trim()) { setError('Please enter your name, email, and project details.'); return }
    setError('')
    const message = `Hello WASLIVO, I would like to discuss a new project.\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nProject type: ${form.type}\nBudget: ${form.budget || 'Not decided'}\nProject details: ${form.brief}`
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer')
  }
  return <form className="contact-form" onSubmit={submit}><span className="eyebrow">Contact us</span><h2>Tell us about your project</h2><p>Complete the form to open a WhatsApp message you can review and send yourself.</p><div className="field-row"><label>Full name <b>*</b><input name="name" value={form.name} onChange={change} autoComplete="name" required placeholder="Your full name"/></label><label>Email <b>*</b><input name="email" type="email" value={form.email} onChange={change} autoComplete="email" required placeholder="name@example.com"/></label></div><div className="field-row"><label>Phone<input name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" placeholder="Contact number"/></label><label>Project type<select name="type" value={form.type} onChange={change}>{['Website', 'Online store', 'Mobile app', 'Brand identity', 'Logo', 'Social media design', 'Custom development', 'Other'].map(item => <option key={item}>{item}</option>)}</select></label></div><label>Approximate budget<input name="budget" value={form.budget} onChange={change} placeholder="If known"/></label><label>Project details <b>*</b><textarea name="brief" value={form.brief} onChange={change} required rows="5" placeholder="Tell us about your idea and goals..."/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-gold" type="submit"><Send size={17}/> Continue on WhatsApp</button></form>
}
function ContactPage() {
  const benefits = [[Zap, 'Direct contact', 'On WhatsApp'], [MessageCircle, 'We understand your idea', 'And discuss your needs'], [ShieldCheck, 'A clear proposal', 'After defining the scope'], [Heart, 'With you all the way', 'From idea to launch']]
  return <><Hero variant="contact" eyebrow="Contact us" title="We are here for your idea" accent="Let's talk" description="Whether you have a question or a new project in mind, we are ready to discuss the next step." primary="Message us on WhatsApp" secondary="Call us" secondaryTo={`tel:+${whatsappNumber}`}/><div className="benefit-strip"><div className="container benefit-inner">{benefits.map(([Icon, title, subtitle]) => <div className="benefit" key={title}><Icon/><strong>{title}</strong><small>{subtitle}</small></div>)}</div></div><section className="section contact-section"><div className="container contact-layout"><ContactForm/><div className="contact-side"><div className="whatsapp-card"><span>The fastest way to reach us</span><h2>Contact us on WhatsApp</h2><p>Start a direct conversation and tell us about your idea.</p><WButton kind="green">Message us</WButton></div><div className="other-methods"><h3>Other ways to connect</h3><a href={`tel:+${whatsappNumber}`}><Phone/> Phone call <small>{site.phoneDisplay}</small></a><p>You can also use the form to prepare a WhatsApp message with your project details.</p></div></div></div></section><FAQ aside/><CTA title="Let's turn your idea into a professional digital presence"/></>
}
function BlogPage() {
  return <><section className="editorial-hero"><div className="container"><span className="eyebrow">Articles & ideas</span><h1>Insights for a better website</h1><p>Practical ideas about design, content, user experience, and digital identity.</p></div></section><section className="section container"><SectionTitle eyebrow="From our blog" title="Read before you begin"/><div className="article-grid">{enArticles.map((article, index) => <Link to={`/blog/${article.id}`} className="article-card" key={article.id}><div className="article-image"><img src={asset(['visuals/blog-brief.webp', 'visuals/blog-brand.webp', 'visuals/blog-mobile.webp'][index])} alt="" loading="lazy"/></div><div><small>{article.category} · WASLIVO Team</small><h2>{article.title}</h2><p>{article.intro}</p><span className="inline-link">Read article <ArrowRight size={16}/></span></div></Link>)}</div></section><CTA/></>
}
function ArticlePage({ id }) {
  const article = enArticles.find(item => item.id === id)
  if (!article) return <NotFound/>
  return <><section className={`editorial-hero editorial-hero-${id}`}><div className="container"><div className="breadcrumbs"><Link to="/blog">Articles & ideas</Link><ArrowRight size={14}/><span>{article.category}</span></div><span className="eyebrow">{article.category} · WASLIVO Team</span><h1>{article.title}</h1><p>{article.intro}</p></div></section><div className="section container article-layout"><article>{article.sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}<WButton message={`Hello WASLIVO, I read "${article.title}" and would like to discuss my website.`}>Discuss your project</WButton></article><aside><h3>More articles</h3>{enArticles.filter(item => item.id !== id).map(item => <Link key={item.id} to={`/blog/${item.id}`}>{item.title}<ArrowRight size={15}/></Link>)}</aside></div><ArticleContextLinks id={id} english/><CTA compact/></>
}
function LegalPage({ type }) {
  const privacy = type === 'privacy'
  return <section className="section legal-page container"><span className="eyebrow">WASLIVO</span><h1>{privacy ? 'Privacy policy' : 'Terms & conditions'}</h1>{privacy ? <><p>When you use the contact form, the site opens a WhatsApp message containing the information you entered. The message is sent only if you choose to send it in WhatsApp.</p><p>When you submit the website offer form, we store your name, phone number, and business activity in WASLIVO's Google Sheet so we can follow up about your request.</p><p>Once you open WhatsApp, the conversation is subject to that service's policies. You can contact us there with questions about your conversation data.</p></> : <><p>This site introduces WASLIVO's services. Portfolio examples are illustrative design concepts unless clearly stated otherwise.</p><p>The scope, deliverables, timeline, and final price of each project are defined in a separate proposal after discussing requirements.</p></>}<Link to="/contact" className="button button-outline">Contact us <ArrowRight size={17}/></Link></section>
}
function NotFound() {
  return <section className="not-found"><div className="container"><span>404</span><h1>Page not found</h1><p>The link may be incorrect or the page may have moved.</p><Link to="/" className="button button-gold">Back to home <ArrowRight size={17}/></Link></div></section>
}
function Page({ path }) {
  const bits = path.split('/').filter(Boolean)
  if (path === '/') return <Home/>
  if (markets[bits[0]] && bits.length === 1) return <MarketPage code={bits[0]} english/>
  if (bits[0] === 'services') return bits[1] ? <ServiceDetail id={bits[1]}/> : <ServicesPage/>
  if (bits[0] === 'portfolio' || bits[0] === 'works' || bits[0] === 'work') return bits[1] ? <ProjectDetail id={bits[1]}/> : <PortfolioPage/>
  if (path === '/about') return <AboutPage/>
  if (path === '/packages') return <PackagesPage/>
  if (path === '/contact') return <ContactPage/>
  if (bits[0] === 'blog') return bits[1] ? <ArticlePage id={bits[1]}/> : <BlogPage/>
  if (path === '/privacy' || path === '/terms') return <LegalPage type={bits[0]}/>
  return <NotFound/>
}
export function englishMetadata(path) {
  const project = enProjects.find(item => path === `/portfolio/${item.id}`)
  const service = enServices.find(item => path === `/services/${item.id}`)
  const article = enArticles.find(item => path === `/blog/${item.id}`)
  const labels = { '/': 'Home', '/services': 'Services', '/portfolio': 'Portfolio', '/about': 'About', '/packages': 'Packages', '/contact': 'Contact', '/blog': 'Articles', '/privacy': 'Privacy policy', '/terms': 'Terms & conditions' }
  return {
    title: `${project?.title || service?.title || article?.title || labels[path] || 'Page not found'} | WASLIVO`,
    description: project?.summary || service?.short || article?.intro || 'WASLIVO designs and develops professional websites, online stores, apps, and brand identities.',
  }
}
export default function EnglishSite({ path }) {
  const localPath = path.replace(/^\/en(?=\/|$)/, '') || '/'
  return <div className="english-site" dir="ltr"><Header path={localPath}/><main><Page path={localPath}/></main><Footer path={localPath}/><a className="floating-whatsapp" href={whatsapp(defaultMessage)} target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp"><img src="/assets/whatsapp.svg" width="29" height="29" alt="" aria-hidden="true"/></a></div>
}
