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
  ["/guides/broom-clean-vs-deep-clean-move-out", {
    title: "Broom Clean vs Deep Clean Before Move-Out | Shynli",
    description: "Understand what broom clean, move-out cleaning, and deep cleaning usually mean before a lease handoff, final walkthrough, or home sale.",
    keywords: "broom clean move out, broom clean vs deep clean, move-out cleaning expectations, final walkthrough cleaning, seller broom clean",
    kicker: "Broom clean or deep clean",
    h1: "Broom clean vs deep clean before a move-out walkthrough.",
    copy: "Broom clean usually means empty, swept, and free of obvious trash. Move-out cleaning goes further into kitchens, bathrooms, floors, shelves, closets, and visible handoff details.",
  }],
  ["/guides/prepare-for-move-out-cleaning-after-movers", {
    title: "How To Prepare For Move-Out Cleaning After Movers Leave | Shynli",
    description: "Prepare for move-out cleaning after movers by removing belongings, keeping utilities on, confirming access, choosing add-ons, and sharing walkthrough priorities.",
    keywords: "prepare for move-out cleaning, move-out cleaning after movers, cleaning after moving out, move-out cleaning checklist, empty home cleaning",
    kicker: "After movers",
    h1: "How to prepare for move-out cleaning after the movers leave.",
    copy: "Make the home empty, remove trash, keep water and power on, confirm access, choose add-ons, and share walkthrough priorities before the cleaner arrives.",
  }],
  ["/guides/move-out-cleaning-with-pets", {
    title: "Move-Out Cleaning With Pets: Hair, Odor, And Litter Areas | Shynli",
    description: "Plan move-out cleaning with pets by focusing on hair, litter areas, pet odor, floors, baseboards, soft surfaces, and honest limits before inspection.",
    keywords: "move-out cleaning with pets, pet hair move-out cleaning, pet odor cleaning move out, deposit cleaning pets, apartment move-out cleaning pets",
    kicker: "Pets and move-out",
    h1: "Move-out cleaning with pets: hair, odor, and the areas people notice first.",
    copy: "Pet move-out cleaning should focus on hair, litter zones, floor edges, baseboards, doors, feeding areas, and odor source areas while separating cleaning from repairs.",
  }],
  ["/guides/what-move-out-cleaners-do-not-handle", {
    title: "What Move-Out Cleaners Do Not Handle | Shynli",
    description: "Know what move-out cleaners usually do not handle, including trash removal, junk hauling, repairs, paint touch-ups, pest issues, mold, damage, and blocked areas.",
    keywords: "what move-out cleaners do not handle, move-out cleaning exclusions, move-out cleaning trash removal, move-out cleaning repairs, junk hauling move out",
    kicker: "Scope boundaries",
    h1: "What move-out cleaners usually do not handle.",
    copy: "Move-out cleaners clean accessible surfaces in the agreed scope. They usually do not haul junk, repair damage, paint, treat pests, remediate mold, or decide inspection outcomes.",
  }],
  ["/guides/utilities-and-access-for-move-out-cleaning", {
    title: "Utilities And Access For Move-Out Cleaning | Shynli",
    description: "Move-out cleaning goes smoother when water, power, parking, lockbox, elevator, gate codes, pets, and lock-up instructions are confirmed before arrival.",
    keywords: "move-out cleaning access, utilities for move-out cleaning, lockbox cleaning access, apartment cleaning elevator parking, move-out cleaning remote access",
    kicker: "Access planning",
    h1: "Utilities and access to confirm before move-out cleaning.",
    copy: "Confirm water, power, lighting, parking, building entry, elevator or gate instructions, remote access, pets, contact details, and final lock-up instructions.",
  }],
  ["/guides/last-minute-move-out-cleaning-plan", {
    title: "Last-Minute Move-Out Cleaning Plan | Shynli",
    description: "Use a practical last-minute move-out cleaning plan when keys are due soon: what to clean first, what to skip, and when to book help.",
    keywords: "last-minute move-out cleaning, move-out cleaning plan, clean apartment before keys, same-day move-out cleaning, move-out cleaning priorities",
    kicker: "Last-minute plan",
    h1: "Last-minute move-out cleaning: what to do when keys are due soon.",
    copy: "When time is short, remove trash first, clean kitchens and bathrooms next, handle floors last, document the finish, and book professional help if the deadline is too tight.",
  }],
  ["/guides/oven-and-refrigerator-move-out-cleaning", {
    title: "Oven And Refrigerator Move-Out Cleaning | Shynli",
    description: "Learn why ovens and refrigerators matter during move-out cleaning, what to empty first, and when appliance interiors should be quoted as add-ons.",
    keywords: "oven move-out cleaning, refrigerator move-out cleaning, appliance cleaning before move out, clean fridge before moving out, clean oven before landlord inspection",
    kicker: "Appliance interiors",
    h1: "Oven and refrigerator move-out cleaning: why these two areas get noticed.",
    copy: "Empty and defrost the refrigerator if needed, remove food and loose parts, name oven and fridge interiors as add-ons before booking, and keep expectations realistic.",
  }],
  ["/guides/carpet-stains-before-move-out", {
    title: "Carpet Stains Before Move-Out | Shynli",
    description: "Understand what to do about carpet stains before move-out, what standard cleaning can help with, and when carpet cleaning or repair is separate.",
    keywords: "carpet stains before move out, move-out carpet cleaning, apartment carpet stains deposit, pet stains move out cleaning, carpet cleaning before landlord inspection",
    kicker: "Carpet stains",
    h1: "Carpet stains before move-out: what cleaning can help and what may need a separate service.",
    copy: "Vacuum thoroughly, identify stains early, photograph the condition, and ask whether carpet shampooing or extraction is separate from the move-out cleaning quote.",
  }],
  ["/guides/move-out-cleaning-receipts-and-photos", {
    title: "Move-Out Cleaning Receipts And Photos | Shynli",
    description: "Use receipts, photos, room notes, and checklist details to document move-out cleaning without pretending cleaning can guarantee a deposit result.",
    keywords: "move-out cleaning receipt, move-out cleaning photos, document move-out cleaning, security deposit cleaning proof, cleaning invoice before walkthrough",
    kicker: "Cleaning proof",
    h1: "Move-out cleaning receipts and photos: what to keep before the handoff.",
    copy: "Keep the receipt, scope notes, after-clean photos, add-on details, date, address, and communication records so the finish is easier to explain after keys are returned.",
  }],
  ["/guides/landlord-cleaning-checklist-too-much", {
    title: "When A Landlord Move-Out Cleaning Checklist Feels Excessive | Shynli",
    description: "A practical way to handle a long landlord move-out cleaning checklist: separate cleaning, add-ons, repairs, proof, and quote questions before keys are due.",
    keywords: "landlord move-out cleaning checklist, excessive move-out cleaning checklist, apartment cleaning checklist deposit, move-out cleaning requirements, landlord cleaning expectations",
    kicker: "Long checklist",
    h1: "What to do when a landlord move-out cleaning checklist feels excessive.",
    copy: "Break the checklist into standard cleaning, quoted add-ons, carpet work, repairs, trash removal, and documentation before asking for a move-out cleaning quote.",
  }],
  ["/guides/wall-scuffs-and-nail-holes-before-move-out", {
    title: "Wall Scuffs And Nail Holes Before Move-Out | Shynli",
    description: "Know what cleaning can and cannot do for wall scuffs, fingerprints, nail holes, tape marks, paint damage, and move-out walkthrough expectations.",
    keywords: "wall scuffs before move out, nail holes move out cleaning, clean walls before moving out, move-out wall marks, apartment wall damage cleaning",
    kicker: "Wall marks",
    h1: "Wall scuffs and nail holes before move-out: cleaning, touch-ups, and repair boundaries.",
    copy: "Separate light wall cleaning from nail holes, paint touch-ups, adhesive damage, drywall repair, and landlord or maintenance decisions before the final walkthrough.",
  }],
  ["/guides/window-tracks-blinds-and-fans-move-out-cleaning", {
    title: "Window Tracks, Blinds, And Fans Before Move-Out | Shynli",
    description: "A practical move-out cleaning guide for window tracks, sills, blinds, ceiling fans, vent covers, dust lines, and what to quote before the walkthrough.",
    keywords: "window tracks move-out cleaning, clean blinds before moving out, ceiling fan cleaning move out, move-out cleaning window sills, dusting blinds final walkthrough",
    kicker: "Dust details",
    h1: "Window tracks, blinds, and fans before move-out: small details that can look big in an empty home.",
    copy: "Plan reachable track cleaning, sill wiping, light blind dusting, ceiling fan dusting, and vent-cover dusting before assuming every fragile or high detail is included.",
  }],
  ["/guides/bathroom-move-out-cleaning-soap-scum-caulk-hard-water", {
    title: "Bathroom Move-Out Cleaning: Soap Scum, Caulk, And Hard Water | Shynli",
    description: "Plan bathroom move-out cleaning around soap scum, hard water, toilets, tubs, showers, caulk boundaries, mildew-like staining, and realistic quote expectations.",
    keywords: "bathroom move-out cleaning, soap scum move-out cleaning, hard water stains move out, caulk cleaning before move out, shower cleaning landlord inspection",
    kicker: "Bathroom detail",
    h1: "Bathroom move-out cleaning: soap scum, caulk, hard water, and what cleaning can realistically fix.",
    copy: "Clean visible hygiene details while separating normal bathroom residue from re-caulking, grout repair, mold remediation, damaged fixtures, and old hard-water staining.",
  }],
  ["/guides/garage-basement-and-storage-move-out-cleaning", {
    title: "Garage, Basement, And Storage Area Move-Out Cleaning | Shynli",
    description: "Move-out cleaning for garages, basements, storage rooms, closets, utility areas, and unfinished spaces works best when debris, access, and scope are clear first.",
    keywords: "garage move-out cleaning, basement move-out cleaning, storage room cleaning before moving, utility room move-out cleaning, empty home storage cleaning",
    kicker: "Storage areas",
    h1: "Garage, basement, and storage area move-out cleaning: what to clear before the cleaner arrives.",
    copy: "Clear belongings and junk first, then quote accessible floors, shelves, storage areas, garage sweeping, and utility-room surfaces separately from hauling or repairs.",
  }],
  ["/guides/seller-final-walkthrough-cleaning-before-closing", {
    title: "Seller Final Walkthrough Cleaning Before Closing | Shynli",
    description: "A practical seller guide to cleaning before a buyer final walkthrough: broom-clean expectations, personal items, appliances, floors, bathrooms, and timing.",
    keywords: "seller final walkthrough cleaning, clean house before closing, broom clean before closing, cleaning before buyer walkthrough, seller move-out cleaning",
    kicker: "Seller walkthrough",
    h1: "Seller final walkthrough cleaning before closing: how clean should the home feel?",
    copy: "Before a buyer walkthrough, remove personal items and trash, clean visible kitchens and bathrooms, handle floors, and keep cleaning separate from contract questions.",
  }],
])

