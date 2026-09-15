import { Marquee } from "@/components/shared/Marquee";
import { MobileCollapse } from "@/components/shared/MobileCollapse";
import {
  brief,
  briefIntro,
  briefLead,
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
              <MobileCollapse
                framed={false}
                title={line.heading}
                blurb={line.body}
                thumb={
                  <span
                    className="font-display text-lg font-black tabular-nums"
                    style={{ ...WONK, color: "var(--ejd-vermilion)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                }
              >
                <div className="hidden items-baseline gap-3 sm:flex">
                  <span
                    aria-hidden
                    className="font-display text-2xl font-black leading-none tabular-nums sm:text-[2rem]"
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
              </MobileCollapse>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
