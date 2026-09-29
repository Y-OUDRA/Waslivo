# WASLIVO visual asset audit and production plan

## Audit of the published site

The live site was inspected across the homepage, services, portfolio, packages, about, contact, blog, and project-detail pages. The homepage contains a hero, seven service cards, a featured work strip, process, FAQ callout, and closing CTA. The services page adds seven service details; the portfolio page has category filters and ten concept projects, each with a detail page. Packages has three cards and a contact callout. About has a hero, story, method, process, and CTA. Contact has a hero, form, contact methods, FAQ, and CTA. The blog has three article cards and article pages.

The previous hero was usable but its screen was hard to judge at a glance. Several service cards reused unrelated sector photos; the logo and identity services were particularly mismatched. Portfolio cards used generic CSS device frames that hid most of the underlying work. Packages reused the hero and unrelated workspace photos. Article cards reused site photography rather than showing their topics. About and FAQ repeated the same few scenes. The new assets address each of those gaps.

## Shared generation direction

All prompts used the built-in image generator. The base direction was premium, photorealistic editorial photography: warm daylight; ivory stone, oak, deep navy, and restrained gold; accurate laptop and phone perspective; clean Arabic RTL interface hierarchy; no famous logos, fake testimonials, addresses, geography labels, watermarks, or surreal effects. Portfolio images show **concept designs**, as stated on the site; they are not presented as delivered client projects. Final WebP assets are in `public/assets/visuals/`, generally 100–195 KiB each. All source compositions were landscape 3:2; heroes use responsive crops with room for live text.

**Notation:** D+M = desktop and mobile UI; D = desktop UI; M = mobile UI; W = workspace scene; B = branding scene. Every prompt below adds the shared direction above.

