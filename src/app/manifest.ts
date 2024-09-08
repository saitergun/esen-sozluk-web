import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/?utm_source=standalone',
    name: 'esen sözlük',
    short_name: 'esen sözlük',
    description: 'Türkçe sözlük uygulaması',
    start_url: '/?utm_source=standalone',
    display: 'standalone',
    background_color: '#f6f7f7',
    theme_color: '#00b5e6',
    orientation: 'portrait',
    lang: 'tr-TR',
    icons: [
      {
        src: 'img/favicon.36.png',
        sizes: '36x36',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'img/favicon.48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'img/favicon.72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'img/favicon.96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'img/favicon.144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'img/favicon.192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'img/favicon.512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: 'img/screenshot-an-1474x1414.png',
        sizes: '1474x1414',
        type: 'image/png',
      },
      {
        src: 'img/screenshot-feldmaresal-1474x1414.png',
        sizes: '1474x1414',
        type: 'image/png',
      },
      {
        src: 'img/screenshot-istiklal-720x1200.png',
        sizes: '720x1200',
        type: 'image/png',
      },
      {
        src: 'img/screenshot-istiklal-1414x1414.png',
        sizes: '1414x1414',
        type: 'image/png',
      },

      {
        src: 'img/screenshot-turku-1100x1414.png',
        sizes: '1100x1414',
        type: 'image/png',
      },
    ],
  }
}
