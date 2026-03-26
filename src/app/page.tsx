"use client"

import * as React from "react"
import { Hero } from "@/components/home/hero"
import { CategoriesSection } from "@/components/home/categories-section"
import { PromotionsSection } from "@/components/home/promotions-section"
import { PacksSection } from "@/components/home/packs-section"
import { StoresSection } from "@/components/home/stores-section"

const BASE_URL = "https://veneziaelectro.vercel.app"

export default function HomePage() {
  React.useEffect(() => {
    const title =
      "Venezia Electro Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver"
    const description =
      "Achetez électroménager, téléviseurs, réfrigérateurs, machines à laver, fours et petits appareils chez Venezia Electro au Maroc. Produits premium, promotions et livraison rapide."

    document.title = title

    let metaDescription = document.head.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null

    if (!metaDescription) {
      metaDescription = document.createElement("meta")
      metaDescription.setAttribute("name", "description")
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute("content", description)

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", `${BASE_URL}/`)
  }, [])

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Venezia Electro Maroc",
    url: `${BASE_URL}/`,
    inLanguage: "fr-MA",
    description:
      "Boutique d'électroménager au Maroc : réfrigérateurs, lave-linge, télévisions, fours et petit électroménager.",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Hero />

      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-100 bg-white/95 backdrop-blur shadow-lg p-6 md:p-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
              Venezia Electro Maroc
            </span>

            <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight text-gray-900">
              Électroménager premium pour votre maison
            </h1>

            <p className="mt-3 text-sm md:text-base leading-7 text-gray-600">
              Découvrez notre sélection de réfrigérateurs, machines à laver,
              télévisions, fours, cafetières, friteuses à air et petit
              électroménager au Maroc. Profitez de promotions exclusives,
              packs avantageux et livraison rapide avec Venezia Electro.
            </p>
          </div>
        </div>
      </section>

      <CategoriesSection />
      <PromotionsSection />
      <PacksSection />
      <StoresSection />

      <section className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-red-100 bg-white p-5 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Votre magasin d&apos;électroménager au Maroc
          </h2>

          <p className="mt-3 text-sm md:text-base leading-7 text-gray-600">
            Chez Venezia Electro, nous proposons une large gamme d&apos;appareils pour la
            maison : électroménager de cuisine, téléviseurs, réfrigérateurs,
            lave-linge, fours et équipements pratiques pour le quotidien.
          </p>
        </div>
      </section>
    </div>
  )
}