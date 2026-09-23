/*
 * Les mots de la barre, repris du site.
 *
 * Ces pages n'existent qu'en français : la table est donc plate, sans
 * choix de langue. Les mots sont ceux du site, à la lettre — c'est le
 * même menu.
 */

export const T = {
  barre: {
    menu: "Menu",
    fermer: "Fermer",
    principale: "Principale",
    accueil: "MADAMOON, accueil",
    rendezvous: "Rendez-vous",
    robes: "Robes de mariée",
    coupes: "Coupes",
    morphologies: "Morphologies",
    showroom: "Showroom",
    maison: "La maison",
    catalogue: "Le catalogue",
    classer: "Classer les robes",
    parCreateur: "Par créateur",
    parCoupe: "Par coupe",
    parMaison: "Par maison",
    toutesRobes: "Toutes les robes",
    catalogueEntier: "Le catalogue entier",
    sixCoupes: "Les coupes",
    sixMorphologies: "Les morphologies",
    filtrerParCreateur: "Filtrer par créateur",
    voirLaMaison: (nom: string) => `Voir la page ${nom}`,
  },
  raccourcis: {
    toutesRobes: "Toutes les robes",
    lesCoupes: "Les coupes",
    lesMorphologies: "Les morphologies",
    trouverMaRobe: "Trouver ma robe",
    leShowroom: "Le showroom",
    laMaison: "La maison",
    prendreRendezvous: "Prendre rendez-vous",
  },
  elise: {
    appeler: "Appeler la boutique",
    appelerCourt: "Appeler",
  },
  panier: {
    vide: "Vos coups de cœur",
  },
} as const;
