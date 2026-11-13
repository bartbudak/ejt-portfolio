import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/shared/PalettePicker";
import { Marquee } from "@/components/shared/Marquee";
import { Collections, LIGHT_TONE } from "@/components/sections/Collections";
import { Contact } from "@/components/sections/Contact";
import { Credits } from "@/components/shared/Credits";
import { seasons, seasonsIntro, collabs, collabsIntro } from "@/data/campaigns";

// Campaigns & Collabs — merged tab (2026-11-01 restructure). Used to be two
// separate tabs (/preview/campaigns, /preview/collabs); Ellie asked for one
// page, Seasonal Collections first and then the partnerships, in the order
// her deck already has them (DCC, PAX West, My Straight Friends — see
// `collabs` in src/data/campaigns.ts). The old routes now redirect here
// (firebase.json).
//
// Local-only, same as the rest of /preview: noindex, and do NOT deploy to the
// main hosting channel while the live site is still the coming-soon page.
export const metadata: Metadata = {
  title: "Campaigns & Collabs",
  robots: { index: false, follow: false },
};

export default function CampaignsAndCollabsPage() {
  return (
    <>
      <Header />
      {/* Preview-only palette picker; delete to remove. */}
      <ThemeSwitcher theme="pistachio" />
      {/* The page's band, pinned under the header the way the home page's
          first marquee is (Bart, 2026-09-13). */}
      <Marquee
        items={["Campaigns & Collabs"]}
        className="sticky top-[var(--ejt-band-top,var(--ejt-header))] z-30"
      />
      <Collections
        id="seasonal"
        title="Seasonal Collections"
        intro={seasonsIntro}
        items={seasons}
        tone={LIGHT_TONE}
      />
      <Collections
        id="collaborations"
        title="Collaborations"
        intro={collabsIntro}
        items={collabs}
        tone={LIGHT_TONE}
      />
      <Contact />
      <Credits />
    </>
  );
}
