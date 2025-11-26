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

    // Get lesson title for context
    const lessonContext = lessonTitle || lessonId

    // Language names for prompts
    const languageNames: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      sw: 'Swahili',
      ar: 'Arabic',
    }

    const languageName = languageNames[language] || 'English'

    const prompt = `You are a math teacher creating a quiz for grade ${grade} students. The lesson is about: ${lessonContext}.

Create 3-5 quiz questions in ${languageName}. Each question should:
1. Be appropriate for grade ${grade} level
2. Test understanding of the concept
3. Have 4 multiple choice options
4. Include a clear explanation

Return a JSON array with this exact format:
[
  {
    "question": "Question text in ${languageName}",
    "options": ["option1", "option2", "option3", "option4"],
    "correctAnswer": 0,
    "explanation": "Clear explanation in ${languageName} of why this answer is correct",
    "difficulty": "easy"
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
      max_tokens: 2000,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response
    let questions
    try {
      // Remove any markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      questions = JSON.parse(cleanedContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid JSON response from AI')
    }

    // Format questions with IDs
    const formattedQuestions = questions.map((q: any, index: number) => ({
      id: `${lessonId}-${index + 1}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty || 'medium',
    }))

    return NextResponse.json({ questions: formattedQuestions })
  } catch (error: any) {
    console.error('Error generating quiz:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate quiz' },
      { status: 500 }
    )
  }
}

