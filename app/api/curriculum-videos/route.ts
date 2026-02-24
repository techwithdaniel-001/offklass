import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Pattern: number-dash-title.extension (e.g. 1-Place value blocks.mp4, 2-.mp4)
const VIDEO_PATTERN = /^(\d+)-(.*)\.(mp4|webm|mov)$/i
const VIDEO_EXT = ['.mp4', '.webm', '.mov']

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const unit = searchParams.get('unit')
    if (!unit || !/^\d+$/.test(unit)) {
      return NextResponse.json({ error: 'Invalid or missing unit' }, { status: 400 })
    }
    const unitNum = parseInt(unit, 10)
    if (unitNum < 1 || unitNum > 8) {
      return NextResponse.json({ error: 'Unit must be 1–8' }, { status: 400 })
    }

    const dir = path.join(process.cwd(), 'public', 'assets', 'curriculum', `unit-${unitNum}`)
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ videos: [] })
    }

    const files = fs.readdirSync(dir)
    const videos: { index: number; filename: string; title: string }[] = []

    for (const file of files) {
      const match = file.match(VIDEO_PATTERN)
      if (match) {
        const index = parseInt(match[1], 10)
        const title = (match[2] || '').trim() // whatever comes after the dash
        const ext = (match[3] || '').toLowerCase()
        if (VIDEO_EXT.includes(`.${ext}`)) {
          videos.push({ index, filename: file, title })
        }
      }
    }

    videos.sort((a, b) => a.index - b.index)
    return NextResponse.json({ videos })
  } catch (err) {
    console.error('curriculum-videos error:', err)
    return NextResponse.json({ error: 'Failed to list videos' }, { status: 500 })
  }
}
