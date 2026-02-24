# Khan Academy Grade 4 Math Curriculum Integration

This document explains how to use the Khan Academy-aligned Grade 4 math curriculum in OffKlass.

## Overview

Since Khan Academy no longer provides a public API, we've created a comprehensive Grade 4 math curriculum structure based on Khan Academy's curriculum. This includes **18 units** with **65+ lessons** covering all major Grade 4 math topics.

## Units Included

1. **Place Value** - 5 lessons
2. **Addition, Subtraction, and Estimation** - 4 lessons
3. **Multiply by 1-Digit Numbers** - 3 lessons
4. **Multiply by 2-Digit Numbers** - 3 lessons
5. **Division** - 4 lessons
6. **Factors, Multiples, and Patterns** - 4 lessons
7. **Equivalent Fractions and Comparing** - 4 lessons
8. **Add and Subtract Fractions** - 3 lessons
9. **Multiply Fractions by Whole Numbers** - 2 lessons
10. **Understand Decimals** - 4 lessons
11. **Plane Figures** - 4 lessons
12. **Measuring Angles** - 4 lessons
13. **Area and Perimeter** - 5 lessons
14. **Units of Measurement** - 4 lessons
15. **Time** - 3 lessons
16. **Money** - 3 lessons
17. **Represent and Interpret Data** - 3 lessons
18. **Patterns and Problem Solving** - 3 lessons

## Files Structure

- `lib/curriculum/grade4-khan-academy.ts` - Complete Grade 4 curriculum structure
- `app/api/curriculum/import-khan-academy/route.ts` - API endpoint to access curriculum
- `lib/curriculum/merge-khan-academy.ts` - Utility functions to merge with existing curriculum

## Usage

### 1. Access via API

```typescript
// Get all units
const response = await fetch('/api/curriculum/import-khan-academy?format=units')
const data = await response.json()
console.log(data.units) // Array of 18 units

// Get all lessons (flattened)
const response = await fetch('/api/curriculum/import-khan-academy?format=lessons')
const data = await response.json()
console.log(data.lessons) // Array of all lessons

// Get specific unit
const response = await fetch('/api/curriculum/import-khan-academy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ unitId: 'unit-1-place-value' })
})
const data = await response.json()
console.log(data.unit)
```

### 2. Use in Code

```typescript
import { 
  khanAcademyGrade4Units, 
  getAllGrade4Lessons,
  getUnitById,
  getLessonsByUnit 
} from '@/lib/curriculum/grade4-khan-academy'

// Get all units
const units = khanAcademyGrade4Units

// Get all lessons
const allLessons = getAllGrade4Lessons()

// Get specific unit
const unit = getUnitById('unit-1-place-value')

// Get lessons from a unit
const lessons = getLessonsByUnit('unit-1-place-value')
```

### 3. Merge with Existing Curriculum

```typescript
import { mergeKhanAcademyGrade4 } from '@/lib/curriculum/merge-khan-academy'

// Replace existing Grade 4 lessons
const mergedLessons = mergeKhanAcademyGrade4(true)

// Or add to existing (avoiding duplicates)
const mergedLessons = mergeKhanAcademyGrade4(false)
```

## Integration Steps

To fully integrate this into your app:

1. **Update the curriculum.ts file** to include these lessons, OR
2. **Use the merge utility** to combine with existing curriculum
3. **Update the UI** to show units if desired
4. **Test** that all lessons work correctly

## Notes

- All lessons use `/assets/demo.mp4` as the video URL (you'll need to replace with actual videos)
- Lessons are ordered sequentially across all units
- Each lesson has a topicId that maps to existing topics
- All language is simplified for 5-year-old level as per your requirements

## Next Steps

1. Replace video URLs with actual lesson videos
2. Add more detailed descriptions if needed
3. Consider adding unit-based navigation in the UI
4. Test quiz and flashcard generation for all lessons

