"use client"

import Link from "next/link"
import { packs } from "@/lib/data"

const WHATSAPP_NUMBER = "212608788782"
const BASE_URL = "https://veneziaelectro.vercel.app"

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-blue-600",
  "Hot Deal": "bg-orange-500",
  "New": "bg-emerald-600",
  "Premium": "bg-purple-600",
  "Trending": "bg-pink-500",
  "Limited": "bg-rose-600",
  "VIP": "bg-yellow-500 text-gray-900",
  "Lifestyle": "bg-red-600",
  "Family": "bg-lime-600",
  "Smart Choice": "bg-sky-600",
}

const PACK_PRODUCT_SPECS: Record<string, Array<Record<string, string>>> = {
  pack1: [
    { Type: "Réfrigérateur bottom freezer", Capacité: "200 L", Refroidissement: "Multi Air Flow" },
    { Type: "Four électrique", Capacité: "45 L", Puissance: "2000 W" },
    { Type: "TV 4K QLED", Taille: '55"', Système: "Google TV" },
  ],
  pack2: [
    { Type: "Machine Expresso", Pression: "15 bar", Réservoir: "1.5 L" },
    { Type: "Stand Mixer", Capacité: "5.5 L", Puissance: "1000 W" },
    { Type: "Panini Grill", Puissance: "2200 W", Surface: "Double non-stick" },
  ],
  pack3: [
    { Type: "Google TV 4K QLED", Taille: '75"', WiFi: "WiFi 5" },
    { Type: "Machine Expresso", Pression: "15 bar", Réservoir: "1.5 L" },
    { Type: "Panini Grill", Puissance: "2000 W", Usage: "Sandwich / Grill" },
  ],
  pack4: [
    { Type: "Lave-linge frontal", Capacité: "9 kg", RPM: "1400" },
    { Type: "Chauffe-eau électrique", Capacité: "50 L", Puissance: "2000 W" },
    { Type: "Fer électrique", Puissance: "1200 W", Semelle: "Anti-adhésive" },
  ],
  pack5: [
    { Type: "Stand Mixer", Capacité: "7 L", Puissance: "1000 W" },
    { Type: "Blender Inox", Capacité: "2 L", Puissance: "700 W" },
    { Type: "Air Fryer Digital", Capacité: "5 L", Programmes: "7" },
  ],
  pack6: [
    { Type: "Réfrigérateur top freezer", Capacité: "420 L", Technologie: "Inverter" },
    { Type: "Lave-linge frontal", Capacité: "10 kg", Technologie: "Smart Digital Motor" },
    { Type: "Hotte murale", Débit: "650 m3/h", Éclairage: "LED" },
  ],
  pack7: [
    { Type: "Air Fryer", Capacité: "3 L", Puissance: "1500 W" },
    { Type: "Air Fryer Digital", Capacité: "5 L", Puissance: "1700 W" },
    { Type: "Barbecue électrique", Longueur: "70 cm", Puissance: "2000 W" },
  ],
  pack8: [
    { Type: "Machine capsules", Réservoir: "0.8 L", Fonction: "Automatique" },
    { Type: "Expresso Pro", Pression: "20 bar", Programmes: "20" },
    { Type: "Expresso auto", Pression: "20 bar", Moulin: "Intégré" },
  ],
  pack9: [
    { Type: "Aspirateur industriel", Capacité: "20 L", Puissance: "1600 W" },
    { Type: "Aspirateur maison", Capacité: "2 L", Filtre: "HEPA" },
    { Type: "Purificateur d'eau", Système: "5 étapes", Débit: "75 GPD" },
  ],
  pack10: [
    { Type: "Google TV 4K QLED", Taille: '75"', Résolution: "4K" },
    { Type: "TV 4K QLED", Taille: '55"', Résolution: "4K Ultra HD" },
    { Type: "Smart TV Android", Taille: '32"', Système: "Android 14" },
  ],
}

