/**
 * Converts a date from "YYYY-MM-DD" format to "DD/MM/YYYY".
 *
 * @param {string} date - The date in "YYYY-MM-DD" format.
 * @returns {string} The formatted date in "DD/MM/YYYY".
 */
const formatDateNumeric = (date) => {
  if (!date) return 'N/D' 
  
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

/**
 * Converts a date from "YYYY-MM-DD" format to a long-form textual format in Portuguese.
 *
 * @param {string} date - The date in "YYYY-MM-DD" format.
 * @returns {string} The formatted date in "day month year" (e.g., "February 17, 2025").
 */
const formatDateTextual = (date) => {
  if (!date) return 'Data indisponível' 
  
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export { formatDateNumeric, formatDateTextual }
