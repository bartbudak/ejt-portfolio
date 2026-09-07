import Image from "next/image";
import { Marquee } from "@/components/shared/Marquee";
import { site } from "@/lib/site";

// The page's ending. Peak-End: the showcase is the peak, and a page that stops
// dead after it leaves a reader with nowhere to go. Vermilion so the scroll
// closes with a full stop — the hero and this band bookend the quiet paper
// stretch (results + showcase) between them.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const LINKS = [
  { label: "Email", href: `mailto:${site.email}`, text: site.email },
  { label: "LinkedIn", href: site.social.linkedin, text: "in/ellie-thompson" },
  { label: "Instagram", href: site.social.instagram, text: "@elliejthompson" },
];

export function Contact() {
  return (
    <section
      id="contact"
      // A full screen tall so the closing band gets the header slot to itself.
      // At 740px in a 900px viewport the page ran out before the Awards band had
      // finished leaving, so the two were always on screen together. She grows
      // with the section — her height is the section's — so the extra room is
      // hers.
      className="relative isolate flex min-h-[100svh] w-full flex-col"
      style={{ backgroundColor: "var(--ejd-vermilion)" }}
    >
      {/* The closing band, pinned under the header for as long as this section
          is on screen — the same treatment the launch and awards sections get.
          It carries the availability copy rather than the section's name,
          because that is the line worth repeating at the end of the page. */}
      <Marquee className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30" />

      {/* No bottom padding while she is in flow beneath the card — that
          padding was the 79px gap holding her off it. It comes back at `lg`,
          where she is absolutely positioned and the copy needs the room. */}
      {/* From `lg` this block takes the height the marquee leaves and centres
          the heading and card inside it as one group, so the pair sits against
          the middle of her rather than riding the top edge with a screen of
          empty vermilion underneath. Below `lg` she is in flow beneath the copy
          and there is no leftover height to centre in, so it stays a stack. */}
      <div className="relative z-10 px-3 pt-20 pb-0 sm:px-10 sm:pt-28 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-16">
      <div // Centred in the space beside her, not in the whole section — `mx-auto` alone
      // kept the column over her feet.
      className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center lg:ml-0 lg:mr-auto lg:max-w-[60%]">
        {/* `w-fit` makes this column hug its widest child — the heading — so
            the card below can take `w-full` and come out exactly as wide as
            "Let's talk" rather than as wide as the section. */}
        <div className="mx-auto flex w-full max-w-full flex-col items-center gap-6 sm:w-fit">
        <h2
          className="font-display font-black uppercase leading-[0.86] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-marigold)", fontSize: "clamp(3.25rem,11.25vw,6.5rem)" }}
        >
          {/* Stacked on a phone, one line from `sm` — at 9vw the two words
              together crowd a narrow viewport. */}
          <span className="block sm:inline">Let&apos;s</span>{" "}
          <span className="block sm:inline">talk</span>
        </h2>

        {/* Everything under the heading sits in its own framed enclosure — the
            Maeve frame again, on blush, so the closing band reads as a card
            pinned to the vermilion rather than type floating on it. The ring is
            marigold because a vermilion one would vanish into the ground. */}
        <div
          // `w-0 min-w-full` rather than `w-full`: the parent is `w-fit`, so it
          // sizes to its widest child's max-content — and the paragraph inside
          // this card is wider than the heading, so a plain `w-full` made the
          // card set the width it was supposed to be taking. At zero width it
          // contributes nothing to that measurement, the heading wins, and
          // `min-w-full` then fills whatever the heading decided.
          className="flex w-0 min-w-full flex-col items-center gap-5 px-5 py-7 sm:px-8 sm:py-8"
          style={{
            backgroundColor: "var(--ejd-blush)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            boxShadow:
              "0 0 0 var(--mv-frame) var(--ejd-marigold), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
            borderRadius: 24,
            margin: "calc(var(--mv-frame) + var(--mv-stroke))",
          }}
        >

        <p
          className="max-w-[46ch] text-base leading-relaxed sm:text-xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          {`I'm based in ${site.location} and looking for my next brand home. In-house building something from the ground up, or agency-side helping other brands find their story. If any of this resonates, I'd love to hear from you.`}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {LINKS.filter((l) => l.href).map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="inline-flex rounded-full px-5 py-3 text-base font-semibold tracking-[0.02em] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: "var(--ejd-marigold)", color: "var(--ejd-ink)" }}
              >
                <span className="sr-only">{l.label}: </span>
                {l.text}
              </a>
            </li>
          ))}
        </ul>

        <p
          className="font-mono text-xs uppercase tracking-[0.14em]"
          style={{ color: "var(--ejd-ink)" }}
        >
          {site.availability}
        </p>
        </div>
        </div>
      </div>
      </div>
      {/* The astronaut again, closing the page as she opened it. Same framing
          as "Hi There!": pinned to the section's top, right and bottom so she
          reads as walking off the screen. Only from `lg` — below that the two
          columns are too narrow and she would reach back over the copy, so she
          stacks under it instead. */}
      <Image
        src="/hero/ellie-astronaut.webp"
        alt=""
        width={1100}
        height={1588}
        aria-hidden
        sizes="(min-width: 1024px) 34vw, 70vw"
        // Behind the card, not over it: at `lg` she reaches back across the
        // copy column and was cutting the contact lines in half (Ellie,
        // 2026-09-07).
        className="pointer-events-none -mt-2 ml-auto block h-auto w-[min(76vw,20rem)] object-contain lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:mx-0 lg:mt-0 lg:h-full lg:w-auto lg:max-w-none lg:object-bottom"
      />
    </section>
  );
}
