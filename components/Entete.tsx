import Logo from "@/components/Logo";
import { MAISON, NAVIGATION, vers } from "@/lib/site";

/*
 * La barre du site, reprise au pixel.
 *
 * Deux étages : le bandeau des maisons et des coordonnées, puis la
 * barre principale. La différence tient en une chose — aucune entrée ne
 * mène ici : toutes renvoient au site officiel, par un lien ordinaire,
 * donc dans le même onglet. Le navigateur ne rouvre rien, il suit.
 *
 * Ces pages n'ont pas de menu dépliant : elles sont courtes, et tout ce
 * qu'elles proposent est déjà dans la barre.
 */

export default function Entete({ surImage = false }: { surImage?: boolean }) {
  const barre = surImage
    ? "absolute inset-x-0 top-0 z-50 text-sur-image"
    : "sticky top-0 z-50 border-b border-fil bg-blanc text-encre";

  return (
    <header className={barre}>
      {/* ————— le bandeau : les maisons, l'adresse, le téléphone ————— */}
      <div className="hidden h-[var(--barre)] items-center justify-between gap-6 border-b border-fil bg-blanc text-encre min-[901px]:flex gouttiere">
        <ul className="flex min-w-0 items-center gap-5 lg:gap-7">
          {NAVIGATION.createurs.map(([href, nom]) => (
            <li key={href}>
              <a
                href={vers(href)}
                className="mention souligne whitespace-nowrap text-plomb hover:text-encre"
              >
                {nom}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-5 lg:gap-7">
          <span className="mention hidden whitespace-nowrap text-plomb lg:inline">
            {MAISON.adresse}, {MAISON.ville} {MAISON.codePostal.slice(-2)}
            <sup>e</sup>
          </span>
          <a
            href={MAISON.telephoneHref}
            className="mention souligne whitespace-nowrap text-encre"
          >
            {MAISON.telephone}
          </a>
        </div>
      </div>

      {/* ————— la barre principale ————— */}
      <div className={surImage ? "" : ""}>
        <nav
          aria-label="Navigation"
          className="gouttiere relative flex h-[var(--entete)] items-center justify-between gap-6"
        >
          <ul className="hidden items-center gap-8 lg:flex">
            {NAVIGATION.gauche.map(([href, nom]) => (
              <li key={href}>
                <a href={vers(href)} className="lien-nav souligne">
                  {nom}
                </a>
              </li>
            ))}
          </ul>

          {/* Sous mille vingt-quatre pixels, la barre se réduit au
            * strict : les robes, le sigle et le rendez-vous.
            *
            * C'est l'enveloppe que l'on masque, pas le lien : « .lien-nav »
            * pose son « display » hors calque et l'emporterait sur
            * l'utilitaire. */}
          <span className="lg:hidden">
            <a href={vers("/robes/")} className="lien-nav souligne">
              Les robes
            </a>
          </span>

          <a
            href={vers("/")}
            aria-label="MADAMOON, accueil"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Logo surImage={surImage} className="h-[0.75rem] w-auto sm:h-[0.9rem] md:h-[1.05rem]" />
          </a>

          <div className="flex min-w-0 items-center justify-end gap-6">
            <ul className="hidden items-center gap-8 lg:flex">
              {NAVIGATION.droite.map(([href, nom]) => (
                <li key={href}>
                  <a href={vers(href)} className="lien-nav souligne">
                    {nom}
                  </a>
                </li>
              ))}
            </ul>
            <a href={vers("/rendez-vous/")} className="bouton bouton-barre shrink-0">
              Rendez-vous
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
