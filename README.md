# Portfolio — Estelle Coulon

Portfolio de recherche d’alternance : https://portfolio.estelle-coulon.fr/
Dépôt : https://github.com/coulon-estelle/mon-portfolio

Trois études de cas principales (OLYVIA, NŨNC, LUMIMIX), quatre projets complémentaires, un atelier personnel, une page À propos, le CV et les coordonnées.

## Installation et vérification

Node.js 22.23.4 minimum (ou Node 24), puis :

```sh
npm ci
npm run check
npm run build
npm run audit:site
npm run test:e2e
```

Les tests nécessitent Chromium : `npx playwright install chromium`. Ils servent les fichiers de `dist/` sur le port 4322 et n’envoient aucun message.

Développement : `npm run astro -- dev --background`.
Gestion : `npm run astro -- dev status`, `dev logs` et `dev stop`.

## Technologies et justification

| Outil                    | Utilisation dans ce portfolio                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Astro                    | Génération des pages HTML et des images optimisées au build. Aucun rendu serveur requis.                         |
| TypeScript et JavaScript | Données des projets et œuvres, filtres, menu, carrousel, préférences et agrandissement des dessins.              |
| CSS personnalisé         | Identité graphique, palettes des projets et adaptation mobile. Aucun thème acheté ni bibliothèque de composants. |
| Fontsource               | Polices DM Sans, Space Grotesk et Just Me Again Down Here servies localement.                                    |
| Sharp / Astro Image      | Images WebP adaptées aux tailles d’affichage.                                                                    |
| Playwright et axe-core   | Vérification des parcours, du clavier, des débordements et de critères d’accessibilité automatisables.           |

Les technologies citées dans les études de cas décrivent les projets correspondants, pas nécessairement le portfolio.

## Contenu

- `src/data/site.ts` : domaine, coordonnées, CV, réseaux et hébergeur.
- `src/data/projets.ts` et `src/pages/projets/` : sélection et présentations.
- `src/data/oeuvres.ts` : onze œuvres personnelles, descriptions et matériel.
- `src/components/` : navigation, liens sociaux, CV, illustrations et composants partagés.
- `src/styles/` : styles communs et palettes ; les styles locaux restent dans les pages.
- `public/` : images sources et PDF. Les fichiers générés sont dans `dist/`.

## Hébergement et contact

Hébergeur confirmé : Infomaniak. Site statique : publier le contenu de `dist/`.
Le workflow `.github/workflows/deploy.yml` utilise les secrets `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` et `VPS_KNOWN_HOSTS`, le port SSH 23029 et la destination `/var/www/portfolio/`. Aucun déploiement n’est déclenché par les vérifications locales.

Le domaine est défini par défaut dans la configuration ; `PUBLIC_SITE_URL` peut le remplacer. Les URL canoniques, le sitemap et robots.txt sont générés au build.

Le formulaire transmet les messages à FormSubmit, qui les achemine vers `estellecoulon6@gmail.com`. L’envoi se fait depuis la page, sans ouvrir la messagerie du visiteur. Sans JavaScript, le formulaire utilise la page de traitement de FormSubmit. L’adresse e-mail et le téléphone restent accessibles directement.

**Activation nécessaire une seule fois** : envoyer un premier message depuis le formulaire, ouvrir l’e-mail de confirmation reçu dans Gmail et activer le formulaire. Vérifier les indésirables si nécessaire, puis effectuer un nouvel essai pour confirmer la réception. Les tests locaux interceptent toutes les requêtes vers FormSubmit : ils ne déclenchent pas cette activation et n’envoient aucun message réel. Documentation : https://formsubmit.co/.

## Livrables

- [POSITIONNEMENT.md](POSITIONNEMENT.md) : cible, message, sélection et parcours.
- [JOURNAL.md](JOURNAL.md) : traces disponibles, décisions et choix des réseaux.
- [IA.md](IA.md) : assistance utilisée et corrections apportées.
- [QUALITE.md](QUALITE.md) : contrôles du site, crédits et limites.

Les supports de soutenance et le lien de rendu sont remis séparément par Estelle.

## PDF consultables sur le site

- NŨNC : dossier du projet.
- TiK•TaK : dossier de rendu.
- Solaire : journée type de Bernard.
- Feelm : dossier complet déjà associé à la page.

Les PDF ajoutés sont dans `public/documents/projets/` ; celui de Feelm reste dans `public/images/projets/feelm/`. Les boutons ouvrent les documents dans un nouvel onglet et indiquent leur taille. La journée type n’est pas présentée comme un dossier complet. Aucun PDF n’a été associé arbitrairement à OLYVIA ou Bordeaux Surchauffe.
