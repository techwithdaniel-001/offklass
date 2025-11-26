// Comprehensive math curriculum for grades 3-8 based on Khan Academy structure

export interface Topic {
  id: string
  name: string
  description: string
  icon: string
  grades: string[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  topicId: string
  grade: string
  order: number
  estimatedTime: number // in minutes
}

export const topics: Topic[] = [
  {
    id: 'arithmetic',
    name: 'Arithmetic',
    description: 'Basic operations and number sense',
    icon: '➕',
    grades: ['3', '4', '5', '6'],
  },
  {
    id: 'fractions',
    name: 'Fractions & Decimals',
    description: 'Understanding and working with fractions and decimals',
    icon: '➗',
    grades: ['3', '4', '5', '6'],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Shapes, angles, area, and perimeter',
    icon: '🔺',
    grades: ['3', '4', '5', '6', '7', '8'],
  },
  {
    id: 'measurement',
    name: 'Measurement & Data',
    description: 'Units, time, graphs, and statistics',
    icon: '📏',
    grades: ['3', '4', '5', '6'],
  },
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Expressions, equations, and variables',
    icon: '📝',
    grades: ['6', '7', '8'],
  },
  {
    id: 'ratios',
    name: 'Ratios & Proportions',
    description: 'Understanding ratios, rates, and proportions',
    icon: '⚖️',
    grades: ['6', '7', '8'],
  },
  {
    id: 'number-theory',
    name: 'Number Theory',
    description: 'Factors, multiples, prime numbers',
    icon: '🔍',
    grades: ['4', '5', '6'],
  },
  {
    id: 'negative-numbers',
    name: 'Negative Numbers',
    description: 'Working with negative numbers and integers',
    icon: '➖',
    grades: ['6', '7', '8'],
  },
]

