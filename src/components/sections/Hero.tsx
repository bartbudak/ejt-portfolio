import Image from "next/image";
import { site } from "@/lib/site";

// Opening hero — a direct translation of Ellie's own Canva deck (2026-09-04),
// which is the source of truth over HANDOFF.md §11's "Welcome, I'm Ellie"
// particle wordmark: the deck's title card — blush field, vermilion name, roles
// tucked behind her head.
// Colours are her deck's true values. Several fail WCAG contrast; that's a
// deliberate aesthetic call (Bart, 2026-09-04). Display type is treated as
// graphic; body copy stays near-black, which is what her deck does too.
//
// "Moving to NYC" / "Open to Work" were corner tags here; they now ride the
// <Marquee/> band directly below (Bart, 2026-09-05).

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// Same axes, plus `opsz` pinned to the top of Fraunces' optical-size range.
// Two reasons. Typographically, the wordmark should wear the same display
// letterforms at 60px on a phone as it does at 163px on a desktop, and optical
// sizing is otherwise automatic, so the phone would silently get the text cut.
// Mechanically, an automatic `opsz` makes the glyph advance a function of the
// font size — which quietly breaks the fit calculation below, since a ratio
// measured at one size is then wrong at another. Pinning it makes the advance
// a constant.
const WORDMARK_AXES = {
  fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1',
} as const;

// Advance width of the wordmark in ems, measured in-browser against the real
// Fraunces at the exact settings above (uppercase, opsz 144, tracking -0.03em,
// word-spacing 0.12em): "Ellie Thompson" = 8.4975em on one line, "Thompson" =
// 5.5475em as the longer word when the two stack on mobile — both now constant
// across sizes. `--wm-advance` carries each with ~1% of margin, and the font
// size is derived from it so the line always FITS its box.
//
// Why it has to fit: a nowrap line that overflows a `text-align: center` block
// does not overflow evenly — its start edge is pinned to the content edge and
// the whole run spills right. That was the hero reading as "shifted right":
// 1468px of type in a 1376px box put the wordmark's optical centre 42px right
// of the page centre, 18px off the viewport edge on one side and 101px on the
// other. Sizing to fit is what makes `text-center` mean centred.
const WORDMARK_FIT = {
  fontSize: "min(11.5rem, calc((100vw - 2rem) / var(--wm-advance)))",
} as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 pt-12 sm:pt-16">
        {/* The deck sets this in Benguiat *Condensed*. Fraunces has no condensed
            cut, so a slight scaleX recovers the proportion without needing a
            licensed face. Mobile stacks the two words and stretches them
            vertically so the type still carries a narrow viewport. */}
        <h1
          className="block origin-center scale-x-[0.96] scale-y-[1.18] text-center font-display font-black uppercase leading-[0.82] tracking-[-0.03em] [--wm-advance:5.6] sm:scale-x-[0.94] sm:scale-y-100 sm:whitespace-nowrap sm:leading-[0.86] sm:[--wm-advance:8.58]"
          style={{
            ...WORDMARK_AXES,
            ...WORDMARK_FIT,
            color: "var(--ejd-vermilion)",
            // scaleX + negative tracking crush the word space; put it back.
            wordSpacing: "0.12em",
          }}
        >
          <span className="block sm:inline">Ellie</span>{" "}
          <span className="block sm:inline">Thompson</span>
        </h1>

        {/* Roles sit level with her head so the cut-out overlaps them, as the
            deck stacks them. */}
        <ul
          className="mt-6 flex flex-wrap items-baseline justify-center gap-x-[8vw] gap-y-2 text-center font-display font-semibold uppercase tracking-[0.04em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(0.7rem,1.5vw,1.35rem)" }}
        >
          {site.roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Ellie — Canva's knockout, lifted out of the deck PDF and cropped to its
          alpha bounds.
          `flex-1 min-h-0` + `h-full` is what keeps the middle role readable: she
          is sized by the height LEFT OVER under the type, not by viewport width,
          so she can never grow up into the words. Previously she cleared
          "Creative Strategist" by 2px at 900px tall and covered it outright on
          any shorter window — which is exactly what Bart saw. */}
      <div className="pointer-events-none relative z-30 mt-4 flex min-h-0 flex-1 items-end justify-center">
        <Image
          src="/hero/ellie-cutout.png"
          alt="Ellie Thompson, wearing a blue beanie and a cloud-print sweater, biting into a wrapped chocolate"
          width={700}
          height={809}
          // Next 16 deprecated `priority` in favour of `preload`; this is the
          // above-the-fold LCP element.
          preload
          // The -12% is her head's own offset. She is cropped to her alpha
          // bounds and is not centred inside them: sampling the alpha
          // column-by-column puts her body's mass at x≈350/700 (dead centre)
          // but her head — what the eye aligns to a centred name — at x≈435,
          // i.e. 12% right. Uncorrected that reads as a second rightward lean
          // and does not match the deck, where her head sits on the centre
          // line. From `sm` up only: on mobile she is deliberately wider than
          // the viewport and bleeding off both edges, and shifting a bleeding
          // image just clips 100px off one arm.
          className="h-full w-auto max-w-[min(124vw,34rem)] object-contain object-bottom sm:max-w-[min(84vw,34rem)] sm:-translate-x-[12%]"
        />
      </div>
    </section>
  );
}
