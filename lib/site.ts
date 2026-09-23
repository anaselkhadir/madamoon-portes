/*
 * Le site officiel.
 *
 * Ces pages vivent sur d'autres domaines, mais elles appartiennent à la
 * maison : toute la navigation y renvoie. L'adresse se règle ici — elle
 * pointera sur madamoon.fr le jour de la mise en ligne, et sur l'aperçu
 * tant qu'il fait office de site.
 */

export const SITE = process.env.NEXT_PUBLIC_SITE ?? "https://anaselkhadir.github.io/madamoon-v7";

/*
 * Une adresse du site officiel, à partir d'un chemin.
 *
 * Les chemins s'écrivent comme là-bas — « /robes/uma » — et la barre
 * oblique finale est reposée ici : le site est un export statique servi
 * en « trailingSlash », et sans elle chaque clic paierait une
 * redirection avant d'arriver.
 */
export const vers = (chemin = "/") => {
  const propre = chemin.endsWith("/") || /\.[a-z0-9]+$/i.test(chemin) ? chemin : `${chemin}/`;
  return `${SITE}${propre}`;
};

const MAISON_ADRESSE = "234, rue du Faubourg Saint-Martin 75010 Paris";

export const MAISON = {
  nom: "MADAMOON",
  adresse: "234, rue du Faubourg Saint-Martin",
  codePostal: "75010",
  ville: "Paris",
  telephone: "+33 6 41 24 38 47",
  telephoneHref: "tel:+33641243847",
  email: "contact@madamoon.fr",
  reseaux: [
    { label: "Instagram", href: "https://www.instagram.com/madamoon.paris/" },
    { label: "TikTok", href: "https://www.tiktok.com/@madamoon.paris" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100094615813297" },
  ],
} as const;

/* Le plan : l'adresse de la boutique, ouverte dans l'application de
 * cartes du téléphone ou dans Google Maps sur ordinateur. */
export const PLAN = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `MADAMOON ${MAISON_ADRESSE}`,
)}`;

/* La barre du site, à l'identique. Chaque entrée mène au site officiel,
 * dans le même onglet. */
export const NAVIGATION = {
  gauche: [
    ["/robes/", "Robes de mariée"],
    ["/coupes/", "Coupes"],
    ["/morphologies/", "Morphologies"],
  ],
  droite: [
    ["/showroom/", "Showroom"],
    ["/a-propos/", "La maison"],
  ],
  createurs: [
    ["/createurs/watters-designs/", "Watters Designs"],
    ["/createurs/casablanca-bridal/", "Casablanca Bridal"],
    ["/createurs/olya-mak/", "Olya Mak"],
    ["/createurs/monica-loretti/", "Monica Loretti"],
  ],
  coupes: [
    ["/coupes/sirene/", "Robe de mariée sirène"],
    ["/coupes/princesse/", "Robe de mariée princesse"],
    ["/coupes/fluide/", "Robe de mariée fluide"],
    ["/coupes/trapeze/", "Robe de mariée trapèze"],
    ["/coupes/deux-en-un/", "Robe de mariée deux en un"],
  ],
} as const;
