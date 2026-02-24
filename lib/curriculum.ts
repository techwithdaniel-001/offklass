// Comprehensive math curriculum for grades 3-8 based on Khan Academy structure

// Import Khan Academy aligned lessons for all grades
import { khanAcademyGrade3Lessons } from './curriculum/grade3-khan-academy'
import { khanAcademyGrade5Lessons } from './curriculum/grade5-khan-academy'
import { khanAcademyGrade6Lessons } from './curriculum/grade6-khan-academy'
import { khanAcademyGrade7Lessons } from './curriculum/grade7-khan-academy'
import { khanAcademyGrade8Lessons } from './curriculum/grade8-khan-academy'

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
  // Grade 3 - Khan Academy Aligned Curriculum (30 Lessons)
  ...khanAcademyGrade3Lessons,

  // Grade 4 - Khan Academy Aligned Curriculum (18 Units, 65 Lessons)
  
  // Unit 1: Place Value
  {
    id: 'place-value-intro',
    title: 'What is Place Value?',
    description: 'Learn how numbers are made of ones, tens, hundreds, and more!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 1,
    estimatedTime: 15,
  },
  {
    id: 'place-value-reading',
    title: 'Reading Big Numbers',
    description: 'Learn to read numbers like 1,234,567!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 2,
    estimatedTime: 18,
  },
  {
    id: 'place-value-writing',
    title: 'Writing Numbers',
    description: 'Write numbers in different ways!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 3,
    estimatedTime: 16,
  },
  {
    id: 'place-value-comparing',
    title: 'Comparing Numbers',
    description: 'Learn which number is bigger or smaller!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 4,
    estimatedTime: 17,
  },
  {
    id: 'place-value-rounding',
    title: 'Rounding Numbers',
    description: 'Make numbers easier by rounding them!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 5,
    estimatedTime: 20,
  },

  // Unit 2: Addition, Subtraction, and Estimation
  {
    id: 'add-subtract-review',
    title: 'Adding and Subtracting Review',
    description: 'Review how to add and subtract!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 6,
    estimatedTime: 15,
  },
  {
    id: 'add-multi-digit',
    title: 'Adding Big Numbers',
    description: 'Add numbers with many digits!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 7,
    estimatedTime: 20,
  },
  {
    id: 'subtract-multi-digit',
    title: 'Subtracting Big Numbers',
    description: 'Subtract numbers with many digits!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 8,
    estimatedTime: 22,
  },
  {
    id: 'estimation',
    title: 'Estimation',
    description: 'Guess the answer before you solve!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 9,
    estimatedTime: 18,
  },

  // Unit 3: Multiply by 1-Digit Numbers
  {
    id: 'multiply-review',
    title: 'Multiplication Review',
    description: 'Review your times tables!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 10,
    estimatedTime: 15,
  },
  {
    id: 'multiply-1-digit',
    title: 'Multiply by 1-Digit',
    description: 'Multiply big numbers by 1-digit numbers!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 11,
    estimatedTime: 22,
  },
  {
    id: 'multiply-word-problems',
    title: 'Multiplication Word Problems',
    description: 'Solve real problems with multiplication!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 12,
    estimatedTime: 20,
  },

  // Unit 4: Multiply by 2-Digit Numbers
  {
    id: 'multiply-2-digit-intro',
    title: 'Multiply by 2-Digit Numbers',
    description: 'Learn to multiply by numbers like 23 or 45!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 13,
    estimatedTime: 25,
  },
  {
    id: 'multiply-2-digit-area',
    title: 'Area Model for Multiplication',
    description: 'Use boxes to help you multiply!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 14,
    estimatedTime: 23,
  },
  {
    id: 'multiply-2-digit-practice',
    title: 'Practice Multiplying',
    description: 'Get better at multiplying big numbers!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 15,
    estimatedTime: 20,
  },

  // Unit 5: Division
  {
    id: 'division-review',
    title: 'Division Review',
    description: 'Review what division means!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 16,
    estimatedTime: 15,
  },
  {
    id: 'division-remainders',
    title: 'Division with Remainders',
    description: 'Sometimes numbers don\'t divide evenly!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 17,
    estimatedTime: 20,
  },
  {
    id: 'long-division',
    title: 'Long Division',
    description: 'Learn the long division method!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 18,
    estimatedTime: 25,
  },
  {
    id: 'division-word-problems',
    title: 'Division Word Problems',
    description: 'Solve real problems with division!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 19,
    estimatedTime: 22,
  },

  // Unit 6: Factors, Multiples, and Patterns
  {
    id: 'factors-intro',
    title: 'What are Factors?',
    description: 'Learn what factors are!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'number-theory',
    grade: '4',
    order: 20,
    estimatedTime: 18,
  },
  {
    id: 'multiples-intro',
    title: 'What are Multiples?',
    description: 'Learn what multiples are!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'number-theory',
    grade: '4',
    order: 21,
    estimatedTime: 18,
  },
  {
    id: 'prime-composite',
    title: 'Prime and Composite Numbers',
    description: 'Learn about special numbers!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'number-theory',
    grade: '4',
    order: 22,
    estimatedTime: 20,
  },
  {
    id: 'number-patterns',
    title: 'Number Patterns',
    description: 'Find patterns in numbers!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'number-theory',
    grade: '4',
    order: 23,
    estimatedTime: 19,
  },

  // Unit 7: Equivalent Fractions and Comparing
  {
    id: 'equivalent-fractions-intro',
    title: 'What are Equivalent Fractions?',
    description: 'Learn about fractions that are the same!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 24,
    estimatedTime: 20,
  },
  {
    id: 'equivalent-fractions-finding',
    title: 'Finding Equivalent Fractions',
    description: 'How to find fractions that are equal!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 25,
    estimatedTime: 22,
  },
  {
    id: 'comparing-fractions',
    title: 'Comparing Fractions',
    description: 'Which fraction is bigger?',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 26,
    estimatedTime: 23,
  },
  {
    id: 'ordering-fractions',
    title: 'Ordering Fractions',
    description: 'Put fractions in order from smallest to biggest!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 27,
    estimatedTime: 21,
  },

  // Unit 8: Add and Subtract Fractions
  {
    id: 'add-fractions-like',
    title: 'Adding Fractions with Same Bottom',
    description: 'Add fractions that have the same denominator!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 28,
    estimatedTime: 20,
  },
  {
    id: 'subtract-fractions-like',
    title: 'Subtracting Fractions with Same Bottom',
    description: 'Subtract fractions that have the same denominator!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 29,
    estimatedTime: 20,
  },
  {
    id: 'add-subtract-mixed',
    title: 'Adding and Subtracting Mixed Numbers',
    description: 'Work with whole numbers and fractions together!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 30,
    estimatedTime: 25,
  },

  // Unit 9: Multiply Fractions by Whole Numbers
  {
    id: 'multiply-fraction-whole',
    title: 'Multiply Fractions by Whole Numbers',
    description: 'Learn to multiply fractions!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 31,
    estimatedTime: 22,
  },
  {
    id: 'multiply-fraction-word',
    title: 'Fraction Multiplication Word Problems',
    description: 'Solve real problems with fraction multiplication!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 32,
    estimatedTime: 23,
  },

  // Unit 10: Understand Decimals
  {
    id: 'decimals-intro',
    title: 'Introduction to Decimals',
    description: 'What are decimals?',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 33,
    estimatedTime: 18,
  },
  {
    id: 'decimal-place-value',
    title: 'Decimal Place Value',
    description: 'Learn about tenths and hundredths!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 34,
    estimatedTime: 20,
  },
  {
    id: 'comparing-decimals',
    title: 'Comparing Decimals',
    description: 'Which decimal is bigger?',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 35,
    estimatedTime: 19,
  },
  {
    id: 'fractions-decimals',
    title: 'Fractions and Decimals',
    description: 'How fractions and decimals are related!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'fractions',
    grade: '4',
    order: 36,
    estimatedTime: 21,
  },

  // Unit 11: Plane Figures
  {
    id: 'shapes-review',
    title: 'Shapes Review',
    description: 'Review different shapes!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 37,
    estimatedTime: 15,
  },
  {
    id: 'quadrilaterals',
    title: 'Quadrilaterals',
    description: 'Learn about 4-sided shapes!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 38,
    estimatedTime: 20,
  },
  {
    id: 'triangles',
    title: 'Triangles',
    description: 'Learn about 3-sided shapes!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 39,
    estimatedTime: 19,
  },
  {
    id: 'lines-symmetry',
    title: 'Lines of Symmetry',
    description: 'Find lines that split shapes in half!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 40,
    estimatedTime: 18,
  },

  // Unit 12: Measuring Angles
  {
    id: 'angles-intro',
    title: 'What are Angles?',
    description: 'Learn what angles are!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 41,
    estimatedTime: 18,
  },
  {
    id: 'angle-types',
    title: 'Types of Angles',
    description: 'Learn about right, acute, and obtuse angles!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 42,
    estimatedTime: 20,
  },
  {
    id: 'measuring-angles',
    title: 'Measuring Angles',
    description: 'Use a protractor to measure angles!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 43,
    estimatedTime: 22,
  },
  {
    id: 'drawing-angles',
    title: 'Drawing Angles',
    description: 'Learn to draw angles!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 44,
    estimatedTime: 21,
  },

  // Unit 13: Area and Perimeter
  {
    id: 'perimeter-intro',
    title: 'What is Perimeter?',
    description: 'Learn what perimeter means!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 45,
    estimatedTime: 18,
  },
  {
    id: 'perimeter-rectangles',
    title: 'Perimeter of Rectangles',
    description: 'Find the perimeter of rectangles!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 46,
    estimatedTime: 20,
  },
  {
    id: 'area-intro',
    title: 'What is Area?',
    description: 'Learn what area means!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 47,
    estimatedTime: 19,
  },
  {
    id: 'area-rectangles',
    title: 'Area of Rectangles',
    description: 'Find the area of rectangles!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 48,
    estimatedTime: 22,
  },
  {
    id: 'area-word-problems',
    title: 'Area and Perimeter Word Problems',
    description: 'Solve real problems with area and perimeter!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'geometry',
    grade: '4',
    order: 49,
    estimatedTime: 23,
  },

  // Unit 14: Units of Measurement
  {
    id: 'length-units',
    title: 'Units of Length',
    description: 'Learn about inches, feet, yards, and meters!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 50,
    estimatedTime: 20,
  },
  {
    id: 'weight-units',
    title: 'Units of Weight',
    description: 'Learn about ounces, pounds, and grams!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 51,
    estimatedTime: 19,
  },
  {
    id: 'volume-units',
    title: 'Units of Volume',
    description: 'Learn about cups, pints, quarts, and liters!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 52,
    estimatedTime: 20,
  },
  {
    id: 'converting-units',
    title: 'Converting Units',
    description: 'Change from one unit to another!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 53,
    estimatedTime: 22,
  },

  // Unit 15: Time
  {
    id: 'telling-time',
    title: 'Telling Time',
    description: 'Learn to read clocks!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 54,
    estimatedTime: 18,
  },
  {
    id: 'elapsed-time',
    title: 'Elapsed Time',
    description: 'How much time has passed?',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 55,
    estimatedTime: 20,
  },
  {
    id: 'time-word-problems',
    title: 'Time Word Problems',
    description: 'Solve problems about time!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 56,
    estimatedTime: 21,
  },

  // Unit 16: Money
  {
    id: 'money-counting',
    title: 'Counting Money',
    description: 'Count coins and bills!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 57,
    estimatedTime: 18,
  },
  {
    id: 'making-change',
    title: 'Making Change',
    description: 'Figure out how much change to give!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 58,
    estimatedTime: 20,
  },
  {
    id: 'money-word-problems',
    title: 'Money Word Problems',
    description: 'Solve problems about money!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 59,
    estimatedTime: 22,
  },

  // Unit 17: Represent and Interpret Data
  {
    id: 'bar-graphs',
    title: 'Bar Graphs',
    description: 'Read and make bar graphs!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 60,
    estimatedTime: 20,
  },
  {
    id: 'line-plots',
    title: 'Line Plots',
    description: 'Learn about line plots!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 61,
    estimatedTime: 19,
  },
  {
    id: 'pictographs',
    title: 'Pictographs',
    description: 'Read and make pictographs!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'measurement',
    grade: '4',
    order: 62,
    estimatedTime: 18,
  },

  // Unit 18: Patterns and Problem Solving
  {
    id: 'number-patterns-advanced',
    title: 'Advanced Number Patterns',
    description: 'Find patterns in number sequences!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 63,
    estimatedTime: 20,
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving Strategies',
    description: 'Learn different ways to solve problems!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 64,
    estimatedTime: 22,
  },
  {
    id: 'multi-step-problems',
    title: 'Multi-Step Word Problems',
    description: 'Solve problems that need many steps!',
    videoUrl: '/assets/demo.mp4',
    topicId: 'arithmetic',
    grade: '4',
    order: 65,
    estimatedTime: 25,
  },

  // Grade 5 - Khan Academy Aligned Curriculum (46 Lessons)
  ...khanAcademyGrade5Lessons,

  // Grade 6 - Khan Academy Aligned Curriculum (38 Lessons)
  ...khanAcademyGrade6Lessons,

  // Grade 7 - Khan Academy Aligned Curriculum (31 Lessons)
  ...khanAcademyGrade7Lessons,

  // Grade 8 - Khan Academy Aligned Curriculum (33 Lessons)
  ...khanAcademyGrade8Lessons,
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

  // Grade 7 - Khan Academy Aligned Curriculum (31 Lessons)
  ...khanAcademyGrade7Lessons,

  // Grade 8 - Khan Academy Aligned Curriculum (33 Lessons)
  ...khanAcademyGrade8Lessons,
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

