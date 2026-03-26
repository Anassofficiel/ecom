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

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null

      if (!el) {
        el = document.createElement("meta")
        Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value))
        document.head.appendChild(el)
      }

      return el
    }

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: "og:title" })
    ogTitle.setAttribute("content", title)

    const ogDescription = ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    })
    ogDescription.setAttribute("content", description)

    const ogUrl = ensureMeta('meta[property="og:url"]', { property: "og:url" })
    ogUrl.setAttribute("content", `${BASE_URL}/`)

    const ogType = ensureMeta('meta[property="og:type"]', { property: "og:type" })
    ogType.setAttribute("content", "website")

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
    })
    twitterTitle.setAttribute("content", title)

    const twitterDescription = ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    })
    twitterDescription.setAttribute("content", description)
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

      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
            Venezia Electro Maroc
          </h1>

          <p className="mt-3 max-w-4xl text-sm md:text-base leading-7 text-gray-600">
            Découvrez notre sélection d&apos;électroménager au Maroc : réfrigérateurs,
            machines à laver, télévisions, fours, cafetières, friteuses à air et petit
            électroménager. Profitez de promotions, packs avantageux et livraison rapide
            chez Venezia Electro.
          </p>
        </div>
      </section>

      <Hero />
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
            maison : électroménager de cuisine, téléviseurs, réfrigérateurs, lave-linge,
            fours et équipements pratiques pour le quotidien. Notre objectif est de vous
            offrir des produits fiables, un bon rapport qualité-prix et une expérience
            d&apos;achat simple.
          </p>
        </div>
      </section>
    </div>
  )
}