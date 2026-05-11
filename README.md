# Shynli.com Design Prototype

Vite + React + shadcn-style prototype for the first Shynli Cleaning website direction.

## Resource Index

- [00_resource_index.md](00_resource_index.md) — navigation layer for source files, public assets, build output, and verification screenshots.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS v4
- shadcn components via `components.json`
- lucide-react icons

## Run

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## Design Intent

The page combines:

- fast first screen and quote flow from `Tidy Casa` / `Maid Marines`
- clear service choice from `Qleen`
- trust / guarantee structure from `Molly Maid`
- local, human service-area feeling from `Better Life Home`
- ZIP-first entry from `Homeaglow`, without the discount / membership trap

The hero uses a cleaner-in-action image, not an empty kitchen, because the first screen should sell trust in the people doing the work. Clean-room imagery can still support lower sections as proof of outcome.

Hero image source: Pexels photo `6195111`, stored locally as `public/cleaner-hero.jpg`.
Trust block image source: Pexels photo `7814775`, stored locally as `public/trust-care.jpg`.
Naperville city hero image source: Wikimedia Commons `Naperville, Illinois Riverwalk Downtown Water Street.jpg` by Opalenterprises / Opal Enterprises, licensed CC BY-SA 4.0, stored locally as `public/naperville-riverwalk.jpg`.

## Competitor Pass

The latest design pass compared the prototype against `Maid Marines`, `Tidy Casa`, `MyClean`, `Better Life Home`, `Qleen`, `Molly Maid`, and `Homeaglow`.

Changes made after that comparison:

- stronger full-bleed hero with a cleaner-in-action photo
- quote panel expanded beyond ZIP into service type, home details, ZIP, and CTA
- immediate trust strip below the hero
- cleaner service tabs and checklist layout
- explicit comparison against independent cleaners and large franchises
- mobile tab fit and tap target checks

## Color Direction

The interface now uses a clean-blue direction instead of green:

- navy for trust and contrast
- soft sky-blue for cleanliness, water, air, and freshness
- white surfaces for service selection and checklists
- minimal warm accent usage

The services block was redesigned from a heavy grid into a lighter service selector with checklist cards and a `Before / During / After` booking-support row.

## Logo

The header and favicon now use a custom clean-blue water-drop mark with a small sparkle, paired with a simple `Shynli` wordmark. This replaces the previous placeholder `S` circle.

## Typography Pass

Section headings below the hero were shortened and scaled down so the page feels calmer, more premium, and less like oversized placeholder copy.

## Visitor Copy Pass

Visible website copy has been rewritten away from internal build language and toward visitor-facing sales language. Terms such as `SEO`, `internal links`, `route checks`, `service level`, `quote factors`, and `not applicable` were removed from customer-facing surfaces. The copy now focuses on clear pricing, real home situations, what cleaners do, what changes the price, and how easy it is to check whether Shynli can help.

The latest visible-copy scan checked `document.body.innerText` across all 252 sitemap URLs plus the direct standalone routes. Technical markers such as `prototype`, `schema`, `canonical`, `internal links`, `city-service pages`, `search intent`, `launch`, `draft`, `shadcn`, and `CRM fields` now return `0` visible hits.

## City Page Image Pass

City pages now include a visual service-moment section after the service cards. It uses three photo tiles for prepared arrival, lived-in reset, and move-ready rooms, so local pages do not feel like text-only SEO pages.

## Trust Block

The trust section no longer repeats the hero image. It now uses a separate care-detail photo with `Prepared / Insured / Followed up` proof points, so the block sells process and standards without making every visual depend on faces.

## Service Area

The homepage service area section intentionally shows only `12` primary route cities, plus a `View all 42 cities` link. The full city list from `https://shynlicleaningservice.com/service-areas` lives on `/service-areas`, with individual city routes under `/service-areas/{city-slug}` for all listed cities.

Each city route follows the local SEO page standard at a prototype level and is no longer a thin city-name swap:

