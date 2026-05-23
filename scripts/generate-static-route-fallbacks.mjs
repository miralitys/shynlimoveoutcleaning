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

const indexHtml = readFileSync(indexFile, "utf8")
writeFileSync(indexFile, inlineStylesheets(indexHtml))

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

console.log(`Generated ${paths.length} static route fallbacks.`)
