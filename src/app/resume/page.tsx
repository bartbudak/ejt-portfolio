import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/shared/Marquee";
import { Contact } from "@/components/sections/Contact";
import { Credits } from "@/components/shared/Credits";
import { ResumeDoc } from "@/components/sections/ResumeDoc";
import { CARD_FRAME } from "@/components/shared/PostCard";

// Resume — moved here from /preview/resume on launch, 2026-11-15. The page
// band, the title, the download, then the résumé itself in the Maeve frame,
// rendered from the same data the PDF is printed from.
export const metadata: Metadata = {
  title: "Resume",
};

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export default function ResumePage() {
  return (
    <>
      <Header />
      <Marquee
        items={["Resume"]}
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />

      <section
        id="resume"
        className="w-full px-5 py-16 sm:px-10 sm:py-24"
        style={{ backgroundColor: "var(--mv-paper)" }}
      >
        <div className="@container mx-auto w-full max-w-5xl">
          {/* Title and download: one row on a phone, where the two would
              otherwise cost a screen between them; stacked and centred from
              the small breakpoint up. It wraps on the very smallest phones (320px),
              where the title and button together are wider than the screen. */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-4 sm:flex-col sm:flex-nowrap sm:justify-center sm:gap-8">
            <h1
              className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em] sm:text-center"
              style={{
                ...WONK,
                color: "var(--ejd-vermilion)",
                fontSize: "clamp(2.25rem,8vw,6rem)",
              }}
            >
              Resume
            </h1>

            <a
              href="/ellie-thompson-resume.pdf"
              download="Ellie-Thompson-Resume.pdf"
              className="inline-flex flex-none items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-[0.02em] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-6 sm:py-3 sm:text-base"
              style={{
                backgroundColor: "var(--ejd-marigold)",
                color: "var(--ejd-ink)",
                border: "var(--mv-stroke) solid var(--ejd-ink)",
                boxShadow:
                  "0 0 0 5px var(--ejd-vermilion), 0 0 0 7px var(--ejd-ink)",
                margin: 7,
              }}
            >
              Download now
              <span aria-hidden>↓</span>
              <span className="sr-only"> (PDF, two pages)</span>
            </a>
          </div>

          {/* The résumé, in the Maeve frame. The document sizes itself from
              this container's width, so it is the same two pages at every
              width, just smaller. */}
          <div
            className="overflow-hidden"
            style={{
              ...CARD_FRAME,
              // CARD_FRAME's margin is its ring; the top needs the section's
              // own rhythm on top of that, or the button's ring sits on it.
              marginTop: "calc(var(--mv-frame) + var(--mv-stroke) + 2.5rem)",
              backgroundColor: "var(--ejd-blush)",
              padding: "clamp(0.75rem, 3cqw, 2rem)",
            }}
          >
            <div className="@container">
              <ResumeDoc />
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Credits />
    </>
  );
}
