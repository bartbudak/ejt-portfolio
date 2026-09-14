import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Collections, LIGHT_TONE } from "@/components/sections/Collections";
import { Contact } from "@/components/sections/Contact";
import { collabs, collabsIntro } from "@/data/campaigns";

// Collaborations — its own tab since 2026-09-11, sitting between Campaigns and
// Resume. It used to be the visual inverse of the seasonal page, on a burnt
// ground; Ellie asked for "the same visual look and feel as the Campaigns tab",
// so it now runs the same layout on the same paper.
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
        tone={LIGHT_TONE}
      />
      <Contact />
    </>
  );
}
