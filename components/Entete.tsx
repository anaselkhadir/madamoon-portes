"use client";

import { useEffect, useMemo, useState } from "react";
import Lien from "@/components/Lien";
import Panier from "@/components/Panier";
import Langue from "@/components/Langue";
import Theme from "@/components/Theme";
import Reseaux from "@/components/Reseaux";
import Logo from "@/components/Logo";
import { MAISON, PLAN, vers } from "@/lib/site";
import {
  CATEGORIES,
  CREATEURS,
  COUPES,
  MORPHOLOGIES,
  ROBES,
  coupeDe,
  robesDe,
  type Robe,
} from "@/lib/donnees";
import { T } from "@/lib/textes";

/*
 * L'en-tête, celle du site — menu compris.
 *
 * Reprise de la phase 1 sans rien en retirer : le bandeau des maisons, la
 * barre principale, les trois panneaux qui se déplient au survol, et le
 * menu plein écran avec ses onglets de téléphone, son catalogue en six
 * colonnes, ses réseaux et son bouton d'appel.
 *
 * Une seule différence, invisible : aucun lien ne reste ici. Tous portent
 * l'adresse du site officiel, en lien ordinaire — donc le même onglet, et
 * la connexion au domaine est déjà ouverte par le gabarit.
 *
 * Il n'y a donc pas de page courante à marquer : « data-actif » disparaît,
 * et rien d'autre.
 */

type Groupes = Record<
  string,
  { intitule: string; colonnes: number; liens: { href: string; nom: string; note?: string }[] }
>;

/* Ce que chaque entrée déplie. Construit depuis le catalogue recopié du
 * site : une coupe ajoutée là-bas paraît ici à la regénération. */
const GRP: Groupes = {
  "/robes": {
    intitule: T.barre.parMaison,
    colonnes: 3,
    liens: [
      { href: "/robes", nom: T.barre.toutesRobes, note: T.barre.catalogueEntier },
      ...CREATEURS.map((c) => ({
        href: `/createurs/${c.slug}`,
        nom: c.nom,
        note: c.origine,
      })),
    ],
  },
  "/coupes": {
    intitule: T.barre.sixCoupes,
    colonnes: 3,
    liens: COUPES.map((c) => ({ href: `/coupes/${c.ancre}`, nom: c.nom, note: c.note })),
  },
  "/morphologies": {
    intitule: T.barre.sixMorphologies,
    colonnes: 3,
    liens: MORPHOLOGIES.map((m) => ({
      href: `/morphologies/${m.lettre.toLowerCase()}`,
      nom: m.nom,
      note: m.objectif,
    })),
  },
};

/*
 * Les entrées se répartissent de part et d'autre du logo. À gauche ce qui
 * sert à chercher une robe, à droite ce qui parle du lieu et de la
 * maison.
 */
const GCH = [
  { href: "/robes", label: T.barre.robes },
  { href: "/coupes", label: T.barre.coupes },
  { href: "/morphologies", label: T.barre.morphologies },
];

const DRT = [
  { href: "/showroom", label: T.barre.showroom },
  { href: "/a-propos", label: T.barre.maison },
];

/* Les rubriques en pied de menu. « Trouver ma robe » ouvre Élise sur le
 * site : ici c'est un lien vers sa page, ces pages n'embarquent pas le
 * questionnaire. */
const RCC = [
  { href: "/robes", label: T.raccourcis.toutesRobes },
  { href: "/coupes", label: T.raccourcis.lesCoupes },
  { href: "/morphologies", label: T.raccourcis.lesMorphologies },
  { href: "/trouver-ma-robe", label: T.raccourcis.trouverMaRobe },
  { href: "/showroom", label: T.raccourcis.leShowroom },
  { href: "/a-propos", label: T.raccourcis.laMaison },
  { href: "/rendez-vous", label: T.raccourcis.prendreRendezvous },
];

/* Les adresses que les onglets du téléphone portent déjà. */
const SECTIONS = new Set(["/robes", "/coupes", "/morphologies", "/showroom", "/a-propos"]);

