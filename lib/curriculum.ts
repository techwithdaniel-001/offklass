// Comprehensive math curriculum for grades 3-8 based on Khan Academy structure

// Import Khan Academy aligned lessons for all grades
import { khanAcademyGrade3Lessons } from './curriculum/grade3-khan-academy'
import { getAllGrade4Lessons } from './curriculum/grade4-khan-academy'
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

  // Grade 4 - Khan Academy Aligned Curriculum (from grade4-khan-academy; uses curriculum video paths)
  ...getAllGrade4Lessons(),

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

