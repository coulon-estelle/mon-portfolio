# Rapport SEO — Portfolio d’Estelle Coulon

Audit et modifications du **17 novembre 2026**. Domaine cible : **https://portfolio.estelle-coulon.fr/**.

Les modifications sont réalisées dans le dépôt local. Le site en ligne a été contrôlé en lecture seule, mais cette mission n’a ni déployé le code, ni validé de propriété Search Console, ni soumis de sitemap. L’indexation et la première place sur « Estelle Coulon » ne sont pas garanties.

## 1. État initial constaté

| Point contrôlé        | Constat réel avant correction                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site public           | Les 15 URL du sitemap répondent 200 après les redirections éventuelles. Chaque page contient un H1 et aucune de ces pages ne déclare noindex.                                                                                                        |
| Accueil               | Le titre « Estelle Coulon — Portfolio créatif » identifie bien la personne, mais ne précise pas les disciplines.                                                                                                                                     |
| Métadonnées           | Les pages ont déjà des titres et descriptions distincts, des canoniques et les métadonnées de partage préparées lors du travail précédent.                                                                                                           |
| URL                   | Le serveur redirige `/projets` en 301 vers `/projets/`, mais le sitemap, les canoniques et les liens internes utilisent majoritairement les versions sans barre finale.                                                                              |
| Données structurées   | Aucun JSON-LD sur les 15 pages publiques contrôlées.                                                                                                                                                                                                 |
| Images                | Les cartes de projets utilisent un alt générique de « planche de présentation », même lorsque le visuel est un portrait. Les 11 aperçus de l’atelier chargent les JPEG originaux. Les autres composants utilisent déjà WebP, srcset et lazy loading. |
| Tests                 | Avant changement : 13 tests navigateur réussis, 2 échecs dus à une attente ancienne de 7 projets alors que 9 sont présents. D&D et Mon univers illustré ne sont pas dans la boucle générale de contrôle des pages.                                   |
| Audit npm             | `npm run audit:site` échoue d’abord sur l’absence de `POSITIONNEMENT.md`, document qui n’est plus présent. Sa liste de routes omet aussi les deux nouveaux projets et son contrôle du sitemap est obsolète.                                          |
| Accessibilité étendue | L’ajout des deux nouvelles pages aux tests révèle deux contrastes insuffisants en mode clair sur Mon univers illustré : légende de profil et texte de fin de page, rapports 4,39 et 4,42 pour un minimum testé de 4,5.                               |

### Vérifications HTTP de la production

| Adresse ou variante                                              | Résultat observé                                                                                                                                     |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http://portfolio.estelle-coulon.fr/`                            | 301 vers HTTPS.                                                                                                                                      |
| `https://portfolio.estelle-coulon.fr/`                           | 200.                                                                                                                                                 |
| `/projets` → `/projets/`                                         | 301 puis 200. Même aboutissement avec barre finale pour les autres URL de dossiers du sitemap.                                                       |
| `/robots.txt`                                                    | 200, `Allow: /`, référence au sitemap.                                                                                                               |
| `/sitemap.xml`                                                   | 200, 15 URL, encore sans barre finale dans la version publiée contrôlée.                                                                             |
| `/index.html`                                                    | 200, copie de l’accueil. Une redirection vers `/` serait une consolidation supplémentaire côté serveur ; la canonique de l’accueil désigne déjà `/`. |
| `/introuvable-audit-seo`                                         | Vraie réponse 404 Apache, sans renvoi trompeur vers l’accueil.                                                                                       |
| `/404.html`                                                      | 200 en accès direct, avec noindex. Ne figure pas au sitemap.                                                                                         |
| `https://estelle-coulon.fr/` et `https://www.estelle-coulon.fr/` | Vérification TLS interrompue : `ERR_TLS_CERT_ALTNAME_INVALID`. Cela concerne ces variantes, pas le sous-domaine portfolio qui répond correctement.   |
| `https://www.portfolio.estelle-coulon.fr/`                       | Nom non résolu (`ENOTFOUND`) ; aucune copie accessible n’a été constatée à cette adresse.                                                            |

Ces contrôles ne constituent pas un inventaire exhaustif d’éventuels anciens hébergements. Aucun accès Search Console ne permet ici de connaître la canonique choisie par Google ou l’état réel de son index.