export const lessons: Lesson[] = [
  // Grade 3 - Arithmetic
  {
    id: 'add-subtract-3',
    title: 'Add & Subtract to 1000',
    description: 'Master adding and subtracting big numbers! 🎯',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '3',
    order: 1,
    estimatedTime: 15,
  },
  {
    id: 'multiplication-intro',
    title: 'What is Multiplication?',
    description: 'Learn multiplication with fun groups! 🎈',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '3',
    order: 2,
    estimatedTime: 18,
  },
  {
    id: 'multiplication-tables',
    title: 'Times Tables Fun!',
    description: 'Master your multiplication facts! ⚡',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '3',
    order: 3,
    estimatedTime: 20,
  },
  {
    id: 'division-intro',
    title: 'Sharing is Caring!',
    description: 'Learn division by sharing equally! 🍕',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '3',
    order: 4,
    estimatedTime: 18,
  },
  {
    id: 'rounding-numbers',
    title: 'Round It Up!',
    description: 'Make numbers friendly by rounding! 🔢',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '3',
    order: 5,
    estimatedTime: 15,
  },

  // Grade 3 - Fractions
  {
    id: 'fractions-intro',
    title: 'Pizza Fractions!',
    description: 'Learn fractions with yummy pizza slices! 🍕',
    videoUrl: 'https://www.youtube.com/embed/n0FZhQ_GkKw', // Khan Academy: Intro to fractions
    topicId: 'fractions',
    grade: '3',
    order: 6,
    estimatedTime: 18,
  },
  {
    id: 'fractions-visual',
    title: 'Fractions on a Line',
    description: 'Put fractions on number lines! 📏',
    videoUrl: 'https://www.youtube.com/embed/lN_bvHvBhcs', // Khan Academy: Fractions on number line
    topicId: 'fractions',
    grade: '3',
    order: 7,
    estimatedTime: 16,
  },
  {
    id: 'equivalent-fractions-basic',
    title: 'Same but Different!',
    description: 'Find fractions that are equal! 🎯',
    videoUrl: 'https://www.youtube.com/embed/BI0orN0Im4s', // Khan Academy: Equivalent fractions
    topicId: 'fractions',
    grade: '3',
    order: 8,
    estimatedTime: 17,
  },

  // Grade 3 - Geometry
  {
    id: 'shapes-2d',
    title: 'Fun with Shapes!',
    description: 'Discover circles, squares, and triangles! 🔺',
    videoUrl: 'https://www.youtube.com/embed/2cg-Uc556-Q', // Khan Academy: Recognizing shapes
    topicId: 'geometry',
    grade: '3',
    order: 9,
    estimatedTime: 16,
  },
  {
    id: 'perimeter',
    title: 'Walk Around Shapes!',
    description: 'Find the distance around shapes! 🚶',
    videoUrl: 'https://www.youtube.com/embed/AAY1bsazcgM', // Khan Academy: Perimeter
    topicId: 'geometry',
    grade: '3',
    order: 10,
    estimatedTime: 18,
  },
  {
    id: 'area-intro',
    title: 'How Much Space?',
    description: 'Learn about area by counting squares! 📦',
    videoUrl: 'https://www.youtube.com/embed/xCdxURXMdFY', // Khan Academy: Intro to area
    topicId: 'geometry',
    grade: '3',
    order: 11,
    estimatedTime: 17,
  },
  {
    id: 'area-rectangles',
    title: 'Rectangle Area Magic!',
    description: 'Multiply to find rectangle area! ✨',
    videoUrl: 'https://www.youtube.com/embed/xCdxURXMdFY', // Khan Academy: Area of rectangles
    topicId: 'geometry',
    grade: '3',
    order: 12,
    estimatedTime: 16,
  },

  // Grade 3 - Measurement & Data
  {
    id: 'time-telling',
    title: 'What Time Is It?',
    description: 'Learn to tell time on clocks! ⏰',
    videoUrl: 'https://www.youtube.com/embed/h6RNkQ7x2qY', // Khan Academy: Telling time
    topicId: 'measurement',
    grade: '3',
    order: 13,
    estimatedTime: 17,
  },
  {
    id: 'mass-volume',
    title: 'Weigh & Measure!',
    description: 'Compare weights and volumes! ⚖️',
    videoUrl: 'https://www.youtube.com/embed/2z7y7LwZb2k', // Khan Academy: Mass and volume
    topicId: 'measurement',
    grade: '3',
    order: 14,
    estimatedTime: 16,
  },
  {
    id: 'bar-graphs',
    title: 'Graph Adventures!',
    description: 'Read and make cool graphs! 📊',
    videoUrl: 'https://www.youtube.com/embed/9Uc62CuQjc4', // Khan Academy: Bar graphs
    topicId: 'measurement',
    grade: '3',
    order: 15,
    estimatedTime: 18,
  },

  // Grade 4 - Arithmetic
  {
    id: 'multi-digit-multiply',
    title: 'Multi-Digit Multiplication',
    description: 'Multiply larger numbers using different methods',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '4',
    order: 1,
    estimatedTime: 25,
  },
  {
    id: 'long-division',
    title: 'Long Division',
    description: 'Divide larger numbers step by step',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '4',
    order: 2,
    estimatedTime: 25,
  },
  {
    id: 'factors-multiples',
    title: 'Factors and Multiples',
    description: 'Understand factors, multiples, and prime numbers',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'number-theory',
    grade: '4',
    order: 3,
    estimatedTime: 20,
  },

  // Grade 4 - Fractions
  {
    id: 'equivalent-fractions',
    title: 'Equivalent Fractions',
    description: 'Find fractions that represent the same value',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '4',
    order: 4,
    estimatedTime: 22,
  },
  {
    id: 'comparing-fractions',
    title: 'Comparing Fractions',
    description: 'Compare fractions using different strategies',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '4',
    order: 5,
    estimatedTime: 20,
  },
  {
    id: 'adding-fractions',
    title: 'Adding and Subtracting Fractions',
    description: 'Add and subtract fractions with like denominators',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '4',
    order: 6,
    estimatedTime: 25,
  },
  {
    id: 'decimals-intro',
    title: 'Introduction to Decimals',
    description: 'Understand decimals and place value',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '4',
    order: 7,
    estimatedTime: 20,
  },

  // Grade 4 - Geometry
  {
    id: 'angles',
    title: 'Angles',
    description: 'Identify and measure angles',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '4',
    order: 8,
    estimatedTime: 18,
  },
  {
    id: 'area-rectangles',
    title: 'Area of Rectangles',
    description: 'Calculate area using length and width',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '4',
    order: 9,
    estimatedTime: 20,
  },

  // Grade 5 - Arithmetic
  {
    id: 'decimal-operations',
    title: 'Decimal Operations',
    description: 'Add, subtract, multiply, and divide decimals',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '5',
    order: 1,
    estimatedTime: 25,
  },
  {
    id: 'powers-ten',
    title: 'Powers of 10',
    description: 'Understand and work with powers of 10',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'arithmetic',
    grade: '5',
    order: 2,
    estimatedTime: 20,
  },

  // Grade 5 - Fractions
  {
    id: 'multiplying-fractions',
    title: 'Multiplying Fractions',
    description: 'Multiply fractions and mixed numbers',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '5',
    order: 3,
    estimatedTime: 25,
  },
  {
    id: 'dividing-fractions',
    title: 'Dividing Fractions',
    description: 'Divide fractions using reciprocal method',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '5',
    order: 4,
    estimatedTime: 25,
  },
  {
    id: 'fractions-decimals',
    title: 'Converting Fractions and Decimals',
    description: 'Convert between fractions and decimals',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'fractions',
    grade: '5',
    order: 5,
    estimatedTime: 22,
  },

  // Grade 5 - Geometry
  {
    id: 'volume',
    title: 'Volume',
    description: 'Calculate volume of rectangular prisms',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '5',
    order: 6,
    estimatedTime: 20,
  },
  {
    id: 'coordinate-plane',
    title: 'Coordinate Plane',
    description: 'Plot points and understand coordinates',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '5',
    order: 7,
    estimatedTime: 18,
  },

  // Grade 6 - Arithmetic
  {
    id: 'negative-numbers-intro',
    title: 'Introduction to Negative Numbers',
    description: 'Understand negative numbers on a number line',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'negative-numbers',
    grade: '6',
    order: 1,
    estimatedTime: 20,
  },
  {
    id: 'negative-operations',
    title: 'Operations with Negative Numbers',
    description: 'Add, subtract, multiply, and divide negative numbers',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'negative-numbers',
    grade: '6',
    order: 2,
    estimatedTime: 25,
  },

  // Grade 6 - Ratios
  {
    id: 'ratios-intro',
    title: 'Understanding Ratios',
    description: 'Learn what ratios are and how to write them',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'ratios',
    grade: '6',
    order: 3,
    estimatedTime: 20,
  },
  {
    id: 'rates',
    title: 'Rates and Unit Rates',
    description: 'Calculate and compare rates',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'ratios',
    grade: '6',
    order: 4,
    estimatedTime: 22,
  },
  {
    id: 'percentages',
    title: 'Percentages',
    description: 'Understand and calculate percentages',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'ratios',
    grade: '6',
    order: 5,
    estimatedTime: 25,
  },

  // Grade 6 - Algebra
  {
    id: 'variables-expressions',
    title: 'Variables and Expressions',
    description: 'Introduction to variables and algebraic expressions',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '6',
    order: 6,
    estimatedTime: 22,
  },
  {
    id: 'one-step-equations',
    title: 'One-Step Equations',
    description: 'Solve simple equations with one operation',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '6',
    order: 7,
    estimatedTime: 25,
  },

  // Grade 6 - Geometry
  {
    id: 'area-triangles',
    title: 'Area of Triangles',
    description: 'Calculate area of triangles',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '6',
    order: 8,
    estimatedTime: 20,
  },
  {
    id: 'area-circles',
    title: 'Area and Circumference of Circles',
    description: 'Use pi to find area and circumference',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '6',
    order: 9,
    estimatedTime: 22,
  },

  // Grade 7 - Algebra
  {
    id: 'two-step-equations',
    title: 'Two-Step Equations',
    description: 'Solve equations requiring two operations',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '7',
    order: 1,
    estimatedTime: 25,
  },
  {
    id: 'inequalities',
    title: 'Inequalities',
    description: 'Solve and graph inequalities',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '7',
    order: 2,
    estimatedTime: 25,
  },
  {
    id: 'linear-equations',
    title: 'Linear Equations',
    description: 'Graph and solve linear equations',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '7',
    order: 3,
    estimatedTime: 28,
  },

  // Grade 7 - Ratios
  {
    id: 'proportions',
    title: 'Proportions',
    description: 'Set up and solve proportions',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'ratios',
    grade: '7',
    order: 4,
    estimatedTime: 25,
  },
  {
    id: 'percent-change',
    title: 'Percent Change',
    description: 'Calculate percent increase and decrease',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'ratios',
    grade: '7',
    order: 5,
    estimatedTime: 22,
  },

  // Grade 7 - Geometry
  {
    id: 'scale-drawings',
    title: 'Scale Drawings',
    description: 'Understand and create scale drawings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '7',
    order: 6,
    estimatedTime: 20,
  },
  {
    id: 'surface-area',
    title: 'Surface Area',
    description: 'Calculate surface area of 3D shapes',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '7',
    order: 7,
    estimatedTime: 25,
  },

  // Grade 8 - Algebra
  {
    id: 'multi-step-equations',
    title: 'Multi-Step Equations',
    description: 'Solve complex equations with multiple steps',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '8',
    order: 1,
    estimatedTime: 28,
  },
  {
    id: 'systems-equations',
    title: 'Systems of Equations',
    description: 'Solve systems using substitution and elimination',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '8',
    order: 2,
    estimatedTime: 30,
  },
  {
    id: 'quadratic-intro',
    title: 'Introduction to Quadratics',
    description: 'Understand quadratic expressions and equations',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'algebra',
    grade: '8',
    order: 3,
    estimatedTime: 25,
  },

  // Grade 8 - Geometry
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem',
    description: 'Use the Pythagorean theorem to find side lengths',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '8',
    order: 4,
    estimatedTime: 25,
  },
  {
    id: 'transformations',
    title: 'Transformations',
    description: 'Reflections, rotations, and translations',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '8',
    order: 5,
    estimatedTime: 28,
  },
  {
    id: 'similarity',
    title: 'Similarity and Congruence',
    description: 'Identify similar and congruent figures',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: 'geometry',
    grade: '8',
    order: 6,
    estimatedTime: 25,
  },
]

export const getLessonsByGrade = (grade: string | number): Lesson[] => {
  const gradeStr = String(grade)
  return lessons.filter((lesson) => String(lesson.grade) === gradeStr).sort((a, b) => a.order - b.order)
}

export const getLessonsByTopic = (topicId: string, grade: string | number): Lesson[] => {
  const gradeStr = String(grade)
  return lessons
    .filter((lesson) => lesson.topicId === topicId && String(lesson.grade) === gradeStr)
    .sort((a, b) => a.order - b.order)
}

export const getTopicsByGrade = (grade: string | number): Topic[] => {
  const gradeStr = String(grade)
  return topics.filter((topic) => topic.grades.includes(gradeStr))
}

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === lessonId)
}

export const getTopicById = (topicId: string): Topic | undefined => {
  return topics.find((topic) => topic.id === topicId)
}

