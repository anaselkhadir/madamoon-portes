import Entete from "@/components/Entete";
import Pied from "@/components/Pied";
import { vers } from "@/lib/site";

/*
 * La page d'une porte, en attendant son contenu.
 *
 * La structure est posée — la barre, un premier écran, trois sections,
 * le pied — et les mots viendront ensuite, domaine par domaine. Rien
 * ici n'invente de design : tout vient du site.
 */

export default function Porte() {
  return (
    <>
      <Entete />
      <main>
        <section className="gouttiere py-[clamp(3rem,8vw,6rem)]">
          <p className="legende text-plomb">Section 01 — le premier écran</p>
          <h1 className="affiche mesure-l mt-4 text-[clamp(2rem,6vw,4rem)] leading-none">
            Le titre de cette page
          </h1>
          <p className="texte mesure mt-6">
            Le texte d’accroche viendra ici. La barre du haut, le pied de page et les boutons sont
            ceux du site : chaque lien mène à madamoon.fr, dans le même onglet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={vers("/robes/")} className="bouton">
              Voir les robes
            </a>
            <a href={vers("/rendez-vous/")} className="bouton-trait">
              Prendre rendez-vous
            </a>
          </div>
        </section>

        {[2, 3, 4].map((n) => (
          <section key={n} className="gouttiere border-t border-fil py-[clamp(2.5rem,6vw,4.5rem)]">
            <p className="legende text-plomb">Section 0{n} — à définir</p>
            <p className="phrase mesure-l mt-4 text-[clamp(1.25rem,2.4vw,1.75rem)]">
              Une section de la page, dont le contenu reste à écrire.
            </p>
          </section>
        ))}
      </main>
      <Pied />
    </>
  );
}
