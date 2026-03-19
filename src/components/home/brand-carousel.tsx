"use client"

import * as React from "react"
import { motion } from "framer-motion"

const brands = [
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
    { name: "Bosch", logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg" },
    { name: "Whirlpool", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Whirlpool_Corporation_logo.svg" },
    { name: "Dyson", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Dyson_logo.svg" },
    { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    { name: "Philips", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Philips_logo_new.svg" },
    { name: "Miele", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Miele_logo.svg" },
]

export function BrandCarousel() {
    return (
        <section className="py-20 bg-white dark:bg-black border-y border-border/50">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-12">
                    Trusted by Global <span className="text-primary italic">Leaders</span>
                </h3>

                <div className="relative flex overflow-x-hidden">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex gap-20 items-center whitespace-nowrap"
                    >
                        {[...brands, ...brands].map((brand, i) => (
                            <div key={i} className="w-32 md:w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                                <img src={brand.logo} alt={brand.name} className="max-h-8 md:max-h-12 w-auto object-contain" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
