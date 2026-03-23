"use client"

import * as React from "react"
import { getRelatedProducts, type Product } from "@/lib/data"
import { ProductCard } from "./product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RelatedProductsProps {
  productId: string
  category: string
}

export function RelatedProducts({
  productId,
  category,
}: RelatedProductsProps) {
  const [related, setRelated] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let active = true

    const loadRelatedProducts = async () => {
      try {
        setIsLoading(true)
        const items = await getRelatedProducts(productId, category, 8)

        if (!active) return
        setRelated(items)
      } catch (error) {
        console.error("Failed to load related products:", error)
        if (active) {
          setRelated([])
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadRelatedProducts()

    return () => {
      active = false
    }
  }, [productId, category])

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return

    const amount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    })
  }

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Produits Similaires
          </h2>
        </div>

        <div className="flex gap-4 overflow-hidden pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[320px] w-[180px] flex-none animate-pulse rounded-2xl border border-gray-200 bg-white sm:w-[200px] md:w-[220px]"
            />
          ))}
        </div>
      </section>
    )
  }

  if (related.length === 0) return null

  return (
    <section className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Produits Similaires
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-none"
      >
        {related.map((product) => (
          <div
            key={product.id}
            className="w-[180px] flex-none sm:w-[200px] md:w-[220px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}