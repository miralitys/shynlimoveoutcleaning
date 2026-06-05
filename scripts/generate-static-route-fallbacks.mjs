import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const domain = "https://shynlimoveoutcleaning.com"
const distDir = "dist"
const indexFile = join(distDir, "index.html")
const sitemapFile = join(distDir, "sitemap.xml")

if (!existsSync(indexFile) || !existsSync(sitemapFile)) {
  throw new Error("Build dist before generating static route fallbacks.")
}

const inlineStylesheets = (html) => {
  const stylesheetLinks = html.match(/    <link rel="stylesheet"[^>]+>\n/g) ?? []

  if (stylesheetLinks.length === 0) {
    return html
  }

  const inlineStyles = stylesheetLinks
    .map((link) => {
      const href = link.match(/href="([^"]+)"/)?.[1]
      if (!href || !href.startsWith("/")) {
        return link
      }

      const stylesheetFile = join(distDir, href.slice(1))
      if (!existsSync(stylesheetFile)) {
        return link
      }

      const css = readFileSync(stylesheetFile, "utf8")
      return `    <style data-critical-css>${css}</style>\n`
    })
    .join("")
  const withoutStylesheets = stylesheetLinks.reduce((currentHtml, link) => currentHtml.replace(link, ""), html)
  const insertionPoint = withoutStylesheets.match(/    <meta name="viewport"[^>]+>\n/)?.[0]

  if (!insertionPoint) {
    return html
  }

  return withoutStylesheets.replace(insertionPoint, `${insertionPoint}${inlineStyles}`)
}

const serviceAreaCities = [
  "Addison",
  "Aurora",
  "Bartlett",
  "Batavia",
  "Bolingbrook",
  "Bristol",
  "Burr Ridge",
  "Carol Stream",
  "Clarendon Hills",
  "Darien",
  "Downers Grove",
  "Elmhurst",
  "Geneva",
  "Glen Ellyn",
  "Hinsdale",
  "Homer Glen",
  "Itasca",
  "Lemont",
  "Lisle",
  "Lockport",
  "Lombard",
  "Montgomery",
  "Naperville",
  "North Aurora",
  "Oak Brook",
  "Oswego",
  "Plainfield",
  "Romeoville",
  "St. Charles",
  "Streamwood",
  "Sugar Grove",
  "Villa Park",
  "Warrenville",
  "Wayne",
  "West Chicago",
  "Westmont",
  "Wheaton",
  "Willowbrook",
  "Winfield",
  "Wood Dale",
  "Woodridge",
  "Yorkville",
]

