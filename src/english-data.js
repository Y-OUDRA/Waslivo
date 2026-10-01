import { services as arabicServices, projects as arabicProjects, articles as arabicArticles } from './v2-data'

export const serviceCopy = {
  websites: {
    title: 'Website Design',
    short: 'Professional websites that reflect your brand and guide visitors toward the next step.',
    detail: 'We design a website that presents your services clearly and gives your brand a distinct presence on desktop and mobile.',
    points: ['A design tailored to your brand', 'Clear, responsive pages', 'An easy path for customers to contact you', 'Performance and search basics'],
  },
  development: {
    title: 'Custom Web Development',
    short: 'Digital features and experiences built around your real business needs.',
    detail: 'We build custom features such as booking, dashboards, and client portals after defining the scope with you.',
    points: ['Requirements analysis', 'Practical, fast interfaces', 'Project-specific integrations', 'Structured testing and delivery'],
  },
  commerce: {
    title: 'E-commerce Stores',
    short: 'An organized shopping experience that presents products clearly and makes ordering easier.',
    detail: 'We build a store suited to your products, from categories and product pages to payment and delivery planning.',
    points: ['Clear catalog and product pages', 'Mobile-friendly design', 'A smooth purchase journey', 'Platform-appropriate payment and delivery options'],
  },
  apps: {
    title: 'Mobile Apps',
    short: 'Practical mobile apps for projects that need a dedicated phone experience.',
    detail: 'We help define the core features and screens, then build the app within a clear scope.',
    points: ['User experience planning', 'App screen design', 'Development and testing', 'Launch preparation'],
  },
  logos: {
    title: 'Logo Design',
    short: 'A thoughtful logo that reflects your business and is easy to remember.',
    detail: 'We start by understanding your business, then create a visual direction that works in digital and print.',
    points: ['Design directions', 'Coordinated colors and typography', 'Practical file formats', 'Core logo applications'],
  },
  identity: {
    title: 'Brand Identity',
    short: 'A consistent visual language across your website and every customer touchpoint.',
    detail: 'We build a visual system that unifies colors, typography, logo use, and imagery.',
    points: ['Color palette', 'Typography system', 'Usage guidelines', 'Application examples'],
  },
  social: {
    title: 'Social Media Design',
    short: 'Social posts aligned with your brand identity and message.',
    detail: 'We prepare reusable templates and campaign visuals with content you provide or content we agree to develop.',
    points: ['Consistent templates', 'Campaign graphics', 'Platform-ready sizes', 'Files ready to publish'],
  },
}

export const enServices = arabicServices.map(service => ({ ...service, ...serviceCopy[service.id] }))

export const projectCopy = {
  automotive: {
    title: 'Auto Service Website', filter: 'Companies & Services',
    summary: 'A garage website concept that presents services clearly and guides visitors toward an inspection or quote.',
    goal: 'Explain the available services and booking process before a customer gets in touch.',
    solution: 'A strong first screen, clear service cards, a simple process, and a direct service request.',
    features: ['Service categories', 'Inspection request', 'Location information', 'Fast browsing'],
  },
  education: {
    title: 'Learning Platform', filter: 'Education',
    summary: 'A platform concept that presents courses and programs with a clear enrollment path.',
    goal: 'Show educational programs and their content in a way that makes comparison easy.',
    solution: 'Course categories, detail pages, and a direct registration path.',
    features: ['Program list', 'Course details', 'Registration form', 'Content dashboard'],
  },
  ecommerce: {
    title: 'Home Decor Store', filter: 'E-commerce',
    summary: 'A store concept that organizes home decor into clear categories and a comfortable shopping journey.',
    goal: 'Help visitors discover products and understand them before ordering.',
    solution: 'Organized product pages, clear imagery, and a shorter checkout path.',
    features: ['Product pages', 'Clear categories', 'Shopping cart', 'Mobile experience'],
  },
  restaurant: {
    title: 'Restaurant Website', filter: 'Restaurants',
    summary: 'An image-rich concept that presents the atmosphere and menu while making reservations easier.',
    goal: 'Convey the restaurant experience and help visitors explore dishes and book a table.',
    solution: 'Strong imagery, organized menu sections, visitor information, and a booking call to action.',
    features: ['Organized menu', 'Dish gallery', 'Reservation request', 'Comfortable mobile experience'],
  },
  dental: {
    title: 'Dental Clinic Website', filter: 'Clinics',
    summary: 'A clinic concept that explains treatments, introduces the team, and makes appointment requests clear.',
    goal: 'Present key medical information in a calm, accessible way while respecting privacy.',
    solution: 'A clear homepage, treatment categories, team profiles, and an appointment path.',
    features: ['Treatment overview', 'Appointment requests', 'Responsive design', 'Readable content'],
  },
  property: {
    title: 'Real Estate Platform', filter: 'Real Estate',
    summary: 'A property concept that helps visitors explore listings and compare their details.',
    goal: 'Organize property listings so visitors can search and understand each unit.',
    solution: 'Property cards, practical filters, detail pages, and a quick inquiry route.',
    features: ['Property listings', 'Unit details', 'Useful filters', 'Viewing requests'],
  },
  'facilities-services': {
    title: 'Facilities Services Website', filter: 'Companies & Services',
    summary: 'A concept that introduces facilities management services and makes inquiries straightforward.',
    goal: 'Present service areas and capabilities in an organized way.',
    solution: 'Clear service sections, process information, and a direct contact path.',
    features: ['Service overview', 'Work areas', 'Inquiry request', 'Mobile experience'],
  },
  'beauty-store': {
    title: 'Beauty & Care Store', filter: 'E-commerce',
    summary: 'A store concept that makes beauty and care products easy to browse.',
    goal: 'Help visitors discover products and choose what suits them.',
    solution: 'Clear product categories, detail pages, and a mobile-friendly purchase flow.',
    features: ['Product categories', 'Product details', 'Shopping cart', 'Responsive design'],
  },
  'interior-design': {
    title: 'Interior Design Portfolio', filter: 'Interior Design',
    summary: 'A concept that showcases interior design projects and studio services.',
    goal: 'Present past work and services in a clear visual experience.',
    solution: 'A project gallery, service pages, and a direct path to discuss a new project.',
    features: ['Project gallery', 'Service overview', 'Project details', 'Consultation request'],
  },
  'resort-hotel': {
    title: 'Resort & Hospitality Website', filter: 'Hospitality',
    summary: 'A concept that introduces the stay, amenities, and booking options.',
    goal: 'Help visitors explore the destination and choose their stay.',
    solution: 'Clear photos, rooms and amenities, and a simple booking inquiry route.',
    features: ['Room overview', 'Amenities', 'Stay information', 'Booking inquiry'],
  },
}

