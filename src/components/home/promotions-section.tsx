"use client"

import * as React from "react"
import { getPromotionProducts } from "@/lib/data"
import type { Product } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"

const PROMO_END = new Date("2026-04-01T00:00:00Z")
const ITEMS_PER_PAGE = 5

const FILTER_TABS = [
  { id: "all", label: "Voir Tout", emoji: "⭐" },
  { id: "kitchen", label: "Cuisine", emoji: "🍳" },
  { id: "laundry", label: "Lavage & Froid", emoji: "🧺" },
  { id: "tech", label: "TV & Tech", emoji: "📺" },
  { id: "coffee", label: "Café & Petits Élec.", emoji: "☕" },
] as const

type FilterTabId = (typeof FILTER_TABS)[number]["id"]

function useCountdown(target: Date) {
  const [time, setTime] = React.useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  })

  React.useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()

      if (diff <= 0) {
        setTime({ days: 0, hours: 0, mins: 0, secs: 0 })
        return
      }

      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target])

  return time
}

function interleaveProductsByCategory(items: Product[]): Product[] {
  const groups: Record<string, Product[]> = {}

  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  }

  const categoryOrder = [
    "Refrigerators",
    "Washing Machines",
    "Televisions",
    "Coffee Machines",
    "Kitchen Appliances",
    "Air Fryers",
    "Ovens",
    "Dishwashers",
    "Small Appliances",
    "Cookware",
  ]

  const orderedGroups = categoryOrder
    .map((category) => groups[category] || [])
    .filter((group) => group.length > 0)

  const result: Product[] = []
  let added = true

  while (added) {
    added = false
    for (const group of orderedGroups) {
      if (group.length > 0) {
        result.push(group.shift()!)
        added = true
      }
    }
  }

  return result
}

function mapFilterGroup(category: string): Exclude<FilterTabId, "all"> | "other" {
  const c = category.toLowerCase()

  if (["kitchen appliances", "ovens", "air fryers", "cookware"].includes(c)) {
    return "kitchen"
  }

  if (["washing machines", "refrigerators"].includes(c)) {
    return "laundry"
  }

  if (["televisions"].includes(c)) {
    return "tech"
  }

  if (["coffee machines", "small appliances"].includes(c)) {
    return "coffee"
  }

  return "other"
}

const ALL_PROMO_PRODUCTS = getPromotionProducts().filter(
  (item) => item.isActive !== false
)

const ALL_INTERLEAVED_PROMO_PRODUCTS = interleaveProductsByCategory([
  ...ALL_PROMO_PRODUCTS,
])

function PromotionsCountdown() {
  const timer = useCountdown(PROMO_END)

  const blocks = [
    { val: timer.days, label: "Jours" },
    { val: timer.hours, label: "Heures" },
    { val: timer.mins, label: "Min" },
    { val: timer.secs, label: "Sec" },
  ]

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:gap-5 xl:w-auto xl:flex-row xl:items-center xl:gap-8 xl:pr-2">
      <div
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 xl:max-w-[520px]"
        aria-label="Compte à rebours des promotions"
        aria-live="polite"
      >
        {blocks.map((block, i) => (
          <React.Fragment key={block.label}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden text-2xl font-black text-white/70 sm:inline lg:text-3xl"
              >
                :
              </span>
            )}

            <div className="min-w-[72px] rounded-2xl border border-white/20 bg-white/15 px-3 py-3 text-center shadow-lg backdrop-blur-md sm:min-w-[82px] sm:px-4 sm:py-4 lg:min-w-[92px]">
              <span className="block text-2xl font-black leading-none text-white tabular-nums sm:text-3xl">
                {String(block.val).padStart(2, "0")}
              </span>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 sm:text-[11px]">
                {block.label}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex w-full shrink-0 items-center justify-center sm:w-[260px] md:w-[300px] xl:w-[300px] 2xl:w-[340px]">
        <img
          src="https://i.postimg.cc/C5GxVgsf/image.png"
          alt="Visuel des promotions Electro Mostafa"
          className="h-auto max-h-[130px] w-full rounded-xl object-contain shadow-2xl sm:max-h-[145px] xl:max-h-[165px]"
          loading="lazy"
          decoding="async"
          width={1200}
          height={675}
        />
      </div>
    </div>
  )
}

