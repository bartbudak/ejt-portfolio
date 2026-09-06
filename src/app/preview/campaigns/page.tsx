import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/shared/Marquee";
import { Seasons } from "@/components/sections/Seasons";
import { Contact } from "@/components/sections/Contact";

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
      <Seasons />
      <Marquee />
      <Contact />
    </>
  );
}
