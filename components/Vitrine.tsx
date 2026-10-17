"use client";

import { useState } from "react";
import Photo from "@/components/Photo";
import { CATEGORIES } from "@/lib/donnees";
import { vers } from "@/lib/site";
import { VITRINE, altRobe } from "@/lib/vitrine";

/*
 * La vitrine : toutes les robes, et un filtre par coupe.
 *
 * Les tuiles sont celles du site — la photographie au rapport de la
 * référence, le nom en serif posé en bas, la maison en repère —, et
 * chacune ouvre la fiche de la robe sur madamoon.fr, dans le même
 * onglet.
 *
 * Le filtre est une rangée de boutons, pas une liste déroulante : cinq
 * coupes tiennent sur une ligne, et l'on voit d'emblée ce qu'on peut
 * choisir. Sur téléphone, la rangée défile au doigt plutôt que de passer
 * à la ligne : sur trois lignes, elle repoussait la première robe hors du
 * premier écran. Chaque bouton porte son compte, pour qu'aucun ne mène à une
 * trame presque vide sans prévenir.
 *
 * Seules les robes retenues sont rendues, et non toutes masquées sauf
 * quelques-unes : la trame centre son dernier rang en comptant ses
 * enfants, et une tuile cachée compterait encore. La page compilée part
 * sur « Toutes » : chaque robe a son lien dans le HTML, lisible sans
 * script, et par Google.
 */

const TOUTES = "Toutes";

/* Une ligne par coupe, écrite pour cette page — le site a les siennes,
 * et deux domaines qui disent la même chose se partagent un classement
 * au lieu d'en tenir deux. */
const LIGNES: Record<string, string> = {
  [TOUTES]: "Toutes les coupes, de la plus ajustée à la plus ample.",
  Sirène: "Près du corps jusqu'aux genoux, puis la jupe s'ouvre : la ligne la plus graphique.",
  Princesse: "Un buste structuré, une jupe ample : une entrée qui ne passe pas inaperçue.",
  Fluide: "Des matières souples qui bougent avec vous, de la cérémonie à la dernière danse.",
  Trapèze: "Une jupe qui s'évase doucement depuis la taille, et qui va à presque toutes les silhouettes.",
  "Deux en un": "Une surjupe ou une traîne qui s'enlève : une allure pour la mairie, une autre pour la fête.",
};

export default function Vitrine() {
  const [coupe, setCoupe] = useState(TOUTES);

  /* Les coupes présentes dans la vitrine, dans l'ordre du catalogue. */
  const coupes = CATEGORIES.filter((c) => VITRINE.some((r) => r.coupe === c));
  const compte = (c: string) =>
    c === TOUTES ? VITRINE.length : VITRINE.filter((r) => r.coupe === c).length;
  const robes = coupe === TOUTES ? VITRINE : VITRINE.filter((r) => r.coupe === coupe);

  return (
    <>
      <div className="gouttiere">
        <div
          role="group"
          aria-label="Filtrer les robes par coupe"
          className="rangee-filtres -mx-[var(--gouttiere)] flex gap-2 overflow-x-auto px-[var(--gouttiere)] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {[TOUTES, ...coupes].map((c) => {
            const actif = c === coupe;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={actif}
                aria-controls="vitrine"
                onClick={() => setCoupe(c)}
                className={`legende filtre-coupe inline-flex shrink-0 items-center gap-2 rounded-[4px] border px-[clamp(0.875rem,1.4vw,1.25rem)] py-[0.7rem] ${
                  actif ? "est-actif" : ""
                }`}
              >
                {c}
                <span className="tabular-nums opacity-60">{compte(c)}</span>
              </button>
            );
          })}
        </div>

        {/* Annoncé aux lecteurs d'écran : le nombre de robes change au
          * clic, et rien d'autre ne le dirait. */}
        <p className="texte mb-[clamp(1.25rem,3vw,2.5rem)] mt-4 sm:mt-5" aria-live="polite">
          {LIGNES[coupe]}{" "}
          <span className="text-plomb">
            {robes.length} robe{robes.length > 1 ? "s" : ""}.
          </span>
        </p>
      </div>

      <div className="gouttiere">
        <ul id="vitrine" className="trame-tuiles grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {robes.map((r, i) => (
            <li key={r.slug}>
              <a href={vers(`/robes/${r.slug}/`)} className="tuile group block">
                <Photo
                  media={r.media}
                  alt={altRobe(r)}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priorite={i < 4}
                />
                <span className="voile-lecture" aria-hidden="true" />
                <span className="mention absolute left-[clamp(1rem,1.7vw,1.5rem)] top-[clamp(1rem,1.7vw,1.5rem)] text-sur-image/80">
                  {r.createur ?? "Atelier indépendant"}
                </span>
                <span className="dans-image">
                  <span className="nom-image">{r.nom}</span>
                  <span className="note-image mt-2">{r.coupe}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
