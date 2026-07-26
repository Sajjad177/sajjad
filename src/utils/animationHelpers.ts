export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const easeInOutSine = (value: number) =>
  -(Math.cos(Math.PI * clamp(value, 0, 1)) - 1) / 2;
