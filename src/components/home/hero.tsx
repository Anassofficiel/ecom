"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    title: "Electro Mostafa Premium",
    subtitle: "Le confort moderne pour votre maison",
    description:
      "Découvrez notre sélection d’électroménager au Maroc : réfrigérateurs, fours, lave-linge, télévisions et appareils de cuisine avec design moderne et livraison rapide.",
    image: "https://i.postimg.cc/zfjCpvhL/image.png",
    alt: "Cuisine moderne avec électroménager premium Electro Mostafa",
  },
  {
    title: "Technologie Éco-Énergétique",
    subtitle: "Économisez l’énergie au quotidien",
    description:
      "Explorez nos lave-linge, appareils économiques et équipements performants conçus pour allier faible consommation, efficacité et excellent rapport qualité-prix.",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3de12754-7ea9-4718-91d3-d768b2a7fde2/as/SubZero-Wolf-JV-04.avif?assetname=SubZero-Wolf-JV-04.png",
    alt: "Appareils électroménagers économes en énergie pour la maison",
  },
  {
    title: "TV & Maison Connectée",
    subtitle: "Votre espace multimédia nouvelle génération",
    description:
      "Profitez de télévisions Smart TV, équipements audio et solutions modernes pour transformer votre salon en espace de divertissement haut de gamme.",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
    alt: "Salon moderne avec télévision et équipements électroniques premium",
  },
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
    <section
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black"
      aria-label="Présentation des collections Electro Mostafa"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <img
            src={slides[current].image}
            alt={slides[current].alt}
            className="h-full w-full object-cover"
            loading={current === 0 ? "eager" : "lazy"}
            fetchPriority={current === 0 ? "high" : "auto"}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-20 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Electro Mostafa Maroc
            </span>

            <h2 className="text-4xl font-black uppercase italic leading-tight tracking-tighter text-white md:text-6xl xl:text-7xl">
              {slides[current].title} <br />
              <span className="text-primary">{slides[current].subtitle}</span>
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {slides[current].description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Afficher le slide ${i + 1}: ${slide.title}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-12 bg-primary" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>

      <div className="absolute right-[-100px] top-1/2 hidden -translate-y-1/2 rotate-90 xl:block">
        <span className="select-none whitespace-nowrap text-8xl font-black uppercase tracking-widest text-white/5">
          Electro Mostafa
        </span>
      </div>
    </section>
  )
}