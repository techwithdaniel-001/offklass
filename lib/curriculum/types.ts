// Shared types for curriculum

export interface Topic {
  id: string
  name: string
  description: string
  icon: string
  grades: string[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  topicId: string
  grade: string
  order: number
  estimatedTime: number // in minutes
}

