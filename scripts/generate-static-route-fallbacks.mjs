import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
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

const addHomepageShell = (html) => {
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
        #initial-home-hero .initial-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.72}
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
        @media (max-width:900px){
          #initial-home-hero .initial-nav{display:none}
          #initial-home-hero .initial-check{min-height:3rem}
          #initial-home-hero .initial-hero-inner{padding:4rem 1rem 2rem}
          #initial-home-hero h1{font-size:clamp(3.25rem,15vw,5.6rem)}
          #initial-home-hero .initial-form-grid{grid-template-columns:1fr}
          #initial-home-hero .initial-proof-row{grid-template-columns:1fr;padding:0 1rem 2rem}
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
            <a href="#areas">Areas</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a class="initial-check" href="#quote">Check date</a>
        </div>
      </header>
      <section class="initial-hero">
        <img class="initial-hero-img" src="/cleaner-hero.jpg" alt="" aria-hidden="true" fetchpriority="high" decoding="async" />
        <div class="initial-overlay"></div>
        <div class="initial-hero-inner">
          <p class="initial-kicker">Apartment empty, keys due, inspection coming</p>
          <h1>Ready for the final walkthrough.</h1>
          <p class="initial-copy">Move-out cleaning built around empty rooms, inspection checklists, handoff timing, and after-clean proof the customer can actually use.</p>
          <form id="quote" class="initial-form" action="https://shynlicleaningservice.com/quote" method="get">
            <input type="hidden" name="service" value="move-out-cleaning" />
            <input type="hidden" name="source_page" value="/" />
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
        <span id="handoff" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="report" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="pricing" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="areas" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
        <span id="faq" style="position:absolute;bottom:0;width:1px;height:1px;overflow:hidden;"></span>
      </section>
    </main>`

  const withPreload = html.replace(
    /    <meta name="viewport"[^>]+>\n/,
    (match) => `${match}    <link rel="preload" as="image" href="/cleaner-hero.jpg" fetchpriority="high">\n`,
  )
  const withMoveOutMeta = withPreload
    .replace(
      /<title>.*?<\/title>/,
      "<title>Shynli Move-Out Cleaning | Final Walkthrough Cleaning</title>",
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      '<meta name="description" content="Move-out cleaning for empty homes, lease handoffs, listing prep, final walkthroughs, and move-day timing." />',
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
        window.addEventListener("click", loadApp, { once: true });
        window.addEventListener("keydown", loadApp, { once: true });
        window.setTimeout(loadApp, 1200);
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
  copyFileSync(indexFile, routeIndex)
}

writeFileSync(indexFile, addHomepageShell(deferHomepageScripts(indexHtml)))

console.log(`Generated ${paths.length} static route fallbacks.`)
