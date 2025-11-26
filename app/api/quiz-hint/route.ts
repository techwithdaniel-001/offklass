import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { question, options, correctAnswer, userAttempt, language, grade } = await request.json()

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

    const prompt = `You are a math teacher. You MUST use this EXACT format - copy it exactly.

CRITICAL: Calculate the answer yourself FIRST and verify it matches the correct answer: ${options[correctAnswer]}

The student is working on: "${question}"

Options:
${options.map((opt: string, idx: number) => `${idx + 1}. ${opt}`).join('\n')}

CORRECT ANSWER: Option ${correctAnswer + 1} (${options[correctAnswer]}) is the correct answer.
VERIFY: Calculate ${question} yourself. The answer should be ${options[correctAnswer]}. If your calculation doesn't match, recalculate until it does.

${userAttempt ? `The student said: "${userAttempt}"` : 'The student needs help.'}

YOU MUST USE THIS EXACT FORMAT - NO DEVIATIONS:

For multiplication (23 × 4):
"Let me solve this:
  23
×  4
----

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

For addition (450 + 250):
"Let me solve this:
  450
+ 250
----

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

For subtraction with borrowing (4.6 - 1.9):
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

CRITICAL RULES:
1. ALWAYS calculate the answer yourself FIRST: ${question} = ?
2. VERIFY your answer matches: ${options[correctAnswer]}
3. For subtraction with borrowing: After borrowing, the number decreases by 1
   Example: 4.6 - 1.9, borrow from 4, so 4 becomes 3, then 3 - 1 = 2 (NOT 4 - 2)
4. Double-check EVERY step before writing it
5. Start with "Let me solve this:"
6. Show problem stacked (no answer box needed)
7. After each step, show the updated problem with answer so far
8. Use format: "First, [column]: [calculation]" then "Write [digit], [carry/borrow if needed]:"
9. Keep it SHORT - just math steps, no extra text
10. NO phrases like "Not quite" or "Let's check" - just solve
11. Respond in ${languageName}

Now solve the student's problem using this EXACT format.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a math teacher. CRITICAL RULES:
1. ALWAYS calculate the answer yourself FIRST and verify it's correct
2. For subtraction with borrowing: After borrowing, the number decreases by 1
   Example: 4.6 - 1.9, borrow from 4 → 4 becomes 3 → 3 - 1 = 2 (NOT 4 - 2)
3. Double-check EVERY calculation before writing it
4. Use EXACT format: "Let me solve this:", show problem stacked, solve step-by-step
5. After each step, show updated problem with answer
6. Keep it SHORT - just math steps
7. NO extra text - just solve
8. ALWAYS calculate correctly - verify your math matches the correct answer`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 400,
    })

    const hint = completion.choices[0]?.message?.content

    if (!hint) {
      throw new Error('No response from OpenAI')
    }

    return NextResponse.json({ hint })
  } catch (error: any) {
    console.error('Error generating hint:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate hint' },
      { status: 500 }
    )
  }
}

