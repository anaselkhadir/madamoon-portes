# MADAMOON — les portes

Les pages posées sur les autres domaines de la maison —
`boutiquederobesdemarieeaparis.fr`, `robemarieeparis.fr` — au design du
site, avec sa barre de navigation et son pied de page.

**Toute la navigation renvoie à madamoon.fr**, par des liens ordinaires :
la visiteuse reste dans le même onglet, et la connexion au site officiel
est ouverte dès le chargement, pour que le premier clic n'attende rien.

Ces pages sont **statiques** : des fichiers, sans serveur ni base. Elles
se déposent à la racine du domaine, comme le site.

## Faire tourner

```bash
npm install
npm run dev              # http://localhost:5800
npm run build:pages      # l'aperçu GitHub Pages, dans un sous-dossier
npm run build:domaine    # un vrai domaine, à la racine
```

L'adresse du site officiel se règle par `NEXT_PUBLIC_SITE` ; sans elle,
les liens pointent sur l'aperçu du site tant que madamoon.fr n'est pas
en ligne.

## Ce qui reste à faire

Le contenu des sections, domaine par domaine : chaque porte aura son
angle et ses mots, sans jamais reprendre les textes du site — Google
sanctionne le contenu en double.
