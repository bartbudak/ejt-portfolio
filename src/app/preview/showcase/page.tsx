import type { Metadata } from "next";
import { Results } from "@/components/sections/Results";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Contact } from "@/components/sections/Contact";

// Component sandbox — renders the lower half of the page at the top of the
// document. The Browser pane only paints the top of a page, so anything below
// the fold can't be screenshotted from /preview. Local only; noindex.
export const metadata: Metadata = {
  title: "Showcase sandbox",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Results />
      <BeforeAfter />
      <Contact />
    </>
  );
}
