import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./porte.css";
import { PORTE, SITE } from "@/lib/site";
import { BASE } from "@/lib/chemin";

/*
 * Les portes de la maison.
 *
 * Des pages posées sur d'autres domaines que madamoon.fr, au design du
 * site, dont toute la navigation renvoie au site officiel. Elles sont
 * statiques : des fichiers, rien d'autre, donc instantanées.
 *
 * La connexion au site officiel est ouverte dès le chargement — le
 * premier clic n'attend alors ni le DNS ni la poignée de main.
 */

/*
 * Les polices du site, servies avec la page.
 *
 * Les mêmes fichiers que madamoon.fr, recopiés dans « app/polices » : le
 * site a quitté Google Fonts, dont la récupération faisait échouer des
 * compilations, et la porte le suit. Inter a remplacé le Quattrocento
 * Sans là-bas ; il le remplace ici. Les deux écritures manuscrites du
 * site n'ont pas d'usage sur une porte et ne sont pas chargées.
 */
const serif = localFont({
  src: [
    { path: "./polices/instrument-serif-400.woff2", weight: "400", style: "normal" },
    { path: "./polices/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--police-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const sans = localFont({
  src: [
    { path: "./polices/inter-variable.woff2", weight: "100 900", style: "normal" },
    { path: "./polices/inter-variable-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--police-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/*
 * Le nom de la maison, sur toutes les pages.
 *
 * Un seul intitulé — « Madamoon | Robes de mariée à Paris » — pour le
 * site entier : pas de gabarit qui le décline page par page, c'est le
 * nom demandé, et il se lit tel quel dans l'onglet comme dans les
 * résultats de recherche.
 *
 * L'icône est celle du site officiel : « app/icon.png » et
 * « app/apple-icon.png » y sont recopiés à l'identique — une porte
 * porte la même marque.
 */
export const metadata: Metadata = {
  metadataBase: new URL(PORTE),
  title: "Madamoon | Robes de mariée à Paris",
  description:
    "Robes de mariée à Paris : sirène, princesse, fluides ou trapèze, de Casablanca Bridal, Watters, Monica Loretti et Olya Mak. Essayage privé dans le 10e.",
  alternates: { canonical: "/" },
  /* L'aperçu GitHub Pages ne s'indexe pas : il dirait la même chose que
   * le domaine, à une autre adresse. Seul le domaine se compile sans
   * chemin de base. */
  robots: BASE ? { index: false, follow: false } : undefined,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Madamoon | Robes de mariée à Paris",
    url: "/",
    images: [
      {
        url: "/partage/madamoon-showroom-paris-10e.jpg",
        width: 1200,
        height: 630,
        alt: "Le showroom MADAMOON à Paris 10e, ses fauteuils de velours et ses robes de mariée",
      },
    ],
  },
};

export default function Gabarit({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href={SITE} />
        <link rel="dns-prefetch" href={SITE} />
        {/* Le thème, reposé avant la première peinture — et sous la même
          * clé que le site : une visiteuse qui a choisi le sombre
          * là-bas le retrouve ici, sans éclair blanc au chargement. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `try{if(localStorage.getItem("madamoon.theme")==="sombre")` +
              `document.documentElement.setAttribute("data-theme","sombre")}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
