import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import handler from '../.netlify/v1/functions/ssr/ssr.mjs';
const root = path.resolve('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};
// Local verification of the actual Netlify build; no forms are submitted.
export async function render(request) {
  const url = new URL(request.url);
  if (url.pathname === '/.netlify/images') {
    // Local equivalent of Netlify Image CDN, used only by audit/tests.
    const source = url.searchParams.get('url');
    const file = path.resolve(root, './' + (source || '').replace(/^\//, ''));
    if (!source || !file.startsWith(root + path.sep)) return new Response(null, { status: 400 });
    const format = url.searchParams.get('fm') === 'png' ? 'png' : 'webp';
    const buffer = await sharp(await readFile(file))
      .resize({
        width: Number(url.searchParams.get('w')) || undefined,
        height: Number(url.searchParams.get('h')) || undefined,
        fit: 'inside',
      })
      .toFormat(format)
      .toBuffer();
    return new Response(buffer, { headers: { 'Content-Type': 'image/' + format } });
  }
  const pathname = decodeURIComponent(url.pathname);
  const file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep))
    return new Response(null, { status: 403 });
  if ((await stat(file).catch(() => null))?.isFile()) {
    return new Response(await readFile(file), {
      headers: { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' },
    });
  }
  return handler(request, { ip: '127.0.0.1' });
}
