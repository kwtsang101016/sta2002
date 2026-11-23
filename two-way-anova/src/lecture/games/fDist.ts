/**
 * F-distribution upper-tail probability via the regularized incomplete beta
 * function (continued fraction) and a log-gamma approximation.
 * Ported from the Fall 2025 anova_webapp.html.
 */

const TINY = 1e-30;
const GAMMA_COEFFICIENTS = [
  676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
];
const STIRLING_COEFFICIENTS = [
  76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2,
  -0.5395239384953e-5,
];

/** Lanczos approximation of Γ(z), with reflection for z < 0.5. */
function gamma(z: number): number {
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  const shifted = z - 1;
  let x = 0.99999999999980993;
  GAMMA_COEFFICIENTS.forEach((coefficient, i) => {
    x += coefficient / (shifted + i + 1);
  });
  const t = shifted + GAMMA_COEFFICIENTS.length - 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, shifted + 0.5) * Math.exp(-t) * x;
}

/** ln Γ(z): Lanczos for small z, Stirling-type series otherwise. */
function logGamma(z: number): number {
  if (z < 12) {
    return Math.log(Math.abs(gamma(z)));
  }
  let series = 1.000000000190015;
  let y = z;
  let tmp = z + 5.5;
  tmp -= (z + 0.5) * Math.log(tmp);
  for (const coefficient of STIRLING_COEFFICIENTS) {
    y += 1;
    series += coefficient / y;
  }
  return -tmp + Math.log((2.5066282746310005 * series) / z);
}

function clampAwayFromZero(value: number): number {
  return Math.abs(value) < TINY ? TINY : value;
}

/** Continued fraction for the incomplete beta function (modified Lentz). */
function betaCF(x: number, a: number, b: number): number {
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 / clampAwayFromZero(1 - (qab * x) / qap);
  let h = d;

  for (let m = 1; m <= 100; m += 1) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 / clampAwayFromZero(1 + aa * d);
    c = clampAwayFromZero(1 + aa / c);
    h *= d * c;

    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 / clampAwayFromZero(1 + aa * d);
    c = clampAwayFromZero(1 + aa / c);
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 3e-7) {
      break;
    }
  }
  return h;
}

/** Regularized incomplete beta function I_x(a, b). */
function incompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  const bt = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x),
  );
  if (x < (a + 1) / (a + b + 2)) {
    return (bt * betaCF(x, a, b)) / a;
  }
  return 1 - (bt * betaCF(1 - x, b, a)) / b;
}

/** P(F > f) for F ~ F(df1, df2). */
export function fPValue(f: number, df1: number, df2: number): number {
  if (Number.isNaN(f) || f <= 0) return 1;
  if (!Number.isFinite(f)) return 0;

  // F = (df2/df1)·X/(1−X) with X ~ Beta(df1/2, df2/2); P(F > f) = 1 − I_x(df1/2, df2/2).
  const x = (df1 * f) / (df1 * f + df2);
  // Use the symmetric form I_{1−x}(df2/2, df1/2) to avoid cancellation for tiny tails.
  const upperTail = incompleteBeta(1 - x, df2 / 2, df1 / 2);
  return Math.min(1, Math.max(0, upperTail));
}
