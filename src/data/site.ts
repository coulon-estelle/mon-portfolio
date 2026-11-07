// Liens fournis par Estelle. Hébergeur prévu : Netlify.
// Adresse : https://www.netlify.com/legal/terms-of-use/ (vérifiée le 28/10/2026).
// Les variables PUBLIC_ sont publiques et ne doivent contenir aucun secret.
export const site = {
  name: 'Estelle Coulon',
  email: 'estellecoulon6@gmail.com',
  phone: '+33 7 68 36 41 57',
  phoneHref: '+33768364157',
  location: 'Pont-de-Roide, Franche-Comté',
  url: import.meta.env.PUBLIC_SITE_URL || '',
  linkedin:
    import.meta.env.PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/estelle-coulon-6b31b8328/',
  creativeNetwork:
    import.meta.env.PUBLIC_CREATIVE_NETWORK_URL || 'https://www.behance.net/estellecoulon2',
  creativeNetworkName: import.meta.env.PUBLIC_CREATIVE_NETWORK_NAME || 'Behance',
  host: {
    name: import.meta.env.PUBLIC_HOST_NAME || 'Netlify, Inc.',
    address:
      import.meta.env.PUBLIC_HOST_ADDRESS || '101 2nd Street, San Francisco, CA 94105, États-Unis',
    phone: import.meta.env.PUBLIC_HOST_PHONE || '',
  },
};
