"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getProductById, type Product } from "@/lib/data"
import { ProductGallery } from "@/components/product/product-gallery"
import { RelatedProducts } from "@/components/product/related-products"
import {
  Star,
  Truck,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
  ChevronRight,
} from "lucide-react"
import { useCart } from "@/lib/store"
import { cn } from "@/lib/utils"

const WHATSAPP_NUMBER = "212608788782"
const BASE_URL = "https://veneziaelectro.vercel.app"

const stockConfig = {
  "in-stock": {
    label: "En Stock",
    className: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  "low-stock": {
    label: "Stock Limité",
    className: "text-amber-700 bg-amber-50 border-amber-200",
  },
  "out-of-stock": {
    label: "Rupture de Stock",
    className: "text-red-700 bg-red-50 border-red-200",
  },
} as const

type ProductMeta = Product & {
  isPromotion?: boolean
  originalPrice?: number
  discount?: number
  specs?: Record<string, string>
}

function stripEmojis(text: string) {
  return text
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
      ""
    )
    .replace(/\s+/g, " ")
    .trim()
}

function categoryToSlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-")
}

function categoryDisplayName(category: string) {
  const map: Record<string, string> = {
    Refrigerators: "Réfrigérateurs",
    "Washing Machines": "Lave-linge",
    Televisions: "Télévisions",
    "Air Fryers": "Friteuses à Air",
    "Coffee Machines": "Cafetières",
    "Kitchen Appliances": "Cuisine & Petit Électroménager",
    Ovens: "Fours",
    Dishwashers: "Lave-vaisselle",
    "Small Appliances": "Petit Électroménager",
    Cookware: "Ustensiles de Cuisine",
  }

  return map[category] ?? category
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = (params?.id as string) ?? ""

  const { addItem } = useCart()
  const [product, setProduct] = React.useState<Product | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [added, setAdded] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"description" | "specs" | "reviews">(
    "description"
  )

  React.useEffect(() => {
    let active = true

    const loadProduct = async () => {
      try {
        setIsLoading(true)
        const foundProduct = await getProductById(id)

        if (!active) return

        if (!foundProduct) {
          router.replace("/")
          return
        }

        setProduct(foundProduct)
      } catch (error) {
        console.error("Failed to load product:", error)
        if (active) {
          router.replace("/")
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    if (id) {
      loadProduct()
    } else {
      router.replace("/")
    }

    return () => {
      active = false
    }
  }, [id, router])

  React.useEffect(() => {
    if (!product) return

    const cleanDescription = stripEmojis(product.description)
    const categoryLabel = categoryDisplayName(product.category)
    const title = `${product.name} | ${categoryLabel} au Maroc | Venezia Electro Maroc`
    const description = `${product.name} chez Venezia Electro au Maroc. Prix: ${product.price.toLocaleString(
      "fr-FR"
    )} DH. ${cleanDescription}`.slice(0, 160)

    document.title = title

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null

      if (!el) {
        el = document.createElement("meta")
        Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value))
        document.head.appendChild(el)
      }

      return el
    }

    let metaDescription = document.head.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null
    if (!metaDescription) {
      metaDescription = document.createElement("meta")
      metaDescription.setAttribute("name", "description")
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute("content", description)

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", `${BASE_URL}/product/${product.id}`)

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: "og:title" })
    ogTitle.setAttribute("content", title)

    const ogDescription = ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    })
    ogDescription.setAttribute("content", description)

    const ogUrl = ensureMeta('meta[property="og:url"]', { property: "og:url" })
    ogUrl.setAttribute("content", `${BASE_URL}/product/${product.id}`)

    const ogType = ensureMeta('meta[property="og:type"]', { property: "og:type" })
    ogType.setAttribute("content", "product")

    const ogImage = ensureMeta('meta[property="og:image"]', { property: "og:image" })
    ogImage.setAttribute("content", product.image)

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
    })
    twitterTitle.setAttribute("content", title)

    const twitterDescription = ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    })
    twitterDescription.setAttribute("content", description)

    const twitterImage = ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
    })
    twitterImage.setAttribute("content", product.image)
  }, [product])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-64 rounded bg-gray-200" />
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="aspect-square rounded-2xl bg-gray-100" />
                <div className="space-y-4">
                  <div className="h-6 w-24 rounded bg-gray-200" />
                  <div className="h-10 w-3/4 rounded bg-gray-200" />
                  <div className="h-6 w-40 rounded bg-gray-200" />
                  <div className="h-12 w-56 rounded bg-gray-200" />
                  <div className="h-24 w-full rounded bg-gray-200" />
                  <div className="h-12 w-full rounded bg-gray-200" />
                  <div className="h-12 w-full rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) return null

  const productMeta = product as ProductMeta
  const stock = stockConfig[product.stockStatus] ?? stockConfig["in-stock"]
  const galleryImages = [product.image, product.hoverImage].filter(Boolean)
  const categorySlug = categoryToSlug(product.category)
  const categoryLabel = categoryDisplayName(product.category)
  const cleanDescription = stripEmojis(product.description)

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé par ce produit: ${product.name} (${product.price.toLocaleString(
      "fr-FR"
    )} DH) — ${typeof window !== "undefined" ? window.location.href : ""}`
  )

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: galleryImages,
    description: cleanDescription,
    sku: product.id,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.name.includes("KOLN") || product.name.includes("KÖLN")
        ? "KOLN"
        : product.name.includes("HENSIM")
          ? "HENSIM"
          : "VENEZIA",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.id}`,
      priceCurrency: "MAD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${BASE_URL}/category/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/product/${product.id}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-red-600">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/category/${encodeURIComponent(categorySlug)}`}
            className="hover:text-red-600"
          >
            {categoryLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-gray-700">{product.name}</span>
        </nav>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
           <ProductGallery images={galleryImages} productName={product.name} />

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "self-start rounded-full border px-3 py-1 text-xs font-semibold",
                    stock.className
                  )}
                >
                  {stock.label}
                </span>

                {productMeta.isPromotion && (
                  <span className="self-start rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    Promotion
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
                {product.name}
              </h1>

              <p className="max-w-2xl text-sm leading-6 text-gray-600">
                Achetez {product.name} chez Venezia Electro au Maroc. {cleanDescription}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {product.rating?.toFixed(1) ?? "4.8"}
                </span>
                <span className="text-sm text-gray-500">({product.reviews} avis)</span>
              </div>

              <div className="flex items-baseline gap-3 border-y border-gray-100 py-3">
                <span className="text-3xl font-bold text-red-600">
                  {product.price.toLocaleString("fr-FR")} DH
                </span>

                {productMeta.originalPrice && (
                  <span className="text-lg text-gray-900 line-through">
                    {productMeta.originalPrice.toLocaleString("fr-FR")} DH
                  </span>
                )}

                {productMeta.discount && (
                  <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                    -{productMeta.discount}%
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-red-600" />
                  Livraison Express
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-red-600" />
                  Garantie 2 ans
                </div>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 text-sm leading-6 text-gray-700">
                <strong className="text-gray-900">{product.name}</strong> fait partie de notre
                sélection premium de {categoryLabel.toLowerCase()} au Maroc, avec livraison rapide,
                disponibilité en stock selon arrivage et service client Venezia Electro.
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Commander via WhatsApp
                </a>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || added}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors",
                    !product.inStock
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : added
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {!product.inStock
                    ? "Rupture de Stock"
                    : added
                      ? "Ajouté au panier ✓"
                      : "Ajouter au Panier"}
                </button>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <CreditCard className="h-4 w-4" />
                  Passer à la caisse →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="mb-6 flex gap-4 border-b border-gray-200">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "border-b-2 pb-3 text-sm font-semibold capitalize transition-colors -mb-px",
                  activeTab === tab
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                )}
              >
                {tab === "specs"
                  ? "Spécifications"
                  : tab === "description"
                    ? "Description"
                    : "Avis Clients"}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-3xl space-y-4 text-gray-600">
              <p className="leading-relaxed">{product.description}</p>
              <p className="text-sm leading-6">
                Ce produit appartient à notre catégorie {categoryLabel.toLowerCase()} chez Venezia
                Electro Maroc. Il est sélectionné pour sa qualité, son design et son rapport
                qualité-prix.
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-lg divide-y divide-gray-100">
              {productMeta.specs && Object.keys(productMeta.specs).length > 0 ? (
                Object.entries(productMeta.specs).map(([key, val]) => (
                  <div key={key} className="flex gap-4 py-3">
                    <span className="w-40 text-sm font-medium text-gray-500">{key}</span>
                    <span className="text-sm font-semibold text-gray-800">{val}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Pas de spécifications disponibles.</p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-xl space-y-4">
              {[
                {
                  name: "Ahmed B.",
                  comment: "Excellent produit ! Exactement comme décrit. Livraison rapide.",
                },
                {
                  name: "Fatima Z.",
                  comment: "Très bonne qualité. Je recommande vivement.",
                },
                {
                  name: "Karim L.",
                  comment: "Vaut chaque dirham. Service client exceptionnel.",
                },
              ].map((r, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <RelatedProducts productId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  )
}