- unique `title`, `meta description`, and `H1`
- local intro and quote CTA
- standard, deep, move, and recurring service sections
- real booking-intent sections for weekly resets, catch-up cleans, and move timing
- property-type coverage for homes, apartments, condos, townhouses, and move homes
- room-by-room checklist block
- price / quote flow block, FAQ, nearby-city internal links
- JSON-LD for `LocalBusiness`, `Service`, `FAQPage`, and `BreadcrumbList`
- CTA data attributes for future CRM tracking

The prototype also includes `public/sitemap.xml` and `public/robots.txt` for the city page architecture.

All 42 service-area city pages now have city-associated hero backgrounds and local labels. Naperville keeps the local Riverwalk / Downtown Naperville image, while the other city pages use direct Wikimedia image URLs tied to city, downtown, river, village, or nearby county-area visuals such as `Aurora downtown / Fox River`, `Downtown Plainfield`, `Downtown Wheaton`, and `Bristol / Kendall County area`.

## Spacing And Reviews

Section spacing was tightened across the page so the experience feels denser and more intentional. A `Reviews` block now sits between the process section and FAQ, giving the page a social-proof layer before it answers booking objections.

## Service Pricing Cards

The services section now opens with four pricing cards: `Standard`, `Deep Cleaning`, `Move Clean`, and `Recurring`. Each card includes a short service description, checklist signal, key inclusions, starting price, and quote CTA. The prices are presented as starting points, with the quote flow still confirming ZIP, home size, condition, add-ons, and schedule before booking.

The visible starting prices now mirror the live Shynli pricing page:

- Weekly Cleaning: `$135` / visit
- Bi-Weekly Cleaning: `$145` / visit
- Monthly Cleaning: `$155` / visit
- Deep Cleaning calculator starting point: `$152`
- Move In / Move Out calculator starting point: `$197`

The homepage and `/pricing` also show the published add-on prices: Wet Baseboards `$22`, Inside Cabinets `$45`, Polishing wooden furniture `$20`, Bed linen replacement `$8`, Doors `$22`, Inside Fridge `$45`, Inside Oven `$45`, and Interior Windows `$6 per window`.

## Business Contact And Arrival Hours

The prototype now uses the real live-site contact details instead of placeholder data:

- public business name: `Shynli Cleaning`
- legal business name: `SHYNLI LLC`
- phone: `+1 (630) 812-7077`
- email: `info@shynli.com`
- preferred arrival slots shown on the live quote form: `9 AM-4 PM CT`

The live site does not publish a separate office-hours block, so the prototype does not invent one. The visible footer uses the quote-form arrival window language, and structured data uses the real phone without adding fake `openingHours`.

## Service SEO Pages

The prototype now includes a service index at `/services`, fifteen service pages under `/services/{service-slug}`, and city + service pages for the primary homepage cities under `/service-areas/{city-slug}/{service-slug}`.

Service pages created:

- `Regular Cleaning`
- `Deep Cleaning`
- `Move-In Cleaning`
- `Move-Out Cleaning`
- `Move-In / Move-Out Cleaning`
- `One-Time Cleaning`
- `Recurring Cleaning`
- `Apartment Cleaning`
- `House Cleaning`
- `Townhouse Cleaning`
- `Condo Cleaning`
- `Weekly Cleaning`
- `Biweekly Cleaning`
- `Rental Cleaning`
- `Airbnb Cleaning` as a draft service cluster built with the same shadcn-based service-page system; it is available by direct prototype URL, but intentionally excluded from public service navigation and sitemap until operations confirm turnover fulfillment.
- `Post-Construction Cleaning`

City + service pages are generated for the 12 primary cities shown on the homepage and 11 services, for 132 local service URLs. Each page is built as a full SEO landing page with unique title/meta/H1, quote form, included-work checklist, best-fit situations, pricing logic, internal links, trust block, FAQ, `Service` schema, `FAQPage` schema, and `BreadcrumbList` schema.

