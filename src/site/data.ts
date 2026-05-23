export const publicBusinessName = "Shynli Cleaning"
export const legalBusinessName = "SHYNLI LLC"
export const businessPhoneDisplay = "+1 (630) 812-7077"
export const businessPhoneHref = "tel:+16308127077"
export const businessPhoneSchema = "+1-630-812-7077"
export const businessEmail = "info@shynli.com"
export const preferredArrivalWindow = "Preferred arrival slots: 9 AM-4 PM CT"

export const services = [
  {
    value: "standard",
    label: "Standard",
    eyebrow: "Most weekly homes",
    title: "A steady reset for kitchens, bathrooms, floors, and the rooms everyone actually lives in.",
    copy: "Best when the house is lived-in, not neglected. We handle the repeating work so weekends stop disappearing into cleaning.",
    items: ["Kitchen surfaces, sink, stovetop", "Bathrooms cleaned and refreshed", "Dusting, floors, trash removal", "Bedrooms and shared spaces reset"],
  },
  {
    value: "deep",
    label: "Deep",
    eyebrow: "When the house needs more",
    title: "A heavier clean for buildup, edges, high-touch areas, and the details daily cleaning misses.",
    copy: "Choose deep cleaning before guests, after a long busy season, or whenever the regular routine has fallen behind.",
    items: ["Baseboards, doors, detailed dusting", "Kitchen buildup and optional extras", "Bathroom detail and fixtures", "Room-by-room checklist before we leave"],
  },
  {
    value: "move",
    label: "Move",
    eyebrow: "Move-in / move-out",
    title: "A clean handoff for empty homes, lease endings, listings, and the window before furniture arrives.",
    copy: "We plan around access, timing, empty-room surfaces, and optional appliance or cabinet work.",
    items: ["Empty-room floors and surfaces", "Inside cabinets and drawers when needed", "Fridge and oven extras", "Move-day access notes handled clearly"],
  },
  {
    value: "recurring",
    label: "Recurring",
    eyebrow: "Best long-term value",
    title: "A familiar cleaning rhythm with support that remembers what matters in your home.",
    copy: "Weekly, biweekly, or monthly service for families who want the home to stay under control.",
    items: ["Same cleaner whenever possible", "Weekly, biweekly, or monthly cadence", "Checklist adjusted to your home", "Support by phone, text, or email"],
  },
]

export const servicePlans = [
  {
    name: "Standard",
    ribbon: "Bi-weekly starting point",
    description: "A maintenance clean for the rooms that carry the week: kitchens, bathrooms, floors, bedrooms, and shared spaces.",
    checklist: "48-point home reset",
    price: "$145",
    unit: "bi-weekly visit",
    highlights: ["Recurring options", "Supplies included", "Add-ons available"],
  },
  {
    name: "Deep Cleaning",
    ribbon: "More detail",
    description: "A heavier clean for buildup, baseboards, doors, fixtures, and the edges that regular cleaning does not fully catch.",
    checklist: "72-point deep checklist",
    price: "$152",
    unit: "starting visit",
    highlights: ["Detail focus", "Appliance extras", "Extra time planned"],
  },
  {
    name: "Move Clean",
    ribbon: "Empty home",
    description: "A move-in or move-out clean for empty rooms, listings, lease endings, and the window before furniture arrives.",
    checklist: "Move-ready checklist",
    price: "$197",
    unit: "starting visit",
    highlights: ["Cabinet extras", "Empty-room floors", "Access notes handled"],
  },
  {
    name: "Recurring",
    ribbon: "Weekly starting point",
    description: "A weekly, biweekly, or monthly rhythm for homes that need steady support instead of one big catch-up.",
    checklist: "Custom home routine",
    price: "$135",
    unit: "weekly visit",
    highlights: ["Same cleaner when possible", "Checklist adjusted", "Priority scheduling"],
  },
]

export const publishedRecurringPrices = [
  ["Weekly Cleaning", "$135", "per visit"],
  ["Bi-Weekly Cleaning", "$145", "per visit"],
  ["Monthly Cleaning", "$155", "per visit"],
]

export const publishedAddOnPrices = [
  ["Oven Cleaning", "$45"],
  ["Inside Refrigerator Cleaning", "$45"],
  ["Baseboard Cleaning (whole house)", "$22"],
  ["Doors Cleaning", "$22"],
  ["Inside Cabinets Cleaning", "$45"],
  ["Range hood", "$22"],
  ["Wood Furniture Polishing", "$20"],
  ["Interior Windows Cleaning", "$6 per window"],
  ["Blinds Cleaning", "$8 per window"],
  ["Bed Linen / Sofa Cover Change", "$8 each"],
  ["Basement Cleaning", "+$45"],
]

export const serviceAreaGroups = [
  {
    label: "A-D",
    cities: ["Addison", "Aurora", "Bartlett", "Batavia", "Bolingbrook", "Bristol", "Burr Ridge", "Carol Stream", "Clarendon Hills", "Darien", "Downers Grove"],
  },
  {
    label: "E-L",
    cities: ["Elmhurst", "Geneva", "Glen Ellyn", "Hinsdale", "Homer Glen", "Itasca", "Lemont", "Lisle", "Lockport", "Lombard"],
  },
  {
    label: "M-S",
    cities: ["Montgomery", "Naperville", "North Aurora", "Oak Brook", "Oswego", "Plainfield", "Romeoville", "St. Charles", "Streamwood", "Sugar Grove"],
  },
  {
    label: "V-Y",
    cities: ["Villa Park", "Warrenville", "Wayne", "West Chicago", "Westmont", "Wheaton", "Willowbrook", "Winfield", "Wood Dale", "Woodridge", "Yorkville"],
  },
]

export const cityList = serviceAreaGroups.flatMap((group) => group.cities)
export const featuredServiceAreaCities = ["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook", "Lisle", "Warrenville", "Downers Grove", "North Aurora", "Sugar Grove", "Yorkville", "Montgomery"]

export function slugifyCity(city: string) {
  return city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")
}

export const cityPages = cityList.map((name, index) => {
  const group = serviceAreaGroups.find((areaGroup) => areaGroup.cities.includes(name))?.label ?? "Chicago suburbs"
  const nearby = [...cityList.slice(index + 1, index + 4), ...cityList.slice(Math.max(0, index - 3), index)].slice(0, 5)

  return {
    name,
    slug: slugifyCity(name),
    group,
    nearby,
  }
})

export const cityPageServices = [
  {
    id: "regular",
    slug: "regular-cleaning",
    title: "Regular home cleaning",
    description: "Weekly, biweekly, or monthly resets for kitchens, bathrooms, floors, bedrooms, and the shared spaces that carry the week.",
    checklist: ["Kitchen surfaces and sink", "Bathrooms cleaned and refreshed", "Dusting and floors", "Trash gathered before we leave"],
  },
  {
    id: "deep",
    slug: "deep-cleaning",
    title: "Deep cleaning",
    description: "A heavier clean for buildup, baseboards, doors, fixtures, edges, and rooms that need more than a maintenance visit.",
    checklist: ["Bathroom detail", "Kitchen buildup", "Baseboards and doors", "Optional appliance extras"],
  },
  {
    id: "move",
    slug: "move-in-move-out-cleaning",
    title: "Move-in / move-out cleaning",
    description: "Empty-home cleaning for lease endings, listings, new keys, and the window before furniture arrives.",
    checklist: ["Empty floors and surfaces", "Cabinets and drawers", "Access notes", "Fridge and oven extras"],
  },
  {
    id: "recurring",
    slug: "recurring-cleaning",
    title: "Recurring cleaning",
    description: "A steady rhythm for homes that need ongoing support and clear communication instead of one big catch-up.",
    checklist: ["Weekly options", "Biweekly options", "Monthly options", "Adjusted home checklist"],
  },
]

export const cityRouteNotes: Record<string, string> = {
  "A-D": "We help with busy family homes, townhomes, apartments, and houses that need a reliable clean between work, school, and weekend plans.",
  "E-L": "Many homes here need cleaning that works around school days, commute windows, condo access, pets, and recurring family routines.",
  "M-S": "These are busy western-suburb homes where regular upkeep, deeper catch-up work, and move-day cleaning all need clear timing.",
  "V-Y": "For nearby suburbs, we start with your ZIP so we can match the visit to the right day, crew, and cleaning window.",
}

export function wikiPhoto(url: string) {
  return url
}

export const cityHeroImages: Record<string, { src: string; position: string; label: string }> = {
  addison: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/9/9e/Addison_Village_Hall_-_Addison%2C_IL.jpg"),
    position: "center 46%",
    label: "Addison village center",
  },
  aurora: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Aurora%2C_Illinois_skyline.jpg/1920px-Aurora%2C_Illinois_skyline.jpg"),
    position: "center 45%",
    label: "Aurora downtown / Fox River",
  },
  bartlett: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/f/ff/Bartlett_Illinois_Gazebo_%28Bartlett_Park%29.jpg"),
    position: "center 48%",
    label: "Bartlett village center",
  },
  batavia: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Chicago%2C_Burlington%2C_and_Quincy_Railroad_Depot_%28Batavia%2C_IL%29_04.JPG/1920px-Chicago%2C_Burlington%2C_and_Quincy_Railroad_Depot_%28Batavia%2C_IL%29_04.JPG"),
    position: "center 45%",
    label: "Batavia Fox River",
  },
  bolingbrook: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/7/7d/Downtown_Bolingbrook.png"),
    position: "center 48%",
    label: "Bolingbrook neighborhoods",
  },
  bristol: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Yorkville_IL_Kendall_County_Courthouse4.JPG/1920px-Yorkville_IL_Kendall_County_Courthouse4.JPG"),
    position: "center 52%",
    label: "Bristol / Kendall County area",
  },
  "burr-ridge": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Mayslake_Peabody_Estate_-_Mayslake_Hall.JPG/1920px-Mayslake_Peabody_Estate_-_Mayslake_Hall.JPG"),
    position: "center 48%",
    label: "Burr Ridge village center",
  },
  "carol-stream": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Carol_Stream%2C_IL%2C_USA_-_panoramio.jpg/1920px-Carol_Stream%2C_IL%2C_USA_-_panoramio.jpg"),
    position: "center 50%",
    label: "Carol Stream neighborhoods",
  },
  "clarendon-hills": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Clarendon_Hills_Metra_station.jpg/1920px-Clarendon_Hills_Metra_station.jpg"),
    position: "center 46%",
    label: "Clarendon Hills village center",
  },
  darien: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/2/2d/Rocky_Glen_Waterfall.jpg"),
    position: "center 50%",
    label: "Darien neighborhoods",
  },
  "downers-grove": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/2/2f/Downers_Grove_IL_2022.jpg"),
    position: "center 44%",
    label: "Downtown Downers Grove",
  },
  elmhurst: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Elmhurst_City_Center.jpg/1920px-Elmhurst_City_Center.jpg"),
    position: "center 44%",
    label: "Downtown Elmhurst",
  },
  geneva: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Geneva_Illinois_City_Hall.jpg/1920px-Geneva_Illinois_City_Hall.jpg"),
    position: "center 43%",
    label: "Geneva Third Street",
  },
  "glen-ellyn": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/8/80/Glen-ellyn-historic-district.jpg"),
    position: "center 44%",
    label: "Glen Ellyn village center",
  },
  hinsdale: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Downtown_Hinsdale_Illinois.jpg/1920px-Downtown_Hinsdale_Illinois.jpg"),
    position: "center 44%",
    label: "Downtown Hinsdale",
  },
  "homer-glen": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Stone_Manor_Homer_Glen.JPG/1920px-Stone_Manor_Homer_Glen.JPG"),
    position: "center 52%",
    label: "Homer Glen homes",
  },
  itasca: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Itasca%2C_IL%2C_USA_-_panoramio_%283%29.jpg/1920px-Itasca%2C_IL%2C_USA_-_panoramio_%283%29.jpg"),
    position: "center 46%",
    label: "Itasca village center",
  },
  lemont: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/2/23/Hypnosis-lemont-illinois.jpg"),
    position: "center 45%",
    label: "Historic Lemont",
  },
  lisle: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/4/49/LLD.jpg"),
    position: "center 48%",
    label: "Lisle / Morton Arboretum area",
  },
  lockport: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/7/7e/Lockportdowntown838382.jpg"),
    position: "center 45%",
    label: "Historic Lockport",
  },
  lombard: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/f/f6/Lilacia_Park_Historic_District.jpg"),
    position: "center 46%",
    label: "Lombard / Lilacia Park",
  },
  montgomery: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Montgomery_Illinois_Village_Hall_corner_view.JPG/1920px-Montgomery_Illinois_Village_Hall_corner_view.JPG"),
    position: "center 46%",
    label: "Montgomery Fox River",
  },
  naperville: {
    src: "/naperville-riverwalk.jpg",
    position: "center 44%",
    label: "Naperville Riverwalk",
  },
  "north-aurora": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/North_Aurora_Riverfront_Park_and_Village_Hall_-_North_Aurora%2C_IL_-_November_2025.jpg/1920px-North_Aurora_Riverfront_Park_and_Village_Hall_-_North_Aurora%2C_IL_-_November_2025.jpg"),
    position: "center 46%",
    label: "North Aurora Fox River",
  },
  "oak-brook": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Mayslake_Peabody_Estate_-_Mayslake_Hall.JPG/1920px-Mayslake_Peabody_Estate_-_Mayslake_Hall.JPG"),
    position: "center 48%",
    label: "Oak Brook homes",
  },
  oswego: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Oswego_Illinois_-_3.jpg/1920px-Oswego_Illinois_-_3.jpg"),
    position: "center 45%",
    label: "Downtown Oswego",
  },
  plainfield: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Plainfield-Illinois-Village-Hall.jpg/1920px-Plainfield-Illinois-Village-Hall.jpg"),
    position: "center 45%",
    label: "Downtown Plainfield",
  },
  romeoville: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/FitzpatrickHouseLewis.JPG/1920px-FitzpatrickHouseLewis.JPG"),
    position: "center 50%",
    label: "Romeoville neighborhoods",
  },
  "st-charles": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/4/46/Fox_River_St_Charles_IL.jpg"),
    position: "center 44%",
    label: "St. Charles Fox River",
  },
  streamwood: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Carol_Stream%2C_IL%2C_USA_-_panoramio.jpg/1920px-Carol_Stream%2C_IL%2C_USA_-_panoramio.jpg"),
    position: "center 50%",
    label: "Streamwood neighborhoods",
  },
  "sugar-grove": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Yorkville_IL_Kendall_County_Courthouse4.JPG/1920px-Yorkville_IL_Kendall_County_Courthouse4.JPG"),
    position: "center 52%",
    label: "Sugar Grove homes",
  },
  "villa-park": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ardmore_Avenue_Train_Station_%28Villa_Park%2C_Illinois%29_07.JPG/1920px-Ardmore_Avenue_Train_Station_%28Villa_Park%2C_Illinois%29_07.JPG"),
    position: "center 48%",
    label: "Villa Park neighborhoods",
  },
  warrenville: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Warrenvillegrove.jpg/1920px-Warrenvillegrove.jpg"),
    position: "center 50%",
    label: "Warrenville prairie path",
  },
  wayne: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/f/f3/Wayne2011Snow.png"),
    position: "center 52%",
    label: "Wayne village area",
  },
  "west-chicago": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/TurnerTownHall.JPG/1920px-TurnerTownHall.JPG"),
    position: "center 46%",
    label: "Downtown West Chicago",
  },
  westmont: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/f/fe/Westmont_Centre_2025.jpg"),
    position: "center 46%",
    label: "Downtown Westmont",
  },
  wheaton: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Downtown_Wheaton_Skyline.jpg/1920px-Downtown_Wheaton_Skyline.jpg"),
    position: "center 44%",
    label: "Downtown Wheaton",
  },
  willowbrook: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/2/2d/Rocky_Glen_Waterfall.jpg"),
    position: "center 50%",
    label: "Willowbrook neighborhoods",
  },
  winfield: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Winfield%2C_Illinois_Town_Center.jpg/1920px-Winfield%2C_Illinois_Town_Center.jpg"),
    position: "center 47%",
    label: "Winfield village center",
  },
  "wood-dale": {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Wood_Dale_Station_003.jpg/1920px-Wood_Dale_Station_003.jpg"),
    position: "center 49%",
    label: "Wood Dale neighborhoods",
  },
  woodridge: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/7/77/Main-St-Woodridge-IL.jpg"),
    position: "center 50%",
    label: "Woodridge neighborhoods",
  },
  yorkville: {
    src: wikiPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Yorkville_IL_Kendall_County_Courthouse4.JPG/1920px-Yorkville_IL_Kendall_County_Courthouse4.JPG"),
    position: "center 45%",
    label: "Yorkville Fox River",
  },
}

