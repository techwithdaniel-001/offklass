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

    const prompt = `You are a math teacher creating flashcards for grade ${grade} students. The lesson is about: ${lessonTitle || lessonId}.

Create 4-6 flashcards in ${languageName}. Each flashcard should:
1. Have a concept term on the front (short, 1-3 words)
2. Have a clear explanation on the back (2-3 sentences)
3. Be appropriate for grade ${grade} level
4. Help students understand key concepts from the lesson

Return a JSON array with this exact format:
[
  {
    "front": "Concept term in ${languageName}",
    "back": "Clear explanation in ${languageName}",
    "concept": "concept_keyword"
  }
]

Only return the JSON array, no other text.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful math teacher. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response
    let flashcards
    try {
      // Remove any markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      flashcards = JSON.parse(cleanedContent)
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

