import Logo from "@/components/Logo";
import { media } from "@/lib/chemin";
import { MAISON, NAVIGATION, vers } from "@/lib/site";

/*
 * Le pied du site, repris lui aussi.
 *
 * Mêmes colonnes, mêmes mots : coupes, créateurs, showroom, puis les
 * réseaux et la signature de l'atelier. Tout mène au site officiel —
 * ces pages ne sont qu'une porte.
 *
 * Une seule ligne du site manque : « Gérer les cookies ». Une porte ne
 * dépose aucun cookie et ne charge aucune mesure d'audience ; il n'y a
 * donc rien à gérer, et un bouton qui n'ouvre rien mentirait.
 */

/* L'atelier qui a fait le site, à la même adresse que là-bas. */
const ANVSLAB = "https://anaselkhadir.github.io/anvslab/";

export default function Pied() {
  return (
    <footer className="gouttiere border-t border-fil bg-blanc pb-10 pt-[clamp(3rem,5vw,4.5rem)] text-encre">
      {/* Deux colonnes avant mille vingt-quatre pixels, quatre au-delà,
        * comme sur le site : plus tôt, la colonne du rendez-vous devient
        * plus étroite que son bouton. */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href={vers("/")} aria-label="MADAMOON, accueil">
            <Logo className="h-[1.05rem] w-auto" />
          </a>
          <p className="texte mesure mt-5">Boutique de robes de mariée à Paris.</p>
          <ul className="mt-5 flex gap-5">
            {MAISON.reseaux.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mention souligne text-plomb hover:text-encre"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Coupes">
          <h2 className="legende">Coupes</h2>
          <ul className="mt-4 flex flex-col gap-2">
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
          <ul className="mt-4 flex flex-col gap-2">
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
          <address className="texte mt-4 not-italic">
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
      {/* Deux colonnes, puisque les cookies n'y sont pas : le copyright à
        * gauche, la signature à droite ; empilés sur téléphone. */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="mention text-plomb">
          © {new Date().getFullYear()} {MAISON.nom} — Boutique de robes de mariée à Paris
        </p>
        <a
          href={ANVSLAB}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-3 text-plomb transition-colors duration-500 hover:text-encre"
        >
          <span className="mention">Site créé et référencé par</span>
          {/* Deux fichiers, l'encre et le blanc, l'un masqué selon le
            * thème : le même mécanisme que le sigle de la maison. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media("/marque/anvslab-noir.png")}
            alt="ANVSLAB"
            width={360}
            height={111}
            className="logo-clair h-[1.6rem] w-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media("/marque/anvslab-blanc.png")}
            alt=""
            aria-hidden="true"
            width={360}
            height={111}
            className="logo-sombre h-[1.6rem] w-auto"
          />
        </a>
      </div>
    </footer>
  );
}
