import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/shared/Marquee";
import { About } from "@/components/sections/About";
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
      {/* One screen: the header sits above it, the hero takes what is left, and
          the marquee closes the fold rather than hanging below it. */}
      <div className="flex h-[calc(100svh-var(--ejt-header))] w-full flex-col">
        <Hero />
        <Marquee />
      </div>
      <About />
      <Results />
      <BeforeAfter />
      <WhatIDid />
      <LocalLaunch />
      <Launch />
      <Awards />
      <Contact />
    </>
  );
}
