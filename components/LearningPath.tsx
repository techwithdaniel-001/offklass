'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { getTranslation } from '@/lib/translations'
import { getLessonsByGrade, getTopicsByGrade } from '@/lib/curriculum/index'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, CheckCircle, Play, Star, Sparkles, Zap, BookOpen, Trophy, Gamepad2, X, Eye } from 'lucide-react'

interface LearningPathProps {
  grade: string
}

export default function LearningPath({ grade }: LearningPathProps) {
  const router = useRouter()
  const { user } = useStore()
  const [peekUnit, setPeekUnit] = useState<number | null>(null)
  
  if (!user) return null

  const t = (key: string) => getTranslation(user.language, key)
  // Ensure grade is a string
  const gradeStr = String(grade)
  // Use school mapping if available (default to 'regina' for backward compatibility)
  const allLessons = getLessonsByGrade(gradeStr, user.school || 'regina')
  const topics = getTopicsByGrade(gradeStr)

  // Get unlocked lessons
  const getUnlockedLessons = () => {
    if (allLessons.length === 0) return []
    
    if (user.completedLessons.length === 0) {
      return [allLessons[0]?.id].filter(Boolean)
    }
    
    const lastCompletedIndex = allLessons.findIndex(
      (lesson) => lesson.id === user.completedLessons[user.completedLessons.length - 1]
    )
    
    const unlocked: string[] = []
    for (let i = 0; i <= lastCompletedIndex + 2 && i < allLessons.length; i++) {
      unlocked.push(allLessons[i].id)
    }
    
    return unlocked
  }

  const unlockedLessonIds = getUnlockedLessons()

  const isLessonUnlocked = (lessonId: string) => {
    return unlockedLessonIds.includes(lessonId) || user.completedLessons.includes(lessonId)
  }

  const isLessonCompleted = (lessonId: string) => {
    return user.completedLessons.includes(lessonId)
  }

  const handleLessonClick = (lessonId: string) => {
    if (isLessonUnlocked(lessonId)) {
      router.push(`/learn/${lessonId}`)
    }
  }

  if (allLessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No lessons found</h2>
          <p className="text-gray-600 mb-2">Grade searched: {gradeStr}</p>
          <p className="text-gray-600">Please make sure you selected the correct grade (3-8) when signing up.</p>
        </div>
      </div>
    )
  }

  // Group lessons into units (like Duolingo) - 5 lessons per unit
  const lessonsPerUnit = 5
  const units: typeof allLessons[] = []
  for (let i = 0; i < allLessons.length; i += lessonsPerUnit) {
    units.push(allLessons.slice(i, i + lessonsPerUnit))
  }

  // Check if unit is unlocked (all lessons in previous unit completed)
  const isUnitUnlocked = (unitIndex: number) => {
    if (unitIndex === 0) return true
    const previousUnit = units[unitIndex - 1]
    if (!previousUnit) return true
    return previousUnit.every(lesson => user.completedLessons.includes(lesson.id))
  }

  // Get unique topics in a unit
  const getUnitTopics = (unitLessons: typeof allLessons) => {
    const topicIds = Array.from(new Set(unitLessons.map(l => l.topicId)))
    return topicIds.map(id => topics.find(t => t.id === id)).filter(Boolean)
  }

  // Get lesson icon based on type
  const getLessonIcon = (lesson: typeof allLessons[0], index: number) => {
    if (isLessonCompleted(lesson.id)) {
      return <CheckCircle className="w-10 h-10" />
    }
    if (index % 5 === 4) {
      return <Trophy className="w-10 h-10" /> // Boss lesson
    }
    if (index % 3 === 2) {
      return <Gamepad2 className="w-10 h-10" /> // Practice lesson
    }
    return <BookOpen className="w-10 h-10" /> // Regular lesson
  }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50" data-tour="learning-path">
      {/* Blue Theme Header - Removed since Dashboard already has header */}

      {/* Main Path Area */}
      <div className="relative p-4 sm:p-6 lg:p-8 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          {/* START Button */}
          {user.completedLessons.length === 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6 sm:mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLessonClick(allLessons[0].id)}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-2xl border-4 border-blue-300 hover:bg-blue-50 transition-all w-full sm:w-auto"
                data-tour="start-button"
              >
                START
              </motion.button>
            </motion.div>
          )}

          {/* Units Path */}
          <div className="space-y-16">
            {units.map((unitLessons, unitIndex) => {
              const unitNumber = unitIndex + 1
              const isEvenUnit = unitIndex % 2 === 0
              
              const unitUnlocked = isUnitUnlocked(unitIndex)
              
              return (
                <div key={unitIndex} className="relative">
                  {/* Unit Header with Sneak Peek */}
                  <div className={`mb-6 ${isEvenUnit ? 'text-left' : 'text-right'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-3"
                    >
                      <div 
                        className={`inline-block px-6 py-2 rounded-full font-bold text-lg shadow-lg ${
                          unitUnlocked ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                        }`}
                        data-tour={unitNumber === 1 ? 'unit-1' : undefined}
                      >
                        Unit {unitNumber}
                      </div>
                      {!unitUnlocked && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setPeekUnit(unitIndex)}
                          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Sneak Peek
                        </motion.button>
                      )}
                    </motion.div>
                  </div>

                  {/* Lessons in Unit - Diagonal Path */}
                  <div className={`flex ${isEvenUnit ? 'flex-row' : 'flex-row-reverse'} items-center gap-4 flex-wrap justify-center`}>
                    {unitLessons.map((lesson, lessonIndex) => {
                      const unlocked = isLessonUnlocked(lesson.id)
                      const completed = isLessonCompleted(lesson.id)
                      const isCurrent = unlocked && !completed && 
                        (lessonIndex === 0 || isLessonCompleted(unitLessons[lessonIndex - 1]?.id) ||
                         (unitIndex > 0 && lessonIndex === 0 && isLessonCompleted(units[unitIndex - 1]?.[units[unitIndex - 1].length - 1]?.id)))

                      const showConnector = lessonIndex < unitLessons.length - 1

                      return (
                        <div key={lesson.id} className="flex items-center gap-3">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: (unitIndex * 0.3) + (lessonIndex * 0.15),
                              type: "spring",
                              stiffness: 200
                            }}
                            className="relative"
                          >
                            {/* Lesson Circle - Duolingo Style */}
                            <motion.button
                              onClick={() => handleLessonClick(lesson.id)}
                              disabled={!unlocked}
                              whileHover={unlocked ? { scale: 1.1, y: -4, rotate: 5 } : {}}
                              whileTap={unlocked ? { scale: 0.9 } : {}}
                              className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold shadow-2xl transition-all ${
                                completed
                                  ? 'bg-blue-500 ring-2 sm:ring-4 ring-blue-300'
                                  : unlocked
                                  ? 'bg-blue-500 cursor-pointer hover:bg-blue-600 ring-2 sm:ring-4 ring-blue-300'
                                  : 'bg-gray-300 cursor-not-allowed opacity-50'
                              } ${isCurrent ? 'animate-pulse ring-2 sm:ring-4 ring-blue-400 bg-blue-500' : ''}`}
                            >
                              {getLessonIcon(lesson, unitIndex * lessonsPerUnit + lessonIndex)}
                              
                              {/* Progress ring for current lesson */}
                              {isCurrent && (
                                <svg className="absolute inset-0 w-20 h-20 transform -rotate-90">
                                  <circle
                                    cx="40"
                                    cy="40"
                                    r="38"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeDasharray={`${2 * Math.PI * 38}`}
                                    strokeDashoffset={`${2 * Math.PI * 38 * 0.3}`}
                                    className="animate-spin"
                                    style={{ animationDuration: '2s' }}
                                  />
                                </svg>
                              )}
                            </motion.button>

                            {/* Lesson number */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              completed ? 'bg-blue-600' : unlocked ? 'bg-blue-600' : 'bg-gray-400'
                            } text-white shadow-lg border-2 border-white`}>
                              {lesson.order}
                            </div>
                          </motion.div>

                          {/* Connector */}
                          {showConnector && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: (unitIndex * 0.3) + (lessonIndex * 0.15) + 0.2 }}
                              className={`w-12 h-1.5 rounded-full ${
                                completed || (unlocked && lessonIndex < unitLessons.length - 1 && isLessonUnlocked(unitLessons[lessonIndex + 1]?.id))
                                  ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                                  : 'bg-gray-300'
                              }`}
                            ></motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Unit connector */}
                  {unitIndex < units.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="w-1 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Card at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-4 border-blue-600 shadow-2xl p-4"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Progress</div>
              <div className="text-2xl font-bold text-blue-600">
                {allLessons.length > 0 ? Math.round((user.completedLessons.length / allLessons.length) * 100) : 0}%
              </div>
            </div>
            <div className="flex-1 mx-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full h-4"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${allLessons.length > 0 ? (user.completedLessons.length / allLessons.length) * 100 : 0}%` 
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Lessons</div>
              <div className="text-xl font-bold text-gray-900">
                {user.completedLessons.length} / {allLessons.length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sneak Peek Modal */}
      <AnimatePresence>
        {peekUnit !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPeekUnit(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setPeekUnit(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Unit {peekUnit + 1} Preview</h2>
                    <p className="text-blue-100">Complete previous units to unlock this content</p>
                  </div>
                  <button
                    onClick={() => setPeekUnit(null)}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {units[peekUnit] && (
                    <>
                      {/* Topics in this unit */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                          Topics You'll Learn
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {getUnitTopics(units[peekUnit]).map((topic, idx) => (
                            topic && (
                              <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 flex items-center gap-3"
                              >
                                <span className="text-3xl">{topic.icon}</span>
                                <div>
                                  <div className="font-bold text-gray-900">{topic.name}</div>
                                  <div className="text-sm text-gray-600">{topic.description}</div>
                                </div>
                              </motion.div>
                            )
                          ))}
                        </div>
                      </div>

                      {/* Lessons in this unit */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Trophy className="w-6 h-6 text-yellow-600" />
                          Lessons ({units[peekUnit].length})
                        </h3>
                        <div className="space-y-3">
                          {units[peekUnit].map((lesson, idx) => {
                            const topic = topics.find(t => t.id === lesson.topicId)
                            return (
                              <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 flex items-start gap-4"
                              >
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                  {lesson.order}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {topic && <span className="text-2xl">{topic.icon}</span>}
                                    <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                      {topic?.name || 'Math'}
                                    </span>
                                  </div>
                                  <h4 className="font-bold text-gray-900 mb-1">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>⏱️ {lesson.estimatedTime} min</span>
                                    <span className="flex items-center gap-1">
                                      <Lock className="w-3 h-3" />
                                      Locked
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Unlock message */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center"
                      >
                        <p className="text-yellow-800 font-semibold">
                          🔒 Complete Unit {peekUnit} to unlock this unit and start learning!
                        </p>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

