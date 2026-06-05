import { ArrowRight, Check, ClipboardCheck, Home, KeyRound, MapPin, ShieldCheck, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { businessEmail, businessPhoneDisplay, businessPhoneHref, cityList, cityPages, cityRouteNotes, featuredServiceAreaCities, serviceAreaGroups } from "@/site/data"
import { buildQuoteUrl, submitQuoteForm, useSeoMeta } from "@/site/shared"

const shinyMoveOutCanonicalBase = "https://shynlimoveoutcleaning.com"

function isShynliMoveOutStandaloneHost() {
  if (typeof window === "undefined") {
    return false
  }

  return window.location.hostname === "shynlimoveoutcleaning.com" || window.location.hostname === "www.shynlimoveoutcleaning.com"
}

function getShynliMoveOutPath(slug?: string) {
  if (isShynliMoveOutStandaloneHost()) {
    return slug ? `${shinyMoveOutCanonicalBase}/${slug}` : `${shinyMoveOutCanonicalBase}/`
  }

  return slug ? `/shiny-move-out-cleaning/${slug}` : "/shiny-move-out-cleaning"
}

type MoveOutIntentSeed = {
  slug: string
  label: string
  keyword: string
  audience: string
  promise: string
  situation: string
  proof: string
}

export type ShynliMoveOutSeoPageData = {
  slug: string
  title: string
  meta: string
  eyebrow: string
  h1: string
  intro: string
  intentLabel: string
  keyword: string
  audience: string
  promise: string
  situation: string
  proof: string
  sections: { title: string; copy: string; bullets: string[] }[]
  faqs: [string, string][]
  relatedLinks: [string, string][]
}

export type ShynliMoveOutCityIntentPageData = ShynliMoveOutSeoPageData & {
  city: (typeof cityPages)[number]
  citySlug: string
  intentSlug: string
}

type MoveOutGuideSection = {
  title: string
  answer: string
  bullets: string[]
}

export type ShynliMoveOutGuidePageData = {
  slug: string
  title: string
  meta: string
  keywords: string[]
  eyebrow: string
  h1: string
  intro: string
  summary: string
  sections: MoveOutGuideSection[]
  faqs: [string, string][]
  relatedLinks: [string, string][]
}

const hubSeeds: MoveOutIntentSeed[] = [
  { slug: "move-out-cleaning", label: "Move-out cleaning", keyword: "move-out cleaning", audience: "renters, homeowners, landlords, and realtors", promise: "final walkthrough cleaning with clear scope, access notes, and after-clean photos", situation: "keys are due, furniture is gone, and every missed detail feels expensive", proof: "room notes, photos, and a covered follow-up path for included checklist items" },
  { slug: "move-in-cleaning", label: "Move-in cleaning", keyword: "move-in cleaning", audience: "buyers, renters, and families getting new keys", promise: "a cleaner start before boxes, furniture, and daily routines take over", situation: "the home is empty, dusty, or touched by the last occupant", proof: "arrival notes, room-by-room priorities, and visible cleaning scope before the visit" },
  { slug: "move-in-move-out-cleaning", label: "Move-in / move-out cleaning", keyword: "move-in and move-out cleaning", audience: "people changing homes on a tight calendar", promise: "empty-home cleaning for the window between old keys and new keys", situation: "the schedule has movers, access windows, and a deadline that cannot drift", proof: "checklist-based cleaning, access confirmation, and documented handoff" },
  { slug: "end-of-lease-cleaning", label: "End-of-lease cleaning", keyword: "end-of-lease cleaning", audience: "tenants preparing for landlord or property manager review", promise: "lease-ending cleaning focused on inspection areas and optional add-ons", situation: "the walkthrough is close and the apartment needs to feel ready", proof: "kitchen, bathroom, empty-room, cabinet, and appliance notes when selected" },
  { slug: "apartment-move-out-cleaning", label: "Apartment move-out cleaning", keyword: "apartment move-out cleaning", audience: "apartment renters and building residents", promise: "a compact, inspection-ready reset for apartments, condos, and high-access buildings", situation: "parking, elevators, lockboxes, and building rules can slow the clean", proof: "access notes, room photos, and a checklist shaped for apartments" },
  { slug: "house-move-out-cleaning", label: "House move-out cleaning", keyword: "house move-out cleaning", audience: "homeowners, sellers, and families leaving a house", promise: "whole-home empty-room cleaning after movers, packing dust, and handoff stress", situation: "baseboards, closets, bathrooms, kitchen surfaces, and floors are fully visible", proof: "room-by-room scope, optional appliance interiors, and final notes" },
  { slug: "condo-move-out-cleaning", label: "Condo move-out cleaning", keyword: "condo move-out cleaning", audience: "condo owners, renters, and agents", promise: "condo cleaning planned around access, parking, elevators, and final walkthroughs", situation: "shared buildings need cleaner instructions before arrival", proof: "building notes, lock-up instructions, and after-clean photos when requested" },
  { slug: "rental-cleaning", label: "Rental cleaning", keyword: "rental cleaning", audience: "renters, landlords, and property owners", promise: "rental cleaning for turnovers, move-outs, and new-tenant preparation", situation: "the home needs to move from lived-in to ready-to-show", proof: "clear checklist, add-on choices, and communication before and after the visit" },
  { slug: "rental-turnover-cleaning", label: "Rental turnover cleaning", keyword: "rental turnover cleaning", audience: "landlords and property managers", promise: "turnover cleaning that helps the next tenant see a cared-for home", situation: "there is a short window between one tenant leaving and another arriving", proof: "priority notes, empty-room reset, and documentation for remote owners" },
  { slug: "landlord-cleaning", label: "Landlord cleaning", keyword: "landlord cleaning", audience: "landlords and small portfolio owners", promise: "cleaning support for lease endings, vacant units, and new tenant preparation", situation: "you need the unit ready without chasing details by phone", proof: "scope confirmation, access handling, photos, and quoted extras" },
  { slug: "property-manager-cleaning", label: "Property manager cleaning", keyword: "property manager cleaning", audience: "property managers and leasing teams", promise: "repeatable cleaning for vacancies, turnovers, and listing refreshes", situation: "multiple units need consistent scope and simple communication", proof: "named checklist items, timing notes, and a follow-up route for covered misses" },
  { slug: "realtor-cleaning", label: "Realtor cleaning", keyword: "realtor cleaning", audience: "realtors, sellers, and listing teams", promise: "listing and pre-closing cleaning that helps the home show clean in person", situation: "buyers, photographers, and final walkthroughs notice dust and neglect quickly", proof: "priority-room focus, photo-ready surfaces, and a documented finish" },
  { slug: "move-out-cleaning-cost", label: "Move-out cleaning cost", keyword: "move-out cleaning cost", audience: "people comparing quotes before they book", promise: "a clear explanation of what changes price before the appointment is held", situation: "the same square footage can cost different amounts depending on condition", proof: "price factors, add-on notes, and scope boundaries stated upfront" },
  { slug: "move-out-cleaning-checklist", label: "Move-out cleaning checklist", keyword: "move-out cleaning checklist", audience: "renters, sellers, landlords, and realtors checking the scope", promise: "a practical checklist for empty rooms, kitchens, bathrooms, floors, and handoff", situation: "you want to know what will actually be cleaned", proof: "included tasks, quoted extras, and not-covered work separated clearly" },
  { slug: "move-out-cleaning-faq", label: "Move-out cleaning FAQ", keyword: "move-out cleaning FAQ", audience: "people with timing, deposit, access, and add-on questions", promise: "straight answers before the quote request", situation: "unclear promises create friction before move day", proof: "honest limits, covered follow-up details, and clear booking expectations" },
  { slug: "same-week-move-out-cleaning", label: "Same-week move-out cleaning", keyword: "same-week move-out cleaning", audience: "people who need help before a close deadline", promise: "fast quote review for open move-out windows", situation: "the move is already happening and the clean needs to fit the calendar", proof: "date, access, condition, and add-on details collected early" },
  { slug: "cleaning-before-selling-house", label: "Cleaning before selling a house", keyword: "cleaning before selling house", audience: "home sellers and listing agents", promise: "a cleaner listing presentation after packing, repairs, and foot traffic", situation: "photos, showings, and walkthroughs make every surface more noticeable", proof: "kitchen, bathroom, floor, baseboard, and priority-room focus" },
  { slug: "cleaning-after-moving-out", label: "Cleaning after moving out", keyword: "cleaning after moving out", audience: "people who already removed furniture and need the home finished", promise: "a final reset after boxes, movers, and dust reveal the real condition", situation: "empty rooms expose shelves, closets, baseboards, and floors", proof: "visible checklist, access notes, and optional appliance interiors" },
  { slug: "empty-apartment-cleaning", label: "Empty apartment cleaning", keyword: "empty apartment cleaning", audience: "renters, leasing teams, and apartment owners", promise: "a focused apartment reset after furniture and personal items are gone", situation: "the unit is empty enough for shelves, closets, floors, and baseboards to show every missed detail", proof: "apartment access notes, kitchen and bathroom checklist, and handoff photos when requested" },
  { slug: "deposit-cleaning", label: "Deposit cleaning", keyword: "deposit cleaning", audience: "renters preparing for a landlord or property manager walkthrough", promise: "cleaning that focuses on the areas renters are usually asked about during move-out", situation: "you want the apartment to look cared for without pretending cleaning alone controls the deposit decision", proof: "honest scope, optional add-ons, and a documented finish for included checklist items" },
  { slug: "cleaning-after-tenants", label: "Cleaning after tenants", keyword: "cleaning after tenants", audience: "landlords, property managers, and rental owners", promise: "vacant-rental cleaning after a tenant leaves and before the next showing or move-in", situation: "the unit needs to shift from lived-in to ready without a long repair-style process", proof: "priority-room notes, access handling, selected add-ons, and photos for remote owners" },
  { slug: "vacant-home-cleaning", label: "Vacant home cleaning", keyword: "vacant home cleaning", audience: "owners, sellers, realtors, landlords, and families between moves", promise: "cleaning for empty homes where every floor, closet, shelf, and bathroom is visible", situation: "the furniture is gone and the home needs one careful reset before the next person enters", proof: "room-by-room checklist, quote clarity, access notes, and lock-up confirmation" },
]

const hubLinkSeeds: [string, string][] = hubSeeds.slice(0, 12).map((seed) => [seed.label, seed.slug])

export const shinyMoveOutFeaturedSeoLinks = hubSeeds.map((seed) => [seed.label, seed.slug] as [string, string])

const articleDate = "2026-06-05"

export const shinyMoveOutGuideLinks: [string, string][] = [
  ["Move-out guides", "guides"],
  ["Landlord inspection details", "guides/landlord-move-out-cleaning-inspection"],
  ["Professional vs DIY move-out cleaning", "guides/do-you-need-professional-move-out-cleaning"],
  ["Why move-out cleaning costs more", "guides/why-move-out-cleaning-costs-more"],
  ["How long move-out cleaning takes", "guides/how-long-move-out-cleaning-takes"],
  ["Photos before turning in keys", "guides/move-out-cleaning-photos-before-keys"],
]

const guideArticleLinks = shinyMoveOutGuideLinks.slice(1)

function relatedGuideLinksForSlug(slug: string): [string, string][] {
  const intentSlug = slug.split("/").pop() ?? slug

  if (["landlord-cleaning", "deposit-cleaning", "end-of-lease-cleaning", "rental-turnover-cleaning", "property-manager-cleaning"].includes(intentSlug)) {
    return [
      ["What landlords notice", "guides/landlord-move-out-cleaning-inspection"],
      ["Photos before keys", "guides/move-out-cleaning-photos-before-keys"],
    ]
  }

  if (["move-out-cleaning-cost", "move-in-move-out-cleaning", "vacant-home-cleaning"].includes(intentSlug)) {
    return [
      ["Why move-out cleaning costs more", "guides/why-move-out-cleaning-costs-more"],
      ["How long move-out cleaning takes", "guides/how-long-move-out-cleaning-takes"],
    ]
  }

  if (["move-out-cleaning-checklist", "cleaning-after-moving-out"].includes(intentSlug)) {
    return [
      ["Photos before turning in keys", "guides/move-out-cleaning-photos-before-keys"],
      ["What landlords notice", "guides/landlord-move-out-cleaning-inspection"],
    ]
  }

  if (["move-out-cleaning", "apartment-move-out-cleaning", "move-out-cleaning-faq", "same-week-move-out-cleaning"].includes(intentSlug)) {
    return [
      ["Do you need professional cleaning?", "guides/do-you-need-professional-move-out-cleaning"],
      ["How long move-out cleaning takes", "guides/how-long-move-out-cleaning-takes"],
    ]
  }

  return [["Move-out cleaning guides", "guides"]]
}

function uniqueRelatedLinks(links: [string, string][]) {
  const seen = new Set<string>()
  return links.filter(([, slug]) => {
    if (seen.has(slug)) {
      return false
    }

    seen.add(slug)
    return true
  })
}

export const shinyMoveOutGuidePages: ShynliMoveOutGuidePageData[] = [
  {
    slug: "guides",
    title: "Move-Out Cleaning Guides | Shynli Move-Out Cleaning",
    meta: "Practical move-out cleaning guides for renters, landlords, sellers, property managers, and homeowners preparing for keys, walkthroughs, and quotes.",
    keywords: ["move-out cleaning guides", "move-out cleaning questions", "apartment move-out cleaning tips", "final walkthrough cleaning", "cleaning before turning in keys"],
    eyebrow: "Move-out guides",
    h1: "Move-out cleaning guides for the questions people ask before keys are due.",
    intro: "Move-out cleaning decisions usually happen when the apartment is empty, the clock is tight, and someone else will inspect the result. These guides answer the practical questions people ask before they book, clean, document the finish, or hand over keys.",
    summary: "Use this guide hub to compare cost, timing, landlord walkthrough details, professional cleaning decisions, and after-clean photos before starting a quote.",
    sections: [
      {
        title: "Start with the walkthrough question",
        answer: "If a landlord, buyer, realtor, or property manager will see the home after you leave, focus first on the details that are visible in an empty space: kitchens, bathrooms, floors, baseboards, doors, switches, shelves, closets, and appliance or cabinet interiors when selected.",
        bullets: ["Inspection details matter more when furniture is gone.", "Photos help when you cannot stay for the finish.", "Add-ons should be named before the cleaning window is held."],
      },
      {
        title: "Use the cost and timing guides before you compare quotes",
        answer: "Move-out cleaning is not priced like weekly maintenance because the home is empty, the deadline is real, and add-ons can change the appointment length quickly. Compare timing and cost factors before assuming two quotes cover the same work.",
        bullets: ["Size, bathrooms, condition, and access affect time.", "Ovens, fridges, cabinets, blinds, windows, and garages should be quoted clearly.", "Same-week jobs need cleaner access notes early."],
      },
      {
        title: "Keep the booking path close",
        answer: "Each article links back to the move-out service, cost, checklist, FAQ, deposit cleaning, and quote path so reading does not become a dead end. The goal is a clearer decision before a customer asks for a date.",
        bullets: ["Read the question.", "Confirm the scope.", "Start the move-out quote when the details are ready."],
      },
    ],
    faqs: [
      ["Are these guides a replacement for a quote?", "No. They explain the decisions that affect scope, timing, and price. A quote still needs property size, condition, access, date, and add-ons."],
      ["Can cleaning guarantee a deposit outcome?", "No. Cleaning can help the home look cared for and document covered work, but deposit decisions belong to landlords or property managers."],
      ["Which guide should I read first?", "If keys are due soon, start with the landlord inspection guide. If you are comparing prices, start with the cost and timing guides."],
    ],
    relatedLinks: [
      ["Move-out cleaning", "move-out-cleaning"],
      ["Move-out cleaning cost", "move-out-cleaning-cost"],
      ["Move-out cleaning checklist", "move-out-cleaning-checklist"],
      ["Move-out cleaning FAQ", "move-out-cleaning-faq"],
      ["Deposit cleaning", "deposit-cleaning"],
      ...guideArticleLinks,
    ],
  },
  {
    slug: "guides/landlord-move-out-cleaning-inspection",
    title: "What Landlords Notice During Move-Out Cleaning | Shynli",
    meta: "See the rooms and details landlords often notice during a move-out walkthrough, from kitchens and bathrooms to floors, doors, cabinets, and photos.",
    keywords: ["move-out cleaning inspection", "landlord walkthrough cleaning", "apartment move-out cleaning", "final walkthrough cleaning", "security deposit cleaning"],
    eyebrow: "Landlord walkthrough",
    h1: "What landlords actually notice during a move-out cleaning inspection.",
    intro: "A landlord walkthrough usually happens after the home is empty, which means small details become easier to see. The goal is not to make promises about a deposit. The goal is to understand what people tend to notice so the clean, add-ons, and photos are planned before keys are due.",
    summary: "Landlords often notice kitchens, bathrooms, floors, baseboards, doors, switches, shelves, closets, and appliance or cabinet interiors when those extras were expected.",
    sections: [
      {
        title: "Kitchens show the most obvious handoff details",
        answer: "Kitchens get inspected closely because they hold grease, crumbs, fingerprints, cabinet marks, sink buildup, and appliance questions in one place. A surface wipe is often not enough if the renter or owner also expects the inside of the oven, fridge, or cabinets to look move-out ready.",
        bullets: ["Countertops, sink, faucet, backsplash, and exterior appliances", "Cabinet fronts, handles, shelves, and drawers when selected", "Oven, fridge, microwave, and dishwasher edges when quoted as add-ons"],
      },
      {
        title: "Bathrooms make condition feel personal",
        answer: "Bathrooms are small, bright, and easy to judge quickly. Sinks, mirrors, toilets, tubs, showers, floor edges, baseboards, and cabinet areas can make the difference between a home feeling cared for or rushed.",
        bullets: ["Toilet, tub, shower, sink, mirror, fixtures, and floor edges", "Hair, soap residue, dust, and fingerprints around high-touch areas", "Vanity fronts and interiors when cabinet interiors are part of the scope"],
      },
      {
        title: "Empty rooms expose floors, baseboards, and doors",
        answer: "Furniture hides a lot during a lease. Once the room is empty, dust lines, baseboards, door marks, switch plates, closet shelves, and floor edges are easier to notice. This is why move-out cleaning should happen after boxes and large items are gone whenever possible.",
        bullets: ["Baseboards, corners, doors, switches, vents, and closet shelves", "Vacuuming and mopping after movers are finished", "Photos of finished rooms when the customer cannot stay on site"],
      },
      {
        title: "Photos help document what cleaning can control",
        answer: "Photos do not decide a deposit, but they can show the condition after included cleaning tasks are finished. They are especially useful when the renter has already left, the landlord is remote, or a property manager reviews the unit later.",
        bullets: ["Wide photos of each room after the clean", "Close photos of selected add-ons like appliances or cabinets", "A clear note that cleaning does not control damage, repairs, or landlord judgment"],
      },
    ],
    faqs: [
      ["Can move-out cleaning guarantee my deposit?", "No. Cleaning can address covered scope and document the finish, but a deposit decision may include damage, repairs, lease terms, paint, carpet, or landlord judgment."],
      ["Should I book before or after movers leave?", "After movers leave is best. Empty rooms expose the surfaces, floors, shelves, and baseboards that matter during a walkthrough."],
      ["Do landlords check inside appliances and cabinets?", "Many do when those areas are part of the lease expectations. Tell the cleaner before booking if you want fridge, oven, or cabinet interiors included."],
    ],
    relatedLinks: [
      ["Landlord cleaning", "landlord-cleaning"],
      ["Deposit cleaning", "deposit-cleaning"],
      ["End-of-lease cleaning", "end-of-lease-cleaning"],
      ["Move-out cleaning checklist", "move-out-cleaning-checklist"],
      ["Photos before turning in keys", "guides/move-out-cleaning-photos-before-keys"],
      ["Move-out cleaning", "move-out-cleaning"],
    ],
  },
  {
    slug: "guides/do-you-need-professional-move-out-cleaning",
    title: "Do You Need Professional Move-Out Cleaning? | Shynli",
    meta: "Learn when a professional move-out clean is worth it, when DIY may be enough, and what to prepare before keys, walkthroughs, or listing photos.",
    keywords: ["professional move-out cleaning", "hire move-out cleaner", "move-out cleaning service", "apartment move-out cleaning", "cleaning after moving out"],
    eyebrow: "Professional or DIY",
    h1: "Do you need professional move-out cleaning before turning in keys?",
    intro: "Professional move-out cleaning is most useful when the home is empty, the deadline is close, and someone else will judge the result after you leave. DIY can work for a light apartment with enough time. The decision depends on condition, expectations, access, and how much risk you want to carry during move week.",
    summary: "Hire professional move-out cleaning when time is tight, the home is empty, inspection matters, or add-ons like ovens, fridges, cabinets, and detailed bathrooms need more time than you have.",
    sections: [
      {
        title: "DIY can be enough for a light, simple move-out",
        answer: "If the apartment is small, lightly used, already empty, and you have time after movers leave, DIY cleaning may be enough. It works best when the landlord expectations are simple and you are comfortable handling kitchens, bathrooms, floors, shelves, closets, and final trash yourself.",
        bullets: ["Small space with light condition", "No heavy grease, buildup, pet hair, or appliance interiors", "Enough time to clean after furniture and boxes are gone"],
      },
      {
        title: "Professional cleaning helps when timing is the problem",
        answer: "Most people hire a move-out cleaner because the cleaning window is squeezed between movers, work, closing dates, lease deadlines, and key return. A professional visit gives the clean a defined scope and helps prevent a rushed finish when you are already focused on the next address.",
        bullets: ["Keys are due soon", "You cannot stay until the final walkthrough", "You need after-clean notes or photos for peace of mind"],
      },
      {
        title: "Add-ons change the decision",
        answer: "Inside ovens, fridges, cabinets, interior windows, blinds, and garages take time. If those areas matter for your lease, sale, or handoff, they should be quoted before the appointment. That is where professional cleaning often becomes more practical than hoping there is enough energy left after moving.",
        bullets: ["Oven, fridge, and cabinet interiors", "Heavy bathrooms or kitchen buildup", "Large houses, multiple bathrooms, stairs, and long floor work"],
      },
      {
        title: "Prepare the home before the cleaner arrives",
        answer: "Professional cleaning works best when personal items, trash, and large furniture are gone. Access, parking, gate codes, elevators, pets, utilities, and lock-up instructions should be clear before the visit so the cleaning time goes to the home instead of logistics.",
        bullets: ["Remove belongings and trash", "Confirm utilities and access", "List add-ons and walkthrough priorities before booking"],
      },
    ],
    faqs: [
      ["Is professional move-out cleaning required?", "Not always. It depends on the lease, property condition, time available, and expectations for the final walkthrough."],
      ["Can I clean before movers finish?", "You can start some areas, but the final clean is strongest after movers leave because floors, baseboards, closets, and shelves are fully visible."],
      ["What if I only need help with bathrooms and kitchen?", "Say that before the quote. A focused scope can be easier to price than a vague whole-home request."],
    ],
    relatedLinks: [
      ["Move-out cleaning", "move-out-cleaning"],
      ["Apartment move-out cleaning", "apartment-move-out-cleaning"],
      ["Cleaning after moving out", "cleaning-after-moving-out"],
      ["Move-out cleaning FAQ", "move-out-cleaning-faq"],
      ["How long move-out cleaning takes", "guides/how-long-move-out-cleaning-takes"],
      ["Move-out cleaning cost", "move-out-cleaning-cost"],
    ],
  },
  {
    slug: "guides/why-move-out-cleaning-costs-more",
    title: "Why Move-Out Cleaning Costs More | Shynli",
    meta: "Move-out cleaning often costs more than regular cleaning because the home is empty, details are exposed, and add-ons like ovens, cabinets, and windows take time.",
    keywords: ["why move-out cleaning costs more", "move-out cleaning cost", "regular cleaning vs move-out cleaning", "empty home cleaning cost", "cleaning quote factors"],
    eyebrow: "Cost factors",
    h1: "Why move-out cleaning usually costs more than regular cleaning.",
    intro: "Move-out cleaning can look simple because the home is empty. In practice, empty rooms reveal more detail, the deadline is tighter, and the scope often includes areas that regular cleaning skips. A fair quote should explain those differences before the appointment is held.",
    summary: "Move-out cleaning costs more when the home needs detailed empty-room work, heavier bathrooms or kitchens, appliance interiors, cabinet interiors, access planning, and a tighter handoff window.",
    sections: [
      {
        title: "Regular cleaning maintains a lived-in home",
        answer: "Regular cleaning usually works around furniture, personal items, and a familiar routine. It focuses on keeping the home comfortable week to week. Move-out cleaning is different because the home is being prepared for someone else to inspect, rent, buy, or enter for the first time.",
        bullets: ["Regular cleaning works around belongings", "Move-out cleaning works after belongings are removed", "The finish is judged by a landlord, buyer, manager, or next occupant"],
      },
      {
        title: "Empty rooms expose hidden detail",
        answer: "Once furniture is gone, dust lines, baseboards, door marks, closet shelves, cabinet edges, vents, and floor corners become obvious. The cleaner may need to cover more visible surface area than in a normal maintenance visit.",
        bullets: ["Baseboards, closet shelves, and floor edges", "Doors, switches, vents, and cabinet fronts", "Vacuuming and mopping after movers leave"],
      },
      {
        title: "Add-ons can be the real price driver",
        answer: "Fridge interiors, oven interiors, cabinet interiors, interior windows, blinds, garages, and heavy buildup can add meaningful time. Two homes with the same number of bedrooms can need very different quotes if one has a clean kitchen and the other needs detailed appliance work.",
        bullets: ["Inside fridge, oven, and cabinets", "Interior windows, blinds, garage, or extra detail work", "Heavy grease, dust, pet hair, or soap buildup"],
      },
      {
        title: "Access and deadline also matter",
        answer: "Parking, lockboxes, elevators, gate codes, utilities, pets, remote lock-up, and same-week timing can affect the appointment. Clear access notes reduce wasted time and help the quote match the real handoff window.",
        bullets: ["Apartment buildings need parking and entry instructions", "Remote customers need lock-up and photo expectations", "Same-week dates should be confirmed before relying on the slot"],
      },
    ],
    faqs: [
      ["Is move-out cleaning always more expensive?", "Not always. A small, lightly used apartment may be straightforward. The price rises when condition, size, add-ons, or timing require more work."],
      ["Why does an empty home take longer?", "Empty rooms make shelves, closets, baseboards, floors, and corners more visible. Those details are often not part of a quick regular clean."],
      ["Can I lower the price?", "You can help by removing belongings and trash, confirming access, naming add-ons clearly, and sharing honest condition notes before the quote."],
    ],
    relatedLinks: [
      ["Move-out cleaning cost", "move-out-cleaning-cost"],
      ["Move-out cleaning", "move-out-cleaning"],
      ["Move-in / move-out cleaning", "move-in-move-out-cleaning"],
      ["Vacant home cleaning", "vacant-home-cleaning"],
      ["How long move-out cleaning takes", "guides/how-long-move-out-cleaning-takes"],
      ["Move-out cleaning checklist", "move-out-cleaning-checklist"],
    ],
  },
  {
    slug: "guides/how-long-move-out-cleaning-takes",
    title: "How Long Does Move-Out Cleaning Take? | Shynli",
    meta: "Understand how long move-out cleaning can take based on home size, condition, bathrooms, add-ons, access, and whether the home is empty.",
    keywords: ["how long does move-out cleaning take", "move-out cleaning time", "apartment move-out cleaning time", "house move-out cleaning", "cleaning after movers"],
    eyebrow: "Timing",
    h1: "How long does move-out cleaning take after the home is empty?",
    intro: "Move-out cleaning time depends less on the label and more on what the cleaner can actually access. Size, bathrooms, condition, appliances, cabinets, floors, parking, building access, and whether movers are finished all affect the cleaning window.",
    summary: "A small, light apartment can be much faster than a large house or heavy rental turnover, especially when appliance interiors, cabinets, blinds, windows, or garage areas are included.",
    sections: [
      {
        title: "The home should be empty or mostly empty",
        answer: "Cleaning goes faster and looks better when large items, boxes, trash, and personal belongings are removed before the visit. If movers are still working, floors, shelves, closets, and baseboards may need to wait or be repeated.",
        bullets: ["Remove trash and personal items first", "Schedule after movers when possible", "Confirm utilities are still on"],
      },
      {
        title: "Bathrooms and kitchens shape the schedule",
        answer: "Bathrooms and kitchens usually take the most focused time because they collect grease, soap residue, hair, fingerprints, and buildup. A home with three bathrooms and appliance interiors will not fit the same window as a light studio apartment.",
        bullets: ["Number of bathrooms", "Kitchen condition and appliance interiors", "Cabinet interiors, shelves, and detailed surfaces"],
      },
      {
        title: "Access can save or waste time",
        answer: "Parking, elevator reservations, gate codes, lockboxes, pets, and lock-up instructions can quietly change the appointment. The smoother the access, the more time stays focused on cleaning instead of coordination.",
        bullets: ["Parking and building entry", "Elevator or stair instructions", "Lockbox, gate, pets, and final lock-up notes"],
      },
      {
        title: "Photos and final notes need a few extra minutes",
        answer: "If you want after-clean photos, room notes, or remote handoff confirmation, include that in the request. It is worth planning because many move-out customers cannot be there when the cleaner finishes.",
        bullets: ["Wide photos of finished rooms", "Close photos for selected add-ons", "Lock-up confirmation for remote handoffs"],
      },
    ],
    faqs: [
      ["Can you clean while movers are still there?", "It is possible in some cases, but the best finish usually happens after movers leave and the rooms are accessible."],
      ["What makes a move-out clean take longer?", "Heavy condition, multiple bathrooms, appliance interiors, cabinet interiors, blinds, interior windows, pet hair, stairs, parking issues, and unclear access can all add time."],
      ["Do I need to stay during the cleaning?", "Usually no, if access, utilities, parking, lock-up instructions, and contact details are clear before the visit."],
    ],
    relatedLinks: [
      ["Move-out cleaning", "move-out-cleaning"],
      ["Same-week move-out cleaning", "same-week-move-out-cleaning"],
      ["Apartment move-out cleaning", "apartment-move-out-cleaning"],
      ["Why move-out cleaning costs more", "guides/why-move-out-cleaning-costs-more"],
      ["Do you need professional cleaning?", "guides/do-you-need-professional-move-out-cleaning"],
      ["Move-out cleaning cost", "move-out-cleaning-cost"],
    ],
  },
  {
    slug: "guides/move-out-cleaning-photos-before-keys",
    title: "Move-Out Cleaning Photos Before Turning In Keys | Shynli",
    meta: "Know which photos to take after move-out cleaning, how to document rooms and add-ons, and why photos help when you cannot stay for the walkthrough.",
    keywords: ["move-out cleaning photos", "document apartment cleaning", "turning in keys cleaning", "move-out walkthrough photos", "security deposit cleaning photos"],
    eyebrow: "Photo handoff",
    h1: "Move-out cleaning photos to take before turning in keys.",
    intro: "Photos are not a legal guarantee and they do not decide a deposit. They are still useful because they show the condition after cleaning, especially when the customer cannot stay for the final walkthrough or the landlord reviews the home later.",
    summary: "Take wide photos of every finished room, close photos of selected add-ons, and clear photos of kitchens, bathrooms, floors, closets, doors, and any areas that were discussed before the clean.",
    sections: [
      {
        title: "Start with wide room photos",
        answer: "Wide photos show that the room was empty, cleaned, and ready for handoff. Stand near the doorway or corner and capture the main floor, walls, windows, closets, and entry points without zooming too tightly.",
        bullets: ["Living areas, bedrooms, hallways, and closets", "Kitchen and bathroom from the doorway", "Entry, stairs, laundry area, and any high-traffic rooms"],
      },
      {
        title: "Document kitchens and bathrooms carefully",
        answer: "Kitchens and bathrooms are the rooms people tend to judge fastest. Take clear photos of counters, sinks, fixtures, toilets, tubs, showers, floors, mirrors, appliance exteriors, and any selected interior add-ons.",
        bullets: ["Sink, counters, fixtures, mirrors, toilet, tub, and shower", "Oven, fridge, and cabinet interiors when included", "Floor edges, baseboards, and high-touch areas"],
      },
      {
        title: "Photograph add-ons separately",
        answer: "If the quote included appliance interiors, cabinet interiors, blinds, interior windows, garage areas, or other extras, photograph those areas separately. A wide room photo usually will not show whether a selected add-on was finished.",
        bullets: ["Inside fridge and oven", "Cabinet shelves and drawers", "Interior windows, blinds, garage, or special request areas"],
      },
      {
        title: "Keep the photos organized by room",
        answer: "Photos are easier to use when they are grouped by room and taken right after cleaning. If there is a question later, organized photos make it simpler to show what was cleaned and what was outside the cleaning scope.",
        bullets: ["Take photos before returning keys", "Save them in room order", "Do not use photos to hide damage, repairs, or lease issues"],
      },
    ],
    faqs: [
      ["Do photos guarantee my deposit?", "No. Photos can document cleaning condition, but deposit decisions may include damage, repairs, lease rules, and landlord judgment."],
      ["Should I photograph every room?", "Yes, if the home is empty. Wide photos of each room plus close photos of selected add-ons create the clearest record."],
      ["Can Shynli provide after-clean photos?", "Photos can be requested as part of the handoff. Mention that before the visit so the cleaner knows what you need documented."],
    ],
    relatedLinks: [
      ["Move-out cleaning checklist", "move-out-cleaning-checklist"],
      ["Deposit cleaning", "deposit-cleaning"],
      ["Cleaning after moving out", "cleaning-after-moving-out"],
      ["What landlords notice", "guides/landlord-move-out-cleaning-inspection"],
      ["Move-out cleaning FAQ", "move-out-cleaning-faq"],
      ["Move-out cleaning", "move-out-cleaning"],
    ],
  },
]

function sentenceStart(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

function makeHubPage(seed: MoveOutIntentSeed): ShynliMoveOutSeoPageData {
  return {
    slug: seed.slug,
    title: `${seed.label} | Shynli Move-Out Cleaning`,
    meta: `${seed.label} for Chicagoland suburbs with checklist-based scope, access notes, add-on clarity, after-clean photos, and a fast quote path.`,
    eyebrow: seed.label,
    h1: `${seed.label} for the last walkthrough.`,
    intro: `${sentenceStart(seed.keyword)} takes pressure off the move, not add one more vague appointment to a packed week. Shynli Move-Out Cleaning helps ${seed.audience} with ${seed.promise}. The visit is shaped by the real moment: ${seed.situation}. Share the property type, condition, access notes, priorities, and add-ons first so the cleaner arrives ready for the rooms that matter most.`,
    intentLabel: seed.label,
    keyword: seed.keyword,
    audience: seed.audience,
    promise: seed.promise,
    situation: seed.situation,
    proof: seed.proof,
    sections: [
      {
        title: "What this clean helps you finish",
        copy: `The pressure is usually timing, access, and final condition. The goal is not just a cleaner room. The goal is a home that feels ready for the next person who walks in, with the obvious inspection areas handled before they become a problem.`,
        bullets: ["Empty-room surfaces, shelves, closets, doors, switches, and baseboards", "Kitchen and bathroom reset with selected cabinet or appliance interiors", "Floors vacuumed and mopped after furniture and boxes are gone", "Access, parking, elevator, lockbox, gate, pet, and utility notes collected before arrival"],
      },
      {
        title: "Why the price depends on the home",
        copy: `The right price depends on the size of the home, the condition after the move, the number of bathrooms, the time window, and the add-ons requested. Shynli asks for those details before booking so a small apartment, a heavy rental turnover, and a listing clean are not treated like the same job.`,
        bullets: ["Home size and property type", "Light, normal, or heavy condition after moving", "Fridge, oven, cabinet, window, blind, and garage requests", "Same-week timing, remote access, pets, and parking instructions"],
      },
      {
        title: "What you can see after the clean",
        copy: `The finish matters because many people cannot stay on site until the end. The handoff can include ${seed.proof}. That makes the service easier to trust for renters, sellers, landlords, realtors, and property managers who need a clear finish instead of a silent appointment.`,
        bullets: ["Room notes for key areas", "After-clean photos when requested", "Lock-up and access confirmation", "A simple route for covered missed checklist items"],
      },
      {
        title: "When to choose this service",
        copy: `${seed.label} works best when the home is empty or mostly empty and you can share priorities before the crew arrives. The clearer the condition notes, the better the appointment can be timed around the deadline.`,
        bullets: ["Lease endings and final walkthroughs", "Move-in windows before furniture arrives", "Listing preparation and pre-closing cleanup", "Vacant rentals, condos, townhomes, and houses"],
      },
    ],
    faqs: [
      ["Can you guarantee a deposit or sale outcome?", "No. Shynli can stand behind the covered cleaning scope and the follow-up path for included missed items, but deposit decisions, buyer opinions, and property manager judgments are outside the cleaner's control."],
      ["Does the home need to be empty?", "An empty or mostly empty home is best for move-out work. Personal items, trash, and large furniture should be removed before the visit so shelves, closets, floors, and baseboards are accessible."],
      ["Are fridge, oven, and cabinet interiors included?", "They should be selected or quoted before the visit. Calling them out early protects the appointment time and keeps the scope clear."],
      ["Can you clean when I am not there?", "Usually yes, as long as access, parking, utilities, pets, lock-up, and contact details are provided before the visit."],
    ],
    relatedLinks: hubLinkSeeds.filter(([, slug]) => slug !== seed.slug).slice(0, 8),
  }
}

export const shinyMoveOutSeoPages = hubSeeds.map(makeHubPage)

const mediumIntentSeeds: MoveOutIntentSeed[] = [
  { slug: "move-in-move-out-cleaning", label: "Move-in / move-out cleaning", keyword: "move-in and move-out cleaning", audience: "renters, buyers, sellers, landlords, and realtors", promise: "empty-home cleaning before keys change hands", situation: "one home is ending, another is starting, and timing is tight", proof: "access notes, room checklist, after-clean photos, and a covered follow-up path" },
  { slug: "apartment-move-out-cleaning", label: "Apartment move-out cleaning", keyword: "apartment move-out cleaning", audience: "renters, apartment residents, and leasing teams", promise: "apartment cleaning shaped around inspections, elevators, parking, and access", situation: "the apartment needs to feel ready before the walkthrough", proof: "kitchen, bathroom, empty-room, floor, and lock-up notes" },
  { slug: "move-in-cleaning", label: "Move-in cleaning", keyword: "move-in cleaning", audience: "buyers, renters, and families getting new keys", promise: "a cleaner start before boxes, furniture, and daily routines take over", situation: "the home is empty, dusty, or touched by the last occupant", proof: "arrival notes, room-by-room priorities, and visible cleaning scope before the visit" },
  { slug: "house-move-out-cleaning", label: "House move-out cleaning", keyword: "house move-out cleaning", audience: "homeowners, sellers, and families leaving a house", promise: "whole-home empty-room cleaning after movers, packing dust, and handoff stress", situation: "baseboards, closets, bathrooms, kitchen surfaces, and floors are fully visible", proof: "room-by-room scope, optional appliance interiors, and final notes" },
  { slug: "condo-move-out-cleaning", label: "Condo move-out cleaning", keyword: "condo move-out cleaning", audience: "condo owners, renters, and agents", promise: "condo cleaning planned around access, parking, elevators, and final walkthroughs", situation: "shared buildings need cleaner instructions before arrival", proof: "building notes, lock-up instructions, and after-clean photos when requested" },
]

const lowIntentSeeds: MoveOutIntentSeed[] = [
  { slug: "move-out-cleaning-cost", label: "Move-out cleaning cost", keyword: "move-out cleaning cost", audience: "people comparing prices", promise: "a clear quote based on the real condition of the home", situation: "price depends on size, bathrooms, access, add-ons, and timing", proof: "named price factors and selected extras before booking" },
  { slug: "move-out-cleaning-checklist", label: "Move-out cleaning checklist", keyword: "move-out cleaning checklist", audience: "people checking what should be covered", promise: "a visible checklist for empty rooms, kitchens, bathrooms, and floors", situation: "the walkthrough is close and unclear scope creates stress", proof: "included work, quoted extras, and not-covered work separated clearly" },
  { slug: "end-of-lease-cleaning", label: "End-of-lease cleaning", keyword: "end-of-lease cleaning", audience: "tenants and landlords", promise: "lease-ending cleaning focused on inspection-ready rooms", situation: "keys are due and the unit needs one last reset", proof: "room notes, add-on choices, and after-clean photos when requested" },
  { slug: "rental-turnover-cleaning", label: "Rental turnover cleaning", keyword: "rental turnover cleaning", audience: "landlords and property managers", promise: "vacant-unit cleaning between tenants", situation: "the next tenant, listing, or showing is coming soon", proof: "priority notes, access handling, and documentation for remote owners" },
  { slug: "landlord-cleaning", label: "Landlord cleaning", keyword: "landlord cleaning", audience: "landlords and rental owners", promise: "cleaning support for move-outs and vacant rentals", situation: "the unit needs to be reset without long back-and-forth", proof: "scope confirmation, access notes, optional add-ons, and photos" },
  { slug: "cleaning-before-selling-house", label: "Cleaning before selling a house", keyword: "cleaning before selling house", audience: "home sellers and realtors", promise: "a cleaner presentation before photos, showings, or final walkthroughs", situation: "packing, repairs, and movers leave visible dust behind", proof: "priority-room focus and a documented finish" },
]

export const shinyMoveOutAllCityIntentLinks = mediumIntentSeeds.map((seed) => [seed.label, seed.slug] as [string, string])
export const shinyMoveOutPriorityCityIntentLinks = lowIntentSeeds.map((seed) => [seed.label, seed.slug] as [string, string])

const cityMoveOutProfiles: Record<string, { housing: string; access: string; timing: string; localProof: string; route: string }> = {
  naperville: {
    housing: "larger single-family homes, townhomes near commuter routes, downtown apartments, and family moves around busy school calendars",
    access: "driveway parking, garage codes, townhome stairs, HOA instructions, and lockbox handoffs near the Riverwalk and Route 59 corridor",
    timing: "often tied to closing dates, weekend movers, and new-owner walkthroughs where kitchens, bathrooms, baseboards, and entry floors need to look finished",
    localProof: "photos are especially useful when the seller has already left Naperville or the realtor is coordinating the last walkthrough remotely",
    route: "Aurora, Warrenville, Lisle, and Plainfield",
  },
  aurora: {
    housing: "Fox Valley apartments, older homes, newer subdivisions, townhomes, and rental turnovers with very different room counts and access needs",
    access: "street parking, garage entry, building doors, pet notes, utility status, and lockbox instructions around broad east-west routes",
    timing: "often depends on apartment inspections, lease-end windows, and seller moves where the final clean must happen after boxes and movers leave",
    localProof: "clear room notes help when an Aurora renter, seller, or owner is juggling a landlord, property manager, or buyer on the same day",
    route: "Naperville, North Aurora, Batavia, and Sugar Grove",
  },
  plainfield: {
    housing: "suburban houses, townhomes, basement layouts, newer developments, and family moves where floors and bathrooms carry heavy move-week traffic",
    access: "driveway access, garage codes, subdivision parking, pet notes, and late-day lock-up instructions",
    timing: "usually follows movers, donation pickups, or listing prep, so the quote needs to know whether the home is fully empty or still in transition",
    localProof: "after-clean photos help sellers and families who are already on the next move but still need a clean handoff in Plainfield",
    route: "Oswego, Naperville, Bolingbrook, and Romeoville",
  },
  oswego: {
    housing: "single-family homes, rentals near growing subdivisions, townhomes, and move-in windows before furniture arrives",
    access: "driveways, garage entry, pet instructions, utility notes, and lockbox handoffs for people who cannot stay on site",
    timing: "often connects to school-year moves, new construction handoffs, and lease endings where dust, floors, and bathrooms need a final reset",
    localProof: "Oswego move-outs feel calmer when rooms and add-ons are named before the cleaner arrives",
    route: "Plainfield, Montgomery, Yorkville, and Aurora",
  },
  bolingbrook: {
    housing: "condos, townhomes, apartments, and houses near major commute routes, with move-out jobs ranging from compact units to full family homes",
    access: "parking instructions, elevator or stair notes, garage codes, lockbox details, pets, and building access timing",
    timing: "often needs a tight same-week window after movers leave and before keys, inspections, or listing photos",
    localProof: "people in Bolingbrook benefit from a quote that separates apartment access, house-size scope, appliance interiors, and lock-up notes",
    route: "Plainfield, Woodridge, Naperville, and Romeoville",
  },
  lisle: {
    housing: "condos, apartments, townhomes, and homes near I-88 where access instructions can matter as much as the cleaning checklist",
    access: "building entry, elevator notes, garage access, parking limits, pets, and lock-up instructions for remote handoffs",
    timing: "often involves commuter schedules, condo turnovers, and move-in cleaning before boxes arrive",
    localProof: "the Lisle visit should feel easy to coordinate even when you are already between addresses",
    route: "Naperville, Downers Grove, Glen Ellyn, and Woodridge",
  },
  warrenville: {
    housing: "townhomes, apartments, and single-family homes where empty-room floors, closets, bathrooms, and kitchens become visible after the move",
    access: "driveway or lot parking, garage entry, pets, lockboxes, and utility notes that keep a smaller local route on schedule",
    timing: "often fits between closing dates, apartment walkthroughs, and family moves around the I-88 corridor",
    localProof: "Warrenville handoffs need clear finish notes because people may be coordinating nearby movers and cleaners on the same day",
    route: "Naperville, Wheaton, Winfield, and Aurora",
  },
  "downers-grove": {
    housing: "older homes, downtown apartments, condos, and family houses where trim, baseboards, bathrooms, and entry areas can show move-week dust",
    access: "street parking, alley or driveway notes, condo access, lockboxes, pets, and utility status before arrival",
    timing: "often tied to realtor schedules, final walkthroughs, and commuter-friendly appointment windows",
    localProof: "Downers Grove quotes often need listing prep, buyer walkthrough timing, and older-home detail work named clearly",
    route: "Lisle, Westmont, Woodridge, and Hinsdale",
  },
  "north-aurora": {
    housing: "houses, townhomes, and Fox River area rentals where the move-out clean may follow a longer family move",
    access: "driveway access, garage notes, pets, lockboxes, and utility confirmation before empty-room work begins",
    timing: "often connects to Aurora and Batavia routes, so the handoff should be specific about date, condition, and add-ons",
    localProof: "North Aurora renters, sellers, and owners need simple proof when they cannot return after the cleaner locks up",
    route: "Aurora, Batavia, Geneva, and Sugar Grove",
  },
  "sugar-grove": {
    housing: "larger homes, rentals, and move-in windows where dust, floors, garages, and appliance add-ons can change appointment time",
    access: "driveway parking, garage or lockbox entry, pet notes, utility status, and longer route timing",
    timing: "often depends on closing windows and family moves where you may already be out of the area",
    localProof: "Sugar Grove quote notes work best when they are practical and detailed because the route is less compact than a dense apartment area",
    route: "Aurora, North Aurora, Yorkville, and Montgomery",
  },
  yorkville: {
    housing: "newer homes, townhomes, rentals, and family move-outs where kitchens, bathrooms, closets, and floors need a clear final reset",
    access: "driveway access, subdivision instructions, garage codes, pets, utilities, and lock-up directions",
    timing: "often follows movers or closing-day pressure, so selected add-ons should be known before the appointment",
    localProof: "Yorkville handoffs work best when photos and room notes confirm the finish for someone who has already left",
    route: "Oswego, Montgomery, Sugar Grove, and Plainfield",
  },
  montgomery: {
    housing: "apartments, townhomes, rentals, and houses between Aurora and Oswego service routes",
    access: "parking, garage codes, lockboxes, pet notes, building entry, and utility details that prevent delays",
    timing: "often fits between lease endings, family moves, and quick rental resets",
    localProof: "Montgomery requests should clarify whether the clean is for an apartment handoff, house move-out, rental turnover, or move-in reset",
    route: "Aurora, Oswego, Yorkville, and North Aurora",
  },
}

function getMoveOutCityProfile(city: (typeof cityPages)[number]) {
  return cityMoveOutProfiles[city.slug] ?? {
    housing: `${city.name} apartments, condos, townhomes, rentals, and houses with different move-out checklists`,
    access: "parking, lockbox, gate, elevator, pet, garage, and utility notes before arrival",
    timing: "lease endings, listing preparation, final walkthroughs, and move-in windows where the cleaning date cannot drift",
    localProof: `people in ${city.name} can use after-clean notes and photos when they cannot stay through the finish`,
    route: city.nearby.slice(0, 4).join(", "),
  }
}

function makeCityIntentPage(city: (typeof cityPages)[number], seed: MoveOutIntentSeed): ShynliMoveOutCityIntentPageData {
  const slug = `${city.slug}/${seed.slug}`
  const nearby = city.nearby.slice(0, 4)
  const cityNote = cityRouteNotes[city.group]
  const profile = getMoveOutCityProfile(city)
  const priorityCity = featuredServiceAreaCities.includes(city.name)
  const relatedLinks: [string, string][] = [
    [`${city.name} move-out cleaning`, city.slug],
    [seed.label, seed.slug],
    ...mediumIntentSeeds.map((item) => [`${city.name} ${item.label}`, `${city.slug}/${item.slug}`] as [string, string]),
    ...(priorityCity ? lowIntentSeeds.slice(0, 4).map((item) => [`${city.name} ${item.label}`, `${city.slug}/${item.slug}`] as [string, string]) : []),
    ...nearby.map((name) => [`${name} move-out cleaning`, cityPages.find((item) => item.name === name)?.slug ?? ""]),
  ].filter(([, href]) => href && href !== slug).slice(0, 8) as [string, string][]

  return {
    slug,
    citySlug: city.slug,
    intentSlug: seed.slug,
    city,
    title: `${city.name} ${seed.label} | Shynli Move-Out`,
    meta: `${seed.label} in ${city.name}, IL with empty-home checklist, access notes, quote clarity, after-clean photos, and move-day handoff support.`,
    eyebrow: `${city.name} service`,
    h1: `${city.name} ${seed.label} before keys change hands.`,
    intro: `${sentenceStart(seed.keyword)} in ${city.name} fits the real pressure of move week. Shynli Move-Out Cleaning helps ${seed.audience} with ${seed.promise}. ${cityNote} Local requests often involve ${profile.housing}. We focus on the details that usually decide whether the home feels ready: empty-room surfaces, kitchen and bathroom reset, floors, closets, access notes, selected add-ons, and proof after the visit.`,
    intentLabel: seed.label,
    keyword: seed.keyword,
    audience: seed.audience,
    promise: seed.promise,
    situation: seed.situation,
    proof: seed.proof,
    sections: [
      {
        title: `Why ${city.name} move-out jobs need a clear plan`,
        copy: `${city.name} appointments often depend on ${profile.access}. A useful clean starts with the deadline, the handoff date, and the condition after furniture has been removed. For this route, nearby planning can include ${profile.route}.`,
        bullets: [profile.housing, profile.access, profile.timing, profile.localProof],
      },
      {
        title: "What the cleaning scope covers",
        copy: `The core scope is built for empty or mostly empty homes. It focuses on the visible items that matter during a walkthrough: bathrooms, kitchens, floors, doors, switches, shelves, closets, and baseboards. Add-ons are named before the visit so the cleaner has enough time.`,
        bullets: ["Kitchen surfaces, sink, appliance exteriors, and cabinet fronts", "Bathrooms, mirrors, fixtures, toilet base, tub, shower, and floors", "Closets, reachable shelves, doors, switches, and baseboards", "Fridge, oven, cabinets, windows, blinds, and garage when selected"],
      },
      {
        title: "How pricing is reviewed",
        copy: `${seed.label} pricing in ${city.name} depends on more than square footage. The quote should reflect bathrooms, condition, access, deadline, add-ons, and how much dust or residue is left after movers finish. ${profile.timing}.`,
        bullets: ["Number of bedrooms, bathrooms, and living areas", "Light, normal, or heavy condition after move-out", "Selected appliance, cabinet, window, blind, or garage work", "Same-week urgency and access complexity"],
      },
      {
        title: "How the finish is documented",
        copy: `A move-out clean is easier to trust when the finish is visible. Ask for after-clean photos, room notes, lock-up confirmation, and a simple follow-up path if a covered checklist item is missed.`,
        bullets: ["Photo-ready room finish when requested", "Final notes for access and lock-up", "Checklist-based follow-up for covered missed items", "Simple next step for landlords, realtors, sellers, and renters"],
      },
    ],
    faqs: [
      [`Do you clean apartments and houses in ${city.name}?`, `Yes. Shynli Move-Out Cleaning handles apartments, condos, townhomes, rentals, and houses in ${city.name} when the timing and scope can be confirmed.`],
      ["Do I need to be there during the clean?", "Usually no. Provide access instructions, parking details, pet notes, utilities, and lock-up directions before the visit."],
      ["Can you clean inside the fridge, oven, or cabinets?", "Yes, when selected or quoted before the appointment. These items need extra time and should be named in advance."],
      ["What if a covered item is missed?", "Contact the team with the details. Covered missed checklist items should have a simple follow-up path."],
    ],
    relatedLinks,
  }
}

const priorityCityPages = cityPages.filter((city) => featuredServiceAreaCities.includes(city.name))

export const shinyMoveOutCityIntentPages: ShynliMoveOutCityIntentPageData[] = [
  ...cityPages.flatMap((city) => mediumIntentSeeds.map((seed) => makeCityIntentPage(city, seed))),
  ...priorityCityPages.flatMap((city) => lowIntentSeeds.map((seed) => makeCityIntentPage(city, seed))),
]

function MoveOutSeoHeader({ ctaLabel = "Start quote" }: { ctaLabel?: string }) {
  const homeHref = getShynliMoveOutPath()

  return (
    <header className="sticky top-0 z-50 border-b border-[#0b2430]/10 bg-[#f6fbff]/92 px-4 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <a href={homeHref} className="flex min-h-11 items-center gap-3" aria-label="Shynli Move-Out Cleaning home">
          <span className="grid size-10 place-items-center rounded-sm bg-[#0b2430] text-sm font-black text-[#f6fbff]">SM</span>
          <span className="leading-none">
            <span className="block text-base font-black uppercase tracking-normal">Shynli Move-Out</span>
            <span className="mt-1 block text-xs font-black uppercase text-[#075f67]">Move-out cleaning</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 text-sm font-black text-[#0b2430]/68 md:flex" aria-label="Move-out page navigation">
          <a href="#scope" className="flex min-h-11 items-center rounded-sm px-4 hover:bg-[#d7f3f7] hover:text-[#0b2430]">Scope</a>
          <a href="#pricing" className="flex min-h-11 items-center rounded-sm px-4 hover:bg-[#d7f3f7] hover:text-[#0b2430]">Pricing</a>
          <a href={getShynliMoveOutPath("guides")} className="flex min-h-11 items-center rounded-sm px-4 hover:bg-[#d7f3f7] hover:text-[#0b2430]">Guides</a>
          <a href="#related" className="flex min-h-11 items-center rounded-sm px-4 hover:bg-[#d7f3f7] hover:text-[#0b2430]">Related</a>
          <a href="#areas" className="flex min-h-11 items-center rounded-sm px-4 hover:bg-[#d7f3f7] hover:text-[#0b2430]">Areas</a>
        </nav>
        <Button asChild className="h-11 rounded-sm bg-[#0b2430] px-5 font-black text-[#f6fbff] hover:bg-[#123846]">
          <a href="#quote">{ctaLabel}</a>
        </Button>
      </div>
    </header>
  )
}

function MoveOutQuoteStrip({ page, cityName }: { page: ShynliMoveOutSeoPageData; cityName?: string }) {
  return (
    <div id="quote" className="border border-[#b9e5ee] bg-[#f6fbff] p-3 text-[#0b2430] shadow-[0_26px_90px_rgba(0,0,0,0.18)] md:p-4">
      <form action={buildQuoteUrl({ service: page.keyword })} method="get" className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end" onSubmit={(event) => submitQuoteForm(event, { service: page.keyword })}>
        {cityName ? <input type="hidden" name="city" value={cityName} /> : null}
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          ZIP code
          <Input name="zip" inputMode="numeric" placeholder="60540" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          Handoff date
          <Input name="date" type="date" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          Place type
          <Input name="property_type" placeholder="Apartment, condo, house" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          Condition
          <Input name="condition" placeholder="Empty / mostly empty" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <Button type="submit" className="h-12 rounded-sm bg-[#19b97f] px-7 font-black text-[#06202a] hover:bg-[#16b879]">
          Check price
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </div>
  )
}

function MoveOutSeoFooter({ city }: { city?: (typeof cityPages)[number] }) {
  const localLinks: [string, string][] = city
    ? [
        [city.name, city.slug],
        ...mediumIntentSeeds.map((seed) => [seed.label, `${city.slug}/${seed.slug}`] as [string, string]),
        ...(featuredServiceAreaCities.includes(city.name) ? lowIntentSeeds.map((seed) => [seed.label, `${city.slug}/${seed.slug}`] as [string, string]) : []),
      ]
    : [["Naperville", "naperville"], ["Aurora", "aurora"], ["Plainfield", "plainfield"], ["Oswego", "oswego"]]
  const linkGroups: [string, [string, string][]][] = [
    ["Move-out pages", [["Cost guide", "move-out-cleaning-cost"], ["Checklist", "move-out-cleaning-checklist"], ["Empty apartment", "empty-apartment-cleaning"], ["Deposit cleaning", "deposit-cleaning"]]],
    ["Guides", [["Move-out guides", "guides"], ["Landlord inspection", "guides/landlord-move-out-cleaning-inspection"], ["Cleaning timing", "guides/how-long-move-out-cleaning-takes"], ["Photo handoff", "guides/move-out-cleaning-photos-before-keys"]]],
    ["Local pages", localLinks],
    ["Support", [["Privacy", "privacy"], ["Terms", "terms"], ["Cancellation", "cancellation"], ["Home", ""]]],
  ]

  return (
    <footer className="bg-[#0b2430] px-4 py-12 text-[#f6fbff] md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_1.95fr]">
        <div>
          <a href={getShynliMoveOutPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-sm bg-[#22c7a9] text-sm font-black text-[#0b2430]">SM</span>
            <span className="text-xl font-black">Shynli Move-Out Cleaning</span>
          </a>
          <p className="mt-5 max-w-sm text-sm font-bold leading-6 text-[#f6fbff]/76">
            Move-out cleaning for empty homes, lease handoffs, listing prep, final walkthroughs, and move-day timing.
          </p>
          <div className="mt-4 grid gap-1 text-sm font-bold text-[#f6fbff]/72">
            <a className="transition-colors hover:text-[#f6fbff]" href={businessPhoneHref}>{businessPhoneDisplay}</a>
            <a className="transition-colors hover:text-[#f6fbff]" href={`mailto:${businessEmail}`}>{businessEmail}</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-sm bg-[#22c7a9] px-5 font-black text-[#0b2430] hover:bg-[#37d8bb]">
              <a href={buildQuoteUrl({ service: "move-out-cleaning" })}>Start quote</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm border-[#f6fbff]/24 bg-[#f6fbff]/8 px-5 font-black text-[#f6fbff] hover:bg-[#f6fbff]/14 hover:text-[#f6fbff]">
              <a href={getShynliMoveOutPath() + "#areas"}>Service areas</a>
            </Button>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {linkGroups.map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-black uppercase text-[#22c7a9]">{title}</h3>
              <div className="mt-4 grid gap-2">
                {links.map(([label, slug]) => (
                  <a key={label} href={getShynliMoveOutPath(slug || undefined)} className="flex min-h-10 items-center text-sm font-black text-[#f6fbff]/76 transition-colors hover:text-[#f6fbff]">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#f6fbff]/10 pt-6 text-sm font-bold text-[#f6fbff]/76 md:flex-row md:items-center md:justify-between">
        <p>ShynliMoveOutCleaning.com</p>
        <p>Empty-home scope. Access notes. Final walkthrough clarity.</p>
      </div>
    </footer>
  )
}

function MoveOutSeoBody({ page, cityName }: { page: ShynliMoveOutSeoPageData; cityName?: string }) {
  const related = uniqueRelatedLinks([...relatedGuideLinksForSlug(page.slug), ...(page.relatedLinks.length > 0 ? page.relatedLinks : hubLinkSeeds.slice(0, 8))]).slice(0, 10)
  const cityLinks = cityPages.slice(0, 12)

  return (
    <>
      <section id="scope" className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Planned scope</p>
            <h2 className="text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">A cleaner handoff starts before arrival.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Know what is covered, what changes the price, and how the finish is handled before you put the clean on the calendar.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {page.sections.map((section, index) => (
              <Card key={section.title} className={`rounded-sm border-[#b9e5ee] shadow-none ${index === 0 ? "bg-[#0b2430] text-[#f6fbff]" : "bg-[#f6fbff]"}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-black leading-tight">{section.title}</h3>
                    {index === 0 ? <Sparkles className="size-6 text-[#22c7a9]" /> : <Check className="size-6 text-[#075f67]" />}
                  </div>
                  <p className={`mt-4 text-sm font-bold leading-6 ${index === 0 ? "text-[#f6fbff]/72" : "text-[#486573]"}`}>{section.copy}</p>
                  <div className="mt-5 grid gap-2">
                    {section.bullets.map((item) => (
                      <div key={item} className="flex gap-2">
                        <Check className={`mt-1 size-4 shrink-0 ${index === 0 ? "text-[#22c7a9]" : "text-[#075f67]"}`} />
                        <p className={`text-sm font-black leading-6 ${index === 0 ? "text-[#f6fbff]/82" : "text-[#0b2430]"}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#e9f7fb] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Quote factors</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Price should match the real move-out condition.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              A useful quote looks at property type, bathrooms, condition, deadline, access, and selected extras. That keeps a simple apartment from being treated like a heavy rental turnover.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [Home, "Property size", "Bedrooms, bathrooms, floors, and whether the home is empty enough to clean efficiently."],
              [ClipboardCheck, "Selected add-ons", "Inside fridge, oven, cabinets, interior windows, blinds, garage, and other time-heavy requests."],
              [KeyRound, "Access plan", "Parking, lockbox, elevator, gate, pets, utilities, and lock-up details before the visit."],
              [ShieldCheck, "Finish proof", "After-clean photos, room notes, and a follow-up route for covered missed checklist items."],
            ].map(([Icon, title, copy]) => (
              <Card key={title as string} className="rounded-sm border-[#b9e5ee] bg-white shadow-none">
                <CardContent className="p-5">
                  <Icon className="size-7 text-[#075f67]" />
                  <h3 className="mt-5 text-2xl font-black leading-tight">{title as string}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#486573]">{copy as string}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="related" className="bg-[#f6fbff] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Related cleaning pages</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Compare the details before you choose a date.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Move from a broad service to a local city, checklist, cost guide, or nearby area without losing the path back to a quote.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {related.map(([label, slug]) => (
              <a key={`${label}-${slug}`} href={getShynliMoveOutPath(slug)} className="group flex min-h-20 items-center justify-between gap-4 border border-[#b9e5ee] bg-white p-5 transition-colors hover:bg-[#e9f7fb]">
                <span className="text-lg font-black leading-tight text-[#0b2430]">{label}</span>
                <ArrowRight className="size-5 shrink-0 text-[#075f67] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">{cityName ? "Nearby cities" : "Service areas"}</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Find move-out cleaning near your address.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Shynli Move-Out Cleaning serves Chicagoland suburbs where timing, access, and the exact ZIP can affect the visit.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {cityName ? (
              cityLinks.map((city) => (
                <a key={city.slug} href={getShynliMoveOutPath(city.slug)} className="flex min-h-16 items-center justify-between border border-[#b9e5ee] bg-[#f6fbff] px-5 text-base font-black text-[#0b2430] hover:bg-[#e9f7fb]">
                  {city.name}
                  <MapPin className="size-5 text-[#075f67]" />
                </a>
              ))
            ) : (
              serviceAreaGroups.slice(0, 4).map((group) => (
                <div key={group.label} className="border border-[#b9e5ee] bg-[#f6fbff] p-5">
                  <h3 className="text-sm font-black uppercase text-[#075f67]">{group.label}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.cities.map((name) => {
                      const city = cityPages.find((item) => item.name === name)
                      return city ? (
                        <a key={name} href={getShynliMoveOutPath(city.slug)} className="inline-flex min-h-11 items-center rounded-sm bg-white px-3 text-sm font-black text-[#0b2430] hover:bg-[#d7f3f7] hover:text-[#075f67]">
                          {name}
                        </a>
                      ) : null
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#e9f7fb] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Booking questions</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Clear answers before the quote.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              We will be clear about the cleaning scope, the add-ons, and the follow-up path, while staying honest about deposits, inspections, and buyer opinions.
            </p>
          </div>
          <div className="border border-[#b9e5ee] bg-white px-5 text-[#0b2430]">
            {page.faqs.map(([question, answer]) => (
              <section key={question} className="border-b border-[#d6edf3] py-4 last:border-b-0">
                <h3 className="text-left text-sm font-black leading-6">{question}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-[#486573]">{answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function useMoveOutSeoMeta(page: ShynliMoveOutSeoPageData, canonicalPath: string, areaServed: unknown = cityList.map((name) => ({ "@type": "City", name }))) {
  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      serviceType: page.keyword,
      url: `${shinyMoveOutCanonicalBase}${canonicalPath}`,
      areaServed,
      provider: { "@type": "LocalBusiness", name: "Shynli Move-Out Cleaning", url: shinyMoveOutCanonicalBase },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Move-out cleaning options",
        itemListElement: page.sections.flatMap((section) => section.bullets).slice(0, 8).map((item) => ({ "@type": "Offer", name: item })),
      },
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      canonicalBaseUrl: shinyMoveOutCanonicalBase,
      canonicalPath,
    },
  )
}

function MoveOutGuideQuoteStrip({ page }: { page: ShynliMoveOutGuidePageData }) {
  return (
    <div id="quote" className="border border-[#b9e5ee] bg-[#f6fbff] p-3 text-[#0b2430] shadow-[0_26px_90px_rgba(0,0,0,0.18)] md:p-4">
      <form action={buildQuoteUrl({ service: "move-out-cleaning" })} method="get" className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end" onSubmit={(event) => submitQuoteForm(event, { service: "move-out-cleaning", notes: `Move-out guide quote from ${page.slug}.` })}>
        <input type="hidden" name="source_page" value={`/${page.slug}`} />
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          ZIP code
          <Input name="zip" inputMode="numeric" placeholder="60540" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          Handoff date
          <Input name="date" type="date" className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-[#075f67]">
          Main question
          <Input name="notes" defaultValue={page.eyebrow} className="h-12 rounded-sm border-[#b9e5ee] bg-white font-bold" />
        </label>
        <Button type="submit" className="h-12 rounded-sm bg-[#19b97f] px-7 font-black text-[#06202a] hover:bg-[#16b879]">
          Start quote
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </div>
  )
}

function useMoveOutGuideMeta(page: ShynliMoveOutGuidePageData) {
  const canonicalPath = `/${page.slug}`

  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": page.slug === "guides" ? "CollectionPage" : "Article",
          headline: page.h1,
          name: page.h1,
          description: page.meta,
          url: `${shinyMoveOutCanonicalBase}${canonicalPath}`,
          datePublished: articleDate,
          dateModified: articleDate,
          author: {
            "@type": "Organization",
            name: "Shynli Move-Out Cleaning",
            url: shinyMoveOutCanonicalBase,
          },
          publisher: {
            "@type": "Organization",
            name: "Shynli Move-Out Cleaning",
            url: shinyMoveOutCanonicalBase,
          },
          isPartOf: {
            "@type": "WebSite",
            name: "Shynli Move-Out Cleaning",
            url: shinyMoveOutCanonicalBase,
          },
          about: page.keywords.map((keyword) => ({ "@type": "Thing", name: keyword })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: shinyMoveOutCanonicalBase },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${shinyMoveOutCanonicalBase}/guides` },
            ...(page.slug === "guides" ? [] : [{ "@type": "ListItem", position: 3, name: page.eyebrow, item: `${shinyMoveOutCanonicalBase}${canonicalPath}` }]),
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: page.faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    },
    {
      canonicalBaseUrl: shinyMoveOutCanonicalBase,
      canonicalPath,
      keywords: page.keywords,
    },
  )
}

export function ShynliMoveOutGuidePage({ page }: { page: ShynliMoveOutGuidePageData }) {
  useMoveOutGuideMeta(page)
  const related = uniqueRelatedLinks(page.relatedLinks)
  const cityLinks = cityPages.slice(0, 8)

  return (
    <main className="move-out-page move-out-page-guide min-h-screen overflow-hidden bg-[#f6fbff] text-[#0b2430]">
      <MoveOutSeoHeader ctaLabel="Start quote" />
      <section className="bg-[#0b2430] px-4 py-14 text-[#f6fbff] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Badge className="mb-5 rounded-sm border border-[#20c7d8]/55 bg-[#20c7d8]/16 px-4 py-1.5 text-[#f6fbff] shadow-none hover:bg-[#20c7d8]/16">{page.eyebrow}</Badge>
            <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.2rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#f6fbff]/76 md:text-xl">{page.intro}</p>
          </div>
          <div className="border border-[#f6fbff]/14 bg-white/6 p-5">
            <p className="text-sm font-black uppercase text-[#22c7a9]">Short answer</p>
            <p className="mt-3 text-2xl font-black leading-tight text-[#f6fbff]">{page.summary}</p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl">
          <MoveOutGuideQuoteStrip page={page} />
        </div>
      </section>

      <section id="scope" className="bg-white px-4 py-14 md:px-8 md:py-20">
        <article className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Practical answer</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">What to know before the handoff.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              These notes are written for people preparing for keys, walkthroughs, quotes, or remote handoffs. They keep the cleaning scope honest and the next step close.
            </p>
          </div>
          <div className="grid gap-4">
            {page.sections.map((section, index) => (
              <section key={section.title} className={`border border-[#b9e5ee] p-5 ${index === 0 ? "bg-[#0b2430] text-[#f6fbff]" : "bg-[#f6fbff]"}`}>
                <h3 className="text-2xl font-black leading-tight">{section.title}</h3>
                <p className={`mt-4 text-base font-bold leading-7 ${index === 0 ? "text-[#f6fbff]/76" : "text-[#486573]"}`}>{section.answer}</p>
                <div className="mt-5 grid gap-2">
                  {section.bullets.map((item) => (
                    <div key={item} className="flex gap-2">
                      <Check className={`mt-1 size-4 shrink-0 ${index === 0 ? "text-[#22c7a9]" : "text-[#075f67]"}`} />
                      <p className={`text-sm font-black leading-6 ${index === 0 ? "text-[#f6fbff]/86" : "text-[#0b2430]"}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section id="pricing" className="bg-[#e9f7fb] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Turn reading into a quote</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Ready to price the real home?</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Share the ZIP, date, home condition, access details, and add-ons so the appointment can match the actual move-out window.
            </p>
          </div>
          <MoveOutGuideQuoteStrip page={page} />
        </div>
      </section>

      <section id="related" className="bg-[#f6fbff] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Related pages</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Keep the next click useful.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Move between guides, service pages, cost details, checklists, and deposit-focused questions without losing the quote path.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {related.map(([label, slug]) => (
              <a key={`${page.slug}-${slug}`} href={getShynliMoveOutPath(slug)} className="group flex min-h-20 items-center justify-between gap-4 border border-[#b9e5ee] bg-white p-5 transition-colors hover:bg-[#e9f7fb]">
                <span className="text-lg font-black leading-tight text-[#0b2430]">{label}</span>
                <ArrowRight className="size-5 shrink-0 text-[#075f67] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-white px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">Service areas</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Use the guide, then pick the local page.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              Local pages connect move-out cleaning questions to the city, route, access notes, and nearby service area.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {cityLinks.map((city) => (
              <a key={city.slug} href={getShynliMoveOutPath(city.slug)} className="flex min-h-16 items-center justify-between border border-[#b9e5ee] bg-[#f6fbff] px-5 text-base font-black text-[#0b2430] hover:bg-[#e9f7fb]">
                {city.name}
                <MapPin className="size-5 text-[#075f67]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9f7fb] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#075f67]">FAQ</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl">Straight answers, clear limits.</h2>
            <p className="mt-6 text-lg font-bold leading-8 text-[#486573]">
              The guides are practical, but they do not turn cleaning into a guarantee for deposits, repairs, buyer opinions, or lease decisions.
            </p>
          </div>
          <div className="border border-[#b9e5ee] bg-white px-5 text-[#0b2430]">
            {page.faqs.map(([question, answer]) => (
              <section key={question} className="border-b border-[#d6edf3] py-4 last:border-b-0">
                <h3 className="text-left text-sm font-black leading-6">{question}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-[#486573]">{answer}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <MoveOutSeoFooter />
    </main>
  )
}

export function ShynliMoveOutSeoPage({ page }: { page: ShynliMoveOutSeoPageData }) {
  const canonicalPath = `/${page.slug}`
  useMoveOutSeoMeta(page, canonicalPath)

  return (
    <main className="move-out-page move-out-page-seo min-h-screen overflow-hidden bg-[#f6fbff] text-[#0b2430]">
      <MoveOutSeoHeader />
      <section className="bg-[#0b2430] px-4 py-14 text-[#f6fbff] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Badge className="mb-5 rounded-sm border border-[#20c7d8]/55 bg-[#20c7d8]/16 px-4 py-1.5 text-[#f6fbff] shadow-none hover:bg-[#20c7d8]/16">{page.eyebrow}</Badge>
            <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.2rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#f6fbff]/76 md:text-xl">{page.intro}</p>
          </div>
          <div className="grid gap-3">
            {[
              ["Best for", page.audience],
              ["Promise", page.promise],
              ["Proof", page.proof],
            ].map(([title, copy]) => (
              <div key={title} className="border border-[#f6fbff]/14 bg-white/6 p-5">
                <p className="text-sm font-black uppercase text-[#22c7a9]">{title}</p>
                <p className="mt-2 text-xl font-black leading-tight text-[#f6fbff]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl">
          <MoveOutQuoteStrip page={page} />
        </div>
      </section>
      <MoveOutSeoBody page={page} />
      <MoveOutSeoFooter />
    </main>
  )
}

export function ShynliMoveOutCityIntentPage({ page }: { page: ShynliMoveOutCityIntentPageData }) {
  const canonicalPath = `/${page.slug}`
  useMoveOutSeoMeta(page, canonicalPath, { "@type": "City", name: page.city.name })

  return (
    <main className="move-out-page move-out-page-seo min-h-screen overflow-hidden bg-[#f6fbff] text-[#0b2430]">
      <MoveOutSeoHeader />
      <section className="bg-[#0b2430] px-4 py-14 text-[#f6fbff] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Badge className="mb-5 rounded-sm border border-[#20c7d8]/55 bg-[#20c7d8]/16 px-4 py-1.5 text-[#f6fbff] shadow-none hover:bg-[#20c7d8]/16">{page.eyebrow}</Badge>
            <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.2rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#f6fbff]/76 md:text-xl">{page.intro}</p>
          </div>
          <div className="border border-[#f6fbff]/14 bg-white/6 p-5">
            <p className="text-sm font-black uppercase text-[#22c7a9]">{page.city.name} handoff notes</p>
            <div className="mt-5 grid gap-3">
              {[
                "Confirm access before the cleaner arrives.",
                "Name appliance and cabinet interiors before booking.",
                "Share parking, elevator, gate, pet, and utility notes.",
                "Request photos when you cannot be on site.",
              ].map((item) => (
                <div key={item} className="flex gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  <Check className="mt-1 size-4 shrink-0 text-[#22c7a9]" />
                  <p className="text-base font-black leading-6 text-[#f6fbff]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl">
          <MoveOutQuoteStrip page={page} cityName={page.city.name} />
        </div>
      </section>
      <MoveOutSeoBody page={page} cityName={page.city.name} />
      <MoveOutSeoFooter city={page.city} />
    </main>
  )
}
