import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veneziaelectro.vercel.app"),

  title: {
    default: "Electro Mostafa Maroc | Électroménager au Maroc",
    template: "%s | Electro Mostafa Maroc",
  },

  description:
    "Achetez électroménager, TV, réfrigérateurs, lave-linge et fours chez Electro Mostafa au Maroc. Produits premium, promos et livraison rapide.",

  alternates: {
    canonical: "/",
  },

  applicationName: "Electro Mostafa Maroc",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://veneziaelectro.vercel.app",
    siteName: "Electro Mostafa Maroc",
    title: "Electro Mostafa Maroc | Électroménager au Maroc",
    description:
      "Achetez électroménager, TV, réfrigérateurs, lave-linge et fours chez Electro Mostafa au Maroc.",
    locale: "fr_MA",
  },

  twitter: {
    card: "summary_large_image",
    title: "Electro Mostafa Maroc | Électroménager au Maroc",
    description:
      "Produits premium, promos et livraison rapide chez Electro Mostafa au Maroc.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Header />
        <main className="min-h-screen pt-[170px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}