export type HeroImage = {
  src: string
  position: string
  label: string
}

export const heroImageLibrary = {
  cleanerAtWork: {
    src: "/cleaner-hero.jpg",
    position: "center 34%",
    label: "Cleaner in action",
  },
  calmFinishedHome: {
    src: "/clean-result.jpg",
    position: "center 58%",
    label: "Finished home reset",
  },
  careDetail: {
    src: "/trust-care.jpg",
    position: "center 52%",
    label: "Detailed home care",
  },
  quoteStart: {
    src: "/process-quote.jpg",
    position: "center 50%",
    label: "Simple quote start",
  },
  accessReady: {
    src: "/process-access.jpg",
    position: "center 50%",
    label: "Access notes ready",
  },
  cleaningVisit: {
    src: "/process-clean.jpg",
    position: "center 56%",
    label: "Cleaning visit in progress",
  },
  followUp: {
    src: "/process-follow.jpg",
    position: "center 50%",
    label: "Follow-up and standards",
  },
  recurringRhythm: {
    src: "/process-repeat.jpg",
    position: "center 50%",
    label: "Recurring cleaning rhythm",
  },
  localRoute: {
    src: "/naperville-riverwalk.jpg",
    position: "center 50%",
    label: "Western suburbs route",
  },
} satisfies Record<string, HeroImage>

export const serviceHeroImages: Record<string, HeroImage> = {
  "regular-cleaning": heroImageLibrary.cleanerAtWork,
  "deep-cleaning": heroImageLibrary.careDetail,
  "move-in-cleaning": heroImageLibrary.accessReady,
  "move-out-cleaning": heroImageLibrary.calmFinishedHome,
  "move-in-move-out-cleaning": heroImageLibrary.calmFinishedHome,
  "one-time-cleaning": heroImageLibrary.cleaningVisit,
  "recurring-cleaning": heroImageLibrary.recurringRhythm,
  "apartment-cleaning": heroImageLibrary.accessReady,
  "house-cleaning": heroImageLibrary.cleanerAtWork,
  "townhouse-cleaning": heroImageLibrary.cleanerAtWork,
  "condo-cleaning": heroImageLibrary.accessReady,
  "weekly-cleaning": heroImageLibrary.recurringRhythm,
  "biweekly-cleaning": heroImageLibrary.recurringRhythm,
  "rental-cleaning": heroImageLibrary.calmFinishedHome,
  "airbnb-cleaning": heroImageLibrary.followUp,
  "post-construction-cleaning": heroImageLibrary.careDetail,
}

export const hubHeroImages: Record<string, HeroImage> = {
  "/services": heroImageLibrary.cleanerAtWork,
  "/service-areas": heroImageLibrary.localRoute,
  "/pricing": heroImageLibrary.quoteStart,
  "/quote": heroImageLibrary.quoteStart,
  "/about": heroImageLibrary.cleanerAtWork,
  "/reviews": heroImageLibrary.calmFinishedHome,
  "/faq": heroImageLibrary.followUp,
  "/checklists": heroImageLibrary.careDetail,
  "/contact": heroImageLibrary.followUp,
  "/why-shynli": heroImageLibrary.cleanerAtWork,
}

export function getGenericHeroImage(page: GenericSeoPageData): HeroImage {
  if (hubHeroImages[page.path]) return hubHeroImages[page.path]
  if (page.path.startsWith("/pricing")) return heroImageLibrary.quoteStart
  if (page.path.startsWith("/checklists")) return heroImageLibrary.careDetail
  if (page.path.startsWith("/faq")) return heroImageLibrary.followUp
  if (page.path.startsWith("/service-areas/")) {
    const citySlug = page.path.split("/")[2]
    return cityHeroImages[citySlug] ?? heroImageLibrary.localRoute
  }
  if (page.path.includes("move") || page.path.includes("renter") || page.path.includes("landlord") || page.path.includes("security-deposit")) return heroImageLibrary.calmFinishedHome
  if (page.path.includes("recurring") || page.path.includes("weekly") || page.path.includes("busy-families") || page.path.includes("pet")) return heroImageLibrary.recurringRhythm
  if (page.path.includes("renovation") || page.path.includes("post-construction") || page.path.includes("deep")) return heroImageLibrary.careDetail
  if (page.path.includes("supply") || page.path.includes("guarantee") || page.path.includes("process") || page.path.includes("cleaner")) return heroImageLibrary.followUp
  return heroImageLibrary.cleanerAtWork
}

export const cityVisualMoments = [
  {
    image: "/trust-care.jpg",
    imagePosition: "50% 68%",
    eyebrow: "Prepared arrival",
    title: "We come in with the notes already clear.",
    copy: "Pets, access, parking, delicate rooms, and timing are easier when the plan is shared before the cleaner arrives.",
  },
  {
    image: "/clean-result.jpg",
    imagePosition: "50% 66%",
    eyebrow: "Lived-in reset",
    title: "Kitchens, baths, floors, and daily surfaces feel handled.",
    copy: "A standard visit is built around the rooms people actually use, so the home feels easier to live in after the clean.",
  },
  {
    image: "/process-repeat.jpg",
    imagePosition: "50% 55%",
    eyebrow: "Move-ready rooms",
    title: "Empty spaces get the clean handoff they need.",
    copy: "For move-in and move-out cleans, we focus on open rooms, floors, shelves, cabinets, access notes, and what the walkthrough will notice.",
  },
]

