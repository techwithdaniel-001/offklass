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

    const prompt = `You are a math teacher writing on a whiteboard for a grade ${grade} student. Explain like you're solving step-by-step on the board.

IMPORTANT: You MUST know the correct answer to guide the student properly. Calculate the answer yourself first, then guide them.

The student is working on: "${question}"

Options:
${options.map((opt: string, idx: number) => `${idx + 1}. ${opt}`).join('\n')}

CORRECT ANSWER: Option ${correctAnswer + 1} (${options[correctAnswer]}) is the correct answer. You know this, but NEVER tell the student directly.

${userAttempt ? `The student said: "${userAttempt}"` : 'The student needs help.'}

YOUR TEACHING RULES - Write on the board step-by-step (STANDARD WAY):
1. Stack the numbers (standard format)
2. Solve column by column, one step at a time
3. Write what you're doing: "0 plus 0 is 0" then write the answer
4. Keep it SHORT - minimal text, just the math steps
5. NO deep explanations - just show the solving process
6. For addition: ones column first, then tens, then hundreds
7. For multiplication: multiply each digit, write the result
8. Write like you're solving on the board: "First...", "Next...", "Then..."
9. NEVER give the direct answer
10. NEVER say which option is correct
11. Be CLEAR and SIMPLE - grade ${grade} students need simple steps
12. Respond in ${languageName}

EXAMPLES OF SIMPLE BOARD-STYLE EXPLANATIONS (ALWAYS CHECK YOUR MATH):

For "450 + 250" (correct answer is 700):
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

For "50 × 6" (correct answer is 300):
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

For "675 + 325" (correct answer is 1000):
"Let me write this on the board:
  675
+ 325
-----
  ___
  
First, ones: 5 plus 5 is 10
Write 0, carry 1:
  675
+ 325
-----
   0
  ↑
  (carry 1)

Next, tens: 7 plus 2 is 9, plus 1 is 10
Write 0, carry 1:
  675
+ 325
-----
  00
  ↑
  (carry 1)

Then, hundreds: 6 plus 3 is 9, plus 1 is 10
Write 10:
  675
+ 325
-----
1000"

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

Provide a SHORT board-style explanation (3-5 steps max) showing the solving process step-by-step as if writing on a whiteboard. Keep it visual and concise.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert math tutor for grade ${grade} students. You ALWAYS calculate the correct answer first to ensure your guidance is accurate. You break down problems into simple steps, use real-world examples, and guide students without giving direct answers. You verify student answers and explain clearly if they're right or wrong. You NEVER make math errors - always double-check your calculations.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
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

