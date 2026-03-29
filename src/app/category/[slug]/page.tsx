"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  getProductsByCategory,
  getPaginatedProducts,
  getTotalPages,
  type Product,
} from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/ui/pagination"
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
    displayName: "Machines à laver",
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
    displayName: "Friteuses à air",
    title: "Friteuses à air au Maroc",
    description:
      "Découvrez les meilleures friteuses à air chez Electro Mostafa au Maroc : modèles compacts et digitaux pour une cuisine saine et rapide.",
    intro:
      "Préparez des repas plus sains avec nos friteuses à air Electro Mostafa : modèles pratiques, rapides et adaptés à la cuisine quotidienne.",
  },
  "coffee-machines": {
    dataCategory: "Coffee Machines",
    displayName: "Machines à café",
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
  "ovens": {
    dataCategory: "Ovens",
    displayName: "Fours",
    title: "Fours au Maroc",
    description:
      "Découvrez nos fours, tables de cuisson et appareils de cuisson Electro Mostafa au Maroc avec livraison rapide et produits fiables.",
    intro:
      "Retrouvez notre sélection de fours, tables de cuisson et équipements de cuisson Electro Mostafa pour une cuisine moderne et performante.",
  },
  "dishwashers": {
    dataCategory: "Dishwashers",
    displayName: "Lave-vaisselle",
    title: "Lave-vaisselle au Maroc",
    description:
      "Découvrez les lave-vaisselle Electro Mostafa au Maroc : modèles performants, silencieux et économiques pour la maison moderne.",
    intro:
      "Explorez notre sélection de lave-vaisselle Electro Mostafa avec performance, économie d’énergie et praticité au quotidien.",
  },
  "small-appliances": {
    dataCategory: "Small Appliances",
    displayName: "Petit Électroménager",
    title: "Petit électroménager au Maroc",
    description:
      "Achetez le meilleur petit électroménager chez Electro Mostafa au Maroc : aspirateurs, fers, appareils pratiques et solutions pour la maison.",
    intro:
      "Découvrez notre gamme de petit électroménager Electro Mostafa pour faciliter votre quotidien à la maison.",
  },
  "cookware": {
    dataCategory: "Cookware",
    displayName: "Ustensiles de cuisine",
    title: "Ustensiles de cuisine au Maroc",
    description:
      "Découvrez notre sélection d’ustensiles et accessoires de cuisine chez Electro Mostafa au Maroc avec produits fiables et pratiques.",
    intro:
      "Retrouvez des ustensiles et accessoires de cuisine sélectionnés pour accompagner votre quotidien et vos préparations.",
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

  const categoryProducts = React.useMemo(() => {
    const exact = getProductsByCategory(seo.dataCategory)

    if (exact.length > 0) {
      return exact
    }

    const fallback = getProductsByCategory(fallbackCategoryName)

    return fallback.filter((p) => normalize(p.category) === normalize(slug))
  }, [seo.dataCategory, fallbackCategoryName, normalize, slug])

  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [slug])

  React.useEffect(() => {
    const pageTitle = `${seo.title} | Electro Mostafa Maroc`
    const pageUrl = `${BASE_URL}/category/${slug}`

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

    canonical.href = pageUrl

    const setMetaProperty = (property: string, content: string) => {
      let tag = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement | null

      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute("property", property)
        document.head.appendChild(tag)
      }

      tag.setAttribute("content", content)
    }

    setMetaProperty("og:title", pageTitle)
    setMetaProperty("og:description", seo.description)
    setMetaProperty("og:url", pageUrl)
    setMetaProperty("og:type", "website")
  }, [seo, slug])

  const totalPages = React.useMemo(() => {
    return Math.max(1, getTotalPages(categoryProducts))
  }, [categoryProducts])

  const pageProducts = React.useMemo(() => {
    return getPaginatedProducts(categoryProducts, currentPage)
  }, [categoryProducts, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const categoryJsonLd = React.useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${seo.displayName} | Electro Mostafa Maroc`,
      url: `${BASE_URL}/category/${slug}`,
      description: seo.description,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: categoryProducts.slice(0, 12).map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${BASE_URL}/product/${product.id}`,
          name: product.name,
        })),
      },
    }
  }, [seo, slug, categoryProducts])

  const breadcrumbJsonLd = React.useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${BASE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.displayName,
          item: `${BASE_URL}/category/${slug}`,
        },
      ],
    }
  }, [seo.displayName, slug])

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
                {categoryProducts.length > 0
                  ? `${categoryProducts.length} produits disponibles`
                  : "Aucun produit disponible pour le moment"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {categoryProducts.length === 0 ? (
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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}