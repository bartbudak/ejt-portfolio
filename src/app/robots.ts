import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /preview is the unfinished site behind the password gate. The gate runs
    // in the browser and cannot stop a crawler on its own, so the disallow is
    // the part that actually keeps this work out of search results.
    rules: [{ userAgent: "*", allow: "/", disallow: "/preview/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
