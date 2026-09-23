"use client";

import { useEffect, useState } from "react";

/*
 * Le clair et le sombre, comme sur le site.
 *
 * Le choix tient dans le navigateur, sous la même clé que le site :
 * une visiteuse qui a choisi le sombre là-bas le retrouve ici. Le
 * système n'est pas consulté — une boutique de robes de mariée se donne
 * d'abord en clair.
 *
 * Un script du gabarit repose le choix avant la première peinture, sans
 * quoi la page clignoterait en blanc.
 */

const CLE = "madamoon.theme";

export default function Theme({ classe = "" }: { classe?: string }) {
  const [sombre, setSombre] = useState<boolean | null>(null);

  useEffect(() => {
    setSombre(document.documentElement.getAttribute("data-theme") === "sombre");
  }, []);

  const basculer = () => {
    const neuf = !sombre;
    setSombre(neuf);
    const r = document.documentElement;
    if (neuf) r.setAttribute("data-theme", "sombre");
    else r.removeAttribute("data-theme");
    try {
      window.localStorage.setItem(CLE, neuf ? "sombre" : "clair");
    } catch {
      /* Stockage refusé : le choix vaut pour la visite en cours. */
    }
  };

  const vaVersSombre = sombre === false || sombre === null;
  const intitule = vaVersSombre ? "Passer en mode sombre" : "Revenir au mode clair";

  return (
    <button
      type="button"
      onClick={basculer}
      aria-pressed={sombre ?? false}
      aria-label={intitule}
      title={intitule}
      className={`lien-nav flex shrink-0 items-center py-3 transition-colors duration-500 hover:text-action ${classe}`}
    >
      {vaVersSombre ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[0.95rem] w-[0.95rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[0.95rem] w-[0.95rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
      )}
    </button>
  );
}
