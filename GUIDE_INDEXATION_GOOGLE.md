# Indexer le portfolio d’Estelle Coulon sur Google

Adresse de référence : **https://portfolio.estelle-coulon.fr/**. Les modifications SEO sont préparées dans le code : elles doivent être publiées avant les opérations ci-dessous. Aucune propriété Search Console n’a été validée et aucun sitemap n’a été soumis par l’assistant.

## 1. Ajouter une propriété

Ouvrir [Google Search Console](https://search.google.com/search-console/) avec son compte Google, puis choisir « Ajouter la propriété ».

- **Domaine** : saisir `estelle-coulon.fr`, sans protocole ni chemin. Cette option couvre les sous-domaines, dont le portfolio, et nécessite un accès aux DNS.
- **Préfixe de l’URL** : saisir exactement `https://portfolio.estelle-coulon.fr/` pour gérer uniquement cette version du site. Elle permet notamment la validation par fichier HTML.

Source : [validation de propriété Google](https://support.google.com/webmasters/answer/9008080?hl=fr).

## 2. Prouver la propriété

**Avec les DNS** : copier la valeur TXT fournie par Google dans la zone DNS du domaine, chez son gestionnaire DNS. Respecter le nom d’enregistrement demandé, enregistrer, puis revenir cliquer sur « Valider ». Laisser cet enregistrement en place.

**Avec un fichier HTML** pour la propriété « Préfixe de l’URL » : télécharger le fichier exact fourni par Google, le placer dans `public/` sans le renommer ni modifier son contenu, reconstruire et publier le site. Ouvrir son adresse publique pour vérifier qu’il est accessible, puis valider dans Search Console. Garder le fichier dans le dépôt : le déploiement actuel synchronise `dist/` avec suppression des fichiers absents et pourrait effacer un fichier ajouté uniquement sur le serveur.

Aucun jeton fictif n’est fourni dans le projet. Source : [méthodes de validation](https://support.google.com/webmasters/answer/9008080?hl=fr).

## 3. Envoyer le sitemap

Dans la propriété validée, ouvrir « Sitemaps » et soumettre :

```text
https://portfolio.estelle-coulon.fr/sitemap.xml
```

Si l’interface affiche déjà le préfixe du portfolio, renseigner simplement `sitemap.xml`. Vérifier ensuite le résultat de traitement. Le build contient 15 URL publiques avec une barre finale ; ne pas ajouter `/404.html`. Un sitemap facilite la découverte des pages, sans garantir leur indexation. Source : [sitemaps Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## 4. Demander l’indexation de l’accueil

Dans la barre « Inspection de l’URL », saisir `https://portfolio.estelle-coulon.fr/`. Consulter l’état, tester l’URL publiée si nécessaire, puis utiliser « Demander une indexation » si l’outil le permet. Faire de même pour `/a-propos/` et `/projets/` si elles ne sont pas connues.

Cette demande n’impose ni délai ni classement. Source : [inspection et demande d’indexation](https://support.google.com/webmasters/answer/9012289?hl=fr).

## 5. Vérifier l’indexation

Inspecter l’accueil et les pages importantes dans Search Console : vérifier leur état et comparer la canonique déclarée avec celle choisie par Google. Le test en direct indique l’accessibilité actuelle ; le rapport indexé décrit ce que Google connaît déjà.

Une recherche `site:portfolio.estelle-coulon.fr` donne un aperçu, mais ne remplace pas l’inspection d’URL. Sources : [outil d’inspection](https://support.google.com/webmasters/answer/9012289?hl=fr), [rapport d’indexation](https://support.google.com/webmasters/answer/7440203?hl=fr).

## 6. Suivre les recherches sur mon nom

Dans « Performances » → résultats de recherche, choisir une période puis filtrer les requêtes contenant `Estelle Coulon`. Observer les impressions, clics, taux de clics, position moyenne et pages affichées. Examiner aussi les variantes avec `portfolio`, `design`, `UX UI` et `Montbéliard`.

Comparer les périodes plutôt que des recherches personnelles ponctuelles. Les données peuvent être absentes ou partielles lorsque le volume est faible. Source : [rapport sur les performances](https://support.google.com/webmasters/answer/7576553?hl=fr).

## 7. Comprendre les problèmes d’indexation

Dans « Indexation » → « Pages », ouvrir les motifs puis inspecter les URL concernées :

| Motif ou symptôme                       | Contrôle à effectuer                                                                                                              |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Blocage robots ou `noindex`             | Vérifier le HTML publié et `robots.txt`. La page 404 doit rester exclue.                                                          |
| Redirection ou doublon                  | Utiliser la version HTTPS avec barre finale ; comparer les canoniques. Une ancienne URL redirigée peut rester exclue normalement. |
| URL découverte ou explorée, non indexée | Vérifier le contenu, les liens internes et l’accessibilité ; ce statut ne prouve pas une panne.                                   |
| Erreur serveur ou certificat            | Corriger l’hébergement, puis retester l’URL publique.                                                                             |
| Page supprimée                          | Une vraie réponse 404 est normale si elle n’a pas de remplacement pertinent.                                                      |

Après correction et publication, utiliser le test en direct ou la validation proposée par le rapport. Source : [rapport d’indexation des pages](https://support.google.com/webmasters/answer/7440203?hl=fr).

## Contrôles après publication

- Ouvrir l’accueil, le sitemap, `robots.txt` et `/images/partage-portfolio.jpg`.
- Tester l’accueil et `/a-propos/` dans le [test des résultats enrichis](https://search.google.com/test/rich-results) et le [validateur Schema.org](https://validator.schema.org/). La validation locale du code ne constitue pas une validation Google.
- Mesurer les pages avec [PageSpeed Insights](https://pagespeed.web.dev/), puis consulter les Core Web Vitals disponibles dans Search Console. Les tests locaux ne mesurent pas l’expérience réelle des visiteurs. Source : [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

Le contrôle HTTP de cette mission a détecté un certificat invalide sur `https://estelle-coulon.fr/`. Faire corriger ce certificat et décider, côté hébergement, si ce domaine doit rediriger vers le portfolio. Ne pas contourner l’erreur TLS. Voir les constats et limites dans [RAPPORT_SEO.md](RAPPORT_SEO.md).
