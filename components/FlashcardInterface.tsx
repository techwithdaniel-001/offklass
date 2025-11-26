'use client'

import { useState, useEffect } from 'react'
import { AIService, Flashcard } from '@/lib/ai-service'
import { getTranslation } from '@/lib/translations'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ArrowRight, ArrowLeft, Lightbulb, CheckCircle, Trophy, Sparkles } from 'lucide-react'

interface FlashcardInterfaceProps {
  lessonId: string
  lessonTitle?: string
  grade: string
  language: string
  onComplete: () => void
  onBack: () => void
}

export default function FlashcardInterface({
  lessonId,
  lessonTitle,
  grade,
  language,
  onComplete,
  onBack,
}: FlashcardInterfaceProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [showCongratulations, setShowCongratulations] = useState(false)

  const t = (key: string) => getTranslation(language, key)

  useEffect(() => {
    loadFlashcards()
  }, [])

  const loadFlashcards = async () => {
    setLoading(true)
    try {
      const cards = await AIService.generateFlashcards(lessonId, grade, language, lessonTitle)
      if (cards.length === 0) {
        console.error('No flashcards generated')
      }
      setFlashcards(cards)
    } catch (error) {
      console.error('Error loading flashcards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setStudiedCards(prev => {
      const newSet = new Set(prev)
      newSet.add(currentIndex)
      return newSet
    })
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      // All cards studied - show congratulations
      setShowCongratulations(true)
      setTimeout(() => {
        setShowCongratulations(false)
        onComplete()
      }, 3000)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{t('loading')}...</p>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <p className="text-gray-600">{t('noFlashcards')}</p>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  return (
    <div className="relative">
      {/* Congratulations Animation Overlay */}
      <AnimatePresence>
        {showCongratulations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-center shadow-2xl border-4 border-white max-w-md mx-4 relative overflow-hidden"
            >
              {/* Background particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 300}%`,
                    y: `${50 + (Math.random() - 0.5) * 300}%`,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}

              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="text-8xl mb-6"
                >
                  🎉
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  Congratulations!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-white/90 mb-6"
                >
                  You've completed all flashcards! 🎊
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 text-white/80"
                >
                  <Trophy className="w-6 h-6" />
                  <span className="font-semibold">Great job studying!</span>
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('card')} {currentIndex + 1} / {flashcards.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {Math.round(progress)}% {t('complete')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-6">
        <motion.div
          className="relative h-80 cursor-pointer"
          onClick={handleFlip}
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl p-8 flex items-center justify-center text-center bg-white border-2 border-blue-100"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">
                    {t('concept')}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentCard.front}
                </h2>
                <p className="text-gray-500 mt-4 text-sm">{t('clickToFlip')}</p>
              </div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl p-8 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">
                    {t('explanation')}
                  </span>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {currentCard.back}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="text-center mt-4">
          <button
            onClick={handleFlip}
            className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            {t('flipCard')}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('back')}
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          {currentIndex === flashcards.length - 1 ? t('finish') : t('next')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      </div>
    </div>
  )
}

