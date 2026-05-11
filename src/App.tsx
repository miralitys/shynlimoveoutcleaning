import { cityPages, cityServicePageCities, genericSeoPages, getCityServiceSeoServices, seoServices } from "@/site/data"
import { legalPages } from "@/site/legal-data"
import { LegalPage } from "@/site/legal-pages"
import { CityPage, GenericSeoPage, HomePage, NotFoundPage, ServiceAreasPage, ServicesIndexPage, ServiceSeoPage } from "@/site/pages"
import { ShinyMoveOutCityIntentPage, ShinyMoveOutSeoPage, shinyMoveOutCityIntentPages, shinyMoveOutSeoPages } from "@/site/shiny-move-out-seo"
import { ShinyAirbnbPage, ShinyApartmentPage, ShinyDeepCityIntentPage, ShinyDeepCleaningPage, ShinyDeepSeoPage, ShinyMoveOutLegalPage, ShinyMoveOutPage, shinyDeepCityIntentPages, shinyDeepSeoPages } from "@/site/standalone-pages"

function App() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/"
  const hostname = window.location.hostname.toLowerCase()
  const isDeepCleaningSite = hostname === "shinydeepcleaning.com" || hostname === "www.shinydeepcleaning.com"
  const isMoveOutCleaningSite = hostname === "shynlimoveoutcleaning.com" || hostname === "www.shynlimoveoutcleaning.com"
  const cityMatch = cityPages.find((city) => currentPath === `/service-areas/${city.slug}`)
  const serviceMatch = seoServices.find((service) => currentPath === `/services/${service.slug}`)
  const genericSeoMatch = genericSeoPages.find((page) => currentPath === page.path)
  const legalMatch = legalPages.find((page) => currentPath === page.path)
  const shinyMoveOutLegalMatch = legalPages.find((page) => currentPath === page.path || currentPath === `/shiny-move-out-cleaning${page.path}`)
  const shinyDeepCityMatch = cityPages.find((city) => currentPath === `/shiny-deep-cleaning/${city.slug}`)
  const deepDomainCityMatch = cityPages.find((city) => currentPath === `/${city.slug}`)
  const moveOutDomainCityMatch = cityPages.find((city) => currentPath === `/${city.slug}`)
  const shinyMoveOutCityMatch = cityPages.find((city) => currentPath === `/shiny-move-out-cleaning/${city.slug}`)
  const moveOutDomainSeoMatch = shinyMoveOutSeoPages.find((page) => currentPath === `/${page.slug}`)
  const moveOutDomainCityIntentMatch = shinyMoveOutCityIntentPages.find((page) => currentPath === `/${page.slug}`)
  const shinyMoveOutSeoMatch = shinyMoveOutSeoPages.find((page) => currentPath === `/shiny-move-out-cleaning/${page.slug}`)
  const shinyMoveOutCityIntentMatch = shinyMoveOutCityIntentPages.find((page) => currentPath === `/shiny-move-out-cleaning/${page.slug}`)
  const deepDomainSeoMatch = shinyDeepSeoPages.find((page) => currentPath === `/${page.slug}`)
  const deepDomainCityIntentMatch = shinyDeepCityIntentPages.find((page) => currentPath === `/${page.slug}`)
  const shinyDeepSeoMatch = shinyDeepSeoPages.find((page) => currentPath === `/shiny-deep-cleaning/${page.slug}`)
  const shinyDeepCityIntentMatch = shinyDeepCityIntentPages.find((page) => currentPath === `/shiny-deep-cleaning/${page.slug}`)
  const cityServiceMatch = cityServicePageCities
    .flatMap((city) =>
      getCityServiceSeoServices(city.name).map((service) => ({
        city,
        service,
        path: `/service-areas/${city.slug}/${service.slug}`,
      })),
    )
    .find((item) => currentPath === item.path)

  if (isDeepCleaningSite) {
    if (currentPath === "/") {
      return <ShinyDeepCleaningPage />
    }

    if (deepDomainCityMatch) {
      return <ShinyDeepCleaningPage city={deepDomainCityMatch} />
    }

    if (deepDomainSeoMatch) {
      return <ShinyDeepSeoPage page={deepDomainSeoMatch} />
    }

    if (deepDomainCityIntentMatch) {
      return <ShinyDeepCityIntentPage page={deepDomainCityIntentMatch} />
    }
  }

  if (isMoveOutCleaningSite && currentPath === "/") {
    return <ShinyMoveOutPage />
  }

  if (isMoveOutCleaningSite && shinyMoveOutLegalMatch) {
    return <ShinyMoveOutLegalPage page={shinyMoveOutLegalMatch} />
  }

  if (isMoveOutCleaningSite && moveOutDomainSeoMatch) {
    return <ShinyMoveOutSeoPage page={moveOutDomainSeoMatch} />
  }

  if (isMoveOutCleaningSite && moveOutDomainCityIntentMatch) {
    return <ShinyMoveOutCityIntentPage page={moveOutDomainCityIntentMatch} />
  }

  if (isMoveOutCleaningSite && moveOutDomainCityMatch) {
    return <ShinyMoveOutPage city={moveOutDomainCityMatch} />
  }

  if (currentPath === "/shiny-apartment-cleaning") {
    return <ShinyApartmentPage />
  }

  if (currentPath === "/shiny-deep-cleaning") {
    return <ShinyDeepCleaningPage />
  }

  if (shinyDeepCityMatch) {
    return <ShinyDeepCleaningPage city={shinyDeepCityMatch} />
  }

  if (shinyDeepSeoMatch) {
    return <ShinyDeepSeoPage page={shinyDeepSeoMatch} />
  }

  if (shinyDeepCityIntentMatch) {
    return <ShinyDeepCityIntentPage page={shinyDeepCityIntentMatch} />
  }

  if (currentPath === "/shiny-airbnb-cleaning") {
    return <ShinyAirbnbPage />
  }

  if (currentPath === "/shiny-move-out-cleaning") {
    return <ShinyMoveOutPage />
  }

  if (shinyMoveOutLegalMatch && currentPath.startsWith("/shiny-move-out-cleaning/")) {
    return <ShinyMoveOutLegalPage page={shinyMoveOutLegalMatch} />
  }

  if (shinyMoveOutSeoMatch) {
    return <ShinyMoveOutSeoPage page={shinyMoveOutSeoMatch} />
  }

  if (shinyMoveOutCityIntentMatch) {
    return <ShinyMoveOutCityIntentPage page={shinyMoveOutCityIntentMatch} />
  }

  if (shinyMoveOutCityMatch) {
    return <ShinyMoveOutPage city={shinyMoveOutCityMatch} />
  }

  if (currentPath === "/services") {
    return <ServicesIndexPage />
  }

  if (currentPath === "/service-areas") {
    return <ServiceAreasPage />
  }

  if (serviceMatch) {
    return <ServiceSeoPage service={serviceMatch} />
  }

  if (cityServiceMatch) {
    return <ServiceSeoPage service={cityServiceMatch.service} city={cityServiceMatch.city} />
  }

  if (cityMatch) {
    return <CityPage city={cityMatch} />
  }

  if (genericSeoMatch) {
    return <GenericSeoPage page={genericSeoMatch} />
  }

  if (legalMatch) {
    return <LegalPage page={legalMatch} />
  }

  if (currentPath === "/") {
    return <HomePage />
  }

  return <NotFoundPage />
}

export default App
