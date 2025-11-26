'use client'

import { getTranslation } from '@/lib/translations'
import { badges } from '@/lib/badges'
import { motion, AnimatePresence } from 'framer-motion'
import { Medal, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface BadgesSectionProps {
  user: {
    earnedBadges: string[]
    grade: string
    language?: string
  }
  earnedBadgesList: string[]
}

export default function BadgesSection({ user, earnedBadgesList }: BadgesSectionProps) {
  const t = (key: string) => getTranslation(user.language || 'en', key)
  const [showAllBadges, setShowAllBadges] = useState(false)
  const [newBadgeNotification, setNewBadgeNotification] = useState<string | null>(null)

  // Ensure earnedBadges is always an array
  const userEarnedBadges = user.earnedBadges || []
  
  const earnedBadges = badges.filter((badge) => userEarnedBadges.includes(badge.id))
  const unearnedBadges = badges.filter((badge) => !userEarnedBadges.includes(badge.id))

  // Show notification for newly earned badges
  useEffect(() => {
    if (earnedBadgesList.length > 0 && !newBadgeNotification) {
      const latestBadge = badges.find((b) => b.id === earnedBadgesList[earnedBadgesList.length - 1])
      if (latestBadge) {
        setNewBadgeNotification(latestBadge.id)
        const timer = setTimeout(() => setNewBadgeNotification(null), 5000)
        return () => clearTimeout(timer)
      }
    }
  }, [earnedBadgesList, newBadgeNotification])

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">Badges</h2>
        <button
          onClick={() => setShowAllBadges(!showAllBadges)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAllBadges ? 'Show Earned Only' : 'Show All Badges'}
        </button>
      </div>

      {/* New Badge Notification */}
      <AnimatePresence>
        {newBadgeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Medal className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">🎉 New Badge Earned!</p>
                <p className="text-sm">
                  {badges.find((b) => b.id === newBadgeNotification)?.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setNewBadgeNotification(null)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {earnedBadges.length === 0 && !showAllBadges ? (
          <div className="text-center py-8">
            <Medal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No badges earned yet. Complete lessons to earn badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(showAllBadges ? badges : earnedBadges).map((badge) => {
              const isEarned = userEarnedBadges.includes(badge.id)
              return (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isEarned
                      ? `${badge.color} border-transparent text-white`
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  <div className="text-4xl mb-2 text-center" style={{ fontSize: '2.5rem' }}>
                    {badge.icon}
                  </div>
                  <h3
                    className={`font-semibold text-sm text-center mb-1 ${
                      isEarned ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {badge.name}
                  </h3>
                  <p
                    className={`text-xs text-center ${
                      isEarned ? 'text-white opacity-90' : 'text-gray-400'
                    }`}
                  >
                    {badge.description}
                  </p>
                  {!isEarned && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
        <div className="mt-4 text-center text-sm text-gray-600">
          {earnedBadges.length} / {badges.length} badges earned
        </div>
      </div>
    </div>
  )
}

