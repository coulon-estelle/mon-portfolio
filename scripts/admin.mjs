import { createServer } from 'node:http';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { findEntry, listEntries, openDatabase, saveEntry } from '../src/data/database.mjs';

const port = Number(process.env.PORTFOLIO_ADMIN_PORT || 4324);
const address = `127.0.0.1:${port}`;
const origin = `http://${address}`;
const maxImageBytes = 10 * 1024 * 1024;
const maxRequestBytes = Math.ceil(maxImageBytes / 3) * 4 + 256_000;
const fields = {
  projets: ['nom', 'categorie', 'annee', 'imageAlt', 'accroche', 'description', 'livrables'],
  oeuvres: ['titre', 'sousTitre', 'description', 'categorie', 'alt', 'materiel', 'annee'],
};
const projectCategories = ['Identité visuelle', 'UI / UX', 'Web design', 'Illustration / Animation'];
const pages = new Map([
  ['/', ['admin.html', 'text/html; charset=utf-8']],
  ['/admin-ui.mjs', ['admin-ui.mjs', 'text/javascript; charset=utf-8']],
  ['/fairy.png', ['../public/images/illustrations/fees/fee-4.png', 'image/png']],
  ['/star.svg', ['../public/images/commun/curseurs/etoile.svg', 'image/svg+xml']],
  ['/dm-sans.woff2', ['../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2', 'font/woff2']],
  ['/space-grotesk.woff2', ['../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2', 'font/woff2']],
  ['/handwritten.woff2', ['../node_modules/@fontsource/just-me-again-down-here/files/just-me-again-down-here-latin-400-normal.woff2', 'font/woff2']],
]);

createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
  const send = (status, data, type = 'application/json; charset=utf-8') => {
    response.writeHead(status, { 'Content-Type': type });
    response.end(type.startsWith('application/json') ? JSON.stringify(data) : data);
  };

  if (request.headers.host !== address) return send(403, { error: 'Adresse locale requise.' });

  try {
    const page = pages.get(request.url);
    if (page && request.method === 'GET') {
      return send(200, await readFile(new URL(page[0], import.meta.url)), page[1]);
    }

    const match = /^\/api\/(projets|oeuvres)$/.exec(request.url);
    if (!match) return send(404, { error: 'Page introuvable.' });
    const [, collection] = match;
    if (request.method === 'GET') {
      return send(200, listEntries(collection));
    }
    const creating = collection === 'projets' && request.method === 'POST';
    if (request.method !== 'PUT' && !creating) return send(405, { error: 'Méthode non autorisée.' });
    if (request.headers.origin !== origin || request.headers['content-type'] !== 'application/json') {
      return send(403, { error: 'Enregistrement réservé à cette interface locale.' });
    }

    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
      size += chunk.length;
      if (size > maxRequestBytes) return send(413, { error: 'Image trop volumineuse (10 Mo maximum).' });
      chunks.push(chunk);
    }

    let input;
    try {
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      return send(400, { error: 'Données illisibles.' });
    }
    const { id, values, original, image } = input ?? {};
    if (!creating && typeof id !== 'string') return send(400, { error: 'Identifiant manquant.' });
    if (!values || !fields[collection].every((field) => typeof values[field] === 'string' && values[field].length <= 5000)) {
      return send(400, { error: 'Champs invalides.' });
    }
    const required = collection === 'projets' ? ['nom', 'categorie', 'imageAlt'] : ['titre', 'categorie', 'alt'];
    if (creating) required.push('description', 'annee');
    if (required.some((field) => !values[field].trim()) ||
        (collection === 'oeuvres' && !['Dessin', 'Peinture', 'Autre'].includes(values.categorie))) {
      return send(400, { error: 'Vérifie les champs obligatoires et la catégorie.' });
    }
    const slug = creating && values.nom
      .normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').slice(0, 80).replace(/^-+|-+$/g, '');
    if (creating && (!slug || !image)) {
      return send(400, { error: 'Choisis un nom contenant une lettre ou un chiffre et ajoute une couverture.' });
    }

    let webp;
    if (image !== undefined) {
      if (typeof image !== 'string' || !image) return send(400, { error: 'Image illisible.' });
      const bytes = Buffer.from(image, 'base64');
      if (bytes.length > maxImageBytes) return send(413, { error: 'Image trop volumineuse (10 Mo maximum).' });
      try {
        const source = sharp(bytes, { limitInputPixels: 40_000_000 });
        const { format, pages = 1 } = await source.metadata();
        if (!['jpeg', 'png', 'webp'].includes(format) || pages !== 1) {
          return send(400, { error: 'Choisis une image JPG, PNG ou WebP fixe.' });
        }
        webp = await source.rotate().resize({
          width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true,
        }).webp({ quality: 90 }).toBuffer();
      } catch {
        return send(400, { error: 'Image illisible ou supérieure à 40 mégapixels.' });
      }
    }

    let pendingImage;
    let imagePath;
    const database = openDatabase(false);
    let transaction = false;
    try {
      if (webp) {
        const folder = collection === 'projets' ? 'projets' : 'atelier';
        imagePath = `/images/${folder}/import-${randomUUID()}.webp`;
        const target = new URL(`../public${imagePath}`, import.meta.url);
        await writeFile(target, webp, { flag: 'wx' });
        pendingImage = target;
      }
      database.exec('BEGIN IMMEDIATE');
      transaction = true;
      const current = findEntry(database, collection, creating ? slug : id);
      if (creating && current) {
        return send(409, { error: 'Un projet utilise déjà ce nom dans son adresse. Choisis un nom plus distinct.' });
      }
      const entry = creating
        ? { id: slug, style: 'standard', generated: true }
        : current;
      if (!entry) return send(404, { error: 'Élément introuvable.' });
      if (entry.generated && (!projectCategories.includes(values.categorie) ||
          !values.annee.trim() || !values.description.trim())) {
        return send(400, { error: 'Renseigne une catégorie, une année ou un contexte et une description.' });
      }
      if (!creating && JSON.stringify(entry) !== JSON.stringify(original)) {
        return send(409, { error: 'Cet élément a changé. Copie ta saisie puis recharge la page.' });
      }
      for (const field of fields[collection]) {
        const value = values[field].trim();
        entry[field] = field === 'materiel' ? value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) : value;
      }
      if (imagePath) entry[collection === 'projets' ? 'cover' : 'image'] = imagePath;
      saveEntry(database, collection, entry, creating);
      const saved = findEntry(database, collection, entry.id);
      database.exec('COMMIT');
      transaction = false;
      pendingImage = undefined;
      return send(creating ? 201 : 200, saved);
    } finally {
      try {
        if (transaction) database.exec('ROLLBACK');
      } finally {
        database.close();
        if (pendingImage) await unlink(pendingImage).catch(console.error);
      }
    }
  } catch (error) {
    console.error(error);
    send(500, { error: 'Impossible d’accéder aux données du portfolio.' });
  }
}).listen(port, '127.0.0.1', () => console.log(`Back-office disponible sur ${origin}/`));
