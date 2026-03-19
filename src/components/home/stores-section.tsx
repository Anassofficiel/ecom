"use client"

import { storeLocations } from "@/lib/data"
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react"

const storesContent = [
    {
        city: "Casablanca",
        title: "Electro Manager — Casablanca",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sunrise%20in%20Casablanca%20with%20Hassan%20II%20Mosque.jpg",
        imageAlt: "Casablanca - Mosquée Hassan II",
        caption: "Un emplacement premium à Casablanca, dans un cadre moderne et emblématique.",
        address: "Bd Bassatine, Tit Mellil, Casablanca",
        hours: "Lun–Sam: 9h00 – 19h00 | Dim: 10h00 – 17h00",
        phone: "+212 5 22 000 000",
        mapUrl: "https://maps.app.goo.gl/QMuaYDA7vNC3jwU99",
    },
    {
        city: "Marrakech",
        title: "Electro Manager — Marrakech",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Maroc%20Marrakech%20Jemaa-el-Fna%20Luc%20Viatour.JPG",
        imageAlt: "Marrakech",
        caption: "Une présence élégante à Marrakech dans une ambiance chaleureuse et raffinée.",
        address: "Route de Quamassa, près de la Rue du Sport, Marrakech",
        hours: "Lun–Sam: 9h00 – 19h30 | Dim: 10h00 – 17h00",
        phone: "+212 5 24 000 000",
        mapUrl: "https://maps.app.goo.gl/Mkzf7YxzJYzeFyVq6",
    },
]

export function StoresSection() {
    return (
        <section id="magasins" className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <span className="inline-block bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 shadow-sm">
                        Nos Magasins
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Visitez Nos Showrooms
                    </h2>

                    <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                        Découvrez nos magasins à Casablanca et Marrakech dans un cadre premium, moderne et accueillant.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {storeLocations.slice(0, 2).map((store, index) => {
                        const currentStore = storesContent[index]

                        return (
                            <div
                                key={store.id ?? index}
                                className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="relative h-56 md:h-64 overflow-hidden">
                                    <img
                                        src={currentStore.image}
                                        alt={currentStore.imageAlt}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                                    <div className="absolute left-4 top-4">
                                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-900 shadow backdrop-blur-sm">
                                            Electro Manager
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                            {currentStore.city}
                                        </h3>
                                        <p className="mt-1 text-sm text-white/85">
                                            {currentStore.caption}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 p-6">
                                    <h4 className="text-xl font-bold text-gray-900">
                                        {currentStore.title}
                                    </h4>

                                    <div className="flex items-start gap-3 text-sm text-gray-600">
                                        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                                            <MapPin className="h-4 w-4 text-red-600" />
                                        </div>
                                        <span className="leading-6">{currentStore.address}</span>
                                    </div>

                                    <div className="flex items-start gap-3 text-sm text-gray-600">
                                        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                                            <Clock className="h-4 w-4 text-red-600" />
                                        </div>
                                        <span className="leading-6">{currentStore.hours}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                                            <Phone className="h-4 w-4 text-red-600" />
                                        </div>
                                        <span className="font-semibold text-gray-800">{currentStore.phone}</span>
                                    </div>

                                    <a
                                        href={currentStore.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Voir sur la Carte
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}