"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Before/after product showcase, built in the live Maeve theme's own section
// style (see maeve/sections/frontpage-flavors.liquid + styles/__mixin.scss):
//   · frame()  — 2px soft-black border, 7px colour ring, 2px outer ring, all
//                via box-shadow spread; 5px ring under 768px.
//   · the "hairline" dividers are really 2px grid gaps over a soft-black ground.
//   · banner() — pill with a dot before and after the label.
//
// The seam splits the whole panel, not just the product: the old side sits on
// yellow, the new side on pink, so dragging swaps the ground as well as the
// pack. The image stage spans the panel's full width with no horizontal
// padding, so one clip percentage drives the ground, the pack and the seam
// identically.

type Pair = {
  slug: string;
  before: string;
  after: string;
  /** Ground behind the old pack — a Maeve theme colour chosen to contrast it. */
  beforeBg: string;
  /** Ground behind the new pack. Also contrasts `beforeBg` so the split reads. */
  afterBg: string;
};

const PAIRS: Pair[] = [
  {
    slug: "pike-place",
    before: "Pike Place Espresso",
    after: "Pike Place Espresso",
    beforeBg: "#426130", // --cr-olive
    afterBg: "#fb66e5", // --cr-pink
  },
  {
    slug: "san-juan",
    before: "San Juan Sea Salt",
    after: "San Juan Salted Toffee",
    beforeBg: "#5d58f2", // --cr-blue
    afterBg: "#ffc72c", // --cr-yellow
  },
  {
    slug: "peanut-butter",
    before: "Crunchy Peanut Butter",
    after: "Peanut Butter-Fly",
    beforeBg: "#a6c3e6", // --cr-blue-lighter
    afterBg: "#426130", // --cr-olive
  },
  {
    slug: "coconut",
    before: "Coconut Sea Salt",
    after: "Coconut Island",
    beforeBg: "#009e50", // --cr-green
    afterBg: "#ff13b4", // --cr-magenta
  },
  {
    slug: "birthday",
    before: "Happy Birthday Cake Batter",
    after: "Have a Nice Day",
    beforeBg: "#feb002", // --cr-gold
    afterBg: "#6595f9", // --cr-blue-light
  },
  {
    slug: "assorted-box",
    before: "Seattle Chocolate assorted box",
    after: "Maeve assorted box",
    beforeBg: "#a9ee65", // --cr-green-light
    afterBg: "#5d58f2", // --cr-blue
  },
  {
    slug: "truffles",
    before: "Seattle Chocolate truffles",
    after: "Dark & Salty Toffee bonbons",
    beforeBg: "#ad917f", // --cr-beige
    afterBg: "#ff5800", // --cr-orange
  },
];

