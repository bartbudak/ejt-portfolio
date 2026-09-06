import { site } from "@/lib/site";

// The scrolling band from the live Maeve site, recoloured for Ellie's deck.
// Structure is Maeve's `c-text-marquee` snippet verbatim: exactly two copies of
// the same content in a flex row, translated -100% on a linear loop, so copy #2
// is under the pointer at the moment copy #1 leaves — no gap, no reset jump.
// Styling lives in globals.css (`.ejt-marquee*`), ported from their SCSS.
//
// Ellie's colours instead of Maeve's yellow-on-pink: marigold ground, vermilion
// ring, ink hairlines and dots.
//
// This is where "Open to Work" and "Moving to NYC" now live — they were corner
// tags in the deck's title card, but as a band they read at any viewport height
// and stop competing with her cut-out for the hero's bottom corners.

type MarqueeProps = {
  /** Defaults to `site.marquee`. */
  items?: readonly string[];
  /** Ground colour of the band. */
  background?: string;
  /** The ring drawn outside the hairline border. */
  ring?: string;
  /** Extra positioning classes — used to pin a band under the sticky header. */
  className?: string;
};

export function Marquee({
  items = site.marquee,
  background = "var(--ejd-marigold)",
  ring = "var(--ejd-vermilion)",
  className = "",
}: MarqueeProps) {
  // The two-copy trick only stays seamless while ONE copy is at least as wide
  // as the viewport: copy A runs 0 → -W while copy B runs W → 0, so the pair
  // spans [-W, 2W-t·W], which reaches the right edge at the end of the cycle
  // only if W ≥ viewport. A short list cannot get there on its own, and it
  // cannot grow into it either — the font size stops scaling at its 2rem clamp
  // around 1830px, so W is FIXED above that width however wide the display is.
  //
  // So the list is repeated until a copy is wide enough. The width is estimated
  // from character count rather than measured, because this renders on the
  // server: roughly 0.55em per character at the 2rem ceiling, plus each item's
  // trailing gap. Two words ("Everyday Launch · Maeve") need far more passes
  // than five phrases do, which a fixed repeat count got wrong.
  const perPass = items.reduce((w, i) => w + i.length * 18 + 36, 0);
  const passes = Math.min(24, Math.max(2, Math.ceil(4200 / Math.max(perPass, 1))));

  // Always exactly TWO copies — that is what makes the loop seamless — each
  // carrying `passes` repetitions of the list so a single copy is wide enough.
  const run = (copy: number) => (
    <div
      key={copy}
      // The first run is the accessible one; every duplicate is decorative and
      // hidden from the tree so a screen reader hears the phrases once.
      aria-hidden={copy > 0 || undefined}
      className="ejt-marquee__track flex flex-none items-center whitespace-nowrap"
    >
      {Array.from({ length: passes }, (_, pass) =>
        items.map((item) => (
          <span key={`${pass}-${item}`} className="ejt-marquee__item">
            {item}
          </span>
        )),
      )}
    </div>
  );

  return (
    <div
      className={`ejt-marquee relative z-10 flex w-full flex-none items-center overflow-hidden py-1 font-display uppercase ${className}`}
      style={
        {
          backgroundColor: background,
          color: "var(--ejd-ink)",
          fontSize: "clamp(1rem,1.75vw,2rem)",
          lineHeight: 1.1,
          "--ejt-marquee-ring": ring,
        } as React.CSSProperties
      }
    >
      {[0, 1].map(run)}
    </div>
  );
}
