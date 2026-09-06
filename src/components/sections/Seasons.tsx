"use client";

import { useState } from "react";
import { campaignsIntro, seasons } from "@/data/campaigns";

// Five seasons as five cards over one shared drawer, rather than five walls of
// brief text stacked down the page (Bart's steer, and the arrangement in the
// UX artifact). Only one season is open at a time: the cards stay comparable
// side by side, and the drawer below is the single place the detail appears, so
// the reader never loses the row while reading one of them.
//
// Built as a tablist because that is what it behaves like — one selection,
// arrow-key movement between the tabs, and a panel that announces itself.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function Seasons() {
  const [open, setOpen] = useState(seasons[0].slug);
  const current = seasons.find((s) => s.slug === open) ?? seasons[0];

  // Left/right arrows move between seasons, which is what a tablist owes a
  // keyboard user; without it they would have to tab through all five.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const i = seasons.findIndex((s) => s.slug === open);
    const next = seasons[(i + delta + seasons.length) % seasons.length];
    setOpen(next.slug);
    document.getElementById(`season-tab-${next.slug}`)?.focus();
  };

  return (
    <section
      id="campaigns"
      className="w-full px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: "var(--mv-paper)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h1
          className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.8rem,9vw,6.5rem)" }}
        >
          Seasonal Collections
        </h1>

        <p
          className="mt-7 max-w-[62ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          {campaignsIntro}
        </p>

        <div
          role="tablist"
          aria-label="Seasonal collections"
          onKeyDown={onKeyDown}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {seasons.map((s) => {
            const active = s.slug === open;
            return (
              <button
                key={s.slug}
                id={`season-tab-${s.slug}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="season-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setOpen(s.slug)}
                className="flex min-h-[7.5rem] flex-col justify-between rounded-lg p-4 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: active ? "var(--ejd-vermilion)" : "var(--ejd-marigold)",
                  color: "var(--ejd-ink)",
                  border: "var(--mv-stroke) solid var(--ejd-ink)",
                }}
              >
                <span
                  className="font-display text-lg font-black uppercase leading-[0.95] tracking-[-0.01em]"
                  style={WONK}
                >
                  {s.label}
                </span>
                <span className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                  {active ? "Open" : s.revealLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="season-panel"
          role="tabpanel"
          aria-labelledby={`season-tab-${current.slug}`}
          className="mt-4 rounded-lg p-6 sm:p-9"
          style={{
            backgroundColor: "var(--ejd-blush)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
          }}
        >
          <h2
            className="font-display font-black uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(1.8rem,4vw,3rem)" }}
          >
            {current.label}
          </h2>
          <p
            className="mt-4 max-w-[62ch] text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ejd-ink)" }}
          >
            {current.brief}
          </p>

          {/* The highlight reel goes here. Nothing is exported to public/ yet —
              assets/maeve/seasonal/ holds 165 items and Ellie has not picked the
              selects — so the drawer says what is coming rather than rendering
              an empty grid that reads as broken. See ASSETS.md. */}
          <p
            className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-60"
            style={{ color: "var(--ejd-ink)" }}
          >
            Highlight reel — awaiting selects from assets/maeve/seasonal/{current.assets}
          </p>
        </div>
      </div>
    </section>
  );
}
