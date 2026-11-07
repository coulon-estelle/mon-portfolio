# Crédits et droits

## Code et typographies

Le portfolio utilise Astro (MIT) et du CSS personnalisé. Les dépendances exactes et outils de développement sont déclarés dans `package.json` et verrouillés dans `package-lock.json`. Tailwind CSS n’était pas utilisé pour les styles du portfolio ; sa dépendance a été retirée pour refléter le code réel. Tailwind demeure mentionné dans les études de cas où il a été utilisé.

Les polices sont servies localement à partir de :

- `@fontsource/dm-sans` — DM Sans — SIL Open Font License 1.1.
- `@fontsource/space-grotesk` — Space Grotesk — SIL Open Font License 1.1.
- `@fontsource/just-me-again-down-here` — Just Me Again Down Here — SIL Open Font License 1.1.

Les fichiers de licence accompagnent les paquets installés (`node_modules/@fontsource/.../LICENSE`). Les noms de typographies des études de cas décrivent les projets correspondants ; ils ne sont pas tous chargés par le portfolio.

## Visuels — prochaine étape

| Ressource                                 | Origine / auteur                                        | Droit de publication                             | État                                               |
| ----------------------------------------- | ------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| `public/images/commun/hero.png`           | Fichier fourni par Estelle ; source exacte à documenter | À confirmer                                      | Déjà utilisé, crédit à compléter avant publication |
| Logos et captures OLYVIA / NŨNC / LUMIMIX | Travaux collectifs du BUT MMI                           | Préciser auteurs/contributions et autorisations  | À intégrer                                         |
| Photos/interviews montrant des tiers      | À identifier                                            | Vérifier autorisation de diffusion               | À intégrer si retenues                             |
| Dessins et peintures de l’atelier         | Œuvres d’Estelle à fournir                              | Vérifier les références tierces éventuelles      | À intégrer                                         |
| Décors CSS d’attente                      | Produits avec l’aide de l’assistant ; voir `IA.md`      | Ne pas les présenter comme livrables des projets | Remplaçables                                       |

Ne pas confondre la création d’un moodboard avec l’obtention des droits sur toutes les images qu’il rassemble. L’ajout d’une image doit s’accompagner d’un texte alternatif pertinent, de ses dimensions et de la vérification des droits.

## Sources de configuration et de vérification

- Astro : https://docs.astro.build/en/basics/astro-components/ et https://docs.astro.build/en/guides/styling/
- Formulaire Netlify : https://docs.netlify.com/manage/forms/setup/
- Adresse officielle de Netlify : https://www.netlify.com/legal/terms-of-use/
- Confidentialité de Netlify : https://www.netlify.com/privacy/
- Information sur les traceurs : https://entreprendre.service-public.gouv.fr/vosdroits/F31228

Consultation le 28 octobre 2026. Les informations légales doivent être revalidées lors de la publication réelle.

## Portrait personnel

`public/images/commun/portrait.png` a été fourni par Estelle pour son portfolio. Il est actuellement utilisé sur la page À propos ; il a été retiré de l’accueil et du contact à sa demande. Préciser le crédit du photographe si nécessaire avant publication.

## Illustrations de fées

Les dessins du dossier `public/images/illustrations/fees/` ont été fournis et identifiés par Estelle comme ses dessins décoratifs. Ils remplacent plusieurs décors provisoires et le portrait de l’accueil. Le composant `FairyIllustration.astro` génère des versions WebP de tailles adaptées, sans modifier les fichiers originaux. Ces dessins ne sont pas générés par IA.

## Nouveaux motifs personnels

La quatrième fée, les deux lunes et les trois étoiles fournis par Estelle sont intégrés via `FairyIllustration.astro` et `Ornament.astro`. Les originaux restent intacts ; les versions WebP sont produites par Astro selon la taille d’affichage. Les motifs décoratifs sont exclus de l’arbre d’accessibilité, et les étoiles/lunes sont assombries en mode clair par CSS. Les quatre fées partagent l’interaction au clic et le réglage de réduction des animations.

## Références des dessins de l’atelier

Les techniques, le format A5 de Bathroom Nightmare et le caractère original du personnage Enzo sont renseignés d’après les indications d’Estelle. Les références artistiques sont distinguées de ses propres réalisations : Alice au pays des merveilles de Disney, Ophélie de John Everett Millais, une pochette de Gorillaz et La Grande Vague de Kanagawa de Katsushika Hokusai. Le dessin du loup est indiqué comme une reproduction d’après image.

Références consultées pour les attributions :

- Hokusai, La Grande Vague : https://www.britishmuseum.org/collection/object/A_1937-0710-0-147
- John Everett Millais, Ophélie, collection Tate : https://artsandculture.google.com/asset/ophelia/-wGU6cT4JixtPA?hl=en-GB

La pochette exacte de Gorillaz et la source de l’image du loup restent à préciser si disponibles.
