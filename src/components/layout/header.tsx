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
  { name: "📺 Télévisions", href: "/category/televisions" },
  { name: "❄️ Réfrigérateurs", href: "/category/refrigerators" },
  { name: "🔥 Fours", href: "/category/ovens" },
  { name: "🧺 Machines à laver", href: "/category/washing-machines" },
  { name: "🍟 Friteuses à air", href: "/category/air-fryers" },
  { name: "☕ Machines à café", href: "/category/coffee-machines" },
  { name: "🍳 Petit électroménager", href: "/category/kitchen-appliances" },
  { name: "🏷️ Promotions", href: "/#promotions" },
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
        className={`fixed left-0 right-0 top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"
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

        <div className="border-b border-gray-100 bg-white">
          <div className="container mx-auto flex h-12 items-center justify-between px-4">

            {/* LEFT: MENU + LOGO */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="rounded-md p-2 text-gray-600 hover:text-red-600 lg:hidden"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <Link href="/" className="flex items-center">
                <span className="relative inline-block group cursor-pointer">

                  {/* TEXT */}
                  <span className="relative z-10 text-xl sm:text-2xl font-black tracking-widest uppercase
    bg-gradient-to-r from-red-600 via-orange-500 to-red-700 
    bg-[length:200%_200%] bg-clip-text text-transparent
    animate-gradient-move
    transition-all duration-300
    group-hover:scale-105
    group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]
  ">
                    ELECTRO MOSTAFA
                  </span>

                  {/* GLOW LIGHT */}
                  <span className="absolute inset-0 rounded-md blur-xl opacity-20 
    bg-gradient-to-r from-red-500 to-orange-500
    transition-all duration-500
    group-hover:opacity-40
    group-hover:scale-110
  "></span>

                  {/* UNDERLINE ANIMATION */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 
    bg-gradient-to-r from-red-600 to-orange-500
    transition-all duration-500
    group-hover:w-full
  "></span>

                </span>
              </Link>
            </div>

            {/* CENTER: NAV (desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 relative group"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* RIGHT: PANIER */}
            <button
              type="button"
              onClick={cart.openCart}
              className="relative flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-md hover:scale-105 hover:bg-red-700 transition-all duration-200"
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



        {/* Mobile nav */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 bg-white shadow-xl animate-slide-down lg:hidden"
          >

            <nav className="flex flex-col py-3 bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-6 py-4 text-[15px] font-semibold text-gray-800 border-b border-gray-100 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
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
        className={`fixed right-0 top-0 z-[70] flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out will-change-transform sm:w-[400px] ${cartOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
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