export const seoServices = [
  {
    slug: "regular-cleaning",
    name: "Regular Cleaning",
    shortName: "Regular",
    category: "main",
    intro: "A steady home reset for kitchens, bathrooms, floors, bedrooms, and the shared spaces that carry the week.",
    bestFor: ["Weekly or biweekly upkeep", "Busy family homes", "Homes that are lived-in but not neglected"],
    included: ["Kitchen counters, sink, and stovetop", "Bathrooms cleaned and refreshed", "Dusting reachable surfaces", "Vacuuming and mopping floors", "Trash gathered before we leave", "Bedrooms and shared spaces reset"],
    priceNote: "Regular cleaning is usually the best starting point when the home needs maintenance, not a heavy catch-up clean.",
    faqFocus: "regular cleaning",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    shortName: "Deep",
    category: "main",
    intro: "A more detailed clean for buildup, edges, high-touch areas, and the rooms that need more than a maintenance visit.",
    bestFor: ["Seasonal catch-up cleans", "Before guests or events", "Homes that have fallen behind"],
    included: ["Bathroom buildup and fixtures", "Kitchen detail and appliance-front wipe-downs", "Baseboards, doors, and trim detail", "High-touch surfaces", "Detailed dusting", "Optional fridge, oven, cabinet, and interior window extras"],
    priceNote: "Deep cleaning usually takes more time because the cleaner is handling detail, buildup, and edges that regular visits do not fully cover.",
    faqFocus: "deep cleaning",
  },
  {
    slug: "move-in-cleaning",
    name: "Move-In Cleaning",
    shortName: "Move-In",
    category: "main",
    intro: "A clean start before boxes, furniture, and daily life take over the home.",
    bestFor: ["Before furniture arrives", "New keys and new leases", "Homes that need kitchens and bathrooms reset first"],
    included: ["Empty-room floors and reachable surfaces", "Kitchen and bathroom reset", "Cabinets and drawers when requested", "Closets and shelving when empty", "Access and lock-up notes", "Optional fridge and oven work"],
    priceNote: "Move-in cleaning is priced around empty-room access, kitchen and bathroom condition, and whether cabinets or appliances need extra time.",
    faqFocus: "move-in cleaning",
  },
  {
    slug: "move-out-cleaning",
    name: "Move-Out Cleaning",
    shortName: "Move-Out",
    category: "main",
    intro: "An empty-home clean for lease endings, listings, walkthroughs, and the final handoff.",
    bestFor: ["Lease endings", "Seller and buyer walkthroughs", "Rental turnovers"],
    included: ["Empty floors and surfaces", "Bathrooms and kitchen reset", "Inside cabinets and drawers when requested", "Closets and shelving when empty", "Trash gathered when manageable", "Optional fridge, oven, blinds, walls, and interior window work"],
    priceNote: "Move-out cleaning depends heavily on home condition, what is empty, and whether the lease or walkthrough requires appliance or cabinet work.",
    faqFocus: "move-out cleaning",
  },
  {
    slug: "move-in-move-out-cleaning",
    name: "Move-In / Move-Out Cleaning",
    shortName: "Move Clean",
    category: "main",
    intro: "A move-focused clean for empty spaces before a new chapter starts or after the last box leaves.",
    bestFor: ["Moving in", "Moving out", "Turnovers between occupants"],
    included: ["Empty-room surfaces", "Kitchens and bathrooms", "Floors, closets, and shelves", "Cabinets and drawers when requested", "Access timing and lock-up notes", "Optional fridge, oven, and interior window work"],
    priceNote: "Move cleaning is priced around access, empty-room condition, appliances, cabinets, and how much detail the handoff needs.",
    faqFocus: "move-in / move-out cleaning",
  },
  {
    slug: "one-time-cleaning",
    name: "One-Time Cleaning",
    shortName: "One-Time",
    category: "additional",
    intro: "A one-time reset when you need the home cleaned without starting a recurring schedule.",
    bestFor: ["Before guests", "After a busy season", "Any home that needs a fresh reset"],
    included: ["Kitchen and bathrooms", "Dusting and floors", "Bedrooms and shared spaces", "High-touch surfaces", "Trash gathered", "Optional detail extras"],
    priceNote: "One-time cleaning depends on home size, condition, and whether you need standard maintenance or deeper detail.",
    faqFocus: "one-time cleaning",
  },
  {
    slug: "recurring-cleaning",
    name: "Recurring Cleaning",
    shortName: "Recurring",
    category: "additional",
    intro: "Weekly, biweekly, or monthly cleaning for homes that need steady support instead of one big catch-up.",
    bestFor: ["Weekly cleaning", "Biweekly cleaning", "Monthly cleaning"],
    included: ["A repeat checklist for your home", "Kitchen and bathroom maintenance", "Floors and dusting", "Bedrooms and common areas", "Notes that carry from visit to visit", "Priority scheduling when possible"],
    priceNote: "Recurring cleaning is often the best value because the home stays easier to maintain after the first visit.",
    faqFocus: "recurring cleaning",
  },
  {
    slug: "apartment-cleaning",
    name: "Apartment Cleaning",
    shortName: "Apartment",
    category: "additional",
    intro: "Apartment cleaning that works around access, parking, elevators, pets, and smaller high-use spaces.",
    bestFor: ["Renters", "Apartments before or after a lease", "Smaller homes that need efficient cleaning"],
    included: ["Kitchen and bathroom reset", "Floors and dusting", "Entry notes and parking details", "Bedrooms and living areas", "Move-in or move-out needs", "Optional appliance work"],
    priceNote: "Apartment cleaning is priced around size, access, parking, condition, and whether it is a regular visit or a move clean.",
    faqFocus: "apartment cleaning",
  },
  {
    slug: "house-cleaning",
    name: "House Cleaning",
    shortName: "House",
    category: "additional",
    intro: "Whole-home cleaning for kitchens, bathrooms, bedrooms, floors, and the spaces your family uses every day.",
    bestFor: ["Single-family homes", "Busy households", "Regular or deeper cleaning"],
    included: ["Kitchen and bathrooms", "Bedrooms and shared spaces", "Floors and dusting", "High-touch surfaces", "Trash gathered", "Optional deep or move-clean extras"],
    priceNote: "House cleaning is priced around square footage, bedrooms, bathrooms, condition, pets, and the kind of clean you choose.",
    faqFocus: "house cleaning",
  },
  {
    slug: "townhouse-cleaning",
    name: "Townhouse Cleaning",
    shortName: "Townhouse",
    category: "additional",
    intro: "Townhouse cleaning for multi-level homes, stairs, shared spaces, kitchens, bathrooms, and move-day needs.",
    bestFor: ["Townhomes with multiple levels", "Busy couples and families", "Move-in or move-out townhouse cleans"],
    included: ["Kitchen and bathrooms", "Stairs and floors", "Bedrooms and living areas", "Dusting and high-touch surfaces", "Access notes", "Optional cabinet and appliance work"],
    priceNote: "Townhouse cleaning depends on levels, stairs, bedrooms, bathrooms, condition, and whether the home is occupied or empty.",
    faqFocus: "townhouse cleaning",
  },
  {
    slug: "condo-cleaning",
    name: "Condo Cleaning",
    shortName: "Condo",
    category: "additional",
    intro: "Condo cleaning that respects building access, elevators, parking instructions, and the details of your unit.",
    bestFor: ["Condo owners", "Renters in condo buildings", "Lockbox, elevator, or front-desk access"],
    included: ["Kitchen and bathrooms", "Floors and dusting", "Bedrooms and living areas", "Building access notes", "Move-in or move-out needs", "Optional appliance and cabinet work"],
    priceNote: "Condo cleaning is priced around unit size, access, parking, condition, pets, and any extra detail needed.",
    faqFocus: "condo cleaning",
  },
  {
    slug: "weekly-cleaning",
    name: "Weekly Cleaning",
    shortName: "Weekly",
    category: "additional",
    intro: "A weekly cleaning rhythm for homes that need the kitchen, bathrooms, floors, and lived-in spaces reset before the week piles up.",
    bestFor: ["Families with busy weekdays", "Homes with pets or heavy kitchen use", "People who want fewer weekend chores"],
    included: ["Repeat kitchen and bathroom upkeep", "Floors, dusting, and high-touch surfaces", "Bedrooms and shared spaces", "Visit notes that carry forward", "Priority scheduling when possible", "Add-ons planned before the visit"],
    priceNote: "Weekly cleaning is usually the strongest value because each visit maintains the home before buildup needs extra time.",
    faqFocus: "weekly cleaning",
  },
  {
    slug: "biweekly-cleaning",
    name: "Biweekly Cleaning",
    shortName: "Biweekly",
    category: "additional",
    intro: "Every-other-week cleaning for homes that need reliable upkeep without a visit every week.",
    bestFor: ["Steady maintenance", "Homes that stay mostly under control", "Couples, families, and hybrid work schedules"],
    included: ["Kitchen and bathroom maintenance", "Dusting and floors", "Bedrooms and common rooms", "High-touch surfaces", "Trash gathered", "Notes for recurring preferences"],
    priceNote: "Biweekly cleaning is priced around the home size and how much resets between visits.",
    faqFocus: "biweekly cleaning",
  },
  {
    slug: "rental-cleaning",
    name: "Rental Cleaning",
    shortName: "Rental",
    category: "additional",
    intro: "Rental cleaning for lease endings, tenant turnovers, property managers, landlords, and renters who need a clearer handoff.",
    bestFor: ["Renters before inspection", "Landlords between tenants", "Property managers coordinating access"],
    included: ["Empty-room floors and surfaces", "Kitchen and bathroom reset", "Cabinets and drawers when requested", "Appliance extras when needed", "Access and lock-up notes", "Walkthrough-focused detail"],
    priceNote: "Rental cleaning depends on whether the unit is empty, how much tenant wear is present, and whether appliances or cabinets need extra time.",
    faqFocus: "rental cleaning",
  },
  {
    slug: "airbnb-cleaning",
    name: "Airbnb Cleaning",
    shortName: "Airbnb",
    category: "additional",
    intro: "A host-facing turnover clean for short-term rentals that need to feel guest-ready between checkout and check-in.",
    bestFor: ["Airbnb and VRBO hosts", "Short-term rental turnovers", "Hosts who need a documented handoff"],
    included: ["Kitchen and bathroom reset", "Beds made with prepared linens", "Trash removed before the next guest", "Guest supplies restocked when provided", "Photo-ready staging checklist", "Access, lockbox, and issue notes"],
    priceNote: "Airbnb cleaning depends on bedrooms, bathrooms, checkout and check-in timing, laundry, restocking, access notes, and whether the property needs a one-time turnover or recurring host support.",
    faqFocus: "Airbnb turnover cleaning",
  },
  {
    slug: "post-construction-cleaning",
    name: "Post-Construction Cleaning",
    shortName: "Post-Construction",
    category: "additional",
    intro: "A heavier cleanup after remodeling, renovation, or construction dust, focused on making the space feel ready to use again.",
    bestFor: ["After renovation dust", "Post-remodel kitchens or bathrooms", "Homes that need a detailed final cleanup"],
    included: ["Construction dust on reachable surfaces", "Kitchen and bathroom detail", "Floors, trim, doors, and high-touch areas", "Cabinet and shelf wipe-downs when requested", "Interior window and sill detail when requested", "Final walkthrough notes before we leave"],
    priceNote: "Post-construction cleaning depends on dust level, square footage, debris already removed, surface condition, and whether cabinets, windows, or detailed trim need extra time.",
    faqFocus: "post-construction cleaning",
  },
]

export const importantCityPages = cityPages.filter((city) => featuredServiceAreaCities.includes(city.name))

export const cityServiceProfiles: Record<string, { areaNote: string; homeMix: string; accessNote: string; timingNote: string }> = {
  naperville: {
    areaNote: "Naperville requests often come from busy family homes near school schedules, downtown condos, Riverwalk-area apartments, and move timing around larger subdivisions.",
    homeMix: "Expect a mix of single-family homes, townhomes, larger kitchens, finished basements, and apartment or condo units where parking and elevator notes matter.",
    accessNote: "Downtown parking, garage codes, side-door instructions, pets, and school-day arrival windows are the details that keep the visit moving smoothly.",
    timingNote: "For recurring work, many Naperville homes need a steady kitchen, bathroom, and floor reset before the weekend starts.",
  },
  aurora: {
    areaNote: "Aurora cleaning requests can range from Fox River and downtown apartments to larger west-side homes, rentals, and busy households spread across a wide service area.",
    homeMix: "The quote should account for whether the home is a compact unit, a multi-level house, a rental turnover, or a lived-in family home with heavier kitchen use.",
    accessNote: "Parking, gate instructions, pets, and whether the appointment is closer to downtown Aurora or the western neighborhoods can change how the route is planned.",
    timingNote: "Aurora visits benefit from clear arrival windows because nearby homes can sit on different route patterns even inside the same city.",
  },
  plainfield: {
    areaNote: "Plainfield requests often involve newer subdivisions, family homes, townhomes, and move-related cleaning around fast-growing neighborhoods and busy commuter routines.",
    homeMix: "Many homes need kitchen detail, bathrooms, floors, stairs, and entry areas handled with enough time for larger layouts or multiple levels.",
    accessNote: "Garage entry, driveway parking, pets, subdivision access, and whether the home is occupied or empty should be clear before the cleaner arrives.",
    timingNote: "Plainfield move and deep-clean visits usually work best when the rooms, appliances, and cabinet expectations are confirmed early.",
  },
  oswego: {
    areaNote: "Oswego cleaning often supports family homes, newer communities, move timing, and homes where kitchen traffic, floors, and bathrooms carry most of the result.",
    homeMix: "The home may be a larger single-family layout, a townhome, a rental, or a move-in space that needs attention before furniture arrives.",
    accessNote: "Driveway access, pets, lockbox notes, and whether the visit is tied to a closing, lease, or regular routine should be shared up front.",
    timingNote: "For Oswego, the route works best when the ZIP, appointment window, and priority rooms are confirmed before the visit is held.",
  },
  bolingbrook: {
    areaNote: "Bolingbrook requests often come from commuters, busy households, apartments, townhomes, and homes that need a practical reset around work and family schedules.",
    homeMix: "Expect a range of compact units, multi-level homes, pet homes, and rental handoffs where bathrooms, kitchens, floors, and trash areas matter most.",
    accessNote: "Building entry, parking, pets, garage access, and whether someone will be home can make the difference between a smooth visit and lost cleaning time.",
    timingNote: "Bolingbrook service is easier to schedule when the route is confirmed by ZIP and the clean type is matched to the current condition.",
  },
  lisle: {
    areaNote: "Lisle cleaning requests often include condos, apartments, townhomes, and single-family homes near commuter routes, office schedules, and compact residential streets.",
    homeMix: "Some visits are quick maintenance resets, while others need more time for kitchens, bathrooms, entry areas, and move-related detail.",
    accessNote: "Condo entry, parking rules, elevator access, pets, and whether the home is near a busier corridor should be noted before booking.",
    timingNote: "Lisle recurring and one-time visits work best when access instructions are simple and the priority rooms are named early.",
  },
  warrenville: {
    areaNote: "Warrenville requests often come from townhomes, apartments, and single-family homes near work corridors, forest-preserve traffic, and family routines.",
    homeMix: "The clean may need to account for stairs, compact kitchens, pet hair, lived-in bathrooms, or move timing between leases.",
    accessNote: "Parking, building entry, lockbox placement, pets, and whether the home is occupied should be clear before the visit starts.",
    timingNote: "Warrenville route planning is smoother when the ZIP and appointment window are checked before a longer clean is promised.",
  },
  "downers-grove": {
    areaNote: "Downers Grove requests often involve downtown-area condos, older homes, larger family houses, and move timing near train schedules or busy weekends.",
    homeMix: "Older layouts can need extra attention around bathrooms, baseboards, floors, kitchens, and entry areas that collect daily traffic.",
    accessNote: "Street parking, alley or garage instructions, pets, stair notes, and Metra-adjacent timing should be shared before the visit.",
    timingNote: "For Downers Grove, a clear priority list helps the cleaner focus on the spaces that guests, buyers, or family notice first.",
  },
  "north-aurora": {
    areaNote: "North Aurora requests often sit between quiet residential neighborhoods, Fox River-area homes, townhomes, and move-related cleaning around nearby Aurora routes.",
    homeMix: "The work can range from smaller homes and apartments to multi-level family spaces where kitchens, bathrooms, floors, and pet areas set the tone.",
    accessNote: "Driveway access, lockbox notes, pets, and whether the route connects with Aurora or Batavia-area timing should be confirmed early.",
    timingNote: "North Aurora visits are easiest to plan when the service is matched to the home condition before the appointment is reserved.",
  },
  "sugar-grove": {
    areaNote: "Sugar Grove requests often include larger homes, quieter subdivisions, move timing, and family schedules where a cleaner needs enough time on site.",
    homeMix: "Layouts may include bigger kitchens, multiple bathrooms, finished lower levels, pet areas, and entry spaces that need a clear plan.",
    accessNote: "Longer driveways, garage access, pets, lockbox location, and the preferred arrival window should be included with the quote request.",
    timingNote: "Sugar Grove service depends heavily on route fit, so ZIP and timing confirmation matter before the clean is booked.",
  },
  yorkville: {
    areaNote: "Yorkville requests often involve larger homes, newer subdivisions, move-day cleaning, and family routines where the route needs to be planned carefully.",
    homeMix: "The clean may include spacious kitchens, several bathrooms, stairs, pet areas, and empty rooms that need to be ready for a walkthrough.",
    accessNote: "Driveway parking, subdivision notes, pets, lockbox access, and whether this is a closing or regular home reset should be shared up front.",
    timingNote: "Yorkville appointments are easier to protect when the ZIP, service type, and expected time on site are confirmed early.",
  },
  montgomery: {
    areaNote: "Montgomery requests often connect Fox River-area neighborhoods, family homes, townhomes, and move-related cleaning near Aurora and Oswego routes.",
    homeMix: "Homes can range from compact townhomes to larger family layouts where bathrooms, kitchens, floors, and entry areas decide the result.",
    accessNote: "Parking, garage entry, pets, lockbox notes, and whether the home is occupied or empty should be clear before the cleaner arrives.",
    timingNote: "Montgomery route planning works best when the appointment window and priority rooms are confirmed before booking.",
  },
}
export const publicSeoServices = seoServices.filter((service) => service.slug !== "airbnb-cleaning")
export const cityServiceSeoServices = seoServices.filter((service) =>
  ["regular-cleaning", "deep-cleaning", "move-in-cleaning", "move-out-cleaning", "move-in-move-out-cleaning", "house-cleaning", "one-time-cleaning", "recurring-cleaning", "weekly-cleaning", "apartment-cleaning"].includes(service.slug),
)
export const postConstructionCityService = seoServices.find((service) => service.slug === "post-construction-cleaning")
export const cityServicePageCities = cityPages

