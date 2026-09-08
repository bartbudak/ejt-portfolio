import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/shared/Marquee";
import { About } from "@/components/sections/About";
import { CrownJewel } from "@/components/sections/CrownJewel";
import { Brief } from "@/components/sections/Brief";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { LocalLaunch } from "@/components/sections/LocalLaunch";
import { Launch } from "@/components/sections/Launch";
import { Awards } from "@/components/sections/Awards";
import { Testimonial } from "@/components/sections/Testimonial";
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
      <CrownJewel />
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
          className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
        />
        <Results />
        <BeforeAfter />
      </div>
      {/* One band across the whole run of proof. Ellie asked for "some receipts
          for you" to hold until the next marquee takes over, and the next one
          is Contact's, so it has to span Local Launch, National Launch, Awards
          and the reference letter. Sticky resolves against this wrapper, which
          is why the band lives here rather than inside Local Launch. */}
      <div className="relative">
        <Marquee
          items={["Some receipts for you"]}
          background="var(--ejd-marigold)"
          ring="var(--ejd-vermilion)"
          className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
        />
        <LocalLaunch />
        <Launch />
        <Awards />
        <Testimonial />
      </div>
      <Contact />
    </>
  );
}
