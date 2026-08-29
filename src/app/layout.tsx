import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Outfit } from "next/font/google"

import "./globals.css"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const siteUrl = "https://electromostafa55.ma"
const siteName = "Electro Mostafa 55"
const siteTitle = "Electro Mostafa 55 | Électroménager au Maroc"

const siteDescription =
  "Electro Mostafa 55 est une boutique d'électroménager au Maroc: téléviseurs, réfrigérateurs, machines à laver, fours, climatiseurs, air fryers, machines à café, cuisine, promotions et livraison partout au Maroc."

const phone = "+212 658-416769"

// Meta Pixel ID
const META_PIXEL_ID = "24800348739620824"

// Microsoft Clarity Project ID
const CLARITY_PROJECT_ID = "y0wuicqrq7"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | Electro Mostafa 55",
  },

  description: siteDescription,

  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  category: "shopping",

  keywords: [
    "Electro Mostafa 55",
    "Electro Mostafa",
    "ElectroMostafa55",
    "électroménager maroc",
    "electromenager maroc",
    "électroménager Casablanca",
    "électroménager Marrakech",
    "TV Maroc",
    "téléviseur Maroc",
    "frigo Maroc",
    "réfrigérateur Maroc",
    "machine à laver Maroc",
    "four Maroc",
    "climatiseur Maroc",
    "air fryer Maroc",
    "machine à café Maroc",
    "boutique électroménager Maroc",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },

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
    locale: "fr_MA",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,

    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Logo Electro Mostafa 55",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/icon.png"],
  },
}

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName: ["Electro Mostafa", "ElectroMostafa55"],
    url: siteUrl,
    inLanguage: "fr-MA",

    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  },

  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: ["Electro Mostafa", "ElectroMostafa55"],
    url: siteUrl,

    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icon.png`,
      width: 512,
      height: 512,
    },

    image: `${siteUrl}/icon.png`,
    telephone: phone,
    description: siteDescription,
  },

  {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${siteUrl}/#store`,
    name: siteName,
    alternateName: "ElectroMostafa55",
    url: siteUrl,
    image: `${siteUrl}/icon.png`,
    logo: `${siteUrl}/icon.png`,
    telephone: phone,
    priceRange: "$$",
    description: siteDescription,

    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Tit Mellil",
      addressRegion: "Casablanca-Settat",
      postalCode: "20606",
      streetAddress: "Bd Bassatine, Tit Mellil",
    },
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} bg-white font-sans antialiased text-gray-900`}
      >
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      (function(f,b,e,v,n,t,s)
      {
        if(f.fbq) return;

        n=f.fbq=function(){
          n.callMethod ?
          n.callMethod.apply(n,arguments) :
          n.queue.push(arguments)
        };

        if(!f._fbq) f._fbq=n;

        n.push=n;
        n.loaded=true;
        n.version='2.0';
        n.queue=[];

        t=b.createElement(e);
        t.async=true;
        t.src=v;

        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);

      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      try {
        fbq('init','${META_PIXEL_ID}');

        setTimeout(function(){
          if(window.fbq){
            fbq('track','PageView');
          }
        },1000);

      } catch(e) {
        console.warn('Meta Pixel error:',e);
      }
    `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){
                  (c[a].q=c[a].q||[]).push(arguments)
                };

                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;

                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);

              })(
                window,
                document,
                "clarity",
                "script",
                "${CLARITY_PROJECT_ID}"
              );
            `,
          }}
        />

        {/* Meta Pixel fallback إذا JavaScript مطفّي */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* Structured Data SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Header />

        <main className="min-h-screen pt-[120px]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}