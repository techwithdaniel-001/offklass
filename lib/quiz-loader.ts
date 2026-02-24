// Shared quiz loading and shuffling so we can restore from store and prefetch next lesson

import { QuizQuestion } from './ai-service'
import { getPremadeQuiz, getMinQuizQuestions } from './premade-quizzes'
import { AIService } from './ai-service'

export function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  const indices = q.options.map((_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  const newOptions = indices.map((i) => q.options[i])
  const newCorrectAnswer = indices.indexOf(q.correctAnswer)
  return { ...q, options: newOptions, correctAnswer: newCorrectAnswer }
}

/**
 * Load quiz questions for a lesson (premade or AI). Shuffles options.
 * Used by QuizInterface and by prefetch for next lesson.
 */
export async function loadQuizQuestionsForLesson(
  lessonId: string,
  grade: string,
  language: string,
  lessonTitle?: string,
  lessonDescription?: string
): Promise<QuizQuestion[]> {
  const premade = getPremadeQuiz(lessonId)
  const minQuestions = getMinQuizQuestions()
  let loaded: QuizQuestion[] = []

  if (premade.length > 0) {
    loaded = premade
    if (premade.length < minQuestions) {
      try {
        const ai = await AIService.generateQuiz(
          lessonId,
          grade,
          language,
          lessonTitle,
          undefined,
          lessonDescription
        )
        const needed = minQuestions - premade.length
        const extra = (ai || []).slice(0, needed).map((q, i) => ({
          ...q,
          id: `${lessonId}-${premade.length + i + 1}`,
        }))
        loaded = [...premade, ...extra]
      } catch {
        // keep premade only
      }
    }
  } else {
    const ai = await AIService.generateQuiz(
      lessonId,
      grade,
      language,
      lessonTitle,
      undefined,
      lessonDescription
    )
    if (ai?.length) loaded = ai
  }

  return loaded.map(shuffleQuestionOptions)
}
