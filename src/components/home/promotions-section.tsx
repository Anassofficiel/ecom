"use client"

import * as React from "react"
import { getPromotionProducts } from "@/lib/data"
import type { Product } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"

// ─── Countdown ───────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
    const [t, setT] = React.useState({ days: 0, hours: 0, mins: 0, secs: 0 })

    React.useEffect(() => {
        const tick = () => {
            const diff = target.getTime() - Date.now()

            if (diff <= 0) {
                setT({ days: 0, hours: 0, mins: 0, secs: 0 })
                return
            }

            setT({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins: Math.floor((diff % 3600000) / 60000),
                secs: Math.floor((diff % 60000) / 1000),
            })
        }

        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [target])

    return t
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
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

// ─── Filter config ────────────────────────────────────────────────────────────
const PROMO_END = new Date("2026-04-01T00:00:00Z")

const FILTER_TABS = [
    { id: "all", label: "Voir Tout", emoji: "⭐" },
    { id: "kitchen", label: "Cuisine", emoji: "🍳" },
    { id: "laundry", label: "Lavage & Froid", emoji: "🧺" },
    { id: "tech", label: "TV & Tech", emoji: "📺" },
    { id: "coffee", label: "Café & Petits Élec.", emoji: "☕" },
]

// Product IDs per filter group
const FILTER_PRODUCT_IDS: Record<string, string[]> = {
    kitchen: [
        "k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9", "k10",
        "k11", "k12", "k13", "k14", "k15", "k16", "k17", "k18", "k19", "k20",
        "k21", "k22", "k23", "k24", "k25", "k26", "k27", "k28", "k29", "k30",
        "k31", "k32", "k33", "k34", "k35",
        "ov1", "ov2", "ov3", "ov4", "ov5", "ov6", "ov7", "ov8", "ov9", "ov10",
        "ov11", "ov12", "ov13", "ov14", "ov15", "ov16", "ov17", "ov18", "ov19", "ov20",
        "ov21", "ov22", "ov23", "ov24", "ov25", "ov26", "ov27", "ov28", "ov29", "ov30",
        "ov31", "ov32",
        "af1", "af2"
    ],

    laundry: [
        "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10",
        "w1", "w2", "w3", "w4", "w5", "w6", "w7"
    ],

    tech: [
        "t1", "t2", "t3"
    ],

    coffee: [
        "c1", "c2", "c3", "c4"
    ],
}

export function PromotionsSection() {
    const allPromo = React.useMemo(() => getPromotionProducts(), [])
    const timer = useCountdown(PROMO_END)
    const [activeTab, setActiveTab] = React.useState("all")
    const [page, setPage] = React.useState(1)
    const itemsPerPage = 5

    const displayed: Product[] = React.useMemo(() => {
        if (activeTab === "all") {
            return interleaveProductsByCategory([...allPromo])
        }

        const ids = FILTER_PRODUCT_IDS[activeTab] ?? []
        return allPromo.filter((p) => ids.includes(p.id))
    }, [activeTab, allPromo])

    const totalPages = Math.ceil(displayed.length / itemsPerPage)

    const paginated = React.useMemo(() => {
        const start = (page - 1) * itemsPerPage
        return displayed.slice(start, start + itemsPerPage)
    }, [displayed, page])

    React.useEffect(() => {
        setPage(1)
    }, [activeTab])

    return (
        <section id="promotions" className="py-14 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                        Offres Limitées
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Promotions en Cours 🔥</h2>
                    <p className="text-gray-500 text-sm">Des prix exceptionnels pour une durée limitée.</p>
                </div>

                {/* Banner + Countdown */}
                <div className="relative overflow-hidden rounded-3xl mb-8 min-h-[300px] sm:min-h-[340px] xl:min-h-[250px] bg-gradient-to-r from-red-900 via-red-700 to-rose-500 shadow-xl">
                    <div className="absolute inset-0">
                        <img
                            src="https://i.postimg.cc/C5GxVgsf/image.png"
                            alt="Promotions banner"
                            className="w-full h-full object-cover opacity-15 scale-105"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/55 to-red-500/35" />
                    <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />
                    <div className="absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-pink-300/10 blur-3xl" />

                    <div className="relative z-10 px-5 sm:px-7 lg:px-10 py-7 lg:py-8 h-full">
                        <div className="flex h-full flex-col xl:flex-row xl:items-center xl:justify-between gap-6 xl:gap-8">
                            <div className="max-w-2xl text-white xl:flex-1">
                                <p className="text-[11px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.25em] text-white/80 mb-2">
                                    Fin de la promotion dans :
                                </p>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                                    Jusqu&apos;à{" "}
                                    <span className="text-yellow-300 drop-shadow-sm">
                                        50% de réduction !
                                    </span>
                                </h3>

                                <p className="mt-2 text-sm sm:text-base text-white/80 max-w-xl">
                                    Sur une sélection d&apos;appareils électroménagers premium
                                </p>
                            </div>

                            <div className="flex flex-col items-center xl:flex-row xl:items-center gap-4 sm:gap-5 xl:gap-8 xl:pr-2 w-full xl:w-auto">
                                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 xl:max-w-[520px]">
                                    {[
                                        { val: timer.days, label: "Jours" },
                                        { val: timer.hours, label: "Heures" },
                                        { val: timer.mins, label: "Min" },
                                        { val: timer.secs, label: "Sec" },
                                    ].map((t, i) => (
                                        <React.Fragment key={t.label}>
                                            {i > 0 && (
                                                <span className="hidden sm:inline text-white/60 text-2xl lg:text-3xl font-black">
                                                    :
                                                </span>
                                            )}

                                            <div className="min-w-[72px] sm:min-w-[82px] lg:min-w-[92px] rounded-2xl border border-white/15 bg-white/12 backdrop-blur-md px-3 py-3 sm:px-4 sm:py-4 text-center shadow-lg">
                                                <span className="block text-2xl sm:text-3xl font-black text-white tabular-nums leading-none">
                                                    {String(t.val).padStart(2, "0")}
                                                </span>
                                                <p className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-widest text-white/75 font-semibold">
                                                    {t.label}
                                                </p>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center shrink-0 w-full sm:w-[260px] md:w-[300px] xl:w-[300px] 2xl:w-[340px]">
                                    <img
                                        src="https://i.postimg.cc/C5GxVgsf/image.png"
                                        alt="Promotion visuel"
                                        className="w-full h-auto max-h-[130px] sm:max-h-[145px] xl:max-h-[165px] object-contain rounded-xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${activeTab === tab.id
                                ? "bg-red-600 text-white border-red-600 shadow-md"
                                : "bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:text-red-600"
                                }`}
                        >
                            <span>{tab.emoji}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {displayed.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
                            {paginated.map((product) => (
                                <ProductCard key={product.id} product={product} showPromoBadge />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            if (page > 1) {
                                                setPage(page - 1)
                                                document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" })
                                            }
                                        }}
                                        disabled={page === 1}
                                        className={`px-4 h-10 rounded-lg text-sm font-bold border transition-all ${page === 1
                                            ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
                                            }`}
                                    >
                                        ← Précédent
                                    </button>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setPage(i + 1)
                                                document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" })
                                            }}
                                            className={`h-10 w-10 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${page === i + 1
                                                ? "bg-red-600 text-white shadow-md scale-110"
                                                : "bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => {
                                            if (page < totalPages) {
                                                setPage(page + 1)
                                                document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" })
                                            }
                                        }}
                                        disabled={page === totalPages}
                                        className={`px-4 h-10 rounded-lg text-sm font-bold border transition-all ${page === totalPages
                                            ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
                                            }`}
                                    >
                                        Suivant →
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 font-medium italic">
                                    Page {page} sur {totalPages}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-semibold mb-1">Aucun produit dans cette catégorie</p>
                        <button
                            onClick={() => setActiveTab("all")}
                            className="text-red-600 hover:underline text-sm font-medium"
                        >
                            Voir toutes les promotions
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}