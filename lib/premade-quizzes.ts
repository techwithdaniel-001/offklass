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
  // Grade 5 - Fractions
  'multiplying-fractions': [
    {
      id: 'multiplying-fractions-1',
      question: 'What is 2/3 × 1/4?',
      options: ['2/12', '3/7', '1/6', '2/7'],
      correctAnswer: 2,
      explanation: `Let me solve this:
  2/3 × 1/4

Multiply numerators: 2 × 1 = 2
Multiply denominators: 3 × 4 = 12

So 2/3 × 1/4 = 2/12

Simplify: 2/12 = 1/6`,
      difficulty: 'medium',
    },
  ],
  'dividing-fractions': [
    {
      id: 'dividing-fractions-1',
      question: 'What is 1/2 ÷ 1/4?',
      options: ['1/8', '2', '1/2', '1/4'],
      correctAnswer: 1,
      explanation: `Let me solve this:
  1/2 ÷ 1/4

To divide, multiply by the reciprocal:
1/2 ÷ 1/4 = 1/2 × 4/1

Multiply: 1 × 4 = 4, 2 × 1 = 2
4/2 = 2

So 1/2 ÷ 1/4 = 2`,
      difficulty: 'medium',
    },
  ],
  'fractions-decimals': [
    {
      id: 'fractions-decimals-1',
      question: 'What is 1/2 as a decimal?',
      options: ['0.2', '0.5', '0.25', '0.75'],
      correctAnswer: 1,
      explanation: `Let me solve this:
Convert 1/2 to decimal

1 ÷ 2 = 0.5

So 1/2 = 0.5`,
      difficulty: 'easy',
    },
  ],
  // Grade 5 - Geometry
  'volume': [
    {
      id: 'volume-1',
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
  ],
  'coordinate-plane': [
    {
      id: 'coordinate-plane-1',
      question: 'What are the coordinates of the point at (3, 4)?',
      options: ['x=3, y=4', 'x=4, y=3', 'x=3, y=3', 'x=4, y=4'],
      correctAnswer: 0,
      explanation: `Coordinates are written as (x, y)
(3, 4) means:
- x = 3 (move right 3)
- y = 4 (move up 4)

So x=3, y=4`,
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
}

// Get premade quiz for a lesson, or return empty array if none exists
export function getPremadeQuiz(lessonId: string): QuizQuestion[] {
  return premadeQuizzes[lessonId] || []
}