/* Les trois onglets du téléphone : la robe, la coupe, la silhouette. */
const ONG = [
  {
    cle: "robes",
    label: T.barre.robes,
    liens: () => [
      { href: "/robes", label: T.barre.toutesRobes },
      ...CREATEURS.map((c) => ({ href: `/createurs/${c.slug}`, label: c.nom })),
    ],
  },
  {
    cle: "coupes",
    label: T.barre.coupes,
    liens: () => [
      { href: "/coupes", label: T.barre.sixCoupes },
      ...COUPES.map((c) => ({ href: `/coupes/${c.ancre}`, label: c.nom })),
    ],
  },
  {
    cle: "morphologies",
    label: T.barre.morphologies,
    liens: () => [
      { href: "/morphologies", label: T.barre.sixMorphologies },
      ...MORPHOLOGIES.map((m) => ({
        href: `/morphologies/${m.lettre.toLowerCase()}`,
        label: m.nom,
      })),
    ],
  },
] as const;

type Groupe = { titre: string; href: string; robes: Robe[] };

/* Par maison. « Autres créateurs » est une maison du catalogue comme les
 * autres : « robesDe » lui rend les modèles sans maison renseignée. */
function parCreateur(): Groupe[] {
  return CREATEURS.map((c) => ({
    titre: c.nom,
    href: `/createurs/${c.slug}`,
    robes: robesDe(c.nom),
  })).filter((g) => g.robes.length > 0);
}

function parCoupe(): Groupe[] {
  return CATEGORIES.map((c) => ({
    titre: c,
    href: `/coupes/${coupeDe(c)?.ancre ?? ""}`,
    robes: ROBES.filter((r) => r.coupe === c),
  })).filter((g) => g.robes.length > 0);
}

