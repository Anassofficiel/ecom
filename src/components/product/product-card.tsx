"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const isInWishlist = useStore((state) => state.isInWishlist(product.id))

  const discountPercent =
    product.discount ||
    (product.originalPrice && product.originalPrice > product.price
      ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) *
        100
      )
      : 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
    >
      {/* Badges */}
      <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
        {discountPercent > 0 && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            -{discountPercent}%
          </span>
        )}

        {product.stockStatus === "out-of-stock" && (
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Épuisé
          </span>
        )}

        {product.stockStatus === "low-stock" && (
          <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Stock Limité
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleWishlist(product.id)
        }}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:bg-gray-50"
        aria-label="Ajouter aux favoris"
      >
        <Heart
          className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
        />
      </button>

      {/* Image Area */}
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[#f8f9fa] p-6"
      >
        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-0"
            loading="lazy"
          />

          <img
            src={product.hoverImage || product.image}
            alt={`${product.name} Hover`}
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
          />
        </div>

        {/* Quick View Button بدون ضباب */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex translate-y-3 justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-red-600 hover:text-white"
            title="Aperçu rapide"
          >
            <Eye className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Info Area */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          {product.category}
        </div>

        <Link
          href={`/product/${product.id}`}
          className="transition-colors group-hover:text-red-600"
        >
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900 sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating)
                      ? "fill-current"
                      : "fill-gray-200 text-gray-200"
                    }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <span className="text-[10px] text-gray-400">
              ({product.reviews})
            </span>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString("fr-FR")} DH
              </div>
            )}

            <div className="text-lg font-bold text-red-600 sm:text-xl">
              {product.price.toLocaleString("fr-FR")} DH
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()

              if (product.inStock) {
                if (product.variants && product.variants.length > 0) {
                  window.location.href = `/product/${product.id}`
                } else {
                  addToCart(product)
                }
              }
            }}
            disabled={!product.inStock}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${product.inStock
                ? "bg-gray-900 text-white hover:bg-red-600"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            aria-label="Ajouter au panier"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}