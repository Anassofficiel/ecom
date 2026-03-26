//categories-se...: غالبًا section ديال التصنيفات.

"use client"

import * as React from "react"
import Link from "next/link"
import { getProductsByCategory, type Product } from "@/lib/data"
import { ChevronRight } from "lucide-react"

const categoryImages: Record<string, string> = {
  Refrigerators: "https://i.postimg.cc/HxYvd4mk/image.png",
  "Washing Machines": "https://i.postimg.cc/YCB4vdsn/image.png",
  Televisions: "https://i.postimg.cc/j5xdz9Hc/image.png",
  Ovens: "https://i.postimg.cc/m2L9jXws/image.png",
  "Air Fryers": "https://i.postimg.cc/MTTjmvxM/image.png",
  "Coffee Machines": "https://i.postimg.cc/zBK3jW6f/image.png",
  "Kitchen Appliances": "https://i.postimg.cc/LhdTWz6f/image.png",
}

interface CategoryCardProps {
  category: string
}

function CategoryCard({ category }: CategoryCardProps) {
  const catSlug = category.toLowerCase().replace(/\s+/g, "-")
  const image =
    categoryImages[category] ??
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop"

  const [allProducts, setAllProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let active = true

    const loadCategoryProducts = async () => {
      try {
        setIsLoading(true)
        const items = await getProductsByCategory(category)

        if (!active) return
        setAllProducts(items)
      } catch (error) {
        console.error(`Failed to load products for category ${category}:`, error)
        if (active) setAllProducts([])
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadCategoryProducts()

    return () => {
      active = false
    }
  }, [category])

  const previewProducts = allProducts.slice(0, 4)
  const totalProducts = allProducts.length

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-red-200 hover:shadow-lg">
      <Link
        href={`/category/${catSlug}`}
        className="relative block h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <img
          src={image}
          alt={category}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4">
          <div>
            <h3 className="text-base font-bold leading-tight text-white">{category}</h3>
            <p className="mt-0.5 text-xs text-white/70">
              {isLoading ? "Chargement..." : `${totalProducts} produits`}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex-1 p-3">
        {isLoading ? (
          <div className="mb-3 grid grid-cols-4 gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        ) : previewProducts.length > 0 ? (
          <div className="mb-3 grid grid-cols-4 gap-1.5">
            {previewProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                title={product.name}
                className="aspect-square overflow-hidden rounded-lg bg-gray-50 transition-all hover:ring-2 hover:ring-red-400"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-1"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mb-3 flex h-16 items-center justify-center text-xs text-gray-400">
            Produits bientôt disponibles
          </div>
        )}

        {!isLoading && previewProducts.length > 0 && (
          <p className="mb-3 text-[11px] text-gray-400">
            À partir de{" "}
            <span className="font-bold text-red-600">
              {Math.min(...allProducts.map((p) => p.price)).toLocaleString("fr-FR")} DH
            </span>
          </p>
        )}

        <Link
          href={`/category/${catSlug}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
        >
          Voir Tous les Produits
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

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
    <section className="bg-white py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Nos Rayons
          </span>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Catégories</h2>
          <p className="text-sm text-gray-500">
            Explorez notre sélection d&apos;appareils électroménagers premium
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {HOMEPAGE_CATEGORIES.map((cat) => (
            <CategoryCard key={cat} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}