## Shiny Deep Cleaning Site

The `/services/deep-cleaning` route now opens a separate shadcn-built `Shiny Deep Cleaning` site. The same standalone concept is also available at `/shiny-deep-cleaning`.

This is no longer a generic Shynli service page with an inserted block. The design direction is intentionally different:

- dark editorial hero with acid-lime accent, warm ivory page surface, and a separate brand mark
- full-screen `Shiny Deep` first impression instead of the shared clean-blue Shynli template
- fast quote flow inspired by `Tidy Casa` and `Maid Marines`
- included / quoted extras / not covered scope tabs inspired by `Euro Maids` and `MyClean`
- checklist proof for kitchen buildup, bathroom recovery, house edges, and final reset
- trust grid that translates competitor patterns into customer-facing promises
- final CTA and full footer with deep-cleaning, service-area, and trust navigation

## Shiny Airbnb Cleaning Site

The prototype now includes a separate shadcn-built microsite at `/shiny-airbnb-cleaning`. This is not a public service-page launch and is intentionally kept out of `/services` and `sitemap.xml`.

The design direction is completely separate from the Shynli service template:

- Airbnb-adjacent visual language: white surface, `#FF385C` action color, black/gray typography, rounded search pill, and listing-like photo grid
- independent header, proof stack, and host intake form
- dedicated local image set in `public/airbnb-turnover/` for guest-ready bedroom, fresh towels, clean bedroom, and bathroom/towel service moments
- competitor patterns integrated from `Artez Clean`, `Super Clean Co`, `Stayready`, `Turno`, `HappyClean BnB`, and STR-focused local teams
- operational blocks for turnover timing, linens, restocking, photo proof, issue notes, and ready status
- draft-only launch language so the site can exist before operations promise same-day turnover fulfillment

## SEO Backlog Pages

The remaining launchable pages from `38_seo_pages_to_add_2026-05-09` are routed through a full SEO page template, not a thin placeholder. Parking-lot services that need operational confirmation are intentionally excluded.

Added clusters:

- P0 hubs: `/pricing`, `/quote`, `/about`, `/reviews`, `/faq`, `/checklists`, `/contact`
- price / cost pages: 6 URLs
- checklist pages: 7 URLs
- situation pages: 12 URLs
- FAQ / question pages: 10 URLs
- trust / conversion pages: 9 URLs
- comparison pages: 6 URLs
- local guide pages: 3 URLs

The sitemap now contains 252 URLs and includes every generated page.

## SEO Depth Verification

The SEO page system was re-checked against the full `public/sitemap.xml` after thin-page feedback. The audit covered all 252 URLs and checked visible word count, H1 count, H2 count, section count, internal links, title, meta description, canonical URL, JSON-LD schema, hero background image, and horizontal overflow.

Result: `weakCount: 0`.

Minimum verified depth by route family:

- service pages: `652`+ visible words
- service-area hub: `660` visible words
- city pages: `865`+ visible words
- city + service / local guide pages: `704`+ visible words
- pricing pages: `804`+ visible words
- generic SEO pages: `749`+ visible words
- FAQ pages: `797`+ visible words
- checklist pages: `768`+ visible words

Every generated page now includes title, meta description, canonical, schema, one H1, internal links, a meaningful hero image, and no horizontal overflow in the automated crawl.

## Pre-Production SEO QA

The first-wave SEO check now covers quality, internal linking, schema, CTA density, local relevance, speed, and doorway risk.

Latest results:

- Top-30 priority URL QA: `0` failures
- Full sitemap QA: `252` URLs, `weakCount: 0`
- City + service doorway similarity improved from `0.963-0.976` average / `1.000` max to roughly `0.770-0.779` average / `0.832` max
- Risky city + service pairs at `>= 0.86` similarity: `0`
- Homepage now has title, meta description, canonical, and `LocalBusiness + WebSite` schema
- City + service pages now include a `Local visit notes` block with city-specific home mix, access notes, timing notes, nearby route context, and service-specific booking notes
- Production build passes; remaining speed item is the single JS chunk warning at `528.22 KB` before gzip / `136.94 KB` gzip

