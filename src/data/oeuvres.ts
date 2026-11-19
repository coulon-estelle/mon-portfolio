import { listEntries } from './database.mjs';

export interface Oeuvre {
  id: string;
  titre: string;
  sousTitre: string;
  description: string | null;
  categorie: 'Dessin' | 'Peinture' | 'Autre';
  // Chemin depuis public/, par exemple /images/oeuvres/mon-dessin.webp
  image: string;
  alt: string;
  materiel: string[];
  annee: string | null;
}

export const oeuvres = listEntries('oeuvres') as Oeuvre[];
