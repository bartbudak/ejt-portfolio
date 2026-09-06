import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/shared/Marquee";
import { About } from "@/components/sections/About";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
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
      <Hero />
      <Marquee />
      <About />
      <Results />
      <BeforeAfter />
      <Contact />
    </>
  );
}
