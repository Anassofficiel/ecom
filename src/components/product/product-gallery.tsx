"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const validImages = React.useMemo(() => images.filter(Boolean), [images])
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (current >= validImages.length) {
      setCurrent(0)
    }
  }, [current, validImages.length])

  if (validImages.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-[40px] border border-border/50 bg-zinc-50 aspect-square flex items-center justify-center">
          <span className="text-sm text-gray-400">Aucune image disponible</span>
        </div>
      </div>
    )
  }

  const currentAlt =
    validImages.length > 1
      ? `${productName} image ${current + 1} Maroc Electro Mostafa`
      : `${productName} Electro Mostafa`

  return (
    <div className="flex flex-col gap-4">
      {/* 🔥 MAIN IMAGE */}
      <div className="relative group overflow-hidden rounded-[40px] border border-border/50 bg-zinc-50 aspect-square">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            <Image
              src={validImages[current]}
              alt={currentAlt}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-contain p-8"
              priority={current === 0}
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </motion.div>
        </AnimatePresence>

        {/* 🔥 NAV BUTTONS */}
        {validImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-md"
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? validImages.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-md"
              onClick={() =>
                setCurrent((prev) =>
                  prev === validImages.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* 🔥 ZOOM BUTTON */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full bg-white/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* 🔥 THUMBNAILS */}
      {validImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {validImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${i === current
                  ? "border-primary p-0.5"
                  : "border-border/50 p-1 opacity-60 hover:opacity-100"
                }`}
            >
              <Image
                src={img}
                alt={`${productName} miniature ${i + 1}`}
                fill
                sizes="100px"
                className="object-cover rounded-xl"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}