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

CRITICAL: You MUST calculate the correct answer yourself FIRST and verify it's correct before creating the explanation.

Create 3-5 quiz questions in ${languageName}. Each question should:
1. Be appropriate for grade ${grade} level
2. Test understanding of the concept
3. Have 4 multiple choice options
4. Include a SHORT, step-by-step explanation like you're writing on a board
5. The explanation MUST show the CORRECT solving process with CORRECT math

CRITICAL: For the explanation, you MUST use this EXACT format - NO DEVIATIONS:

FORMAT RULES:
1. Start with: "Let me solve this:"
2. Show problem stacked with answer box:
   [number1]
   [operator] [number2]
   ------
3. Then solve step-by-step, showing updated answer after EACH step
4. Use this EXACT format for each step:
   "First, [column name]: [calculation]"
   "Write [digit], [carry if needed]:"
   [show updated problem with answer so far]
5. Keep it SHORT - minimal text, just the math steps
6. NO extra explanations - just the solving process
7. Show final answer at the end

EXAMPLE FORMAT (you MUST follow this exactly):
"Let me solve this:
  23
×  4
-----

First, ones: 4 times 3 is 12
Write 2, carry 1:
  23
×  4
----
   2
  ↑
  (carry 1)

Next, tens: 4 times 2 is 8, plus 1 is 9
Write 9:
  23
×  4
----
  92"

EXAMPLE FOR ADDITION (follow this exactly):
"Let me solve this:
  450
+ 250
-----

First, ones: 0 plus 0 is 0
Write 0:
  450
+ 250
----
   0

Next, tens: 5 plus 5 is 10
Write 0, carry 1:
  450
+ 250
----
  00
  ↑
  (carry 1)

Then, hundreds: 4 plus 2 plus 1 is 7
Write 7:
  450
+ 250
----
 700"

EXAMPLE FOR MULTIPLICATION (follow this exactly):
"Let me solve this:
  50
×  6
----

6 times 0 is 0
Write 0:
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

Example for subtraction with borrowing (4.6 - 1.9):
"Let me solve this:
  4.6
- 1.9
----

First, tenths: 6 minus 9 cannot, borrow 1
Now, tenths: 16 minus 9 is 7
Write 7:
  4.6
- 1.9
----
   .7
  ↑
  (borrowed 1, so 4 becomes 3)

Next, ones: 3 minus 1 is 2
Write 2:
  4.6
- 1.9
----
 2.7"

CRITICAL MATH RULES:
- For subtraction with borrowing: After borrowing, the number decreases by 1
  Example: 4.6 - 1.9, borrow from 4 → 4 becomes 3 → then 3 - 1 = 2 (NOT 4 - 2)
- ALWAYS calculate the answer yourself FIRST and verify it's correct
- Double-check EVERY step before writing it

Return a JSON array with this exact format:
[
  {
    "question": "Question text in ${languageName}",
    "options": ["option1", "option2", "option3", "option4"],
    "correctAnswer": 0,
    "explanation": "MUST follow this exact format: Start with 'Let me solve this:', show problem stacked, solve step-by-step showing updated answer after each step. Use format: 'First, [column]: [calculation]' then show updated problem. Keep it SHORT - just math steps.",
    "difficulty": "easy"
  }
]

Only return the JSON array, no other text.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a math teacher writing on a whiteboard. CRITICAL RULES:
1. ALWAYS calculate the answer yourself FIRST and verify it's correct
2. For subtraction with borrowing: After borrowing, the number you borrowed FROM decreases by 1
   Example: 4.6 - 1.9, after borrowing from 4, it becomes 3, so 3 - 1 = 2 (NOT 4 - 2)
3. Double-check EVERY calculation before writing it
4. Use EXACT format: Start with "Let me solve this:", show problem stacked, solve step-by-step
5. After each step, show updated problem with answer
6. Keep it SHORT - just math steps
7. Always respond with valid JSON only.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
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

