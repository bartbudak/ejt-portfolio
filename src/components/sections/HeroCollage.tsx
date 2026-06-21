import { site } from "@/lib/site";
import { HeroParticle, ACID_STOPS } from "@/components/shared/HeroParticle";

// PROTOTYPE — minimal Faizan-style field: a grainy paper plane with a soft static
// pink blotch behind a big UPPERCASE particle wordmark, plus the floating nav.
// Behind /preview; the live coming-soon page (site.comingSoon) is untouched.

// Soft static washes — a muted pink blotch (Faizan-style) + faint warm tones.
const BLOTCHES = [
  "radial-gradient(44% 52% at 64% 46%, rgba(214,134,188,0.30), transparent 68%)", // soft pink
  "radial-gradient(46% 46% at 88% 14%, rgba(185,140,60,0.10), transparent 72%)", // faint gold
  "radial-gradient(42% 42% at 90% 92%, rgba(74,59,51,0.09), transparent 72%)", // faint cocoa
].join(", ");

// Faint structural grid (Valentin-style) in muted neutral.
const GRID = [
  "repeating-linear-gradient(90deg, rgba(120,110,96,0.10) 0 1px, transparent 1px 25%)",
  "repeating-linear-gradient(0deg, rgba(120,110,96,0.08) 0 1px, transparent 1px 33.334%)",
].join(", ");

// Tiling fractal-noise grain (feTurbulence) — heavier for the Faizan feel.
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function HeroCollage() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
      style={{ backgroundColor: "#ecebe4" }}
    >
      {/* soft static washes (pink blotch + faint warm tones) */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 0, background: BLOTCHES }} />
      {/* structural grid */}
      <div aria-hidden className="absolute inset-0" style={{ zIndex: 1, backgroundImage: GRID }} />
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ zIndex: 2, backgroundImage: GRAIN, backgroundSize: "160px 160px", mixBlendMode: "soft-light", opacity: 0.18 }}
      />

      {/* center wordmark */}
      <div className="relative mx-auto w-full max-w-5xl px-6" style={{ zIndex: 6 }}>
        <h1 className="sr-only">
          Welcome, I&apos;m Ellie — {site.name}, {site.role}
        </h1>
        {/* explicit height so the canvas has a resolved size to sample into */}
        <div className="relative mx-auto h-[clamp(260px,56vh,620px)] w-full max-w-4xl">
          <HeroParticle stops={ACID_STOPS} />
        </div>
      </div>
    </section>
  );
}
