import { type Dispatch, type FormEvent, type SetStateAction, useEffect, useState } from "react"
import { ArrowRight, Check, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  airbnbOperationalTabs,
  airbnbReferenceCards,
  airbnbTurnoverMoments,
  cityList,
  cityPages,
  deepCleaningBoundaries,
  deepCleaningMoments,
  deepCleaningReferences,
  footerColumns,
  businessEmail,
  businessPhoneDisplay,
  businessPhoneHref,
  businessPhoneSchema,
  getCityFaqs,
  legalBusinessName,
  preferredArrivalWindow,
  publicBusinessName,
  seoServices,
  type ChecklistValue,
  type GenericSeoPageData,
} from "@/site/data"

export type RoomControl = {
  label: string
  singular: string
  short: string
  shortSingular: string
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

export const QUOTE_BASE_URL = "https://shynlicleaningservice.com/quote"

type QuoteParams = {
  zip?: string
  city?: string
  service?: string
  bedrooms?: string | number
  bathrooms?: string | number
  landingPageUrl?: string
  sourcePage?: string
  addOns?: string
  notes?: string
}

export function buildQuoteUrl(params: QuoteParams = {}) {
  const url = new URL(QUOTE_BASE_URL)
  const sourcePage = params.sourcePage || (typeof window !== "undefined" ? window.location.pathname : "")
  const landingPageUrl = params.landingPageUrl || (typeof window !== "undefined" ? window.location.href : "")
  const entries: Record<string, string | number | undefined> = {
    zip: params.zip,
    city: params.city,
    service: params.service,
    bedrooms: params.bedrooms,
    bathrooms: params.bathrooms,
    landing_page_url: landingPageUrl,
    source_page: sourcePage,
    add_ons: params.addOns,
    notes: params.notes,
  }

  Object.entries(entries).forEach(([key, value]) => {
    if (value !== undefined && String(value).trim()) {
      url.searchParams.set(key, String(value).trim())
    }
  })

  return url.toString()
}

export function resolveSiteHref(href: string, quoteParams: QuoteParams = {}) {
  if (href === "/quote") {
    return buildQuoteUrl({ service: "home-cleaning", ...quoteParams })
  }

  return href.startsWith("#") ? `/${href}` : href
}

export function submitQuoteRequest(event: FormEvent, params: QuoteParams = {}) {
  event.preventDefault()
  window.location.href = buildQuoteUrl(params)
}

export function submitQuoteForm(event: FormEvent<HTMLFormElement>, defaults: QuoteParams = {}) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const addOns = formData.getAll("add_ons").map(String).filter(Boolean).join(", ")
  const notes = [
    formData.get("notes"),
    formData.get("property_type"),
    formData.get("access_note"),
    formData.get("condition"),
    formData.get("date"),
    formData.get("checkout_time"),
    formData.get("checkin_time"),
  ]
    .map((value) => String(value ?? "").trim())
    .filter(Boolean)
    .join(" | ")

  window.location.href = buildQuoteUrl({
    ...defaults,
    zip: String(formData.get("zip") ?? defaults.zip ?? ""),
    city: String(formData.get("city") ?? defaults.city ?? ""),
    service: String(formData.get("service") ?? defaults.service ?? ""),
    bedrooms: String(formData.get("bedrooms") ?? defaults.bedrooms ?? ""),
    bathrooms: String(formData.get("bathrooms") ?? defaults.bathrooms ?? ""),
    addOns: addOns || defaults.addOns,
    notes: notes || defaults.notes,
  })
}

export function ChecklistCell({ value }: { value: ChecklistValue }) {
  if (value === "optional") {
    return <span className="grid place-items-center text-base font-black text-[#1976a3]" aria-label="Optional extra">+</span>
  }

  if (value === "na") {
    return <span className="grid place-items-center text-base font-black text-muted-foreground" aria-label="Not needed">—</span>
  }

  return (
    <span className={`grid place-items-center text-lg font-black ${value ? "text-[#1f9ed6]" : "text-rose-500"}`} aria-label={value ? "Included" : "Not included"}>
      {value ? "✓" : "×"}
    </span>
  )
}

