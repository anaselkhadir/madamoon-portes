import Lien from "@/components/Lien";
import { T } from "@/lib/textes";

/*
 * Les coups de cœur, en haut à droite.
 *
 * Un cœur plutôt qu'un cabas : la maison ne vend rien en ligne. Ici il
 * ne compte rien — la liste vit sur le site officiel, c'est là qu'il
 * mène.
 */

export default function Panier() {
  return (
    <Lien
      href="/coups-de-coeur/"
      aria-label={T.panier.vide}
      className="lien-nav flex shrink-0 items-center gap-1.5 py-3 pl-3 transition-opacity duration-500 hover:opacity-70"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[1.05rem] w-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="M12 20.7 4.6 13.3a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l.9.9.9-.9a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z" />
      </svg>
    </Lien>
  );
}
