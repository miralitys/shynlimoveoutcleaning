import { useState } from "react"
import { ArrowRight, Check, Clock, HeartHandshake, Home, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Star, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  cityHeroImages,
  checklistColumns,
  checklistSections,
  cityPageServices,
  cityPages,
  cityRouteNotes,
  cityServiceProfiles,
  cityVisualMoments,
  comparison,
  featuredServiceAreaCities,
  getCityAngle,
  getCityFaqs,
  getCityServiceSeoServices,
  getGenericHeroImage,
  getLocalServicePrompt,
  getRelatedLinkGroups,
  hasCityServicePages,
  heroImageLibrary,
  importantCityPages,
  localGuideSeoPages,
  processSteps,
  businessEmail,
  businessPhoneDisplay,
  businessPhoneHref,
  businessPhoneSchema,
  legalBusinessName,
  preferredArrivalWindow,
  publishedAddOnPrices,
  publishedRecurringPrices,
  publicBusinessName,
  publicSeoServices,
  reviews,
  roomChecklist,
  serviceAreaGroups,
  serviceHeroImages,
  servicePlans,
  services,
  seoServices,
  slugifyCity,
  trustStats,
  type GenericSeoPageData,
  footerColumns,
} from "@/site/data"
import {
  AirbnbCleaningLandingBlock,
  ChecklistCell,
  DeepCleaningLandingBlock,
  EstimateCard,
  SiteFooter,
  SiteHeader,
  StickyBookingBar,
  buildQuoteUrl,
  getCitySchema,
  getGenericSeoSchema,
  getServiceFaqs,
  getServiceSchema,
  resolveSiteHref,
  submitQuoteRequest,
  useSeoMeta,
  type RoomControl,
} from "@/site/shared"

const cityServiceDecisionBlocks: Record<string, { heading: string; intro: string; cards: [string, string][] }> = {
  "regular-cleaning": {
    heading: "Regular cleaning is about keeping the home from slipping behind.",
    intro: "Use this page when the home is already livable and you want a steady maintenance visit. The quote should focus on the repeating rooms that carry the week, not on a one-time rescue clean.",
    cards: [
      ["What this visit solves", "Weekly clutter, bathroom upkeep, kitchen surfaces, floors, dusting, trash, bedrooms, and shared spaces that need a predictable reset."],
      ["What makes it different", "The goal is rhythm. Notes can carry forward, the checklist can repeat, and each visit should make the next one easier."],
      ["What to mention", "Pets, preferred rooms, fragile surfaces, access timing, and anything that should be handled the same way each visit."],
      ["When to choose another service", "If baseboards, fixtures, heavy buildup, appliance interiors, or a first-time catch-up are the priority, deep cleaning is usually a better fit."],
    ],
  },
  "deep-cleaning": {
    heading: "Deep cleaning is the catch-up visit when maintenance is not enough.",
    intro: "Use this page when the home needs extra time for buildup, edges, high-touch areas, baseboards, fixtures, and rooms that feel behind. The quote should explain why the visit needs more time than a regular clean.",
    cards: [
      ["What this visit solves", "Bathroom buildup, kitchen residue, baseboards, trim, doors, detailed dusting, reachable vents, and areas regular cleaning does not fully recover."],
      ["What makes it different", "The cleaner plans for detail and condition, not just a repeating maintenance checklist."],
      ["What to mention", "Heavy rooms, kitchen grease, soap buildup, dust level, pets, clutter, and add-ons like fridge, oven, cabinets, blinds, or interior windows."],
      ["When to choose another service", "If the home is empty and tied to a lease, walkthrough, closing, or key handoff, move-out or move-in cleaning may fit better."],
    ],
  },
  "move-in-cleaning": {
    heading: "Move-in cleaning is about making the home feel ready before daily life starts.",
    intro: "Use this page when keys are new, furniture has not fully arrived, or the kitchen and bathrooms need to feel safe before unpacking. The quote should focus on empty access and first-use confidence.",
    cards: [
      ["What this visit solves", "Cabinets, shelves, closets, bathrooms, kitchen surfaces, floors, and empty-room dust before boxes and furniture block the work."],
      ["What makes it different", "The visit happens before the home is fully lived in, so empty spaces and inside storage areas can matter more than normal upkeep."],
      ["What to mention", "Move date, key access, whether furniture has arrived, cabinet and closet priorities, appliance interiors, and which rooms must feel ready first."],
      ["When to choose another service", "If the previous occupant left heavy walkthrough issues or trash, move-out cleaning may be the stronger scope."],
    ],
  },
  "move-out-cleaning": {
    heading: "Move-out cleaning is built around handoff, inspection, and empty rooms.",
    intro: "Use this page when the home is being handed to a landlord, buyer, property manager, or next occupant. The quote should focus on what will be checked after the last box leaves.",
    cards: [
      ["What this visit solves", "Empty floors, bathrooms, kitchen surfaces, closets, shelves, inside cabinets when requested, appliance add-ons, and final walkthrough details."],
      ["What makes it different", "The work is judged after the home is empty, so missed corners, cabinet interiors, and appliance expectations can matter more."],
      ["What to mention", "Walkthrough time, key return, lease checklist, whether the home is empty, trash status, fridge or oven needs, and lock-up instructions."],
      ["When to choose another service", "If you are staying in the home and need buildup recovered, deep cleaning may be the better fit."],
    ],
  },
  "move-in-move-out-cleaning": {
    heading: "Move-in / move-out cleaning covers the transition between occupants.",
    intro: "Use this page when the clean is tied to moving rather than routine upkeep. The quote should start with the handoff moment: before furniture arrives, after furniture leaves, or between tenants.",
    cards: [
      ["What this visit solves", "Empty-room surfaces, floors, kitchens, bathrooms, shelves, closets, cabinets when requested, and move-day access details."],
      ["What makes it different", "The cleaner can work around empty spaces, but timing, keys, appliances, cabinets, and final lock-up need to be clear."],
      ["What to mention", "Whether the home is move-in or move-out, what is still inside, walkthrough deadline, lockbox notes, and appliance or cabinet add-ons."],
      ["When to choose another service", "If no move is involved and the home just needs a heavier lived-in reset, choose deep cleaning."],
    ],
  },
  "house-cleaning": {
    heading: "House cleaning is the broad whole-home service, not a one-visit special case.",
    intro: "Use this page when the main question is how to clean the full house: bedrooms, bathrooms, kitchen, floors, shared spaces, pets, stairs, and the routines that make the home feel under control.",
    cards: [
      ["What this visit solves", "A full-house reset across lived-in rooms, especially kitchens, bathrooms, bedrooms, floors, stairs, entries, and the spaces family members use every day."],
      ["What makes it different", "House cleaning is property-wide. The quote should understand the layout, number of levels, bathrooms, pets, and whether the home needs standard, deep, or recurring support."],
      ["What to mention", "Square footage, number of levels, finished basement, pets, high-use rooms, bedrooms, bathroom count, and whether you want one visit or a recurring rhythm."],
      ["When to choose another service", "If you only need one event-based visit with no ongoing plan, one-time cleaning is more precise. If the home is behind, deep cleaning may be the right first step."],
    ],
  },
  "one-time-cleaning": {
    heading: "One-time cleaning is for a specific moment, not an ongoing home routine.",
    intro: "Use this page when you need one clean before guests, after a busy season, before photos, after hosting, or whenever the home needs help without starting recurring service.",
    cards: [
      ["What this visit solves", "A single reset for the rooms that matter most right now: kitchen, bathrooms, floors, guest areas, bedrooms, entry spaces, and selected add-ons."],
      ["What makes it different", "There is no recurring baseline. The quote should be honest about the current condition because one visit has to carry the whole result."],
      ["What to mention", "Why you need the clean, the date it matters, guest or event timing, priority rooms, current condition, pets, and whether you want standard or deep detail."],
      ["When to choose another service", "If you want repeated upkeep, recurring or weekly cleaning is more accurate. If this is a whole-home routine decision, house cleaning may be the broader page."],
    ],
  },
  "recurring-cleaning": {
    heading: "Recurring cleaning is about building a home rhythm that repeats.",
    intro: "Use this page when the goal is not one dramatic reset, but a reliable weekly, biweekly, or monthly plan. The quote should account for what must happen every visit and what can rotate.",
    cards: [
      ["What this visit solves", "Ongoing kitchen and bathroom upkeep, floors, dusting, bedrooms, common rooms, trash, high-touch surfaces, and notes that should carry from visit to visit."],
      ["What makes it different", "Recurring cleaning gets better when preferences are remembered and the home does not have to restart from zero every time."],
      ["What to mention", "Preferred cadence, rooms that fall behind fastest, pets, work-from-home needs, entry routine, and any rotating tasks you want tracked."],
      ["When to choose another service", "If the home has heavy buildup before the first recurring visit, start with deep cleaning and then move into maintenance."],
    ],
  },
  "weekly-cleaning": {
    heading: "Weekly cleaning protects the house before the weekend disappears.",
    intro: "Use this page when the home needs frequent support because kitchens, bathrooms, floors, pets, kids, cooking, or work schedules create visible mess every week.",
    cards: [
      ["What this visit solves", "Fast-return mess: kitchen counters, bathrooms, floors, pet hair, bedrooms, shared spaces, trash, and the high-touch surfaces that need weekly attention."],
      ["What makes it different", "Weekly service is the most rhythm-based option. The checklist can stay lighter because the home does not have as much time to fall behind."],
      ["What to mention", "Best weekday, arrival window, rooms used most heavily, pets, school or work routines, and whether supplies or access should stay consistent."],
      ["When to choose another service", "If weekly is too frequent, recurring cleaning can be biweekly or monthly. If the home is already behind, start with a deep clean."],
    ],
  },
  "apartment-cleaning": {
    heading: "Apartment cleaning is about compact spaces, access, and high-use rooms.",
    intro: "Use this page when the cleaning job is shaped by building entry, parking, stairs, elevators, lease timing, smaller kitchens, bathrooms, and rooms that get used hard in less space.",
    cards: [
      ["What this visit solves", "Kitchen and bathroom reset, floors, dusting, entry areas, bedrooms, living room surfaces, trash, and move-related apartment details."],
      ["What makes it different", "Access can matter as much as square footage. Parking, elevator rules, front desk instructions, pets, and tight arrival windows should be clear."],
      ["What to mention", "Unit size, floor number, parking, elevator or stair access, front-desk rules, pets, lease timing, and whether this is a regular or move clean."],
      ["When to choose another service", "If the request is for an entire multi-level single-family layout, house cleaning is broader. If the unit is empty for inspection, move-out cleaning may fit better."],
    ],
  },
  "post-construction-cleaning": {
    heading: "Post-construction cleaning is about dust, renovation residue, and final usability.",
    intro: "Use this page when the home has been remodeled, repaired, painted, or renovated and normal cleaning language is not specific enough. The quote should start with dust level and project scope.",
    cards: [
      ["What this visit solves", "Reachable construction dust, floors, trim, doors, cabinet shelves, kitchen and bathroom surfaces, window sills, and final-touch areas after work is complete."],
      ["What makes it different", "Construction dust behaves differently from normal household mess. The quote must confirm debris removal, surface condition, and whether the space is ready for cleaning."],
      ["What to mention", "Renovation type, rooms affected, dust level, whether contractors are finished, debris status, delicate surfaces, cabinet interiors, windows, and deadline."],
      ["When to choose another service", "If the home simply fell behind without renovation dust, deep cleaning is usually the better match."],
    ],
  },
}

