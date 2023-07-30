export const replaceInMatrix = <T>(array: T[][], i: number, j: number, value: T) => {
  return [...array.slice(0, i), [...array[i].slice(0, j), value, ...array[i].slice(j + 1)], ...array.slice(i + 1)];
};
