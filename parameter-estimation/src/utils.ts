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

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

/** Population variance (divide by n). */
export function varianceN(values: number[]): number {
  if (values.length === 0) return 0;
  const m = mean(values);
  return values.reduce((total, value) => total + (value - m) ** 2, 0) / values.length;
}

/** Sample variance (divide by n-1). */
export function varianceN1(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return values.reduce((total, value) => total + (value - m) ** 2, 0) / (values.length - 1);
}

export function normalPdf(x: number, mu = 0, sigma = 1): number {
  if (sigma <= 0) return 0;
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

export function normalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));
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

export function binomialCdf(n: number, p: number, k: number): number {
  let total = 0;
  for (let i = 0; i <= k; i += 1) total += binomialPmf(n, p, i);
  return total;
}

export function poissonPmf(lambda: number, k: number): number {
  if (k < 0) return 0;
  let term = Math.exp(-lambda);
  for (let i = 1; i <= k; i += 1) {
    term = (term * lambda) / i;
  }
  return term;
}

/** P(X ≤ k) for X ~ Poisson(λ). Uses recursive PMF terms. */
export function poissonCdf(lambda: number, k: number): number {
  if (k < 0) return 0;
  let term = Math.exp(-lambda);
  let total = term;
  for (let i = 1; i <= k; i += 1) {
    term = (term * lambda) / i;
    total += term;
  }
  return Math.min(1, total);
}

/** Sample from Poisson(λ) via Knuth for small λ, else normal approx. */
export function samplePoisson(lambda: number, rng: () => number): number {
  if (lambda <= 0) return 0;
  if (lambda < 30) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k += 1;
      p *= rng();
    } while (p > L);
    return k - 1;
  }
  const z = Math.sqrt(-2 * Math.log(Math.max(1e-12, rng()))) * Math.cos(2 * Math.PI * rng());
  return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * z));
}

export function sampleNormal(mu: number, sigma: number, rng: () => number): number {
  const u1 = Math.max(1e-12, rng());
  const u2 = rng();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mu + sigma * z;
}

export function sampleUniform(a: number, b: number, rng: () => number): number {
  return a + (b - a) * rng();
}
