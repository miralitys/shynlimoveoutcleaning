import { useState } from "react"
import { ArrowRight, BedDouble, CalendarCheck, Camera, Check, ClipboardCheck, KeyRound, PackageCheck, Search, ShieldCheck, Sparkles, Star, TimerReset, WashingMachine } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { businessEmail, businessPhoneDisplay, businessPhoneHref, cityHeroImages, cityList, cityPages, cityRouteNotes, featuredServiceAreaCities, serviceAreaGroups, slugifyCity } from "@/site/data"
import { type LegalPageData, LegalLine } from "@/site/legal-pages"
import { shinyMoveOutAllCityIntentLinks, shinyMoveOutFeaturedSeoLinks, shinyMoveOutPriorityCityIntentLinks } from "@/site/shiny-move-out-seo"
import { buildQuoteUrl, submitQuoteForm, useSeoMeta } from "@/site/shared"

export const moveOutProof = [
  ["60 sec", "start a move-out quote"],
  ["Photos", "after-clean report available"],
  ["No card", "to check timing"],
  ["Re-clean", "for covered missed items"],
]

export const moveOutMoments = [
  ["Renters", "Leave the apartment ready for inspection, with a checklist you can show if questions come up."],
  ["Sellers", "Get the home photo-ready after boxes, movers, dust, and last-minute handoff stress."],
  ["Landlords", "Reset the unit between tenants with clear scope, access notes, and optional add-ons."],
  ["Realtors", "Prepare listings, final walkthroughs, and key handoffs without chasing a cleaner by phone."],
]

export const moveOutReportRows = [
  ["Kitchen", "Counters, sink, stovetop, appliance exteriors, cabinet fronts, floors, and quoted appliance interiors."],
  ["Bathrooms", "Toilets, tubs, showers, mirrors, sinks, fixtures, floors, and high-touch areas."],
  ["Rooms", "Baseboards, doors, closets, switches, reachable shelves, floors, and empty-room dust."],
  ["Handoff", "Access checked, photos taken, final notes added, and lock-up confirmed when requested."],
]

export const moveOutPackages = [
  ["Apartment handoff", "$189+", "Studio or 1-bedroom empty apartment, standard walkthrough scope."],
  ["Rental reset", "$279+", "1-3 bedroom rentals, condos, townhomes, and move-out checklist work."],
  ["Listing clean", "Custom", "Homes for sale, realtor handoff, heavy condition, garage, patio, or add-ons."],
]

export const moveOutBoundaries = ["Heavy trash removal", "Carpet extraction", "Wall repair or painting", "Pest, mold, or biohazard work", "Exterior window washing"]

export const moveOutFaqs = [
  ["Can you guarantee my full deposit back?", "No. We can guarantee the covered cleaning scope and a re-clean path for missed checklist items. Deposit decisions belong to the landlord or property manager."],
  ["Do I need to be there?", "Usually no. Add lockbox, door code, parking, elevator, gate, pet, and utility notes before the visit."],
  ["Should the home be empty?", "Yes, for a true move-out clean. Large items, trash, and personal belongings should be removed before the cleaner arrives."],
  ["Are fridge, oven, cabinets, and garage included?", "Some are included only when selected or quoted. The page should show these add-ons clearly before booking."],
]

const shinyMoveOutCanonicalBase = "https://shynlimoveoutcleaning.com"

function isShynliMoveOutStandaloneHost() {
  if (typeof window === "undefined") {
    return false
  }

  return window.location.hostname === "shynlimoveoutcleaning.com" || window.location.hostname === "www.shynlimoveoutcleaning.com"
}

function getShynliMoveOutPath(slug?: string) {
  if (isShynliMoveOutStandaloneHost()) {
    return slug ? `/${slug}` : "/"
  }

  return slug ? `/shiny-move-out-cleaning/${slug}` : "/shiny-move-out-cleaning"
}

