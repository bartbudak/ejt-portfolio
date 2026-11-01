import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/shared/Marquee";
import { About } from "@/components/sections/About";
import { OffTheClock } from "@/components/sections/OffTheClock";
import { BeyondTheDesk } from "@/components/sections/BeyondTheDesk";
import { CrownJewel } from "@/components/sections/CrownJewel";
import { Contact } from "@/components/sections/Contact";

// Local-only preview of the home while the live site stays on the coming-soon
// holding page (site.comingSoon). noindex as defense-in-depth — do NOT deploy
// this to the main hosting channel while iterating.
export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <>
      <Header />
      {/* Preview-only palette picker; delete to remove. */}
      <ThemeSwitcher />
      {/* One screen: the header sits above it, the hero takes what is left, and
          the marquee closes the fold rather than hanging below it. */}
      {/* Marquee 1 used to scroll away with the hero. Ellie asked for it to
          behave like the section bands, which pin under the header and act as
          a summary of the slide they belong to. Sticky resolves against this
          wrapper, so it now closes the fold, rises with the scroll, then holds
          under the header for the whole of "Hi There!" and leaves with it. */}
      <div className="relative">
        <div className="flex h-[calc(100svh-var(--ejt-header)-var(--ejt-marquee-h))] w-full flex-col">
          <Hero />
        </div>
        <Marquee className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30" />
        <About />
      </div>
      {/* New in the 2026-11-01 restructure: the person behind the pitch decks,
          and why she goes to origin. Everything from "The Idea" through
          Kirsty's letter that used to follow here has moved to /preview/work;
          Crown Jewel is now the teaser that hands off to it. */}
      <OffTheClock />
      <BeyondTheDesk />
      <CrownJewel />
      <Contact />
    </>
  );
}
