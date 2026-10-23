import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"
import { CITY_SLUGS, DEFAULT_TARGET, DESTINATION_ORIGIN, getRedirect } from "../redirects.mjs"

const expect = (source, target) => assert.equal(getRedirect(source).location, `${DESTINATION_ORIGIN}${target}`, source)

test("explicit root and guide mappings preserve aliases and tracking", () => {
  const cases = [["/", DEFAULT_TARGET], ["/index.html", DEFAULT_TARGET], ["/guides", "/blog/move-in-move-out"],
    ["/move-out-cleaning-cost", "/blog/services/how-much-does-move-out-cleaning-cost"],
    ["/move-out-cleaning-checklist", "/blog/checklists/move-out-cleaning-checklist-for-getting-deposit-back"],
    ["/deposit-cleaning", "/blog/checklists/move-out-cleaning-checklist-for-getting-deposit-back"],
    ["/cleaning-before-selling-house", "/blog/seasonal/cleaning-before-selling-house-checklist"],
    ["/move-out-cleaning-faq", "/faq"], ["/terms", "/terms-of-service"], ["/privacy", "/privacy-policy"], ["/cancellation", "/cancellation-policy"],
    ["/guides/landlord-move-out-cleaning-inspection", "/blog/move-in-move-out/what-landlords-check-during-move-out-inspection-cleaning"],
    ["/guides/landlord-cleaning-checklist-too-much", "/blog/move-in-move-out/what-landlords-check-during-move-out-inspection-cleaning"],
    ["/guides/do-you-need-professional-move-out-cleaning", "/blog/move-in-move-out/is-professional-move-out-cleaning-worth-it"],
    ["/guides/why-move-out-cleaning-costs-more", "/blog/services/how-much-does-move-out-cleaning-cost"],
    ["/guides/how-long-move-out-cleaning-takes", "/blog/move-in-move-out/move-out-cleaning-time-estimate-3-bedroom"],
    ["/guides/broom-clean-vs-deep-clean-move-out", "/blog/whats-included/move-out-cleaning-vs-deep-cleaning"],
    ["/guides/last-minute-move-out-cleaning-plan", "/blog/move-in-move-out/what-to-do-if-you-need-last-minute-move-out-cleaning"],
    ["/guides/oven-and-refrigerator-move-out-cleaning", "/blog/move-in-move-out/how-to-clean-oven-for-move-out-inspection"],
    ["/guides/wall-scuffs-and-nail-holes-before-move-out", "/blog/move-in-move-out/how-to-remove-wall-scuffs-before-move-out"],
    ["/guides/bathroom-move-out-cleaning-soap-scum-caulk-hard-water", "/blog/move-in-move-out/how-to-clean-bathroom-for-move-out-deposit"],
    ["/guides/window-tracks-blinds-and-fans-move-out-cleaning", "/blog/move-in-move-out/move-out-cleaning-add-ons-that-matter-most"],
    ["/guides/carpet-stains-before-move-out", "/blog/move-in-move-out/how-to-clean-floors-for-move-out-inspection"],
    ["/guides/seller-final-walkthrough-cleaning-before-closing", "/blog/seasonal/cleaning-before-selling-house-checklist"],
    ["/sitemap.xml", "/sitemap.xml"], ["/robots.txt", "/robots.txt"],
  ]
  for (const slug of ["move-out-cleaning", "move-in-move-out-cleaning", "move-in-cleaning", "house-move-out-cleaning", "apartment-move-out-cleaning", "condo-move-out-cleaning", "end-of-lease-cleaning", "same-week-move-out-cleaning", "empty-apartment-cleaning", "vacant-home-cleaning", "cleaning-after-moving-out", "cleaning-after-tenants", "rental-cleaning", "rental-turnover-cleaning", "landlord-cleaning", "property-manager-cleaning", "realtor-cleaning"]) cases.push([`/${slug}`, DEFAULT_TARGET])
  for (const [source, target] of cases) {
    expect(source, target)
    expect(`${source.toUpperCase()}/`, target)
    const query = "?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag"
    expect(`${source}${query}`, `${target}${query}`)
  }
})

test("all root cities and arbitrary subpages use only four specialist move-out routes", () => {
  assert.equal(CITY_SLUGS.length, 42)
  for (const city of CITY_SLUGS) {
    const hub = `/${city.replaceAll("-", "")}`
    const target = ["naperville", "aurora", "plainfield", "bolingbrook"].includes(city) ? `${hub}/move-out-cleaning` : hub
    expect(`/${city}`, target)
    for (const page of ["move-in-move-out-cleaning", "apartment-move-out-cleaning", "move-in-cleaning", "house-move-out-cleaning", "condo-move-out-cleaning", "move-out-cleaning-cost", "move-out-cleaning-checklist", "end-of-lease-cleaning", "rental-turnover-cleaning", "landlord-cleaning", "cleaning-before-selling-house", "arbitrary/nested/page", "quote"]) {
      expect(`/${city}/${page}`, target)
      expect(`/${city.toUpperCase()}/${page.toUpperCase()}/?gclid=test`, `${target}?gclid=test`)
    }
  }
})

test("guide defaults, quotes, booking and fallbacks respect route precedence", () => {
  for (const source of ["/quote", "/quote/step/2", "/booking/new", "/BOOK-NOW", "/get-a-quote", "/request/quote-form", "/booking-confirmation", "/schedule"]) expect(source, "/quote")
  for (const source of ["/guides/unknown", "/guides/move-out-cleaning-photos-before-keys", "/guides/quote-related-guide"]) expect(source, "/blog/move-in-move-out")
  for (const source of ["/nonexistent-xyz", "/assets/app.js", "/%zz", "//evil.example/", "/blog/unknown", "/service-areas/naperville", "/quoted-text", "/shynlimoveoutcleaning-sitemap.xml", "/shynlimoveoutcleaning-robots.txt"]) expect(source, DEFAULT_TARGET)
  expect("/BURR%2DRIDGE/", "/burrridge")
})

test("all 371 original sitemap URLs have known canonical mappings and expected counts", async () => {
  const xml = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8")
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.equal(urls.length, 371)
  const counts = {}
  for (const url of urls) {
    const r = getRedirect(url)
    assert.notEqual(r.group, "fallback", url)
    counts[r.group] = (counts[r.group] || 0) + 1
    const target = new URL(r.location)
    assert.equal(target.origin, DESTINATION_ORIGIN)
    assert.ok(!target.pathname.endsWith("/"))
  }
  for (const [group, count] of Object.entries({ home: 1, service: 17, "city-hub-specialist": 4, "city-hub": 38, "city-subpage-specialist": 44, "city-subpage": 238, "guide-index": 1, "guide-inspection": 2, "guide-other": 7, legal: 3 })) assert.equal(counts[group], count, group)
})
