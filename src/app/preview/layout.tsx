import type { Metadata } from "next";
import { PreviewGate } from "@/components/shared/PreviewGate";
import { MarqueeSettingsProvider } from "@/components/shared/MarqueeSettings";

// Everything under /preview is the unfinished site, so the whole subtree sits
// behind the password rather than each page remembering to ask. See the header
// comment in PreviewGate for what that check is and is not worth.
//
// noindex here as well as on each page: this is the layout every preview route
// passes through, so it is the one place that cannot be forgotten.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <PreviewGate>
      <MarqueeSettingsProvider>{children}</MarqueeSettingsProvider>
    </PreviewGate>
  );
}
