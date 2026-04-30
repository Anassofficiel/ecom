import Link from "next/link"
import {
  MapPin,
  Phone,
  Clock3,
  ExternalLink,
  MessageCircle,
  ShoppingBag,
  ChevronRight,
} from "lucide-react"

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/wny8868/",
    className:
      "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:scale-105 hover:shadow-[0_10px_30px_rgba(221,42,123,0.35)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.62a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@electromostafa55",
    className:
      "bg-black hover:scale-105 hover:shadow-[0_10px_30px_rgba(254,44,85,0.28)] border border-white/10",
    icon: (
      <svg viewBox="0 0 48 48" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M32.5 6c.3 2.4 1.2 4.3 2.8 5.8 1.6 1.4 3.4 2.2 5.6 2.4v5.3c-2.7-.1-5.2-.9-7.5-2.4v10.9c0 2.4-.7 4.6-2 6.5a12 12 0 0 1-5.3 4.3c-2.2 1-4.5 1.3-6.9 1-2.4-.3-4.5-1.3-6.3-2.9a11.9 11.9 0 0 1-3.7-6.1c-.5-2.3-.3-4.6.6-6.8A12 12 0 0 1 14 19c2-1.3 4.2-2 6.5-2.1v5.6a6.1 6.1 0 0 0-4.9 2.1 6 6 0 0 0-1.5 4.8c.2 1.7 1 3.2 2.4 4.2 1.3 1.1 2.9 1.6 4.6 1.4a6.1 6.1 0 0 0 4.1-2.1 6 6 0 0 0 1.5-4V6h5.8Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100089842077600",
    className:
      "bg-[#1877F2] hover:scale-105 hover:shadow-[0_10px_30px_rgba(24,119,242,0.35)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V11H8.3v3h2.6v8h2.6Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/اواني مصطفى",
    className:
      "bg-[#FF0000] hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,0,0,0.35)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M21.6 7.2a2.96 2.96 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A2.96 2.96 0 0 0 2.4 7.2C1.9 9 1.9 12 1.9 12s0 3 .5 4.8a2.96 2.96 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a2.96 2.96 0 0 0 2.1-2.1c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/212608788782",
    className:
      "bg-[#25D366] hover:scale-105 hover:shadow-[0_10px_30px_rgba(37,211,102,0.35)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.07 0C5.54 0 .22 5.31.22 11.84c0 2.08.54 4.12 1.57 5.91L0 24l6.42-1.68a11.9 11.9 0 0 0 5.65 1.44h.01c6.53 0 11.85-5.31 11.85-11.84 0-3.16-1.23-6.12-3.41-8.44Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.81 1 1.02-3.72-.23-.38a9.88 9.88 0 0 1-1.51-5.28C2.13 6.36 6.58 1.92 12.06 1.92c2.65 0 5.14 1.03 7.02 2.91A9.84 9.84 0 0 1 22 11.84c0 5.48-4.45 9.94-9.93 9.94Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.22 5.09 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    ),
  },
]

