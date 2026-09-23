import type { NextConfig } from "next";

/*
 * Des pages statiques, comme le site.
 *
 * Chaque domaine recevra le contenu de « out » à sa racine. L'aperçu
 * GitHub Pages, lui, sert depuis un sous-dossier : d'où le chemin de
 * base, transmis à la compilation.
 *
 *     npm run build:pages        aperçu GitHub Pages
 *     npm run build:domaine      un vrai domaine, à la racine
 */

const base = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: base || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE: base },
};

export default nextConfig;