export function getCityServiceSeoServices(cityName: string) {
  const services = [...cityServiceSeoServices]
  if (featuredServiceAreaCities.includes(cityName) && postConstructionCityService) {
    services.push(postConstructionCityService)
  }
  return services
}

export function hasCityServicePages(cityName: string) {
  return cityList.includes(cityName)
}

export const cityIntentAngles = [
  "busy family schedules",
  "apartment and townhouse access notes",
  "move-day timing and empty-room details",
  "recurring upkeep before the home falls behind",
]

export const roomChecklist = [
  {
    area: "Kitchen",
    items: ["Counters, sink, and stovetop", "Visible appliance fronts", "Microwave interior when accessible", "Fridge, oven, and cabinets can be added when needed"],
  },
  {
    area: "Bathrooms",
    items: ["Sink, toilet, tub, and shower", "Mirrors and fixtures", "High-touch surfaces", "Soap scum and buildup detail for deep cleans"],
  },
  {
    area: "Bedrooms and living areas",
    items: ["Dust reachable surfaces", "Vacuum carpets", "Mop hard floors", "Baseboards, doors, and trim for deep or move cleans"],
  },
  {
    area: "Before we leave",
    items: ["Trash gathered", "Rooms checked against the clean you chose", "Access and lock-up notes followed", "A clear way to reach us after the visit"],
  },
]

export function getCityAngle(city: { slug: string }) {
  const charTotal = city.slug.split("").reduce((total, character) => total + character.charCodeAt(0), 0)
  return cityIntentAngles[charTotal % cityIntentAngles.length]
}

export function getCityFaqs(cityName: string) {
  return [
    [`Do you clean homes in ${cityName}, IL?`, `Yes. Shynli serves ${cityName} and checks your ZIP first so we can make sure the time and address work before you book.`],
    [`What services can I book in ${cityName}?`, "You can ask for standard cleaning, deep cleaning, move-in cleaning, move-out cleaning, or recurring home cleaning."],
    ["Do cleaners bring supplies?", "Yes, supplies are included for standard work. If your home needs special products, surfaces, or access notes, tell us before the visit."],
    [`How is a ${cityName} cleaning priced?`, "Your price depends on home size, bedrooms, bathrooms, condition, pets, timing, and extras like fridge, oven, cabinets, or interior windows."],
    [`Can I book apartment, condo, or townhouse cleaning in ${cityName}?`, "Yes. Share parking, elevator, gate, lockbox, pet, and entry notes before the visit so the cleaner can arrive prepared."],
    [`Can I book move-out cleaning in ${cityName}?`, "Yes. Tell us what the lease, listing, or walkthrough requires, and we will price the empty rooms, cabinets, appliances, and timing clearly."],
    [`Can I book same-week cleaning in ${cityName}?`, "Often, yes. Openings depend on the day, the size of the home, and how detailed the clean needs to be."],
  ]
}

export const trustStats = [
  ["Local", "western suburbs team"],
  ["60 sec", "to start a quote"],
  ["No card", "needed to check times"],
]

export const comparison = [
  ["Independent cleaner", "Can be personal, but backup, insurance, and availability are often unclear."],
  ["Large franchise", "Recognizable name, but slower pricing and less flexible local communication."],
  ["Shynli", "Local service, clear booking, supplies included, and a make-it-right follow-up."],
]

export const reviews = [
  {
    quote: "The team came prepared, moved with care, and left the kitchen and bathrooms feeling genuinely reset.",
    name: "Naperville homeowner",
    detail: "Standard cleaning",
  },
  {
    quote: "The quote was clear before booking, the timing was clear, and the house felt handled when they left.",
    name: "Aurora homeowner",
    detail: "Deep cleaning",
  },
  {
    quote: "It felt like working with a real local service: responsive, organized, and easy to reach after the clean.",
    name: "Plainfield homeowner",
    detail: "Recurring cleaning",
  },
]

export const deepCleaningMoments = [
  {
    title: "Kitchen buildup",
    copy: "Counter edges, appliance fronts, stovetop residue, sink detail, cabinet fronts, and the spots that need more time than a maintenance visit.",
    items: ["Stovetop and counters", "Sink and fixtures", "Appliance-front detail"],
  },
  {
    title: "Bathroom detail",
    copy: "Showers, tubs, toilets, mirrors, fixtures, corners, and the buildup that makes a bathroom feel tired even after a quick wipe.",
    items: ["Shower and tub detail", "Fixtures and mirrors", "High-touch surfaces"],
  },
  {
    title: "Edges and forgotten spots",
    copy: "Baseboards, doors, trim, reachable vents, switches, corners, and the places that collect dust when life gets busy.",
    items: ["Baseboards and doors", "Detailed dusting", "Room-by-room final check"],
  },
]

export const deepCleaningBoundaries = [
  {
    value: "included",
    label: "Included",
    title: "The deep-clean core",
    copy: "See the extra detail clearly: buildup, bathrooms, kitchens, high-touch areas, edges, and room-by-room reset work.",
    items: ["Bathroom buildup and fixtures", "Kitchen detail and appliance fronts", "Baseboards, doors, and trim", "High-touch surfaces and detailed dusting"],
  },
  {
    value: "addons",
    label: "Add-ons",
    title: "Quoted before arrival",
    copy: "Borrow the MyClean / AccessMaids pattern: show extras up front so the customer does not discover them after clicking book.",
    items: ["Inside fridge or oven", "Inside cabinets", "Interior windows", "Heavy blinds or wall detail"],
  },
  {
    value: "excluded",
    label: "Not included",
    title: "Keep the promise clean",
    copy: "Clear boundaries build trust. If something needs a special visit, you will know before anyone books.",
    items: ["Hazardous waste", "Pest or mold removal", "Heavy trash hauling", "Outdoor or unreachable areas"],
  },
]

export const deepCleaningReferences = [
  ["Clear price signals", "Show the starting point, then explain what changes time before the visit is booked."],
  ["Fast quote path", "Let people check the ZIP, home size, condition, and add-ons without hunting through the page."],
  ["Visible checklist", "Make it obvious why deep cleaning takes more work than a standard maintenance clean."],
  ["Clear boundaries", "Name the included work, quoted extras, and things that need a different kind of help."],
  ["Trust near action", "Keep supplies, follow-up, and cleaner standards close to the booking step."],
  ["Simple service choice", "Help visitors choose a clean without making the page feel like a confusing marketplace."],
]

export const airbnbTurnoverMoments = [
  {
    title: "Between checkout and check-in",
    copy: "For hosts who care about timing, guest readiness, and protecting the next arrival window.",
    items: ["Checkout / check-in window", "Access and lockbox notes", "Same property checklist"],
  },
  {
    title: "Guest-ready reset",
    copy: "This is more than normal residential cleaning: beds, bathrooms, kitchen, trash, supplies, and the first impression all matter.",
    items: ["Beds and linens", "Kitchen and bathrooms", "Trash and supply reset"],
  },
  {
    title: "Documented handoff",
    copy: "Hosts want proof, issue notes, and a clear path if something looks off before the next guest arrives.",
    items: ["Photo-ready checklist", "Damage or issue notes", "Follow-up path"],
  },
]

export const airbnbOperationalTabs = [
  {
    value: "included",
    label: "Include",
    title: "Turnover work we can design for",
    copy: "The page can explain the kind of turnover support hosts care about most before they request availability.",
    items: ["Kitchen and bathroom reset", "Beds made with prepared linens", "Trash removal", "Provided supplies restocked"],
  },
  {
    value: "confirm",
    label: "Confirm",
    title: "Confirm before booking",
    copy: "These details should be checked before the visit so the host knows what can be handled in the turnover window.",
    items: ["Laundry model", "Photo reports", "Same-day windows", "Recurring host schedule"],
  },
  {
    value: "avoid",
    label: "Avoid",
    title: "Do not overpromise",
    copy: "Keep the promise realistic: hosts need clean rooms, clear timing, and no vague guarantees that fall apart on turnover day.",
    items: ["0-cancellation guarantee", "24/7 coverage", "Calendar sync", "Final manager inspection"],
  },
]

export const airbnbReferenceCards = [
  ["Artez Clean", "Premium STR positioning: protect guest ratings, revenue, and check-in confidence."],
  ["Super Clean Co", "Clear service blocks: cleaning, laundry, restocking, property checks, and photo reports."],
  ["Turno", "Operational language: checklists, scheduling, proof, updates, and host control."],
  ["HappyClean BnB", "Explain why STR turnovers need a different process than ordinary house cleaning."],
]

export type GenericSeoPageData = {
  path: string
  title: string
  meta: string
  eyebrow: string
  h1: string
  intro: string
  sections: { title: string; copy: string; bullets: string[] }[]
  faqs: [string, string][]
  links: [string, string][]
}