export default function Entete({ surImage: surPhoto = false }: { surImage?: boolean }) {
  const [onglet, setOnglet] = useState<"robes" | "coupes" | "morphologies">("robes");
  /* La maison dépliée dans l'onglet des robes. Une seule à la fois. */
  const [maisonOuverte, setMaisonOuverte] = useState<string | null>(null);
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  /* L'entrée dont le panneau est déplié. */
  const [mega, setMega] = useState<string | null>(null);
  /* Comment le menu range les robes. */
  const [classement, setClassement] = useState<"createur" | "coupe">("createur");
  const groupes = useMemo(
    () => (classement === "createur" ? parCreateur() : parCoupe()),
    [classement],
  );

  /* Sur une page qui s'ouvre en plein cadre, la barre se pose sur l'image
   * et reprend son fond au premier défilement — comme sur le site. */
  const surImage = surPhoto && !pose && !ouvert && !mega;

  useEffect(() => {
    const surScroll = () => setPose(window.scrollY > 24);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);

  /* Échap referme le panneau, comme il referme le menu. */
  useEffect(() => {
    if (!mega) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, [mega]);

  useEffect(() => {
    document.documentElement.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ouvert]);

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setMega(null)}>
        {/* Le bandeau. Toujours blanc, toujours discret. Rien n'y passe à
          * la ligne, et il n'apparaît qu'au-dessus de 900 px — le seuil où
          * « --barre » lui donne sa hauteur. */}
        <div className="hidden h-[var(--barre)] items-center justify-between gap-6 border-b border-fil bg-blanc text-encre min-[901px]:flex gouttiere">
          <ul className="flex min-w-0 items-center gap-5 lg:gap-7">
            {CREATEURS.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Lien
                  href={`/createurs/${c.slug}`}
                  className="mention souligne whitespace-nowrap text-plomb hover:text-encre"
                >
                  {c.nom}
                </Lien>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-5 lg:gap-7">
            <span className="mention hidden whitespace-nowrap text-plomb lg:inline">
              {MAISON.adresse}, {MAISON.ville} {MAISON.codePostal.slice(-2)}e
            </span>
            <a href={MAISON.telephoneHref} className="mention souligne whitespace-nowrap text-encre">
              {MAISON.telephone}
            </a>
          </div>
        </div>

        {/* La barre principale. */}
        <div
          className={`transition-[background-color,color,box-shadow] duration-700 [transition-timing-function:var(--ease-doux)] ${
            surImage
              ? "bg-transparent text-sur-image"
              : "bg-blanc text-encre shadow-[0_1px_0_var(--color-fil)]"
          }`}
        >
          {/* Le menu à gauche, le logo au centre de la page, le rendez-vous
            * à droite. */}
          <nav
            aria-label={T.barre.principale}
            className="gouttiere relative flex h-[var(--entete)] items-center justify-between gap-6"
          >
            {/* ————— à gauche : le menu, puis les entrées ————— */}
            <div className="flex min-w-0 items-center gap-6">
              <button
                type="button"
                onClick={() => setOuvert(true)}
                className="lien-nav flex items-center gap-2"
                aria-expanded={ouvert}
                aria-controls="menu-principal"
              >
                <span aria-hidden="true" className="flex flex-col gap-[3px]">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                </span>
                {T.barre.menu}
              </button>

              <ul className="ml-auto hidden items-center gap-8 lg:flex">
                {GCH.map((x) => (
                  <li key={x.label} onMouseEnter={() => setMega(GRP[x.href] ? x.href : null)}>
                    <Lien
                      href={x.href}
                      onFocus={() => setMega(GRP[x.href] ? x.href : null)}
                      aria-expanded={GRP[x.href] ? mega === x.href : undefined}
                      aria-controls={GRP[x.href] ? "mega-navigation" : undefined}
                      className="lien-nav souligne"
                    >
                      {x.label}
                    </Lien>
                  </li>
                ))}
              </ul>
            </div>

            {/* ————— au centre : la marque ————— */}
            <Lien
              href="/"
              aria-label={T.barre.accueil}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Logo surImage={surImage} className="h-[0.75rem] w-auto sm:h-[0.9rem] md:h-[1.05rem]" />
            </Lien>

            {/* ————— à droite : les entrées, puis le rendez-vous ————— */}
            <div className="flex min-w-0 items-center justify-end gap-6">
              <ul className="hidden items-center gap-8 lg:flex">
                {DRT.map((x) => (
                  <li key={x.label} onMouseEnter={() => setMega(GRP[x.href] ? x.href : null)}>
                    <Lien
                      href={x.href}
                      onFocus={() => setMega(GRP[x.href] ? x.href : null)}
                      className="lien-nav souligne"
                    >
                      {x.label}
                    </Lien>
                  </li>
                ))}
              </ul>

              {/* Les coups de cœur, à droite, sur tous les écrans. */}
              <Panier />

              {/* La langue, juste après le cœur. */}
              <Langue />

              {/* L'apparence, juste après la langue. Sur téléphone elle
                * rejoint le haut du menu — la barre n'a pas la place. */}
              <span className="hidden lg:block">
                <Theme classe="px-1" />
              </span>

              {/* C'est l'enveloppe que l'on masque, pas le bouton :
                * « .bouton » pose son « display » hors calque et
                * l'emporterait sur l'utilitaire. */}
              <span className="hidden shrink-0 md:block">
                <a href={vers("/rendez-vous")} className="bouton bouton-barre">
                  {T.barre.rendezvous}
                </a>
              </span>
            </div>
          </nav>
        </div>

        {/* ————————————————————————————— le panneau ————— */}
        {mega && GRP[mega] && (
          <div
            id="mega-navigation"
            className="hidden border-b border-fil bg-blanc text-encre lg:block"
          >
            <div className="gouttiere py-[clamp(1.75rem,3vw,2.75rem)]">
              <p className="legende">{GRP[mega].intitule}</p>
              <ul className="mt-6 grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-5 md:grid-cols-3">
                {GRP[mega].liens.map((x) => (
                  <li key={x.href}>
                    <Lien href={x.href} className="group block">
                      <span className="block font-serif text-[1.375rem] leading-tight text-encre transition-colors duration-500 group-hover:text-action">
                        {x.nom}
                      </span>
                      {x.note && <span className="texte mt-1 block text-plomb">{x.note}</span>}
                    </Lien>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* La barre est posée hors du flux : sans premier écran plein cadre,
        * le contenu commence dessous. */}
      {!surPhoto && <div aria-hidden="true" className="h-[calc(var(--barre)+var(--entete))]" />}

      {/*
        * Le menu : une page blanche, quelques lignes, rien d'autre.
        *
        * Une colonne : la ligne du sigle en haut, qui ne se comprime
        * jamais, puis le reste qui prend ce qui demeure et défile s'il ne
        * tient pas.
        */}
      <div
        id="menu-principal"
        hidden={!ouvert}
        className="fixed inset-0 z-[60] flex flex-col bg-blanc"
      >
        <div className="gouttiere flex h-[var(--entete)] shrink-0 items-center justify-between md:h-[calc(var(--barre)+var(--entete))]">
          <Lien href="/">
            <Logo className="h-[0.9rem] w-auto md:h-[1.05rem]" />
          </Lien>
          {/* L'apparence et la fermeture, côte à côte, sur deux disques
            * pleins — encre en clair, ivoire en sombre. */}
          <div className="flex items-center gap-2.5">
            <Theme cercle />
            <button
              type="button"
              onClick={() => setOuvert(false)}
              aria-label={T.barre.fermer}
              title={T.barre.fermer}
              className="flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full bg-encre text-blanc transition-colors duration-500 hover:bg-action hover:text-sur-image"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
        </div>
        {/* « min-h-full » sur le bloc intérieur : il se centre tant qu'il
          * tient, et pousse la barre de défilement dès qu'il déborde. */}
        <div data-lenis-prevent className="gouttiere flex-1 overflow-y-auto overscroll-contain">
          {/* Le bloc ne se centre pas : un catalogue se lit du haut. */}
          <div className="flex min-h-full flex-col py-[clamp(1.5rem,3vw,2.5rem)]">
            {/*
              * ————— sur téléphone : trois onglets —————
              *
              * Le catalogue entier est une réponse de grand écran. Sous le
              * pouce, trois onglets dont l'un est déplié : la forme tient
              * dans un écran sans jamais rien cacher.
              */}
            <div className="lg:hidden">
              <div
                role="tablist"
                aria-label={T.barre.catalogue}
                className="flex items-center justify-between gap-4 whitespace-nowrap border-b border-fil min-[400px]:justify-start min-[400px]:gap-7"
              >
                {ONG.map((o) => (
                  <button
                    key={o.cle}
                    type="button"
                    role="tab"
                    aria-selected={onglet === o.cle}
                    aria-controls={`onglet-${o.cle}`}
                    onClick={() => setOnglet(o.cle)}
                    /* Les trois onglets sont en gras : seuls la couleur et le
                      * trait distinguent l'onglet actif, sans saut de largeur. */
                    className={`-mb-px border-b py-3 text-[0.8125rem] font-bold uppercase leading-none tracking-[0.08em] transition-colors duration-500 ${
                      onglet === o.cle ? "border-encre text-encre" : "border-transparent text-brume"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {ONG.map((o) => (
                <ul
                  key={o.cle}
                  id={`onglet-${o.cle}`}
                  role="tabpanel"
                  hidden={onglet !== o.cle}
                  className="pt-5"
                >
                  {o.cle === "robes" ? (
                    <>
                      {/* « Toutes les robes » ouvre le catalogue entier : il
                        * se détache des maisons qu'il rassemble. */}
                      <li>
                        <Lien
                          href="/robes"
                          className="block py-[0.52em] text-[0.9375rem] font-bold uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                        >
                          {T.barre.toutesRobes}
                        </Lien>
                      </li>
                      <li className="legende mb-1 mt-4 text-plomb">{T.barre.filtrerParCreateur}</li>
                      {/* Chaque maison se déplie sur place : un toucher sur
                        * son nom ouvre la liste de ses robes juste dessous,
                        * un second la referme. */}
                      {CREATEURS.map((c) => {
                        const ouverte = maisonOuverte === c.slug;
                        const robes = robesDe(c.nom);
                        return (
                          <li key={c.slug}>
                            <button
                              type="button"
                              aria-expanded={ouverte}
                              aria-controls={`robes-${c.slug}`}
                              onClick={() => setMaisonOuverte(ouverte ? null : c.slug)}
                              className={`flex w-full items-center gap-2.5 py-[0.52em] text-left text-[0.9375rem] uppercase leading-none tracking-[0.06em] transition-colors duration-500 hover:text-action ${
                                ouverte ? "text-action" : "text-encre"
                              }`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`h-3 w-3 shrink-0 transition-transform duration-500 ${ouverte ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                              {c.nom}
                            </button>
                            {/* La hauteur se déplie en douceur : une grille
                              * qui passe d'un rang nul à un rang entier. */}
                            <div
                              id={`robes-${c.slug}`}
                              className={`grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-doux)] ${
                                ouverte ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                              }`}
                            >
                              <ul className="overflow-hidden pl-[1.375rem]" inert={!ouverte || undefined}>
                                <li>
                                  <Lien
                                    href={`/createurs/${c.slug}`}
                                    className="legende souligne mb-1 mt-1.5 inline-block"
                                    /* « .legende » porte sa couleur et n'est pas
                                      * calquée : le rouge du lien doit être redit ici. */
                                    style={{ color: "var(--color-action)" }}
                                  >
                                    {T.barre.voirLaMaison(c.nom)}
                                  </Lien>
                                </li>
                                {robes.map((r) => (
                                  <li key={r.slug}>
                                    <Lien
                                      href={`/robes/${r.slug}`}
                                      className="block py-[0.3em] font-serif text-[1.0625rem] leading-snug text-plume transition-colors duration-500 hover:text-action"
                                    >
                                      {r.nom}
                                    </Lien>
                                  </li>
                                ))}
                                <li aria-hidden="true" className="h-2" />
                              </ul>
                            </div>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    o.liens().map((lien) => (
                      <li key={lien.href}>
                        <Lien
                          href={lien.href}
                          className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                        >
                          {lien.label}
                        </Lien>
                      </li>
                    ))
                  )}
                </ul>
              ))}

              {/* Le showroom et la maison : on les regarde quand on a fini
                * de chercher une robe. */}
              <ul className="mt-6 border-t border-fil pt-5">
                {DRT.map((x) => (
                  <li key={x.href}>
                    <Lien
                      href={x.href}
                      className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                    >
                      {x.label}
                    </Lien>
                  </li>
                ))}
              </ul>
            </div>

            {/* ————— le classement ————— */}
            <div className="hidden items-baseline gap-6 lg:flex" role="group" aria-label={T.barre.classer}>
              {/* « Toutes les robes » en tête, en gras, comme sur téléphone :
                * le catalogue entier, sans classement par coupe ni par
                * créateur. */}
              <Lien
                href="/robes"
                className="lien-nav souligne text-encre transition-colors duration-500 hover:text-action"
                style={{ fontWeight: 700 }}
              >
                {T.barre.toutesRobes}
              </Lien>
              <span aria-hidden="true" className="h-3 w-px self-center bg-fil" />
              {(["createur", "coupe"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassement(c)}
                  aria-pressed={classement === c}
                  className={`lien-nav souligne transition-colors duration-500 ${
                    classement === c ? "text-encre" : "text-brume hover:text-plomb"
                  }`}
                  data-actif={classement === c}
                >
                  {c === "createur" ? T.barre.parCreateur : T.barre.parCoupe}
                </button>
              ))}
            </div>

            {/* ————— le catalogue ————— */}
            <nav aria-label="Le catalogue" className="mt-[clamp(1.5rem,3vw,2.5rem)] max-lg:hidden">
              <div /* Six colonnes au plus large : les deux classements comptent
                  * cinq groupes chacun — quatre maisons et les autres
                  * créateurs, et les cinq coupes. */
                className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {groupes.map((g) => (
                  <div key={g.titre}>
                    <Lien
                      href={g.href}
                      className="legende souligne block text-encre transition-colors duration-500 hover:text-action"
                    >
                      {g.titre}
                    </Lien>
                    <ul className="mt-4 flex flex-col">
                      {g.robes.map((r) => (
                        <li key={r.slug}>
                          <Lien
                            href={`/robes/${r.slug}`}
                            className="block py-[0.3rem] font-serif text-[1.0625rem] leading-tight text-plume transition-colors duration-500 hover:text-action"
                          >
                            {r.nom}
                          </Lien>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>

            {/* ————— les rubriques, en pied ————— */}
            <div className="mt-auto border-t border-fil pt-6">
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {RCC.map((x) => (
                  <li
                    key={x.label}
                    /* Sur téléphone, la liste du haut porte déjà ces
                      * cinq-là : ne restent ici que « Trouver ma robe » et
                      * le rendez-vous. */
                    className={SECTIONS.has(x.href) ? "hidden lg:block" : undefined}
                  >
                    <Lien
                      href={x.href}
                      className="lien-nav souligne text-plomb transition-colors duration-500 hover:text-encre"
                    >
                      {x.label}
                    </Lien>
                  </li>
                ))}
              </ul>
              {/* Le bas du menu : les réseaux par leur logo, puis l'appel et
                * l'adresse en deux gestes — un bouton qui compose le numéro,
                * une épingle qui ouvre le plan. */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <Reseaux classe="-ml-2.5" />
                <div className="flex items-center gap-3">
                  <a
                    href={MAISON.telephoneHref}
                    aria-label={`${T.elise.appeler} — ${MAISON.telephone}`}
                    className="bouton bouton-compact gap-1.5"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z" />
                    </svg>
                    {T.elise.appelerCourt}
                  </a>
                  <a
                    href={PLAN}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${MAISON.adresse} — ${MAISON.codePostal} ${MAISON.ville}`}
                    title={`${MAISON.adresse} — ${MAISON.codePostal} ${MAISON.ville}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-action text-action transition-colors duration-500 hover:bg-action hover:text-sur-image"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
                      <circle cx="12" cy="10" r="2.3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
