// ===== SEO : PLAN DU SITE XML =====
// Génère les URL publiques depuis la liste de routes et le domaine configuré.
import type { APIRoute } from 'astro';
import { absoluteUrl, seoPages } from '../data/seo';

// ===== SEO : ECHAPPEMENT XML =====
// Protège les caractères spéciaux avant de les insérer dans le sitemap.
const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

export const GET: APIRoute = () => {
  const urls = seoPages
    .map((page) => `<url><loc>${escapeXml(absoluteUrl(page.path))}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
