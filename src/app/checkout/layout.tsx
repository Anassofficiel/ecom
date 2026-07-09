import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Finaliser la commande | Electro Mostafa 55",
    description: "Page de finalisation de commande Electro Mostafa 55.",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
}

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}