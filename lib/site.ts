/*
 * Le site officiel.
 *
 * Ces pages vivent sur d'autres domaines, mais elles appartiennent à la
 * maison : toute la navigation y renvoie. L'adresse se règle ici — elle
 * pointera sur madamoon.fr le jour de la mise en ligne, et sur l'aperçu
 * tant qu'il fait office de site.
 */

export const SITE = process.env.NEXT_PUBLIC_SITE ?? "https://anaselkhadir.github.io/madamoon-v7";

/** Une adresse du site officiel, à partir d'un chemin. */
export const vers = (chemin = "/") => `${SITE}${chemin}`;

export const MAISON = {
  nom: "MADAMOON",
  adresse: "234, rue du Faubourg Saint-Martin",
  codePostal: "75010",
  ville: "Paris",
  telephone: "+33 6 41 24 38 47",
  telephoneHref: "tel:+33641243847",
  email: "contact@madamoon.fr",
} as const;

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
