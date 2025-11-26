'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { getTranslation } from '@/lib/translations'
import { getTopicById } from '@/lib/curriculum'
import { useStore } from '@/lib/store'
import { CheckCircle, Sparkles, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface VideoPlayerProps {
  videoUrl: string
  onComplete: () => void
  language: string
  lessonTitle?: string
  lessonDescription?: string
  topicId?: string
}

export default function VideoPlayer({
  videoUrl,
  onComplete,
  language,
  lessonTitle,
  lessonDescription,
  topicId,
}: VideoPlayerProps) {
  const topic = useMemo(() => topicId ? getTopicById(topicId) : null, [topicId])
  const { recordVideoWatched } = useStore()
  const [played, setPlayed] = useState(0)
  const [watched, setWatched] = useState(false)
  const [hasRecordedVideo, setHasRecordedVideo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const t = useCallback((key: string) => getTranslation(language, key), [language])

  // Use demo video for ALL lessons (user requested)
  const demoVideoUrl = '/assets/demo.mp4'
  const actualVideoUrl = demoVideoUrl

  // Throttled progress update for better performance
  const updateProgress = useCallback(() => {
    if (!videoRef.current) return
    
    const video = videoRef.current
    if (video.duration > 0) {
      const newPlayed = video.currentTime / video.duration
      setPlayed(newPlayed)
      
      // Mark as watched if 80% of video is watched
      if (newPlayed >= 0.8 && !watched) {
        setWatched(true)
        // Record video watched for badge tracking (only once per video)
        if (!hasRecordedVideo) {
          recordVideoWatched()
          setHasRecordedVideo(true)
        }
      }
    }
  }, [watched, hasRecordedVideo, recordVideoWatched])

  // Setup progress tracking
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      // Throttle updates to every 500ms for better performance
      if (!progressIntervalRef.current) {
        progressIntervalRef.current = setTimeout(() => {
          updateProgress()
          progressIntervalRef.current = null
        }, 500)
      }
    }

    const handleEnded = () => {
      setWatched(true)
      setPlayed(1)
      if (!hasRecordedVideo) {
        recordVideoWatched()
        setHasRecordedVideo(true)
      }
    }

    const handleError = () => {
      setError('Failed to load video. Please try again.')
      console.error('Video playback error')
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      if (progressIntervalRef.current) {
        clearTimeout(progressIntervalRef.current)
      }
    }
  }, [updateProgress, hasRecordedVideo, recordVideoWatched])

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200">
      {/* Topic & Lesson Info Header - Duolingo Style */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {topic && (
            <div className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">{topic.icon}</div>
          )}
          <div className="flex-1 min-w-0">
            {topic && (
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {topic.name}
                </span>
              </div>
            )}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 drop-shadow-sm truncate">
              {lessonTitle || 'Math Lesson'}
            </h1>
            {lessonDescription && (
              <p className="text-green-50 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {lessonDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative bg-white">
        <div className="aspect-video bg-black relative overflow-hidden">
          {/* Native HTML5 Video Player - Better iPad compatibility */}
          {error ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-8">
              <div className="text-center">
                <p className="text-lg mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null)
                    if (videoRef.current) {
                      videoRef.current.load()
                    }
                  }}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={actualVideoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          )}
          
          {/* Video Info Overlay - Duolingo Style */}
          <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md rounded-xl p-4 text-white shadow-2xl border-2 border-white/20">
            <div className="flex items-center gap-3">
              {topic && (
                <div className="text-4xl drop-shadow-lg">{topic.icon}</div>
              )}
              <div className="flex-1">
                {topic && (
                  <div className="text-xs opacity-90 mb-1 font-semibold uppercase tracking-wide">
                    {topic.name}
                  </div>
                )}
                <div className="font-bold text-xl drop-shadow-md">{lessonTitle || 'Math Lesson'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Badge Overlay */}
        {played > 0 && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-xl border-2 border-green-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">
              {Math.round(played * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 bg-white">
        {/* Progress Card - Duolingo Style */}
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700 block mb-1">
                  {t('progress')}
                </span>
                <span className="text-3xl font-bold text-green-600">
                  {Math.round(played * 100)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1 font-medium">Remaining</div>
              <div className="text-xl font-bold text-gray-700">
                {Math.round((1 - played) * 100)}%
              </div>
            </div>
          </div>
          
          <div className="w-full bg-white rounded-full h-4 shadow-inner border border-green-200">
            <motion.div
              className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 h-4 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${played * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: 'width' }}
            />
          </div>
        </div>

        {/* Completion Message - Duolingo Style */}
        {watched && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 border-3 border-green-400 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xl border-4 border-white"
                style={{ willChange: 'transform' }}
              >
                <CheckCircle className="w-9 h-9 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 text-xl mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  {t('videoWatched')}! 🎉
                </h3>
                <p className="text-base text-green-800 leading-relaxed font-medium">
                  {t('readyForQuiz')} - You're ready to test your knowledge!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Continue Button - Duolingo Green */}
        <motion.button
          onClick={onComplete}
          disabled={!watched}
          whileHover={watched ? { scale: 1.02, y: -2 } : {}}
          whileTap={watched ? { scale: 0.98 } : {}}
          className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
            watched
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-500/50 hover:shadow-2xl hover:shadow-green-500/50 border-2 border-green-400'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none border-2 border-gray-300'
          }`}
        >
          {watched ? (
            <>
              <span>Continue to Quiz</span>
              <ArrowRight className="w-6 h-6" />
            </>
          ) : (
            <>
              <Clock className="w-5 h-5" />
              <span>{t('watchVideoFirst')} ({Math.round((1 - played) * 100)}% remaining)</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
