"use client"

import * as React from "react"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function FeaturedProducts() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
                            Featured <span className="text-primary">Products</span>
                        </h2>
                        <p className="text-muted-foreground max-w-md">
                            Top picks and best sellers selected by our experts for your modern home.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-2xl border-2 h-12 w-12 hover:border-primary hover:text-primary transition-all">
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl border-2 h-12 w-12 hover:border-primary hover:text-primary transition-all">
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
