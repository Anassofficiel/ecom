"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
    {
        title: "Premium Kitchen",
        subtitle: "Experience the Future of Cooking",
        description: "Discover our latest collection of smart ovens and refrigerators that blend technology with elegance.",
        image: "https://i.postimg.cc/zfjCpvhL/image.png",
        color: "bg-zinc-900"
    },
    {
        title: "Eco-Friendly Tech",
        subtitle: "Save Energy, Save Money",
        description: "New generation A+++ washing machines and dishwashers now in stock with special introductory prices.",
        image: "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3de12754-7ea9-4718-91d3-d768b2a7fde2/as/SubZero-Wolf-JV-04.avif?assetname=SubZero-Wolf-JV-04.png",
        color: "bg-blue-900"
    },
    {
        title: "Modern Living",
        subtitle: "Smart Home Electronics",
        description: "Ultra HD TVs and premium sound systems to transform your living room into a cinematic experience.",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
        color: "bg-red-900"
    }
]

export function Hero() {
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black">
            {/* Background Video/Image Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container relative z-20 h-full flex items-center px-4 mx-auto">
                <div className="max-w-2xl">
                    <motion.div
                        key={`content-${current}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest">
                            New Collections 2024
                        </span>

                        <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-tight uppercase">
                            {slides[current].title} <br />
                            <span className="text-primary">{slides[current].subtitle}</span>
                        </h1>

                        <p className="text-lg text-zinc-300 max-w-lg leading-relaxed">
                            {slides[current].description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">


                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-12 bg-primary" : "w-4 bg-white/30"}`}
                    />
                ))}
            </div>

            {/* Side Label */}
            <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 rotate-90 hidden xl:block">
                <span className="text-8xl font-black text-white/5 uppercase select-none tracking-widest whitespace-nowrap">
                    ELECTRO MANAGER
                </span>
            </div>
        </section>
    )
}
