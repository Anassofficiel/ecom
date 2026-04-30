"use client"

import { useCart } from "@/lib/store"
import { useRouter } from "next/navigation"
import { packs } from "@/lib/data"
import type { Pack } from "@/lib/data"

const WHATSAPP_NUMBER = "212608788782"
const BASE_URL = "https://veneziaelectro.vercel.app"

const badgeColors: Record<string, { bg: string; text: string }> = {
  "Best Seller": { bg: "linear-gradient(135deg,#1d4ed8,#3b82f6)", text: "#fff" },
  "Hot Deal": { bg: "linear-gradient(135deg,#ea580c,#f97316)", text: "#fff" },
  "New": { bg: "linear-gradient(135deg,#059669,#10b981)", text: "#fff" },
  "Premium": { bg: "linear-gradient(135deg,#7c3aed,#a78bfa)", text: "#fff" },
  "Trending": { bg: "linear-gradient(135deg,#db2777,#f472b6)", text: "#fff" },
  "Limited": { bg: "linear-gradient(135deg,#be123c,#fb7185)", text: "#fff" },
  "VIP": { bg: "linear-gradient(135deg,#b45309,#fcd34d)", text: "#1a1a1a" },
  "Lifestyle": { bg: "linear-gradient(135deg,#dc2626,#f87171)", text: "#fff" },
  "Family": { bg: "linear-gradient(135deg,#4d7c0f,#84cc16)", text: "#fff" },
  "Smart Choice": { bg: "linear-gradient(135deg,#0369a1,#38bdf8)", text: "#fff" },
}

const PACK_PRODUCT_SPECS: Record<string, Array<Record<string, string>>> = {
  pack1: [
    { Type: "Réfrigérateur bottom freezer", Capacité: "200 L", Refroidissement: "Multi Air Flow" },
    { Type: "Four électrique", Capacité: "45 L", Puissance: "2000 W" },
    { Type: "TV 4K QLED", Taille: '55"', Système: "Google TV" },
  ],
  pack2: [
    { Type: "Machine Expresso", Pression: "15 bar", Réservoir: "1.5 L" },
    { Type: "Stand Mixer", Capacité: "5.5 L", Puissance: "1000 W" },
    { Type: "Panini Grill", Puissance: "2200 W", Surface: "Double non-stick" },
  ],
  pack3: [
    { Type: "Google TV 4K QLED", Taille: '75"', WiFi: "WiFi 5" },
    { Type: "Machine Expresso", Pression: "15 bar", Réservoir: "1.5 L" },
    { Type: "Panini Grill", Puissance: "2000 W", Usage: "Sandwich / Grill" },
  ],
  pack4: [
    { Type: "Lave-linge frontal", Capacité: "9 kg", RPM: "1400" },
    { Type: "Chauffe-eau électrique", Capacité: "50 L", Puissance: "2000 W" },
    { Type: "Fer électrique", Puissance: "1200 W", Semelle: "Anti-adhésive" },
  ],
  pack5: [
    { Type: "Stand Mixer", Capacité: "7 L", Puissance: "1000 W" },
    { Type: "Blender Inox", Capacité: "2 L", Puissance: "700 W" },
    { Type: "Air Fryer Digital", Capacité: "5 L", Programmes: "7" },
  ],
  pack6: [
    { Type: "Réfrigérateur top freezer", Capacité: "420 L", Technologie: "Inverter" },
    { Type: "Lave-linge frontal", Capacité: "10 kg", Technologie: "Smart Digital Motor" },
    { Type: "Hotte murale", Débit: "650 m3/h", Éclairage: "LED" },
  ],
  pack7: [
    { Type: "Air Fryer", Capacité: "3 L", Puissance: "1500 W" },
    { Type: "Air Fryer Digital", Capacité: "5 L", Puissance: "1700 W" },
    { Type: "Barbecue électrique", Longueur: "70 cm", Puissance: "2000 W" },
  ],
  pack8: [
    { Type: "Machine capsules", Réservoir: "0.8 L", Fonction: "Automatique" },
    { Type: "Expresso Pro", Pression: "20 bar", Programmes: "20" },
    { Type: "Expresso auto", Pression: "20 bar", Moulin: "Intégré" },
  ],
  pack9: [
    { Type: "Aspirateur industriel", Capacité: "20 L", Puissance: "1600 W" },
    { Type: "Aspirateur maison", Capacité: "2 L", Filtre: "HEPA" },
    { Type: "Purificateur d'eau", Système: "5 étapes", Débit: "75 GPD" },
  ],
  pack10: [
    { Type: "Google TV 4K QLED", Taille: '75"', Résolution: "4K" },
    { Type: "TV 4K QLED", Taille: '55"', Résolution: "4K Ultra HD" },
    { Type: "Smart TV Android", Taille: '32"', Système: "Android 14" },
  ],
}

