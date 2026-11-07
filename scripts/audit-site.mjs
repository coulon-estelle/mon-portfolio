import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const output = path.resolve('dist');
const { render } = await import('./ssr-runtime.mjs');
const routes = [
  '/',
  '/projets',
  '/a-propos',
  '/atelier',
  '/contact',
  '/merci',
  '/mentions-legales',
  '/projets/olyvia',
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
for (const file of files) {
  const html = pages.get(file);
  const fail = (message) => errors.push(`${file}: ${message}`);
  if (!/<html[^>]*lang="fr"/.test(html)) fail('langue française absente');
  if ((html.match(/<h1\b/g) || []).length !== 1) fail('un H1 unique est requis');
  if (!/<title>[^<]+<\/title>/.test(html)) fail('titre absent');
  if (!/<meta\s+name="description"\s+content="[^"]+"/.test(html)) fail('description absente');
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
for (const document of ['IA.md', 'JOURNAL.md', 'QUALITE.md']) {
  assert(fs.existsSync(document), `Livrable absent : ${document}`);
}
const projectPages = files.filter((file) =>
  /projets[\\/](?:olyvia|nunc|lumimix|bordeaux-surchauffe)[\\/]index\.html$/.test(file),
);
assert.equal(projectPages.length, 4, 'Les quatre études de cas doivent être rendues');
assert.equal(errors.length, 0, errors.join('\n'));
console.log(
  `${files.length} pages vérifiées : H1, métadonnées, encodage, identifiants et ${links} destinations locales valides.`,
);
if (!process.env.PUBLIC_SITE_URL)
  console.log('À finaliser : PUBLIC_SITE_URL pour les URL canoniques et le sitemap de production.');
