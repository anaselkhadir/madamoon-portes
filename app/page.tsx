import Entete from "@/components/Entete";
import Pied from "@/components/Pied";
import Photo from "@/components/Photo";
import Vitrine from "@/components/Vitrine";
import { CREATEURS, ROBES } from "@/lib/donnees";
import { MAISON, PLAN, PORTE, vers } from "@/lib/site";
import { VIGNETTES, VITRINE } from "@/lib/vitrine";

/*
 * robedemarieeparis.fr — la sélection.
 *
 * Le domaine dit ce que l'on cherche : une robe de mariée, à Paris. La
 * page répond par des robes, tout de suite — un titre, deux lignes, puis
 * la vitrine. Pas toutes les robes de la boutique : celles qui se
 * montrent le mieux, choisies sur leur photographie. Le catalogue entier
 * reste sur madamoon.fr, et la page y renvoie.
 *
 * Viennent ensuite les maisons, en une rangée, puis l'essayage : ce que
 * la mariée vient finalement chercher, et la seule chose qu'un écran ne
 * donne pas.
 *
 * Les textes sont écrits pour ce domaine et ne reprennent pas ceux du
 * site : deux adresses qui disent la même chose se partagent un
 * classement au lieu d'en tenir deux.
 */

/* Ce que chaque maison a de particulier, dit pour cette page. Les robes
 * citées sont toutes dans la vitrine, plus haut. */
const MAISONS: Record<string, string> = {
  "casablanca-bridal":
    "Les robes les plus lumineuses de la sélection : des satins qui accrochent la lumière, des dentelles posées motif par motif, des traînes longues.",
  "watters-designs":
    "Des dentelles fines sur tulle, des dos travaillés, et des tombés qui restent légers jusque sous une traîne.",
  "monica-loretti":
    "La couture italienne dans ce qu'elle a de plus mesuré : peu d'effets, des proportions exactes, des matières qui tiennent toute la journée.",
  "olya-mak":
    "Des robes pensées pour le mouvement : drapés, transparences dosées, broderies sur tulle.",
  "autres-createurs":
    "Des ateliers indépendants que la boutique choisit elle-même, pour des modèles que l'on ne croise pas ailleurs à Paris.",
};

/* Le nombre de robes d'une maison dans la vitrine. */
const enVitrine = (nom: string) =>
  VITRINE.filter((r) => (nom === "Autres créateurs" ? !r.createur : r.createur === nom)).length;

/* La liste des robes, pour les moteurs : chacune pointe vers sa fiche
 * sur madamoon.fr, qui est la page de référence de la robe. */
const LISTE = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Robes de mariée à Paris — la sélection MADAMOON",
  url: `${PORTE}/`,
  numberOfItems: VITRINE.length,
  itemListElement: VITRINE.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `Robe de mariée ${r.coupe.toLowerCase()} ${r.nom}`,
    url: vers(`/robes/${r.slug}/`),
  })),
};