export const hubSeoPages: GenericSeoPageData[] = [
  {
    path: "/pricing",
    title: "House Cleaning Pricing | Shynli Cleaning",
    meta: "See how Shynli prices house cleaning, deep cleaning, move cleaning, apartment cleaning, and weekly cleaning before you request a quote.",
    eyebrow: "Pricing",
    h1: "Cleaning prices that make sense before anyone arrives.",
    intro: "Shynli does not ask you to guess what your home needs. Start with the service, ZIP, bedrooms, bathrooms, condition, pets, and any add-ons, then we confirm the visit before you book.",
    sections: [
      { title: "Published starting points", copy: "The live Shynli pricing page publishes starting points before the home details are confirmed.", bullets: ["Weekly Cleaning starts at $135 per visit", "Bi-Weekly Cleaning starts at $145 per visit", "Monthly Cleaning starts at $155 per visit", "Deep Cleaning starts at $152 for the smallest calculator setup", "Move In/Move Out starts at $197 for the smallest calculator setup"] },
      { title: "What shapes the quote", copy: "The biggest factors are the kind of clean, the size of the home, and how much detail the visit needs.", bullets: ["Bedrooms and bathrooms", "Standard, deep, move, or recurring service", "Pets, access, parking, and home condition", "Fridge, oven, cabinets, blinds, or interior windows"] },
      { title: "Why prices vary", copy: "Two homes with the same bedroom count can need very different amounts of time. A maintained home, an empty move-out, and a deep catch-up clean are priced differently because the work is different.", bullets: ["Maintenance visits are usually faster", "Deep cleans include detail and buildup", "Move cleans often include empty-room surfaces", "Recurring service can reduce future visit time"] },
      { title: "Published add-ons", copy: "Optional add-ons can be selected before booking so the team has enough time.", bullets: ["Oven Cleaning - $45", "Inside Refrigerator Cleaning - $45", "Baseboard Cleaning (whole house) - $22", "Doors Cleaning - $22", "Inside Cabinets Cleaning - $45", "Range hood - $22", "Wood Furniture Polishing - $20", "Interior Windows Cleaning - $6 per window", "Blinds Cleaning - $8 per window", "Bed Linen / Sofa Cover Change - $8 each", "Basement Cleaning - +$45"] },
      { title: "How to get a clear number", copy: "The quote path is built to reduce surprises. Share the real home details first, then choose the kind of cleaning that fits the visit.", bullets: ["Check your ZIP", "Choose the clean", "Share home details", "Confirm timing before booking"] },
    ],
    faqs: [
      ["How much does house cleaning cost?", "It depends on size, service type, condition, pets, and add-ons. Start with your ZIP and home details so the quote matches the real visit."],
      ["Is deep cleaning more expensive than regular cleaning?", "Usually, yes. Deep cleaning needs more detail, more time, and more attention to buildup and edges."],
      ["Do recurring visits cost less?", "Recurring service can be the best long-term value because the home stays easier to maintain after the first visit."],
      ["Can I add fridge or oven cleaning?", "Yes. Add-ons can be priced before the visit so the cleaner has enough time."],
    ],
    links: [["House cleaning cost", "/pricing/house-cleaning-cost"], ["Deep cleaning cost", "/pricing/deep-cleaning-cost"], ["Get a quote", "/quote"], ["Service areas", "/service-areas"]],
  },
  {
    path: "/quote",
    title: "Get a Cleaning Quote | Shynli Cleaning",
    meta: "Start a Shynli cleaning quote for regular, deep, move-in, move-out, apartment, condo, townhouse, or recurring cleaning.",
    eyebrow: "Quote",
    h1: "Check your ZIP, choose the clean, and get a clearer path to booking.",
    intro: "The quote starts with the basics that actually affect the visit: where the home is, what kind of clean you need, how many bedrooms and bathrooms, and whether there are add-ons or access notes.",
    sections: [
      { title: "What we ask first", copy: "A good quote is easier when the visit is clear from the start.", bullets: ["ZIP code and service area", "Bedrooms and bathrooms", "Standard, deep, move, or recurring", "Pets, parking, entry, and building access"] },
      { title: "What happens after", copy: "We confirm the route, timing, cleaning type, and home details before asking you to commit to the visit.", bullets: ["No card just to check times", "Clear add-ons before booking", "Supplies included for standard work", "A simple way to reach us after the clean"] },
      { title: "Best next step", copy: "If you are comparing services, start with the clean that matches the situation today, then adjust from there.", bullets: ["Regular for maintenance", "Deep for catch-up detail", "Move for empty homes", "Recurring for ongoing help"] },
    ],
    faqs: [
      ["Do I need a card to check times?", "No. You can start by checking your ZIP and sharing home details."],
      ["Can I change the service type?", "Yes. The quote can be adjusted if a deep clean, move clean, or add-on makes more sense."],
      ["What if my ZIP is near the edge of the route?", "Share it anyway. We confirm the service area before booking."],
      ["Can I request a same-week clean?", "Often, yes. Availability depends on the route, service type, and home size."],
    ],
    links: [["Regular cleaning", "/services/regular-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Move-out cleaning", "/services/move-out-cleaning"], ["Pricing", "/pricing"]],
  },
  {
    path: "/about",
    title: "About Shynli Cleaning | Local Home Cleaning",
    meta: "Learn how Shynli handles local home cleaning with clear quotes, prepared cleaners, supplies included, and follow-up support.",
    eyebrow: "About",
    h1: "A local cleaning service built to feel organized, reachable, and clear.",
    intro: "Shynli exists for people who want the home handled by a real team, not a vague listing. The goal is simple: clearer booking, prepared cleaners, and fewer surprises after the visit.",
    sections: [
      { title: "What we believe", copy: "Home cleaning works best when expectations are clear before the cleaner arrives.", bullets: ["Clear cleaning options", "Straightforward price details", "Supplies included", "Follow-up if something important is missed"] },
      { title: "Who we serve", copy: "We help homes across the western suburbs with regular upkeep, deep cleaning, move cleaning, and property-type needs.", bullets: ["Houses", "Apartments", "Condos and townhouses", "Move-in and move-out situations"] },
      { title: "How we work", copy: "We start with your ZIP, cleaning type, and home details so the visit has a real plan.", bullets: ["Check the route", "Confirm timing", "Document access notes", "Match the clean to the home"] },
    ],
    faqs: [
      ["Is Shynli local?", "Yes. Shynli is focused on western-suburb home cleaning routes."],
      ["Do cleaners bring supplies?", "Yes. Standard supplies are included for normal home cleaning work."],
      ["Can I reach someone after the visit?", "Yes. The site is built around clear communication and a make-it-right follow-up path."],
      ["What services do you offer?", "Regular, deep, move-in, move-out, recurring, apartment, condo, townhouse, and house cleaning."],
    ],
    links: [["Why Shynli", "/why-shynli"], ["Our cleaning process", "/our-cleaning-process"], ["Reviews", "/reviews"], ["Service areas", "/service-areas"]],
  },
  {
    path: "/reviews",
    title: "Shynli Cleaning Reviews | Local Home Cleaning",
    meta: "Read what homeowners look for when choosing Shynli: clear quotes, prepared cleaners, cleaner kitchens and bathrooms, and reachable support.",
    eyebrow: "Reviews",
    h1: "The clean should feel handled, not mysterious.",
    intro: "Reviews matter because people are inviting a cleaner into their home. This page highlights the standards customers care about most: timing, communication, detail, and follow-up.",
    sections: [
      { title: "What people notice first", copy: "The strongest feedback usually comes from homes where the plan was clear and the cleaner arrived prepared.", bullets: ["Kitchen and bathroom reset", "Clear timing", "Respectful access handling", "A cleaner home without a confusing quote"] },
      { title: "What earns repeat visits", copy: "Recurring clients usually care less about drama and more about consistency.", bullets: ["A predictable checklist", "Notes that carry forward", "Cleaner floors and surfaces", "Fast communication when something changes"] },
      { title: "What to expect", copy: "Shynli aims to keep the visit organized from quote to follow-up.", bullets: ["No card to check times", "Supplies included", "Add-ons discussed first", "Make-it-right path"] },
    ],
    faqs: [
      ["Where can I read Shynli reviews?", "This page brings customer proof, service standards, and feedback into one easy place before you request a quote."],
      ["What do customers usually care about?", "Clear timing, careful access, kitchens, bathrooms, floors, and whether the service is reachable after the visit."],
      ["Do reviews affect booking?", "Yes. Strong reviews help customers trust the service before requesting a quote."],
      ["Can I leave feedback after a clean?", "Yes. Feedback is part of the follow-up path."],
    ],
    links: [["Satisfaction guarantee", "/satisfaction-guarantee"], ["Insured cleaners", "/insured-cleaners"], ["Get a quote", "/quote"], ["Services", "/services"]],
  },
  {
    path: "/faq",
    title: "House Cleaning FAQ | Shynli Cleaning",
    meta: "Answers about Shynli supplies, deep cleaning, move-out cleaning, pricing, timing, add-ons, and how to prepare for a home cleaning visit.",
    eyebrow: "FAQ",
    h1: "Clear answers before anyone enters your home.",
    intro: "Cleaning questions are usually practical: what is included, how long it takes, what costs extra, and what you should do before the cleaner arrives.",
    sections: [
      { title: "Service questions", copy: "Start by choosing the clean that matches the condition of the home.", bullets: ["Regular cleaning for upkeep", "Deep cleaning for buildup", "Move cleaning for empty spaces", "Recurring cleaning for a steady rhythm"] },
      { title: "Pricing questions", copy: "Prices depend on the real work, not just the name of the service.", bullets: ["Bedrooms and bathrooms", "Home condition", "Pets and access", "Fridge, oven, cabinet, and window add-ons"] },
      { title: "Visit questions", copy: "A smoother visit starts with practical notes before arrival.", bullets: ["Parking", "Entry instructions", "Pets", "Rooms needing extra care"] },
    ],
    faqs: [
      ["Do cleaners bring supplies?", "Yes. Standard supplies are included unless your home needs a specific product."],
      ["What is included in deep cleaning?", "Deep cleaning adds more detail for buildup, edges, baseboards, fixtures, and high-touch areas."],
      ["Can I book move-out cleaning?", "Yes. Move-out cleaning focuses on empty rooms, kitchens, bathrooms, floors, cabinets, and appliance add-ons."],
      ["How do I prepare?", "Share access notes, pick up personal clutter where possible, and tell us what matters most."],
    ],
    links: [["Deep cleaning FAQ", "/faq/what-is-included-in-deep-cleaning"], ["Move-out cleaning FAQ", "/faq/what-is-included-in-move-out-cleaning"], ["Prepare for cleaning", "/faq/how-to-prepare-for-house-cleaning"], ["Checklists", "/checklists"]],
  },
  {
    path: "/checklists",
    title: "Cleaning Checklists | Shynli Cleaning",
    meta: "Compare Shynli regular, deep, move-out, move-in, apartment, and one-time cleaning checklists before booking.",
    eyebrow: "Checklists",
    h1: "Know what the cleaner is aiming to cover.",
    intro: "A checklist turns a vague cleaning request into a clearer plan. Use these pages to compare regular, deep, move, apartment, and one-time cleaning before you ask for a quote.",
    sections: [
      { title: "Why checklists matter", copy: "They help match the visit to the real condition of the home.", bullets: ["Regular cleaning covers maintenance", "Deep cleaning adds detail", "Move cleaning focuses on empty rooms", "Add-ons are priced before the visit"] },
      { title: "What every clean starts with", copy: "Most homes care most about the same core areas first.", bullets: ["Kitchen", "Bathrooms", "Floors", "Bedrooms and common spaces"] },
      { title: "What can be added", copy: "Some jobs need extra time and should be discussed before booking.", bullets: ["Inside fridge", "Inside oven", "Cabinets and drawers", "Interior windows"] },
    ],
    faqs: [
      ["Is the checklist the same for every home?", "No. It depends on the cleaning type, condition, home type, and add-ons."],
      ["Does deep cleaning include more than regular cleaning?", "Yes. It usually includes more detail for buildup and edges."],
      ["Do move cleans include inside cabinets?", "They can when requested and priced with enough time."],
      ["Can I ask for extra focus areas?", "Yes. Share the priority before booking."],
    ],
    links: [["Regular checklist", "/checklists/regular-cleaning-checklist"], ["Deep checklist", "/checklists/deep-cleaning-checklist"], ["Move-out checklist", "/checklists/move-out-cleaning-checklist"], ["Apartment checklist", "/checklists/apartment-cleaning-checklist"]],
  },
  {
    path: "/contact",
    title: "Contact Shynli Cleaning | Call or Request a Quote",
    meta: "Contact Shynli Cleaning for house cleaning, apartment cleaning, deep cleaning, move-out cleaning, recurring cleaning, and service area questions.",
    eyebrow: "Contact",
    h1: "Reach a cleaning service that actually plans the visit with you.",
    intro: "Use this page when you need help choosing a service, checking whether your ZIP is on the route, adjusting access notes, or confirming what should be included.",
    sections: [
      { title: "Fastest way to start", copy: "The quote path is usually faster than a long message because it captures the details that affect timing and price.", bullets: ["ZIP code", "Service type", "Bedrooms and bathrooms", "Add-ons and access notes"] },
      { title: "When to call", copy: "Call when the clean has timing pressure or a detail that needs a real conversation.", bullets: ["Move-out deadline", "Same-week request", "Gate, lockbox, or front-desk access", "Property manager coordination"] },
      { title: "What to include", copy: "A little detail upfront keeps the visit cleaner and easier.", bullets: ["Home type", "Pets", "Parking", "Rooms needing extra attention"] },
    ],
    faqs: [
      ["What is the phone number?", `Call Shynli at ${businessPhoneDisplay}.`],
      ["Can I ask about service areas?", "Yes. Start with your ZIP and we will confirm the route."],
      ["Can I change appointment details?", "Yes. Share changes as early as possible so timing and pricing stay clear."],
      ["Can I request a quote online?", "Yes. Use the quote page to start with the key details."],
    ],
    links: [["Get a quote", "/quote"], ["Service areas", "/service-areas"], ["FAQ", "/faq"], ["Pricing", "/pricing"]],
  },
]

export const priceSeoPages: GenericSeoPageData[] = [
  ["house-cleaning-cost", "House Cleaning Cost", "whole-home cleaning", ["Square footage", "Bedrooms and bathrooms", "Pets and home condition", "Recurring or one-time timing"]],
  ["deep-cleaning-cost", "Deep Cleaning Cost", "detail-heavy cleaning", ["Buildup and edges", "Baseboards and fixtures", "Kitchen and bathroom condition", "Appliance or cabinet add-ons"]],
  ["move-out-cleaning-cost", "Move-Out Cleaning Cost", "empty-home handoff cleaning", ["Lease or listing deadline", "Empty cabinets and closets", "Fridge and oven requests", "Trash and walkthrough expectations"]],
  ["apartment-cleaning-cost", "Apartment Cleaning Cost", "apartment cleaning", ["Unit size", "Elevator or parking access", "Lease or recurring need", "Kitchen and bathroom condition"]],
  ["weekly-cleaning-cost", "Weekly Cleaning Cost", "recurring weekly cleaning", ["Visit frequency", "Home size", "Kitchen and bathroom use", "Pets and high-traffic floors"]],
  ["post-construction-cleaning-cost", "Post-Construction Cleaning Cost", "post-construction cleanup", ["Construction dust level", "Recent remodel or renovation scope", "Square footage and surface detail", "Cabinets, trim, windows, and final walkthrough needs"]],
].map(([slug, label, intent, bullets]) => ({
  path: `/pricing/${slug}`,
  title: `${label} | Shynli Cleaning`,
  meta: `Learn what affects ${String(label).toLowerCase()} with Shynli, including home size, condition, timing, add-ons, and how to request a clear quote.`,
  eyebrow: "Cost guide",
  h1: `${label}: what changes the quote.`,
  intro: `No two homes need the exact same quote. Shynli prices around the real ${intent}: the home, the timing, the condition, and what needs to be handled before the cleaner arrives.`,
  sections: [
    { title: "Main cost factors", copy: "The quote starts with the details that change time on site.", bullets: bullets as string[] },
    { title: "What can raise the price", copy: "Extra detail, buildup, empty-home requirements, and appliance work need more time than a basic reset.", bullets: ["Inside fridge or oven", "Inside cabinets or drawers", "Heavy buildup", "Interior windows, blinds, or walls"] },
    { title: "How to get a better estimate", copy: "Share accurate details first so the visit is priced for the work you actually need.", bullets: ["Choose the service", "Enter your ZIP", "Share bedrooms and bathrooms", "Mention pets, access, and priority rooms"] },
  ],
  faqs: [
    [`What affects ${String(label).toLowerCase()} the most?`, "The service type, home size, condition, pets, timing, and add-ons usually matter most."],
    ["Can I get a quote before booking?", "Yes. Start with your ZIP and home details so Shynli can confirm timing and price factors."],
    ["Are supplies included?", "Yes. Standard supplies are included for normal home cleaning work."],
    ["Are fridge and oven cleaning included?", "They can be added when requested and priced with enough time."],
  ],
  links: [["Pricing hub", "/pricing"], ["Get a quote", "/quote"], ["Deep cleaning", "/services/deep-cleaning"], ["Service areas", "/service-areas"]],
}))

