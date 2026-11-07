import olyviaMoodboard from '../../public/images/projets/olyvia/moodboard.png';
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
