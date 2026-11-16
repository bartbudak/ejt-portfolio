import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/shared/Marquee";
import { Brief } from "@/components/sections/Brief";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { LocalLaunch } from "@/components/sections/LocalLaunch";
import { Launch } from "@/components/sections/Launch";
import { Awards } from "@/components/sections/Awards";
import { Testimonial } from "@/components/sections/Testimonial";
import { Contact } from "@/components/sections/Contact";
import { Credits } from "@/components/shared/Credits";

// Work — moved here from /preview/work on launch, 2026-11-15. Everything
// that used to run on About from "The Idea" through Kirsty's letter, moved
// here as-is in the 2026-11-01 restructure; About's Crown Jewel teases this
// page with a "See the rebrand" CTA.
export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <>
      <Header />
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
      <Credits />
    </>
  );
}
