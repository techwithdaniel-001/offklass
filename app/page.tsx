'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import AuthPage from '@/components/AuthPage'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useStore()

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  return <AuthPage />
}

