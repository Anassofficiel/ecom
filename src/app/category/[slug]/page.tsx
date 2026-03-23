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

export default function CategoryPage() {
  const params = useParams()
  const slug = decodeURIComponent((params?.slug as string) ?? "")

  const normalize = React.useCallback(
    (s: string) => s.toLowerCase().replace(/-/g, " ").trim(),
    []
  )

  const categoryName = React.useMemo(() => {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }, [slug])

  const [categoryProducts, setCategoryProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    let active = true

    const loadProducts = async () => {
      try {
        setIsLoading(true)

        const exact = await getProductsByCategory(categoryName)

        if (!active) return

        if (exact.length > 0) {
          setCategoryProducts(exact)
          return
        }

        const fallbackCategory = slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())

        const fallback = await getProductsByCategory(fallbackCategory)

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
  }, [slug, categoryName, normalize])

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
            <span className="font-medium text-gray-900">{categoryName}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
              <p className="mt-1 text-sm text-gray-500">
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