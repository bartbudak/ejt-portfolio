import Image from "next/image";
import { site } from "@/lib/site";
import { ParticleWordmark } from "@/components/shared/ParticleWordmark";

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
      // Fills the first-screen block rather than measuring itself: the marquee
      // is inside that block now, so the two share one viewport height and the
      // hero takes whatever is left after the band.
      // `overflow-x: clip` with `overflow-y: visible` rather than
      // `overflow: hidden`: she has to bleed past the bottom edge to tuck
      // behind the band, but must still be trimmed at the sides. `hidden`
      // cannot do one axis without making the other a scroll container; `clip`
      // can.
      className="relative isolate flex min-h-0 w-full flex-1 flex-col [overflow-x:clip] [overflow-y:visible]"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 pt-12 sm:pt-16">
        {/* The deck sets this in Benguiat *Condensed*. Fraunces has no condensed
            cut, so a slight scaleX recovers the proportion without needing a
            licensed face. Mobile stacks the two words and stretches them
            vertically so the type still carries a narrow viewport. */}
        {/* The holding page's fluid pixel field, now carrying her name. The
            heading keeps the real text for screen readers and for search; the
            canvas beside it is decorative and pointer-transparent, so the dots
            never intercept a click.
            Height is derived from the same fitted size the CSS wordmark used,
            so the hero's layout — and the roles crossing her cap below — are
            unchanged. */}
        <h1
          className="relative block [--wm-advance:5.6] sm:[--wm-advance:8.58]"
        >
          <span className="sr-only">Ellie Thompson</span>
          {/* Two mounts rather than one reflowing mount: the mobile field
              stacks the name over two lines and the desktop one runs it across
              a single line, and each needs its own height. */}
          <span
            className="block sm:hidden"
            style={{ height: "calc(min(11.5rem, (100vw - 2rem) / var(--wm-advance)) * 2.1)" }}
          >
            <ParticleWordmark
              lines={["ELLIE", "THOMPSON"]}
              color="var(--ejd-vermilion)"
              scaleX={0.96}
            />
          </span>
          <span
            className="hidden sm:block"
            style={{ height: "calc(min(11.5rem, (100vw - 2rem) / var(--wm-advance)) * 1.05)" }}
          >
            <ParticleWordmark
              lines={["ELLIE THOMPSON"]}
              color="var(--ejd-vermilion)"
              scaleX={0.94}
            />
          </span>
        </h1>

        {/* Roles sit level with her head so the cut-out overlaps them, as the
            deck stacks them. */}
        <ul
          className="mt-6 flex flex-wrap items-baseline justify-center gap-x-[8vw] gap-y-2 text-center font-display font-semibold uppercase tracking-[0.04em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(0.75rem,1.5vw,1.25rem)" }}
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
      {/* Below the type now, not above it (z-10 vs the copy's z-20): she is
          oversized past the space left for her, so the roles have to sit in
          front or the middle one goes back under her cap. Bart is fine with the
          labels crossing the cap a little — that is how the deck reads. */}
      <div className="pointer-events-none relative z-10 min-h-0 flex-1">
        <Image
          src="/hero/ellie-cutout.webp"
          alt="Ellie Thompson, wearing a blue beanie and a cloud-print sweater, biting into a wrapped chocolate"
          width={1100}
          height={1271}
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
          // Absolutely positioned on purpose. In flow she was sized by
          // `max-width` instead of height — 666px tall at every viewport — so
          // the hero outgrew the screen on short windows and the fit was lost.
          // Out of flow, `h-[105%]` resolves against the flex track's real
          // height and she cannot add to it, so the section stays exactly one
          // screen at any size.
          //
          // 105%, not 100%: the sticky header takes 4rem off the hero, which
          // shrank her. The extra grows upward from the bottom edge, so she
          // keeps sitting on the fold and only her cap reaches the roles.
          //
          // The centring translate carries her head offset too — 50% to centre
          // plus the 12% her head sits right of the cut-out's middle.
          // Dropped by half the band so her bottom edge lands mid-marquee and
          // the hard photographic crop is covered by the band's opaque body
          // rather than ending in mid-air above it (Ellie, 2026-09-07). She
          // stays BEHIND the band: in front, that straight cut would read as a
          // mistake drawn across the ribbon.
          className="absolute bottom-[calc(var(--ejt-marquee-h)*-0.5)] left-1/2 h-[105%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom sm:-translate-x-[62%]"
        />
      </div>
    </section>
  );
}
