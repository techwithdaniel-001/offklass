'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore, useStoreHydrated } from '@/lib/store'
import AuthPage from '@/components/AuthPage'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useStore()
  const hasHydrated = useStoreHydrated()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (hasHydrated && isAuthenticated && user && !redirecting) {
      setRedirecting(true)
      router.push('/dashboard')
    }
  }, [hasHydrated, isAuthenticated, user, redirecting, router])

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return <AuthPage />
}

