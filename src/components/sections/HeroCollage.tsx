import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroParticle, ACID_STOPS } from "@/components/shared/HeroParticle";
import { Whisp } from "@/components/shared/Whisp";

// PROTOTYPE — "loud hero, quiet work". Valentin-style framing (corner micro-
// labels + faint grid) around a big UPPERCASE particle wordmark; the Maeve cast
// is wrapped in around the text; the pink "blotch" is a living whisp that wanders
// and chases the pointer (Faizan-style grainy field). The floating nav has no
// background, so there's no seam between header and page.
// Behind /preview; the live coming-soon page (site.comingSoon) is untouched.

// Faint warm washes (the PINK is the living whisp, not a static blotch).
const BLOTCHES = [
  "radial-gradient(46% 46% at 86% 16%, rgba(185,140,60,0.12), transparent 72%)", // gold
  "radial-gradient(42% 42% at 88% 90%, rgba(74,59,51,0.10), transparent 72%)", // cocoa
  "radial-gradient(40% 40% at 10% 18%, rgba(231,156,191,0.08), transparent 72%)", // faint blush
].join(", ");

// Faint structural grid (Valentin-style) in muted gold.
const GRID = [
  "repeating-linear-gradient(90deg, rgba(120,110,96,0.10) 0 1px, transparent 1px 25%)",
  "repeating-linear-gradient(0deg, rgba(120,110,96,0.08) 0 1px, transparent 1px 33.334%)",
].join(", ");

// Tiling fractal-noise grain (feTurbulence) — heavier here for the Faizan feel.
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Cast wrapped IN around the central wordmark; nudged clear of the floating nav.
const CUTOUTS: { src: string; className: string }[] = [
  {
    src: "/hero/greg-rocket.png",
    className:
      "absolute h-auto z-[18] w-[52vw] -bottom-[2%] -right-[12%] rotate-[-10deg] sm:w-[22vw] sm:bottom-[4%] sm:right-[6%]",
  },
  {
    src: "/hero/froggy-portal.svg",
    className:
      "absolute h-auto z-[16] w-[38vw] top-[14%] -left-[8%] rotate-[-6deg] sm:w-[18vw] sm:top-[15%] sm:left-[11%]",
  },
  {
    src: "/hero/greg-cartwheel.png",
    // desktop-only: on mobile the floating nav owns the top-right corner
    className:
      "hidden sm:block absolute h-auto z-[15] w-[16vw] top-[17%] right-[13%] rotate-[10deg]",
  },
  {
    src: "/hero/greg-hearts.png",
    className:
      "hidden sm:block absolute h-auto z-[15] w-[18vw] bottom-[8%] left-[11%] rotate-[-4deg]",
  },
  {
    src: "/hero/pineapple.svg",
    className:
      "hidden sm:block absolute h-auto z-[14] w-[8vw] bottom-[7%] left-[45%] rotate-[-6deg]",
  },
  {
    src: "/hero/heart-red.svg",
    className:
      "hidden sm:block absolute h-auto z-[13] w-[3.8vw] top-[34%] left-[30%] rotate-[16deg]",
  },
  {
    src: "/hero/heart-yellow.svg",
    className:
      "hidden sm:block absolute h-auto z-[13] w-[3vw] top-[28%] right-[28%] rotate-[-12deg]",
  },
];

const LABEL =
  "font-mono uppercase tracking-[0.18em] text-muted-foreground text-[10px] sm:text-[11px]";

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
      {/* cast wrapped around the wordmark — isolated so its z-stack stays below the copy */}
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

      {/* corner micro-labels (Valentin-style framing) */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 5 }}>
        <p className={`absolute left-6 top-[4.75rem] leading-relaxed sm:left-8 ${LABEL}`}>
          {site.role}
          <br />
          Brand &amp; Art Direction
        </p>
        <p className={`absolute bottom-6 left-6 sm:left-8 ${LABEL}`}>Portfolio 2026</p>
        <p className={`absolute bottom-6 right-6 sm:right-8 ${LABEL}`}>Based in {site.location}</p>
      </div>

      {/* center content */}
      <div className="relative mx-auto w-full max-w-5xl px-6" style={{ zIndex: 6 }}>
        <h1 className="sr-only">
          Welcome, I&apos;m Ellie — {site.name}, {site.role}
        </h1>
        {/* explicit height so the canvas has a resolved size to sample into */}
        <div className="relative mx-auto h-[clamp(220px,44vh,460px)] w-full max-w-3xl">
          <HeroParticle stops={ACID_STOPS} />
        </div>
        <div className="animate-fade-up mt-2 flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<a href="#work" />}>
            View work
          </Button>
          <Button variant="outline" nativeButton={false} render={<a href="#contact" />}>
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