const currentGuidePaths = new Set([
  "/guides/broom-clean-vs-deep-clean-move-out",
  "/guides/prepare-for-move-out-cleaning-after-movers",
  "/guides/move-out-cleaning-with-pets",
  "/guides/what-move-out-cleaners-do-not-handle",
  "/guides/utilities-and-access-for-move-out-cleaning",
  "/guides/last-minute-move-out-cleaning-plan",
  "/guides/oven-and-refrigerator-move-out-cleaning",
  "/guides/carpet-stains-before-move-out",
  "/guides/move-out-cleaning-receipts-and-photos",
  "/guides/landlord-cleaning-checklist-too-much",
])

const latestGuidePaths = new Set([
  "/guides/wall-scuffs-and-nail-holes-before-move-out",
  "/guides/window-tracks-blinds-and-fans-move-out-cleaning",
  "/guides/bathroom-move-out-cleaning-soap-scum-caulk-hard-water",
  "/guides/garage-basement-and-storage-move-out-cleaning",
  "/guides/seller-final-walkthrough-cleaning-before-closing",
])

const guideDateForPath = (path) => latestGuidePaths.has(path) ? "2026-06-23" : currentGuidePaths.has(path) ? "2026-06-20" : "2026-06-05"

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
  ["/guides/broom-clean-vs-deep-clean-move-out", [
    ["Is broom clean enough for move-out?", "Sometimes, but not always. It depends on the lease, sale contract, landlord expectations, property condition, and whether the next person expects a detailed clean."],
    ["What is the difference between broom clean and move-out cleaning?", "Broom clean is usually a light empty-space handoff. Move-out cleaning goes further into kitchens, bathrooms, floors, shelves, closets, baseboards, and visible details."],
    ["Can cleaning guarantee a walkthrough outcome?", "No. Cleaning can address the agreed scope, but landlords, buyers, property managers, and contracts decide acceptance standards."],
  ]],
  ["/guides/prepare-for-move-out-cleaning-after-movers", [
    ["Should I schedule cleaners before or after movers?", "After movers is best whenever possible because empty rooms let cleaners reach floors, baseboards, closets, shelves, and corners."],
    ["Do I need to remove trash before move-out cleaning?", "Yes. Standard move-out cleaning is not junk hauling. Remove trash, leftover items, and donation piles before the appointment."],
    ["Can I be off-site during the cleaning?", "Usually yes, if access, parking, utilities, pets, lock-up instructions, and a reachable contact number are confirmed before arrival."],
  ]],
  ["/guides/move-out-cleaning-with-pets", [
    ["Can move-out cleaning remove pet odor completely?", "Sometimes light odor improves with cleaning, but deeper odor in carpet pad, flooring, walls, or damage may need specialty treatment outside normal cleaning."],
    ["Should pets be present during the appointment?", "No, whenever possible. Move-out cleaning is easier and safer when pets are already out of the home or secured away from the work area."],
    ["Does pet cleaning guarantee my deposit?", "No. Cleaning can address visible hair, residue, and selected scope, but deposit decisions may include lease terms, damage, repairs, and landlord judgment."],
  ]],
  ["/guides/what-move-out-cleaners-do-not-handle", [
    ["Will move-out cleaners remove trash?", "Small normal cleaning debris may be handled, but large trash, furniture, junk, and leftover belongings should be removed before the appointment."],
    ["Can cleaners fix damage before inspection?", "No. Cleaning can improve visible surfaces, but repairs, painting, flooring, pest treatment, mold remediation, and damage correction are separate work."],
    ["What if I am not sure whether something is cleaning or repair?", "Send photos before requesting a quote. Clear photos help separate normal cleaning scope from add-ons, repairs, or work that needs another provider."],
  ]],
  ["/guides/utilities-and-access-for-move-out-cleaning", [
    ["Can cleaners work if utilities are off?", "Sometimes only in a limited way, but water, power, and lighting are strongly recommended for a proper move-out clean."],
    ["Do I need to be there for move-out cleaning?", "Usually no. Remote access can work when codes, keys, parking, utilities, pets, and lock-up instructions are clear before arrival."],
    ["What access details should I send?", "Send parking, door, unit, lockbox, gate, elevator, stair, pet, utility, contact, and lock-up details, plus any building rule that could slow entry."],
  ]],
  ["/guides/last-minute-move-out-cleaning-plan", [
    ["What should I clean first when moving out last minute?", "Remove trash and personal items first, then focus on kitchens, bathrooms, floors, visible dust lines, and the items named in your lease or checklist."],
    ["Can a cleaner help the same week?", "Often yes if there is availability, but the quote needs the date, property size, condition, access, utilities, and add-ons quickly."],
    ["What should I skip if I have only a few hours?", "Do not spend the whole window on low-visibility details while trash, bathrooms, kitchen surfaces, and floors still look unfinished."],
  ]],
  ["/guides/oven-and-refrigerator-move-out-cleaning", [
    ["Are oven and refrigerator interiors included in move-out cleaning?", "Not always. They should be selected or quoted before the visit because they can add meaningful time."],
    ["Should I leave the refrigerator on?", "Usually yes for visibility and odor control unless you have been told otherwise. If the freezer needs defrosting, plan that before cleaning time."],
    ["Can cleaners remove all oven stains?", "Not always. Surface grease and residue can often improve, but burnt-in marks, damaged finishes, rust, and broken parts are not normal cleaning fixes."],
  ]],
  ["/guides/carpet-stains-before-move-out", [
    ["Does move-out cleaning include carpet shampooing?", "Usually not unless it is specifically quoted. Standard cleaning may include vacuuming, while shampooing or extraction is a separate service."],
    ["Can cleaning remove old carpet stains?", "Some surface stains can improve, but deep stains, dye loss, odor in padding, damage, and worn carpet may need carpet specialists or repair."],
    ["Should I get carpet cleaning before turning in keys?", "Check your lease or move-out instructions and compare that with the carpet condition. If a receipt is required, plan it separately before the handoff."],
  ]],
  ["/guides/move-out-cleaning-receipts-and-photos", [
    ["Do cleaning receipts guarantee my deposit?", "No. A receipt documents cleaning scope and payment, but deposit decisions can involve lease terms, damage, normal wear, timing, and property manager judgment."],
    ["What photos should I keep after move-out cleaning?", "Keep wide room photos plus kitchen, bathroom, floor, closet, appliance, cabinet, and any important add-on photos."],
    ["Should I send the receipt to my landlord?", "That depends on your lease and move-out instructions. The practical point is to keep the receipt and scope details available if the cleaning is questioned."],
  ]],
  ["/guides/landlord-cleaning-checklist-too-much", [
    ["Can a cleaner tell me if a landlord checklist is legally required?", "No. A cleaner can explain cleaning scope and practical limits, but legal or lease questions should be handled through the lease, property manager, tenant resources, or qualified advice."],
    ["Should I give the checklist to the cleaning company?", "Yes. It helps separate standard cleaning, add-ons, and non-cleaning work before the appointment is priced."],
    ["What if the checklist includes carpet cleaning or repairs?", "Treat those as separate items unless the quote specifically includes them. Standard move-out cleaning usually does not include carpet extraction, repairs, painting, or junk hauling."],
  ]],
  ["/guides/wall-scuffs-and-nail-holes-before-move-out", [
    ["Do move-out cleaners clean walls?", "Usually only light reachable spot wiping if it is included. Full wall washing, paint touch-ups, patching, and repair are usually outside normal move-out cleaning."],
    ["Can cleaners fix nail holes before move-out?", "No. Nail holes are repair or touch-up work, not cleaning. Ask the landlord or property manager what they expect before patching or painting."],
    ["Should I scrub wall scuffs before inspection?", "Be careful. Gentle wiping can help light scuffs, but aggressive scrubbing can damage paint or leave shiny spots."],
  ]],
  ["/guides/window-tracks-blinds-and-fans-move-out-cleaning", [
    ["Are window tracks included in move-out cleaning?", "Sometimes, but not always. Light sill wiping may be included while detailed track cleaning should be confirmed before booking."],
    ["Do cleaners clean blinds before move-out?", "Often only light dusting if included. Deep slat-by-slat cleaning, fragile blinds, damaged blinds, or blind replacement are separate issues."],
    ["Can cleaners clean ceiling fans and vents?", "They can often dust reachable exterior surfaces. Electrical parts, ducts, motors, and unsafe heights are not normal cleaning scope."],
  ]],
  ["/guides/bathroom-move-out-cleaning-soap-scum-caulk-hard-water", [
    ["Can move-out cleaning remove hard-water stains?", "Light buildup may improve, but older mineral staining, etching, rust, or damaged finishes may not fully come out during normal cleaning."],
    ["Do cleaners re-caulk tubs or showers?", "No. Re-caulking is repair or maintenance work, not standard move-out cleaning."],
    ["What bathroom details do landlords notice?", "They often notice toilets, tubs, showers, sinks, mirrors, faucets, floors, hair, soap residue, cabinet areas, and whether the bathroom feels hygienic."],
  ]],
  ["/guides/garage-basement-and-storage-move-out-cleaning", [
    ["Do move-out cleaners clean garages?", "Sometimes, if it is quoted and accessible. Sweeping and reachable surface cleaning may be possible, but junk hauling, oil stain restoration, and repairs are separate."],
    ["Can cleaners clean a basement before move-out?", "Yes, when it is accessible and the scope is clear. Unfinished basements, storage areas, moisture, pests, or damage may need separate expectations."],
    ["Should I remove items before cleaning storage areas?", "Yes. Remove boxes, trash, furniture, tools, and donation piles before expecting shelves, floors, or corners to be cleaned."],
  ]],
  ["/guides/seller-final-walkthrough-cleaning-before-closing", [
    ["Do sellers have to deep clean before closing?", "That depends on the contract and local expectations. Practically, many sellers choose move-out cleaning so the home feels ready for the buyer walkthrough."],
    ["Is broom clean enough for a final walkthrough?", "Sometimes, but broom clean should still mean personal items and trash are gone and the home does not feel neglected."],
    ["When should a seller schedule move-out cleaning?", "Usually after movers leave and before the final walkthrough, with utilities and access still available."],
  ]],
])

