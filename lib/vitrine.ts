import vitrine from "@/lib/vitrine.json";

/*
 * La vitrine de la porte.
 *
 * Les robes choisies pour leur photographie, et la vignette de chaque
 * maison. Le fichier est écrit par « outils/catalogue.ts » depuis le
 * site : on ne le corrige pas à la main, on corrige la sélection dans le
 * script et on le relance.
 */

export type Media = {
  name: string;
  w: number;
  h: number;
  widths: number[];
  blur: string;
  jpgw: number[];
};

export type RobeVitrine = {
  slug: string;
  nom: string;
  coupe: string;
  createur: string | null;
  media: Media;
};

export const VITRINE = vitrine.robes as RobeVitrine[];
export const VIGNETTES = vitrine.vignettes as Record<string, Media>;

/* Ce que l'on lit sous l'image : la coupe, la robe, sa maison. Écrit
 * pour un lecteur d'écran autant que pour Google Images. */
export const altRobe = (r: RobeVitrine) =>
  `Robe de mariée ${r.coupe.toLowerCase()} ${r.nom}${r.createur ? `, ${r.createur}` : ""}`;
