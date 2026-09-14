import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Marquee } from "@/components/shared/Marquee";
import { Contact } from "@/components/sections/Contact";
import { ResumeDoc } from "@/components/sections/ResumeDoc";
import { CARD_FRAME } from "@/components/shared/PostCard";

// Resume — its own tab (Bart, 2026-09-13): the page band, the title, the
// download, then the résumé itself in the Maeve frame, rendered from the same
// data the PDF is printed from.
//
// Local-only, same as /preview: noindex, and do NOT deploy either to the main
// hosting channel while the live site is still the coming-soon page.
export const metadata: Metadata = {
  title: "Resume",
  robots: { index: false, follow: false },
};

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export default function ResumePage() {
  return (
    <>
      <Header />
      {/* Preview-only palette picker; delete to remove. */}
      <ThemeSwitcher />
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
          <h1
            className="text-center font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
            style={{
              ...WONK,
              color: "var(--ejd-vermilion)",
              fontSize: "clamp(2.5rem,8vw,6rem)",
            }}
          >
            Resume
          </h1>

          <p className="mt-8 text-center">
            <a
              href="/ellie-thompson-resume.pdf"
              download="Ellie-Thompson-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold tracking-[0.02em] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
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
          </p>

          {/* The résumé, in the Maeve frame. The document sizes itself from
              this container's width, so it is the same two pages at every
              width, just smaller. */}
          <div
            className="mt-12 overflow-hidden"
            style={{
              ...CARD_FRAME,
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
    </>
  );
}
