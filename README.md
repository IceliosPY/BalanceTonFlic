# Balance ton flic

Observatoire international des violences policières, sous-projet du mouvement **Transfem Era**. L’interface est développée avec **Angular** et **TypeScript**, puis compilée en site statique.

## Développement local

Installez les dépendances puis démarrez le serveur Angular :

```bash
npm ci
npm start
```

Puis ouvrez `http://localhost:4200`.

## Ajouter une publication

Les fiches sont stockées dans [`public/data/incidents.json`](public/data/incidents.json). Les trois entrées livrées sont des modèles fictifs clairement signalés dans l’interface : elles doivent être remplacées par des cas sourcés avant publication éditoriale.

Chaque fiche accepte notamment :

- `title`, `description`, `date`, `city`, `country` ;
- `category` et `status` ;
- `videoUrl` pour un fichier vidéo direct (`.mp4` ou `.webm`) ;
- `sourceUrl` vers la publication ou la source d’origine ;
- `verified` et `demo` pour l’état éditorial.

## Vérification et GitHub Pages

```bash
npm test
npm run build:pages
```

Le build destiné à `https://iceliospy.github.io/BalanceTonFlic/` est généré dans `dist/balance-ton-flic/browser`. Ce dossier peut être publié par GitHub Actions ou sur une branche `gh-pages`.

## Principes éditoriaux

Avant toute publication : vérifier la date et le lieu, conserver la source originale, recueillir le consentement lorsque cela est possible, flouter les personnes exposées et retirer les métadonnées sensibles. Ne jamais présenter une entrée non vérifiée comme un fait établi.
