# Aperçu Discord — fee-4

Diagnostic du 17 novembre 2026. **L’illustration choisie est bien `public/images/illustrations/fees/fee-4.png`.** Elle n’a pas été remplacée ni retouchée.

## Cause identifiée et preuve de fonctionnement

La dernière version publiée avant cette intervention annonce déjà correctement une fée PNG de 1 200 × 1 200, à l’URL `https://portfolio.estelle-coulon.fr/_astro/fee-4.CVbOlRPp_1VNgG0.png`.

Vérifications publiques effectuées avec le User-Agent documenté de Discordbot :

- Accueil : HTTP 200, `Content-Type: text/html`, métadonnées présentes dans le HTML initial.
- Image : HTTP 200, `Content-Type: image/png`, fichier décodable de 578 191 octets, dimensions réelles 1 200 × 1 200.
- `robots.txt` : HTTP 200 et `Allow: /`, sans blocage déclaré pour Discordbot.
- Les balises `og:image` et `twitter:image` désignent la même image HTTPS ; `summary_large_image` est présent.

Ces requêtes simulent le User-Agent, mais ne proviennent pas des IP de Discord et ne permettent pas de lire les règles privées du VPS. Aucun blocage n’a été rencontré dans ces essais.

**Estelle a ensuite testé une nouvelle URL dans Discord et confirmé que la fée apparaît :**

```text
https://portfolio.estelle-coulon.fr/?apercu=fee4-20261117
```

Ce test a été effectué sur la version déjà publiée, avant le nouveau fichier ci-dessous. Il confirme que le souci de la carte montrée sans image était l’ancien aperçu conservé en cache, et non l’absence actuelle de la balise ou du PNG. Discord recommande une nouvelle query string pour tester ses aperçus en cache : [documentation officielle](https://discord.com/developers/docs/link-previews/overview).

La comparaison avec le portfolio de référence a aussi montré qu’un PNG carré transparent est compatible avec son aperçu : le seul format carré ne permettait donc pas d’expliquer le problème.

## Nouveau visuel public préparé

- Fichier : `public/og-estelle-coulon-fee4-v3.png`.
- URL après publication : **https://portfolio.estelle-coulon.fr/og-estelle-coulon-fee4-v3.png**.
- Format : PNG opaque, **1 200 × 630**, **277 473 octets**, environ 271 Kio dans le build contrôlé.
- Contenu : fee-4 entière, centrée sur un fond bordeaux et violet. Aucune autre illustration ni texte ajouté.
- La suppression des marges transparentes et le redimensionnement ne coupent pas le dessin. Le fichier original reste inchangé.

Le nom versionné distingue ce visuel des précédents. Le titre et la description actuels sont conservés. Les métadonnées Open Graph et Twitter utilisent une seule configuration ; le rendu des pages du portfolio n’est pas modifié.

## Fichiers concernés

| Fichier                                | Fonction                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/data/social-preview.json`         | Source fee-4, nom versionné, dimensions, type et alt.                                         |
| `scripts/generate-discord-image.mjs`   | Prépare le PNG public à partir de fee-4 avec Sharp déjà installé.                             |
| `public/og-estelle-coulon-fee4-v3.png` | Image dédiée à partager.                                                                      |
| `src/layouts/Layout.astro`             | Annonce l’image publique, ses vraies dimensions et la grande carte Twitter.                   |
| `scripts/verify-social-preview.mjs`    | Vérifie le build ou la page publique et le fichier réellement servi.                          |
| `scripts/audit-seo.mjs`                | Refuse les métadonnées de partage en double, en plus du contrôle du format et des dimensions. |
| `package.json`                         | `prebuild`, `generate:og` et `verify:share`. Aucune dépendance ajoutée.                       |
| `.github/workflows/deploy.yml`         | Contrôle l’aperçu avant transfert et sur le site public après rsync.                          |
| `RAPPORT_SEO.md`                       | Mise à jour de la description du visuel de partage.                                           |

## Vérifications locales réalisées

```sh
npm run check
npm run build
npm run audit:site
npm run verify:share -- --local
```

Les quatre commandes réussissent. Le contrôle de partage examine le HTML brut de `dist/` : une seule balise de chaque type, URL HTTPS exacte, `website`, `summary_large_image`, titre et description cohérents. Il vérifie aussi que l’image présente dans le build répond 200 dans le serveur de test, possède le type PNG et les dimensions annoncées, reste sous 1 Mo et correspond octet pour octet au fichier préparé.

Le paramètre `prebuild` génère le PNG automatiquement avant Astro. Le workflow existant appelle `npm run build`, il bénéficie donc de cette étape sans installation supplémentaire.

## Déploiement et test final

Le [déploiement GitHub Actions nº 13](https://github.com/coulon-estelle/mon-portfolio/actions/runs/44101225063), sur le commit `7aa9bfc4e720c2b6b515f77cac779aa7ff3eccf3`, a été vérifié : statut **success**, correspondant à la précédente correction publiée. Le nouveau fichier versionné et les nouveaux contrôles de cette intervention ne font pas encore partie de ce déploiement.

Après publication des nouveaux fichiers, exécuter :

```sh
npm run verify:share
```

Le même contrôle est désormais ajouté après rsync dans GitHub Actions. Il demande le HTML avec une URL de vérification distincte et contrôle l’URL versionnée, la réponse HTTP, le MIME, les dimensions et les octets du PNG. Un succès atteste le fichier servi depuis l’environnement du test, pas la purge du cache Discord.

Pour voir la nouvelle version dans Discord, partager dans **un nouveau message**, sans entourer le lien de chevrons :

```text
https://portfolio.estelle-coulon.fr/?apercu=fee4-v3
```

La canonique reste `https://portfolio.estelle-coulon.fr/`. Il n’est pas nécessaire de changer les URL de navigation du site. L’assistant ne peut pas vider le cache Discord. Le test Discord déjà confirmé concernait la fée carrée précédente ; le nouveau cadrage paysage devra être testé après sa publication.

Le débogueur officiel a été consulté, mais son formulaire automatisé était recouvert par une fenêtre du portail et n’a pas fourni de résultat exploitable. Aucun diagnostic de cet outil n’est présenté comme réussi. La confirmation d’affichage retenue est le test effectué par Estelle dans Discord.
