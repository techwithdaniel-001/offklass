// Badge system for gamification

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  requirement: {
    type: 'lessons_completed' | 'points_earned' | 'streak' | 'topic_master' | 'perfect_quiz' | 'videos_watched' | 'quizzes_completed' | 'ai_interactions'
    value: number
    topicId?: string
  }
}

export const badges: Badge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first lesson',
    icon: '👣',
    color: 'bg-blue-500',
    requirement: {
      type: 'lessons_completed',
      value: 1,
    },
  },
  {
    id: 'quick-learner',
    name: 'Quick Learner',
    description: 'Complete 5 lessons',
    icon: '⚡',
    color: 'bg-yellow-500',
    requirement: {
      type: 'lessons_completed',
      value: 5,
    },
  },
  {
    id: 'dedicated-student',
    name: 'Dedicated Student',
    description: 'Complete 10 lessons',
    icon: '📚',
    color: 'bg-green-500',
    requirement: {
      type: 'lessons_completed',
      value: 10,
    },
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Complete 25 lessons',
    icon: '👑',
    color: 'bg-purple-500',
    requirement: {
      type: 'lessons_completed',
      value: 25,
    },
  },
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Earn 100 points',
    icon: '💰',
    color: 'bg-yellow-500',
    requirement: {
      type: 'points_earned',
      value: 100,
    },
  },
  {
    id: 'point-champion',
    name: 'Point Champion',
    description: 'Earn 500 points',
    icon: '🏆',
    color: 'bg-orange-500',
    requirement: {
      type: 'points_earned',
      value: 500,
    },
  },
  {
    id: 'point-legend',
    name: 'Point Legend',
    description: 'Earn 1000 points',
    icon: '🌟',
    color: 'bg-pink-500',
    requirement: {
      type: 'points_earned',
      value: 1000,
    },
  },
  {
    id: 'arithmetic-master',
    name: 'Arithmetic Master',
    description: 'Complete all arithmetic lessons',
    icon: '🔢',
    color: 'bg-blue-600',
    requirement: {
      type: 'topic_master',
      value: 1,
      topicId: 'arithmetic',
    },
  },
  {
    id: 'fraction-expert',
    name: 'Fraction Expert',
    description: 'Complete all fraction lessons',
    icon: '🍕',
    color: 'bg-red-500',
    requirement: {
      type: 'topic_master',
      value: 1,
      topicId: 'fractions',
    },
  },
  {
    id: 'geometry-genius',
    name: 'Geometry Genius',
    description: 'Complete all geometry lessons',
    icon: '📐',
    color: 'bg-green-600',
    requirement: {
      type: 'topic_master',
      value: 1,
      topicId: 'geometry',
    },
  },
  {
    id: 'algebra-pro',
    name: 'Algebra Pro',
    description: 'Complete all algebra lessons',
    icon: '📝',
    color: 'bg-indigo-600',
    requirement: {
      type: 'topic_master',
      value: 1,
      topicId: 'algebra',
    },
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: '💯',
    color: 'bg-yellow-400',
    requirement: {
      type: 'perfect_quiz',
      value: 1,
    },
  },
  {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Complete lessons 3 days in a row',
    icon: '🔥',
    color: 'bg-orange-500',
    requirement: {
      type: 'streak',
      value: 3,
    },
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Complete lessons 7 days in a row',
    icon: '🔥',
    color: 'bg-red-500',
    requirement: {
      type: 'streak',
      value: 7,
    },
  },
  {
    id: 'first-video',
    name: 'Video Watcher',
    description: 'Watch your first video completely',
    icon: '🎬',
    color: 'bg-blue-500',
    requirement: {
      type: 'videos_watched',
      value: 1,
    },
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Complete 10 quizzes',
    icon: '📝',
    color: 'bg-purple-500',
    requirement: {
      type: 'quizzes_completed',
      value: 10,
    },
  },
  {
    id: 'ai-explorer',
    name: 'AI Explorer',
    description: 'Ask the AI for help for the first time',
    icon: '🤖',
    color: 'bg-indigo-500',
    requirement: {
      type: 'ai_interactions',
      value: 1,
    },
  },
]

export const checkBadgeEarned = (
  badge: Badge,
  userStats: {
    lessonsCompleted: number
    points: number
    completedLessons: string[]
    perfectQuizzes: number
    streak: number
    videosWatched?: number
    quizzesCompleted?: number
    aiInteractions?: number
  },
  grade: string,
  allLessons: any[]
): boolean => {
  switch (badge.requirement.type) {
    case 'lessons_completed':
      return userStats.lessonsCompleted >= badge.requirement.value
    case 'points_earned':
      return userStats.points >= badge.requirement.value
    case 'perfect_quiz':
      return userStats.perfectQuizzes >= badge.requirement.value
    case 'streak':
      return userStats.streak >= badge.requirement.value
    case 'videos_watched':
      return (userStats.videosWatched || 0) >= badge.requirement.value
    case 'quizzes_completed':
      return (userStats.quizzesCompleted || 0) >= badge.requirement.value
    case 'ai_interactions':
      return (userStats.aiInteractions || 0) >= badge.requirement.value
    case 'topic_master':
      if (!badge.requirement.topicId) return false
      const topicLessons = allLessons.filter(
        (l) => l.topicId === badge.requirement.topicId && l.grade === grade
      )
      return topicLessons.every((lesson) =>
        userStats.completedLessons.includes(lesson.id)
      )
    default:
      return false
  }
}

