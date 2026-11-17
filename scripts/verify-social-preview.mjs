// ===== TESTS : APERCU DE LIEN SERVI AU ROBOT =====
// --local contrôle dist ; sans option, vérifie le HTML et l’image réellement publiés, sans poster sur Discord.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const preview = JSON.parse(
  await readFile(new URL('../src/data/social-preview.json', import.meta.url), 'utf8'),
);
const local = process.argv.includes('--local');
const siteUrl = new URL(process.env.PUBLIC_SITE_URL || 'https://portfolio.estelle-coulon.fr/');
const pageUrl = new URL('/', siteUrl);
if (!local) pageUrl.searchParams.set('verify-share', process.env.GITHUB_SHA || String(Date.now()));
const imageUrl = new URL(preview.path, siteUrl);
const headers = {
  'User-Agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
  'Cache-Control': 'no-cache',
};
const { render } = local ? await import('./static-runtime.mjs') : {};
const get = async (url) =>
  local ? render(new Request(url)) : fetch(url, { headers, signal: AbortSignal.timeout(10000) });
const started = performance.now();
const response = await get(pageUrl);
assert.equal(response.status, 200, 'La page de partage doit répondre HTTP 200.');
assert.match(response.headers.get('content-type') || '', /text\/html|application\/xhtml\+xml/);
assert(
  !/attachment/i.test(response.headers.get('content-disposition') || ''),
  'Le HTML ne doit pas être servi comme téléchargement.',
);
const html = await response.text();
const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
assert(head, 'Le HTML initial doit contenir un head.');
const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key,
      value.replaceAll('&amp;', '&').replaceAll('&quot;', '"'),
    ]),
  ),
);
const meta = (key) => {
  const values = metas.filter((item) => item.property === key || item.name === key);
  assert.equal(values.length, 1, `Une seule balise ${key} doit être présente dans le head.`);
  return values[0].content;
};
assert.equal(meta('og:title'), 'Estelle Coulon | Portfolio — Design graphique & UX/UI');
assert.equal(meta('twitter:title'), meta('og:title'));
assert(meta('og:description'), 'Description absente.');
assert.equal(meta('twitter:description'), meta('og:description'));
assert.equal(meta('og:type'), 'website');
assert.equal(meta('og:url'), new URL('/', siteUrl).href);
assert.equal(meta('twitter:card'), 'summary_large_image');
assert.equal(
  meta('og:image'),
  imageUrl.href,
  `L’image publiée doit être la nouvelle version ${preview.path}.`,
);
assert.equal(meta('twitter:image'), imageUrl.href);
assert.equal(meta('og:image:alt'), preview.alt);
assert.equal(meta('twitter:image:alt'), preview.alt);
assert.equal(meta('og:image:type'), preview.type);
assert.equal(Number(meta('og:image:width')), preview.width);
assert.equal(Number(meta('og:image:height')), preview.height);
assert.equal(Number(meta('twitter:image:width')), preview.width);
assert.equal(Number(meta('twitter:image:height')), preview.height);
const imageResponse = await get(imageUrl);
assert.equal(imageResponse.status, 200, `Image de partage inaccessible : ${imageUrl.href}`);
assert.equal(imageResponse.headers.get('content-type')?.split(';')[0], preview.type);
assert(
  !/attachment/i.test(imageResponse.headers.get('content-disposition') || ''),
  'L’image ne doit pas être servie comme téléchargement.',
);
const bytes = Buffer.from(await imageResponse.arrayBuffer());
const actual = await sharp(bytes).metadata();
assert.equal(actual.format, 'png');
assert.equal(actual.width, preview.width);
assert.equal(actual.height, preview.height);
assert(bytes.length < 1_000_000, 'Le visuel de partage doit rester inférieur à 1 Mo.');
// ===== DEPLOIEMENT : IDENTITE DU FICHIER TRANSFERE =====
// Compare les octets servis à l’image préparée dans ce checkout, pour détecter un déploiement ancien/incomplet.
const expected = await readFile(new URL(`../public${preview.path}`, import.meta.url));
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
assert.equal(
  hash(bytes),
  hash(expected),
  'Le fichier servi diffère du visuel préparé pour ce déploiement.',
);
const elapsed = Math.round(performance.now() - started);
assert(elapsed < 10000, 'Le chargement de la page et de l’image dépasse 10 secondes.');
console.log(
  `${local ? 'Build local' : 'Production'} : HTML 200, métadonnées uniques, grande carte, fee-4 PNG ${actual.width} × ${actual.height}, ${bytes.length} octets, ${elapsed} ms.`,
);
console.log(`Image : ${imageUrl.href}`);
console.log(
  'Ce test utilise le User-Agent de Discordbot ; il ne prouve pas le rendu du client Discord ni l’accès depuis ses propres adresses IP.',
);
