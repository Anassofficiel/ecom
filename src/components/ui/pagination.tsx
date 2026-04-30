"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    // Smart pages: always show first, last, current ±1, with ellipsis
    const getPages = (): (number | "...")[] => {
        const delta = 1
        const range: (number | "...")[] = []

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i)
        }

        if ((currentPage - delta) > 2) range.unshift("...")
        if ((currentPage + delta) < totalPages - 1) range.push("...")

        return [1, ...range, totalPages]
    }

    const pages = totalPages <= 7
        ? Array.from({ length: totalPages }, (_, i) => i + 1)
        : getPages()

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&display=swap');

        .pag-wrap {
          font-family: 'DM Sans', sans-serif;
        }

        /* Number button */
        .pag-num {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(34px, 6vw, 42px);
          height: clamp(34px, 6vw, 42px);
          border-radius: 10px;
          font-size: clamp(12px, 2vw, 14px);
          font-weight: 700;
          border: 1.5px solid #e5e7eb;
          background: white;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
          flex-shrink: 0;
          outline: none;
        }

        /* Shimmer layer inside each number */
        .pag-num::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #dc2626 0%, #9f1239 100%);
          opacity: 0;
          transition: opacity 0.22s ease;
          border-radius: inherit;
        }

        .pag-num span {
          position: relative;
          z-index: 1;
        }

        .pag-num:hover:not(.pag-num--active) {
          border-color: #dc2626;
          color: #dc2626;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 18px rgba(220, 38, 38, 0.18);
        }

        .pag-num--active {
          border-color: transparent;
          color: white;
          transform: scale(1.12);
          box-shadow:
            0 4px 16px rgba(220, 38, 38, 0.45),
            0 0 0 3px rgba(220, 38, 38, 0.15);
        }

        .pag-num--active::before {
          opacity: 1;
        }

        /* Pulse ring on active */
        @keyframes pagRing {
          0%   { box-shadow: 0 4px 16px rgba(220,38,38,0.45), 0 0 0 0 rgba(220,38,38,0.4); }
          60%  { box-shadow: 0 4px 16px rgba(220,38,38,0.45), 0 0 0 8px rgba(220,38,38,0); }
          100% { box-shadow: 0 4px 16px rgba(220,38,38,0.45), 0 0 0 0 rgba(220,38,38,0); }
        }
        .pag-num--active {
          animation: pagRing 2.5s ease infinite;
        }

        /* Prev / Next buttons */
        .pag-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0 clamp(10px, 2.5vw, 16px);
          height: clamp(34px, 6vw, 42px);
          border-radius: 10px;
          font-size: clamp(11px, 1.8vw, 13px);
          font-weight: 700;
          border: 1.5px solid #e5e7eb;
          background: white;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
          outline: none;
          white-space: nowrap;
        }

        .pag-arrow:hover:not(:disabled) {
          border-color: #dc2626;
          color: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.15);
        }

        .pag-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Hover slide effect on arrows */
        .pag-arrow--prev:hover:not(:disabled) svg {
          transform: translateX(-3px);
        }
        .pag-arrow--next:hover:not(:disabled) svg {
          transform: translateX(3px);
        }
        .pag-arrow svg {
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        /* Ellipsis */
        .pag-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(28px, 5vw, 36px);
          color: #9ca3af;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          user-select: none;
        }

        /* Progress bar below */
        .pag-progress-track {
          height: 3px;
          border-radius: 999px;
          background: #f3f4f6;
          overflow: hidden;
          width: clamp(120px, 30vw, 220px);
        }
        .pag-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #dc2626, #f97316);
          transition: width 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
        }

        /* Page label */
        .pag-label {
          font-size: clamp(10px, 1.6vw, 12px);
          color: #9ca3af;
          font-weight: 500;
          font-style: italic;
          white-space: nowrap;
        }
      `}</style>

            <div className="pag-wrap mt-10 flex flex-col items-center gap-4">

                {/* Buttons row */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center overflow-x-auto max-w-full px-2">

                    {/* Prev */}
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pag-arrow pag-arrow--prev"
                        aria-label="Page précédente"
                    >
                        <ChevronLeft size={14} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Préc.</span>
                    </button>

                    {/* Pages */}
                    {pages.map((p, i) =>
                        p === "..." ? (
                            <span key={`dots-${i}`} className="pag-dots">⋯</span>
                        ) : (
                            <button
                                key={`${p}-${i}`}
                                type="button"
                                onClick={() => onPageChange(p as number)}
                                className={cn("pag-num", currentPage === p && "pag-num--active")}
                                aria-current={currentPage === p ? "page" : undefined}
                            >
                                <span>{p}</span>
                            </button>
                        )
                    )}

                    {/* Next */}
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pag-arrow pag-arrow--next"
                        aria-label="Page suivante"
                    >
                        <span className="hidden sm:inline">Suiv.</span>
                        <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Progress bar + label */}
                <div className="flex flex-col items-center gap-2">
                    <div className="pag-progress-track">
                        <div
                            className="pag-progress-fill"
                            style={{ width: `${(currentPage / totalPages) * 100}%` }}
                        />
                    </div>
                    <p className="pag-label">
                        Page {currentPage} sur {totalPages}
                    </p>
                </div>

            </div>
        </>
    )
}