// ===== IMAGES : APERCU DISCORD AVEC FEE-4 UNIQUEMENT =====
// Redimensionne le dessin sans le couper ni le retoucher ; l’original reste inchangé.
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const preview = JSON.parse(
  await readFile(new URL('../src/data/social-preview.json', import.meta.url), 'utf8'),
);
const source = path.join(root, 'public', preview.source.replace(/^\//, ''));
const output = path.join(root, 'public', preview.path.replace(/^\//, ''));
const { data, info } = await sharp(source)
  .trim({ threshold: 0 })
  .resize({
    width: preview.width - 100,
    height: preview.height - 64,
    fit: 'inside',
    withoutEnlargement: true,
  })
  .png()
  .toBuffer({ resolveWithObject: true });
const background =
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${preview.width}" height="${preview.height}">
  <defs><linearGradient id="bg"><stop stop-color="#25070e"/><stop offset="1" stop-color="#321b40"/></linearGradient>
  <radialGradient id="glow"><stop stop-color="#eba7bf" stop-opacity=".15"/><stop offset="1" stop-color="#eba7bf" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#bg)"/><ellipse cx="600" cy="315" rx="420" ry="310" fill="url(#glow)"/>
</svg>`);
await sharp(background)
  .composite([
    {
      input: data,
      left: Math.floor((preview.width - info.width) / 2),
      top: Math.floor((preview.height - info.height) / 2),
    },
  ])
  .flatten({ background: '#25070e' })
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(
  `Aperçu fee-4 : ${preview.path}, ${preview.width} × ${preview.height}, ${Math.round((await stat(output)).size / 1024)} Kio.`,
);
