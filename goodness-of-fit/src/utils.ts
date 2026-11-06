/** Approximate standard normal quantile Φ^{-1}(p) (Acklam). */
export function invNorm(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1,
    2.506628277459239,
  ];
  const b = [-5.447609879822406e1, 1.615858368580577e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968,
    2.938163982698783,
  ];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];

  const plow = 0.02425;
  const phigh = 1 - plow;
  let q: number;
  let r: number;

  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  if (p > phigh) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return (
      -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  q = p - 0.5;
  r = q * q;
  return (
    (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}

/** Standard normal CDF Φ(z). */
export function phi(z: number): number {
  if (!Number.isFinite(z)) return z > 0 ? 1 : 0;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const p =
    d *
    t *
    (0.319381530 +
      t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - p : p;
}

export function formatNum(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(digits);
}

export function formatPct(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return `${(100 * value).toFixed(digits)}%`;
}

/** Box–Muller normal sample. */
export function sampleNormal(mu: number, sigma: number, rng: () => number): number {
  const u1 = Math.max(1e-12, rng());
  const u2 = rng();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mu + sigma * z;
}

export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function logFactorial(n: number): number {
  if (n < 0) return NaN;
  let s = 0;
  for (let i = 2; i <= n; i += 1) s += Math.log(i);
  return s;
}

function logChoose(n: number, k: number): number {
  if (k < 0 || k > n) return -Infinity;
  return logFactorial(n) - logFactorial(k) - logFactorial(n - k);
}

/** Exact Bin(n, p) PMF. */
export function binomPmf(n: number, k: number, p: number): number {
  if (k < 0 || k > n) return 0;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  return Math.exp(logChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}

/** Exact P(W ≤ k) for W ∼ Bin(n, p). */
export function binomCdf(n: number, k: number, p: number): number {
  if (k < 0) return 0;
  if (k >= n) return 1;
  let s = 0;
  for (let i = 0; i <= k; i += 1) s += binomPmf(n, i, p);
  return s;
}

/** Exact P(lo ≤ W ≤ hi) for W ∼ Bin(n, p). */
export function binomRangeProb(n: number, lo: number, hi: number, p: number): number {
  const a = Math.max(0, Math.floor(lo));
  const b = Math.min(n, Math.floor(hi));
  if (b < a) return 0;
  let s = 0;
  for (let k = a; k <= b; k += 1) s += binomPmf(n, k, p);
  return s;
}

/**
 * Normal approx with half-unit (continuity) correction:
 * P(i ≤ W ≤ j−1) ≈ Φ((j−0.5−μ)/σ) − Φ((i−0.5−μ)/σ), μ=np, σ²=np(1−p).
 */
export function binomRangeNormalApprox(n: number, i: number, j: number, p: number): number {
  const mu = n * p;
  const sigma = Math.sqrt(n * p * (1 - p));
  if (!(sigma > 0)) return Number.NaN;
  const zHi = (j - 0.5 - mu) / sigma;
  const zLo = (i - 0.5 - mu) / sigma;
  return phi(zHi) - phi(zLo);
}
