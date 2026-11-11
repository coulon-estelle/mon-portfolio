import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const output = path.resolve('dist');
const { render } = await import('./static-runtime.mjs');
const routes = [
  '/',
  '/projets',
  '/a-propos',
  '/atelier',
  '/contact',
  '/mentions-legales',
  '/projets/olyvia',
  '/projets/tiktak',
  '/projets/solaire',
  '/projets/feelm',
  '/projets/nunc',
  '/projets/lumimix',
  '/projets/bordeaux-surchauffe',
  '/404',
];
const files = routes.map((route) =>
  route === '/' ? 'index.html' : route.slice(1) + '/index.html',
);
const pages = new Map();
for (const [index, route] of routes.entries()) {
  const response = await render(new Request('http://localhost' + route));
  assert.equal(response.status, route === '/404' ? 404 : 200, route);
  pages.set(files[index], await response.text());
}
const errors = [];
let links = 0;
const siteOrigin = new URL(process.env.PUBLIC_SITE_URL || 'https://portfolio.estelle-coulon.fr/')
  .origin;
for (const file of files) {
  const html = pages.get(file);
  const fail = (message) => errors.push(`${file}: ${message}`);
  if (!/<html[^>]*lang="fr"/.test(html)) fail('langue française absente');
  if ((html.match(/<h1\b/g) || []).length !== 1) fail('un H1 unique est requis');
  if (!/<title>[^<]+<\/title>/.test(html)) fail('titre absent');
  if (!/<meta\s+name="description"\s+content="[^"]+"/.test(html)) fail('description absente');
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  if (!canonical || new URL(canonical[1]).origin !== siteOrigin)
    fail('URL canonique absente ou domaine incorrect');
  if (/[ÃÂ]|â€|âœ|�/.test(html)) fail('encodage à contrôler');
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) fail('police distante');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) fail('identifiants HTML dupliqués');
  for (const match of html.matchAll(/\b(?:href|src|action)="([^"#]*)(#[^"]*)?"/g)) {
    const [_, url, fragment] = match;
    if (/^(?:https?:|mailto:|tel:|data:)/.test(url)) continue;
    if (url === '') {
      if (fragment && !ids.includes(fragment.slice(1))) fail(`ancre introuvable ${fragment}`);
      continue;
    }
    const decodedUrl = decodeURIComponent(url.split('?')[0]);
    const target = decodedUrl.startsWith('/')
      ? path.join(output, decodedUrl)
      : path.resolve(path.dirname(path.join(output, file)), decodedUrl);
    const candidates = [target, `${target}.html`, path.join(target, 'index.html')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      const response = await render(
        new Request(new URL(url.replaceAll('&amp;', '&'), 'http://localhost/' + file)),
      );
      if (response.status !== 200) fail(`destination introuvable ${url}`);
    }
    links++;
  }
}
for (const document of ['POSITIONNEMENT.md', 'IA.md', 'JOURNAL.md', 'QUALITE.md']) {
  assert(fs.existsSync(document), `Livrable absent : ${document}`);
}
const projectPages = files.filter((file) =>
  /projets[\\/](?:olyvia|nunc|lumimix)[\\/]index\.html$/.test(file),
);
assert.equal(projectPages.length, 3, 'Les trois études de cas principales doivent être rendues');
const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(
  sitemapUrls.length,
  routes.length - 1,
  'Toutes les pages publiques doivent figurer au sitemap',
);
assert(
  sitemapUrls.every((url) => new URL(url).origin === siteOrigin),
  'Domaine du sitemap incorrect',
);
const robots = fs.readFileSync(path.join(output, 'robots.txt'), 'utf8');
assert(
  robots.includes('Allow: /') && robots.includes(`${siteOrigin}/sitemap.xml`),
  'Indexation ou sitemap non configuré',
);
assert.equal(errors.length, 0, errors.join('\n'));
console.log(
  `${files.length} pages vérifiées : H1, métadonnées, encodage, identifiants et ${links} destinations locales valides.`,
);
