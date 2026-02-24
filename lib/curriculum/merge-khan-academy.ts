// Utility script to merge Khan Academy Grade 4 curriculum with existing curriculum
// This can be used to replace or supplement the existing Grade 4 lessons

import { Lesson } from './types'
import { getAllGrade4Lessons, khanAcademyGrade4Units } from './grade4-khan-academy'
import { lessons as existingLessons } from '../curriculum'

/**
 * Merge Khan Academy Grade 4 lessons with existing curriculum
 * @param replace - If true, replaces existing Grade 4 lessons. If false, adds to them.
 * @returns Combined lessons array
 */
export function mergeKhanAcademyGrade4(replace: boolean = true): Lesson[] {
  const khanLessons = getAllGrade4Lessons()
  
  if (replace) {
    // Replace all Grade 4 lessons with Khan Academy lessons
    const otherLessons = existingLessons.filter(lesson => lesson.grade !== '4')
    return [...otherLessons, ...khanLessons]
  } else {
    // Add Khan Academy lessons to existing (avoiding duplicates by ID)
    const existingGrade4Ids = new Set(
      existingLessons.filter(l => l.grade === '4').map(l => l.id)
    )
    const newKhanLessons = khanLessons.filter(l => !existingGrade4Ids.has(l.id))
    return [...existingLessons, ...newKhanLessons]
  }
}

/**
 * Get statistics about the Khan Academy Grade 4 curriculum
 */
export function getKhanAcademyStats() {
  return {
    totalUnits: khanAcademyGrade4Units.length,
    totalLessons: getAllGrade4Lessons().length,
    units: khanAcademyGrade4Units.map(unit => ({
      id: unit.id,
      name: unit.name,
      lessonCount: unit.lessons.length,
      order: unit.order,
    })),
  }
}

/**
 * Export Khan Academy Grade 4 lessons in a format ready for curriculum.ts
 */
export function exportKhanAcademyLessons(): string {
  const lessons = getAllGrade4Lessons()
  return JSON.stringify(lessons, null, 2)
}

