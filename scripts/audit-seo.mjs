// ===== TESTS : AUDIT SEO DU BUILD STATIQUE =====
// Vérifie toutes les pages réellement générées, y compris celles ajoutées au catalogue.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { render } from './static-runtime.mjs';

const output = path.resolve('dist');
assert(fs.existsSync(output), 'Lancer npm run build avant l’audit.');
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
    );
const files = walk(output).filter((file) => {
  if (!file.endsWith('.html')) return false;
  // Un fichier de preuve Google n’est pas une page éditoriale et ne doit pas entrer au sitemap.
  const filename = path.basename(file);
  return !(
    /^google[\w-]+\.html$/.test(filename) &&
    fs.readFileSync(file, 'utf8').trim() === `google-site-verification: ${filename}`
  );
});
const origin = new URL(process.env.PUBLIC_SITE_URL || 'https://portfolio.estelle-coulon.fr/')
  .origin;
assert.equal(new URL(origin).protocol, 'https:', 'Le domaine public doit utiliser HTTPS.');
const errors = [];
const titles = new Set();
const descriptions = new Set();
const indexableUrls = new Set();
let links = 0;
let images = 0;
const decode = (value) =>
  value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
// Astro peut sérialiser alt="" en attribut vide alt : les deux syntaxes sont valides.
const attrs = (tag) => {
  const attributes = tag.replace(/^<\/?[\w:-]+/, '').replace(/\/?>$/, '');
  return Object.fromEntries(
    [...attributes.matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)].map(
      ([, key, doubleQuoted, singleQuoted, unquoted]) => [
        key,
        decode(doubleQuoted ?? singleQuoted ?? unquoted ?? ''),
      ],
    ),
  );
};

