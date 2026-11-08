import { projectAssets } from './project-assets';
export const projets = [
  {
    id: 'feelm',
    nom: 'Feelm',
    categorie: 'UI / UX · Plateforme VOD',
    annee: 'BUT MMI',
    image: projectAssets.feelm.mockup,
    style: 'feelm',
    accroche: 'Voir des films ensemble et en discuter.',
    description:
      'Concept de plateforme VOD pour cinéphiles : séances programmées, clubs et forum de discussion.',
    livrables: 'Conception UX/UI · Identité visuelle · Dossier de présentation',
  },
  {
    id: 'solaire',
    nom: 'Solaire',
    categorie: 'Identité visuelle · UI / UX',
    annee: 'BUT MMI',
    image: projectAssets.solaire.mockup,
    style: 'solaire',
    accroche: 'Un regard sur les vacances, une expérience à personnaliser.',
    description:
      'Identité visuelle et prototype Figma d’un configurateur de lunettes, à partir d’un persona imposé.',
    livrables: 'Recherche UX · Identité visuelle · Illustrations vectorielles · Prototype Figma',
  },
  {
    id: 'tiktak',
    nom: 'TiK•TaK',
    categorie: 'UI / UX · Développement web',
    annee: 'BUT MMI',
    image: projectAssets.tiktak.moodboard,
    style: 'tiktak',
    accroche: 'Une montre à composer, un style à soi.',
    description:
      'Un projet de site de montres personnalisables, présenté à travers sa maquette Figma et son interface web.',
    livrables: 'Prototype Figma · Interface web · Configurateur de montres',
  },
  {
    id: 'olyvia',
    nom: 'Olyvia',
    categorie: 'Identité visuelle · Site web',
    annee: '2026',
    image: projectAssets.olyvia.moodboard,
    style: 'olyvia',
    accroche: 'Un regard doux sur une nouvelle étape.',
    description:
      'Une identité douce et naturelle pour un site d’information sur la ménopause. Dans ce projet collectif, j’ai créé le logo, ses déclinaisons et les supports de communication.',
    livrables: 'Logo · Identité visuelle · Supports de communication · Goodies',
  },
  {
    id: 'nunc',
    nom: 'NŨNC',
    categorie: 'Identité visuelle · Application',
    annee: '2026',
    image: projectAssets.nunc.moodboard,
    style: 'nunc',
    accroche: 'Les bonnes soirées commencent ici.',
    description:
      'Une webapp pensée pour organiser des soirées entre amis en toute sécurité. Une identité chaleureuse et expressive, déclinée en maquettes et supports graphiques.',
    livrables: 'Identité visuelle · Maquettes · Supports graphiques',
  },
  {
    id: 'lumimix',
    nom: 'LUMIMIX',
    categorie: 'Développement web · Festival électro',
    annee: '2026',
    image: projectAssets.lumimix.moodboard,
    style: 'lumimix',
    accroche: 'Faire vibrer la lumière et le son.',
    description:
      'Le développement d’un site de festival électro avec Astro, Tailwind CSS et PocketBase. J’ai adapté la maquette mobile en desktop et intégré les contenus dynamiques du festival.',
    livrables: 'Adaptation desktop · Développement responsive · Intégration PocketBase',
  },
  {
    id: 'bordeaux-surchauffe',
    nom: 'Bordeaux Surchauffe',
    categorie: 'Datavisualisation · Développement web',
    annee: '2026',
    image: projectAssets.bordeaux.moodboard,
    style: 'bordeaux',
    accroche: 'Comprendre la chaleur à l’échelle de sa commune.',
    description:
      'Un site réalisé en binôme pour comparer la chaleur dans les 28 communes de Bordeaux Métropole, avec des cartes et des graphiques.',
    livrables: 'Récit en données · Cartographie · Visualisations · Site web',
  },
];

// La galerie peut évoluer sans modifier la sélection de l’accueil.
export const projetsAccueil = projets.filter((projet) =>
  ['olyvia', 'nunc', 'lumimix'].includes(projet.id),
);
