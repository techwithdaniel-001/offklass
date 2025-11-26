// AI Service for generating quizzes and explanations using OpenAI API

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Flashcard {
  id: string
  front: string
  back: string
  concept: string
}

// AI service using OpenAI API via Next.js API routes
export class AIService {
  static async generateQuiz(
    lessonId: string,
    grade: string,
    language: string,
    lessonTitle?: string
  ): Promise<QuizQuestion[]> {
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          grade,
          language,
          lessonTitle,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const data = await response.json()
      return data.questions || []
    } catch (error) {
      console.error('Error generating quiz:', error)
      // Fallback to empty array or you could return mock data
      return []
    }
  }

  static async generateFlashcards(
    lessonId: string,
    grade: string,
    language: string,
    lessonTitle?: string
  ): Promise<Flashcard[]> {
    try {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          grade,
          language,
          lessonTitle,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      return data.flashcards || []
    } catch (error) {
      console.error('Error generating flashcards:', error)
      // Fallback to empty array
      return []
    }
  }

  static async explainConcept(
    concept: string,
    language: string,
    grade?: string
  ): Promise<string> {
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concept,
          language,
          grade: grade || '5',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate explanation')
      }

      const data = await response.json()
      return data.explanation || 'Explanation not available.'
    } catch (error) {
      console.error('Error generating explanation:', error)
      return 'Explanation not available.'
    }
  }

  static async getQuizHint(
    question: string,
    options: string[],
    correctAnswer: number,
    language: string,
    grade: string,
    userAttempt?: string
  ): Promise<string> {
    try {
      const response = await fetch('/api/quiz-hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          options,
          correctAnswer,
          language,
          grade,
          userAttempt,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate hint')
      }

      const data = await response.json()
      return data.hint || 'Hint not available.'
    } catch (error) {
      console.error('Error generating hint:', error)
      return 'Hint not available.'
    }
  }

  static async generatePracticeQuestion(
    lessonId: string,
    grade: string,
    language: string,
    lessonTitle?: string,
    topic?: string
  ): Promise<QuizQuestion> {
    try {
      const response = await fetch('/api/practice-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          grade,
          language,
          lessonTitle,
          topic,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate practice question')
      }

      const data = await response.json()
      return data.question
    } catch (error) {
      console.error('Error generating practice question:', error)
      throw error
    }
  }
}