for (const file of files) {
  const relative = path.relative(output, file).split(path.sep).join('/');
  const route =
    relative === 'index.html'
      ? '/'
      : relative === '404.html'
        ? '/404.html'
        : `/${relative.replace(/index\.html$/, '')}`;
  const response = await render(new Request(`http://localhost${route}`));
  const html = (await response.text()).replace(/<!--[\s\S]*?-->/g, '');
  const fail = (message) => errors.push(`${route}: ${message}`);
  assert.equal(response.status, route === '/404.html' ? 404 : 200, route);
  if (!/<html[^>]*lang="fr"/.test(html)) fail('langue française absente');
  if ((html.match(/<h1\b/g) || []).length !== 1) fail('un H1 unique est requis');
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || '');
  if (!title || !title.includes('Estelle Coulon')) fail('titre absent ou sans identité');
  if (titles.has(title)) fail('titre dupliqué');
  titles.add(title);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attrs(tag));
  const meta = (key) => metas.find((item) => item.name === key || item.property === key)?.content;
  const description = meta('description');
  if (!description || descriptions.has(description)) fail('description absente ou dupliquée');
  descriptions.add(description);
  if (/[ÃÂ]|â€|âœ|�/.test(html)) fail('encodage à contrôler');
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) fail('police distante');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  if (new Set(ids).size !== ids.length) fail('identifiants HTML dupliqués');
  const noindex = /noindex/i.test(meta('robots') || '');
  const canonicalLinks = [...html.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => attrs(tag))
    .filter((link) => link.rel === 'canonical');
  const canonical = canonicalLinks[0]?.href;
  if (route === '/404.html') {
    if (!noindex || canonical) fail('404 : noindex requis, sans canonique');
  } else {
    const expected = new URL(route, origin).href;
    if (noindex) fail('noindex accidentel');
    if (canonicalLinks.length !== 1 || canonical !== expected)
      fail(`canonique attendue : ${expected}`);
    if (indexableUrls.has(canonical)) fail('canonique dupliquée');
    indexableUrls.add(expected);
    if (meta('og:url') !== canonical) fail('og:url différent de la canonique');
  }

  // ===== SEO : METADONNEES DE PARTAGE =====
  for (const key of [
    'og:title',
    'og:description',
    'og:image',
    'og:type',
    'og:site_name',
    'og:image:alt',
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:image:alt',
  ]) {
    if (!meta(key)) fail(`métadonnée absente : ${key}`);
    if (metas.filter((item) => item.name === key || item.property === key).length !== 1)
      fail(`métadonnée dupliquée : ${key}`);
  }
  if (meta('og:title') !== title || meta('og:description') !== description)
    fail('Open Graph incohérent');
  if (meta('twitter:title') !== title || meta('twitter:description') !== description)
    fail('Twitter Card incohérente');
  if (meta('twitter:card') !== 'summary_large_image' || meta('twitter:image') !== meta('og:image'))
    fail('carte sociale incorrecte');
  try {
    const image = new URL(meta('og:image'));
    if (image.origin !== origin || image.protocol !== 'https:')
      fail('image de partage sans URL HTTPS du site');
    const imagePath = path.join(output, decodeURIComponent(image.pathname));
    if (!fs.existsSync(imagePath)) fail('image de partage absente du build');
    else {
      const actual = await sharp(imagePath).metadata();
      const mime = actual.format === 'jpeg' ? 'image/jpeg' : `image/${actual.format}`;
      if (meta('og:image:type') !== mime) fail('type MIME annoncé différent de l’image de partage');
      if (
        Number(meta('og:image:width')) !== actual.width ||
        Number(meta('og:image:height')) !== actual.height
      )
        fail('dimensions annoncées différentes de l’image de partage');
    }
  } catch {
    fail('URL de l’image de partage invalide');
  }

  // ===== IMAGES : TEXTES ALTERNATIFS ET DIMENSIONS =====
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const image = attrs(tag);
    images++;
    if (!Object.hasOwn(image, 'alt')) fail('image sans alt');
    // L’image vide de la modale de l’atelier reçoit sa source uniquement après le clic.
    if (image.src && (!Number(image.width) || !Number(image.height)))
      fail(`dimensions absentes : ${image.src}`);
  }

  // ===== SEO : VALIDATION LOCALE DU JSON-LD =====
  const jsonScripts = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ];
  if (jsonScripts.length !== (noindex ? 0 : 1)) fail('nombre de graphes JSON-LD incorrect');
  for (const [, json] of jsonScripts) {
    try {
      const graph = JSON.parse(json);
      if (graph['@context'] !== 'https://schema.org' || !Array.isArray(graph['@graph']))
        throw Error('contexte ou graphe absent');
      const entities = graph['@graph'];
      const person = entities.find((item) => item['@type'] === 'Person');
      const website = entities.find((item) => item['@type'] === 'WebSite');
      const page = entities.find((item) => ['WebPage', 'ProfilePage'].includes(item['@type']));
      if (person?.name !== 'Estelle Coulon' || person.url !== `${origin}/`)
        throw Error('identité incorrecte');
      if (!person.description.includes('BUT Métiers du Multimédia et de l’Internet'))
        throw Error('formation absente');
      if (person.alumniOf || person.hasCredential)
        throw Error('aucun diplôme obtenu ne doit être inventé');
      if (!person.sameAs?.length || person.sameAs.some((url) => !/^https:\/\//.test(url)))
        throw Error('profils professionnels invalides');
      if (website?.url !== `${origin}/` || page?.url !== canonical || page.name !== title)
        throw Error('graphe incohérent avec la page');
      if (
        route === '/a-propos/' &&
        (page['@type'] !== 'ProfilePage' || page.mainEntity?.['@id'] !== person['@id'])
      )
        throw Error('profil sans personne principale');
      if (route !== '/a-propos/' && page['@type'] === 'ProfilePage')
        throw Error('ProfilePage réservé à À propos');
      const entityIds = new Set(entities.map((item) => item['@id']));
      const checkRefs = (value) => {
        if (!value || typeof value !== 'object') return;
        if (
          Object.keys(value).length === 1 &&
          value['@id'] &&
          !entityIds.has(value['@id']) &&
          value['@id'] !== `${origin}/a-propos/#webpage`
        )
          throw Error(`référence inconnue : ${value['@id']}`);
        Object.values(value).forEach(checkRefs);
      };
      checkRefs(entities);
      const breadcrumb = entities.find((item) => item['@type'] === 'BreadcrumbList');
      if (route !== '/' && !breadcrumb) throw Error('fil d’Ariane structuré absent');
      if (breadcrumb) {
        if (breadcrumb.itemListElement.length < 2) throw Error('fil d’Ariane trop court');
        breadcrumb.itemListElement.forEach((item, index) => {
          if (
            item['@type'] !== 'ListItem' ||
            item.position !== index + 1 ||
            !item.name ||
            new URL(item.item).origin !== origin
          )
            throw Error('entrée du fil d’Ariane incorrecte');
        });
        if (breadcrumb.itemListElement.at(-1).item !== canonical)
          throw Error('dernière entrée différente de la canonique');
      }
    } catch (error) {
      fail(`JSON-LD invalide : ${error.message}`);
    }
  }

  // ===== NAVIGATION : LIENS, RESSOURCES ET ANCRAGES =====
  for (const [tag] of html.matchAll(/<(?:a|img|source|script|link|form)\b[^>]*>/g)) {
    const item = attrs(tag);
    const value = item.href || item.src || item.action;
    if (!value || /^(?:https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, `http://localhost${route}`);
    if (url.hash && url.pathname === route && !ids.includes(decodeURIComponent(url.hash.slice(1))))
      fail(`ancre absente : ${value}`);
    if (!value.startsWith('#')) {
      if ((await render(new Request(url))).status !== 200)
        fail(`destination locale absente : ${value}`);
      if (!/\.[^/]+$/.test(url.pathname) && !url.pathname.endsWith('/'))
        fail(`lien non canonique : ${value}`);
    }
    links++;
  }
}

// ===== SEO : SITEMAP, ROBOTS ET ERREURS 404 =====
const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, value]) => decode(value));
if (sitemapUrls.length !== new Set(sitemapUrls).size) errors.push('URL dupliquée dans le sitemap');
for (const url of sitemapUrls)
  if (!indexableUrls.has(url)) errors.push(`sitemap : URL non canonique ou non indexable : ${url}`);
for (const url of indexableUrls)
  if (!sitemapUrls.includes(url)) errors.push(`sitemap : URL publique manquante : ${url}`);
const robots = fs.readFileSync(path.join(output, 'robots.txt'), 'utf8');
if (
  !robots.includes('Allow: /') ||
  /^Disallow:\s*\/\s*$/m.test(robots) ||
  !robots.includes(`${origin}/sitemap.xml`)
)
  errors.push('robots.txt incorrect');
assert.equal(
  (await render(new Request('http://localhost/page-inexistante-audit/'))).status,
  404,
  'une URL inexistante doit renvoyer 404',
);
assert.equal(errors.length, 0, errors.join('\n'));
console.log(
  `${files.length} pages contrôlées, ${indexableUrls.size} URL canoniques dans le sitemap, ${images} images et ${links} liens/ressources valides.`,
);
console.log(
  'Titres et descriptions uniques, JSON-LD cohérent, partage social, robots.txt et erreurs 404 : OK.',
);
console.log(
  'Validation locale : ne remplace pas une inspection Google ni des mesures Core Web Vitals en production.',
);
