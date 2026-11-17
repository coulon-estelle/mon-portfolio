// ===== SEO : PLAN DU SITE XML =====
// Génère les URL publiques depuis la liste de routes et le domaine configuré.
import type { APIRoute } from 'astro';
import { site } from '../data/site';

// ===== SEO : ROUTES PUBLIQUES A INDEXER =====
// Liste les pages incluses au sitemap ; à compléter lors de l’ajout d’une page.
const routes = [
  '/',
  '/projets',
  '/atelier',
  '/a-propos',
  '/contact',
  '/projets/olyvia',
  '/projets/tiktak',
  '/projets/solaire',
  '/projets/feelm',
  '/projets/nunc',
  '/projets/lumimix',
  '/projets/bordeaux-surchauffe',
  '/projets/dnd',
  '/projets/portfolio',
  '/mentions-legales',
];
// ===== SEO : ECHAPPEMENT XML =====
// Protège les caractères spéciaux avant de les insérer dans le sitemap.
const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

export const GET: APIRoute = () => {
  const urls = site.url
    ? routes
        .map((route) => `<url><loc>${escapeXml(new URL(route, site.url).href)}</loc></url>`)
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