## 2. Identité et métadonnées

L’accueil utilise désormais :

**Titre** : Estelle Coulon | Portfolio — Design graphique & UX/UI

**Description** : Découvrez le portfolio d’Estelle Coulon, artiste et étudiante en BUT MMI à Montbéliard : illustrations, design graphique, UX/UI et création web.

Les métadonnées de Projets, À propos, Contact, OLYVIA, LUMIMIX et Mon univers illustré ont été précisées. Les autres projets possédaient déjà des titres et descriptions spécifiques et les conservent. Le rôle personnel et le contexte collectif restent fidèles aux textes existants.

Les H1 visibles sont conservés, dont le nom complet sur l’accueil. Les H1 constitués d’un logo gardent leur nom accessible par le texte alternatif. Le nouveau test contrôle un H1 par page et l’absence de saut de niveau entre H1, H2 et H3 dans le contenu principal. Les titres de la modale fermée ne sont pas interprétés comme une nouvelle section de la page affichée.

La seule précision éditoriale visible ajoutée est la zone de recherche d’alternance, dans le texte de Contact : **Montbéliard, Belfort et Besançon**, conformément à la mission. Aucun nom de ville n’est répété artificiellement dans les autres paragraphes ou les alt.

## 3. Canoniques, sitemap et liens

- `trailingSlash: 'always'` aligne Astro sur les URL déjà servies par Apache.
- Les canoniques et `og:url` utilisent la même version HTTPS avec barre finale, sans paramètres de suivi.
- Les liens internes de navigation et de retour pointent directement vers ces versions, sans modifier leur destination ni leur présentation.
- `src/data/seo.ts` centralise les 15 pages publiques : les projets proviennent du catalogue existant. Le sitemap et les fils d’Ariane utilisent cette liste.
- La 404 garde noindex et ne reçoit ni canonique indexable ni données structurées de page publique.
- `robots.txt` était fonctionnel et n’a pas été modifié inutilement.
- Aucune date de dernière modification artificielle n’a été ajoutée au sitemap.

La cohérence des redirections, canoniques et URL de sitemap suit les [recommandations de consolidation de Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). La configuration TLS et les redirections entre domaines restent des opérations d’hébergement.

## 4. Données structurées

Le HTML contient un graphe JSON-LD statique avec des identifiants stables :

- **Person** : Estelle Coulon, URL du portfolio, portrait existant, formation actuelle mentionnée dans la description et domaines de création dans `knowsAbout`.
- **WebSite** : le portfolio, sa langue et son lien vers la personne qui le publie.
- **WebPage** : identité de chaque page, titre, description et rattachement au site.
- **ProfilePage** : uniquement sur À propos, dont Estelle est l’entité principale.
- **BreadcrumbList** : hiérarchie Accueil → rubrique → projet lorsqu’elle s’applique.

`sameAs` réutilise uniquement LinkedIn et Behance, profils professionnels déjà fournis et affichés dans le projet. Aucun diplôme obtenu, employeur, avis, notation, agence, adresse commerciale ou date de publication n’a été inventé. `alumniOf` n’est pas utilisé pour présenter une formation en cours comme terminée.

La sérialisation échappe les signes `<`. Aucun script navigateur ni dépendance supplémentaire n’est nécessaire pour produire ces données. L’audit vérifie la syntaxe JSON, les types attendus, les URL, les références du graphe, l’identité et la cohérence avec le HTML. Il s’agit d’une **validation locale**, pas d’un résultat obtenu dans un validateur Google.

