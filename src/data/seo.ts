// ===== SEO : ROUTES CANONIQUES ET IDENTITE =====
// Une seule liste pour le sitemap et les fils d’Ariane, fondée sur les projets réellement présents.
import { projets } from './projets';
import { site } from './site';

export const seoPages = [
  { path: '/', name: 'Accueil' },
  { path: '/projets/', name: 'Projets' },
  { path: '/atelier/', name: 'Atelier personnel' },
  { path: '/a-propos/', name: 'À propos' },
  { path: '/contact/', name: 'Contact' },
  ...projets.map((project) => ({ path: `/projets/${project.id}/`, name: project.nom })),
  { path: '/mentions-legales/', name: 'Mentions légales' },
];

// Le serveur Apache redirige déjà les dossiers vers leur version avec barre finale.
export const canonicalPath = (pathname: string) => {
  const path = pathname.replace(/\/{2,}/g, '/');
  return path.endsWith('/') || /\.[^/]+$/.test(path) ? path : `${path}/`;
};
export const absoluteUrl = (pathname: string) => new URL(pathname, site.url).href;

// ===== SEO : DONNEES STRUCTUREES SCHEMA.ORG =====
// Ne déclare ni diplôme obtenu, ni employeur, ni agence locale : Estelle est actuellement étudiante.
export const structuredData = (pathname: string, title: string, description: string) => {
  const path = canonicalPath(pathname);
  const url = absoluteUrl(path);
  const home = absoluteUrl('/');
  const personId = `${home}#person`;
  const websiteId = `${home}#website`;
  const pageId = `${url}#webpage`;
  const isProfile = path === '/a-propos/';
  const current = seoPages.find((page) => page.path === path);
  const breadcrumbs =
    current && path !== '/'
      ? [
          seoPages[0],
          ...(path.startsWith('/projets/') && path !== '/projets/' ? [seoPages[1]] : []),
          current,
        ]
      : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url: home,
        image: absoluteUrl('/images/commun/portrait.png'),
        description:
          'Estelle Coulon, artiste et étudiante en BUT Métiers du Multimédia et de l’Internet à Montbéliard, crée des illustrations, des identités visuelles et des interfaces web.',
        knowsAbout: [
          'Illustration',
          'Design graphique',
          'Identité visuelle',
          'UX/UI',
          'Développement web',
        ],
        sameAs: [site.linkedin, site.creativeNetwork].filter(Boolean),
        mainEntityOfPage: { '@id': `${absoluteUrl('/a-propos/')}#webpage` },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: home,
        name: 'Estelle Coulon — Portfolio',
        inLanguage: 'fr-FR',
        publisher: { '@id': personId },
      },
      {
        '@type': isProfile ? 'ProfilePage' : 'WebPage',
        '@id': pageId,
        url,
        name: title,
        description,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        author: { '@id': personId },
        ...(isProfile ? { mainEntity: { '@id': personId } } : {}),
        ...(breadcrumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      },
      ...(breadcrumbs.length
        ? [
            {
              '@type': 'BreadcrumbList',
              '@id': `${url}#breadcrumb`,
              itemListElement: breadcrumbs.map((page, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: page.name,
                item: absoluteUrl(page.path),
              })),
            },
          ]
        : []),
    ],
  };
};
