import type { MetadataRoute } from "next";
import { PORTE } from "@/lib/site";

/* Une porte, une page. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${PORTE}/`, changeFrequency: "monthly", priority: 1 }];
}
