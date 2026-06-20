import { site } from "@/lib/site";
import { HeroParticle, ACID_STOPS } from "@/components/shared/HeroParticle";
import { Whisp } from "@/components/shared/Whisp";

// PROTOTYPE — minimal Faizan-style field: a grainy paper plane with the living
// pink whisp wandering behind a big UPPERCASE particle wordmark, a few Greg
// astronauts framing the edges, and the floating nav. No decor / buttons / labels.
// Behind /preview; the live coming-soon page (site.comingSoon) is untouched.

// Faint warm washes (the PINK is the living whisp, not a static blotch).
const BLOTCHES = [
  "radial-gradient(46% 46% at 86% 16%, rgba(185,140,60,0.12), transparent 72%)", // gold
  "radial-gradient(42% 42% at 88% 90%, rgba(74,59,51,0.10), transparent 72%)", // cocoa
].join(", ");

// Faint structural grid (Valentin-style) in muted neutral.
const GRID = [
  "repeating-linear-gradient(90deg, rgba(120,110,96,0.10) 0 1px, transparent 1px 25%)",
  "repeating-linear-gradient(0deg, rgba(120,110,96,0.08) 0 1px, transparent 1px 33.334%)",
].join(", ");

// Tiling fractal-noise grain (feTurbulence) — heavier for the Faizan feel.
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Just the Greg astronauts framing the wordmark.
const CUTOUTS: { src: string; className: string }[] = [
  {
    src: "/hero/greg-rocket.png",
    className:
      "absolute h-auto z-[18] w-[52vw] -bottom-[2%] -right-[12%] rotate-[-10deg] sm:w-[22vw] sm:bottom-[4%] sm:right-[6%]",
  },
  {
    src: "/hero/greg-hearts.png",
    className:
      "absolute h-auto z-[15] w-[42vw] -bottom-[2%] -left-[10%] rotate-[-4deg] sm:w-[18vw] sm:bottom-[8%] sm:left-[11%]",
  },
  {
    src: "/hero/greg-cartwheel.png",
    // desktop-only: on mobile the floating nav owns the top-right corner
    className:
      "hidden sm:block absolute h-auto z-[15] w-[16vw] top-[17%] right-[13%] rotate-[10deg]",
  },
];

export function HeroCollage() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
      style={{ backgroundColor: "#ecebe4" }}
    >
      {/* faint warm washes */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 0, background: BLOTCHES }} />
      {/* structural grid */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 1, backgroundImage: GRID }} />
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ zIndex: 2, backgroundImage: GRAIN, backgroundSize: "160px 160px", mixBlendMode: "soft-light", opacity: 0.18 }}
      />
      {/* the living whisp (pointer-events:none, follows the cursor on press) */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 3 }}>
        <Whisp />
      </div>
      {/* Greg astronauts framing the wordmark — isolated so z-stack stays below the copy */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 4, isolation: "isolate" }}>
        {CUTOUTS.map((c, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={c.src}
            alt=""
            aria-hidden
            draggable={false}
            className={`animate-fade-up select-none ${c.className}`}
          />
        ))}
      </div>

      {/* center wordmark */}
      <div className="relative mx-auto w-full max-w-5xl px-6" style={{ zIndex: 6 }}>
        <h1 className="sr-only">
          Welcome, I&apos;m Ellie — {site.name}, {site.role}
        </h1>
        {/* explicit height so the canvas has a resolved size to sample into */}
        <div className="relative mx-auto h-[clamp(220px,44vh,460px)] w-full max-w-3xl">
          <HeroParticle stops={ACID_STOPS} />
        </div>
      </div>
    </section>
  );
}
