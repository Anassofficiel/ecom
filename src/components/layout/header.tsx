"use client"

import * as React from "react"
import Link from "next/link"
import {
  ShoppingCart,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
} from "lucide-react"
import { useStore } from "@/lib/store"

const navItems = [
  { icon: "🏠", name: "Accueil", href: "/" },
  { icon: "❄️", name: "Refrigerators", href: "/category/refrigerators" },
  { icon: "🧺", name: "Washing Machines", href: "/category/washing-machines" },
  { icon: "📺", name: "Televisions", href: "/category/televisions" },
  { icon: "🔥", name: "Ovens", href: "/category/ovens" },
  { icon: "🍟", name: "Air Fryers", href: "/category/air-fryers" },
  { icon: "☕", name: "Coffee Machines", href: "/category/coffee-machines" },
]

const specialNavItems = [
  { icon: "🏷️", name: "Promotions", href: "/#promotions" },
  { icon: "🎁", name: "Packs", href: "/#packs" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  const cart = useStore((state) => state.cart)
  const isCartOpen = useStore((state) => state.isCartOpen)
  const setCartOpen = useStore((state) => state.setCartOpen)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)

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

  const totalItems = mounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0

  const cartItems = mounted ? cart : []
  const cartOpen = mounted ? isCartOpen : false

  const totalPrice = mounted
    ? cart.reduce(
      (acc, item) =>
        acc + (item.variant?.price || item.product.price) * item.quantity,
      0
    )
    : 0

  const closeMobileMenu = () => setMobileOpen(false)
  const toggleMobileMenu = () => setMobileOpen((prev) => !prev)

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"
          }`}
      >
        {/* Top ticker */}
        <div className="relative flex overflow-hidden border-b border-red-600 bg-[#ff4d4f] py-1 text-white shadow-sm">
          <div
            className="animate-ticker-infinite whitespace-nowrap text-sm font-semibold"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-4 px-4">
              <span>⭐ Premium Quality</span>
              <span className="text-white/60">•</span>
              <span className="font-black italic text-white">VENEZIA 🇮🇹</span>
              <span className="text-white/60">•</span>
              <span className="font-black italic text-white">KÖLN 🇩🇪</span>
              <span className="text-white/60">•</span>
              <span>🏷️ Meilleures Offres au Maroc</span>
              <span className="text-white/60">•</span>
              <span>🚚 Livraison Rapide</span>
              <span className="text-white/60">•</span>
              <span className="font-extrabold text-white">⚡ ELECTRO MOSTAFA</span>
              <span className="text-white/60">•</span>
              <span>☎️ Service Client 7j/7</span>
              <span className="text-white/60">•</span>
            </span>

            <span className="inline-flex items-center gap-4 px-4">
              <span>⭐ Premium Quality</span>
              <span className="text-white/60">•</span>
              <span className="font-black italic text-white">VENEZIA 🇮🇹</span>
              <span className="text-white/60">•</span>
              <span className="font-black italic text-white">KÖLN 🇩🇪</span>
              <span className="text-white/60">•</span>
              <span>🏷️ Meilleures Offres au Maroc</span>
              <span className="text-white/60">•</span>
              <span>🚚 Livraison Rapide</span>
              <span className="text-white/60">•</span>
              <span className="font-extrabold text-white">⚡ ELECTRO MOSTAFA</span>
              <span className="text-white/60">•</span>
              <span>☎️ Service Client 7j/7</span>
              <span className="text-white/60">•</span>
            </span>
          </div>
        </div>

        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex min-h-[68px] w-full max-w-[1920px] items-center justify-between gap-3 px-5">
            {/* Logo + Mobile menu */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="rounded-md p-2 text-gray-600 hover:text-red-600 xl:hidden"
                aria-label="Ouvrir le menu"
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <Link href="/" className="flex items-center">
                <span className="group relative inline-block cursor-pointer whitespace-nowrap">
                  <span
                    className="relative z-10 bg-gradient-to-r from-red-600 via-orange-500 to-red-700 
                    bg-[length:200%_200%] bg-clip-text text-[17px] font-black uppercase tracking-[0.20em]
                    text-transparent transition-all duration-300 animate-gradient-move
                    group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.45)]
                    sm:text-[19px] lg:text-[20px] 2xl:text-[22px]"
                  >
                    ELECTRO MOSTAFA 55
                  </span>

                  <span
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-red-500 to-orange-500
                    opacity-20 blur-xl transition-all duration-500 group-hover:opacity-35"
                  />

                  <span
                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r
                    from-red-600 to-orange-500 transition-all duration-500 group-hover:w-full"
                  />
                </span>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative inline-flex items-center gap-1 rounded-full px-1.5 py-2 text-[10.5px] font-bold leading-tight text-gray-700 transition-all duration-300 hover:bg-red-50 hover:text-red-600 2xl:px-2 2xl:text-[11.5px]"
                >
                  <span className="text-[14px] leading-none" aria-hidden="true">
                    {item.icon}
                  </span>

                  <span className="whitespace-nowrap">{item.name}</span>

                  <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 rounded-full bg-red-600 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}

              {specialNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="ml-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-red-200 bg-red-50 px-2.5 py-2 text-[10.5px] font-black uppercase tracking-wide text-red-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:text-white hover:shadow-md 2xl:px-3 2xl:text-[11.5px]"
                >
                  <span className="text-[13px]" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Panier */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-red-700 2xl:px-5"
              aria-label="Ouvrir le panier"
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

        {/* Mobile / tablet nav */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="animate-slide-down border-t border-gray-100 bg-white shadow-xl xl:hidden"
          >
            <nav className="flex flex-col bg-white py-3">
              {[...navItems, ...specialNavItems].map((item) => {
                const isSpecial =
                  item.name === "Promotions" || item.name === "Packs"

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`mx-4 my-1 flex items-center gap-3 rounded-xl px-4 py-4 text-[15px] font-semibold transition-all duration-200 ${isSpecial
                        ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white"
                        : "border-b border-gray-100 text-gray-800 hover:bg-red-50 hover:text-red-600"
                      }`}
                  >
                    <span className="text-lg" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Cart overlay */}
      {cartOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
          aria-label="Fermer le panier"
        />
      )}

      {/* Cart drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out will-change-transform sm:w-[400px] ${cartOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            Mon Panier ({totalItems})
          </h2>

          <button
            type="button"
            onClick={() => setCartOpen(false)}
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

              <p className="text-sm font-medium text-gray-500">
                Votre panier est vide
              </p>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
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
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                      decoding="async"
                      width={64}
                      height={64}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-semibold text-gray-800">
                      {item.product.name}
                      {item.variant && (
                        <span className="ml-1 text-gray-500">
                          ({item.variant.label})
                        </span>
                      )}
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-red-600">
                      {(item.variant?.price || item.product.price).toLocaleString(
                        "fr-FR"
                      )}{" "}
                      DH
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 hover:border-red-500"
                        aria-label={`Réduire la quantité de ${item.product.name}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="w-5 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 hover:border-red-500"
                        aria-label={`Augmenter la quantité de ${item.product.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-gray-900">
                      {(
                        (item.variant?.price || item.product.price) *
                        item.quantity
                      ).toLocaleString("fr-FR")}{" "}
                      DH
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500"
                      aria-label={`Supprimer ${item.product.name} du panier`}
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
              onClick={() => setCartOpen(false)}
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