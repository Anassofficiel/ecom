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
        fbq?: (
            ...args: unknown[]
        ) => void

        _fbq?: (
            ...args: unknown[]
        ) => void
    }
}


const PURCHASE_STORAGE_PREFIX =
    "meta_purchase_tracked_"

const PENDING_PURCHASE_KEY =
    "meta_pending_purchase"



/**
 * Vérifie si Meta Pixel est chargé
 */
export function isMetaPixelReady(): boolean {

    return (
        typeof window !== "undefined" &&
        typeof window.fbq === "function"
    )

}



/**
 * Envoi événement Meta Pixel
 */
export function trackMetaEvent(
    eventName: string,
    parameters: Record<string, unknown> = {},
    eventId?: string
): boolean {


    if (!isMetaPixelReady()) {

        console.warn(
            "[META PIXEL] Not ready:",
            eventName
        )

        return false
    }


    try {


        if (eventId) {

            window.fbq?.(
                "track",
                eventName,
                parameters,
                {
                    eventID: eventId
                }
            )


        } else {


            window.fbq?.(
                "track",
                eventName,
                parameters
            )

        }


        console.log(
            "[META PIXEL]",
            eventName,
            parameters
        )


        return true


    } catch (error) {


        console.error(
            "[META PIXEL ERROR]",
            error
        )


        return false

    }

}



/**
 * Page View
 */
export function trackPageView(): boolean {

    return trackMetaEvent(
        "PageView"
    )

}



/**
 * Checkout
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


    return trackMetaEvent(
        "InitiateCheckout",
        {

            value,

            currency,

            content_type:
                "product",

            content_ids:
                contentIds,

            contents,

            num_items:
                numItems

        }
    )

}




/**
 * Sauvegarde Purchase avant success page
 */
export function savePendingPurchase(
    purchaseData: MetaPurchaseData
): boolean {


    if (
        typeof window === "undefined"
    ) {
        return false
    }


    try {


        sessionStorage.setItem(

            PENDING_PURCHASE_KEY,

            JSON.stringify(
                purchaseData
            )

        )


        return true


    } catch (error) {


        console.error(
            error
        )


        return false

    }

}




/**
 * Récupérer Purchase
 */
export function getPendingPurchase()
    : MetaPurchaseData | null {


    if (
        typeof window === "undefined"
    ) {
        return null
    }


    try {


        const data =
            sessionStorage.getItem(
                PENDING_PURCHASE_KEY
            )


        if (!data)
            return null



        return JSON.parse(data)


    } catch {


        return null

    }

}




/**
 * Supprimer Purchase temporaire
 */
export function clearPendingPurchase() {


    if (
        typeof window === "undefined"
    )
        return



    sessionStorage.removeItem(
        PENDING_PURCHASE_KEY
    )

}




/**
 * Vérifier doublon achat
 */
export function wasPurchaseTracked(
    orderId: string | number
): boolean {


    if (
        typeof window === "undefined"
    )
        return false



    return (
        localStorage.getItem(
            `${PURCHASE_STORAGE_PREFIX}${orderId}`
        )
        ===
        "1"
    )

}




/**
 * Purchase une seule fois
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

        numItems = 0


    } = purchaseData



    if (
        !orderId ||
        typeof value !== "number"
    ) {
        return false
    }



    if (
        wasPurchaseTracked(orderId)
    ) {

        clearPendingPurchase()

        return true

    }




    const sent =
        trackMetaEvent(

            "Purchase",

            {

                value,

                currency,

                content_type:
                    "product",

                content_ids:
                    contentIds,

                contents,

                num_items:
                    numItems,

                order_id:
                    String(orderId)

            },

            `purchase_${orderId}`

        )



    if (!sent)
        return false




    localStorage.setItem(

        `${PURCHASE_STORAGE_PREFIX}${orderId}`,

        "1"

    )



    clearPendingPurchase()



    return true

}