Références : [Person, Schema.org](https://schema.org/Person), [ProfilePage, Google](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [BreadcrumbList, Google](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). Un balisage conforme ne garantit pas un résultat enrichi : [données structurées Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

## 5. Images, performances et partage

Les cartes décrivent maintenant leur image réelle : portrait d’Offire, maquette Feelm, moodboard TiK•TaK, etc. Les alt vides des dessins purement décoratifs restent vides pour éviter le bruit dans les lecteurs d’écran.

Les aperçus de l’atelier sont générés en **WebP qualité 90**, avec variantes 400, 800 et 1 200 px, dimensions intrinsèques, chargement différé et décodage asynchrone. Le cadrage CSS et les originaux ouverts dans la modale ne changent pas.

Mesure sur les fichiers du build, pour les 11 sources JPEG et les 11 WebP de résolution par défaut :

| Ressources comparées                        |   Taille cumulée |
| ------------------------------------------- | ---------------: |
| JPEG précédemment utilisés pour les aperçus | 2 989 069 octets |
| WebP par défaut, 800 px                     | 1 247 928 octets |
| Réduction                                   | Environ **58 %** |

Ce n’est pas une mesure du transfert total d’une visite : la résolution choisie dépend de l’écran et le chargement est différé. Les fichiers originaux restent accessibles en grand.

`ProjectImage` précise maintenant la priorité des images demandées en chargement immédiat et utilise le décodage asynchrone. Le fond principal de l’accueil avait déjà sa priorité haute. Les polices sont locales ; les animations et leurs limites de particules sont conservées. Aucune nouvelle dépendance n’a été ajoutée.

L’image de partage utilise désormais la fée seule, choisie par Estelle, en **PNG 1 200 × 1 200** généré par Astro. Le visuel JPEG composé précédemment reste disponible, mais n’est plus l’image annoncée. Après le remplacement initial par la fée, le PNG avait conservé à tort le type JPEG et les dimensions du visuel précédent. Cette incohérence a été corrigée ; l’audit lit maintenant le fichier avec Sharp pour comparer son format et ses dimensions réels aux métadonnées. Le contrôle vérifie aussi Open Graph, Twitter Card, textes alternatifs et correspondance de `og:url` avec la canonique. Le rendu précis dépend des plateformes et de leur cache.

Les **Core Web Vitals réels n’ont pas été mesurés** : la réduction des ressources améliore les conditions de chargement mais ne permet pas d’annoncer un score LCP, INP ou CLS en production. Mesures à effectuer après publication avec PageSpeed Insights et Search Console : [documentation Google](https://developers.google.com/search/docs/appearance/core-web-vitals).

## 6. Préservation du portfolio

Aucun changement de police, de taille de titre, de grille, de menu, d’animation ou de fonctionnalité. Les URL sans barre finale restent desservies par les redirections existantes du serveur.

Comparaison des captures avant/après : les empreintes SHA-256 sont identiques pour **l’accueil desktop 1 440 px, l’accueil mobile 390 px et la page OLYVIA**. La correction visuelle indispensable est limitée au texte secondaire du projet Mon univers illustré en mode clair : `--muted: #694f60`, pour satisfaire le contrôle de contraste. La précision géographique de Contact est documentée ci-dessus.

## 7. Vérifications finales

| Vérification                            | Résultat                                                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`                         | Réussi : 0 erreur, 0 avertissement, 0 indice signalé.                                                                                |
| `npm run build`                         | Réussi : 16 pages générées.                                                                                                          |
| `npm run audit:site`                    | Réussi : 16 pages, 15 URL indexables, 199 images et 445 liens/ressources contrôlés.                                                  |
| `npm run test:e2e -- --reporter=line`   | **16 tests réussis**.                                                                                                                |
| HTML sans JavaScript                    | Titres uniques, identité, canoniques, Open Graph, graphe et H1 accessibles sur les 15 pages publiques.                               |
| Responsive et accessibilité automatisée | 15 pages contrôlées à 1 440 px, 390 px, 320 px en sombre, et 390 px en clair, sans débordement ni violation axe des critères testés. |
| Interactions                            | Menu, carrousel, filtres, fées, modale et préférences testés ; formulaire testé avec réponses simulées, sans envoi réel.             |
| Code                                    | `git diff --check` sans anomalie.                                                                                                    |

Les deux attentes de 7 projets ont été actualisées à 9. L’audit découvre maintenant les pages du build au lieu de maintenir une liste périmée et ne dépend plus de documents de soutenance supprimés. Il accepte également un futur fichier HTML de preuve Google correctement constitué, sans le traiter comme une page du sitemap. Le serveur local de tests annonce désormais les bons types MIME pour GIF et vidéos.

Les contrôles automatisés ne constituent ni une certification d’accessibilité complète ni une preuve d’indexation. Les outils Google et les réglages d’hébergement n’ont pas été modifiés.

## 8. Fichiers concernés

| Fichiers                                                                    | Rôle des changements                                                                                                       |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `src/data/seo.ts`                                                           | Nouveau : pages publiques, canoniques et graphes JSON-LD.                                                                  |
| `src/layouts/Layout.astro`                                                  | Canonique normalisée et insertion du graphe dans le HTML. Métadonnées de partage préexistantes conservées.                 |
| `astro.config.mjs`                                                          | Barre finale cohérente avec Apache.                                                                                        |
| `src/pages/sitemap.xml.ts`                                                  | Sitemap depuis la liste centrale.                                                                                          |
| `src/pages/index.astro`, `projets.astro`, `a-propos.astro`, `contact.astro` | Métadonnées et précision géographique de Contact ; liens canoniques.                                                       |
| Les 9 fichiers `src/pages/projets/*.astro`                                  | Liens canoniques ; descriptions ciblées d’OLYVIA, LUMIMIX et Mon univers illustré ; correction du contraste de ce dernier. |
| `src/pages/atelier.astro`                                                   | Aperçus WebP, données d’images et lien canonique.                                                                          |
| `src/pages/404.astro`, `mentions-legales.astro`                             | Liens vers les versions canoniques.                                                                                        |
| `src/components/Header.astro`, `Footer.astro`                               | Liens de navigation canoniques.                                                                                            |
| `src/components/ProjectCard.astro`, `src/data/projets.ts`                   | Alt spécifiques aux visuels et URL des cartes.                                                                             |
| `src/components/ProjectImage.astro`                                         | Priorité de chargement et décodage asynchrone.                                                                             |
| `scripts/audit-site.mjs`, `scripts/audit-seo.mjs`                           | Audit SEO élargi, indépendant des anciens livrables.                                                                       |
| `scripts/static-runtime.mjs`                                                | Types MIME des médias pour les tests locaux.                                                                               |
| `tests/portfolio.spec.ts`                                                   | Catalogue actualisé, nouvelles pages et test SEO sans JavaScript.                                                          |
| `GUIDE_INDEXATION_GOOGLE.md`, `RAPPORT_SEO.md`                              | Procédure Search Console et compte rendu de la mission.                                                                    |

## 9. Recherches ciblées

Priorité : **Estelle Coulon** et **Estelle Coulon portfolio**, puis les variantes **Portfolio Estelle Coulon**, **Estelle Coulon design**, **Estelle Coulon graphiste**, **Estelle Coulon UX UI**, **Estelle Coulon Montbéliard** et **Estelle Coulon BUT MMI**. Le contenu réel sur le design graphique soutient la recherche « graphiste », sans inventer de statut professionnel.

Les villes **Montbéliard, Belfort et Besançon** apparaissent dans le contexte de la recherche d’alternance. Il n’y a ni pages locales artificielles, ni métadonnées keywords, ni texte caché ajouté pour accumuler ces expressions.

## 10. Actions manuelles et suivi

1. Publier ce build avec le processus de déploiement habituel ; les constats HTTP ci-dessus portent sur la version antérieure encore en ligne pendant la mission.
2. Faire contrôler les certificats des variantes `estelle-coulon.fr` et `www.estelle-coulon.fr`. Décider si ces domaines doivent rediriger en 301 vers le portfolio, en conservant les chemins utiles, après correction TLS.
3. Facultativement, faire rediriger `/index.html` vers `/` et configurer la page 404 personnalisée avec un vrai statut 404. Ne pas ajouter une règle serveur sans vérifier la configuration Apache existante.
4. Valider la propriété Search Console, soumettre le sitemap et inspecter l’accueil selon [GUIDE_INDEXATION_GOOGLE.md](GUIDE_INDEXATION_GOOGLE.md).
5. Tester le JSON-LD publié dans les outils Google et Schema.org. Vérifier aussi les aperçus de partage après renouvellement des caches.
6. Mesurer les Core Web Vitals sur les pages publiées et surveiller les erreurs d’exploration.
7. Ajouter le lien canonique du portfolio à LinkedIn et Behance, si ce n’est pas déjà fait ; conserver une identité cohérente et enrichir progressivement les projets avec des informations réelles.
8. Suivre les impressions et clics sur le nom dans Search Console. Améliorer les contenus utiles plutôt que multiplier les répétitions ou les pages de villes.

Le code donne désormais des signaux plus cohérents sur l’identité d’Estelle Coulon. La découverte, l’indexation, l’affichage des extraits et le classement restent des décisions des moteurs.
