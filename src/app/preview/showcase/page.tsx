import type { Metadata } from "next";
import { BeforeAfter } from "@/components/sections/BeforeAfter";

// Component sandbox — renders the showcase at the top of the document. The
// Browser pane only paints the top of a page, so anything below the fold can't
// be screenshotted from /preview. Local only; noindex.
export const metadata: Metadata = {
  title: "Showcase sandbox",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BeforeAfter />;
}
