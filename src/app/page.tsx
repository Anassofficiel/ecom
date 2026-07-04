// استيراد Type Metadata الخاصة بـ SEO
import type { Metadata } from "next";

// استيراد Script لإضافة JSON-LD
import Script from "next/script";

// استيراد مكونات الصفحة الرئيسية
import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { PromotionsSection } from "@/components/home/promotions-section";
import { BestSellersSection } from "@/components/home/best-sellers-section";
import { PacksSection } from "@/components/home/packs-section";
import { StoresSection } from "@/components/home/stores-section";

// الرابط الرئيسي للموقع
const BASE_URL = "https://veneziaelectro.vercel.app";

// إعدادات SEO الخاصة بالصفحة الرئيسية
export const metadata: Metadata = {

  // عنوان الصفحة في Google
  title:
    "Electro Mostafa Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver",

  // وصف الصفحة
  description:
    "Achetez électroménager, téléviseurs, réfrigérateurs, machines à laver...",

  // الرابط الرسمي للصفحة
  alternates: {
    canonical: "/",
  },

  // بيانات المشاركة على Facebook
  openGraph: {
    url: `${BASE_URL}/`,
    title:
      "Electro Mostafa Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver",
    description:
      "Achetez électroménager, téléviseurs, réfrigérateurs...",
    type: "website",
  },

  // بيانات المشاركة على Twitter
  twitter: {
    card: "summary_large_image",
    title:
      "Electro Mostafa Maroc | Électroménager, TV, Réfrigérateurs et Machines à laver",
    description:
      "Achetez électroménager, téléviseurs, réfrigérateurs...",
  },
};

// الصفحة الرئيسية
export default function HomePage() {

  // Structured Data لتحسين SEO
  const homePageJsonLd = {

    "@context": "https://schema.org",

    // نوع الصفحة
    "@type": "WebPage",

    // اسم الصفحة
    name: "Electro Mostafa Maroc",

    // رابط الصفحة
    url: `${BASE_URL}/`,

    // وصف الصفحة
    description:
      "Boutique d'électroménager au Maroc",

    // لغة الصفحة
    inLanguage: "fr-MA",

    // الموقع الرئيسي
    isPartOf: {
      "@type": "WebSite",
      name: "Electro Mostafa Maroc",
      url: BASE_URL,
    },

    // المجالات المرتبطة بالموقع
    about: [
      "Électroménager",
      "Réfrigérateurs",
      "Machines à laver",
      "Télévisions",
    ],
  };

  return (
    <>

      {/* إضافة Structured Data لمحركات البحث */}
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd)
        }}
      />

      {/* الصفحة الرئيسية */}
      <main className="min-h-screen bg-gray-50">

        {/* البانر الرئيسي */}
        <Hero />

        {/* تقديم مختصر للموقع */}
        <section>
          <div>
            <div>

              {/* اسم المتجر */}
              <span>
                Electro Mostafa Maroc
              </span>

              {/* العنوان الرئيسي */}
              <h1>
                Électroménager Mostafa premium pour votre maison
              </h1>

              {/* وصف المتجر */}
              <p>
                Découvrez notre sélection de réfrigérateurs,
                machines à laver et télévisions...
              </p>

            </div>
          </div>
        </section>

        {/* قسم التصنيفات */}
        <CategoriesSection />

        {/* قسم المنتجات الأكثر مبيعاً */}
        <BestSellersSection />

        {/* قسم العروض والتخفيضات */}
        <PromotionsSection />

        {/* قسم الباكات والعروض المجمعة */}
        <PacksSection />

        {/* قسم المتاجر والفروع */}
        <StoresSection />

        {/* معلومات إضافية عن المتجر */}
        <section>
          <div>

            {/* عنوان القسم */}
            <h2>
              Votre magasin d'électroménager Mostafa au Maroc
            </h2>

            {/* وصف إضافي */}
            <p>
              Electro Mostafa propose une large gamme
              d'appareils électroménagers.
            </p>

          </div>
        </section>

      </main>
    </>
  );
}