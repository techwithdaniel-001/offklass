import { NextRequest, NextResponse } from 'next/server'
import { khanAcademyGrade4Units, getAllGrade4Lessons } from '@/lib/curriculum/grade4-khan-academy'

// API route to get Khan Academy Grade 4 curriculum structure
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'units' // 'units' or 'lessons'

    if (format === 'lessons') {
      // Return all lessons flattened
      const allLessons = getAllGrade4Lessons()
      return NextResponse.json({
        success: true,
        count: allLessons.length,
        lessons: allLessons,
      })
    }

    // Return units with lessons
    return NextResponse.json({
      success: true,
      grade: '4',
      unitCount: khanAcademyGrade4Units.length,
      units: khanAcademyGrade4Units,
    })
  } catch (error: any) {
    console.error('Error fetching Khan Academy curriculum:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch curriculum' },
      { status: 500 }
    )
  }
}

// API route to get a specific unit
export async function POST(request: NextRequest) {
  try {
    const { unitId } = await request.json()

    if (!unitId) {
      return NextResponse.json(
        { error: 'unitId is required' },
        { status: 400 }
      )
    }

    const unit = khanAcademyGrade4Units.find(u => u.id === unitId)
    
    if (!unit) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      unit,
    })
  } catch (error: any) {
    console.error('Error fetching unit:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch unit' },
      { status: 500 }
    )
  }
}

