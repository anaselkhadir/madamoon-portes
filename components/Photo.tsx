import { media as chemin } from "@/lib/chemin";
import type { Media } from "@/lib/vitrine";

/*
 * Une photographie MADAMOON, comme sur le site.
 *
 * Les trois formats du site (AVIF, WebP, JPEG), à plusieurs largeurs :
 * le navigateur choisit. L'aperçu flouté de vingt pixels tient la place
 * pendant le chargement, et la mise en page ne bouge pas.
 *
 * Toutes les photographies d'une porte sont des robes : le dossier est
 * fixé, là où le site en a deux.
 */

type Props = {
  media: Media;
  alt: string;
  sizes: string;
  priorite?: boolean;
  className?: string;
  position?: string;
};

export default function Photo({ media, alt, sizes, priorite = false, className = "", position }: Props) {
  const jeu = (ext: string, largeurs: readonly number[]) =>
    largeurs.map((w) => `${chemin(`/robes/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");
  const replis = media.jpgw[media.jpgw.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={jeu("avif", media.widths)} sizes={sizes} />
      <source type="image/webp" srcSet={jeu("webp", media.widths)} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chemin(`/robes/${media.name}-${replis}.jpg`)}
        srcSet={jeu("jpg", media.jpgw)}
        sizes={sizes}
        width={media.w}
        height={media.h}
        alt={alt}
        loading={priorite ? "eager" : "lazy"}
        decoding={priorite ? "sync" : "async"}
        fetchPriority={priorite ? "high" : "auto"}
        className={className}
        style={{
          backgroundImage: `url(${media.blur})`,
          backgroundSize: "cover",
          backgroundPosition: position ?? "center",
          objectPosition: position,
        }}
      />
    </picture>
  );
}
