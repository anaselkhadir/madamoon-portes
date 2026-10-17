# MADAMOON — les portes

Les pages posées sur les autres domaines de la maison —
`robedemarieeparis.fr`, `boutiquederobesdemarieeaparis.fr` — au design du
site, avec sa barre de navigation et son pied de page.

**Toute la navigation renvoie à madamoon.fr**, par des liens ordinaires :
la visiteuse reste dans le même onglet, et la connexion au site officiel
est ouverte dès le chargement, pour que le premier clic n'attende rien.

Ces pages sont **statiques** : des fichiers, sans serveur ni base. Elles
se déposent à la racine du domaine, comme le site.

## Faire tourner

```bash
npm install
npm run dev              # http://localhost:5800 (5810 depuis l'aperçu de Claude)
npm run build:pages      # l'aperçu GitHub Pages, dans un sous-dossier
npm run build:domaine    # un vrai domaine, à la racine
```

L'adresse du site officiel se règle par `NEXT_PUBLIC_SITE` (madamoon.fr
par défaut), celle de la porte par `NEXT_PUBLIC_PORTE`
(robedemarieeparis.fr par défaut) : c'est l'adresse canonique de la page.

## robedemarieeparis.fr

Toutes les robes de la boutique, filtrables par coupe, puis les
créateurs et l'essayage. Les textes sont écrits pour ce domaine et ne reprennent pas
ceux du site : deux adresses qui disent la même chose se partagent un
classement.

## Les données viennent du site

Le menu, les robes et leurs photographies sont recopiés de madamoon-v7
par un script, jamais à la main :

```bash
cd ../madamoon-v7 && npx tsx ../madamoon-portes/outils/catalogue.ts
```

Les robes qui ouvrent la trame sont listées en tête de `outils/catalogue.ts`.

`app/globals.css` est une copie exacte de celui du site : il se recopie
tel quel. Ce qui n'appartient qu'aux portes est dans `app/porte.css`.

## Ce qui reste à faire

`boutiquederobesdemarieeaparis.fr` : son angle et ses mots, sans jamais
reprendre les textes du site ni ceux de l'autre porte.
