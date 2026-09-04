import { useEffect, useMemo, useState } from "react";
import {
  COVID_SUMMARY,
  FACULTY_INFECTION_RATE,
  FACULTY_YEARLY_POSITIVES,
  POPULATION,
  RESIDENCE,
  filterByResidence,
  loadCovidRows,
  type CovidRow,
} from "../../covidData";
import {
  binomialCdf,
  binomialPmf,
  createRng,
  mean,
  poissonCdf,
  sampleNormal,
  samplePoisson,
  sampleUniform,
  varianceN,
  varianceN1,
} from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, SceneFrame } from "../scenes/shared";

/* ── COVID EDA explorer ── */
export function CovidEdaGame() {
  const print = usePrintMode();
  const [rows, setRows] = useState<CovidRow[] | null>(null);
  const [error, setError] = useState("");
  const [group, setGroup] = useState<"facultyStaff" | "nonResidentialStudents" | "residentialStudents">(
    "facultyStaff",
  );

  useEffect(() => {
    let cancelled = false;
    loadCovidRows()
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load CSV");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const residence = RESIDENCE[group];
  const summary = COVID_SUMMARY[group];
  const subset = useMemo(() => (rows ? filterByResidence(rows, residence) : []), [rows, residence]);
  const positives = useMemo(() => subset.map((row) => row.positive), [subset]);

  const hist = useMemo(() => {
    const binCount = 12;
    const maxVal = Math.max(...positives, 1);
    const width = maxVal / binCount;
    const counts = Array(binCount).fill(0);
    for (const value of positives) {
      const idx = Math.min(binCount - 1, Math.floor(value / width));
      counts[idx] += 1;
    }
    const maxCount = Math.max(...counts, 1);
    return { counts, binCount, maxVal, maxCount, width };
  }, [positives]);

  return (
    <SceneFrame kicker="Game" title="COVID EDA: daily positives" tone="gold">
      <p className={styles.lead}>
        Explore <code>UM_C19_2021.csv</code> — daily positive counts by campus group.
      </p>
      {!print ? (
        <div className={styles.tools}>
          {(
            [
              ["facultyStaff", "Faculty/Staff"],
              ["nonResidentialStudents", "Off-campus students"],
              ["residentialStudents", "Residential students"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              className={group === key ? styles.primary : styles.toolBtn}
              type="button"
              onClick={() => setGroup(key)}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        <p className={styles.small}>Group: {summary.label}</p>
      )}
      {error ? <p className={styles.note}>{error}</p> : null}
      {!rows && !error ? <p className={styles.muted}>Loading CSV…</p> : null}
      {rows ? (
        <>
          <div className={styles.twoCol}>
            <div className={styles.card}>
              <p className={styles.kicker}>SUMMARY</p>
              <p>
                Days: <strong>{subset.length}</strong>
              </p>
              <p>
                Sum of positives: <strong>{summary.positiveSum}</strong>
              </p>
              <p>
                Mean / day: <strong>{mean(positives).toFixed(3)}</strong>
              </p>
              <p>
                Max / day: <strong>{Math.max(...positives, 0)}</strong>
              </p>
              <p className={styles.muted}>
                Population ≈ {summary.population.toLocaleString()}; rate scale Positive / pop.
              </p>
            </div>
            <figure className={styles.chartCard}>
              <svg viewBox="0 0 400 180" role="img" aria-label="Histogram of daily positives">
                {hist.counts.map((count, i) => {
                  const barW = 350 / hist.binCount;
                  const h = (count / hist.maxCount) * 120;
                  return (
                    <rect
                      key={i}
                      x={30 + i * barW + 1}
                      y={140 - h}
                      width={Math.max(1, barW - 2)}
                      height={h}
                      fill="var(--blue)"
                      stroke="var(--ink)"
                      strokeWidth="0.5"
                    />
                  );
                })}
                <line x1={30} y1={140} x2={380} y2={140} stroke="var(--ink)" strokeWidth="2" />
                <text x={30} y={158} fontSize="9" fill="var(--ink)">
                  0
                </text>
                <text x={380} y={158} textAnchor="end" fontSize="9" fill="var(--ink)">
                  {hist.maxVal}
                </text>
                <text x={35} y={24} fontSize="9" fill="var(--blue)">
                  Daily positives
                </text>
              </svg>
            </figure>
          </div>
          <p className={styles.note}>
            Positives are right-skewed. Faculty/staff yearly total {FACULTY_YEARLY_POSITIVES} feeds the Poisson
            prediction on the next game.
          </p>
        </>
      ) : null}
    </SceneFrame>
  );
}

/* ── COVID prediction calculator ── */
export function CovidPredictionGame() {
  const print = usePrintMode();
  const [mu, setMu] = useState<number>(FACULTY_YEARLY_POSITIVES);
  const [n, setN] = useState(20);
  const pHat = FACULTY_INFECTION_RATE;
  const p = mu / POPULATION.facultyStaff;

  const poisLe800 = poissonCdf(mu, 800);
  const binom0 = binomialPmf(n, p, 0);
  const binomGe2 = 1 - binomialCdf(n, p, 1);

  return (
    <SceneFrame kicker="Game" title="COVID prediction calculator" tone="gold">
      <p className={styles.lead}>
        Faculty/Staff yearly positives from the CSV: <InlineMath tex={`\\mu=${FACULTY_YEARLY_POSITIVES}`} />. Model
        next year as Poisson; department size as Binomial.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            Poisson μ (yearly total)
            <input
              type="range"
              min={400}
              max={1200}
              step={1}
              value={mu}
              onChange={(event) => setMu(Number(event.target.value))}
            />{" "}
            {mu}
          </label>
          <label className={styles.small}>
            Binomial n (department size)
            <input
              type="range"
              min={5}
              max={40}
              step={1}
              value={n}
              onChange={(event) => setN(Number(event.target.value))}
            />{" "}
            {n}
          </label>
        </div>
      ) : null}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>POISSON(μ)</p>
          <p>
            <InlineMath tex={`P(X\\le 800)=${poisLe800.toFixed(4)}`} />
          </p>
          <p>
            <InlineMath tex={`P(X>800)=${(1 - poisLe800).toFixed(4)}`} />
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>BIN(n, p̂)</p>
          <p>
            <InlineMath tex={`\\hat p=${p.toFixed(5)}`} /> (default CSV: {pHat.toFixed(5)})
          </p>
          <p>
            <InlineMath tex={`P(Y=0)=${binom0.toFixed(4)}`} />
          </p>
          <p>
            <InlineMath tex={`P(Y\\ge 2)=${binomGe2.toFixed(4)}`} />
          </p>
        </div>
      </div>
    </SceneFrame>
  );
}

/* ── Bernoulli log-likelihood explorer ── */
export function BernoulliLikelihoodGame() {
  const print = usePrintMode();
  const [heads, setHeads] = useState(7);
  const n = 10;
  const pHat = heads / n;

  const curve = useMemo(() => {
    const points: { p: number; y: number }[] = [];
    for (let i = 0; i <= 100; i += 1) {
      const p = i / 100;
      const ell =
        p <= 0 || p >= 1 ? -Infinity : heads * Math.log(p) + (n - heads) * Math.log(1 - p);
      points.push({ p, y: Number.isFinite(ell) ? ell : -40 });
    }
    const finite = points.filter((pt) => Number.isFinite(pt.y));
    const minY = Math.min(...finite.map((pt) => pt.y));
    const maxY = Math.max(...finite.map((pt) => pt.y));
    const path = points
      .map((pt, i) => {
        const sx = 30 + pt.p * 350;
        const sy = 140 - ((pt.y - minY) / Math.max(1e-6, maxY - minY)) * 120;
        return `${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`;
      })
      .join(" ");
    const mleX = 30 + pHat * 350;
    return { path, mleX };
  }, [heads, n, pHat]);

  return (
    <SceneFrame kicker="Game" title="Bernoulli log-likelihood" tone="gold">
      <p className={styles.lead}>
        <InlineMath tex={`n=${n}`} /> Bernoulli trials, <InlineMath tex={`s=${heads}`} /> successes. Plot{" "}
        <InlineMath tex={String.raw`\ell(p)`} /> and mark <InlineMath tex={String.raw`\hat p=\bar x`} />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            Number of successes
            <input
              type="range"
              min={0}
              max={n}
              value={heads}
              onChange={(event) => setHeads(Number(event.target.value))}
            />{" "}
            {heads}
          </label>
        </div>
      ) : null}
      <figure className={styles.chartCard}>
        <svg viewBox="0 0 400 180" role="img" aria-label="Log-likelihood curve">
          <path d={curve.path} fill="none" stroke="var(--blue)" strokeWidth="2.5" />
          <line x1={curve.mleX} y1={20} x2={curve.mleX} y2={140} stroke="var(--red)" strokeWidth="2" strokeDasharray="4 3" />
          <line x1={30} y1={140} x2={380} y2={140} stroke="var(--ink)" strokeWidth="2" />
          <text x={30} y={158} fontSize="9" fill="var(--ink)">
            0
          </text>
          <text x={380} y={158} textAnchor="end" fontSize="9" fill="var(--ink)">
            1
          </text>
          <text x={curve.mleX} y={16} textAnchor="middle" fontSize="9" fill="var(--red)">
            p̂={pHat.toFixed(2)}
          </text>
        </svg>
      </figure>
      <Formula tex={`\\hat p=s/n=${pHat.toFixed(2)}`} />
    </SceneFrame>
  );
}

/* ── Variance bias demo ── */
export function VarianceBiasGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(1);
  const n = 10;
  const trueVar = 4;
  const reps = 400;
  const rng = useMemo(() => createRng(seed), [seed]);

  const result = useMemo(() => {
    const mle: number[] = [];
    const unbiased: number[] = [];
    for (let r = 0; r < reps; r += 1) {
      const sample = Array.from({ length: n }, () => sampleNormal(0, Math.sqrt(trueVar), rng));
      mle.push(varianceN(sample));
      unbiased.push(varianceN1(sample));
    }
    return {
      meanMle: mean(mle),
      meanUnb: mean(unbiased),
      mle,
      unbiased,
    };
  }, [rng, n, reps, trueVar]);

  const hist = (values: number[]) => {
    const lo = 0;
    const hi = 12;
    const bins = 16;
    const width = (hi - lo) / bins;
    const counts = Array(bins).fill(0);
    for (const value of values) {
      if (value < lo || value > hi) continue;
      counts[Math.min(bins - 1, Math.floor((value - lo) / width))] += 1;
    }
    return { counts, bins, lo, hi, max: Math.max(...counts, 1) };
  };
  const hMle = hist(result.mle);
  const hUnb = hist(result.unbiased);

  return (
    <SceneFrame kicker="Game" title="Bias of variance MLE" tone="gold">
      <p className={styles.lead}>
        Draw {reps} samples of size <InlineMath tex={`n=${n}`} /> from <InlineMath tex={`N(0,${trueVar})`} />.
        Compare <InlineMath tex={String.raw`\hat\theta_2`} /> (divide by <InlineMath tex="n" />) vs{" "}
        <InlineMath tex={String.raw`S^2`} /> (divide by <InlineMath tex="n-1" />).
      </p>
      {!print ? (
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={() => setSeed((s) => s + 1)}>
            RESAMPLE
          </button>
        </div>
      ) : null}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>MLE (÷ n)</p>
          <p>
            Mean estimate: <strong>{result.meanMle.toFixed(3)}</strong>
          </p>
          <p className={styles.muted}>
            Target {(trueVar * (n - 1)) / n} = ((n−1)/n)σ²
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>UNBIASED S²</p>
          <p>
            Mean estimate: <strong>{result.meanUnb.toFixed(3)}</strong>
          </p>
          <p className={styles.muted}>Target {trueVar}</p>
        </div>
      </div>
      <figure className={styles.chartCard} style={{ marginTop: 12 }}>
        <svg viewBox="0 0 400 160" role="img" aria-label="Sampling distributions of variance estimators">
          {hMle.counts.map((count, i) => {
            const barW = 160 / hMle.bins;
            const h = (count / hMle.max) * 100;
            return (
              <rect
                key={`m-${i}`}
                x={20 + i * barW}
                y={120 - h}
                width={Math.max(1, barW - 1)}
                height={h}
                fill="var(--red)"
                opacity="0.75"
              />
            );
          })}
          {hUnb.counts.map((count, i) => {
            const barW = 160 / hUnb.bins;
            const h = (count / hUnb.max) * 100;
            return (
              <rect
                key={`u-${i}`}
                x={220 + i * barW}
                y={120 - h}
                width={Math.max(1, barW - 1)}
                height={h}
                fill="var(--blue)"
                opacity="0.75"
              />
            );
          })}
          <text x={90} y={145} textAnchor="middle" fontSize="9" fill="var(--red)">
            MLE
          </text>
          <text x={290} y={145} textAnchor="middle" fontSize="9" fill="var(--blue)">
            S²
          </text>
        </svg>
      </figure>
    </SceneFrame>
  );
}

/* ── Poisson MoM comparison ── */
export function PoissonMomGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(3);
  const lambda = 5;
  const n = 20;
  const reps = 500;
  const rng = useMemo(() => createRng(seed), [seed]);

  const { meanBased, varBased } = useMemo(() => {
    const a: number[] = [];
    const b: number[] = [];
    for (let r = 0; r < reps; r += 1) {
      const sample = Array.from({ length: n }, () => samplePoisson(lambda, rng));
      a.push(mean(sample));
      b.push(varianceN(sample));
    }
    return { meanBased: a, varBased: b };
  }, [rng, lambda, n, reps]);

  const hist = (values: number[], lo: number, hi: number) => {
    const bins = 18;
    const width = (hi - lo) / bins;
    const counts = Array(bins).fill(0);
    for (const value of values) {
      if (value < lo || value > hi) continue;
      counts[Math.min(bins - 1, Math.floor((value - lo) / width))] += 1;
    }
    return { counts, bins, max: Math.max(...counts, 1) };
  };
  const h1 = hist(meanBased, 2, 9);
  const h2 = hist(varBased, 0, 14);

  return (
    <SceneFrame kicker="Game" title="Poisson MoM: mean vs variance" tone="gold">
      <p className={styles.lead}>
        Simulate {reps} samples of size <InlineMath tex={`n=${n}`} /> from{" "}
        <InlineMath tex={`\\mathrm{Poisson}(${lambda})`} />. Compare{" "}
        <InlineMath tex={String.raw`\tilde\lambda_1=\bar X`} /> and{" "}
        <InlineMath tex={String.raw`\tilde\lambda_2`} /> = sample variance.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={() => setSeed((s) => s + 1)}>
            RESIMULATE
          </button>
        </div>
      ) : null}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>MEAN-BASED</p>
          <p>
            Avg: <strong>{mean(meanBased).toFixed(3)}</strong>
          </p>
          <p>
            SD: <strong>{Math.sqrt(varianceN1(meanBased)).toFixed(3)}</strong>
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>VARIANCE-BASED</p>
          <p>
            Avg: <strong>{mean(varBased).toFixed(3)}</strong>
          </p>
          <p>
            SD: <strong>{Math.sqrt(varianceN1(varBased)).toFixed(3)}</strong>
          </p>
        </div>
      </div>
      <figure className={styles.chartCard} style={{ marginTop: 12 }}>
        <svg viewBox="0 0 400 160" role="img" aria-label="MoM estimator histograms">
          {h1.counts.map((count, i) => {
            const barW = 160 / h1.bins;
            const h = (count / h1.max) * 100;
            return (
              <rect key={`a-${i}`} x={20 + i * barW} y={120 - h} width={Math.max(1, barW - 1)} height={h} fill="var(--blue)" />
            );
          })}
          {h2.counts.map((count, i) => {
            const barW = 160 / h2.bins;
            const h = (count / h2.max) * 100;
            return (
              <rect key={`b-${i}`} x={220 + i * barW} y={120 - h} width={Math.max(1, barW - 1)} height={h} fill="var(--red)" />
            );
          })}
          <text x={90} y={145} textAnchor="middle" fontSize="9" fill="var(--blue)">
            λ̃₁ = X̄
          </text>
          <text x={290} y={145} textAnchor="middle" fontSize="9" fill="var(--red)">
            λ̃₂ = V
          </text>
        </svg>
      </figure>
      <p className={styles.note}>Prefer lowest-order moments: the mean-based estimator is more stable.</p>
    </SceneFrame>
  );
}

