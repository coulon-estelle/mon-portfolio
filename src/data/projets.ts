import { projectAssets } from './project-assets';
export const projets = [
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
      'Un site réalisé à deux pour comprendre où il fait le plus chaud à Bordeaux Métropole. Des cartes et des graphiques permettent de comparer les 28 communes et de voir quels habitants sont les plus exposés.',
    livrables: 'Récit en données · Cartographie · Visualisations · Site web',
  },
];

// La galerie peut évoluer sans modifier la sélection de l’accueil.
export const projetsAccueil = projets.filter((projet) => projet.id !== 'bordeaux-surchauffe');
