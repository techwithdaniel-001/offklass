'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    // Don't register service worker in development mode (for faster HMR)
    if (process.env.NODE_ENV === 'development') {
      // Unregister any existing service workers in dev mode
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister()
            console.log('Service Worker unregistered for development')
          })
        })
      }
      return
    }

    // Register service worker for PWA (production only)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration)
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error)
          })
      })
    }

    // Show install prompt for PWA
    let deferredPrompt: any = null

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      // You can show a custom install button here if needed
      console.log('PWA install prompt available')
    })

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully')
      deferredPrompt = null
    })
  }, [])

  return null
}

