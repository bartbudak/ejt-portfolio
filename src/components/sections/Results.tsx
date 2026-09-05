import { site } from "@/lib/site";

// "THE RESULTS" title card — recreated from Ellie's Canva deck, where a marigold
// full-bleed panel with vermilion four-point starbursts introduces the
// before/after rows. Here it heads the interactive showcase that replaces them.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// Four-point sparkle with concave sides — the deck's burst shape.
function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <path
        d="M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z"
        fill="var(--ejd-vermilion)"
      />
    </svg>
  );
}

export function Results() {
  return (
    <section
      id="results"
      className="relative isolate w-full overflow-hidden px-5 py-24 sm:px-10 sm:py-32"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      <Burst className="pointer-events-none absolute -left-10 -top-8 h-32 w-32 sm:-left-6 sm:h-52 sm:w-52" />
      <Burst className="pointer-events-none absolute -bottom-10 -right-8 h-24 w-24 sm:-bottom-6 sm:h-44 sm:w-44" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
        <h2
          className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3rem,11vw,8.5rem)" }}
        >
          <span className="block">The</span>
          <span className="block">Results</span>
        </h2>

        <p
          className="max-w-[46ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--ejd-ink)" }}
        >
          {site.name.split(" ")[0]} pitched the reinvention of a 25-year-old chocolate
          company and saw it through — 75+ products redrawn, a new name, a new world.
        </p>
      </div>
    </section>
  );
}
