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
            command: string,
            eventName: string,
            parameters?: Record<string, unknown>,
            options?: Record<string, unknown>
        ) => void


        _fbq?: unknown

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
 *
 * Events:
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


    if (!isMetaPixelReady()) {

        console.warn(
            "[META Pixel] Not ready:",
            eventName
        )

        return false

    }



    try {


        if (eventId) {


            window.fbq!(
                "track",
                eventName,
                parameters,
                {
                    eventID: eventId
                }
            )


        } else {


            window.fbq!(
                "track",
                eventName,
                parameters
            )


        }



        console.log(
            "[META Pixel Event]",
            eventName,
            parameters
        )



        return true



    } catch (error) {


        console.error(
            "[META Pixel Error]",
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
 * Initiate Checkout
 */
export function trackInitiateCheckout({

    value,

    contentIds,

    contents,

    numItems,

    currency = "MAD"


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
 * Sauvegarder Purchase avant page success
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
            "[META] Save purchase error",
            error
        )


        return false

    }

}









/**
 * Récupérer Purchase temporaire
 */
export function getPendingPurchase():

    MetaPurchaseData | null {


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



        if (!data) {

            return null

        }



        return JSON.parse(
            data
        ) as MetaPurchaseData



    } catch {


        return null

    }


}









/**
 * Supprimer Purchase temporaire
 */
export function clearPendingPurchase(): void {


    if (
        typeof window === "undefined"
    ) {

        return

    }



    try {


        sessionStorage.removeItem(
            PENDING_PURCHASE_KEY
        )


    } catch (error) {


        console.warn(
            "[META] Clear purchase error",
            error
        )


    }


}









/**
 * Vérifie si Purchase déjà envoyé
 */
export function wasPurchaseTracked(
    orderId: string | number
): boolean {


    if (
        typeof window === "undefined"
    ) {

        return false

    }



    try {


        return (

            localStorage.getItem(

                `${PURCHASE_STORAGE_PREFIX}${orderId}`

            )

            ===

            "1"

        )


    } catch {


        return false

    }


}









/**
 * Envoie Purchase une seule fois
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
        typeof value !== "number" ||
        Number.isNaN(value)
    ) {

        console.warn(
            "[META] Invalid purchase data"
        )

        return false

    }






    if (
        wasPurchaseTracked(orderId)
    ) {


        console.log(
            "[META] Purchase already tracked",
            orderId
        )


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
            "[META] Cannot save purchase state",
            error
        )


    }







    clearPendingPurchase()



    return true



}