## Bundle Split

Production chunking is configured in `vite.config.ts` so the main application code no longer ships as one large JS file.

Current build output:

- app chunk: `285.71 KB`, gzip `60.26 KB`
- `vendor-react`: `197.56 KB`, gzip `62.23 KB`
- `vendor-icons`: `13.96 KB`, gzip `5.64 KB`
- `vendor`: `30.54 KB`, gzip `10.15 KB`
- CSS: `78.29 KB`, gzip `13.24 KB`

The previous Vite warning for a JS chunk larger than `500 KB` is gone.

## Production Structure

The prototype is no longer held inside one monolithic `App.tsx`.

- `src/App.tsx` is a thin route resolver only.
- `src/site/data.ts` contains service, city, SEO, checklist, review, footer, image, and internal-link data.
- `src/site/shared.tsx` contains reusable site components and schema helpers such as `EstimateCard`, header, footer, sticky booking bar, metadata, service schema, city schema, and checklist helpers.
- `src/site/pages.tsx` contains the shared page templates for homepage, service-area hub, city pages, service pages, city + service pages, and generic SEO pages.
- `src/site/standalone-pages.tsx` contains the separate microsite-style pages: deep cleaning, apartment cleaning, move-out cleaning, and Airbnb cleaning.

The refactor keeps the same route behavior while making the site safer to extend for production SEO pages, landing pages, and future CRM-connected quote flows.

## Process Photos

The `How it works` section now uses five warmer photo tiles instead of technical SVG illustrations. The photos focus on booking, access, cleaning supplies, fresh results, and clean empty-room rhythm without making race or identity the visual point of the section.

## Footer

The page now includes a full footer with a Shynli brand block, phone number, local service-area signal, service links, company/support navigation, and legal links for `Terms of Service`, `Privacy Policy`, `Cancellation Policy`, and `Accessibility`. The reviews and FAQ sections have stable IDs for footer navigation.

## Legal Pages

The footer legal links now open real legal pages instead of placeholder routes:

- `/terms`
- `/privacy`
- `/cancellation`

The page text was copied from the live Shynli Cleaning documents at `https://shynlicleaningservice.com/terms-of-service`, `https://shynlicleaningservice.com/privacy-policy`, and `https://shynlicleaningservice.com/cancellation-policy` on `2026-05-10`. Each page includes a source link back to the live document.

## Sticky Booking Bar

The page now has a fixed bottom booking bar inspired by competitor conversion patterns. On desktop it includes a contact bubble, `Book your home cleaning` CTA, ZIP input, and `Go` button. On mobile it collapses to a compact one-line ZIP form so it stays useful without covering too much of the page.

## Hero Estimate Interactions

The hero estimate card is now interactive: `Standard`, `Deep`, and `Move` update active state, while bedrooms and bathrooms use stepper controls. Mobile uses compact `beds` / `baths` labels to keep the controls readable. City pages reuse the same quote card in the hero, with city-specific heading text such as `Check cleaning times in Addison`, so visitors can start booking without leaving the local page.

## Quote Handoff

Visual quote forms now hand off to the live quote route at `https://shynlicleaningservice.com/quote`.

The shared quote URL builder sends the fields that are already available on the page:

- `zip`
- `city`
- `service`
- `bedrooms`
- `bathrooms`
- `landing_page_url`
- `source_page`
- `add_ons`
- `notes`

This is not a CRM API integration yet. It is a production-safe handoff layer so the quote page can receive context from homepage, city pages, city + service pages, sticky bars, and standalone service pages.

## Checklist Modal

Service pricing cards now open a detailed checklist modal. The checklist compares `Standard`, `Deep`, and `Move` side by side, with clear markers for included work, quoted add-ons, and tasks that do not apply to an empty move-out home. Move cleaning now includes empty-home handoff tasks such as empty cabinets, closets, shelving, floors, access notes, and lock-up, while appliance interiors, interior windows, blinds, walls, and heavy trash are shown as quoted add-ons instead of hidden promises.

