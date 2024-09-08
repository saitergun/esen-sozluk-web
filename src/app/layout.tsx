import '@/styles/css/tailwind.css'

import { Crimson_Pro } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { Modernizr } from '@/components'

const crimsonPro = Crimson_Pro({ subsets: ['latin-ext'] })

export { metadata } from './layout.metadata'
export { viewport } from './layout.viewport'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="tr"
      className="no-touch"
    >
      <head>
        <Modernizr />
      </head>

      <body style={crimsonPro.style}>{children}</body>

      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics gaId={process.env.GA_ID} />
      )}
    </html>
  )
}
