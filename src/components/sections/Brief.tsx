import Image from "next/image";
import { Marquee } from "@/components/shared/Marquee";
import { CARD_FRAME } from "@/components/shared/PostCard";
import {
  brief,
  briefIntro,
  briefLead,
  briefOpener,
  briefOpenerLabel,
  briefScript,
  briefTurn,
} from "@/data/brief";

// "THE BRIEF" — the deck page between "why did I pitch the rebrand?" and the
// numbers. It answers the obvious question the results raise: what was the plan
// that produced them. So it sits directly above THE RESULTS, and the two read
// as one argument — here is what I set out to do, here is what it did.
//
// Marigold ground, vermilion display: the same pairing as "So, what exactly did
// I do?", and a deliberate break from the vermilion field of "Hi There!"
// immediately above so the two panels don't run together.
//
// The five strategies are numbered because the deck presents them as a list of
// decisions rather than a paragraph — numbering makes that legible at a glance
// and keeps the block visually distinct from the un-numbered competency list
// further down the page.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function Brief() {
  return (
    <section
      id="brief"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      {/* This section's own name, pinned under the header while the section is
          on screen, then handed off to the next one. Both brand names ride in
          the band because this is the page where one became the other. */}
      <Marquee
        items={["The story of the Seattle Chocolate rebrand"]}
        background="var(--ejd-vermilion)"
        ring="var(--ejd-marigold)"
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        {/* Orients a reader who arrives here from "See the rebrand": a picture of
            the brand itself, then what this page is. The picture is Maeve's own
            header artwork (the bear, the logotype, the sea monster, the woman with
            her animals), chosen by Ellie (2026-11-13) over PAX photos, a hero
            capture from maevechocolate.com, or a bare logo: it is the brand's
            world and its name in one wide image, and it is not used elsewhere. */}
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center gap-10 sm:mb-24">
          <div style={CARD_FRAME} className="w-full overflow-hidden">
            <Image
              src="/brand/maeve-header.webp"
              alt="The Maeve header illustration: Gretchen the bear on the left, the MAEVE logotype in the middle with a sea monster's tentacles rising from the waves, and a woman with long white hair cradling a duck, a beaver and a frog on the right"
              width={2000}
              height={446}
              sizes="(min-width: 1024px) 1000px, 92vw"
              priority
              className="block h-auto w-full"
            />
          </div>
          <div className="text-center">
            <p
              className="font-display text-xl font-black uppercase tracking-[0.08em]"
              style={{ ...WONK, color: "var(--ejd-vermilion)" }}
            >
              {briefOpenerLabel}
            </p>
            <p
              className="mx-auto mt-3 max-w-[46ch] text-xl leading-relaxed sm:text-2xl"
              style={{ color: "var(--ejd-ink)", textWrap: "pretty" }}
            >
              {briefOpener}
            </p>
          </div>
        </div>

        <h2
          className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
          style={{
            ...WONK,
            color: "var(--ejd-vermilion)",
            fontSize: "clamp(3.75rem,12.5vw,7.5rem)",
          }}
        >
          {briefIntro}
        </h2>

        {/* The deck's aside, in her hand, sitting straight under the title —
            the same move "Hi There! / Hello" makes further up the page. */}
        <p
          className="mt-2 text-center font-script text-[2rem] sm:text-4xl"
          style={{ color: "var(--ejd-ink)" }}
        >
          {briefScript}
        </p>

        {/* The setup, set larger than the cards below it: this is the argument,
            and the five strategies are its consequences. Left-aligned inside a
            centred column — two paragraphs of centred prose are hard to track
            back to the start of the next line. */}
        <div
          className="mx-auto mt-9 max-w-[58ch] space-y-5 text-xl leading-relaxed sm:mt-11"
          style={{ color: "var(--ejd-ink)" }}
        >
          {briefLead.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        {/* Her own turn from the setup into the work, asked for by name. */}
        <h3
          className="mt-14 text-center font-display font-black uppercase leading-[0.9] tracking-[-0.02em]"
          style={{
            ...WONK,
            color: "var(--ejd-vermilion)",
            fontSize: "clamp(1.75rem,5vw,3rem)",
          }}
        >
          {briefTurn}
        </h3>

        <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {brief.map((line, i) => (
            <li
              key={line.heading}
              className={`rounded-[24px] p-4 sm:p-7 ${line.wide ? "sm:col-span-2" : ""}`}
              style={{
                backgroundColor: "var(--mv-paper)",
                border: "var(--mv-stroke) solid var(--mv-soft-black)",
              }}
            >
              {/* On a phone the number sits in a tile at the top-left with the
                  heading and copy beside it, all of it showing — no fold, no
                  arrow (Bart, 2026-09-15). Wider, the number and heading share
                  a baseline over the copy, as before. */}
              <div className="flex items-start gap-3 sm:block">
                <span
                  aria-hidden
                  className="grid h-14 w-14 flex-none place-items-center rounded-[10px] sm:hidden"
                  style={{
                    backgroundColor: "var(--ejd-blush)",
                    border: "var(--mv-stroke) solid var(--ejd-ink)",
                  }}
                >
                  <span
                    className="font-display text-lg font-black tabular-nums"
                    style={{ ...WONK, color: "var(--ejd-vermilion)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className="hidden font-display text-2xl font-black leading-none tabular-nums sm:inline sm:text-[2rem]"
                      style={{
                        ...WONK,
                        color: "var(--ejd-vermilion)",
                        opacity: 0.45,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-display text-xl font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-2xl"
                      style={{ ...WONK, color: "var(--ejd-vermilion)" }}
                    >
                      {line.heading}
                    </h3>
                  </div>
                  <p
                    className="mt-1 text-base leading-relaxed sm:mt-3"
                    style={{ color: "var(--ejd-ink)" }}
                  >
                    {line.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
