'use client'

import { useState, useEffect, useRef } from 'react'
import { AIService, Flashcard } from '@/lib/ai-service'
import { getPremadeFlashcards } from '@/lib/premade-flashcards'
import { getTranslation } from '@/lib/translations'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ArrowRight, ArrowLeft, Lightbulb, CheckCircle, Trophy, Sparkles, Bot, User, Send, MessageCircle } from 'lucide-react'

interface FlashcardInterfaceProps {
  lessonId: string
  lessonTitle?: string
  lessonDescription?: string
  grade: string
  language: string
  onComplete: () => void
  onBack: () => void
}

export default function FlashcardInterface({
  lessonId,
  lessonTitle,
  lessonDescription,
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
  
  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [loadingHint, setLoadingHint] = useState(false)
  const [hasRecordedAIInteraction, setHasRecordedAIInteraction] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { recordAIInteraction } = useStore()

  const t = (key: string) => getTranslation(language, key)

  useEffect(() => {
    loadFlashcards()
  }, [])

  useEffect(() => {
    // Auto-scroll chat to bottom
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  const loadFlashcards = async () => {
    setLoading(true)
    try {
      // First try to get premade flashcards
      const premadeCards = getPremadeFlashcards(lessonId)
      
      let loadedCards: Flashcard[] = []
      
      if (premadeCards.length > 0) {
        // Use premade flashcards
        loadedCards = premadeCards
      } else {
        // Fallback to AI-generated flashcards if no premade flashcards exist
        const cards = await AIService.generateFlashcards(lessonId, grade, language, lessonTitle, lessonDescription)
        if (cards.length === 0) {
          console.error('No flashcards generated')
        }
        loadedCards = cards
      }
      
      setFlashcards(loadedCards)
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
      setChatMessages([]) // Clear chat for new card
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
      setChatMessages([]) // Clear chat for new card
    }
  }

  const handleExplainFlashcard = async () => {
    if (loadingHint) return
    
    const currentCard = flashcards[currentIndex]
    const cardContent = isFlipped 
      ? `Front: ${currentCard.front}. Back: ${currentCard.back}`
      : `Front: ${currentCard.front}`
    
    // Record AI interaction for badge tracking (only once per session)
    if (!hasRecordedAIInteraction) {
      recordAIInteraction()
      setHasRecordedAIInteraction(true)
    }
    
    setLoadingHint(true)
    setChatMessages(prev => [...prev, { 
      role: 'user', 
      content: `Can you explain this flashcard in more detail?` 
    }])
    
    try {
      const explanation = await AIService.explainConcept(
        cardContent,
        language,
        grade
      )
      setChatMessages(prev => [...prev, { role: 'assistant', content: explanation }])
    } catch (error) {
      console.error('Error getting explanation:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: isFlipped 
          ? currentCard.back 
          : 'Flip the card to see the answer, then I can explain more!' 
      }])
    } finally {
      setLoadingHint(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || loadingHint) return

    // Record AI interaction for badge tracking (only once per session)
    if (!hasRecordedAIInteraction) {
      recordAIInteraction()
      setHasRecordedAIInteraction(true)
    }

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoadingHint(true)

    try {
      const currentCard = flashcards[currentIndex]
      const cardContent = isFlipped 
        ? `Front: ${currentCard.front}. Back: ${currentCard.back}`
        : `Front: ${currentCard.front}`
      
      // Check if user is asking about a concept they don't understand
      const isAskingAboutConcept = (
        userMessage.toLowerCase().includes("don't know") ||
        userMessage.toLowerCase().includes("don't understand") ||
        userMessage.toLowerCase().includes("what does") ||
        userMessage.toLowerCase().includes("what is") ||
        userMessage.toLowerCase().includes("i don't know") ||
        userMessage.toLowerCase().includes("i don't understand") ||
        userMessage.toLowerCase().includes("explain what") ||
        userMessage.toLowerCase().includes("mean") ||
        userMessage.toLowerCase().includes("help me understand")
      )
      
      if (isAskingAboutConcept) {
        // Provide detailed explanation
        const explanation = await AIService.explainConcept(
          `${cardContent}. ${userMessage}`,
          language,
          grade
        )
        setChatMessages(prev => [...prev, { role: 'assistant', content: explanation }])
      } else {
        // General question - use explain concept
        const explanation = await AIService.explainConcept(
          `${cardContent}. ${userMessage}`,
          language,
          grade
        )
        setChatMessages(prev => [...prev, { role: 'assistant', content: explanation }])
      }
    } catch (error) {
      console.error('Error getting response:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I\'m having trouble right now. Try asking "What does this mean?" or "I don\'t understand" and I\'ll explain it!' 
      }])
    } finally {
      setLoadingHint(false)
    }
  }

  // Format AI response with proper spacing
  const formatAIResponse = (text: string) => {
    let cleaned = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .trim()

    const paragraphs = cleaned
      .split(/\n\n+|\n(?=[A-Z])/)
      .map(p => p.trim())
      .filter(p => p.length > 0)

    return { paragraphs, fullText: cleaned }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <p className="text-gray-600">No flashcards available</p>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100
  const isLastCard = currentIndex === flashcards.length - 1

  // Question hints for kids
  const questionHints = [
    "What does this mean?",
    "I don't understand",
    "Can you explain more?",
    "Show me how to do this",
    "What is this?",
    "Help me learn this"
  ]

  return (
    <div className="flex gap-6 h-screen max-h-screen overflow-hidden p-4">
      {/* Left Side - Flashcard - Fixed Size */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 flex flex-col w-1/2 h-full overflow-hidden flex-shrink-0">
        {/* Progress */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Card {currentIndex + 1} / {flashcards.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(progress)}% done
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard - Scrollable but fixed container */}
        <div className="mb-6 flex-1 overflow-y-auto min-h-0 flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-md cursor-pointer"
            onClick={handleFlip}
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div
              className="relative w-full"
              style={{ minHeight: '300px', transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
                      What is this?
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentCard.front}
                  </h2>
                  <p className="text-gray-500 mt-4 text-sm">Tap to flip</p>
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
                      Answer
                    </span>
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {currentCard.back}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="text-center mb-4 flex-shrink-0">
          <button
            onClick={handleFlip}
            className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Flip card
          </button>
        </div>

        {/* Navigation - Always visible and sticky at bottom */}
        <div className="flex gap-4 mt-auto pt-4 border-t border-gray-200 flex-shrink-0 bg-white/95 backdrop-blur-sm -mx-8 px-8 pb-8 sticky bottom-0 z-10">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
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
            {isLastCard ? 'Finish' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Side - AI Chatbot Helper - Scrollable, Can Expand */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl border-2 border-blue-200 flex flex-col w-1/2 h-full overflow-hidden flex-1" data-tour="ai-tutor">
        {/* Chatbot Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">AI Helper</h3>
            <p className="text-sm text-blue-100">
              Ask me anything about this card!
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {chatMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Hi! I'm your AI Helper 🤖</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Don't understand something? Just ask! I'll explain it in simple words.
              </p>
              <div className="mb-4">
                <p className="text-gray-500 mb-2 text-xs font-semibold">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {questionHints.slice(0, 3).map((hint, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setChatInput(hint)
                        setTimeout(() => {
                          const form = document.querySelector('form')
                          if (form) {
                            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                          }
                        }, 100)
                      }}
                      className="bg-white border-2 border-blue-200 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleExplainFlashcard}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                <Lightbulb className="w-5 h-5 inline mr-2" />
                Explain this card
              </button>
            </motion.div>
          )}

          {chatMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3'
                    : 'bg-white border-2 border-blue-200 text-gray-900 px-5 py-4'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="space-y-3">
                    {(() => {
                      const formatted = formatAIResponse(msg.content)
                      return (
                        <p className="text-sm leading-relaxed text-gray-800">
                          {formatted.fullText}
                        </p>
                      )
                    })()}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </motion.div>
          ))}

          {loadingHint && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t-2 border-blue-200 bg-white/50 rounded-b-3xl">
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              disabled={loadingHint}
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || loadingHint}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleExplainFlashcard}
              disabled={loadingHint}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              title="Explain this card"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
          </form>
          {/* Question Hints */}
          <div className="mt-2 flex flex-wrap gap-2">
            {questionHints.map((hint, idx) => (
              <button
                key={idx}
                onClick={() => setChatInput(hint)}
                className="bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </div>

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
                  Great job!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-white/90 mb-6"
                >
                  You finished all the cards! 🎊
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 text-white/80"
                >
                  <Trophy className="w-6 h-6" />
                  <span className="font-semibold">You did great!</span>
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