const cityServiceLocalSnapshots: Record<string, [string, string][]> = {
  naperville: [
    ["Naperville visit pattern", "Riverwalk-area apartments, downtown parking, larger subdivision homes, school calendars, and weekend hosting plans often shape how the cleaner should enter, park, and prioritize the visit."],
    ["Local planning detail", "For homes near busy corridors or downtown streets, the appointment is easier when garage codes, guest parking, pets, and the room order are sent before arrival."],
    ["Common result goal", "Many Naperville requests are about getting a family home ready before guests, recurring upkeep, or a move deadline without losing time on access confusion."],
  ],
  aurora: [
    ["Aurora visit pattern", "Aurora can mean downtown apartments, Fox River-area homes, west-side subdivisions, rentals, or multi-level family layouts, so the ZIP and neighborhood context matter more than the city name alone."],
    ["Local planning detail", "Parking, gate notes, pets, and whether the route is closer to downtown Aurora, North Aurora, Oswego, or Naperville can change the arrival plan."],
    ["Common result goal", "Aurora clients often need the visit to match a wide service area: apartment access, rental turnover, family upkeep, or a larger home that needs enough time reserved."],
  ],
  plainfield: [
    ["Plainfield visit pattern", "Plainfield work often comes from newer subdivisions, commuter schedules, larger kitchens, upstairs bedrooms, finished lower levels, and homes preparing for guests or moving."],
    ["Local planning detail", "Driveway access, garage entry, pets, subdivision notes, and whether the house is occupied or empty help keep the cleaner focused on the actual rooms."],
    ["Common result goal", "The clean usually needs to make a larger home feel ready again without treating every Plainfield request like a small apartment visit."],
  ],
  oswego: [
    ["Oswego visit pattern", "Oswego requests often include family homes, Kendall County move timing, newer communities, kitchen-heavy routines, and floors that need attention after busy weeks."],
    ["Local planning detail", "Because some appointments sit farther out on the route, ZIP, arrival window, lockbox notes, pets, and priority rooms should be confirmed before the visit is promised."],
    ["Common result goal", "Oswego clients often want the home ready for family routines, a closing, a lease handoff, or a larger reset after the house has fallen behind."],
  ],
  bolingbrook: [
    ["Bolingbrook visit pattern", "Bolingbrook jobs often involve commuter households, apartments, townhomes, pet homes, and family spaces where kitchens, bathrooms, floors, and trash areas carry the result."],
    ["Local planning detail", "Building entry, parking, garage access, pets, and whether someone will be home can decide whether the cleaner starts smoothly or loses time at the door."],
    ["Common result goal", "The goal is usually practical: reset the rooms that get used hardest around work schedules, school schedules, and a busy week."],
  ],
  lisle: [
    ["Lisle visit pattern", "Lisle cleaning often mixes condos, apartments, townhomes, single-family homes, commuter routines, and compact streets where access instructions make the visit easier."],
    ["Local planning detail", "Condo entry, elevator access, parking rules, pets, and whether the unit is near a busier corridor should be shared before the quote is treated as final."],
    ["Common result goal", "Lisle requests often need efficient work in tighter spaces: kitchen, bathroom, entry, floors, and the few rooms that decide how clean the home feels."],
  ],
  warrenville: [
    ["Warrenville visit pattern", "Warrenville requests often sit near work corridors, prairie-path routines, townhomes, apartments, and single-family homes where timing and route fit matter."],
    ["Local planning detail", "Parking, building entry, lockbox placement, pets, and occupied-versus-empty status should be clear before a longer cleaning window is reserved."],
    ["Common result goal", "The visit often needs to fit around workday timing while still giving kitchens, bathrooms, stairs, pet areas, and move-related spaces enough attention."],
  ],
  "downers-grove": [
    ["Downers Grove visit pattern", "Downers Grove jobs may involve older homes, downtown condos, Metra-adjacent timing, alley or street parking, larger family houses, and move weekends."],
    ["Local planning detail", "Street parking, garage or alley instructions, stairs, pets, and older-layout bathrooms or floors should be named before the appointment starts."],
    ["Common result goal", "The clean often needs to make older or busier layouts feel fresh without missing the entry areas, bathrooms, floors, and kitchen details people notice first."],
  ],
  "north-aurora": [
    ["North Aurora visit pattern", "North Aurora requests often sit between quiet residential streets, Fox River-area homes, townhomes, and routes that connect back toward Aurora or Batavia."],
    ["Local planning detail", "Driveway access, lockbox notes, pets, and whether the appointment pairs naturally with nearby Aurora routing should be clear before the day is held."],
    ["Common result goal", "The visit usually needs a calm residential reset: kitchens, bathrooms, floors, pet areas, and the rooms that make the home feel ready again."],
  ],
  "sugar-grove": [
    ["Sugar Grove visit pattern", "Sugar Grove work often involves larger homes, longer driveways, quieter subdivisions, move timing, and family layouts where enough time on site matters."],
    ["Local planning detail", "Garage access, pets, lockbox location, driveway notes, and the preferred arrival window are important because route fit can shape availability."],
    ["Common result goal", "The clean often needs to support a bigger layout: multiple bathrooms, larger kitchens, finished lower levels, entry spaces, and rooms that need a clear order."],
  ],
  yorkville: [
    ["Yorkville visit pattern", "Yorkville requests often involve Kendall County growth, larger homes, newer subdivisions, move-day cleaning, spacious kitchens, stairs, and family routines."],
    ["Local planning detail", "Subdivision notes, driveway parking, pets, lockbox access, closing or lease timing, and expected time on site should be confirmed early."],
    ["Common result goal", "The visit usually needs to make a larger or newer home ready for a walkthrough, family week, guests, or the next stage of moving."],
  ],
  montgomery: [
    ["Montgomery visit pattern", "Montgomery requests often connect Fox River neighborhoods, Aurora and Oswego routes, compact townhomes, family layouts, and move-related cleaning."],
    ["Local planning detail", "Parking, garage entry, pets, lockbox notes, and occupied-versus-empty status help separate a quick reset from a handoff-style visit."],
    ["Common result goal", "The result often depends on matching the service to the right property type: townhome, family house, rental handoff, or nearby route request."],
  ],
}

function getCityServiceProfile(city: (typeof cityPages)[number]) {
  const charTotal = city.slug.split("").reduce((total, character) => total + character.charCodeAt(0), 0)
  const cityIndex = Math.max(0, cityPages.findIndex((item) => item.slug === city.slug))
  const housingPatterns = [
    "older ranch homes, split-level layouts, compact condos, and apartments where kitchens and baths carry the first impression",
    "newer subdivisions, townhomes with stairs, family kitchens, pet floors, and homes where the entry area gets used hard",
    "downtown-adjacent units, commuter households, rental turns, and smaller homes where parking or building entry can shape the day",
    "larger single-family layouts, finished lower levels, guest rooms, and weekly routines that need a clear order of work",
    "quiet residential streets, driveway parking, move timing, and lived-in homes where bathrooms, floors, and kitchen surfaces decide the result",
    "condos, townhouse rows, apartment buildings, and family homes where access notes can matter as much as square footage",
    "homes near busier corridors, school-week routines, pet areas, stairs, and kitchens that need the cleaner to know what matters first",
  ]
  const accessPatterns = [
    "front-door code, garage entry, guest parking, and pet instructions",
    "street parking, elevator or stair notes, lockbox placement, and building rules",
    "driveway access, side-door instructions, trash location, and where supplies should be staged",
    "arrival-window limits, work-from-home rooms, pets, and bedrooms that should be handled last",
    "key handoff, alarm notes, fragile surfaces, and which rooms are off limits",
    "lease timing, empty-room status, cabinet expectations, and final lock-up instructions",
    "school pickup timing, garage code, basement access, and floor surfaces that need extra care",
  ]
  const outcomePatterns = [
    "a home that feels ready before guests walk in",
    "a smoother handoff before keys, photos, or a walkthrough",
    "less catch-up work waiting for the weekend",
    "a kitchen and bathroom reset that makes the rest of the home feel calmer",
    "a visit that fits the real route instead of a vague city-wide promise",
    "clear priorities before the cleaner starts moving room to room",
    "a cleaner arrival with fewer questions at the door",
  ]
  const housing = housingPatterns[(charTotal + cityIndex) % housingPatterns.length]
  const access = accessPatterns[(charTotal + city.slug.length + cityIndex * 2) % accessPatterns.length]
  const outcome = outcomePatterns[(charTotal + city.name.length + cityIndex * 3) % outcomePatterns.length]

  return cityServiceProfiles[city.slug] ?? {
    areaNote: `${city.name} cleaning requests sit inside the ${city.group} service-area group, but the visit still needs its own plan. Around this route, we think about ${housing}, plus whether the home is being maintained, reset, moved into, or handed off.`,
    homeMix: `Expect ${housing} around ${city.name}. Nearby appointments often include ${city.nearby.slice(0, 3).join(", ") || "nearby western suburbs"}, so a useful quote should connect the home type, the ZIP, and the reason for the visit.`,
    accessNote: `${city.name} visits work best when ${access} are shared before the cleaner is assigned. Those details keep the appointment from losing time before the first room is cleaned.`,
    timingNote: `For ${city.name}, the appointment should produce ${outcome}. That means matching the service to the route day, home condition, priority rooms, and add-ons instead of treating the request like a generic suburb page.`,
  }
}

