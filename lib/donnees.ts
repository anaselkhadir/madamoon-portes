import catalogue from "@/lib/catalogue.json";

/*
 * Le catalogue, recopié du site.
 *
 * Le menu de ces pages est celui du site, au mot près : il nomme les
 * maisons, les coupes, les morphologies et chaque robe. Il lui faut
 * donc les mêmes données. Elles sont prises au site — noms, adresses et
 * rattachements, rien de plus : ni photographies, ni textes de fiche.
 *
 * Elles se regénèrent depuis madamoon-v7 quand le catalogue change.
 */

export type Createur = { nom: string; slug: string; origine: string; note: string };
export type Coupe = { nom: string; ancre: string; note: string; famille: string };
export type Robe = { slug: string; nom: string; coupe: string; createur: string | null };
export type Morphologie = { lettre: string; nom: string; objectif: string };

export const CREATEURS = catalogue.createurs as Createur[];
export const COUPES = catalogue.coupes as Coupe[];
export const ROBES = catalogue.robes as Robe[];
export const MORPHOLOGIES = catalogue.morphologies as Morphologie[];

/* L'ordre des coupes au catalogue — celui du site, qui n'est pas celui
 * des pages de coupes. */
export const CATEGORIES = catalogue.categories as string[];

export const AUTRES_CREATEURS = "Autres créateurs";

/** Les robes d'une maison. Le collectif prend celles qui n'en ont pas. */
export const robesDe = (nom: string) =>
  nom === AUTRES_CREATEURS
    ? ROBES.filter((r) => !r.createur)
    : ROBES.filter((r) => r.createur === nom);

export const robesDeCoupe = (nom: string) => ROBES.filter((r) => r.coupe === nom);

export const coupeDe = (nom: string) => COUPES.find((c) => c.nom === nom);