export function PacksSection() {
  const packsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Packs exclusifs Electro Mostafa",
    itemListElement: packs.map((pack, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: pack.name,
        description: pack.description,
        price: pack.packPrice,
        priceCurrency: "MAD",
        url: `${BASE_URL}/#packs`,
      },
    })),
  }

  return (
    <section
      id="packs"
      className="bg-white py-14"
      aria-labelledby="packs-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packsJsonLd) }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gray-900">
            Offres Groupées
          </span>

          <h2
            id="packs-title"
            className="mb-2 text-3xl font-bold text-gray-900"
          >
            Nos Packs Exclusifs 🎁
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-gray-500">
            Achetez en pack et économisez davantage sur une sélection
            d’électroménager, TV, cuisine et petit équipement Electro Mostafa.
          </p>
        </div>

        {/* Banner */}
        <div className="relative mb-10 h-[170px] overflow-hidden rounded-2xl bg-gradient-to-r from-pink-200 via-pink-300 to-rose-300 sm:h-[190px] lg:h-[210px]">
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
            <img
              src="https://i.postimg.cc/7L37XppJ/image.png"
              alt="Bannière des packs exclusifs Electro Mostafa"
              className="h-full w-full object-contain opacity-90"
              loading="lazy"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/35 via-pink-700/20 to-transparent" />

          <div className="relative z-10 flex h-full items-center px-6 sm:px-8 lg:px-10">
            <div className="max-w-xl text-white">
              <h3 className="mb-2 text-lg font-bold drop-shadow-md sm:text-xl lg:text-2xl">
                🎁 Économisez plus en achetant plus
              </h3>
              <p className="text-xs leading-relaxed text-white/90 drop-shadow-sm sm:text-sm lg:text-base">
                Nos packs combinent les meilleurs appareils à des prix imbattables.
              </p>
            </div>
          </div>
        </div>

        {/* Pack Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((pack) => {
            const specs = PACK_PRODUCT_SPECS[pack.id] ?? []

            return (
              <article
                key={pack.id}
                className="relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  boxShadow: "0 0 0 2px #f59e0b, 0 0 20px 4px rgba(245, 158, 11, 0.15)",
                }}
              >
                {/* Badge */}
                {pack.badge && (
                  <div
                    className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-md ${
                      badgeColors[pack.badge] ?? "bg-red-600"
                    }`}
                  >
                    {pack.badge}
                  </div>
                )}

                {/* Discount */}
                <div className="absolute right-3 top-3 z-20 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                  -{pack.discount}%
                </div>

                {/* Product images with inline specs */}
                <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50">
                  {pack.images.slice(0, 3).map((img, i) => {
                    const productSpecs = specs[i] ?? {}

                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center border-r border-gray-100 px-3 py-3 last:border-0 sm:px-4 sm:py-4"
                      >
                        <div className="mb-2 flex h-28 w-full items-center justify-center sm:h-32 md:h-36">
                          <img
                            src={img}
                            alt={pack.products[i] ?? `${pack.name} produit ${i + 1}`}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        <div className="w-full space-y-1">
                          {Object.entries(productSpecs)
                            .slice(0, 3)
                            .map(([key, val]) => (
                              <div
                                key={key}
                                className="text-[10px] leading-tight text-gray-600 sm:text-[11px]"
                              >
                                <span className="font-semibold text-gray-800">{key}:</span>{" "}
                                <span>{val}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6">
                  <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900">
                    {pack.name}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    {pack.description}
                  </p>

                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-2xl font-extrabold text-red-600">
                      {pack.packPrice.toLocaleString("fr-FR")} DH
                    </span>
                    <span className="text-sm font-medium text-gray-900 line-through">
                      {pack.originalPrice.toLocaleString("fr-FR")} DH
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Bonjour, je suis intéressé par le pack: ${pack.name} (${pack.packPrice.toLocaleString(
                          "fr-FR"
                        )} DH)`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Commander le pack ${pack.name} via WhatsApp`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>

                    {/* Checkout */}
                    <Link
                      href="/checkout"
                      aria-label={`Passer à la caisse pour ${pack.name}`}
                      className="flex flex-1 items-center justify-center rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Passer à la caisse →
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}