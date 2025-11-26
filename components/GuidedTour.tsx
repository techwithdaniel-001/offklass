'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'

interface TourStep {
  id: string
  target: string // CSS selector or 'manual'
  title: string
  description: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

interface GuidedTourProps {
  steps: TourStep[]
  onComplete: () => void
  onSkip: () => void
}

export default function GuidedTour({ steps, onComplete, onSkip }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const overlayRef = useRef<HTMLDivElement>(null)

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  useEffect(() => {
    if (currentStepData.target === 'manual') {
      setTargetElement(null)
      setTooltipPosition({ top: window.innerHeight / 2, left: window.innerWidth / 2 })
      return
    }

    const element = document.querySelector(currentStepData.target) as HTMLElement
    if (element) {
      setTargetElement(element)
      updateTooltipPosition(element)
    }

    const handleResize = () => {
      if (element) {
        updateTooltipPosition(element)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize, true)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize, true)
    }
  }, [currentStep, currentStepData.target])

  const updateTooltipPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const position = currentStepData.position || 'bottom'
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const tooltipWidth = 320 // Approximate tooltip width
    const tooltipHeight = 200 // Approximate tooltip height
    const padding = 20
    
    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = Math.max(padding, rect.top - tooltipHeight - padding)
        left = Math.max(padding, Math.min(viewportWidth - tooltipWidth - padding, rect.left + rect.width / 2 - tooltipWidth / 2))
        break
      case 'bottom':
        top = Math.min(viewportHeight - tooltipHeight - padding, rect.bottom + padding)
        left = Math.max(padding, Math.min(viewportWidth - tooltipWidth - padding, rect.left + rect.width / 2 - tooltipWidth / 2))
        break
      case 'left':
        top = Math.max(padding, Math.min(viewportHeight - tooltipHeight - padding, rect.top + rect.height / 2 - tooltipHeight / 2))
        left = Math.max(padding, rect.left - tooltipWidth - padding)
        break
      case 'right':
        top = Math.max(padding, Math.min(viewportHeight - tooltipHeight - padding, rect.top + rect.height / 2 - tooltipHeight / 2))
        left = Math.min(viewportWidth - tooltipWidth - padding, rect.right + padding)
        break
      case 'center':
        top = Math.max(padding, Math.min(viewportHeight - tooltipHeight - padding, viewportHeight / 2 - tooltipHeight / 2))
        left = Math.max(padding, Math.min(viewportWidth - tooltipWidth - padding, viewportWidth / 2 - tooltipWidth / 2))
        break
    }

    setTooltipPosition({ top, left })
  }

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (steps.length === 0) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999]">
        {/* Overlay with hole for highlighted element - blocks all clicks except tooltip */}
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 pointer-events-auto"
          onClick={(e) => {
            // Prevent clicks on overlay (only tooltip is clickable)
            e.stopPropagation()
          }}
          style={targetElement ? {
            clipPath: `polygon(
              0% 0%, 
              0% 100%, 
              ${targetElement.getBoundingClientRect().left}px 100%, 
              ${targetElement.getBoundingClientRect().left}px ${targetElement.getBoundingClientRect().top}px, 
              ${targetElement.getBoundingClientRect().right}px ${targetElement.getBoundingClientRect().top}px, 
              ${targetElement.getBoundingClientRect().right}px ${targetElement.getBoundingClientRect().bottom}px, 
              ${targetElement.getBoundingClientRect().left}px ${targetElement.getBoundingClientRect().bottom}px, 
              ${targetElement.getBoundingClientRect().left}px 100%, 
              100% 100%, 
              100% 0%
            )`
          } : {}}
        />

        {/* Highlight ring around target element */}
        {targetElement && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute border-4 border-blue-500 rounded-lg shadow-2xl pointer-events-none z-10"
            style={{
              top: `${targetElement.getBoundingClientRect().top - 4}px`,
              left: `${targetElement.getBoundingClientRect().left - 4}px`,
              width: `${targetElement.getBoundingClientRect().width + 8}px`,
              height: `${targetElement.getBoundingClientRect().height + 8}px`,
            }}
          />
        )}

        {/* Tooltip - Fully Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 max-w-[90vw] sm:max-w-sm md:max-w-md pointer-events-auto border-4 border-blue-500 z-[10000]"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            maxHeight: 'calc(100vh - 40px)',
            overflowY: 'auto',
          }}
        >
          {/* Step indicator - Sticky at top */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Content - Scrollable if needed */}
          <div className="space-y-3 mb-4 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
              {currentStepData.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Navigation - Always visible at bottom */}
          <div className="flex items-center justify-between gap-2 flex-shrink-0 pt-2 border-t border-gray-200">
            {currentStep > 0 ? (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-xs sm:text-sm transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : (
              <div className="flex-shrink-0" />
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-1 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs sm:text-sm md:text-base transition-colors shadow-lg flex-shrink-0 min-w-[80px] sm:min-w-[100px] justify-center"
            >
              <span>{isLastStep ? 'Got it!' : 'Next'}</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

