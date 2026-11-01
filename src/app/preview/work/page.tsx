import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Marquee } from "@/components/shared/Marquee";
import { Brief } from "@/components/sections/Brief";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { LocalLaunch } from "@/components/sections/LocalLaunch";
import { Launch } from "@/components/sections/Launch";
import { Awards } from "@/components/sections/Awards";
import { Testimonial } from "@/components/sections/Testimonial";
import { Contact } from "@/components/sections/Contact";

// Work — new tab (2026-11-01 restructure). Everything that used to run on
// About from "The Idea" through Kirsty's letter, moved here as-is; About's
// Crown Jewel now teases this page with a "See the rebrand" CTA instead.
//
// Local-only, same as the rest of /preview: noindex, and do NOT deploy to the
// main hosting channel while the live site is still the coming-soon page.
export const metadata: Metadata = {
  title: "Work",
  robots: { index: false, follow: false },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      {/* Preview-only palette picker; delete to remove. */}
      <ThemeSwitcher />
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
