import Image from "next/image";
import { site } from "@/lib/site";

// "HI THERE!" — the panel that sits directly under the title card in Ellie's
// deck, and the piece that was missing between the hero and the results.
// Translated rather than reinvented: vermilion field, marigold display type, a
// script "Hello" tucked under the heading, three short paragraphs in near-black,
// and the confetti/space-suit cut-out from the same page holding the right side.
//
// Copy is hers, verbatim (site.about). The longer About in the copy doc is a
// different, fuller piece of writing and still unplaced — see the note there.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

// The deck's hand-drawn marigold star — eight strokes radiating from a centre,
// deliberately uneven so it reads as drawn rather than generated.
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <g
        stroke="var(--ejd-marigold)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M50 6v88M6 50h88M19 19l62 62M81 19L19 81" />
      </g>
      <path
        d="M50 24c4 14 12 22 26 26-14 4-22 12-26 26-4-14-12-22-26-26 14-4 22-12 26-26Z"
        fill="var(--ejd-marigold)"
      />
    </svg>
  );
}

// Her deck marks two words inside the body copy: her own name in italic, and
// "Maeve" in marigold with a rule under it. Keeping the source strings plain in
// site.ts and doing the emphasis here means the copy stays editable as prose.
const MARKED = /(Ellie|Maeve)/g;

function withEmphasis(text: string) {
  return text.split(MARKED).map((part, i) =>
    part === "Ellie" ? (
      <em key={i}>{part}</em>
    ) : part === "Maeve" ? (
      <strong
        key={i}
        className="font-semibold underline underline-offset-4"
        style={{ color: "var(--ejd-marigold)" }}
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden px-5 py-16 sm:px-10 sm:py-24"
      style={{ backgroundColor: "var(--ejd-vermilion)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <div>
          <h2
            className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
            style={{ ...WONK, color: "var(--ejd-marigold)", fontSize: "clamp(3rem,9vw,7rem)" }}
          >
            {site.about.heading}
          </h2>

          {/* Indented under the heading, exactly as the deck sets it. Decorative
              — the heading above already says it, so it is hidden from the
              accessibility tree rather than read out as a second greeting. */}
          <p
            aria-hidden
            className="mt-2 pl-[8%] font-script text-2xl sm:text-3xl"
            style={{ color: "var(--ejd-marigold)" }}
          >
            {site.about.script}
          </p>

          <div
            className="mt-7 max-w-[52ch] space-y-5 text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ejd-ink)" }}
          >
            {site.about.paragraphs.map((p) => (
              <p key={p}>{withEmphasis(p)}</p>
            ))}
          </div>
        </div>

        <div className="relative">
          <Star className="pointer-events-none absolute -left-2 top-8 z-10 h-16 w-16 sm:h-24 sm:w-24" />
          <Image
            src="/hero/ellie-astronaut.png"
            alt="Ellie in a toy space helmet, throwing peace signs among hanging paper confetti"
            width={760}
            height={1097}
            sizes="(min-width: 768px) 40vw, 80vw"
            className="mx-auto h-auto w-[min(80vw,26rem)] max-w-none object-contain md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
