export function isFutureDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.getTime() > Date.now();
}
