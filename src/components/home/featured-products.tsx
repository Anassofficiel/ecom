"use client"

import * as React from "react"
import { ProductCard } from "@/components/product/product-card"
import { getAllProducts, type Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel"

export function FeaturedProducts() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [api, setApi] = React.useState<CarouselApi | null>(null)

  React.useEffect(() => {
    let active = true

    const loadProducts = async () => {
      try {
        const items = await getAllProducts()
        if (active) setProducts(items.slice(0, 12))
      } catch (error) {
        console.error("Failed to load featured products:", error)
        if (active) setProducts([])
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [])

  if (!products.length) return null

  return (
    <section className="overflow-hidden bg-zinc-50 py-24 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter md:text-5xl">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              Top picks and best sellers selected by our experts for your modern home.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-2xl border-2 transition-all hover:border-primary hover:text-primary"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-2xl border-2 transition-all hover:border-primary hover:text-primary"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}