// ── Checkout button ───────────────────────────────────────────────────────────
function CheckoutButton({ pack }: { pack: Pack }) {
  const addItem = useCart((state: any) => state.addItem)
  const router = useRouter()

  const handleCheckout = () => {
    addItem({
      id: pack.id,
      name: pack.name,
      price: pack.packPrice,
      image: pack.images?.[0] ?? "",
      quantity: 1,
      category: "pack", // مهم باش مايطيحش error
    })

    router.push("/checkout")
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="btn-checkout"
    >
      Caisse
    </button>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export function PacksSection() {
  const packsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Packs exclusifs Electro Mostafa",
    itemListElement: packs.map((pack, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: pack.name,
        description: pack.description,
        price: pack.packPrice,
        priceCurrency: "MAD",
        url: `${BASE_URL}/#packs`,
      },
    })),
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&display=swap');

        #packs { font-family: 'Barlow', sans-serif; }

        .packs-bg {
          background:
            radial-gradient(ellipse at 8% 12%, rgba(251,191,36,0.07) 0%, transparent 45%),
            radial-gradient(ellipse at 92% 88%, rgba(239,68,68,0.06) 0%, transparent 45%),
            #f9f9f9;
        }

        .packs-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .packs-title-accent {
          position: relative;
          display: inline-block;
        }
        .packs-title-accent::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b);
          background-size: 200% 100%;
          border-radius: 2px;
          animation: shimLine 3s linear infinite;
        }
        @keyframes shimLine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .packs-banner {
          background: linear-gradient(125deg, #831843 0%, #be185d 30%, #f472b6 60%, #fda4af 85%, #fecdd3 100%);
          background-size: 250% 250%;
          animation: bannerShift 7s ease infinite;
        }
        @keyframes bannerShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .banner-title { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }

        .pack-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          background: #fff;
          transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.32s ease;
        }
        .pack-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d, #f59e0b);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: background 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }
        .pack-card:hover { transform: translateY(-8px); box-shadow: 0 28px 70px rgba(0,0,0,0.13); }
        .pack-card:hover::before { background: linear-gradient(135deg, #ef4444, #f97316, #ef4444); }

        .pack-badge {
          position: absolute; left: 13px; top: 13px; z-index: 20;
          border-radius: 999px; padding: 4px 11px;
          font-size: 10px; font-family: 'Barlow', sans-serif;
          font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
          box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        }

        .pack-discount {
          position: absolute; right: 13px; top: 13px; z-index: 20;
          width: 50px; height: 50px; border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #9f1239);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(220,38,38,0.5);
          animation: discPulse 3s ease infinite;
        }
        @keyframes discPulse {
          0%,100% { box-shadow: 0 4px 16px rgba(220,38,38,0.5), 0 0 0 0 rgba(220,38,38,0.3); }
          55%      { box-shadow: 0 4px 16px rgba(220,38,38,0.5), 0 0 0 10px rgba(220,38,38,0); }
        }

 .pack-imgs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.pack-img-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 12px 20px;
  border-right: 1px solid rgba(0,0,0,0.05);
  background: #ffffff;
}

.pack-img-cell:last-child {
  border-right: none;
}
.pack-img-cell img {
  width: 100%;
  height: clamp(150px, 20vw, 220px);
  object-fit: contain;

  /* 🔥 blend */
  mix-blend-mode: multiply;

  /* 🔥 glow */
  filter:
    drop-shadow(0 10px 25px rgba(0,0,0,0.15))
    brightness(1.02);

  transition:
    transform 0.5s cubic-bezier(0.34, 1.6, 0.64, 1),
    filter 0.4s ease;
}
.pack-img-cell::after {
  content: "";
  position: absolute;
  bottom: 10px;
  width: 60%;
  height: 10px;
  background: radial-gradient(circle, rgba(0,0,0,0.15), transparent 70%);
  filter: blur(8px);
  opacity: 0.4;
}
.pack-card:hover .pack-img-cell img {
  transform: scale(1.12) translateY(-6px);
  filter:
    drop-shadow(0 18px 40px rgba(0,0,0,0.25))
    brightness(1.05);
}
        .pack-card:hover .pack-img-cell img {
          transform: scale(1.1) translateY(-4px);
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
        }

        .pack-specs-strip { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid rgba(0,0,0,0.06); }
        .pack-spec-col {
          display: flex; flex-direction: column; gap: 4px;
          padding: 8px 8px 10px;
          border-right: 1px solid rgba(0,0,0,0.06); background: #fafafa;
        }
        .pack-spec-col:last-child { border-right: none; }
        .spec-pill {
          font-size: 9px;
          padding: 2px 5px;
          opacity: 0.8;
          display: inline-flex; align-items: center; gap: 2px;
          background: #fff; border: 1px solid #e9e9e9; border-radius: 6px;
          padding: 2px 6px; font-size: 9.5px; color: #4b5563;
          font-family: 'Barlow', sans-serif; font-weight: 500; line-height: 1.4;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .spec-pill strong { color: #111; font-weight: 700; }

        .pack-body { padding: 18px 20px 20px; }

        .pack-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(20px, 2.8vw, 26px);
          letter-spacing: 0.05em; color: #111827; line-height: 1.1; margin-bottom: 12px;
        }

        .pack-price-row { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 8px; margin-bottom: 16px; }
        .pack-price-new {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(24px, 3.5vw, 30px); color: #dc2626; letter-spacing: 0.03em; line-height: 1;
        }
        .pack-price-old {
          font-size: 13px; font-weight: 500; color: #9ca3af;
          text-decoration: line-through; margin-bottom: 1px; font-family: 'Barlow', sans-serif;
        }
        .pack-savings {
          display: inline-flex; align-items: center; gap: 3px;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0); border: 1px solid #86efac;
          color: #15803d; font-size: 10.5px; font-weight: 700; font-family: 'Barlow', sans-serif;
          border-radius: 999px; padding: 2px 9px; margin-bottom: 1px;
        }

        .pack-btns { display: flex; gap: 10px; }

        .btn-wa {
          display: flex; flex: 1; align-items: center; justify-content: center; gap: 6px;
          border-radius: 12px; padding: 12px 8px;
          font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.02em;
          color: #fff; background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, background 0.22s ease;
        }
        .btn-wa:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(22,163,74,0.42); background: linear-gradient(135deg, #15803d 0%, #16a34a 100%); }
        .btn-wa:active { transform: translateY(0); }

        .btn-checkout {
          display: flex; flex: 1; align-items: center; justify-content: center; gap: 6px;
          border-radius: 12px; padding: 12px 8px;
          font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.02em;
          color: #fff; background: linear-gradient(135deg, #dc2626 0%, #9f1239 100%);
          box-shadow: 0 4px 14px rgba(220,38,38,0.3);
          border: none; cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s ease, background 0.22s ease;
        }
        .btn-checkout:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(220,38,38,0.42); background: linear-gradient(135deg, #b91c1c 0%, #881337 100%); }
        .btn-checkout:active { transform: translateY(0); }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pack-card-anim { animation: cardReveal 0.48s cubic-bezier(0.34,1.2,0.64,1) both; }
      `}</style>

      <section id="packs" className="packs-bg py-14" aria-labelledby="packs-title">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(packsJsonLd) }}
        />

        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-md"
                style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "#1a1a1a", fontFamily: "'Barlow', sans-serif", letterSpacing: "0.1em" }}
              >
                🎁 Offres Groupées
              </span>
            </div>
            <h2 id="packs-title" className="packs-title mb-3" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#111827" }}>
              <span className="packs-title-accent">NOS PACKS</span> EXCLUSIFS 🎁
            </h2>
            <p className="mx-auto max-w-xl leading-relaxed text-gray-500" style={{ fontSize: "clamp(13px, 1.6vw, 15px)", fontFamily: "'Barlow', sans-serif" }}>
              Achetez en pack et économisez davantage sur une sélection d&apos;électroménager,
              TV, cuisine et petit équipement{" "}
              <strong className="font-semibold text-gray-700">Electro Mostafa</strong>.
            </p>
          </div>

          {/* Banner */}
          <div className="packs-banner relative mb-12 overflow-hidden rounded-3xl shadow-xl" style={{ minHeight: "clamp(160px, 22vw, 220px)" }}>
            <div className="absolute rounded-full" style={{ width: "clamp(120px,20vw,280px)", height: "clamp(120px,20vw,280px)", top: "-30%", left: "-5%", background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img src="https://i.postimg.cc/7L37XppJ/image.png" alt="Bannière des packs exclusifs Electro Mostafa" className="h-full w-full object-contain" style={{ opacity: 0.88, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))" }} loading="lazy" />
            </div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(131,24,67,0.75) 0%, rgba(190,24,93,0.5) 45%, transparent 75%)" }} />
            <div className="relative z-10 flex h-full items-center px-6 py-8 sm:px-10">
              <div className="max-w-lg text-white">
                <h3 className="banner-title mb-2 drop-shadow-md" style={{ fontSize: "clamp(20px, 3.5vw, 36px)" }}>
                  🎁 ÉCONOMISEZ PLUS EN ACHETANT PLUS
                </h3>
                <p className="text-white/85" style={{ fontSize: "clamp(12px, 1.5vw, 15px)", fontFamily: "'Barlow', sans-serif" }}>
                  Nos packs combinent les meilleurs appareils à des prix imbattables.
                </p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)" }} />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack, cardIdx) => {
              const specs = PACK_PRODUCT_SPECS[pack.id] ?? []
              const badge = pack.badge ? (badgeColors[pack.badge] ?? null) : null
              const savings = pack.originalPrice - pack.packPrice

              return (
                <article key={pack.id} className="pack-card pack-card-anim" style={{ animationDelay: `${cardIdx * 55}ms` }}>

                  {pack.badge && badge && (
                    <div className="pack-badge" style={{ background: badge.bg, color: badge.text }}>
                      {pack.badge}
                    </div>
                  )}

                  <div className="pack-discount">-{pack.discount}%</div>

                  {/* Images */}
                  <div className="pack-imgs">
                    {pack.images.slice(0, 3).map((img, i) => (
                      <div key={i} className="pack-img-cell">
                        <img src={img} alt={pack.products?.[i] ?? `${pack.name} produit ${i + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>

                  {/* Specs */}
                  <div className="pack-specs-strip">
                    {pack.images.slice(0, 3).map((_, i) => {
                      const productSpecs = specs[i] ?? {}
                      return (
                        <div key={i} className="pack-spec-col">
                          {Object.entries(productSpecs).slice(0, 2).map(([key, val]) => (
                            <span key={key} className="spec-pill">
                              <strong>{key}:</strong> {val}
                            </span>
                          ))}
                        </div>
                      )
                    })}
                  </div>

                  {/* Body */}
                  <div className="pack-body">
                    <h3 className="pack-name">{pack.name}</h3>

                    <div className="pack-price-row">
                      <span className="pack-price-new">{pack.packPrice.toLocaleString("fr-FR")} DH</span>
                      <span className="pack-price-old">{pack.originalPrice.toLocaleString("fr-FR")} DH</span>
                      {savings > 0 && (
                        <span className="pack-savings">💰 -{savings.toLocaleString("fr-FR")} DH</span>
                      )}
                    </div>

                    <div className="pack-btns">
                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Bonjour, je suis intéressé par le pack: ${pack.name} (${pack.packPrice.toLocaleString("fr-FR")} DH)`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Commander le pack ${pack.name} via WhatsApp`}
                        className="btn-wa"
                      >
                        <svg className="flex-shrink-0" width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>

                      {/* Checkout */}
                      <CheckoutButton pack={pack} />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}