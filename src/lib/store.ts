"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    category: string
}

interface CartStore {
    items: CartItem[]
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    totalItems: () => number
    totalPrice: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            addItem: (item) => {
                const currentItems = get().items
                const existingItem = currentItems.find((i) => i.id === item.id)
                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                        isOpen: true,
                    })
                } else {
                    set({ items: [...currentItems, { ...item, quantity: 1 }], isOpen: true })
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) })
            },
            updateQuantity: (id, quantity) => {
                if (quantity < 1) {
                    set({ items: get().items.filter((i) => i.id !== id) })
                    return
                }
                set({
                    items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
                })
            },
            clearCart: () => set({ items: [], isOpen: false }),
            totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            totalPrice: () =>
                get().items.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        { name: "cart-storage", partialize: (state) => ({ items: state.items }) }
    )
)
