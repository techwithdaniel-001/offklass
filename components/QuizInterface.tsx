'use client'

import { useState, useEffect, useRef } from 'react'
import { AIService, QuizQuestion } from '@/lib/ai-service'
import { getPremadeQuiz } from '@/lib/premade-quizzes'
import { getTranslation } from '@/lib/translations'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Lightbulb, ArrowRight, ArrowLeft, MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react'

interface QuizInterfaceProps {
  lessonId: string
  lessonTitle?: string
  grade: string
  language: string
  onComplete: (points: number, isPerfect: boolean) => void
  onBack: () => void
}

export default function QuizInterface({
  lessonId,
  lessonTitle,
  grade,
  language,
  onComplete,
  onBack,
}: QuizInterfaceProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingPractice, setGeneratingPractice] = useState(false)
  const [showCompletionScreen, setShowCompletionScreen] = useState(false)
  const [failedQuestions, setFailedQuestions] = useState<QuizQuestion[]>([])
  const [isRetrying, setIsRetrying] = useState(false)
  
  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [loadingHint, setLoadingHint] = useState(false)
  const [hasRecordedAIInteraction, setHasRecordedAIInteraction] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { recordQuizCompleted, recordAIInteraction } = useStore()

  const t = (key: string) => getTranslation(language, key)

  // Format AI response with proper spacing and hierarchy
  const formatAIResponse = (text: string) => {
    // Remove all markdown formatting
    let cleaned = text
      .replace(/\*\*/g, '') // Remove bold **text**
      .replace(/\*/g, '') // Remove italic *text*
      .replace(/`/g, '') // Remove code `text`
      .replace(/#{1,6}\s/g, '') // Remove headers # Header
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links [text](url)
      .trim()

    // Split by common separators to create paragraphs
    const paragraphs = cleaned
      .split(/\n\n+|\n(?=[A-Z])/)
      .map(p => p.trim())
      .filter(p => p.length > 0)

    // Identify step-by-step instructions
    const hasSteps = cleaned.match(/(first|second|third|step \d+|then|now|finally|next|last|also|so|or|think|like|imagine|remember)/i)
    
    return { paragraphs, hasSteps: !!hasSteps, fullText: cleaned }
  }

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    // Auto-scroll chat to bottom
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  const loadQuestions = async () => {
    setLoading(true)
    try {
      // First try to get premade quiz
      const premadeQuestions = getPremadeQuiz(lessonId)
      
      if (premadeQuestions.length > 0) {
        // Use premade quiz
        setQuestions(premadeQuestions)
      } else {
        // Fallback to AI-generated quiz if no premade quiz exists
        const quizQuestions = await AIService.generateQuiz(lessonId, grade, language, lessonTitle)
        if (quizQuestions.length === 0) {
          console.error('No questions generated')
        }
        setQuestions(quizQuestions)
      }
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = async (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    const correct = index === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    } else {
      // Track failed question
      setFailedQuestions(prev => [...prev, questions[currentQuestion]])
    }
    setShowExplanation(true)
    
    // Only show explanation automatically for incorrect answers
    const question = questions[currentQuestion]
    const selectedOption = question.options[index]
    
    if (!correct) {
      // For incorrect answers, show the board-style explanation directly in chat
      setChatMessages(prev => [
        ...prev,
        { role: 'user', content: `I selected: ${selectedOption}` },
        { role: 'assistant', content: question.explanation }
      ])
    }
    // For correct answers, don't add anything to chat - user can ask if they want explanation
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsCorrect(null)
      setChatMessages([]) // Clear chat for new question
    } else {
      // Show completion screen when all questions are answered
      setShowExplanation(false) // Hide explanation to show completion screen
      setShowCompletionScreen(true)
    }
  }

  const handleRetryFailed = async () => {
    setIsRetrying(true)
    setLoading(true)
    
    try {
      // Generate new questions for failed concepts
      const retryQuestions: QuizQuestion[] = []
      
      for (const failedQuestion of failedQuestions) {
        try {
          const practiceQuestion = await AIService.generatePracticeQuestion(
            lessonId,
            grade,
            language,
            lessonTitle,
            failedQuestion.question // Use failed question as context
          )
          retryQuestions.push(practiceQuestion)
        } catch (error) {
          console.error('Error generating retry question:', error)
        }
      }
      
      if (retryQuestions.length > 0) {
        // Reset quiz state and add retry questions
        setQuestions(retryQuestions)
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setIsCorrect(null)
        setScore(0)
        setFailedQuestions([]) // Reset failed questions for retry
        setChatMessages([])
        setShowCompletionScreen(false)
      } else {
        alert('Unable to generate retry questions. Please try again later.')
      }
    } catch (error) {
      console.error('Error retrying quiz:', error)
      alert('Error generating retry questions. Please try again.')
    } finally {
      setLoading(false)
      setIsRetrying(false)
    }
  }

  const handleFinishQuiz = () => {
    const points = score * 10
    const isPerfect = score === questions.length
    // Record quiz completion for badge tracking
    recordQuizCompleted()
    onComplete(points, isPerfect)
  }

  const handleGetHint = async () => {
    if (loadingHint) return
    
    const question = questions[currentQuestion]
    const userAttempt = selectedAnswer !== null ? question.options[selectedAnswer] : undefined
    
    // Record AI interaction for badge tracking (only once per quiz)
    if (!hasRecordedAIInteraction) {
      recordAIInteraction()
      setHasRecordedAIInteraction(true)
    }
    
    setLoadingHint(true)
    setChatMessages(prev => [...prev, { role: 'user', content: 'I need help with this question!' }])
    
    try {
      const hint = await AIService.getQuizHint(
        question.question,
        question.options,
        question.correctAnswer,
        language,
        grade,
        userAttempt
      )
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: hint }])
    } catch (error) {
      console.error('Error getting hint:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I had trouble generating a hint. Try breaking down the problem step by step!' 
      }])
    } finally {
      setLoadingHint(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || loadingHint) return

    // Record AI interaction for badge tracking (only once per quiz)
    if (!hasRecordedAIInteraction) {
      recordAIInteraction()
      setHasRecordedAIInteraction(true)
    }

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoadingHint(true)

    try {
      const question = questions[currentQuestion]
      
      // Check if user is asking for practice examples/new questions
      const isAskingForPractice = (
        userMessage.toLowerCase().includes('example') ||
        userMessage.toLowerCase().includes('practice') ||
        userMessage.toLowerCase().includes('try on my own') ||
        userMessage.toLowerCase().includes('new question') ||
        userMessage.toLowerCase().includes('give me') && (
          userMessage.toLowerCase().includes('example') ||
          userMessage.toLowerCase().includes('question') ||
          userMessage.toLowerCase().includes('problem')
        ) ||
        userMessage.toLowerCase().includes('can i try') ||
        userMessage.toLowerCase().includes('more practice')
      )
      
      if (isAskingForPractice) {
        // Generate a new practice question
        setGeneratingPractice(true)
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sure! Let me create a new practice question for you to try...' 
        }])
        
        try {
          const practiceQuestion = await AIService.generatePracticeQuestion(
            lessonId,
            grade,
            language,
            lessonTitle,
            question.question // Use current question as topic context
          )
          
          // Add the new question to the questions array
          const newQuestionIndex = questions.length
          setQuestions(prev => [...prev, practiceQuestion])
          
          // Reset state for new question
          setSelectedAnswer(null)
          setShowExplanation(false)
          setIsCorrect(null)
          
          // Navigate to the new question
          setCurrentQuestion(newQuestionIndex)
          
          setChatMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `Great! I've created a new practice question for you. Try solving it! If you need help, just ask me to explain.` 
          }])
        } catch (error) {
          console.error('Error generating practice question:', error)
          setChatMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'Sorry, I had trouble creating a practice question. Please try again!' 
          }])
        } finally {
          setGeneratingPractice(false)
        }
        return
      }
      
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
      
      // If asking for explanation after answering, provide detailed explanation
      const isAskingForExplanation = showExplanation && (
        userMessage.toLowerCase().includes('explain') ||
        userMessage.toLowerCase().includes('why') ||
        userMessage.toLowerCase().includes('how') ||
        userMessage.toLowerCase().includes('help me understand') ||
        userMessage.toLowerCase().includes('more')
      )
      
      if (isAskingAboutConcept || isAskingForExplanation) {
        // Extract the concept from the question or user message
        const conceptToExplain = isAskingAboutConcept 
          ? userMessage 
          : `${question.question}. The correct answer is: ${question.options[question.correctAnswer]}. ${question.explanation}`
        
        // Provide detailed explanation using the explanation API
        const explanation = await AIService.explainConcept(
          conceptToExplain,
          language,
          grade
        )
        setChatMessages(prev => [...prev, { role: 'assistant', content: explanation }])
      } else {
        // Regular hint/guidance - AI will adaptively explain concepts if needed
        const hint = await AIService.getQuizHint(
          question.question,
          question.options,
          question.correctAnswer,
          language,
          grade,
          userMessage
        )
        setChatMessages(prev => [...prev, { role: 'assistant', content: hint }])
      }
    } catch (error) {
      console.error('Error getting response:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I\'m having trouble right now. Try asking "What does [concept] mean?" or "I don\'t understand [concept]" and I\'ll explain it!' 
      }])
    } finally {
      setLoadingHint(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{t('loading')}...</p>
        <p className="mt-2 text-sm text-gray-500">Generating AI-powered quiz questions...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <p className="text-gray-600">{t('noQuestions')}</p>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  // Check if current question is from premade quiz
  const isPremadeQuiz = getPremadeQuiz(lessonId).length > 0
  const isPerfect = score === questions.length
  const totalQuestions = questions.length

  // Show completion screen
  if (showCompletionScreen) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/50 flex flex-col items-center justify-center min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {isPerfect ? (
            <>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-2xl text-gray-700 mb-2">
                You got {score} out of {totalQuestions} correct!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Perfect score! You've mastered this concept! 🌟
              </p>
              <button
                onClick={handleFinishQuiz}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              >
                Continue to Next Lesson
              </button>
            </>
          ) : (
            <>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Lightbulb className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Great Effort! 💪
              </h2>
              <p className="text-2xl text-gray-700 mb-2">
                You got {score} out of {totalQuestions} correct!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                You missed {totalQuestions - score} concept{totalQuestions - score !== 1 ? 's' : ''}. Would you like to practice the concepts you missed?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRetryFailed}
                  disabled={isRetrying}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg disabled:opacity-50"
                >
                  {isRetrying ? 'Generating Questions...' : 'Yes, Let Me Practice!'}
                </button>
                <button
                  onClick={handleFinishQuiz}
                  className="px-8 py-4 bg-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-400 transition-all duration-200"
                >
                  Continue Anyway
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex gap-6 h-screen max-h-screen overflow-hidden p-4">
      {/* Left Side - Quiz - Fixed Size, No Expansion */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 flex flex-col w-1/2 h-full overflow-hidden flex-shrink-0" data-tour="quiz-section">
        {/* Progress */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {t('question')} {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {t('score')}: {score} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question - Scrollable but fixed container */}
        <div className="mb-6 flex-1 overflow-y-auto min-h-0">
          <div className="flex items-center gap-2 mb-4">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isPremadeQuiz 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {isPremadeQuiz ? 'Premade Quiz' : 'AI Generated'}
            </div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = index === question.correctAnswer
              let buttonClass =
                'w-full text-left px-6 py-5 rounded-xl border-2 transition-all duration-300 font-medium transform hover:scale-[1.02]'

              if (showExplanation) {
                if (isCorrectAnswer) {
                  buttonClass += ' bg-green-50 border-green-500 text-green-900'
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += ' bg-red-50 border-red-500 text-red-900'
                } else {
                  buttonClass += ' bg-gray-50 border-gray-300 text-gray-700'
                }
              } else {
                buttonClass +=
                  ' bg-white border-gray-300 text-gray-900 hover:border-blue-500 hover:bg-blue-50'
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showExplanation && isCorrectAnswer && (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                    {showExplanation && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Simple Correct/Incorrect Indicator */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-lg text-center font-semibold text-lg flex-shrink-0 ${
                isCorrect
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {isCorrect ? t('correct') : t('incorrect')}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation - Always visible and sticky at bottom */}
        <div className="flex gap-4 mt-auto pt-4 border-t border-gray-200 flex-shrink-0 bg-white/95 backdrop-blur-sm -mx-8 px-8 pb-8 sticky bottom-0 z-10">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </button>
          {showExplanation && (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
            >
              {isLastQuestion ? t('finish') : t('next')}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
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
            <h3 className="font-bold text-lg">AI Math Helper</h3>
            <p className="text-sm text-blue-100">
              {showExplanation ? 'Ask for more explanations!' : 'Ask for hints, steps, or examples!'}
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
            {chatMessages.length === 0 && !showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Hi! I'm your AI Math Helper 🤖</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Don't understand something? Just ask! I'll explain concepts, give examples, and guide you step-by-step.
                </p>
                <p className="text-gray-500 mb-4 text-xs">
                  Try: "What does [concept] mean?" or "I don't understand [concept]"
                </p>
                <button
                  onClick={handleGetHint}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <Lightbulb className="w-5 h-5 inline mr-2" />
                  Get Help
                </button>
              </motion.div>
            )}
            
            {chatMessages.length === 0 && showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Want to understand more? 💡</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Ask me to explain the answer or ask any questions about this concept!
                </p>
                <button
                  onClick={async () => {
                    const question = questions[currentQuestion]
                    setChatMessages(prev => [...prev, { 
                      role: 'user', 
                      content: 'Can you explain the answer in more detail?' 
                    }])
                    setLoadingHint(true)
                    try {
                      const explanation = await AIService.explainConcept(
                        `${question.question}. The correct answer is: ${question.options[question.correctAnswer]}. ${question.explanation}`,
                        language,
                        grade
                      )
                      setChatMessages(prev => [...prev, { role: 'assistant', content: explanation }])
                    } catch (error) {
                      setChatMessages(prev => [...prev, { 
                        role: 'assistant', 
                        content: question.explanation 
                      }])
                    } finally {
                      setLoadingHint(false)
                    }
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Explain the Answer
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
                        // Check if this is a board-style explanation (contains "Let me solve this:" or math problem format)
                        const isBoardStyle = msg.content.includes('Let me solve this:') || 
                                          /^\s*\d+\s*[\+\-×÷]\s*\d+/.test(msg.content) ||
                                          msg.content.includes('----') ||
                                          msg.content.includes('Write') && msg.content.includes('carry')
                        
                        if (isBoardStyle) {
                          // Format as board-style explanation
                          return (
                            <div className="text-sm whitespace-pre-line font-mono bg-white/50 p-4 rounded-lg border-2 border-gray-300 shadow-inner">
                              {msg.content.split('\n').map((line, idx) => {
                                const isMathLine = /[\d+\-×÷=]/.test(line) && /^\s*[\d+\-×÷=\s]+\s*$/.test(line.trim())
                                const isProblemLine = /^\s*[\d+\-×÷\s]+$/.test(line.trim()) && line.trim().length > 2
                                const isAnswerBox = /^[\s_]+$/.test(line.trim())
                                const isInstruction = line.trim().length > 0 && !isMathLine && !isProblemLine && !isAnswerBox
                                
                                return (
                                  <div 
                                    key={idx} 
                                    className={`py-0.5 ${
                                      isMathLine || isProblemLine
                                        ? 'text-center font-bold text-gray-900 text-base leading-tight' 
                                        : isAnswerBox
                                        ? 'text-center text-gray-500 text-base leading-tight border-b-2 border-dashed border-gray-400'
                                        : isInstruction
                                        ? 'text-gray-700 leading-relaxed text-sm pl-2'
                                        : 'text-gray-600 leading-relaxed'
                                    }`}
                                  >
                                    {line || '\u00A0'}
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                        
                        const formatted = formatAIResponse(msg.content)
                        
                        // Split text into sentences for better formatting
                        const sentences = formatted.fullText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0)
                        
                        // Group sentences that look like steps
                        const stepPattern = /^(first|second|third|fourth|fifth|step \d+|then|now|finally|next|last|also|so|or|think|like|imagine|remember|for example|for instance|start|add|subtract|multiply|divide)/i
                        const steps: string[] = []
                        const intro: string[] = []
                        const outro: string[] = []
                        let inSteps = false
                        
                        sentences.forEach((sentence, idx) => {
                          if (stepPattern.test(sentence)) {
                            inSteps = true
                            steps.push(sentence)
                          } else if (inSteps && idx === sentences.length - 1) {
                            outro.push(sentence)
                          } else if (!inSteps) {
                            intro.push(sentence)
                          } else {
                            steps.push(sentence)
                          }
                        })
                        
                        return (
                          <div className="space-y-3">
                            {/* Introduction text */}
                            {intro.length > 0 && (
                              <p className="text-sm leading-relaxed text-gray-800 font-medium">
                                {intro.join(' ')}
                              </p>
                            )}
                            
                            {/* Step-by-step instructions */}
                            {steps.length > 0 && (
                              <div className="space-y-2.5 pl-3 border-l-3 border-blue-400 bg-blue-50/50 rounded-r-lg py-2">
                                {steps.map((step, stepIdx) => {
                                  const stepMatch = step.match(/^((?:first|second|third|fourth|fifth|step \d+|then|now|finally|next|last|also|so|or|think|like|imagine|remember|for example|for instance|start|add|subtract|multiply|divide)[:,\s]+)(.+)/i)
                                  const prefix = stepMatch ? stepMatch[1].trim() : ''
                                  const content = stepMatch ? stepMatch[2].trim() : step.trim()
                                  
                                  return (
                                    <div key={stepIdx} className="flex gap-3 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-white">{stepIdx + 1}</span>
                                      </div>
                                      <div className="flex-1 pt-0.5">
                                        {prefix && (
                                          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide block mb-1">
                                            {prefix.replace(/[:,\s]+$/, '')}
                                          </span>
                                        )}
                                        <p className="text-sm text-gray-800 leading-relaxed">
                                          {content}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                            
                            {/* Closing text */}
                            {outro.length > 0 && (
                              <p className="text-sm leading-relaxed text-gray-700">
                                {outro.join(' ')}
                              </p>
                            )}
                            
                            {/* Fallback if no structure detected */}
                            {intro.length === 0 && steps.length === 0 && outro.length === 0 && (
                              <p className="text-sm leading-relaxed text-gray-800">
                                {formatted.fullText}
                              </p>
                            )}
                          </div>
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
                placeholder={showExplanation ? "Ask for more explanation..." : "Ask for a hint or help..."}
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
              {!showExplanation && (
                <button
                  type="button"
                  onClick={handleGetHint}
                  disabled={loadingHint}
                  className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  title="Get a hint"
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
              )}
              {showExplanation && (
                <button
                  type="button"
                  onClick={async () => {
                    const question = questions[currentQuestion]
                    setChatMessages(prev => [...prev, { 
                      role: 'user', 
                      content: 'Can you explain the answer in more detail?' 
                    }])
                    setLoadingHint(true)
                    try {
                      const explanation = await AIService.explainConcept(
                        `${question.question}. The correct answer is: ${question.options[question.correctAnswer]}. ${question.explanation}`,
                        language,
                        grade
                      )
                      setChatMessages(prev => [...prev, { role: 'assistant', content: explanation }])
                    } catch (error) {
                      setChatMessages(prev => [...prev, { 
                        role: 'assistant', 
                        content: question.explanation 
                      }])
                    } finally {
                      setLoadingHint(false)
                    }
                  }}
                  disabled={loadingHint}
                  className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  title="Get explanation"
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>
        </div>
    </div>
  )
}
