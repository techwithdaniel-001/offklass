// Premade quiz questions for each lesson
// These are the base quizzes, students can ask AI for more practice questions

import { QuizQuestion } from './ai-service'

export const premadeQuizzes: Record<string, QuizQuestion[]> = {
  // Grade 3
  'add-subtract-3': [
    {
      id: 'add-subtract-3-1',
      question: 'What is 450 + 250?',
      options: ['600', '700', '650', '750'],
      correctAnswer: 1,
      explanation: `Let me solve this:
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
 700`,
      difficulty: 'easy',
    },
    {
      id: 'add-subtract-3-2',
      question: 'What is 875 - 342?',
      options: ['533', '523', '543', '513'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  875
- 342
-----

First, ones: 5 minus 2 is 3
Write 3:
  875
- 342
----
   3

Next, tens: 7 minus 4 is 3
Write 3:
  875
- 342
----
  33

Then, hundreds: 8 minus 3 is 5
Write 5:
  875
- 342
----
 533`,
      difficulty: 'medium',
    },
    {
      id: 'add-subtract-3-3',
      question: 'What is 234 + 567?',
      options: ['801', '791', '811', '781'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  234
+ 567
-----

First, ones: 4 plus 7 is 11
Write 1, carry 1:
  234
+ 567
----
    1
  ↑
  (carry 1)

Next, tens: 3 plus 6 is 9, plus 1 is 10
Write 0, carry 1:
  234
+ 567
----
   01
  ↑
  (carry 1)

Then, hundreds: 2 plus 5 is 7, plus 1 is 8
Write 8:
  234
+ 567
----
 801`,
      difficulty: 'medium',
    },
  ],
  'multiplication-intro': [
    {
      id: 'multiplication-intro-1',
      question: 'What is 5 × 4?',
      options: ['18', '20', '22', '16'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  5
× 4
----

4 times 5 is 20
Write 20:
  5
× 4
----
 20`,
      difficulty: 'easy',
    },
    {
      id: 'multiplication-intro-2',
      question: 'What is 6 × 7?',
      options: ['40', '42', '44', '38'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  6
× 7
----

7 times 6 is 42
Write 42:
  6
× 7
----
 42`,
      difficulty: 'easy',
    },
    {
      id: 'multiplication-intro-3',
      question: 'What is 8 × 9?',
      options: ['70', '72', '74', '68'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  8
× 9
----

9 times 8 is 72
Write 72:
  8
× 9
----
 72`,
      difficulty: 'medium',
    },
  ],
  // Grade 4 - Decimals
  'decimals-intro': [
    {
      id: 'decimals-intro-1',
      question: 'What is 3.5 + 2.7?',
      options: ['6.2', '6.0', '5.2', '6.4'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  3.5
+ 2.7
----

First, tenths: 5 plus 7 is 12
Write 2, carry 1:
  3.5
+ 2.7
----
   .2
  ↑
  (carry 1)

Next, ones: 3 plus 2 is 5, plus 1 is 6
Write 6:
  3.5
+ 2.7
----
 6.2`,
      difficulty: 'easy',
    },
    {
      id: 'decimals-intro-2',
      question: 'What is 4.6 - 1.9?',
      options: ['2.7', '2.5', '2.9', '3.1'],
      correctAnswer: 0,
      explanation: `Let me solve this:
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
 2.7`,
      difficulty: 'medium',
    },
    {
      id: 'decimals-intro-3',
      question: 'What is 2.8 + 3.4?',
      options: ['6.2', '6.0', '5.8', '6.4'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  2.8
+ 3.4
----

First, tenths: 8 plus 4 is 12
Write 2, carry 1:
  2.8
+ 3.4
----
   .2
  ↑
  (carry 1)

Next, ones: 2 plus 3 is 5, plus 1 is 6
Write 6:
  2.8
+ 3.4
----
 6.2`,
      difficulty: 'easy',
    },
  ],
}

// Get premade quiz for a lesson, or return empty array if none exists
export function getPremadeQuiz(lessonId: string): QuizQuestion[] {
  return premadeQuizzes[lessonId] || []
}

