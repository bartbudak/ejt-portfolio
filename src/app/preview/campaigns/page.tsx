import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Marquee } from "@/components/shared/Marquee";
import { Collections, LIGHT_TONE } from "@/components/sections/Collections";
import { Contact } from "@/components/sections/Contact";
import { seasons, seasonsIntro } from "@/data/campaigns";

// Campaigns — the second tab. Starts at the Valentine's Day brief and runs
// through the seasonal collections (Bart, 2026-09-05).
//
// Local-only, same as /preview: noindex, and do NOT deploy either to the main
// hosting channel while the live site is still the coming-soon page.
export const metadata: Metadata = {
  title: "Campaigns",
  robots: { index: false, follow: false },
};

export default function CampaignsPage() {
  return (
    <>
      <Header />
      {/* Preview-only palette picker; delete to remove. */}
      <ThemeSwitcher theme="pistachio" />
      {/* The page's band, pinned under the header the way the home page's
          first marquee is (Bart, 2026-09-13). */}
      <Marquee
        items={["Campaigns"]}
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />
      <Collections
        title="Seasonal Collections"
        intro={seasonsIntro}
        items={seasons}
        tone={LIGHT_TONE}
      />
      <Contact />
    </>
  );
}
