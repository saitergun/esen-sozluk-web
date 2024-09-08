import { Metadata } from 'next/types'

const title = 'esen sözlük'
const description = 'Türkçe sözlük uygulaması'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL as string),

  generator: 'Next.js',

  category: 'Dictionary',
  applicationName: title,

  title: {
    template: '%s / esen sözlük',
    default: title,
  },

  description,

  keywords: [
    'Türkçe',
    'Türkçe sözlük',
    'sözlük',
    'anlamı',
    'ne demek',
    'atasözü',
    'deyim',
  ],

  creator: 'Sait Ergün',
  publisher: 'Sait Ergün',

  authors: [{ name: 'Sait Ergün', url: 'https://twitter.com/saitdev' }],

  verification: {
    me: '@saitdev',
  },

  openGraph: {
    type: 'website',
    countryName: 'Türkiye',
    siteName: title,
    description,
    url: process.env.BASE_URL,
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@saitdev',
    creator: '@saitdev',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}
