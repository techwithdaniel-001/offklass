/**
 * Generate a short, friendly lesson description from a lesson title.
 * Used so descriptions stay consistent and title-based across the curriculum.
 */
export function getDescriptionFromTitle(title: string): string {
  if (!title || !title.trim()) return 'Learn and practice this topic.'
  const t = title.trim()
  // "What is Place Value?" -> "Learn about place value."
  if (/^what is\s+/i.test(t)) {
    const topic = t.replace(/^what is\s+/i, '').replace(/\?$/, '').trim()
    return `Learn about ${topic.toLowerCase()}.`
  }
  // "Reading Big Numbers" -> "Learn about reading big numbers."
  if (/^(reading|writing|comparing|adding|subtracting|multiplying|dividing|finding|measuring|telling)/i.test(t)) {
    return `Learn about ${t.toLowerCase()}.`
  }
  // "Rounding Numbers" -> "Learn about rounding numbers."
  if (/^[A-Za-z].*[a-z]$/.test(t) && !t.endsWith('?')) {
    return `Learn about ${t.toLowerCase()}.`
  }
  // "What are Equivalent Fractions?" -> "Learn about equivalent fractions."
  if (/^what are\s+/i.test(t)) {
    const topic = t.replace(/^what are\s+/i, '').replace(/\?$/, '').trim()
    return `Learn about ${topic.toLowerCase()}.`
  }
  // Default: prefix with "Learn about" and lowercase
  const clean = t.replace(/\?$/g, '').trim()
  return `Learn about ${clean.toLowerCase()}.`
}
