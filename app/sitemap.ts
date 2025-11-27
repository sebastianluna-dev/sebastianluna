import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// One page in two languages. The anchors are not separate URLs for a crawler.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: SITE_URL, en: `${SITE_URL}/en` };

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/en`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
  ];
}
