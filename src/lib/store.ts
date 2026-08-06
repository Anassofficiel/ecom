import { create } from "zustand"
import { persist } from "zustand/middleware"

import { Product, ProductVariant } from "./data"
import { trackMetaEvent } from "./meta-pixel"

export interface CartItem {
  id: string
  productId: string
  product: Product
  variant?: ProductVariant
  quantity: number
}

interface EcommerceState {
  // Cart
  cart: CartItem[]
  isCartOpen: boolean

  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number
  ) => void

  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  setCartOpen: (isOpen: boolean) => void

  // Wishlist
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

/**
 * Envoie l'événement standard AddToCart à Meta Pixel.
 */
function trackAddToCart(
  product: Product,
  variant: ProductVariant | undefined,
  quantity: number
) {
  const unitPrice = variant?.price ?? product.price
  const productId = String(product.id)

  trackMetaEvent("AddToCart", {
    value: unitPrice * quantity,
    currency: "MAD",

    content_type: "product",
    content_ids: [productId],

    contents: [
      {
        id: productId,
        quantity,
        item_price: unitPrice,
      },
    ],

    content_name: variant
      ? `${product.name} - ${variant.label}`
      : product.name,

    content_category: product.category,

    num_items: quantity,
  })
}

export const useStore = create<EcommerceState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      isCartOpen: false,

      addToCart: (product, variant, quantity = 1) => {
        const safeQuantity = Math.max(
          1,
          Number.isFinite(quantity) ? Math.floor(quantity) : 1
        )

        set((state) => {
          const cartItemId = variant
            ? `${product.id}-${variant.label}`
            : String(product.id)

          const existingItem = state.cart.find(
            (item) => item.id === cartItemId
          )

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === cartItemId
                  ? {
                    ...item,
                    quantity: item.quantity + safeQuantity,
                  }
                  : item
              ),
              isCartOpen: true,
            }
          }

          const newItem: CartItem = {
            id: cartItemId,
            productId: String(product.id),
            product,
            variant,
            quantity: safeQuantity,
          }

          return {
            cart: [...state.cart, newItem],
            isCartOpen: true,
          }
        })

        /**
         * Meta Pixel:
         * كيتسجل كل مرة المستخدم كيضيف كمية للسلة.
         */
        trackAddToCart(
          product,
          variant,
          safeQuantity
        )
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.id !== cartItemId
          ),
        }))
      },

      updateQuantity: (cartItemId, quantity) => {
        const safeQuantity = Math.max(
          1,
          Number.isFinite(quantity) ? Math.floor(quantity) : 1
        )

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId
              ? {
                ...item,
                quantity: safeQuantity,
              }
              : item
          ),
        }))
      },

      clearCart: () => {
        set({
          cart: [],
        })
      },

      setCartOpen: (isOpen) => {
        set({
          isCartOpen: isOpen,
        })
      },

      // Wishlist
      wishlist: [],

      toggleWishlist: (productId) => {
        set((state) => {
          const isWished =
            state.wishlist.includes(productId)

          return {
            wishlist: isWished
              ? state.wishlist.filter(
                (id) => id !== productId
              )
              : [...state.wishlist, productId],
          }
        })
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId)
      },
    }),
    {
      name: "ecommerce-storage",

      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
)