export const checklistSeoPages: GenericSeoPageData[] = [
  ["deep-cleaning-checklist", "Deep Cleaning Checklist", "deep cleaning", ["Bathroom buildup and fixtures", "Kitchen detail and appliance fronts", "Baseboards, doors, and trim", "High-touch surfaces and detailed dusting"]],
  ["move-out-cleaning-checklist", "Move-Out Cleaning Checklist", "move-out cleaning", ["Empty floors and surfaces", "Inside cabinets when requested", "Kitchen and bathroom reset", "Fridge, oven, and walkthrough add-ons"]],
  ["move-in-cleaning-checklist", "Move-In Cleaning Checklist", "move-in cleaning", ["Before furniture arrives", "Kitchen and bathroom reset", "Closets and shelving", "Optional appliance detail"]],
  ["apartment-cleaning-checklist", "Apartment Cleaning Checklist", "apartment cleaning", ["Kitchen and bathroom reset", "Floors and dusting", "Access and parking notes", "Lease or recurring needs"]],
  ["regular-cleaning-checklist", "Regular Cleaning Checklist", "regular cleaning", ["Kitchen surfaces", "Bathrooms refreshed", "Dusting and floors", "Bedrooms and shared spaces"]],
  ["one-time-cleaning-checklist", "One-Time Cleaning Checklist", "one-time cleaning", ["Choose the clean first", "High-use rooms", "Floors and surfaces", "Optional detail add-ons"]],
  ["post-construction-cleaning-checklist", "Post-Construction Cleaning Checklist", "post-construction cleaning", ["Construction dust on reachable surfaces", "Floors, trim, and doors", "Kitchen and bathroom detail", "Cabinet, shelf, sill, and final-touch add-ons"]],
].map(([slug, label, service, bullets]) => ({
  path: `/checklists/${slug}`,
  title: `${label} | Shynli Cleaning`,
  meta: `Review the Shynli ${String(service)} checklist before booking, including rooms, surfaces, add-ons, pricing factors, and preparation notes.`,
  eyebrow: "Checklist",
  h1: `${label} for a cleaner, clearer visit.`,
  intro: `A checklist helps you see what ${service} should cover before the appointment. Shynli uses the checklist as a planning tool, then adjusts around your home, condition, timing, and requested extras.`,
  sections: [
    { title: "Core checklist", copy: "These are the areas most likely to shape the visit.", bullets: bullets as string[] },
    { title: "Add-ons to discuss first", copy: "Some items are better priced before arrival so the cleaner has enough time.", bullets: ["Inside fridge", "Inside oven", "Cabinets and drawers", "Interior windows or blinds"] },
    { title: "How to prepare", copy: "The visit goes better when access and priorities are clear.", bullets: ["Share entry instructions", "Mention pets", "Pick the rooms that matter most", "Tell us about delicate surfaces"] },
  ],
  faqs: [
    [`Is the ${String(service)} checklist fixed?`, "No. It starts with a standard plan and adjusts to home condition, access, and add-ons."],
    ["Do cleaners bring supplies?", "Yes. Standard supplies are included."],
    ["Can I add appliance cleaning?", "Yes. Fridge and oven cleaning can be added when requested."],
    ["Can this checklist be used for apartments and houses?", "Yes. The work is adjusted around the property type and access notes."],
  ],
  links: [["Checklists hub", "/checklists"], ["Get a quote", "/quote"], ["Pricing", "/pricing"], ["FAQ", "/faq"]],
}))

export const situationSeoPages: GenericSeoPageData[] = [
  ["cleaning-before-moving-in", "Cleaning Before Moving In", "Move into a home that feels reset before the boxes arrive.", ["Kitchen and bathroom reset", "Empty closets and shelves", "Optional fridge and oven", "Access before furniture delivery"]],
  ["cleaning-after-moving-out", "Cleaning After Moving Out", "Leave the home cleaner for the walkthrough, listing, or next occupant.", ["Empty-room floors", "Cabinets and drawers", "Lease-focused kitchen and bathrooms", "Move-day timing"]],
  ["cleaning-before-selling-house", "Cleaning Before Selling a House", "Help the home show better before photos, tours, and buyer walkthroughs.", ["Kitchen and bathroom polish", "Entry and shared spaces", "Floors and dusting", "Optional interior window detail"]],
  ["cleaning-before-guests", "Cleaning Before Guests", "Get the rooms people notice ready before family, friends, or visitors arrive.", ["Bathrooms", "Kitchen surfaces", "Floors", "Guest bedrooms and shared spaces"]],
  ["cleaning-after-party", "Cleaning After a Party", "Reset the home after hosting without losing the next day to cleanup.", ["Kitchen and trash", "Bathrooms", "Floors", "High-use surfaces"]],
  ["cleaning-before-holidays", "Cleaning Before Holidays", "Make the home feel ready before the busiest hosting weeks of the year.", ["Kitchen prep areas", "Bathrooms", "Guest spaces", "Floors and dusting"]],
  ["cleaning-for-renters", "Cleaning for Renters", "A clearer cleaning plan before inspection, move-out, or a fresh lease start.", ["Lease expectations", "Kitchen and bathrooms", "Empty rooms", "Add-ons before inspection"]],
  ["cleaning-for-landlords", "Cleaning for Landlords", "Turnover cleaning that helps the next showing or tenant start cleaner.", ["Empty-unit reset", "Cabinets and shelves", "Appliance add-ons", "Access and lock-up notes"]],
  ["cleaning-for-property-managers", "Cleaning for Property Managers", "Cleaning support for units that need clear timing, access notes, and practical handoff details.", ["Turnover timing", "Entry coordination", "Move-out condition", "Photo or walkthrough expectations"]],
  ["cleaning-for-busy-families", "Cleaning for Busy Families", "A practical cleaning rhythm for homes where the week moves faster than the chores.", ["Recurring schedule", "Kitchens and bathrooms", "Kids rooms and shared spaces", "Pets and high-traffic floors"]],
  ["cleaning-for-pet-owners", "Cleaning for Pet Owners", "Home cleaning planned around fur, floors, access notes, and pet-safe instructions.", ["Pet notes before arrival", "Floors and high-touch surfaces", "Bathrooms and kitchens", "Recurring upkeep"]],
  ["cleaning-after-renovation", "Cleaning After Renovation", "A post-renovation clean helps remove fine dust, reset bathrooms and kitchens, and make the home feel usable after the work is done.", ["Fine dust on reachable surfaces", "Floors, doors, trim, and sills", "Kitchen and bathroom detail", "Cabinet and interior window add-ons"]],
].map(([slug, label, intro, bullets]) => ({
  path: `/${slug}`,
  title: `${label} | Shynli Cleaning`,
  meta: `${label} with Shynli Cleaning. See what to request, how pricing works, what can be included, and how to get a clear quote.`,
  eyebrow: "Cleaning situation",
  h1: `${label}, planned before the cleaner arrives.`,
  intro: intro as string,
  sections: [
    { title: "What to ask for", copy: "The right clean depends on what happens next in the home.", bullets: bullets as string[] },
    { title: "What changes the quote", copy: "Timing, condition, and add-ons can change how much time the visit needs.", bullets: ["Bedrooms and bathrooms", "Home condition", "Pets and access", "Fridge, oven, cabinets, or windows"] },
    { title: "How Shynli keeps it clear", copy: "We start with the practical details so the cleaner arrives with a plan.", bullets: ["ZIP check", "Cleaning type", "Access notes", "Make-it-right follow-up"] },
  ],
  faqs: [
    [`Can Shynli help with ${String(label).toLowerCase()}?`, "Yes. Start with your ZIP and the situation so we can match the clean to the home."],
    ["Should I choose regular, deep, or move cleaning?", "Choose regular for upkeep, deep for buildup, and move cleaning for empty-home handoffs."],
    ["Can I add fridge, oven, or cabinet cleaning?", "Yes. Add-ons should be requested before booking."],
    ["Do cleaners bring supplies?", "Yes. Standard supplies are included."],
  ],
  links: [["Move-in cleaning", "/services/move-in-cleaning"], ["Move-out cleaning", "/services/move-out-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Get a quote", "/quote"]],
}))

export const faqSeoPages: GenericSeoPageData[] = [
  ["what-is-included-in-deep-cleaning", "What Is Included in Deep Cleaning?", "Deep cleaning usually adds detail for buildup, baseboards, fixtures, high-touch areas, bathrooms, kitchens, and harder-to-ignore corners."],
  ["what-is-included-in-move-out-cleaning", "What Is Included in Move-Out Cleaning?", "Move-out cleaning focuses on empty rooms, kitchens, bathrooms, floors, cabinets when requested, and the details a walkthrough can notice."],
  ["regular-cleaning-vs-deep-cleaning", "Regular Cleaning vs Deep Cleaning", "Regular cleaning maintains the home. Deep cleaning catches buildup, edges, and detail that a maintenance visit does not fully handle."],
  ["how-long-does-deep-cleaning-take", "How Long Does Deep Cleaning Take?", "Deep cleaning time depends on home size, condition, bathrooms, kitchen buildup, pets, and requested add-ons."],
  ["do-cleaners-bring-supplies", "Do Cleaners Bring Supplies?", "Yes. Shynli includes standard supplies for normal home cleaning work unless your home needs a special product."],
  ["does-move-out-cleaning-include-inside-fridge", "Does Move-Out Cleaning Include Inside the Fridge?", "Inside-fridge cleaning can be added to move-out cleaning when requested and priced with enough time."],
  ["does-deep-cleaning-include-inside-oven", "Does Deep Cleaning Include Inside the Oven?", "Inside-oven cleaning is usually an add-on because it needs extra time and should be planned before arrival."],
  ["how-to-prepare-for-house-cleaning", "How to Prepare for House Cleaning", "Share entry notes, pet notes, priorities, and add-ons. Pick up personal clutter where possible so cleaners can focus on cleaning."],
  ["how-to-get-security-deposit-back-cleaning", "How to Get Your Security Deposit Back with Cleaning", "Focus on lease requirements, empty-room surfaces, kitchen, bathrooms, cabinets, appliance add-ons, and walkthrough-visible details."],
  ["what-is-included-in-post-construction-cleaning", "What Is Included in Post-Construction Cleaning?", "Post-construction cleaning focuses on reachable construction dust, floors, trim, kitchens, bathrooms, shelves, cabinets when requested, and final-touch detail after renovation."],
].map(([slug, label, intro]) => ({
  path: `/faq/${slug}`,
  title: `${label} | Shynli FAQ`,
  meta: `${label} Shynli explains what to expect, what affects pricing, what to request, and how to book the right cleaning service.`,
  eyebrow: "Cleaning FAQ",
  h1: label as string,
  intro: intro as string,
  sections: [
    { title: "Short answer", copy: intro as string, bullets: ["Choose the cleaning type first", "Share home condition honestly", "Request add-ons before booking", "Confirm access and timing"] },
    { title: "What it means for your quote", copy: "The same question can change the visit time depending on home size, condition, and extras.", bullets: ["Bedrooms and bathrooms", "Kitchen and bathroom condition", "Pets and floors", "Fridge, oven, cabinets, windows, or blinds"] },
    { title: "Best next step", copy: "If you are unsure, start with the closest service and adjust during the quote path.", bullets: ["Regular for upkeep", "Deep for buildup", "Move for empty homes", "Recurring for ongoing help"] },
  ],
  faqs: [
    ["Can I ask for this before booking?", "Yes. Share the detail before booking so the cleaner has the right amount of time."],
    ["Does this change the price?", "It can, depending on time, condition, and whether the request is an add-on."],
    ["Do cleaners bring supplies?", "Yes. Standard supplies are included."],
    ["Can Shynli help this week?", "Often, yes. Availability depends on route, timing, and home details."],
  ],
  links: [["FAQ hub", "/faq"], ["Checklists", "/checklists"], ["Pricing", "/pricing"], ["Get a quote", "/quote"]],
}))

export const trustSeoPages: GenericSeoPageData[] = [
  ["why-shynli", "Why Shynli", "Choose Shynli when you want local home cleaning with clearer quotes, prepared cleaners, supplies included, and reachable support."],
  ["our-cleaning-process", "Our Cleaning Process", "See how Shynli moves from ZIP check to service choice, access notes, cleaning checklist, follow-up, and recurring upkeep."],
  ["satisfaction-guarantee", "Satisfaction Guarantee", "Shynli keeps a make-it-right follow-up path so important missed items do not disappear after the visit."],
  ["insured-cleaners", "Insured Cleaners", "Shynli is built around a real service model with accountability, communication, and coverage expectations."],
  ["background-checked-cleaners", "Background Checked Cleaners", "Learn how trust, screening expectations, and clear visit notes fit into the Shynli cleaning experience."],
  ["pet-friendly-cleaning", "Pet-Friendly Cleaning", "Share pet notes before the visit so the cleaner can plan entry, rooms, products, and floor priorities."],
  ["eco-friendly-cleaning", "Eco-Friendly Cleaning", "Tell Shynli about preferred products or sensitive surfaces before the visit so supplies can be discussed clearly."],
  ["same-cleaner", "Same Cleaner", "Recurring clients can share preferences and visit notes so future cleanings feel more familiar and consistent."],
  ["cleaning-supplies-included", "Cleaning Supplies Included", "Standard cleaning supplies are included, with special products or sensitive surfaces discussed before the visit."],
].map(([slug, label, intro]) => ({
  path: `/${slug}`,
  title: `${label} | Shynli Cleaning`,
  meta: `${label} with Shynli Cleaning: clear expectations, prepared visit notes, included supplies, reachable support, and an easy quote path.`,
  eyebrow: "Trust",
  h1: `${label}, without the vague parts.`,
  intro: intro as string,
  sections: [
    { title: "What this means", copy: "Trust is not a slogan. It shows up in the small details before, during, and after the clean.", bullets: ["Clear quote path", "Prepared access notes", "Supplies included", "Follow-up after the visit"] },
    { title: "Why homeowners care", copy: "People want a cleaner home, but they also want to know who is coming, what is included, and how to fix something if needed.", bullets: ["Reachable support", "Service expectations", "Cleaners arrive with notes", "No hidden mystery around add-ons"] },
    { title: "Choose the right clean", copy: "Compare the options, then request the service that matches your home today.", bullets: ["Ask about timing", "Share pet or access notes", "Choose standard, deep, or move", "Request add-ons before booking"] },
  ],
  faqs: [
    [`Why does ${String(label).toLowerCase()} matter?`, "Because home cleaning requires access, trust, and clear expectations before the visit."],
    ["Do cleaners bring supplies?", "Yes. Standard supplies are included."],
    ["Can I reach Shynli after the clean?", "Yes. The service is built with a follow-up path."],
    ["Can I book recurring cleaning?", "Yes. Weekly, biweekly, and monthly service can be requested."],
  ],
  links: [["About", "/about"], ["Reviews", "/reviews"], ["Get a quote", "/quote"], ["Service areas", "/service-areas"]],
}))

