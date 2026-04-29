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
}

function CategoryCard({ category }: CategoryCardProps) {
  const catSlug = category.toLowerCase().replace(/\s+/g, "-")
  const image =
    categoryImages[category] ??
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop"

  const displayName = categoryDisplayNames[category] ?? category
  const allProducts = getProductsByCategory(category)
  const previewProducts = allProducts.slice(0, 4)
  const totalProducts = allProducts.length

  const lowestPrice =
    allProducts.length > 0
      ? Math.min(...allProducts.map((p) => p.price)).toLocaleString("fr-FR")
      : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-red-200 hover:shadow-lg">
      <Link
        href={`/category/${catSlug}`}
        aria-label={`Voir la catégorie ${displayName}`}
        title={displayName}
        className="relative block h-[155px] overflow-hidden bg-white"
      >
        <img
          src={image}
          alt={`${displayName} chez Electro Mostafa`}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
        />

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4">
          <div>
            <h3 className="text-base font-bold leading-tight text-white">
              {displayName}
            </h3>
            <p className="mt-0.5 text-xs text-white/85">
              {totalProducts > 0
                ? `${totalProducts} produits`
                : "Produits bientôt disponibles"}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        {previewProducts.length > 0 ? (
          <div className="mb-3 grid grid-cols-4 gap-1.5">
            {previewProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                aria-label={`Voir le produit ${product.name}`}
                title={product.name}
                className="aspect-square overflow-hidden rounded-lg bg-gray-50 transition-all hover:ring-2 hover:ring-red-400"
              >
                <img
                  src={product.image}
                  alt={`${product.name} - ${displayName}`}
                  className="h-full w-full object-contain p-1"
                  loading="lazy"
                  decoding="async"
                  width={200}
                  height={200}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mb-3 flex h-16 items-center justify-center text-xs text-gray-500">
            Produits bientôt disponibles
          </div>
        )}

        {lowestPrice && (
          <p className="mb-3 text-[11px] text-gray-500">
            À partir de{" "}
            <span className="font-bold text-red-600">{lowestPrice} DH</span>
          </p>
        )}

        <Link
          href={`/category/${catSlug}`}
          aria-label={`Voir tous les produits de ${displayName}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
        >
          Voir Tous les Produits
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export function CategoriesSection() {
  return (
    <section className="bg-white py-14" aria-labelledby="home-categories-title">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Nos Rayons
          </span>

          <h2
            id="home-categories-title"
            className="mb-2 text-3xl font-bold text-gray-900"
          >
            Catégories
          </h2>

          <p className="text-sm text-gray-500">
            Explorez notre sélection d&apos;électroménager Electro Mostafa au Maroc
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