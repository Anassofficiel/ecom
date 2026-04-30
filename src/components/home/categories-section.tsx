// components/CategoriesSection.tsx
import Link from "next/link"
import { getProductsByCategory } from "@/lib/data"
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

const categoryDisplayNames: Record<string, string> = {
  Refrigerators: "Réfrigérateurs",
  "Washing Machines": "Machines à laver",
  Televisions: "Télévisions",
  Ovens: "Fours",
  "Air Fryers": "Friteuses à air",
  "Coffee Machines": "Machines à café",
  "Kitchen Appliances": "Petit électroménager",
}

const categoryPrices: Record<string, number> = {
  Televisions: 1399,
  Refrigerators: 1899,
  Ovens: 499,
  "Washing Machines": 1849,
  "Air Fryers": 899,
  "Coffee Machines": 599,
  "Kitchen Appliances": 199,
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

interface CategoryCardProps {
  category: string
  index: number
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const catSlug = category.toLowerCase().replace(/\s+/g, "-")
  const image = categoryImages[category] ?? "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop"
  const displayName = categoryDisplayNames[category] ?? category
  const allProducts = getProductsByCategory(category)
  const previewProducts = allProducts.slice(0, 4)
  const totalProducts = allProducts.length
  const price = categoryPrices[category] ?? (allProducts.length > 0 ? Math.min(...allProducts.map((p) => p.price)) : null)

  return (
    <article
      className="cat-card group flex flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Image Header */}
      <Link
        href={`/category/${catSlug}`}
        aria-label={`Voir la catégorie ${displayName}`}
        className="relative block h-[160px] overflow-hidden bg-[#1a1a1a]"
      >
        <img
          src={image}
          alt={`${displayName} chez Electro Mostafa`}
          className="h-full w-full object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Corner Product Count Tag */}
        <div className="absolute right-2.5 top-2.5 rounded-[8px] border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur-[8px]">
          {totalProducts > 0 ? `${totalProducts} produits` : "Bientôt"}
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-sans text-[15px] font-semibold leading-tight text-white">
            {displayName}
          </h3>
        </div>

        {/* Shimmer Effect */}
        <div className="shimmer-overlay absolute inset-0 pointer-events-none" />
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-3.5 pb-4">
        {/* Preview Thumbnails */}
        {previewProducts.length > 0 && (
          <div className="mb-3.5 grid grid-cols-4 gap-1.5">
            {previewProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="preview-item aspect-square overflow-hidden rounded-[10px] border border-black/[0.05] bg-gray-50"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="mb-3 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

        {/* Price Row */}
        {price && (
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10.5px] text-gray-400">À partir de</span>
            <span className="text-[14px] font-bold tracking-tight text-red-600">
              {price.toLocaleString("fr-FR")} DH
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Link
          href={`/category/${catSlug}`}
          className="view-btn flex w-full items-center justify-center gap-1.5 rounded-[12px] bg-red-600 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.97]"
        >
          Voir tous les produits
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}

export function CategoriesSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#f7f5f2] py-16 md:py-20"
      aria-labelledby="home-categories-title"
    >
      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-red-600/[0.06]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-red-600/[0.04]" />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            <span className="inline-block h-[5px] w-[5px] animate-pulse rounded-full bg-white/70" />
            Nos Rayons
          </span>

          <h2
            id="home-categories-title"
            className="mb-3 font-playfair text-[40px] font-black leading-[1.1] tracking-tight text-gray-900 md:text-[44px]"
          >
            Catégories
          </h2>

          <p className="text-sm text-gray-400">
            Explorez notre sélection d&apos;électroménager Electro Mostafa au Maroc
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {HOMEPAGE_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}