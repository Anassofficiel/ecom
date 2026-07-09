// استيراد Type Metadata الخاصة بـ SEO
import type { Metadata } from "next";

// استيراد Script لإضافة أكواد JSON-LD و SEO
import Script from "next/script";

// استيراد خطوط Google Fonts
import { Inter, Outfit } from "next/font/google";

// استيراد CSS العام للموقع
import "./globals.css";

// استيراد Header و Footer
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// إعداد خط Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// إعداد خط Outfit
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// الرابط الرئيسي للموقع
const siteUrl = "https://electromostafa55.ma";
const siteName = "Electro Mostafa 55";
const siteTitle = "Electro Mostafa 55 | Électroménager au Maroc";
const siteDescription =
  "Electro Mostafa 55 est une boutique d'électroménager au Maroc: TV, réfrigérateurs, machines à laver, cuisine, promotions et livraison.";

// رقم الهاتف
const phone = "+212 658-416769";

// إعدادات SEO الرئيسية للموقع
export const metadata: Metadata = {

  // الرابط الأساسي
  metadataBase: new URL(siteUrl),

  // عنوان الصفحات
  title: {
    default: siteTitle,
    template: "%s | Electro Mostafa",
  },

  // وصف الموقع
  description: siteDescription,

  // الكلمات المفتاحية
  keywords: [
    "Electro Mostafa 55",
    "Electro Mostafa",
    "électroménager maroc",
    "electromenager maroc",
    "TV Maroc",
    "frigo Maroc",
    "réfrigérateur Maroc",
    "machine à laver Maroc",
    "électroménager Casablanca",
    "boutique électroménager Maroc",
  ],

  // الرابط الرسمي للصفحة
  alternates: {
    canonical: "/",
  },

  // اسم التطبيق
  applicationName: siteName,

  // نوع الموقع
  category: "shopping",

  // السماح لـ Google بأرشفة الموقع
  robots: {
    index: true,
    follow: true,
  },

  // بيانات المشاركة على Facebook
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },

  // بيانات المشاركة على Twitter
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

// بيانات Structured Data الخاصة بالشركة
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  telephone: phone,
};

// Layout الرئيسي للموقع
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    // لغة الموقع فرنسية
    <html lang="fr" className="scroll-smooth">

      <body
        className={`${inter.variable} ${outfit.variable} bg-white font-sans antialiased text-gray-900`}
      >

        {/* إضافة Structured Data لمحركات البحث */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* الهيدر يظهر في جميع الصفحات */}
        <Header />

        {/* محتوى الصفحة الحالية */}
        <main className="min-h-screen pt-[120px]">
          {children}
        </main>

        {/* الفوتر يظهر في جميع الصفحات */}
        <Footer />

      </body>
    </html>
  );
}