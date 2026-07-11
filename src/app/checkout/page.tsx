"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronLeft,
  AlertCircle,
} from "lucide-react"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://electro-manager-dashboard-1.onrender.com"

const COUNTRIES = [
  { flagCode: "ma", iso: "MA", name: "Maroc", dialCode: "+212", placeholder: "06 xx xx xx xx" },
  { flagCode: "fr", iso: "FR", name: "France", dialCode: "+33", placeholder: "06 xx xx xx xx" },
  { flagCode: "es", iso: "ES", name: "Espagne", dialCode: "+34", placeholder: "6xx xxx xxx" },
  { flagCode: "be", iso: "BE", name: "Belgique", dialCode: "+32", placeholder: "04xx xx xx xx" },
  { flagCode: "it", iso: "IT", name: "Italie", dialCode: "+39", placeholder: "3xx xxx xxxx" },
  { flagCode: "de", iso: "DE", name: "Allemagne", dialCode: "+49", placeholder: "15x xxxx xxxx" },
  { flagCode: "nl", iso: "NL", name: "Pays-Bas", dialCode: "+31", placeholder: "06 xxxx xxxx" },
  { flagCode: "gb", iso: "GB", name: "Royaume-Uni", dialCode: "+44", placeholder: "07xxx xxxxxx" },
  { flagCode: "us", iso: "US", name: "États-Unis", dialCode: "+1", placeholder: "xxx xxx xxxx" },
  { flagCode: "ca", iso: "CA", name: "Canada", dialCode: "+1", placeholder: "xxx xxx xxxx" },
  { flagCode: "pt", iso: "PT", name: "Portugal", dialCode: "+351", placeholder: "9xx xxx xxx" },
  { flagCode: "ch", iso: "CH", name: "Suisse", dialCode: "+41", placeholder: "07x xxx xx xx" },
  { flagCode: "sa", iso: "SA", name: "Arabie Saoudite", dialCode: "+966", placeholder: "05x xxx xxxx" },
  { flagCode: "ae", iso: "AE", name: "Émirats Arabes Unis", dialCode: "+971", placeholder: "05x xxx xxxx" },
  { flagCode: "qa", iso: "QA", name: "Qatar", dialCode: "+974", placeholder: "xxxx xxxx" },
  { flagCode: "kw", iso: "KW", name: "Koweït", dialCode: "+965", placeholder: "xxxx xxxx" },
  { flagCode: "tr", iso: "TR", name: "Turquie", dialCode: "+90", placeholder: "5xx xxx xxxx" },
  { flagCode: "dz", iso: "DZ", name: "Algérie", dialCode: "+213", placeholder: "05x xx xx xx" },
  { flagCode: "tn", iso: "TN", name: "Tunisie", dialCode: "+216", placeholder: "xx xxx xxx" },
  { flagCode: "eg", iso: "EG", name: "Égypte", dialCode: "+20", placeholder: "01x xxxx xxxx" },
  { flagCode: "sn", iso: "SN", name: "Sénégal", dialCode: "+221", placeholder: "7x xxx xx xx" },
  { flagCode: "ci", iso: "CI", name: "Côte d’Ivoire", dialCode: "+225", placeholder: "xx xx xx xx xx" },
  { flagCode: "br", iso: "BR", name: "Brésil", dialCode: "+55", placeholder: "xx xxxxx xxxx" },
  { flagCode: "in", iso: "IN", name: "Inde", dialCode: "+91", placeholder: "xxxxx xxxxx" },
  { flagCode: "cn", iso: "CN", name: "Chine", dialCode: "+86", placeholder: "1xx xxxx xxxx" },
] as const

type Country = (typeof COUNTRIES)[number]

function FlagImage({
  country,
  className = "h-5 w-7",
}: {
  country: Country
  className?: string
}) {
  return (
    <img
      src={`https://flagcdn.com/w40/${country.flagCode}.png`}
      alt={country.name}
      className={`${className} rounded-[3px] object-cover shadow-sm`}
      loading="lazy"
      decoding="async"
    />
  )
}