/* ── Uniform MLE vs MoM ── */
export function UniformMomGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(5);
  const theta = 5;
  const n = 8;
  const rng = useMemo(() => createRng(seed), [seed]);
  const sample = useMemo(
    () => Array.from({ length: n }, () => sampleUniform(0, theta, rng)),
    [rng, n, theta],
  );
  const xBar = mean(sample);
  const xMax = Math.max(...sample);
  const mle = xMax;
  const mom = 2 * xBar;
  const invalid = mom < xMax;

  return (
    <SceneFrame kicker="Game" title="Uniform(0, θ): MLE vs MoM" tone="gold">
      <p className={styles.lead}>
        Sample <InlineMath tex={`n=${n}`} /> from <InlineMath tex={`\\mathrm{Uniform}(0,${theta})`} />. Compare{" "}
        <InlineMath tex={String.raw`\hat\theta=X_{(n)}`} /> and <InlineMath tex={String.raw`\tilde\theta=2\bar X`} />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={() => setSeed((s) => s + 1)}>
            NEW SAMPLE
          </button>
        </div>
      ) : null}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>MLE</p>
          <p>
            <InlineMath tex={`X_{(n)}=${mle.toFixed(3)}`} />
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>MoM</p>
          <p>
            <InlineMath tex={`2\\bar X=${mom.toFixed(3)}`} />
          </p>
          {invalid ? (
            <p className={styles.note}>Invalid: MoM &lt; max observation</p>
          ) : (
            <p className={styles.muted}>Valid on this draw</p>
          )}
        </div>
      </div>
      <p className={styles.small}>
        Sample: {sample.map((x) => x.toFixed(2)).join(", ")}
      </p>
    </SceneFrame>
  );
}
