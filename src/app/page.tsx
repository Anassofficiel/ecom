import type { Metadata } from "next";
import Script from "next/script";

import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { PromotionsSection } from "@/components/home/promotions-section";
import { BestSellersSection } from "@/components/home/best-sellers-section";
import { PacksSection } from "@/components/home/packs-section";
import { StoresSection } from "@/components/home/stores-section";

const BASE_URL = "https://electromostafa55.ma";

export const metadata: Metadata = {
  title:
    "Electro Mostafa 55 | Électroménager au Maroc - TV, Frigo, Machines à laver",

  description:
    "Electro Mostafa 55 propose électroménager au Maroc : téléviseurs, réfrigérateurs, machines à laver, fours, climatiseurs, air fryers, machines à café, cuisine, promotions et livraison partout au Maroc.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    url: `${BASE_URL}/`,
    title:
      "Electro Mostafa 55 | Électroménager au Maroc - TV, Frigo, Machines à laver",
    description:
      "Découvrez Electro Mostafa 55, votre boutique d'électroménager au Maroc : TV, réfrigérateurs, machines à laver, fours, climatiseurs, air fryers et offres spéciales.",
    type: "website",
    siteName: "Electro Mostafa 55",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Electro Mostafa 55 | Électroménager au Maroc - TV, Frigo, Machines à laver",
    description:
      "Électroménager au Maroc : TV, frigos, machines à laver, fours, climatiseurs, cuisine et promotions chez Electro Mostafa 55.",
  },
};

export default function HomePage() {
  const homePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Electro Mostafa 55",
    description:
      "Boutique d'électroménager au Maroc spécialisée dans les téléviseurs, réfrigérateurs, machines à laver, fours, climatiseurs, air fryers, machines à café et articles de cuisine.",
    url: `${BASE_URL}/`,
    inLanguage: "fr-MA",
    isPartOf: {
      "@type": "WebSite",
      name: "Electro Mostafa 55",
      url: BASE_URL,
    },
    about: [
      "Électroménager",
      "Téléviseurs",
      "Réfrigérateurs",
      "Machines à laver",
      "Fours",
      "Climatiseurs",
      "Air Fryers",
      "Machines à café",
      "Ustensiles de cuisine",
    ],
  };

  return (
    <>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <Hero />

        <CategoriesSection />

        <BestSellersSection />

        <PromotionsSection />

        <PacksSection />

        <StoresSection />

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600">
                Electro Mostafa 55
              </span>

              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
                Votre magasin d’électroménager au Maroc
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
                Electro Mostafa 55 vous propose une large sélection
                d’électroménager pour la maison : téléviseurs, réfrigérateurs,
                machines à laver, fours, climatiseurs, air fryers, machines à
                café et articles de cuisine. Profitez de produits de qualité,
                de promotions régulières et d’une livraison rapide partout au
                Maroc.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}