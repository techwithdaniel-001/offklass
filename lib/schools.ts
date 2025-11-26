// School definitions and curriculum mappings
// Different schools may have different grade levels for the same content

export type SchoolId = 'regina' | 'nepal' | 'ocean-man'

export interface School {
  id: SchoolId
  name: string
  location: string
  // Maps school grade to standard curriculum grade
  // e.g., Nepal Grade 5 might map to standard Grade 3 content
  gradeMapping: Record<string, string> // schoolGrade -> curriculumGrade
}

export const schools: School[] = [
  {
    id: 'regina',
    name: 'Regina Public Schools',
    location: 'Regina, Saskatchewan, Canada',
    gradeMapping: {
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
    },
  },
  {
    id: 'nepal',
    name: 'Nepal Schools',
    location: 'Nepal',
    // Nepal may have different pacing - Grade 5 in Nepal might be Grade 3-4 content
    gradeMapping: {
      '3': '3',
      '4': '3',
      '5': '4',
      '6': '5',
      '7': '6',
      '8': '7',
    },
  },
  {
    id: 'ocean-man',
    name: 'Ocean Man First Nations School',
    location: 'Ocean Man First Nation, Saskatchewan, Canada',
    gradeMapping: {
      '3': '3',
      '4': '3',
      '5': '4',
      '6': '5',
      '7': '6',
      '8': '7',
    },
  },
]

export function getSchoolById(schoolId: SchoolId): School | undefined {
  return schools.find(s => s.id === schoolId)
}

export function getCurriculumGrade(schoolId: SchoolId, schoolGrade: string): string {
  const school = getSchoolById(schoolId)
  if (!school) return schoolGrade // Default to same grade if school not found
  return school.gradeMapping[schoolGrade] || schoolGrade
}

