import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PWARegister from '@/components/PWARegister'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ofklass - Interactive Math Learning',
  description: 'Interactive math learning platform with AI-powered quizzes and flashcards for grades 3-8',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ofklass',
  },
  icons: {
    icon: [
      { url: '/assets/offklass.png', sizes: 'any', type: 'image/png' },
      { url: '/assets/offklass.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/offklass.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/offklass.png', sizes: '180x180', type: 'image/png' },
      { url: '/assets/offklass.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [
      { url: '/assets/offklass.png', sizes: 'any', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/assets/offklass.png" />
        <link rel="shortcut icon" type="image/png" href="/assets/offklass.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        
        {/* iOS PWA Support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ofklass" />
        
        {/* Apple Touch Icons - iOS requires 180x180 for best results */}
        <link rel="apple-touch-icon" href="/assets/offklass.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/offklass.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/assets/offklass.png" />
        <link rel="apple-touch-icon" sizes="1024x1024" href="/assets/offklass.png" />
        
        {/* Additional PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="ofklass" />
      </head>
      <body className={inter.className}>
        <PWARegister />
        {children}
      </body>
    </html>
  )
}

