import type { Metadata } from "next";
import Script from "next/script";
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

const siteUrl = "https://veneziaelectro.vercel.app";
const siteName = "Electro Mostafa Maroc";

// 🔥 Title optimized (قصير وقوي)
const siteTitle = "Electro Mostafa Maroc | TV, Frigo, Machine à laver";

// 🔥 Description optimized (150-160)
const siteDescription =
  "Achetez TV, frigo, machine à laver et électroménager au Maroc. Prix promo, livraison rapide et qualité garantie chez Electro Mostafa.";

const phone = "+212508788782";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | Electro Mostafa",
  },

  description: siteDescription,

  keywords: [
    "electroménager maroc",
    "tv maroc",
    "frigo maroc",
    "machine à laver maroc",
    "Electro Mostafa",
    "électroménager casablanca",
  ],

  alternates: {
    canonical: "/",
  },

  applicationName: siteName,
  category: "shopping",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "fr_MA",
    images: [
      {
        url: "/placeholder.png", // 🔥 مهم تضيف صورة حقيقية من بعد
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/placeholder.png"],
  },

  other: {
    "geo.region": "MA",
    "geo.placename": "Casablanca, Marrakech",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  telephone: phone,
  sameAs: [
    "https://www.facebook.com/profile.php?id=100089842077600",
    "https://www.instagram.com/wny8868/",
    "https://www.tiktok.com/@electromostafa55",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} bg-white font-sans antialiased text-gray-900`}
      >
        {/* 🔥 Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Header />
        <main className="min-h-screen pt-[90px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}