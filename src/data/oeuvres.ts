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
    id: 'poisson-lion',
    titre: 'Poisson-lion',
    sousTitre: 'Une étude réaliste à l’encre et à l’aquarelle.',
    description:
      'Un poisson-lion réalisé dans un style réaliste, en associant l’encre et l’aquarelle.',
    categorie: 'Peinture',
    image: '/images/atelier/poisson-lion.jpeg',
    alt: 'Poisson-lion aux nageoires déployées, dans des tons bruns et bleutés sur fond blanc.',
    materiel: ['Encre', 'Aquarelle'],
  },
  {
    id: 'after-fight',
    titre: 'After Fight',
    sousTitre: 'Un personnage au stylo noir fin et aux crayons de couleur.',
    description:
      'Un portrait de personnage dessiné au stylo noir fin et mis en couleur aux crayons de couleur.',
    categorie: 'Dessin',
    image: '/images/atelier/after-fight.jpeg',
    alt: 'Portrait d’un personnage aux cheveux clairs, portant de petites lunettes, avec des marques sur le visage.',
    materiel: ['Stylo noir fin', 'Crayons de couleur'],
  },
  {
    id: 'chouette',
    titre: 'La chouette',
    sousTitre: 'Un dessin au crayon de papier gras.',
    description:
      'Une chouette réalisée au crayon de papier gras. Ce dessin a été particulièrement difficile à réaliser pour moi.',
    categorie: 'Dessin',
    image: '/images/atelier/chouette-realiste.jpeg',
    alt: 'Chouette perchée sur une branche, dessinée en nuances de gris.',
    materiel: ['Crayon de papier gras'],
  },
  {
    id: 'foret',
    titre: 'Forêt',
    sousTitre: 'Un lettrage inspiré du street art.',
    description:
      'Un travail de lettrage dans un style street art, réalisé à l’encre de Chine et à l’encre de couleur.',
    categorie: 'Dessin',
    image: '/images/atelier/foret.jpeg',
    alt: 'Lettrage Forêt aux contours noirs, avec des couleurs orange, jaunes et roses et de petites toiles d’araignée.',
    materiel: ['Encre de Chine', 'Encre de couleur'],
  },
  {
    id: 'le-coeur-de-la-foret',
    titre: 'Le cœur de la forêt',
    sousTitre: 'Le lien entre les arbres et les êtres humains.',
    description:
      'Avec cette création, je voulais parler des arbres comme êtres vivants et de leur lien étroit avec les êtres humains. L’encre de Chine et l’encre de couleur créent un contraste entre le fond noir, les branches et le cœur.',
    categorie: 'Peinture',
    image: '/images/atelier/le-coeur-de-la-foret.jpeg',
    alt: 'Un cœur entouré de branches et de formes végétales colorées sur un fond noir.',
    materiel: ['Encre de Chine', 'Encre de couleur'],
  },
  {
    id: 'smoke',
    titre: 'Smoke',
    sousTitre: 'Un chat à trois yeux, une interprétation ouverte.',
    description:
      'Un chat à trois yeux qui fume, dans une ambiance mystérieuse. Je laisse à chacun la liberté de l’interpréter.',
    categorie: 'Dessin',
    image: '/images/atelier/smoke.jpeg',
    alt: 'Chat à trois yeux en costume et cravate rouge, fumant au milieu de volutes de fumée.',
    materiel: [],
  },
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
