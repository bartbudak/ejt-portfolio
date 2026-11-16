import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageTheme } from "@/components/shared/PageTheme";
import { Marquee } from "@/components/shared/Marquee";
import { Collections, LIGHT_TONE } from "@/components/sections/Collections";
import { Contact } from "@/components/sections/Contact";
import { Credits } from "@/components/shared/Credits";
import { seasons, seasonsIntro, collabs, collabsIntro } from "@/data/campaigns";

// Campaigns & Collabs — moved here from /preview on launch, 2026-11-15.
// Merged tab (2026-11-01 restructure) from two separate pages; Seasonal
// Collections first, then the partnerships, in her deck's own order (DCC,
// PAX West, My Straight Friends — see `collabs` in src/data/campaigns.ts;
// Talea was cut 2026-11-13, too sparse next to the others).
export const metadata: Metadata = {
  title: "Campaigns & Collabs",
};

export default function CampaignsAndCollabsPage() {
  return (
    <>
      <Header />
      {/* This page's one real design decision from the old picker (Bart,
          2026-09-13): it sits on the Pistachio ground, not the default. */}
      <PageTheme theme="pistachio" />
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
