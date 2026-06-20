import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroParticle, ACID_STOPS } from "@/components/shared/HeroParticle";

// PROTOTYPE — maximalist "loud hero, quiet work" landing. The Maeve cast Ellie
// directed is pushed to the EDGES as a SAMSON-style cutout frame; her own voice
// (the particle wordmark, grain, warm washes) owns the bright center.
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

// Cutouts framing the viewport edges, denser toward the bottom. Sizes/positions
// are responsive: bolder, fewer pieces on mobile (the scatter decor is desktop-
// only via `hidden sm:block`) so the small wordmark stays uncrowded.
const CUTOUTS: { src: string; className: string }[] = [
  // Greg on Rocket — bottom-right hero anchor.
  {
    src: "/hero/greg-rocket.png",
    className:
      "absolute h-auto z-[20] w-[64vw] -bottom-[3%] -right-[14%] rotate-[-12deg] sm:w-[40vw] sm:-bottom-[4%] sm:-right-[6%]",
  },
  // Trench-coat Froggy — tall detective silhouette, bottom-left.
  {
    src: "/hero/froggy-trench.svg",
    className:
      "absolute h-auto z-[18] w-[34vw] -bottom-[2%] -left-[6%] rotate-[5deg] sm:w-[19vw] sm:-bottom-[3%] sm:-left-[1%]",
  },
  // Greg with Stars — top-right.
  {
    src: "/hero/greg-stars.png",
    className:
      "absolute h-auto z-[16] w-[42vw] top-[6%] -right-[10%] rotate-[8deg] sm:w-[21vw] sm:top-[12%] sm:-right-[3%]",
  },
  // Pink heart-arrow — top-left accent (kept on mobile).
  {
    src: "/hero/heart-arrow.svg",
    className:
      "absolute h-auto z-[12] w-[13vw] top-[12%] left-[3%] rotate-[-14deg] sm:w-[7vw] sm:top-[15%] sm:left-[4%]",
  },
  // --- desktop-only density ---
  {
    src: "/hero/pineapple.svg",
    className:
      "hidden sm:block absolute h-auto z-[14] w-[11vw] bottom-[15%] left-[9%] rotate-[-8deg]",
  },
  {
    src: "/hero/roses.svg",
    className:
      "hidden sm:block absolute h-auto z-[15] w-[15vw] bottom-[3%] left-[43%] rotate-[6deg]",
  },
  {
    src: "/hero/heart-red.svg",
    className:
      "hidden sm:block absolute h-auto z-[13] w-[4.5vw] bottom-[21%] right-[23%] rotate-[18deg]",
  },
  {
    src: "/hero/heart-yellow.svg",
    className:
      "hidden sm:block absolute h-auto z-[11] w-[3vw] top-[46%] right-[4%] rotate-[-10deg]",
  },
  {
    src: "/hero/heart-yellow.svg",
    className:
      "hidden sm:block absolute h-auto z-[11] w-[2.4vw] bottom-[30%] left-[23%] rotate-[14deg]",
  },
  {
    src: "/hero/heart-yellow.svg",
    className:
      "hidden sm:block absolute h-auto z-[11] w-[2.2vw] top-[16%] left-[33%] rotate-[12deg]",
  },
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
            className={`animate-fade-up select-none ${c.className}`}
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
        <div className="relative mx-auto mt-3 h-[clamp(200px,42vh,440px)] w-full max-w-3xl">
          <HeroParticle stops={ACID_STOPS} />
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
