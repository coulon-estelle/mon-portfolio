import { listEntries } from './database.mjs';
import { projectAssets } from './project-assets';
import type { ImageMetadata } from 'astro';

const importedCovers = import.meta.glob<ImageMetadata>('/public/images/projets/import-*.webp', {
  eager: true,
  import: 'default',
});
interface Project {
  id: string;
  nom: string;
  categorie: string;
  annee: string;
  imageAlt: string;
  style: string;
  accroche: string;
  description: string;
  livrables: string;
  cover: string | null;
  generated: boolean;
}

const images = {
  'portfolio': projectAssets.portfolio.fairies,
  'dnd': projectAssets.dnd.offire,
  'feelm': projectAssets.feelm.mockup,
  'solaire': projectAssets.solaire.mockup,
  'tiktak': projectAssets.tiktak.moodboard,
  'olyvia': projectAssets.olyvia.moodboard,
  'nunc': projectAssets.nunc.moodboard,
  'lumimix': projectAssets.lumimix.moodboard,
  'bordeaux-surchauffe': projectAssets.bordeaux.moodboard,
};

export const projets = (listEntries('projets') as Project[]).map((projet) => ({
  ...projet,
  image: (projet.cover ? importedCovers[`/public${projet.cover}`] : undefined)
    ?? images[projet.id as keyof typeof images],
}));

// La galerie peut évoluer sans modifier la sélection de l’accueil.
// ===== PROJETS : SELECTION PRINCIPALE =====
// Conserve Olyvia, NŨNC et Lumimix pour la galerie de l’accueil.
export const projetsAccueil = projets.filter((projet) =>
  ['olyvia', 'nunc', 'lumimix'].includes(projet.id),
);
