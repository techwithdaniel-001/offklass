import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { lessonId, grade, language, lessonTitle } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Language names for prompts
    const languageNames: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      sw: 'Swahili',
      ar: 'Arabic',
    }

    const languageName = languageNames[language] || 'English'

    const prompt = `Create 4-6 math flashcards for grade ${grade} in ${languageName}. Lesson: ${lessonTitle || lessonId}. Front = short term (1-3 words), back = simple explanation (2-3 sentences). Use simple words (add not addition, take away not subtract). Return a JSON object with key "flashcards" containing an array of objects with "front", "back", "concept". Only JSON, no other text.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a math teacher. Respond with valid JSON only: {"flashcards":[{front,back,concept},...]}.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response (response_format: json_object ensures valid object)
    let flashcards: any[]
    try {
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleanedContent)
      flashcards = Array.isArray(parsed.flashcards) ? parsed.flashcards : Array.isArray(parsed) ? parsed : []
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid JSON response from AI')
    }

    // Format flashcards with IDs
    const formattedFlashcards = flashcards.map((card: any, index: number) => ({
      id: `${lessonId}-flashcard-${index + 1}`,
      front: card.front,
      back: card.back,
      concept: card.concept || lessonId,
    }))

    return NextResponse.json({ flashcards: formattedFlashcards })
  } catch (error: any) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate flashcards' },
      { status: 500 }
    )
  }
}