const cityBySlug = new Map(serviceAreaCities.map((city) => [city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-"), city]))

const guideShellPages = new Map([
  ["/guides", {
    title: "Move-Out Cleaning Guides | Shynli Move-Out Cleaning",
    description: "Practical move-out cleaning guides for renters, landlords, sellers, property managers, and homeowners preparing for keys, walkthroughs, and quotes.",
    keywords: "move-out cleaning guides, move-out cleaning questions, apartment move-out cleaning tips, final walkthrough cleaning, cleaning before turning in keys",
    kicker: "Move-out guides",
    h1: "Move-out cleaning guides for the questions people ask before keys are due.",
    copy: "Compare practical answers about cost, timing, landlord walkthroughs, professional cleaning, and photos before you start a move-out quote.",
  }],
  ["/guides/landlord-move-out-cleaning-inspection", {
    title: "What Landlords Notice During Move-Out Cleaning | Shynli",
    description: "See the rooms and details landlords often notice during a move-out walkthrough, from kitchens and bathrooms to floors, doors, cabinets, and photos.",
    keywords: "move-out cleaning inspection, landlord walkthrough cleaning, apartment move-out cleaning, final walkthrough cleaning, security deposit cleaning",
    kicker: "Landlord walkthrough",
    h1: "What landlords actually notice during a move-out cleaning inspection.",
    copy: "Plan the clean around kitchens, bathrooms, floors, baseboards, doors, closets, appliance add-ons, and after-clean photos before keys are due.",
  }],
  ["/guides/do-you-need-professional-move-out-cleaning", {
    title: "Do You Need Professional Move-Out Cleaning? | Shynli",
    description: "Learn when a professional move-out clean is worth it, when DIY may be enough, and what to prepare before keys, walkthroughs, or listing photos.",
    keywords: "professional move-out cleaning, hire move-out cleaner, move-out cleaning service, apartment move-out cleaning, cleaning after moving out",
    kicker: "Professional or DIY",
    h1: "Do you need professional move-out cleaning before turning in keys?",
    copy: "Compare DIY and professional move-out cleaning based on time, condition, inspection expectations, add-ons, and remote handoff needs.",
  }],
  ["/guides/why-move-out-cleaning-costs-more", {
    title: "Why Move-Out Cleaning Costs More | Shynli",
    description: "Move-out cleaning often costs more than regular cleaning because the home is empty, details are exposed, and add-ons like ovens, cabinets, and windows take time.",
    keywords: "why move-out cleaning costs more, move-out cleaning cost, regular cleaning vs move-out cleaning, empty home cleaning cost, cleaning quote factors",
    kicker: "Cost factors",
    h1: "Why move-out cleaning usually costs more than regular cleaning.",
    copy: "Move-out cleaning prices change with empty-room detail, condition, bathrooms, access, deadlines, and selected add-ons like ovens, fridges, and cabinets.",
  }],
  ["/guides/how-long-move-out-cleaning-takes", {
    title: "How Long Does Move-Out Cleaning Take? | Shynli",
    description: "Understand how long move-out cleaning can take based on home size, condition, bathrooms, add-ons, access, and whether the home is empty.",
    keywords: "how long does move-out cleaning take, move-out cleaning time, apartment move-out cleaning time, house move-out cleaning, cleaning after movers",
    kicker: "Timing",
    h1: "How long does move-out cleaning take after the home is empty?",
    copy: "Move-out cleaning time depends on size, bathrooms, condition, access, add-ons, and whether movers and personal items are already gone.",
  }],
  ["/guides/move-out-cleaning-photos-before-keys", {
    title: "Move-Out Cleaning Photos Before Turning In Keys | Shynli",
    description: "Know which photos to take after move-out cleaning, how to document rooms and add-ons, and why photos help when you cannot stay for the walkthrough.",
    keywords: "move-out cleaning photos, document apartment cleaning, turning in keys cleaning, move-out walkthrough photos, security deposit cleaning photos",
    kicker: "Photo handoff",
    h1: "Move-out cleaning photos to take before turning in keys.",
    copy: "Use wide room photos, kitchen and bathroom photos, and selected add-on photos to document the cleaning finish before a remote handoff.",
  }],
])

const guideFaqs = new Map([
  ["/guides", [
    ["What move-out cleaning questions should I answer before requesting a quote?", "Start with the inspection date, whether the home is empty, the property type, current condition, add-ons, access, and whether after-clean photos are needed."],
    ["Which guide should I read first?", "If keys are due soon, start with timing and landlord inspection. If you are comparing cleaners, read the professional cleaning and cost guides next."],
  ]],
  ["/guides/landlord-move-out-cleaning-inspection", [
    ["What do landlords usually notice during move-out inspections?", "Landlords often notice kitchens, bathrooms, floors, baseboards, cabinets, doors, closets, appliance interiors, and whether the home looks empty and ready for the next step."],
    ["Can move-out cleaning guarantee my deposit back?", "No cleaning company can guarantee a deposit outcome because landlords also consider damage, lease terms, wear, timing, and inspection standards."],
    ["Should I take photos after move-out cleaning?", "Yes. Photos help document the condition after cleaning, especially when you cannot be present for the final walkthrough."],
  ]],
  ["/guides/do-you-need-professional-move-out-cleaning", [
    ["When is professional move-out cleaning worth it?", "It is usually worth it when the home is empty, time is tight, a walkthrough is scheduled, you need add-ons, or you cannot return to fix missed details."],
    ["When is DIY move-out cleaning enough?", "DIY may be enough for a small, lightly used space when you have time, supplies, access, and no strict inspection or listing deadline."],
    ["What should I prepare before professional cleaners arrive?", "Remove personal items, confirm access, share condition notes, choose add-ons, and make sure utilities are working if the clean needs water, power, or light."],
  ]],
  ["/guides/why-move-out-cleaning-costs-more", [
    ["Why does move-out cleaning cost more than regular cleaning?", "Move-out cleaning usually exposes more detail because rooms are empty, cabinets and appliances are visible, and the clean is tied to a handoff or inspection."],
    ["What affects a move-out cleaning quote?", "Size, bathrooms, condition, access, deadlines, utilities, pet hair, heavy buildup, and add-ons such as ovens, fridges, cabinets, and windows can affect the quote."],
    ["Can I lower the move-out cleaning cost?", "You can often keep the scope tighter by removing items first, choosing only needed add-ons, sharing accurate photos, and giving cleaners clear access."],
  ]],
  ["/guides/how-long-move-out-cleaning-takes", [
    ["How long does move-out cleaning take?", "Timing depends on home size, bathrooms, condition, add-ons, access, and whether the home is already empty."],
    ["Should movers finish before cleaners arrive?", "Yes, when possible. Cleaning after furniture and boxes are gone reduces delays and lets cleaners reach floors, closets, baseboards, and corners."],
    ["What can delay move-out cleaning?", "Remaining items, blocked access, no utilities, heavy buildup, late movers, locked rooms, and last-minute add-ons can all slow the job."],
  ]],
  ["/guides/move-out-cleaning-photos-before-keys", [
    ["What photos should I take before turning in keys?", "Take wide photos of every room, close photos of kitchens and bathrooms, and specific photos of completed add-ons such as appliances or cabinets."],
    ["Do photos replace a walkthrough?", "No. Photos are documentation, but the landlord, buyer, or property manager may still do their own walkthrough and apply their own standards."],
    ["When should I take move-out cleaning photos?", "Take photos after cleaning is complete, after personal items are removed, and before keys are returned or access changes."],
  ]],
])

const jsonForHtml = (value) => JSON.stringify(value).replace(/</g, "\\u003c")

const buildGuideSchema = (path, page) => {
  const absoluteUrl = `${domain}${path === "/" ? "" : path}`
  const faqPairs = guideFaqs.get(path)
  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: domain },
        { "@type": "ListItem", position: 2, name: "Move-out guides", item: `${domain}/guides` },
        ...(path === "/guides" ? [] : [{ "@type": "ListItem", position: 3, name: page.h1.replace(/\.$/, ""), item: absoluteUrl }]),
      ],
    },
  ]

  if (path === "/guides") {
    graph.unshift({
      "@type": "CollectionPage",
      "@id": `${absoluteUrl}#webpage`,
      name: page.title,
      description: page.description,
      url: absoluteUrl,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [...guideShellPages.keys()]
          .filter((guidePath) => guidePath !== "/guides")
          .map((guidePath, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${domain}${guidePath}`,
            name: guideShellPages.get(guidePath).h1.replace(/\.$/, ""),
          })),
      },
    })
  } else {
    graph.unshift({
      "@type": "Article",
      "@id": `${absoluteUrl}#article`,
      headline: page.h1.replace(/\.$/, ""),
      description: page.description,
      mainEntityOfPage: absoluteUrl,
      url: absoluteUrl,
      inLanguage: "en-US",
      author: { "@type": "Organization", name: "Shynli Move-Out Cleaning" },
      publisher: { "@type": "Organization", name: "Shynli Move-Out Cleaning", url: domain },
    })
  }

  if (faqPairs) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${absoluteUrl}#faq`,
      mainEntity: faqPairs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    })
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

