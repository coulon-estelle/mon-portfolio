export interface Oeuvre {
  id: string;
  titre: string;
  sousTitre: string;
  description?: string;
  categorie: 'Dessin' | 'Peinture' | 'Autre';
  // Chemin depuis public/, par exemple /images/oeuvres/mon-dessin.webp
  image: string;
  alt: string;
  materiel: string[];
  annee?: string;
}

// Présentations et matériel rédigés à partir des précisions d’Estelle.
export const oeuvres: Oeuvre[] = [
  {
    id: 'alice',
    titre: 'Alice',
    sousTitre: 'Inspiré d’Alice au pays des merveilles et d’Ophélie.',
    description:
      'Ce dessin associe deux références : Alice au pays des merveilles de Disney et le tableau Ophélie de John Everett Millais. Je me suis inspirée de ces deux œuvres pour composer ma propre scène autour d’Alice.\n\nOn y retrouve notamment Alice, le chat, le lapin et la chenille, dans un décor de forêt. J’ai réalisé le dessin aux crayons de couleur et au stylo noir fin, en mêlant des zones colorées à des détails tracés en noir.',
    categorie: 'Dessin',
    image: '/images/atelier/alice.jpeg',
    alt: 'Alice entourée du chat, du lapin et de la chenille dans une forêt dessinée et colorée.',
    materiel: ['Crayons de couleur', 'Stylo noir fin'],
  },
  {
    id: 'enzo',
    titre: 'Bathroom Nightmare',
    sousTitre: 'Affiche A5 de mon personnage original, Enzo.',
    description:
      'Bathroom Nightmare est une affiche au format A5. Elle représente Enzo dans sa salle de bains. C’est mon OC, pour « original character » : un personnage que j’ai créé.\n\nPour cette œuvre, j’ai utilisé plusieurs matériaux : du feutre, de l’aquarelle, de la craie, des crayons de couleur, du stylo noir et des stylos de couleur. Le dessin réunit le personnage et un décor rempli de détails, de motifs et d’inscriptions.\n\nCette affiche m’a demandé énormément de temps. C’est celle que je considère comme ma meilleure œuvre à ce jour. Dans la liste du matériel, je pourrais presque ajouter « beaucoup de temps » !',
    categorie: 'Dessin',
    image: '/images/atelier/bathroom-nightmare.jpeg',
    alt: 'Personnage tatoué dans une salle de bains, entouré de motifs et de couleurs.',
    materiel: [
      'Feutres',
      'Aquarelle',
      'Craie',
      'Crayons de couleur',
      'Stylo noir',
      'Stylos de couleur',
    ],
  },
  {
    id: 'gorillaz',
    titre: 'Gorillaz',
    sousTitre: 'Le chanteur de Gorillaz, dessiné de profil.',
    description:
      'Pour ce portrait, je me suis inspirée d’une pochette d’album du groupe Gorillaz. J’ai dessiné le chanteur de profil en le réinterprétant dans mon propre style.\n\nJ’ai utilisé des crayons de couleur et un stylo noir fin. Le portrait reprend notamment ses cheveux bleus et son bonnet, avec des contours et des détails dessinés en noir.',
    categorie: 'Dessin',
    image: '/images/atelier/gorillaz.jpeg',
    alt: 'Portrait de profil d’un personnage aux cheveux bleus portant un bonnet brun.',
    materiel: ['Crayons de couleur', 'Stylo noir fin'],
  },
  {
    id: 'loup',
    titre: 'Loup',
    sousTitre: 'Reproduction d’après une image de loup.',
    description:
      'Ce loup est une reproduction réalisée à partir d’une image de référence. Je me suis appuyée sur cette image pour dessiner l’animal, puis je l’ai peint au brou de noix.\n\nPour tracer les contours et les détails, j’ai utilisé un stylo de la même couleur que l’encre. La peinture et le dessin au stylo se retrouvent ainsi dans les mêmes tons bruns.',
    categorie: 'Dessin',
    image: '/images/atelier/loup.jpeg',
    alt: 'Loup vu de face en mouvement, dans des tons ocre et bruns sur fond blanc.',
    materiel: ['Brou de noix', 'Stylo assorti à l’encre'],
  },
  {
    id: 'vague',
    titre: 'La vague',
    sousTitre: 'Inspiré de La Grande Vague de Kanagawa de Hokusai.',
    description:
      'Cette création est inspirée de La Grande Vague de Kanagawa, l’estampe de l’artiste japonais Katsushika Hokusai. J’en ai repris le motif de la vague dans une composition circulaire.\n\nJ’ai dessiné la vague et ses détails au stylo noir fin. J’ai ensuite réalisé un travail à l’aquarelle autour du cercle, avec des touches bleues qui prolongent le dessin sur la feuille.',
    categorie: 'Dessin',
    image: '/images/atelier/vague.jpeg',
    alt: 'Vague dessinée en noir dans un cercle, entourée de touches bleues sur papier blanc.',
    materiel: ['Stylo noir fin', 'Aquarelle'],
  },
];
