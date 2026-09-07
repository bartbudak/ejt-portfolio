import Image from "next/image";
import { ExternalIcon } from "@/components/shared/ExternalLink";
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

// Her deck marks two words inside the body copy: her own name in italic, and
// "Maeve" in marigold with a rule under it. Keeping the source strings plain in
// site.ts and doing the emphasis here means the copy stays editable as prose.
const MARKED = /(Ellie|Maeve)/g;

function withEmphasis(text: string) {
  return text.split(MARKED).map((part, i) =>
    part === "Ellie" ? (
      <em key={i}>{part}</em>
    ) : part === "Maeve" ? (
      // Ellie asked for Maeve to lead out to the brand she built. Same marked
      // treatment the deck gives the word, now doing something.
      <a
        key={i}
        href="https://maevechocolate.com"
        target="_blank"
        rel="noreferrer"
        className="whitespace-nowrap font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
        style={{ color: "var(--ejd-marigold)" }}
      >
        {part}
        <ExternalIcon className="ml-[0.15em]" />
        <span className="sr-only"> (opens maevechocolate.com in a new tab)</span>
      </a>
    ) : (
      part
    ),
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden"
      style={{ backgroundColor: "var(--ejd-vermilion)" }}
    >
      {/* The padding lives on the text column, not the section, so the photo can
          run edge to edge vertically — `items-stretch` hands the image cell the
          full row height and it bleeds to the panel's top and bottom, the way
          the deck sets it. */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch lg:grid-cols-[1.15fr_1fr]">
        <div className="self-center px-5 py-16 sm:px-10 sm:py-24 lg:pr-4">
          <h2
            className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
            style={{ ...WONK, color: "var(--ejd-marigold)", fontSize: "clamp(3.75rem,11.25vw,7rem)" }}
          >
            {site.about.heading}
          </h2>

          {/* Indented under the heading, exactly as the deck sets it. Decorative
              — the heading above already says it, so it is hidden from the
              accessibility tree rather than read out as a second greeting. */}
          <p
            aria-hidden
            className="mt-2 pl-[8%] font-script text-2xl sm:text-[2rem]"
            style={{ color: "var(--ejd-marigold)" }}
          >
            {site.about.script}
          </p>

          <div
            className="mt-7 max-w-[52ch] space-y-5 text-base leading-relaxed sm:text-xl"
            style={{ color: "var(--ejd-ink)" }}
          >
            {site.about.paragraphs.map((p) => (
              <p key={p}>{withEmphasis(p)}</p>
            ))}
          </div>
        </div>

        {/* `md:static` is doing the work: it drops this cell out of the
            positioning chain so the photo below resolves against the SECTION
            instead of the centred container, and its right edge lands on the
            viewport edge rather than the container's.
            The split itself waits for `lg`. At tablet widths two columns leave
            them both too narrow — she overhung the copy by 157px at 768 and the
            cell clipped a straight vertical line through her body. Below lg the
            layout stacks instead, which is the arrangement that already reads
            well on a phone: full-width copy, then her bleeding off both edges
            of her own block. */}
        <div className="relative min-h-[26rem] overflow-hidden lg:min-h-0 lg:static">
          {/* Height-driven, not width-driven: `inset-y-0` pins her to the top
              and bottom of the panel and `w-auto` lets her own ratio set the
              width, so her top, right and bottom edges all sit on the viewport
              and she reads as walking off the screen. Right-hung at every size —
              centring her on mobile broke that read, leaving her floating in
              the middle of the panel with vermilion on both sides. */}
          <Image
            src="/hero/ellie-astronaut.webp"
            alt="Ellie in a toy space helmet, throwing peace signs among hanging paper confetti"
            width={1100}
            height={1588}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="absolute inset-y-0 right-0 h-full w-auto max-w-none object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
