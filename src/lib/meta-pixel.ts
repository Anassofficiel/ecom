export type MetaPixelContent = {
    id: string
    quantity: number
    item_price?: number
}

export type MetaPurchaseData = {
    orderId: string | number
    value: number
    currency?: string
    contentIds?: string[]
    contents?: MetaPixelContent[]
    numItems?: number
}

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void
        _fbq?: (...args: unknown[]) => void
    }
}

const PURCHASE_STORAGE_PREFIX = "meta_purchase_tracked_"
const PENDING_PURCHASE_KEY = "meta_pending_purchase"

/**
 * كيتأكد واش Meta Pixel واجد وخدام.
 */
export function isMetaPixelReady(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.fbq === "function"
    )
}

/**
 * إرسال Event standard إلى Meta Pixel.
 *
 * أمثلة:
 * PageView
 * ViewContent
 * AddToCart
 * InitiateCheckout
 * Purchase
 */
export function trackMetaEvent(
    eventName: string,
    parameters: Record<string, unknown> = {},
    eventId?: string
): boolean {

    console.log(
        "[META TEST DISABLED]",
        eventName,
        parameters
    )

    return true
}
/**
 * تسجيل زيارة الصفحة.
 */
export function trackPageView(): boolean {
    return trackMetaEvent("PageView")
}

/**
 * تسجيل الدخول لصفحة Checkout.
 */
export function trackInitiateCheckout({
    value,
    contentIds,
    contents,
    numItems,
    currency = "MAD",
}: {
    value: number
    contentIds: string[]
    contents: MetaPixelContent[]
    numItems: number
    currency?: string
}): boolean {
    return trackMetaEvent("InitiateCheckout", {
        value,
        currency,
        content_type: "product",
        content_ids: contentIds,
        contents,
        num_items: numItems,
    })
}

/**
 * حفظ معلومات Purchase مؤقتاً قبل الانتقال
 * لصفحة نجاح الطلب.
 */
export function savePendingPurchase(
    purchaseData: MetaPurchaseData
): boolean {
    if (typeof window === "undefined") {
        return false
    }

    try {
        sessionStorage.setItem(
            PENDING_PURCHASE_KEY,
            JSON.stringify(purchaseData)
        )

        return true
    } catch (error) {
        console.error(
            "[Meta Pixel] Impossible de sauvegarder Purchase:",
            error
        )

        return false
    }
}

/**
 * قراءة Purchase المحفوظ من Session Storage.
 */
export function getPendingPurchase(): MetaPurchaseData | null {
    if (typeof window === "undefined") {
        return null
    }

    try {
        const savedPurchase =
            sessionStorage.getItem(PENDING_PURCHASE_KEY)

        if (!savedPurchase) {
            return null
        }

        const parsedPurchase = JSON.parse(
            savedPurchase
        ) as MetaPurchaseData

        if (
            !parsedPurchase.orderId ||
            typeof parsedPurchase.value !== "number"
        ) {
            return null
        }

        return parsedPurchase
    } catch (error) {
        console.error(
            "[Meta Pixel] Purchase sauvegardé invalide:",
            error
        )

        return null
    }
}

/**
 * حذف Purchase المؤقت من Session Storage.
 */
export function clearPendingPurchase(): void {
    if (typeof window === "undefined") {
        return
    }

    try {
        sessionStorage.removeItem(PENDING_PURCHASE_KEY)
    } catch (error) {
        console.error(
            "[Meta Pixel] Impossible de supprimer Purchase:",
            error
        )
    }
}

/**
 * كيتأكد واش نفس الطلب سبق تسجل عند Meta.
 */
export function wasPurchaseTracked(
    orderId: string | number
): boolean {
    if (typeof window === "undefined") {
        return false
    }

    try {
        return (
            localStorage.getItem(
                `${PURCHASE_STORAGE_PREFIX}${orderId}`
            ) === "1"
        )
    } catch {
        return false
    }
}

/**
 * تسجيل Purchase مرة واحدة فقط.
 *
 * Refresh ديال صفحة success ما غاديش يعاود
 * يحسب نفس الطلبية.
 */
export function trackPurchaseOnce(
    purchaseData: MetaPurchaseData
): boolean {
    const {
        orderId,
        value,
        currency = "MAD",
        contentIds = [],
        contents = [],
        numItems = 0,
    } = purchaseData

    if (!orderId) {
        console.warn(
            "[Meta Pixel] Purchase non envoyé: orderId manquant."
        )

        return false
    }

    if (
        typeof value !== "number" ||
        Number.isNaN(value) ||
        value < 0
    ) {
        console.warn(
            "[Meta Pixel] Purchase non envoyé: valeur invalide."
        )

        return false
    }

    if (wasPurchaseTracked(orderId)) {
        console.log(
            `[Meta Pixel] Purchase #${orderId} déjà enregistré.`
        )

        clearPendingPurchase()

        return true
    }

    const eventId = `purchase_${orderId}`

    const sent = trackMetaEvent(
        "Purchase",
        {
            value,
            currency,
            content_type: "product",
            content_ids: contentIds,
            contents,
            num_items: numItems,
            order_id: String(orderId),
        },
        eventId
    )

    if (!sent) {
        return false
    }

    try {
        localStorage.setItem(
            `${PURCHASE_STORAGE_PREFIX}${orderId}`,
            "1"
        )
    } catch (error) {
        console.warn(
            "[Meta Pixel] Purchase envoyé mais sauvegarde locale impossible:",
            error
        )
    }

    clearPendingPurchase()

    return true
}