## Internal Linking

The SEO pages are now linked as a visible site architecture rather than only listed in `sitemap.xml`.

- City pages link directly to local service pages, for example `/service-areas/naperville` links to `/service-areas/naperville/deep-cleaning`.
- The service-area hub links the priority city-service matrix for the 12 key cities.
- Service pages link to their matching city-service pages when local pages exist.
- Generic SEO pages render related cluster links for pricing, checklists, FAQ, trust, comparisons, situations, and local guides.
- Header and footer navigation expose the main hubs: `Services`, `Areas`, `Pricing`, `Checklists`, `FAQ`, `Why Shynli`, and `Reviews`.

## Hero Backgrounds

Large top hero sections now use meaningful image backgrounds instead of a repeated dark abstract panel.

- Service pages map to the customer intent: regular / house pages use cleaner-in-action imagery, deep and post-construction pages use detail-care imagery, move-out and rental pages use finished-home imagery, recurring pages use repeat-rhythm imagery, and access-sensitive pages use access-ready imagery.
- Generic SEO pages choose imagery by cluster: pricing and quote pages use quote-start imagery, checklists use detail-care imagery, FAQ and trust pages use follow-up imagery, local guide pages use city-associated imagery when available.
- `/services`, `/service-areas`, and `/services/apartment-cleaning` also use real background-image hero layers.

## Verification

Last checked:

```bash
npm run build
npm run lint
npx playwright screenshot --viewport-size=1440,1000 http://127.0.0.1:5173/ screenshots/home-desktop.png
npx playwright screenshot --viewport-size=390,1000 http://127.0.0.1:5173/ screenshots/home-mobile.png
npx playwright screenshot --full-page --viewport-size=1440,1000 http://127.0.0.1:5173/ screenshots/desktop-full.png
npx playwright screenshot --full-page --viewport-size=390,1000 http://127.0.0.1:5173/ screenshots/mobile-full.png
```

Additional quality checks:

