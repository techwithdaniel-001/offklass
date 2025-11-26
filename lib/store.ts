import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface VideoProgress {
  currentTime: number
  watched: boolean
  lastUpdated: number
}

export interface QuizProgress {
  lessonId: string
  currentQuestion: number
  score: number
  selectedAnswers: number[]
  showExplanation: boolean[]
  failedQuestions: string[]
  questions: any[]
  lastUpdated: number
}

export interface User {
  id: string
  name: string
  grade: string
  language: string
  points: number
  level: number
  completedLessons: string[]
  earnedBadges: string[]
  perfectQuizzes: number
  streak: number
  lastActiveDate: string
  videosWatched: number
  quizzesCompleted: number
  aiInteractions: number
  hasCompletedOnboarding: boolean
  videoProgress: Record<string, VideoProgress> // key: videoUrl or lessonId
  quizProgress: Record<string, QuizProgress> // key: lessonId
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  updateUserGrade: (grade: string) => void
  updateUserLanguage: (language: string) => void
  logout: () => void
  addPoints: (points: number) => void
  completeLesson: (lessonId: string) => void
  addBadge: (badgeId: string) => void
  recordPerfectQuiz: () => void
  recordVideoWatched: () => void
  recordQuizCompleted: () => void
  recordAIInteraction: () => void
  completeOnboarding: () => void
  saveVideoProgress: (videoId: string, currentTime: number, watched: boolean) => void
  getVideoProgress: (videoId: string) => VideoProgress | null
  saveQuizProgress: (lessonId: string, progress: Omit<QuizProgress, 'lessonId' | 'lastUpdated'>) => void
  getQuizProgress: (lessonId: string) => QuizProgress | null
  clearQuizProgress: (lessonId: string) => void
}

export const useStore = create<AppState & { _hasHydrated: boolean }>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setUser: (user) => {
        const userWithDefaults = {
          ...user,
          earnedBadges: user.earnedBadges || [],
          perfectQuizzes: user.perfectQuizzes || 0,
          streak: user.streak || 0,
          lastActiveDate: user.lastActiveDate || new Date().toISOString().split('T')[0],
          videosWatched: user.videosWatched || 0,
          quizzesCompleted: user.quizzesCompleted || 0,
          aiInteractions: user.aiInteractions || 0,
          hasCompletedOnboarding: user.hasCompletedOnboarding || false,
          videoProgress: user.videoProgress || {},
          quizProgress: user.quizProgress || {},
        }
        set({ user: userWithDefaults, isAuthenticated: true })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUserGrade: (grade: string) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              grade,
            },
          }
        }),
      updateUserLanguage: (language: string) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              language,
            },
          }
        }),
      addPoints: (points) =>
        set((state) => {
          if (!state.user) return state
          const newPoints = state.user.points + points
          const newLevel = Math.floor(newPoints / 100) + 1
          return {
            user: {
              ...state.user,
              points: newPoints,
              level: newLevel,
            },
          }
        }),
      completeLesson: (lessonId) =>
        set((state) => {
          if (!state.user) return state
          const today = new Date().toISOString().split('T')[0]
          let newStreak = state.user.streak || 0
          
          // Update streak if last active was yesterday or today
          if (state.user.lastActiveDate) {
            const lastDate = new Date(state.user.lastActiveDate)
            const todayDate = new Date(today)
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
            
            if (diffDays === 0) {
              // Same day, keep streak
              newStreak = state.user.streak || 0
            } else if (diffDays === 1) {
              // Consecutive day, increment streak
              newStreak = (state.user.streak || 0) + 1
            } else {
              // Streak broken, reset to 1
              newStreak = 1
            }
          } else {
            newStreak = 1
          }

          return {
            user: {
              ...state.user,
              completedLessons: [...state.user.completedLessons, lessonId],
              streak: newStreak,
              lastActiveDate: today,
            },
          }
        }),
      addBadge: (badgeId: string) =>
        set((state) => {
          if (!state.user) return state
          const earnedBadges = state.user.earnedBadges || []
          if (earnedBadges.includes(badgeId)) return state
          return {
            user: {
              ...state.user,
              earnedBadges: [...earnedBadges, badgeId],
            },
          }
        }),
      recordPerfectQuiz: () =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              perfectQuizzes: (state.user.perfectQuizzes || 0) + 1,
            },
          }
        }),
      recordVideoWatched: () =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              videosWatched: (state.user.videosWatched || 0) + 1,
            },
          }
        }),
      recordQuizCompleted: () =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              quizzesCompleted: (state.user.quizzesCompleted || 0) + 1,
            },
          }
        }),
      recordAIInteraction: () =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              aiInteractions: (state.user.aiInteractions || 0) + 1,
            },
          }
        }),
      completeOnboarding: () =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              hasCompletedOnboarding: true,
            },
          }
        }),
      saveVideoProgress: (videoId: string, currentTime: number, watched: boolean) =>
        set((state) => {
          if (!state.user) return state
          const videoProgress = state.user.videoProgress || {}
          return {
            user: {
              ...state.user,
              videoProgress: {
                ...videoProgress,
                [videoId]: {
                  currentTime,
                  watched,
                  lastUpdated: Date.now(),
                },
              },
            },
          }
        }),
      getVideoProgress: (videoId: string) => {
        const state = get()
        if (!state.user) return null
        return state.user.videoProgress?.[videoId] || null
      },
      saveQuizProgress: (lessonId: string, progress: Omit<QuizProgress, 'lessonId' | 'lastUpdated'>) =>
        set((state) => {
          if (!state.user) return state
          const quizProgress = state.user.quizProgress || {}
          return {
            user: {
              ...state.user,
              quizProgress: {
                ...quizProgress,
                [lessonId]: {
                  ...progress,
                  lessonId,
                  lastUpdated: Date.now(),
                },
              },
            },
          }
        }),
      getQuizProgress: (lessonId: string) => {
        const state = get()
        if (!state.user) return null
        return state.user.quizProgress?.[lessonId] || null
      },
      clearQuizProgress: (lessonId: string) =>
        set((state) => {
          if (!state.user) return state
          const quizProgress = state.user.quizProgress || {}
          const { [lessonId]: _, ...rest } = quizProgress
          return {
            user: {
              ...state.user,
              quizProgress: rest,
            },
          }
        }),
    }),
    {
      name: 'math-learning-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true
        }
      },
    }
  )
)

// Hook to check if store has been hydrated
export const useStoreHydrated = () => {
  const _hasHydrated = useStore((state) => state._hasHydrated)
  return _hasHydrated
}

