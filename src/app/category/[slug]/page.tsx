"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  getProductsByCategory,
  getPaginatedProducts,
  getTotalPages,
  type Product,
} from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/ui/pagination"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const BASE_URL = "https://veneziaelectro.vercel.app"

const categorySeoMap: Record<
  string,
  {
    dataCategory: string
    displayName: string
    title: string
    description: string
    intro: string
  }
> = {
  "refrigerators": {
    dataCategory: "Refrigerators",
    displayName: "Réfrigérateurs",
    title: "Réfrigérateurs au Maroc",
    description:
      "Découvrez les meilleurs réfrigérateurs Electro Mostafa au Maroc : rétro, combinés, top freezer et side by side avec livraison rapide et garantie.",
    intro:
      "Découvrez notre sélection de réfrigérateurs Electro Mostafa au Maroc : modèles rétro, combinés, top freezer et side by side, avec livraison rapide et garantie.",
  },
  "washing-machines": {
    dataCategory: "Washing Machines",
    displayName: "Lave-linge",
    title: "Machines à laver au Maroc",
    description:
      "Découvrez nos machines à laver Electro Mostafa au Maroc : front load, semi-automatiques et grande capacité avec programmes vapeur et livraison rapide.",
    intro:
      "Explorez notre gamme de machines à laver Electro Mostafa : modèles front load, semi-automatiques et grande capacité, conçus pour le confort quotidien.",
  },
  "televisions": {
    dataCategory: "Televisions",
    displayName: "Télévisions",
    title: "Télévisions et Smart TV au Maroc",
    description:
      "Achetez des télévisions et Smart TV Electro Mostafa au Maroc : Google TV, Android TV, 4K QLED et modèles grand écran avec livraison rapide.",
    intro:
      "Retrouvez nos télévisions et Smart TV Electro Mostafa : écrans 4K, Google TV, Android TV et modèles adaptés au salon, à la chambre ou au bureau.",
  },
  "air-fryers": {
    dataCategory: "Air Fryers",
    displayName: "Friteuses à Air",
    title: "Friteuses à air au Maroc",
    description:
      "Découvrez les meilleures friteuses à air chez Electro Mostafa au Maroc : modèles compacts et digitaux pour une cuisine saine et rapide.",
    intro:
      "Préparez des repas plus sains avec nos friteuses à air Electro Mostafa : modèles pratiques, rapides et adaptés à la cuisine quotidienne.",
  },
  "coffee-machines": {
    dataCategory: "Coffee Machines",
    displayName: "Cafetières",
    title: "Machines à café au Maroc",
    description:
      "Découvrez les machines à café et cafetières Electro Mostafa au Maroc : expresso, capsules et modèles automatiques pour les amateurs de café.",
    intro:
      "Découvrez notre sélection de machines à café Electro Mostafa : cafetières expresso, capsules et modèles automatiques pour un café de qualité à la maison.",
  },
  "kitchen-appliances": {
    dataCategory: "Kitchen Appliances",
    displayName: "Cuisine & Petit Électroménager",
    title: "Petit électroménager de cuisine au Maroc",
    description:
      "Achetez le meilleur petit électroménager de cuisine chez Electro Mostafa au Maroc : blenders, grills, bouilloires, hottes, chauffe-eau et plus.",
    intro:
      "Retrouvez notre sélection d'appareils de cuisine et petit électroménager : blenders, grills, bouilloires, hottes, chauffe-eau et autres essentiels du quotidien.",
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = decodeURIComponent((params?.slug as string) ?? "")

  const normalize = React.useCallback(
    (s: string) => s.toLowerCase().replace(/-/g, " ").trim(),
    []
  )

  const fallbackCategoryName = React.useMemo(() => {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }, [slug])

  const seo = React.useMemo(() => {
    return (
      categorySeoMap[slug] ?? {
        dataCategory: fallbackCategoryName,
        displayName: fallbackCategoryName,
        title: `${fallbackCategoryName} au Maroc`,
        description: `Découvrez notre sélection de ${fallbackCategoryName.toLowerCase()} chez Electro Mostafa au Maroc avec livraison rapide et produits premium.`,
        intro: `Découvrez notre sélection de ${fallbackCategoryName.toLowerCase()} chez Electro Mostafa au Maroc.`,
      }
    )
  }, [slug, fallbackCategoryName])

  const [categoryProducts, setCategoryProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    const pageTitle = `${seo.title} | Electro Mostafa Maroc`
    document.title = pageTitle

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null

    if (!metaDescription) {
      metaDescription = document.createElement("meta")
      metaDescription.name = "description"
      document.head.appendChild(metaDescription)
    }

    metaDescription.content = seo.description

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }

    canonical.href = `${BASE_URL}/category/${slug}`
  }, [seo, slug])

  React.useEffect(() => {
    let active = true

    const loadProducts = async () => {
      try {
        setIsLoading(true)

        const exact = getProductsByCategory(seo.dataCategory)

        if (!active) return

        if (exact.length > 0) {
          setCategoryProducts(exact)
          return
        }

        const fallback = getProductsByCategory(fallbackCategoryName)

        if (!active) return

        setCategoryProducts(
          fallback.filter((p) => normalize(p.category) === normalize(slug))
        )
      } catch (error) {
        console.error("Failed to load category products:", error)
        if (active) {
          setCategoryProducts([])
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [slug, seo.dataCategory, fallbackCategoryName, normalize])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [slug])

  const totalPages = React.useMemo(() => {
    return getTotalPages(categoryProducts)
  }, [categoryProducts])

  const pageProducts = React.useMemo(() => {
    return getPaginatedProducts(categoryProducts, currentPage)
  }, [categoryProducts, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="transition-colors hover:text-red-600">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-gray-900">{seo.displayName}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold text-gray-900">{seo.displayName}</h1>

              <p className="mt-2 text-sm leading-6 text-gray-600">{seo.intro}</p>

              <p className="mt-2 text-sm text-gray-500">
                {isLoading ? "Chargement..." : `${categoryProducts.length} produits disponibles`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[320px] animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="mb-2 text-2xl font-bold text-gray-700">
              Aucun produit trouvé
            </p>
            <p className="mb-6 text-gray-500">
              Cette catégorie ne contient encore aucun produit.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl border border-red-100 bg-white p-4 text-sm leading-6 text-gray-700">
              <strong className="text-gray-900">Electro Mostafa Maroc :</strong>{" "}
              trouvez les meilleurs {seo.displayName.toLowerCase()} avec promotions,
              livraison rapide et produits sélectionnés pour la maison moderne.
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4">
              {pageProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  )
}