'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { getLessonById, getLessonsByGrade } from '@/lib/curriculum'
import { getTranslation } from '@/lib/translations'
import { badges, checkBadgeEarned } from '@/lib/badges'
import { Lesson } from '@/lib/lessons'
import VideoPlayer from './VideoPlayer'
import QuizInterface from './QuizInterface'
import FlashcardInterface from './FlashcardInterface'
import BadgeNotification from './BadgeNotification'
import GuidedTour from './GuidedTour'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trophy, Play, BookOpen, FileQuestion } from 'lucide-react'

type Step = 'video' | 'quiz' | 'flashcards' | 'complete'

interface LearningFlowProps {
  lesson: Lesson
}

export default function LearningFlow({ lesson }: LearningFlowProps) {
  const router = useRouter()
  const { user, addPoints, completeLesson, recordPerfectQuiz, addBadge } = useStore()
  const [currentStep, setCurrentStep] = useState<Step>('video')
  const [videoWatched, setVideoWatched] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false)
  const [currentBadgeNotification, setCurrentBadgeNotification] = useState<string | null>(null)
  const [showQuizTour, setShowQuizTour] = useState(false)
  const [hasSeenQuizTour, setHasSeenQuizTour] = useState(false)

  if (!user) return null

  const t = (key: string) => getTranslation(user.language, key)

  // Check for badges whenever user stats change
  useEffect(() => {
    if (!user) return
    
    const userStats = {
      lessonsCompleted: user.completedLessons.length,
      points: user.points,
      completedLessons: user.completedLessons,
      perfectQuizzes: user.perfectQuizzes || 0,
      streak: user.streak || 0,
      videosWatched: user.videosWatched || 0,
      quizzesCompleted: user.quizzesCompleted || 0,
      aiInteractions: user.aiInteractions || 0,
    }

    const lessons = getLessonsByGrade(user.grade)

    badges.forEach((badge) => {
      const earnedBadges = user.earnedBadges || []
      if (
        !earnedBadges.includes(badge.id) &&
        checkBadgeEarned(badge, userStats, user.grade, lessons)
      ) {
        addBadge(badge.id)
        // Show notification for newly earned badge
        setCurrentBadgeNotification(badge.id)
        // Auto-hide after 5 seconds
        setTimeout(() => setCurrentBadgeNotification(null), 5000)
      }
    })
  }, [user, user?.videosWatched, user?.quizzesCompleted, user?.aiInteractions, addBadge])

  const handleVideoComplete = () => {
    setVideoWatched(true)
    // Navigate to quiz when video is completed
    setCurrentStep('quiz')
  }

  const handleQuizComplete = (points: number, isPerfect: boolean) => {
    addPoints(points)
    if (isPerfect) {
      recordPerfectQuiz()
    }
    setQuizCompleted(true)
    // Don't auto-navigate, let user choose
  }

  // Show quiz tour only once when quiz is first opened (never again after user has seen it)
  useEffect(() => {
    // Only show if:
    // 1. We're on the quiz step
    // 2. Quiz isn't completed
    // 3. Tour isn't already showing
    // 4. User hasn't seen it before (in this session or stored)
    if (currentStep === 'quiz' && !quizCompleted && !showQuizTour && !hasSeenQuizTour) {
      // Check localStorage to see if user has seen quiz tour before
      const quizTourSeen = localStorage.getItem('quiz-tour-seen')
      if (!quizTourSeen) {
        // Small delay to let quiz load
        const timer = setTimeout(() => {
          setShowQuizTour(true)
        }, 1000)
        return () => clearTimeout(timer)
      } else {
        // Mark as seen so we don't check again
        setHasSeenQuizTour(true)
      }
    }
  }, [currentStep, quizCompleted, showQuizTour, hasSeenQuizTour])

  const handleFlashcardsComplete = () => {
    setFlashcardsCompleted(true)
  }

  // Check if lesson is fully completed (all three sections done)
  useEffect(() => {
    if (videoWatched && quizCompleted && flashcardsCompleted && !user.completedLessons.includes(lesson.id)) {
      completeLesson(lesson.id)
      addPoints(50) // Bonus points for completing entire lesson
      setCurrentStep('complete')
    }
  }, [videoWatched, quizCompleted, flashcardsCompleted, lesson.id, user.completedLessons, completeLesson, addPoints])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('back')}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold">{user.points} {t('points')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation - Access Any Section Anytime */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex items-center justify-center gap-2">
            {/* Video Tab */}
            <button
              onClick={() => setCurrentStep('video')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 'video'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Play className="w-5 h-5" />
              <span>{t('video')}</span>
              {videoWatched && <span className="ml-1">✓</span>}
            </button>

            {/* Quiz Tab */}
            <button
              onClick={() => setCurrentStep('quiz')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 'quiz'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileQuestion className="w-5 h-5" />
              <span>{t('quiz')}</span>
              {quizCompleted && <span className="ml-1">✓</span>}
            </button>

            {/* Flashcards Tab - Always Accessible */}
            <button
              onClick={() => setCurrentStep('flashcards')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 'flashcards'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>{t('flashcards')}</span>
              {flashcardsCompleted && <span className="ml-1">✓</span>}
            </button>
          </div>
        </div>

        {/* Info Banner */}
        {currentStep === 'flashcards' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6"
          >
            <p className="text-blue-800 font-medium text-center">
              💡 <strong>Tip:</strong> You can practice with flashcards anytime! Use them before the quiz to review key concepts.
            </p>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          {currentStep === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                onComplete={handleVideoComplete}
                language={user.language}
                lessonTitle={lesson.title}
                lessonDescription={lesson.description}
                topicId={lesson.topicId}
              />
            </motion.div>
          )}

          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <QuizInterface
                lessonId={lesson.id}
                lessonTitle={lesson.title}
                grade={user.grade}
                language={user.language}
                onComplete={handleQuizComplete}
                onBack={() => setCurrentStep('video')}
              />
            </motion.div>
          )}

          {currentStep === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FlashcardInterface
                lessonId={lesson.id}
                lessonTitle={lesson.title}
                grade={user.grade}
                language={user.language}
                onComplete={handleFlashcardsComplete}
                onBack={() => setCurrentStep('video')}
              />
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {t('congratulations')}!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {t('earnedPoints')} 50 {t('pointsText')}!
                </p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  {t('continue')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Badge Notification */}
      {currentBadgeNotification && (
        <BadgeNotification
          badgeId={currentBadgeNotification}
          onClose={() => setCurrentBadgeNotification(null)}
        />
      )}

      {/* Quiz Guided Tour - Only show once */}
      {showQuizTour && currentStep === 'quiz' && (
        <GuidedTour
          steps={[
            {
              id: 'quiz-section',
              target: '[data-tour="quiz-section"]',
              title: 'Quiz Questions',
              description: 'Here are your quiz questions! Read each question carefully and select your answer. The AI will help you if you get stuck.',
              position: 'left',
            },
            {
              id: 'ai-tutor',
              target: '[data-tour="ai-tutor"]',
              title: 'AI Math Helper 🤖',
              description: 'This is your AI tutor! Ask questions, get hints, or ask "What does [concept] mean?" if you don\'t understand something. I\'ll guide you step-by-step!',
              position: 'right',
            },
          ]}
          onComplete={() => {
            setShowQuizTour(false)
            setHasSeenQuizTour(true)
            // Mark as seen in localStorage so it never shows again
            localStorage.setItem('quiz-tour-seen', 'true')
          }}
          onSkip={() => {
            setShowQuizTour(false)
            setHasSeenQuizTour(true)
            // Mark as seen in localStorage so it never shows again
            localStorage.setItem('quiz-tour-seen', 'true')
          }}
        />
      )}
    </div>
  )
}

