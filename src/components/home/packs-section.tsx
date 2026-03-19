"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { packs } from "@/lib/data"

const WHATSAPP_NUMBER = "212608788782"

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

// Short specs per product slot inside each pack (index = slot 0,1,2)
// Keyed by pack.id
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
    const router = useRouter()

    return (
        <section id="packs" className="py-14 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                        Offres Groupées
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos Packs Exclusifs 🎁</h2>
                    <p className="text-gray-500 text-sm">Achetez en pack et économisez jusqu&apos;à 25%</p>
                </div>

                {/* Banner */}
                <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-pink-200 via-pink-300 to-rose-300 h-[170px] sm:h-[190px] lg:h-[210px]">
                    <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                        <img
                            src="https://i.postimg.cc/7L37XppJ/image.png"
                            alt="Packs banner"
                            className="w-full h-full object-contain opacity-90"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-pink-900/35 via-pink-700/20 to-transparent" />

                    <div className="relative z-10 h-full flex items-center px-6 sm:px-8 lg:px-10">
                        <div className="max-w-xl text-white">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 drop-shadow-md">
                                🎁 Économisez plus en achetant plus
                            </h3>
                            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed drop-shadow-sm">
                                Nos packs combinent les meilleurs appareils à des prix imbattables.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pack Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packs.map((pack) => {
                        const specs = PACK_PRODUCT_SPECS[pack.id] ?? []

                        return (
                            <div
                                key={pack.id}
                                className="relative rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                style={{
                                    boxShadow: "0 0 0 2px #f59e0b, 0 0 20px 4px rgba(245, 158, 11, 0.15)",
                                }}
                            >
                                {/* Badge */}
                                {pack.badge && (
                                    <div
                                        className={`absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-1 rounded-full text-white shadow-md ${badgeColors[pack.badge] ?? "bg-red-600"
                                            }`}
                                    >
                                        {pack.badge}
                                    </div>
                                )}

                                {/* Discount */}
                                <div className="absolute top-3 right-3 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    -{pack.discount}%
                                </div>

                                {/* Product images with inline specs */}
                                <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
                                    {pack.images.slice(0, 3).map((img, i) => {
                                        const productSpecs = specs[i] ?? {}
                                        return (
                                            <div
                                                key={i}
                                                className="border-r border-gray-100 last:border-0 flex flex-col items-center px-3 py-3 sm:px-4 sm:py-4"
                                            >
                                                {/* Bigger Image */}
                                                <div className="h-28 sm:h-32 md:h-36 w-full flex items-center justify-center mb-2">
                                                    <img
                                                        src={img}
                                                        alt={pack.products[i] ?? "product"}
                                                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </div>

                                                {/* Short specs */}
                                                <div className="w-full space-y-1">
                                                    {Object.entries(productSpecs)
                                                        .slice(0, 3)
                                                        .map(([key, val]) => (
                                                            <div key={key} className="text-[10px] sm:text-[11px] text-gray-600 leading-tight">
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
                                    <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">{pack.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{pack.description}</p>

                                    {/* Price */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="text-2xl font-extrabold text-red-600">
                                            {pack.packPrice.toLocaleString("fr-FR")} DH
                                        </span>
                                        <span className="text-sm text-gray-900 line-through font-medium">
                                            {pack.originalPrice.toLocaleString("fr-FR")} DH
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                                `Bonjour, je suis intéressé par le pack: ${pack.name} (${pack.packPrice.toLocaleString("fr-FR")} DH)`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                                        >
                                            <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            WhatsApp
                                        </a>

                                        {/* Checkout */}
                                        <Link
                                            href="/checkout"
                                            className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                                        >
                                            Passer à la caisse →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}