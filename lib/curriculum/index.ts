// Main curriculum export - organized by grade for better maintainability
// For now, we'll import from the existing curriculum.ts file
// Later, we can split into grade-specific files for easier maintenance

import { Lesson, Topic } from './types'
import { lessons as allLessons, topics as allTopics, getLessonsByGrade as _getLessonsByGrade, getLessonsByTopic as _getLessonsByTopic, getLessonById as _getLessonById } from '../curriculum'
import { getCurriculumGrade } from '../schools'

// Re-export everything from the main curriculum file
export const lessons: Lesson[] = allLessons
export const topics: Topic[] = allTopics
export type { Lesson, Topic }

// Helper function to get topics by grade
export function getTopicsByGrade(grade: string | number): Topic[] {
  const gradeStr = String(grade)
  return allTopics.filter(topic => topic.grades.includes(gradeStr))
}

// Helper functions with school support
export function getLessonsByGrade(grade: string | number, schoolId?: string): Lesson[] {
  const gradeStr = String(grade)
  // Map school grade to curriculum grade if school is provided
  const curriculumGrade = schoolId ? getCurriculumGrade(schoolId as any, gradeStr) : gradeStr
  // Call the original function with just the curriculum grade (it only takes one arg)
  const result = _getLessonsByGrade(curriculumGrade)
  return result
}

export function getLessonsByTopic(topicId: string, grade: string | number, schoolId?: string): Lesson[] {
  const gradeStr = String(grade)
  const curriculumGrade = schoolId ? getCurriculumGrade(schoolId as any, gradeStr) : gradeStr
  return _getLessonsByTopic(topicId, curriculumGrade)
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return _getLessonById(lessonId)
}