export const comparisonSeoPages: GenericSeoPageData[] = [
  ["house-cleaning-vs-maid-service", "House Cleaning vs Maid Service", "House cleaning is usually visit-based work around a checklist. Maid service can imply broader household help, so expectations should be clear."],
  ["regular-cleaning-vs-deep-cleaning", "Regular Cleaning vs Deep Cleaning", "Regular cleaning maintains a home that is already under control. Deep cleaning handles buildup, detail, and catch-up work."],
  ["move-out-cleaning-vs-deep-cleaning", "Move-Out Cleaning vs Deep Cleaning", "Move-out cleaning is built around an empty-home handoff. Deep cleaning is built around detail and buildup in an occupied or furnished home."],
  ["one-time-cleaning-vs-recurring-cleaning", "One-Time Cleaning vs Recurring Cleaning", "One-time cleaning solves a specific moment. Recurring cleaning keeps the home from sliding back week after week."],
  ["professional-cleaning-vs-independent-cleaner", "Professional Cleaning vs Independent Cleaner", "A professional service can offer clearer support, quote structure, and backup expectations than a casual listing."],
  ["post-construction-cleaning-vs-deep-cleaning", "Post-Construction Cleaning vs Deep Cleaning", "Post-construction cleaning is built around renovation dust and final cleanup. Deep cleaning is built around household buildup, bathrooms, kitchens, and detail in a lived-in home."],
].map(([slug, label, intro]) => ({
  path: `/${slug}`,
  title: `${label} | Shynli Cleaning`,
  meta: `${label}: compare what each option means, when to choose it, what affects price, and how to request a Shynli quote.`,
  eyebrow: "Compare",
  h1: `${label}: which one fits your home?`,
  intro: intro as string,
  sections: [
    { title: "Choose the first option when", copy: "The first option usually fits a specific kind of home or expectation.", bullets: ["You know the visit scope", "You want checklist clarity", "You need a focused cleaning result", "You want fewer vague assumptions"] },
    { title: "Choose the second option when", copy: "The second option may fit when the need is broader, deeper, or ongoing.", bullets: ["The home needs more detail", "The timing is tied to a move", "You want recurring help", "You need clearer service support"] },
    { title: "How Shynli helps decide", copy: "Start with the situation and home details. The quote path helps match the service to the actual visit.", bullets: ["ZIP and route", "Cleaning type", "Bedrooms and bathrooms", "Condition and add-ons"] },
  ],
  faqs: [
    ["Which option costs more?", "The option that needs more time, detail, or add-ons usually costs more."],
    ["Can I change my choice?", "Yes. The quote can be adjusted when the details show another service fits better."],
    ["Do both options include supplies?", "Standard supplies are included for Shynli home cleaning work."],
    ["What should I do next?", "Check your ZIP and choose the service closest to your situation."],
  ],
  links: [["Regular cleaning", "/services/regular-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Move-out cleaning", "/services/move-out-cleaning"], ["Get a quote", "/quote"]],
}))

export const featuredLocalGuideSeoPages: GenericSeoPageData[] = [
  {
    path: "/service-areas/naperville/cleaning-guide",
    title: "Naperville Cleaning Guide | Shynli Cleaning",
    meta: "A Naperville cleaning guide for regular, deep, move-out, apartment, and recurring cleaning, including what changes price and local booking tips.",
    eyebrow: "Local guide",
    h1: "Naperville cleaning guide for homes, apartments, and move days.",
    intro: "Naperville homes often need cleaning around family schedules, move timing, and busy kitchens and bathrooms. This guide helps you choose the right Shynli service before requesting a quote.",
    sections: [
      { title: "Best services to compare", copy: "Start with the clean that matches the reason you are booking.", bullets: ["Regular cleaning for upkeep", "Deep cleaning for detail", "Move-out cleaning for handoffs", "Apartment cleaning for access-sensitive units"] },
      { title: "What changes the Naperville quote", copy: "Your quote depends on the home and route, not just the city name.", bullets: ["ZIP and appointment window", "Bedrooms and bathrooms", "Pets and parking", "Appliance or cabinet add-ons"] },
      { title: "How to prepare", copy: "Clear notes make the visit smoother.", bullets: ["Share access instructions", "Mention priority rooms", "Tell us about pets", "Request add-ons before booking"] },
    ],
    faqs: getCityFaqs("Naperville").slice(0, 4) as [string, string][],
    links: [["Naperville deep cleaning", "/service-areas/naperville/deep-cleaning"], ["Naperville move-out cleaning", "/service-areas/naperville/move-out-cleaning"], ["Naperville house cleaning", "/service-areas/naperville/house-cleaning"], ["Naperville quote", "/quote"]],
  },
  {
    path: "/service-areas/aurora/moving-cleaning-guide",
    title: "Aurora Moving Cleaning Guide | Shynli Cleaning",
    meta: "Plan move-in and move-out cleaning in Aurora, IL with Shynli, including empty-home checklist items, price details, and booking tips.",
    eyebrow: "Local guide",
    h1: "Aurora moving cleaning guide for move-in and move-out timing.",
    intro: "Moving cleaning in Aurora is easiest when empty-room access, lease expectations, appliances, cabinets, and lock-up notes are clear before the cleaner arrives.",
    sections: [
      { title: "What to request", copy: "Move cleaning is about handoff detail, not just a quick wipe-down.", bullets: ["Empty floors and surfaces", "Kitchen and bathrooms", "Cabinets and closets", "Fridge and oven add-ons"] },
      { title: "What changes timing", copy: "Move-day cleaning can be tight, so the quote should reflect the real condition.", bullets: ["How empty the home is", "Lease or listing deadline", "Parking and access", "Trash and appliance condition"] },
      { title: "How to book", copy: "Start with the ZIP and tell us which side of the move you are on.", bullets: ["Move-in", "Move-out", "Rental turnover", "Seller walkthrough"] },
    ],
    faqs: getCityFaqs("Aurora").slice(0, 4) as [string, string][],
    links: [["Aurora move-in cleaning", "/service-areas/aurora/move-in-cleaning"], ["Aurora move-out cleaning", "/service-areas/aurora/move-out-cleaning"], ["Move-out checklist", "/checklists/move-out-cleaning-checklist"], ["Aurora quote", "/quote"]],
  },
  {
    path: "/service-areas/plainfield/deep-cleaning-guide",
    title: "Plainfield Deep Cleaning Guide | Shynli Cleaning",
    meta: "A Plainfield deep cleaning guide for buildup, bathrooms, kitchens, baseboards, add-ons, pricing factors, and quote preparation.",
    eyebrow: "Local guide",
    h1: "Plainfield deep cleaning guide for catch-up detail.",
    intro: "Deep cleaning in Plainfield is best when the home needs more than a maintenance visit: buildup, edges, bathrooms, kitchens, and details that need extra time.",
    sections: [
      { title: "What deep cleaning can cover", copy: "The checklist focuses on detail and buildup.", bullets: ["Bathroom buildup", "Kitchen detail", "Baseboards and doors", "High-touch surfaces"] },
      { title: "What can be added", copy: "Some items need extra time and should be priced before the visit.", bullets: ["Inside oven", "Inside fridge", "Cabinets", "Interior windows or blinds"] },
      { title: "How to prepare", copy: "Help the cleaner spend time on cleaning, not guessing.", bullets: ["Share priority rooms", "Mention pets", "Confirm access", "Ask about add-ons"] },
    ],
    faqs: getCityFaqs("Plainfield").slice(0, 4) as [string, string][],
    links: [["Plainfield deep cleaning", "/service-areas/plainfield/deep-cleaning"], ["Deep cleaning checklist", "/checklists/deep-cleaning-checklist"], ["Deep cleaning cost", "/pricing/deep-cleaning-cost"], ["Plainfield quote", "/quote"]],
  },
]

export const additionalLocalGuideSeoPages: GenericSeoPageData[] = cityPages.filter((city) => city.slug !== "naperville").map((city) => {
  const profile = cityServiceProfiles[city.slug]
  const hero = cityHeroImages[city.slug]
  const nearby = city.nearby.slice(0, 3).join(", ")

  return {
    path: `/service-areas/${city.slug}/cleaning-guide`,
    title: `${city.name} Cleaning Guide | Shynli Cleaning`,
    meta: `A ${city.name}, IL cleaning guide for regular, deep, move-in, move-out, apartment, recurring, and weekly cleaning with quote and booking tips.`,
    eyebrow: "Local guide",
    h1: `${city.name} cleaning guide for homes, apartments, and move days.`,
    intro: `${city.name} cleaning works best when the service matches the reason for the visit. Use this guide to compare regular upkeep, deep detail, move timing, apartment access, and recurring cleaning before requesting a quote.`,
    sections: [
      {
        title: `How ${city.name} homes usually differ`,
        copy: profile?.homeMix ?? `Homes in ${city.name} can range from apartments and townhomes to larger family houses, so the visit should be matched to the layout and current condition.`,
        bullets: ["Apartments, condos, and townhomes", "Single-family houses", "Move-in and move-out timing", "Recurring cleaning routines"],
      },
      {
        title: "Services to compare first",
        copy: "Start with the job you need today, then add details that change timing or price.",
        bullets: ["Regular cleaning for maintenance", "Deep cleaning for buildup and detail", "Move-out cleaning for empty-home handoffs", "Apartment cleaning for building access and compact spaces"],
      },
      {
        title: "What changes the quote",
        copy: profile?.timingNote ?? "The quote is shaped by the route, the home, and how much time the clean needs.",
        bullets: ["ZIP and appointment window", "Bedrooms and bathrooms", "Pets, parking, stairs, or elevator access", "Fridge, oven, cabinet, blind, or interior window add-ons"],
      },
      {
        title: `Local route notes near ${city.name}`,
        copy: `${hero?.label ?? `${city.name} neighborhoods`} gives the page a local starting point, but nearby routes like ${nearby} still need ZIP confirmation. A home can be close on the map and still need a different appointment window.`,
        bullets: ["Confirm the exact ZIP", "Share parking and entry notes", "Mention priority rooms", "Request add-ons before booking"],
      },
    ],
    faqs: getCityFaqs(city.name).slice(0, 5) as [string, string][],
    links: [
      [`${city.name} regular cleaning`, `/service-areas/${city.slug}/regular-cleaning`],
      [`${city.name} deep cleaning`, `/service-areas/${city.slug}/deep-cleaning`],
      [`${city.name} move-out cleaning`, `/service-areas/${city.slug}/move-out-cleaning`],
      [`${city.name} quote`, "/quote"],
    ],
  }
})

