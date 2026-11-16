import type { Metadata } from "next";
import { Beth_Ellen, Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ServiceWorkerRegistration } from "@/components/shared/ServiceWorkerRegistration";
import { MarqueeSettingsProvider } from "@/components/shared/MarqueeSettings";

// Display: chunky, slightly psychedelic high-contrast serif (SOFT/WONK axes).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});


// Body / UI: clean humanist grotesque for design-system text.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

// Script accent — the face Ellie's deck actually uses for its handwritten
// asides ("Hello", "Before"/"After", "In a nutshell"). Decorative only: it is
// unreadable at body sizes, so it never carries information a reader needs.
const bethEllen = Beth_Ellen({
  variable: "--font-beth-ellen",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.metaRole}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} · ${site.metaRole}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.metaRole}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "design",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: [...site.roles],
  description: site.description,
  sameAs: Object.values(site.social).filter(
    (v) => typeof v === "string" && v.startsWith("http"),
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${bethEllen.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Forced light always, not just during the coming-soon hold: dark
            mode was never finished for the Maeve palette (several bands'
            STOPS and grounds are light-only), so letting the system theme
            through would ship a half-broken dark mode the day the site goes
            public (2026-11-15). Revisit if real dark-mode support is ever
            built. */}
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <TooltipProvider>
            <ServiceWorkerRegistration />
            {/* Each page renders its own Header; Footer (a leftover shadcn
                component in the old placeholder's design language, never
                updated to the Maeve palette) was dropped on launch — Contact
                and Credits already close out every page with the same
                information in the site's real voice. */}
            <MarqueeSettingsProvider>
              <main className="flex-1">{children}</main>
            </MarqueeSettingsProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
