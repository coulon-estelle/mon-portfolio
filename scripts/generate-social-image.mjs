// ===== IMAGES : VISUEL DE PARTAGE DU PORTFOLIO =====
// Compose une image JPEG avec les dessins et les polices existants, sans génération par IA.
// À relancer avec node scripts/generate-social-image.mjs pour modifier l’aperçu.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const asset = async (file, type = 'image/png') =>
  `data:${type};base64,${(await readFile(new URL(file, import.meta.url))).toString('base64')}`;
const [fairy, moon, star, handwriting, bodyFont] = await Promise.all([
  asset('../public/images/illustrations/fees/fee-4.png'),
  asset('../public/images/illustrations/lunes/lune-bleue.png'),
  asset('../public/images/illustrations/etoiles/etoile-rose.png'),
  asset(
    '../node_modules/@fontsource/just-me-again-down-here/files/just-me-again-down-here-latin-400-normal.woff2',
    'font/woff2',
  ),
  asset('../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2', 'font/woff2'),
]);

// ===== PERFORMANCE : IMAGE STATIQUE POUR LES APERCUS =====
// Le JPEG est enregistré dans public et servi directement ; aucun navigateur n’est lancé en production.
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
    @font-face { font-family: Hand; src: url('${handwriting}') format('woff2'); }
    @font-face { font-family: Body; src: url('${bodyFont}') format('woff2'); }
    * { box-sizing: border-box; }
    body { margin: 0; width: 1200px; height: 630px; overflow: hidden; color: #f8ede9; font-family: Body, sans-serif;
      background: radial-gradient(ellipse at 88% 45%, #74446580, transparent 57%), linear-gradient(115deg, #25070e, #321b40); }
    .frame { position: absolute; inset: 23px; border: 1px solid #eba7bf55; border-radius: 26px; }
    .copy { position: absolute; left: 80px; top: 76px; z-index: 2; }
    .label { margin: 0 0 22px; color: #eba7bf; letter-spacing: 4px; font-size: 17px; }
    h1 { font: 400 112px/0.95 Hand; margin: 0 0 28px; }
    h1 span { color: #eba7bf; }
    .description { margin: 0; font-size: 22px; line-height: 1.65; color: #e4cbd9; }
    .address { position: absolute; left: 80px; bottom: 61px; color: #c5a9b1; font-size: 17px; }
    .fairy { position: absolute; right: 96px; top: 58px; width: 365px; height: 510px; object-fit: contain; z-index: 1; filter: drop-shadow(0 20px 30px #15051b66); }
    .moon { position: absolute; right: 64px; top: 58px; width: 265px; opacity: 0.65; rotate: 12deg; }
    .star { position: absolute; width: 50px; object-fit: contain; }
    .one { left: 578px; top: 110px; rotate: -12deg; }
    .two { right: 65px; bottom: 76px; width: 42px; rotate: 18deg; }
    .dot { position: absolute; color: #c6a5db; font-size: 20px; }
  </style></head><body>
    <div class="frame"></div>
    <div class="copy"><p class="label">ARTISTE & DESIGN</p><h1>Estelle<br><span>Coulon.</span></h1>
    <p class="description">Illustration · Design graphique · Web<br>Bienvenue dans mon univers créatif.</p></div>
    <img class="moon" src="${moon}" alt=""><img class="fairy" src="${fairy}" alt="">
    <img class="star one" src="${star}" alt=""><img class="star two" src="${star}" alt="">
    <span class="dot" style="left:640px;top:440px">✧</span><span class="dot" style="right:107px;top:44px">✧</span>
    <span class="address">portfolio.estelle-coulon.fr</span>
  </body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (img) => img.decode()));
  });
  await page.screenshot({
    path: fileURLToPath(new URL('../public/images/partage-portfolio.jpg', import.meta.url)),
    type: 'jpeg',
    quality: 92,
  });
  console.log('Image créée : public/images/partage-portfolio.jpg (1200 × 630).');
} finally {
  await browser.close();
}
