"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle, ShoppingBag, Package, Home } from "lucide-react"
import { useSearchParams } from "next/navigation"

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "—"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-100 rounded-full p-4">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Commande Confirmée !
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Merci d'avoir choisi Electro Mostafa. Votre commande a été enregistrée
            avec succès.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">Numéro de Commande</p>
            <p className="text-2xl font-bold text-red-600 tracking-widest">
              #{orderId}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Conservez ce numéro pour le suivi de votre commande
            </p>
          </div>

          <div className="text-left space-y-3 mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Et ensuite ?
            </p>

            {[
              { icon: CheckCircle, label: "Commande confirmée", done: true },
              { icon: Package, label: "Préparation de votre colis", done: false },
              { icon: ShoppingBag, label: "Livraison en cours (1–3 jours)", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-full ${
                    step.done
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>

                <span
                  className={`text-sm ${
                    step.done
                      ? "text-gray-800 font-medium"
                      : "text-gray-400"
                  }`}
                >
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
          <a
            href="mailto:support@electromostafa.ma"
            className="text-red-600 hover:underline"
          >
            support@electromostafa.ma
          </a>
        </p>
      </div>
    </div>
  )
}

function SuccessFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center animate-pulse">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 rounded-full h-20 w-20" />
          </div>

          <div className="h-7 bg-gray-200 rounded w-2/3 mx-auto mb-3" />
          <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto mb-6" />

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <div className="h-3 bg-gray-200 rounded w-32 mx-auto mb-3" />
            <div className="h-8 bg-gray-200 rounded w-40 mx-auto mb-2" />
            <div className="h-3 bg-gray-100 rounded w-48 mx-auto" />
          </div>

          <div className="space-y-3 mb-8">
            <div className="h-4 bg-gray-100 rounded w-24" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-4 bg-gray-100 rounded w-3/5" />
          </div>

          <div className="h-11 bg-gray-200 rounded-lg w-full" />
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <React.Suspense fallback={<SuccessFallback />}>
      <OrderSuccessContent />
    </React.Suspense>
  )
}