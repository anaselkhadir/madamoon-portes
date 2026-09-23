import { media } from "@/lib/chemin";

/*
 * Le sigle de la maison, repris du site.
 *
 * Deux fichiers — l'encre et le blanc —, l'un masqué par la feuille de
 * style selon le thème : c'est ce qui évite le clignotement au
 * chargement. Sur une photographie, le blanc s'impose quel que soit le
 * thème.
 */

export default function Logo({
  className = "",
  surImage = false,
}: {
  className?: string;
  surImage?: boolean;
}) {
  if (surImage) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return (
      <img
        src={media("/marque/logo-blanc.png")}
        alt="MADAMOON"
        width={513}
        height={56}
        className={className}
      />
    );
  }
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media("/marque/logo-encre.png")}
        alt="MADAMOON"
        width={513}
        height={56}
        className={`logo-clair ${className}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media("/marque/logo-blanc.png")}
        alt=""
        aria-hidden="true"
        width={513}
        height={56}
        className={`logo-sombre ${className}`}
      />
    </>
  );
}
