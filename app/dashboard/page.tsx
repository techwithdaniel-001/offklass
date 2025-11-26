'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useStore()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return <Dashboard />
}

