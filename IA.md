# Déclaration d’usage de l’intelligence artificielle

## Outil utilisé et périmètre

**Codex / assistant OpenAI dans l’IDE**, lors de la réalisation du portfolio et de sa relecture technique. La conversation visible constitue la base de cette déclaration. Aucun autre outil d’IA ne peut être attesté à partir du dépôt ; compléter ce document si d’autres outils ont été utilisés en amont (maquettes, rédaction, images, etc.).

| Étape                           | Usage                                                                                                                              | Reprises, corrections et décisions                                                                                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Intégration de la landing       | Proposition et écriture de composants Astro, styles CSS et textes d’interface à partir de la maquette fournie                      | Plusieurs dispositions de la bande des disciplines ont été rejetées. Les contours, les couleurs et les proportions des cartes ont été repris à la demande d’Estelle.                                   |
| Direction graphique             | Exploration de variantes rose/bleu/violet, boutons et typographies                                                                 | Les boutons à flèches ont été rejetés. Le rose a été réintroduit après une version trop bleue/violette. Le nom du hero a été passé en manuscrit.                                                       |
| Interactions                    | Curseur rose bordé de rouge, paillettes, thème clair, réduction des animations, menu mobile, carrousel et fenêtre d’agrandissement | La traînée initiale a été remplacée par des paillettes. Les boutons de préférences ont été remplacés par des interrupteurs. Le carrousel a été limité au mobile.                                       |
| Pages et contenus               | Pages galerie, contact, à propos et trois études de cas                                                                            | Les textes détaillés de LUMIMIX et OLYVIA ont été fournis par Estelle. Les contributions individuelles ont été précisées. Le nom NŨNC a été corrigé ; un problème d’encodage des accents a été réparé. |
| Relecture du cahier des charges | Contrôle des livrables, cohérence éditoriale, accessibilité, SEO, documentation et nettoyage                                       | Ajout des documents manquants, clarification du contact par messagerie, centralisation des paramètres et relevé explicite des points restant à vérifier.                                               |

## Visuels

Les images finales seront intégrées ultérieurement. Les décors actuellement produits en CSS (étoiles, planète, pivoine stylisée, maquettes d’attente) sont des propositions générées avec l’aide de l’assistant. Ils ne sont pas présentés comme des livrables des projets scolaires. Aucune génération d’image raster par IA n’a été réalisée dans cette conversation. L’origine du fichier `public/images/commun/hero.png` reste à documenter par Estelle.

## Responsabilité et maîtrise

Le code a été largement assisté : il ne doit pas être présenté comme intégralement écrit sans aide. Je dois pouvoir comprendre et modifier les composants Astro, les données TypeScript, les media queries, le stockage local des préférences, les événements JavaScript, le formulaire Netlify et la fenêtre `dialog`.

La relecture a également remplacé le formulaire mailto par un formulaire HTML prévu pour Netlify Forms, après confirmation de l’hébergeur. L’assistant a écrit les tests navigateur et le serveur de test local, corrigé les attributs ARIA des palettes et le déplacement programmatique du carrousel, puis mis en forme les fichiers. Ces tests ne sont pas des travaux réalisés sans assistance.

Les résultats de compilation ne prouvent pas à eux seuls l’accessibilité, la conformité juridique, les performances réelles ni ma maîtrise du code. Les contrôles effectués et leurs limites sont consignés dans `QUALITE.md`.
