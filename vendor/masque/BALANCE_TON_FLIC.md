# Intégration dans Balance ton flic

Cette copie provient de `onestlatech/masque`, révision
`c698434cbd5db677a80b4e2c96e691d3fcd8c576`, sous licence
AGPL-3.0-or-later. Le code source original et sa licence sont conservés dans ce
dossier.

Modifications réalisées le 28 octobre 2026 :

- déploiement sous `/BalanceTonFlic/masque/` ;
- sortie de compilation vers `public/masque` ;
- lien de retour vers la page de transmission de Balance ton flic ;
- lien vers le code source de cette version intégrée ;
- repli WASM mono-thread lorsque GitHub Pages ne fournit pas les en-têtes
  d’isolation COOP/COEP.

Pour reconstruire l’application :

```sh
npm ci --prefix vendor/masque
npm run build:masque
```

Les fichiers statiques sont générés dans `public/masque` puis copiés avec le
reste du site par la compilation Angular.
