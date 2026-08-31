"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useStore } from "@/lib/store"
import { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
  index?: number
}


export function ProductCard({ product }: ProductCardProps) {

  const addToCart = useStore((state) => state.addToCart)

  const toggleWishlist = useStore((state) => state.toggleWishlist)

  const isInWishlist = useStore((state) =>
    state.isInWishlist(product.id)
  )


  const discountPercent =
    product.discount ||
    (product.originalPrice && product.originalPrice > product.price
      ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) *
        100
      )
      : 0)


  return (

    <div
      className="
      group relative flex h-full flex-col 
      overflow-hidden rounded-2xl 
      border border-gray-100 bg-white 
      transition-all duration-300 
      hover:border-transparent 
      hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
      "
    >


      <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">

        {discountPercent > 0 && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            -{discountPercent}%
          </span>
        )}


        {product.stockStatus === "out-of-stock" && (
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
            Épuisé
          </span>
        )}


        {product.stockStatus === "low-stock" && (
          <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
            Stock Limité
          </span>
        )}

      </div>



      <button
        onClick={(e) => {
          e.preventDefault()
          toggleWishlist(product.id)
        }}
        className="
        absolute right-3 top-3 z-20 
        flex h-9 w-9 items-center justify-center 
        rounded-full bg-white shadow-sm
        "
      >

        <Heart
          className={
            isInWishlist
              ? "h-4 w-4 fill-red-500 text-red-500"
              : "h-4 w-4 text-gray-400"
          }
        />

      </button>



      <Link
        href={`/product/${product.id}`}
        className="
        relative block aspect-[4/5]
        overflow-hidden bg-[#f8f9fa]
        p-6
        "
      >

        <img
          src={product.image}
          alt={product.name}
          className="
          absolute inset-0 h-full w-full
          object-contain transition-transform
          duration-500 group-hover:scale-105
          "
          loading="lazy"
        />


        <div
          className="
          absolute inset-x-0 bottom-4 
          flex justify-center
          opacity-0 
          transition-all
          group-hover:opacity-100
          "
        >

          <span
            className="
            flex h-11 w-11 items-center 
            justify-center rounded-full 
            bg-white shadow-lg
            "
          >

            <Eye className="h-4 w-4" />

          </span>

        </div>


      </Link>




      <div className="flex flex-1 flex-col p-5">


        <div className="mb-2 text-xs font-bold uppercase text-gray-400">

          {product.category}

        </div>



        <Link
          href={`/product/${product.id}`}
          className="group-hover:text-red-600"
        >

          <h3 className="line-clamp-2 text-sm font-semibold">
            {product.name}
          </h3>

        </Link>



        <div className="mt-auto flex items-end justify-between pt-4">


          <div>


            {product.originalPrice &&
              product.originalPrice > product.price && (

                <div className="text-xs text-gray-400 line-through">

                  {product.originalPrice.toLocaleString("fr-FR")} DH

                </div>

              )}



            <div className="text-lg font-bold text-red-600">

              {product.price.toLocaleString("fr-FR")} DH

            </div>


          </div>




          <button
            onClick={(e) => {

              e.preventDefault()

              if (product.inStock) {

                if (product.variants?.length) {

                  window.location.href =
                    `/product/${product.id}`

                } else {

                  addToCart(product)

                }

              }

            }}

            disabled={!product.inStock}

            className="
            flex h-10 w-10 items-center 
            justify-center rounded-full 
            bg-gray-900 text-white
            hover:bg-red-600
            "
          >

            <ShoppingCart className="h-4 w-4" />

          </button>


        </div>


      </div>


    </div>

  )
}