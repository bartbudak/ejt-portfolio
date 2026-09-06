import { site } from "@/lib/site";

// "THE RESULTS" — recreated from Ellie's Canva deck, where a full-bleed panel
// with four-point starbursts introduces the before/after rows.
//
// Deliberately quieter than the deck's marigold: the hero and the closing band
// are the two loud moments, and three saturated fields in a row cancel each
// other out (Von Restorff). Sitting on the same paper as the showcase below
// also makes the two read as one unit, which is what they are.
//
// The scoreboard lives here rather than in the hero because the deck puts the
// numbers under this heading too ("MAEVE WAS (RE)BORN IN 2025 — the business
// saw…"), and because a page whose only hard evidence sits above the fold in a
// band nobody scrolls back to has no evidence at all.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// Four-point sparkle with concave sides — the deck's burst shape.
function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <path
        d="M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z"
        fill="var(--ejd-marigold)"
      />
    </svg>
  );
}

export function Results() {
  return (
    <section
      id="results"
      className="relative isolate w-full"
      // The hero's blush, not the Maeve paper. That paper (#fff3e5) is a pale
      // peach, and sitting under the vermilion "Hi There!" it read as skin
      // rather than as a ground (Bart, 2026-09-05). Blush also puts the section
      // back on the same vermilion-on-blush pairing as the title card.
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <div className="relative px-5 pb-10 pt-20 sm:px-10 sm:pb-14 sm:pt-28">
      <Burst className="pointer-events-none absolute -left-8 top-6 h-24 w-24 sm:-left-4 sm:h-40 sm:w-40" />
      <Burst className="pointer-events-none absolute -right-6 bottom-4 h-16 w-16 sm:h-28 sm:w-28" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <h2
          className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.8rem,10vw,7.5rem)" }}
        >
          <span className="block">The</span>
          <span className="block">Results</span>
        </h2>

        <p
          className="max-w-[48ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          I pitched the reinvention of a 25-year-old chocolate company and saw it
          through — 75+ products redrawn, a new name, a new world. In the first year
          after launch:
        </p>

        <dl className="grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1">
              <dt
                className="font-display font-black leading-none tracking-[-0.02em] tabular-nums"
                style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
              >
                {s.value}
              </dt>
              <dd
                className="max-w-[18ch] text-xs leading-snug sm:text-sm"
                style={{ color: "var(--ejd-ink)" }}
              >
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      </div>
    </section>
  );
}
