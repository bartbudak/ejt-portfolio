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
};

export function Marquee({
  items = site.marquee,
  background = "var(--ejd-marigold)",
  ring = "var(--ejd-vermilion)",
}: MarqueeProps) {
  // The two-copy trick only stays seamless while ONE copy is at least as wide
  // as the viewport: copy A runs 0 → -W while copy B runs W → 0, so the pair
  // spans [-W, 2W-t·W], which still reaches the right edge at the end of the
  // cycle only if W ≥ viewport. Five short phrases measured 1504px, which holds
  // at 1440 and tears on anything wider, so each copy carries the list twice.
  const run = (copy: number) => (
    <div
      key={copy}
      // The first run is the accessible one; every duplicate is decorative and
      // hidden from the tree so a screen reader hears the phrases once.
      aria-hidden={copy > 0 || undefined}
      className="ejt-marquee__track flex flex-none items-center whitespace-nowrap"
    >
      {[0, 1].map((pass) =>
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
      className="ejt-marquee relative z-10 flex w-full flex-none items-center overflow-hidden py-1 font-display uppercase"
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
