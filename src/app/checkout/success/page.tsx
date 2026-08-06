"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  CheckCircle,
  ShoppingBag,
  Package,
  Home,
} from "lucide-react"

import {
  getPendingPurchase,
  trackPurchaseOnce,
} from "@/lib/meta-pixel"

function OrderSuccessContent() {
  const searchParams = useSearchParams()

  const orderIdFromUrl = searchParams.get("orderId")
  const orderId = orderIdFromUrl || "—"

  const [notificationSent, setNotificationSent] =
    React.useState(false)

  const [purchaseTracked, setPurchaseTracked] =
    React.useState(false)

  /**
   * Envoi de la notification Telegram.
   */
  React.useEffect(() => {
    let cancelled = false

    async function sendTelegramNotification() {
      const shouldSend = sessionStorage.getItem(
        "send_order_notification"
      )

      const savedOrderData = sessionStorage.getItem(
        "telegram_order_data"
      )

      if (shouldSend !== "1" || !savedOrderData) {
        return
      }

      try {
        const response = await fetch("/api/telegram-notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: savedOrderData,
        })

        const result = await response
          .json()
          .catch(() => null)

        if (!response.ok) {
          throw new Error(
            result?.error ||
            "Impossible d'envoyer la notification Telegram."
          )
        }

        sessionStorage.removeItem(
          "send_order_notification"
        )

        sessionStorage.removeItem(
          "telegram_order_data"
        )

        if (!cancelled) {
          setNotificationSent(true)
        }
      } catch (error) {
        console.error(
          "Telegram notify error:",
          error
        )

        /**
         * On conserve les données pour pouvoir
         * réessayer après un rafraîchissement.
         */
      }
    }

    void sendTelegramNotification()

    return () => {
      cancelled = true
    }
  }, [])

  /**
   * Enregistrement de Purchase dans Meta Pixel.
   */
  React.useEffect(() => {
    if (!orderIdFromUrl) {
      console.warn(
        "[Meta Pixel] Purchase non envoyé : orderId absent de l'URL."
      )

      return
    }

    const pendingPurchase = getPendingPurchase()

    if (!pendingPurchase) {
      console.warn(
        "[Meta Pixel] Purchase non envoyé : aucune commande en attente."
      )

      return
    }

    if (
      String(pendingPurchase.orderId) !==
      String(orderIdFromUrl)
    ) {
      console.warn(
        "[Meta Pixel] Purchase non envoyé : orderId différent.",
        {
          orderIdUrl: orderIdFromUrl,
          orderIdSaved: pendingPurchase.orderId,
        }
      )

      return
    }

    /**
     * Après les vérifications, purchaseData
     * ne peut plus être null.
     */
    const purchaseData = pendingPurchase

    let attempts = 0
    let retryTimeoutId: number | null = null
    let cancelled = false

    function sendPurchaseEvent() {
      if (cancelled) {
        return
      }

      attempts += 1

      const sent = trackPurchaseOnce(
        purchaseData
      )

      if (sent) {
        setPurchaseTracked(true)

        console.log(
          `[Meta Pixel] Purchase #${purchaseData.orderId} enregistré avec succès.`
        )

        return
      }

      /**
       * Le Pixel peut prendre un peu de temps
       * avant d'être disponible.
       */
      if (attempts < 10) {
        retryTimeoutId = window.setTimeout(
          () => {
            sendPurchaseEvent()
          },
          500
        )
      } else {
        console.error(
          "[Meta Pixel] Purchase non envoyé après plusieurs tentatives."
        )
      }
    }

    sendPurchaseEvent()

    return () => {
      cancelled = true

      if (retryTimeoutId !== null) {
        window.clearTimeout(
          retryTimeoutId
        )
      }
    }
  }, [orderIdFromUrl])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Commande Confirmée !
          </h1>

          <p className="mb-6 text-sm text-gray-500">
            Merci d&apos;avoir choisi Electro Mostafa.
            Votre commande a été enregistrée avec succès.
          </p>

          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="mb-1 text-xs text-gray-500">
              Numéro de Commande
            </p>

            <p className="text-2xl font-bold tracking-widest text-red-600">
              #{orderId}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Conservez ce numéro pour le suivi de votre
              commande
            </p>
          </div>

          {notificationSent && (
            <p className="mb-3 text-xs font-medium text-emerald-600">
              Notification Telegram envoyée.
            </p>
          )}

          {purchaseTracked && (
            <p className="mb-6 text-xs font-medium text-emerald-600">
              Commande enregistrée dans le suivi des ventes.
            </p>
          )}

          <div className="mb-8 space-y-3 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Et ensuite ?
            </p>

            {[
              {
                icon: CheckCircle,
                label: "Commande confirmée",
                done: true,
              },
              {
                icon: Package,
                label: "Préparation de votre colis",
                done: false,
              },
              {
                icon: ShoppingBag,
                label: "Livraison en cours (1–3 jours)",
                done: false,
              },
            ].map((step, index) => {
              const StepIcon = step.icon

              return (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`rounded-full p-1.5 ${step.done
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    <StepIcon className="h-4 w-4" />
                  </div>

                  <span
                    className={`text-sm ${step.done
                        ? "font-medium text-gray-800"
                        : "text-gray-400"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <Home className="h-4 w-4" />
            Continuer vos Achats
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
          </div>

          <div className="mx-auto mb-3 h-7 w-2/3 rounded bg-gray-200" />

          <div className="mx-auto mb-6 h-4 w-3/4 rounded bg-gray-100" />

          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mx-auto mb-3 h-3 w-32 rounded bg-gray-200" />

            <div className="mx-auto mb-2 h-8 w-40 rounded bg-gray-200" />

            <div className="mx-auto h-3 w-48 rounded bg-gray-100" />
          </div>

          <div className="mb-8 space-y-3">
            <div className="h-4 w-24 rounded bg-gray-100" />
            <div className="h-4 w-2/3 rounded bg-gray-100" />
            <div className="h-4 w-1/2 rounded bg-gray-100" />
            <div className="h-4 w-3/5 rounded bg-gray-100" />
          </div>

          <div className="h-11 w-full rounded-lg bg-gray-200" />
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