function ShynliMoveOutFooter({ city }: { city?: (typeof cityPages)[number] }) {
  const isPriorityCity = city ? featuredServiceAreaCities.includes(city.name) : false
  const cityLinks: [string, string][] = city
    ? [
        [city.name, city.slug],
        ...shinyMoveOutAllCityIntentLinks.map(([label, slug]) => [label, `${city.slug}/${slug}`] as [string, string]),
        ...(isPriorityCity ? shinyMoveOutPriorityCityIntentLinks.map(([label, slug]) => [label, `${city.slug}/${slug}`] as [string, string]) : []),
      ]
    : [
        ["Naperville", "naperville"],
        ["Aurora", "aurora"],
        ["Plainfield", "plainfield"],
        ["Oswego", "oswego"],
      ]
  return (
    <footer className="bg-[#0b2430] px-4 py-12 text-[#f6fbff] md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_1.95fr]">
        <div>
          <a href={getShynliMoveOutPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-sm bg-[#22c7a9] text-sm font-black text-[#0b2430]">SM</span>
            <span className="text-xl font-black">Shynli Move-Out Cleaning</span>
          </a>
          <p className="mt-5 max-w-sm text-sm font-bold leading-6 text-[#f6fbff]/62">
            Move-out cleaning for empty homes, lease handoffs, listing prep, final walkthroughs, and move-day timing.
          </p>
          <div className="mt-4 grid gap-1 text-sm font-bold text-[#f6fbff]/58">
            <a className="transition-colors hover:text-[#f6fbff]" href={businessPhoneHref}>{businessPhoneDisplay}</a>
            <a className="transition-colors hover:text-[#f6fbff]" href={`mailto:${businessEmail}`}>{businessEmail}</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-sm bg-[#22c7a9] px-5 font-black text-[#0b2430] hover:bg-[#37d8bb]">
              <a href={buildQuoteUrl({ service: "move-out-cleaning", city: city?.name })}>Start quote</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm border-[#f6fbff]/24 bg-[#f6fbff]/8 px-5 font-black text-[#f6fbff] hover:bg-[#f6fbff]/14 hover:text-[#f6fbff]">
              <a href={getShynliMoveOutPath() + "#areas"}>Service areas</a>
            </Button>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            ["Move-out pages", [["Cost guide", "move-out-cleaning-cost"], ["Checklist", "move-out-cleaning-checklist"], ["Apartment move-out", "apartment-move-out-cleaning"], ["Empty apartment", "empty-apartment-cleaning"]] as [string, string][]],
            ["Local pages", cityLinks],
            ["Support", [["Privacy", "privacy"], ["Terms", "terms"], ["Cancellation", "cancellation"], ["Home", ""]] as [string, string][]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <h3 className="text-sm font-black uppercase text-[#22c7a9]">{title as string}</h3>
              <div className="mt-4 grid gap-2">
                {(links as [string, string][]).map(([label, slug]) => (
                  <a key={label} href={getShynliMoveOutPath(slug || undefined)} className="flex min-h-10 items-center text-sm font-black text-[#f6fbff]/62 transition-colors hover:text-[#f6fbff]">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#f6fbff]/10 pt-6 text-sm font-bold text-[#f6fbff]/42 md:flex-row md:items-center md:justify-between">
        <p>ShynliMoveOutCleaning.com</p>
        <p>Empty-home scope. Access notes. Final walkthrough clarity.</p>
      </div>
    </footer>
  )
}

export const deepSiteProof = [
  ["Price before pressure", "Start with ZIP, home size, condition, and add-ons before you commit to a visit."],
  ["Checklist visible", "See why deep cleaning takes more time than a standard maintenance clean."],
  ["Add-ons named", "Fridge, oven, cabinet interiors, windows, blinds, and walls are called out early."],
  ["Make-right path", "Covered missed checklist items have a simple follow-up path after the visit."],
]

export const deepSiteZones = [
  ["Kitchen buildup", "Counter edges, sink detail, appliance fronts, stovetop residue, cabinet fronts, backsplash, handles, and the high-touch work a regular clean usually rushes."],
  ["Bathroom recovery", "Tub and shower buildup, toilet base, chrome fixtures, mirrors, vanity fronts, tile edges, corners, vents, and floor detail."],
  ["House edges", "Baseboards, doors, trim, switches, reachable vents, dusty corners, sills, and the surfaces that make the home feel neglected."],
  ["Final reset", "Trash, floors, room-by-room walk-through, access notes, and the follow-up path if an included item was missed."],
]

export const deepSiteScope = [
  {
    value: "included",
    label: "Included",
    title: "Deep-clean core",
    copy: "The promise is heavier detail inside a lived-in home: buildup, edges, fixtures, high-touch areas, and room-by-room recovery.",
    items: ["Kitchen and bathroom detail", "Baseboards, doors, and trim", "Detailed dusting", "High-touch surfaces", "Floors vacuumed and mopped", "Room-by-room checklist"],
  },
  {
    value: "quote",
    label: "Quoted extras",
    title: "Name the extras early",
    copy: "Some tasks need extra time, so they are named before booking instead of being discovered during the visit.",
    items: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Heavy blinds", "Wall spot cleaning"],
  },
  {
    value: "outside",
    label: "Not covered",
    title: "Trust comes from boundaries",
    copy: "Clear limits make the visit easier to trust before anyone starts work inside the home.",
    items: ["Mold or pest treatment", "Hazardous waste", "Heavy trash hauling", "Carpet extraction", "Exterior windows", "Unreachable areas"],
  },
]

export const deepSiteCompetitorMoves = [
  ["Upfront quote path", "Price starts with ZIP, rooms, condition, and add-ons, so the visit does not feel mysterious."],
  ["Supplies handled", "Standard supplies are part of the service unless the home needs a special product or surface note."],
  ["Clear boundaries", "Included work, quoted extras, and not-covered items are separated before booking."],
  ["Local follow-up", "If an included checklist item is missed, the customer has a clear path to reach support."],
]

export const deepSiteReviews = [
  {
    name: "Maya R.",
    initial: "M",
    place: "Naperville",
    service: "Kitchen and bath deep clean",
    copy: "The quote made it clear what was included before anyone came over. The kitchen edges and shower buildup were the biggest difference.",
  },
  {
    name: "Daniel K.",
    initial: "D",
    place: "Aurora",
    service: "First clean before recurring",
    copy: "I liked seeing the add-ons upfront. We added the oven and cabinets, and the visit felt planned instead of rushed.",
  },
  {
    name: "Priya S.",
    initial: "P",
    place: "Plainfield",
    service: "Whole-home reset",
    copy: "The cleaner focused on the details I usually avoid: baseboards, fixtures, corners, and bathroom buildup. It felt like a reset.",
  },
]

export const deepSiteFaqs = [
  ["Is deep cleaning just a larger standard clean?", "No. Deep cleaning is a catch-up reset for buildup, edges, bathrooms, kitchens, high-touch details, and rooms that have fallen behind."],
  ["Are fridge, oven, and cabinet interiors included?", "They are quoted extras unless your estimate specifically includes them. This keeps the visit timed correctly."],
  ["Do cleaners bring supplies?", "Yes. Standard supplies are included. Special products, delicate surfaces, or customer-preferred supplies should be discussed before the visit."],
  ["What if something is missed?", "Reach out after the visit. Covered missed checklist items should have a simple make-right path."],
]

export type ShynliDeepSeoPageData = {
  slug: string
  title: string
  meta: string
  eyebrow: string
  h1: string
  intro: string
  sections: { title: string; copy: string; bullets: string[] }[]
  faqs: [string, string][]
}

const deepSeoPageLinks: [string, string][] = [
  ["Deep cleaning cost", "deep-cleaning-cost"],
  ["Deep cleaning checklist", "deep-cleaning-checklist"],
  ["What is included", "what-is-included-in-deep-cleaning"],
  ["What is not included", "what-is-not-included-in-deep-cleaning"],
  ["Add-ons", "deep-cleaning-add-ons"],
  ["How long it takes", "how-long-does-deep-cleaning-take"],
  ["Prepare", "prepare-for-deep-cleaning"],
  ["Standard vs deep", "standard-cleaning-vs-deep-cleaning"],
  ["Move-out vs deep", "move-out-cleaning-vs-deep-cleaning"],
  ["Before guests", "deep-cleaning-before-guests"],
  ["Before recurring", "deep-cleaning-before-recurring-cleaning"],
  ["FAQ", "deep-cleaning-faq"],
]

const baseShynliDeepSeoPages: ShynliDeepSeoPageData[] = [
  {
    slug: "deep-cleaning-cost",
    title: "Deep Cleaning Cost | Shynli Deep Cleaning",
    meta: "Learn what affects deep cleaning cost, including home size, buildup, bathrooms, kitchens, add-ons, access notes, and appointment timing.",
    eyebrow: "Cost guide",
    h1: "Deep cleaning cost depends on time, buildup, and add-ons.",
    intro: "Deep cleaning costs more than standard maintenance cleaning because the visit is built around catch-up work: bathroom buildup, kitchen residue, baseboards, doors, trim, fixtures, and rooms that need more time. A useful quote should explain the home size, current condition, selected add-ons, access notes, and timing before the appointment is held.",
    sections: [
      { title: "Main price factors", copy: "The biggest pricing signals are the number of rooms, number of bathrooms, condition, and whether the home needs a catch-up reset or a lighter first visit.", bullets: ["Bedrooms and bathrooms", "Kitchen and bathroom buildup", "Pets, clutter, and access", "Parking, elevator, gate, or lockbox notes"] },
      { title: "Add-ons that change time", copy: "Some deep-clean tasks need extra time and should be selected before booking rather than discovered at the door.", bullets: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Blinds", "Basement cleaning"] },
      { title: "How to get a clearer quote", copy: "A better estimate starts with honest condition notes, not just square footage.", bullets: ["Choose light, behind, or heavy buildup", "Name priority rooms", "List appliance or cabinet interiors", "Share access and pet notes"] },
    ],
    faqs: [
      ["Why is deep cleaning more expensive?", "It usually needs more time for buildup, edges, fixtures, baseboards, kitchens, bathrooms, and high-touch details."],
      ["Can two homes with the same size cost different amounts?", "Yes. Condition, clutter, bathrooms, pets, add-ons, and access can change the time needed."],
      ["Are fridge and oven included?", "They are quoted extras unless the estimate specifically includes them."],
      ["Do I need a card to check?", "No. Start with the quote details first."],
    ],
  },
  {
    slug: "deep-cleaning-checklist",
    title: "Deep Cleaning Checklist | Shynli Deep Cleaning",
    meta: "Review a deep cleaning checklist for kitchens, bathrooms, bedrooms, living areas, baseboards, high-touch surfaces, add-ons, and not-covered work.",
    eyebrow: "Checklist",
    h1: "Deep cleaning checklist: what the visit should actually cover.",
    intro: "A deep cleaning checklist should make the difference between standard upkeep and catch-up detail obvious. The best checklist starts with kitchens and bathrooms, then adds baseboards, doors, trim, reachable vents, high-touch areas, detailed dusting, and selected add-ons.",
    sections: [
      { title: "Kitchen detail", copy: "Kitchens often carry the most visible buildup, especially around cooking surfaces, handles, edges, and appliance fronts.", bullets: ["Counter edges and sink detail", "Stovetop and appliance fronts", "Cabinet fronts and handles", "Backsplash and high-touch surfaces"] },
      { title: "Bathroom recovery", copy: "Bathrooms need more than a quick wipe when tubs, showers, fixtures, floors, and corners have fallen behind.", bullets: ["Tub and shower buildup", "Toilet base and vanity fronts", "Mirrors and chrome fixtures", "Tile edges and floor corners"] },
      { title: "Whole-home reset", copy: "The reset layer makes the home feel cleaner beyond the obvious surfaces.", bullets: ["Baseboards, doors, and trim", "Detailed dusting", "Reachable vents and sills", "Floors vacuumed and mopped"] },
    ],
    faqs: [
      ["Is every checklist identical?", "No. The final scope depends on home condition, add-ons, and priority rooms."],
      ["Does deep cleaning include walls?", "Light spot cleaning may be discussed, but heavy wall washing is usually outside the normal scope."],
      ["Does deep cleaning include interior windows?", "Interior windows are usually quoted as an add-on."],
      ["Can I name priority rooms?", "Yes. Priority rooms should be named before booking."],
    ],
  },
  {
    slug: "what-is-included-in-deep-cleaning",
    title: "What Is Included in Deep Cleaning | Shynli Deep Cleaning",
    meta: "See what is usually included in deep cleaning, what may be quoted as an extra, and what should be discussed before booking.",
    eyebrow: "Included scope",
    h1: "What is included in deep cleaning?",
    intro: "Deep cleaning usually includes the core rooms and details that a standard clean can miss when a home has fallen behind. The exact scope should be visible before booking, especially when appliance interiors, cabinet interiors, windows, blinds, or walls are part of the request.",
    sections: [
      { title: "Usually included", copy: "The core deep-clean promise is a heavier level of detail inside lived-in rooms.", bullets: ["Kitchen and bathroom detail", "Baseboards, doors, and trim", "Detailed dusting", "High-touch surfaces", "Floors vacuumed and mopped"] },
      { title: "Often quoted separately", copy: "Some tasks are time-heavy enough that they should be selected before the appointment.", bullets: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Heavy blinds", "Basement cleaning"] },
      { title: "Why clarity matters", copy: "A clear scope protects the customer from surprise charges and protects the cleaner from impossible timing.", bullets: ["Visible checklist", "Named add-ons", "Condition notes", "Follow-up path for covered missed items"] },
    ],
    faqs: [
      ["Are supplies included?", "Standard supplies are included unless a special product is requested."],
      ["Are baseboards included?", "Baseboards are part of the deep-clean core scope."],
      ["Are cabinet interiors included?", "They are usually quoted separately."],
      ["Is deep cleaning the same as move-out cleaning?", "No. Move-out cleaning is usually built around empty-home handoff needs."],
    ],
  },
  {
    slug: "what-is-not-included-in-deep-cleaning",
    title: "What Is Not Included in Deep Cleaning | Shynli Deep Cleaning",
    meta: "Understand deep cleaning boundaries before you request a quote, including hazardous waste, mold, heavy trash, carpet extraction, exterior windows, and unreachable areas.",
    eyebrow: "Boundaries",
    h1: "What is not included in deep cleaning?",
    intro: "Deep cleaning is a heavier residential cleaning visit, but it is not a remediation, repair, hauling, or restoration service. Clear boundaries make the appointment easier to trust because everyone knows what needs a different kind of help.",
    sections: [
      { title: "Outside the normal scope", copy: "These tasks need different equipment, licensing, risk handling, or scheduling.", bullets: ["Mold or pest treatment", "Hazardous waste", "Heavy trash hauling", "Carpet extraction", "Exterior window washing", "Unreachable areas"] },
      { title: "Needs a separate quote", copy: "Some tasks may be possible only if they are named and timed separately.", bullets: ["Heavy wall washing", "Post-construction dust", "Large basement cleanup", "Garage cleaning", "Extreme buildup"] },
      { title: "How to avoid surprises", copy: "Send the condition honestly before booking so the team can confirm whether deep cleaning is the right service.", bullets: ["Share photos if needed", "Name heavy rooms", "Ask about add-ons", "Confirm boundaries before arrival"] },
    ],
    faqs: [
      ["Can deep cleaning remove mold?", "No. Mold treatment needs a different service."],
      ["Does deep cleaning include carpet shampoo?", "No. Carpet extraction is outside the normal deep-clean scope."],
      ["Can cleaners move heavy furniture?", "Heavy lifting is generally outside the scope."],
      ["Can I ask before booking?", "Yes. Ask before booking so the visit can be scoped correctly."],
    ],
  },
  {
    slug: "deep-cleaning-add-ons",
    title: "Deep Cleaning Add-Ons | Shynli Deep Cleaning",
    meta: "Compare deep cleaning add-ons such as fridge, oven, cabinet interiors, interior windows, blinds, doors, baseboards, and basement cleaning.",
    eyebrow: "Add-ons",
    h1: "Deep cleaning add-ons should be named before the visit.",
    intro: "Add-ons help turn a generic deep clean into the right visit for the home. The important part is naming them before booking, because fridge interiors, oven interiors, cabinet interiors, windows, blinds, and basement work can change the time needed.",
    sections: [
      { title: "Kitchen add-ons", copy: "Kitchen add-ons are popular because appliance and cabinet interiors take focused time.", bullets: ["Inside refrigerator", "Inside oven", "Inside cabinets", "Range hood", "Cabinet fronts and handles"] },
      { title: "Detail add-ons", copy: "These extras can make a home feel more reset when dust and buildup have reached beyond the obvious surfaces.", bullets: ["Interior windows", "Blinds", "Doors", "Baseboards", "Wood furniture polishing"] },
      { title: "When to select add-ons", copy: "Choose add-ons when one area matters more than a broad but rushed visit.", bullets: ["Before guests", "Before recurring service", "After a busy season", "Before move timing", "When kitchens or bathrooms are the priority"] },
    ],
    faqs: [
      ["Should I add oven cleaning?", "Add it when the oven interior matters to the result."],
      ["Should I add fridge cleaning?", "Add it when the inside needs to be wiped and reset."],
      ["Are blinds included?", "Heavy blind cleaning is usually quoted separately."],
      ["Can I skip add-ons?", "Yes. The base deep clean can still focus on core rooms and surfaces."],
    ],
  },
  {
    slug: "how-long-does-deep-cleaning-take",
    title: "How Long Does Deep Cleaning Take | Shynli Deep Cleaning",
    meta: "Learn how long deep cleaning takes and what changes timing, including home size, buildup, bathrooms, kitchens, add-ons, clutter, and access.",
    eyebrow: "Timing",
    h1: "How long does deep cleaning take?",
    intro: "Deep cleaning takes longer than standard cleaning because it is built around detail and buildup, not just maintenance surfaces. The time depends on home size, room count, bathrooms, kitchen condition, clutter, pets, add-ons, and how easy it is to access the home.",
    sections: [
      { title: "What adds time", copy: "The same square footage can take very different amounts of time depending on the home.", bullets: ["Heavy bathroom buildup", "Greasy kitchen surfaces", "Baseboards and doors", "Interior appliances", "Pet hair and clutter"] },
      { title: "How to shorten the visit", copy: "Preparation helps the cleaner spend time cleaning instead of sorting around obstacles.", bullets: ["Pick up personal clutter", "Clear counters where possible", "Share access notes", "Name priority rooms"] },
      { title: "Why timing should be flexible", copy: "A proper deep clean should not be forced into a maintenance-clean time slot.", bullets: ["Condition matters", "Add-ons matter", "Bathrooms matter", "Follow-up matters"] },
    ],
    faqs: [
      ["Can a deep clean take all day?", "Sometimes, especially for larger homes, heavy buildup, or many add-ons."],
      ["Is a first clean usually longer?", "Yes. The first visit often resets the baseline."],
      ["Do add-ons add time?", "Yes. Appliance interiors, blinds, windows, and cabinets can add time."],
      ["Can I prioritize rooms?", "Yes. Prioritizing helps when timing matters."],
    ],
  },
  {
    slug: "prepare-for-deep-cleaning",
    title: "How to Prepare for Deep Cleaning | Shynli Deep Cleaning",
    meta: "Prepare for a deep cleaning visit with access notes, clutter pickup, priority rooms, pets, special surfaces, add-ons, and timing expectations.",
    eyebrow: "Preparation",
    h1: "How to prepare for deep cleaning.",
    intro: "Preparing for deep cleaning does not mean cleaning before the cleaner arrives. It means making the visit easier to scope: clear access, name priority rooms, pick up personal clutter where possible, separate pets, and choose add-ons before the appointment.",
    sections: [
      { title: "Before the visit", copy: "A few practical notes can protect the appointment from avoidable delays.", bullets: ["Confirm parking and entry", "Share gate or lockbox codes", "Separate pets", "Clear counters and floors where possible"] },
      { title: "Scope priorities", copy: "The cleaner should know what matters most before starting.", bullets: ["Kitchen detail", "Bathroom buildup", "Baseboards and doors", "Guest areas", "Appliance interiors"] },
      { title: "Surface notes", copy: "Special surfaces should be named early so the cleaner can avoid the wrong product or pressure.", bullets: ["Stone counters", "Hardwood floors", "Delicate fixtures", "Glass shower doors", "Customer-supplied products"] },
    ],
    faqs: [
      ["Do I need to be home?", "Often no, if access and lock-up details are clear."],
      ["Should I pick up clutter?", "Yes, when possible. It lets the cleaner spend more time on detail work."],
      ["Should I move furniture?", "Heavy moving is not expected."],
      ["Can I leave notes?", "Yes. Notes are helpful, especially for priority rooms and surfaces."],
    ],
  },
  {
    slug: "standard-cleaning-vs-deep-cleaning",
    title: "Standard Cleaning vs Deep Cleaning | Shynli Deep Cleaning",
    meta: "Compare standard cleaning vs deep cleaning, including maintenance work, buildup, baseboards, bathrooms, kitchens, add-ons, and first-clean timing.",
    eyebrow: "Comparison",
    h1: "Standard cleaning vs deep cleaning: which one do you need?",
    intro: "Standard cleaning maintains a home that is already under control. Deep cleaning resets a home that needs more detail, more time, and more attention to buildup. The right choice depends on the condition of the home today, not only the size of the home.",
    sections: [
      { title: "Choose standard cleaning when", copy: "Standard cleaning is the right fit for homes that need upkeep rather than recovery.", bullets: ["The home is cleaned regularly", "Bathrooms are maintained", "Kitchen buildup is light", "No major add-ons are needed"] },
      { title: "Choose deep cleaning when", copy: "Deep cleaning is better when a regular visit would leave too many details untouched.", bullets: ["Baseboards and doors need attention", "Bathrooms have buildup", "Kitchen residue is visible", "The first recurring visit needs a reset"] },
      { title: "How they work together", copy: "Many homes start with deep cleaning, then move into recurring maintenance.", bullets: ["Deep clean resets the baseline", "Recurring visits maintain it", "Add-ons are named separately", "Expectations stay clearer"] },
    ],
    faqs: [
      ["Is deep cleaning always better?", "No. It is better when the home needs catch-up detail."],
      ["Should recurring cleaning start with deep cleaning?", "Often, yes, if the home has fallen behind."],
      ["Does standard cleaning include baseboards?", "It may include light attention, but deep cleaning gives more detail."],
      ["Can I switch after requesting a quote?", "Yes. The quote can be adjusted."],
    ],
  },
  {
    slug: "move-out-cleaning-vs-deep-cleaning",
    title: "Move-Out Cleaning vs Deep Cleaning | Shynli Deep Cleaning",
    meta: "Compare move-out cleaning vs deep cleaning and learn when an empty-home clean, appliance interiors, cabinets, closets, and handoff scope matter.",
    eyebrow: "Comparison",
    h1: "Move-out cleaning vs deep cleaning: the scope is different.",
    intro: "Move-out cleaning and deep cleaning overlap, but they solve different problems. Deep cleaning resets a lived-in home. Move-out cleaning prepares an empty or nearly empty home for handoff, listing photos, lease inspection, or new occupants.",
    sections: [
      { title: "Deep cleaning focus", copy: "Deep cleaning is best for homes that are still being lived in.", bullets: ["Kitchen and bathroom buildup", "Baseboards and trim", "High-touch surfaces", "Detailed dusting", "Floors and shared rooms"] },
      { title: "Move-out focus", copy: "Move-out cleaning usually needs empty-room surfaces and handoff details.", bullets: ["Empty cabinets and drawers", "Appliance interiors", "Closets and shelves", "Access and lock-up notes", "Final walkthrough priorities"] },
      { title: "How to choose", copy: "Pick the service based on the situation, not just the word clean.", bullets: ["Still living there: deep clean", "Empty home: move-out clean", "Lease checklist: move-out clean", "Before recurring service: deep clean"] },
    ],
    faqs: [
      ["Can deep cleaning work for a move?", "Sometimes, but a true move-out clean should be scoped around empty-home handoff."],
      ["Does move-out cleaning include appliances?", "Often as selected add-ons or quoted scope."],
      ["Which costs more?", "It depends on home size, condition, and add-ons."],
      ["Can I request both?", "Yes, but the quote should name the move-specific work."],
    ],
  },
  {
    slug: "deep-cleaning-before-guests",
    title: "Deep Cleaning Before Guests | Shynli Deep Cleaning",
    meta: "Plan deep cleaning before guests arrive, focusing on bathrooms, kitchen surfaces, entry areas, floors, high-touch details, and add-ons.",
    eyebrow: "Hosting",
    h1: "Deep cleaning before guests should focus where people notice first.",
    intro: "Before guests arrive, the goal is not to deep clean every possible corner equally. The best plan prioritizes bathrooms, kitchen surfaces, entry areas, floors, dining spaces, high-touch surfaces, and rooms guests will actually use.",
    sections: [
      { title: "Guest-facing rooms", copy: "Start where the visit will be felt immediately.", bullets: ["Powder rooms and guest bathrooms", "Kitchen counters and sink", "Entry floors", "Dining and living areas"] },
      { title: "Details people notice", copy: "Small details can change the first impression.", bullets: ["Door fingerprints", "Baseboards near entries", "Fixture shine", "Trash points", "Pet hair"] },
      { title: "When to add extras", copy: "Add-ons make sense when they affect hosting comfort.", bullets: ["Interior windows", "Oven interior", "Fridge interior", "Guest room reset", "Blinds"] },
    ],
    faqs: [
      ["How soon should I book?", "Book as early as possible so timing is easier to confirm."],
      ["Should I clean every room?", "Prioritize guest-facing rooms first."],
      ["Is this different from holiday cleaning?", "Holiday cleaning is similar but often has more kitchen and hosting pressure."],
      ["Can I name guest rooms?", "Yes. Name rooms before booking."],
    ],
  },
  {
    slug: "deep-cleaning-before-recurring-cleaning",
    title: "Deep Cleaning Before Recurring Cleaning | Shynli Deep Cleaning",
    meta: "Learn why a deep cleaning before recurring service can reset bathrooms, kitchens, baseboards, buildup, and high-touch areas before maintenance visits begin.",
    eyebrow: "First visit",
    h1: "A deep clean before recurring service can reset the baseline.",
    intro: "Recurring cleaning works best when the home starts from a manageable baseline. If the first visit is priced and timed like a maintenance clean, old buildup can remain. A deep clean before recurring service gives the cleaner time to reset kitchens, bathrooms, edges, fixtures, baseboards, and high-touch areas.",
    sections: [
      { title: "Why the first visit is different", copy: "The first visit often finds work that future visits will not need every time.", bullets: ["Bathroom buildup", "Kitchen residue", "Baseboards and doors", "Dusty edges", "Pet hair"] },
      { title: "What recurring can maintain", copy: "After the reset, maintenance visits can focus on keeping the home under control.", bullets: ["Kitchen surfaces", "Bathrooms", "Floors", "Dusting", "Trash"] },
      { title: "How to plan the transition", copy: "Use the deep clean to name what matters before choosing weekly, biweekly, or monthly service.", bullets: ["Start with condition", "Name priority rooms", "Choose add-ons", "Confirm recurring goals"] },
    ],
    faqs: [
      ["Do I always need a deep clean first?", "No, but it helps if the home has fallen behind."],
      ["Will recurring cleaning be easier after?", "Usually, yes. The baseline is cleaner."],
      ["Can I start with biweekly?", "Yes. The cadence can be discussed after the first clean."],
      ["What if my home is already maintained?", "Then standard recurring cleaning may be enough."],
    ],
  },
  {
    slug: "deep-cleaning-faq",
    title: "Deep Cleaning FAQ | Shynli Deep Cleaning",
    meta: "Answers to common deep cleaning questions about cost, checklist, timing, add-ons, supplies, preparation, boundaries, and follow-up.",
    eyebrow: "FAQ",
    h1: "Deep cleaning FAQ: answers before you book.",
    intro: "Deep cleaning questions usually come down to scope, timing, cost, and expectations. This FAQ brings the practical answers together so the quote feels clearer before anyone enters the home.",
    sections: [
      { title: "Cost and timing", copy: "Deep cleaning usually needs more time than a standard clean because it handles buildup and detail.", bullets: ["Home size matters", "Condition matters", "Bathrooms matter", "Add-ons matter"] },
      { title: "Scope and add-ons", copy: "The core clean and optional extras should be separated before booking.", bullets: ["Core rooms", "Baseboards and doors", "Fridge and oven extras", "Cabinet and window extras"] },
      { title: "Preparation and follow-up", copy: "A smoother visit starts with notes and ends with a clear path if something included was missed.", bullets: ["Access notes", "Priority rooms", "Pet notes", "Follow-up contact"] },
    ],
    faqs: [
      ["What is deep cleaning?", "A catch-up reset for buildup, edges, bathrooms, kitchens, high-touch details, and rooms that need more than maintenance."],
      ["How long does it take?", "It depends on size, condition, bathrooms, kitchen buildup, clutter, access, and add-ons."],
      ["Do cleaners bring supplies?", "Yes. Standard supplies are included."],
      ["What if something is missed?", "Covered missed checklist items should have a simple follow-up path."],
    ],
  },
]

const deepExtraGuideSeeds = [
  {
    slug: "kitchen-deep-cleaning",
    label: "Kitchen deep cleaning",
    intent: "kitchen residue, sink edges, stovetop buildup, cabinet fronts, backsplash, appliance faces, handles, and floor corners",
    why: "when the kitchen still feels sticky or busy after normal wiping",
  },
  {
    slug: "bathroom-deep-cleaning",
    label: "Bathroom deep cleaning",
    intent: "shower buildup, tub edges, toilet bases, vanity fronts, chrome fixtures, mirrors, tile lines, and floor corners",
    why: "when bathrooms need recovery instead of a quick refresh",
  },
  {
    slug: "baseboard-cleaning",
    label: "Baseboard cleaning",
    intent: "baseboards, trim, door frames, dust lines, scuffs, corners, and the edges people notice when the rest of the room is clean",
    why: "when edges make the home look unfinished",
  },
  {
    slug: "oven-cleaning-with-deep-cleaning",
    label: "Oven cleaning with deep cleaning",
    intent: "oven interiors, oven doors, exterior handles, range areas, nearby cabinet fronts, and cooking residue around the kitchen",
    why: "when cooking buildup is one of the main reasons for booking",
  },
  {
    slug: "fridge-cleaning-with-deep-cleaning",
    label: "Fridge cleaning with deep cleaning",
    intent: "refrigerator shelves, drawers, handles, seals, exterior faces, nearby counters, and food-zone reset work",
    why: "when the kitchen needs a more complete reset",
  },
  {
    slug: "cabinet-cleaning-with-deep-cleaning",
    label: "Cabinet cleaning with deep cleaning",
    intent: "cabinet fronts, handles, edges, selected interiors, drawers, pantry touchpoints, and kitchen storage areas",
    why: "when fingerprints, grease, or move timing makes cabinets matter",
  },
  {
    slug: "interior-window-cleaning-with-deep-cleaning",
    label: "Interior window cleaning with deep cleaning",
    intent: "interior glass, sills, tracks where reachable, fingerprints, dust near windows, and the rooms where light shows buildup",
    why: "when windows change how clean the room feels",
  },
  {
    slug: "blinds-cleaning-with-deep-cleaning",
    label: "Blinds cleaning with deep cleaning",
    intent: "blind dust, slats, nearby sills, window edges, bedrooms, living rooms, and offices where dust is obvious",
    why: "when dust on blinds keeps the room from feeling reset",
  },
  {
    slug: "pet-hair-deep-cleaning",
    label: "Pet hair deep cleaning",
    intent: "pet hair, floors, baseboards, sofa-adjacent areas, corners, stairs, entry points, and rooms pets use most",
    why: "when fur and traffic patterns need more than a maintenance pass",
  },
  {
    slug: "deep-cleaning-before-selling-house",
    label: "Deep cleaning before selling a house",
    intent: "listing-ready kitchens, bathrooms, entries, floors, baseboards, high-touch areas, and rooms buyers notice first",
    why: "before photos, showings, or a final listing push",
  },
  {
    slug: "deep-cleaning-before-moving-in",
    label: "Deep cleaning before moving in",
    intent: "empty rooms, kitchen and bathroom detail, cabinet fronts, selected interiors, floors, closets, and high-touch areas",
    why: "before furniture makes access harder",
  },
  {
    slug: "deep-cleaning-after-moving-out",
    label: "Deep cleaning after moving out",
    intent: "empty-room surfaces, baseboards, appliance add-ons, cabinet interiors, closets, floors, and handoff details",
    why: "after boxes leave and every missed edge becomes visible",
  },
  {
    slug: "deep-cleaning-before-holidays",
    label: "Deep cleaning before holidays",
    intent: "guest bathrooms, kitchens, dining areas, entry floors, guest rooms, high-touch surfaces, and hosting add-ons",
    why: "before the home has more people moving through it",
  },
  {
    slug: "spring-deep-cleaning",
    label: "Spring deep cleaning",
    intent: "seasonal dust, windows, sills, baseboards, bathrooms, kitchens, entry areas, and rooms that carried winter clutter",
    why: "when the home needs a seasonal reset",
  },
  {
    slug: "fall-deep-cleaning",
    label: "Fall deep cleaning",
    intent: "mudrooms, kitchens, bathrooms, guest spaces, baseboards, doors, dust, and the reset before colder months",
    why: "before holidays, hosting, and more time indoors",
  },
  {
    slug: "one-time-deep-cleaning",
    label: "One-time deep cleaning",
    intent: "one appointment for kitchens, bathrooms, floors, baseboards, doors, detail dusting, and selected add-ons",
    why: "when recurring service is not the goal yet",
  },
  {
    slug: "deep-cleaning-for-busy-families",
    label: "Deep cleaning for busy families",
    intent: "kitchens, bathrooms, entry areas, play spaces, pet zones, laundry-adjacent areas, floors, and high-touch surfaces",
    why: "when normal weeks keep pushing detail work back",
  },
  {
    slug: "deep-cleaning-for-renters",
    label: "Deep cleaning for renters",
    intent: "apartments, townhomes, lease timing, kitchens, bathrooms, floors, appliance add-ons, and move-related notes",
    why: "when the home needs to feel managed before or after a lease event",
  },
  {
    slug: "deep-cleaning-for-landlords",
    label: "Deep cleaning for landlords",
    intent: "turnover timing, empty rooms, kitchens, bathrooms, appliance interiors, cabinets, lockbox notes, and handoff expectations",
    why: "between tenants or before a showing",
  },
  {
    slug: "deep-cleaning-for-townhouses",
    label: "Deep cleaning for townhouses",
    intent: "multi-level layouts, stairs, entry floors, kitchens, bathrooms, baseboards, doors, bedrooms, and shared spaces",
    why: "when a townhouse needs detail across more than one level",
  },
  {
    slug: "deep-cleaning-estimate",
    label: "Deep cleaning cost guide",
    intent: "room count, bathrooms, buildup level, add-ons, access notes, preferred timing, and the rooms that should be prioritized",
    why: "when you want a clearer quote before choosing an appointment time",
  },
  {
    slug: "deep-cleaning-for-3-bedroom-house",
    label: "Deep cleaning for a 3-bedroom house",
    intent: "three-bedroom layouts, shared bathrooms, kitchen detail, bedroom dusting, baseboards, stairs, and family traffic areas",
    why: "when a typical family home needs more than a maintenance visit",
  },
  {
    slug: "deep-cleaning-for-2-bedroom-apartment",
    label: "Deep cleaning for a 2-bedroom apartment",
    intent: "compact kitchens, apartment bathrooms, bedroom floors, shared entries, appliance add-ons, and move or guest timing",
    why: "when a smaller home still needs serious detail time",
  },
  {
    slug: "deep-cleaning-with-pets",
    label: "Deep cleaning with pets",
    intent: "pet hair, entry floors, stairs, corners, baseboards, sofa-adjacent areas, odors, pet separation, and rooms pets use most",
    why: "when pets make dust, hair, and traffic patterns more visible",
  },
  {
    slug: "deep-cleaning-after-renovation-dust",
    label: "Deep cleaning after renovation dust",
    intent: "repair dust, reachable surfaces, floors, baseboards, vents, counters, room priorities, and dust level notes before booking",
    why: "after small repairs or renovation dust make a normal clean feel too light",
  },
]

const deepExtraGuidePages: ShynliDeepSeoPageData[] = deepExtraGuideSeeds.map((seed) => ({
  slug: seed.slug,
  title: `${seed.label} | Shynli Deep Cleaning`,
  meta: `${seed.label} guidance for deep cleaning scope, quote notes, add-ons, priority rooms, timing, and what to confirm before booking.`,
  eyebrow: "Deep cleaning guide",
  h1: `${seed.label}: what to plan before the visit.`,
  intro: `${seed.label} is a focused deep-cleaning request, not a vague bigger appointment. It matters ${seed.why}, because the quote should reserve time for ${seed.intent}.`,
  sections: [
    {
      title: "When this request makes sense",
      copy: `Choose this angle ${seed.why}. It helps the cleaner understand what result should matter most instead of spreading time thinly across the whole home.`,
      bullets: ["Name the rooms that matter most", "Describe the condition honestly", "Separate core work from add-ons", "Share timing and access notes"],
    },
    {
      title: "What to include in the quote",
      copy: `A useful request should mention ${seed.intent}. That gives the estimate enough context before a cleaner is assigned.`,
      bullets: ["Home size and room count", "Buildup level", "Priority surfaces", "Optional extras", "Pets, parking, or access notes"],
    },
    {
      title: "How it connects to a full deep clean",
      copy: "Focused pages like this should still lead back to the main deep-cleaning scope so the customer understands what is included, what costs extra, and what is outside the visit.",
      bullets: ["Deep-cleaning checklist", "Cost factors", "Add-ons", "Preparation", "Follow-up path"],
    },
  ],
  faqs: [
    [`Is ${seed.label.toLowerCase()} a separate service?`, "It can be quoted as part of a deep-cleaning visit when the scope and timing are clear before booking."],
    ["Will this change the price?", "It can. Priority rooms, buildup, add-ons, and access notes can change the time needed."],
    ["Should I send notes before the visit?", "Yes. Notes help the cleaner plan the right rooms, products, timing, and add-ons."],
    ["Can this be combined with recurring cleaning?", "Yes. Many homes use a deep clean first, then move into weekly, biweekly, or monthly maintenance."],
  ],
}))

export const shinyDeepSeoPages: ShynliDeepSeoPageData[] = [...baseShynliDeepSeoPages, ...deepExtraGuidePages]

export const deepSiteFooterColumns = [
  {
    title: "Deep cleaning",
    links: [["Scope", "#scope"], ["Checklist", "#checklist"], ["Quote", "#quote"], ["Questions", "#faq"]],
  },
  {
    title: "Service areas",
    links: [["Naperville", "naperville"], ["Aurora", "aurora"], ["Plainfield", "plainfield"], ["All cities", "#areas"]],
  },
  {
    title: "Trust",
    links: [["Reviews", "#reviews"], ["Cost", "#quote"], ["Service areas", "#areas"], ["Contact", "#quote"]],
  },
]

const deepQuoteConditions = ["Light buildup", "Behind", "Heavy buildup", "Move timing"]
const deepQuoteAddOns = ["Fridge", "Oven", "Cabinets"]
const shinyDeepCanonicalBase = "https://shinydeepcleaning.com"

const deepCityRoutePatterns = [
  "older trim, busy kitchens, and family bathrooms that collect detail work between recurring visits",
  "townhome entries, attached garages, pet traffic, and shared living rooms that need a slower first pass",
  "condo access notes, elevator timing, hallway rules, and smaller rooms where edges still matter",
  "larger suburban layouts, extra bathrooms, finished basements, and guest rooms that do not fit a rushed visit",
  "rental turnovers, move timing, appliance interiors, and handoff pressure around keys or listing photos",
  "school-week schedules, commute windows, pets, and the practical details that decide whether a deep clean feels calm",
  "historic corners, narrow baths, cabinet grooves, and the small ledges that collect dust near older fixtures",
  "newer subdivisions, open kitchens, mudrooms, island seating, and high-touch family zones that need detail time",
  "quiet cul-de-sacs, multi-level floor plans, guest suites, and weekend hosting areas that deserve a full reset",
  "apartment corridors, shared entries, compact kitchens, and bathrooms where buildup shows quickly",
  "larger lots, basement stairs, laundry rooms, utility areas, and seasonal dust tracked in from garages",
]

const deepCityPriorityPatterns = [
  "stovetop residue, cabinet fronts, sink edges, backsplash splatter, and the corners beside appliances",
  "shower buildup, toilet bases, chrome fixtures, vanity fronts, tile lines, and the floor edges around baths",
  "baseboards, doors, switches, reachable vents, window sills, trim, and dust that has settled into corners",
  "entry areas, stair rails, laundry zones, trash points, pet-touch surfaces, and shared rooms people notice first",
  "empty-room floors, closet shelves, cabinet interiors, appliance interiors, and the final walk-through path",
  "guest bathrooms, dining areas, kitchen islands, fingerprints on doors, and the reset details before hosting",
  "powder rooms, breakfast areas, pantry handles, fridge edges, and the spots guests see before anyone sits down",
  "primary bathrooms, glass doors, towel bars, vanity drawers, and dust lines around bedroom furniture",
  "mudroom benches, stair landings, hallway trim, closet floors, and the surfaces that show busy household traffic",
  "range hoods, microwave handles, cabinet pulls, counter seams, and floor corners near the kitchen work triangle",
  "finished basement ledges, utility-room dust, extra bedrooms, ceiling fan edges, and basement bathroom touchpoints",
  "move-related shelves, drawer interiors, door frames, scuffed baseboards, and the last details before a handoff",
]

const deepCityAccessPatterns = [
  "parking, lockbox, gate, elevator, pet, and preferred entry notes before the cleaner is assigned",
  "driveway access, condo instructions, building codes, trash location, and any rooms that should be skipped",
  "arrival-window preferences, school pickup timing, work-from-home rooms, and surfaces needing special products",
  "fragile surfaces, hardwood notes, stone counters, pets, alarm details, and the rooms that matter most",
  "move-day timing, utilities, empty cabinets, appliance add-ons, garage access, and lock-up instructions",
  "priority photos, before-and-after notes, recurring-start goals, and follow-up contact preferences",
  "street parking limits, guest entrance instructions, narrow stairways, cleaning-supply preferences, and quiet hours",
  "HOA or building rules, elevator padding, package-room entry, shoe-cover requests, and pet separation notes",
  "garage keypad details, side-door preferences, delicate flooring, water access, and rooms needing extra ventilation",
  "morning or afternoon access, remote-work zones, nursery timing, laundry access, and rooms to leave undisturbed",
  "listing-photo timing, realtor access, utility status, appliance condition, and the final lock-up plan",
  "basement access, storage areas to avoid, special countertop products, pet gates, and the best contact number",
]

const deepCityOutcomePatterns = [
  "The goal is a home that feels reset without pretending every extra task belongs inside a base price.",
  "The visit should feel planned before arrival, with enough time reserved for buildup instead of a rushed checklist.",
  "The clean should make the next maintenance visit easier, especially if weekly or biweekly service may follow.",
  "The estimate should separate core detail work from add-ons, so the appointment is easier to trust.",
  "The walkthrough should make the visible difference clear in kitchens, bathrooms, edges, and high-touch areas.",
  "The plan should match the condition of the home today, not an ideal version of the house on a normal week.",
  "The cleaner should know which rooms carry the most pressure before supplies come through the door.",
  "The customer should understand what the team can finish well and what needs an add-on or different service.",
  "The appointment should leave fewer open questions about timing, access, missed details, and follow-up.",
  "The first visit should create a cleaner baseline that makes future upkeep feel more realistic.",
  "The room plan should put time where buildup is visible instead of spreading attention too thin.",
  "The finished home should feel calmer in the rooms people use every day, not only in the easiest spaces.",
  "The quote should protect both sides by naming heavy work before the schedule is confirmed.",
]

const deepCityNeighborhoodPatterns = [
  "Many requests start with a kitchen that still looks busy after normal wiping, so the quote needs to reserve detail time for handles, seams, appliance faces, and floor edges.",
  "Some homes need the cleaner to move carefully around work calls, sleeping children, pets, or rooms that should stay untouched while the rest of the house gets reset.",
  "A good deep-clean request should explain whether the home feels dusty, sticky, cluttered, freshly moved, guest-ready, or simply behind after several demanding weeks.",
  "The first visit often works best when bathrooms and kitchen surfaces are treated as the anchor, with bedrooms and shared rooms planned around remaining time.",
  "For homes with multiple floors, the estimate should name stairs, landings, railings, upstairs baths, basement spaces, and the rooms that collect traffic first.",
  "For apartments or townhomes, the plan should protect time for compact kitchens, bathroom corners, entry floors, cabinet faces, and the spaces where buildup concentrates quickly.",
  "When a customer is preparing for guests, the clean should prioritize visible comfort: powder rooms, counters, floors, doors, dining areas, and high-touch surfaces.",
  "When the home is preparing for recurring service, the first deep clean should create a cleaner baseline instead of expecting maintenance pricing to solve old buildup.",
  "If the request follows a renovation, repair, party, illness, or stressful season, the notes should name dust level, trash limits, delicate surfaces, and rooms to avoid.",
  "If pets are part of the home, the cleaner should know where fur gathers, which rooms need extra vacuuming, and how pets will be separated during arrival.",
  "If the home has delicate counters, old wood, glass shower doors, or specialty flooring, the quote should capture product preferences before the appointment.",
  "Move-related deep cleaning needs a different rhythm: empty cabinets, appliance interiors, closet shelves, baseboards, and a final path through the home.",
  "A lived-in deep clean should avoid vague promises and instead name the rooms where buildup, fingerprints, dust, and bathroom residue actually change the result.",
  "A larger home may need a staged priority list, because trying to deep clean every possible detail in one visit can make the work feel scattered.",
  "A smaller home can still need serious detail time when the bathroom, kitchen, doors, and floors have not had a full reset in months.",
  "A clear request should say what success looks like when the customer walks back in: cleaner bathrooms, calmer kitchen, brighter floors, or better first impression.",
  "A strong estimate should leave the customer knowing what is included, which extras were selected, and which tasks need a different appointment.",
]

const deepCityBookingPatterns = [
  "Before confirming, the booking path should collect ZIP, room count, bathroom count, condition, add-ons, parking, preferred timing, and access notes in one place.",
  "The cleaner should not discover oven interiors, cabinet interiors, heavy blinds, or basement work only after arriving at the door.",
  "The customer should be able to mark heavy buildup without feeling pressured into a vague package that hides the real time needed.",
  "The visit should make space for communication: what to start with, what matters less, and how follow-up works if an included item is missed.",
  "The quote should clarify whether supplies are standard, whether special products are requested, and whether any surfaces need a gentle approach.",
  "The appointment should account for parking, gate codes, pets, elevator access, utilities, trash location, and the easiest way to enter the home.",
  "The scope should separate deep-clean basics from optional extras so the customer does not feel surprised by fridge, oven, cabinet, window, or blind pricing.",
  "The request should identify which rooms are occupied, which rooms are empty, and which rooms should be skipped so the cleaner can work efficiently.",
  "The plan should protect time for kitchens and bathrooms first, because those rooms usually decide whether the deep clean feels worth it.",
  "The service should be easy to compare with recurring cleaning, because a deep clean is a catch-up reset rather than a normal maintenance visit.",
  "The estimate should make room for notes about allergies, pets, preferred supplies, fragile decor, and surfaces that should not be scrubbed aggressively.",
  "The customer should know before booking that hazardous waste, pest treatment, mold remediation, heavy hauling, and exterior windows are not part of the visit.",
  "The form should capture move timing, listing timing, guest timing, or recurring-start timing because each reason changes what the cleaner should prioritize.",
  "The visit should be scoped around outcome, not only square footage, because a smaller home with heavy buildup may need more time than a larger maintained home.",
  "The page should explain the difference between visible reset work and quoted add-ons, then let the customer ask for the rooms that matter most.",
  "The request should collect enough context to prevent a rushed appointment: condition, access, add-ons, surfaces, skipped rooms, and follow-up expectations.",
  "The best conversion path is simple: check the city, explain the home, name the buildup, select extras, and confirm timing with fewer surprises.",
  "The local plan should help the visitor feel that the cleaner understands nearby homes, access notes, and the rooms that usually need extra time.",
  "The final quote should be based on what the customer actually needs cleaned, with boundaries clear enough to trust before anyone enters the home.",
]

function getDeepCityProfile(city: (typeof cityPages)[number]) {
  const cityIndex = cityPages.findIndex((item) => item.slug === city.slug)
  const safeIndex = cityIndex >= 0 ? cityIndex : 0
  const localSignal = cityHeroImages[city.slug]?.label ?? `${city.name} homes`
  const routeNote = cityRouteNotes[city.group] ?? "We start with the ZIP, timing, home condition, and access notes before confirming the visit."
  const routePattern = deepCityRoutePatterns[safeIndex % deepCityRoutePatterns.length]
  const priorityPattern = deepCityPriorityPatterns[(safeIndex * 5 + 2) % deepCityPriorityPatterns.length]
  const accessPattern = deepCityAccessPatterns[(safeIndex * 7 + 3) % deepCityAccessPatterns.length]
  const outcomePattern = deepCityOutcomePatterns[(safeIndex * 11 + 4) % deepCityOutcomePatterns.length]
  const neighborhoodPattern = deepCityNeighborhoodPatterns[(safeIndex * 13 + 5) % deepCityNeighborhoodPatterns.length]
  const bookingPattern = deepCityBookingPatterns[(safeIndex * 17 + 8) % deepCityBookingPatterns.length]

  return {
    localSignal,
    routeNote,
    routePattern,
    priorityPattern,
    accessPattern,
    outcomePattern,
    heading: `A ${city.name} deep clean should be scoped before arrival.`,
    intro: `${localSignal} homes do not all need the same kind of heavy clean. In ${city.name}, we start by separating normal upkeep from the details that usually need extra time: ${routePattern}. ${routeNote} That makes the quote more useful than a generic booking button, because the cleaner sees the rooms, condition, access details, and add-ons before the visit is held.`,
    second: `For ${city.name} customers, the strongest deep-clean plan usually names the priority surfaces first: ${priorityPattern}. Then we confirm ${accessPattern}. ${outcomePattern}`,
    third: `${neighborhoodPattern} ${bookingPattern}`,
    cards: [
      ["Local home type", `Plan for ${routePattern}, then reserve enough time for the rooms that carry the most visible buildup.`],
      ["Priority surfaces", `Start with ${priorityPattern}, then add appliance interiors, blinds, windows, or basement work only when needed.`],
      ["Arrival details", `Confirm ${accessPattern}, so the appointment does not lose time at the door.`],
      ["Nearby options", `If timing is tight, nearby appointment options can include ${city.nearby.slice(0, 3).join(", ")}.`],
    ],
  }
}

export type ShynliDeepCityIntentPageData = {
  slug: string
  city: (typeof cityPages)[number]
  kind: "cost" | "checklist" | "property" | "situation"
  title: string
  meta: string
  eyebrow: string
  h1: string
  intro: string
  sections: { title: string; copy: string; bullets: string[] }[]
  intentDetails?: { eyebrow: string; title: string; copy: string; cards: [string, string][] }
  quoteDetails?: { title: string; copy: string; bullets: string[] }
  faqs: [string, string][]
  relatedLinks: [string, string][]
}

const deepPriorityCityNames = new Set(["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook", "Lisle", "Warrenville", "Downers Grove", "North Aurora", "Sugar Grove", "Yorkville", "Montgomery"])

function pageTitleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const deepPropertyIntentSeeds: DeepCityIntentSeed[] = [
  {
    slug: "apartment-deep-cleaning",
    label: "Apartment deep cleaning",
    property: "apartments",
    situation: "compact kitchens, bathroom buildup, entry floors, shared building access, and lease timing",
    fit: "renters, condo-style layouts, compact two-bedroom homes, and units where the kitchen and bathroom carry most of the visible buildup",
    pricing: "Apartment pricing should account for bathroom count, elevator or stair access, entry floors, pet hair, appliance add-ons, and whether the visit is tied to a lease or guest deadline.",
    prep: "The best preparation is clearing counters, naming building access details, separating pets, and deciding whether fridge, oven, cabinets, or interior windows should be quoted.",
    cards: [
      ["Compact kitchens", "Grease edges, sink detail, appliance fronts, and cabinet handles usually matter more than broad square footage."],
      ["Shared access", "Elevator, stair, parking, buzzer, or front desk notes should be shared before the cleaner is assigned."],
      ["Lease timing", "If the clean is tied to move timing, name the walkthrough date and the rooms most likely to be inspected."],
      ["Add-on filter", "Fridge, oven, cabinet interiors, and interior windows should be chosen before booking, not discovered during the visit."],
    ],
  },
  {
    slug: "house-deep-cleaning",
    label: "House deep cleaning",
    property: "houses",
    situation: "larger kitchens, multiple bathrooms, baseboards, stairs, guest rooms, and family traffic",
    fit: "single-family homes where lived-in traffic, multiple bathrooms, stairs, guest rooms, and larger kitchens make a quick maintenance clean feel too light",
    pricing: "House pricing should separate bedrooms, bathrooms, stairs, basement areas, pet zones, guest rooms, appliance add-ons, and the level of buildup in kitchens and baths.",
    prep: "The strongest house request names which level should be handled first, whether the basement is included, and which rooms can be skipped if time needs to be protected.",
    cards: [
      ["Multiple bathrooms", "Bathroom count can change timing more than bedroom count because buildup around tubs, showers, fixtures, and floors is slower work."],
      ["Stairs and levels", "Multi-level homes need a clearer floor-by-floor priority so the visit does not spread time too thin."],
      ["Family traffic", "Entry floors, kitchen edges, play areas, pet zones, and high-touch doors should be called out before booking."],
      ["Basement decision", "Basement cleaning should be included, skipped, or quoted separately before the appointment is held."],
    ],
  },
  {
    slug: "move-out-deep-cleaning",
    label: "Move-out deep cleaning",
    property: "move-out homes",
    situation: "empty rooms, appliance interiors, cabinets, closets, floors, and handoff notes",
    fit: "homes that are empty or nearly empty and need a cleaner handoff for listing photos, a landlord walkthrough, or a new occupant",
    pricing: "Move-out pricing should reflect whether the home is empty, whether appliance interiors and cabinets are included, how many closets need attention, and whether there are lock-up notes.",
    prep: "Move-out prep is different: remove personal items first, confirm utilities and access, decide on appliance and cabinet interiors, and share the inspection or handoff date.",
    cards: [
      ["Empty-room edges", "Shelves, closets, baseboards, and floor edges become more visible when furniture is gone."],
      ["Appliance interiors", "Fridge and oven interiors are often central to a move-out result and should be selected before booking."],
      ["Cabinet interiors", "Empty cabinets and drawers need a different time plan than simple cabinet fronts."],
      ["Handoff notes", "Lockbox, keys, final walkthrough time, and rooms already cleared should be confirmed up front."],
    ],
  },
  {
    slug: "condo-deep-cleaning",
    label: "Condo deep cleaning",
    property: "condos",
    situation: "elevator timing, building access, compact rooms, bathroom detail, and kitchen edges",
    fit: "condos where building access, parking, elevator timing, and compact kitchen or bathroom detail matter as much as the room count",
    pricing: "Condo pricing should include bathrooms, kitchen condition, elevator or parking notes, pet hair, floor type, and whether windows or appliance interiors are requested.",
    prep: "Condo prep should confirm front desk rules, elevator access, parking instructions, pet notes, and whether the cleaner needs permission for common-area entry.",
    cards: [
      ["Building entry", "Concierge, buzzer, elevator, parking, and loading rules can affect the arrival plan."],
      ["Compact detail", "Smaller rooms still need time for edges, fixtures, appliance fronts, and baseboards."],
      ["Quiet timing", "Some buildings have preferred service windows; share them before the visit is confirmed."],
      ["Add-on fit", "Interior windows, blinds, fridge, oven, and cabinets should be priced before appointment time is held."],
    ],
  },
  {
    slug: "townhouse-deep-cleaning",
    label: "Townhouse deep cleaning",
    property: "townhouses",
    situation: "multi-level layouts, stairs, entry floors, kitchens, bathrooms, and trim",
    fit: "townhomes where stairs, entry floors, multi-level bathrooms, kitchen detail, and trim work create more detail than a flat apartment",
    pricing: "Townhouse pricing should consider the number of levels, bathrooms, stair traffic, entry buildup, basement or garage-adjacent areas, and selected add-ons.",
    prep: "Townhouse prep should name the level that matters most, whether stairs need extra detail, and whether lower-level or basement areas are included.",
    cards: [
      ["Stair traffic", "Stairs and rail areas collect dust and traffic marks that should be called out before booking."],
      ["Entry floors", "Townhouse entries often carry salt, mud, pet hair, and family traffic into the first level."],
      ["Level-by-level plan", "A clear plan keeps the cleaner from splitting time evenly when one level needs more work."],
      ["Lower level choice", "Basement, garage-adjacent, or lower-level rooms should be included or skipped before pricing."],
    ],
  },
]

type DeepCityIntentSeed = {
  slug: string
  label: string
  titleLabel?: string
  property: string
  situation: string
  fit: string
  pricing: string
  prep: string
  cards: [string, string][]
}

const deepCitySituationIntentSeeds: DeepCityIntentSeed[] = [
  {
    slug: "one-time-deep-cleaning",
    label: "One-time deep cleaning",
    property: "one-time deep cleaning requests",
    situation: "a single catch-up visit, kitchens, bathrooms, baseboards, doors, floors, detailed dusting, and selected add-ons",
    fit: "customers who want one strong reset without committing to recurring service yet",
    pricing: "One-time pricing should be based on the current condition of the home, the rooms that fell behind, bathroom count, kitchen buildup, selected add-ons, and whether the visit needs a hard stop.",
    prep: "A one-time request works best when the customer names the rooms that matter most, the buildup level, pets or access notes, and any appliance interiors before the schedule is confirmed.",
    cards: [
      ["Single-visit goal", "The plan should protect the rooms that will make the home feel reset after one appointment."],
      ["Priority order", "Kitchen, bathrooms, entry floors, and visible high-touch areas should be ranked before arrival."],
      ["Scope control", "A one-time clean should not quietly become a move-out clean, renovation clean, or recurring maintenance visit."],
      ["Add-on decision", "Fridge, oven, cabinets, windows, and blinds should be chosen before booking so the visit is not underpriced."],
    ],
  },
  {
    slug: "same-week-deep-cleaning",
    label: "Same-week deep cleaning",
    property: "same-week deep cleaning requests",
    situation: "faster timing, priority rooms, realistic scope, access notes, add-ons, and the rooms that must be handled first",
    fit: "customers with guests, events, photos, moving deadlines, or a home that needs help this week rather than someday",
    pricing: "Same-week pricing should stay realistic about the schedule: priority rooms, condition level, access, selected add-ons, and timing pressure all matter before a slot is offered.",
    prep: "Same-week prep should be direct: confirm the deadline, pick must-finish rooms, share access notes, and avoid adding every possible extra if the timing is tight.",
    cards: [
      ["Deadline first", "The quote should know whether the clean is for guests, photos, moving, or a general catch-up week."],
      ["Must-finish rooms", "Bathrooms, kitchen, entry areas, and guest-facing spaces should be protected before lower-priority rooms."],
      ["Realistic add-ons", "Time-heavy extras are possible only when they fit the available appointment window."],
      ["Fast access", "Door code, parking, pets, and contact details matter more when the appointment is close."],
    ],
  },
  {
    slug: "deep-cleaning-before-recurring-cleaning",
    label: "Deep cleaning before recurring cleaning",
    titleLabel: "Pre-recurring deep cleaning",
    property: "first recurring-cleaning visits",
    situation: "resetting the home before weekly, biweekly, or monthly service starts so future visits maintain a cleaner baseline",
    fit: "homes that are about to start weekly, biweekly, or monthly cleaning and need a stronger first visit to set the baseline",
    pricing: "Pre-recurring pricing should separate the first reset from future maintenance. Bathrooms, kitchen buildup, baseboards, doors, trim, pet hair, and add-ons decide how much catch-up time is needed.",
    prep: "Before recurring service starts, the customer should name long-neglected areas, rooms to skip, product preferences, pets, and what should become part of future maintenance.",
    cards: [
      ["Baseline reset", "The first visit should handle catch-up detail so future visits can maintain instead of chase buildup."],
      ["Recurring fit", "Weekly, biweekly, and monthly plans need different expectations after the initial deep clean."],
      ["Carry-forward notes", "Pets, special surfaces, rooms to skip, and priority rooms should be saved for future visits."],
      ["Add-ons once", "Some extras, like oven or cabinet interiors, may belong in the first reset but not every recurring clean."],
    ],
  },
]

function getDeepCityRelatedLinks(city: (typeof cityPages)[number], currentSlug: string): [string, string][] {
  const cityLinks: [string, string][] = [
    [`${city.name} deep cleaning`, city.slug],
    [`${city.name} deep cleaning cost`, `${city.slug}/deep-cleaning-cost`],
    [`${city.name} deep cleaning checklist`, `${city.slug}/deep-cleaning-checklist`],
  ]
  const situationLinks: [string, string][] = deepCitySituationIntentSeeds.map((seed) => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`])
  const propertyLinks: [string, string][] = deepPriorityCityNames.has(city.name)
    ? deepPropertyIntentSeeds.map((seed) => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`])
    : []
  const nearbyLinks: [string, string][] = city.nearby.slice(0, 3).map((name) => {
    const slug = slugifyCity(name)
    return [`${name} deep cleaning`, slug]
  })

  return [...cityLinks, ...situationLinks, ...propertyLinks, ...nearbyLinks].filter(([, slug]) => slug !== currentSlug).slice(0, 12)
}

function makeDeepCityCostPage(city: (typeof cityPages)[number]): ShynliDeepCityIntentPageData {
  const profile = getDeepCityProfile(city)
  const slug = `${city.slug}/deep-cleaning-cost`

  return {
    slug,
    city,
    kind: "cost",
    title: `Deep Cleaning Cost in ${city.name}, IL | Shynli Deep Cleaning`,
    meta: `Deep cleaning cost in ${city.name}, IL depends on home size, bathrooms, condition, add-ons, access, and timing. Check quote factors before booking.`,
    eyebrow: `${city.name} cost guide`,
    h1: `Deep cleaning cost in ${city.name}, IL.`,
    intro: `Deep cleaning cost in ${city.name} should be based on the actual home, not a vague package. A better estimate starts with room count, bathrooms, buildup level, priority rooms, selected add-ons, and access notes. For local homes around ${profile.localSignal}, the quote should also account for ${profile.routePattern}.`,
    sections: [
      {
        title: "What changes the price",
        copy: `The biggest ${city.name} price factors are home size, bathroom count, kitchen condition, pet hair, clutter, and whether the visit needs light detail or a heavier reset.`,
        bullets: ["Bedrooms and bathrooms", "Kitchen and bathroom buildup", "Baseboards, doors, and trim", "Pets, clutter, stairs, or basement areas"],
      },
      {
        title: "Add-ons to name early",
        copy: "Appliance interiors, cabinet interiors, interior windows, blinds, and basement cleaning can change timing, so they should be selected before the appointment is held.",
        bullets: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Blinds or basement work"],
      },
      {
        title: "Local quote notes",
        copy: `In ${city.name}, access and timing can matter as much as square footage. Confirm ${profile.accessPattern} before the cleaner is assigned.`,
        bullets: ["ZIP and preferred timing", "Parking or entry notes", "Pets and rooms to skip", "Priority rooms", "Follow-up contact"],
      },
    ],
    faqs: [
      [`How much does deep cleaning cost in ${city.name}?`, "The final quote depends on home size, condition, bathrooms, add-ons, access, and appointment timing."],
      ["Why can two homes with the same size cost differently?", "Buildup, pets, clutter, bathrooms, stairs, and selected add-ons can change the time needed."],
      ["Are oven and fridge included in the base price?", "They are usually quoted as add-ons unless your estimate specifically includes them."],
      ["Can I check the price before committing?", "Yes. Start with ZIP, rooms, condition, and add-ons before confirming a visit."],
    ],
    relatedLinks: getDeepCityRelatedLinks(city, slug),
  }
}

function makeDeepCityChecklistPage(city: (typeof cityPages)[number]): ShynliDeepCityIntentPageData {
  const profile = getDeepCityProfile(city)
  const slug = `${city.slug}/deep-cleaning-checklist`

  return {
    slug,
    city,
    kind: "checklist",
    title: `Deep Cleaning Checklist in ${city.name}, IL | Shynli Deep Cleaning`,
    meta: `Use this ${city.name} deep cleaning checklist for kitchens, bathrooms, baseboards, high-touch areas, add-ons, access notes, and quote planning.`,
    eyebrow: `${city.name} checklist`,
    h1: `${city.name} deep cleaning checklist.`,
    intro: `A ${city.name} deep cleaning checklist should separate the core reset from quoted extras. The base plan covers kitchens, bathrooms, floors, baseboards, doors, trim, high-touch areas, and detailed dusting, while add-ons like fridge, oven, cabinet interiors, windows, and blinds should be named before booking.`,
    sections: [
      {
        title: "Kitchen and bathroom anchors",
        copy: `Most ${city.name} deep cleans feel successful only if the kitchen and bathrooms are planned first.`,
        bullets: ["Sink edges and counters", "Stovetop and appliance fronts", "Shower and tub buildup", "Toilet bases and fixtures", "Vanity fronts and mirrors"],
      },
      {
        title: "Whole-home detail",
        copy: `The checklist should include the details that make the home feel reset around ${profile.localSignal}.`,
        bullets: ["Baseboards and trim", "Doors and switches", "Reachable vents and sills", "Detailed dusting", "Floors vacuumed and mopped"],
      },
      {
        title: "Before the cleaner arrives",
        copy: `The best checklist includes context: ${profile.accessPattern}. That keeps the visit from losing time at the door.`,
        bullets: ["Parking and access", "Pets or rooms to skip", "Priority rooms", "Selected add-ons", "Special surfaces"],
      },
    ],
    faqs: [
      [`What should be on a ${city.name} deep cleaning checklist?`, "Kitchens, bathrooms, baseboards, doors, trim, detailed dusting, floors, high-touch surfaces, and selected add-ons."],
      ["Are appliance interiors on the checklist?", "They should be listed as quoted add-ons unless the estimate includes them."],
      ["Can I choose priority rooms?", "Yes. Naming priority rooms helps the cleaner protect time for the areas that matter most."],
      ["Is the checklist the same as regular cleaning?", "No. Deep cleaning includes more catch-up detail and buildup work."],
    ],
    relatedLinks: getDeepCityRelatedLinks(city, slug),
  }
}

function makeDeepPropertyPage(city: (typeof cityPages)[number], seed: DeepCityIntentSeed, kind: "property" | "situation" = "property"): ShynliDeepCityIntentPageData {
  const profile = getDeepCityProfile(city)
  const slug = `${city.slug}/${seed.slug}`

  return {
    slug,
    city,
    kind,
    title: `${seed.titleLabel ?? seed.label} in ${city.name}, IL | Shynli Deep Cleaning`,
    meta: `${seed.label} in ${city.name}, IL. Start with condition, priority rooms, add-ons, access notes, timing, and a clear deep cleaning quote.`,
    eyebrow: `${city.name} ${seed.property}`,
    h1: `${seed.label} in ${city.name}, IL.`,
    intro: `${seed.label} in ${city.name} should be scoped around the actual request, not just the word deep. This page is for ${seed.fit}. The quote should reflect ${seed.situation}, plus local access notes, selected add-ons, and the rooms that carry the most visible buildup.`,
    sections: [
      {
        title: `${seed.label}: when it fits`,
        copy: `${seed.label} in ${city.name} is the better fit for ${seed.fit}. The cleaner should know the layout, condition, entry details, and deadline before arrival.`,
        bullets: seed.cards.slice(0, 2).map(([heading, copy]) => `${heading}: ${copy}`),
      },
      {
        title: "Pricing logic",
        copy: seed.pricing,
        bullets: ["Home size and bathrooms", "Current condition", "Priority rooms", "Selected add-ons", "Access and timing pressure"],
      },
      {
        title: `Before booking in ${city.name}`,
        copy: `${seed.prep} For ${city.name}, also include ${profile.accessPattern}.`,
        bullets: seed.cards.slice(2, 4).map(([heading, copy]) => `${heading}: ${copy}`),
      },
    ],
    intentDetails: {
      eyebrow: `${seed.label} details`,
      title: `What makes this ${pageTitleCase(seed.slug)} page different.`,
      copy: `A ${city.name} ${seed.label.toLowerCase()} request should not read like every other deep-cleaning page. The customer is choosing this page because the situation changes the scope, the timing, the add-ons, or the way the cleaner should prioritize rooms.`,
      cards: seed.cards,
    },
    quoteDetails: {
      title: `How to quote ${seed.label.toLowerCase()} in ${city.name}`,
      copy: `${seed.pricing} ${seed.prep} A useful estimate should leave the customer knowing what is included, what is quoted separately, and what information the cleaner needs before arrival.`,
      bullets: [
        `Local context: ${profile.localSignal}`,
        `Access detail: ${profile.accessPattern}`,
        `Nearby options: ${city.nearby.slice(0, 3).join(", ")}`,
        "Clear add-ons before booking",
      ],
    },
    faqs: [
      [`Is ${seed.label.toLowerCase()} different from a normal deep clean?`, `Yes. The core deep-cleaning checklist still matters, but this request changes the planning because it is built around ${seed.situation}.`],
      [`What affects the price for ${seed.label.toLowerCase()}?`, seed.pricing],
      [`How should I prepare for ${seed.label.toLowerCase()}?`, seed.prep],
      [`Do you serve nearby cities around ${city.name}?`, `Yes. Nearby requests can include ${city.nearby.slice(0, 3).join(", ")} and surrounding service areas.`],
    ],
    relatedLinks: getDeepCityRelatedLinks(city, slug),
  }
}

export const shinyDeepCityIntentPages: ShynliDeepCityIntentPageData[] = [
  ...cityPages.flatMap((city) => [makeDeepCityCostPage(city), makeDeepCityChecklistPage(city)]),
  ...cityPages.flatMap((city) => deepCitySituationIntentSeeds.map((seed) => makeDeepPropertyPage(city, seed, "situation"))),
  ...cityPages
    .filter((city) => deepPriorityCityNames.has(city.name))
    .flatMap((city) => deepPropertyIntentSeeds.map((seed) => makeDeepPropertyPage(city, seed))),
]

function isShynliDeepStandaloneHost() {
  if (typeof window === "undefined") {
    return false
  }

  return window.location.hostname === "shinydeepcleaning.com" || window.location.hostname === "www.shinydeepcleaning.com"
}

function getShynliDeepPath(slug?: string) {
  if (isShynliDeepStandaloneHost()) {
    return slug ? `/${slug}` : "/"
  }

  return slug ? `/shiny-deep-cleaning/${slug}` : "/shiny-deep-cleaning"
}

function ShynliDeepFooter({ city }: { city?: (typeof cityPages)[number] }) {
  const guideLinks: [string, string][] = [
    ["Cost guide", "deep-cleaning-cost"],
    ["Checklist", "deep-cleaning-checklist"],
    ["Add-ons", "deep-cleaning-add-ons"],
    ["FAQ", "deep-cleaning-faq"],
  ]
  const cityLinks: [string, string][] = city
    ? [
        [city.name, city.slug],
        ["Local cost", `${city.slug}/deep-cleaning-cost`],
        ["Local checklist", `${city.slug}/deep-cleaning-checklist`],
        ["One-time deep clean", `${city.slug}/one-time-deep-cleaning`],
      ]
    : [
        ["Naperville", "naperville"],
        ["Aurora", "aurora"],
        ["Plainfield", "plainfield"],
        ["Oswego", "oswego"],
      ]
  const supportLinks: [string, string][] = [
    ["Terms", "https://shynli.com/terms"],
    ["Privacy", "https://shynli.com/privacy"],
    ["Cancellation", "https://shynli.com/cancellation"],
    ["Call Shynli", businessPhoneHref],
  ]

  return (
    <footer className="bg-[#100d16] px-4 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_1.95fr]">
        <div>
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <Sparkles className="size-5" />
            </span>
            <span className="text-xl font-black">Shynli Deep Cleaning</span>
          </a>
          <p className="mt-5 max-w-sm text-sm font-bold leading-6 text-white/58">
            Deep cleaning for kitchens, bathrooms, buildup, baseboards, add-ons, and homes that need more than a maintenance visit.
          </p>
          <div className="mt-4 grid gap-1 text-sm font-bold text-white/50">
            <a className="transition-colors hover:text-white" href={businessPhoneHref}>{businessPhoneDisplay}</a>
            <a className="transition-colors hover:text-white" href={`mailto:${businessEmail}`}>{businessEmail}</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
              <a href={buildQuoteUrl({ service: "deep-cleaning" })}>Get quote</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full border-white/22 bg-white/8 px-5 font-black text-white hover:bg-white/14 hover:text-white">
              <a href={getShynliDeepPath() + "#areas"}>Service areas</a>
            </Button>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-4">
          {[
            ["Deep cleaning", guideLinks],
            ["Local pages", cityLinks],
            ["Planning", [["What is included", "what-is-included-in-deep-cleaning"], ["Not included", "what-is-not-included-in-deep-cleaning"], ["How long it takes", "how-long-does-deep-cleaning-take"], ["Prepare", "prepare-for-deep-cleaning"]] as [string, string][]],
            ["Support", supportLinks],
          ].map(([title, links]) => (
            <div key={title as string}>
              <h3 className="text-sm font-black uppercase text-[#d7ff4f]">{title as string}</h3>
              <div className="mt-4 grid gap-2">
                {(links as [string, string][]).map(([label, slug]) => (
                  <a key={label} href={slug.startsWith("http") || slug.startsWith("tel:") ? slug : getShynliDeepPath(slug)} className="flex min-h-10 items-center text-sm font-black text-white/62 transition-colors hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm font-bold text-white/42 md:flex-row md:items-center md:justify-between">
        <p>ShynliDeepCleaning.com</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span>Quote first. Checklist visible. Add-ons named before the visit.</span>
          <a className="transition-colors hover:text-white" href="https://shynli.com/terms">Terms</a>
          <a className="transition-colors hover:text-white" href="https://shynli.com/privacy">Privacy</a>
          <a className="transition-colors hover:text-white" href="https://shynli.com/cancellation">Cancellation</a>
        </div>
      </div>
    </footer>
  )
}

export function ShynliDeepCleaningPage({ city }: { city?: (typeof cityPages)[number] } = {}) {
  const [selectedCondition, setSelectedCondition] = useState(deepQuoteConditions[0])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const cityName = city?.name
  const pageTitle = cityName ? `${cityName} Deep Cleaning | Shynli Deep Cleaning` : "Shynli Deep Cleaning | Deep Cleaning Service"
  const pageDescription = cityName
    ? `Deep cleaning in ${cityName}, IL for kitchens, bathrooms, buildup, edges, add-ons, and rooms that need more than maintenance.`
    : "Deep cleaning for kitchens, bathrooms, buildup, edges, and the details a standard visit does not fully handle."
  const nearbyCityNames = city?.nearby ?? ["Naperville", "Aurora", "Plainfield", "Oswego", "Wheaton"]
  const canonicalPath = city ? `/${city.slug}` : "/"
  const deepHomeHref = getShynliDeepPath()
  const cityProfile = city ? getDeepCityProfile(city) : undefined
  const cityIntentLinks: [string, string][] = city
    ? [
        [`${city.name} deep cleaning cost`, `${city.slug}/deep-cleaning-cost`],
        [`${city.name} deep cleaning checklist`, `${city.slug}/deep-cleaning-checklist`],
        ...deepCitySituationIntentSeeds.map((seed): [string, string] => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`]),
        ...(deepPriorityCityNames.has(city.name) ? deepPropertyIntentSeeds.map((seed): [string, string] => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`]) : []),
      ]
    : []

  useSeoMeta(
    pageTitle,
    pageDescription,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: cityName ? `${cityName} Deep Cleaning` : "Shynli Deep Cleaning",
      serviceType: "Deep cleaning",
      areaServed: cityName ? { "@type": "City", name: cityName } : cityList.map((name) => ({ "@type": "City", name })),
      provider: { "@type": "LocalBusiness", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={deepHomeHref} className="flex min-h-11 items-center gap-3" aria-label="Shynli Deep Cleaning home">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <Sparkles className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label="Deep cleaning navigation">
            {[
              ["Scope", "#scope"],
              ["Checklist", "#checklist"],
              ["References", "#references"],
              ["Areas", "#areas"],
              ["Reviews", "#reviews"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href="#quote">Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative min-h-[92svh] overflow-hidden bg-[#1b1725] text-white">
        <div
          className="absolute inset-0 scale-[1.03] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[64%_50%] opacity-72 blur-[1px] md:bg-[58%_50%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(215,255,79,0.14),rgba(27,23,37,0)_31%),linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.86)_38%,rgba(27,23,37,0.34)_74%,rgba(27,23,37,0.58)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#f7f2e8_0%,rgba(247,242,232,0)_100%)]" />
        <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-10 px-4 pb-20 pt-28 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div className="animate-rise">
            <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
              {cityName ? `${cityName} deep cleaning` : "Deep cleaning service"}
            </Badge>
            <h1 className={`${cityName ? "text-[clamp(3.2rem,7.8vw,7.8rem)] leading-[0.86]" : "text-[clamp(4.4rem,11vw,10.5rem)] leading-[0.78]"} font-black tracking-normal`}>
              {cityName ? cityName : "Shynli"}
              {" "}
              <span className="block text-[#d7ff4f]">{cityName ? "Deep Cleaning." : "Deep."}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[clamp(1.45rem,2.5vw,3rem)] font-black leading-[0.98]">
              {cityName ? `Deep cleaning in ${cityName} for homes that need a real reset.` : "A reset for homes that have moved past maintenance."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-13 rounded-full bg-[#d7ff4f] px-7 text-base font-black text-[#1b1725] hover:bg-[#c6f040]">
                <a href="#quote">
                  Check price
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/8 px-7 text-base font-black text-white hover:bg-white/14 hover:text-white">
                <a href="#scope">See scope</a>
              </Button>
            </div>
          </div>

          <div className="self-end pb-4 md:pb-10">
            <div className="grid gap-px overflow-hidden rounded-lg bg-white/18 md:grid-cols-2">
              {deepSiteProof.map(([title, copy]) => (
                <div key={title} className="min-h-36 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-black uppercase text-[#d7ff4f]">{title}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-white/76">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Quote first</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              {cityName ? `Get the ${cityName} deep-clean scope clear first.` : "Get the scope clear before the visit."}
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              {cityName
                ? `A ${cityName} deep clean should start with the home size, condition, access notes, and add-ons before the appointment is held.`
                : "A deep clean should not start with guessing. Share the home size, buildup level, and add-ons first, then confirm the visit with fewer surprises."}
            </p>
          </div>
          <Card className="rounded-lg border-[#e1d5c4] bg-white shadow-[0_28px_90px_rgba(27,23,37,0.12)]">
            <CardContent className="p-5 md:p-6">
              <form action={buildQuoteUrl({ service: "deep-cleaning" })} method="get" className="grid gap-4" onSubmit={(event) => submitQuoteForm(event, { service: "deep-cleaning" })}>
                <input type="hidden" name="condition" value={selectedCondition} />
                {cityName ? <input type="hidden" name="city" value={cityName} /> : null}
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="grid gap-2 text-sm font-black">
                    ZIP
                    <Input
                      name="zip"
                      inputMode="numeric"
                      defaultValue="00000"
                      maxLength={5}
                      onFocus={(event) => {
                        if (event.currentTarget.value === "00000") event.currentTarget.value = ""
                      }}
                      onBlur={(event) => {
                        if (!event.currentTarget.value.trim()) event.currentTarget.value = "00000"
                      }}
                      className="h-12 rounded-md border-[#d8cbb7] bg-[#ffffff] font-bold"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Bedrooms
                    <Input name="bedrooms" inputMode="numeric" defaultValue="3" className="h-12 rounded-md border-[#d8cbb7] bg-[#ffffff] font-bold" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Bathrooms
                    <Input name="bathrooms" inputMode="numeric" defaultValue="2" className="h-12 rounded-md border-[#d8cbb7] bg-[#ffffff] font-bold" />
                  </label>
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  {deepQuoteConditions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={selectedCondition === item}
                      onClick={() => setSelectedCondition(item)}
                      className={`min-h-12 rounded-md border px-3 text-sm font-black transition-all hover:-translate-y-0.5 hover:border-[#b54437] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d7ff4f]/70 ${
                        selectedCondition === item
                          ? "border-[#1b1725] bg-[#1b1725] text-white shadow-[0_12px_30px_rgba(27,23,37,0.18)]"
                          : "border-[#d8cbb7] bg-white text-[#1b1725]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {deepQuoteAddOns.map((item) => {
                    const isSelected = selectedAddOns.includes(item)
                    return (
                    <label
                      key={item}
                      className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm font-black transition-all hover:-translate-y-0.5 hover:border-[#b54437] ${
                        isSelected ? "border-[#1b1725] bg-[#1b1725] text-white shadow-[0_12px_30px_rgba(27,23,37,0.16)]" : "border-[#d8cbb7] bg-white text-[#1b1725]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="add_ons"
                        value={item}
                        checked={isSelected}
                        onChange={() => {
                          setSelectedAddOns((current) => (
                            current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
                          ))
                        }}
                        className="size-4 accent-[#d7ff4f]"
                      />
                      {item}
                    </label>
                    )
                  })}
                </div>
                <p className="rounded-md bg-[#f7f2e8] px-3 py-2 text-xs font-black uppercase tracking-normal text-[#6c655d]" aria-live="polite">
                  Selected: {selectedCondition}{selectedAddOns.length ? ` + ${selectedAddOns.join(", ")}` : " + no extras yet"}
                </p>
                <Button type="submit" className="h-13 rounded-full bg-[#b54437] text-base font-black text-white hover:bg-[#9f3c31]">
                  Price this deep clean
                  <ArrowRight />
                </Button>
                <p className="text-sm font-bold leading-6 text-[#6c655d]">
                  No card to check. Final quote depends on size, condition, add-ons, access, and appointment availability.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">When deep cleaning is the right fit</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Use it when the home needs recovery, not just upkeep.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              Deep cleaning is best when a regular visit would leave too many details untouched: bathroom buildup, kitchen residue, dusty edges, doors, trim, high-touch areas, and rooms that have slowly fallen behind. It is also a strong choice before guests, after a stressful season, before recurring service begins, or when you want the first visit to reset the baseline.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Before guests", "Bathrooms, kitchen surfaces, entry areas, and shared spaces get the detail people notice first."],
              ["Before recurring service", "A heavier first visit can make future weekly or biweekly upkeep easier and more fairly priced."],
              ["After a busy season", "When chores have been delayed, deep cleaning gives the cleaner enough time for buildup and edges."],
              ["Before a reset weekend", "Use the quote notes to name the rooms that matter most instead of hoping the cleaner guesses correctly."],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#e1d5c4] bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#665f57]">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {cityName ? (
        <section className="bg-[#f7f2e8] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">{cityName} plan</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Deep cleaning shaped around local homes.
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
                We use the same deep-clean checklist, then tune the visit around your room count, buildup level, add-ons, parking, pets, and access notes in {cityName}.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Priority rooms", `Kitchens, bathrooms, entries, and shared rooms in ${cityName} get named before the visit starts.`],
                ["Buildup level", "Light, behind, or heavy condition changes the timing, so the quote starts with condition instead of a surprise."],
                ["Add-ons", "Fridge, oven, cabinet interiors, windows, blinds, and basement work are separated clearly before booking."],
                ["Nearby route", `Also nearby: ${nearbyCityNames.slice(0, 3).join(", ")}.`],
              ].map(([heading, copy]) => (
                <Card key={heading} className="rounded-lg border-[#e1d5c4] bg-white shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-[#665f57]">{copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city && cityProfile ? (
        <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">{cityProfile.localSignal}</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                {cityProfile.heading}
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">{cityProfile.intro}</p>
              <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{cityProfile.second}</p>
              <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{cityProfile.third}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
              {cityProfile.cards.map(([heading, copy]) => (
                <div key={heading} className="bg-white p-6">
                  <p className="text-sm font-black uppercase text-[#b54437]">{heading}</p>
                  <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city && cityIntentLinks.length ? (
        <section className="bg-[#efe4d5] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">{city.name} deep-cleaning pages</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Price, checklist, and home-type pages for {city.name}.
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
                These local pages split the intent instead of forcing every question onto one page: cost, checklist, apartment or house layouts, move timing, condos, and townhouses where relevant.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-2">
              {cityIntentLinks.map(([label, slug]) => (
                <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-16 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                  {label}
                  <ArrowRight className="size-4 shrink-0 text-[#b54437] transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="scope" className="bg-[#1b1725] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Scope clarity</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              What deep cleaning covers.
            </h2>
          </div>
          <Tabs defaultValue="included">
            <TabsList className="grid h-14 w-full grid-cols-3 items-center rounded-lg bg-white/10 p-1">
              {deepSiteScope.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-12 min-h-0 items-center rounded-md px-2 py-0 text-center text-xs font-black leading-none text-white/58 after:hidden data-[state=active]:bg-[#d7ff4f] data-[state=active]:text-[#1b1725] data-[state=active]:shadow-none focus-visible:ring-[#12a8ff] sm:text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {deepSiteScope.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-5">
                <div className="grid gap-6 rounded-lg border border-white/12 bg-white/6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-7">
                  <div>
                    <h3 className="text-3xl font-black leading-tight">{tab.title}</h3>
                    <p className="mt-3 text-base font-bold leading-7 text-white/66">{tab.copy}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {tab.items.map((item) => (
                      <div key={item} className="flex min-h-14 items-start gap-3 border-t border-white/14 py-3 text-sm font-black">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#d7ff4f]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="checklist" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Checklist proof</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.94] md:text-6xl">
                Make the price feel easy to understand.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] md:justify-self-end">
              The details are grouped by the rooms people care about most, so the difference between standard and deep cleaning is obvious.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-4">
            {deepSiteZones.map(([title, copy]) => (
              <div key={title} className="min-h-72 bg-white p-6">
                <span className="grid size-11 place-items-center rounded-full bg-[#1b1725] text-[#d7ff4f]">
                  <Sparkles className="size-5" />
                </span>
                <h3 className="mt-8 text-2xl font-black leading-tight">{title}</h3>
                <p className="mt-4 text-sm font-bold leading-6 text-[#665f57]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="references" className="bg-[#efe4d5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Why it feels clear</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Less mystery before anyone enters the home.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-2">
            {deepSiteCompetitorMoves.map(([name, move]) => (
              <div key={name} className="bg-[#fdfaf4] p-6">
                <p className="text-sm font-black uppercase text-[#b54437]">{name}</p>
                <p className="mt-5 text-xl font-black leading-tight">{move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-[#fffaf0] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Service areas</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Deep cleaning across the western suburbs.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              Pick your city to see a deep-cleaning page built around local homes, room count, buildup level, add-ons, and route availability.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-4">
            {serviceAreaGroups.map((group) => (
              <div key={group.label} className="bg-white p-5">
                <h3 className="text-sm font-black uppercase text-[#b54437]">{group.label}</h3>
                <div className="mt-4 grid gap-1.5">
                  {group.cities.map((name) => (
                    <a
                      key={name}
                      href={getShynliDeepPath(slugifyCity(name))}
                      className="flex min-h-9 items-center justify-between gap-3 rounded-md px-2 text-sm font-black text-[#1b1725] transition-colors hover:bg-[#f7f2e8]"
                    >
                      {name}
                      <ArrowRight className="size-4 shrink-0 text-[#b54437]" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="bg-[#efe4d5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Deep cleaning guides</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Answer the questions people ask before they book.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              Cost, timing, checklist, add-ons, preparation, and service comparisons are separated into focused pages so the quote feels clear before the visit.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-3">
            {deepSeoPageLinks.map(([label, slug]) => (
              <a
                key={slug}
                href={getShynliDeepPath(slug)}
                className="group flex min-h-20 items-center justify-between gap-4 bg-[#fdfaf4] p-5 text-base font-black transition-colors hover:bg-white"
              >
                {label}
                <ArrowRight className="size-5 shrink-0 text-[#b54437] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">More deep-cleaning help</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Room, add-on, and situation pages.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              These focused pages answer the smaller searches people make before they are ready to ask for a quote: kitchen detail, bathroom buildup, appliance interiors, pets, holidays, move timing, renters, and property handoff.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-4">
            {deepExtraGuideSeeds.map((guide) => (
              <a
                key={guide.slug}
                href={getShynliDeepPath(guide.slug)}
                className="group flex min-h-20 items-center justify-between gap-4 bg-white p-4 text-sm font-black transition-colors hover:bg-[#f7f2e8]"
              >
                {guide.label}
                <ArrowRight className="size-4 shrink-0 text-[#b54437] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#f7f2e8] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Customer reviews</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Deep cleans that feel worth it afterward.
              </h2>
            </div>
            <div className="rounded-lg border border-[#e1d5c4] bg-white p-5 shadow-[0_20px_70px_rgba(27,23,37,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid size-14 place-items-center rounded-full bg-white shadow-[0_6px_22px_rgba(27,23,37,0.12)]">
                    <span className="text-3xl font-black tracking-normal">
                      <span className="text-[#4285f4]">G</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-black leading-none">5.0</p>
                    <div className="mt-2 flex gap-0.5 text-[#fbbc04]" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="max-w-md text-sm font-bold leading-6 text-[#5e574f]">
                  Homeowners mention clear pricing, careful detail work, and rooms that finally feel reset.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {deepSiteReviews.map((review) => (
              <article key={review.name} className="rounded-lg border border-[#e1d5c4] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e8f0fe] text-lg font-black text-[#1a73e8]">
                      {review.initial}
                    </span>
                    <div>
                      <h3 className="text-base font-black leading-tight">{review.name}</h3>
                      <p className="mt-1 text-xs font-bold text-[#6c655d]">{review.place} customer</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#f1f3f4] px-2.5 py-1 text-xs font-black text-[#5f6368]">Local</span>
                </div>
                <div className="mt-4 flex gap-0.5 text-[#fbbc04]" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-base font-bold leading-7 text-[#2d2933]">"{review.copy}"</p>
                <p className="mt-5 border-t border-[#ece3d7] pt-4 text-sm font-black text-[#6c655d]">{review.service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#1b1725] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Questions before booking</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Clear answers before you pick a time.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
            {deepSiteFaqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#d7ff4f] px-4 py-14 text-[#1b1725] md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase">Ready for a reset?</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-[0.94] md:text-6xl">
              Start with the rooms that need the most work.
            </h2>
          </div>
          <Button asChild className="h-13 rounded-full bg-[#1b1725] px-7 text-base font-black text-white hover:bg-[#2b2438]">
            <a href="#quote">
              Check price
              <ArrowRight />
            </a>
          </Button>
        </div>
      </section>

      <ShynliDeepFooter city={city} />
    </main>
  )
}

export function ShynliDeepSeoPage({ page }: { page: ShynliDeepSeoPageData }) {
  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.meta,
      url: `${shinyDeepCanonicalBase}/${page.slug}`,
      isPartOf: { "@type": "WebSite", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      about: { "@type": "Service", name: "Deep cleaning", provider: { "@type": "LocalBusiness", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase } },
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath: `/${page.slug}`,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3" aria-label="Shynli Deep Cleaning home">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <Sparkles className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label="Deep cleaning guide navigation">
            {[["Cost", "deep-cleaning-cost"], ["Checklist", "deep-cleaning-checklist"], ["Add-ons", "deep-cleaning-add-ons"], ["FAQ", "deep-cleaning-faq"]].map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href={getShynliDeepPath() + "#quote"}>Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#1b1725] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
        <div
          className="absolute inset-0 scale-[1.02] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[62%_48%] opacity-50 blur-[1px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.88)_48%,rgba(27,23,37,0.54)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
            {page.eyebrow}
          </Badge>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.5rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
          <p className="mt-7 max-w-3xl text-xl font-bold leading-8 text-white/76">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-13 rounded-full bg-[#d7ff4f] px-7 text-base font-black text-[#1b1725] hover:bg-[#c6f040]">
              <a href={getShynliDeepPath() + "#quote"}>
                Check price
                <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/8 px-7 text-base font-black text-white hover:bg-white/14 hover:text-white">
              <a href="#sections">Read guide</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="sections" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article key={section.title} className="rounded-lg border border-[#e1d5c4] bg-white p-6 shadow-sm">
              <span className="text-sm font-black text-[#b54437]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-3xl font-black leading-tight">{section.title}</h2>
              <p className="mt-4 text-sm font-bold leading-6 text-[#665f57]">{section.copy}</p>
              <div className="mt-6 grid gap-2">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2 text-sm font-black">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#b54437]" />
                    {bullet}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Related deep-cleaning pages</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Keep comparing before you book.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              These pages connect the most common deep-cleaning questions: price, checklist, add-ons, timing, preparation, and whether deep cleaning is the right service.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {deepSeoPageLinks.filter(([, slug]) => slug !== page.slug).slice(0, 8).map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-16 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                {label}
                <ArrowRight className="size-4 shrink-0 text-[#b54437] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">How this helps the quote</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Turn the search into a better appointment.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              A deep-cleaning page should do more than answer one question. It should help you decide whether the home needs a true reset, which rooms deserve the most time, which extras should be selected before the visit, and what details the cleaner needs before arrival.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              Use this guide to make the request more specific. If the kitchen is the problem, name appliance fronts, cabinet handles, sink edges, backsplash, or oven/fridge interiors. If bathrooms are the problem, name shower buildup, tile edges, fixtures, toilet bases, or glass doors. If timing is tight, name the rooms that matter most first.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {[
              ["Home condition", "Light buildup, behind, heavy buildup, move timing, pets, clutter, and recurring-start goals all change the right plan."],
              ["Priority rooms", "Kitchens and bathrooms usually decide whether a deep clean feels worth it, but entries, stairs, guest rooms, and basements can matter too."],
              ["Add-ons", "Inside fridge, inside oven, inside cabinets, windows, blinds, and basement cleaning should be selected before the appointment is held."],
              ["Access notes", "Parking, gate codes, lockbox details, pets, delicate surfaces, and rooms to skip help protect the schedule."],
            ].map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#b54437]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Western suburbs route</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Local deep cleaning still starts with the ZIP.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              Shynli Deep Cleaning is built for homes across the western suburbs, including Naperville, Aurora, Plainfield, Wheaton, Downers Grove, Bolingbrook, Oswego, Lisle, Warrenville, North Aurora, Sugar Grove, Yorkville, and nearby service areas.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              The same deep-cleaning question can lead to different quote notes by city: parking, townhome access, condo instructions, pets, larger suburban layouts, finished basements, move timing, and the rooms that matter most. That is why every quote starts with the city, ZIP, home condition, and add-ons before a visit is confirmed.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {["Naperville", "Aurora", "Plainfield", "Wheaton"].map((cityName) => (
              <a key={cityName} href={getShynliDeepPath(slugifyCity(cityName))} className="group flex min-h-20 items-center justify-between gap-4 bg-white p-5 text-base font-black transition-colors hover:bg-[#f7f2e8]">
                {cityName} deep cleaning
                <ArrowRight className="size-5 shrink-0 text-[#b54437] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe4d5] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Practical answers</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                The details people usually ask next.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              These answers are visible on the page because deep-cleaning customers often compare scope, timing, add-ons, and boundaries before they are ready to request a quote.
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {page.faqs.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-[#e1d5c4] bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-black leading-tight">{question}</h2>
                <p className="mt-3 text-base font-bold leading-7 text-[#665f57]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2e8] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Before you decide</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              A good deep clean starts with a clear tradeoff.
            </h2>
          </div>
          <div className="grid gap-5 text-lg font-bold leading-8 text-[#5e574f]">
            <p>
              The right answer is not always to make the appointment bigger. Sometimes the smartest plan is to keep the core deep clean focused on kitchens, bathrooms, baseboards, doors, floors, and high-touch surfaces, then add only the extras that would change how the home feels afterward. That keeps the quote easier to understand and helps the cleaner protect time for the areas that matter most.
            </p>
            <p>
              If the home has heavy buildup, move timing, many bathrooms, pets, cluttered floors, or several appliance interiors, say that before the visit. If the home is mostly maintained but one room is behind, say that too. A focused request can be better than a broad request because it turns the deep clean into a plan: what must be handled, what can wait, and what should be priced separately.
            </p>
            <p>
              Before booking, compare this page with the cost guide, checklist, add-ons, timing guide, and preparation page. Together they help answer the medium- and low-frequency questions people usually search before they are ready to request a quote.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Turn the guide into a quote</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              The better the notes, the cleaner the visit.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              Use this page to decide what the cleaner should know before arrival. A good request names the condition of the home, the rooms that matter most, the add-ons that should be priced, and any access details that could slow the visit down.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {[
              ["Describe the condition", "Light buildup, behind, heavy buildup, pets, clutter, move timing, and guest timing all change the right plan."],
              ["Pick priority rooms", "Kitchens and bathrooms usually matter first, but entries, stairs, bedrooms, basements, and guest spaces may change the result."],
              ["Choose extras early", "Fridge, oven, cabinet interiors, interior windows, blinds, and basement cleaning should be named before the appointment."],
              ["Share access notes", "Parking, gate codes, lockbox details, pets, delicate surfaces, supplies, and rooms to skip help protect the schedule."],
            ].map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#b54437]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1b1725] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Fast answers before the visit.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
            {page.faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ShynliDeepFooter />
    </main>
  )
}

export function ShynliDeepCityIntentPage({ page }: { page: ShynliDeepCityIntentPageData }) {
  const profile = getDeepCityProfile(page.city)

  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.meta,
      url: `${shinyDeepCanonicalBase}/${page.slug}`,
      isPartOf: { "@type": "WebSite", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      about: {
        "@type": "Service",
        name: `${page.city.name} deep cleaning`,
        serviceType: "Deep cleaning",
        areaServed: { "@type": "City", name: page.city.name },
        provider: { "@type": "LocalBusiness", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: shinyDeepCanonicalBase },
          { "@type": "ListItem", position: 2, name: `${page.city.name} deep cleaning`, item: `${shinyDeepCanonicalBase}/${page.city.slug}` },
          { "@type": "ListItem", position: 3, name: page.h1, item: `${shinyDeepCanonicalBase}/${page.slug}` },
        ],
      },
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath: `/${page.slug}`,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3" aria-label="Shynli Deep Cleaning home">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <Sparkles className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label={`${page.city.name} deep cleaning navigation`}>
            {[
              ["City", page.city.slug],
              ["Cost", `${page.city.slug}/deep-cleaning-cost`],
              ["Checklist", `${page.city.slug}/deep-cleaning-checklist`],
              ["FAQ", "deep-cleaning-faq"],
            ].map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href={getShynliDeepPath() + "#quote"}>Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#1b1725] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
        <div
          className="absolute inset-0 scale-[1.02] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[62%_48%] opacity-48 blur-[1px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.88)_48%,rgba(27,23,37,0.54)_100%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
              {page.eyebrow}
            </Badge>
            <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.5rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
          </div>
          <div>
            <p className="text-xl font-bold leading-8 text-white/76">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-13 rounded-full bg-[#d7ff4f] px-7 text-base font-black text-[#1b1725] hover:bg-[#c6f040]">
                <a href={getShynliDeepPath() + "#quote"}>
                  Check price
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/8 px-7 text-base font-black text-white hover:bg-white/14 hover:text-white">
                <a href="#plan">See plan</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="plan" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article key={section.title} className="rounded-lg border border-[#e1d5c4] bg-white p-6 shadow-sm">
              <span className="text-sm font-black text-[#b54437]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-3xl font-black leading-tight">{section.title}</h2>
              <p className="mt-4 text-sm font-bold leading-6 text-[#665f57]">{section.copy}</p>
              <div className="mt-6 grid gap-2">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2 text-sm font-black">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#b54437]" />
                    {bullet}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {page.intentDetails ? (
        <section className="bg-[#f3eadc] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#b54437]">{page.intentDetails.eyebrow}</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                {page.intentDetails.title}
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">{page.intentDetails.copy}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
              {page.intentDetails.cards.map(([heading, copy]) => (
                <div key={heading} className="bg-white p-6">
                  <p className="text-sm font-black uppercase text-[#b54437]">{heading}</p>
                  <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">{profile.localSignal}</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Local relevance for {page.city.name}.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">{profile.intro}</p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{profile.second}</p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{profile.third}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {profile.cards.map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#b54437]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe4d5] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Helpful nearby pages</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Compare the nearby deep-cleaning pages.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              These links keep the page connected to the city, the local cost guide, the checklist, and nearby suburbs. That helps visitors compare realistic options instead of landing on an isolated page.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-2">
            {page.relatedLinks.map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-16 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                {label}
                <ArrowRight className="size-4 shrink-0 text-[#b54437] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Quote logic</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              The quote should match the situation.
            </h2>
          </div>
          <div className="grid gap-5 text-lg font-bold leading-8 text-[#5e574f]">
            <p>{page.quoteDetails?.copy ?? `A useful ${page.city.name} deep-cleaning page should reduce confusion before the appointment. The visitor should understand which work is part of the core visit, which tasks are add-ons, which boundaries matter, and what details the cleaner needs before arriving.`}</p>
            <div className="grid gap-2">
              {(page.quoteDetails?.bullets ?? ["Room count and bathrooms", "Condition level", "Selected add-ons", "Access notes", "Nearby cities"]).map((item) => (
                <div key={item} className="flex items-start gap-2 text-base font-black text-[#2d2933]">
                  <Check className="mt-1 size-4 shrink-0 text-[#b54437]" />
                  {item}
                </div>
              ))}
            </div>
            <p>
              For {page.city.name}, this also means checking whether the request is a cost question, a checklist question, or a specific home situation. A stronger quote names the outcome first, then uses the room count, buildup level, add-ons, nearby timing, and access details to protect the visit from feeling rushed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#b54437]">Before you book in {page.city.name}</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Make the request specific enough to price well.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              A strong deep-cleaning request gives the team enough context to protect the visit. Tell us whether the home feels lightly behind or heavily behind, which rooms matter most, which add-ons should be priced, and whether access is simple or needs extra notes.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              For {page.city.name}, the most useful quote notes usually describe the kitchen, bathrooms, entry areas, pets, stairs, parking, and any timing pressure around guests, moving, listing photos, or recurring service. Clear notes help the cleaner arrive prepared and help you compare the price before choosing a time.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              If this page is helping you compare options, use it as a simple decision filter: what must be handled during the first visit, what can wait for a future recurring clean, and what should be priced as an extra before the cleaner arrives. That makes the request easier to trust and easier to schedule.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {[
              ["Condition", "Choose light buildup, behind, heavy buildup, or move timing so the quote starts from the real home condition."],
              ["Priority rooms", "Name the kitchen, bathrooms, entry, bedrooms, basement, or guest rooms that should get the most attention first."],
              ["Add-ons", "Select fridge, oven, cabinet interiors, interior windows, blinds, or basement work before the schedule is confirmed."],
              ["Access", "Share parking, door code, lockbox, pets, special surfaces, rooms to skip, and the best contact for follow-up."],
            ].map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#b54437]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1b1725] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Answers before you request a quote.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
            {page.faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ShynliDeepFooter city={page.city} />
    </main>
  )
}

export function ShynliMark() {
  return (
    <span className="grid size-11 place-items-center rounded-full bg-[#08212d] text-[#9fe3ff] shadow-[0_18px_40px_rgba(8,33,45,0.22)]">
      <Sparkles className="size-6" />
    </span>
  )
}

export const apartmentModes = [
  {
    value: "reset",
    label: "Reset",
    eyebrow: "Most apartments",
    title: "A regular apartment reset without the house-sized overhead.",
    copy: "Kitchen, bath, floors, surfaces, trash, and the high-touch details that make a smaller space feel calm again.",
    items: ["Studio to 3-bedroom units", "Supplies included", "Kitchen and bath priority", "Recurring cadence available"],
  },
  {
    value: "deep",
    label: "Deep",
    eyebrow: "Catch-up clean",
    title: "A heavier apartment clean for buildup, corners, and ignored edges.",
    copy: "Built for apartments that need more than a maintenance visit: baseboards, fixtures, appliance exteriors, doors, and detail work.",
    items: ["Baseboards and trim", "Bathroom detail", "Kitchen buildup", "Optional fridge or oven interior"],
  },
  {
    value: "move",
    label: "Move",
    eyebrow: "Lease timing",
    title: "Move-in and move-out cleaning planned around access and handoff.",
    copy: "We focus on empty-room surfaces, cabinets, drawers, floors, bathrooms, and the things renters notice before keys change hands.",
    items: ["Move-out walkthrough prep", "Empty cabinets and drawers", "Lockbox or access notes", "Photo-ready final reset"],
  },
]

export const apartmentProof = [
  ["60 sec", "Start with ZIP, unit size, and timing."],
  ["No card", "Check availability before committing."],
  ["Access-ready", "Parking, elevator, gate, and pet notes captured early."],
  ["Make-right", "Covered missed items get a clear follow-up path."],
]

export const apartmentCompetitorTakes = [
  ["Maid Marines", "Instant price energy, flat-rate clarity, no hidden fees, and guarantee next to the CTA."],
  ["Tidy Casa", "A clean first screen: simple promise, background-checked cleaners, supplies included."],
  ["MyClean", "Package cards with starting prices and visible checklists before booking."],
  ["AccessMaids", "Local Chicago-area confidence, trained cleaners, and service built for busy schedules."],
]

export const apartmentChecklist = [
  ["Kitchen", "Counters, sink, stovetop, appliance exteriors, cabinet fronts, trash, and high-touch handles."],
  ["Bathroom", "Toilet, tub or shower, sink, mirror, fixtures, floor, and reachable surfaces."],
  ["Living areas", "Dusting, vacuuming, mopping, surfaces, entry area, and small-space reset."],
  ["Bedrooms", "Floors, dusting, reachable furniture surfaces, mirrors, and trash."],
  ["Move extras", "Inside empty cabinets, drawers, fridge, oven, and closet floors when quoted."],
]

export function ShynliApartmentPage() {
  useSeoMeta(
    "Shynli Apartment Cleaning | Shynli",
    "Apartment cleaning for renters, busy professionals, and move-in or move-out cleaning across Chicago's western suburbs.",
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Shynli Apartment Cleaning",
      serviceType: "Apartment cleaning",
      areaServed: ["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook", "Downers Grove"].map((name) => ({ "@type": "City", name })),
      provider: { "@type": "LocalBusiness", name: "Shynli Cleaning" },
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbfd] text-[#092332]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/18 bg-[#061923]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href="/shiny-apartment-cleaning" className="flex min-h-11 items-center gap-3" aria-label="Shynli Apartment Cleaning home">
            <ShynliMark />
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#9fe3ff]">Apartment Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/70 md:flex" aria-label="Apartment site navigation">
            {[
              ["Plans", "#plans"],
              ["Checklist", "#checklist"],
              ["Proof", "#proof"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="min-h-10 rounded-full px-4 py-2 transition-colors hover:bg-white/12 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-10 rounded-full bg-white px-5 font-black text-[#061923] shadow-none hover:bg-[#dff7ff]">
            <a href="#quote">Get price</a>
          </Button>
        </div>
      </header>

      <section id="top" className="relative min-h-[calc(100svh-0px)] overflow-hidden bg-[#061923] text-white">
        <div
          className="absolute inset-0 bg-cover opacity-72 saturate-[0.94]"
          style={{ backgroundImage: "url(/cleaner-hero.jpg)", backgroundPosition: "center 34%" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,25,35,0.92)_0%,rgba(6,25,35,0.68)_38%,rgba(6,25,35,0.18)_76%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-14 pt-28 md:px-8 md:pb-32">
          <div className="max-w-2xl animate-rise">
            <p className="mb-5 text-sm font-black uppercase text-[#9fe3ff]">Naperville apartment cleaning</p>
            <h1 className="text-6xl font-black leading-[0.86] text-white sm:text-7xl md:text-8xl">
              Shynli
              <span className="block text-[#9fe3ff]">Apartment</span>
              <span className="block">Cleaning.</span>
            </h1>
            <p className="mt-7 max-w-xl text-xl font-bold leading-8 text-white/84">
              A cleaner apartment without the house-sized process: quick price check, smaller-space checklist, and access notes handled before we arrive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-13 rounded-full bg-[#9fe3ff] px-7 font-black text-[#061923] shadow-none hover:bg-white">
                <a href="#quote">
                  Check apartment price
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-13 rounded-full border-white/45 bg-white/8 px-7 font-black text-white hover:bg-white/16 hover:text-white">
                <a href="#checklist">See checklist</a>
              </Button>
            </div>
          </div>
        </div>

        <div id="quote" className="relative z-10 mx-4 -mt-12 max-w-7xl rounded-md border border-white/24 bg-white/92 p-3 text-[#092332] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:absolute md:inset-x-8 md:bottom-4 md:mx-auto md:mt-0 md:p-4">
          <form action={buildQuoteUrl({ service: "apartment-cleaning" })} method="get" className="grid gap-3 md:grid-cols-[1.2fr_0.85fr_0.85fr_0.9fr_auto] md:items-end" onSubmit={(event) => submitQuoteForm(event, { service: "apartment-cleaning" })}>
            <div>
              <label htmlFor="apt-zip" className="text-xs font-black uppercase text-[#1f789d]">ZIP</label>
              <Input id="apt-zip" name="zip" inputMode="numeric" placeholder="60540" className="mt-1 h-12 rounded-md border-[#b9ddea] bg-white text-base font-black" />
            </div>
            <div>
              <label htmlFor="apt-size" className="text-xs font-black uppercase text-[#1f789d]">Apartment size</label>
              <select id="apt-size" name="bedrooms" className="mt-1 h-12 w-full rounded-md border border-[#b9ddea] bg-white px-3 text-base font-black outline-none focus:ring-3 focus:ring-[#9fe3ff]/70">
                <option>Studio</option>
                <option>1 bedroom</option>
                <option>2 bedrooms</option>
                <option>3 bedrooms</option>
              </select>
            </div>
            <div>
              <label htmlFor="apt-clean" className="text-xs font-black uppercase text-[#1f789d]">Clean type</label>
              <select id="apt-clean" name="service" className="mt-1 h-12 w-full rounded-md border border-[#b9ddea] bg-white px-3 text-base font-black outline-none focus:ring-3 focus:ring-[#9fe3ff]/70">
                <option>Regular reset</option>
                <option>Deep clean</option>
                <option>Move-out</option>
                <option>Move-in</option>
              </select>
            </div>
            <div>
              <label htmlFor="apt-access" className="text-xs font-black uppercase text-[#1f789d]">Access note</label>
              <Input id="apt-access" name="access_note" placeholder="Elevator, parking, pets" className="mt-1 h-12 rounded-md border-[#b9ddea] bg-white text-base font-black" />
            </div>
            <Button type="submit" className="h-12 rounded-md bg-[#061923] px-7 font-black text-white shadow-none hover:bg-[#12384a]">
              See times
              <ArrowRight />
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-white px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
          {apartmentProof.map(([stat, text]) => (
            <div key={stat} className="border-l border-[#cde5f2] pl-4">
              <p className="text-2xl font-black text-[#061923]">{stat}</p>
              <p className="mt-1 text-sm font-bold leading-6 text-[#46606d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7fbfd] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Apartment-specific details</p>
            <h2 className="text-4xl font-black leading-[0.96] sm:text-5xl md:text-6xl">
              The quote has to understand the building, not just the rooms.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#516976]">
              Apartment cleaning is often less about square footage and more about access, timing, and high-use spaces. A studio move-out, a two-bedroom recurring reset, and a third-floor walk-up deep clean should not be priced or planned the same way.
            </p>
            <p className="mt-4 text-base font-bold leading-7 text-[#516976]">
              Tell us whether this is an occupied apartment, a lease-end clean, a first clean before recurring service, or a quick reset before guests. That context helps separate a simple maintenance visit from a deeper kitchen and bathroom clean, and it keeps add-ons like fridge, oven, cabinets, or closet floors from being discovered too late. It also helps answer the practical renter questions that decide whether the visit will feel smooth.
              Clear building notes also help the cleaner avoid wasted time at the front desk, elevator, parking area, or lockbox.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="/service-areas" className="inline-flex min-h-11 items-center rounded-full border border-[#9fcfe0] bg-white px-4 text-sm font-black text-[#1976a3] hover:border-[#1976a3]">Service areas</a>
              <a href="/services" className="inline-flex min-h-11 items-center rounded-full border border-[#9fcfe0] bg-white px-4 text-sm font-black text-[#1976a3] hover:border-[#1976a3]">All services</a>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Building access", "Elevators, stairs, parking, gate codes, front desk instructions, and lockbox notes should be captured before the cleaner arrives."],
              ["Small-space priorities", "Kitchens, bathrooms, entry areas, floors, and trash often decide whether an apartment feels reset after the visit."],
              ["Lease timing", "Move-in and move-out apartment cleaning should account for empty cabinets, appliance add-ons, closet floors, and inspection expectations."],
              ["Recurring rhythm", "For renters and busy professionals, weekly or biweekly service keeps smaller spaces from feeling crowded by chores."],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#516976]">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="min-h-[520px] bg-[#dff7ff]">
          <picture>
            <source
              type="image/webp"
              srcSet="/clean-result-480.webp 480w, /clean-result-640.webp 640w, /clean-result-960.webp 960w"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <img
              src="/clean-result-640.jpg"
              alt="Bright clean apartment living space"
              className="h-full w-full object-cover"
              width={640}
              height={384}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="flex items-center bg-[#092332] px-4 py-16 text-white md:px-12">
          <div className="max-w-xl">
            <p className="mb-5 text-sm font-black uppercase text-[#9fe3ff]">What changes from house cleaning</p>
            <h2 className="text-4xl font-black leading-[0.95] sm:text-5xl">
              Apartments need cleaner timing, tighter access, and a sharper checklist.
            </h2>
            <p className="mt-6 text-lg font-bold leading-8 text-white/76">
              The design is built around the real buying moment: a renter, couple, or busy professional needs a clean apartment fast, without calling three companies to explain parking, elevators, pets, or move timing.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                ["Access first", "Gate, elevator, lockbox, parking, pets, and building notes are captured before booking."],
                ["Smaller-space pricing", "Studio and bedroom count drive the quote instead of forcing a house-sized process."],
                ["Move logic", "Regular, deep, move-in, and move-out are clear from the first screen."],
              ].map(([title, copy]) => (
                <div key={title} className="grid grid-cols-[44px_1fr] gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-[#9fe3ff] text-[#061923]">
                    <Check className="size-5" />
                  </span>
                  <span>
                    <span className="block text-lg font-black">{title}</span>
                    <span className="mt-1 block text-sm font-bold leading-6 text-white/70">{copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="bg-[#f7fbfd] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Plans from the best competitors</p>
            <h2 className="text-4xl font-black leading-[0.96] sm:text-5xl md:text-6xl">
              Three apartment paths, not a wall of cleaning options.
            </h2>
          </div>

          <Tabs defaultValue="reset" className="mt-10">
            <TabsList className="grid h-auto w-full grid-cols-3 rounded-md bg-[#e7f5fb] p-1 md:w-[520px]">
              {apartmentModes.map((mode) => (
                <TabsTrigger key={mode.value} value={mode.value} className="min-h-12 rounded-sm text-sm font-black data-[state=active]:bg-white">
                  {mode.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {apartmentModes.map((mode) => (
              <TabsContent key={mode.value} value={mode.value} className="mt-8">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                  <div className="bg-white p-6 shadow-[0_18px_50px_rgba(9,35,50,0.08)] md:p-8">
                    <p className="text-sm font-black uppercase text-[#1976a3]">{mode.eyebrow}</p>
                    <h3 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{mode.title}</h3>
                    <p className="mt-5 text-lg font-bold leading-8 text-[#516976]">{mode.copy}</p>
                    <Button asChild className="mt-8 h-12 rounded-full bg-[#061923] px-6 font-black text-white shadow-none hover:bg-[#12384a]">
                      <a href="#quote">Start with this clean</a>
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {mode.items.map((item) => (
                      <div key={item} className="flex min-h-[116px] items-end bg-white p-5 shadow-[0_18px_50px_rgba(9,35,50,0.07)]">
                        <p className="text-xl font-black leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="proof" className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">What we borrowed</p>
            <h2 className="text-4xl font-black leading-[0.96] sm:text-5xl">
              Competitor logic, rebuilt for Shynli.
            </h2>
          </div>
          <div className="grid gap-4">
            {apartmentCompetitorTakes.map(([brand, take]) => (
              <div key={brand} className="grid gap-3 border-t border-[#cde5f2] pt-5 md:grid-cols-[180px_1fr]">
                <h3 className="text-xl font-black">{brand}</h3>
                <p className="text-lg font-bold leading-8 text-[#516976]">{take}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="checklist" className="bg-[#eaf7ff] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Apartment checklist</p>
            <h2 className="text-4xl font-black leading-[0.96] sm:text-5xl">
              Clear enough for renters. Detailed enough for move day.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#516976]">
              This is where `MyClean`-style checklists meet local apartment details: kitchens, bathrooms, access, parking, and optional move extras.
            </p>
          </div>
          <div className="grid gap-3">
            {apartmentChecklist.map(([title, copy], index) => (
              <div key={title} className="grid grid-cols-[52px_1fr] gap-4 bg-white p-5 shadow-[0_16px_45px_rgba(9,35,50,0.06)]">
                <span className="text-2xl font-black text-[#1976a3]">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-xl font-black">{title}</span>
                  <span className="mt-2 block text-base font-bold leading-7 text-[#516976]">{copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#092332] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Booking questions</p>
            <h2 className="text-4xl font-black leading-[0.96] sm:text-5xl">
              The page should answer objections before the call.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="supplies" className="rounded-md bg-white px-5 text-[#092332]">
            <AccordionItem value="supplies">
              <AccordionTrigger>Do cleaners bring supplies?</AccordionTrigger>
              <AccordionContent>Yes. Supplies are included unless you prefer specific products for your apartment.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="access">
              <AccordionTrigger>Can you handle building access or parking notes?</AccordionTrigger>
              <AccordionContent>Yes. The quote flow collects elevator, gate, lockbox, parking, pet, and entry instructions before the visit.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="move">
              <AccordionTrigger>Is this good for move-out cleaning?</AccordionTrigger>
              <AccordionContent>Yes. Choose Move in the quote flow so the checklist can focus on empty rooms, cabinets, drawers, floors, and final handoff needs.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
              <AccordionTrigger>How should pricing work?</AccordionTrigger>
              <AccordionContent>The cleanest model is apartment size, clean type, condition, timing, pets, and extras. Starting prices can be shown, but final confirmation should happen before booking.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-[#061923] px-4 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <a href="/shiny-apartment-cleaning" className="flex min-h-11 items-center gap-3">
            <ShynliMark />
            <span className="text-xl font-black">Shynli Apartment Cleaning</span>
          </a>
          <div className="flex flex-wrap gap-4 text-sm font-black text-white/62">
            <a href="/" className="min-h-10 hover:text-white">Back to Shynli</a>
            <a href="#quote" className="min-h-10 hover:text-white">Get price</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export function ShynliMoveOutPage({ city }: { city?: (typeof cityPages)[number] } = {}) {
  const homeHref = getShynliMoveOutPath()
  const cityName = city?.name
  const canonicalPath = city ? `/${city.slug}` : "/"
  const pageTitle = cityName ? `${cityName} Move-Out Cleaning | Shynli Move-Out Cleaning` : "Shynli Move-Out Cleaning | Final Walkthrough Cleaning"
  const pageDescription = cityName
    ? `Move-out cleaning in ${cityName}, IL with empty-home checklist, access notes, after-clean photos, and final walkthrough-ready scope.`
    : "Move-out cleaning for renters, sellers, landlords, and realtors with clear scope, handoff notes, after-clean photos, and fast quote flow."
  const routeNote = city ? cityRouteNotes[city.group] : "We serve select Chicagoland suburbs with move-out cleaning built around access, timing, proof, and final handoff."
  const nearbyCityNames = city?.nearby ?? ["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook"]

  useSeoMeta(
    pageTitle,
    pageDescription,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: cityName ? `${cityName} Move-Out Cleaning` : "Shynli Move-Out Cleaning",
      serviceType: "Move-out cleaning",
      url: `${shinyMoveOutCanonicalBase}${canonicalPath === "/" ? "" : canonicalPath}`,
      areaServed: cityName ? { "@type": "City", name: cityName } : cityList.map((name) => ({ "@type": "City", name })),
      provider: { "@type": "LocalBusiness", name: "Shynli Move-Out Cleaning", url: shinyMoveOutCanonicalBase },
    },
    {
      canonicalBaseUrl: shinyMoveOutCanonicalBase,
      canonicalPath,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6fbff] text-[#0b2430]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#0b2430]/10 bg-[#f6fbff]/90 px-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
          <a href={homeHref} className="flex min-h-11 items-center gap-3" aria-label="Shynli Move-Out Cleaning home">
            <span className="grid size-10 place-items-center rounded-sm bg-[#0b2430] text-sm font-black text-[#f6fbff]">SM</span>
            <span className="leading-none">
              <span className="block text-base font-black uppercase tracking-normal">Shynli Move-Out</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#0b7f8a]">Move-out cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-[#0b2430]/68 md:flex" aria-label="Move-out navigation">
            {[
              ["Handoff", "#handoff"],
              ["Report", "#report"],
              ["Pricing", "#pricing"],
              ["Areas", "#areas"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="flex min-h-11 items-center rounded-sm px-4 transition-colors hover:bg-[#d7f3f7] hover:text-[#0b2430]">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-sm bg-[#0b2430] px-5 font-black text-[#f6fbff] hover:bg-[#123846]">
            <a href="#quote">Check date</a>
          </Button>
        </div>
      </header>

      <section id="top" className="relative min-h-[92svh] bg-[#0b2430] text-[#f6fbff]">
        <img src="/cleaner-hero.jpg" alt="Professional cleaner preparing a home for move-out inspection" className="absolute inset-0 size-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,36,48,0.96)_0%,rgba(11,36,48,0.78)_45%,rgba(11,127,138,0.26)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,#f6fbff_0%,rgba(246,251,255,0)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-4 pb-6 pt-28 md:px-8 md:pb-10">
          <div className="max-w-5xl animate-rise pb-8 md:pb-12">
            <Badge className="mb-5 rounded-sm border border-[#20c7d8]/55 bg-[#20c7d8]/16 px-4 py-1.5 text-[#f6fbff] shadow-none hover:bg-[#20c7d8]/16">
              {cityName ? `${cityName} apartment empty, keys due, inspection coming` : "Apartment empty, keys due, inspection coming"}
            </Badge>
            <h1 className="max-w-5xl text-[clamp(3.2rem,8.2vw,8.4rem)] font-black leading-[0.86] tracking-normal">
              {cityName ? `${cityName} move-out cleaning.` : "Ready for the final walkthrough."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-[#f6fbff]/78 md:text-xl">
              {cityName
                ? `Move-out cleaning in ${cityName} built around empty rooms, inspection checklists, handoff timing, and after-clean proof.`
                : "Move-out cleaning built around empty rooms, inspection checklists, handoff timing, and after-clean proof the customer can actually use."}
            </p>
          </div>

          <div id="quote" className="animate-rise-delayed border border-[#b9e5ee] bg-[#f6fbff] p-3 text-[#0b2430] shadow-[0_26px_90px_rgba(0,0,0,0.28)] md:p-4">
            <form action={buildQuoteUrl({ service: "move-out-cleaning" })} method="get" className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end" onSubmit={(event) => submitQuoteForm(event, { service: "move-out-cleaning" })}>
              {cityName ? <input type="hidden" name="city" value={cityName} /> : null}
              <label className="grid gap-2 text-xs font-black uppercase text-[#0b7f8a]">
                ZIP code
                <Input name="zip" inputMode="numeric" placeholder="60540" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase text-[#0b7f8a]">
                Handoff date
                <Input name="date" type="date" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase text-[#0b7f8a]">
                Place type
                <Input name="property_type" placeholder="Apartment, condo, house" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase text-[#0b7f8a]">
                Scope
                <Input name="condition" placeholder="Empty / mostly empty" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
              </label>
              <Button type="submit" className="h-12 rounded-sm bg-[#19b97f] px-7 font-black text-white hover:bg-[#14a66f]">
                Start quote
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-y border-[#0b2430]/10 bg-[#e9f7fb] px-4 py-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moveOutProof.map(([title, copy]) => (
            <div key={title} className="flex min-h-20 items-center gap-4 border-l-4 border-[#22c7a9] bg-[#ffffff] px-4 py-3">
              <p className="whitespace-nowrap text-2xl font-black leading-none text-[#0b2430] lg:text-3xl">{title}</p>
              <p className="text-sm font-bold leading-5 text-[#486573]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="handoff" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">Four handoff moments</p>
            <h2 className="text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">One page, four reasons to book.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {moveOutMoments.map(([title, copy], index) => (
              <Card key={title} className={`rounded-sm border-[#b9e5ee] shadow-none ${index === 0 ? "bg-[#0b2430] text-[#f6fbff]" : "bg-[#ffffff]"}`}>
                <CardContent className="grid min-h-44 content-between p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-3xl font-black leading-none">{title}</h3>
                    <KeyRound className={`size-7 ${index === 0 ? "text-[#22c7a9]" : "text-[#0b7f8a]"}`} />
                  </div>
                  <p className={`mt-8 text-base font-bold leading-7 ${index === 0 ? "text-[#f6fbff]/72" : "text-[#486573]"}`}>{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="bg-[#0b2430] px-4 py-14 text-[#f6fbff] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#22c7a9]">The report is the receipt</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.96] sm:text-5xl md:text-6xl">
              Cleaning is invisible after you leave. Proof should not be.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-[#f6fbff]/68">
              Every job ends with documentation: room notes, after photos, access confirmation, and a clear path if a covered item is missed.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [Camera, "After photos"],
                [ClipboardCheck, "Scope checklist"],
                [ShieldCheck, "Covered re-clean"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex min-h-20 items-center gap-3 border border-[#f6fbff]/14 bg-white/5 p-4">
                  <Icon className="size-5 text-[#22c7a9]" />
                  <span className="text-sm font-black uppercase">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#f6fbff]/16 bg-[#103442] p-3">
            {moveOutReportRows.map(([title, copy]) => (
              <div key={title} className="grid gap-4 border-b border-[#f6fbff]/12 px-3 py-5 last:border-b-0 sm:grid-cols-[0.28fr_0.72fr]">
                <p className="text-sm font-black uppercase text-[#22c7a9]">{title}</p>
                <p className="text-xl font-black leading-tight text-[#f6fbff]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ffffff] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden border border-[#b9e5ee] bg-[#e9f7fb]">
            <picture>
              <source
                type="image/webp"
                srcSet="/clean-result-480.webp 480w, /clean-result-640.webp 640w, /clean-result-960.webp 960w"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <img
                src="/clean-result-640.jpg"
                alt="Clean empty room ready for move-out inspection"
                className="aspect-[4/3] w-full object-cover"
                width={640}
                height={384}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">Scope clarity</p>
            <h2 className="max-w-2xl text-4xl font-black leading-[0.98] sm:text-5xl">Show what is included before the customer asks.</h2>
            <div className="mt-7 grid gap-2">
              {["Empty-room floors, surfaces, shelves, closets, switches, doors, and baseboards", "Kitchen and bathroom reset with quoted appliance and cabinet interiors", "Access notes for lockbox, elevator, parking, gate, pets, utilities, and lock-up", "Handoff photos and final notes when the customer cannot be on site"].map((item) => (
                <div key={item} className="flex gap-3 border-b border-[#b9e5ee] py-4 last:border-b-0">
                  <Check className="mt-1 size-5 shrink-0 text-[#0b7f8a]" />
                  <p className="text-lg font-bold leading-7 text-[#486573]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">Starting points</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">Price the handoff, then quote the real condition.</h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#486573] md:justify-self-end">
              Show a range early, then explain what changes the final number: size, condition, timing, access, pets, and add-ons.
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {moveOutPackages.map(([title, price, copy], index) => (
              <Card key={title} className={`rounded-sm border-[#b9e5ee] shadow-none ${index === 1 ? "bg-[#0b2430] text-[#f6fbff]" : "bg-[#ffffff]"}`}>
                <CardContent className="p-6">
                  <p className={`text-sm font-black uppercase ${index === 1 ? "text-[#22c7a9]" : "text-[#0b7f8a]"}`}>{title}</p>
                  <p className="mt-5 text-5xl font-black leading-none">{price}</p>
                  <p className={`mt-5 min-h-24 text-base font-bold leading-7 ${index === 1 ? "text-[#f6fbff]/72" : "text-[#486573]"}`}>{copy}</p>
                  <Button asChild className={`mt-6 h-12 w-full rounded-sm font-black ${index === 1 ? "bg-[#19b97f] text-white hover:bg-[#14a66f]" : "bg-[#0b2430] text-[#f6fbff] hover:bg-[#123846]"}`}>
                    <a href="#quote">Check this home</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 border border-[#b9e5ee] bg-[#ffffff] p-5">
            <h3 className="text-xl font-black">Quote separately</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {moveOutBoundaries.map((item) => (
                <span key={item} className="inline-flex min-h-10 items-center rounded-sm bg-[#e9f7fb] px-3 text-sm font-black text-[#486573]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {cityName ? (
        <section className="bg-white px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">{cityName} handoff plan</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
                Move-out cleaning shaped around local timing.
              </h2>
              <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">{routeNote}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["Access first", `Add lockbox, gate, elevator, parking, pet, and utility notes for the ${cityName} visit before the cleaner arrives.`],
                ["Empty-home scope", "Rooms, closets, shelves, doors, switches, baseboards, kitchen, bathrooms, and selected appliance or cabinet interiors stay visible in the quote."],
                ["Photo handoff", "After-clean photos and final notes help when the renter, owner, landlord, or realtor cannot be on site."],
                ["Nearby route", `Also nearby: ${nearbyCityNames.slice(0, 4).join(", ")}.`],
              ].map(([title, copy]) => (
                <Card key={title} className="rounded-sm border-[#b9e5ee] bg-[#f6fbff] shadow-none">
                  <CardContent className="p-5">
                    <h3 className="text-2xl font-black leading-tight">{title}</h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-[#486573]">{copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city ? (
        <section className="bg-[#e9f7fb] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">{city.name} cleaning paths</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
                Pick the page that matches the handoff.
              </h2>
              <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
                Move-in, apartment, house, condo, cost, checklist, landlord, and rental pages are separated when the customer needs a different answer before requesting a quote. That keeps the local page helpful instead of forcing every move into one generic checklist.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[...shinyMoveOutAllCityIntentLinks, ...(shinyMoveOutPriorityCityIntentLinks.length && cityList.includes(city.name) && ["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook", "Lisle", "Warrenville", "Downers Grove", "North Aurora", "Sugar Grove", "Yorkville", "Montgomery"].includes(city.name) ? shinyMoveOutPriorityCityIntentLinks : [])].map(([label, slug]) => (
                <a key={`${city.slug}-${slug}`} href={getShynliMoveOutPath(`${city.slug}/${slug}`)} className="group flex min-h-20 items-center justify-between gap-4 border border-[#b9e5ee] bg-white p-5 transition-colors hover:bg-[#f6fbff]">
                  <span className="text-lg font-black leading-tight text-[#0b2430]">{city.name} {label}</span>
                  <ArrowRight className="size-5 shrink-0 text-[#0b7f8a] transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="areas" className="bg-[#f6fbff] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">Service areas</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
              Move-out cleaning across every Shynli service area.
            </h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Choose your city first, then share the property type, handoff date, condition, access details, and any appliance or cabinet requests. The cleaner can plan the visit around the real move-out window instead of treating every apartment, condo, rental, or house like the same job.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {serviceAreaGroups.map((group) => (
              <div key={group.label} className="border border-[#b9e5ee] bg-white p-5">
                <h3 className="text-sm font-black uppercase text-[#0b7f8a]">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.cities.map((name) => (
                    <a
                      key={name}
                      href={getShynliMoveOutPath(slugifyCity(name))}
                      className="inline-flex min-h-11 items-center rounded-sm bg-[#e9f7fb] px-3 text-sm font-black text-[#0b2430] transition-colors hover:bg-[#d7f3f7] hover:text-[#0b7f8a]"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">Helpful move-out pages</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
              Get the exact page for your handoff.
            </h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Cost, checklist, apartment, rental, landlord, and same-week pages are linked here so customers can choose the clearest path before starting a quote. Each page explains what changes the appointment, what should be selected early, and how the final handoff works when the customer, landlord, realtor, or property manager cannot stay on site.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {shinyMoveOutFeaturedSeoLinks.map(([label, slug]) => (
              <a key={slug} href={getShynliMoveOutPath(slug)} className="group flex min-h-20 items-center justify-between gap-4 border border-[#b9e5ee] bg-[#f6fbff] p-5 transition-colors hover:bg-[#e9f7fb]">
                <span className="text-lg font-black leading-tight text-[#0b2430]">{label}</span>
                <ArrowRight className="size-5 shrink-0 text-[#0b7f8a] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#e9f7fb] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#0b7f8a]">Honest answers</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">Strong promise, clear limits.</h2>
            <p className="mt-6 max-w-xl text-lg font-bold leading-8 text-[#486573]">
              This keeps the page persuasive without making deposit, access, or add-on promises the business cannot control.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="border border-[#b9e5ee] bg-[#ffffff] px-5 text-[#0b2430]">
            {moveOutFaqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ShynliMoveOutFooter city={city} />
    </main>
  )
}

export function ShynliMoveOutLegalPage({ page }: { page: LegalPageData }) {
  const bodyLines = page.lines.filter((line) => line !== page.lines[0])
  const homeHref = getShynliMoveOutPath()

  useSeoMeta(
    `${page.title} | Shynli Move-Out Cleaning`,
    page.description,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      url: `${shinyMoveOutCanonicalBase}${page.path}`,
      publisher: {
        "@type": "Organization",
        name: "Shynli Move-Out Cleaning",
        legalName: "SHYNLI LLC",
      },
      isPartOf: {
        "@type": "WebSite",
        name: "Shynli Move-Out Cleaning",
        url: shinyMoveOutCanonicalBase,
      },
    },
    {
      canonicalBaseUrl: shinyMoveOutCanonicalBase,
      canonicalPath: page.path,
    },
  )

  return (
    <main className="min-h-screen bg-[#f6fbff] text-[#0b2430]">
      <header className="border-b border-[#0b2430]/10 bg-[#f6fbff] px-4 md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
          <a href={homeHref} className="flex min-h-11 items-center gap-3" aria-label="Shynli Move-Out Cleaning home">
            <span className="grid size-10 place-items-center rounded-sm bg-[#0b2430] text-sm font-black text-[#f6fbff]">SM</span>
            <span className="leading-none">
              <span className="block text-base font-black uppercase tracking-normal">Shynli Move-Out</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#0b7f8a]">Move-out cleaning</span>
            </span>
          </a>
          <Button asChild className="h-11 rounded-sm bg-[#0b2430] px-5 font-black text-[#f6fbff] hover:bg-[#123846]">
            <a href={homeHref}>Back to site</a>
          </Button>
        </div>
      </header>

      <section className="bg-[#0b2430] px-4 py-14 text-[#f6fbff] md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-black uppercase text-[#22c7a9]">Shynli Move-Out Cleaning legal</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#f6fbff]/70">{page.description}</p>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <article className="mx-auto max-w-4xl border border-[#b9e5ee] bg-white p-5 shadow-sm md:p-8">
          <div className="space-y-4">
            {bodyLines.map((line, index) => (
              <LegalLine key={`${page.slug}-${index}-${line.slice(0, 24)}`} line={line} />
            ))}
          </div>
        </article>
      </section>

      <ShynliMoveOutFooter />
    </main>
  )
}

export const airbnbSiteProof = [
  ["Fast turnover windows", "Tell us checkout and check-in times so we can confirm whether the reset is realistic."],
  ["Photos after the clean", "See the beds, bathrooms, kitchen, and supplies before the next guest arrives."],
  ["Linens and restock notes", "Beds, towels, paper goods, soaps, and owner-closet instructions stay visible."],
]

export const airbnbSiteImages = {
  hero: "/airbnb-turnover/bedroom-towels.jpg",
  secondary: "/airbnb-turnover/housekeeper-towels.jpg",
  window: "/airbnb-turnover/clean-bedroom.jpg",
  proof: "/airbnb-turnover/bathroom-towels.jpg",
}

export const airbnbSitePillars = [
  {
    icon: TimerReset,
    eyebrow: "Timing",
    title: "Can you handle a same-day turnover?",
    copy: "Share checkout, check-in, parking, and access details first. We confirm the real window before you count on the clean.",
  },
  {
    icon: WashingMachine,
    eyebrow: "Linens",
    title: "Will the beds look ready for guests?",
    copy: "We plan for prepared linens, towel placement, used sets, and the details guests notice the moment they open the bedroom door.",
  },
  {
    icon: PackageCheck,
    eyebrow: "Restocking",
    title: "Are the essentials still stocked?",
    copy: "Tell us what guests should find: paper goods, soaps, coffee, trash bags, dishwasher tabs, and any locked supply closet rules.",
  },
  {
    icon: Camera,
    eyebrow: "Proof",
    title: "How do I know the place is ready?",
    copy: "Ask for photos, notes on visible issues, and a ready-status update so you are not guessing from across town.",
  },
]

export const airbnbSiteTimeline = [
  ["Guests leave", "We work from the arrival window, access notes, linen plan, and anything the last stay may have changed."],
  ["The home resets", "Kitchen, bathrooms, floors, beds, trash, supplies, and guest-facing details are handled in one visit."],
  ["You get confirmation", "Photos, supply notes, visible issues, and ready status help you avoid a blind check-in."],
]

export const airbnbSiteScope = [
  ["Turnover clean", "Kitchen reset, bathroom sanitizing, floors, surfaces, trash, and the details guests see first."],
  ["Guest setup", "Beds made, towels staged, toiletries checked, and paper goods restocked when you provide them."],
  ["Host notes", "Low supplies, left items, stains, access issues, or maintenance concerns are called out after the visit."],
  ["Deeper upkeep", "Rotating detail tasks help the listing stay fresh instead of slowly drifting below your review standard."],
]

export const airbnbSiteReportItems = [
  [Camera, "Room photos", "Kitchen, bathrooms, bedrooms, supplies, and staged arrival moments you can review quickly."],
  [ClipboardCheck, "What needs attention", "Damage, stains, left items, low inventory, access trouble, or maintenance needs."],
  [BedDouble, "Bed and towel status", "Beds made, towels placed, used sets separated, and linen notes kept clear."],
  [CalendarCheck, "Ready for check-in", "A simple status update so you know whether the listing is ready for the next guest."],
]
void airbnbSiteReportItems

export const airbnbSiteCompetitorMoves = [
  ["Protect reviews", "Guests remember bathrooms, beds, floors, and whether the space feels like the photos."],
  ["Reduce check-in stress", "A clear turnover plan keeps you from chasing cleaners while the next guest is on the way."],
  ["Handle the small things", "Paper goods, towels, trash, soaps, coffee, and staging details are easy to miss without a list."],
  ["See proof remotely", "Photos and notes help you manage the property even when you cannot walk it yourself."],
  ["Plan repeat visits", "Recurring turnover notes make each clean faster, clearer, and less dependent on memory."],
  ["Know the limits", "Laundry, restocking, same-day timing, and photo reports should be confirmed before the first booking."],
  ["Book with confidence", "A short quote flow captures the details that decide whether the visit can be done well."],
  ["Keep guests comfortable", "The goal is simple: a clean, stocked, calm space that feels ready when the door opens."],
]

export function ShynliAirbnbBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-[#dddddd] bg-white px-4 text-xs font-black text-[#222222] shadow-[0_6px_18px_rgba(0,0,0,0.05)]">
      {children}
    </span>
  )
}

export function ShynliAirbnbPage() {
  useSeoMeta(
    "Shynli Airbnb Cleaning | Short-Term Rental Turnovers",
    "Short-term rental turnover cleaning with linens, restocking, photo handoff, and host intake.",
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Shynli Airbnb Cleaning",
      serviceType: "Short-term rental turnover cleaning",
      provider: { "@type": "LocalBusiness", name: "Shynli Airbnb Cleaning" },
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#222222]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dddddd] bg-white/94 px-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <a href="/shiny-airbnb-cleaning" className="flex min-h-11 items-center gap-3" aria-label="Shynli Airbnb Cleaning home">
            <span className="grid size-10 place-items-center rounded-full bg-[#ff385c] text-white">
              <KeyRound className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black text-[#ff385c]">Airbnb Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-[#dddddd] bg-white p-1 text-sm font-black text-[#717171] shadow-[0_3px_16px_rgba(0,0,0,0.08)] md:flex" aria-label="Airbnb site navigation">
            {[
              ["Turnover", "#turnover"],
              ["Scope", "#scope"],
              ["Proof", "#proof"],
              ["Quote", "#quote"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="flex min-h-10 items-center rounded-full px-4 transition-colors hover:bg-[#f7f7f7] hover:text-[#222222]">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#ff385c] px-5 font-black text-white shadow-none hover:bg-[#e31c5f]">
            <a href="#quote">Check window</a>
          </Button>
        </div>
      </header>

      <section className="bg-white px-4 pb-12 pt-28 md:px-8 md:pb-18 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <ShynliAirbnbBadge>For Airbnb and VRBO hosts</ShynliAirbnbBadge>
              <ShynliAirbnbBadge>Guest-ready turnover support</ShynliAirbnbBadge>
            </div>
            <h1 className="max-w-4xl text-[clamp(3.6rem,8vw,8.6rem)] font-black leading-[0.84] tracking-normal">
              Shynli Airbnb Cleaning
            </h1>
            <p className="mt-6 max-w-3xl text-[clamp(1.7rem,3.4vw,4rem)] font-black leading-[0.94]">
              Airbnb turnovers before the next guest arrives.
            </p>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-[#717171]">
              Cleaning, linens, restocking, staging, and photo-confirmed handoff for hosts who cannot afford a missed check-in.
            </p>
            <div className="mt-8 grid max-w-3xl overflow-hidden rounded-[32px] border border-[#dddddd] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.14)] md:grid-cols-[1fr_0.86fr_0.78fr_auto] md:rounded-full">
              {[
                ["Where", "Listing ZIP"],
                ["When", "Next turnover"],
                ["Need", "Clean + linens"],
              ].map(([label, value]) => (
                <a key={label} href="#quote" className="min-h-16 border-b border-[#eeeeee] px-6 py-3 transition-colors hover:bg-[#f7f7f7] md:border-b-0 md:border-r">
                  <span className="block text-xs font-black">{label}</span>
                  <span className="mt-1 block text-sm font-bold text-[#717171]">{value}</span>
                </a>
              ))}
              <a href="#quote" className="grid min-h-16 place-items-center px-3">
                <span className="grid size-12 place-items-center rounded-full bg-[#ff385c] text-white">
                  <Search className="size-5" />
                </span>
              </a>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-[1.06fr_0.94fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#f7f7f7]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${airbnbSiteImages.hero})` }} aria-hidden="true" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-sm font-black shadow-[0_6px_24px_rgba(0,0,0,0.16)]">
                Guest-ready bedroom
              </div>
            </div>
            <div className="grid gap-2">
              <div className="relative min-h-[255px] overflow-hidden rounded-[28px] bg-[#f7f7f7]">
                <div className="absolute inset-0 bg-cover bg-[50%_44%]" style={{ backgroundImage: `url(${airbnbSiteImages.secondary})` }} aria-hidden="true" />
              </div>
              <div className="rounded-[28px] border border-[#dddddd] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
                <p className="text-sm font-black text-[#ff385c]">What hosts ask first</p>
                <div className="mt-4 grid gap-3">
              {airbnbSiteProof.map(([title, copy]) => (
                    <div key={title} className="border-t border-[#eeeeee] pt-3 first:border-t-0 first:pt-0">
                      <p className="text-lg font-black">{title}</p>
                      <p className="mt-1 text-xs font-bold leading-5 text-[#717171]">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="turnover" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 text-sm font-black text-[#ff385c]">For back-to-back bookings</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              The clean is only done when the next guest can walk in.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">
              Short-term rentals need more than a normal house clean. Timing, linens, supplies, staging, and proof all affect your next review.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {airbnbSitePillars.map(({ icon: Icon, eyebrow, title, copy }) => (
              <div key={title} className="min-h-72 rounded-[24px] border border-[#dddddd] bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
                <Icon className="size-7 text-[#ff385c]" />
                <p className="mt-8 text-xs font-black text-[#717171]">{eyebrow}</p>
                <h3 className="mt-3 text-3xl font-black leading-[1.02]">{title}</h3>
                <p className="mt-4 text-sm font-bold leading-6 text-[#717171]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div className="relative min-h-[620px] overflow-hidden rounded-[28px] bg-[#222222] text-white">
            <div
              className="absolute inset-0 bg-cover bg-[50%_58%] opacity-72"
              style={{ backgroundImage: `url(${airbnbSiteImages.window})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,34,34,0.05)_0%,rgba(34,34,34,0.38)_46%,rgba(34,34,34,0.92)_100%)]" />
            <div className="relative z-10 flex min-h-[620px] flex-col justify-end p-6 md:p-9">
              <p className="text-sm font-black text-[#ffb3c1]">The turnover window</p>
              <h2 className="mt-4 max-w-2xl text-5xl font-black leading-[0.92] md:text-7xl">
                Checkout at 11. Check-in at 3.
              </h2>
              <p className="mt-5 max-w-xl text-lg font-bold leading-8 text-white/74">
                When the window is tight, every detail needs to be known before the cleaner arrives.
              </p>
            </div>
          </div>
          <div className="grid gap-8">
            {airbnbSiteTimeline.map(([title, copy], index) => (
              <div key={title} className="grid grid-cols-[56px_1fr] gap-5 border-t border-[#dddddd] pt-7 first:border-t-0 first:pt-0">
                <span className="text-3xl font-black text-[#ff385c]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-3xl font-black">{title}</h3>
                  <p className="mt-3 text-base font-bold leading-7 text-[#717171]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="scope" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[0.76fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black text-[#ff385c]">What can be included</p>
              <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
                Cleaning, setup, and notes in one turnover.
              </h2>
            </div>
            <p className="text-lg font-bold leading-8 text-[#717171]">
              Choose what the property needs before the visit, then confirm what Shynli can support for the route, timing, and listing.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {airbnbSiteScope.map(([title, copy]) => (
              <div key={title} className="rounded-[24px] border border-[#dddddd] bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
                <h3 className="text-3xl font-black leading-tight">{title}</h3>
                <p className="mt-5 text-sm font-bold leading-6 text-[#717171]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="bg-[#222222] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-sm font-black text-[#ffb3c1]">After the cleaner leaves</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Know what happened without driving over.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-white/66">
              A quick handoff helps you catch low supplies, visible issues, and readiness questions before they turn into guest messages.
            </p>
            <div className="relative mt-8 min-h-72 overflow-hidden rounded-[28px] bg-white/8">
              <div className="absolute inset-0 bg-cover bg-center opacity-82" style={{ backgroundImage: `url(${airbnbSiteImages.proof})` }} aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(34,34,34,0.86),rgba(34,34,34,0))] p-5 pt-20">
                <p className="text-sm font-black text-white">Bathroom and towel check</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {airbnbSiteReportItems.map(([Icon, title, copy]) => (
              <div key={String(title)} className="min-h-56 rounded-[24px] border border-white/12 bg-white/7 p-6">
                <Icon className="size-7 text-[#ffb3c1]" />
                <h3 className="mt-7 text-2xl font-black">{String(title)}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-white/66">{String(copy)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-black text-[#ff385c]">Why hosts book</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Fewer surprises between guests.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {airbnbSiteCompetitorMoves.map(([name, move]) => (
              <div key={name} className="rounded-[24px] border border-[#dddddd] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
                <p className="text-sm font-black text-[#ff385c]">{name}</p>
                <p className="mt-3 text-xl font-black leading-tight">{move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-[#f7f7f7] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-black text-[#ff385c]">Check availability</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Start with the details that decide the clean.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">
              Send the ZIP, turnover date, guest times, and what you need handled. Shynli can confirm the route and scope before you rely on the booking.
            </p>
          </div>
          <Card className="rounded-[28px] border-[#dddddd] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.10)]">
            <CardContent className="p-5 md:p-6">
              <form action={buildQuoteUrl({ service: "airbnb-cleaning" })} method="get" className="grid gap-4" onSubmit={(event) => submitQuoteForm(event, { service: "airbnb-cleaning" })}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-black">
                    Listing ZIP
                    <Input name="zip" inputMode="numeric" placeholder="60540" className="h-12 rounded-full border-[#dddddd] bg-white font-bold" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Next turnover date
                    <Input name="date" type="date" className="h-12 rounded-full border-[#dddddd] bg-white font-bold" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-black">
                    Checkout time
                    <Input name="checkout_time" type="time" className="h-12 rounded-full border-[#dddddd] bg-white font-bold" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Check-in time
                    <Input name="checkin_time" type="time" className="h-12 rounded-full border-[#dddddd] bg-white font-bold" />
                  </label>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Cleaning", "Linens", "Restock"].map((item) => (
                    <button key={item} type="button" className="min-h-12 rounded-full border border-[#dddddd] bg-white px-3 text-sm font-black transition-colors first:border-[#ff385c] first:bg-[#ff385c] first:text-white hover:border-[#ff385c]">
                      {item}
                    </button>
                  ))}
                </div>
                <Button type="submit" className="h-13 rounded-full bg-[#ff385c] text-base font-black text-white shadow-none hover:bg-[#e31c5f]">
                  Check host availability
                  <ArrowRight />
                </Button>
                <p className="text-sm font-bold leading-6 text-[#717171]">
                  Final availability depends on location, timing, property size, linen needs, restocking, access, and whether the turnover window is realistic.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-[#dddddd] bg-[#f7f7f7] px-4 py-12 text-[#222222] md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.7fr]">
            <div>
              <a href="/shiny-airbnb-cleaning" className="flex min-h-11 items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#ff385c] text-white">
                  <KeyRound className="size-5" />
                </span>
                <span className="leading-none">
                  <span className="block text-xl font-black">Shynli Airbnb Cleaning</span>
                  <span className="mt-1 block text-sm font-black text-[#717171]">Turnovers for short-term rental hosts</span>
                </span>
              </a>
              <p className="mt-6 max-w-md text-base font-bold leading-7 text-[#717171]">
                Guest-ready cleaning, linens, restocking notes, and photo handoff for hosts who need the next check-in to feel calm.
              </p>
              <Button asChild className="mt-6 h-12 rounded-full bg-[#ff385c] px-6 font-black text-white shadow-none hover:bg-[#e31c5f]">
                <a href="#quote">
                  Check availability
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-black">Turnover help</h3>
                <div className="mt-4 grid gap-3 text-sm font-bold text-[#717171]">
                  <a href="#turnover" className="hover:text-[#222222]">Same-day windows</a>
                  <a href="#scope" className="hover:text-[#222222]">Cleaning scope</a>
                  <a href="#proof" className="hover:text-[#222222]">Photo handoff</a>
                  <a href="#quote" className="hover:text-[#222222]">Availability check</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black">Hosts ask</h3>
                <div className="mt-4 grid gap-3 text-sm font-bold text-[#717171]">
                  <a href="#turnover" className="hover:text-[#222222]">Can you make check-in?</a>
                  <a href="#scope" className="hover:text-[#222222]">Are linens included?</a>
                  <a href="#scope" className="hover:text-[#222222]">Can you restock supplies?</a>
                  <a href="#proof" className="hover:text-[#222222]">Will I get photos?</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black">Shynli</h3>
                <div className="mt-4 grid gap-3 text-sm font-bold text-[#717171]">
                  <a href="/" className="hover:text-[#222222]">Main Shynli site</a>
                  <a href="/services" className="hover:text-[#222222]">Cleaning services</a>
                  <a href="/service-areas" className="hover:text-[#222222]">Service areas</a>
                  <a href="/contact" className="hover:text-[#222222]">Contact</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-[#dddddd] pt-6 text-sm font-bold text-[#717171] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Shynli Airbnb Cleaning. A Shynli service concept.</p>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy" className="hover:text-[#222222]">Privacy</a>
              <a href="/terms" className="hover:text-[#222222]">Terms</a>
              <a href="/cancellation" className="hover:text-[#222222]">Cancellation</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
