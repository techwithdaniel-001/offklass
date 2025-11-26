'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { languages, getTranslation } from '@/lib/translations'
import { motion } from 'framer-motion'
import { BookOpen, Users, Trophy, Sparkles } from 'lucide-react'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true) // Default to signup so grade is visible
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [grade, setGrade] = useState('')
  const [language, setLanguage] = useState('en')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useStore()

  const t = (key: string) => getTranslation(language, key)

  const grades = ['3', '4', '5', '6', '7', '8'] // Only grades 3-8 have content

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Grade is ALWAYS required
    if (!grade) {
      setError('Please select your grade to continue')
      return
    }

    if (!name || !password) {
      setError('Please fill in all required fields')
      return
    }

    // Validate grade is between 3-8
    if (!grades.includes(grade)) {
      setError('Please select a grade between 3 and 8')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters')
      return
    }

    const user = {
      id: Date.now().toString(),
      name,
      grade,
      language,
      points: 0,
      level: 1,
      completedLessons: [],
      earnedBadges: [],
      perfectQuizzes: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      videosWatched: 0,
      quizzesCompleted: 0,
      aiInteractions: 0,
      hasCompletedOnboarding: false,
      videoProgress: {},
      quizProgress: {},
    }

    setUser(user)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden" style={{ zIndex: 1 }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10" style={{ zIndex: 10 }}>
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block space-y-6 text-white"
        >
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/assets/offklass.png"
                alt="ofklass logo"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl border-4 border-white/30"
              />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {t('welcome')} to <span className="text-yellow-300">ofklass</span>
                </h1>
              </div>
            </div>
            <p className="text-xl text-white/90">
              Interactive, AI-powered math education for grades 3-8
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-4 rounded-xl shadow-lg backdrop-blur-md"
            >
              <BookOpen className="w-8 h-8 text-yellow-300 mb-2" />
              <h3 className="font-semibold text-white">Step-by-Step</h3>
              <p className="text-sm text-white/80">Learn at your own pace</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-4 rounded-xl shadow-lg backdrop-blur-md"
            >
              <Sparkles className="w-8 h-8 text-pink-300 mb-2" />
              <h3 className="font-semibold text-white">AI Powered</h3>
              <p className="text-sm text-white/80">Smart explanations</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-4 rounded-xl shadow-lg backdrop-blur-md"
            >
              <Trophy className="w-8 h-8 text-yellow-300 mb-2" />
              <h3 className="font-semibold text-white">Earn Points</h3>
              <p className="text-sm text-white/80">Level up as you learn</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-4 rounded-xl shadow-lg backdrop-blur-md"
            >
              <Users className="w-8 h-8 text-green-300 mb-2" />
              <h3 className="font-semibold text-white">Multi-Language</h3>
              <p className="text-sm text-white/80">Learn in your language</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl shadow-2xl p-6 sm:p-8 w-full backdrop-blur-xl"
        >
          {/* Logo for mobile */}
          <div className="flex justify-center mb-4 md:hidden">
            <img
              src="/assets/offklass.png"
              alt="ofklass logo"
              className="w-16 h-16 rounded-full shadow-xl border-4 border-white/30"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? t('signUp') : t('signIn')}
            </h2>
            <p className="text-gray-600">
              {isSignUp
                ? 'Create your account and select your grade to start learning math!'
                : 'Welcome back! Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field - Always shown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('name')} {isSignUp && '*'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Grade Selection - Always shown and REQUIRED */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                📚 {t('grade')} * <span className="text-xs font-normal text-gray-600">(Required - Choose your math level)</span>
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white font-medium"
                required
              >
                <option value="">👉 Select Your Grade (3-8)</option>
                {grades.map((g) => (
                  <option key={g} value={g}>
                    Grade {g} - {g === '3' ? 'Beginner Math (Start Here!)' : g === '4' ? 'Intermediate Math' : g === '5' ? 'Advanced Math' : g === '6' ? 'Pre-Algebra' : g === '7' ? 'Algebra Basics' : 'Algebra & Geometry'}
                  </option>
                ))}
              </select>
              {!grade && (
                <p className="text-xs text-red-600 mt-2 font-medium">⚠️ Please select your grade to see your math lessons!</p>
              )}
              {grade && (
                <p className="text-xs text-green-600 mt-2 font-medium">✓ Great! You'll see Grade {grade} math lessons</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('password')} *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Create a password (min 4 characters)"
                required
                minLength={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('selectLanguage')} *
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
                required
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isSignUp ? t('signUp') : t('signIn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

