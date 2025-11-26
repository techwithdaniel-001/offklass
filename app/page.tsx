'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import AuthPage from '@/components/AuthPage'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isAuthenticated && user) {
      router.push('/dashboard')
    }
  }, [mounted, isAuthenticated, user])

  if (!mounted) {
    return null
  }

  return <AuthPage />
}

