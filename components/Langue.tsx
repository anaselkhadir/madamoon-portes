"use client";

import { useEffect, useRef, useState } from "react";
import { vers } from "@/lib/site";

/*
 * Le choix de la langue.
 *
 * Deux lignes, chacune écrite dans sa langue : une mariée anglophone
 * reconnaît le mot qu'elle cherche sans comprendre celui d'à côté. Pas
 * de drapeau — un drapeau désigne un pays, pas une langue.
 *
 * Ces pages n'existent qu'en français : « English » mène au site
 * officiel, dans sa version anglaise.
 */

export default function Langue() {
  const [ouvert, setOuvert] = useState(false);
  const boite = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    const surClic = (e: MouseEvent) => {
      if (!boite.current?.contains(e.target as Node)) setOuvert(false);
    };
    window.addEventListener("keydown", surTouche);
    window.addEventListener("pointerdown", surClic);
    return () => {
      window.removeEventListener("keydown", surTouche);
      window.removeEventListener("pointerdown", surClic);
    };
  }, [ouvert]);

  return (
    <div ref={boite} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
        aria-label="Choisir la langue"
        className="lien-nav flex items-center gap-1 py-3"
      >
        FR
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-500 ${ouvert ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {ouvert && (
        <div className="absolute right-0 top-full z-50 min-w-[9rem] border border-fil bg-blanc py-2">
          <span className="lien-nav block px-4 py-2 text-encre" aria-current="true">
            Français
          </span>
          <a href={vers("/en/")} className="lien-nav block px-4 py-2 text-plomb hover:text-encre">
            English
          </a>
        </div>
      )}
    </div>
  );
}
