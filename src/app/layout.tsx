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
const siteTitle = "Electro Mostafa Maroc | Électroménager, TV et Cuisine au Maroc";
const siteDescription =
  "Achetez électroménager, TV, réfrigérateurs, lave-linge, fours et équipements de cuisine chez Electro Mostafa au Maroc. Promotions, showrooms et livraison rapide.";
const phone = "+212508788782";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | Electro Mostafa Maroc",
  },

  description: siteDescription,

  alternates: {
    canonical: "/",
  },

  applicationName: siteName,

  category: "shopping",

  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "fr_MA",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },

  other: {
    "geo.region": "MA",
    "geo.placename": "Casablanca, Marrakech",
    "format-detection": "telephone=yes",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      telephone: phone,
      sameAs: [
        "https://www.facebook.com/profile.php?id=100089842077600",
        "https://www.instagram.com/wny8868/",
        "https://www.tiktok.com/@electromostafa55",
        "https://www.youtube.com/اواني مصطفى",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: phone,
          contactType: "customer service",
          areaServed: "MA",
          availableLanguage: ["fr", "ar"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "fr-MA",
    },
    {
      "@type": "Store",
      "@id": `${siteUrl}/#casablanca-store`,
      name: "Electro Mostafa — Casablanca",
      url: siteUrl,
      telephone: phone,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Sunrise%20in%20Casablanca%20with%20Hassan%20II%20Mosque.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bd Bassatine, Tit Mellil",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "17:00",
        },
      ],
      sameAs: [
        "https://www.google.com/maps/place/Bd+Bassatine,+Tit+Mellil/@33.5491441,-7.4848297,17z/data=!4m6!3m5!1s0xda63523cf416c45:0xca8831957dc753a4!8m2!3d33.5491441!4d-7.4822548!16s%2Fg%2F1tk9s3jd?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
      ],
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "Store",
      "@id": `${siteUrl}/#marrakech-store`,
      name: "Electro Mostafa — Marrakech",
      url: siteUrl,
      telephone: phone,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Maroc%20Marrakech%20Jemaa-el-Fna%20Luc%20Viatour.JPG",
      address: {
        "@type": "PostalAddress",
        streetAddress: "HXP5+R7X",
        addressLocality: "Marrakech",
        addressCountry: "MA",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "17:00",
        },
      ],
      sameAs: [
        "https://www.google.com/maps/search/?api=1&query=31.587111,-8.041778",
      ],
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} bg-white font-sans antialiased text-gray-900`}
      >
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