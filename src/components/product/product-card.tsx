"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Tag, Gift } from "lucide-react"
import { useCart } from "@/lib/store"
import type { Product } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
  showPromoBadge?: boolean
}

const stockConfig = {
  "in-stock": { label: "En Stock", className: "bg-emerald-100 text-emerald-700" },
  "low-stock": { label: "Stock Limité", className: "bg-amber-100 text-amber-700" },
  "out-of-stock": { label: "Rupture", className: "bg-red-100 text-red-600" },
} as const

// 🔥 ALT optimized SEO
function getProductImageAlt(product: Product) {
  return `${product.name} ${product.category} prix Maroc Electro Mostafa`
}

function ProductCardComponent({
  product,
  className,
  showPromoBadge = false,
}: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const productId = String(product.id)
  const productImage = product.image || "/placeholder.png"
  const productRating = typeof product.rating === "number" ? product.rating : 0
  const productReviews = typeof product.reviews === "number" ? product.reviews : 0
  const productAlt = getProductImageAlt(product)

  const stock =
    stockConfig[product.stockStatus as keyof typeof stockConfig] ??
    stockConfig["in-stock"]

  const hasDiscount =
    !!product.discount ||
    (!!product.originalPrice && product.originalPrice > product.price)

  const isPromo = showPromoBadge && hasDiscount
  const displayDiscount = product.discount ?? 0

  const isTelevisionWithVariants =
    product.category === "Televisions" && !!product.variants?.length

  const startingPrice =
    isTelevisionWithVariants
      ? Math.min(...product.variants!.map((variant) => variant.price))
      : product.price

  const handleAddToCart = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!product.inStock) return

      addItem({
        id: productId,
        name: product.name,
        price: startingPrice,
        image: productImage,
        quantity: 1,
        category: product.category,
      })

      setAdded(true)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setAdded(false), 1500)
    },
    [addItem, product, productId, productImage, startingPrice]
  )

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        isPromo
          ? "border-red-200 shadow-sm hover:-translate-y-1 hover:border-red-400 hover:shadow-[0_12px_35px_rgba(220,38,38,0.18)]"
          : "border-gray-200 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <Link
        href={`/product/${productId}`}
        aria-label={`Voir le produit ${product.name}`}
        title={product.name}
        className="relative block aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      >
        {isPromo && (
          <div className="absolute left-3 top-3 z-30 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-3 py-1 text-[12px] font-extrabold text-white shadow-lg">
            <Tag className="h-3.5 w-3.5" />
            <span>{displayDiscount > 0 ? `${displayDiscount}% OFF` : "OFFRE"}</span>
          </div>
        )}

        {isPromo && (
          <div className="absolute right-3 top-3 z-30 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-[11px] font-extrabold uppercase text-white shadow-lg">
            OFFRE SPÉCIALE
          </div>
        )}

        {isPromo && (
          <div className="absolute left-4 top-14 z-30 flex h-14 w-14 items-center justify-center rounded-full border-4 border-red-300 bg-gradient-to-b from-red-400 to-red-600 text-white shadow-xl">
            <Gift className="h-7 w-7" />
          </div>
        )}

        {hasDiscount && !isPromo && (
          <div className="absolute left-3 top-3 z-20 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
            -{displayDiscount}%
          </div>
        )}

        {/* 🔥 IMAGE OPTIMIZED */}
        <Image
          src={productImage}
          alt={productAlt}
          title={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span
          className={cn(
            "mb-3 self-start rounded-full px-3 py-1 text-[11px] font-semibold",
            stock.className
          )}
        >
          {stock.label}
        </span>

        <Link
          href={`/product/${productId}`}
          className="mb-3 line-clamp-2 min-h-[48px] text-[15px] font-extrabold text-slate-800 hover:text-red-600"
        >
          {product.name}
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[13px] font-bold text-slate-700">
            {productRating.toFixed(1)}
          </span>
          <span className="text-[13px] text-slate-500">({productReviews})</span>
        </div>

        <div className="mb-4 mt-auto flex items-end gap-3">
          <span className="text-[18px] font-extrabold text-red-600">
            {isTelevisionWithVariants
              ? `À partir de ${startingPrice.toLocaleString("fr-FR")} DH`
              : `${product.price.toLocaleString("fr-FR")} DH`}
          </span>

          {!isTelevisionWithVariants && product.originalPrice && (
            <span className="text-[13px] line-through text-slate-800 opacity-80">
              {product.originalPrice.toLocaleString("fr-FR")} DH
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || added}
          className={cn(
            "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-extrabold transition",
            product.inStock
              ? added
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-100 text-gray-400"
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          {!product.inStock ? "Rupture" : added ? "Ajouté ✓" : "Ajouter"}
        </button>
      </div>
    </div>
  )
}

export const ProductCard = React.memo(ProductCardComponent)