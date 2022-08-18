export function customLoop(
  startWeek: number,
  endWeek: number,
  rangeNum: number,
  year: number
): string[] {
  const boundaryRange: string[] = [];
  for (let i = startWeek; i <= endWeek; i += rangeNum) {
    const currentNum: string = i < 10 ? `0${i}` : `${i}`;
    const result: string = `${year}-W${currentNum}`;
    boundaryRange.push(result);
  }
  return boundaryRange;
}
