import { MapPin, Clock, Phone, ExternalLink } from "lucide-react"

const SITE_URL = "https://veneziaelectro.vercel.app"
const MAIN_PHONE = "+212 508788782"

const storesContent = [
  {
    id: "casa",
    city: "Casablanca",
    title: "Electro Mostafa — Casablanca",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sunrise%20in%20Casablanca%20with%20Hassan%20II%20Mosque.jpg",
    imageAlt:
      "Showroom Electro Mostafa à Casablanca - électroménager et électronique au Maroc",
    caption:
      "Retrouvez Electro Mostafa à Casablanca pour découvrir notre sélection d’électroménager, TV et équipements pour la maison.",
    address: "Bd Bassatine, Tit Mellil, Casablanca",
    hours: "Lun–Sam: 9h00 – 19h00 | Dim: 10h00 – 17h00",
    phone: MAIN_PHONE,
    mapUrl:
      "https://www.google.com/maps/place/Bd+Bassatine,+Tit+Mellil/@33.5491441,-7.4848297,17z/data=!4m6!3m5!1s0xda63523cf416c45:0xca8831957dc753a4!8m2!3d33.5491441!4d-7.4822548!16s%2Fg%2F1tk9s3jd?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
    closesWeek: "19:00",
  },
  {
    id: "marrakech",
    city: "Marrakech",
    title: "Electro Mostafa — Marrakech",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Maroc%20Marrakech%20Jemaa-el-Fna%20Luc%20Viatour.JPG",
    imageAlt:
      "Showroom Electro Mostafa à Marrakech - électroménager et électronique au Maroc",
    caption:
      "Visitez notre showroom de Marrakech pour découvrir nos offres en électroménager, télévision et petit équipement de cuisine.",
    address: "HXP5+R7X, Marrakech, Maroc",
    hours: "Lun–Sam: 9h00 – 19h30 | Dim: 10h00 – 17h00",
    phone: MAIN_PHONE,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=31.587111,-8.041778",
    closesWeek: "19:30",
  },
]

export function StoresSection() {
  const storesJsonLd = {
    "@context": "https://schema.org",
    "@graph": storesContent.map((store) => ({
      "@type": "ElectronicsStore",
      "@id": `${SITE_URL}/#store-${store.id}`,
      name: store.title,
      url: SITE_URL,
      image: store.image,
      telephone: store.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: store.address,
        addressLocality: store.city,
        addressCountry: "MA",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: store.closesWeek,
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "17:00",
        },
      ],
      sameAs: [store.mapUrl],
    })),
  }

  return (
    <section
      id="magasins"
      className="bg-gradient-to-b from-white to-gray-50 py-16"
      aria-labelledby="stores-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storesJsonLd) }}
      />

      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-gray-900 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-sm">
            Nos Magasins
          </span>

          <h2
            id="stores-title"
            className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            Visitez Nos Showrooms Electro Mostafa
          </h2>

          <p className="mx-auto max-w-3xl text-sm text-gray-500 md:text-base">
            Découvrez nos magasins Electro Mostafa à Casablanca et Marrakech pour
            trouver réfrigérateurs, lave-linge, télévisions, fours et petit
            électroménager dans un cadre moderne, accueillant et premium.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {storesContent.map((store) => (
            <article
              key={store.id}
              className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden md:h-64">
                <img
                  src={store.image}
                  alt={store.imageAlt}
                  title={store.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-900 shadow backdrop-blur-sm">
                    Electro Mostafa
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-2xl font-bold leading-tight md:text-3xl">
                    {store.city}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">{store.caption}</p>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <h4 className="text-xl font-bold text-gray-900">{store.title}</h4>

                <address className="not-italic space-y-4">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="leading-6">{store.address}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                      <Clock className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="leading-6">{store.hours}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                      <Phone className="h-4 w-4 text-red-600" />
                    </div>
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, "")}`}
                      className="font-semibold text-gray-800 transition-colors hover:text-red-600"
                    >
                      {store.phone}
                    </a>
                  </div>
                </address>

                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Voir le magasin ${store.city} sur Google Maps`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
                >
                  <ExternalLink className="h-4 w-4" />
                  Voir sur la Carte
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-red-100 bg-white p-5 text-sm leading-7 text-gray-600 md:p-6">
          Electro Mostafa vous accueille dans ses showrooms au Maroc pour vous
          faire découvrir une large sélection d’électroménager, téléviseurs,
          équipements de cuisine et offres spéciales. Visitez nos magasins pour
          comparer les produits, profiter des promotions et obtenir des conseils
          avant achat.
        </div>
      </div>
    </section>
  )
}