import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Launched 2026-11-15: the three other real pages, previously unlisted
  // behind /preview, join the home page here.
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/campaigns-and-collabs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
