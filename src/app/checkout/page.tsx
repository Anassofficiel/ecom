"use client"

import * as React from "react"
import { useCart } from "@/lib/store"
import { ShieldCheck, Truck, CreditCard, ChevronLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// ─── Moroccan phone validation ────────────────────────────────────────────────
function validateMoroccanPhone(value: string) {
    const digits = value.replace(/\D/g, "")
    if (digits.length !== 10) return "Le numéro doit contenir exactement 10 chiffres"
    if (!digits.startsWith("06") && !digits.startsWith("07")) {
        return "Le numéro doit commencer par 06 ou 07"
    }
    return null
}

// ─── Field error indicator ────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null
    return (
        <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            {msg}
        </p>
    )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
interface FieldProps {
    label: string
    error?: string
    children: React.ReactNode
}
function Field({ label, error, children }: FieldProps) {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">{label}</label>
            {children}
            <FieldError msg={error} />
        </div>
    )
}

export default function CheckoutPage() {
    const cart = useCart()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const [form, setForm] = React.useState({
        fullName: "",
        address: "",
        city: "",
        phone: "",
    })
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [touched, setTouched] = React.useState<Record<string, boolean>>({})

    const subtotal = cart.totalPrice()
    const shipping = subtotal > 1000 ? 0 : 50
    const total = subtotal + shipping

    // ─── Validate all fields ─────────────────────────────────────────
    function validate(f: typeof form) {
        const e: Record<string, string> = {}
        if (!f.fullName.trim() || f.fullName.trim().length < 3)
            e.fullName = "Nom complet requis (min. 3 caractères)"
        if (!f.address.trim() || f.address.trim().length < 5)
            e.address = "Adresse requise (min. 5 caractères)"
        if (!f.city.trim() || f.city.trim().length < 2)
            e.city = "Ville requise"
        const phoneErr = validateMoroccanPhone(f.phone)
        if (phoneErr) e.phone = phoneErr
        return e
    }

    const set = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (touched[field]) {
            const newErrors = validate({ ...form, [field]: value })
            setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }))
        }
    }

    const blur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        const newErrors = validate(form)
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mark all fields touched
        setTouched({ fullName: true, address: true, city: true, phone: true })
        const e2 = validate(form)
        setErrors(e2)
        if (Object.values(e2).some(Boolean)) return

        setIsSubmitting(true)
        setTimeout(() => {
            cart.clearCart()
            router.push("/checkout/success")
        }, 1500)
    }

    // Always show form, even if empty

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back */}
                <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 mb-6 font-medium transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                    Retour à la boutique
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Finaliser la Commande
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* ── Form ────────────────────────────────────────────────── */}
                    <div className="lg:col-span-7">
                        <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-6">

                            {/* Shipping */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="bg-red-50 p-2.5 rounded-xl">
                                        <Truck className="h-5 w-5 text-red-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Informations de Livraison</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="md:col-span-2">
                                        <Field label="Nom Complet *" error={touched.fullName ? errors.fullName : undefined}>
                                            <input
                                                type="text"
                                                value={form.fullName}
                                                onChange={(e) => set("fullName", e.target.value)}
                                                onBlur={() => blur("fullName")}
                                                placeholder="ex: Ahmed El Alaoui"
                                                className={`w-full h-12 px-4 rounded-xl border-2 text-sm outline-none transition-colors ${touched.fullName && errors.fullName
                                                    ? "border-red-400 focus:border-red-500 bg-red-50"
                                                    : "border-gray-200 focus:border-red-500"
                                                    }`}
                                            />
                                        </Field>
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <Field label="Adresse *" error={touched.address ? errors.address : undefined}>
                                            <input
                                                type="text"
                                                value={form.address}
                                                onChange={(e) => set("address", e.target.value)}
                                                onBlur={() => blur("address")}
                                                placeholder="ex: 12 Rue Hassan II, Appt 3"
                                                className={`w-full h-12 px-4 rounded-xl border-2 text-sm outline-none transition-colors ${touched.address && errors.address
                                                    ? "border-red-400 focus:border-red-500 bg-red-50"
                                                    : "border-gray-200 focus:border-red-500"
                                                    }`}
                                            />
                                        </Field>
                                    </div>

                                    {/* City */}
                                    <Field label="Ville *" error={touched.city ? errors.city : undefined}>
                                        <input
                                            type="text"
                                            value={form.city}
                                            onChange={(e) => set("city", e.target.value)}
                                            onBlur={() => blur("city")}
                                            placeholder="ex: Casablanca"
                                            className={`w-full h-12 px-4 rounded-xl border-2 text-sm outline-none transition-colors ${touched.city && errors.city
                                                ? "border-red-400 focus:border-red-500 bg-red-50"
                                                : "border-gray-200 focus:border-red-500"
                                                }`}
                                        />
                                    </Field>

                                    {/* Phone — Moroccan format */}
                                    <Field label="Téléphone (Maroc) *" error={touched.phone ? errors.phone : undefined}>
                                        <div className="flex">
                                            {/* Flag + prefix */}
                                            <div className="flex items-center gap-1.5 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl px-3 flex-shrink-0">
                                                <span className="text-lg">🇲🇦</span>
                                                <span className="text-sm font-semibold text-gray-700">+212</span>
                                            </div>
                                            <input
                                                type="tel"
                                                inputMode="numeric"
                                                value={form.phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, "").slice(0, 10)
                                                    set("phone", val)
                                                }}
                                                onBlur={() => blur("phone")}
                                                placeholder="06 xx xx xx xx"
                                                maxLength={10}
                                                className={`flex-1 h-12 px-4 rounded-r-xl border-2 text-sm outline-none transition-colors ${touched.phone && errors.phone
                                                    ? "border-red-400 focus:border-red-500 bg-red-50"
                                                    : "border-gray-200 focus:border-red-500"
                                                    }`}
                                            />
                                        </div>
                                        {!errors.phone && form.phone.length > 0 && (
                                            <p className="text-xs text-gray-400 mt-1">Format attendu: 06XXXXXXXX ou 07XXXXXXXX</p>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="bg-red-50 p-2.5 rounded-xl">
                                        <CreditCard className="h-5 w-5 text-red-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Mode de Paiement</h2>
                                </div>
                                <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-red-500 bg-red-50 cursor-pointer">
                                    <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center flex-shrink-0">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">Paiement à la Livraison (Cash)</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Payez à la réception de votre commande.</p>
                                    </div>
                                    <ShieldCheck className="h-5 w-5 text-red-500 ml-auto flex-shrink-0" />
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* ── Order Summary ─────────────────────────────────────────── */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-32">
                            <h2 className="text-lg font-bold text-gray-900 mb-5">Résumé de la Commande</h2>

                            <div className="space-y-4 mb-5 max-h-[300px] overflow-y-auto pr-1">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="h-14 w-14 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.name}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">{item.quantity} × {item.price.toLocaleString("fr-FR")} DH</p>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 whitespace-nowrap self-center">
                                            {(item.price * item.quantity).toLocaleString("fr-FR")} DH
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2 mb-5">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Sous-total</span>
                                    <span className="font-semibold">{subtotal.toLocaleString("fr-FR")} DH</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Livraison</span>
                                    <span className={shipping === 0 ? "font-semibold text-emerald-600" : "font-semibold"}>
                                        {shipping === 0 ? "GRATUITE" : `${shipping} DH`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-2 mt-2">
                                    <span>Total</span>
                                    <span className="text-red-600 text-xl">{total.toLocaleString("fr-FR")} DH</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
                            >
                                <ShieldCheck className="h-5 w-5" />
                                {isSubmitting ? "Traitement en cours..." : "Confirmer la Commande"}
                            </button>

                            <p className="text-center text-[11px] text-gray-400 mt-3">
                                Sécurisé par ELECTRO MANAGER Payments 🔒
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ShoppingCart({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5.4 5M7 13l-1.4 5.6a1 1 0 001 .4H17M9 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
    )
}