export default function Porte() {
  return (
    <>
      <Entete />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LISTE) }}
        />

        {/* ————— L'ouverture ————— */}
        <section className="gouttiere pb-[clamp(2rem,5vw,4rem)] pt-[clamp(1.75rem,6vw,5rem)]">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="legende">
                MADAMOON — Paris 10<sup>e</sup>
              </p>
              <h1 className="affiche mt-5 max-w-[14ch]" style={{ textWrap: "balance" }}>
                Robe de mariée à Paris
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="texte mesure-l">
                {VITRINE.length} robes choisies dans la collection de la boutique, pour leur ligne
                et leur lumière. Filtrez par coupe, ouvrez celle qui vous arrête, puis venez
                l&rsquo;essayer au showroom du faubourg Saint-Martin.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                {/* Sur téléphone, la sélection commence juste dessous : le
                  * bouton qui y mène ne ferait que repousser les robes. Le
                  * masque est sur une enveloppe : « .bouton » n'est pas dans
                  * une couche et l'emporterait sur « hidden ». */}
                <span className="hidden sm:inline-flex">
                  <a href="#selection" className="bouton">
                    Voir la sélection
                  </a>
                </span>
                <a href={vers("/rendez-vous/")} className="bouton-trait">
                  Prendre rendez-vous
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ————— La sélection ————— */}
        <section id="selection" aria-labelledby="titre-selection" className="scroll-mt-[var(--barre)]">
          <div className="gouttiere flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-fil pb-6 pt-[clamp(2rem,4vw,3rem)]">
            <h2 id="titre-selection" className="titre-section">
              La sélection
            </h2>
            <a href={vers("/robes/")} className="lien-nav souligne text-action">
              Les {ROBES.length} robes de la boutique
            </a>
          </div>
          <Vitrine />
        </section>

        {/* ————— Les maisons ————— */}
        <section aria-labelledby="titre-createurs" className="pt-[clamp(4rem,8vw,7rem)]">
          <div className="gouttiere grid gap-x-12 gap-y-4 pb-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-12 lg:items-end">
            <h2 id="titre-createurs" className="titre-section lg:col-span-5">
              Les créateurs
            </h2>
            <p className="texte mesure-l lg:col-span-7">
              Quatre maisons et quelques ateliers indépendants, choisis un à un. Chacune a sa
              main : on reconnaît une Casablanca à sa lumière, une Monica Loretti à sa retenue.
            </p>
          </div>

          <ul className="gouttiere grid grid-cols-1 gap-x-[1.5px] gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {CREATEURS.map((c) => {
              const vignette = VIGNETTES[c.slug];
              const n = enVitrine(c.nom);
              return (
                <li key={c.slug}>
                  <a href={vers(`/createurs/${c.slug}/`)} className="group block">
                    <div className="vignette-maison">
                      {vignette && (
                        <Photo
                          media={vignette}
                          alt={`Une robe de mariée ${c.nom}`}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                          position="50% 30%"
                        />
                      )}
                      {/* Le compte est posé dans l'image, en repère, comme la
                        * maison sur les tuiles de robes : sous le texte, il
                        * tombait à une hauteur différente pour chaque maison,
                        * selon la longueur de sa phrase. */}
                      {n > 0 && (
                        <>
                          {/* Le voile part du haut, là où se lit le repère : celui
                            * des tuiles monte du bas, vers le nom. */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 22%, rgba(0,0,0,0) 40%)",
                            }}
                          />
                          <span className="mention absolute left-[clamp(1rem,1.7vw,1.5rem)] top-[clamp(1rem,1.7vw,1.5rem)] text-sur-image/90">
                            {n} robe{n > 1 ? "s" : ""} dans la sélection
                          </span>
                        </>
                      )}
                    </div>
                    <div className="pr-4 pt-5">
                      <p className="legende">{c.origine}</p>
                      <h3 className="phrase mt-2 transition-colors duration-500 group-hover:text-action">
                        {c.nom}
                      </h3>
                      <p className="texte mt-3">{MAISONS[c.slug]}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ————— L'essayage ————— */}
        <section
          aria-labelledby="titre-essayage"
          className="gouttiere mt-[clamp(4rem,8vw,7rem)] border-t border-fil py-[clamp(3rem,7vw,6rem)]"
        >
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="legende">Essayage privé, sur rendez-vous</p>
              <h2 id="titre-essayage" className="phrase mt-4 max-w-[22ch]">
                Une robe se choisit portée. Le showroom vous reçoit une heure, rien que pour vous.
              </h2>
              <p className="texte mesure-l mt-6">
                L&rsquo;essayage est gratuit, pour vous et deux proches. Dites-nous les robes qui vous
                ont plu ici : elles seront prêtes à votre arrivée.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={vers("/rendez-vous/")} className="bouton">
                  Prendre rendez-vous
                </a>
                <a href={vers("/showroom/")} className="bouton-trait">
                  Découvrir le showroom
                </a>
              </div>
            </div>

            <dl className="grid content-start gap-6 lg:col-span-4 lg:col-start-9">
              <div>
                <dt className="legende">L&rsquo;adresse</dt>
                <dd className="texte mt-2">
                  <a href={PLAN} target="_blank" rel="noreferrer noopener" className="souligne">
                    {MAISON.adresse}
                    <br />
                    {MAISON.codePostal} {MAISON.ville}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="legende">Les horaires</dt>
                <dd className="texte mt-2">
                  Lundi, de 12 h à 21 h
                  <br />
                  Du mardi au samedi, de 10 h à 19 h
                </dd>
              </div>
              <div>
                <dt className="legende">Nous joindre</dt>
                <dd className="texte mt-2">
                  <a href={MAISON.telephoneHref} className="souligne">
                    {MAISON.telephone}
                  </a>
                  <br />
                  <a href={`mailto:${MAISON.email}`} className="souligne">
                    {MAISON.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Pied />
    </>
  );
}
