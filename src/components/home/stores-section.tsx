"use client"

import { useState } from "react"
import { MapPin, Clock, Phone, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const SITE_URL = "https://veneziaelectro.vercel.app"
const MAIN_PHONE = "+212 508788782"

const storesContent = [
  {
    id: "casa",
    city: "Casablanca",
    title: "Electro Mostafa — Casablanca",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sunrise%20in%20Casablanca%20with%20Hassan%20II%20Mosque.jpg",
    imageAlt: "Showroom Electro Mostafa à Casablanca",
    caption:
      "Retrouvez Electro Mostafa à Casablanca pour découvrir notre sélection d'électroménager, TV et équipements pour la maison.",
    address: "Bd Bassatine, Tit Mellil, Casablanca",
    hours: "Lun–Sam: 9h00 – 19h00 | Dim: 10h00 – 17h00",
    phone: MAIN_PHONE,
    mapUrl:
      "https://www.google.com/maps/place/Bd+Bassatine,+Tit+Mellil/@33.5491441,-7.4848297,17z",
    tag: "Casa",
    closesWeek: "19:00",
  },
  {
    id: "marrakech",
    city: "Marrakech",
    title: "Electro Mostafa — Marrakech",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Maroc%20Marrakech%20Jemaa-el-Fna%20Luc%20Viatour.JPG",
    imageAlt: "Showroom Electro Mostafa à Marrakech",
    caption:
      "Visitez notre showroom de Marrakech pour découvrir nos offres en électroménager, télévision et petit équipement de cuisine.",
    address: "Mhamid, Marrakech, Maroc",
    hours: "Lun–Sam: 9h00 – 19h30 | Dim: 10h00 – 17h00",
    phone: MAIN_PHONE,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=31.587111,-8.041778",
    tag: "Marrakech",
    closesWeek: "19:30",
  },
]

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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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

/* ─── sub-component ─── */
function StoreCard({ store }: { store: any }) {
  return (
    <article className="st-card">
      {/* IMAGE */}
      <div className="st-card-img-wrap">
        <img
          src={store.image}
          alt={store.imageAlt}
          className="st-card-img"
          loading="lazy"
        />
        <div className="st-card-img-overlay" />
        <div className="st-card-badge">
          <span className="st-card-badge-dot" />
          Ouvert aujourd'hui
        </div>
        <h3 className="st-card-img-city">{store.city}</h3>
      </div>

      {/* BODY */}
      <div className="st-card-body">
        <p className="st-card-tag">Electro Mostafa — {store.tag}</p>
        <p className="st-card-caption">{store.caption}</p>

        <address className="st-info-list" style={{ fontStyle: "normal" }}>
          <div className="st-info-item">
            <div className="st-info-icon-wrap">
              <MapPin className="st-info-icon" />
            </div>
            <div>
              <p className="st-info-label">Adresse</p>
              <p className="st-info-value">{store.address}</p>
            </div>
          </div>

          <div className="st-info-item">
            <div className="st-info-icon-wrap">
              <Clock className="st-info-icon" />
            </div>
            <div>
              <p className="st-info-label">Horaires</p>
              <p className="st-info-value">{store.hours}</p>
            </div>
          </div>

          <div className="st-info-item">
            <div className="st-info-icon-wrap">
              <Phone className="st-info-icon" />
            </div>
            <div>
              <p className="st-info-label">Téléphone</p>
              <a
                href={`tel:${store.phone.replace(/\s+/g, "")}`}
                className="st-info-phone"
              >
                {store.phone}
              </a>
            </div>
          </div>
        </address>

        <a
          href={store.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir ${store.city} sur Google Maps`}
          className="st-cta"
        >
          Voir sur la Carte
          <ArrowRight className="st-cta-icon" />
        </a>
      </div>
    </article>
  )
}

/* ─── main export ─── */
export function StoresSection() {
  const [active, setActive] = useState(0)

  const goTo = (index: number) => {
    setActive(Math.max(0, Math.min(index, storesContent.length - 1)))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

        /* SECTION */
        .st-section {
          background: #ffffff;
          padding: 96px 0 88px;
          position: relative;
          font-family: 'Inter', sans-serif;
          border-top: 3px solid #c41c1c;
        }

        .st-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 300px;
          background: linear-gradient(180deg, #fdf7f6 0%, #ffffff 100%);
          pointer-events: none;
          z-index: 0;
        }

        .st-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* HEADER */
        .st-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .st-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .st-eyebrow-line {
          width: 26px;
          height: 2px;
          background: #c41c1c;
          border-radius: 2px;
        }

        .st-eyebrow-text {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #c41c1c;
        }

        .st-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 400;
          color: #111;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
        }

        .st-headline em {
          font-style: italic;
          color: #c41c1c;
        }

        .st-subline {
          font-size: 15px;
          font-weight: 300;
          color: #777;
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* DESKTOP GRID */
        .st-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }

        /* CARD */
        .st-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #e8e8e8;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          transition:
            transform 0.45s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.45s cubic-bezier(0.16,1,0.3,1),
            border-color 0.3s;
        }

        .st-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 52px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05);
          border-color: #e0e0e0;
        }

        /* IMAGE */
        .st-card-img-wrap {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .st-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
          filter: brightness(0.85) saturate(0.9);
        }

        .st-card:hover .st-card-img {
          transform: scale(1.07);
          filter: brightness(0.78) saturate(1.0);
        }

        .st-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.52) 100%);
        }

        .st-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.94);
          border-radius: 100px;
          padding: 5px 12px 5px 8px;
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 500;
          color: #111;
          backdrop-filter: blur(8px);
          letter-spacing: 0.01em;
        }

        .st-card-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 6px rgba(22,163,74,0.5);
          flex-shrink: 0;
        }

        .st-card-img-city {
          position: absolute;
          bottom: 16px;
          left: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.25);
        }

        /* BODY */
        .st-card-body {
          padding: 22px 24px 26px;
        }

        .st-card-tag {
          font-size: 10.5px;
          font-weight: 500;
          color: #c41c1c;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0 0 7px;
        }

        .st-card-caption {
          font-size: 13px;
          font-weight: 300;
          color: #666;
          line-height: 1.65;
          margin: 0 0 20px;
        }

        /* INFO LIST */
        .st-info-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f2f2f2;
        }

        .st-info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .st-info-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #fef2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .st-info-icon {
          width: 13px;
          height: 13px;
          color: #c41c1c;
        }

        .st-info-label {
          font-size: 10px;
          font-weight: 500;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          margin: 0 0 2px;
        }

        .st-info-value {
          font-size: 12.5px;
          font-weight: 400;
          color: #222;
          line-height: 1.4;
          margin: 0;
        }

        .st-info-phone {
          font-size: 12.5px;
          font-weight: 500;
          color: #111;
          text-decoration: none;
          transition: color 0.2s;
          display: block;
        }

        .st-info-phone:hover { color: #c41c1c; }

        /* CTA */
        .st-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: #c41c1c;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 10px;
          padding: 14px 22px;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.25s, transform 0.2s;
        }

        .st-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.55s;
        }

        .st-cta:hover { background: #a81717; transform: translateY(-1px); }
        .st-cta:hover::before { left: 100%; }
        .st-cta:active { transform: translateY(0); }

        .st-cta-icon {
          width: 14px;
          height: 14px;
          transition: transform 0.3s;
          flex-shrink: 0;
        }

        .st-cta:hover .st-cta-icon { transform: translateX(4px); }

        /* MOBILE SLIDER */
        .st-slider-wrapper {
          display: none;
          overflow: hidden;
          border-radius: 18px;
        }

        .st-slider-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }

        .st-slider-slide { flex: 0 0 100%; }

        .st-slider-nav {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 24px;
        }

        .st-slider-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid #ddd;
          background: #fff;
          color: #555;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.22s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .st-slider-arrow:hover {
          border-color: #c41c1c;
          color: #c41c1c;
        }

        .st-slider-arrow:disabled { opacity: 0.28; cursor: not-allowed; }

        .st-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .st-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ddd;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s;
        }

        .st-dot.active {
          background: #c41c1c;
          width: 20px;
          border-radius: 100px;
        }

        /* FOOTER */
        .st-footer-note {
          margin-top: 52px;
          padding-top: 26px;
          border-top: 1px solid #f0eeea;
          font-size: 12.5px;
          font-weight: 300;
          color: #aaa;
          line-height: 1.9;
          text-align: center;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        /* RESPONSIVE */
        @media (max-width: 767px) {
          .st-section { padding: 68px 0 56px; }
          .st-grid { display: none; }
          .st-slider-wrapper { display: block; }
          .st-slider-nav { display: flex; }
          .st-card-img-wrap { height: 220px; }
          .st-card-img-city { font-size: 28px; }
        }
      `}</style>

      <section id="magasins" className="st-section" aria-labelledby="st-title">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storesJsonLd) }}
        />

        <div className="st-inner">

          {/* HEADER */}
          <div className="st-header">
            <div className="st-eyebrow">
              <span className="st-eyebrow-line" />
              <span className="st-eyebrow-text">Nos Magasins</span>
              <span className="st-eyebrow-line" />
            </div>
            <h2 id="st-title" className="st-headline">
              Visitez Nos <em>Showrooms</em>
            </h2>
            <p className="st-subline">
              Découvrez nos espaces Electro Mostafa à Casablanca et Marrakech —
              un cadre moderne pour trouver l'électroménager qu'il vous faut.
            </p>
          </div>

          {/* DESKTOP */}
          <div className="st-grid">
            {storesContent.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* MOBILE SLIDER */}
          <div className="st-slider-wrapper">
            <div
              className="st-slider-track"
              style={{ transform: `translateX(calc(-${active * 100}%))` }}
            >
              {storesContent.map((store) => (
                <div key={store.id} className="st-slider-slide">
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </div>

          <div className="st-slider-nav">
            <button
              className="st-slider-arrow"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Précédent"
            >
              <ChevronLeft style={{ width: 15, height: 15 }} />
            </button>
            <div className="st-dots">
              {storesContent.map((_, i) => (
                <button
                  key={i}
                  className={`st-dot ${active === i ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Magasin ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="st-slider-arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === storesContent.length - 1}
              aria-label="Suivant"
            >
              <ChevronRight style={{ width: 15, height: 15 }} />
            </button>
          </div>

          {/* FOOTER NOTE */}
          <p className="st-footer-note">
            Electro Mostafa vous accueille dans ses showrooms au Maroc pour vous faire découvrir
            une large sélection d'électroménager, téléviseurs, équipements de cuisine et offres spéciales.
            Comparez les produits, profitez des promotions et obtenez des conseils avant achat.
          </p>
        </div>
      </section>
    </>
  )
}