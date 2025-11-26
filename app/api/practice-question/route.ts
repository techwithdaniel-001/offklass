import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { lessonId, grade, language, lessonTitle, topic } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Get lesson title for context
    const lessonContext = lessonTitle || lessonId || topic

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

Create 1 NEW practice question in ${languageName} that is DIFFERENT from any previous questions. The question should:
1. Be appropriate for grade ${grade} level
2. Test understanding of the concept: ${lessonContext}
3. Have 4 multiple choice options
4. Include a SHORT, step-by-step explanation like you're writing on a board
5. The explanation MUST show the CORRECT solving process with CORRECT math
6. Be a NEW question - different numbers, different scenario, but same concept

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

Return a JSON object with this exact format:
{
  "question": "Question text in ${languageName}",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Board-style explanation following the format above",
  "difficulty": "easy"
}

IMPORTANT: Generate a NEW question with DIFFERENT numbers/scenario but same concept.`

    const systemMessage = `You are a helpful math teacher assistant. You MUST:
1. Always respond with valid JSON only
2. Calculate the correct answer yourself FIRST
3. Follow the EXACT format specified
4. Generate a NEW practice question (different from previous ones)
5. Verify your math is correct before responding`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const questionData = JSON.parse(content)

    // Validate the response
    if (!questionData.question || !questionData.options || questionData.correctAnswer === undefined) {
      throw new Error('Invalid question format from AI')
    }

    // Generate a unique ID
    const question = {
      id: `practice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: questionData.question,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation || '',
      difficulty: questionData.difficulty || 'medium',
    }

    return NextResponse.json({ question })
  } catch (error) {
    console.error('Error generating practice question:', error)
    return NextResponse.json(
      { error: 'Failed to generate practice question' },
      { status: 500 }
    )
  }
}

