'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { getTranslation } from '@/lib/translations'
import { getLessonsByGrade } from '@/lib/curriculum'
import { badges, checkBadgeEarned } from '@/lib/badges'
import { LogOut, Award, Sparkles, Zap, HelpCircle, User, Settings } from 'lucide-react'
import LearningPath from './LearningPath'
import BadgeNotification from './BadgeNotification'
import OnboardingTutorial from './OnboardingTutorial'
import GuidedTour from './GuidedTour'
import SettingsModal from './SettingsModal'

export default function Dashboard() {
  const router = useRouter()
  const { user, logout, addBadge, completeOnboarding } = useStore()
  const [earnedBadgesList, setEarnedBadgesList] = useState<string[]>([])
  const [currentBadgeNotification, setCurrentBadgeNotification] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showGuidedTour, setShowGuidedTour] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  if (!user) {
    return null
  }

  const t = (key: string) => getTranslation(user.language, key)
  const userGrade = String(user.grade || '3')

  // Show onboarding if user hasn't completed it
  useEffect(() => {
    if (!user.hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [user.hasCompletedOnboarding])

  const handleOnboardingComplete = () => {
    completeOnboarding()
    setShowOnboarding(false)
    // Start guided tour automatically after onboarding
    setTimeout(() => {
      setShowGuidedTour(true)
    }, 500)
  }

  // Check for new badges
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
        setEarnedBadgesList((prev) => [...prev, badge.id])
        // Show notification for newly earned badge
        setCurrentBadgeNotification(badge.id)
        // Auto-hide after 5 seconds
        setTimeout(() => setCurrentBadgeNotification(null), 5000)
      }
    })
  }, [user, user?.grade, addBadge, user?.videosWatched, user?.quizzesCompleted, user?.aiInteractions])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Header - Blue Theme */}
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Logo */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" data-tour="logo">
                <img
                  src="/assets/offklass.png"
                  alt="ofklass logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">
                  {t('welcome')}, {user.name}! 👋
                </h1>
                <p className="text-white/90 text-xs sm:text-sm md:text-base truncate">
                  Grade {user.grade} Math • <span className="font-bold">ofklass</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 flex-shrink-0">
              <div 
                data-tour="streak"
                className="flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/30"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {user.streak || 0}
                </span>
              </div>
              <div 
                data-tour="points"
                className="flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/30"
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {user.points}
                </span>
              </div>
              <div 
                data-tour="level"
                className="flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/30"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-bold text-xs sm:text-sm md:text-base hidden sm:inline whitespace-nowrap">
                  Level {user.level}
                </span>
                <span className="font-bold text-xs sm:hidden whitespace-nowrap">
                  L{user.level}
                </span>
              </div>
              {/* Account/Help Menu */}
              <div className="relative z-50">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white border-2 border-white/30 whitespace-nowrap"
                  id="account-button"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="hidden lg:inline">Account</span>
                </button>
                
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border-2 border-blue-200 overflow-hidden z-[100]">
                    <button
                      onClick={() => {
                        setShowSettings(true)
                        setShowAccountMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-700"
                    >
                      <Settings className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowGuidedTour(true)
                        setShowAccountMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-700 border-t border-gray-200"
                    >
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">Guided Tour</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout()
                        setShowAccountMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600 border-t border-gray-200"
                    >
                      <LogOut className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Learning Path Only */}
      <main className="max-w-7xl mx-auto">
        <LearningPath grade={userGrade} />
      </main>

      {/* Badge Notification */}
      {currentBadgeNotification && (
        <BadgeNotification
          badgeId={currentBadgeNotification}
          onClose={() => setCurrentBadgeNotification(null)}
        />
      )}

      {/* Onboarding Tutorial */}
      {showOnboarding && (
        <OnboardingTutorial
          userName={user.name}
          onComplete={handleOnboardingComplete}
        />
      )}

          {/* Settings Modal */}
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />

          {/* Guided Tour - 8 Steps */}
          {showGuidedTour && (
            <GuidedTour
              steps={[
            {
              id: 'unit-1',
              target: '[data-tour="unit-1"]',
              title: 'Unit 1 - Your Learning Path',
              description: 'This is Unit 1! Here you\'ll learn the fundamentals. Each unit contains lessons that build on each other.',
              position: 'bottom',
            },
            {
              id: 'start-button',
              target: '[data-tour="start-button"]',
              title: 'Start Here to Learn!',
              description: 'Tap this START button to begin your first lesson. You\'ll watch a video, take a quiz, and practice with flashcards.',
              position: 'bottom',
            },
            {
              id: 'learning-path',
              target: '[data-tour="learning-path"]',
              title: 'Your Learning Journey',
              description: 'This is your learning path! Complete lessons step by step. Each circle is a lesson - unlock them as you progress.',
              position: 'top',
            },
            {
              id: 'streak',
              target: '[data-tour="streak"]',
              title: 'Daily Streak 🔥',
              description: 'This shows your learning streak! Practice every day to keep it going and earn special rewards.',
              position: 'bottom',
            },
            {
              id: 'points',
              target: '[data-tour="points"]',
              title: 'Points & Progress',
              description: 'Earn points by completing lessons, quizzes, and flashcards. The more you learn, the more points you get!',
              position: 'bottom',
            },
            {
              id: 'level',
              target: '[data-tour="level"]',
              title: 'Your Level',
              description: 'Your current level based on total points earned. Level up as you complete more lessons!',
              position: 'bottom',
            },
            {
              id: 'account',
              target: '#account-button',
              title: 'Account Menu',
              description: 'Tap here to access your account, restart the guided tour, or logout. You can always come back here for help!',
              position: 'bottom',
            },
            {
              id: 'logo',
              target: '[data-tour="logo"]',
              title: 'Welcome to ofklass!',
              description: 'This is your math learning platform! Complete lessons, earn badges, and level up as you master math concepts.',
              position: 'bottom',
            },
          ]}
          onComplete={() => setShowGuidedTour(false)}
          onSkip={() => setShowGuidedTour(false)}
        />
      )}
    </div>
  )
}
