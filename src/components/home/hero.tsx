import Link from "next/link"
import Image from "next/image"

const heroSlide = {
  title: "Electro Mostafa Premium",
  subtitle: "Le confort moderne pour votre maison",
  description:
    "Découvrez notre sélection d’électroménager au Maroc : réfrigérateurs, fours, lave-linge, télévisions et appareils de cuisine avec design moderne et livraison rapide.",
  image: "https://i.postimg.cc/zfjCpvhL/image.png",
  alt: "Cuisine moderne avec électroménager premium Electro Mostafa",
}

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black">

      {/* 🔥 IMAGE OPTIMIZED */}
      <div className="absolute inset-0">
        <Image
          src={heroSlide.image}
          alt={heroSlide.alt}
          fill
          priority
          quality={60}
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      </div>

      <div className="container relative z-20 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl space-y-6">

          <span className="inline-block rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Electro Mostafa Maroc
          </span>

          <h2 className="text-4xl font-black uppercase italic leading-tight tracking-tighter text-white md:text-6xl xl:text-7xl">
            {heroSlide.title} <br />
            <span className="text-primary">{heroSlide.subtitle}</span>
          </h2>

          <p className="max-w-xl text-base text-zinc-300 md:text-lg">
            {heroSlide.description}
          </p>

          <div className="flex gap-3">
            <Link href="/#promotions" className="bg-red-600 px-6 py-3 text-white rounded-xl">
              Voir les promotions
            </Link>

            <Link href="/#packs" className="border border-white/20 bg-white/10 px-6 py-3 text-white rounded-xl">
              Découvrir les packs
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}