'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface OnboardingTutorialProps {
  userName: string
  onComplete: () => void
}

export default function OnboardingTutorial({ userName, onComplete }: OnboardingTutorialProps) {
  const [showWelcome, setShowWelcome] = useState(true)

  const handleGetStarted = () => {
    setShowWelcome(false)
    // Small delay before completing to allow transition
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  // Show welcome animation first - just once, then go to app
  if (showWelcome) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center text-white w-full max-w-md mx-auto my-auto"
        >
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
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 md:mb-8"
          >
            👋
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4"
          >
            Hi {userName}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8 px-4"
          >
            Welcome to ofklass! 🎉
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg md:text-xl hover:bg-blue-50 transition-all shadow-2xl w-full sm:w-auto min-w-[200px]"
          >
            Let's Get Started →
          </motion.button>
        </motion.div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => {
          const randomX = Math.random() * 100
          const randomY = Math.random() * 100
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              initial={{
                x: `${randomX}%`,
                y: `${randomY}%`,
                opacity: 0,
              }}
              animate={{
                y: `${(randomY + Math.random() * 50) % 100}%`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          )
        })}
      </motion.div>
    )
  }

  // After welcome, just complete (guided tour will start automatically)
  return null
}