const stores = [
  {
    name: "Electro Mostafa — Casablanca",
    address: "Bd Bassatine, Tit Mellil, Casablanca",
    hours: "Lun–Sam : 9h00 – 19h00 | Dim : 10h00 – 17h00",
    mapUrl:
      "https://www.google.com/maps/place/Bd+Bassatine,+Tit+Mellil/@33.5491441,-7.4848297,17z/data=!4m6!3m5!1s0xda63523cf416c45:0xca8831957dc753a4!8m2!3d33.5491441!4d-7.4822548!16s%2Fg%2F1tk9s3jd?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Electro Mostafa — Marrakech",
    address: "HXP5+R7X, Marrakech, Maroc",
    hours: "Lun–Sam : 9h00 – 19h30 | Dim : 10h00 – 17h00",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=31.587111,-8.041778",
  },
]

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-300">
      {/* Top CTA */}
      <div className="container mx-auto px-4 pt-10">
        <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/40 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Electro Mostafa Maroc
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                Électroménager premium, livraison rapide et service client au Maroc
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                Découvrez nos réfrigérateurs, lave-linge, téléviseurs, air fryers,
                cafetières et équipements de cuisine. Visitez nos showrooms à
                Casablanca et Marrakech ou commandez directement via WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/212608788782"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:brightness-105"
                aria-label="Commander via WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                Commander via WhatsApp
              </a>

              <Link
                href="/#magasins"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-white transition hover:border-red-500 hover:text-red-400"
              >
                <MapPin className="h-4 w-4" />
                Voir nos magasins
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 xl:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <span className="text-3xl font-black italic tracking-tight text-red-500">
              ELECTRO MOSTAFA
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
            Electro Mostafa est votre boutique d’électroménager au Maroc pour les
            réfrigérateurs, machines à laver, téléviseurs, cuisine et offres
            spéciales. Retrouvez nos promotions, packs exclusifs et conseils en
            magasin.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={item.name}
                title={item.name}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white transition duration-300 ${item.className}`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-red-400" />
              <div>
                <p className="text-sm font-semibold text-white">Téléphone / WhatsApp</p>
                <a
                  href="tel:+212508788782"
                  className="mt-1 block text-sm text-zinc-400 transition hover:text-white"
                >
                  +212 508788782
                </a>
                <a
                  href="https://wa.me/212608788782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-green-400 transition hover:text-green-300"
                >
                  Ouvrir WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Useful links */}
        <nav aria-label="Liens utiles">
          <h3 className="text-lg font-bold text-white">Liens utiles</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/" className="inline-flex items-center gap-2 transition hover:text-red-400">
                <ChevronRight className="h-4 w-4" />
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/#promotions"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ChevronRight className="h-4 w-4" />
                Promotions
              </Link>
            </li>
            <li>
              <Link href="/#packs" className="inline-flex items-center gap-2 transition hover:text-red-400">
                <ChevronRight className="h-4 w-4" />
                Packs / Offres
              </Link>
            </li>
            <li>
              <Link
                href="/#magasins"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ChevronRight className="h-4 w-4" />
                Nos magasins
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ChevronRight className="h-4 w-4" />
                Passer à la caisse
              </Link>
            </li>
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Catégories populaires">
          <h3 className="text-lg font-bold text-white">Catégories populaires</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                href="/category/refrigerators"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Refrigerators
              </Link>
            </li>
            <li>
              <Link
                href="/category/washing-machines"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Washing Machines
              </Link>
            </li>
            <li>
              <Link
                href="/category/televisions"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Televisions
              </Link>
            </li>
            <li>
              <Link
                href="/category/ovens"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Ovens
              </Link>
            </li>
            <li>
              <Link
                href="/category/air-fryers"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Air Fryers
              </Link>
            </li>
            <li>
              <Link
                href="/category/coffee-machines"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Coffee Machines
              </Link>
            </li>
            <li>
              <Link
                href="/category/kitchen-appliances"
                className="inline-flex items-center gap-2 transition hover:text-red-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Kitchen Appliances
              </Link>
            </li>
          </ul>
        </nav>

        {/* Stores */}
        <div>
          <h3 className="text-lg font-bold text-white">Nos showrooms au Maroc</h3>

          <div className="mt-5 space-y-4">
            {stores.map((store) => (
              <div
                key={store.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"
              >
                <h4 className="text-base font-bold text-white">{store.name}</h4>

                <address className="mt-3 not-italic space-y-3 text-sm text-zinc-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span>{store.address}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span>{store.hours}</span>
                  </div>
                </address>

                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ouvrir dans Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Electro Mostafa Maroc. Tous droits réservés.</p>
          <p>Casablanca • Marrakech • Électroménager • Téléviseurs • Cuisine • Livraison rapide</p>
        </div>
      </div>
    </footer>
  )
}