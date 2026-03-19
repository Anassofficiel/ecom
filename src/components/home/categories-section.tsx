"use client"

import * as React from "react"
import Link from "next/link"
import { getProductsByCategory } from "@/lib/data"
import { ChevronRight } from "lucide-react"

// One representative image per category
const categoryImages: Record<string, string> = {
    "Refrigerators": "https://i.postimg.cc/HxYvd4mk/image.png",
    "Washing Machines": "https://i.postimg.cc/YCB4vdsn/image.png",
    "Televisions": "https://i.postimg.cc/j5xdz9Hc/image.png",
    "Ovens": "https://i.postimg.cc/m2L9jXws/image.png",
    "Air Fryers": "https://i.postimg.cc/MTTjmvxM/image.png",
    "Coffee Machines": "https://i.postimg.cc/zBK3jW6f/image.png",
    "Kitchen Appliances": "https://i.postimg.cc/LhdTWz6f/image.png",
    //"Dishwashers": "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600&auto=format&fit=crop",
    //"Small Appliances": "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop",
    //"Cookware": "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=600&auto=format&fit=crop",
}

interface CategoryCardProps {
    category: string
}

function CategoryCard({ category }: CategoryCardProps) {
    const catSlug = category.toLowerCase().replace(/\s+/g, "-")
    const image = categoryImages[category] ?? "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop"
    const previewProducts = getProductsByCategory(category).slice(0, 4)
    const totalProducts = getProductsByCategory(category).length

    return (
        <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-red-200 transition-all duration-300 flex flex-col">
            {/* Category image */}
            <Link href={`/category/${catSlug}`} className="block relative h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={image}
                    alt={category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Dark overlay with category name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
                    <div>
                        <h3 className="text-white font-bold text-base leading-tight">{category}</h3>
                        <p className="text-white/70 text-xs mt-0.5">{totalProducts} produits</p>
                    </div>
                </div>
            </Link>

            {/* Preview products (mini grid) */}
            <div className="p-3 flex-1">
                {previewProducts.length > 0 ? (
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                        {previewProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                title={product.name}
                                className="aspect-square bg-gray-50 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-400 transition-all"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-1"
                                    loading="lazy"
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="h-16 flex items-center justify-center text-xs text-gray-400 mb-3">
                        Produits bientôt disponibles
                    </div>
                )}

                {/* Price range hint */}
                {previewProducts.length > 0 && (() => {
                    const minPrice = Math.min(...previewProducts.map((p) => p.price));

                    return (
                        <p className="text-[11px] text-gray-400 mb-3">
                            À partir de{" "}
                            <span className="font-bold text-red-600">
                                {minPrice.toLocaleString("fr-FR")} DH
                            </span>
                        </p>
                    );
                })()}

                {/* CTA Button */}
                <Link
                    href={`/category/${catSlug}`}
                    className="flex items-center justify-center gap-1.5 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                >
                    Voir Tous les Produits
                    <ChevronRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    )
}

// ─── Categories Section ───────────────────────────────────────────────────────

const HOMEPAGE_CATEGORIES = [
    "Televisions",
    "Refrigerators",
    "Ovens",
    "Washing Machines",
    "Air Fryers",
    "Coffee Machines",
    "Kitchen Appliances",
]

export function CategoriesSection() {
    return (
        <section className="py-14 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                        Nos Rayons
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Catégories</h2>
                    <p className="text-gray-500 text-sm">Explorez notre sélection d'appareils électroménagers premium</p>
                </div>

                {/* Grid — 2 cols mobile, 3 tablet, 4 desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {HOMEPAGE_CATEGORIES.map((cat) => (
                        <CategoryCard key={cat} category={cat} />
                    ))}
                </div>
            </div>
        </section>
    )
}
