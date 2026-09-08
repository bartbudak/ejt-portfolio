import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Collections, DARK_TONE } from "@/components/sections/Collections";
import { Contact } from "@/components/sections/Contact";
import { collabs, collabsIntro } from "@/data/campaigns";

// Collaborations — the inverse of the seasonal page. Same layout and the same
// card/view-box machinery, run on an ink ground instead of paper.
export const metadata: Metadata = {
  title: "Collaborations",
  robots: { index: false, follow: false },
};

export default function CollabsPage() {
  return (
    <>
      <Header />
      {/* Preview-only palette picker; delete to remove. */}
      <ThemeSwitcher />
      <Collections
        title="Collaborations"
        intro={collabsIntro}
        items={collabs}
        tone={DARK_TONE}
        crossLink={{ href: "/preview/campaigns", label: "click here for seasonal collections" }}
      />
      <Contact />
    </>
  );
}
