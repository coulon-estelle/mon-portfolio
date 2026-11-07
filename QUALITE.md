# Qualité web — état au 28 octobre 2026

Bilan local du portfolio **avant intégration des images définitives**. Les résultats ci-dessous concernent la version contrôlée dans Chromium, pas un certificat de conformité ni une validation de l’hébergement final.

## Résultats exécutés

- `npm run check` : 0 erreur, 0 avertissement, 0 indication après correction des paramètres inutilisés.
- `npm run build` : compilation SSR avec l’adaptateur Netlify ; les pages sont rendues par la fonction serveur.
- `npm run audit:site` : 11 pages, 144 destinations locales valides ; langue française, un H1 par page, titres, descriptions, identifiants uniques et absence de caractères corrompus contrôlés.
- `npm run test:e2e` : **8 tests réussis**. Le serveur local est arrêté automatiquement en fin de contrôle.
- `npm install` / audit des dépendances : 0 vulnérabilité signalée lors de l’installation des dépendances de cette relecture. À refaire lors de futures mises à jour.
- Formatage : Prettier avec le plugin Astro, encodage UTF-8 et règles communes au dépôt.

## Critères propres à ce site

| Domaine             | Pourquoi ce critère compte ici                        | Contrôle et correction                                                                                                                                             | Résultat / limite                                                                                                                   |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Structure et SEO    | Plusieurs pages et trois études de cas                | Audit HTML des titres, descriptions, H1, langue, liens et identifiants ; ajout d’Open Graph, du favicon, des canonical conditionnels, du sitemap et de robots      | Contrôles locaux réussis ; domaine personnel à renseigner                                                                           |
| Navigation          | Cartes liées aux études de cas et filtres de galerie  | Test de filtre Web design, ouverture de LUMIMIX et URL des aperçus cliquables                                                                                      | Réussi                                                                                                                              |
| Clavier et menu     | Header fixe et menu mobile                            | Échap ferme le menu et rend le focus ; navigation testée sans JavaScript ; liens et contrôles ont un focus visible                                                 | Réussi dans Chromium ; essai lecteur d’écran encore à faire                                                                         |
| Responsive          | Typographies manuscrites et carrousel                 | Les neuf pages principales testées à 320, 390 et 1440 px en sombre, puis à 390 px en clair                                                                         | Aucun débordement horizontal détecté                                                                                                |
| Footer              | Espace indésirable signalé sous le pied de page       | Mesure de l’écart entre le bas du footer et le bas du document sur les neuf pages aux quatre configurations                                                        | Écart inférieur ou égal à 1 px                                                                                                      |
| ARIA et contrastes  | Palettes, interrupteurs et thèmes personnalisés       | axe-core, règles WCAG 2 A/AA et 2.1 AA sur les neuf pages aux quatre configurations                                                                                | 0 violation détectée sur les critères automatisables. Deux palettes corrigées avec `role=img`. Cela ne remplace pas un audit humain |
| Mouvements          | Paillettes, apparitions et inclinaison des cartes     | Tests avec `prefers-reduced-motion`, interrupteur et persistance après rechargement ; pas de transformation au survol en réduction de mouvements                   | Réussi ; la préférence système reste prioritaire                                                                                    |
| Carrousel           | Navigation tactile et boutons numérotés sur mobile    | Test du déplacement vers la troisième carte et de l’ouverture du projet ; remplacement de `scrollBy` par `scrollTo` pour ne pas bloquer sur le point intermédiaire | Réussi                                                                                                                              |
| Contact             | Réception réelle nécessaire au cahier des charges     | Formulaire HTML POST Netlify, champs obligatoires, honeypot et page de retour. La requête est interceptée dans le test : aucun message réel n’est envoyé           | Configuration et validation réussies localement ; activation et réception sur Netlify à vérifier                                    |
| Galerie personnelle | Voir une œuvre sans changer de page                   | `dialog` natif, titre, sous-titre, matériel, bouton fermer, Échap, restitution du focus                                                                            | Galerie vide en attente d’images : le parcours complet avec une œuvre réelle reste à tester                                         |
| Code                | Explication devant le jury et maintenance             | Dépendances exactes, types Astro, données centralisées, mise en forme, retrait de CSS obsolète et de 42 déclarations déjà remplacées ou identiques                 | Le code doit encore être relu et compris par Estelle                                                                                |
| Juridique           | Projets collectifs, formulaire et préférences locales | Page de mentions/confidentialité, rôles individuels, liens sociaux réels, crédits des polices, information Netlify Forms et liens vers le prestataire              | Crédits images, coordonnées complètes de l’hébergeur et politique de conservation à revalider avant publication                     |

## Sobriété et poids observés

- Les polices sont locales : aucun appel à Google Fonts. Le build contient 8 fichiers WOFF2 pour un total de **114 108 octets**, et des variantes WOFF de repli. Chaque page ne charge que les fontes effectivement utilisées par le navigateur.
- Les 8 feuilles CSS du build totalisent **113 468 octets**, avant compression ; c’est un total du site, pas le poids transféré d’une seule page.
- Les scripts interactifs existent, même si Astro les intègre actuellement dans le HTML : ne pas confondre absence de fichier `.js` séparé et absence de JavaScript.
- `hero.png` pèse **1 140 920 octets** : optimisation explicitement reportée à l’étape images. Prévoir AVIF/WebP, tailles adaptées et contrôle du rendu.
- Pas de React/Vue ni de dépendance d’animation côté client. Les paquets de test sont uniquement des outils de développement.
- Pas de publicité ni de mesure d’audience ajoutée. Les préférences locales sont documentées et peuvent être effacées depuis les mentions.

## Publication et livrables encore à terminer

- **Domaine du portfolio** : non communiqué ; ne pas confondre avec le domaine de LUMIMIX. Définir `PUBLIC_SITE_URL`, reconstruire et vérifier canonical/sitemap/robots. En son absence, robots bloque volontairement l’indexation.
- **Netlify** : hébergeur confirmé par Estelle. Configuration prête, mais aucun déploiement effectué par cet audit. Activer Forms, redéployer, configurer les notifications et vérifier un envoi réel.
- **Mentions** : adresse de Netlify vérifiée dans ses conditions officielles ; téléphone de l’hébergeur non vérifié. La durée maximale de douze mois doit être validée puis appliquée dans la messagerie et Netlify Forms.
- **GitHub** : `coulon-estelle/mon-portfolio` confirmé public par le connecteur GitHub. La version locale modifiée n’a pas été commitée ni poussée par l’assistant. Deux commits locaux observés avant cette relecture, datés du 28 octobre 2026 ; ne pas antidater l’historique.
- **Réseaux** : liens LinkedIn et Behance fournis et intégrés ; mise à jour des contenus des profils à faire ou à documenter.
- **Images et CV** : étape suivante. Vérifier crédits, droits, textes alternatifs et poids. Compléter les URL NŨNC/Figma quand elles sont disponibles.
- **Vérifications complémentaires** : Lighthouse, lecteur d’écran, Safari/iOS, Firefox et envoi du formulaire en production. Aucun score ou résultat non exécuté n’est présenté comme acquis.
