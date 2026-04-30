"use client"

import * as React from "react"
import { getPromotionProducts } from "@/lib/data"
import type { Product } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"

const PROMO_END = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
const ITEMS_PER_PAGE = 5

const FILTER_TABS = [
  { id: "all", label: "Voir Tout", emoji: "⭐" },
  { id: "kitchen", label: "Cuisine", emoji: "🍳" },
  { id: "laundry", label: "Lavage & Froid", emoji: "🧺" },
  { id: "tech", label: "TV & Tech", emoji: "📺" },
  { id: "coffee", label: "Café & Petits Élec.", emoji: "☕" },
] as const

type FilterTabId = (typeof FILTER_TABS)[number]["id"]

// ─── Sound helper ─────────────────────────────────────────────────────────────
function playPopupSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08)
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.18)
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.4)
  } catch { }
}

function playCloseSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(660, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.25)
  } catch { }
}

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [time, setTime] = React.useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  React.useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setTime({ days: 0, hours: 0, mins: 0, secs: 0 }); return }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target])
  return time
}

// ─── Interleave helper ────────────────────────────────────────────────────────
function interleaveProductsByCategory(items: Product[]): Product[] {
  const groups: Record<string, Product[]> = {}
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  }
  const categoryOrder = [
    "Refrigerators", "Washing Machines", "Televisions", "Coffee Machines",
    "Kitchen Appliances", "Air Fryers", "Ovens", "Dishwashers", "Small Appliances", "Cookware",
  ]
  const orderedGroups = categoryOrder.map(c => groups[c] || []).filter(g => g.length > 0)
  const result: Product[] = []
  let added = true
  while (added) {
    added = false
    for (const group of orderedGroups) {
      if (group.length > 0) { result.push(group.shift()!); added = true }
    }
  }
  return result
}

function mapFilterGroup(category: string): Exclude<FilterTabId, "all"> | "other" {
  const c = category.toLowerCase()
  if (["kitchen appliances", "ovens", "air fryers", "cookware"].includes(c)) return "kitchen"
  if (["washing machines", "refrigerators"].includes(c)) return "laundry"
  if (["televisions"].includes(c)) return "tech"
  if (["coffee machines", "small appliances"].includes(c)) return "coffee"
  return "other"
}

const ALL_PROMO_PRODUCTS = getPromotionProducts().filter(i => i.isActive !== false)
const ALL_INTERLEAVED_PROMO_PRODUCTS = interleaveProductsByCategory([...ALL_PROMO_PRODUCTS])

// ─── Animated digit (smooth number transition) ───────────────────────────────
function AnimDigit({ val }: { val: string }) {
  const [display, setDisplay] = React.useState(val)
  const [anim, setAnim] = React.useState(false)
  const prev = React.useRef(val)

  React.useEffect(() => {
    if (val === prev.current) return
    prev.current = val
    setAnim(true)
    const t = setTimeout(() => { setDisplay(val); setAnim(false) }, 200)
    return () => clearTimeout(t)
  }, [val])

  return (
    <span
      className="digit-char"
      data-anim={anim ? "1" : "0"}
    >
      {display}
    </span>
  )
}

// ─── Countdown block ──────────────────────────────────────────────────────────
function CountdownBlock({ val, label, isLast }: { val: number; label: string; isLast?: boolean }) {
  const str = String(val).padStart(2, "0")
  return (
    <div className="cd-unit">
      <div className="cd-card" aria-label={`${val} ${label}`}>
        {/* top shine */}
        <div className="cd-shine" />
        {/* center line */}
        <div className="cd-line" />
        <div className="cd-digits">
          <AnimDigit val={str[0]} />
          <AnimDigit val={str[1]} />
        </div>
        <p className="cd-label">{label}</p>
      </div>
      {!isLast && <span className="cd-sep" aria-hidden="true">:</span>}
    </div>
  )
}

