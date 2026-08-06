"use client"

import Image from "next/image"
import {
  Check,
  MessageCircle,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"

import { packs, type Pack, type Product } from "@/lib/data"
import { useStore } from "@/lib/store"

const WHATSAPP_NUMBER = "212658416769"

/*
 * Formatter ثابت باش السيرفر والمتصفح يعطيو نفس النتيجة.
 * كيتجنب Hydration Error ديال 6,999 / 6 999.
 */
function formatPrice(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

/*
 * تحويل Pack إلى Product باش يتزاد للسلة كعنصر واحد.
 */
function packToProduct(pack: Pack): Product {
  return {
    id: pack.id,
    slug: pack.slug ?? pack.id,
    name: pack.name,
    category: "Packs",

    price: pack.packPrice,
    originalPrice: pack.originalPrice,
    discount: pack.discount,

    rating: 5,
    reviews: 245,

    image: pack.heroImage ?? pack.images[0] ?? "",
    hoverImage:
      pack.images[0] ??
      pack.heroImage ??
      "",

    // صور المنتجات المنفصلة فقط، بلا صورة Hero.
    images: pack.images,

    stockStatus: "in-stock",
    inStock: true,

    description: pack.description,

    specs: {
      Type: "Pack électroménager",
      Produits: pack.products.join(" + "),
      Garantie: "2 ans",
      Livraison: "Gratuite",
      Économie: `${formatPrice(
        pack.originalPrice - pack.packPrice
      )} DH`,
    },

    isPromotion: true,
    isActive: true,
  }
}

/*
 * صورة الباك الرئيسية + الصور الصغيرة.
 */
function PackGallery({ pack }: { pack: Pack }) {
  const visibleImages = pack.images.slice(0, 4)
  const remainingProducts = Math.max(pack.images.length - 4, 0)

  return (
    <div className="bg-white">
      {/* HERO IMAGE */}
      <div
        className="
          relative
          h-[370px]
          overflow-hidden
          bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.16),transparent_58%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]
          sm:h-[430px]
          md:h-[390px]
          xl:h-[380px]
        "
      >
        {/* Golden corner */}
        <div
          className="
            pointer-events-none
            absolute
            left-5
            top-5
            z-10
            h-20
            w-20
            rounded-tl-[28px]
            border-l-[3px]
            border-t-[3px]
            border-amber-400
          "
        />

        {/* Red corner */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-5
            right-5
            z-10
            h-20
            w-20
            rounded-br-[28px]
            border-b-[3px]
            border-r-[3px]
            border-red-500
          "
        />

        {/* Decorative glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-10
            h-40
            w-40
            -translate-x-1/2
            rounded-full
            bg-amber-300/20
            blur-3xl
          "
        />

        {/* Shadow below product */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-7
            left-12
            right-12
            h-8
            rounded-full
            bg-black/10
            blur-2xl
          "
        />

        <Image
          src={pack.heroImage ?? pack.images[0]}
          alt={pack.name}
          fill
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1280px) 50vw,
            33vw
          "
          className="
            object-contain
            p-4
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.035]
            sm:p-6
          "
          priority={pack.id === "pack1"}
        />

        <div
          className="
            absolute
            bottom-4
            left-1/2
            z-20
            -translate-x-1/2
            whitespace-nowrap
            rounded-full
            border
            border-white/80
            bg-white/90
            px-4
            py-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.16em]
            text-gray-700
            shadow-lg
            backdrop-blur
          "
        >
          Pack complet
        </div>
      </div>

      {/* SMALL PRODUCT IMAGES */}
      <div
        className="
          border-y
          border-gray-100
          bg-gradient-to-b
          from-white
          to-gray-50
          px-3
          py-4
          sm:px-4
        "
      >
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {visibleImages.map((image, index) => (
            <div
              key={`${pack.id}-product-${index}`}
              className="group/product min-w-0"
            >
              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition
                  duration-300
                  group-hover/product:-translate-y-1
                  group-hover/product:border-red-200
                  group-hover/product:shadow-md
                "
              >
                <Image
                  src={image}
                  alt={
                    pack.products[index] ??
                    `Produit ${index + 1}`
                  }
                  fill
                  sizes="120px"
                  className="object-contain p-2 sm:p-3"
                />

                {index === 3 && remainingProducts > 0 && (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-gray-950/70
                      text-center
                      text-xs
                      font-black
                      text-white
                      backdrop-blur-[2px]
                    "
                  >
                    +{remainingProducts}
                    <br />
                    produits
                  </div>
                )}
              </div>

              <p
                className="
                  mt-2
                  line-clamp-2
                  min-h-8
                  text-center
                  text-[9px]
                  font-extrabold
                  leading-4
                  text-gray-600
                  sm:text-[10px]
                "
              >
                {pack.products[index] ??
                  `Produit ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/*
 * Card ديال Pack.
 */
function PackCard({ pack }: { pack: Pack }) {
  const addToCart = useStore((state) => state.addToCart)
  const setCartOpen = useStore((state) => state.setCartOpen)

  const savings = Math.max(
    pack.originalPrice - pack.packPrice,
    0
  )

  const handleAddToCart = () => {
    addToCart(packToProduct(pack), undefined, 1)
    setCartOpen(true)
  }

  const whatsappText = encodeURIComponent(
    `Bonjour, je suis intéressé par le pack "${pack.name}" au prix de ${formatPrice(
      pack.packPrice
    )} DH.`
  )

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-amber-300/80
        bg-white
        shadow-[0_18px_60px_rgba(15,23,42,0.10)]
        transition
        duration-500
        hover:-translate-y-2
        hover:border-red-300
        hover:shadow-[0_28px_80px_rgba(15,23,42,0.16)]
      "
    >
      {/* Inner shine */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-[30px]
          ring-1
          ring-inset
          ring-white/70
        "
      />

      {/* BADGE */}
      <div
        className="
          absolute
          left-4
          top-4
          z-40
          rounded-full
          bg-gradient-to-r
          from-gray-950
          to-gray-700
          px-4
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.14em]
          text-white
          shadow-xl
        "
      >
        {pack.badge ?? "Pack exclusif"}
      </div>

      {/* DISCOUNT */}
      <div
        className="
          absolute
          right-4
          top-4
          z-40
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-red-500
          via-red-600
          to-rose-800
          text-sm
          font-black
          text-white
          shadow-[0_10px_28px_rgba(220,38,38,0.38)]
          ring-4
          ring-white/80
        "
      >
        -{pack.discount}%
      </div>

      <PackGallery pack={pack} />

      {/* CONTENT */}
      <div className="p-5 sm:p-6">
        <h3
          className="
            text-2xl
            font-black
            uppercase
            leading-tight
            tracking-tight
            text-gray-950
          "
        >
          {pack.name}
        </h3>

        <p
          className="
            mt-2
            line-clamp-2
            text-sm
            leading-6
            text-gray-500
          "
        >
          {pack.description}
        </p>

        {/* RATING */}
        <div className="mt-4 flex items-center gap-2">
          <div
            className="flex text-amber-400"
            aria-label="5 étoiles"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`${pack.id}-star-${index}`}
                size={16}
                fill="currentColor"
                strokeWidth={1.8}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-gray-500">
            (245 avis)
          </span>
        </div>

        {/* ADVANTAGES */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div
            className="
              flex
              min-h-[82px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              px-2
              py-3
              text-center
              shadow-sm
            "
          >
            <Check className="mb-1 h-5 w-5 text-emerald-600" />

            <span className="text-[11px] font-black leading-4 text-gray-800">
              {pack.products.length} équipements
            </span>
          </div>

          <div
            className="
              flex
              min-h-[82px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              px-2
              py-3
              text-center
              shadow-sm
            "
          >
            <ShieldCheck className="mb-1 h-5 w-5 text-emerald-600" />

            <span className="text-[11px] font-black leading-4 text-gray-800">
              Garantie 2 ans
            </span>
          </div>

          <div
            className="
              flex
              min-h-[82px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              px-2
              py-3
              text-center
              shadow-sm
            "
          >
            <Truck className="mb-1 h-5 w-5 text-emerald-600" />

            <span className="text-[11px] font-black leading-4 text-gray-800">
              Livraison gratuite
            </span>
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-2">
          <span
            className="
              text-3xl
              font-black
              tracking-tight
              text-red-600
              sm:text-[34px]
            "
          >
            {formatPrice(pack.packPrice)} DH
          </span>

          <span
            className="
              pb-1
              text-sm
              font-bold
              text-gray-400
              line-through
            "
          >
            {formatPrice(pack.originalPrice)} DH
          </span>

          {savings > 0 && (
            <span
              className="
                mb-0.5
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-black
                text-emerald-700
              "
            >
              -{formatPrice(savings)} DH
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Commander ${pack.name} sur WhatsApp`}
            className="
              inline-flex
              min-h-[54px]
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-green-600
              to-emerald-500
              px-3
              py-3.5
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-green-600/25
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-green-600/35
              active:translate-y-0
            "
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Ajouter ${pack.name} au panier`}
            className="
              inline-flex
              min-h-[54px]
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-red-600
              to-rose-700
              px-3
              py-3.5
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-red-600/25
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-red-600/35
              active:translate-y-0
            "
          >
            <ShoppingCart className="h-5 w-5" />
            Ajouter
          </button>
        </div>
      </div>
    </article>
  )
}

export function PacksSection() {
  return (
    <section
      id="packs"
      className="
        w-full
        overflow-hidden
        bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.07),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fafc_50%,#ffffff_100%)]
        py-14
        sm:py-16
      "
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-amber-200
              bg-amber-50
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-amber-800
              shadow-sm
            "
          >
            Offres groupées
          </span>

          <h2
            className="
              mt-4
              text-3xl
              font-black
              uppercase
              tracking-tight
              text-gray-950
              sm:text-4xl
              lg:text-5xl
            "
          >
            Nos Packs Exclusifs
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-500
              sm:text-base
            "
          >
            Des packs complets, des économies importantes, une
            garantie officielle et une livraison gratuite partout
            au Maroc.
          </p>
        </div>

        {/* PACKS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {packs.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  )
}