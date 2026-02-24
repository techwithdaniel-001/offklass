// Premade flashcards for each lesson
// These are the base flashcards, students can ask AI for more explanations

import { Flashcard } from './ai-service'

export const premadeFlashcards: Record<string, Flashcard[]> = {
  // Grade 3 - First Lesson: What is Multiplication?
  'multiply-intro': [
    {
      id: 'multiply-intro-flash-1',
      front: 'What is multiplication?',
      back: 'Multiplication is adding the same number many times! Like 3 × 4 means 3 + 3 + 3 + 3 = 12',
      concept: 'Multiplication Basics',
    },
    {
      id: 'multiply-intro-flash-2',
      front: 'What does 5 × 3 mean?',
      back: '5 × 3 means add 5 three times: 5 + 5 + 5 = 15',
      concept: 'Multiplication as Repeated Addition',
    },
    {
      id: 'multiply-intro-flash-3',
      front: 'What is a multiplication fact?',
      back: 'A multiplication fact is a quick way to remember answers! Like 6 × 7 = 42',
      concept: 'Multiplication Facts',
    },
    {
      id: 'multiply-intro-flash-4',
      front: 'What does × mean?',
      back: '× means "times" or "multiply". It tells us to add the same number many times!',
      concept: 'Multiplication Symbol',
    },
    {
      id: 'multiply-intro-flash-5',
      front: 'What is 2 × 4?',
      back: '2 × 4 = 8. This means 2 + 2 + 2 + 2 = 8',
      concept: 'Basic Multiplication',
    },
    {
      id: 'multiply-intro-flash-6',
      front: 'What is 3 × 5?',
      back: '3 × 5 = 15. This means 3 + 3 + 3 + 3 + 3 = 15',
      concept: 'Basic Multiplication',
    },
    {
      id: 'multiply-intro-flash-7',
      front: 'What is 4 × 6?',
      back: '4 × 6 = 24. This means 4 + 4 + 4 + 4 + 4 + 4 = 24',
      concept: 'Basic Multiplication',
    },
    {
      id: 'multiply-intro-flash-8',
      front: 'What is 7 × 2?',
      back: '7 × 2 = 14. This means 7 + 7 = 14',
      concept: 'Basic Multiplication',
    },
    {
      id: 'multiply-intro-flash-9',
      front: 'What is 8 × 3?',
      back: '8 × 3 = 24. This means 8 + 8 + 8 = 24',
      concept: 'Basic Multiplication',
    },
    {
      id: 'multiply-intro-flash-10',
      front: 'What is 9 × 4?',
      back: '9 × 4 = 36. This means 9 + 9 + 9 + 9 = 36',
      concept: 'Basic Multiplication',
    },
  ],

  // Grade 4 - First Lesson: What is Place Value?
  'place-value-intro': [
    {
      id: 'place-value-intro-flash-1',
      front: 'What is place value?',
      back: 'Place value tells us what each digit in a number means! Like in 456, the 5 means 5 tens (50)',
      concept: 'Place Value Basics',
    },
    {
      id: 'place-value-intro-flash-2',
      front: 'What is the ones place?',
      back: 'The ones place is the rightmost digit. It tells us how many ones we have!',
      concept: 'Ones Place',
    },
    {
      id: 'place-value-intro-flash-3',
      front: 'What is the tens place?',
      back: 'The tens place is the second digit from the right. It tells us how many groups of 10 we have!',
      concept: 'Tens Place',
    },
    {
      id: 'place-value-intro-flash-4',
      front: 'What is the hundreds place?',
      back: 'The hundreds place is the third digit from the right. It tells us how many groups of 100 we have!',
      concept: 'Hundreds Place',
    },
    {
      id: 'place-value-intro-flash-5',
      front: 'What is the thousands place?',
      back: 'The thousands place is the fourth digit from the right. It tells us how many groups of 1000 we have!',
      concept: 'Thousands Place',
    },
    {
      id: 'place-value-intro-flash-6',
      front: 'What is the value of 4 in 4,567?',
      back: 'The 4 is in the thousands place, so it means 4,000 (four thousand)!',
      concept: 'Place Value Example',
    },
    {
      id: 'place-value-intro-flash-7',
      front: 'What is expanded form?',
      back: 'Expanded form shows each digit\'s value! Like 234 = 200 + 30 + 4',
      concept: 'Expanded Form',
    },
    {
      id: 'place-value-intro-flash-8',
      front: 'What is 1,234 in expanded form?',
      back: '1,234 = 1,000 + 200 + 30 + 4',
      concept: 'Expanded Form Example',
    },
    {
      id: 'place-value-intro-flash-9',
      front: 'What is the value of 5 in 5,678?',
      back: 'The 5 is in the thousands place, so it means 5,000 (five thousand)!',
      concept: 'Place Value Example',
    },
    {
      id: 'place-value-intro-flash-10',
      front: 'What is 3,456 in words?',
      back: 'Three thousand four hundred fifty-six',
      concept: 'Number Words',
    },
  ],

  // Grade 5 - First Lesson: Introduction to Decimals
  'decimal-place-value-intro': [
    {
      id: 'decimal-place-value-intro-flash-1',
      front: 'What is a decimal?',
      back: 'A decimal is a number with a dot (.) that shows parts of a whole! Like 3.5 means 3 and 5 tenths',
      concept: 'Decimal Basics',
    },
    {
      id: 'decimal-place-value-intro-flash-2',
      front: 'What is the decimal point?',
      back: 'The decimal point (.) separates whole numbers from parts! Numbers before the dot are whole, after are parts',
      concept: 'Decimal Point',
    },
    {
      id: 'decimal-place-value-intro-flash-3',
      front: 'What is the tenths place?',
      back: 'The tenths place is the first digit after the decimal point. It shows how many tenths (parts out of 10)',
      concept: 'Tenths Place',
    },
    {
      id: 'decimal-place-value-intro-flash-4',
      front: 'What is 0.5 as a fraction?',
      back: '0.5 = 5/10 = 1/2. It means 5 parts out of 10, or half!',
      concept: 'Decimal to Fraction',
    },
    {
      id: 'decimal-place-value-intro-flash-5',
      front: 'What is 0.7 as a fraction?',
      back: '0.7 = 7/10. It means 7 parts out of 10!',
      concept: 'Decimal to Fraction',
    },
    {
      id: 'decimal-place-value-intro-flash-6',
      front: 'What is 2.3 in words?',
      back: 'Two and three tenths. The 2 is whole, the 3 is three tenths!',
      concept: 'Decimal Words',
    },
    {
      id: 'decimal-place-value-intro-flash-7',
      front: 'What is 3/10 as a decimal?',
      back: '3/10 = 0.3. Three tenths equals zero point three!',
      concept: 'Fraction to Decimal',
    },
    {
      id: 'decimal-place-value-intro-flash-8',
      front: 'What is the value of 5 in 3.5?',
      back: 'The 5 is in the tenths place, so it means 5 tenths (0.5)!',
      concept: 'Decimal Place Value',
    },
    {
      id: 'decimal-place-value-intro-flash-9',
      front: 'Is 0.5 the same as 0.50?',
      back: 'Yes! 0.5 = 0.50. Adding a zero at the end doesn\'t change the value!',
      concept: 'Equivalent Decimals',
    },
    {
      id: 'decimal-place-value-intro-flash-10',
      front: 'What is 1/10 as a decimal?',
      back: '1/10 = 0.1. One tenth equals zero point one!',
      concept: 'Fraction to Decimal',
    },
  ],

  // Grade 6 - First Lesson: Introduction to Ratios
  'ratios-intro': [
    {
      id: 'ratios-intro-flash-1',
      front: 'What is a ratio?',
      back: 'A ratio compares two numbers! Like 3:2 means 3 of one thing for every 2 of another',
      concept: 'Ratio Basics',
    },
    {
      id: 'ratios-intro-flash-2',
      front: 'How do you write a ratio?',
      back: 'You write ratios with a colon (:). Like 3:2 means 3 to 2!',
      concept: 'Ratio Notation',
    },
    {
      id: 'ratios-intro-flash-3',
      front: 'What does 4:3 mean?',
      back: '4:3 means 4 of one thing for every 3 of another! Like 4 apples for every 3 oranges',
      concept: 'Ratio Meaning',
    },
    {
      id: 'ratios-intro-flash-4',
      front: 'What is the ratio of 6 dogs to 2 cats?',
      back: '6:2. This means 6 dogs for every 2 cats!',
      concept: 'Ratio Example',
    },
    {
      id: 'ratios-intro-flash-5',
      front: 'What is the ratio of 8 pencils to 4 pens?',
      back: '8:4. This means 8 pencils for every 4 pens!',
      concept: 'Ratio Example',
    },
    {
      id: 'ratios-intro-flash-6',
      front: 'What is the ratio of 10 flowers to 5 vases?',
      back: '10:5. This means 10 flowers for every 5 vases!',
      concept: 'Ratio Example',
    },
    {
      id: 'ratios-intro-flash-7',
      front: 'Can ratios be written as fractions?',
      back: 'Yes! 3:2 can also be written as 3/2. They mean the same thing!',
      concept: 'Ratio as Fraction',
    },
    {
      id: 'ratios-intro-flash-8',
      front: 'What does order matter in ratios?',
      back: 'Yes! 3:2 is different from 2:3. The first number comes first!',
      concept: 'Ratio Order',
    },
    {
      id: 'ratios-intro-flash-9',
      front: 'What is the ratio of 12 students to 3 teachers?',
      back: '12:3. This means 12 students for every 3 teachers!',
      concept: 'Ratio Example',
    },
    {
      id: 'ratios-intro-flash-10',
      front: 'What is the ratio of 15 toys to 5 boxes?',
      back: '15:5. This means 15 toys for every 5 boxes!',
      concept: 'Ratio Example',
    },
  ],

  // Grade 7 - First Lesson: Introduction to Proportional Relationships
  'proportional-relationships-intro': [
    {
      id: 'proportional-relationships-intro-flash-1',
      front: 'What is a proportional relationship?',
      back: 'A proportional relationship means when one thing doubles, the other doubles too! Like if 2 apples cost $4, then 4 apples cost $8',
      concept: 'Proportional Relationship Basics',
    },
    {
      id: 'proportional-relationships-intro-flash-2',
      front: 'What does proportional mean?',
      back: 'Proportional means the ratio stays the same! If you double one thing, you double the other',
      concept: 'Proportional Meaning',
    },
    {
      id: 'proportional-relationships-intro-flash-3',
      front: 'If 3 cookies cost $6, how much do 6 cookies cost?',
      back: '$12! When cookies double (3 to 6), cost doubles too ($6 to $12). This is proportional!',
      concept: 'Proportional Example',
    },
    {
      id: 'proportional-relationships-intro-flash-4',
      front: 'If 4 pencils cost $8, how much do 8 pencils cost?',
      back: '$16! When pencils double (4 to 8), cost doubles too ($8 to $16). This is proportional!',
      concept: 'Proportional Example',
    },
    {
      id: 'proportional-relationships-intro-flash-5',
      front: 'What is a constant ratio?',
      back: 'A constant ratio means the ratio stays the same! Like 2:4 = 4:8 = 6:12. All equal 1:2!',
      concept: 'Constant Ratio',
    },
    {
      id: 'proportional-relationships-intro-flash-6',
      front: 'If 5 books cost $15, how much do 10 books cost?',
      back: '$30! When books double (5 to 10), cost doubles too ($15 to $30). This is proportional!',
      concept: 'Proportional Example',
    },
    {
      id: 'proportional-relationships-intro-flash-7',
      front: 'What is a unit rate?',
      back: 'A unit rate is the cost for one thing! Like if 3 apples cost $6, the unit rate is $2 per apple',
      concept: 'Unit Rate',
    },
    {
      id: 'proportional-relationships-intro-flash-8',
      front: 'If 2 hours = 120 minutes, how many minutes in 4 hours?',
      back: '240 minutes! When hours double (2 to 4), minutes double too (120 to 240). This is proportional!',
      concept: 'Proportional Example',
    },
    {
      id: 'proportional-relationships-intro-flash-9',
      front: 'What makes something proportional?',
      back: 'When you can multiply one number by the same number to get the other! Like 2 × 2 = 4, and $4 × 2 = $8',
      concept: 'Proportional Definition',
    },
    {
      id: 'proportional-relationships-intro-flash-10',
      front: 'If 6 oranges cost $12, how much do 12 oranges cost?',
      back: '$24! When oranges double (6 to 12), cost doubles too ($12 to $24). This is proportional!',
      concept: 'Proportional Example',
    },
  ],

  // Grade 4 Unit 2: Addition & Subtraction (first lesson)
  'add-subtract-3': [
    { id: 'add-subtract-3-flash-1', front: 'What is addition?', back: 'Addition is putting two or more numbers together to get a total (sum).', concept: 'Addition' },
    { id: 'add-subtract-3-flash-2', front: 'What is subtraction?', back: 'Subtraction is taking one number away from another to find the difference.', concept: 'Subtraction' },
    { id: 'add-subtract-3-flash-3', front: 'What does regrouping mean?', back: 'Regrouping (carrying or borrowing) means moving value between place values when adding or subtracting.', concept: 'Regrouping' },
    { id: 'add-subtract-3-flash-4', front: 'How do you add 47 + 38?', back: 'Add ones: 7 + 8 = 15, write 5 and carry 1 ten. Add tens: 1 + 4 + 3 = 8. Answer: 85.', concept: 'Adding two-digit' },
    { id: 'add-subtract-3-flash-5', front: 'How do you subtract 52 − 27?', back: 'Borrow 1 ten: 12 − 7 = 5 ones, then 4 − 2 = 2 tens. Answer: 25.', concept: 'Subtracting two-digit' },
    { id: 'add-subtract-3-flash-6', front: 'What is the sum of 23 + 19?', back: '23 + 19 = 42.', concept: 'Addition fact' },
    { id: 'add-subtract-3-flash-7', front: 'What is 60 − 34?', back: '60 − 34 = 26.', concept: 'Subtraction fact' },
    { id: 'add-subtract-3-flash-8', front: 'What is estimation?', back: 'Estimation is rounding numbers to get a quick approximate answer before calculating exactly.', concept: 'Estimation' },
  ],

  // Grade 4 Unit 4: Multiply by 2-digit (first lesson)
  'multi-digit-multiply': [
    { id: 'multi-digit-multiply-flash-1', front: 'How do you multiply by a 2-digit number?', back: 'Multiply by the ones digit first, then by the tens digit, then add the two partial products.', concept: '2-digit multiplication' },
    { id: 'multi-digit-multiply-flash-2', front: 'What is 24 × 12?', back: '24 × 2 = 48, 24 × 10 = 240; 48 + 240 = 288.', concept: 'Example' },
    { id: 'multi-digit-multiply-flash-3', front: 'Why do we put a zero in the second partial product?', back: 'We are multiplying by tens, so the result is in the tens place; the zero holds the ones place.', concept: 'Place value' },
    { id: 'multi-digit-multiply-flash-4', front: 'What is the area model for multiplication?', back: 'Splitting a rectangle into parts (e.g. 20+4 and 10+2) and multiplying each part, then adding.', concept: 'Area model' },
    { id: 'multi-digit-multiply-flash-5', front: 'What is 15 × 11?', back: '15 × 11 = 165.', concept: 'Quick fact' },
    { id: 'multi-digit-multiply-flash-6', front: 'What is 30 × 4?', back: '30 × 4 = 120.', concept: 'Mental math' },
    { id: 'multi-digit-multiply-flash-7', front: 'What are partial products?', back: 'Partial products are the results you get when you multiply by each digit separately before adding.', concept: 'Partial products' },
    { id: 'multi-digit-multiply-flash-8', front: 'What is 18 × 5?', back: '18 × 5 = 90.', concept: 'Practice' },
  ],

  // Grade 4 Unit 5: Division (first lesson)
  'division-intro': [
    { id: 'division-intro-flash-1', front: 'What is division?', back: 'Division is splitting a number into equal parts or finding how many times one number fits into another.', concept: 'Division' },
    { id: 'division-intro-flash-2', front: 'What is the division symbol?', back: 'We use ÷ or / or the bar in a fraction. 12 ÷ 3 means 12 split into 3 equal parts.', concept: 'Symbol' },
    { id: 'division-intro-flash-3', front: 'What is 20 ÷ 4?', back: '20 ÷ 4 = 5, because 4 × 5 = 20.', concept: 'Division fact' },
    { id: 'division-intro-flash-4', front: 'What is a quotient?', back: 'The quotient is the answer to a division problem.', concept: 'Quotient' },
    { id: 'division-intro-flash-5', front: 'What is a remainder?', back: 'A remainder is what is left over when one number does not divide evenly into another.', concept: 'Remainder' },
    { id: 'division-intro-flash-6', front: 'What is 17 ÷ 5?', back: '17 ÷ 5 = 3 remainder 2, because 5 × 3 = 15 and 17 − 15 = 2.', concept: 'Remainder example' },
    { id: 'division-intro-flash-7', front: 'How is division related to multiplication?', back: 'Division is the opposite of multiplication. If 6 × 4 = 24, then 24 ÷ 4 = 6 and 24 ÷ 6 = 4.', concept: 'Inverse' },
    { id: 'division-intro-flash-8', front: 'What is 36 ÷ 6?', back: '36 ÷ 6 = 6.', concept: 'Practice' },
  ],

  // Grade 4 Unit 6: Factors & Multiples (first lesson) – same key as quiz
  'factors-multiples': [
    { id: 'factors-multiples-flash-1', front: 'What is a factor?', back: 'A factor is a number that divides evenly into another number. The factors of 12 are 1, 2, 3, 4, 6, 12.', concept: 'Factor' },
    { id: 'factors-multiples-flash-2', front: 'What is a multiple?', back: 'A multiple is the result of multiplying a number by a whole number. Multiples of 5 are 5, 10, 15, 20, …', concept: 'Multiple' },
    { id: 'factors-multiples-flash-3', front: 'What are the factors of 10?', back: 'The factors of 10 are 1, 2, 5, and 10.', concept: 'Factors example' },
    { id: 'factors-multiples-flash-4', front: 'What are the first 4 multiples of 7?', back: '7, 14, 21, 28.', concept: 'Multiples example' },
    { id: 'factors-multiples-flash-5', front: 'What is a prime number?', back: 'A prime number has exactly two factors: 1 and itself. Examples: 2, 3, 5, 7.', concept: 'Prime' },
    { id: 'factors-multiples-flash-6', front: 'What is a composite number?', back: 'A composite number has more than two factors. Examples: 4, 6, 8, 9.', concept: 'Composite' },
    { id: 'factors-multiples-flash-7', front: 'Is 1 prime or composite?', back: 'Neither. 1 has only one factor (itself), so it is not prime or composite.', concept: 'One' },
    { id: 'factors-multiples-flash-8', front: 'What are the factors of 8?', back: 'The factors of 8 are 1, 2, 4, and 8.', concept: 'Practice' },
  ],

  // Grade 4 Unit 7: Equivalent fractions (first lesson)
  'equivalent-fractions': [
    { id: 'equivalent-fractions-flash-1', front: 'What are equivalent fractions?', back: 'Equivalent fractions are different fractions that name the same amount. Example: 1/2 = 2/4 = 3/6.', concept: 'Equivalent fractions' },
    { id: 'equivalent-fractions-flash-2', front: 'How do you find equivalent fractions?', back: 'Multiply or divide the numerator and denominator by the same number. 1/2 = 2/4 (×2).', concept: 'Finding equivalent' },
    { id: 'equivalent-fractions-flash-3', front: 'Is 2/4 the same as 1/2?', back: 'Yes. 2/4 = 1/2 because 2÷2/4÷2 = 1/2.', concept: 'Example' },
    { id: 'equivalent-fractions-flash-4', front: 'What is 3/6 in simplest form?', back: '3/6 = 1/2 (divide numerator and denominator by 3).', concept: 'Simplest form' },
    { id: 'equivalent-fractions-flash-5', front: 'What fraction is equivalent to 2/3 with denominator 9?', back: '2/3 = 6/9 (multiply numerator and denominator by 3).', concept: 'Same value' },
    { id: 'equivalent-fractions-flash-6', front: 'What does simplest form mean?', back: 'Simplest form means the numerator and denominator have no common factor except 1.', concept: 'Simplest form' },
    { id: 'equivalent-fractions-flash-7', front: 'Is 4/8 = 1/2?', back: 'Yes. 4/8 = 1/2.', concept: 'Quick check' },
    { id: 'equivalent-fractions-flash-8', front: 'What is 5/10 in simplest form?', back: '5/10 = 1/2.', concept: 'Practice' },
  ],

  // Grade 4 Unit 8: Adding fractions (first lesson)
  'adding-fractions': [
    { id: 'adding-fractions-flash-1', front: 'How do you add fractions with the same denominator?', back: 'Add the numerators and keep the denominator. 2/5 + 1/5 = 3/5.', concept: 'Same denominator' },
    { id: 'adding-fractions-flash-2', front: 'What is 1/4 + 2/4?', back: '1/4 + 2/4 = 3/4.', concept: 'Example' },
    { id: 'adding-fractions-flash-3', front: 'Can you add 1/3 + 1/2 directly?', back: 'No. First find a common denominator (e.g. 6): 2/6 + 3/6 = 5/6.', concept: 'Different denominators' },
    { id: 'adding-fractions-flash-4', front: 'What is a common denominator?', back: 'A common denominator is a number that both denominators divide into. For 2 and 3, 6 is common.', concept: 'Common denominator' },
    { id: 'adding-fractions-flash-5', front: 'What is 2/7 + 3/7?', back: '2/7 + 3/7 = 5/7.', concept: 'Practice' },
    { id: 'adding-fractions-flash-6', front: 'What is 1/5 + 2/5?', back: '1/5 + 2/5 = 3/5.', concept: 'Practice' },
    { id: 'adding-fractions-flash-7', front: 'How do you subtract fractions with the same denominator?', back: 'Subtract the numerators and keep the denominator. 5/6 − 2/6 = 3/6 = 1/2.', concept: 'Subtract fractions' },
    { id: 'adding-fractions-flash-8', front: 'What is 4/9 − 1/9?', back: '4/9 − 1/9 = 3/9 = 1/3.', concept: 'Subtract example' },
  ],

  // Grade 8 - First Lesson: Irrational Numbers
  'irrational-numbers': [
    {
      id: 'irrational-numbers-flash-1',
      front: 'What is an irrational number?',
      back: 'An irrational number cannot be written as a fraction! It goes on forever with no pattern. Like √2 or π',
      concept: 'Irrational Number Basics',
    },
    {
      id: 'irrational-numbers-flash-2',
      front: 'What is √2?',
      back: '√2 = 1.41421356... It goes on forever with no pattern! This is an irrational number',
      concept: 'Square Root of 2',
    },
    {
      id: 'irrational-numbers-flash-3',
      front: 'What is π (pi)?',
      back: 'π = 3.14159265... It goes on forever with no pattern! This is an irrational number. We use it for circles',
      concept: 'Pi',
    },
    {
      id: 'irrational-numbers-flash-4',
      front: 'Is √4 irrational?',
      back: 'No! √4 = 2, which can be written as 2/1 (a fraction). So √4 is rational!',
      concept: 'Perfect Squares',
    },
    {
      id: 'irrational-numbers-flash-5',
      front: 'Is √5 irrational?',
      back: 'Yes! √5 = 2.236... It goes on forever with no pattern and cannot be written as a fraction!',
      concept: 'Irrational Square Root',
    },
    {
      id: 'irrational-numbers-flash-6',
      front: 'What is √3?',
      back: '√3 = 1.7320508... It goes on forever with no pattern! This is an irrational number',
      concept: 'Square Root of 3',
    },
    {
      id: 'irrational-numbers-flash-7',
      front: 'Can irrational numbers be written as fractions?',
      back: 'No! That\'s what makes them irrational. They cannot be written as a fraction like 1/2 or 3/4',
      concept: 'Irrational Definition',
    },
    {
      id: 'irrational-numbers-flash-8',
      front: 'Is √9 irrational?',
      back: 'No! √9 = 3, which can be written as 3/1 (a fraction). So √9 is rational!',
      concept: 'Perfect Squares',
    },
    {
      id: 'irrational-numbers-flash-9',
      front: 'What is √7?',
      back: '√7 = 2.6457513... It goes on forever with no pattern! This is an irrational number',
      concept: 'Square Root of 7',
    },
    {
      id: 'irrational-numbers-flash-10',
      front: 'What makes a number irrational?',
      back: 'A number is irrational if it goes on forever with no pattern and cannot be written as a fraction!',
      concept: 'Irrational Characteristics',
    },
  ],
}

// Grade 4: first lesson of each unit uses premade flashcards. Map first-lesson IDs to premade keys (same as quizzes).
const GRADE4_FIRST_LESSON_FLASHCARD_ALIASES: Record<string, string> = {
  'place-value-intro': 'place-value-intro',
  'add-subtract-review': 'add-subtract-3',
  'multiply-review': 'multiply-intro',
  'multiply-2-digit-intro': 'multi-digit-multiply',
  'division-review': 'division-intro',
  'factors-intro': 'factors-multiples',
  'equivalent-fractions-intro': 'equivalent-fractions',
  'add-fractions-like': 'adding-fractions',
}

// Get premade flashcards for a lesson, or return empty array if none exists.
// For Grade 4 first-lesson IDs, aliases to the premade set and rewrites card IDs to match lessonId.
export function getPremadeFlashcards(lessonId: string): Flashcard[] {
  const key = GRADE4_FIRST_LESSON_FLASHCARD_ALIASES[lessonId] ?? lessonId
  const cards = premadeFlashcards[key]
  if (!cards || cards.length === 0) return []
  const baseId = lessonId
  return cards.map((card, i) => ({
    ...card,
    id: `${baseId}-flash-${i + 1}`,
  }))
}

