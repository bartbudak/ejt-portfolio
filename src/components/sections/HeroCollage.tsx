import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroParticle } from "@/components/shared/HeroParticle";

// PROTOTYPE — maximalist "loud hero, quiet work" landing. The Maeve cast Ellie
// directed is pushed to the EDGES as a SAMSON-style cutout frame; her own voice
// (the rose particle wordmark, grain, warm washes) owns the bright center.
// Built behind /preview; the live coming-soon page (site.comingSoon) is untouched.

// 100% CSS background — no raster downloads. Soft brand-tone washes pulled to the
// corners so the center stays near-paper and the wordmark reads.
const BLOTCHES = [
  "radial-gradient(50% 50% at 16% 84%, rgba(162,58,106,0.22), transparent 72%)", // rose
  "radial-gradient(46% 46% at 85% 15%, rgba(185,140,60,0.18), transparent 72%)", // gold
  "radial-gradient(42% 42% at 90% 92%, rgba(74,59,51,0.15), transparent 72%)", // cocoa
  "radial-gradient(40% 40% at 10% 20%, rgba(231,156,191,0.20), transparent 72%)", // blush
  "radial-gradient(34% 30% at 64% 74%, rgba(217,150,58,0.12), transparent 76%)", // amber lift
].join(", ");

// Tiling fractal-noise grain (feTurbulence) as a data-URI — tactile print-zine
// texture over the paper, kept low-opacity via soft-light blend.
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Cutout = { src: string; w: string; style: CSSProperties };

// Anchored to true viewport edges; denser toward the bottom. Widths in vw so the
// collage scales with the viewport. z within the (isolated) frame layer only.
const CUTOUTS: Cutout[] = [
  // Greg on Rocket — bottom-right hero anchor, rocket angled up-left into center.
  { src: "/hero/greg-rocket.png", w: "40vw", style: { right: "-6%", bottom: "-4%", transform: "rotate(-12deg)", zIndex: 20 } },
  // Trench-coat Froggy — tall detective silhouette, bottom-left.
  { src: "/hero/froggy-trench.svg", w: "19vw", style: { left: "-1%", bottom: "-3%", transform: "rotate(5deg)", zIndex: 18 } },
  // Greg with Stars — the only upper character, top-right below the nav band.
  { src: "/hero/greg-stars.png", w: "21vw", style: { right: "-3%", top: "12%", transform: "rotate(8deg)", zIndex: 16 } },
  // Pineapple — mid prop bridging characters + decor, lower-left band.
  { src: "/hero/pineapple.svg", w: "11vw", style: { left: "9%", bottom: "13%", transform: "rotate(-8deg)", zIndex: 14 } },
  // Two roses — organic curve in the dense bottom-center gutter, lifted into view.
  { src: "/hero/roses.svg", w: "15vw", style: { left: "43%", bottom: "3%", transform: "rotate(6deg)", zIndex: 15 } },
  // Pink heart-arrow — top-left mark so the frame isn't bottom-only.
  { src: "/hero/heart-arrow.svg", w: "7vw", style: { left: "4%", top: "15%", transform: "rotate(-14deg)", zIndex: 12 } },
  // Red heart — confetti beat balancing Greg's cool blues, lower-right.
  { src: "/hero/heart-red.svg", w: "4.5vw", style: { right: "23%", bottom: "21%", transform: "rotate(18deg)", zIndex: 13 } },
  // Yellow hearts — smallest scatter, repeated for confetti rhythm.
  { src: "/hero/heart-yellow.svg", w: "3vw", style: { right: "4%", top: "46%", transform: "rotate(-10deg)", zIndex: 11 } },
  { src: "/hero/heart-yellow.svg", w: "2.4vw", style: { left: "23%", bottom: "30%", transform: "rotate(14deg)", zIndex: 11 } },
  // Upper-center scatter beat to balance the lighter top-left.
  { src: "/hero/heart-yellow.svg", w: "2.2vw", style: { left: "33%", top: "16%", transform: "rotate(12deg)", zIndex: 11 } },
];

export function HeroCollage() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-background"
    >
      {/* soft color washes */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 0, background: BLOTCHES }} />
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ zIndex: 1, backgroundImage: GRAIN, backgroundSize: "180px 180px", mixBlendMode: "soft-light", opacity: 0.09 }}
      />
      {/* edge cutout frame — isolated so its z-stack stays below the copy */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 2, isolation: "isolate" }}>
        {CUTOUTS.map((c, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={c.src}
            alt=""
            aria-hidden
            draggable={false}
            className="animate-fade-up absolute h-auto select-none"
            style={{ width: c.w, ...c.style }}
          />
        ))}
      </div>

      {/* center content */}
      <div className="relative mx-auto w-full max-w-5xl px-6" style={{ zIndex: 3 }}>
        <h1 className="sr-only">
          Welcome, I&apos;m Ellie — {site.name}, {site.role}
        </h1>
        <p className="animate-fade-up text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {site.role}
        </p>
        {/* explicit height so the canvas has a resolved size to sample into */}
        <div className="relative mx-auto mt-3 h-[clamp(220px,42vh,440px)] w-full max-w-3xl">
          <HeroParticle />
        </div>
        <div className="animate-fade-up mt-4 flex flex-wrap justify-center gap-3">
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
