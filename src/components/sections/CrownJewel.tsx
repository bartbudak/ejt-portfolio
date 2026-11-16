import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/shared/Marquee";
import { CARD_FRAME } from "@/components/shared/PostCard";

// "MY CROWN JEWEL" — the slide Ellie asked for between "Hi There!" and "The
// Idea": something that introduces the main thing she has worked on and hands
// off into how she did it.
//
// The copy is not invented. It started as her deck's own MY CROWN JEWEL page
// and she rewrote it herself in her second round (2026-09-11) to open with why
// the case study is here at all, so it is hers verbatim twice over. Do not
// tighten it.
//
// Blush between the vermilion of "Hi There!" and the marigold of "The Idea", so
// the three panels step rather than collide.
//
// 2026-11-01 restructure: this is now the LAST section on About, acting as a
// teaser into the new /work page (everything from here through Kirsty's
// letter moved there as-is). The CTA below is new; the copy above it is
// still hers, untouched.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function CrownJewel() {
  return (
    <section
      id="crown-jewel"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      {/* Her Marquee 2. It introduces this slide, so it belongs to it.
          One phrase, not two: she cut "My Crowning Achievement" in her second
          round (2026-09-11), so the band says the name of the work and stops. */}
      <Marquee
        items={["The Maeve Rebrand"]}
        background="var(--ejd-vermilion)"
        ring="var(--ejd-marigold)"
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-5 py-20 text-center sm:px-10 sm:py-28">
        <h2
          className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3rem,11vw,7rem)" }}
        >
          <span className="block">My Crown</span>
          <span className="block">Jewel</span>
        </h2>

        {/* The Maeve drawing Ellie chose for this slide (2026-11-13), in place of
            the PAX booth photo it had for a day: a woman with starry hair holding
            Seattle, a ship and palm trees, under the MAEVE logotype. Sits between the title and the copy, with the
            button last (Ellie, 2026-11-13). Trimmed from
            Maeve-Ellie_F-20x16.pdf; it is Maeve's artwork, credited in the page's
            fine print. */}
        <div style={CARD_FRAME} className="w-[min(88vw,34rem)] overflow-hidden">
          <Image
            src="/brand/maeve-ellie-drawing.webp"
            alt="A Maeve illustration: a woman with starry hair and green glasses holds a tiny Seattle skyline, a sailing ship and palm trees in her arms, beneath the MAEVE logotype"
            width={1600}
            height={1265}
            sizes="(min-width: 640px) 544px, 88vw"
            className="block h-auto w-full"
          />
        </div>


        <p
          className="max-w-[54ch] text-xl leading-relaxed sm:text-2xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          The best way to showcase my skillset is to walk you through the
          thinking behind the biggest project of my career: the Maeve rebrand. I
          pitched the concept and saw through the execution of the rebrand of
          Seattle Chocolate&rsquo;s 35-year-old namesake brand, creating over 100
          chocolate products in 3 years.
        </p>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold tracking-[0.02em] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-lg"
          style={{
            backgroundColor: "var(--ejd-marigold)",
            color: "var(--ejd-ink)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            boxShadow:
              "0 0 0 5px var(--ejd-vermilion), 0 0 0 7px var(--ejd-ink)",
            margin: 7,
          }}
        >
          See the rebrand
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