- Playwright interaction check for `Move-ready checklist` modal and accordion sections
- city page depth check for `/service-areas/naperville`: no horizontal overflow at `390`, `768`, `1024`, and `1280` px
- full-page screenshots: `screenshots/desktop-full.png`, `screenshots/mobile-full.png`
- city page screenshot: `screenshots/city-page-rich-naperville-2026-05-09.png`
- city hero screenshot: `screenshots/city-hero-riverwalk-naperville-2026-05-09.png`
- city image section screenshot: `screenshots/city-page-images-naperville-2026-05-09.png`
- city hero form screenshot: `screenshots/city-hero-form-addison-2026-05-09.png`
- city + service screenshot: `screenshots/city-service-deep-cleaning-naperville-2026-05-09.png`
- post-construction service screenshot: `screenshots/post-construction-cleaning-service-2026-05-10.png`
- checklist modal screenshot: `screenshots/checklist-move-modal-2026-05-09.png`
- trust image screenshot: `screenshots/trust-care-photo-2026-05-09.png`
- process photo screenshot: `screenshots/process-photos-2026-05-09.png`
- no horizontal overflow at `1440`, `390`, and `360` px
- no visible tap targets below `44px`
- copy check confirmed visitor-facing pages no longer show internal terms like `SEO`, `internal linking`, `route checks`, `Quote factors`, `service level`, or `Not applicable`
- service SEO routing checks passed for `/services`, `/services/deep-cleaning`, `/services/one-time-cleaning`, `/service-areas/naperville/deep-cleaning`, and `/service-areas/aurora/move-out-cleaning`
- expanded SEO routing and sitemap checks passed for `/pricing`, `/checklists/deep-cleaning-checklist`, `/faq/regular-cleaning-vs-deep-cleaning`, `/why-shynli`, `/service-areas/naperville/weekly-cleaning`, and `/service-areas/naperville/cleaning-guide`
- internal-link crawl over `252` sitemap URLs passed with `0` orphan pages and `0` weak internal-link pages
- hero background crawl over `252` sitemap URLs passed with `0` pages missing hero background images and `0` horizontal overflow pages
- post-construction routing checks passed for `/services/post-construction-cleaning`, `/service-areas/naperville/post-construction-cleaning`, `/pricing/post-construction-cleaning-cost`, `/checklists/post-construction-cleaning-checklist`, `/faq/what-is-included-in-post-construction-cleaning`, and `/post-construction-cleaning-vs-deep-cleaning`
- Airbnb cleaning draft route check passed for `/services/airbnb-cleaning`; this route uses shadcn components and is intentionally kept out of public service navigation / sitemap until the launch gate is open.
- Shiny Airbnb Cleaning microsite checks passed for `/shiny-airbnb-cleaning`; sales-copy desktop and mobile screenshots: `screenshots/shiny-airbnb-cleaning-sales-copy-desktop-2026-05-10.png`, `screenshots/shiny-airbnb-cleaning-sales-copy-mobile-2026-05-10.png`
- Airbnb Cleaning visitor-facing copy check passed: no visible `draft`, `competitor`, `reference stack`, `prototype`, `technical`, `pattern`, `internal`, `site borrows`, or `not public launch` language remains on the page.
- polished separate deep-cleaning site checks passed for `/services/deep-cleaning` and `/shiny-deep-cleaning`; no horizontal overflow at `360`, `390`, `820`, and `1440` px; footer has `15` links; internal prototype copy removed from visible page; screenshots: `screenshots/shiny-deep-polished-desktop-1440-2026-05-10.png`, `screenshots/shiny-deep-polished-mobile-390-2026-05-10.png`
- city hero image checks passed for `/service-areas/addison`, `/service-areas/aurora`, `/service-areas/plainfield`, `/service-areas/wheaton`, `/service-areas/bristol`, and `/service-areas/willowbrook`; these checks verify image layer, image URL `200`, local label, and no horizontal overflow
- production-structure route smoke passed for `/`, `/services`, `/service-areas`, `/services/deep-cleaning`, `/services/apartment-cleaning`, `/service-areas/naperville`, `/service-areas/aurora/move-out-cleaning`, `/pricing`, and `/shiny-airbnb-cleaning`; each route returned one H1 and no horizontal overflow.
- quote handoff checks passed: `/service-areas/naperville/deep-cleaning` submits to `https://shynlicleaningservice.com/quote` with `zip`, `city`, `service`, `bedrooms`, `bathrooms`, `source_page`, and `landing_page_url`; `/shiny-move-out-cleaning` submits to the same quote route with `zip`, `service`, `notes`, and `source_page`.
- legal page checks passed for `/terms`, `/privacy`, and `/cancellation`; each route renders the real copied legal text, one H1, and no horizontal overflow.
- live pricing check passed for `/` and `/pricing`; both routes display `$135`, `$145`, `$155`, `$152`, `$197`, `$45`, `$22`, `$20`, `$8`, and `$6 per window` with no horizontal overflow.
- production QA pass on `2026-05-10`: `255` sitemap URLs crawled with `0` failures for status, title, meta description, canonical, robots meta, H1 count, JSON-LD, mobile horizontal overflow, placeholder phone, and internal source blocks. `robots.txt` and `sitemap.xml` now use `https://shynli.com`, non-launch `/shiny-*` preview routes have `noindex,follow`, and unknown routes render a noindex 404 page.
- quote form QA passed for homepage hero, city hero, city-service hero, and sticky booking bar. All hand off to `https://shynlicleaningservice.com/quote` with ZIP plus available service/city/bedroom/bathroom context, `source_page`, and `landing_page_url`.
- Lighthouse QA: homepage desktop `99/93/100/100`, homepage mobile `92/93/100/100`, Naperville city mobile `80/96/100/100` for Performance / Accessibility / Best Practices / SEO.

