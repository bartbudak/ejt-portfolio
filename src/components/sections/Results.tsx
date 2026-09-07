import { site } from "@/lib/site";

// "THE RESULTS" — recreated from Ellie's Canva deck, where a full-bleed panel
// with four-point starbursts introduces the before/after rows.
//
// Deliberately quieter than the deck's marigold: the hero and the closing band
// are the two loud moments, and three saturated fields in a row cancel each
// other out (Von Restorff). Sitting on the same paper as the showcase below
// also makes the two read as one unit, which is what they are.
//
// The scoreboard lives here rather than in the hero because the deck puts the
// numbers under this heading too ("MAEVE WAS (RE)BORN IN 2025 — the business
// saw…"), and because a page whose only hard evidence sits above the fold in a
// band nobody scrolls back to has no evidence at all.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// Four-point sparkle with concave sides — the deck's burst shape.
function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <path
        d="M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z"
        // The title's own colour, not the accent. The accent is a bright warm
        // yellow and the ground here is a pale pink — close enough in value that
        // the bursts sank into it. Her deck fills them with the display colour
        // too, so this is also what the band is meant to look like.
        fill="var(--ejd-vermilion)"
      />
    </svg>
  );
}

export function Results() {
  return (
    <section
      id="results"
      className="relative isolate w-full"
      // The hero's blush, not the Maeve paper. That paper (#fff3e5) is a pale
      // peach, and sitting under the vermilion "Hi There!" it read as skin
      // rather than as a ground (Bart, 2026-09-05). Blush also puts the section
      // back on the same vermilion-on-blush pairing as the title card.
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <div className="relative px-5 pb-4 pt-20 sm:px-10 sm:pb-6 sm:pt-28">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        {/* The bursts hang off the HEADING, not the section. Pinned to the
            section's corners they drifted a long way from the words as the
            section grew; the deck sits them tight against the type — a cluster
            of two off its top-left and one large star off its bottom-right. */}
        <div className="relative">
          {/* Sized as a share of the heading, to her deck's proportions: her
              left cluster is 42% of the heading's width and the right star 28%,
              measured off the band. Fixed pixel sizes had them at 22% and 19% —
              about half the weight they carry in the deck.
              The offsets pull in on small screens: at deck proportions a phone
              would throw them past the viewport edge, and this section can no
              longer clip — `overflow: hidden` here would break the sticky band.
              At the deck's own offsets a 375px screen overflowed, which is a
              horizontal scrollbar on a phone for the sake of a decoration — and
              the pull-in had to go further once the display line became
              "MAEVE WAS (RE)BORN", because a wider heading box makes every one
              of these percentage offsets reach further out. Both left values
              move together, so the cluster keeps its shape. */}
          <Burst className="pointer-events-none absolute -left-[6%] -top-[30%] aspect-square w-[20%] sm:-left-[40%] sm:-top-[34%] sm:w-[30%]" />
          <Burst className="pointer-events-none absolute left-[4%] -top-[42%] aspect-square w-[11%] sm:-left-[14%] sm:-top-[48%] sm:w-[14%]" />
          <Burst className="pointer-events-none absolute -right-[6%] -bottom-[24%] aspect-square w-[18%] sm:-right-[46%] sm:-bottom-[30%] sm:w-[28%]" />

          {/* Her deck's own hierarchy: "MAEVE WAS (RE)BORN" is the display
              line and "THE RESULTS" is the small label above it. Both live in
              one <h2> so the heading still reads as a single heading to a
              screen reader, and the label is not announced as its own level. */}
          <h2 className="relative">
            <span
              className="block font-display font-black uppercase tracking-[0.08em]"
              style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "1.25rem" }}
            >
              The Results
            </span>
            <span
              className="mt-3 block font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
              style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3.25rem,11vw,6.5rem)" }}
            >
              <span className="block">Maeve was</span>
              <span className="block">(Re)born</span>
            </span>
          </h2>
        </div>

        <p
          className="max-w-[48ch] text-base leading-relaxed sm:text-xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          And within the first year, post-launch, the business saw:
        </p>

        <dl className="grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
          {site.stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1">
              <dt
                className="font-display font-black leading-none tracking-[-0.02em] tabular-nums"
                style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2rem,4.5vw,3.25rem)" }}
              >
                {s.value}
              </dt>
              <dd
                className="max-w-[18ch] text-xs leading-snug sm:text-base"
                style={{ color: "var(--ejd-ink)" }}
              >
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      </div>
    </section>
  );
}
