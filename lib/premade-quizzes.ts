// Premade quiz questions for each lesson
// These are the base quizzes, students can ask AI for more practice questions

import { QuizQuestion } from './ai-service'

export const premadeQuizzes: Record<string, QuizQuestion[]> = {
  // Grade 3 - Arithmetic
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
    {
      id: 'add-subtract-3-4',
      question: 'What is 623 + 189?',
      options: ['802', '812', '792', '822'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  623
+ 189
-----

First, ones: 3 plus 9 is 12
Write 2, carry 1:
  623
+ 189
----
    2
  ↑
  (carry 1)

Next, tens: 2 plus 8 is 10, plus 1 is 11
Write 1, carry 1:
  623
+ 189
----
   12
  ↑
  (carry 1)

Then, hundreds: 6 plus 1 is 7, plus 1 is 8
Write 8:
  623
+ 189
----
 812`,
      difficulty: 'medium',
    },
    {
      id: 'add-subtract-3-5',
      question: 'What is 456 - 278?',
      options: ['178', '168', '188', '158'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  456
- 278
-----

First, ones: 6 minus 8 cannot, borrow 1
Now, ones: 16 minus 8 is 8
Write 8:
  456
- 278
----
    8
  ↑
  (borrowed 1, so 5 becomes 4)

Next, tens: 4 minus 7 cannot, borrow 1
Now, tens: 14 minus 7 is 7
Write 7:
  456
- 278
----
   78
  ↑
  (borrowed 1, so 4 becomes 3)

Then, hundreds: 3 minus 2 is 1
Write 1:
  456
- 278
----
 178`,
      difficulty: 'hard',
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
    {
      id: 'multiplication-intro-4',
      question: 'What is 3 × 9?',
      options: ['24', '27', '30', '21'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  3
× 9
----

9 times 3 is 27
Write 27:
  3
× 9
----
 27`,
      difficulty: 'easy',
    },
    {
      id: 'multiplication-intro-5',
      question: 'What is 7 × 6?',
      options: ['40', '42', '44', '38'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  7
× 6
----

6 times 7 is 42
Write 42:
  7
× 6
----
 42`,
      difficulty: 'easy',
    },
  ],
  'multiplication-tables': [
    {
      id: 'multiplication-tables-1',
      question: 'What is 7 × 8?',
      options: ['54', '56', '58', '52'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  7
× 8
----

8 times 7 is 56
Write 56:
  7
× 8
----
 56`,
      difficulty: 'medium',
    },
    {
      id: 'multiplication-tables-2',
      question: 'What is 9 × 6?',
      options: ['52', '54', '56', '58'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  9
× 6
----

6 times 9 is 54
Write 54:
  9
× 6
----
 54`,
      difficulty: 'medium',
    },
    {
      id: 'multiplication-tables-3',
      question: 'What is 4 × 12?',
      options: ['46', '48', '50', '44'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  12
×  4
----

4 times 2 is 8
Write 8:
  12
×  4
----
   8

4 times 1 is 4
Write 4:
  12
×  4
----
  48`,
      difficulty: 'medium',
    },
    {
      id: 'multiplication-tables-4',
      question: 'What is 11 × 5?',
      options: ['50', '55', '60', '45'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  11
×  5
----

5 times 1 is 5
Write 5:
  11
×  5
----
   5

5 times 1 is 5
Write 5:
  11
×  5
----
  55`,
      difficulty: 'medium',
    },
  ],
  'division-intro': [
    {
      id: 'division-intro-1',
      question: 'What is 20 ÷ 4?',
      options: ['4', '5', '6', '3'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  20 ÷ 4 = ?

4 times what equals 20?
4 × 5 = 20

So 20 ÷ 4 = 5`,
      difficulty: 'easy',
    },
    {
      id: 'division-intro-2',
      question: 'What is 24 ÷ 6?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  24 ÷ 6 = ?

6 times what equals 24?
6 × 4 = 24

So 24 ÷ 6 = 4`,
      difficulty: 'easy',
    },
    {
      id: 'division-intro-3',
      question: 'What is 35 ÷ 7?',
      options: ['4', '5', '6', '7'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  35 ÷ 7 = ?

7 times what equals 35?
7 × 5 = 35

So 35 ÷ 7 = 5`,
      difficulty: 'easy',
    },
    {
      id: 'division-intro-4',
      question: 'What is 18 ÷ 3?',
      options: ['5', '6', '7', '4'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  18 ÷ 3 = ?

3 times what equals 18?
3 × 6 = 18

So 18 ÷ 3 = 6`,
      difficulty: 'easy',
    },
    {
      id: 'division-intro-5',
      question: 'What is 28 ÷ 4?',
      options: ['6', '7', '8', '5'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  28 ÷ 4 = ?

4 times what equals 28?
4 × 7 = 28

So 28 ÷ 4 = 7`,
      difficulty: 'easy',
    },
  ],
  'rounding-numbers': [
    {
      id: 'rounding-numbers-1',
      question: 'Round 47 to the nearest ten.',
      options: ['40', '45', '50', '48'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Round 47 to the nearest ten.

47 is between 40 and 50
47 is closer to 50

So 47 rounds to 50`,
      difficulty: 'easy',
    },
    {
      id: 'rounding-numbers-2',
      question: 'Round 234 to the nearest hundred.',
      options: ['200', '230', '240', '300'],
      correctAnswer: 0,
      explanation: `Let me solve this:
Round 234 to the nearest hundred.

234 is between 200 and 300
234 is closer to 200

So 234 rounds to 200`,
      difficulty: 'medium',
    },
    {
      id: 'rounding-numbers-3',
      question: 'Round 156 to the nearest ten.',
      options: ['150', '155', '160', '156'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Round 156 to the nearest ten.

156 is between 150 and 160
156 is closer to 160

So 156 rounds to 160`,
      difficulty: 'easy',
    },
    {
      id: 'rounding-numbers-4',
      question: 'Round 89 to the nearest ten.',
      options: ['80', '85', '90', '88'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Round 89 to the nearest ten.

89 is between 80 and 90
89 is closer to 90

So 89 rounds to 90`,
      difficulty: 'easy',
    },
    {
      id: 'rounding-numbers-5',
      question: 'Round 125 to the nearest hundred.',
      options: ['100', '120', '130', '200'],
      correctAnswer: 0,
      explanation: `Let me solve this:
Round 125 to the nearest hundred.

125 is between 100 and 200
125 is closer to 100

So 125 rounds to 100`,
      difficulty: 'medium',
    },
  ],
  // Grade 3 - Fractions
  'fractions-intro': [
    {
      id: 'fractions-intro-1',
      question: 'What fraction of the circle is shaded? (3 out of 4 parts)',
      options: ['1/4', '2/4', '3/4', '4/4'],
      correctAnswer: 2,
      explanation: `Let me solve this:
3 out of 4 parts are shaded

The fraction is 3/4
3 is the numerator (parts shaded)
4 is the denominator (total parts)`,
      difficulty: 'easy',
    },
    {
      id: 'fractions-intro-2',
      question: 'What is 1/2 of 8?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 2,
      explanation: `Let me solve this:
1/2 of 8 means divide 8 by 2

8 ÷ 2 = 4

So 1/2 of 8 is 4`,
      difficulty: 'easy',
    },
    {
      id: 'fractions-intro-3',
      question: 'Which fraction is greater: 2/3 or 1/3?',
      options: ['1/3', '2/3', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Compare 2/3 and 1/3

Both have the same denominator (3)
2/3 has numerator 2
1/3 has numerator 1

2 > 1, so 2/3 > 1/3`,
      difficulty: 'easy',
    },
  ],
  'fractions-visual': [
    {
      id: 'fractions-visual-1',
      question: 'Where is 1/2 on a number line from 0 to 1?',
      options: ['At 0', 'At the middle', 'At 1', 'Cannot place'],
      correctAnswer: 1,
      explanation: `Let me solve this:
On a number line from 0 to 1:
- 0 is at the start
- 1 is at the end
- 1/2 is exactly in the middle

So 1/2 is at the middle`,
      difficulty: 'easy',
    },
    {
      id: 'fractions-visual-2',
      question: 'Which is greater: 3/4 or 1/2?',
      options: ['1/2', '3/4', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Compare 3/4 and 1/2

First, make denominators the same:
1/2 = 2/4

Now compare: 3/4 and 2/4
3 > 2, so 3/4 > 2/4

So 3/4 > 1/2`,
      difficulty: 'medium',
    },
  ],
  'equivalent-fractions-basic': [
    {
      id: 'equivalent-fractions-basic-1',
      question: 'Which fraction is equivalent to 1/2?',
      options: ['2/3', '2/4', '3/4', '1/3'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Find fraction equivalent to 1/2

1/2 = ?/4
Multiply numerator and denominator by 2:
1 × 2 = 2
2 × 2 = 4

So 1/2 = 2/4`,
      difficulty: 'easy',
    },
    {
      id: 'equivalent-fractions-basic-2',
      question: 'Which fraction is equivalent to 2/3?',
      options: ['3/4', '4/6', '3/5', '1/2'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Find fraction equivalent to 2/3

2/3 = ?/6
Multiply numerator and denominator by 2:
2 × 2 = 4
3 × 2 = 6

So 2/3 = 4/6`,
      difficulty: 'medium',
    },
  ],
  // Grade 3 - Geometry
  'shapes-2d': [
    {
      id: 'shapes-2d-1',
      question: 'How many sides does a triangle have?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 1,
      explanation: `A triangle has 3 sides
Tri = three
Angle = corner

So triangle = 3 corners = 3 sides`,
      difficulty: 'easy',
    },
    {
      id: 'shapes-2d-2',
      question: 'How many sides does a square have?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: `A square has 4 equal sides
All sides are the same length
All angles are 90 degrees`,
      difficulty: 'easy',
    },
  ],
  'perimeter': [
    {
      id: 'perimeter-1',
      question: 'What is the perimeter of a square with side length 5?',
      options: ['15', '20', '25', '10'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Square with side = 5

Perimeter = sum of all sides
Square has 4 equal sides
Perimeter = 5 + 5 + 5 + 5 = 20

Or: Perimeter = 4 × 5 = 20`,
      difficulty: 'easy',
    },
    {
      id: 'perimeter-2',
      question: 'What is the perimeter of a rectangle with length 6 and width 4?',
      options: ['18', '20', '22', '24'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Rectangle: length = 6, width = 4

Perimeter = 2 × length + 2 × width
Perimeter = 2 × 6 + 2 × 4
Perimeter = 12 + 8 = 20`,
      difficulty: 'medium',
    },
  ],
  'area-intro': [
    {
      id: 'area-intro-1',
      question: 'What is the area of a rectangle with length 4 and width 3?',
      options: ['10', '12', '14', '16'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Rectangle: length = 4, width = 3

Area = length × width
Area = 4 × 3 = 12

So the area is 12 square units`,
      difficulty: 'easy',
    },
    {
      id: 'area-intro-2',
      question: 'What is the area of a square with side length 5?',
      options: ['20', '25', '30', '15'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Square with side = 5

Area = side × side
Area = 5 × 5 = 25

So the area is 25 square units`,
      difficulty: 'easy',
    },
  ],
  'area-rectangles': [
    {
      id: 'area-rectangles-1',
      question: 'What is the area of a rectangle with length 8 and width 5?',
      options: ['35', '40', '45', '50'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Rectangle: length = 8, width = 5

Area = length × width
Area = 8 × 5 = 40

So the area is 40 square units`,
      difficulty: 'easy',
    },
  ],
  // Grade 3 - Measurement
  'time-telling': [
    {
      id: 'time-telling-1',
      question: 'What time is shown? (Clock shows 3:30)',
      options: ['3:00', '3:15', '3:30', '3:45'],
      correctAnswer: 2,
      explanation: `The clock shows:
- Hour hand between 3 and 4
- Minute hand at 6 (30 minutes)

So the time is 3:30`,
      difficulty: 'easy',
    },
  ],
  'mass-volume': [
    {
      id: 'mass-volume-1',
      question: 'Which is heavier: 1 kilogram or 500 grams?',
      options: ['500 grams', '1 kilogram', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Let me solve this:
1 kilogram = 1000 grams
500 grams = 500 grams

1000 > 500, so 1 kilogram is heavier`,
      difficulty: 'easy',
    },
  ],
  'bar-graphs': [
    {
      id: 'bar-graphs-1',
      question: 'If a bar graph shows 5 apples, 3 oranges, and 7 bananas, which fruit is most?',
      options: ['Apples', 'Oranges', 'Bananas', 'Cannot tell'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Apples: 5
Oranges: 3
Bananas: 7

7 > 5 > 3, so bananas is the most`,
      difficulty: 'easy',
    },
  ],
  // Grade 4 - Arithmetic
  'multi-digit-multiply': [
    {
      id: 'multi-digit-multiply-1',
      question: 'What is 23 × 4?',
      options: ['82', '92', '102', '112'],
      correctAnswer: 1,
      explanation: `Let me solve this:
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
  92`,
      difficulty: 'medium',
    },
    {
      id: 'multi-digit-multiply-2',
      question: 'What is 15 × 6?',
      options: ['80', '90', '100', '110'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  15
×  6
----

6 times 5 is 30
Write 0, carry 3:
  15
×  6
----
   0
  ↑
  (carry 3)

6 times 1 is 6, plus 3 is 9
Write 9:
  15
×  6
----
  90`,
      difficulty: 'medium',
    },
    {
      id: 'multi-digit-multiply-3',
      question: 'What is 34 × 5?',
      options: ['160', '170', '150', '180'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  34
×  5
----

5 times 4 is 20
Write 0, carry 2:
  34
×  5
----
   0
  ↑
  (carry 2)

5 times 3 is 15, plus 2 is 17
Write 17:
  34
×  5
----
 170`,
      difficulty: 'medium',
    },
    {
      id: 'multi-digit-multiply-4',
      question: 'What is 42 × 3?',
      options: ['116', '126', '136', '106'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  42
×  3
----

3 times 2 is 6
Write 6:
  42
×  3
----
   6

3 times 4 is 12
Write 12:
  42
×  3
----
 126`,
      difficulty: 'medium',
    },
    {
      id: 'multi-digit-multiply-5',
      question: 'What is 56 × 4?',
      options: ['214', '224', '234', '204'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  56
×  4
----

4 times 6 is 24
Write 4, carry 2:
  56
×  4
----
   4
  ↑
  (carry 2)

4 times 5 is 20, plus 2 is 22
Write 22:
  56
×  4
----
 224`,
      difficulty: 'medium',
    },
  ],
  'long-division': [
    {
      id: 'long-division-1',
      question: 'What is 48 ÷ 4?',
      options: ['10', '12', '14', '16'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  48 ÷ 4 = ?

4 times what equals 48?
4 × 12 = 48

So 48 ÷ 4 = 12`,
      difficulty: 'medium',
    },
    {
      id: 'long-division-2',
      question: 'What is 63 ÷ 7?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 2,
      explanation: `Let me solve this:
  63 ÷ 7 = ?

7 times what equals 63?
7 × 9 = 63

So 63 ÷ 7 = 9`,
      difficulty: 'medium',
    },
    {
      id: 'long-division-3',
      question: 'What is 72 ÷ 8?',
      options: ['8', '9', '10', '7'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  72 ÷ 8 = ?

8 times what equals 72?
8 × 9 = 72

So 72 ÷ 8 = 9`,
      difficulty: 'medium',
    },
    {
      id: 'long-division-4',
      question: 'What is 56 ÷ 7?',
      options: ['6', '7', '8', '9'],
      correctAnswer: 2,
      explanation: `Let me solve this:
  56 ÷ 7 = ?

7 times what equals 56?
7 × 8 = 56

So 56 ÷ 7 = 8`,
      difficulty: 'medium',
    },
    {
      id: 'long-division-5',
      question: 'What is 81 ÷ 9?',
      options: ['8', '9', '10', '7'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  81 ÷ 9 = ?

9 times what equals 81?
9 × 9 = 81

So 81 ÷ 9 = 9`,
      difficulty: 'medium',
    },
  ],
  'factors-multiples': [
    {
      id: 'factors-multiples-1',
      question: 'What are the factors of 12?',
      options: ['1, 2, 3, 4, 6, 12', '1, 2, 3, 12', '2, 3, 4, 6', '1, 12'],
      correctAnswer: 0,
      explanation: `Let me solve this:
Find factors of 12

12 ÷ 1 = 12 ✓
12 ÷ 2 = 6 ✓
12 ÷ 3 = 4 ✓
12 ÷ 4 = 3 ✓
12 ÷ 6 = 2 ✓
12 ÷ 12 = 1 ✓

So factors are: 1, 2, 3, 4, 6, 12`,
      difficulty: 'medium',
    },
    {
      id: 'decimals-intro-6',
      question: 'What is 6.3 + 4.9?',
      options: ['11.2', '11.0', '10.8', '11.4'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  6.3
+ 4.9
----

First, tenths: 3 plus 9 is 12
Write 2, carry 1:
  6.3
+ 4.9
----
   .2
  ↑
  (carry 1)

Next, ones: 6 plus 4 is 10, plus 1 is 11
Write 11:
  6.3
+ 4.9
----
 11.2`,
      difficulty: 'medium',
    },
  ],
  // Grade 4 - Fractions
  'equivalent-fractions': [
    {
      id: 'equivalent-fractions-1',
      question: 'Which fraction is equivalent to 3/4?',
      options: ['6/8', '5/8', '4/6', '2/3'],
      correctAnswer: 0,
      explanation: `Let me solve this:
Find fraction equivalent to 3/4

3/4 = ?/8
Multiply numerator and denominator by 2:
3 × 2 = 6
4 × 2 = 8

So 3/4 = 6/8`,
      difficulty: 'medium',
    },
  ],
  'comparing-fractions': [
    {
      id: 'comparing-fractions-1',
      question: 'Which is greater: 2/3 or 3/4?',
      options: ['2/3', '3/4', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Compare 2/3 and 3/4

Make denominators the same:
2/3 = 8/12 (multiply by 4)
3/4 = 9/12 (multiply by 3)

Now compare: 8/12 and 9/12
9 > 8, so 9/12 > 8/12

So 3/4 > 2/3`,
      difficulty: 'medium',
    },
    {
      id: 'comparing-fractions-2',
      question: 'Which is greater: 1/2 or 3/5?',
      options: ['1/2', '3/5', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Compare 1/2 and 3/5

Make denominators the same:
1/2 = 5/10 (multiply by 5)
3/5 = 6/10 (multiply by 2)

Now compare: 5/10 and 6/10
6 > 5, so 6/10 > 5/10

So 3/5 > 1/2`,
      difficulty: 'medium',
    },
  ],
  'adding-fractions': [
    {
      id: 'adding-fractions-1',
      question: 'What is 2/5 + 1/5?',
      options: ['3/5', '3/10', '2/5', '1/5'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  2/5 + 1/5

Same denominators, so add numerators:
2 + 1 = 3
Keep denominator: 5

So 2/5 + 1/5 = 3/5`,
      difficulty: 'easy',
    },
    {
      id: 'adding-fractions-2',
      question: 'What is 3/7 + 2/7?',
      options: ['5/7', '5/14', '4/7', '6/7'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  3/7 + 2/7

Same denominators, so add numerators:
3 + 2 = 5
Keep denominator: 7

So 3/7 + 2/7 = 5/7`,
      difficulty: 'easy',
    },
    {
      id: 'adding-fractions-3',
      question: 'What is 1/4 + 2/4?',
      options: ['3/4', '3/8', '2/4', '1/2'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  1/4 + 2/4

Same denominators, so add numerators:
1 + 2 = 3
Keep denominator: 4

So 1/4 + 2/4 = 3/4`,
      difficulty: 'easy',
    },
  ],
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
      id: 'decimals-intro-4',
      question: 'What is 5.4 + 3.8?',
      options: ['9.2', '9.0', '8.8', '9.4'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  5.4
+ 3.8
----

First, tenths: 4 plus 8 is 12
Write 2, carry 1:
  5.4
+ 3.8
----
   .2
  ↑
  (carry 1)

Next, ones: 5 plus 3 is 8, plus 1 is 9
Write 9:
  5.4
+ 3.8
----
 9.2`,
      difficulty: 'easy',
    },
    {
      id: 'decimals-intro-5',
      question: 'What is 7.2 - 4.5?',
      options: ['2.7', '2.5', '3.2', '2.9'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  7.2
- 4.5
----

First, tenths: 2 minus 5 cannot, borrow 1
Now, tenths: 12 minus 5 is 7
Write 7:
  7.2
- 4.5
----
   .7
  ↑
  (borrowed 1, so 7 becomes 6)

Next, ones: 6 minus 4 is 2
Write 2:
  7.2
- 4.5
----
 2.7`,
      difficulty: 'medium',
    },
  ],
  // Grade 4 - Geometry
  'angles': [
    {
      id: 'angles-1',
      question: 'What is a right angle?',
      options: ['90 degrees', '45 degrees', '180 degrees', '360 degrees'],
      correctAnswer: 0,
      explanation: `A right angle is exactly 90 degrees
It forms a perfect L shape
Like the corner of a square`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Arithmetic
  'decimal-operations': [
    {
      id: 'decimal-operations-1',
      question: 'What is 2.5 × 4?',
      options: ['8.0', '10.0', '12.0', '9.0'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  2.5
×  4
----

4 times 5 is 20 (tenths)
Write 0, carry 2:
  2.5
×  4
----
   .0
  ↑
  (carry 2)

4 times 2 is 8, plus 2 is 10
Write 10:
  2.5
×  4
----
 10.0`,
      difficulty: 'medium',
    },
  ],
  'powers-ten': [
    {
      id: 'powers-ten-1',
      question: 'What is 10²?',
      options: ['20', '100', '1000', '10'],
      correctAnswer: 1,
      explanation: `Let me solve this:
10² means 10 × 10

10 × 10 = 100

So 10² = 100`,
      difficulty: 'easy',
    },
  ],
  // Grade 6 - Negative Numbers
  'negative-numbers-intro': [
    {
      id: 'negative-numbers-intro-1',
      question: 'What is -5 + 3?',
      options: ['-8', '-2', '2', '8'],
      correctAnswer: 1,
      explanation: `Let me solve this:
-5 + 3

Start at -5, move right 3
-5 → -4 → -3 → -2

So -5 + 3 = -2`,
      difficulty: 'medium',
    },
  ],
  'negative-operations': [
    {
      id: 'negative-operations-1',
      question: 'What is -4 × 3?',
      options: ['-12', '-7', '7', '12'],
      correctAnswer: 0,
      explanation: `Let me solve this:
-4 × 3

Negative × positive = negative
4 × 3 = 12

So -4 × 3 = -12`,
      difficulty: 'medium',
    },
  ],
  // Grade 6 - Ratios
  'ratios-intro': [
    {
      id: 'ratios-intro-1',
      question: 'If there are 3 apples and 2 oranges, what is the ratio of apples to oranges?',
      options: ['3:2', '2:3', '3:5', '5:3'],
      correctAnswer: 0,
      explanation: `Let me solve this:
3 apples and 2 oranges

Ratio of apples to oranges = 3:2
This means 3 apples for every 2 oranges`,
      difficulty: 'easy',
    },
  ],
  'rates': [
    {
      id: 'rates-1',
      question: 'If a car travels 60 miles in 2 hours, what is the rate?',
      options: ['30 miles/hour', '60 miles/hour', '120 miles/hour', '2 miles/hour'],
      correctAnswer: 0,
      explanation: `Let me solve this:
60 miles in 2 hours

Rate = distance ÷ time
Rate = 60 ÷ 2 = 30

So the rate is 30 miles per hour`,
      difficulty: 'medium',
    },
  ],
  'percentages': [
    {
      id: 'percentages-1',
      question: 'What is 25% of 80?',
      options: ['15', '20', '25', '30'],
      correctAnswer: 1,
      explanation: `Let me solve this:
25% of 80

25% = 25/100 = 1/4
1/4 of 80 = 80 ÷ 4 = 20

So 25% of 80 = 20`,
      difficulty: 'medium',
    },
  ],
  // Grade 6 - Algebra
  'variables-expressions': [
    {
      id: 'variables-expressions-1',
      question: 'What is the value of x if x + 5 = 12?',
      options: ['5', '7', '12', '17'],
      correctAnswer: 1,
      explanation: `Let me solve this:
x + 5 = 12

Subtract 5 from both sides:
x + 5 - 5 = 12 - 5
x = 7

So x = 7`,
      difficulty: 'medium',
    },
  ],
  'one-step-equations': [
    {
      id: 'one-step-equations-1',
      question: 'What is the value of y if 3y = 15?',
      options: ['3', '5', '12', '18'],
      correctAnswer: 1,
      explanation: `Let me solve this:
3y = 15

Divide both sides by 3:
3y ÷ 3 = 15 ÷ 3
y = 5

So y = 5`,
      difficulty: 'medium',
    },
  ],
  // Grade 6 - Geometry
  'area-triangles': [
    {
      id: 'area-triangles-1',
      question: 'What is the area of a triangle with base 6 and height 4?',
      options: ['10', '12', '14', '16'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Triangle: base = 6, height = 4

Area = (base × height) ÷ 2
Area = (6 × 4) ÷ 2
Area = 24 ÷ 2 = 12

So the area is 12 square units`,
      difficulty: 'medium',
    },
  ],
  'area-circles': [
    {
      id: 'area-circles-1',
      question: 'What is the area of a circle with radius 3? (Use π = 3.14)',
      options: ['18.84', '28.26', '37.68', '47.1'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Circle: radius = 3

Area = π × radius²
Area = 3.14 × 3²
Area = 3.14 × 9 = 28.26

So the area is 28.26 square units`,
      difficulty: 'medium',
    },
  ],
  // Grade 7 - Algebra
  'two-step-equations': [
    {
      id: 'two-step-equations-1',
      question: 'What is the value of x if 2x + 5 = 13?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: `Let me solve this:
2x + 5 = 13

First, subtract 5:
2x + 5 - 5 = 13 - 5
2x = 8

Then, divide by 2:
2x ÷ 2 = 8 ÷ 2
x = 4

So x = 4`,
      difficulty: 'medium',
    },
  ],
  'inequalities': [
    {
      id: 'inequalities-1',
      question: 'What is the solution to x + 3 > 7?',
      options: ['x > 3', 'x > 4', 'x < 4', 'x < 3'],
      correctAnswer: 1,
      explanation: `Let me solve this:
x + 3 > 7

Subtract 3 from both sides:
x + 3 - 3 > 7 - 3
x > 4

So x > 4`,
      difficulty: 'medium',
    },
  ],
  'linear-equations': [
    {
      id: 'linear-equations-1',
      question: 'What is the slope of the line y = 2x + 3?',
      options: ['2', '3', '5', '6'],
      correctAnswer: 0,
      explanation: `In the equation y = mx + b:
- m is the slope
- b is the y-intercept

For y = 2x + 3:
- Slope (m) = 2
- Y-intercept (b) = 3

So the slope is 2`,
      difficulty: 'medium',
    },
  ],
  // Grade 7 - Ratios
  'proportions': [
    {
      id: 'proportions-1',
      question: 'If 3/4 = x/12, what is x?',
      options: ['6', '8', '9', '10'],
      correctAnswer: 2,
      explanation: `Let me solve this:
3/4 = x/12

Cross multiply:
3 × 12 = 4 × x
36 = 4x

Divide by 4:
36 ÷ 4 = x
9 = x

So x = 9`,
      difficulty: 'medium',
    },
  ],
  'percent-change': [
    {
      id: 'percent-change-1',
      question: 'If a price increases from $50 to $60, what is the percent increase?',
      options: ['10%', '15%', '20%', '25%'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Price: $50 → $60
Change = $60 - $50 = $10

Percent increase = (change ÷ original) × 100
Percent increase = (10 ÷ 50) × 100
Percent increase = 0.2 × 100 = 20%

So the percent increase is 20%`,
      difficulty: 'medium',
    },
  ],
  // Grade 7 - Geometry
  'scale-drawings': [
    {
      id: 'scale-drawings-1',
      question: 'If a scale is 1 cm = 5 m, and a drawing shows 3 cm, what is the actual length?',
      options: ['10 m', '15 m', '20 m', '25 m'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Scale: 1 cm = 5 m
Drawing: 3 cm

Actual = 3 × 5 = 15 m

So the actual length is 15 m`,
      difficulty: 'medium',
    },
  ],
  'surface-area': [
    {
      id: 'surface-area-1',
      question: 'What is the surface area of a cube with side length 3?',
      options: ['36', '54', '27', '18'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Cube: side = 3

A cube has 6 faces, each with area = side²
Area of one face = 3² = 9

Surface area = 6 × 9 = 54

So the surface area is 54 square units`,
      difficulty: 'medium',
    },
  ],
  // Grade 8 - Algebra
  'multi-step-equations': [
    {
      id: 'multi-step-equations-1',
      question: 'What is the value of x if 3x + 2 = 2x + 8?',
      options: ['4', '5', '6', '7'],
      correctAnswer: 2,
      explanation: `Let me solve this:
3x + 2 = 2x + 8

Subtract 2x from both sides:
3x - 2x + 2 = 2x - 2x + 8
x + 2 = 8

Subtract 2:
x + 2 - 2 = 8 - 2
x = 6

So x = 6`,
      difficulty: 'medium',
    },
  ],
  'systems-equations': [
    {
      id: 'systems-equations-1',
      question: 'What is the solution to: x + y = 5 and x - y = 1?',
      options: ['x=2, y=3', 'x=3, y=2', 'x=4, y=1', 'x=1, y=4'],
      correctAnswer: 1,
      explanation: `Let me solve this:
x + y = 5
x - y = 1

Add the equations:
(x + y) + (x - y) = 5 + 1
2x = 6
x = 3

Substitute x = 3:
3 + y = 5
y = 2

So x = 3, y = 2`,
      difficulty: 'hard',
    },
  ],
  'quadratic-intro': [
    {
      id: 'quadratic-intro-1',
      question: 'What is x² if x = 5?',
      options: ['10', '25', '50', '125'],
      correctAnswer: 1,
      explanation: `Let me solve this:
x² when x = 5

x² = 5² = 5 × 5 = 25

So x² = 25`,
      difficulty: 'easy',
    },
  ],
  // Grade 8 - Geometry
  'pythagorean-theorem': [
    {
      id: 'pythagorean-theorem-1',
      question: 'In a right triangle with legs 3 and 4, what is the hypotenuse?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 0,
      explanation: `Let me solve this:
Right triangle: legs = 3, 4

Pythagorean theorem: a² + b² = c²
3² + 4² = c²
9 + 16 = c²
25 = c²
c = 5

So the hypotenuse is 5`,
      difficulty: 'medium',
    },
  ],
  'transformations': [
    {
      id: 'transformations-1',
      question: 'If a point (2, 3) is reflected over the x-axis, what are the new coordinates?',
      options: ['(2, -3)', '(-2, 3)', '(-2, -3)', '(3, 2)'],
      correctAnswer: 0,
      explanation: `Reflection over x-axis:
- x stays the same
- y changes sign

(2, 3) → (2, -3)

So the new coordinates are (2, -3)`,
      difficulty: 'medium',
    },
  ],
  'similarity': [
    {
      id: 'similarity-1',
      question: 'If two triangles have the same angles, they are:',
      options: ['Congruent', 'Similar', 'Equal', 'Different'],
      correctAnswer: 1,
      explanation: `Triangles with the same angles are similar
They have the same shape but may be different sizes
Similar triangles have proportional sides`,
      difficulty: 'medium',
    },
  ],
  // Grade 5 - Unit 1: Decimal Place Value
  'decimal-place-value-intro': [
    {
      id: 'decimal-place-value-intro-1',
      question: 'What is the value of the 5 in 3.5?',
      options: ['5 ones', '5 tenths', '5 hundredths', '5 thousandths'],
      correctAnswer: 1,
      explanation: `In 3.5:
- 3 is in the ones place
- 5 is in the tenths place

So 5 represents 5 tenths`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-intro-2',
      question: 'What is 0.7 as a fraction?',
      options: ['7/10', '7/100', '1/7', '7/1'],
      correctAnswer: 0,
      explanation: `0.7 means 7 tenths

7 tenths = 7/10

So 0.7 = 7/10`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-intro-3',
      question: 'What is 2.3 in words?',
      options: ['Two and three tenths', 'Two and three hundredths', 'Twenty-three', 'Two point three'],
      correctAnswer: 0,
      explanation: `2.3 = 2 ones and 3 tenths

In words: Two and three tenths`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-intro-4',
      question: 'Which decimal is greater: 0.5 or 0.50?',
      options: ['0.5', '0.50', 'They are equal', 'Cannot tell'],
      correctAnswer: 2,
      explanation: `0.5 = 5/10 = 50/100
0.50 = 50/100

So 0.5 = 0.50

They are equal`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-intro-5',
      question: 'What is the decimal for 3/10?',
      options: ['0.3', '0.03', '3.0', '0.33'],
      correctAnswer: 0,
      explanation: `3/10 means 3 tenths

3 tenths = 0.3

So 3/10 = 0.3`,
      difficulty: 'easy',
    },
  ],
  'decimal-place-value-tenths': [
    {
      id: 'decimal-place-value-tenths-1',
      question: 'What is the value of 0.8?',
      options: ['8/10', '8/100', '8', '80'],
      correctAnswer: 0,
      explanation: `0.8 = 8 tenths

8 tenths = 8/10

So 0.8 = 8/10`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-tenths-2',
      question: 'Which is greater: 0.4 or 0.6?',
      options: ['0.4', '0.6', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Compare 0.4 and 0.6

0.4 = 4/10
0.6 = 6/10

6/10 > 4/10, so 0.6 > 0.4`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-tenths-3',
      question: 'What is 0.9 as a fraction?',
      options: ['9/10', '9/100', '1/9', '9'],
      correctAnswer: 0,
      explanation: `0.9 = 9 tenths

9 tenths = 9/10

So 0.9 = 9/10`,
      difficulty: 'easy',
    },
  ],
  'decimal-place-value-hundredths': [
    {
      id: 'decimal-place-value-hundredths-1',
      question: 'What is the value of the 7 in 2.47?',
      options: ['7 ones', '7 tenths', '7 hundredths', '7 thousandths'],
      correctAnswer: 2,
      explanation: `In 2.47:
- 2 is in the ones place
- 4 is in the tenths place
- 7 is in the hundredths place

So 7 represents 7 hundredths`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-hundredths-2',
      question: 'What is 0.25 as a fraction?',
      options: ['25/10', '25/100', '1/25', '25'],
      correctAnswer: 1,
      explanation: `0.25 = 25 hundredths

25 hundredths = 25/100

So 0.25 = 25/100`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-place-value-hundredths-3',
      question: 'Which is greater: 0.35 or 0.53?',
      options: ['0.35', '0.53', 'They are equal', 'Cannot tell'],
      correctAnswer: 1,
      explanation: `Compare 0.35 and 0.53

0.35 = 35/100
0.53 = 53/100

53/100 > 35/100, so 0.53 > 0.35`,
      difficulty: 'medium',
    },
  ],
  'comparing-decimals': [
    {
      id: 'comparing-decimals-1',
      question: 'Which is greater: 0.7 or 0.65?',
      options: ['0.7', '0.65', 'They are equal', 'Cannot tell'],
      correctAnswer: 0,
      explanation: `Compare 0.7 and 0.65

0.7 = 0.70 = 70/100
0.65 = 65/100

70/100 > 65/100, so 0.7 > 0.65`,
      difficulty: 'easy',
    },
    {
      id: 'comparing-decimals-2',
      question: 'Which is less: 2.34 or 2.43?',
      options: ['2.34', '2.43', 'They are equal', 'Cannot tell'],
      correctAnswer: 0,
      explanation: `Compare 2.34 and 2.43

Both have 2 ones
Compare tenths: 3 < 4

So 2.34 < 2.43`,
      difficulty: 'medium',
    },
    {
      id: 'comparing-decimals-3',
      question: 'Order from least to greatest: 0.5, 0.05, 0.55',
      options: ['0.5, 0.05, 0.55', '0.05, 0.5, 0.55', '0.55, 0.5, 0.05', '0.05, 0.55, 0.5'],
      correctAnswer: 1,
      explanation: `Compare: 0.5, 0.05, 0.55

0.05 = 5/100 = 0.05
0.5 = 50/100 = 0.50
0.55 = 55/100 = 0.55

Order: 0.05 < 0.5 < 0.55`,
      difficulty: 'medium',
    },
  ],
  'rounding-decimals': [
    {
      id: 'rounding-decimals-1',
      question: 'Round 3.47 to the nearest tenth.',
      options: ['3.4', '3.5', '3.0', '3.47'],
      correctAnswer: 1,
      explanation: `Round 3.47 to nearest tenth

Look at hundredths: 7
7 ≥ 5, so round up

3.47 → 3.5`,
      difficulty: 'medium',
    },
    {
      id: 'rounding-decimals-2',
      question: 'Round 2.83 to the nearest whole number.',
      options: ['2', '3', '2.8', '2.9'],
      correctAnswer: 1,
      explanation: `Round 2.83 to nearest whole number

Look at tenths: 8
8 ≥ 5, so round up

2.83 → 3`,
      difficulty: 'easy',
    },
    {
      id: 'rounding-decimals-3',
      question: 'Round 5.234 to the nearest hundredth.',
      options: ['5.2', '5.23', '5.24', '5.3'],
      correctAnswer: 1,
      explanation: `Round 5.234 to nearest hundredth

Look at thousandths: 4
4 < 5, so round down

5.234 → 5.23`,
      difficulty: 'medium',
    },
  ],
  'decimal-number-line': [
    {
      id: 'decimal-number-line-1',
      question: 'Where is 0.5 on a number line from 0 to 1?',
      options: ['At the start', 'At the middle', 'At the end', 'Cannot place'],
      correctAnswer: 1,
      explanation: `On number line from 0 to 1:
- 0 is at the start
- 1 is at the end
- 0.5 is exactly in the middle

So 0.5 is at the middle`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-number-line-2',
      question: 'Which point is at 0.3 on a number line?',
      options: ['Closer to 0', 'Closer to 0.5', 'Closer to 1', 'At 0.5'],
      correctAnswer: 0,
      explanation: `0.3 is between 0 and 0.5

0.3 is closer to 0 than to 0.5

So 0.3 is closer to 0`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 2: Add Decimals
  'add-decimals-tenths': [
    {
      id: 'add-decimals-tenths-1',
      question: 'What is 2.3 + 1.4?',
      options: ['3.6', '3.7', '3.5', '3.8'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  2.3
+ 1.4
----

First, tenths: 3 plus 4 is 7
Write 7:
  2.3
+ 1.4
----
   .7

Next, ones: 2 plus 1 is 3
Write 3:
  2.3
+ 1.4
----
 3.7`,
      difficulty: 'easy',
    },
    {
      id: 'add-decimals-tenths-2',
      question: 'What is 5.6 + 2.8?',
      options: ['8.3', '8.4', '8.5', '8.6'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  5.6
+ 2.8
----

First, tenths: 6 plus 8 is 14
Write 4, carry 1:
  5.6
+ 2.8
----
   .4
  ↑
  (carry 1)

Next, ones: 5 plus 2 is 7, plus 1 is 8
Write 8:
  5.6
+ 2.8
----
 8.4`,
      difficulty: 'medium',
    },
    {
      id: 'add-decimals-tenths-3',
      question: 'What is 4.7 + 3.5?',
      options: ['8.1', '8.2', '8.3', '7.2'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  4.7
+ 3.5
----

First, tenths: 7 plus 5 is 12
Write 2, carry 1:
  4.7
+ 3.5
----
   .2
  ↑
  (carry 1)

Next, ones: 4 plus 3 is 7, plus 1 is 8
Write 8:
  4.7
+ 3.5
----
 8.2`,
      difficulty: 'medium',
    },
  ],
  'add-decimals-hundredths': [
    {
      id: 'add-decimals-hundredths-1',
      question: 'What is 3.25 + 2.14?',
      options: ['5.38', '5.39', '5.29', '5.49'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  3.25
+ 2.14
----

First, hundredths: 5 plus 4 is 9
Write 9:
  3.25
+ 2.14
----
    .9

Next, tenths: 2 plus 1 is 3
Write 3:
  3.25
+ 2.14
----
   .39

Then, ones: 3 plus 2 is 5
Write 5:
  3.25
+ 2.14
----
 5.39`,
      difficulty: 'medium',
    },
    {
      id: 'add-decimals-hundredths-2',
      question: 'What is 4.67 + 3.28?',
      options: ['7.94', '7.95', '7.85', '7.84'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  4.67
+ 3.28
----

First, hundredths: 7 plus 8 is 15
Write 5, carry 1:
  4.67
+ 3.28
----
    .5
  ↑
  (carry 1)

Next, tenths: 6 plus 2 is 8, plus 1 is 9
Write 9:
  4.67
+ 3.28
----
   .95

Then, ones: 4 plus 3 is 7
Write 7:
  4.67
+ 3.28
----
 7.95`,
      difficulty: 'medium',
    },
  ],
  'add-decimals-mixed': [
    {
      id: 'add-decimals-mixed-1',
      question: 'What is 5.3 + 2.47?',
      options: ['7.76', '7.77', '7.67', '7.87'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  5.30
+ 2.47
----

First, hundredths: 0 plus 7 is 7
Write 7:
  5.30
+ 2.47
----
    .7

Next, tenths: 3 plus 4 is 7
Write 7:
  5.30
+ 2.47
----
   .77

Then, ones: 5 plus 2 is 7
Write 7:
  5.30
+ 2.47
----
 7.77`,
      difficulty: 'medium',
    },
  ],
  'add-decimals-word-problems': [
    {
      id: 'add-decimals-word-problems-1',
      question: 'Sarah has $3.50 and Tom has $2.75. How much do they have together?',
      options: ['$5.25', '$6.25', '$5.75', '$6.75'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Sarah: $3.50
Tom: $2.75
Total: $3.50 + $2.75

  3.50
+ 2.75
----

First, hundredths: 0 plus 5 is 5
Write 5:
  3.50
+ 2.75
----
    .5

Next, tenths: 5 plus 7 is 12
Write 2, carry 1:
  3.50
+ 2.75
----
   .25
  ↑
  (carry 1)

Then, ones: 3 plus 2 is 5, plus 1 is 6
Write 6:
  3.50
+ 2.75
----
 6.25

So they have $6.25 together`,
      difficulty: 'medium',
    },
  ],
  'add-decimals-estimation': [
    {
      id: 'add-decimals-estimation-1',
      question: 'Estimate: 4.7 + 3.2',
      options: ['7', '8', '9', '6'],
      correctAnswer: 1,
      explanation: `Estimate 4.7 + 3.2

Round to nearest whole:
4.7 ≈ 5
3.2 ≈ 3

5 + 3 = 8

So estimate is 8`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 3: Subtract Decimals
  'subtract-decimals-tenths': [
    {
      id: 'subtract-decimals-tenths-1',
      question: 'What is 5.8 - 2.3?',
      options: ['3.4', '3.5', '3.6', '3.7'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  5.8
- 2.3
----

First, tenths: 8 minus 3 is 5
Write 5:
  5.8
- 2.3
----
   .5

Next, ones: 5 minus 2 is 3
Write 3:
  5.8
- 2.3
----
 3.5`,
      difficulty: 'easy',
    },
    {
      id: 'subtract-decimals-tenths-2',
      question: 'What is 7.4 - 3.6?',
      options: ['3.7', '3.8', '3.9', '4.0'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  7.4
- 3.6
----

First, tenths: 4 minus 6 cannot, borrow 1
Now, tenths: 14 minus 6 is 8
Write 8:
  7.4
- 3.6
----
   .8
  ↑
  (borrowed 1, so 7 becomes 6)

Next, ones: 6 minus 3 is 3
Write 3:
  7.4
- 3.6
----
 3.8`,
      difficulty: 'medium',
    },
  ],
  'subtract-decimals-hundredths': [
    {
      id: 'subtract-decimals-hundredths-1',
      question: 'What is 6.45 - 2.23?',
      options: ['4.21', '4.22', '4.23', '4.24'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  6.45
- 2.23
----

First, hundredths: 5 minus 3 is 2
Write 2:
  6.45
- 2.23
----
    .2

Next, tenths: 4 minus 2 is 2
Write 2:
  6.45
- 2.23
----
   .22

Then, ones: 6 minus 2 is 4
Write 4:
  6.45
- 2.23
----
 4.22`,
      difficulty: 'medium',
    },
  ],
  'subtract-decimals-borrowing': [
    {
      id: 'subtract-decimals-borrowing-1',
      question: 'What is 5.42 - 2.68?',
      options: ['2.73', '2.74', '2.75', '2.76'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  5.42
- 2.68
----

First, hundredths: 2 minus 8 cannot, borrow 1
Now, hundredths: 12 minus 8 is 4
Write 4:
  5.42
- 2.68
----
    .4
  ↑
  (borrowed 1, so 4 becomes 3)

Next, tenths: 3 minus 6 cannot, borrow 1
Now, tenths: 13 minus 6 is 7
Write 7:
  5.42
- 2.68
----
   .74
  ↑
  (borrowed 1, so 5 becomes 4)

Then, ones: 4 minus 2 is 2
Write 2:
  5.42
- 2.68
----
 2.74`,
      difficulty: 'hard',
    },
  ],
  'subtract-decimals-word-problems': [
    {
      id: 'subtract-decimals-word-problems-1',
      question: 'A book costs $12.50. You have $15.75. How much change will you get?',
      options: ['$3.25', '$3.35', '$3.45', '$3.15'],
      correctAnswer: 0,
      explanation: `Let me solve this:
You have: $15.75
Book costs: $12.50
Change: $15.75 - $12.50

  15.75
- 12.50
----

First, hundredths: 5 minus 0 is 5
Write 5:
  15.75
- 12.50
----
    .5

Next, tenths: 7 minus 5 is 2
Write 2:
  15.75
- 12.50
----
   .25

Then, ones: 5 minus 2 is 3
Write 3:
  15.75
- 12.50
----
  3.25

So you get $3.25 change`,
      difficulty: 'medium',
    },
  ],
  'subtract-decimals-estimation': [
    {
      id: 'subtract-decimals-estimation-1',
      question: 'Estimate: 8.6 - 3.4',
      options: ['5', '6', '4', '7'],
      correctAnswer: 0,
      explanation: `Estimate 8.6 - 3.4

Round to nearest whole:
8.6 ≈ 9
3.4 ≈ 3

9 - 3 = 6

So estimate is 6`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 4: Multi-Digit Multiplication
  'multiply-2-digit': [
    {
      id: 'multiply-2-digit-1',
      question: 'What is 24 × 13?',
      options: ['302', '312', '322', '332'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  24
× 13
----

First, multiply by ones: 3 × 24
3 times 4 is 12
Write 2, carry 1:
  24
× 13
----
   2
  ↑
  (carry 1)

3 times 2 is 6, plus 1 is 7
Write 7:
  24
× 13
----
  72

Next, multiply by tens: 1 × 24
1 times 4 is 4
Write 4:
  24
× 13
----
  72
 40

1 times 2 is 2
Write 2:
  24
× 13
----
  72
 240

Now add: 72 + 240 = 312`,
      difficulty: 'medium',
    },
    {
      id: 'multiply-2-digit-2',
      question: 'What is 35 × 16?',
      options: ['550', '560', '570', '580'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  35
× 16
----

First, multiply by ones: 6 × 35
6 times 5 is 30
Write 0, carry 3:
  35
× 16
----
   0
  ↑
  (carry 3)

6 times 3 is 18, plus 3 is 21
Write 21:
  35
× 16
----
 210

Next, multiply by tens: 1 × 35
1 times 5 is 5
Write 5:
  35
× 16
----
 210
 350

Now add: 210 + 350 = 560`,
      difficulty: 'medium',
    },
    {
      id: 'multiply-2-digit-3',
      question: 'What is 42 × 25?',
      options: ['1040', '1050', '1060', '1070'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  42
× 25
----

First, multiply by ones: 5 × 42
5 times 2 is 10
Write 0, carry 1:
  42
× 25
----
   0
  ↑
  (carry 1)

5 times 4 is 20, plus 1 is 21
Write 21:
  42
× 25
----
 210

Next, multiply by tens: 2 × 42
2 times 2 is 4
Write 4:
  42
× 25
----
 210
 840

Now add: 210 + 840 = 1050`,
      difficulty: 'medium',
    },
  ],
  'multiply-3-digit': [
    {
      id: 'multiply-3-digit-1',
      question: 'What is 123 × 4?',
      options: ['482', '492', '502', '512'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  123
×   4
----

4 times 3 is 12
Write 2, carry 1:
  123
×   4
----
    2
  ↑
  (carry 1)

4 times 2 is 8, plus 1 is 9
Write 9:
  123
×   4
----
   92

4 times 1 is 4
Write 4:
  123
×   4
----
  492`,
      difficulty: 'medium',
    },
    {
      id: 'multiply-3-digit-2',
      question: 'What is 234 × 5?',
      options: ['1160', '1170', '1180', '1190'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  234
×   5
----

5 times 4 is 20
Write 0, carry 2:
  234
×   5
----
    0
  ↑
  (carry 2)

5 times 3 is 15, plus 2 is 17
Write 7, carry 1:
  234
×   5
----
   70
  ↑
  (carry 1)

5 times 2 is 10, plus 1 is 11
Write 11:
  234
×   5
----
 1170`,
      difficulty: 'medium',
    },
  ],
  'multiply-area-model': [
    {
      id: 'multiply-area-model-1',
      question: 'Use area model: 23 × 14',
      options: ['302', '312', '322', '332'],
      correctAnswer: 2,
      explanation: `Area model for 23 × 14:

Break apart:
23 = 20 + 3
14 = 10 + 4

Multiply:
20 × 10 = 200
20 × 4 = 80
3 × 10 = 30
3 × 4 = 12

Add: 200 + 80 + 30 + 12 = 322`,
      difficulty: 'medium',
    },
  ],
  'multiply-distributive': [
    {
      id: 'multiply-distributive-1',
      question: 'Use distributive property: 6 × 23',
      options: ['128', '138', '148', '158'],
      correctAnswer: 1,
      explanation: `Distributive property: 6 × 23

6 × 23 = 6 × (20 + 3)
6 × 23 = (6 × 20) + (6 × 3)
6 × 23 = 120 + 18
6 × 23 = 138`,
      difficulty: 'medium',
    },
  ],
  'multiply-word-problems': [
    {
      id: 'multiply-word-problems-1',
      question: 'A box has 24 pencils. There are 15 boxes. How many pencils total?',
      options: ['350', '360', '370', '380'],
      correctAnswer: 1,
      explanation: `Let me solve this:
24 pencils per box
15 boxes
Total: 24 × 15

  24
× 15
----

5 × 24 = 120
10 × 24 = 240
120 + 240 = 360

So there are 360 pencils total`,
      difficulty: 'medium',
    },
  ],
  'multiply-estimation': [
    {
      id: 'multiply-estimation-1',
      question: 'Estimate: 47 × 23',
      options: ['900', '1000', '1100', '1200'],
      correctAnswer: 1,
      explanation: `Estimate 47 × 23

Round:
47 ≈ 50
23 ≈ 20

50 × 20 = 1000

So estimate is 1000`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 5: Multi-Digit Division
  'divide-2-digit': [
    {
      id: 'divide-2-digit-1',
      question: 'What is 156 ÷ 12?',
      options: ['12', '13', '14', '15'],
      correctAnswer: 1,
      explanation: `Let me solve this:
156 ÷ 12 = ?

12 × 13 = 156

So 156 ÷ 12 = 13`,
      difficulty: 'medium',
    },
    {
      id: 'divide-2-digit-2',
      question: 'What is 189 ÷ 9?',
      options: ['20', '21', '22', '23'],
      correctAnswer: 1,
      explanation: `Let me solve this:
189 ÷ 9 = ?

9 × 21 = 189

So 189 ÷ 9 = 21`,
      difficulty: 'medium',
    },
  ],
  'divide-remainders': [
    {
      id: 'divide-remainders-1',
      question: 'What is 47 ÷ 5?',
      options: ['9 R2', '9 R3', '8 R7', '10 R2'],
      correctAnswer: 0,
      explanation: `Let me solve this:
47 ÷ 5 = ?

5 × 9 = 45
47 - 45 = 2

So 47 ÷ 5 = 9 remainder 2`,
      difficulty: 'medium',
    },
  ],
  'divide-partial-quotients': [
    {
      id: 'divide-partial-quotients-1',
      question: 'Use partial quotients: 156 ÷ 12',
      options: ['12', '13', '14', '15'],
      correctAnswer: 1,
      explanation: `Partial quotients for 156 ÷ 12:

12 × 10 = 120 (156 - 120 = 36)
12 × 3 = 36 (36 - 36 = 0)

10 + 3 = 13

So 156 ÷ 12 = 13`,
      difficulty: 'medium',
    },
  ],
  'divide-word-problems': [
    {
      id: 'divide-word-problems-1',
      question: 'You have 84 stickers to share equally among 7 friends. How many does each get?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 2,
      explanation: `Let me solve this:
84 stickers ÷ 7 friends

7 × 12 = 84

So each friend gets 12 stickers`,
      difficulty: 'medium',
    },
  ],
  'divide-estimation': [
    {
      id: 'divide-estimation-1',
      question: 'Estimate: 156 ÷ 8',
      options: ['18', '19', '20', '21'],
      correctAnswer: 2,
      explanation: `Estimate 156 ÷ 8

Round:
156 ≈ 160
8 stays 8

160 ÷ 8 = 20

So estimate is 20`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 6: Powers of 10
  'powers-ten-intro': [
    {
      id: 'powers-ten-intro-1',
      question: 'What is 10²?',
      options: ['20', '100', '1000', '10'],
      correctAnswer: 1,
      explanation: `10² means 10 × 10

10 × 10 = 100

So 10² = 100`,
      difficulty: 'easy',
    },
    {
      id: 'powers-ten-intro-2',
      question: 'What is 10³?',
      options: ['30', '100', '1000', '10000'],
      correctAnswer: 2,
      explanation: `10³ means 10 × 10 × 10

10 × 10 = 100
100 × 10 = 1000

So 10³ = 1000`,
      difficulty: 'easy',
    },
  ],
  'multiply-powers-ten': [
    {
      id: 'multiply-powers-ten-1',
      question: 'What is 45 × 100?',
      options: ['450', '4500', '45000', '450000'],
      correctAnswer: 1,
      explanation: `45 × 100

When multiplying by 100, move decimal 2 places right
45 → 4500

So 45 × 100 = 4500`,
      difficulty: 'easy',
    },
    {
      id: 'multiply-powers-ten-2',
      question: 'What is 3.2 × 10?',
      options: ['32', '320', '3.20', '0.32'],
      correctAnswer: 0,
      explanation: `3.2 × 10

When multiplying by 10, move decimal 1 place right
3.2 → 32

So 3.2 × 10 = 32`,
      difficulty: 'easy',
    },
  ],
  'divide-powers-ten': [
    {
      id: 'divide-powers-ten-1',
      question: 'What is 450 ÷ 10?',
      options: ['4.5', '45', '450', '4500'],
      correctAnswer: 1,
      explanation: `450 ÷ 10

When dividing by 10, move decimal 1 place left
450 → 45

So 450 ÷ 10 = 45`,
      difficulty: 'easy',
    },
    {
      id: 'divide-powers-ten-2',
      question: 'What is 3200 ÷ 100?',
      options: ['3.2', '32', '320', '32000'],
      correctAnswer: 1,
      explanation: `3200 ÷ 100

When dividing by 100, move decimal 2 places left
3200 → 32

So 3200 ÷ 100 = 32`,
      difficulty: 'easy',
    },
  ],
  'powers-ten-patterns': [
    {
      id: 'powers-ten-patterns-1',
      question: 'What pattern do you see: 5, 50, 500, 5000?',
      options: ['Multiply by 10', 'Add 10', 'Multiply by 5', 'Add 5'],
      correctAnswer: 0,
      explanation: `Pattern: 5, 50, 500, 5000

5 × 10 = 50
50 × 10 = 500
500 × 10 = 5000

Each time multiply by 10`,
      difficulty: 'easy',
    },
  ],
  'powers-ten-word-problems': [
    {
      id: 'powers-ten-word-problems-1',
      question: 'A box has 100 pencils. How many pencils in 25 boxes?',
      options: ['250', '2500', '25000', '250000'],
      correctAnswer: 1,
      explanation: `25 boxes × 100 pencils per box

25 × 100 = 2500

So there are 2500 pencils`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 7: Multiply Decimals
  'multiply-decimals-tenths': [
    {
      id: 'multiply-decimals-tenths-1',
      question: 'What is 2.3 × 4?',
      options: ['8.2', '9.2', '10.2', '11.2'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  2.3
×   4
----

4 times 3 is 12 (tenths)
Write 2, carry 1:
  2.3
×   4
----
   .2
  ↑
  (carry 1)

4 times 2 is 8, plus 1 is 9
Write 9:
  2.3
×   4
----
 9.2`,
      difficulty: 'medium',
    },
  ],
  'multiply-decimals-hundredths': [
    {
      id: 'multiply-decimals-hundredths-1',
      question: 'What is 3.25 × 2?',
      options: ['6.4', '6.5', '6.6', '6.7'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  3.25
×    2
----

2 times 5 is 10 (hundredths)
Write 0, carry 1:
  3.25
×    2
----
    .0
  ↑
  (carry 1)

2 times 2 is 4, plus 1 is 5 (tenths)
Write 5:
  3.25
×    2
----
   .50

2 times 3 is 6
Write 6:
  3.25
×    2
----
 6.50 = 6.5`,
      difficulty: 'medium',
    },
  ],
  'multiply-decimals-mixed': [
    {
      id: 'multiply-decimals-mixed-1',
      question: 'What is 2.4 × 1.5?',
      options: ['3.5', '3.6', '3.7', '3.8'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  2.4
× 1.5
----

First, multiply 24 × 15 = 360
Then count decimal places: 1 + 1 = 2
Move decimal 2 places: 360 → 3.60 = 3.6

So 2.4 × 1.5 = 3.6`,
      difficulty: 'medium',
    },
  ],
  'multiply-decimals-word-problems': [
    {
      id: 'multiply-decimals-word-problems-1',
      question: 'A pencil costs $0.75. How much for 4 pencils?',
      options: ['$2.50', '$3.00', '$3.50', '$4.00'],
      correctAnswer: 1,
      explanation: `Let me solve this:
$0.75 per pencil × 4 pencils

  0.75
×    4
----

4 × 75 = 300
Move decimal 2 places: 300 → 3.00

So 4 pencils cost $3.00`,
      difficulty: 'medium',
    },
  ],
  'multiply-decimals-estimation': [
    {
      id: 'multiply-decimals-estimation-1',
      question: 'Estimate: 2.8 × 3.2',
      options: ['8', '9', '10', '11'],
      correctAnswer: 1,
      explanation: `Estimate 2.8 × 3.2

Round:
2.8 ≈ 3
3.2 ≈ 3

3 × 3 = 9

So estimate is 9`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 8: Divide Decimals
  'divide-decimals-tenths': [
    {
      id: 'divide-decimals-tenths-1',
      question: 'What is 4.8 ÷ 2?',
      options: ['2.3', '2.4', '2.5', '2.6'],
      correctAnswer: 1,
      explanation: `Let me solve this:
4.8 ÷ 2

4 ÷ 2 = 2
0.8 ÷ 2 = 0.4

2 + 0.4 = 2.4

So 4.8 ÷ 2 = 2.4`,
      difficulty: 'medium',
    },
  ],
  'divide-decimals-hundredths': [
    {
      id: 'divide-decimals-hundredths-1',
      question: 'What is 6.25 ÷ 5?',
      options: ['1.25', '1.35', '1.45', '1.55'],
      correctAnswer: 0,
      explanation: `Let me solve this:
6.25 ÷ 5

6 ÷ 5 = 1 remainder 1
1.25 ÷ 5 = 0.25

1 + 0.25 = 1.25

So 6.25 ÷ 5 = 1.25`,
      difficulty: 'medium',
    },
  ],
  'divide-decimals-whole-numbers': [
    {
      id: 'divide-decimals-whole-numbers-1',
      question: 'What is 8.4 ÷ 4?',
      options: ['2.0', '2.1', '2.2', '2.3'],
      correctAnswer: 1,
      explanation: `Let me solve this:
8.4 ÷ 4

8 ÷ 4 = 2
0.4 ÷ 4 = 0.1

2 + 0.1 = 2.1

So 8.4 ÷ 4 = 2.1`,
      difficulty: 'medium',
    },
  ],
  'divide-decimals-word-problems': [
    {
      id: 'divide-decimals-word-problems-1',
      question: 'You have $12.60 to share equally among 3 people. How much each?',
      options: ['$4.10', '$4.20', '$4.30', '$4.40'],
      correctAnswer: 1,
      explanation: `Let me solve this:
$12.60 ÷ 3

12 ÷ 3 = 4
0.60 ÷ 3 = 0.20

4 + 0.20 = 4.20

So each person gets $4.20`,
      difficulty: 'medium',
    },
  ],
  'divide-decimals-estimation': [
    {
      id: 'divide-decimals-estimation-1',
      question: 'Estimate: 8.7 ÷ 3',
      options: ['2', '3', '4', '5'],
      correctAnswer: 1,
      explanation: `Estimate 8.7 ÷ 3

Round:
8.7 ≈ 9

9 ÷ 3 = 3

So estimate is 3`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 9: Add and Subtract Fractions
  'add-fractions-like-denominators': [
    {
      id: 'add-fractions-like-denominators-1',
      question: 'What is 3/7 + 2/7?',
      options: ['5/7', '5/14', '4/7', '6/7'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  3/7 + 2/7

Same denominators, so add numerators:
3 + 2 = 5
Keep denominator: 7

So 3/7 + 2/7 = 5/7`,
      difficulty: 'easy',
    },
    {
      id: 'add-fractions-like-denominators-2',
      question: 'What is 5/8 + 2/8?',
      options: ['6/8', '7/8', '8/8', '9/8'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  5/8 + 2/8

Same denominators, so add numerators:
5 + 2 = 7
Keep denominator: 8

So 5/8 + 2/8 = 7/8`,
      difficulty: 'easy',
    },
  ],
  'subtract-fractions-like-denominators': [
    {
      id: 'subtract-fractions-like-denominators-1',
      question: 'What is 7/9 - 3/9?',
      options: ['3/9', '4/9', '5/9', '6/9'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  7/9 - 3/9

Same denominators, so subtract numerators:
7 - 3 = 4
Keep denominator: 9

So 7/9 - 3/9 = 4/9`,
      difficulty: 'easy',
    },
  ],
  'add-fractions-unlike-denominators': [
    {
      id: 'add-fractions-unlike-denominators-1',
      question: 'What is 1/2 + 1/4?',
      options: ['2/4', '3/4', '2/6', '1/2'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  1/2 + 1/4

Make denominators the same:
1/2 = 2/4

Now add: 2/4 + 1/4 = 3/4

So 1/2 + 1/4 = 3/4`,
      difficulty: 'medium',
    },
    {
      id: 'add-fractions-unlike-denominators-2',
      question: 'What is 1/3 + 1/6?',
      options: ['1/2', '2/6', '2/9', '1/3'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  1/3 + 1/6

Make denominators the same:
1/3 = 2/6

Now add: 2/6 + 1/6 = 3/6 = 1/2

So 1/3 + 1/6 = 1/2`,
      difficulty: 'medium',
    },
  ],
  'subtract-fractions-unlike-denominators': [
    {
      id: 'subtract-fractions-unlike-denominators-1',
      question: 'What is 3/4 - 1/2?',
      options: ['1/4', '2/4', '1/2', '2/2'],
      correctAnswer: 0,
      explanation: `Let me solve this:
  3/4 - 1/2

Make denominators the same:
1/2 = 2/4

Now subtract: 3/4 - 2/4 = 1/4

So 3/4 - 1/2 = 1/4`,
      difficulty: 'medium',
    },
  ],
  'add-subtract-mixed-numbers': [
    {
      id: 'add-subtract-mixed-numbers-1',
      question: 'What is 2 1/3 + 1 2/3?',
      options: ['3 1/3', '3 2/3', '4', '4 1/3'],
      correctAnswer: 2,
      explanation: `Let me solve this:
2 1/3 + 1 2/3

Add whole numbers: 2 + 1 = 3
Add fractions: 1/3 + 2/3 = 3/3 = 1

3 + 1 = 4

So 2 1/3 + 1 2/3 = 4`,
      difficulty: 'medium',
    },
  ],
  'fractions-word-problems': [
    {
      id: 'fractions-word-problems-1',
      question: 'You ate 1/4 of a pizza and your friend ate 1/4. How much did you eat together?',
      options: ['1/4', '1/2', '2/4', '3/4'],
      correctAnswer: 1,
      explanation: `Let me solve this:
You: 1/4
Friend: 1/4
Total: 1/4 + 1/4

Same denominators, so add numerators:
1 + 1 = 2
Keep denominator: 4

1/4 + 1/4 = 2/4 = 1/2

So together you ate 1/2`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Unit 10: Multiply Fractions (already exists, adding more)
  'multiply-fractions-visual': [
    {
      id: 'multiply-fractions-visual-1',
      question: 'Using area model: What is 1/2 × 1/3?',
      options: ['1/5', '1/6', '2/5', '2/6'],
      correctAnswer: 1,
      explanation: `Area model for 1/2 × 1/3:

Draw rectangle divided into 2 rows, 3 columns = 6 parts
Shade 1/2 of 1/3 = 1 part out of 6

So 1/2 × 1/3 = 1/6`,
      difficulty: 'medium',
    },
  ],
  'multiply-fractions-mixed': [
    {
      id: 'multiply-fractions-mixed-1',
      question: 'What is 2 1/2 × 1/4?',
      options: ['5/8', '3/4', '1/2', '2/4'],
      correctAnswer: 0,
      explanation: `Let me solve this:
2 1/2 × 1/4

Convert mixed number: 2 1/2 = 5/2

5/2 × 1/4 = 5/8

So 2 1/2 × 1/4 = 5/8`,
      difficulty: 'medium',
    },
  ],
  'multiply-fractions-word-problems': [
    {
      id: 'multiply-fractions-word-problems-1',
      question: 'You have 3/4 of a pizza. You eat 1/2 of it. How much did you eat?',
      options: ['1/4', '3/8', '1/2', '2/4'],
      correctAnswer: 1,
      explanation: `Let me solve this:
3/4 of pizza × 1/2 eaten

3/4 × 1/2 = 3/8

So you ate 3/8 of the pizza`,
      difficulty: 'medium',
    },
  ],
  'multiply-fractions-estimation': [
    {
      id: 'multiply-fractions-estimation-1',
      question: 'Estimate: 2/3 × 4/5',
      options: ['Less than 1/2', 'About 1/2', 'More than 1/2', 'About 1'],
      correctAnswer: 2,
      explanation: `Estimate 2/3 × 4/5

2/3 ≈ 0.67
4/5 ≈ 0.8

0.67 × 0.8 ≈ 0.54

0.54 is more than 1/2 (0.5)`,
      difficulty: 'medium',
    },
  ],
  // Grade 5 - Unit 11: Divide Fractions
  'divide-fractions-visual': [
    {
      id: 'divide-fractions-visual-1',
      question: 'Using visual model: How many 1/4s fit into 1/2?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
      explanation: `Visual model:
1/2 of a whole
1/4 of a whole

How many 1/4s fit into 1/2?
1/4 + 1/4 = 2/4 = 1/2

So 2 one-fourths fit into 1/2

1/2 ÷ 1/4 = 2`,
      difficulty: 'medium',
    },
  ],
  'divide-fractions-mixed': [
    {
      id: 'divide-fractions-mixed-1',
      question: 'What is 2 1/2 ÷ 1/4?',
      options: ['8', '9', '10', '11'],
      correctAnswer: 2,
      explanation: `Let me solve this:
2 1/2 ÷ 1/4

Convert mixed number: 2 1/2 = 5/2

5/2 ÷ 1/4 = 5/2 × 4/1 = 20/2 = 10

So 2 1/2 ÷ 1/4 = 10`,
      difficulty: 'medium',
    },
  ],
  'divide-fractions-word-problems': [
    {
      id: 'divide-fractions-word-problems-1',
      question: 'You have 3/4 of a pizza. How many 1/8 slices can you make?',
      options: ['4', '5', '6', '7'],
      correctAnswer: 2,
      explanation: `Let me solve this:
3/4 ÷ 1/8

3/4 ÷ 1/8 = 3/4 × 8/1 = 24/4 = 6

So you can make 6 slices`,
      difficulty: 'medium',
    },
  ],
  'divide-fractions-estimation': [
    {
      id: 'divide-fractions-estimation-1',
      question: 'Estimate: 2/3 ÷ 1/2',
      options: ['Less than 1', 'About 1', 'More than 1', 'About 2'],
      correctAnswer: 2,
      explanation: `Estimate 2/3 ÷ 1/2

2/3 ÷ 1/2 = 2/3 × 2/1 = 4/3 ≈ 1.33

1.33 is more than 1`,
      difficulty: 'medium',
    },
  ],
  // Grade 5 - Unit 12: Converting Fractions and Decimals
  'fraction-to-decimal': [
    {
      id: 'fraction-to-decimal-1',
      question: 'What is 3/4 as a decimal?',
      options: ['0.25', '0.5', '0.75', '0.8'],
      correctAnswer: 2,
      explanation: `Convert 3/4 to decimal

3 ÷ 4 = 0.75

So 3/4 = 0.75`,
      difficulty: 'easy',
    },
    {
      id: 'fraction-to-decimal-2',
      question: 'What is 1/5 as a decimal?',
      options: ['0.1', '0.2', '0.3', '0.4'],
      correctAnswer: 1,
      explanation: `Convert 1/5 to decimal

1 ÷ 5 = 0.2

So 1/5 = 0.2`,
      difficulty: 'easy',
    },
  ],
  'decimal-to-fraction': [
    {
      id: 'decimal-to-fraction-1',
      question: 'What is 0.6 as a fraction?',
      options: ['6/10', '6/100', '1/6', '6'],
      correctAnswer: 0,
      explanation: `Convert 0.6 to fraction

0.6 = 6 tenths = 6/10

So 0.6 = 6/10`,
      difficulty: 'easy',
    },
    {
      id: 'decimal-to-fraction-2',
      question: 'What is 0.25 as a fraction?',
      options: ['25/10', '25/100', '1/25', '25'],
      correctAnswer: 1,
      explanation: `Convert 0.25 to fraction

0.25 = 25 hundredths = 25/100

So 0.25 = 25/100`,
      difficulty: 'easy',
    },
  ],
  'fractions-decimals-equivalent': [
    {
      id: 'fractions-decimals-equivalent-1',
      question: 'Which is equivalent: 0.5 or 1/2?',
      options: ['0.5', '1/2', 'They are equal', 'Cannot tell'],
      correctAnswer: 2,
      explanation: `Compare 0.5 and 1/2

0.5 = 5/10 = 1/2
1/2 = 1/2

So 0.5 = 1/2

They are equal`,
      difficulty: 'easy',
    },
  ],
  'fractions-decimals-word-problems': [
    {
      id: 'fractions-decimals-word-problems-1',
      question: 'You ran 0.75 of a mile. What fraction is that?',
      options: ['3/4', '7/10', '75/100', '1/2'],
      correctAnswer: 0,
      explanation: `Convert 0.75 to fraction

0.75 = 75/100 = 3/4

So 0.75 = 3/4`,
      difficulty: 'medium',
    },
  ],
  // Grade 5 - Unit 13: Volume
  'volume-formula': [
    {
      id: 'volume-formula-1',
      question: 'What is the volume of a box with length 5, width 3, and height 2?',
      options: ['25', '30', '35', '40'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Box: length = 5, width = 3, height = 2

Volume = length × width × height
Volume = 5 × 3 × 2
Volume = 15 × 2 = 30

So the volume is 30 cubic units`,
      difficulty: 'medium',
    },
    {
      id: 'volume-formula-2',
      question: 'What is the volume of a box with length 4, width 4, and height 4?',
      options: ['48', '64', '56', '72'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Box: length = 4, width = 4, height = 4

Volume = length × width × height
Volume = 4 × 4 × 4
Volume = 16 × 4 = 64

So the volume is 64 cubic units`,
      difficulty: 'medium',
    },
  ],
  'volume-unit-cubes': [
    {
      id: 'volume-unit-cubes-1',
      question: 'A box is 3 cubes long, 2 cubes wide, and 2 cubes tall. How many unit cubes?',
      options: ['10', '12', '14', '16'],
      correctAnswer: 1,
      explanation: `Count unit cubes:
3 cubes long × 2 cubes wide × 2 cubes tall

3 × 2 × 2 = 12

So there are 12 unit cubes`,
      difficulty: 'easy',
    },
  ],
  'volume-composite': [
    {
      id: 'volume-composite-1',
      question: 'A shape has two boxes: Box A (3×2×1) and Box B (2×2×1). What is total volume?',
      options: ['8', '9', '10', '11'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Box A: 3 × 2 × 1 = 6
Box B: 2 × 2 × 1 = 4

Total volume: 6 + 4 = 10

So total volume is 10 cubic units`,
      difficulty: 'medium',
    },
  ],
  'volume-word-problems': [
    {
      id: 'volume-word-problems-1',
      question: 'A fish tank is 6 inches long, 4 inches wide, and 5 inches tall. What is its volume?',
      options: ['100', '110', '120', '130'],
      correctAnswer: 2,
      explanation: `Let me solve this:
Tank: length = 6, width = 4, height = 5

Volume = length × width × height
Volume = 6 × 4 × 5
Volume = 24 × 5 = 120

So the volume is 120 cubic inches`,
      difficulty: 'medium',
    },
  ],
  // Grade 5 - Unit 14: Coordinate Plane
  'coordinate-plane-quadrants': [
    {
      id: 'coordinate-plane-quadrants-1',
      question: 'In which quadrant is the point (3, 4)?',
      options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      correctAnswer: 0,
      explanation: `Point (3, 4):
- x = 3 (positive, right)
- y = 4 (positive, up)

Quadrant I: x positive, y positive

So (3, 4) is in Quadrant I`,
      difficulty: 'easy',
    },
  ],
  'coordinate-plane-plotting': [
    {
      id: 'coordinate-plane-plotting-1',
      question: 'Where is the point (2, 5) located?',
      options: ['2 right, 5 up', '2 left, 5 up', '2 right, 5 down', '2 left, 5 down'],
      correctAnswer: 0,
      explanation: `Point (2, 5):
- x = 2 means move 2 right
- y = 5 means move 5 up

So (2, 5) is 2 right, 5 up`,
      difficulty: 'easy',
    },
  ],
  'coordinate-plane-reading': [
    {
      id: 'coordinate-plane-reading-1',
      question: 'A point is 3 right and 4 up. What are its coordinates?',
      options: ['(3, 4)', '(4, 3)', '(-3, 4)', '(3, -4)'],
      correctAnswer: 0,
      explanation: `3 right means x = 3
4 up means y = 4

Coordinates: (x, y) = (3, 4)

So the point is (3, 4)`,
      difficulty: 'easy',
    },
  ],
  'coordinate-plane-patterns': [
    {
      id: 'coordinate-plane-patterns-1',
      question: 'Points (1, 2), (2, 4), (3, 6) follow what pattern?',
      options: ['y = x', 'y = 2x', 'y = x + 1', 'y = 3x'],
      correctAnswer: 1,
      explanation: `Pattern:
(1, 2): y = 2 × 1 = 2 ✓
(2, 4): y = 2 × 2 = 4 ✓
(3, 6): y = 2 × 3 = 6 ✓

So y = 2x`,
      difficulty: 'medium',
    },
  ],
}

// Get premade quiz for a lesson, or return empty array if none exists
export function getPremadeQuiz(lessonId: string): QuizQuestion[] {
  return premadeQuizzes[lessonId] || []
}
