"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Theme from "@/components/Theme";
import { MAISON, NAVIGATION, vers } from "@/lib/site";

/*
 * Le menu, comme sur le site.
 *
 * Il s'ouvre en pleine page et montre le catalogue : les maisons, les
 * coupes, puis les rubriques. Toutes les entrées mènent au site
 * officiel, dans le même onglet.
 *
 * Il se ferme à Échap, et le défilement de la page est retenu tant
 * qu'il est ouvert — sans quoi on défile derrière lui.
 */

const RUBRIQUES = [
  ["/robes/", "Toutes les robes"],
  ["/coupes/", "Les coupes"],
  ["/morphologies/", "Les morphologies"],
  ["/showroom/", "Le showroom"],
  ["/a-propos/", "La maison"],
  ["/rendez-vous/", "Prendre rendez-vous"],
] as const;

export default function Menu() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", touche);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.documentElement.style.overflow = "";
    };
  }, [ouvert]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-expanded={ouvert}
        className="lien-nav flex shrink-0 items-center gap-2.5 py-3"
      >
        <span aria-hidden="true" className="flex w-[1.1rem] flex-col gap-[0.3rem]">
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
        </span>
        Menu
      </button>

      {ouvert && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-blanc text-encre">
          <div className="gouttiere flex h-[var(--entete)] shrink-0 items-center justify-between">
            <span className="legende text-plomb">Menu</span>
            <div className="flex items-center gap-3">
              <Theme />
              <button
                type="button"
                onClick={() => setOuvert(false)}
                aria-label="Fermer le menu"
                className="flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-encre text-blanc transition-colors duration-500 hover:bg-action hover:text-sur-image"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-[0.8rem] w-[0.8rem]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>
          </div>

          <div className="gouttiere flex-1 pb-12 pt-4">
            <div className="grid gap-10 md:grid-cols-3">
              <nav aria-label="Les rubriques">
                <p className="legende text-plomb">Le site</p>
                <ul className="mt-5">
                  {RUBRIQUES.map(([href, nom]) => (
                    <li key={href}>
                      <a
                        href={vers(href)}
                        className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                      >
                        {nom}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Les maisons">
                <p className="legende text-plomb">Les maisons</p>
                <ul className="mt-5">
                  {NAVIGATION.createurs.map(([href, nom]) => (
                    <li key={href}>
                      <a
                        href={vers(href)}
                        className="block py-[0.3rem] font-serif text-[1.0625rem] leading-tight text-plume transition-colors duration-500 hover:text-action"
                      >
                        {nom}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Les coupes">
                <p className="legende text-plomb">Les coupes</p>
                <ul className="mt-5">
                  {NAVIGATION.coupes.map(([href, nom]) => (
                    <li key={href}>
                      <a
                        href={vers(href)}
                        className="block py-[0.3rem] font-serif text-[1.0625rem] leading-tight text-plume transition-colors duration-500 hover:text-action"
                      >
                        {nom}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-12 border-t border-fil pt-6">
              <a href={vers("/")} className="inline-block">
                <Logo className="h-[1.05rem] w-auto" />
              </a>
              <address className="texte mt-4 not-italic">
                {MAISON.adresse}, {MAISON.codePostal} {MAISON.ville} —{" "}
                <a href={MAISON.telephoneHref} className="souligne">
                  {MAISON.telephone}
                </a>
              </address>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
