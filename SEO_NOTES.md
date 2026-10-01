# WASLIVO search foundation

The published site remains Arabic at `/` and English at `/en`. Existing service, project, and article URLs stay in place. The five market routes are `/sa`, `/ae`, `/kw`, `/qa`, and `/ma`, each with a corresponding `/en/<market>` page. These pages describe services for those audiences; they do not claim local offices.

## Keyword-to-page map

| Page | Primary intent | Supporting intent |
| --- | --- | --- |
| `/` | تصميم وتطوير مواقع إلكترونية | وكالة تصميم مواقع، حضور رقمي للأعمال |
| `/services/websites` | تصميم موقع إلكتروني احترافي | تصميم موقع شركة، موقع متجاوب |
| `/services/development` | تطوير مواقع إلكترونية مخصصة | وظائف موقع، حجز، بوابات عملاء |
| `/services/commerce` | تصميم متجر إلكتروني | إنشاء متجر، صفحات منتجات، مسار شراء |
| `/services/apps` | تطبيقات الجوال | تصميم تطبيق، تطوير تطبيق |
| `/services/logos` | تصميم شعار | شعار لنشاط تجاري |
| `/services/identity` | تصميم هوية بصرية | نظام ألوان وخطوط للعلامة |
| `/services/social` | تصميم منشورات السوشيال ميديا | قوالب منشورات متسقة |
| `/sa` | تصميم مواقع للأعمال في السعودية | مواقع شركات، متاجر، عقارات |
| `/ae` | تصميم مواقع للشركات والمتاجر في الإمارات | مواقع عربية وإنجليزية |
| `/kw` | تصميم مواقع للشركات في الكويت | خدمات، مطاعم، متاجر |
| `/qa` | تصميم مواقع للأعمال في قطر | عيادات، ضيافة، شركات |
| `/ma` | إنشاء مواقع للأعمال في المغرب | أعمال محلية، متاجر، ضيافة |

English counterparts target natural equivalents without repeating Arabic keywords. Project and article pages target their own topics rather than competing with the commercial landing pages. `/services/websites` and similar established URLs are retained to protect existing links; no duplicate slug aliases were added.

## Metadata and structured data

`src/seo-data.js` owns titles, descriptions, canonicals, social metadata, route inventory, and JSON-LD. The build prerenders the visible page content and emits a sitemap from the same route inventory. Market pairs use `ar-SA`/`en-SA` and equivalent codes for the other four markets. Other page pairs use `ar`/`en`. Each set includes a self-link and `x-default` fallback. All URLs are absolute and reciprocal.

JSON-LD includes verified Organization, WebSite, WebPage, BreadcrumbList, Service, and Article information where relevant. It does not contain unverified reviews, addresses, awards, or results. The official Instagram, Facebook, and TikTok URLs, phone, logo, and brand names are centralized in `src/site-config.js`. Visible FAQs are written for users; no FAQ rich-result promise is made.

`scripts/prerender.mjs` accepts `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` during the build, if the owner supplies real verification values. No values are committed. Analytics remains disabled until the owner supplies an ID and updates the privacy notice for the chosen measurement setup. IndexNow also needs a real owner-controlled key and deployment process before activation.

## Crawl and performance QA

- `npm run build` generates prerendered Arabic and English HTML plus `public/sitemap.xml` and `dist/sitemap.xml`.
- `node check-site.mjs` checks unique titles and descriptions, one H1, self-canonicals, reciprocal hreflang, schema JSON, links, and assets for every listed route.
- `robots.txt` allows public content and points to the sitemap. Unknown routes have a prerendered noindex `404.html`; verify the production host returns HTTP 404 rather than a 200 fallback.
- Existing hero assets are WebP and under 210 KB each. The production build uses prerendered copy; fonts load with `display=swap` and preconnect. Confirm LCP, INP, and CLS with field data after deployment. Lighthouse is not part of the installed tooling in this workspace.

## Owner review before publishing

1. Review every market page for wording that matches services actually offered there, including whether payment and delivery integrations are available for each project.
2. Confirm the public phone and social profiles. Add a business email only if it is intended to be public; none was guessed.
3. Supply genuine project case studies, screenshots, outcomes, and permission to name clients if available. Current portfolio content is explicitly labelled as illustrative concepts.
4. Provide reviewed publication and update dates for articles before adding date metadata. Existing articles have a team byline but no invented dates.
5. Expand the content hub with researched, original guides on site pricing, choosing a web design partner, e-commerce planning, and mobile conversion. Publish a guide only when it adds concrete experience or examples.
6. Add verified French content for Morocco only if a French-language strategy is approved; the current site supports Arabic and English.

## Search Console and Bing handoff

1. After deploying this build, open `/robots.txt` and `/sitemap.xml` on the production domain and inspect a sample market page's HTML source.
2. Add `waslivo.agency` to Google Search Console and verify ownership through DNS, or supply the real HTML verification value as `GOOGLE_SITE_VERIFICATION` in the build environment. Submit `https://waslivo.agency/sitemap.xml`, then inspect the homepage, one service page, and each market page.
3. Add the site to Bing Webmaster Tools, either by importing the verified Search Console property or verifying ownership directly. If using the HTML meta method, set `BING_SITE_VERIFICATION` at build time. Submit the same sitemap and inspect representative URLs.
4. Monitor indexing, Core Web Vitals, crawl errors, and queries. Verification and submission require the owner's account access; no token or account action is embedded in the repository.

Reference documentation: [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Bing site verification](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Bing sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed).
