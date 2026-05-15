export function generatePrices(min: number, max: number, step = 10): number[] {
  return Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => min + i * step
  );
}
