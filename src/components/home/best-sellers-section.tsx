"use client"

import * as React from "react"
import { ProductCard } from "@/components/product/product-card"
import { getAllProducts } from "@/lib/data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BestSellersSection() {
  // Get 8 real products
  const products = getAllProducts().slice(0, 8)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Meilleures Ventes
            </h2>
            <p className="mt-2 text-gray-500">
              Les appareils les plus appréciés par nos clients au Maroc
            </p>
          </div>
          <Link
            href="/category/refrigerators" // Or a generic shop page
            className="group flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
