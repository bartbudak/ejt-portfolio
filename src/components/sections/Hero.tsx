import Image from "next/image";
import { site } from "@/lib/site";

// Opening hero — a direct translation of Ellie's own Canva deck (2026-09-04),
// which is the source of truth over HANDOFF.md §11's "Welcome, I'm Ellie"
// particle wordmark: the deck's title card — blush field, vermilion name, roles
// tucked behind her head, corner tags.
// Colours are her deck's true values. Several fail WCAG contrast; that's a
// deliberate aesthetic call (Bart, 2026-09-04). Display type is treated as
// graphic; body copy stays near-black, which is what her deck does too.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// Hand-drawn marigold ring around "Open to Work" — the deck's one whimsy.
function InkRing() {
  return (
    <svg
      viewBox="0 0 200 110"
      aria-hidden
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <path
        d="M100 8C51 6 12 26 9 55c-3 30 41 50 92 49 47-1 89-19 90-48C192 27 149 10 100 8Z"
        fill="none"
        stroke="var(--ejd-marigold)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.97 0.03"
        strokeDashoffset="0.14"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate">
      {/* ── Beat 1 — the deck's title card ──────────────────────────────── */}
      <div
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
        style={{ backgroundColor: "var(--ejd-blush)" }}
      >
        <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 pt-12 sm:px-8 sm:pt-16">
          {/* One line, full bleed — the deck sets this in Benguiat *Condensed*.
              Fraunces has no condensed cut, so a slight scaleX recovers the
              proportion without needing a licensed face. */}
          {/* Mobile stacks the two words and stretches them vertically so the
              type carries the narrow viewport. From sm up it runs on one line —
              the deck sets this in Benguiat *Condensed*, and Fraunces has no
              condensed cut, so a scaleX recovers the proportion. */}
          <h1
            className="block origin-center scale-x-[0.96] scale-y-[1.18] text-center font-display font-black uppercase leading-[0.82] tracking-[-0.03em] text-[16vw] sm:scale-x-[0.9] sm:scale-y-100 sm:whitespace-nowrap sm:text-[min(12vw,11.5rem)] sm:leading-[0.86]"
            style={{
              ...WONK,
              color: "var(--ejd-vermilion)",
              // scaleX + negative tracking crush the word space; put it back.
              wordSpacing: "0.12em",
            }}
          >
            <span className="block sm:inline">Ellie</span>{" "}
            <span className="block sm:inline">Thompson</span>
          </h1>

          {/* Roles sit level with her head so the cut-out overlaps them,
              exactly as the deck stacks them. */}
          <ul
            className="mt-6 flex flex-wrap items-baseline justify-center gap-x-[8vw] gap-y-2 font-display text-center font-semibold uppercase tracking-[0.04em]"
            style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(0.7rem,1.5vw,1.35rem)" }}
          >
            {site.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Ellie — Canva's knockout, lifted out of the deck PDF and cropped to
            its alpha bounds. The negative margin lifts her head into the role
            labels so she overlaps them, as she does in the deck. */}
        <div className="pointer-events-none relative z-30 mt-auto flex justify-center">
          <Image
            src="/hero/ellie-cutout.png"
            alt="Ellie Thompson, wearing a blue beanie and a cloud-print sweater, biting into a wrapped chocolate"
            width={700}
            height={809}
            // Next 16 deprecated `priority` in favour of `preload`; this is the
            // above-the-fold LCP element.
            preload
            className="mt-[-4vw] h-auto w-[min(124vw,34rem)] max-w-none object-contain sm:w-[min(84vw,34rem)]"
          />
        </div>

        {/* Corner tags */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-end justify-between px-5 pb-6 sm:px-10 sm:pb-10"
          style={{ color: "var(--ejd-ink)" }}
        >
          <p className="text-sm sm:text-base">Moving to {site.location}</p>
          <p className="relative isolate px-6 py-4 text-sm sm:px-8 sm:text-base">
            <InkRing />
            <span className="relative">Open to Work</span>
          </p>
        </div>
      </div>

    </section>
  );
}
