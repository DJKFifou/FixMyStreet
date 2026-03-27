import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FixMyStreet',
    id: '/',
    short_name: 'FMS',
    description: 'Plateforme de signalement de problèmes de circulation urbaine.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0511f2',
    theme_color: '#0511f2',
    icons: [
      {
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
    ],
    screenshots: [
      {
        src: 'screenshots/desktop.png',
        sizes: '3024x1644',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Page d\'accueil affichant le formulaire de signalements'
      },
      {
        src: 'screenshots/mobile.png',
        sizes: '604x1304',
        type: 'image/png',
        label: 'Page d\'accueil affichant le formulaire de signalements'
      }
    ]
  }
}