| Asset ID | Page / section | Purpose and type | Recommended size; view | Specific generation prompt and visual notes | Final file |
|---|---|---|---|---|---|
| hero-main | Home / hero; shared service and package heroes | Show responsive website craft; hero | 1600×1000, wide crop; D+M, W | Silver laptop and phone showing one polished Arabic RTL property website, villa hero and listings; place devices left, reserve bright ivory space at right for live text. | `hero-main.webp` |
| service-web | Home and Services / website design | Make the main service immediately recognizable; service image | 1200×800; D+M, W | Laptop and phone with matching Arabic business website, architectural hero, visible navigation, service cards and action. | `service-web.webp` |
| service-development | Home and Services / custom development | Show actual development work; service image | 1200×800; D, W | Professional monitor with believable dark code editor beside a live Arabic website preview, keyboard on a refined desk. | `service-development.webp` |
| service-commerce | Home and Services / ecommerce | Show shopping flow; service image | 1200×800; D+M, W | Fictional unbranded perfume shop with product grid, prices, cart controls, and matching phone product page; no real-world product brands. | `service-commerce.webp` |
| service-apps | Home and Services / mobile apps | Show useful app screens; service image | 1200×800; M, W | Three phones with coordinated Arabic appointment app screens: dashboard, service list, booking calendar. | `service-apps.webp` |
| service-logo | Home and Services / logo design | Show design exploration; service image | 1200×800; D, B/W | Designer's desk with abstract logo sketches, pencil, swatches and laptop vector exploration; no invented company name. | `service-logo.webp` |
| service-identity | Home and Services / visual identity | Show coherent print system; service image | 1200×800; B | Navy folder, ivory letterhead, cards, envelope and notebook with one abstract gold mark; tactile paper and natural shadows. | `service-identity.webp` |
| service-social | Home and Services / social design | Show coordinated posts; service image | 1200×800; M, B/W | Phone feed and tablet editor with matching Arabic posts for a fictional interior studio; coherent navy, ivory and gold design. | `service-social.webp` |
| portfolio-property | Home and Portfolio / real estate; detail | Show full responsive interface; portfolio image | 1536×1024; D+M, W | Property website with residence photo, search controls, four listing cards and matching phone view; keep UI sharply visible. | `portfolio-property.webp` |
| portfolio-restaurant | Home and Portfolio / restaurant; detail | Show menu and booking UX; portfolio image | 1536×1024; D+M, W | Fine-dining site with plated-food hero, reservation action, menu cards, venue gallery and matching phone view. | `portfolio-restaurant.webp` |
| portfolio-education | Home and Portfolio / learning; detail | Show course discovery; portfolio image | 1536×1024; D+M, W | Course platform with instructor hero, category navigation, course cards, progress and phone list. | `portfolio-education.webp` |
| portfolio-dental | Home and Portfolio / clinic; detail | Show reassuring booking flow; portfolio image | 1536×1024; D+M, W | Clean dental site with clinician photo, appointment action, treatments, doctor cards and phone version. | `portfolio-dental.webp` |
| portfolio-company | Portfolio / company services; detail | Cover the company-site category; portfolio image | 1536×1024; D+M, W | Small architectural consultancy site with warm office hero, services, company introduction and inquiry action. | `portfolio-company.webp` |
| portfolio-commerce | Home and Portfolio / ecommerce; detail | Show product and cart UX; portfolio image | 1536×1024; D+M, W | Fictional home-fragrance store with candle and decor photography, categories, product prices and cart buttons. | `portfolio-commerce.webp` |
| portfolio-automotive | Home and Portfolio / automotive; detail | Show service booking; portfolio image | 1536×1024; D+M, W | Dark navy automotive service site with clean workshop photo, maintenance cards and booking action; no address or map. | `portfolio-automotive.webp` |
| portfolio-legal | Portfolio / legal services; detail | Match the professional-services concept; portfolio image | 1536×1024; D+M, W | Boutique legal site with scales-of-justice scene, areas of practice, consultation action and team area. | `portfolio-legal.webp` |
| portfolio-beauty | Portfolio / beauty; detail | Match the beauty concept; portfolio image | 1536×1024; D+M, W | Soft rose/ivory skincare store with product categories, four product cards and phone product view. | `portfolio-beauty.webp` |
| portfolio-plumbing | Portfolio / home services; detail | Match the home-service concept; portfolio image | 1536×1024; D+M, W | White/blue plumbing site with technician photo, service categories, appointment action and phone view. | `portfolio-plumbing.webp` |
| package-basic | Packages / basic tier | Show a focused starter website; package image | 1200×800; D, W | One laptop with a simple professional Arabic business website, concise hero and three service cards; no price graphics. | `package-basic.webp` |
| package-advanced | Packages / advanced tier | Show richer responsive scope; package image | 1200×800; D+M, W | Laptop and phone with a more detailed service site, structured grid and inquiry flow; no price graphics. | `package-advanced.webp` |
| package-custom | Packages / custom tier | Show tailored system work; package image | 1200×800; D+M, W | Dual monitors and phone with bespoke Arabic booking dashboard, calendar and useful overview charts; no price graphics. | `package-custom.webp` |
| blog-mobile | Blog / mobile article | Explain responsive design visually; blog image | 1200×800; D+M, W | Phone foreground and laptop behind showing matching Arabic site layouts, with wireframe notes on desk. | `blog-mobile.webp` |
| blog-brand | Blog / brand article | Link identity to website; blog image | 1200×800; D, B/W | Arabic website on laptop beside coordinated printed brand cards, typography and color samples. | `blog-brand.webp` |
| blog-brief | Blog / planning article and banner | Show practical preparation; blog image | 1200×800; D, W | Notebook with Arabic headings for goals, pages and content, wireframe sketches, and laptop sitemap. | `blog-brief.webp` |
| contact-main | Contact / hero and package CTA | Invite consultation; contact image | 1600×1000, wide crop; D+M, W | Laptop left with Arabic contact form, phone messaging UI, notebook and pen; reserve bright right-hand space for live copy. | `contact-main.webp` |
| about-story | About / story | Show the studio's website craft; supporting image | 1200×800; D+M, W | Large screen and phone with Arabic property-site design, physical grid sketches and color swatches. | `about-story.webp` |
| about-method | About / method; portfolio inquiry and site CTA | Show design process; supporting image | 1200×800; D+M, W | Monitor with Arabic website component library, tablet mobile layout, wireframes, pencil and material swatches. | `about-method.webp` |
| faq-support | Home and Contact / FAQ callout | Make support feel personal; supporting image | 1200×800; D+M, W | Laptop proposal overview and phone chat thread on warm desk, with cups and notebook, no personal details. | `faq-support.webp` |

## Implementation notes

- Seven service cards and their detail pages use the matching service assets.
- All ten concept projects use full-screen responsive showcase images on cards and detail pages. The project detail keeps a closer mobile crop of that same design.
- Each package and article card now has a distinct image. Contact, about story, method, and FAQ have dedicated scenes.
- The about hero retains its existing studio photograph and live WASLIVO logo overlay. Process steps remain code-native icon cards. Their visuals do not need raster images.
- The portfolio remains explicitly labeled as concept work until actual delivered client projects can be verified.
