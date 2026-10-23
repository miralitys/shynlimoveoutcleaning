export const REDIRECT_VERSION = "2026-10-23.1"
export const SOURCE_ORIGIN = "https://shynlimoveoutcleaning.com"
export const DESTINATION_ORIGIN = "https://shynlicleaningservice.com"
export const DEFAULT_TARGET = "/services/move-in-move-out-cleaning"
export const CITY_SLUGS = Object.freeze([
  "addison", "aurora", "bartlett", "batavia", "bolingbrook", "bristol",
  "burr-ridge", "carol-stream", "clarendon-hills", "darien", "downers-grove",
  "elmhurst", "geneva", "glen-ellyn", "hinsdale", "homer-glen", "itasca",
  "lemont", "lisle", "lockport", "lombard", "montgomery", "naperville",
  "north-aurora", "oak-brook", "oswego", "plainfield", "romeoville",
  "st-charles", "streamwood", "sugar-grove", "villa-park", "warrenville",
  "wayne", "west-chicago", "westmont", "wheaton", "willowbrook", "winfield",
  "wood-dale", "woodridge", "yorkville",
])
const cities = new Set(CITY_SLUGS)
const specialistCities = new Set(["naperville", "aurora", "plainfield", "bolingbrook"])

export const SERVICE_PATHS = Object.freeze([
  "move-out-cleaning", "move-in-move-out-cleaning", "move-in-cleaning",
  "house-move-out-cleaning", "apartment-move-out-cleaning", "condo-move-out-cleaning",
  "end-of-lease-cleaning", "same-week-move-out-cleaning", "empty-apartment-cleaning",
  "vacant-home-cleaning", "cleaning-after-moving-out", "cleaning-after-tenants",
  "rental-cleaning", "rental-turnover-cleaning", "landlord-cleaning",
  "property-manager-cleaning", "realtor-cleaning",
])
export const GUIDE_GROUPS = Object.freeze([
  ["/blog/move-in-move-out/what-landlords-check-during-move-out-inspection-cleaning", "guide-inspection", ["landlord-move-out-cleaning-inspection", "landlord-cleaning-checklist-too-much"]],
  ["/blog/move-in-move-out/is-professional-move-out-cleaning-worth-it", "guide-professional", ["do-you-need-professional-move-out-cleaning"]],
  ["/blog/services/how-much-does-move-out-cleaning-cost", "guide-cost", ["why-move-out-cleaning-costs-more"]],
  ["/blog/move-in-move-out/move-out-cleaning-time-estimate-3-bedroom", "guide-time", ["how-long-move-out-cleaning-takes"]],
  ["/blog/whats-included/move-out-cleaning-vs-deep-cleaning", "guide-comparison", ["broom-clean-vs-deep-clean-move-out"]],
  ["/blog/move-in-move-out/what-to-do-if-you-need-last-minute-move-out-cleaning", "guide-last-minute", ["last-minute-move-out-cleaning-plan"]],
  ["/blog/move-in-move-out/how-to-clean-oven-for-move-out-inspection", "guide-oven", ["oven-and-refrigerator-move-out-cleaning"]],
  ["/blog/move-in-move-out/how-to-remove-wall-scuffs-before-move-out", "guide-walls", ["wall-scuffs-and-nail-holes-before-move-out"]],
  ["/blog/move-in-move-out/how-to-clean-bathroom-for-move-out-deposit", "guide-bathroom", ["bathroom-move-out-cleaning-soap-scum-caulk-hard-water"]],
  ["/blog/move-in-move-out/move-out-cleaning-add-ons-that-matter-most", "guide-add-ons", ["window-tracks-blinds-and-fans-move-out-cleaning"]],
  ["/blog/move-in-move-out/how-to-clean-floors-for-move-out-inspection", "guide-floors", ["carpet-stains-before-move-out"]],
  ["/blog/seasonal/cleaning-before-selling-house-checklist", "guide-seller", ["seller-final-walkthrough-cleaning-before-closing"]],
])
export const EXACT_REDIRECTS = new Map()
for (const slug of SERVICE_PATHS) EXACT_REDIRECTS.set(`/${slug}`, { target: DEFAULT_TARGET, group: "service" })
EXACT_REDIRECTS.set("/move-out-cleaning-cost", { target: "/blog/services/how-much-does-move-out-cleaning-cost", group: "topic-cost" })
for (const slug of ["move-out-cleaning-checklist", "deposit-cleaning"]) EXACT_REDIRECTS.set(`/${slug}`, { target: "/blog/checklists/move-out-cleaning-checklist-for-getting-deposit-back", group: "topic-checklist" })
EXACT_REDIRECTS.set("/cleaning-before-selling-house", { target: "/blog/seasonal/cleaning-before-selling-house-checklist", group: "topic-seller" })
EXACT_REDIRECTS.set("/move-out-cleaning-faq", { target: "/faq", group: "topic-faq" })
for (const [source, target] of [["/terms", "/terms-of-service"], ["/privacy", "/privacy-policy"], ["/cancellation", "/cancellation-policy"]]) EXACT_REDIRECTS.set(source, { target, group: "legal" })
for (const [target, group, slugs] of GUIDE_GROUPS) {
  for (const slug of slugs) EXACT_REDIRECTS.set(`/guides/${slug}`, { target, group })
}

export function getRedirect(input = "/") {
  let url
  try {
    url = new URL(input.startsWith("/") ? `${SOURCE_ORIGIN}${input}` : input, SOURCE_ORIGIN)
  } catch {
    url = new URL(SOURCE_ORIGIN)
  }
  let pathname = url.pathname
  try { pathname = decodeURIComponent(pathname) } catch { /* Malformed escapes use the fallback. */ }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const result = (target, group) => ({ target, group, location: `${DESTINATION_ORIGIN}${target}${url.search}` })
  if (pathname === "/") return result(DEFAULT_TARGET, "home")
  if (pathname === "/sitemap.xml") return result("/sitemap.xml", "sitemap")
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")
  const parts = pathname.split("/").filter(Boolean)
  if (cities.has(parts[0])) {
    const target = `/${parts[0].replaceAll("-", "")}`
    if (specialistCities.has(parts[0])) return result(`${target}/move-out-cleaning`, parts.length === 1 ? "city-hub-specialist" : "city-subpage-specialist")
    return result(target, parts.length === 1 ? "city-hub" : "city-subpage")
  }
  const exact = EXACT_REDIRECTS.get(pathname)
  if (exact) return result(exact.target, exact.group)
  if (parts[0] === "guides") return result("/blog/move-in-move-out", parts.length === 1 ? "guide-index" : "guide-other")
  if (parts.some((part) => /(?:^|-)(?:quote|quotes|booking|bookings|book)(?:-|$)/.test(part) || part === "schedule")) return result("/quote", "quote")
  return result(DEFAULT_TARGET, "fallback")
}
