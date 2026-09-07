import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/shared/Marquee";
import { About } from "@/components/sections/About";
import { Brief } from "@/components/sections/Brief";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhatIDid } from "@/components/sections/WhatIDid";
import { LocalLaunch } from "@/components/sections/LocalLaunch";
import { Launch } from "@/components/sections/Launch";
import { Awards } from "@/components/sections/Awards";
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
      <div className="flex h-[calc(100svh-var(--ejt-header))] w-full flex-col">
        <Hero />
        <Marquee />
      </div>
      <About />
      <Brief />
      {/* One band across both: the numbers and the before/after are a single
          argument — here is what changed, and here is what it looked like — so
          the label stays pinned for the whole of it rather than dropping out
          halfway through. Sticky resolves against this wrapper, which is why
          the band lives here rather than inside either section. */}
      <div className="relative">
        <Marquee
          items={["The Results", "Maeve"]}
          background="var(--ejd-vermilion)"
          ring="var(--ejd-marigold)"
          className="sticky top-[var(--ejt-header)] z-30"
        />
        <Results />
        <BeforeAfter />
      </div>
      <WhatIDid />
      <LocalLaunch />
      <Launch />
      <Awards />
      <Contact />
    </>
  );
}
