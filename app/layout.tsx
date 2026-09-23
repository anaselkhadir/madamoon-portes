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

export const metadata: Metadata = {
  title: { default: "MADAMOON", template: "%s — MADAMOON" },
  description: "Boutique de robes de mariée à Paris 10e, sur rendez-vous.",
};

export default function Gabarit({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href={SITE} />
        <link rel="dns-prefetch" href={SITE} />
      </head>
      <body>{children}</body>
    </html>
  );
}