const buildStaticSeoHead = (page) => {
  const sourcePath = page.sourcePage === "/" ? "" : page.sourcePage.replace(/\/+$/, "")
  const canonicalHref = `${domain}${sourcePath}`
  const schema = guideShellPages.has(page.sourcePage) ? buildGuideSchema(page.sourcePage, page) : null
  const schemaTag = schema
    ? `\n    <script id="page-schema" type="application/ld+json">${jsonForHtml(schema)}</script>`
    : ""

  return `<meta name="keywords" content="${page.keywords || "move-out cleaning, apartment move-out cleaning, final walkthrough cleaning"}" />
    <link rel="canonical" href="${canonicalHref}" />
    <meta name="robots" content="index,follow" />${schemaTag}`
}

const titleCaseSlug = (slug) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")

const getShellCopy = (path) => {
  const guidePage = guideShellPages.get(path)
  if (guidePage) {
    return {
      ...guidePage,
      sourcePage: path,
    }
  }

  if (path === "/") {
    return {
      title: "Shynli Move-Out Cleaning | Final Walkthrough Cleaning",
      description: "Move-out cleaning for empty homes, lease handoffs, listing prep, final walkthroughs, and move-day timing.",
      kicker: "Apartment empty, keys due, inspection coming",
      h1: "Ready for the final walkthrough.",
      copy: "Move-out cleaning for empty rooms, final walkthroughs, key handoffs, and the last details people notice after the furniture is gone.",
      keywords: "move-out cleaning, final walkthrough cleaning, apartment move-out cleaning, move-out cleaning service, cleaning before turning in keys",
      sourcePage: "/",
    }
  }

  const segments = path.split("/").filter(Boolean)
  const cityName = cityBySlug.get(segments[0])
  const intentSlug = cityName ? segments[1] : segments[0]
  const intentLabel = intentSlug ? titleCaseSlug(intentSlug) : "Move-out cleaning"

  if (cityName && !intentSlug) {
    return {
      title: `${cityName} Move-Out Cleaning | Shynli Move-Out Cleaning`,
      description: `Move-out cleaning in ${cityName}, IL with empty-home checklist, access notes, after-clean photos, and final walkthrough-ready scope.`,
      kicker: `${cityName} apartment empty, keys due, inspection coming`,
      h1: `${cityName} move-out cleaning.`,
      copy: `Move-out cleaning in ${cityName} for empty rooms, key returns, listing prep, and final walkthroughs after the furniture is gone.`,
      cityName,
      sourcePage: path,
    }
  }

  if (cityName) {
    return {
      title: `${cityName} ${intentLabel} | Shynli Move-Out Cleaning`,
      description: `${cityName} ${intentLabel.toLowerCase()} with move-out scope, access notes, add-on clarity, after-clean photos, and a fast quote path.`,
      kicker: `${cityName} service`,
      h1: `${cityName} ${intentLabel} before keys change hands.`,
      copy: `Tell us the date, access details, home condition, and any add-ons so the clean fits the move-out deadline in ${cityName}.`,
      cityName,
      sourcePage: path,
    }
  }

  return {
    title: `${intentLabel} | Shynli Move-Out Cleaning`,
    description: `${intentLabel} with move-out scope, access notes, add-on clarity, after-clean photos, and a fast quote path.`,
    kicker: intentLabel,
    h1: `${intentLabel} for the last walkthrough.`,
    copy: `Start with the property type, timing, condition, access notes, and add-ons so the cleaner can focus on the rooms people will inspect next.`,
    sourcePage: path,
  }
}

