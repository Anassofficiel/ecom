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
const BASE_URL = "https://electromostafa55.ma";

// إعدادات SEO الخاصة بالصفحة الرئيسية
export const metadata: Metadata = {

  title:
    "Electro Mostafa 55 | Électroménager au Maroc - TV, Frigo, Machines à laver",

  description:
    "Electro Mostafa 55 propose électroménager au Maroc: TV, réfrigérateurs, machines à laver, cuisine, promotions et livraison.",

  // الرابط الرسمي للصفحة
  alternates: {
    canonical: "/",
  },

  // بيانات المشاركة على Facebook
  openGraph: {
    url: `${BASE_URL}/`,
    title:
      "Electro Mostafa 55 | Électroménager au Maroc - TV, Frigo, Machines à laver",
    description:
      "Electro Mostafa 55 propose électroménager au Maroc: TV, réfrigérateurs, machines à laver, cuisine, promotions et livraison.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Electro Mostafa 55 | Électroménager au Maroc - TV, Frigo, Machines à laver",
    description:
      "Electro Mostafa 55 propose électroménager au Maroc: TV, réfrigérateurs, machines à laver, cuisine, promotions et livraison.",
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
    name: "Electro Mostafa 55",
    description: "Boutique d'électroménager au Maroc",

    // رابط الصفحة
    url: `${BASE_URL}/`,


    // لغة الصفحة
    inLanguage: "fr-MA",

    // الموقع الرئيسي
    isPartOf: {
      "@type": "WebSite",
      name: "Electro Mostafa 55",
      url: BASE_URL,
    },

    // المجالات المرتبطة بالموقع
    about: [
      "Électroménager",
      "Réfrigérateurs",
      "Machines à laver",
      "Télévisions",
      "fours",
      "climatiseurs",
      "cafetières",
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
                Electro Mostafa 55
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
              Votre magasin d'électroménager Mostafa 55
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