export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  grade: string
  order: number
}

export const lessons: Lesson[] = [
  {
    id: 'addition-basics',
    title: 'Addition Basics',
    description: 'Learn the fundamentals of addition',
    videoUrl: 'https://www.youtube.com/watch?v=AuX7nPBqDts', // Khan Academy addition video
    grade: '1-3',
    order: 1,
  },
  {
    id: 'subtraction-basics',
    title: 'Subtraction Basics',
    description: 'Learn how to subtract numbers',
    videoUrl: 'https://www.youtube.com/watch?v=8xEzAmGX7l8', // Khan Academy subtraction video
    grade: '1-3',
    order: 2,
  },
  {
    id: 'multiplication-basics',
    title: 'Multiplication Basics',
    description: 'Introduction to multiplication',
    videoUrl: 'https://www.youtube.com/watch?v=RVYwunbpMHA', // Khan Academy multiplication video
    grade: '2-4',
    order: 3,
  },
  {
    id: 'division-basics',
    title: 'Division Basics',
    description: 'Learn how to divide numbers',
    videoUrl: 'https://www.youtube.com/watch?v=LGqBQrUYua4', // Khan Academy division video
    grade: '3-5',
    order: 4,
  },
]

export const getLessonsByGrade = (grade: string): Lesson[] => {
  const gradeNum = parseInt(grade)
  return lessons.filter((lesson) => {
    const [min, max] = lesson.grade.split('-').map(Number)
    return gradeNum >= min && gradeNum <= max
  })
}

