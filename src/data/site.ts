// Domaine, hébergeur et liens confirmés par Estelle.
// Les variables PUBLIC_ sont publiques et ne doivent contenir aucun secret.
export const site = {
  name: 'Estelle Coulon',
  email: 'estellecoulon6@gmail.com',
  cv: '/CV_alternance_2026.pdf',
  phone: '+33 7 68 36 41 57',
  phoneHref: '+33768364157',
  location: 'Pont-de-Roide, Franche-Comté',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://portfolio.estelle-coulon.fr/',
  linkedin:
    import.meta.env.PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/estelle-coulon-6b31b8328/',
  creativeNetwork:
    import.meta.env.PUBLIC_CREATIVE_NETWORK_URL || 'https://www.behance.net/estellecoulon2',
  creativeNetworkName: import.meta.env.PUBLIC_CREATIVE_NETWORK_NAME || 'Behance',
  host: {
    name: import.meta.env.PUBLIC_HOST_NAME || 'Infomaniak Network SA',
    address:
      import.meta.env.PUBLIC_HOST_ADDRESS ||
      'Rue Eugène Marziano 25, 1227 Les Acacias (GE), Suisse',
    phone: import.meta.env.PUBLIC_HOST_PHONE || '',
  },
};
