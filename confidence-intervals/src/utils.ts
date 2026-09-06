export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Sample variance (divide by n-1). */
export function varianceN1(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return values.reduce((total, value) => total + (value - m) ** 2, 0) / (values.length - 1);
}

export function sampleNormal(mu: number, sigma: number, rng: () => number): number {
  const u1 = Math.max(1e-12, rng());
  const u2 = rng();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mu + sigma * z;
}

/** Marsaglia–Tsang gamma sampler (shape k > 0, scale θ). */
export function sampleGamma(shape: number, scale: number, rng: () => number): number {
  if (shape <= 0 || scale <= 0) return 0;
  if (shape < 1) {
    const boost = sampleGamma(shape + 1, scale, rng);
    return boost * Math.pow(Math.max(rng(), 1e-12), 1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x = 0;
    let v = 0;
    do {
      x = sampleNormal(0, 1, rng);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = rng();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v * scale;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v * scale;
  }
}

/**
 * Draw from a distribution with given mean, SD, and skewness.
 * Uses N(μ,σ²) when |skew| is tiny; otherwise a shifted/reflected Gamma
 * (skewness γ = ±2/√k).
 */
export function sampleMeanSdSkew(mu: number, sigma: number, skew: number, rng: () => number): number {
  if (sigma <= 0) return mu;
  if (Math.abs(skew) < 0.12) return sampleNormal(mu, sigma, rng);
  const sign = skew > 0 ? 1 : -1;
  const gamma = Math.abs(skew);
  const k = 4 / (gamma * gamma);
  const theta = sigma / Math.sqrt(k);
  const m = k * theta;
  const g = sampleGamma(k, theta, rng);
  return mu + sign * (g - m);
}

export function sampleBernoulli(p: number, rng: () => number): number {
  return rng() < p ? 1 : 0;
}

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

export function zCrit(alpha: number): number {
  return invNorm(1 - alpha / 2);
}

/** Rough Student-t upper quantile via Hill approximation (good enough for demos). */
export function tCrit(alphaTwoSided: number, df: number): number {
  if (df <= 0) return zCrit(alphaTwoSided);
  if (df > 250) return zCrit(alphaTwoSided);
  const z = zCrit(alphaTwoSided);
  const g1 = (z * z * z + z) / 4;
  const g2 = (5 * z ** 5 + 16 * z ** 3 + 3 * z) / 96;
  const g3 = (3 * z ** 7 + 19 * z ** 5 + 17 * z ** 3 - 15 * z) / 384;
  const g4 = (79 * z ** 9 + 776 * z ** 7 + 1482 * z ** 5 - 1920 * z ** 3 - 945 * z) / 92160;
  const inv = 1 / df;
  return z + g1 * inv + g2 * inv ** 2 + g3 * inv ** 3 + g4 * inv ** 4;
}

export function formatNum(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(digits);
}