## Second-Wave SEO Expansion

The main `shynli.com` sitemap has been expanded from the first production wave to exactly `600` unique URLs on the `https://shynli.com` domain.

The second wave keeps broad coverage without pushing every service into every city:

- all `42` service-area cities keep their city landing pages
- all `42` cities now have `10` core city-service pages: regular, deep, move-in, move-out, move-in / move-out, house, one-time, recurring, weekly, and apartment cleaning
- post-construction city-service pages remain limited to the `12` featured cities until operations confirm broader fulfillment
- every city now has a local cleaning guide layer
- support pages were added for frequency, pricing logic, recurring cost, and move-in / move-out checklist intent

Final second-wave QA:

- sitemap count: `600` URLs, `600` unique URLs, domain set `shynli.com`
- final rendered pre-hosting crawl: `600` checked, `0` failures
- thin-content check passed: overall visible word range `651-4289`; city-service pages `882-1563` visible words; city guides `922-1168` visible words
- Google basics passed on every sitemap URL: title, meta description, canonical, `index,follow`, one H1, JSON-LD, FAQ schema where accordions are visible, and no mobile horizontal overflow
- visitor-copy scan passed: no visible internal build terms such as `prototype`, `schema`, `canonical`, `internal links`, `city-service`, `search intent`, `draft`, `shadcn`, `route checks`, `placeholder`, or `source document`
- internal linking passed: `0` orphan / weak inbound pages and minimum `18` sitemap-internal links per crawled page
- city-service doorway-risk check passed on the rendered main content: `434` city-service pages checked, max 5-word-shingle similarity `0.708`, weak pairs at `>=0.73`: `0`
- manual top-30 production-risk review passed: homepage, core hubs, pricing / quote / reviews / trust pages, priority city pages, and the most important Naperville / Aurora / Plainfield / Oswego / Bolingbrook / Downers Grove city-service pages checked with `0` failures for CTA, schema, title/meta/canonical, local relevance, pricing logic, FAQ depth, nearby links, and doorway-risk
- robots / sitemap / forms QA passed: `robots.txt` allows crawl and points to `https://shynli.com/sitemap.xml`; sample quote handoffs go to `https://shynlicleaningservice.com/quote`; unknown routes render a `noindex,follow` 404 page
- final quote-routing QA passed for the `600` main Shynli sitemap URLs: `1509` rendered quote / booking links point to `https://shynlicleaningservice.com/quote`, `496` same-page quote anchors only scroll to local quote forms, `1087` forms across `597` pages were found, and representative form submits on homepage, city, city-service, service, pricing, and Airbnb pages all redirected to the live quote endpoint with `source_page` and `landing_page_url`
- final all-site sanity QA passed after the last quote-routing cleanup: `1300` sitemap URLs checked across `shynli.com`, `shinydeepcleaning.com`, and `shynlimoveoutcleaning.com`; `0` failures, `0` robot failures, `0` local quote links, `2166` live quote links, `1477` forms, `1300` pages with JSON-LD schema, visible word range `640-4167`, and `8/8` representative form submits redirected to `https://shynlicleaningservice.com/quote`
- final footer QA passed across all `1300` sitemap URLs: every page has a footer with brand/domain signal, quote CTA, contact signal, legal links, no empty/hash-only links, and no mobile horizontal overflow; footer link range is `17-24`
- `2026-05-11` move-out deployment alignment: production domain, Render blueprint, canonical URLs, root `robots.txt`, root `sitemap.xml`, and visible brand text now target `https://shynlimoveoutcleaning.com`; standalone move-out sitemap contains `350` unique URLs; rendered domain smoke checked `350` pages with `0` failures for status, title, meta description, canonical, JSON-LD, quote forms, footer links, legal links, old-domain leaks, and mobile horizontal overflow.
- `npm run lint` passed
- `npm run build` passed
