import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";

// Local-only preview of the home while the live site stays on the coming-soon
// holding page (site.comingSoon). noindex as defense-in-depth — do NOT deploy
// this to the main hosting channel while iterating.
export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  // layout.tsx hides the Navbar while comingSoon=true, so render one locally
  // for hero context. (layout already provides the <main> wrapper.)
  return (
    <>
      <Navbar />
      <Hero />
      <Results />
      <BeforeAfter />
    </>
  );
}
