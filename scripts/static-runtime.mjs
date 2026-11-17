// ===== TESTS : LECTURE DU SITE STATIQUE =====
// Lit les fichiers de dist pour les tests locaux ; ne constitue pas le serveur de production.
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

// Sert uniquement les fichiers du build statique pour l’audit et les tests locaux.
export async function render(request) {
  if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405 });
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url).pathname);
  } catch {
    return new Response(null, { status: 400 });
  }
  // ===== SECURITE : LIMITATION AU DOSSIER DIST =====
  // Refuse les chemins résolus à l’extérieur du build statique.
  const file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep))
    return new Response(null, { status: 403 });
  // ===== NAVIGATION : RESOLUTION DES PAGES STATIQUES =====
  // Cherche le fichier demandé puis son index.html, sinon renvoie la page 404.
  const candidates = [file, path.join(file, 'index.html')];
  for (const candidate of candidates) {
    if (!(await stat(candidate).catch(() => null))?.isFile()) continue;
    return new Response(request.method === 'HEAD' ? null : await readFile(candidate), {
      status: path.basename(candidate) === '404.html' ? 404 : 200,
      headers: { 'Content-Type': types[path.extname(candidate)] || 'application/octet-stream' },
    });
  }
  return new Response(
    request.method === 'HEAD' ? null : await readFile(path.join(root, '404.html')),
    {
      status: 404,
      headers: { 'Content-Type': types['.html'] },
    },
  );
}
