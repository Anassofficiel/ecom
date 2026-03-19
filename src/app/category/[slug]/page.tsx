"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { products, getProductsByCategory, getPaginatedProducts, getTotalPages } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/ui/pagination"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function CategoryPage() {
    const params = useParams()
    const slug = decodeURIComponent((params?.slug as string) ?? "")

    // Match slug to category (case-insensitive, handle spaces/hyphens)
    const normalize = (s: string) => s.toLowerCase().replace(/-/g, " ")
    const categoryProducts = products.filter(
        (p) => normalize(p.category) === normalize(slug)
    )

    const categoryName =
        categoryProducts[0]?.category ??
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

    const [currentPage, setCurrentPage] = React.useState(1)
    const totalPages = getTotalPages(categoryProducts)
    const pageProducts = getPaginatedProducts(categoryProducts, currentPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                        <Link href="/" className="hover:text-red-600">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-gray-900 font-medium">{categoryName}</span>
                    </nav>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                            <p className="text-sm text-gray-500 mt-1">{categoryProducts.length} products available</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {categoryProducts.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-2xl font-bold text-gray-700 mb-2">No products found</p>
                        <p className="text-gray-500 mb-6">This category has no products yet.</p>
                        <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
                            Go Back Home
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                            {pageProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
