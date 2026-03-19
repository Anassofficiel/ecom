"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface ProductGalleryProps {
    images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [current, setCurrent] = React.useState(0)

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative group overflow-hidden rounded-[40px] border border-border/50 bg-zinc-50 aspect-square">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={images[current]}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="h-full w-full object-contain p-8"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-md"
                        onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-md"
                        onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full bg-white/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`relative flex-shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${i === current ? "border-primary p-0.5" : "border-border/50 p-1 opacity-60 hover:opacity-100"
                            }`}
                    >
                        <img src={img} className="h-full w-full object-cover rounded-xl" />
                    </button>
                ))}
            </div>
        </div>
    )
}
