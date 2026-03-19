"use client"

import * as React from "react"
import { Hero } from "@/components/home/hero"
import { CategoriesSection } from "@/components/home/categories-section"
import { PromotionsSection } from "@/components/home/promotions-section"
import { PacksSection } from "@/components/home/packs-section"
import { StoresSection } from "@/components/home/stores-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Categories — cards only, no product grids */}
      <CategoriesSection />

      {/* 3. Promotions — countdown + promo product grid */}
      <PromotionsSection />

      {/* 4. Packs — bundle deals unchanged */}
      <PacksSection />

      {/* 5. Our Stores */}
      <StoresSection />
    </main>
  )
}
