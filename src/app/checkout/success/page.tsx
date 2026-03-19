"use client"

import * as React from "react"

import Link from "next/link"
import { CheckCircle, ShoppingBag, Package, Home } from "lucide-react"

function generateOrderId() {
    return "ES-" + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function OrderSuccessPage() {
    const [orderId, setOrderId] = React.useState("")
    React.useEffect(() => {
        setOrderId(generateOrderId())
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg">
                {/* Success card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-emerald-100 rounded-full p-4">
                            <CheckCircle className="h-12 w-12 text-emerald-600" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande Confirmée !</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        Merci d'avoir choisi Electro Manager. Votre commande a été enregistrée avec succès.
                    </p>

                    {/* Order number */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                        <p className="text-xs text-gray-500 mb-1">Numéro de Commande</p>
                        <p className="text-2xl font-bold text-red-600 tracking-widest">{orderId}</p>
                        <p className="text-xs text-gray-400 mt-1">Conservez ce numéro pour le suivi de votre commande</p>
                    </div>

                    {/* What happens next */}
                    <div className="text-left space-y-3 mb-8">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Et ensuite ?</p>
                        {[
                            { icon: CheckCircle, label: "Commande confirmée", done: true },
                            { icon: Package, label: "Préparation de votre colis", done: false },
                            { icon: ShoppingBag, label: "Livraison en cours (1–3 jours)", done: false },
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-full ${step.done ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                                    <step.icon className="h-4 w-4" />
                                </div>
                                <span className={`text-sm ${step.done ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            Continuer vos Achats
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Des questions ? Contactez-nous à{" "}
                    <a href="mailto:support@electromanager.ma" className="text-red-600 hover:underline">
                        support@electromanager.ma
                    </a>
                </p>
            </div>
        </div>
    )
}
