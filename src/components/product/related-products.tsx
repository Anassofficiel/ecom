"use client"

import * as React from "react"
import { products, getRelatedProducts } from "@/lib/data"
import { ProductCard } from "./product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RelatedProductsProps {
    productId: string;
    category: string;
}

export function RelatedProducts({ productId, category }: RelatedProductsProps) {
    const related = React.useMemo(
        () => getRelatedProducts(productId, category, 8),
        [productId, category]
    )

    const scrollRef = React.useRef<HTMLDivElement>(null)

    if (related.length === 0) return null

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return
        const amount = scrollRef.current.clientWidth * 0.75
        scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" })
    }

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
            >
                {related.map((product) => (
                    <div
                        key={product.id}
                        className="flex-none w-[180px] sm:w-[200px] md:w-[220px]"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    )
}
