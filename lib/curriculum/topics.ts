// Topics shared across all grades
import { Topic } from './types'

export const topics: Topic[] = [
  {
    id: 'arithmetic',
    name: 'Arithmetic',
    description: 'Basic operations and number sense',
    icon: '➕',
    grades: ['3', '4', '5', '6'],
  },
  {
    id: 'fractions',
    name: 'Fractions & Decimals',
    description: 'Understanding and working with fractions and decimals',
    icon: '➗',
    grades: ['3', '4', '5', '6'],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Shapes, angles, area, and perimeter',
    icon: '🔺',
    grades: ['3', '4', '5', '6', '7', '8'],
  },
  {
    id: 'measurement',
    name: 'Measurement & Data',
    description: 'Units, time, graphs, and statistics',
    icon: '📏',
    grades: ['3', '4', '5', '6'],
  },
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Expressions, equations, and variables',
    icon: '📝',
    grades: ['6', '7', '8'],
  },
  {
    id: 'ratios',
    name: 'Ratios & Proportions',
    description: 'Understanding ratios, rates, and proportions',
    icon: '⚖️',
    grades: ['6', '7', '8'],
  },
  {
    id: 'number-theory',
    name: 'Number Theory',
    description: 'Factors, multiples, prime numbers',
    icon: '🔍',
    grades: ['4', '5', '6'],
  },
  {
    id: 'negative-numbers',
    name: 'Negative Numbers',
    description: 'Working with negative numbers and integers',
    icon: '➖',
    grades: ['6', '7', '8'],
  },
]

