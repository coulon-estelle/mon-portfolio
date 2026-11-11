# Qualité web — relecture du 10 novembre 2026

Contrôles du build statique local. Les résultats ne constituent pas une certification d’accessibilité ni une preuve de publication.

## Contrôles propres au portfolio

| Domaine                   | Critère et méthode                                                                                          | Correction / état                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure                 | Audit HTML : langue française, un H1, titre, description, identifiants et liens locaux sur toutes les pages | Audit exécuté sur le build ; les erreurs d’accents dans les textes alternatifs OLYVIA et NŨNC sont corrigées.                                               |
| Sélection                 | Trois études de cas détaillées, autres travaux courts                                                       | OLYVIA, NŨNC et LUMIMIX sont sélectionnés à l’accueil et placés en premier dans la galerie.                                                                 |
| Responsive                | Playwright à 320, 390 et 1440 px ; contrôle du débordement horizontal et du bas du footer                   | Espacements mobiles de l’accueil et séparation des mots autour des retours à la ligne corrigés.                                                             |
| Clavier                   | Menu, liens, carrousel et fenêtre d’agrandissement                                                          | Échap, restitution du focus et navigation sans JavaScript vérifiés par les tests.                                                                           |
| Accessibilité automatisée | axe-core, règles WCAG 2 A/AA et 2.1 AA, thèmes clair et sombre                                              | La relecture initiale a révélé le contraste de la première étiquette de compétences en clair ; couleur foncée corrigée. Résultat final consigné ci-dessous. |
| Mouvements                | Préférence système et interrupteur du site                                                                  | Les fées sont désactivées si les animations sont réduites ; les étoiles cessent au changement de préférence.                                                |
| Images                    | Chargement des logos et mockups ; ouverture d’un dessin en grand                                            | WebP générés au build pour les composants Astro. Les JPEG de l’atelier restent servis tels quels.                                                           |
| Contact                   | Validation des champs et préparation du destinataire, du sujet et du corps de l’e-mail                      | Suppression de Netlify Forms ; aucun faux message de réception. Le visiteur doit envoyer depuis sa messagerie.                                              |
| CV et réseaux             | Liens explicites sur accueil, Contact et À propos                                                           | CV téléchargeable ; profils LinkedIn et Behance fournis par Estelle. Leur actualisation éditoriale n’est pas attestée par un simple lien.                   |
| Référencement             | Domaine, canonical, sitemap et robots.txt                                                                   | Domaine confirmé : https://portfolio.estelle-coulon.fr/. Les balises sont générées statiquement.                                                            |
| Sobriété                  | Site sans runtime serveur, polices locales, images optimisées, pas de mesure d’audience                     | Astro, CSS personnalisé et JavaScript limité aux interactions. Aucun framework client ajouté.                                                               |
| Juridique                 | Mentions, hébergeur réel, contact et attributions                                                           | Infomaniak renseigné ; anciennes références au traitement Netlify retirées. Voir crédits et limites ci-dessous.                                             |

## Résultats de la relecture

- `npm run check` : 0 erreur, 0 avertissement, 0 indication.
- `npm run build` : génération statique réussie, images WebP comprises.
- `npm run audit:site` : 14 pages et 347 destinations locales valides ; domaine des canonical, 13 URL du sitemap et autorisation d’indexation contrôlés.
- `npm run test:e2e` : 13 tests réussis. Les 13 pages de navigation sont contrôlées dans quatre configurations : 1440, 390 et 320 px en sombre, puis 390 px en clair. Aucune violation axe-core détectée sur les règles testées ; cela ne remplace pas un audit manuel.
- `npm run format:check` : réussi.
- Fond d’accueil : original de 1 140 920 octets, versions WebP de 49 026 à 111 910 octets. Portrait : original de 502 311 octets, versions WebP de 43 270 à 87 198 octets. Les originaux sont conservés.
- La tentative de lecture du domaine public depuis cet environnement n’a pas abouti. Ce résultat ne prouve pas une panne du site ; la validation de la version publiée reste à faire séparément.

## Crédits et ressources

- Code : Astro (MIT), TypeScript, JavaScript et CSS personnalisé ; assistance déclarée dans `IA.md`.
- Polices locales : DM Sans, Space Grotesk et Just Me Again Down Here, via Fontsource, sous SIL Open Font License 1.1. Les licences sont livrées avec les paquets.
- Fées, lunes, étoiles et œuvres personnelles : fichiers fournis par Estelle ; les originaux restent dans `public/images/`.
- Portrait : fourni par Estelle, utilisé dans À propos. Le crédit du photographe reste à préciser si applicable.
- Fond d’accueil `hero.png` : fourni par Estelle ; provenance exacte et droit de publication à documenter.
- Projets collectifs : les présentations distinguent le rôle personnel et le travail du groupe. Les droits sur les images contenues dans les moodboards restent à vérifier, même si les planches ont été composées par Estelle.
- Atelier : les références à Alice (Disney), Ophélie (John Everett Millais), Gorillaz et La Grande Vague (Hokusai) sont indiquées dans les descriptions. La source du loup et la pochette exacte de Gorillaz restent à préciser.
- Aucun visuel raster n’a été généré par IA dans cette conversation.

Sources :

- [Licence Astro](https://github.com/withastro/astro/blob/main/LICENSE)
- [Hokusai — British Museum](https://www.britishmuseum.org/collection/object/A_1937-0710-0-147)
- [Ophélie — collection Tate](https://artsandculture.google.com/asset/ophelia/-wGU6cT4JixtPA?hl=en-GB)
- [Coordonnées officielles Infomaniak](https://www.infomaniak.com/fr/cgv/impressum), consultées le 10 novembre 2026.

Les crédits auparavant séparés ont été regroupés ici pour conserver un dossier réduit aux livrables demandés et à la documentation technique.

## Vérifications humaines et externes restantes

- Essai avec un lecteur d’écran et contrôle manuel des contrastes sur les images et décors.
- Mesure Lighthouse/performance et vérification HTTPS, redirections, en-têtes de sécurité et indexation sur l’hébergement final.
- Essai réel de contact depuis la messagerie du visiteur ; aucun e-mail n’a été envoyé automatiquement par les tests.
- Application de la durée de conservation indiquée dans les mentions et confirmation des droits des ressources tierces.
- Mise à jour effective des profils LinkedIn et Behance, avec des preuves dans le journal.
- Présentation et explication du code par Estelle devant le jury.
- Les supports et le lien de soutenance sont gérés séparément par Estelle. Les PDF associés aux projets du site sont listés dans le README ; les documents partiels sont libellés comme tels.
