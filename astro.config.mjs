// @ts-check
// ===== DEPLOIEMENT : BUILD STATIQUE ASTRO =====
// Configure le domaine et la génération des fichiers statiques dans dist.

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://portfolio.estelle-coulon.fr/',
  output: 'static',
});
