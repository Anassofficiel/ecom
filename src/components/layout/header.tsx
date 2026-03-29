"use client"

import * as React from "react"
import Link from "next/link"
import {
  Search,
  ShoppingCart,
  Menu,
  Phone,
  X,
  Trash2,
  Plus,
  Minus,
} from "lucide-react"
import { useCart } from "@/lib/store"

const navItems = [
  { name: "🏠 Accueil", href: "/" },
  { name: "❄️ Réfrigérateurs", href: "/category/refrigerators" },
  { name: "🧺 Lave-linge", href: "/category/washing-machines" },
  { name: "📺 Télévisions", href: "/category/televisions" },
  { name: "🍟 Friteuses à Air", href: "/category/air-fryers" },
  { name: "☕ Cafetières", href: "/category/coffee-machines" },
  { name: "🍳 Cuisine", href: "/category/kitchen-appliances" },
  { name: "🔥 Promotions", href: "/#promotions" },
  { name: "📍 Nos Magasins", href: "/#magasins" },
  { name: "🎁 Packs / Offres", href: "/#packs" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  const cart = useCart()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = mounted ? cart.totalItems() : 0
  const cartItems = mounted ? cart.items : []
  const cartOpen = mounted ? cart.isOpen : false
  const totalPrice = mounted ? cart.totalPrice() : 0

  const closeMobileMenu = () => setMobileOpen(false)
  const toggleMobileMenu = () => setMobileOpen((prev) => !prev)

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* Top ticker - خليه كما هو كيتحرك */}
        <div className="relative flex overflow-hidden border-b border-red-600 bg-[#ff4d4f] py-1.5 text-white shadow-sm">
          <div className="animate-ticker-infinite whitespace-nowrap" aria-hidden="true">
            <span className="inline-flex items-center gap-4 px-4">
              <span>Premium Quality</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5">
                <span className="font-black italic text-white">VENEZIA</span> 🇮🇹
              </span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5">
                <span className="font-black italic text-white">KÖLN</span> 🇩🇪
              </span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Meilleures Offres au Maroc</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Livraison Rapide</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="font-extrabold text-white">ELECTRO MOSTAFA</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Service Client 7j/7</span>
              <span className="text-gray-200 opacity-60">•</span>
            </span>

            <span className="inline-flex items-center gap-4 px-4">
              <span>Premium Quality</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5">
                <span className="font-black italic text-white">VENEZIA</span> 🇮🇹
              </span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5">
                <span className="font-black italic text-white">KÖLN</span> 🇩🇪
              </span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Meilleures Offres au Maroc</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Livraison Rapide</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="font-extrabold text-white">ELECTRO MOSTAFA</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Service Client 7j/7</span>
              <span className="text-gray-200 opacity-60">•</span>
            </span>
          </div>
        </div>

        {/* Main header */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto flex h-16 items-center gap-4 px-4">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="rounded-md p-2 text-gray-600 hover:text-red-600 lg:hidden"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link
              href="/"
              className="flex-shrink-0"
              aria-label="Retour à l'accueil Electro Mostafa"
              title="Electro Mostafa Maroc"
            >
              <span className="text-xl font-black uppercase leading-none tracking-tight text-red-600">
                ELECTRO MOSTAFA
              </span>
            </Link>

            <div
              className="relative hidden max-w-lg flex-1 md:flex"
              role="search"
              aria-label="Recherche produits"
            >
              <label htmlFor="header-search" className="sr-only">
                Rechercher un produit
              </label>
              <input
                id="header-search"
                type="text"
                placeholder="Rechercher un produit..."
                className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-200"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            <a
              href="tel:+212608788782"
              className="hidden items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-red-600 xl:flex"
              aria-label="Appeler Electro Mostafa"
            >
              <Phone className="h-4 w-4 text-red-600" />
              +212 6 08 78 87 82
            </a>

            <button
              type="button"
              onClick={cart.openCart}
              aria-label={`Ouvrir le panier${
                mounted && totalItems > 0
                  ? `, ${totalItems} article${totalItems > 1 ? "s" : ""}`
                  : ""
              }`}
              className="relative ml-auto flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>

              {mounted && totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-gray-900">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden border-b border-gray-100 bg-white lg:block"
          aria-label="Navigation principale"
        >
          <div className="container mx-auto flex h-11 items-center gap-1 overflow-x-auto px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 bg-white shadow-lg lg:hidden"
          >
            <div className="border-b border-gray-100 px-4 py-3">
              <div className="relative" role="search" aria-label="Recherche mobile">
                <label htmlFor="mobile-search" className="sr-only">
                  Rechercher
                </label>
                <input
                  id="mobile-search"
                  type="text"
                  placeholder="Rechercher..."
                  className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <nav className="flex flex-col py-2" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="border-b border-gray-50 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Cart overlay */}
      {cartOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={cart.closeCart}
          aria-label="Fermer le panier"
        />
      )}

      {/* Cart drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out will-change-transform sm:w-[400px] ${
          cartOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">Mon Panier ({totalItems})</h2>
          <button
            type="button"
            onClick={cart.closeCart}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-200" />
              <p className="text-sm font-medium text-gray-500">Votre panier est vide</p>
              <button
                type="button"
                onClick={cart.closeCart}
                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Continuer les achats
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                      decoding="async"
                      width={64}
                      height={64}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-red-600">
                      {item.price.toLocaleString("fr-FR")} DH
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 hover:border-red-500"
                        aria-label={`Réduire la quantité de ${item.name}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="w-5 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 hover:border-red-500"
                        aria-label={`Augmenter la quantité de ${item.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} DH
                    </span>
                    <button
                      type="button"
                      onClick={() => cart.removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500"
                      aria-label={`Supprimer ${item.name} du panier`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 bg-gray-50 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total estimé</span>
              <span className="text-xl font-bold text-red-600">
                {totalPrice.toLocaleString("fr-FR")} DH
              </span>
            </div>

            <p className="text-center text-[11px] text-gray-400">
              Livraison gratuite dès 1000 DH
            </p>

            <Link
              href="/checkout"
              onClick={cart.closeCart}
              className="block w-full rounded-lg bg-red-600 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              Passer à la caisse →
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}