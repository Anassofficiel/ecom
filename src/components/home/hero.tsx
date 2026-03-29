import Link from "next/link"

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
    <section
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black"
      aria-label="Présentation des collections Electro Mostafa"
    >
      <div className="absolute inset-0">
        <img
          src={heroSlide.image}
          alt={heroSlide.alt}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      </div>

      <div className="container relative z-20 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Electro Mostafa Maroc
            </span>

            <h2 className="text-4xl font-black uppercase italic leading-tight tracking-tighter text-white md:text-6xl xl:text-7xl">
              {heroSlide.title} <br />
              <span className="text-primary">{heroSlide.subtitle}</span>
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {heroSlide.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/#promotions"
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
              >
                Voir les promotions
              </Link>

              <Link
                href="/#packs"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                Découvrir les packs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[-100px] top-1/2 hidden -translate-y-1/2 rotate-90 xl:block">
        <span className="select-none whitespace-nowrap text-8xl font-black uppercase tracking-widest text-white/5">
          Electro Mostafa
        </span>
      </div>
    </section>
  )
}