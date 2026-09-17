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
  if (k < 0 || lambda < 0) return 0;
  if (lambda === 0) return k === 0 ? 1 : 0;
  // Direct e^{-λ} λ^k / k! underflows for large λ; use log-gamma style product from the mode.
  if (Math.exp(-lambda) === 0) {
    // Normal density approximation for a single point (rare in UI; CDF uses a better method).
    return normalPdf(k, lambda, Math.sqrt(lambda));
  }
  let term = Math.exp(-lambda);
  for (let i = 1; i <= k; i += 1) {
    term = (term * lambda) / i;
  }
  return term;
}

/**
 * P(X ≤ k) for X ~ Poisson(λ).
 * For moderate λ, sums recursive PMF terms. For large λ (e^{-λ} underflows in double
 * precision), uses a continuity-corrected normal approximation:
 * P(X ≤ k) ≈ Φ((k + 0.5 − λ) / √λ).
 */
export function poissonCdf(lambda: number, k: number): number {
  if (k < 0) return 0;
  if (lambda <= 0) return 1;
  const kInt = Math.floor(k);

  if (Math.exp(-lambda) > 0) {
    let term = Math.exp(-lambda);
    let total = term;
    for (let i = 1; i <= kInt; i += 1) {
      term = (term * lambda) / i;
      total += term;
    }
    return Math.min(1, Math.max(0, total));
  }

  const z = (kInt + 0.5 - lambda) / Math.sqrt(lambda);
  return normalCdf(z);
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

/** Digamma ψ(x) = Γ'(x)/Γ(x). */
export function digamma(x: number): number {
  if (x <= 0) return Number.NaN;
  let value = x;
  let result = 0;
  while (value < 8) {
    result -= 1 / value;
    value += 1;
  }
  const inv = 1 / value;
  const inv2 = inv * inv;
  // Asymptotic expansion
  result += Math.log(value) - 0.5 * inv - inv2 / 12 + (inv2 * inv2) / 120 - (inv2 * inv2 * inv2) / 252;
  return result;
}

/** Trigamma ψ₁(x) = d/dx ψ(x). */
export function trigamma(x: number): number {
  if (x <= 0) return Number.NaN;
  let value = x;
  let result = 0;
  while (value < 8) {
    result += 1 / (value * value);
    value += 1;
  }
  const inv = 1 / value;
  const inv2 = inv * inv;
  result += inv + 0.5 * inv2 + inv2 * inv / 6 - (inv2 * inv2 * inv) / 30;
  return result;
}

/**
 * Sample from Gamma(shape α, rate β) with mean α/β (Marsaglia–Tsang for α≥1;
 * boost by U^{1/α} when α<1).
 */
export function sampleGamma(shape: number, rate: number, rng: () => number): number {
  if (shape <= 0 || rate <= 0) return Number.NaN;
  let alpha = shape;
  let boost = 1;
  if (alpha < 1) {
    boost = rng() ** (1 / alpha);
    alpha += 1;
  }
  const d = alpha - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x: number;
    let v: number;
    do {
      x = sampleNormal(0, 1, rng);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = rng();
    if (u < 1 - 0.0331 * (x * x) * (x * x)) {
      return (d * v * boost) / rate;
    }
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
      return (d * v * boost) / rate;
    }
  }
}

/** Sample Gamma with shape θ₁ and scale θ₂ (mean θ₁ θ₂). */
export function sampleGammaShapeScale(shape: number, scale: number, rng: () => number): number {
  return sampleGamma(shape, 1 / scale, rng);
}

export type GammaShapeScale = { shape: number; scale: number };

/** MoM for Gamma(shape θ₁, scale θ₂): θ̃₁ = X̄²/V, θ̃₂ = V/X̄. */
export function gammaMomShapeScale(data: number[]): GammaShapeScale {
  const n = data.length;
  const xbar = mean(data);
  const v = varianceN(data);
  if (n < 2 || !(xbar > 0) || !(v > 0)) {
    return { shape: Number.NaN, scale: Number.NaN };
  }
  return { shape: (xbar * xbar) / v, scale: v / xbar };
}

/**
 * Numerical MLE for Gamma(shape θ₁, scale θ₂).
 * Solves log(α)−ψ(α)=log(X̄)−mean(log X) then θ₂=X̄/α, θ₁=α.
 */
export function gammaMleShapeScale(data: number[]): GammaShapeScale {
  const n = data.length;
  if (n < 2) return { shape: Number.NaN, scale: Number.NaN };
  const xbar = mean(data);
  if (!(xbar > 0) || data.some((x) => !(x > 0))) {
    return { shape: Number.NaN, scale: Number.NaN };
  }
  const logMean = data.reduce((sum, x) => sum + Math.log(x), 0) / n;
  const target = Math.log(xbar) - logMean;
  const mom = gammaMomShapeScale(data);
  const starts = [mom.shape, mom.shape * 0.5, mom.shape * 1.5, Math.max(0.1, xbar), 1].filter(
    (s) => Number.isFinite(s) && s > 0,
  );

  let bestAlpha = mom.shape;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const start of starts) {
    const alpha = solveGammaMleShape(start, target);
    if (!(alpha > 0)) continue;
    const score = Math.abs(Math.log(alpha) - digamma(alpha) - target);
    if (score < bestScore) {
      bestScore = score;
      bestAlpha = alpha;
    }
  }
  return { shape: bestAlpha, scale: xbar / bestAlpha };
}

function solveGammaMleShape(startAlpha: number, target: number): number {
  let alpha = Math.max(0.01, startAlpha);
  for (let i = 0; i < 80; i += 1) {
    const f = Math.log(alpha) - digamma(alpha) - target;
    if (Math.abs(f) < 1e-10) break;
    const fPrime = 1 / alpha - trigamma(alpha);
    if (Math.abs(fPrime) < 1e-14) break;
    const next = alpha - f / fPrime;
    if (next > 0.001 && next < 1000) {
      alpha = next;
    } else {
      alpha = Math.min(1000, Math.max(0.001, alpha - 0.1 * (f / fPrime)));
    }
  }
  return alpha;
}

export function biasOf(estimates: number[], truth: number): number {
  return mean(estimates) - truth;
}

export function mseOf(estimates: number[], truth: number): number {
  if (estimates.length === 0) return 0;
  return estimates.reduce((sum, value) => sum + (value - truth) ** 2, 0) / estimates.length;
}
