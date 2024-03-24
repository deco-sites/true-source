// https://github.com/martinstark/throttle-ts/blob/main/src/index.ts
// deno-lint-ignore no-explicit-any
export const throttle = <R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number,
): [(...args: A) => R | undefined, () => void] => {
  let wait = false;
  let timeout: undefined | number;
  let cancelled = false;

  return [
    (...args: A) => {
      if (cancelled) return undefined;
      if (wait) return undefined;

      const val = fn(...args);

      wait = true;

      timeout = setTimeout(() => {
        wait = false;
      }, delay);

      return val;
    },
    () => {
      cancelled = true;
      clearTimeout(timeout);
    },
  ];
};
