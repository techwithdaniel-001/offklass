'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && (!isAuthenticated || !user)) {
      router.push('/')
    }
  }, [mounted, isAuthenticated, user])

  if (!mounted) {
    return null
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return <Dashboard />
}

