import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { packs, products } from "@/lib/data"

type Props = {
    params: { slug: string }
}

// 🔥 نجيب pack
function getPack(slug: string) {
    return packs.find((p) => p.slug === slug)
}

// 🔥 نجيب product بالاسم
function findProduct(name: string) {
    return products.find((p) => p.name === name)
}

export default function PackPage({ params }: Props) {
    const pack = getPack(params.slug)

    if (!pack) return notFound()

    const packProducts = pack.products
        .map((name) => findProduct(name))
        .filter(Boolean)

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* 🔥 CARD */}
            <div className="rounded-[30px] border-2 border-orange-400 p-6 bg-white shadow-sm">

                {/* 🔥 TOP IMAGES */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {pack.images.map((img, i) => (
                        <div key={i} className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                            <Image
                                src={img}
                                alt={`${pack.name} image ${i + 1}`}
                                fill
                                sizes="(max-width:768px) 100vw, 200px"
                                className="object-contain p-4"
                            />
                        </div>
                    ))}
                </div>

                {/* 🔥 BADGES */}
                <div className="flex justify-between items-center mb-4">
                    {pack.badge && (
                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                            {pack.badge}
                        </span>
                    )}

                    <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                        -{pack.discount}%
                    </span>
                </div>

                {/* 🔥 TITLE */}
                <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
                    {pack.name}
                </h1>

                {/* 🔥 PRICE */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-extrabold text-red-600">
                        {pack.packPrice.toLocaleString()} DH
                    </span>

                    <span className="line-through text-gray-400">
                        {pack.originalPrice.toLocaleString()} DH
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        +{pack.originalPrice - pack.packPrice} DH
                    </span>
                </div>

                {/* 🔥 BUTTONS */}
                <div className="flex gap-4 mb-8">
                    <a
                        href={`https://wa.me/212600000000?text=Bonjour je veux ${pack.name}`}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-bold"
                    >
                        WhatsApp
                    </a>

                    <button className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold">
                        Caisse
                    </button>
                </div>

                {/* 🔥 DESCRIPTION */}
                <p className="text-gray-600 mb-8">{pack.description}</p>

                {/* 🔥 PRODUCTS */}
                <h2 className="text-xl font-bold mb-4">Produits du pack</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {packProducts.map((product: any) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="border rounded-xl p-4 hover:shadow-md transition"
                        >
                            <div className="relative aspect-square mb-3">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width:768px) 100vw, 200px"
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-sm font-bold mb-1 line-clamp-2">
                                {product.name}
                            </h3>

                            <span className="text-red-600 font-bold">
                                {product.price} DH
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}