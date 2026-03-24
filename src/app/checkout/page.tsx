"use client"

import * as React from "react"
import { useCart } from "@/lib/store"
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronLeft,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://electro-manager-dashboard.onrender.com"

function validateMoroccanPhone(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 10) return "Le numéro doit contenir exactement 10 chiffres"
  if (!digits.startsWith("06") && !digits.startsWith("07")) {
    return "Le numéro doit commencer par 06 ou 07"
  }
  return null
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      {msg}
    </p>
  )
}

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  )
}

export default function CheckoutPage() {
  const cart = useCart()
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

  function validate(f: typeof form) {
    const e: Record<string, string> = {}

    if (!f.fullName.trim() || f.fullName.trim().length < 3) {
      e.fullName = "Nom complet requis (min. 3 caractères)"
    }

    if (!f.address.trim() || f.address.trim().length < 5) {
      e.address = "Adresse requise (min. 5 caractères)"
    }

    if (!f.city.trim() || f.city.trim().length < 2) {
      e.city = "Ville requise"
    }

    const phoneErr = validateMoroccanPhone(f.phone)
    if (phoneErr) e.phone = phoneErr

    return e
  }

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const nextForm = { ...form, [field]: value }
      const nextErrors = validate(nextForm)
      setErrors((prev) => ({ ...prev, [field]: nextErrors[field] ?? "" }))
    }
  }

  const blur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const nextErrors = validate(form)
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] ?? "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setTouched({
      fullName: true,
      address: true,
      city: true,
      phone: true,
    })

    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return

    if (!cart.items.length) {
      alert("Votre panier est vide.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        customerName: form.fullName.trim(),
        customerPhone: form.phone.trim(),
        customerCity: form.city.trim(),
        customerAddress: form.address.trim(),
        status: "Pending",
        total,
        subtotal,
        shipping,
        discount: 0,
        paymentMethod: "Cash on Delivery",
        items: cart.items.map((item) => ({
          image: item.image,
          title: item.name,
          qty: item.quantity,
          price: item.price,
        })),
      }

      console.log("Sending order payload:", payload)
      console.log("API_BASE_URL:", API_BASE_URL)

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const rawText = await response.text()
      console.log("Order API raw response:", rawText)

      if (!response.ok) {
        throw new Error(`API Error ${response.status}: ${rawText}`)
      }

      let order: { id?: number | string } = {}

      try {
        order = rawText ? JSON.parse(rawText) : {}
      } catch {
        throw new Error("La réponse de l'API n'est pas un JSON valide.")
      }

      if (!order?.id) {
        throw new Error("Commande créée, mais ID introuvable dans la réponse API.")
      }

      cart.clearCart()
      window.location.href = `/checkout/success?orderId=${order.id}`
    } catch (error) {
      console.error("Checkout error:", error)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        alert(
          "Impossible de contacter le serveur de commande. Vérifiez l'URL API et le CORS côté dashboard."
        )
      } else {
        alert(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la commande."
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-red-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour à la boutique
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Finaliser la Commande
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-red-50 p-2.5">
                    <Truck className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Informations de Livraison
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Field
                      label="Nom Complet *"
                      error={touched.fullName ? errors.fullName : undefined}
                    >
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        onBlur={() => blur("fullName")}
                        placeholder="ex: Ahmed El Alaoui"
                        className={`h-12 w-full rounded-xl border-2 px-4 text-sm outline-none transition-colors ${
                          touched.fullName && errors.fullName
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-gray-200 focus:border-red-500"
                        }`}
                      />
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <Field
                      label="Adresse *"
                      error={touched.address ? errors.address : undefined}
                    >
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        onBlur={() => blur("address")}
                        placeholder="ex: 12 Rue Hassan II, Appt 3"
                        className={`h-12 w-full rounded-xl border-2 px-4 text-sm outline-none transition-colors ${
                          touched.address && errors.address
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-gray-200 focus:border-red-500"
                        }`}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Ville *"
                    error={touched.city ? errors.city : undefined}
                  >
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      onBlur={() => blur("city")}
                      placeholder="ex: Casablanca"
                      className={`h-12 w-full rounded-xl border-2 px-4 text-sm outline-none transition-colors ${
                        touched.city && errors.city
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                    />
                  </Field>

                  <Field
                    label="Téléphone (Maroc) *"
                    error={touched.phone ? errors.phone : undefined}
                  >
                    <div className="flex">
                      <div className="flex flex-shrink-0 items-center gap-1.5 rounded-l-xl border-2 border-r-0 border-gray-200 bg-gray-100 px-3">
                        <span className="text-lg">🇲🇦</span>
                        <span className="text-sm font-semibold text-gray-700">
                          +212
                        </span>
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
                        className={`h-12 flex-1 rounded-r-xl border-2 px-4 text-sm outline-none transition-colors ${
                          touched.phone && errors.phone
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-gray-200 focus:border-red-500"
                        }`}
                      />
                    </div>
                    {!errors.phone && form.phone.length > 0 && (
                      <p className="mt-1 text-xs text-gray-400">
                        Format attendu: 06XXXXXXXX ou 07XXXXXXXX
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-red-50 p-2.5">
                    <CreditCard className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Mode de Paiement
                  </h2>
                </div>

                <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-red-500 bg-red-50 p-4">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Paiement à la Livraison (Cash)
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Payez à la réception de votre commande.
                    </p>
                  </div>
                  <ShieldCheck className="ml-auto h-5 w-5 flex-shrink-0 text-red-500" />
                </label>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-gray-900">
                Résumé de la Commande
              </h2>

              <div className="mb-5 max-h-[300px] space-y-4 overflow-y-auto pr-1">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {item.quantity} × {item.price.toLocaleString("fr-FR")} DH
                      </p>
                    </div>
                    <span className="self-center whitespace-nowrap text-sm font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} DH
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-5 space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">
                    {subtotal.toLocaleString("fr-FR")} DH
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span
                    className={
                      shipping === 0
                        ? "font-semibold text-emerald-600"
                        : "font-semibold"
                    }
                  >
                    {shipping === 0 ? "GRATUITE" : `${shipping} DH`}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-xl text-red-600">
                    {total.toLocaleString("fr-FR")} DH
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-base font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <ShieldCheck className="h-5 w-5" />
                {isSubmitting ? "Traitement en cours..." : "Confirmer la Commande"}
              </button>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Sécurisé par ELECTRO MANAGER Payments 🔒
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}