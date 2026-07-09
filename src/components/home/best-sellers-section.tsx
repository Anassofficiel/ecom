"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProductCard } from "@/components/product/product-card"
import { getAllProducts } from "@/lib/data"

const categoryPlan = [
  { category: "Refrigerators", take: 2 },
  { category: "Washing Machines", take: 2 },
  { category: "Televisions", take: 2 },
  { category: "Ovens", take: 2 },
  { category: "Air Fryers", take: 3 },
  { category: "Coffee Machines", take: 2 },
  { category: "Kitchen Appliances", take: 3 },
]

export function BestSellersSection() {
  const allProducts = getAllProducts()

  const selectedProducts = categoryPlan.flatMap(({ category, take }) =>
    allProducts
      .filter(
        (product) =>
          product.category === category &&
          product.isActive !== false &&
          product.inStock
      )
      .slice(0, take)
  )

  const fallbackProducts = allProducts
    .filter(
      (product) =>
        product.isActive !== false &&
        product.inStock &&
        !selectedProducts.some((selected) => selected.id === product.id)
    )
    .slice(0, Math.max(0, 16 - selectedProducts.length))

  const products = [...selectedProducts, ...fallbackProducts].slice(0, 16)

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-600">
              Sélection Premium
            </span>

            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Meilleures Ventes
            </h2>

            <p className="mt-2 max-w-2xl text-gray-500">
              Une sélection variée de nos produits les plus demandés :
              réfrigérateurs, machines à laver, téléviseurs, fours, air
              fryers, machines à café et appareils de cuisine.
            </p>
          </div>

          <Link
            href="/#promotions"
            className="group inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-black uppercase tracking-wide text-red-700 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            Voir les offres
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