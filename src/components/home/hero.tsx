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
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative min-h-[680px] w-full md:min-h-[720px]">
        <img
          src={heroSlide.image}
          alt={heroSlide.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

        <div className="container relative z-10 mx-auto flex min-h-[680px] items-center px-4 py-20 md:min-h-[720px]">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block rounded-full border border-red-500/40 bg-red-600/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400">
              Electro Mostafa 55
            </span>

            <h1 className="text-4xl font-black uppercase italic leading-tight tracking-tight text-white md:text-6xl xl:text-7xl">
              {heroSlide.title}
              <br />
              <span className="text-red-600">{heroSlide.subtitle}</span>
            </h1>

            <p className="max-w-2xl text-base leading-8 text-zinc-200 md:text-xl">
              {heroSlide.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#promotions"
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-red-700"
              >
                Voir les promotions
              </Link>

              <Link
                href="/#packs"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Découvrir les packs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}