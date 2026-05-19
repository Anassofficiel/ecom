import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductVariant } from "./data";

export interface CartItem {
  id: string; // Unique combination of product id + variant label
  productId: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface EcommerceState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  
  // Wishlist
  wishlist: string[]; // array of product ids
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useStore = create<EcommerceState>()(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],
      isCartOpen: false,
      
      addToCart: (product, variant, quantity = 1) => {
        set((state) => {
          const cartItemId = variant ? `${product.id}-${variant.label}` : product.id;
          const existingItemIndex = state.cart.findIndex((item) => item.id === cartItemId);
          
          if (existingItemIndex > -1) {
            // Update existing
            const newCart = [...state.cart];
            newCart[existingItemIndex].quantity += quantity;
            return { cart: newCart, isCartOpen: true };
          }
          
          // Add new
          return {
            cart: [...state.cart, { id: cartItemId, productId: product.id, product, variant, quantity }],
            isCartOpen: true,
          };
        });
      },
      
      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId),
        }));
      },
      
      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) => 
            item.id === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      
      clearCart: () => set({ cart: [] }),
      
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      
      // Wishlist State
      wishlist: [],
      
      toggleWishlist: (productId) => {
        set((state) => {
          const isWished = state.wishlist.includes(productId);
          return {
            wishlist: isWished 
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId]
          };
        });
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      }
    }),
    {
      name: "ecommerce-storage",
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
