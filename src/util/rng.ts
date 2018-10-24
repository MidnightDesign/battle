export type Rng = (min: number, max: number) => number;
export const rng: Rng = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomBool = (trueChance: number) => rng(0, 100) <= trueChance;
export const addVariance = (n: number, variance: number) => n * ((Math.random() * variance * 2) - variance + 1);
