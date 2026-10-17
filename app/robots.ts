import type { MetadataRoute } from "next";
import { BASE } from "@/lib/chemin";
import { PORTE } from "@/lib/site";

/* Le domaine s'ouvre aux moteurs ; l'aperçu, servi depuis un
 * sous-dossier, leur reste fermé. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (BASE) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${PORTE}/sitemap.xml` };
}
