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
  const shell = `<main id="initial-home-hero" style="min-height:100svh;background:#0b2430;color:#f6fbff;position:relative;overflow:hidden;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">
      <img src="/cleaner-hero.jpg" alt="" aria-hidden="true" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7;" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,36,48,.96) 0%,rgba(11,36,48,.78) 45%,rgba(11,127,138,.26) 100%);"></div>
      <section style="position:relative;z-index:1;min-height:92svh;max-width:80rem;margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;padding:7rem 1rem 3rem;">
        <p style="display:inline-flex;width:max-content;margin:0 0 1.25rem;border:1px solid rgba(32,199,216,.55);background:rgba(32,199,216,.16);padding:.375rem 1rem;font-size:.75rem;font-weight:900;line-height:1.25;color:#f6fbff;">Apartment empty, keys due, inspection coming</p>
        <h1 style="max-width:64rem;margin:0;font-size:clamp(3.2rem,8.2vw,8.4rem);font-weight:900;line-height:.86;letter-spacing:0;">Ready for the final walkthrough.</h1>
        <p style="max-width:42rem;margin:1.5rem 0 0;font-size:clamp(1.125rem,1.9vw,1.25rem);font-weight:700;line-height:1.6;color:rgba(246,251,255,.78);">Move-out cleaning built around empty rooms, inspection checklists, handoff timing, and after-clean proof the customer can actually use.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:2rem;">
          <a href="https://shynlicleaningservice.com/quote?service=move-out-cleaning&amp;source_page=/" style="display:inline-flex;min-height:3rem;align-items:center;justify-content:center;border-radius:.375rem;background:#20c7d8;padding:0 1.25rem;font-size:.875rem;font-weight:900;line-height:1;color:#06202a;text-decoration:none;">Get quote</a>
          <a href="/service-areas" style="display:inline-flex;min-height:3rem;align-items:center;justify-content:center;border:1px solid rgba(246,251,255,.5);border-radius:.375rem;background:rgba(246,251,255,.08);padding:0 1.25rem;font-size:.875rem;font-weight:900;line-height:1;color:#f6fbff;text-decoration:none;">Service areas</a>
        </div>
      </section>
    </main>`

  const withPreload = html.replace(
    /    <meta name="viewport"[^>]+>\n/,
    (match) => `${match}    <link rel="preload" as="image" href="/cleaner-hero.jpg" fetchpriority="high">\n`,
  )

  return withPreload.replace(`<div id="root"></div>`, `<div id="root">${shell}</div>`)
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
          import("${entryPath}");
        };
        window.addEventListener("pointerdown", loadApp, { once: true, passive: true });
        window.addEventListener("keydown", loadApp, { once: true });
        window.addEventListener("wheel", loadApp, { once: true, passive: true });
        window.addEventListener("touchstart", loadApp, { once: true, passive: true });
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
