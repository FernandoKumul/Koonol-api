export default function ParseQueryToNumber(query?: string, defaultValue: number = 10): number {
  if (!query) return defaultValue;
  const number = parseInt(query, 10);

  if (isNaN(number)) {
    return defaultValue;
  }

  return number <= 0 ? 1 : number;
}