'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { getLessonById } from '@/lib/curriculum'
import LearningFlow from '@/components/LearningFlow'

export default function LearnPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useStore()
  const lessonId = params.lessonId as string
  const [lesson, setLesson] = useState(getLessonById(lessonId) || null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    if (!lesson) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, lesson, router])

  if (!isAuthenticated || !lesson) {
    return null
  }

  return <LearningFlow lesson={lesson} />
}

