"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const categories = [
    {
        name: "Refrigerators",
        count: "120+ Products",
        image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1000&auto=format&fit=crop",
        className: "md:col-span-2 md:row-span-2"
    },
    {
        name: "Ovens",
        count: "85+ Products",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Washing Machines",
        count: "64+ Products",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1000&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Coffee Machines",
        count: "42+ Products",
        image: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?q=80&w=1000&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Electronics",
        count: "200+ Products",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    }
]

export function CategoryGrid() {
    return (
        <section className="py-24 container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
                        Our <span className="text-primary">Categories</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        Explore our curated collections of premium home appliances designed for modern living.
                    </p>
                </div>
                <Link href="/categories" className="group flex items-center gap-2 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors">
                    View All Categories
                    <span className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1000px] md:h-[700px]">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative overflow-hidden rounded-3xl bg-zinc-100 ${cat.className}`}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500 z-10" />
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end">
                            <div>
                                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {cat.count}
                                </p>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight group-hover:text-primary transition-colors">
                                    {cat.name}
                                </h3>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                                <ArrowUpRight className="h-6 w-6 text-white" />
                            </div>
                        </div>

                        <Link href={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="absolute inset-0 z-30" />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
