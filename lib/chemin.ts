/*
 * Le chemin des fichiers.
 *
 * Sur l'aperçu GitHub Pages, le site est servi depuis un sous-dossier :
 * les images écrites à la main doivent en tenir compte. Sur un vrai
 * domaine, la fonction ne fait rien.
 */

export const BASE = process.env.NEXT_PUBLIC_BASE ?? "";

export const media = (chemin: string) => `${BASE}${chemin}`;