const FRAME: React.CSSProperties = {
  border: "var(--mv-stroke) solid var(--mv-soft-black)",
  boxShadow:
    "0 0 0 var(--mv-frame) var(--mv-red), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--mv-soft-black)",
  borderRadius: 32,
  margin: "calc(var(--mv-frame) + var(--mv-stroke))",
};

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const panel = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pair = PAIRS[active];

  // Doherty Threshold. Only the active pair is in the DOM, so clicking an
  // unvisited tile otherwise fetches two PNGs on demand — measured at ~120 KB,
  // which blows past 400 ms on a real connection. Warm the cache after paint.
  useEffect(() => {
    for (const p of PAIRS) {
      for (const side of ["before", "after"] as const) {
        const img = new window.Image();
        img.src = `/work/before-after/${p.slug}-${side}.png`;
      }
    }
  }, []);
  // Clip BOTH sides at the seam. Clipping only the "after" image leaves the
  // "before" one painting underneath, which is invisible when the two packs are
  // the same silhouette (the bars) but obvious when they aren't — the small
  // bonbon carton can't cover the tall truffle bag.
  const clipAfter = `inset(0 0 0 ${pos}%)`;
  const clipBefore = `inset(0 ${100 - pos}% 0 0)`;

  const fromEvent = (clientX: number) => {
    const el = panel.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") { setPos((p) => Math.max(0, p - step)); e.preventDefault(); }
    if (e.key === "ArrowRight") { setPos((p) => Math.min(100, p + step)); e.preventDefault(); }
    if (e.key === "Home") { setPos(0); e.preventDefault(); }
    if (e.key === "End") { setPos(100); e.preventDefault(); }
  };

  return (
    <section
      id="before-after"
      className="w-full px-3 py-14 sm:px-6 sm:py-20"
      style={{ backgroundColor: "var(--mv-paper)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div style={FRAME} className="overflow-hidden">
          {/* 2px gaps over soft-black make the rules — the theme's own trick. */}
          <div
            className="grid gap-[var(--mv-stroke)] md:grid-cols-[1.15fr_1fr]"
            style={{ backgroundColor: "var(--mv-soft-black)" }}
          >
            {/* ── Panel one: the split ────────────────────────────────── */}
            <div
              ref={panel}
              role="slider"
              tabIndex={0}
              aria-label={`Reveal ${pair.after} over ${pair.before}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% old packaging on the left, new on the right`}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                fromEvent(e.clientX);
              }}
              onPointerMove={(e) => { if (dragging.current) fromEvent(e.clientX); }}
              onPointerUp={() => { dragging.current = false; }}
              onPointerCancel={() => { dragging.current = false; }}
              className="relative min-h-[30rem] cursor-ew-resize touch-pan-y select-none overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 sm:min-h-[34rem] md:min-h-[38rem]"
              style={{
                backgroundColor: pair.beforeBg,
                outlineColor: "var(--mv-soft-black)",
              }}
            >
              {/* the new side's ground */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundColor: pair.afterBg, clipPath: clipAfter }}
              />

              {/* Image stage — full panel width, so one clip percentage maps
                  onto the ground, the pack and the seam alike. */}
              <div className="absolute inset-x-0 bottom-8 top-14">
                <Image
                  src={`/work/before-after/${pair.slug}-before.png`}
                  alt={`${pair.before} — the packaging before the rebrand`}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="pointer-events-none object-contain"
                  style={{ clipPath: clipBefore }}
                />
                <Image
                  src={`/work/before-after/${pair.slug}-after.png`}
                  alt={`${pair.after} — the packaging after the rebrand`}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="pointer-events-none object-contain"
                  style={{ clipPath: clipAfter }}
                />
              </div>

              {/* seam runs the full height of the panel */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2"
                style={{ left: `${pos}%`, backgroundColor: "var(--mv-soft-black)" }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm font-bold"
                style={{
                  left: `${pos}%`,
                  backgroundColor: "var(--mv-paper)",
                  border: "var(--mv-stroke) solid var(--mv-soft-black)",
                  color: "var(--mv-soft-black)",
                }}
              >
                ↔
              </span>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-5 flex justify-center"
              >
                <span
                  className="flex items-center gap-[6px] rounded-full px-3 py-[2px] text-xs font-bold uppercase tracking-[0.08em] sm:text-sm"
                  style={{
                    backgroundColor: "#fff",
                    border: "var(--mv-stroke) solid var(--mv-soft-black)",
                    color: "var(--mv-soft-black)",
                  }}
                >
                  <Dot /> Before &amp; after <Dot />
                </span>
              </span>

            </div>

            {/* Switching pairs changes the art but nothing textual, so a
                screen reader hears nothing without this. */}
            <p aria-live="polite" className="sr-only">
              Showing {pair.after}, which replaced {pair.before}.
            </p>

            {/* ── Panel two: the picker — new packaging only, no labels ── */}
            <ul className="grid grid-cols-2 gap-[var(--mv-stroke)]">
              {PAIRS.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.slug} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => { setActive(i); setPos(50); }}
                      aria-pressed={on}
                      aria-label={`${p.after}, was ${p.before}`}
                      title={`${p.after} — was ${p.before}`}
                      className="grid h-full w-full place-items-center p-3 transition-colors"
                      style={{ backgroundColor: on ? p.afterBg : "var(--mv-paper)" }}
                    >
                      <Image
                        src={`/work/before-after/${p.slug}-thumb.png`}
                        alt=""
                        width={190}
                        height={190}
                        className="h-20 w-auto object-contain sm:h-24"
                      />
                    </button>
                  </li>
                );
              })}
              {/* Filler keeps the rules running to the edge, as the theme does. */}
              <li aria-hidden style={{ backgroundColor: "var(--mv-paper)" }} />
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full"
      style={{
        width: 10,
        height: 10,
        backgroundColor: "var(--mv-red)",
        border: "var(--mv-stroke) solid var(--mv-soft-black)",
      }}
    />
  );
}