const addMoveOutShell = (html, path = "/") => {
  const page = getShellCopy(path)
  const hiddenCityInput = page.cityName ? `<input type="hidden" name="city" value="${page.cityName}" />` : ""
  const shell = `<main id="initial-home-hero" style="min-height:100svh;background:#e9f7fb;color:#0b2430;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">
      <style>
        #initial-home-hero *{box-sizing:border-box}
        #initial-home-hero a{text-decoration:none}
        #initial-home-hero .initial-header{position:relative;z-index:2;background:#e9f7fb;padding:1rem 1.25rem}
        #initial-home-hero .initial-header-inner{margin:0 auto;display:flex;max-width:86rem;align-items:center;justify-content:space-between;gap:1.5rem}
        #initial-home-hero .initial-brand{display:flex;min-height:3.75rem;align-items:center;gap:.75rem;color:#0b2430}
        #initial-home-hero .initial-mark{display:grid;width:3.5rem;height:3.5rem;place-items:center;border-radius:.25rem;background:#0b2430;color:#f6fbff;font-weight:900}
        #initial-home-hero .initial-brand-name{display:block;font-size:1.15rem;font-weight:900;line-height:1.05;text-transform:uppercase}
        #initial-home-hero .initial-brand-sub{display:block;margin-top:.45rem;color:#075f67;font-size:.82rem;font-weight:900;text-transform:uppercase}
        #initial-home-hero .initial-nav{display:flex;align-items:center;gap:2rem}
        #initial-home-hero .initial-nav a{color:#43525c;font-weight:900}
        #initial-home-hero .initial-check{display:inline-flex;min-height:3.75rem;align-items:center;justify-content:center;border-radius:.25rem;background:#0b2430;padding:0 1.4rem;color:#f6fbff;font-weight:900}
        #initial-home-hero .initial-hero{position:relative;min-height:calc(100svh - 5.75rem);overflow:hidden;background:#0b2430;color:#f6fbff}
        #initial-home-hero .initial-hero-media{position:absolute;inset:0;width:100%;height:100%;opacity:.72}
        #initial-home-hero .initial-hero-img{width:100%;height:100%;object-fit:cover}
        #initial-home-hero .initial-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,36,48,.96) 0%,rgba(11,36,48,.78) 45%,rgba(11,127,138,.28) 100%)}
        #initial-home-hero .initial-hero-inner{position:relative;z-index:1;margin:0 auto;max-width:86rem;padding:5.75rem 1.75rem 4rem}
        #initial-home-hero .initial-kicker{display:inline-flex;margin:0 0 1.55rem;border:1px solid rgba(32,199,216,.58);border-radius:.25rem;background:rgba(32,199,216,.14);padding:.55rem 1.15rem;color:#f6fbff;font-size:.86rem;font-weight:900;line-height:1.2}
        #initial-home-hero h1{max-width:76rem;margin:0;color:#f6fbff;font-size:clamp(4.4rem,8.3vw,8.6rem);font-weight:900;line-height:.86;letter-spacing:0}
        #initial-home-hero .initial-copy{max-width:58rem;margin:2rem 0 0;color:rgba(246,251,255,.78);font-size:clamp(1.25rem,1.8vw,1.5rem);font-weight:800;line-height:1.5}
        #initial-home-hero .initial-form{margin-top:4.25rem;border:1px solid #b9e5ee;background:#f6fbff;padding:1rem;box-shadow:0 24px 45px rgba(11,36,48,.28)}
        #initial-home-hero .initial-form-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr auto;gap:.85rem;align-items:end}
        #initial-home-hero label{display:grid;gap:.55rem;color:#075f67;font-size:.82rem;font-weight:900;text-transform:uppercase}
        #initial-home-hero input{min-height:3.35rem;border:1px solid #b9e5ee;border-radius:.25rem;background:white;padding:0 1rem;color:#43525c;font:inherit;font-weight:800}
        #initial-home-hero .initial-submit{min-height:3.35rem;border:0;border-radius:.25rem;background:#58b883;padding:0 1.35rem;color:#06202a;font:inherit;font-size:1.05rem;font-weight:500;white-space:nowrap;cursor:pointer}
        #initial-home-hero .initial-proof-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin:2.25rem auto 0;max-width:86rem;padding:0 1.75rem;position:relative;z-index:1}
        #initial-home-hero .initial-proof{min-height:7rem;background:#f6fbff;border-left:.25rem solid #22c7a9;padding:1.25rem;color:#0b2430}
        #initial-home-hero .initial-proof strong{display:block;font-size:1.65rem;font-weight:900}
        #initial-home-hero .initial-proof span{display:block;margin-top:.25rem;color:#43525c;font-weight:800}
        #initial-home-hero .initial-guides{position:relative;z-index:1;margin:1.25rem auto 0;display:flex;max-width:86rem;flex-wrap:wrap;gap:.65rem;padding:0 1.75rem 2rem}
        #initial-home-hero .initial-guides a{display:inline-flex;min-height:2.75rem;align-items:center;border:1px solid rgba(246,251,255,.24);border-radius:.25rem;background:rgba(246,251,255,.1);padding:0 .9rem;color:#f6fbff;font-size:.88rem;font-weight:900}
        @media (max-width:900px){
          #initial-home-hero .initial-nav{display:none}
          #initial-home-hero .initial-check{min-height:3rem}
          #initial-home-hero .initial-hero-inner{padding:4rem 1rem 2rem}
          #initial-home-hero h1{font-size:clamp(3.25rem,15vw,5.6rem)}
          #initial-home-hero .initial-form-grid{grid-template-columns:1fr}
          #initial-home-hero .initial-proof-row{grid-template-columns:1fr;padding:0 1rem 2rem}
          #initial-home-hero .initial-guides{padding:0 1rem 2rem}
        }
      </style>
      <header class="initial-header">
        <div class="initial-header-inner">
          <a class="initial-brand" href="https://shynlimoveoutcleaning.com/">
            <span class="initial-mark">SM</span>
            <span><span class="initial-brand-name">Shynli Move-Out</span><span class="initial-brand-sub">Move-out cleaning</span></span>
          </a>
          <nav class="initial-nav" aria-label="Primary navigation">
            <a href="#handoff">Handoff</a>
            <a href="#report">Report</a>
            <a href="#pricing">Pricing</a>
            <a href="https://shynlimoveoutcleaning.com/guides">Guides</a>
            <a href="#areas">Areas</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a class="initial-check" href="#quote">Check date</a>
        </div>
      </header>
      <section class="initial-hero">
        <picture class="initial-hero-media" aria-hidden="true">
          <source type="image/webp" srcset="/cleaner-hero-960.webp 960w, /cleaner-hero-1280.webp 1280w, /cleaner-hero-1366.webp 1366w, /cleaner-hero-1600.webp 1600w" sizes="100vw" />
          <img class="initial-hero-img" src="/cleaner-hero-1280.jpg" srcset="/cleaner-hero-960.jpg 960w, /cleaner-hero-1280.jpg 1280w, /cleaner-hero-1366.jpg 1366w, /cleaner-hero-1600.jpg 1600w" sizes="100vw" alt="" fetchpriority="high" decoding="async" />
        </picture>
        <div class="initial-overlay"></div>
        <div class="initial-hero-inner">
          <p class="initial-kicker">${page.kicker}</p>
          <h1>${page.h1}</h1>
          <p class="initial-copy">${page.copy}</p>
          <form id="quote" class="initial-form" action="https://shynlicleaningservice.com/quote" method="get">
            <input type="hidden" name="service" value="move-out-cleaning" />
            <input type="hidden" name="source_page" value="${page.sourcePage}" />
            ${hiddenCityInput}
            <div class="initial-form-grid">
              <label>Zip code <input name="zip" value="60540" inputmode="numeric" /></label>
              <label>Handoff date <input name="date" placeholder="dd.mm.yyyy" /></label>
              <label>Place type <input name="place_type" value="Apartment, condo, house" /></label>
              <label>Scope <input name="scope" value="Empty / mostly empty" /></label>
              <button class="initial-submit" type="submit">Start quote -></button>
            </div>
          </form>
        </div>
        <div class="initial-proof-row" aria-label="Move-out cleaning proof points">
          <div class="initial-proof"><strong>60 sec</strong><span>start a move-out quote</span></div>
          <div class="initial-proof"><strong>Photos</strong><span>after-clean report available</span></div>
          <div class="initial-proof"><strong>No card</strong><span>to check timing</span></div>
          <div class="initial-proof"><strong>Re-clean</strong><span>for covered missed items</span></div>
        </div>
        <nav class="initial-guides" aria-label="Move-out cleaning guides">
          <a href="https://shynlimoveoutcleaning.com/guides">Move-out guides</a>
          <a href="https://shynlimoveoutcleaning.com/guides/landlord-move-out-cleaning-inspection">Landlord inspection</a>
          <a href="https://shynlimoveoutcleaning.com/guides/do-you-need-professional-move-out-cleaning">Professional or DIY</a>
          <a href="https://shynlimoveoutcleaning.com/guides/why-move-out-cleaning-costs-more">Cost factors</a>
          <a href="https://shynlimoveoutcleaning.com/guides/how-long-move-out-cleaning-takes">Cleaning timing</a>
          <a href="https://shynlimoveoutcleaning.com/guides/move-out-cleaning-photos-before-keys">Photo handoff</a>
        </nav>
        <span id="handoff" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="report" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="pricing" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="areas" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="faq" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
      </section>
    </main>`

  const withPreload = html.replace(
    /    <meta name="viewport"[^>]+>\n/,
    (match) => `${match}    <link rel="preload" as="image" href="/cleaner-hero-1280.webp" imagesrcset="/cleaner-hero-960.webp 960w, /cleaner-hero-1280.webp 1280w, /cleaner-hero-1366.webp 1366w, /cleaner-hero-1600.webp 1600w" imagesizes="100vw" fetchpriority="high">\n`,
  )
  const withMoveOutMeta = withPreload
    .replace(
      /<title>.*?<\/title>/,
      `<title>${page.title}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${page.description}" />`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      (match) => `${match}\n    ${buildStaticSeoHead(page)}`,
    )

  return withMoveOutMeta.replace(`<div id="root"></div>`, `<div id="root">${shell}</div>`)
}

