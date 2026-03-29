import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { PromotionsSection } from "@/components/home/promotions-section";
import { PacksSection } from "@/components/home/packs-section";
import { StoresSection } from "@/components/home/stores-section";

const BASE_URL = "https://veneziaelectro.vercel.app";

export const metadata: Metadata = {
  title: "Electro Mostafa Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver",
  description:
    "Achetez électroménager, téléviseurs, réfrigérateurs, machines à laver, fours et petits appareils chez Electro Mostafa au Maroc. Produits premium, promotions et livraison rapide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: `${BASE_URL}/`,
    title: "Electro Mostafa Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver",
    description:
      "Achetez électroménager, téléviseurs, réfrigérateurs, machines à laver, fours et petits appareils chez Electro Mostafa au Maroc. Produits premium, promotions et livraison rapide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electro Mostafa Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver",
    description:
      "Achetez électroménager, téléviseurs, réfrigérateurs, machines à laver, fours et petits appareils chez Electro Mostafa au Maroc. Produits premium, promotions et livraison rapide.",
  },
};

export default function HomePage() {
  const homePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Electro Mostafa Maroc",
    url: `${BASE_URL}/`,
    description:
      "Boutique d'électroménager au Maroc : réfrigérateurs, lave-linge, télévisions, fours, cafetières, friteuses à air et petit électroménager.",
    inLanguage: "fr-MA",
    isPartOf: {
      "@type": "WebSite",
      name: "Electro Mostafa Maroc",
      url: BASE_URL,
    },
    about: [
      "Électroménager",
      "Réfrigérateurs",
      "Machines à laver",
      "Télévisions",
      "Fours",
      "Petit électroménager",
    ],
  };

  return (
    <>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        <Hero />

        <section className="container mx-auto relative z-20 -mt-10 px-4">
          <div className="mx-auto max-w-5xl rounded-3xl border border-red-100 bg-white/95 p-6 shadow-lg backdrop-blur md:p-8">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
                Electro Mostafa Maroc
              </span>

              <h1 className="mt-3 text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
                Électroménager Mostafa premium pour votre maison
              </h1>

              <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
                Découvrez notre sélection de réfrigérateurs, machines à laver,
                télévisions, fours, cafetières, friteuses à air et petit
                électroménager au Maroc. Profitez de promotions exclusives,
                packs avantageux et livraison rapide avec Electro Mostafa.
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
            <h2 className="text-lg font-bold text-gray-900 md:text-xl">
              Votre magasin d&apos;électroménager Mostafa au Maroc
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
              Chez Electro Mostafa, nous proposons une large gamme
              d&apos;appareils pour la maison : électroménager de cuisine,
              téléviseurs, réfrigérateurs, lave-linge, fours et équipements
              pratiques pour le quotidien.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}