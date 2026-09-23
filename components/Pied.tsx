import Logo from "@/components/Logo";
import { MAISON, NAVIGATION, vers } from "@/lib/site";

/*
 * Le pied du site, repris lui aussi.
 *
 * Mêmes colonnes, mêmes mots : coupes, créateurs, showroom. Tout mène
 * au site officiel — ces pages ne sont qu'une porte.
 */

export default function Pied() {
  return (
    <footer className="gouttiere border-t border-fil bg-blanc pb-10 pt-[clamp(3rem,6vw,5rem)] text-encre">
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-4">
        <div>
          <a href={vers("/")}>
            <Logo className="h-[1.05rem] w-auto" />
          </a>
          <p className="texte mt-5">Boutique de robes de mariée à Paris.</p>
        </div>

        <nav aria-label="Coupes">
          <h2 className="legende">Coupes</h2>
          <ul className="mt-5 space-y-3">
            {NAVIGATION.coupes.map(([href, nom]) => (
              <li key={href}>
                <a href={vers(href)} className="texte souligne">
                  {nom}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Créateurs">
          <h2 className="legende">Créateurs</h2>
          <ul className="mt-5 space-y-3">
            {NAVIGATION.createurs.map(([href, nom]) => (
              <li key={href}>
                <a href={vers(href)} className="texte souligne">
                  {nom}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="legende">Le showroom</h2>
          <address className="texte mt-5 not-italic">
            {MAISON.adresse}
            <br />
            {MAISON.codePostal} {MAISON.ville}
            <br />
            <a href={MAISON.telephoneHref} className="souligne">
              {MAISON.telephone}
            </a>
            <br />
            <a href={`mailto:${MAISON.email}`} className="souligne">
              {MAISON.email}
            </a>
          </address>
          <a href={vers("/rendez-vous/")} className="bouton mt-6 inline-flex">
            Prendre rendez-vous
          </a>
        </div>
      </div>

      <div className="filet mt-12" />
      <p className="mention mt-6 text-plomb">
        © {new Date().getFullYear()} {MAISON.nom} — Boutique de robes de mariée à Paris
      </p>
    </footer>
  );
}
