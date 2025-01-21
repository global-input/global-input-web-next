import type { Metadata, Viewport } from 'next'

import { Inter } from 'next/font/google'
import UpdateNotification, { onServiceWorkerUpdate } from './UpdateNotification';
import { register } from './sw';
import StyledComponentsRegistry from '../lib/registry';
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
if (typeof window !== 'undefined') {
  register({ onUpdate: onServiceWorkerUpdate });
}
export const metadata: Metadata = {
  title: {
    template: '%s | Global Input App',
    default: 'Global Input App - Second Screen Experience for Web Applications',
  },
  description: 'Enable your web applications to use mobile devices as a second screen experience for seamless data transfer, authentication, and control.',
  keywords: ['second screen', 'mobile authentication', 'data transfer', 'mobile control', 'web security'],
  authors: [{ name: 'Iterative Solution' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/globalInput-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/globalInput-256.png', sizes: '256x256', type: 'image/png' },
      { url: '/globalInput-144.png', sizes: '144x144', type: 'image/png' },
      { url: '/globalInput-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/globalInput-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/globalInput-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/globalInput-16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-black antialiased">
        
          <UpdateNotification />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        
      </body>
    </html>
  )
}