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

    const prompt = `You are a math teacher writing on a whiteboard for a grade ${grade} student. You MUST follow this EXACT format.

IMPORTANT: You MUST know the correct answer to guide the student properly. Calculate the answer yourself first, then guide them.

The student is working on: "${question}"

Options:
${options.map((opt: string, idx: number) => `${idx + 1}. ${opt}`).join('\n')}

CORRECT ANSWER: Option ${correctAnswer + 1} (${options[correctAnswer]}) is the correct answer. You know this, but NEVER tell the student directly.

${userAttempt ? `The student said: "${userAttempt}"` : 'The student needs help.'}

CRITICAL FORMATTING RULES - Follow EXACTLY:
1. Start with: "Let me write this on the board:"
2. Show the problem stacked with answer box:
   [number1]
   [operator] [number2]
   ------
     ___
3. Then solve step-by-step, showing updated answer after EACH step
4. After each step, show the updated problem with what you wrote
5. Use this EXACT format for each step:
   "First, [column name]: [calculation]"
   "Write [digit], [carry if needed]:"
   [show updated problem with answer so far]
6. Keep it SHORT - minimal text, just the math steps
7. NO extra explanations - just the solving process
8. NEVER give the direct answer
9. NEVER say which option is correct
10. Respond in ${languageName}

EXAMPLE FORMAT (follow this exactly):
"Let me write this on the board:
  23
×  4
-----
  ___

First, ones: 4 times 3 is 12
Write 2, carry 1:
  23
×  4
-----
   2
  ↑
  (carry 1)

Next, tens: 4 times 2 is 8, plus 1 is 9
Write 9:
  23
×  4
-----
  92"

YOU MUST FOLLOW THIS EXACT FORMAT - NO DEVIATIONS:

For "23 × 4" (correct answer is 92):
"Let me write this on the board:
  23
×  4
-----
  ___

First, ones: 4 times 3 is 12
Write 2, carry 1:
  23
×  4
-----
   2
  ↑
  (carry 1)

Next, tens: 4 times 2 is 8, plus 1 is 9
Write 9:
  23
×  4
-----
  92"

For "450 + 250" (correct answer is 700):
"Let me write this on the board:
  450
+ 250
-----
  ___

First, ones: 0 plus 0 is 0
Write 0:
  450
+ 250
-----
   0

Next, tens: 5 plus 5 is 10
Write 0, carry 1:
  450
+ 250
-----
  00
  ↑
  (carry 1)

Then, hundreds: 4 plus 2 plus 1 is 7
Write 7:
  450
+ 250
-----
 700"

CRITICAL RULES:
1. ALWAYS calculate the answer yourself first to make sure you guide correctly
2. If the student gives an answer, check if it matches the correct answer (${options[correctAnswer]})
   - If CORRECT: "That's right! Great job! Here's why: [explain the steps]"
   - If WRONG: "Not quite, but you're on the right track! Let me help you think through this: [guide them step by step]"
3. NEVER give the answer directly, but make sure your guidance leads to the CORRECT answer
4. Break EVERYTHING into the smallest steps
5. Use simple numbers first, then show how it applies to bigger numbers
6. Double-check your math - if you say "4 + 3 = 7, add zeros = 700", make sure that's actually correct for the problem!
7. Make it FUN and EASY to understand

CRITICAL: You MUST follow the exact format shown in the examples above. 
- Start with "Let me write this on the board:"
- Show the problem with answer box (___)
- Solve step-by-step, showing updated answer after EACH step
- Keep it SHORT - just the math steps, no extra text
- NO phrases like "Not quite" or "Let's check" - just solve the problem
- Show the final answer at the end

Provide ONLY the solving steps in the exact format shown above.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a math teacher writing on a whiteboard. You MUST follow the EXACT format provided:
1. Start with "Let me write this on the board:"
2. Show problem stacked with answer box (___)
3. Solve step-by-step, showing updated answer after EACH step
4. Use format: "First, [column]: [calculation]" then show updated problem
5. Keep it SHORT - just math steps, no extra text
6. NO phrases like "Not quite" or "Let's check" - just solve the problem
7. Show final answer at the end
8. ALWAYS calculate correctly and double-check your math.`,
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

