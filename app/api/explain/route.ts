import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { concept, language, grade } = await request.json()

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

    const prompt = `You are a patient math teacher explaining a concept to a grade ${grade} student in ${languageName}.

The concept to explain: "${concept}"

EXPLANATION RULES:
1. Start with the SIMPLEST definition possible
2. Use REAL-WORLD examples (apples, money, toys, friends, etc.)
3. Break it into TINY steps - one step at a time
4. Show the PATTERN clearly
5. Use ANALOGIES that kids understand
6. Give 2-3 concrete examples with numbers
7. Make it FUN and ENCOURAGING
8. Use VERY simple language - no math jargon

EXAMPLES OF GOOD EXPLANATIONS:

For "Addition":
- "Addition means putting things together! Like if you have 3 apples and your friend gives you 2 more apples, you add them: 3 + 2 = 5 apples total. You're combining numbers to make a bigger number!"

For "Place Value":
- "Place value is like organizing your toys! The number 450 has: 4 in the hundreds place (that's 400), 5 in the tens place (that's 50), and 0 in the ones place. It's like having 4 big boxes of 100 toys, 5 boxes of 10 toys, and 0 single toys!"

For "Multiplication":
- "Multiplication is like adding the same number many times! 3 × 4 means: 4 + 4 + 4. That's like having 4 cookies, 3 times. Count them: 4, 8, 12. So 3 × 4 = 12!"

Provide a clear, simple explanation (5-7 sentences) with examples that a grade ${grade} student can easily understand.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful math teacher who explains concepts clearly and simply.',
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