function PromotionsCountdown() {
  const t = useCountdown(PROMO_END)
  const blocks = [
    { val: t.days, label: "JOURS" },
    { val: t.hours, label: "HEURES" },
    { val: t.mins, label: "MIN" },
    { val: t.secs, label: "SEC" },
  ]
  return (
    <div className="cd-wrapper">
      <div className="cd-row" aria-live="polite" aria-label="Compte à rebours">
        {blocks.map((b, i) => (
          <CountdownBlock key={b.label} val={b.val} label={b.label} isLast={i === blocks.length - 1} />
        ))}
      </div>
      <div className="cd-img-wrap">
        <img
          src="https://i.postimg.cc/C5GxVgsf/image.png"
          alt="Super Promos Electro Mostafa"
          className="cd-img"
          loading="lazy" decoding="async" width={1200} height={675}
        />
      </div>
    </div>
  )
}

// ─── Promo Popup ──────────────────────────────────────────────────────────────
function PromoPopup({ onClose }: { onClose: () => void }) {
  const t = useCountdown(PROMO_END)

  return (
    <div className="popup-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Offre spéciale">
      <div className="popup-container" onClick={e => e.stopPropagation()}>
        {/* Corner ribbons */}
        <div className="popup-ribbon popup-ribbon-tl">SOLDES</div>
        <div className="popup-ribbon popup-ribbon-tr">-50%</div>

        {/* Animated particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="popup-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
            fontSize: `${8 + Math.random() * 12}px`,
          }}>
            {["🎉", "✨", "🔥", "💥", "⭐", "🎊"][i % 6]}
          </span>
        ))}

        {/* Close button */}
        <button className="popup-close" onClick={() => { playCloseSound(); onClose() }} aria-label="Fermer">×</button>

        {/* Promo image */}
        <div className="popup-img-wrap">
          <img
            src="https://i.postimg.cc/C5GxVgsf/image.png"
            alt="Super Promos Electro Mostafa"
            className="popup-img"
            loading="eager" decoding="async"
          />
          <div className="popup-img-overlay" />
        </div>

        {/* Content */}
        <div className="popup-body">
          <div className="popup-badge">🔥 OFFRE EXCLUSIVE</div>
          <h2 className="popup-title">
            JUSQU&apos;À<br />
            <span className="popup-percent">-50%</span>
          </h2>
          <p className="popup-sub">
            Sur une sélection premium <strong>Electro Mostafa</strong>
          </p>

          {/* Mini countdown */}
          <div className="popup-countdown">
            {[
              { v: t.days, l: "J" },
              { v: t.hours, l: "H" },
              { v: t.mins, l: "M" },
              { v: t.secs, l: "S" },
            ].map((b, i, arr) => (
              <React.Fragment key={b.l}>
                <div className="popup-cd-block">
                  <span className="popup-cd-val">{String(b.v).padStart(2, "0")}</span>
                  <span className="popup-cd-lbl">{b.l}</span>
                </div>
                {i < arr.length - 1 && <span className="popup-cd-sep">:</span>}
              </React.Fragment>
            ))}
          </div>

          <button
            className="popup-cta"
            onClick={() => {
              playCloseSound()
              onClose()
              document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Voir les Promotions →
          </button>
          <p className="popup-hint">Offre valable jusqu&apos;à épuisement des stocks</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function PromotionsSection() {
  const [activeTab, setActiveTab] = React.useState<FilterTabId>("all")
  const [page, setPage] = React.useState(1)
  const [animKey, setAnimKey] = React.useState(0)
  const [showPopup, setShowPopup] = React.useState(false)

  // Auto-open popup after 2s
  React.useEffect(() => {
    const t = setTimeout(() => {
      setShowPopup(true)
      playPopupSound()
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  const displayed = React.useMemo(() => {
    if (activeTab === "all") return ALL_INTERLEAVED_PROMO_PRODUCTS
    return ALL_PROMO_PRODUCTS.filter(p => mapFilterGroup(p.category) === activeTab)
  }, [activeTab])

  const totalPages = Math.max(1, Math.ceil(displayed.length / ITEMS_PER_PAGE))
  const paginated = React.useMemo(() => displayed.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE), [displayed, page])

  React.useEffect(() => { setPage(1) }, [activeTab])

  const scrollToPromotions = () => document.getElementById("promotions")?.scrollIntoView({ behavior: "smooth" })
  const handleTabChange = (id: FilterTabId) => { setActiveTab(id); setAnimKey(k => k + 1) }
  const goToPage = (n: number) => { setPage(n); setAnimKey(k => k + 1); scrollToPromotions() }

  return (
    <>
      {/* ── Popup ── */}
      {showPopup && <PromoPopup onClose={() => setShowPopup(false)} />}

      <style>{`
        /* ── Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&display=swap');

        #promotions { font-family: 'Barlow', sans-serif; }

        /* ── Section bg ── */
        .promo-section-inner {
          background:
            radial-gradient(ellipse at 10% 20%, rgba(220,38,38,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(251,146,60,0.04) 0%, transparent 50%),
            #f9fafb;
          position: relative;
          overflow: hidden;
        }

        /* ── Decorative colored ribbons / threads ── */
        .promo-section-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg,
            #dc2626 0%, #f97316 16.6%, #eab308 33.2%, #22c55e 50%,
            #3b82f6 66.6%, #a855f7 83.2%, #dc2626 100%
          );
          background-size: 200% 100%;
          animation: rainbowSlide 4s linear infinite;
          z-index: 10;
        }
        .promo-section-inner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg,
            #a855f7 0%, #3b82f6 16.6%, #22c55e 33.2%, #eab308 50%,
            #f97316 66.6%, #dc2626 83.2%, #a855f7 100%
          );
          background-size: 200% 100%;
          animation: rainbowSlide 4s linear infinite reverse;
          z-index: 10;
        }
        @keyframes rainbowSlide {
          0%   { background-position: 0% 0; }
          100% { background-position: -200% 0; }
        }

        /* Diagonal colored thread lines across bg */
        .promo-threads {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .promo-thread {
          position: absolute;
          height: 2px;
          width: 120%;
          left: -10%;
          border-radius: 99px;
          opacity: 0.12;
          animation: threadSlide 8s ease-in-out infinite;
        }
        .promo-thread:nth-child(1) { top: 18%; background: linear-gradient(90deg, #dc2626, #f97316); transform: rotate(-2deg); animation-delay: 0s; }
        .promo-thread:nth-child(2) { top: 35%; background: linear-gradient(90deg, #eab308, #22c55e); transform: rotate(1.5deg); animation-delay: -2s; }
        .promo-thread:nth-child(3) { top: 55%; background: linear-gradient(90deg, #3b82f6, #a855f7); transform: rotate(-1deg); animation-delay: -4s; }
        .promo-thread:nth-child(4) { top: 72%; background: linear-gradient(90deg, #f97316, #dc2626); transform: rotate(2deg); animation-delay: -1s; }
        .promo-thread:nth-child(5) { top: 88%; background: linear-gradient(90deg, #a855f7, #3b82f6); transform: rotate(-1.5deg); animation-delay: -3s; }
        @keyframes threadSlide {
          0%,100% { transform: translateX(0) rotate(var(--r, -1.5deg)); }
          50%     { transform: translateX(20px) rotate(var(--r, -1.5deg)); }
        }

        /* ── Section title ── */
        .promo-main-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .promo-title-accent { position: relative; display: inline-block; }
        .promo-title-accent::after {
          content: '';
          position: absolute;
          bottom: -5px; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg, #dc2626, #f97316, #eab308, #dc2626);
          background-size: 300% 100%;
          border-radius: 3px;
          animation: shimLine 2.5s linear infinite;
        }
        @keyframes shimLine {
          0%   { background-position: 300% 0; }
          100% { background-position: -300% 0; }
        }

        /* ── Badge pulse ── */
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
          50%     { box-shadow: 0 0 0 10px rgba(220,38,38,0); }
        }
        .badge-pulse { animation: badgePulse 2.4s ease infinite; }

        /* ── Hero banner ── */
        .promo-hero-bg {
          background: linear-gradient(125deg, #7f0000 0%, #b91c1c 35%, #dc2626 60%, #e11d48 80%, #9f1239 100%);
          background-size: 300% 300%;
          animation: heroShift 8s ease infinite;
        }
        @keyframes heroShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .promo-scanlines::after {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px);
          pointer-events: none; border-radius: inherit;
        }

        /* Hero colored border threads */
        .promo-hero-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 20;
        }
        .promo-hero-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 3px;
          background: linear-gradient(135deg, #fde68a, #f97316, #dc2626, #a855f7, #3b82f6, #fde68a);
          background-size: 400% 400%;
          animation: borderShift 6s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        @keyframes borderShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .promo-stripe {
          position: absolute; top: -40%; right: -5%;
          width: 420px; height: 200%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.055), rgba(255,255,255,0.02));
          transform: rotate(-18deg); pointer-events: none;
        }
        .promo-orb-1 { animation: orbFloat1 7s ease-in-out infinite; }
        .promo-orb-2 { animation: orbFloat2 9s ease-in-out infinite; }
        .promo-orb-3 { animation: orbFloat3 6s ease-in-out infinite; }
        @keyframes orbFloat1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(1.08)} }
        @keyframes orbFloat2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(14px) scale(0.95)} }
        @keyframes orbFloat3 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-12px)} }

        /* ── COUNTDOWN ── */
        .cd-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
        }
        @media (min-width: 1280px) {
          .cd-wrapper { flex-direction: row; width: auto; gap: 24px; }
        }
        .cd-row {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .cd-unit {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @media (min-width: 640px) { .cd-unit { gap: 10px; } }

        .cd-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .cd-shine {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%);
          pointer-events: none;
          z-index: 5;
        }
        .cd-digits {
          display: flex;
          gap: 3px;
          background: linear-gradient(160deg, #1a0000 0%, #2d0000 50%, #1a0000 100%);
          border-radius: 14px;
          padding: clamp(12px,2vw,18px) clamp(12px,2vw,20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.1),
            0 8px 32px rgba(0,0,0,0.6),
            0 0 40px rgba(220,38,38,0.25),
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(0,0,0,0.35);
          position: relative;
          overflow: hidden;
        }
        /* Center divider line */
        .cd-line {
          position: absolute;
          left: 14px; right: 14px;
          top: 50%;
          height: 1.5px;
          background: rgba(0,0,0,0.55);
          z-index: 10;
          pointer-events: none;
        }
        /* Top half highlight */
        .cd-digits::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: rgba(255,255,255,0.03);
          pointer-events: none;
        }

        .cd-label {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(7px,1.1vw,10px);
          font-weight: 800;
          letter-spacing: 0.2em;
          color: rgba(253,230,138,0.8);
          text-transform: uppercase;
          text-align: center;
        }
        .cd-sep {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(26px,4.5vw,46px);
          color: rgba(253,230,138,0.65);
          line-height: 1;
          padding-bottom: 22px;
          text-shadow: 0 0 16px rgba(253,230,138,0.5);
          animation: sepBlink 1s step-end infinite;
        }
        @keyframes sepBlink {
          0%,49%   { opacity: 1; }
          50%,100% { opacity: 0.2; }
        }

        /* Digit character */
        .digit-char {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(30px,5.5vw,52px);
          color: #fff;
          line-height: 1;
          min-width: clamp(18px,3vw,30px);
          text-align: center;
          letter-spacing: -0.01em;
          text-shadow: 0 0 20px rgba(253,230,138,0.4), 0 2px 8px rgba(0,0,0,0.5);
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease;
        }
        .digit-char[data-anim="1"] {
          transform: translateY(-6px) scale(1.08);
          opacity: 0.7;
        }

        .cd-img-wrap { flex-shrink: 0; width: clamp(170px,22vw,280px); }
        .cd-img {
          width: 100%;
          height: auto;
          border-radius: 16px;
          object-fit: contain;
          max-height: clamp(95px,14vw,155px);
          filter: drop-shadow(0 6px 24px rgba(0,0,0,0.5));
        }

        /* ── Filter tabs ── */
        .promo-tab {
          position: relative; overflow: hidden;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .promo-tab::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #dc2626, #9f1239);
          opacity: 0; transition: opacity 0.25s ease; border-radius: inherit;
        }
        .promo-tab.active::before  { opacity: 1; }
        .promo-tab.active {
          color: white; border-color: transparent;
          box-shadow: 0 6px 24px rgba(220,38,38,0.45);
          transform: translateY(-2px) scale(1.02);
        }
        .promo-tab:not(.active):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220,38,38,0.15);
        }
        .promo-tab span, .promo-tab .tab-label { position: relative; z-index: 1; }

        /* ── Product card entrance ── */
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .promo-card-anim { animation: cardIn 0.38s cubic-bezier(0.34,1.3,0.64,1) both; }

        /* ── Count pill ── */
        .promo-count-pill {
          background: linear-gradient(135deg, #fff7ed, #fff);
          border: 1.5px solid #fed7aa; color: #c2410c;
          font-weight: 700; font-size: 13px; font-family: 'Barlow', sans-serif;
          padding: 4px 14px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 5px;
          box-shadow: 0 2px 8px rgba(194,65,12,0.1);
        }

        /* ── Pagination ── */
        .pag-btn {
          display: flex; align-items: center; justify-content: center;
          height: 40px; min-width: 40px; border-radius: 10px;
          font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 14px;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          border: 1.5px solid #e5e7eb; background: white; color: #374151; cursor: pointer;
        }
        .pag-btn:hover:not(:disabled):not(.pag-active) {
          border-color: #dc2626; color: #dc2626;
          transform: translateY(-2px); box-shadow: 0 4px 12px rgba(220,38,38,0.15);
        }
        .pag-btn.pag-active {
          background: linear-gradient(135deg, #dc2626, #9f1239);
          color: white; border-color: transparent;
          transform: scale(1.12); box-shadow: 0 4px 16px rgba(220,38,38,0.4);
        }
        .pag-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* Hero left title */
        .hero-big-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.02em;
          line-height: 0.92;
          text-shadow: 0 2px 24px rgba(0,0,0,0.35);
        }

        /* ════════════════════════════════
           POPUP STYLES
        ════════════════════════════════ */
        .popup-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: backdropIn 0.35s ease;
          padding: 16px;
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .popup-container {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: 28px;
          overflow: hidden;
          background: #0a0000;
          box-shadow:
            0 0 0 2px rgba(253,230,138,0.25),
            0 30px 80px rgba(0,0,0,0.8),
            0 0 80px rgba(220,38,38,0.3);
          animation: popupBounceIn 0.55s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes popupBounceIn {
          from { opacity: 0; transform: scale(0.6) translateY(40px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Animated colored border on popup */
        .popup-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 2.5px;
          background: linear-gradient(135deg, #fde68a, #f97316, #dc2626, #a855f7, #3b82f6, #fde68a);
          background-size: 400% 400%;
          animation: popupBorder 4s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: 20;
          pointer-events: none;
        }
        @keyframes popupBorder {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Ribbons */
        .popup-ribbon {
          position: absolute;
          z-index: 30;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: #0a0000;
          background: linear-gradient(135deg, #fde68a, #f97316);
          padding: 4px 24px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.4);
        }
        .popup-ribbon-tl {
          top: 24px;
          left: -22px;
          transform: rotate(-40deg);
          width: 120px;
          text-align: center;
        }
        .popup-ribbon-tr {
          top: 24px;
          right: -22px;
          transform: rotate(40deg);
          width: 120px;
          text-align: center;
          background: linear-gradient(135deg, #dc2626, #9f1239);
          color: #fde68a;
        }

        /* Floating particles */
        .popup-particle {
          position: absolute;
          top: -20px;
          pointer-events: none;
          animation: particleFall linear infinite;
          z-index: 25;
          user-select: none;
        }
        @keyframes particleFall {
          0%  { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(520px) rotate(720deg); opacity: 0; }
        }

        /* Close button */
        .popup-close {
          position: absolute;
          top: 14px; right: 14px;
          z-index: 50;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
        }
        .popup-close:hover {
          background: rgba(220,38,38,0.6);
          transform: rotate(90deg) scale(1.1);
        }

        /* Popup image */
        .popup-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        .popup-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .popup-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,0,0,0.1) 0%, rgba(10,0,0,0.85) 100%);
        }

        /* Popup body */
        .popup-body {
          padding: 20px 28px 28px;
          text-align: center;
          position: relative;
          z-index: 5;
        }
        .popup-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #dc2626, #9f1239);
          color: white;
          font-family: 'Barlow', sans-serif;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 14px;
          box-shadow: 0 4px 16px rgba(220,38,38,0.5);
          animation: badgePulse 2s ease infinite;
        }
        .popup-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px,8vw,52px);
          line-height: 0.95;
          letter-spacing: 0.02em;
          color: white;
          margin-bottom: 10px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.4);
        }
        .popup-percent {
          color: #fde68a;
          text-shadow: 0 0 40px rgba(253,230,138,0.7), 0 2px 10px rgba(0,0,0,0.4);
          font-size: 1.2em;
        }
        .popup-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 18px;
          line-height: 1.5;
        }
        .popup-sub strong { color: white; }

        /* Mini countdown in popup */
        .popup-countdown {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 20px;
          padding: 14px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          backdrop-filter: blur(4px);
        }
        .popup-cd-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .popup-cd-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: #fde68a;
          line-height: 1;
          text-shadow: 0 0 20px rgba(253,230,138,0.6);
          min-width: 40px;
          text-align: center;
        }
        .popup-cd-lbl {
          font-family: 'Barlow', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
        }
        .popup-cd-sep {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: rgba(253,230,138,0.4);
          padding-bottom: 14px;
          animation: sepBlink 1s step-end infinite;
        }

        /* CTA */
        .popup-cta {
          width: 100%;
          padding: 15px 24px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #9f1239 100%);
          background-size: 200% 200%;
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 0.08em;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 8px 28px rgba(220,38,38,0.5);
          margin-bottom: 10px;
          animation: ctaPulse 2.5s ease infinite;
        }
        .popup-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 40px rgba(220,38,38,0.65);
          background-position: right center;
        }
        @keyframes ctaPulse {
          0%,100% { box-shadow: 0 8px 28px rgba(220,38,38,0.5); }
          50%     { box-shadow: 0 8px 40px rgba(220,38,38,0.8); }
        }
        .popup-hint {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          font-style: italic;
        }
      `}</style>

      <section id="promotions" className="py-14" aria-labelledby="promotions-title">
        <div className="promo-section-inner" style={{ position: "relative" }}>

          {/* Decorative colored threads */}
          <div className="promo-threads" aria-hidden="true">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`promo-thread promo-thread-${i}`} />)}
          </div>

          <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 1 }}>

            {/* ── Header ── */}
            <div className="mb-10 text-center">
              <div className="mb-4 flex items-center justify-center">
                <span
                  className="badge-pulse inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg,#dc2626,#9f1239)", fontFamily: "'Barlow',sans-serif", letterSpacing: "0.12em" }}
                >
                  🔥 Offres Limitées
                </span>
              </div>
              <h2
                id="promotions-title"
                className="promo-main-title mb-3"
                style={{ fontSize: "clamp(32px,5vw,58px)", color: "#111827" }}
              >
                <span className="promo-title-accent">PROMOTIONS</span> EN COURS 🔥
              </h2>
              <p className="mx-auto max-w-xl leading-relaxed text-gray-500" style={{ fontSize: "clamp(13px,1.5vw,15px)", fontFamily: "'Barlow',sans-serif" }}>
                Découvrez nos meilleures promotions{" "}
                <strong className="font-semibold text-gray-700">Electro Mostafa</strong> au Maroc
                — électroménager, TV, cuisine & petit équipement.
              </p>
            </div>

            {/* ── Hero Banner ── */}
            <div
              className="promo-hero-bg promo-scanlines relative mb-10 overflow-hidden rounded-3xl shadow-2xl"
              style={{ minHeight: "clamp(220px,32vw,310px)" }}
            >
              {/* Animated colored border */}
              <div className="promo-hero-border" aria-hidden="true" />

              {/* Stripes */}
              <div className="promo-stripe" />
              <div className="promo-stripe" style={{ right: "22%", opacity: 0.4 }} />

              {/* BG image */}
              <div className="absolute inset-0">
                <img
                  src="https://i.postimg.cc/C5GxVgsf/image.png"
                  alt="" aria-hidden="true"
                  className="h-full w-full scale-110 object-cover"
                  style={{ opacity: 0.1, filter: "blur(1px)" }}
                  loading="lazy" decoding="async" width={1200} height={675}
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(120deg, rgba(70,0,0,0.82) 0%, rgba(153,27,27,0.6) 50%, rgba(159,18,57,0.28) 100%)" }}
              />

              {/* Orbs */}
              <div className="promo-orb-1 absolute rounded-full" style={{ width: "clamp(150px,25vw,350px)", height: "clamp(150px,25vw,350px)", top: "-30%", left: "-8%", background: "radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%)", filter: "blur(2px)" }} />
              <div className="promo-orb-2 absolute rounded-full" style={{ width: "clamp(100px,18vw,250px)", height: "clamp(100px,18vw,250px)", bottom: "-20%", right: "5%", background: "radial-gradient(circle, rgba(249,115,22,0.24) 0%, transparent 70%)" }} />
              <div className="promo-orb-3 absolute rounded-full" style={{ width: "clamp(60px,10vw,140px)", height: "clamp(60px,10vw,140px)", top: "10%", right: "30%", background: "radial-gradient(circle, rgba(252,211,77,0.18) 0%, transparent 70%)" }} />

              {/* Content */}
              <div
                className="relative z-10 flex h-full flex-col gap-6 px-6 py-8 xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:px-10 xl:py-0"
                style={{ minHeight: "inherit" }}
              >
                {/* Left */}
                <div className="max-w-lg text-white">
                  <p
                    className="mb-3 uppercase tracking-[0.22em] text-yellow-200/75"
                    style={{ fontSize: "clamp(9px,1.4vw,11px)", fontWeight: 700, fontFamily: "'Barlow',sans-serif" }}
                  >
                    ⏳ Fin de la promotion dans :
                  </p>
                  <h3
                    className="hero-big-title"
                    style={{ fontSize: "clamp(34px,6vw,72px)", color: "#fff" }}
                  >
                    Jusqu&apos;à{" "}
                    <span style={{ color: "#FDE68A", textShadow: "0 0 40px rgba(251,191,36,0.7), 0 2px 12px rgba(0,0,0,0.4)" }}>
                      -50%
                    </span>
                  </h3>
                  <p
                    className="mt-1 text-white/75"
                    style={{ fontSize: "clamp(12px,1.6vw,15px)", fontFamily: "'Barlow',sans-serif", lineHeight: 1.6 }}
                  >
                    Sur une sélection d&apos;appareils{" "}
                    <strong className="font-bold text-white">Electro Mostafa</strong> premium
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                    <span style={{ fontSize: 11, color: "rgba(253,230,138,0.6)" }}>✦ ✦ ✦</span>
                  </div>

                  {/* CTA to open popup */}
                  <button
                    type="button"
                    onClick={() => { setShowPopup(true); playPopupSound() }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-red-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    style={{
                      background: "linear-gradient(135deg,#fde68a,#f97316)",
                      fontFamily: "'Barlow',sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    🎁 Voir l&apos;Offre Spéciale
                  </button>
                </div>

                {/* Right: countdown + image */}
                <PromotionsCountdown />
              </div>

              {/* Bottom shine */}
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }} />
            </div>

            {/* ── Filter Tabs ── */}
            <div className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Filtres des promotions">
              {FILTER_TABS.map(tab => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    aria-pressed={isActive}
                    className={`promo-tab flex items-center gap-1.5 rounded-full border-2 px-5 py-2.5 text-sm font-semibold ${isActive
                        ? "active border-transparent text-white"
                        : "border-gray-200 bg-white text-gray-700"
                      }`}
                    style={{ fontFamily: "'Barlow',sans-serif" }}
                  >
                    <span aria-hidden="true">{tab.emoji}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* ── Count pill ── */}
            {displayed.length > 0 && (
              <div className="mb-6 flex items-center justify-center">
                <span className="promo-count-pill">
                  🏷️ {displayed.length} produit{displayed.length > 1 ? "s" : ""} en promotion
                </span>
              </div>
            )}

            {/* ── Product grid ── */}
            {displayed.length > 0 ? (
              <>
                <div
                  key={animKey}
                  className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
                >
                  {paginated.map((product, i) => (
                    <div key={product.id} className="promo-card-anim" style={{ animationDelay: `${i * 55}ms` }}>
                      <ProductCard product={product} showPromoBadge />
                    </div>
                  ))}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                  <div className="mt-2 flex flex-col items-center justify-center gap-3">
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      <button type="button" onClick={() => page > 1 && goToPage(page - 1)} disabled={page === 1} className="pag-btn px-4" aria-label="Page précédente">←</button>

                      {(() => {
                        const delta = 1
                        const range: (number | string)[] = []
                        for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) range.push(i)
                        if (page - delta > 2) range.unshift("...")
                        if (page + delta < totalPages - 1) range.push("...")
                        return [1, ...range, totalPages].map((p, idx) =>
                          p === "..." ? (
                            <span key={`d-${idx}`} className="px-1 text-sm font-medium text-gray-400">…</span>
                          ) : (
                            <button
                              key={`${p}-${idx}`}
                              type="button"
                              onClick={() => goToPage(p as number)}
                              className={`pag-btn ${page === p ? "pag-active" : ""}`}
                              aria-current={page === p ? "page" : undefined}
                            >{p}</button>
                          )
                        )
                      })()}

                      <button type="button" onClick={() => page < totalPages && goToPage(page + 1)} disabled={page === totalPages} className="pag-btn px-4" aria-label="Page suivante">→</button>
                    </div>
                    <p className="text-xs font-medium italic text-gray-400" style={{ fontFamily: "'Barlow',sans-serif" }}>
                      Page {page} sur {totalPages}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <div className="mb-4 text-5xl">🛒</div>
                <p className="mb-2 text-lg font-semibold text-gray-600" style={{ fontFamily: "'Barlow',sans-serif" }}>
                  Aucun produit dans cette catégorie
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange("all")}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-700 transition-colors"
                  style={{ fontFamily: "'Barlow',sans-serif" }}
                >
                  ← Voir toutes les promotions
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}