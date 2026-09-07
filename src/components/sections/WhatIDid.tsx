import Image from "next/image";
import { Marquee } from "@/components/shared/Marquee";
import { scope, scopeIntro } from "@/data/scope";

// "So, what exactly did I do?" — her deck scatters the answer as fragments
// around an illustration of her. Here the illustration holds the centre and the
// work groups underneath it, each fragment given a heading so the section can be
// scanned rather than read. The substance is hers; the wording is tightened so
// each reads as a sentence rather than a caption.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function WhatIDid() {
  return (
    <section
      id="scope"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      {/* This section's own name, pinned under the header while the section
          is on screen; it leaves with the section and the next one takes the
          slot. */}
      <Marquee
        items={["So, What Exactly Did I Do?", "Maeve"]}
        background="var(--ejd-vermilion)"
        ring="var(--ejd-marigold)"
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(3.25rem,11.25vw,7rem)" }}
        >
          {scopeIntro}
        </h2>

        <Image
          src="/awards/what-i-did.png"
          alt="An illustration of Ellie sitting cross-legged, a whole world of forests, city blocks and ships growing out of her lap"
          width={1200}
          height={743}
          className="mx-auto mt-10 block h-auto w-[min(90vw,34rem)]"
        />

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {scope.map((c) => (
            <li key={c.heading}>
              <h3
                className="font-display text-xl font-black uppercase leading-[0.95] tracking-[-0.01em]"
                style={{ ...WONK, color: "var(--ejd-vermilion)" }}
              >
                {c.heading}
              </h3>
              <p
                className="mt-2 text-base leading-snug"
                style={{ color: "var(--ejd-ink)" }}
              >
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