function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "")

  if (digits.length < 6 || digits.length > 15) {
    return "Numéro de téléphone invalide"
  }

  return null
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null

  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
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
    <div className="group space-y-2">
      <label className="block text-xs font-black uppercase tracking-[0.18em] text-gray-500 transition-colors group-focus-within:text-red-600">
        {label}
      </label>

      {children}

      <FieldError msg={error} />
    </div>
  )
}

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart)
  const clearCart = useStore((state) => state.clearCart)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [countryOpen, setCountryOpen] = React.useState(false)
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    COUNTRIES[0]
  )
  const countryDropdownRef = React.useRef<HTMLDivElement | null>(null)

  const [form, setForm] = React.useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCountryOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const subtotal = cart.reduce((total, item) => {
    const price = item.variant?.price ?? item.product.price
    return total + price * item.quantity
  }, 0)

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

    const phoneErr = validatePhone(f.phone)
    if (phoneErr) e.phone = phoneErr

    return e
  }

  const set = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const nextForm = { ...form, [field]: value }
      const nextErrors = validate(nextForm)

      setErrors((prev) => ({
        ...prev,
        [field]: nextErrors[field] ?? "",
      }))
    }
  }

  const blur = (field: keyof typeof form) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    const nextErrors = validate(form)

    setErrors((prev) => ({
      ...prev,
      [field]: nextErrors[field] ?? "",
    }))
  }

  const fullPhone = `${selectedCountry.dialCode} ${form.phone.trim()}`

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

    if (!cart.length) {
      alert("Votre panier est vide.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        customerName: form.fullName.trim(),
        customerPhone: fullPhone,
        customerCity: form.city.trim(),
        customerAddress: form.address.trim(),
        status: "Pending",
        total,
        subtotal,
        shipping,
        discount: 0,
        paymentMethod: "Cash on Delivery",
        items: cart.map((item) => ({
          image: item.product.image,
          images: item.product.images ?? [item.product.image],
          title: item.variant
            ? `${item.product.name} - ${item.variant.label}`
            : item.product.name,
          qty: item.quantity,
          price: item.variant?.price ?? item.product.price,
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

      const telegramOrderData = {
        orderId: order.id,
        fullName: form.fullName.trim(),
        phone: fullPhone,
        city: form.city.trim(),
        address: form.address.trim(),
        total,
        shipping,
        paymentMethod: "Cash on Delivery",
        items: cart.map((item) => ({
          image: item.product.image,
          images: item.product.images ?? [item.product.image],
          title: item.variant
            ? `${item.product.name} - ${item.variant.label}`
            : item.product.name,
          qty: item.quantity,
          price: item.variant?.price ?? item.product.price,
        })),
      }

      sessionStorage.setItem("send_order_notification", "1")
      sessionStorage.setItem(
        "telegram_order_data",
        JSON.stringify(telegramOrderData)
      )

      clearCart()
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.08),transparent_35%),linear-gradient(180deg,#fff_0%,#f9fafb_45%,#f3f4f6_100%)] py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-red-200 hover:text-red-600 hover:shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour à la boutique
        </Link>

        <div className="mb-8">
          <span className="inline-flex rounded-full bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Checkout sécurisé
          </span>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
            Finaliser la Commande
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Remplissez vos informations de livraison. Nous vous contacterons
            pour confirmer votre commande.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              <div className="rounded-[28px] border border-gray-200/80 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:p-7">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-red-50 p-3 shadow-inner">
                    <Truck className="h-6 w-6 text-red-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-gray-950">
                      Informations de Livraison
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Adresse, ville et numéro de téléphone du client.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                        className={`h-14 w-full rounded-2xl border-2 px-4 text-sm font-semibold text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.10)] ${touched.fullName && errors.fullName
                            ? "border-red-400 bg-red-50/70 focus:border-red-500"
                            : "border-gray-200 bg-white focus:border-red-500"
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
                        className={`h-14 w-full rounded-2xl border-2 px-4 text-sm font-semibold text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.10)] ${touched.address && errors.address
                            ? "border-red-400 bg-red-50/70 focus:border-red-500"
                            : "border-gray-200 bg-white focus:border-red-500"
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
                      className={`h-14 w-full rounded-2xl border-2 px-4 text-sm font-semibold text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.10)] ${touched.city && errors.city
                          ? "border-red-400 bg-red-50/70 focus:border-red-500"
                          : "border-gray-200 bg-white focus:border-red-500"
                        }`}
                    />
                  </Field>

                  <Field
                    label="Téléphone *"
                    error={touched.phone ? errors.phone : undefined}
                  >
                    <div ref={countryDropdownRef} className="relative z-[9999]">
                      <div
                        className={`flex h-14 w-full min-w-0 overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.10)] ${touched.phone && errors.phone
                            ? "border-red-400 bg-red-50/70"
                            : "border-gray-200 focus-within:border-red-500"
                          }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCountryOpen((prev) => !prev)}
                          className="flex h-full w-[150px] shrink-0 items-center justify-center gap-2 border-r border-gray-200 bg-gray-50 px-3 text-sm font-black text-gray-800 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
                        >
                          <FlagImage country={selectedCountry} />
                          <span>{selectedCountry.iso}</span>
                          <span>{selectedCountry.dialCode}</span>
                          <span
                            className={`text-[10px] text-gray-400 transition-transform duration-300 ${countryOpen ? "rotate-180" : ""
                              }`}
                          >
                            ▼
                          </span>
                        </button>

                        <input
                          type="tel"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={(e) => {
                            const val = e.target.value
                              .replace(/[^\d\s]/g, "")
                              .slice(0, 15)
                            set("phone", val)
                          }}
                          onBlur={() => blur("phone")}
                          placeholder={selectedCountry.placeholder}
                          className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                        />
                      </div>

                      {countryOpen && (
                        <div className="absolute left-0 right-0 z-[99999] mt-2 max-h-28 overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.22)] animate-in fade-in slide-in-from-top-2 duration-200">
                          {COUNTRIES.map((country) => (
                            <button
                              key={country.iso}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country)
                                setCountryOpen(false)
                              }}
                              className={`flex h-14 w-full items-center gap-3 border-b border-gray-100 px-4 text-left text-sm font-bold transition-all duration-200 last:border-b-0 hover:bg-red-50 ${selectedCountry.iso === country.iso
                                  ? "bg-red-50 text-red-600"
                                  : "text-gray-800"
                                }`}
                            >
                              <FlagImage country={country} />

                              <span className="w-14 font-black">
                                {country.dialCode}
                              </span>

                              <span className="flex-1">{country.name}</span>

                              <span className="text-xs font-black text-gray-400">
                                {country.iso}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {!errors.phone && form.phone.length > 0 && (
                        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-gray-400">
                          <FlagImage country={selectedCountry} className="h-4 w-6" />
                          <span>
                            Code sélectionné: {selectedCountry.name}{" "}
                            {selectedCountry.dialCode}
                          </span>
                        </div>
                      )}
                    </div>
                  </Field>
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-200/80 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:p-7">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-red-50 p-3 shadow-inner">
                    <CreditCard className="h-6 w-6 text-red-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-gray-950">
                      Mode de Paiement
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Paiement simple et sécurisé à la livraison.
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-red-500 bg-red-50/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500 bg-white">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-gray-950">
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
            <div className="sticky top-32 rounded-[28px] border border-gray-200/80 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6">
              <h2 className="mb-5 text-xl font-black text-gray-950">
                Résumé de la Commande
              </h2>

              <div className="mb-5 max-h-[330px] space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const price = item.variant?.price ?? item.product.price
                  const title = item.variant
                    ? `${item.product.name} - ${item.variant.label}`
                    : item.product.name

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-sm"
                    >
                      {item.product.category === "Packs" &&
                        item.product.images &&
                        item.product.images.length > 1 ? (
                        <div className="grid h-20 w-28 flex-shrink-0 grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                          {item.product.images
                            .slice(0, 3)
                            .map((image, imageIndex) => (
                              <div
                                key={`${item.id}-checkout-pack-image-${imageIndex}`}
                                className="flex items-center justify-center border-r border-gray-100 bg-white last:border-r-0"
                              >
                                <img
                                  src={image}
                                  alt={`${title} produit ${imageIndex + 1}`}
                                  className="h-full w-full object-contain p-1"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                          <img
                            src={item.product.image}
                            alt={title}
                            className="h-full w-full object-contain p-1.5"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-black text-gray-900">
                          {title}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-gray-500">
                          {item.quantity} × {price.toLocaleString("fr-FR")} DH
                        </p>
                      </div>

                      <span className="self-center whitespace-nowrap text-sm font-black text-gray-950">
                        {(price * item.quantity).toLocaleString("fr-FR")} DH
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mb-5 space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-bold">
                    {subtotal.toLocaleString("fr-FR")} DH
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span
                    className={
                      shipping === 0
                        ? "font-bold text-emerald-600"
                        : "font-bold"
                    }
                  >
                    {shipping === 0 ? "GRATUITE" : `${shipping} DH`}
                  </span>
                </div>

                <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-base font-black text-gray-950">
                  <span>Total</span>
                  <span className="text-2xl text-red-600">
                    {total.toLocaleString("fr-FR")} DH
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-red-600 py-4 text-base font-black text-white shadow-lg shadow-red-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/35 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                <span className="absolute inset-y-0 -left-20 w-16 rotate-12 bg-white/30 blur-sm transition-all duration-700 group-hover:left-[120%]" />
                <ShieldCheck className="relative h-5 w-5" />
                <span className="relative">
                  {isSubmitting
                    ? "Traitement en cours..."
                    : "Confirmer la Commande"}
                </span>
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