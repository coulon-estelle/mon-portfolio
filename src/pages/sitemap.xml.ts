import type { APIRoute } from 'astro';
import { site } from '../data/site';

const routes = [
  '/',
  '/projets',
  '/atelier',
  '/a-propos',
  '/contact',
  '/projets/olyvia',
  '/projets/nunc',
  '/projets/lumimix',
  '/projets/bordeaux-surchauffe',
  '/mentions-legales',
];
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
