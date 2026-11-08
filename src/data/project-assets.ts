import olyviaMoodboard from '../../public/images/projets/olyvia/moodboard.png';
import feelmMoodboard from '../../public/images/projets/feelm/moodboard-feelm.png';
import feelmMockup from '../../public/images/projets/feelm/mockup-feelm.png';
import solaireBrandboard from '../../public/images/projets/solaire/Brandboard-solaire.png';
import solaireJourney from '../../public/images/projets/solaire/journee-type-solaire.png';
import solaireMockup from '../../public/images/projets/solaire/mockup-solaire.png';
import tiktakMoodboard from '../../public/images/projets/TikTak/moodboard-tiktak.png';
import tiktakSite from '../../public/images/projets/TikTak/mockup-site-tiktak.png';
import tiktakPrototype from '../../public/images/projets/TikTak/mockup-prototype-tiktak.png';
import olyviaLogo from '../../public/images/projets/olyvia/logo.png';
import olyviaMobile from '../../public/images/projets/olyvia/mockup-mobile.png';
import olyviaDesktop from '../../public/images/projets/olyvia/mockup-desktop.png';
import nuncMoodboard from '../../public/images/projets/nunc/moodboard.png';
import nuncLogoLight from '../../public/images/projets/nunc/logo-clair.png';
import nuncLogoColor from '../../public/images/projets/nunc/logo-couleur.png';
import nuncHome from '../../public/images/projets/nunc/mockup-accueil.png';
import nuncApp from '../../public/images/projets/nunc/mockup-application.png';
import lumimixMoodboard from '../../public/images/projets/lumimix/moodboard.png';
import lumimixLogo from '../../public/images/projets/lumimix/logo.png';
import lumimixMobile from '../../public/images/projets/lumimix/mockup-mobile.png';
import bordeauxMoodboard from '../../public/images/projets/bordeaux-surchauffe/moodboard-bordeaux-surchauffe.png';
import bordeauxLogo from '../../public/images/projets/bordeaux-surchauffe/Logo-bordeaux-surchauffe.png';
import bordeauxMockup from '../../public/images/projets/bordeaux-surchauffe/mockup-bordeaux-surchauffe.png';

// Une seule source pour les cartes et les études de cas.
export const projectAssets = {
  feelm: {
    moodboard: feelmMoodboard,
    mockup: feelmMockup,
    logo: '/images/projets/feelm/logo-feelm.svg',
    pdf: '/images/projets/feelm/rendu-feelm.pdf',
    research: [
      '/images/projets/feelm/reccherche-01-feelm.svg',
      '/images/projets/feelm/recherche-02-feelm.svg',
      '/images/projets/feelm/recherche-03-feelm.svg',
    ],
  },
  solaire: {
    brandboard: solaireBrandboard,
    journey: solaireJourney,
    mockup: solaireMockup,
    logo: '/images/projets/solaire/logo-sombre-solaire.svg',
    icon: '/images/projets/solaire/icon-solaire.svg',
    research: [
      '/images/projets/solaire/recherche-logo-1.svg',
      '/images/projets/solaire/recherche-logo-2.svg',
    ],
  },
  tiktak: {
    moodboard: tiktakMoodboard,
    site: tiktakSite,
    prototype: tiktakPrototype,
    logo: '/images/projets/TikTak/logo-tiktak.svg',
    icon: '/images/projets/TikTak/icon-tiktak.svg',
  },
  bordeaux: { moodboard: bordeauxMoodboard, logo: bordeauxLogo, mockup: bordeauxMockup },
  olyvia: {
    moodboard: olyviaMoodboard,
    logo: olyviaLogo,
    mobile: olyviaMobile,
    desktop: olyviaDesktop,
    icon: '/images/projets/olyvia/icone.svg',
  },
  nunc: {
    moodboard: nuncMoodboard,
    logo: nuncLogoLight,
    colorLogo: nuncLogoColor,
    home: nuncHome,
    app: nuncApp,
    icon: '/images/projets/nunc/icone.svg',
  },
  lumimix: { moodboard: lumimixMoodboard, logo: lumimixLogo, mobile: lumimixMobile },
};