const deferHomepageScripts = (html) => {
  const entryScript = html.match(/    <script type="module" crossorigin src="([^"]+)"><\/script>\n/)

  if (!entryScript) {
    return html
  }

  const entryPath = entryScript[1]
  const loader = `    <script>
      (() => {
        let loaded = false;
        const loadApp = () => {
          if (loaded) return;
          loaded = true;
          import("${entryPath}").then(() => {
            if (!window.location.hash) return;
            window.setTimeout(() => {
              document.querySelector(window.location.hash)?.scrollIntoView();
            }, 0);
          });
        };
        const opts = { once: true, passive: true };
        window.addEventListener("click", loadApp, opts);
        window.addEventListener("keydown", loadApp, { once: true });
        window.addEventListener("pointerdown", loadApp, opts);
        window.addEventListener("touchstart", loadApp, opts);
        window.addEventListener("wheel", loadApp, opts);
        window.addEventListener("scroll", loadApp, opts);
      })();
    </script>\n`

  return html
    .replace(/    <link rel="modulepreload"[^>]+>\n/g, "")
    .replace(entryScript[0], loader)
}

const indexHtml = inlineStylesheets(readFileSync(indexFile, "utf8"))
writeFileSync(indexFile, indexHtml)

const sitemap = readFileSync(sitemapFile, "utf8")
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const paths = urls
  .filter((url) => url.startsWith(domain))
  .map((url) => new URL(url).pathname)
  .filter((path) => path !== "/")

for (const path of paths) {
  const routeIndex = join(distDir, path, "index.html")
  mkdirSync(dirname(routeIndex), { recursive: true })
  const routeHtml = path.startsWith("/guides") ? indexHtml : deferHomepageScripts(indexHtml)
  writeFileSync(routeIndex, addMoveOutShell(routeHtml, path))
}

writeFileSync(indexFile, addMoveOutShell(deferHomepageScripts(indexHtml)))

console.log(`Generated ${paths.length} static route fallbacks.`)