function getCityServiceLocalSnapshots(city: (typeof cityPages)[number], service: (typeof seoServices)[number]): [string, string][] {
  const charTotal = city.slug.split("").reduce((total, character) => total + character.charCodeAt(0), 0)
  const cityIndex = Math.max(0, cityPages.findIndex((item) => item.slug === city.slug))
  const routeAngles = [
    "condo entry, guest parking, and tight arrival windows",
    "larger kitchens, multiple bathrooms, and family traffic",
    "pet hair, floor care, and rooms used hard during the week",
    "lease timing, lockbox notes, and empty-room walkthroughs",
    "stairs, finished basements, and rooms that need a clear order",
    "garage entry, driveway access, and work-from-home scheduling",
    "appliance add-ons, cabinet interiors, and move-ready details",
    "guest preparation, high-touch surfaces, and bathroom confidence",
    "recurring maintenance, repeat notes, and weekend plans",
    "older layouts, trim detail, and floors that show daily use",
    "townhome access, compact kitchens, and shared living spaces",
  ]
  const proofAngles = [
    "before guests arrive",
    "before a lease walkthrough",
    "after a long workweek",
    "before furniture blocks the rooms",
    "after pets, kids, or cooking have taken over",
    "before photos, family visits, or a weekend reset",
    "when the home needs a calmer weekly rhythm",
    "when cabinets, floors, and bathrooms need clearer expectations",
    "when the cleaner needs the right amount of time reserved",
    "when a house, condo, or apartment should not be quoted the same way",
    "when the route has to fit the actual ZIP and access notes",
  ]
  const bookingCues = [
    "garage access, kitchen priority, and bathroom timing",
    "front-desk entry, elevator instructions, and compact-room order",
    "driveway parking, pet gates, and floor surfaces that show traffic",
    "lease deadline, empty closets, and appliance expectations",
    "stairs, basement rooms, and which level should be cleaned first",
    "guest arrival timing, powder room detail, and high-touch surfaces",
    "school-day routines, bedroom order, and trash location",
    "condo association rules, hallway access, and quiet-hour limits",
    "older trim, door frames, and dust that settles around edges",
    "townhouse entries, shared walls, and narrow kitchen layouts",
    "larger family rooms, mudroom floors, and pet sleeping areas",
    "move-in boxes, cabinet shelves, and unpacking priorities",
    "recurring notes, rotating tasks, and rooms that slip between visits",
  ]
  const routeAngle = routeAngles[(charTotal + cityIndex * 5) % routeAngles.length]
  const proofAngle = proofAngles[(charTotal + service.slug.length + cityIndex * 7) % proofAngles.length]
  const bookingCue = bookingCues[(charTotal + service.slug.length + cityIndex * 11) % bookingCues.length]

  return cityServiceLocalSnapshots[city.slug] ?? [
    [
      `${city.name} route context`,
      `${cityHeroImages[city.slug]?.label ?? `${city.name} neighborhoods`} gives the page a local anchor, but the quote still depends on ZIP, ${routeAngle}, and whether the cleaner is heading toward ${city.nearby.slice(0, 2).join(" or ") || "a nearby stop"}.`,
    ],
    [
      `${service.shortName} scenario in ${city.name}`,
      `${getCityAngle(city)} often changes what matters most: ${service.name.toLowerCase()} should be planned for ${proofAngle}, not only for a city name and a room count.`,
    ],
    [
      `What to send before a ${city.name} visit`,
      `Share the rooms that matter, the current condition, bedrooms and bathrooms, access notes, pets, and any add-ons before booking so ${service.name.toLowerCase()} is priced for the real home.`,
    ],
    [
      `${city.name} nearby comparison`,
      `If you are also comparing ${city.nearby.slice(0, 3).join(", ") || "nearby suburbs"}, the deciding detail is usually not distance alone. Route day, home type, parking, and cleaning level decide whether the appointment can be held cleanly.`,
    ],
    [
      `${city.name} result to aim for`,
      `The best version of this visit is practical: the cleaner arrives with the access notes, knows which rooms carry the result, and leaves the home easier to live in, inspect, or hand over.`,
    ],
    [
      `${city.name} booking cue`,
      `For this kind of request, the small details often matter: ${bookingCue}. Add those notes before the appointment is confirmed so the visit feels planned, not improvised.`,
    ],
  ]
}

