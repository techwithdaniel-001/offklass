import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OpenAI API key not configured')
  return new OpenAI({ apiKey })
}

export async function POST(request: NextRequest) {
  try {
    const { lessonId, grade, language, lessonTitle, lessonDescription, failedConcepts } = await request.json()
    const conceptsToFocus = Array.isArray(failedConcepts) && failedConcepts.length > 0
      ? failedConcepts.filter((c: unknown) => typeof c === 'string').slice(0, 20)
      : []

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Match the exact video lesson: title + description so quiz is not different from what they just learned
    const lessonContext = [lessonTitle, lessonDescription].filter(Boolean).join('. ') || lessonId

    // Language names for prompts
    const languageNames: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      sw: 'Swahili',
      ar: 'Arabic',
    }

    const languageName = languageNames[language] || 'English'

    const focusInstruction = conceptsToFocus.length > 0
      ? `\nIMPORTANT: The student got these questions/concepts wrong. Create questions that FOCUS on practicing these same concepts (rephrased, different numbers):\n${conceptsToFocus.map((c: string) => `- ${c}`).join('\n')}\n`
      : ''
    const prompt = `You are a math teacher writing on a whiteboard for grade ${grade} students (use very simple words like you're talking to a 5-year-old).

CRITICAL: The quiz MUST match the EXACT lesson the student just watched. Use ONLY this lesson topic — do not add unrelated concepts.
Lesson: ${lessonContext}.${focusInstruction}

CRITICAL: You MUST calculate the correct answer yourself FIRST and verify it's correct before creating the explanation.

Create a minimum of 12 quiz questions in ${languageName}. Use VERY SIMPLE words that a 5-year-old can understand. Each question should:
1. Be appropriate for grade ${grade} level
2. Use simple, easy words (like "add" instead of "addition", "take away" instead of "subtract")
3. Test understanding of the concept
4. Have 4 multiple choice options (use simple words in options too)
5. Include a SHORT, step-by-step explanation like you're writing on a board
6. The explanation MUST show the CORRECT solving process with CORRECT math
7. Use words like "plus" instead of "addition", "times" instead of "multiplication", "take away" instead of "subtraction"

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

Return a JSON object with a single key "questions" containing an array of question objects. Each object: "question", "options" (array of 4 strings), "correctAnswer" (0-3), "explanation" (short step-by-step), "difficulty" ("easy"/"medium"). Example: {"questions":[{"question":"...","options":["a","b","c","d"],"correctAnswer":0,"explanation":"Let me solve this:...","difficulty":"easy"}]}. Only return this JSON object, no other text.`

    const openai = getOpenAI()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a math teacher writing on a whiteboard. Be concise to keep responses fast. CRITICAL RULES:
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
      max_tokens: 3500,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response (response_format: json_object ensures valid object)
    let questions
    try {
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleanedContent)
      questions = Array.isArray(parsed.questions) ? parsed.questions : Array.isArray(parsed) ? parsed : []
      if (questions.length === 0) throw new Error('Questions array empty')
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid JSON response from AI')
    }

    // Validate and fix answers - ensure correctAnswer matches the actual correct option
    const validatedQuestions = questions.map((q: any) => {
      // Try to extract the correct answer from the question text
      const questionText = q.question || ''
      const options = q.options || []
      
      // For math questions, try to calculate the answer
      // Extract numbers and operation from question (handles various formats)
      const mathPatterns = [
        /What is (\d+\.?\d*)\s*([+\-×÷x*])\s*(\d+\.?\d*)/i,
        /(\d+\.?\d*)\s*([+\-×÷x*])\s*(\d+\.?\d*)/,
      ]
      
      let calculatedAnswer: number | null = null
      
      for (const pattern of mathPatterns) {
        const match = questionText.match(pattern)
        if (match) {
          const [, num1, op, num2] = match
          const num1Val = parseFloat(num1)
          const num2Val = parseFloat(num2)
          
          if (!isNaN(num1Val) && !isNaN(num2Val)) {
            switch (op) {
              case '+':
              case 'x':
              case '*':
                calculatedAnswer = num1Val + num2Val
                break
              case '-':
                calculatedAnswer = num1Val - num2Val
                break
              case '×':
              case '*':
                calculatedAnswer = num1Val * num2Val
                break
              case '÷':
              case '/':
                calculatedAnswer = num1Val / num2Val
                break
            }
            break
          }
        }
      }
      
      // Find which option matches the calculated answer
      if (calculatedAnswer !== null) {
        const correctIndex = options.findIndex((opt: string) => {
          // Extract number from option (handle formats like "6.3", "Answer: 6.3", etc.)
          const optStr = opt.toString().replace(/[^\d.]/g, '')
          const optNum = parseFloat(optStr)
          return !isNaN(optNum) && Math.abs(optNum - calculatedAnswer!) < 0.01
        })
        
        if (correctIndex !== -1) {
          if (correctIndex !== q.correctAnswer) {
            console.warn(`Answer mismatch for question: ${questionText}. Calculated: ${calculatedAnswer}, Expected index ${correctIndex} but got ${q.correctAnswer}`)
          }
          q.correctAnswer = correctIndex
        }
      }
      
      return q
    })

    // Format questions with IDs
    let formattedQuestions = validatedQuestions.map((q: any, index: number) => ({
      id: `${lessonId}-${index + 1}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty || 'medium',
    }))

    // Ensure we have at least 12 questions - generate more if needed
    if (formattedQuestions.length < 12) {
      const additionalNeeded = 12 - formattedQuestions.length
      const additionalPrompt = `Generate ${additionalNeeded} more quiz questions for the same lesson: ${lessonContext}. Same rules: simple words, 4 options, short step-by-step explanation. Return a JSON object with key "questions" containing the array. Only JSON, no other text.`

      try {
        const additionalCompletion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a math teacher. Respond with valid JSON only: {"questions":[...]}.' },
            { role: 'user', content: additionalPrompt },
          ],
          temperature: 0.3,
          max_tokens: 2500,
          response_format: { type: 'json_object' },
        })

        const additionalContent = additionalCompletion.choices[0]?.message?.content
        if (additionalContent) {
          const cleanedAdditional = additionalContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          const parsedAdditional = JSON.parse(cleanedAdditional)
          const additionalQuestions = Array.isArray(parsedAdditional?.questions) ? parsedAdditional.questions : Array.isArray(parsedAdditional) ? parsedAdditional : []
          if (additionalQuestions.length > 0) {
            const additionalFormatted = additionalQuestions.map((q: any, index: number) => ({
              id: `${lessonId}-${formattedQuestions.length + index + 1}`,
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              difficulty: q.difficulty || 'medium',
            }))
            formattedQuestions = [...formattedQuestions, ...additionalFormatted]
          }
        }
      } catch (error) {
        console.error('Error generating additional questions:', error)
        // Continue with what we have
      }
    }

    return NextResponse.json({ questions: formattedQuestions })
  } catch (error: any) {
    console.error('Error generating quiz:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate quiz' },
      { status: 500 }
    )
  }
}

