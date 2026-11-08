# Portfolio — Estelle Coulon

Portfolio personnel réalisé avec Astro, TypeScript et du CSS personnalisé : accueil, trois études de cas, atelier personnel, à propos et contact. Les images définitives seront intégrées séparément.

## Travailler sur le projet

Node 24 (compatible avec la contrainte du package), puis :

```powershell
npm ci
npm run astro -- dev --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Contrôles et production :

```powershell
npm run check
npm run build
npm run audit:site
npm run format:check
npx playwright install chromium
npm run test:e2e
```

Les tests navigateur démarrent et arrêtent leur propre prévisualisation sur le port 4322. Le test du formulaire intercepte la requête localement : aucun message n’est envoyé à Estelle ou à Netlify.

## Où modifier le contenu

- `src/data/site.ts` : coordonnées, liens sociaux, hébergeur et domaine.
- `src/data/projets.ts` : les trois cartes partagées entre l’accueil et la galerie.
- `src/data/project-assets.ts` : moodboards, logos, icônes et mockups des projets. Les PNG importés sont optimisés par le service d’images Astro.
- `src/pages/projets/` : contenu détaillé de chaque étude de cas.
- `src/data/oeuvres.ts` : œuvres personnelles, image, titre, sous-titre, matériel et catégorie.
- En haut des pages : chemins des images et liens de ressources encore absents.
- `src/components/` : éléments partagés et interactions.
- `src/styles/global.css` : palette, accueil, composants partagés, responsive et préférences.

Les CSS propres aux pages sont dans leurs balises `style` et restent isolés par Astro. Les polices sont servies localement via Fontsource : aucun appel à Google Fonts. Les licences sont dans les paquets `@fontsource/*` et `CREDITS.md`.

### Classement des images

```text
public/images/
├── commun/                  # fond de l’accueil et portrait
├── atelier/                 # dessins personnels
├── illustrations/
│   ├── fees/
│   ├── lunes/
│   └── etoiles/
└── projets/
    ├── olyvia/              # logo, icône, moodboard, mockups mobile/desktop
    ├── nunc/                # logos couleur/clair, icône, moodboard, mockups
    └── lumimix/             # logo, présentation desktop, mockup mobile
```

Les noms de fichiers sont en minuscules, sans espaces ni accents. Les originaux ont été déplacés, sans modification, et tous les chemins du code et des tests ont été actualisés. Les ressources générées sont gérées par Astro : ne pas modifier `dist/` ni `.netlify/` manuellement.

## Déploiement sur Netlify

Le dépôt contient `netlify.toml` et génère un site statique avec `output: 'static'`, sans adaptateur serveur. Toutes les pages et les images optimisées sont produites dans `dist/`. Les contrôles et tests locaux servent directement ces fichiers.

1. Importer le dépôt public GitHub dans Netlify.
2. Copier les valeurs utiles de `.env.example` dans les variables d’environnement Netlify. Le domaine exact est obligatoire dans `PUBLIC_SITE_URL`, sous la forme `https://votre-domaine.fr`.
3. Configurer le domaine personnel et vérifier le certificat HTTPS et les redirections vers une adresse unique.
4. Activer la détection dans **Forms → Enable form detection**, puis redéployer. Le HTML contient un formulaire `contact`, un champ `form-name`, une protection honeypot et une page `/merci`.
5. Dans **Forms → Submission notifications**, ajouter une notification **Email** pour le formulaire `contact`, avec **estellecoulon6@gmail.com** comme destinataire. Envoyer ensuite un vrai message de test et vérifier sa réception dans Gmail et dans Forms. Cette configuration se fait dans le compte Netlify, pas dans le HTML ; elle n’a pas été activée depuis cet environnement. L’objet du message est préparé dans le formulaire et le champ `email` permet de répondre au visiteur.
6. Vérifier les coordonnées légales de l’hébergeur et sa documentation, les informations de confidentialité et la politique de conservation des échanges.
7. Vérifier les pages en ligne, le sitemap, `robots.txt`, les URL canoniques et les partages sociaux après le déploiement.

Sans `PUBLIC_SITE_URL`, le site n’invente pas de domaine : absence de canonical, sitemap vide et `robots.txt` qui bloque l’indexation. Ce blocage doit être levé par la configuration du domaine avant la publication finale.

Les URL LinkedIn et Behance sont celles fournies par Estelle. Leur mise à jour éditoriale doit être effectuée sur les plateformes ; un lien fonctionnel ne suffit pas à satisfaire la consigne de présence professionnelle.

## Livrables du cours

- `IA.md` : usages de l’assistant et décisions/corrections.
- `JOURNAL.md` : trace réelle disponible, sans semaines ou heures inventées.
- `QUALITE.md` : contrôles exécutés, corrections et vérifications restantes.
- `CREDITS.md` : droits et provenance des ressources.

L’oral de maquette a déjà eu lieu : ses documents de préparation ne font pas partie de ce suivi. Il reste à terminer les images et leurs crédits, le CV, la configuration du domaine et la publication du site. Aucun changement n’est automatiquement poussé ou publié.

Le formulaire est présent dans la page contact générée et dans `public/contact-form.html` pour sa détection par Netlify Forms. Les notifications restent à configurer dans Netlify.

Exécutez `npm run build` avant l’audit ou les tests pour vérifier la dernière version des fichiers statiques.
