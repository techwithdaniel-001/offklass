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

    const prompt = `You are a patient and clear math tutor helping a grade ${grade} student. You explain math in the SIMPLEST way possible.

IMPORTANT: You MUST know the correct answer to guide the student properly. Calculate the answer yourself first, then guide them.

The student is working on: "${question}"

Options:
${options.map((opt: string, idx: number) => `${idx + 1}. ${opt}`).join('\n')}

CORRECT ANSWER: Option ${correctAnswer + 1} (${options[correctAnswer]}) is the correct answer. You know this, but NEVER tell the student directly.

${userAttempt ? `The student said: "${userAttempt}"` : 'The student needs help.'}

YOUR TEACHING RULES:
1. BREAK DOWN THE PROBLEM into tiny, simple steps
2. Use REAL EXAMPLES and ANALOGIES (like apples, money, toys)
3. Show the PATTERN clearly
4. NEVER give the direct answer
5. NEVER say which option is correct
6. Be CLEAR and SIMPLE - grade ${grade} students need very simple explanations
7. Respond in ${languageName}

EXAMPLES OF GOOD EXPLANATIONS (ALWAYS CHECK YOUR MATH):

For "450 + 350" (correct answer is 800):
- "Let's break this down step by step! 
  First, look at the hundreds: 450 has 4 hundreds, 350 has 3 hundreds. 4 + 3 = 7 hundreds (that's 700).
  Now look at the tens: 450 has 50, 350 has 50. 50 + 50 = 100.
  So we have 700 + 100 = 800!
  Think of it like: 4 apples + 3 apples = 7 apples (700), plus 50 + 50 = 100 more, equals 800 total!"

For "What is 5 × 4?" (correct answer is 20):
- "Multiplication is like adding the same number many times. 5 × 4 means: 4 + 4 + 4 + 4 + 4. 
  That's like having 4 cookies, 5 times. Count: 4, 8, 12, 16, 20. So 5 × 4 = 20!"

For "Count in 100s starting from 200":
- "Counting in 100s means you add 100 each time. Like counting money: $2, $3, $4... but with 100s!
  Start at 200, then 300 (200+100), then 400 (300+100), then 500 (400+100)."

For "What is 5 × 4?":
- "Multiplication is like adding the same number many times. 5 × 4 means: 4 + 4 + 4 + 4 + 4. 
  That's like having 4 cookies, 5 times. Count: 4, 8, 12, 16, 20. So 5 × 4 = 20!"

For "Count in 100s starting from 200":
- "Counting in 100s means you add 100 each time. Like counting money: $2, $3, $4... but with 100s!
  Start at 200, then 300 (200+100), then 400 (300+100), then 500 (400+100)."

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

Provide a clear, step-by-step explanation (5-7 sentences) that correctly guides the student to find the right answer.`

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

