'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, GraduationCap, Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { languages, getTranslation } from '@/lib/translations'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, updateUserGrade, updateUserLanguage } = useStore()
  const [selectedGrade, setSelectedGrade] = useState(user?.grade || '3')
  const [selectedLanguage, setSelectedLanguage] = useState(user?.language || 'en')
  const [showGradeSuccess, setShowGradeSuccess] = useState(false)
  const [showLanguageSuccess, setShowLanguageSuccess] = useState(false)

  if (!user) return null

  const t = (key: string) => getTranslation(user.language, key)
  const grades = ['3', '4', '5', '6', '7', '8']

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade)
    updateUserGrade(grade)
    setShowGradeSuccess(true)
    setTimeout(() => setShowGradeSuccess(false), 2000)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    updateUserLanguage(language)
    setShowLanguageSuccess(true)
    setTimeout(() => setShowLanguageSuccess(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-4 border-blue-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Settings</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-blue-100 text-sm mt-2">
                  Update your grade and language preferences
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Grade Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">Grade Level</h3>
                      <p className="text-sm text-gray-600">
                        Select your current math grade
                      </p>
                    </div>
                    {showGradeSuccess && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {grades.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => handleGradeChange(grade)}
                        className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
                          selectedGrade === grade
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Grade {grade}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Current: Grade {selectedGrade} Math
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Language Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">Language</h3>
                      <p className="text-sm text-gray-600">
                        Choose your preferred language
                      </p>
                    </div>
                    {showLanguageSuccess && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white font-medium text-gray-900"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">
                    Current: {languages.find(l => l.code === selectedLanguage)?.name || 'English'}
                  </p>
                </div>

                {/* Info Message */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Changing your grade will update the lessons you see. 
                    Your progress and points are saved.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