export function DeepCleaningLandingBlock({ city }: { city?: (typeof cityPages)[number] }) {
  const place = city ? `${city.name} deep cleaning` : "deep cleaning"

  return (
    <>
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Deep cleaning clarity</p>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.98] md:text-6xl">
              A real reset, not just a bigger standard clean.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Deep cleaning should be easy to understand before you book: a fast quote, a visible checklist, clear add-ons, and trust next to the action.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cde5f2] sm:grid-cols-3">
            {[
              ["01", "Quote first", "ZIP, beds, baths, condition, and add-ons before booking."],
              ["02", "Checklist proof", "Show the extra detail that makes this a deep clean."],
              ["03", "Clear boundary", "Separate included, add-on, and not-included work."],
            ].map(([number, title, copy]) => (
              <div key={number} className="bg-[#f7fbfd] p-5">
                <span className="text-sm font-black text-[#1f9ed6]">{number}</span>
                <h3 className="mt-3 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef8fc] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.74fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">What visitors need to see</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
                The details that justify a deep-clean price.
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Deep cleaning should visually prove extra time: buildup, edges, bathrooms, kitchen detail, and the kind of reset people can feel when they walk back in.
            </p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {deepCleaningMoments.map((moment) => (
              <Card key={moment.title} className="overflow-hidden rounded-lg border-[#cde5f2] bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6 grid size-12 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3]">
                    <Sparkles className="size-6" />
                  </div>
                  <h3 className="text-2xl font-black leading-tight">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{moment.copy}</p>
                  <div className="mt-5 grid gap-2">
                    {moment.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm font-black">
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

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Scope clarity</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
              Make the promise easy to trust.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Trust comes from saying exactly what is included, what can be added, and what needs a different kind of help.
            </p>
          </div>
          <Tabs defaultValue="included">
            <TabsList className="grid h-auto w-full grid-cols-3 rounded-lg bg-[#eaf3f8] p-1">
              {deepCleaningBoundaries.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="min-h-11 rounded-md px-2 py-3 text-xs font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#145f85] sm:text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {deepCleaningBoundaries.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-4">
                <Card className="rounded-lg border-[#cde5f2] shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-3xl font-black leading-tight">{tab.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">{tab.copy}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {tab.items.map((item) => (
                        <div key={item} className="flex min-h-14 items-start gap-3 rounded-md border border-[#d8e8f0] bg-[#f7fbfd] p-3 text-sm font-black">
                          <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="bg-[#0d2633] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">What makes the page trustworthy</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
              The signals people look for before they book.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/68">
              Visitors should quickly understand the price signals, the checklist, the boundaries, and how Shynli will follow up if something important needs attention.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-white/12 md:grid-cols-2">
            {deepCleaningReferences.map(([name, lesson]) => (
              <div key={name} className="bg-white/6 p-5">
                <h3 className="text-xl font-black text-[#9fe3ff]">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Before you book</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
              Make sure the {place} visit has the right plan.
            </h2>
          </div>
          <Card className="rounded-lg border-[#cde5f2] bg-[#f7fbfd] shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-black">Before promotion, confirm:</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Deep-clean checklist", "Included work and add-ons", "Price details", "Service-area coverage", "Home access notes", "Make-it-right promise"].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm font-black">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

export function AirbnbCleaningLandingBlock({ city }: { city?: (typeof cityPages)[number] }) {
  const place = city ? `${city.name} Airbnb cleaning` : "Airbnb cleaning"

  return (
    <>
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Turnover cleaning for hosts</p>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.98] md:text-6xl">
              A turnover page for hosts, not a normal house-cleaning page.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              A turnover clean has to protect the next arrival window: timing, guest readiness, checklist proof, restock notes, and a clear handoff before check-in.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cde5f2] sm:grid-cols-3">
            {[
              ["01", "Host intake", "Listing, city, beds, baths, checkout, check-in, access, and recurring need."],
              ["02", "Turnover scope", "Cleaning, linens, trash, restock, staging, and issue notes."],
              ["03", "Ready handoff", "Confirm what was done before the next guest arrives."],
            ].map(([number, title, copy]) => (
              <div key={number} className="bg-[#f7fbfd] p-5">
                <span className="text-sm font-black text-[#1f9ed6]">{number}</span>
                <h3 className="mt-3 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef8fc] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[0.74fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Host problems</p>
              <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
                What Airbnb hosts need to trust before they hand over a unit.
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Hosts need to know the business risk is understood: a late turnover, missed supply, or messy bathroom can become a bad review.
            </p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {airbnbTurnoverMoments.map((moment) => (
              <Card key={moment.title} className="overflow-hidden rounded-lg border-[#cde5f2] bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6 grid size-12 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3]">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="text-2xl font-black leading-tight">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{moment.copy}</p>
                  <div className="mt-5 grid gap-2">
                    {moment.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm font-black">
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

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Turnover scope</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
              Design the service now. Keep the public promise honest.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The page should separate what can be handled in the visit from what needs to be confirmed before the cleaner arrives.
            </p>
          </div>
          <Tabs defaultValue="included">
            <TabsList className="grid h-auto w-full grid-cols-3 rounded-lg bg-[#eaf3f8] p-1">
              {airbnbOperationalTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="min-h-11 rounded-md px-2 py-3 text-xs font-black text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#145f85] sm:text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {airbnbOperationalTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-4">
                <Card className="rounded-lg border-[#cde5f2] shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-3xl font-black leading-tight">{tab.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">{tab.copy}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {tab.items.map((item) => (
                        <div key={item} className="flex min-h-14 items-start gap-3 rounded-md border border-[#d8e8f0] bg-[#f7fbfd] p-3 text-sm font-black">
                          <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="bg-[#0d2633] px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#9fe3ff]">What hosts care about</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
              Keep the unit ready without turning the booking into a guessing game.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/68">
              Hosts want fewer missed turnovers, clearer proof, and a property that feels ready when guests arrive.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-white/12 md:grid-cols-2">
            {airbnbReferenceCards.map(([name, lesson]) => (
              <div key={name} className="bg-white/6 p-5">
                <h3 className="text-xl font-black text-[#9fe3ff]">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#1976a3]">Before the first turnover</p>
            <h2 className="text-4xl font-black leading-[0.98] md:text-6xl">
              Confirm the details that make the {place} visit reliable.
            </h2>
          </div>
          <Card className="rounded-lg border-[#cde5f2] bg-[#f7fbfd] shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-black">Before booking, confirm:</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Turnover checklist", "Laundry plan", "Restock rules", "Access method", "Photo report", "Host contact details"].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm font-black">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1f9ed6]" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

export function EstimateCard({
  selectedService,
  setSelectedService,
  roomControls,
  cityName,
  className = "",
}: {
  selectedService: string
  setSelectedService: Dispatch<SetStateAction<string>>
  roomControls: RoomControl[]
  cityName?: string
  className?: string
}) {
  const [zip, setZip] = useState("")
  const bedrooms = roomControls.find((control) => control.label === "bedrooms")?.value
  const bathrooms = roomControls.find((control) => control.label === "bathrooms")?.value

  return (
    <Card id={cityName ? "city-quote" : "quote"} className={`rounded-lg border-0 bg-white/96 text-foreground shadow-[0_32px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl ${className}`}>
      <CardContent className="p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-black uppercase text-[#1976a3]">Quick quote check</p>
            <h2 className="mt-1 text-2xl font-black leading-tight">
              {cityName ? `Check cleaning times in ${cityName}` : "Check cleaning times near you"}
            </h2>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eaf7ff] text-[#1976a3]">
            <Sparkles className="size-5" />
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["Standard", "Deep", "Move"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedService(item)}
              aria-pressed={selectedService === item}
              className={`min-h-11 rounded-md border px-2 text-sm font-black transition-all ${
                selectedService === item
                  ? "border-[#1976a3] bg-[#1976a3] text-white"
                  : "border-border bg-white text-foreground hover:border-[#1976a3]/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {roomControls.map(({ label, singular, short, shortSingular, value, setValue }) => (
            <div key={label} className="grid min-h-12 grid-cols-[40px_1fr_40px] overflow-hidden rounded-md border border-border bg-[#f5fbff]">
              <button
                type="button"
                className="grid min-h-12 place-items-center border-r border-border text-lg font-black text-[#1976a3] transition-colors hover:bg-[#eaf7ff]"
                onClick={() => setValue((current) => Math.max(1, current - 1))}
                aria-label={`Decrease ${label}`}
              >
                -
              </button>
              <div className="flex min-h-12 items-center justify-center px-2 text-sm font-black">
                <span className="hidden sm:inline">
                  {value} {value === 1 ? singular : label}
                </span>
                <span className="sm:hidden">
                  {value} {value === 1 ? shortSingular : short}
                </span>
              </div>
              <button
                type="button"
                className="grid min-h-12 place-items-center border-l border-border text-lg font-black text-[#1976a3] transition-colors hover:bg-[#eaf7ff]"
                onClick={() => setValue((current) => Math.min(8, current + 1))}
                aria-label={`Increase ${label}`}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <form
          action={buildQuoteUrl({ zip, city: cityName, service: selectedService, bedrooms, bathrooms })}
          method="get"
          onSubmit={(event) => submitQuoteRequest(event, { zip, city: cityName, service: selectedService, bedrooms, bathrooms })}
        >
          <label htmlFor={cityName ? "city-zip" : "zip"} className="mt-5 block text-sm font-black text-muted-foreground">
            ZIP code
          </label>
          <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
            <Input
              id={cityName ? "city-zip" : "zip"}
              name="zip"
              inputMode="numeric"
              placeholder="60540"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              className="h-[52px] rounded-md bg-white text-base"
            />
            <Button type="submit" className="h-[52px] rounded-md bg-[#1f9ed6] px-5 font-black text-white hover:bg-[#168ac0]">
              {selectedService === "Move" ? "See move times" : "See times"}
              <ArrowRight />
            </Button>
          </div>
        </form>
        <p className="mt-4 hidden text-sm leading-6 text-muted-foreground md:block">
          No card needed. We confirm your area, home details, and earliest available slot before you book.
        </p>
      </CardContent>
    </Card>
  )
}

type SeoMetaOptions = {
  canonicalBaseUrl?: string
  canonicalPath?: string
  robots?: "index,follow" | "noindex,follow"
}

function normalizeSeoDescription(description: string) {
  let value = description.replace(/\s+/g, " ").trim()

  if (value.length < 120) {
    const suffixes = [
      " Check local scope, timing, and quote details before booking.",
      " See what affects scope, timing, and the quote before booking.",
      " Get clear quote details before booking.",
    ]

    for (const suffix of suffixes) {
      if (value.length >= 120) {
        break
      }

      if (value.length + suffix.length <= 170) {
        value += suffix
      }
    }
  }

  if (value.length > 170) {
    return `${value.slice(0, 167).replace(/\s+\S*$/, "")}.`
  }

  return value
}

export function useSeoMeta(title: string, description: string, schema?: object, options: SeoMetaOptions = {}) {
  useEffect(() => {
    document.title = title

    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta")
      descriptionTag.name = "description"
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.content = normalizeSeoDescription(description)

    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement("link")
      canonicalTag.rel = "canonical"
      document.head.appendChild(canonicalTag)
    }
    const canonicalBaseUrl = options.canonicalBaseUrl ?? "https://shynli.com"
    const rawCanonicalPath = options.canonicalPath ?? window.location.pathname
    const canonicalPath = rawCanonicalPath === "/" ? "/" : rawCanonicalPath.replace(/\/+$/, "")
    canonicalTag.href = `${canonicalBaseUrl}${canonicalPath === "/" ? "" : canonicalPath}`

    let robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const defaultRobots = window.location.pathname.startsWith("/shiny-") ? "noindex,follow" : "index,follow"
    const robotsContent = options.robots ?? defaultRobots
    if (!robotsTag) {
      robotsTag = document.createElement("meta")
      robotsTag.name = "robots"
      document.head.appendChild(robotsTag)
    }
    robotsTag.content = robotsContent

    let schemaTag = document.querySelector<HTMLScriptElement>("#page-schema")
    if (schema) {
      if (!schemaTag) {
        schemaTag = document.createElement("script")
        schemaTag.id = "page-schema"
        schemaTag.type = "application/ld+json"
        document.head.appendChild(schemaTag)
      }
      schemaTag.textContent = JSON.stringify(schema)
    } else if (schemaTag) {
      schemaTag.remove()
    }
  }, [title, description, schema, options.canonicalBaseUrl, options.canonicalPath, options.robots])
}

export function BrandLink() {
  return (
    <a href="/" className="group flex min-h-11 items-center gap-3" aria-label="Shynli home">
      <span className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/18 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 56 56" className="size-8" role="img" aria-label="Shynli">
          <defs>
            <linearGradient id="cityDrop" x1="15" y1="8" x2="42" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9fe3ff" />
              <stop offset="1" stopColor="#1f9ed6" />
            </linearGradient>
          </defs>
          <path d="M28 7C22 16 15 24 15 33a13 13 0 0 0 26 0C41 24 34 16 28 7Z" fill="url(#cityDrop)" />
          <path d="M23 34c4 4 10 4 15-1" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".9" />
        </svg>
      </span>
      <span className="text-xl font-black tracking-normal">Shynli</span>
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d2633]/78 px-4 text-white backdrop-blur-xl md:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <BrandLink />
        <nav className="hidden items-center gap-8 text-sm font-bold text-white/72 md:flex" aria-label="Main navigation">
          <a className="transition-colors hover:text-white" href="/services">Services</a>
          <a className="transition-colors hover:text-white" href="/service-areas">Areas</a>
          <a className="transition-colors hover:text-white" href="/pricing">Pricing</a>
          <a className="transition-colors hover:text-white" href="/checklists">Checklists</a>
          <a className="transition-colors hover:text-white" href="/faq">FAQ</a>
        </nav>
        <Button asChild className="h-11 rounded-full bg-white px-6 font-black text-[#0d2633] hover:bg-white/90">
          <a href={buildQuoteUrl({ service: "home-cleaning" })}>Get quote</a>
        </Button>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0d2633] px-4 pb-28 pt-12 text-white md:px-8 md:pb-24">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <BrandLink />
          <p className="mt-5 max-w-md text-2xl font-black leading-tight">A cleaner home, handled by a local team you can reach.</p>
          <a href={businessPhoneHref} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/72 transition-colors hover:text-white">
            <Phone className="size-4 text-[#9fe3ff]" />
            {businessPhoneDisplay}
          </a>
          <div className="mt-2 grid gap-1 text-sm font-bold text-white/58">
            <p>{preferredArrivalWindow}</p>
            <a className="transition-colors hover:text-white" href={`mailto:${businessEmail}`}>{businessEmail}</a>
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
    </footer>
  )
}

export function StickyBookingBar() {
  const [zip, setZip] = useState("")

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/25 bg-[#1f9ed6]/92 px-4 py-2 text-white shadow-[0_-18px_60px_rgba(13,38,51,0.25)] backdrop-blur-xl md:px-8 md:py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <a
          href={businessPhoneHref}
          className="relative hidden size-16 shrink-0 place-items-center rounded-full bg-[#eaf7ff] text-[#1f9ed6] shadow-[0_18px_40px_rgba(13,38,51,0.22)] transition-transform hover:scale-105 sm:grid"
          aria-label="Call Shynli"
        >
          <MessageCircle className="size-8" />
          <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-[#0d2633] text-xs font-black text-white ring-2 ring-[#1f9ed6]">1</span>
        </a>
        <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div className="hidden items-center justify-center gap-4 md:flex">
            <span className="size-2 rounded-full bg-[#c9f0ff]" />
            <p className="text-center text-sm font-black uppercase tracking-[0.34em] text-white/92">Book your home cleaning</p>
          </div>
          <form
            action={buildQuoteUrl({ zip, service: "home-cleaning" })}
            method="get"
            className="grid grid-cols-[1fr_auto] gap-2 md:min-w-[360px]"
            onSubmit={(event) => submitQuoteRequest(event, { zip, service: "home-cleaning" })}
          >
            <label htmlFor="sticky-zip-page" className="sr-only">ZIP code</label>
            <Input id="sticky-zip-page" name="zip" inputMode="numeric" placeholder="ZIP code" value={zip} onChange={(event) => setZip(event.target.value)} className="h-12 rounded-md border-white/35 bg-white/12 text-base font-bold text-white placeholder:text-white/72 focus-visible:ring-white/65" />
            <Button type="submit" className="h-12 rounded-md bg-white px-5 font-black text-[#1976a3] shadow-none hover:bg-white/90 md:px-7">
              Go
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export function getCitySchema(city: { name: string; slug: string; nearby: string[] }) {
  const url = `https://shynli.com/service-areas/${city.slug}`
  const faqs = getCityFaqs(city.name)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://shynli.com/#business",
        name: publicBusinessName,
        legalName: legalBusinessName,
        telephone: businessPhoneSchema,
        areaServed: cityList.map((name) => ({ "@type": "City", name })),
      },
      {
        "@type": "Service",
        name: `House cleaning in ${city.name}, IL`,
        provider: { "@id": "https://shynli.com/#business" },
        areaServed: { "@type": "City", name: city.name },
        serviceType: ["Standard cleaning", "Deep cleaning", "Move-in cleaning", "Move-out cleaning", "Recurring cleaning"],
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://shynli.com/" },
          { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://shynli.com/service-areas" },
          { "@type": "ListItem", position: 3, name: city.name, item: url },
        ],
      },
    ],
  }
}

export function getServiceFaqs(service: (typeof seoServices)[number], city?: (typeof cityPages)[number]) {
  const location = city ? ` in ${city.name}` : ""
  const cityLine = city ? ` Shynli checks your ZIP in ${city.name} before confirming timing.` : " Shynli checks your ZIP before confirming timing."

  return [
    [`What is included in ${service.name}${location}?`, `${service.name} can include ${service.included.slice(0, 4).join(", ").toLowerCase()}, plus any extras you request before booking.`],
    [`How much does ${service.name}${location} cost?`, `${service.priceNote} Bedrooms, bathrooms, home condition, pets, access, and extras all shape the final price.`],
    [`Can I book ${service.name}${location} this week?`, `Often, yes.${cityLine} The best next step is to check your ZIP and share the home details.`],
    ["Do cleaners bring supplies?", "Yes. Standard supplies are included. If your home needs specific products or surfaces handled a certain way, tell us before the visit."],
    [`Is ${service.name} good for apartments, condos, townhouses, and houses?`, "Yes. We adjust the visit around the property type, access notes, stairs, parking, pets, and whether the home is occupied or empty."],
    ["Can I add fridge, oven, cabinet, or interior window cleaning?", "Yes. Those can be priced as extras when you request them, so the cleaner has the right amount of time planned."],
  ]
}

export function getServiceSchema(service: (typeof seoServices)[number], city?: (typeof cityPages)[number]) {
  const url = city ? `https://shynli.com/service-areas/${city.slug}/${service.slug}` : `https://shynli.com/services/${service.slug}`
  const faqs = getServiceFaqs(service, city)
  const pageName = city ? `${service.name} in ${city.name}, IL` : `${service.name} | Shynli Cleaning`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://shynli.com/#business",
        name: publicBusinessName,
        legalName: legalBusinessName,
        telephone: businessPhoneSchema,
        areaServed: cityList.map((name) => ({ "@type": "City", name })),
      },
      {
        "@type": "Service",
        name: pageName,
        provider: { "@id": "https://shynli.com/#business" },
        areaServed: city ? { "@type": "City", name: city.name } : cityList.map((name) => ({ "@type": "City", name })),
        serviceType: service.name,
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: city
          ? [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://shynli.com/" },
              { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://shynli.com/service-areas" },
              { "@type": "ListItem", position: 3, name: city.name, item: `https://shynli.com/service-areas/${city.slug}` },
              { "@type": "ListItem", position: 4, name: service.name, item: url },
            ]
          : [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://shynli.com/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://shynli.com/services" },
              { "@type": "ListItem", position: 3, name: service.name, item: url },
            ],
      },
    ],
  }
}

export function getGenericSeoSchema(page: GenericSeoPageData) {
  const url = `https://shynli.com${page.path}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://shynli.com/#business",
        name: publicBusinessName,
        legalName: legalBusinessName,
        telephone: businessPhoneSchema,
        areaServed: cityList.map((name) => ({ "@type": "City", name })),
      },
      {
        "@type": "WebPage",
        name: page.h1,
        description: page.meta,
        url,
        isPartOf: { "@type": "WebSite", name: publicBusinessName, url: "https://shynli.com/" },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://shynli.com/" },
          { "@type": "ListItem", position: 2, name: page.h1, item: url },
        ],
      },
    ],
  }
}
