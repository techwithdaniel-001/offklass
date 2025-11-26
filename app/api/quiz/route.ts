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

    const prompt = `You are a math teacher writing on a whiteboard for grade ${grade} students. The lesson is about: ${lessonContext}.

Create 3-5 quiz questions in ${languageName}. Each question should:
1. Be appropriate for grade ${grade} level
2. Test understanding of the concept
3. Have 4 multiple choice options
4. Include a SHORT, step-by-step explanation like you're writing on a board

CRITICAL: For the explanation, write it EXACTLY like a teacher writing on a whiteboard - SIMPLE and STEP-BY-STEP:
- Stack the numbers (standard way) with a line and answer box (___)
- Show the problem first: numbers stacked with line and answer box
- Solve column by column, one step at a time
- After each step, show the updated answer with what you wrote
- Write what you're doing: "0 plus 0 is 0" then show where to write it
- Keep it SHORT - minimal text, just the solving steps
- NO deep explanations about place value or concepts
- Show the answer box (___) so students know where to write
- Update the answer after each step so they can follow along with paper and pen

Example for addition (450 + 250):
"Let me write this on the board:
  450
+ 250
-----
  ___
  
First, ones column: 0 plus 0 is 0
Write 0 in the ones place:
  450
+ 250
-----
   0

Next, tens column: 5 plus 5 is 10
Write 0, carry 1:
  450
+ 250
-----
  00
  ↑
  (carry 1)

Then, hundreds column: 4 plus 2 plus 1 is 7
Write 7:
  450
+ 250
-----
 700"

Example for multiplication (50 × 6):
"Let me solve this:
  50
×  6
----
  ___
  
6 times 0 is 0
Write 0 in ones place:
  50
×  6
----
   0

6 times 5 is 30
Write 30:
  50
×  6
----
 300"

Return a JSON array with this exact format:
[
  {
    "question": "Question text in ${languageName}",
    "options": ["option1", "option2", "option3", "option4"],
    "correctAnswer": 0,
    "explanation": "Short board-style explanation showing step-by-step solving process",
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

