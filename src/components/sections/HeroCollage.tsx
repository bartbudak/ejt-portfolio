import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroParticle, ACID_STOPS } from "@/components/shared/HeroParticle";

// PROTOTYPE — "loud hero, quiet work", Valentin-Gassend-style framing: corner
// micro-labels + a faint grid wrap a big UPPERCASE particle wordmark, with the
// Maeve cast Ellie directed wrapped in AROUND the text (behind the dots).
// Built behind /preview; the live coming-soon page (site.comingSoon) is untouched.

// 100% CSS background — no raster downloads.
const BLOTCHES = [
  "radial-gradient(50% 50% at 16% 84%, rgba(162,58,106,0.22), transparent 72%)", // rose
  "radial-gradient(46% 46% at 85% 15%, rgba(185,140,60,0.18), transparent 72%)", // gold
  "radial-gradient(42% 42% at 90% 92%, rgba(74,59,51,0.15), transparent 72%)", // cocoa
  "radial-gradient(40% 40% at 10% 20%, rgba(231,156,191,0.20), transparent 72%)", // blush
  "radial-gradient(34% 30% at 64% 74%, rgba(217,150,58,0.12), transparent 76%)", // amber lift
].join(", ");

// Faint structural grid (Valentin-style) in muted gold.
const GRID = [
  "repeating-linear-gradient(90deg, rgba(185,140,60,0.13) 0 1px, transparent 1px 25%)",
  "repeating-linear-gradient(0deg, rgba(185,140,60,0.10) 0 1px, transparent 1px 33.334%)",
].join(", ");

// Tiling fractal-noise grain (feTurbulence) as a data-URI.
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Cast wrapped IN around the central wordmark (not stuck at the viewport edges).
// Mobile keeps 3 bold pieces bleeding off-edge; the rest are desktop-only.
const CUTOUTS: { src: string; className: string }[] = [
  // Greg on Rocket — lower-right anchor.
  {
    src: "/hero/greg-rocket.png",
    className:
      "absolute h-auto z-[18] w-[52vw] -bottom-[2%] -right-[12%] rotate-[-10deg] sm:w-[22vw] sm:bottom-[4%] sm:right-[6%]",
  },
  // Portal Froggy — upper-left swirl (sits below the corner label on mobile).
  {
    src: "/hero/froggy-portal.svg",
    className:
      "absolute h-auto z-[16] w-[38vw] top-[13%] -left-[8%] rotate-[-6deg] sm:w-[18vw] sm:top-[11%] sm:left-[12%]",
  },
  // Greg cartwheel — upper-right, dynamic.
  {
    src: "/hero/greg-cartwheel.png",
    className:
      "absolute h-auto z-[15] w-[42vw] top-[5%] -right-[12%] rotate-[10deg] sm:w-[17vw] sm:top-[8%] sm:right-[11%]",
  },
  // --- desktop-only: complete the wreath around the wordmark ---
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
      "hidden sm:block absolute h-auto z-[13] w-[3.8vw] top-[33%] left-[29%] rotate-[16deg]",
  },
  {
    src: "/hero/heart-yellow.svg",
    className:
      "hidden sm:block absolute h-auto z-[13] w-[3vw] top-[29%] right-[27%] rotate-[-12deg]",
  },
];

const LABEL =
  "font-mono uppercase tracking-[0.18em] text-muted-foreground text-[10px] sm:text-[11px]";

export function HeroCollage() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden bg-background"
    >
      {/* soft color washes */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 0, background: BLOTCHES }} />
      {/* structural grid */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 1, backgroundImage: GRID }} />
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ zIndex: 2, backgroundImage: GRAIN, backgroundSize: "180px 180px", mixBlendMode: "soft-light", opacity: 0.09 }}
      />
      {/* cast wrapped around the wordmark — isolated so its z-stack stays below the copy */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 3, isolation: "isolate" }}>
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
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 4 }}>
        <p className={`absolute left-6 top-6 leading-relaxed ${LABEL}`}>
          {site.role}
          <br />
          Brand &amp; Art Direction
        </p>
        <p className={`absolute bottom-6 left-6 ${LABEL}`}>Portfolio 2026</p>
        <p className={`absolute bottom-6 right-6 ${LABEL}`}>Based in {site.location}</p>
      </div>

      {/* center content */}
      <div className="relative mx-auto w-full max-w-5xl px-6" style={{ zIndex: 5 }}>
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