export const secondWaveSupportSeoPages: GenericSeoPageData[] = [
  {
    path: "/faq/how-often-should-i-schedule-cleaning",
    title: "How Often Should I Schedule Cleaning? | Shynli Cleaning",
    meta: "Decide whether weekly, biweekly, monthly, one-time, or deep cleaning makes sense for your home based on use, pets, family schedule, and budget.",
    eyebrow: "Cleaning frequency",
    h1: "How often should you schedule house cleaning?",
    intro: "The right cleaning rhythm depends on how the home is used. A busy family home, a pet-heavy apartment, a quiet condo, and a move-ready rental all need different timing.",
    sections: [
      { title: "Weekly cleaning", copy: "Weekly cleaning fits homes where kitchens, bathrooms, floors, and shared spaces get heavy use.", bullets: ["Busy family routines", "Pets and active floors", "Frequent cooking", "Less weekend catch-up"] },
      { title: "Biweekly or monthly cleaning", copy: "Biweekly and monthly service can work when the home stays mostly under control between visits.", bullets: ["Moderate upkeep", "Smaller households", "Predictable routines", "Budget-conscious maintenance"] },
      { title: "One-time or deep cleaning", copy: "One-time and deep cleaning are better when you need a reset before guests, after a busy season, or before recurring service begins.", bullets: ["Buildup and edges", "Before guests", "Move timing", "Seasonal reset"] },
    ],
    faqs: [
      ["Is weekly cleaning worth it?", "It can be worth it when the home gets heavy daily use and you want less catch-up work."],
      ["Is monthly cleaning enough?", "Monthly cleaning can work for lighter-use homes, but it may not prevent buildup in kitchens and bathrooms."],
      ["Should I start with deep cleaning?", "If the home is behind, a deep clean can make recurring visits easier."],
      ["Can Shynli help me choose?", "Yes. Start with your ZIP, home details, and current condition."],
    ],
    links: [["Weekly cleaning", "/services/weekly-cleaning"], ["Recurring cleaning", "/services/recurring-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Pricing", "/pricing"]],
  },
  {
    path: "/faq/what-affects-house-cleaning-price",
    title: "What Affects House Cleaning Price? | Shynli Cleaning",
    meta: "Learn what changes a Shynli cleaning quote, including bedrooms, bathrooms, condition, pets, access, add-ons, timing, and service type.",
    eyebrow: "Pricing FAQ",
    h1: "What affects the price of house cleaning?",
    intro: "A cleaning quote should match the real home, not just the name of the service. Bedrooms and bathrooms matter, but condition, access, pets, and add-ons can matter just as much.",
    sections: [
      { title: "The basics", copy: "Home size gives the quote a starting point.", bullets: ["Bedrooms", "Bathrooms", "Floors and stairs", "Apartment, condo, townhouse, or house"] },
      { title: "The condition", copy: "A maintained home and a catch-up clean are not the same visit.", bullets: ["Kitchen buildup", "Bathroom detail", "Pet hair", "Move-out or empty rooms"] },
      { title: "The extras", copy: "Some items need extra time and should be requested before the cleaner arrives.", bullets: ["Inside fridge", "Inside oven", "Cabinets", "Interior windows or blinds"] },
    ],
    faqs: [
      ["Do add-ons change the price?", "Yes. Add-ons need time and should be quoted before the appointment."],
      ["Can pets change the quote?", "Pets can change timing when floors, hair, odor, or access notes need extra care."],
      ["Does move-out cleaning cost more?", "It can, especially when cabinets, appliances, or empty-room details are included."],
      ["Can I get a quote before booking?", "Yes. Use the quote path to share the details first."],
    ],
    links: [["Pricing", "/pricing"], ["House cleaning cost", "/pricing/house-cleaning-cost"], ["Deep cleaning cost", "/pricing/deep-cleaning-cost"], ["Get a quote", "/quote"]],
  },
  {
    path: "/pricing/recurring-cleaning-cost",
    title: "Recurring Cleaning Cost | Shynli Cleaning",
    meta: "See what affects recurring cleaning cost for weekly, biweekly, and monthly Shynli visits, including home size, condition, pets, and add-ons.",
    eyebrow: "Recurring pricing",
    h1: "Recurring cleaning cost: weekly, biweekly, and monthly.",
    intro: "Recurring cleaning is priced around the rhythm of the home. A weekly visit usually keeps the house easier to maintain, while biweekly or monthly visits may need more catch-up work each time.",
    sections: [
      { title: "Published starting points", copy: "The live Shynli pricing page gives recurring starting points before final home details are confirmed.", bullets: ["Weekly Cleaning starts at $135 per visit", "Bi-Weekly Cleaning starts at $145 per visit", "Monthly Cleaning starts at $155 per visit", "Final price depends on the home"] },
      { title: "What changes the visit", copy: "Recurring price depends on how much the home changes between appointments.", bullets: ["Bedrooms and bathrooms", "Pets and floors", "Kitchen and bathroom traffic", "How often the visit repeats"] },
      { title: "When to choose recurring", copy: "Recurring is best when you want the home to stay ahead of the week.", bullets: ["Less catch-up cleaning", "Cleaner rhythm", "Priority rooms remembered", "Fewer surprises before guests"] },
    ],
    faqs: [
      ["Is weekly cleaning cheaper per visit?", "Weekly starts at a lower published point because the home usually stays easier to maintain."],
      ["Can I switch cadence later?", "Yes. The cleaning rhythm can be adjusted when your home or schedule changes."],
      ["Are supplies included?", "Yes. Standard supplies are included for normal home cleaning work."],
      ["Do add-ons repeat every visit?", "Only if you request and confirm them as part of the plan."],
    ],
    links: [["Recurring cleaning", "/services/recurring-cleaning"], ["Weekly cleaning", "/services/weekly-cleaning"], ["Pricing", "/pricing"], ["Get a quote", "/quote"]],
  },
  {
    path: "/checklists/move-in-move-out-cleaning-checklist",
    title: "Move-In / Move-Out Cleaning Checklist | Shynli Cleaning",
    meta: "Compare move-in and move-out cleaning checklist items for empty rooms, kitchens, bathrooms, floors, cabinets, appliances, access, and handoff details.",
    eyebrow: "Move checklist",
    h1: "Move-in / move-out cleaning checklist.",
    intro: "Move cleaning is about the handoff. The home may be empty, partially empty, waiting for furniture, preparing for a walkthrough, or getting ready for keys.",
    sections: [
      { title: "Rooms and floors", copy: "Empty rooms make some work easier, but they also reveal details that were hidden before.", bullets: ["Floors and base areas", "Shelves and reachable surfaces", "Closets when empty", "Trash gathered when manageable"] },
      { title: "Kitchen and bathrooms", copy: "These rooms usually carry the walkthrough impression.", bullets: ["Counters and sinks", "Toilets, tubs, and showers", "Appliance fronts", "Cabinet and appliance interiors when quoted"] },
      { title: "Before the handoff", copy: "Move timing needs clear access and lock-up notes.", bullets: ["Entry instructions", "Parking and elevator notes", "Final priority rooms", "Lock-up or key handoff details"] },
    ],
    faqs: [
      ["Are cabinets included?", "Cabinet interiors should be requested before booking so time is planned."],
      ["Are fridge and oven included?", "Inside fridge and oven are add-ons unless they are specifically included in the quote."],
      ["Can you clean before furniture arrives?", "Yes. Move-in cleaning often works best before furniture blocks the rooms."],
      ["Can you clean after everything is moved out?", "Yes. Move-out cleaning is built around empty-home handoffs."],
    ],
    links: [["Move-in cleaning", "/services/move-in-cleaning"], ["Move-out cleaning", "/services/move-out-cleaning"], ["Move cleaning cost", "/pricing/move-out-cleaning-cost"], ["Get a quote", "/quote"]],
  },
]

export const localGuideSeoPages: GenericSeoPageData[] = [
  ...featuredLocalGuideSeoPages,
  ...additionalLocalGuideSeoPages,
]

export const genericSeoPages = [
  ...hubSeoPages,
  ...priceSeoPages,
  ...checklistSeoPages,
  ...situationSeoPages,
  ...faqSeoPages,
  ...trustSeoPages,
  ...comparisonSeoPages,
  ...localGuideSeoPages,
  ...secondWaveSupportSeoPages,
]

export type LinkGroup = {
  title: string
  links: [string, string][]
}

export function pageLinkLabel(page: GenericSeoPageData) {
  return page.title.split(" | ")[0].replace(" FAQ", "")
}

export function pageLinks(pages: GenericSeoPageData[]): [string, string][] {
  return pages.map((page) => [pageLinkLabel(page), page.path])
}

export function getRelatedLinkGroups(page: GenericSeoPageData): LinkGroup[] {
  const groups: LinkGroup[] = [
    {
      title: "Main paths",
      links: [
        ["Services", "/services"],
        ["Service areas", "/service-areas"],
        ["Pricing", "/pricing"],
        ["Checklists", "/checklists"],
        ["FAQ", "/faq"],
        ["Get a quote", "/quote"],
      ],
    },
  ]

  if (page.path === "/pricing" || page.path.startsWith("/pricing/")) {
    groups.push({ title: "Pricing guides", links: pageLinks([...priceSeoPages, ...secondWaveSupportSeoPages.filter((item) => item.path.startsWith("/pricing/"))]) })
  }

  if (page.path === "/checklists" || page.path.startsWith("/checklists/")) {
    groups.push({ title: "Cleaning checklists", links: pageLinks([...checklistSeoPages, ...secondWaveSupportSeoPages.filter((item) => item.path.startsWith("/checklists/"))]) })
  }

  if (page.path === "/faq" || page.path.startsWith("/faq/")) {
    groups.push({ title: "FAQ answers", links: pageLinks([...faqSeoPages, ...secondWaveSupportSeoPages.filter((item) => item.path.startsWith("/faq/"))]) })
  }

  if (["/about", "/reviews", "/why-shynli"].includes(page.path) || trustSeoPages.some((item) => item.path === page.path)) {
    groups.push({ title: "Trust and process", links: pageLinks(trustSeoPages) })
  }

  if (comparisonSeoPages.some((item) => item.path === page.path)) {
    groups.push({ title: "Service comparisons", links: pageLinks(comparisonSeoPages) })
  }

  if (situationSeoPages.some((item) => item.path === page.path)) {
    groups.push({ title: "Cleaning situations", links: pageLinks(situationSeoPages) })
  }

  if (localGuideSeoPages.some((item) => item.path === page.path)) {
    groups.push({ title: "Local cleaning guides", links: pageLinks(localGuideSeoPages) })
  }

  return groups
}

export function getLocalServicePrompt(service: (typeof seoServices)[number], profile: { timingNote: string }) {
  if (service.slug.includes("move-out")) {
    return `${profile.timingNote} For move-out work, mention whether the home is empty, whether appliances or cabinets need inside detail, and when the walkthrough or key handoff happens.`
  }
  if (service.slug.includes("move-in")) {
    return `${profile.timingNote} For move-in work, note whether the clean happens before furniture arrives and which cabinets, closets, bathrooms, or appliance areas should feel ready first.`
  }
  if (service.slug.includes("deep") || service.slug.includes("post-construction")) {
    return `${profile.timingNote} For detail-heavy work, call out buildup, dust, neglected bathrooms, kitchen grease, baseboards, and any surfaces that need extra care.`
  }
  if (service.slug.includes("recurring") || service.slug.includes("weekly")) {
    return `${profile.timingNote} For recurring work, tell us which rooms fall behind fastest so the visit can protect the rhythm of the home.`
  }
  if (service.slug.includes("apartment")) {
    return `${profile.timingNote} For apartment work, building access, elevator or stair notes, parking, and compact high-use rooms matter as much as square footage.`
  }
  return `${profile.timingNote} Mention the rooms that matter most, the current condition, pets, access notes, and any add-ons before the visit is priced.`
}

export const processSteps = [
  {
    number: "01",
    title: "Check your ZIP",
    copy: "Tell us where the home is and what kind of clean you need. We will show the next times that make sense.",
    image: "/process-quote.jpg",
    imagePosition: "50% 58%",
  },
  {
    number: "02",
    title: "Share access",
    copy: "Tell us about parking, pets, entry notes, and the rooms that need extra care.",
    image: "/process-access.jpg",
    imagePosition: "50% 48%",
  },
  {
    number: "03",
    title: "We clean",
    copy: "The team arrives prepared, follows the checklist you chose, and resets the home.",
    image: "/process-clean.jpg",
    imagePosition: "50% 52%",
  },
  {
    number: "04",
    title: "Quick follow-up",
    copy: "If something important was missed, you have a clear path to make it right.",
    image: "/process-follow.jpg",
    imagePosition: "50% 48%",
  },
  {
    number: "05",
    title: "Keep it easy",
    copy: "Book recurring service when you want the house to stay ahead of the week.",
    image: "/process-repeat.jpg",
    imagePosition: "48% 50%",
  },
]

export const footerColumns = [
  {
    title: "Services",
    links: [
      ["Regular cleaning", "/services/regular-cleaning"],
      ["Deep cleaning", "/services/deep-cleaning"],
      ["Move-out cleaning", "/services/move-out-cleaning"],
      ["Post-construction", "/services/post-construction-cleaning"],
      ["Recurring cleaning", "/services/recurring-cleaning"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Service areas", "/service-areas"],
      ["Why Shynli", "/why-shynli"],
      ["Reviews", "/reviews"],
      ["About", "/about"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Get quote", "https://shynlicleaningservice.com/quote"],
      ["Quote process", "/quote#start"],
      ["Pricing", "/pricing"],
      ["Checklists", "/checklists"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms of Service", "/terms"],
      ["Privacy Policy", "/privacy"],
      ["Cancellation Policy", "/cancellation"],
    ],
  },
]

export type ChecklistValue = boolean | "optional" | "na"
export type ChecklistRow = {
  task: string
  standard: ChecklistValue
  deep: ChecklistValue
  move: ChecklistValue
}

export const checklistColumns = [
  { key: "standard", label: "Std" },
  { key: "deep", label: "Deep" },
  { key: "move", label: "Move" },
] as const

export const checklistSections = [
  {
    value: "bathroom",
    title: "Bathroom",
    rows: [
      { task: "Tub, shower, toilet, and sink cleaned with disinfectant", standard: true, deep: true, move: true },
      { task: "Heavy soap scum and buildup detail", standard: false, deep: true, move: true },
      { task: "Mirrors, fixtures, and high-touch areas polished", standard: true, deep: true, move: true },
      { task: "Tile edges, baseboards, and bathroom cabinet fronts wiped", standard: false, deep: true, move: true },
    ],
  },
  {
    value: "kitchen",
    title: "Kitchen",
    rows: [
      { task: "Counters, sink, stovetop, and visible appliance fronts", standard: true, deep: true, move: true },
      { task: "Microwave interior cleaned when accessible", standard: true, deep: true, move: true },
      { task: "Cabinet fronts and backsplash detail", standard: false, deep: true, move: true },
      { task: "Empty cabinets and drawers wiped inside", standard: false, deep: "optional", move: true },
      { task: "Inside fridge or oven cleaned when requested", standard: "optional", deep: "optional", move: "optional" },
    ],
  },
  {
    value: "living",
    title: "Bedroom | Living Room | Office",
    rows: [
      { task: "Dust reachable surfaces, lamps, shelves, and decor", standard: true, deep: true, move: true },
      { task: "Vacuum carpets and mop hard floors", standard: true, deep: true, move: true },
      { task: "Baseboards, doors, and trim detail", standard: false, deep: true, move: true },
      { task: "Empty closets and shelving wiped", standard: false, deep: "optional", move: true },
      { task: "Beds made with fresh linens provided by the home", standard: true, deep: true, move: "na" },
    ],
  },
  {
    value: "before-leave",
    title: "Before We Leave",
    rows: [
      { task: "Trash gathered and replaced with available liners", standard: true, deep: true, move: true },
      { task: "Rooms checked against the clean you chose", standard: true, deep: true, move: true },
      { task: "Access, lock-up, and entry notes followed", standard: true, deep: true, move: true },
      { task: "Missed-item follow-up path kept clear", standard: true, deep: true, move: true },
      { task: "Extra-time needs explained before the price changes", standard: true, deep: true, move: true },
    ],
  },
  {
    value: "addons",
    title: "Quoted Add-Ons",
    rows: [
      { task: "Inside refrigerator", standard: "optional", deep: "optional", move: "optional" },
      { task: "Inside oven", standard: "optional", deep: "optional", move: "optional" },
      { task: "Interior windows", standard: "optional", deep: "optional", move: "optional" },
      { task: "Blinds, walls, or heavy trash removal", standard: "optional", deep: "optional", move: "optional" },
    ],
  },
] satisfies { value: string; title: string; rows: ChecklistRow[] }[]