export const enProjects = arabicProjects.map(project => ({ ...project, ...projectCopy[project.id] }))
export const enFilters = ['All', 'Real Estate', 'Restaurants', 'E-commerce', 'Clinics', 'Companies & Services', 'Education', 'Interior Design', 'Hospitality']

const articleCopy = {
  'website-brief': {
    title: 'What does your website need before design begins?', category: 'Website Planning',
    intro: 'A good website starts with clear goals and useful content before choosing colors and images.',
    sections: [
      ['Start with a clear goal', 'Decide what you want visitors to do: inquire, book, buy a product, or learn about your services. That goal shapes the pages and calls to action.'],
      ['Gather the essentials', 'Prepare service descriptions, relevant photos, common customer questions, and your preferred contact method. You can refine the wording later, but the basics help create a useful, honest design.'],
      ['Think through the visitor journey', 'What does a customer need to know first? What would make them comfortable contacting you? Organizing the answers is more helpful than adding sections without a purpose.'],
    ],
  },
  'brand-site': {
    title: 'How can a website strengthen your brand?', category: 'Digital Identity',
    intro: 'Your website is a space you own for presenting your personality and services consistently.',
    sections: [
      ['The first impression', 'Colors, type, imagery, and tone work together. When they are consistent, visitors understand and remember your business more easily.'],
      ['Explain your services clearly', 'Put your main services where people can find them. Explain what customers receive and what they should do next. Clarity matters more than generic claims.'],
      ['Make the website part of your system', 'Connect the site with your social channels and marketing messages, and use a consistent visual language across ads, landing pages, and conversations.'],
    ],
  },
  'mobile-first': {
    title: 'Why should your website work well on mobile?', category: 'User Experience',
    intro: 'Many visitors arrive on a phone. They need readable content, easy navigation, and direct contact options.',
    sections: [
      ['Readable content', 'Clear headings, short paragraphs, and enough space between elements make pages easier to browse.'],
      ['Buttons people can use', 'Actions such as requesting a quote should be easy to find and large enough to tap.'],
      ['Speed and testing', 'Image size and a simple interface affect loading. Test the site on different screen sizes before launch.'],
    ],
  },
}
export const enArticles = arabicArticles.map(article => ({ ...article, ...articleCopy[article.id] }))

export const enFaq = [
  ['How much does a website cost?', 'Packages start at 799 SAR. The final price depends on the pages, features, and content, and we confirm it after discussing your project.'],
  ['How long does a project take?', 'The schedule depends on the scope and whether the content is ready. We set out the stages and estimated timeline in the proposal.'],
  ['Can I request changes?', 'Yes. We agree on review stages and revisions within the project scope before work begins.'],
  ['Will my website work on mobile?', 'Yes. We design and test the interface across different screen sizes.'],
  ['Can the website connect to WhatsApp?', 'Yes. We can add direct buttons and prepared messages that help customers contact you.'],
  ['Do you provide support after launch?', 'We can agree on a support and updates plan that fits the project.'],
  ['Can you build an online store?', 'Yes. We define the platform, products, payment, and delivery requirements with you before building.'],
  ['Can you design a mobile app?', 'Yes. We start by defining the app goals, screens, and core features.'],
]
