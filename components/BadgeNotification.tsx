'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { badges } from '@/lib/badges'

interface BadgeNotificationProps {
  badgeId: string
  onClose: () => void
}

export default function BadgeNotification({ badgeId, onClose }: BadgeNotificationProps) {
  const badge = badges.find((b) => b.id === badgeId)

  if (!badge) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
      >
        <div className={`${badge.color} rounded-2xl shadow-2xl p-6 border-4 border-white relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
          </div>

          <div className="relative z-10">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-6xl"
              >
                {badge.icon}
              </motion.div>
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-1">
                    Badge Earned!
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{badge.name}</h3>
                  <p className="text-sm opacity-90">{badge.description}</p>
                </motion.div>
              </div>
            </div>

            {/* Confetti effect */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

