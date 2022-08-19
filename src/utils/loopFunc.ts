export interface returnData {
  skip: number;
  theRange: string[];
}
export function customLoop(
  startWeek: number,
  endWeek: number,
  rangeNum: number,
  year: number
): returnData {
  const boundaryRange: string[] = [];
  let skip = 0;
  for (let i = startWeek; i <= endWeek; i += rangeNum) {
    const currentNum: string = i < 10 ? `0${i}` : `${i}`;
    const result = `${year}-W${currentNum}`;
    boundaryRange.push(result);
    //if all the weeks in a year, Check where the last loop stops to determine skip
    if (endWeek === 53 && i + rangeNum > 53) {
      skip = i + rangeNum - 53 - 1;
    }
  }
  return {
    skip,
    theRange: boundaryRange,
  };
}
