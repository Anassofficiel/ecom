"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, Phone, X, Trash2, Plus, Minus } from "lucide-react"
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

  const totalItems = mounted ? cart.totalItems() : 0
  const cartItems = mounted ? cart.items : []
  const cartOpen = mounted ? cart.isOpen : false
  const totalPrice = mounted ? cart.totalPrice() : 0

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="bg-[#ff4d4f] text-white py-1.5 overflow-hidden relative border-b border-red-600 shadow-sm flex">
          <div className="animate-ticker-infinite whitespace-nowrap">
            <span className="inline-flex items-center gap-4 px-4">
              <span>Premium Quality</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5"><span className="text-white font-black italic">VENEZIA</span> 🇮🇹</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5"><span className="text-white font-black italic">KÖLN</span> 🇩🇪</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Meilleures Offres au Maroc</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Livraison Rapide</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="font-extrabold text-white">ELECTRO MANAGER</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Service Client 7j/7</span>
              <span className="text-gray-200 opacity-60">•</span>
            </span>

            <span className="inline-flex items-center gap-4 px-4">
              <span>Premium Quality</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5"><span className="text-white font-black italic">VENEZIA</span> 🇮🇹</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="flex items-center gap-1.5"><span className="text-white font-black italic">KÖLN</span> 🇩🇪</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Meilleures Offres au Maroc</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Livraison Rapide</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span className="font-extrabold text-white">ELECTRO MANAGER</span>
              <span className="text-gray-200 opacity-60">•</span>
              <span>Service Client 7j/7</span>
              <span className="text-gray-200 opacity-60">•</span>
            </span>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 h-16 flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 rounded-md"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-black text-red-600 uppercase tracking-tight leading-none">
                ELECTRO<br className="hidden" /> MANAGER
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-lg relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="hidden xl:flex items-center gap-2 text-sm text-gray-700 font-medium">
              <Phone className="h-4 w-4 text-red-600" />
              +212 6 08 78 87 82
            </div>

            <button
              onClick={cart.openCart}
              className="relative ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>

              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="hidden lg:block bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 h-11 flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <nav className="flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors border-b border-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {cartOpen && (
        <div className="fixed inset-0 bg-black/40 z-[60]" onClick={cart.closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-gray-900">Mon Panier ({totalItems})</h2>
          <button onClick={cart.closeCart} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingCart className="h-16 w-16 text-gray-200" />
              <p className="text-gray-500 text-sm font-medium">Votre panier est vide</p>
              <button
                onClick={cart.closeCart}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Continuer les achats
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-red-600 font-bold mt-0.5">{item.price.toLocaleString("fr-FR")} DH</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} className="h-6 w-6 border border-gray-300 rounded flex items-center justify-center hover:border-red-500">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                      <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} className="h-6 w-6 border border-gray-300 rounded flex items-center justify-center hover:border-red-500">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-gray-900">{(item.price * item.quantity).toLocaleString("fr-FR")} DH</span>
                    <button onClick={() => cart.removeItem(item.id)} className="text-gray-300 hover:text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 space-y-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total estimé</span>
              <span className="text-xl font-bold text-red-600">{totalPrice.toLocaleString("fr-FR")} DH</span>
            </div>
            <p className="text-[11px] text-gray-400 text-center">Livraison gratuite dès 1000 DH</p>
            <Link
              href="/checkout"
              onClick={cart.closeCart}
              className="block w-full bg-red-600 hover:bg-red-700 text-white text-center font-bold py-3.5 rounded-lg transition-colors text-sm"
            >
              Passer à la caisse →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}