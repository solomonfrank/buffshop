export const generateNumberRange = (start: number, end: number): string[] => {
  const numbers: string[] = [];

  for (let num = start; num <= end; num++) {
    numbers.push(num < 10 ? `0${num}` : num.toString()); // Add preceding 0 if number is less than 10
  }

  return numbers;
};