export function GenericSeoPage({ page }: { page: GenericSeoPageData }) {
  const relatedLinkGroups = getRelatedLinkGroups(page)
  const heroImage = getGenericHeroImage(page)
  useSeoMeta(page.title, page.meta, getGenericSeoSchema(page))

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-12 pt-28 text-white md:px-8 md:pb-16 md:pt-32">
        <div
          className="absolute inset-0 bg-cover opacity-72 saturate-[0.94]"
          style={{ backgroundImage: `url(${heroImage.src})`, backgroundPosition: heroImage.position }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,38,51,0.98)_0%,rgba(13,38,51,0.9)_44%,rgba(13,38,51,0.52)_74%,rgba(13,38,51,0.46)_100%),linear-gradient(0deg,rgba(13,38,51,0.94)_0%,rgba(13,38,51,0.28)_48%,rgba(13,38,51,0.7)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(31,158,214,0.2),rgba(31,158,214,0))]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">{page.eyebrow}</p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">{page.intro}</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#9fe3ff]/86">{heroImage.label}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full bg-[#1f9ed6] px-6 font-black text-white hover:bg-[#168ac0]">
                <a href={buildQuoteUrl({ service: "home-cleaning", sourcePage: page.path })} data-source="shynli.com" data-page-type="seo-support" data-keyword-cluster={page.path} data-intent="quote">
                  Get a quote
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/35 bg-white/8 px-6 font-black text-white hover:bg-white/14 hover:text-white">
                <a href="/services">Compare services</a>
              </Button>
            </div>
          </div>
          <Card className="rounded-lg border-white/12 bg-white/10 text-white shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <CardContent className="p-5">
              <p className="text-sm font-black uppercase text-[#9fe3ff]">Good quote inputs</p>
              <div className="mt-4 grid gap-3">
                {["ZIP and route", "Cleaning type", "Bedrooms and bathrooms", "Condition, pets, and add-ons"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-md bg-white/8 p-3 text-sm font-black">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#9fe3ff]" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article key={section.title} className="rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm">
              <span className="text-sm font-black text-[#1f9ed6]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-3xl font-black leading-tight">{section.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{section.copy}</p>
              <Separator className="my-5" />
              <div className="grid gap-2">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2 text-sm font-bold">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                    {bullet}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">How to use this page</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Turn the search into the right cleaning plan.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              This page is meant to help you decide what to ask for, what changes the price, and what Shynli should know before a cleaner is assigned to the visit. The better the request is described up front, the easier it is to match the right checklist, enough time, and the right arrival window.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Use the notes here like a pre-booking checklist: compare the service type, look for the rooms or surfaces that matter most, then mention anything that would change the work. That could be pets, heavy kitchen use, an upcoming walkthrough, a building access issue, a lease deadline, or a surface that needs special care. Those details make the page more useful for you and make the quote more realistic.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.sections.map((section) => (
              <Card key={`depth-${section.title}`} className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{section.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {section.copy} When you request a quote, use these details as plain-language notes instead of trying to choose a perfect package on your own.
                  </p>
                  <div className="mt-4 grid gap-2">
                    {section.bullets.slice(0, 3).map((bullet) => (
                      <div key={`depth-${section.title}-${bullet}`} className="flex items-start gap-2 text-sm font-bold">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Next steps</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Make the page useful before the quote.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              These pages are meant to help people choose the right service, understand what changes the price, and move toward booking without guessing.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cde5f2] md:grid-cols-3">
            {[
              ["01", "Choose the clean", "Regular, deep, move, property-type, or recurring service."],
              ["02", "Share the home", "Bedrooms, bathrooms, pets, access, and the current condition."],
              ["03", "Confirm extras", "Fridge, oven, cabinets, windows, blinds, or special timing."],
            ].map(([number, heading, copy]) => (
              <div key={number} className="bg-[#f7fbfd] p-5">
                <span className="text-sm font-black text-[#1f9ed6]">{number}</span>
                <h3 className="mt-3 text-xl font-black">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Answers before you book.</h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-1">
            {page.faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index + 1}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Helpful links</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Keep moving through the site.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              These links help you compare services, check prices, read checklists, and move toward the right quote without starting over.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {page.links.map(([label, href]) => (
              <a key={`${label}-${href}`} href={resolveSiteHref(href, { sourcePage: page.path })} className="inline-flex min-h-11 items-center rounded-full border border-[#d8e8f0] bg-white px-4 text-sm font-black shadow-sm hover:border-[#1976a3]">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Related pages</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">More useful pages from this topic.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Each support page connects back to the main booking paths and to nearby topics a visitor may want to compare.
            </p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {relatedLinkGroups.map((group) => (
              <Card key={group.title} className="rounded-lg border-[#cde5f2] shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-xl font-black">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.links
                      .filter(([, href]) => href !== page.path)
                      .map(([label, href]) => (
                        <a key={`${group.title}-${href}`} href={resolveSiteHref(href, { sourcePage: page.path })} className="inline-flex min-h-10 items-center rounded-full border border-[#d8e8f0] bg-[#f7fbfd] px-3 text-sm font-black hover:border-[#1976a3]">
                          {label}
                        </a>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Service questions</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">What to compare before you pick a clean.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The fastest path is not always the cheapest card. Pick the service that matches the reason you are booking, then use the quote to confirm time, add-ons, and the final plan.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue="service-q-1">
            {[
              ["Should I choose regular or deep cleaning?", "Choose regular cleaning when the home is already maintained and needs upkeep. Choose deep cleaning when buildup, edges, baseboards, doors, fixtures, or neglected areas need more detail."],
              ["Should move-out cleaning be booked separately?", "Yes. Move-out cleaning is built around empty-room handoff, walkthrough expectations, cabinets, appliances, access, and lock-up notes. It should not be priced like a normal occupied-home visit."],
              ["Can property type change the quote?", "Yes. Apartments, condos, townhouses, and houses can all have different access, parking, stairs, elevator, floor, and room-layout details."],
              ["What should I do if I am unsure?", "Start with the closest service page, then share the home condition and priorities in the quote path. Shynli can adjust the recommendation before booking."],
            ].map(([question, answer], index) => (
              <AccordionItem key={question} value={`service-q-${index + 1}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
      <StickyBookingBar />
    </main>
  )
}

export function ServiceAreasPage() {
  const serviceAreaFaqs: [string, string][] = [
    ["How do I know if Shynli serves my exact address?", "Start with the closest city, then check your ZIP. We confirm the route, timing, and address before asking for the rest of the home details."],
    ["Why are there city pages if the ZIP still matters?", "A city page helps you choose the right local starting point. The ZIP check confirms whether the visit fits the actual route and schedule."],
    ["Can I book different cleaning services in the same city?", "Yes. Most cities can start with regular, deep, move-in, move-out, recurring, house, apartment, and one-time cleaning pages."],
    ["What if my city is near one of the listed suburbs?", "Use the nearest city or the quote form. Some nearby ZIP codes may be available by route and schedule."],
  ]

  useSeoMeta(
    "Service Areas | Shynli Cleaning",
    "See the Illinois cities Shynli Cleaning serves, then check your ZIP for standard, deep, move-in, move-out, and recurring home cleaning.",
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: "Shynli Cleaning Service Areas",
          url: "https://shynli.com/service-areas",
          hasPart: cityPages.map((city) => ({ "@type": "WebPage", name: `${city.name} house cleaning`, url: `https://shynli.com/service-areas/${city.slug}` })),
        },
        {
          "@type": "FAQPage",
          mainEntity: serviceAreaFaqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    },
  )

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-14 pt-28 text-white md:px-8 md:pb-18 md:pt-32">
        <div
          className="absolute inset-0 bg-cover opacity-74 saturate-[0.92]"
          style={{ backgroundImage: `url(${heroImageLibrary.localRoute.src})`, backgroundPosition: heroImageLibrary.localRoute.position }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,38,51,0.98)_0%,rgba(13,38,51,0.88)_46%,rgba(13,38,51,0.48)_76%,rgba(13,38,51,0.42)_100%),linear-gradient(0deg,rgba(13,38,51,0.94)_0%,rgba(13,38,51,0.22)_48%,rgba(13,38,51,0.66)_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Service areas</p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">Home cleaning across the western suburbs.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Choose your city, then start with your ZIP. We will make sure the address, timing, home details, and any extras are clear before you book.
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#9fe3ff]/86">{heroImageLibrary.localRoute.label}</p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          {serviceAreaGroups.map((group) => (
            <div key={group.label} className="rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black">{group.label}</h2>
                <MapPin className="size-5 text-[#1976a3]" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {group.cities.map((city) => (
                  <a key={city} href={`/service-areas/${slugifyCity(city)}`} className="flex min-h-12 items-center justify-between rounded-md border border-[#d8e8f0] bg-[#f7fbfd] px-4 text-sm font-black transition-colors hover:border-[#1976a3] hover:bg-[#eaf7ff]">
                    {city}
                    <ArrowRight className="size-4 text-[#1976a3]" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">How coverage works</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">The city list is the start. The ZIP check confirms the route.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Service-area pages should answer the real local question: can Shynli reach this home, what kind of clean can be booked there, and what details change the appointment? We list the main western-suburb cities, then confirm the exact ZIP, timing, service type, and access details before asking you to commit to the visit.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              This matters for real customers: a city name alone does not explain whether a home is a standard weekly reset, a deep catch-up clean, a move-out walkthrough, or an apartment with building instructions. Each local page adds the next layer so visitors can choose a route, understand the service, and move toward a quote with fewer unanswered questions. The goal is to make the coverage page useful even before someone clicks into a specific suburb, with enough context to compare coverage, price signals, and service fit from one place.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Route fit", "We check the city, ZIP, and appointment window together because nearby homes can fall on different route days."],
              ["Service fit", "Regular, deep, move-in, move-out, recurring, apartment, condo, townhouse, and house cleaning can each need different time."],
              ["Home details", "Bedrooms, bathrooms, floors, pets, condition, parking, elevators, gates, and lockbox notes all help the cleaner arrive prepared."],
              ["Local next step", "Choose your city first, then use the city page or local service page to compare what is included before requesting the quote."],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Popular local services</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Start with a city and the clean you need.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Start with the closest city, then compare the cleaning options, timing details, and what is included before requesting a quote.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {importantCityPages.map((city) => (
              <Card key={city.slug} className="rounded-lg border-[#cde5f2] shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black">{city.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {getCityServiceSeoServices(city.name).map((service) => (
                      <a key={service.slug} href={`/service-areas/${city.slug}/${service.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-[#d8e8f0] bg-[#f7fbfd] px-3 text-sm font-black hover:border-[#1976a3]">
                        {service.shortName}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Service questions</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">What to compare before you pick a clean.</h2>
          </div>
          <Accordion type="single" collapsible defaultValue="services-index-q-1">
            {[
              ["Should I choose regular or deep cleaning?", "Choose regular cleaning when the home is already maintained and needs upkeep. Choose deep cleaning when buildup, edges, baseboards, doors, fixtures, or neglected areas need more detail."],
              ["Should move-out cleaning be booked separately?", "Yes. Move-out cleaning is built around empty-room handoff, walkthrough expectations, cabinets, appliances, access, and lock-up notes."],
              ["Can property type change the quote?", "Yes. Apartments, condos, townhouses, and houses can all have different access, parking, stairs, elevator, floor, and room-layout details."],
              ["What should I do if I am unsure?", "Start with the closest service page, then share the home condition and priorities in the quote path. Shynli can adjust the recommendation before booking."],
            ].map(([question, answer], index) => (
              <AccordionItem key={question} value={`services-index-q-${index + 1}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
      <StickyBookingBar />
    </main>
  )
}

export function ServicesIndexPage() {
  const serviceHubFaqs: [string, string][] = [
    ["Should I choose regular or deep cleaning?", "Choose regular cleaning when the home is already maintained and needs upkeep. Choose deep cleaning when buildup, edges, baseboards, doors, fixtures, or neglected areas need more detail."],
    ["Should move-out cleaning be booked separately?", "Yes. Move-out cleaning is built around empty-room handoff, walkthrough expectations, cabinets, appliances, access, and lock-up notes."],
    ["Can property type change the quote?", "Yes. Apartments, condos, townhouses, and houses can all have different access, parking, stairs, elevator, floor, and room-layout details."],
    ["What should I do if I am unsure?", "Start with the closest service page, then share the home condition and priorities in the quote path. Shynli can adjust the recommendation before booking."],
  ]

  useSeoMeta(
    "Cleaning Services | Shynli Cleaning",
    "Compare Shynli regular cleaning, deep cleaning, move-in, move-out, one-time, recurring, apartment, house, townhouse, and condo cleaning services.",
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: "Shynli Cleaning Services",
          url: "https://shynli.com/services",
          hasPart: publicSeoServices.map((service) => ({ "@type": "WebPage", name: service.name, url: `https://shynli.com/services/${service.slug}` })),
        },
        {
          "@type": "FAQPage",
          mainEntity: serviceHubFaqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    },
  )

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-14 pt-28 text-white md:px-8 md:pb-18 md:pt-32">
        <div
          className="absolute inset-0 bg-cover opacity-72 saturate-[0.94]"
          style={{ backgroundImage: `url(${heroImageLibrary.cleanerAtWork.src})`, backgroundPosition: heroImageLibrary.cleanerAtWork.position }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,38,51,0.98)_0%,rgba(13,38,51,0.9)_44%,rgba(13,38,51,0.5)_74%,rgba(13,38,51,0.44)_100%),linear-gradient(0deg,rgba(13,38,51,0.94)_0%,rgba(13,38,51,0.26)_48%,rgba(13,38,51,0.68)_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Cleaning services</p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">Choose the clean that fits the home.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Compare regular, deep, move, property-type, and recurring cleaning options before you check times. Every service starts with a ZIP check and a clear quote path.
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#9fe3ff]/86">{heroImageLibrary.cleanerAtWork.label}</p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {publicSeoServices.map((service) => (
            <article key={service.slug} className="rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase text-[#1976a3]">{service.category === "main" ? "Core service" : "Home type / schedule"}</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">{service.name}</h2>
              <p className="mt-4 min-h-24 text-sm leading-6 text-muted-foreground">{service.intro}</p>
              <Separator className="my-5" />
              <div className="grid gap-2">
                {service.bestFor.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm font-bold">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                    {item}
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6 h-11 rounded-full bg-[#1f9ed6] px-5 font-black text-white hover:bg-[#168ac0]">
                <a href={`/services/${service.slug}`}>
                  View service
                  <ArrowRight />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Choosing the right service</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Different cleaning jobs should not share the same quote path.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A strong service page helps a visitor pick the right starting point before they request a price. Standard cleaning is not the same as deep cleaning, a move-out handoff is not the same as recurring upkeep, and an apartment with elevator notes needs a different intake than a single-family home.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Maintenance", "Regular, weekly, biweekly, and recurring cleaning are best when the home is lived-in and needs steady upkeep before buildup takes over."],
              ["Catch-up detail", "Deep cleaning and one-time cleaning are better when bathrooms, kitchens, baseboards, doors, and high-touch areas need more time."],
              ["Move timing", "Move-in, move-out, rental, and apartment handoff pages focus on empty rooms, cabinets, appliances, access, and walkthrough expectations."],
              ["Property type", "House, condo, townhouse, and apartment cleaning pages help visitors understand access, stairs, parking, unit size, and the spaces that matter most."],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Service questions</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">What to compare before you pick a clean.</h2>
          </div>
          <Accordion type="single" collapsible defaultValue="services-hub-q-1">
            {serviceHubFaqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`services-hub-q-${index + 1}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#0d2633] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Ready to narrow it down</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Start broad, then confirm the exact clean.</h2>
          </div>
          <p className="text-lg leading-8 text-white/72">
            The service hub should help visitors move from a general search like house cleaning, maid service, deep cleaning, or move-out cleaning into the page that best matches the job. From there, the city, ZIP, home size, condition, access notes, and add-ons make the quote specific enough to be useful.
          </p>
        </div>
      </section>

      <SiteFooter />
      <StickyBookingBar />
    </main>
  )
}

export function CityPage({ city }: { city: (typeof cityPages)[number] }) {
  const [estimateService, setEstimateService] = useState("Standard")
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const title = `House Cleaning in ${city.name}, IL | Shynli Cleaning`
  const description = `Book standard, deep, move-in, move-out, and recurring home cleaning in ${city.name}, IL. Check your ZIP and get a clear Shynli quote before booking.`
  const cityAngle = getCityAngle(city)
  const routeNote = cityRouteNotes[city.group] ?? "We check your ZIP, timing, and home details first so the visit is planned before you book."
  const cityFaqs = getCityFaqs(city.name)
  const heroImage = cityHeroImages[city.slug]
  const cityServiceLinks = hasCityServicePages(city.name) ? getCityServiceSeoServices(city.name) : []
  const cityGuide = localGuideSeoPages.find((page) => page.path.startsWith(`/service-areas/${city.slug}/`))
  const roomControls: RoomControl[] = [
    { label: "bedrooms", singular: "bedroom", short: "beds", shortSingular: "bed", value: bedrooms, setValue: setBedrooms },
    { label: "bathrooms", singular: "bathroom", short: "baths", shortSingular: "bath", value: bathrooms, setValue: setBathrooms },
  ]
  useSeoMeta(title, description, getCitySchema(city))

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-14 pt-28 text-white md:px-8 md:pb-18 md:pt-32">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover opacity-74 saturate-[0.92]"
              style={{ backgroundImage: `url(${heroImage.src})`, backgroundPosition: heroImage.position }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,38,51,0.98)_0%,rgba(13,38,51,0.89)_42%,rgba(13,38,51,0.42)_73%,rgba(13,38,51,0.35)_100%),linear-gradient(0deg,rgba(13,38,51,0.96)_0%,rgba(13,38,51,0.2)_48%,rgba(13,38,51,0.62)_100%)]" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(31,158,214,0.22),rgba(31,158,214,0))]" aria-hidden="true" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(159,227,255,0.16),transparent_34%),linear-gradient(135deg,#0d2633_0%,#102f3d_52%,#0d2633_100%)]" aria-hidden="true" />
        )}
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_470px] lg:items-end">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Service area / {city.group}</p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">House cleaning in {city.name}, IL.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              Shynli helps {city.name} homes, apartments, condos, townhouses, rentals, and empty move spaces feel ready again. Whether you are dealing with {cityAngle}, start with your ZIP and we will make the timing, home details, and extras clear before you book.
            </p>
            {heroImage ? (
              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#9fe3ff]/86">{heroImage.label}</p>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full bg-[#1f9ed6] px-6 font-black text-white hover:bg-[#168ac0]">
                <a href="#city-quote" data-source="shynli.com" data-page-type="city" data-city={city.name} data-service="house-cleaning" data-keyword-cluster="city-house-cleaning" data-intent="quote">
                  Get a {city.name} quote
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/35 bg-white/8 px-6 font-black text-white hover:bg-white/14 hover:text-white">
                <a href={businessPhoneHref}>Call {businessPhoneDisplay}</a>
              </Button>
            </div>
          </div>
          <EstimateCard
            selectedService={estimateService}
            setSelectedService={setEstimateService}
            roomControls={roomControls}
            cityName={city.name}
          />
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-4">
          {cityPageServices.map((service) => (
            <article key={service.id} id={service.id} className="rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase text-[#1976a3]">{city.name}</p>
              <h2 className="mt-3 text-2xl font-black leading-tight">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
              <Separator className="my-4" />
              <div className="grid gap-2">
                {service.checklist.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm font-bold">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                    {item}
                  </div>
                ))}
              </div>
              {hasCityServicePages(city.name) ? (
                <a href={`/service-areas/${city.slug}/${service.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1f9ed6] px-4 text-sm font-black text-white transition-colors hover:bg-[#168ac0]">
                  View {service.title} in {city.name}
                  <ArrowRight className="size-4" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {cityServiceLinks.length ? (
        <section className="bg-white px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
              <div>
                <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Popular {city.name} services</p>
                <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Choose the exact clean before you quote.</h2>
              </div>
              <p className="text-lg leading-8 text-muted-foreground">
                These local service pages explain what each {city.name} clean can include, what changes the quote, and what to expect before booking.
              </p>
            </div>
            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {cityServiceLinks.map((service) => (
                <a key={service.slug} href={`/service-areas/${city.slug}/${service.slug}`} className="flex min-h-16 items-center justify-between rounded-lg border border-[#cde5f2] bg-[#f7fbfd] px-4 text-sm font-black shadow-sm transition-colors hover:border-[#1976a3] hover:bg-[#eaf7ff]">
                  {service.name}
                  <ArrowRight className="size-4 shrink-0 text-[#1976a3]" />
                </a>
              ))}
              {cityGuide ? (
                <a href={cityGuide.path} className="flex min-h-16 items-center justify-between rounded-lg border border-[#1976a3] bg-[#eaf7ff] px-4 text-sm font-black text-[#1976a3] shadow-sm transition-colors hover:bg-[#d8f1ff]">
                  {city.name} cleaning guide
                  <ArrowRight className="size-4 shrink-0" />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.78fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">What the visit can feel like</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">A more visual look at a {city.name} clean.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              The right clean is not just a checklist. It is walking back into a home that feels lighter, calmer, and ready for the next part of the day.
            </p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {cityVisualMoments.map((moment) => (
              <article key={moment.title} className="overflow-hidden rounded-lg border border-[#cde5f2] bg-white shadow-sm">
                <div className="relative h-64 overflow-hidden bg-[#dff3fb] md:h-72">
                  <img
                    src={moment.image}
                    alt=""
                    className="h-full w-full object-cover saturate-[0.94] transition-transform duration-500 hover:scale-[1.03]"
                    style={{ objectPosition: moment.imagePosition }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,38,51,0)_38%,rgba(13,38,51,0.72)_100%)]" />
                  <p className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase text-[#1976a3] shadow-sm">
                    {moment.eyebrow}
                  </p>
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{moment.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Why people book</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Cleaning help for real {city.name} situations.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Most people do not need a mystery appointment. They need to know the cleaner understands the home, the timing, and the reason this visit matters.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Weekly reset", `${city.name} homes that need kitchens, bathrooms, floors, and shared spaces kept under control without a weekend cleaning spiral.`],
              ["Catch-up clean", `Homes that are not trashed, but need detail work around buildup, baseboards, high-touch surfaces, and rooms that have fallen behind.`],
              ["Move timing", `Renters, owners, sellers, and new keys where access, empty rooms, cabinets, appliances, and lock-up notes matter.`],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#cde5f2] shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-xl font-black">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef8fc] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Local details</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Cleaning that starts with your actual home.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {routeNote} That way your price is based on the home in front of us, not a one-size-fits-all promise.
            </p>
          </div>
          <div className="grid gap-4">
            <Card className="rounded-lg border-[#cde5f2] shadow-sm">
              <CardContent className="p-5">
                <h3 className="text-xl font-black">Homes we can help with</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {["Single-family homes", "Apartments and condos", "Townhouses", "Rental turnovers", "Move-in homes", "Move-out homes"].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm font-bold">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg border-[#cde5f2] shadow-sm">
              <CardContent className="p-5">
                <h3 className="text-xl font-black">Nearby cities we serve</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {city.nearby.map((nearbyCity) => (
                    <a key={nearbyCity} href={`/service-areas/${slugifyCity(nearbyCity)}`} className="inline-flex min-h-10 items-center rounded-full border border-[#d8e8f0] bg-white px-3 text-sm font-black hover:border-[#1976a3]">
                      {nearbyCity}
                    </a>
                  ))}
                  <a href="/service-areas" className="inline-flex min-h-10 items-center rounded-full border border-[#1976a3] bg-[#eaf7ff] px-3 text-sm font-black text-[#1976a3]">
                    All service areas
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.76fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Room-by-room checklist</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">What a {city.name} cleaning can cover.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Choose standard, deep, move, or recurring cleaning, and we will match the checklist to what the home actually needs.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {roomChecklist.map((group) => (
              <Card key={group.area} className="rounded-lg border-[#cde5f2] shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black">{group.area}</h3>
                  <div className="mt-4 grid gap-2">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm font-bold">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d2633] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Clear pricing</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Your price, explained before you book.</h2>
            <p className="mt-5 text-lg leading-8 text-white/68">
              Every {city.name} home is different. We look at size, condition, timing, and extras first, so there are fewer surprises later.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-white/12 md:grid-cols-3">
            {[
              ["01", "Start with ZIP", "We make sure we can reach the address and offer a time that works."],
              ["02", "Choose the clean", "Standard, deep, move, or recurring cleaning each needs a different amount of time and detail."],
              ["03", "Share the details", "Bedrooms, bathrooms, pets, access, appliances, and condition help us price the visit fairly."],
            ].map(([number, heading, copy]) => (
              <div key={number} className="bg-white/6 p-5">
                <span className="text-sm font-black text-[#9fe3ff]">{number}</span>
                <h3 className="mt-3 text-xl font-black">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Before you book in {city.name}.</h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-1">
            {cityFaqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index + 1}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
      <StickyBookingBar />
    </main>
  )
}

export function ServiceSeoPage({ service, city }: { service: (typeof seoServices)[number]; city?: (typeof cityPages)[number] }) {
  const [estimateService, setEstimateService] = useState(service.shortName === "Move-In" || service.shortName === "Move-Out" || service.shortName === "Move Clean" ? "Move" : service.shortName === "Deep" ? "Deep" : "Standard")
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const roomControls: RoomControl[] = [
    { label: "bedrooms", singular: "bedroom", short: "beds", shortSingular: "bed", value: bedrooms, setValue: setBedrooms },
    { label: "bathrooms", singular: "bathroom", short: "baths", shortSingular: "bath", value: bathrooms, setValue: setBathrooms },
  ]
  const location = city ? ` in ${city.name}` : ""
  const title = city ? `${service.name} in ${city.name}, IL | Shynli Cleaning` : `${service.name} | Shynli Cleaning`
  const description = city
    ? `Book ${service.name.toLowerCase()} in ${city.name}, IL. Check your ZIP, choose the clean, and get clear pricing before you book.`
    : `Book ${service.name.toLowerCase()} with Shynli Cleaning. Check your ZIP, choose the clean, and get clear pricing before you book.`
  const faqs = getServiceFaqs(service, city)
  const serviceHasLocalPages = cityPages.some((item) => getCityServiceSeoServices(item.name).some((localService) => localService.slug === service.slug))
  const nearbyCities = city?.nearby ?? (serviceHasLocalPages ? cityPages.map((item) => item.name) : featuredServiceAreaCities)
  const siblingServices = (city ? getCityServiceSeoServices(city.name) : seoServices).filter((item) => item.slug !== service.slug && (service.slug === "airbnb-cleaning" || item.slug !== "airbnb-cleaning"))
  const heroImage = serviceHeroImages[service.slug] ?? heroImageLibrary.cleanerAtWork
  const localProfile = city ? getCityServiceProfile(city) : undefined
  const decisionBlock = city ? cityServiceDecisionBlocks[service.slug] : undefined
  const localSnapshots = city ? getCityServiceLocalSnapshots(city, service) : []
  useSeoMeta(title, description, getServiceSchema(service, city))

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-12 pt-28 text-white md:px-8 md:pb-16 md:pt-32">
        <div
          className="absolute inset-0 bg-cover opacity-74 saturate-[0.94]"
          style={{ backgroundImage: `url(${heroImage.src})`, backgroundPosition: heroImage.position }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,38,51,0.98)_0%,rgba(13,38,51,0.9)_44%,rgba(13,38,51,0.52)_74%,rgba(13,38,51,0.46)_100%),linear-gradient(0deg,rgba(13,38,51,0.94)_0%,rgba(13,38,51,0.28)_48%,rgba(13,38,51,0.7)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(31,158,214,0.2),rgba(31,158,214,0))]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_470px] lg:items-end">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">{city ? `${city.name} cleaning service` : "Shynli cleaning service"}</p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">
              {service.name}{city ? ` in ${city.name}, IL.` : "."}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {service.intro} {city ? `For ${city.name} homes, we start with your ZIP, timing, access notes, and the details that matter before you book.` : "Start with your ZIP, then we match the visit to your home, timing, and the details that matter."}
            </p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#9fe3ff]/86">{heroImage.label}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full bg-[#1f9ed6] px-6 font-black text-white hover:bg-[#168ac0]">
                <a href="#service-quote" data-source="shynli.com" data-page-type={city ? "city-service" : "service"} data-city={city?.name ?? ""} data-service={service.slug} data-keyword-cluster={`${city ? "city-" : ""}${service.slug}`} data-intent="quote">
                  Check times
                  <ArrowRight />
                </a>
              </Button>
              {city ? (
                <Button asChild variant="outline" className="h-12 rounded-full border-white/35 bg-white/8 px-6 font-black text-white hover:bg-white/14 hover:text-white">
                  <a href={`/service-areas/${city.slug}`}>View {city.name} area</a>
                </Button>
              ) : (
                <Button asChild variant="outline" className="h-12 rounded-full border-white/35 bg-white/8 px-6 font-black text-white hover:bg-white/14 hover:text-white">
                  <a href="/service-areas">View service areas</a>
                </Button>
              )}
            </div>
          </div>
          <div id="service-quote">
            <EstimateCard
              selectedService={estimateService}
              setSelectedService={setEstimateService}
              roomControls={roomControls}
              cityName={city?.name}
            />
          </div>
        </div>
      </section>

      {!city && service.slug === "deep-cleaning" ? <DeepCleaningLandingBlock city={city} /> : null}
      {service.slug === "airbnb-cleaning" ? <AirbnbCleaningLandingBlock city={city} /> : null}

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">What is included</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">What {service.name.toLowerCase()}{location} can cover.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The exact checklist depends on your home, condition, and extras, but the visit starts with the areas people care about most.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.included.map((item) => (
              <Card key={item} className="rounded-lg border-[#cde5f2] shadow-sm">
                <CardContent className="flex min-h-24 items-start gap-3 p-5">
                  <Check className="mt-1 size-5 shrink-0 text-[#1f9ed6]" />
                  <p className="font-black leading-6">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Best fit</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">When this clean makes sense.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              A good cleaning visit should be easy to choose. These are the situations where {service.name.toLowerCase()} is usually the right fit.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {service.bestFor.map((item) => (
              <Card key={item} className="rounded-lg border-[#cde5f2] bg-[#f7fbfd] shadow-sm">
                <CardContent className="p-5">
                  <Sparkles className="size-6 text-[#1f9ed6]" />
                  <h3 className="mt-4 text-2xl font-black leading-tight">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    We plan the visit around the home, access, timing, and anything you want handled carefully.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {city && localProfile ? (
        <section className="bg-[#eef8fc] px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.76fr_1.24fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Local visit notes</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">How {service.shortName.toLowerCase()} works around {city.name}.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{localProfile.areaNote}</p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The cleaner should know the home type, access details, and reason for the visit before the appointment is held. That keeps the quote tied to the real home, not only to the city name.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Homes we commonly plan around", localProfile.homeMix],
                ["Access and arrival details", localProfile.accessNote],
                ["What to mention before booking", getLocalServicePrompt(service, localProfile)],
                ["Nearby route context", `${city.nearby.slice(0, 3).join(", ")} are nearby service-area checks, so ZIP and appointment window still matter even when the city is on the list.`],
                ["Local reference point", `${cityHeroImages[city.slug]?.label ?? `${city.name} neighborhoods`} helps frame the route, but the real scheduling decision still comes from the ZIP, parking, access, and how far the home sits from the cleaner's next stop.`],
                ["Visit scenario", `${getCityAngle(city)} For ${service.name.toLowerCase()}, that usually means confirming whether the visit is routine upkeep, catch-up detail, move timing, apartment access, or post-project dust before the cleaner is assigned.`],
                ...localSnapshots,
              ].map(([heading, copy]) => (
                <Card key={heading} className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city && decisionBlock ? (
        <section className="bg-white px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">{service.name} fit</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">{decisionBlock.heading}</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {decisionBlock.intro} For {city.name}, we also account for {localProfile?.homeMix.toLowerCase()} {localProfile?.accessNote.toLowerCase()}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {decisionBlock.cards.map(([heading, copy]) => (
                <Card key={heading} className="rounded-lg border-[#cde5f2] bg-[#f7fbfd] shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Price and timing</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Clear pricing before the cleaner arrives.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {service.priceNote} {city ? `For ${city.name}, we also check your ZIP and appointment window before booking.` : "We also check your ZIP and appointment window before booking."}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cde5f2] md:grid-cols-3">
            {[
              ["01", "Home size", "Bedrooms, bathrooms, floors, and total space shape the time needed."],
              ["02", "Condition", "Buildup, pets, empty rooms, and special surfaces can change the work."],
              ["03", "Extras", "Fridge, oven, cabinets, blinds, walls, or interior windows can be added when needed."],
            ].map(([number, heading, copy]) => (
              <div key={number} className="bg-white p-5">
                <span className="text-sm font-black text-[#1f9ed6]">{number}</span>
                <h3 className="mt-3 text-xl font-black">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Before you request this clean</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">The details that make {service.name.toLowerCase()}{location} easier to price.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A useful cleaning page should not stop at a short list of tasks. Before booking, Shynli needs to understand what the home feels like today, what the visit needs to solve, and what would make the clean feel successful when you walk back in.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Current condition", `Tell us whether the home is maintained, behind, empty, recently renovated, pet-heavy, or preparing for guests. ${service.name} can mean different levels of work depending on what the cleaner is walking into.`],
              ["Access and timing", city ? `For ${city.name}, entry notes, parking, building access, lockbox details, and appointment windows help us avoid losing cleaning time at the door.` : "Entry notes, parking, building access, lockbox details, and appointment windows help us avoid losing cleaning time at the door."],
              ["Priority rooms", "If the kitchen, bathrooms, floors, bedrooms, cabinets, or move-out walkthrough matter most, say that early. The quote should reflect the rooms that carry the result."],
              ["Add-ons and limits", "Inside fridge, inside oven, cabinets, interior windows, heavy blinds, walls, and unusual surfaces should be discussed before arrival so the team has enough time and the price is clear."],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#cde5f2] bg-[#f7fbfd] shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Helpful links</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Keep comparing before you book.</h2>
          </div>
          <div className="grid gap-4">
            <Card className="rounded-lg border-[#cde5f2] shadow-sm">
              <CardContent className="p-5">
                <h3 className="text-xl font-black">{city ? `Other services in ${city.name}` : "Other cleaning services"}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siblingServices.map((item) => (
                    <a key={item.slug} href={city ? `/service-areas/${city.slug}/${item.slug}` : `/services/${item.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-[#d8e8f0] bg-[#f7fbfd] px-3 text-sm font-black hover:border-[#1976a3]">
                      {item.name}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg border-[#cde5f2] shadow-sm">
              <CardContent className="p-5">
                <h3 className="text-xl font-black">{city ? "Nearby cities" : "Popular service areas"}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {nearbyCities.map((name) => {
                    const nearbyHasServicePage = serviceHasLocalPages && hasCityServicePages(name) && getCityServiceSeoServices(name).some((localService) => localService.slug === service.slug)
                    const nearbyHref = nearbyHasServicePage ? `/service-areas/${slugifyCity(name)}/${service.slug}` : `/service-areas/${slugifyCity(name)}`
                    return (
                    <a key={name} href={nearbyHref} className="inline-flex min-h-10 items-center rounded-full border border-[#d8e8f0] bg-[#f7fbfd] px-3 text-sm font-black hover:border-[#1976a3]">
                      {nearbyHasServicePage ? `${service.shortName} in ${name}` : name}
                    </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-[#0d2633] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Why Shynli</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">A cleaner home, with fewer surprises.</h2>
            <p className="mt-5 text-lg leading-8 text-white/68">
              Supplies are included, the plan is clear before the visit, and you have a simple way to reach us if something important needs attention.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {["Supplies included", "Insured local team", "Make-it-right follow-up"].map((item) => (
              <div key={item} className="rounded-lg border border-white/12 bg-white/6 p-5">
                <Check className="size-5 text-[#9fe3ff]" />
                <h3 className="mt-4 text-xl font-black">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">Before you book {service.name.toLowerCase()}{location}.</h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-1">
            {faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index + 1}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
      <StickyBookingBar />
    </main>
  )
}

export function HomePage() {
  const homeFaqs: [string, string][] = [
    ["What is included in a deep cleaning?", "Deep cleaning includes the standard rooms plus more detailed attention to buildup, edges, high-touch surfaces, and optional extras like inside appliances or cabinets."],
    ["Do cleaners bring supplies?", "Yes. Supplies are included unless you prefer specific products for your home."],
    ["Can I book move-out cleaning this week?", "Usually, yes. Enter your ZIP and preferred timing so we can confirm the earliest available slot."],
    ["How is the price figured out?", "Your price depends on home size, bedrooms, bathrooms, condition, pets, service type, recurring frequency, and any extras you choose."],
  ]

  useSeoMeta(
    "Shynli Cleaning | House Cleaning in Chicago's Western Suburbs",
    "Shynli helps western-suburb homes book regular, deep, move-in, move-out, apartment, and recurring cleaning with clear quotes and local service.",
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          name: publicBusinessName,
          legalName: legalBusinessName,
          url: "https://shynli.com",
          telephone: businessPhoneSchema,
          areaServed: ["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook", "Downers Grove"].map((name) => ({ "@type": "City", name })),
          priceRange: "$$",
          description: "Local home cleaning service for regular cleaning, deep cleaning, move-in cleaning, move-out cleaning, apartment cleaning, and recurring cleaning.",
        },
        {
          "@type": "WebSite",
          name: publicBusinessName,
          url: "https://shynli.com",
        },
        {
          "@type": "FAQPage",
          mainEntity: homeFaqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    },
  )
  const [estimateService, setEstimateService] = useState("Standard")
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [stickyZip, setStickyZip] = useState("")
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)
  const [activeChecklist, setActiveChecklist] = useState("48-point home reset")
  const roomControls = [
    { label: "bedrooms", singular: "bedroom", short: "beds", shortSingular: "bed", value: bedrooms, setValue: setBedrooms },
    { label: "bathrooms", singular: "bathroom", short: "baths", shortSingular: "bath", value: bathrooms, setValue: setBathrooms },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-background pb-32 text-foreground md:pb-28">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d2633]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href="#top" className="group flex min-h-11 items-center gap-3" aria-label="Shynli home">
            <span className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/18 transition-transform group-hover:scale-105">
              <svg className="size-8" viewBox="0 0 48 48" aria-hidden="true">
                <defs>
                  <linearGradient id="shynli-mark" x1="11" x2="37" y1="9" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A9ECFF" />
                    <stop offset="1" stopColor="#1F9ED6" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#shynli-mark)"
                  d="M24 5.8c-4.9 6.2-11.6 13.6-11.6 22.1 0 7.1 5.2 12.5 11.6 12.5s11.6-5.4 11.6-12.5C35.6 19.4 28.9 12 24 5.8Z"
                />
                <path
                  fill="#fff"
                  fillOpacity=".78"
                  d="M17.5 29.4c3.7 2.2 9.5 2.2 13.1-.3-.6 4.2-3.1 6.8-6.7 6.8-3.3 0-5.9-2.4-6.4-6.5Z"
                />
                <path fill="#fff" d="M34.4 9.2l1.1 3.1 3.1 1.1-3.1 1.1-1.1 3.1-1.1-3.1-3.1-1.1 3.1-1.1 1.1-3.1Z" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-black">Shynli</span>
              <span className="mt-1 h-1 w-12 rounded-full bg-[#9fe3ff]" aria-hidden="true" />
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm text-white/82 md:flex" aria-label="Main navigation">
            {[
              ["Services", "/services"],
              ["Quote", "#quote"],
              ["Areas", "/service-areas"],
              ["Pricing", "/pricing"],
              ["FAQ", "/faq"],
            ].map(([label, href]) => (
              <a key={label} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white" href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a className="hidden min-h-11 items-center gap-2 text-sm font-bold text-white/88 transition-colors hover:text-white sm:flex" href={businessPhoneHref}>
              <Phone className="size-4" />
              {businessPhoneDisplay}
            </a>
            <Button asChild className="h-11 rounded-full bg-white px-5 font-black text-foreground shadow-none hover:bg-white/90">
              <a href={buildQuoteUrl({ service: "home-cleaning" })}>Get quote</a>
            </Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative min-h-[92svh] bg-[#0d2633] text-white">
        <div
          className="absolute inset-0 bg-cover bg-[62%_38%] md:bg-[center_32%]"
          style={{ backgroundImage: "url(/cleaner-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,34,48,0.97)_0%,rgba(10,34,48,0.88)_34%,rgba(10,34,48,0.42)_68%,rgba(10,34,48,0.16)_100%),linear-gradient(0deg,rgba(10,34,48,0.94)_0%,rgba(10,34,48,0)_42%)]" />

        <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-end gap-8 px-4 pb-24 pt-24 md:grid-cols-[1fr_420px] md:px-8 md:pb-24 lg:grid-cols-[1fr_470px]">
          <div className="max-w-3xl animate-rise">
            <Badge className="mb-5 rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-white shadow-none backdrop-blur-md hover:bg-white/12">
              Local home cleaning across Chicago's western suburbs
            </Badge>
            <h1 className="max-w-[780px] text-[clamp(4.4rem,11vw,9.8rem)] font-black leading-[0.82] tracking-normal">
              Shynli
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.55rem,3vw,3.45rem)] font-black leading-[0.98]">
              The clean-home reset handled by real people, with a quote you can understand.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-white/86">
              {["Supplies included", "Insured local team", "No hidden fees", "Make-it-right follow-up"].map((item) => (
                <span key={item} className="inline-flex min-h-8 items-center gap-2">
                  <Check className="size-4 text-[#9fe3ff]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <EstimateCard
            selectedService={estimateService}
            setSelectedService={setEstimateService}
            roomControls={roomControls}
            className="animate-rise-delayed mb-16 md:mb-0"
          />
        </div>
      </section>

      <section className="bg-[#0d2633] px-4 pb-8 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-white/12 bg-white/8 backdrop-blur md:grid-cols-3">
          {trustStats.map(([number, label]) => (
            <div key={label} className="border-b border-white/12 p-6 md:border-b-0 md:border-r md:last:border-r-0">
              <div className="text-5xl font-black leading-none text-[#9fe3ff]">{number}</div>
              <p className="mt-2 text-sm font-bold uppercase text-white/68">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Services and starting prices</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
                Pick the clean that matches the job.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:justify-self-end">
              See a starting price first, then tell us the details that change the visit: home size, condition, pets, extras, and timing.
            </p>
          </div>

          <div className="mt-7 grid gap-3 lg:grid-cols-4">
            {servicePlans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`overflow-hidden rounded-lg border-[#cde5f2] bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(25,118,163,0.14)] ${
                  index === 0 ? "ring-2 ring-[#1f9ed6]/25" : ""
                }`}
              >
                <div className={`${index === 0 ? "bg-[#1f9ed6] text-white" : "bg-[#eaf7ff] text-[#1976a3]"} px-5 py-3 text-center text-sm font-black uppercase`}>
                  {plan.ribbon}
                </div>
                <CardContent className="flex flex-col p-5 md:min-h-[430px]">
                  <div>
                    <h3 className="text-3xl font-black tracking-normal text-[#0d2633]">{plan.name}</h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground md:min-h-[104px]">{plan.description}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveChecklist(plan.checklist)
                        setIsChecklistOpen(true)
                      }}
                      className="my-5 flex min-h-11 w-full items-center gap-3 border-y border-border py-4 text-left font-black text-[#145f85] transition-colors hover:text-[#1f9ed6]"
                    >
                      <Sparkles className="size-5 shrink-0 text-[#1f9ed6]" />
                      <span>{plan.checklist}</span>
                      <span className="ml-auto text-sm font-black text-[#1f9ed6] underline decoration-[#9fe3ff] underline-offset-4">Learn more</span>
                    </button>
                    <div className="mt-4 space-y-3">
                      {plan.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm font-black text-[#0d2633]">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3]">
                            <Check className="size-3.5" />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <p className="text-sm font-black uppercase text-muted-foreground">Starting at</p>
                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-4xl font-black leading-none text-[#0d2633]">{plan.price}</span>
                      <span className="pb-1 text-sm font-black text-muted-foreground">/ {plan.unit}</span>
                    </div>
                    <Button asChild className="mt-5 h-12 w-full rounded-full bg-[#1f9ed6] font-black text-white hover:bg-[#168ac0]">
                      <a href="#quote">
                        Start quote
                        <ArrowRight />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-7 rounded-lg border border-[#cde5f2] bg-[#f7fbfd] p-4 text-sm leading-6 text-muted-foreground">
            Prices are pulled from Shynli's live pricing page and are starting points. We confirm the real price before booking, and you do not need a card to check times.
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
            <Card className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
              <CardContent className="p-5">
                <h3 className="text-xl font-black text-[#0d2633]">Recurring starting prices</h3>
                <div className="mt-4 grid gap-2">
                  {publishedRecurringPrices.map(([label, price, unit]) => (
                    <div key={label} className="flex min-h-11 items-center justify-between rounded-md bg-[#f7fbfd] px-3 text-sm font-black">
                      <span>{label}</span>
                      <span className="text-[#1976a3]">{price} / {unit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg border-[#cde5f2] bg-white shadow-sm">
              <CardContent className="p-5">
                <h3 className="text-xl font-black text-[#0d2633]">Common add-ons</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {publishedAddOnPrices.map(([label, price]) => (
                    <div key={label} className="rounded-md bg-[#f7fbfd] px-3 py-3 text-sm font-black">
                      <span className="block text-[#0d2633]">{label}</span>
                      <span className="mt-1 block text-[#1976a3]">{price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="standard" className="mt-7">
            <TabsList className="grid h-auto w-full grid-cols-4 rounded-lg bg-[#eaf3f8] p-1 shadow-[inset_0_0_0_1px_rgba(25,118,163,0.08)]">
              {services.map((service) => (
                <TabsTrigger
                  key={service.value}
                  value={service.value}
                  className="min-h-11 rounded-md px-2 py-3 text-xs font-black text-slate-500 shadow-none transition-all data-[state=active]:bg-white data-[state=active]:text-[#145f85] data-[state=active]:shadow-sm sm:text-sm md:px-5"
                >
                  {service.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {services.map((service) => (
              <TabsContent key={service.value} value={service.value} className="mt-5">
                <div className="overflow-hidden rounded-lg border border-[#cde5f2] bg-white shadow-[0_24px_80px_rgba(25,118,163,0.10)]">
                  <div className="grid gap-px bg-[#cde5f2] lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="bg-white p-6 md:p-10">
                      <Badge variant="secondary" className="rounded-full bg-[#eaf7ff] text-[#1976a3]">
                        {service.eyebrow}
                      </Badge>
                      <h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight md:text-4xl">{service.title}</h3>
                      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{service.copy}</p>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {["Supplies included", "Clear checklist", "No card to start"].map((item) => (
                          <span key={item} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#f5fbff] px-3 text-sm font-bold text-[#145f85]">
                            <Check className="size-4" />
                            {item}
                          </span>
                        ))}
                      </div>
                      <Button asChild className="mt-7 h-12 rounded-full bg-[#0d2633] px-6 font-black text-white hover:bg-[#14384a]">
                        <a href="#quote">
                          Quote this clean
                          <ArrowRight />
                        </a>
                      </Button>
                    </div>
                    <div className="bg-[#f7fbfd] p-4 md:p-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <p className="text-sm font-black uppercase text-[#1976a3]">Included focus areas</p>
                        <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-black text-muted-foreground shadow-sm sm:inline-flex">
                          Room-by-room
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {service.items.map((item) => (
                          <div key={item} className="min-h-32 rounded-md border border-[#d8e8f0] bg-white p-5 shadow-sm">
                            <span className="mb-5 grid size-10 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3]">
                              <Sparkles className="size-5" />
                            </span>
                            <p className="text-lg font-black leading-tight">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-px bg-[#cde5f2] md:grid-cols-3">
                    {[
                      ["Before we arrive", "Share pets, parking, access, and anything you want handled carefully."],
                      ["During the clean", "The team follows the clean you chose and the notes you shared for your home."],
                      ["After we leave", "If something important was missed, the follow-up path is clear."],
                    ].map(([title, copy]) => (
                      <div key={title} className="bg-white p-5">
                        <h4 className="font-black">{title}</h4>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="bg-[#eef8fc] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-[#0d2633] text-white shadow-[0_28px_80px_rgba(25,118,163,0.18)] md:min-h-[520px]">
            <div
              className="absolute inset-0 bg-cover bg-[52%_78%] opacity-72"
              style={{ backgroundImage: "url(/trust-care.jpg)" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,38,51,0.12)_0%,rgba(13,38,51,0.42)_46%,rgba(13,38,51,0.94)_100%)]" />
            <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-5 md:min-h-[520px] md:p-8">
              <p className="text-sm font-black uppercase text-[#9fe3ff]">Real service, clear standards</p>
              <h3 className="mt-3 max-w-md text-2xl font-black leading-tight md:text-4xl">
                People you can reach. A checklist you can understand.
              </h3>
              <div className="mt-5 grid gap-px overflow-hidden rounded-lg bg-white/14 sm:grid-cols-3">
                {[
                  ["01", "Prepared"],
                  ["02", "Insured"],
                  ["03", "Followed up"],
                ].map(([number, label]) => (
                  <div key={label} className="bg-white/10 p-3 backdrop-blur-md md:p-4">
                    <span className="text-xs font-black text-[#9fe3ff]">{number}</span>
                    <p className="mt-2 font-black">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">What you can trust</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
              A clean that feels organized from the start.
            </h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg bg-border">
              {[
                [ShieldCheck, "Insured and accountable", "Your home is handled by people backed by a real business, not a random listing."],
                [Clock, "Clear timing", "You know the service window, what is included, and what can change the price."],
                [HeartHandshake, "Make-it-right follow-up", "If something important is missed, Shynli has a simple path to fix it."],
              ].map(([Icon, title, copy]) => (
                <div key={String(title)} className="grid gap-4 bg-white p-5 sm:grid-cols-[44px_1fr]">
                  <span className="grid size-11 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3]">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black">{String(title)}</h3>
                    <p className="mt-1 leading-7 text-muted-foreground">{String(copy)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="areas" className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Local service area</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
                Cities we serve, checked by ZIP.
              </h2>
            </div>
            <div className="rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm">
              <p className="text-lg leading-8 text-muted-foreground">
                Naperville is one of the main areas we serve, but it is not the whole map. Start with your ZIP and we will tell you whether we can help before asking for every home detail.
              </p>
              <Button asChild className="mt-5 h-12 rounded-full bg-[#1f9ed6] px-6 font-black text-white hover:bg-[#168ac0]">
                <a href="#quote">
                  Check my ZIP
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-[#cde5f2] bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-black">Most-requested cities</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">A quick look at the cities people ask us about most. You can still check the full list.</p>
              </div>
              <Button asChild variant="outline" className="h-11 rounded-full border-[#1f9ed6] font-black text-[#1976a3] hover:bg-[#eaf7ff]">
                <a href="/service-areas">
                  View all 42 cities
                  <ArrowRight />
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {featuredServiceAreaCities.map((city) => (
                <a
                  key={city}
                  href={`/service-areas/${slugifyCity(city)}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#d8e8f0] bg-[#f7fbfd] px-3 text-sm font-bold transition-colors hover:border-[#1976a3] hover:bg-[#eaf7ff]"
                >
                  {city}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Do not see your city here? Open the full list and check your ZIP before you rule us out.
          </p>
        </div>
      </section>

      <section id="trust" className="bg-[#0d2633] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">Why Shynli</p>
          <h2 className="max-w-4xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
            Local accountability, without the guesswork.
          </h2>
          <div className="mt-7 grid overflow-hidden rounded-lg border border-white/12 md:grid-cols-3">
            {comparison.map(([title, copy], index) => (
              <div key={title} className={`border-b border-white/12 p-6 md:border-b-0 md:border-r md:p-8 md:last:border-r-0 ${index === 2 ? "bg-white text-foreground" : "bg-white/6"}`}>
                <div className="mb-10 flex items-center justify-between">
                  <span className={`text-sm font-black uppercase ${index === 2 ? "text-[#1976a3]" : "text-white/55"}`}>
                    {index === 2 ? "Best fit" : "Common option"}
                  </span>
                  {index === 2 ? <Star className="size-5 fill-[#9fe3ff] text-[#1976a3]" /> : <Home className="size-5 text-white/45" />}
                </div>
                <h3 className="text-2xl font-black">{title}</h3>
                <p className={`mt-3 leading-7 ${index === 2 ? "text-muted-foreground" : "text-white/68"}`}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">How it works</p>
              <h2 className="max-w-4xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
                From first check to clean home, without the back-and-forth.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:justify-self-end">
              Start with your ZIP, share how we should get in, and know how to reach us after the clean.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step.number} className="overflow-hidden rounded-lg border border-[#cde5f2] bg-white shadow-sm">
                <div className="relative h-44 bg-[#dff3fb] md:h-40">
                  <img
                    src={step.image}
                    alt=""
                    className="h-full w-full object-cover saturate-[0.94]"
                    style={{ objectPosition: step.imagePosition }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,38,51,0)_36%,rgba(13,38,51,0.42)_100%)]" />
                </div>
                <div className="flex items-center gap-3 px-5 pt-5">
                  <span className="text-sm font-black text-[#1f9ed6]">{step.number}</span>
                  <span className="h-px flex-1 bg-[#cde5f2]" />
                </div>
                <div className="px-5 pb-5">
                  <h3 className="mt-3 text-2xl font-black leading-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.82fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Reviews</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
                The details people remember after the clean.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:justify-self-end">
              Good cleaning reviews are specific: the team arrives prepared, the plan is clear, and the home feels easier to live in when they leave.
            </p>
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.name} className="rounded-lg border-[#cde5f2] bg-[#f7fbfd] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-[#1f9ed6]" aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-xl font-black leading-snug">"{review.quote}"</p>
                  <div className="mt-6 border-t border-[#cde5f2] pt-4">
                    <p className="font-black">{review.name}</p>
                    <p className="mt-1 text-sm font-bold uppercase text-[#1976a3]">{review.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f7fbfd] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-[0.82fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Questions before booking</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] sm:text-5xl md:text-6xl">
              Know what to expect before we arrive.
            </h2>
          </div>
          <div>
            <Separator className="mb-4" />
            <Accordion type="single" collapsible defaultValue="included">
              {homeFaqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`home-faq-${index + 1}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-5 rounded-lg bg-[#1f9ed6] p-6 text-white md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <p className="mb-3 text-sm font-black uppercase text-white/75">Ready when your home is</p>
            <h2 className="max-w-3xl text-3xl font-black leading-[1] sm:text-4xl md:text-5xl">
              Ready for the house to feel clean again?
            </h2>
          </div>
          <Button asChild size="lg" className="h-[52px] rounded-full bg-white px-7 font-black text-foreground shadow-none hover:bg-white/90">
            <a href="#quote">
              Check availability
              <ArrowRight />
            </a>
          </Button>
        </div>
      </section>

      <footer className="bg-[#0d2633] px-4 py-10 text-white md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-white/12 pb-8 lg:grid-cols-[1.25fr_2fr]">
            <div>
              <a href="#top" className="group inline-flex min-h-11 items-center gap-3" aria-label="Shynli home">
                <span className="grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/18 transition-transform group-hover:scale-105">
                  <svg className="size-9" viewBox="0 0 48 48" aria-hidden="true">
                    <defs>
                      <linearGradient id="shynli-footer-mark" x1="11" x2="37" y1="9" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A9ECFF" />
                        <stop offset="1" stopColor="#1F9ED6" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#shynli-footer-mark)"
                      d="M24 5.8c-4.9 6.2-11.6 13.6-11.6 22.1 0 7.1 5.2 12.5 11.6 12.5s11.6-5.4 11.6-12.5C35.6 19.4 28.9 12 24 5.8Z"
                    />
                    <path fill="#fff" fillOpacity=".78" d="M17.5 29.4c3.7 2.2 9.5 2.2 13.1-.3-.6 4.2-3.1 6.8-6.7 6.8-3.3 0-5.9-2.4-6.4-6.5Z" />
                    <path fill="#fff" d="M34.4 9.2l1.1 3.1 3.1 1.1-3.1 1.1-1.1 3.1-1.1-3.1-3.1-1.1 3.1-1.1 1.1-3.1Z" />
                  </svg>
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-2xl font-black">Shynli</span>
                  <span className="mt-1 h-1 w-14 rounded-full bg-[#9fe3ff]" aria-hidden="true" />
                </span>
              </a>
              <h2 className="mt-6 max-w-sm text-3xl font-black leading-tight">
                A cleaner home, handled by a local team you can reach.
              </h2>
              <div className="mt-5 grid gap-3 text-sm font-bold text-white/72">
                <a className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-white" href={businessPhoneHref}>
                  <Phone className="size-4 text-[#9fe3ff]" />
                  {businessPhoneDisplay}
                </a>
                <a className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-white" href={`mailto:${businessEmail}`}>
                  <Sparkles className="size-4 text-[#9fe3ff]" />
                  {businessEmail}
                </a>
                <p className="inline-flex min-h-11 items-center gap-2">
                  <Clock className="size-4 text-[#9fe3ff]" />
                  {preferredArrivalWindow}
                </p>
                <p className="inline-flex min-h-11 items-center gap-2">
                  <MapPin className="size-4 text-[#9fe3ff]" />
                  Naperville and Chicago's western suburbs
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-black uppercase text-[#9fe3ff]">{column.title}</h3>
                  <nav className="mt-3 grid gap-1" aria-label={`${column.title} footer links`}>
                    {column.links.map(([label, href]) => (
                      <a key={label} href={resolveSiteHref(href)} className="flex min-h-10 items-center text-sm font-bold text-white/72 transition-colors hover:text-white">
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 text-sm font-bold text-white/52 md:flex-row md:items-center md:justify-between">
            <p>Copyright © 2026 Shynli. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a className="min-h-10 transition-colors hover:text-white" href="/terms">Terms of Service</a>
              <a className="min-h-10 transition-colors hover:text-white" href="/privacy">Privacy Policy</a>
              <a className="min-h-10 transition-colors hover:text-white" href="/cancellation">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {isChecklistOpen && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#061923]/70 px-4 py-6 backdrop-blur-sm md:py-10" role="dialog" aria-modal="true" aria-labelledby="checklist-title">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-5 text-foreground shadow-[0_30px_100px_rgba(0,0,0,0.32)] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-black uppercase text-[#1976a3]">{activeChecklist}</p>
                <h2 id="checklist-title" className="text-3xl font-black leading-tight md:text-4xl">
                  Our checklists
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  Standard keeps a lived-in home reset. Deep adds buildup and edge detail. Move cleaning is built for empty-home handoffs, with appliance work and heavier conditions priced clearly before you book.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-black text-[#145f85]">
                  <span>✓ Included</span>
                  <span>+ Optional extra</span>
                  <span>— Not needed</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChecklistOpen(false)}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3] transition-colors hover:bg-[#d8f1fb]"
                aria-label="Close checklist"
              >
                <X className="size-5" />
              </button>
            </div>

            <Accordion type="single" collapsible defaultValue="bathroom" className="mt-7 space-y-3">
              {checklistSections.map((section) => (
                <AccordionItem key={section.value} value={section.value} className="rounded-lg border border-[#cde5f2] bg-white px-5 shadow-sm">
                  <AccordionTrigger className="text-left text-xl font-black hover:no-underline">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-hidden rounded-md border border-[#d8e8f0]">
                      <div className="grid grid-cols-[minmax(0,1fr)_48px_54px_54px] bg-[#f7fbfd] px-3 py-3 text-sm font-black text-[#145f85] sm:grid-cols-[1fr_72px_72px_72px]">
                        <span>What we do</span>
                        {checklistColumns.map((column) => (
                          <span key={column.key} className="text-center">{column.label}</span>
                        ))}
                      </div>
                      {section.rows.map((row) => (
                        <div key={row.task} className="grid grid-cols-[minmax(0,1fr)_48px_54px_54px] border-t border-[#d8e8f0] px-3 py-3 text-sm leading-6 sm:grid-cols-[1fr_72px_72px_72px]">
                          <span className="font-bold text-[#0d2633]">{row.task}</span>
                          {checklistColumns.map((column) => (
                            <ChecklistCell key={`${row.task}-${column.key}`} value={row[column.key]} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsChecklistOpen(false)}
              className="mt-7 h-12 w-full rounded-full border-[#1f9ed6] font-black text-[#1976a3] hover:bg-[#eaf7ff]"
            >
              <ArrowRight className="rotate-180" />
              Go back
            </Button>
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/25 bg-[#1f9ed6]/92 px-4 py-2 text-white shadow-[0_-18px_60px_rgba(13,38,51,0.25)] backdrop-blur-xl md:px-8 md:py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <a
            href={businessPhoneHref}
            className="relative hidden size-16 shrink-0 place-items-center rounded-full bg-[#eaf7ff] text-[#1f9ed6] shadow-[0_18px_40px_rgba(13,38,51,0.22)] transition-transform hover:scale-105 sm:grid"
            aria-label="Call Shynli"
          >
            <MessageCircle className="size-8" />
            <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-[#0d2633] text-xs font-black text-white ring-2 ring-[#1f9ed6]">
              1
            </span>
          </a>
          <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="hidden items-center justify-center gap-4 md:flex">
              <span className="size-2 rounded-full bg-[#c9f0ff]" />
              <p className="text-center text-sm font-black uppercase tracking-[0.34em] text-white/92">
                Book your home cleaning
              </p>
            </div>
            <form
              action={buildQuoteUrl({ zip: stickyZip, service: estimateService, bedrooms, bathrooms })}
              method="get"
              className="grid grid-cols-[1fr_auto] gap-2 md:min-w-[360px]"
              onSubmit={(event) => submitQuoteRequest(event, { zip: stickyZip, service: estimateService, bedrooms, bathrooms })}
            >
              <label htmlFor="sticky-zip" className="sr-only">
                ZIP code
              </label>
              <Input
                id="sticky-zip"
                name="zip"
                inputMode="numeric"
                placeholder="ZIP code"
                value={stickyZip}
                onChange={(event) => setStickyZip(event.target.value)}
                className="h-12 rounded-md border-white/35 bg-white/12 text-base font-bold text-white placeholder:text-white/72 focus-visible:ring-white/65"
              />
              <Button type="submit" className="h-12 rounded-md bg-white px-5 font-black text-[#1976a3] shadow-none hover:bg-white/90 md:px-7">
                Go
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export function NotFoundPage() {
  const hostname = typeof window === "undefined" ? "" : window.location.hostname.toLowerCase()
  const canonicalBaseUrl = hostname.includes("shinydeepcleaning.com")
    ? "https://shinydeepcleaning.com"
    : hostname.includes("shynlimoveoutcleaning.com")
      ? "https://shynlimoveoutcleaning.com"
      : "https://shynli.com"
  const notFoundBrand = hostname.includes("shinydeepcleaning.com")
    ? "Shiny Deep Cleaning"
    : hostname.includes("shynlimoveoutcleaning.com")
      ? "Shynli Move-Out Cleaning"
      : "Shynli Cleaning"

  useSeoMeta(
    `Page Not Found | ${notFoundBrand}`,
    `This ${notFoundBrand} page could not be found. Start from the main service page, service areas, or quote page.`,
    undefined,
    { canonicalBaseUrl, canonicalPath: "/404", robots: "noindex,follow" },
  )

  return (
    <main className="min-h-screen bg-[#eef8fc] text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0d2633] px-4 pb-20 pt-32 text-white md:px-8 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(159,227,255,0.18),transparent_34%),linear-gradient(135deg,#0d2633_0%,#12384a_54%,#0d2633_100%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">404</p>
          <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">This page is not here.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
            The link may have changed, or the page may not be part of the live Shynli site. Start with the pages customers use most.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-12 rounded-full bg-[#1f9ed6] px-6 font-black text-white hover:bg-[#168ac0]">
              <a href={buildQuoteUrl({ service: "home-cleaning", sourcePage: "/404" })}>
                Get a quote
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/28 bg-white/8 px-6 font-black text-white hover:bg-white/14 hover:text-white">
              <a href="/services">View services</a>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/28 bg-white/8 px-6 font-black text-white hover:bg-white/14 hover:text-white">
              <a href="/service-areas">Service areas</a>
            </Button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
