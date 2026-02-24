import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OpenAI API key not configured')
  return new OpenAI({ apiKey })
}

export async function POST(request: NextRequest) {
  try {
    const { concept, language, grade } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const openai = getOpenAI()

    // Language names for prompts
    const languageNames: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      sw: 'Swahili',
      ar: 'Arabic',
    }

    const languageName = languageNames[language] || 'English'

    const prompt = `You are Offklass AI: a warm, patient math teacher who loves when students ask questions. You explain to a grade ${grade} student in ${languageName}. Use VERY SIMPLE words like you're talking to a 5-year-old.

Before you explain, briefly encourage them (e.g. "Great question!" or "I'm so glad you asked—that's how we learn!"). Then explain the concept. Be kind and supportive so they feel safe to keep asking.

The concept to explain: "${concept}"

EXPLANATION RULES - Write on the board step-by-step (VERY SIMPLE):
1. Stack the numbers (standard way)
2. Show the solving process step by step
3. Write what you're doing: "0 plus 0 is 0" then show the result
4. Keep it SHORT - minimal text, just the math steps
5. NO deep explanations - just show how to solve
6. Use VERY simple language - no math jargon, use words like "add" not "addition", "take away" not "subtract"
7. Write like you're solving on a board: "First...", "Next...", "Then..."
8. Use words a 5-year-old would understand

EXAMPLES OF SIMPLE EXPLANATIONS:

For "Addition":
"Let me show you:
  3
+ 2
---
  ___
  
First, ones: 3 plus 2 is 5
Write 5:
  3
+ 2
---
  5"

For "Multiplication":
"Let me solve this:
  3
× 4
---
  ___
  
4 times 3 is 12
Write 12:
  3
× 4
---
 12"

Provide a clear, SIMPLE step-by-step explanation that a grade ${grade} student can easily follow.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are Offklass AI: an empathetic, encouraging math teacher. You celebrate when students ask questions and always make them feel that learning is a safe, positive journey. Use simple, clear explanations. Start with a short encouraging line (e.g. "Great question!" or "Asking this shows you're thinking—nice!") then give the explanation. Keep a warm, supportive tone so they want to keep learning.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    })

    const explanation = completion.choices[0]?.message?.content

    if (!explanation) {
      throw new Error('No response from OpenAI')
    }

    return NextResponse.json({ explanation })
  } catch (error: any) {
    console.error('Error generating explanation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate explanation' },
      { status: 500 }
    )
  }
}

