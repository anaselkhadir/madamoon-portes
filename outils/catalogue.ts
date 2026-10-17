/*
 * Le catalogue des portes, regénéré depuis le site.
 *
 * Les portes ne gardent pas leurs propres données : elles recopient
 * celles de madamoon-v7, qui font foi. Ce script relit le site et écrit
 * deux fichiers :
 *
 *   lib/catalogue.json   le menu — maisons, coupes, morphologies et le
 *                        nom de chaque robe, comme avant ;
 *   lib/vitrine.json     les robes de la vitrine, dans leur ordre, avec
 *                        leurs photographies, et la vignette de chaque maison.
 *
 * Il copie aussi les photographies de couverture dans public/robes —
 * une par robe, et pas les autres vues : la porte ne montre que des
 * tuiles.
 *
 * Il se lance depuis le dossier du site, pour que ses alias « @/ »
 * se résolvent :
 *
 *     cd ../madamoon-v7 && npx tsx ../madamoon-portes/outils/catalogue.ts
 */

import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { CATEGORIES, CREATEURS, MORPHOLOGIES, ROBES } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { ROBE_MEDIAS, VIGNETTES_CREATEURS, type Media } from "@/lib/medias";

const SITE = process.cwd();
const PORTES = resolve(__dirname, "..");

/*
 * L'ordre de la vitrine.
 *
 * La porte montre toutes les robes du site : la maison l'a demandé après
 * avoir vu une première version réduite à vingt-quatre. Ces vingt-quatre
 * gardent pourtant la tête de la trame. Elles avaient été choisies sur
 * leur photographie — une robe vue en pied, dans un décor qui la sert, et
 * un fichier assez grand pour un écran Retina — : ce sont elles qu'on
 * voit au premier écran, et sous chaque filtre. Les autres suivent, dans
 * l'ordre du catalogue du site.
 *
 * L'ordre de tête alterne les coupes et les maisons, pour que la première
 * rangée montre déjà l'étendue du choix.
 */
const EN_TETE = [
  "santana",
  "sheridan",
  "solana",
  "mira",
  "tessa",
  "dove",
  "guinevere",
  "aleida",
  "charlotte",
  "marie",
  "uma",
  "addison",
  "monica",
  "oksana",
  "clover",
  "mathilda",
  "seraphina",
  "enid",
  "alicia",
  "ryle",
  "trinity",
  "meredith",
  "murielle",
  "clover-perles",
];

/* La vue qui représente une robe : sa couverture, la première sinon. */
const couverture = (slug: string): Media => {
  const r = ROBES.find((x) => x.slug === slug);
  const vues = ROBE_MEDIAS[slug];
  if (!r || !vues?.length) throw new Error(`Robe inconnue ou sans photographie : ${slug}`);
  return vues[(r.couverture ?? 1) - 1] ?? vues[0];
};

/* La vignette d'une maison, selon la règle du site : la vue choisie par
 * la maison, sinon la vignette dédiée, sinon la photo d'ouverture. */
const vignette = (slug: string): Media => {
  const c = CREATEURS.find((x) => x.slug === slug)!;
  if (c.vignette?.vue) return ROBE_MEDIAS[c.vignette.robe][c.vignette.vue - 1];
  if (VIGNETTES_CREATEURS[slug]) return VIGNETTES_CREATEURS[slug];
  return ROBE_MEDIAS[c.ouverture.robe][c.ouverture.vue - 1];
};

/*
 * Les largeurs utiles à une porte.
 *
 * Ses photographies ne dépassent jamais le quart d'un écran — une tuile
 * de trame, une vignette de maison. Douze cents pixels couvrent ce quart
 * sur un écran Retina de 2 400 ; la largeur de 1 700 que garde le site
 * pour ses fiches ne servirait jamais, et pèserait à elle seule plus que
 * toutes les autres réunies.
 */
const UTILE = 1200;

const reduire = (m: Media): Media => ({
  ...m,
  widths: m.widths.filter((w) => w <= UTILE),
  jpgw: m.jpgw.filter((w) => w <= UTILE),
});

/* Les fichiers d'une photographie, à ses largeurs retenues, dans les
 * trois formats. Un fichier manquant arrête tout : une tuile vide ne doit
 * pas partir en ligne. */
const copier = (m: Media) => {
  const source = join(SITE, "public/robes");
  const cible = join(PORTES, "public/robes");
  mkdirSync(cible, { recursive: true });
  const voulus = [
    ...m.widths.flatMap((w) => [`${m.name}-${w}.avif`, `${m.name}-${w}.webp`]),
    ...m.jpgw.map((w) => `${m.name}-${w}.jpg`),
  ];
  for (const f of voulus) {
    if (!existsSync(join(source, f))) throw new Error(`Fichier manquant : ${f}`);
    copyFileSync(join(source, f), join(cible, f));
  }
};

const catalogue = {
  createurs: CREATEURS.map(({ nom, slug, origine, note }) => ({ nom, slug, origine, note })),
  coupes: COUPES.map(({ nom, ancre, note, famille }) => ({ nom, ancre, note, famille })),
  robes: ROBES.map((r) => ({
    slug: r.slug,
    nom: r.nom,
    coupe: r.categorie,
    createur: r.createur ?? null,
  })),
  morphologies: MORPHOLOGIES.map(({ lettre, nom, objectif }) => ({ lettre, nom, objectif })),
  categories: CATEGORIES,
};

/* Le dossier repart de zéro : une robe retirée du catalogue ne doit
 * pas laisser ses photographies derrière elle. */
rmSync(join(PORTES, "public/robes"), { recursive: true, force: true });

const vitrine = {
  robes: [...EN_TETE, ...ROBES.map((r) => r.slug).filter((slug) => !EN_TETE.includes(slug))].map((slug) => {
    const r = ROBES.find((x) => x.slug === slug)!;
    const media = reduire(couverture(slug));
    copier(media);
    return { slug, nom: r.nom, coupe: r.categorie, createur: r.createur ?? null, media };
  }),
  vignettes: Object.fromEntries(
    CREATEURS.map((c) => {
      const m = reduire(vignette(c.slug));
      copier(m);
      return [c.slug, m];
    }),
  ),
};

if (!existsSync(join(PORTES, "lib"))) throw new Error("Dossier des portes introuvable");
writeFileSync(join(PORTES, "lib/catalogue.json"), JSON.stringify(catalogue, null, 1) + "\n");
writeFileSync(join(PORTES, "lib/vitrine.json"), JSON.stringify(vitrine, null, 1) + "\n");

console.log(
  `${catalogue.robes.length} robes au menu, ${vitrine.robes.length} en vitrine, ` +
    `${Object.keys(vitrine.vignettes).length} maisons.`,
);
