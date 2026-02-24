/**
 * Curriculum video paths: videos live under public/assets/curriculum/
 * - unit-1/ through unit-8/ (one folder per unit)
 * - Filenames: 1-Title.mp4, 2-Title.mp4 (number-dash-title). The app resolves the real
 *   filename via /api/curriculum-videos and uses the part after the dash as the video title.
 * This URL is used as a hint; VideoPlayer resolves the actual file from the API.
 */
export function getCurriculumVideoUrl(unitNumber: number, lessonIndexInUnit: number): string {
  return `/assets/curriculum/unit-${unitNumber}/${lessonIndexInUnit}.mp4`
}