const jsonForHtml = (value) => JSON.stringify(value).replace(/</g, "\\u003c")

const buildGuideSchema = (path, page) => {
  const absoluteUrl = `${domain}${path === "/" ? "" : path}`
  const faqPairs = guideFaqs.get(path)
  const guideDate = guideDateForPath(path)
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
      datePublished: guideDate,
      dateModified: guideDate,
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
  const guideShellClass = guideShellPages.has(path) ? " initial-guide-shell" : ""
  const shell = `<main id="initial-home-hero" style="min-height:100svh;background:#e9f7fb;color:#0b2430;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">
      <style>
        #initial-home-hero *{box-sizing:border-box}
        #initial-home-hero a{text-decoration:none}
        #initial-home-hero .initial-header{position:relative;z-index:2;background:#e9f7fb;padding:1rem 1.25rem}
        #initial-home-hero .initial-header-inner{margin:0 auto;display:flex;max-width:94rem;align-items:center;justify-content:space-between;gap:1.5rem}
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
        #initial-home-hero .initial-hero-inner{position:relative;z-index:1;margin:0 auto;max-width:94rem;padding:5.75rem 1.75rem 4rem}
        #initial-home-hero .initial-kicker{display:inline-flex;margin:0 0 1.55rem;border:1px solid rgba(32,199,216,.58);border-radius:.25rem;background:rgba(32,199,216,.14);padding:.55rem 1.15rem;color:#f6fbff;font-size:.86rem;font-weight:900;line-height:1.2}
        #initial-home-hero h1{max-width:92rem;margin:0;color:#f6fbff;font-size:clamp(3.15rem,5.45vw,7rem);font-weight:900;line-height:.92;letter-spacing:0}
        #initial-home-hero .initial-copy{max-width:78rem;margin:2rem 0 0;color:rgba(246,251,255,.78);font-size:clamp(1.25rem,1.8vw,1.5rem);font-weight:800;line-height:1.5}
        #initial-home-hero .initial-guide-shell{max-width:94rem}
        #initial-home-hero .initial-guide-shell h1{max-width:92rem;font-size:clamp(3.15rem,5.45vw,7rem);line-height:.92}
        #initial-home-hero .initial-guide-shell .initial-copy{max-width:78rem}
        #initial-home-hero .initial-form{margin-top:4.25rem;border:1px solid #b9e5ee;background:#f6fbff;padding:1rem;box-shadow:0 24px 45px rgba(11,36,48,.28)}
        #initial-home-hero .initial-form-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr auto;gap:.85rem;align-items:end}
        #initial-home-hero label{display:grid;gap:.55rem;color:#075f67;font-size:.82rem;font-weight:900;text-transform:uppercase}
        #initial-home-hero input{min-height:3.35rem;border:1px solid #b9e5ee;border-radius:.25rem;background:white;padding:0 1rem;color:#43525c;font:inherit;font-weight:800}
        #initial-home-hero .initial-submit{min-height:3.35rem;border:0;border-radius:.25rem;background:#58b883;padding:0 1.35rem;color:#06202a;font:inherit;font-size:1.05rem;font-weight:500;white-space:nowrap;cursor:pointer}
        #initial-home-hero .initial-proof-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin:2.25rem auto 0;max-width:94rem;padding:0 1.75rem;position:relative;z-index:1}
        #initial-home-hero .initial-proof{min-height:7rem;background:#f6fbff;border-left:.25rem solid #22c7a9;padding:1.25rem;color:#0b2430}
        #initial-home-hero .initial-proof strong{display:block;font-size:1.65rem;font-weight:900}
        #initial-home-hero .initial-proof span{display:block;margin-top:.25rem;color:#43525c;font-weight:800}
        #initial-home-hero .initial-guides{position:relative;z-index:1;margin:1.25rem auto 0;display:flex;max-width:94rem;flex-wrap:wrap;gap:.65rem;padding:0 1.75rem 2rem}
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
        <div class="initial-hero-inner${guideShellClass}">
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
          <a href="https://shynlimoveoutcleaning.com/guides/broom-clean-vs-deep-clean-move-out">Broom clean</a>
          <a href="https://shynlimoveoutcleaning.com/guides/utilities-and-access-for-move-out-cleaning">Access</a>
          <a href="https://shynlimoveoutcleaning.com/guides/last-minute-move-out-cleaning-plan">Last-minute plan</a>
          <a href="https://shynlimoveoutcleaning.com/guides/oven-and-refrigerator-move-out-cleaning">Appliances</a>
          <a href="https://shynlimoveoutcleaning.com/guides/move-out-cleaning-receipts-and-photos">Receipts</a>
          <a href="https://shynlimoveoutcleaning.com/guides/wall-scuffs-and-nail-holes-before-move-out">Walls</a>
          <a href="https://shynlimoveoutcleaning.com/guides/window-tracks-blinds-and-fans-move-out-cleaning">Windows and fans</a>
          <a href="https://shynlimoveoutcleaning.com/guides/seller-final-walkthrough-cleaning-before-closing">Seller walkthrough</a>
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

/*
 * Здесь раньше стояла функция deferHomepageScripts. Она заменяла обычный
 * <script type="module"> на загрузчик, который подтягивал приложение через
 * import() только после click, keydown, pointerdown, touchstart, wheel или
 * scroll, и заодно вырезала все <link rel="modulepreload">.
 *
 * Для скорости это выглядело выгодно, но стоило всего содержания сайта.
 * Googlebot страницы отрисовывает, однако не кликает, не прокручивает и не
 * двигает мышь, поэтому получал только каркас: около 105 видимых слов на
 * каждой из 371 страницы, все одного размера и с одинаковым текстом.
 * Для сравнения, у shynlideepcleaning.com на такой же городской странице
 * около 2 900 слов.
 *
 * Проверено в браузере 2026-07-27: до касания высота страницы 957 пикселей и
 * одна секция, после искусственного клика 9 232 пикселя и девять секций.
 * Страница была полной и нормальной, её просто не существовало, пока
 * посетитель не пошевелился.
 *
 * Страницы /guides этой обработки не получали и работали правильно, что и
 * подсказало причину.
 *
 * Модульный скрипт и так не блокирует разбор страницы, а первый экран
 * по-прежнему приходит статикой из addMoveOutShell, так что видимой потери
 * скорости нет.
 */

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
  writeFileSync(routeIndex, addMoveOutShell(indexHtml, path))
}

writeFileSync(indexFile, addMoveOutShell(indexHtml))

console.log(`Generated ${paths.length} static route fallbacks.`)