export function PromotionsSection() {
  const [activeTab, setActiveTab] = React.useState<FilterTabId>("all")
  const [page, setPage] = React.useState(1)

  const displayed = React.useMemo(() => {
    if (activeTab === "all") {
      return ALL_INTERLEAVED_PROMO_PRODUCTS
    }

    return ALL_PROMO_PRODUCTS.filter(
      (product) => mapFilterGroup(product.category) === activeTab
    )
  }, [activeTab])

  const totalPages = Math.max(1, Math.ceil(displayed.length / ITEMS_PER_PAGE))

  const paginated = React.useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return displayed.slice(start, start + ITEMS_PER_PAGE)
  }, [displayed, page])

  React.useEffect(() => {
    setPage(1)
  }, [activeTab])

  const scrollToPromotions = () => {
    document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleTabChange = (tabId: FilterTabId) => {
    setActiveTab(tabId)
  }

  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    scrollToPromotions()
  }

  return (
    <section
      id="promotions"
      className="bg-gray-50 py-14"
      aria-labelledby="promotions-title"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Offres Limitées
          </span>

          <h2
            id="promotions-title"
            className="mb-2 text-3xl font-bold text-gray-900"
          >
            Promotions en Cours 🔥
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-gray-500">
            Découvrez nos meilleures promotions Electro Mostafa au Maroc sur une
            sélection d’appareils électroménagers, TV, cuisine et petit équipement.
          </p>
        </div>

        <div className="relative mb-8 min-h-[300px] overflow-hidden rounded-3xl bg-gradient-to-r from-red-900 via-red-700 to-rose-500 shadow-xl sm:min-h-[340px] xl:min-h-[250px]">
          <div className="absolute inset-0">
            <img
              src="https://i.postimg.cc/C5GxVgsf/image.png"
              alt="Bannière promotionnelle Electro Mostafa au Maroc"
              className="h-full w-full scale-105 object-cover opacity-15"
              loading="lazy"
              decoding="async"
              width={1200}
              height={675}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/55 to-red-500/35" />
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />
          <div className="absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-pink-300/10 blur-3xl" />

          <div className="relative z-10 h-full px-5 py-7 sm:px-7 lg:px-10 lg:py-8">
            <div className="flex h-full flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
              <div className="max-w-2xl text-white xl:flex-1">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-xs lg:text-sm">
                  Fin de la promotion dans :
                </p>

                <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                  Jusqu&apos;à{" "}
                  <span className="text-yellow-300 drop-shadow-sm">
                    50% de réduction !
                  </span>
                </h3>

                <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
                  Sur une sélection d&apos;appareils Electro Mostafa premium
                </p>
              </div>

              <PromotionsCountdown />
            </div>
          </div>
        </div>

        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          aria-label="Filtres des promotions"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-red-600 bg-red-600 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:text-red-600"
                }`}
              >
                <span aria-hidden="true">{tab.emoji}</span>
                {tab.label}
              </button>
            )
          })}
        </div>

        {displayed.length > 0 ? (
          <>
            <div className="mb-4 text-center text-sm text-gray-500">
              {displayed.length} produit{displayed.length > 1 ? "s" : ""} en promotion
            </div>

            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} showPromoBadge />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (page > 1) goToPage(page - 1)
                    }}
                    disabled={page === 1}
                    className={`h-10 rounded-lg border px-4 text-sm font-bold transition-all ${
                      page === 1
                        ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                        : "border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:text-red-600"
                    }`}
                  >
                    ← Précédent
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1
                    const isCurrent = page === pageNumber

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber)}
                        aria-label={`Aller à la page ${pageNumber}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                          isCurrent
                            ? "scale-110 bg-red-600 text-white shadow-md"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:text-red-600"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      if (page < totalPages) goToPage(page + 1)
                    }}
                    disabled={page === totalPages}
                    className={`h-10 rounded-lg border px-4 text-sm font-bold transition-all ${
                      page === totalPages
                        ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                        : "border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:text-red-600"
                    }`}
                  >
                    Suivant →
                  </button>
                </div>

                <p className="text-xs font-medium italic text-gray-500">
                  Page {page} sur {totalPages}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center text-gray-400">
            <p className="mb-1 text-lg font-semibold">
              Aucun produit dans cette catégorie
            </p>
            <button
              type="button"
              onClick={() => handleTabChange("all")}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Voir toutes les promotions
            </button>
          </div>
        )}
      </div>
    </section>
  )
}