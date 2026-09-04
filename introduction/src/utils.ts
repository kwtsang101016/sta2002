export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function shuffle<T>(items: T[], rng: () => number): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export function sampleIndices(n: number, k: number, rng: () => number): number[] {
  const pool = Array.from({ length: n }, (_, index) => index);
  const picked: number[] = [];
  for (let count = 0; count < k && pool.length > 0; count += 1) {
    const index = Math.floor(rng() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked.sort((a, b) => a - b);
}

/** Standard normal PDF; optional μ, σ for general normal. */
export function normalPdf(x: number, mu = 0, sigma = 1): number {
  if (sigma <= 0) return 0;
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

/** Standard normal CDF approximation (Abramowitz & Stegun). */
export function normalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));
  return 0.5 * (1 + sign * erf);
}

export function binomialPmf(n: number, p: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let coeff = 1;
  for (let i = 0; i < k; i += 1) {
    coeff = (coeff * (n - i)) / (i + 1);
  }
  return coeff * p ** k * (1 - p) ** (n - k);
}

export function poissonPmf(lambda: number, k: number): number {
  if (k < 0) return 0;
  let term = Math.exp(-lambda);
  for (let i = 1; i <= k; i += 1) {
    term = (term * lambda) / i;
  }
  return term;
}

export function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}
