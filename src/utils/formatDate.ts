/**
 * Formata uma data no formato `dd/mm/yyyy`.
 *
 * @param {Date} date - A data a ser formatada.
 * @returns {string} - A data formatada no padrão `dd/mm/yyyy - hh:mm:ss `.
 *
 * @example
 * // Exemplo de uso:
 * const date = new Date('2024-11-27');
 * const formattedDate = formatDate(date);
 * console.log(formattedDate); // '27/11/2024'
 */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year} - ${date.getHours()}:${date.getMinutes()}:${date.getUTCSeconds()}`;
}
