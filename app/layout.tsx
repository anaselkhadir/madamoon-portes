import type { Metadata } from "next";
import { Instrument_Serif, Quattrocento_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

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

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--police-serif",
  display: "swap",
});

const sans = Quattrocento_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--police-sans",
  display: "swap",
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
  title: "Madamoon | Robes de mariée à Paris",
  description: "Boutique de robes de mariée à Paris 10e, sur rendez-vous.",
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
