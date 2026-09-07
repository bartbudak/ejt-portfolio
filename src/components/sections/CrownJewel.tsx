import { Marquee } from "@/components/shared/Marquee";

// "MY CROWN JEWEL" — the slide Ellie asked for between "Hi There!" and "The
// Idea": something that introduces the main thing she has worked on and hands
// off into how she did it.
//
// The copy is not invented. It is her deck's own MY CROWN JEWEL page, which we
// had never placed, so this section is hers verbatim. If she wants it to carry
// more of her skills, that is her copy to write, not mine to guess.
//
// Blush between the vermilion of "Hi There!" and the marigold of "The Idea", so
// the three panels step rather than collide.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function CrownJewel() {
  return (
    <section
      id="crown-jewel"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      {/* Her Marquee 2. It introduces this slide, so it belongs to it. */}
      <Marquee
        items={["The Maeve Rebrand", "My Crowning Achievement"]}
        background="var(--ejd-vermilion)"
        ring="var(--ejd-marigold)"
        className="sticky top-[var(--ejt-header)] z-30"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-5 py-20 text-center sm:px-10 sm:py-28">
        <h2
          className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3rem,11vw,7rem)" }}
        >
          <span className="block">My Crown</span>
          <span className="block">Jewel</span>
        </h2>

        <p
          className="max-w-[46ch] text-xl leading-relaxed sm:text-2xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          I pitched the concept and saw through the execution of the rebrand of
          Seattle Chocolate&rsquo;s 30-year-old chocolate brand, creating over 100
          chocolate products in 3 years.
        </p>
      </div>
    </section>
  );
}
