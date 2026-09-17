import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  biasOf,
  binomialCdf,
  binomialPmf,
  createRng,
  gammaMleShapeScale,
  gammaMomShapeScale,
  mean,
  mseOf,
  poissonCdf,
  sampleGammaShapeScale,
  sampleNormal,
  samplePoisson,
  sampleUniform,
  varianceN,
  varianceN1,
} from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Block, Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

/* ── Boxplot whisker builder ── */
type BoxSummary = {
  sorted: number[];
  q1: number;
  median: number;
  q3: number;
  iqr: number;
  innerLow: number;
  innerHigh: number;
  outerLow: number;
  outerHigh: number;
  whiskerLow: number;
  whiskerHigh: number;
  outliers: number[];
};

/** Hogg sample 100p-th percentile: (n+1)p-th order statistic with linear interpolation.
 *  Extreme p: below 1/(n+1) → min; above n/(n+1) → max. */
function samplePercentile(sorted: number[], p: number): number {
  const n = sorted.length;
  if (n === 0) return NaN;
  if (p < 1 / (n + 1)) return sorted[0];
  if (p > n / (n + 1)) return sorted[n - 1];
  const x = (n + 1) * p;
  const r = Math.floor(x + 1e-12); // integer part (1-based index when x is integer)
  const f = x - r; // fractional part
  if (f < 1e-12) {
    return sorted[r - 1];
  }
  return (1 - f) * sorted[r - 1] + f * sorted[r];
}

/** Quartiles via Hogg percentiles: Q1 = 25th, median = 50th, Q3 = 75th. */
function hoggBoxSummary(data: number[]): BoxSummary {
  const sorted = [...data].sort((a, b) => a - b);
  const q1 = samplePercentile(sorted, 0.25);
  const median = samplePercentile(sorted, 0.5);
  const q3 = samplePercentile(sorted, 0.75);
  const iqr = q3 - q1;
  const innerLow = q1 - 1.5 * iqr;
  const innerHigh = q3 + 1.5 * iqr;
  const outerLow = q1 - 3 * iqr;
  const outerHigh = q3 + 3 * iqr;
  const inside = sorted.filter((value) => value >= innerLow && value <= innerHigh);
  const whiskerLow = Math.min(...inside);
  const whiskerHigh = Math.max(...inside);
  const outliers = sorted.filter((value) => value < innerLow || value > innerHigh);
  return {
    sorted,
    q1,
    median,
    q3,
    iqr,
    innerLow,
    innerHigh,
    outerLow,
    outerHigh,
    whiskerLow,
    whiskerHigh,
    outliers,
  };
}

function formatNum(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

const BOX_EXAMPLES: { label: string; data: number[] }[] = [
  { label: "Exam scores with one high outlier", data: [62, 68, 70, 72, 74, 76, 78, 95] },
  { label: "Wait times with a late arrival", data: [2, 3, 4, 5, 5, 6, 7, 8, 20] },
  { label: "No outliers — whiskers reach min and max", data: [10, 12, 13, 14, 15, 16, 18] },
  { label: "Two mild outliers on the right", data: [1, 2, 3, 4, 5, 6, 7, 12, 14] },
];

function BoxplotSvg({ summary }: { summary: BoxSummary }) {
  const values = [...summary.sorted, summary.innerLow, summary.innerHigh];
  const minX = Math.min(...values) - 1;
  const maxX = Math.max(...values) + 1;
  const pad = 28;
  const width = 520;
  const height = 150;
  const y = 70;
  const scale = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - 2 * pad);
  const boxLeft = scale(summary.q1);
  const boxRight = scale(summary.q3);
  const medX = scale(summary.median);
  const wLow = scale(summary.whiskerLow);
  const wHigh = scale(summary.whiskerHigh);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Constructed boxplot" className={styles.chartCard} style={{ width: "100%" }}>
      <line x1={pad} y1={y} x2={width - pad} y2={y} stroke="var(--ink)" strokeWidth="2" />
      <line x1={scale(summary.innerLow)} y1={y - 34} x2={scale(summary.innerLow)} y2={y + 34} stroke="var(--red)" strokeWidth="2" strokeDasharray="4 3" />
      <line x1={scale(summary.innerHigh)} y1={y - 34} x2={scale(summary.innerHigh)} y2={y + 34} stroke="var(--red)" strokeWidth="2" strokeDasharray="4 3" />
      <line x1={wLow} y1={y} x2={boxLeft} y2={y} stroke="var(--ink)" strokeWidth="3" />
      <line x1={boxRight} y1={y} x2={wHigh} y2={y} stroke="var(--ink)" strokeWidth="3" />
      <line x1={wLow} y1={y - 14} x2={wLow} y2={y + 14} stroke="var(--ink)" strokeWidth="3" />
      <line x1={wHigh} y1={y - 14} x2={wHigh} y2={y + 14} stroke="var(--ink)" strokeWidth="3" />
      <rect x={boxLeft} y={y - 22} width={Math.max(2, boxRight - boxLeft)} height={44} fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
      <line x1={medX} y1={y - 22} x2={medX} y2={y + 22} stroke="var(--red)" strokeWidth="4" />
      {summary.outliers.map((value, index) => (
        <circle key={`${value}-${index}`} cx={scale(value)} cy={y} r={5} fill="var(--red)" stroke="var(--ink)" />
      ))}
      <text x={scale(summary.innerLow)} y={18} textAnchor="middle" fontSize="10" fill="var(--red)">
        inner fence
      </text>
      <text x={scale(summary.innerHigh)} y={18} textAnchor="middle" fontSize="10" fill="var(--red)">
        inner fence
      </text>
      <text x={wLow} y={height - 12} textAnchor="middle" fontSize="11" fill="var(--ink)">
        {formatNum(summary.whiskerLow)}
      </text>
      <text x={wHigh} y={height - 12} textAnchor="middle" fontSize="11" fill="var(--ink)">
        {formatNum(summary.whiskerHigh)}
      </text>
    </svg>
  );
}

function NumberLine({
  summary,
  highlight,
}: {
  summary: BoxSummary;
  highlight?: { low?: boolean; high?: boolean };
}) {
  const minX = Math.min(...summary.sorted, summary.innerLow) - 1;
  const maxX = Math.max(...summary.sorted, summary.innerHigh) + 1;
  const pad = 24;
  const width = 520;
  const height = 110;
  const y = 55;
  const scale = (value: number) => pad + ((value - minX) / (maxX - minX)) * (width - 2 * pad);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Data on a number line" style={{ width: "100%", background: "var(--white)", border: "3px solid var(--ink)" }}>
      <line x1={pad} y1={y} x2={width - pad} y2={y} stroke="var(--ink)" strokeWidth="2" />
      <line x1={scale(summary.innerLow)} y1={y - 28} x2={scale(summary.innerLow)} y2={y + 28} stroke="var(--red)" strokeWidth="2" strokeDasharray="4 3" />
      <line x1={scale(summary.innerHigh)} y1={y - 28} x2={scale(summary.innerHigh)} y2={y + 28} stroke="var(--red)" strokeWidth="2" strokeDasharray="4 3" />
      <rect
        x={scale(summary.q1)}
        y={y - 16}
        width={Math.max(2, scale(summary.q3) - scale(summary.q1))}
        height={32}
        fill="rgba(79, 70, 229, 0.12)"
        stroke="var(--blue)"
        strokeWidth="2"
      />
      {summary.sorted.map((value, index) => {
        const outside = value < summary.innerLow || value > summary.innerHigh;
        const isLow = highlight?.low && value === summary.whiskerLow;
        const isHigh = highlight?.high && value === summary.whiskerHigh;
        return (
          <g key={`${value}-${index}`}>
            <circle
              cx={scale(value)}
              cy={y}
              r={isLow || isHigh ? 8 : 6}
              fill={outside ? "var(--red)" : isLow || isHigh ? "var(--blue)" : "var(--cream)"}
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <text x={scale(value)} y={y + 28} textAnchor="middle" fontSize="10" fill="var(--ink)">
              {formatNum(value)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BoxplotWhiskerGame() {
  const print = usePrintMode();
  const [exampleIndex, setExampleIndex] = useState(0);
  const [step, setStep] = useState<"upper" | "lower" | "done">("upper");
  const [feedback, setFeedback] = useState<ReactNode>("");
  const [awaitingRetry, setAwaitingRetry] = useState(false);
  const example = BOX_EXAMPLES[exampleIndex % BOX_EXAMPLES.length];
  const summary = useMemo(() => hoggBoxSummary(example.data), [example]);

  const resetExample = (nextIndex: number) => {
    setExampleIndex(nextIndex);
    setStep("upper");
    setFeedback("");
    setAwaitingRetry(false);
  };

  const choose = (value: number) => {
    if (awaitingRetry || step === "done") return;
    const target = step === "upper" ? summary.whiskerHigh : summary.whiskerLow;
    const ok = value === target;
    if (ok) {
      setFeedback(
        step === "upper" ? (
          <>
            Correct — the upper whisker ends at <strong>{formatNum(value)}</strong>, the largest data point still ≤ the
            upper inner fence ({formatNum(summary.innerHigh)}).
          </>
        ) : (
          <>
            Correct — the lower whisker ends at <strong>{formatNum(value)}</strong>, the smallest data point still ≥ the
            lower inner fence ({formatNum(summary.innerLow)}).
          </>
        ),
      );
      window.setTimeout(() => {
        setFeedback("");
        setStep((current) => (current === "upper" ? "lower" : "done"));
      }, 1100);
    } else {
      const outside = value < summary.innerLow || value > summary.innerHigh;
      setAwaitingRetry(true);
      setFeedback(
        outside ? (
          <>
            Not a whisker end. <strong>{formatNum(value)}</strong> lies outside the inner fence
            [{formatNum(summary.innerLow)}, {formatNum(summary.innerHigh)}], so it is plotted as an outlier (a dot), not
            a whisker tip.
          </>
        ) : (
          <>
            Close, but whiskers stop at the <em>most extreme</em> points still inside the fences.{" "}
            <strong>{formatNum(value)}</strong> is inside, yet there is a more extreme in-fence point for this side.
          </>
        ),
      );
    }
  };

  if (print) {
    const demo = hoggBoxSummary(BOX_EXAMPLES[0].data);
    return (
      <SceneFrame kicker="Game" title="Build the whiskers" tone="gold">
        <p className={styles.lead}>
          Example data: {BOX_EXAMPLES[0].data.join(", ")}. Inner fences at {formatNum(demo.innerLow)} and{" "}
          {formatNum(demo.innerHigh)}. Whiskers end at {formatNum(demo.whiskerLow)} and {formatNum(demo.whiskerHigh)};
          outliers: {demo.outliers.length ? demo.outliers.join(", ") : "none"}.
        </p>
        <BoxplotSvg summary={demo} />
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Build the whiskers" tone="gold">
      <p className={styles.lead}>
        Rule to practice: <strong>whiskers reach the most extreme data points still inside the inner fences</strong>{" "}
        (Q1 − 1.5·IQR and Q3 + 1.5·IQR). Here Q1 / median / Q3 are the sample 25th / 50th / 75th percentiles (Hogg’s{" "}
        <MathText text={String.raw`$(n+1)p$`} /> rule). Points beyond those fences become outlier dots — they do{" "}
        <em>not</em> stretch the whiskers.
      </p>
      <p className={styles.muted}>
        Example {exampleIndex + 1}/{BOX_EXAMPLES.length}: {example.label}
      </p>
      <p>
        Sorted data:{" "}
        <code>{summary.sorted.map(formatNum).join(", ")}</code>
      </p>
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>FIVE-NUMBER + FENCES</p>
          <p>
            <MathText text={`$Q_1=${formatNum(summary.q1)}$, median $=${formatNum(summary.median)}$, $Q_3=${formatNum(summary.q3)}$`} />
          </p>
          <p>
            <MathText text={`$\\mathrm{IQR}=${formatNum(summary.iqr)}$`} />
          </p>
          <p>
            Inner fences: [{formatNum(summary.innerLow)}, {formatNum(summary.innerHigh)}]
          </p>
          <p className={styles.small}>Dashed red lines on the number line mark the inner fences; the blue band is the box.</p>
        </div>
        <NumberLine
          summary={summary}
          highlight={{
            high: step !== "upper",
            low: step === "done",
          }}
        />
      </div>

      {step !== "done" ? (
        <>
          <p className={styles.promptItem} style={{ marginTop: 14 }}>
            <strong>{step === "upper" ? "Step 1 · Upper whisker" : "Step 2 · Lower whisker"}</strong>
            <span style={{ display: "block", marginTop: 6 }}>
              Click the data value where the {step === "upper" ? "upper" : "lower"} whisker should end.
            </span>
          </p>
          <div className={styles.choices}>
            {[...new Set(summary.sorted)].map((value) => (
              <button
                key={value}
                className={styles.choice}
                type="button"
                disabled={awaitingRetry}
                onClick={() => choose(value)}
              >
                {formatNum(value)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className={styles.answer}>
            Whiskers: [{formatNum(summary.whiskerLow)}, {formatNum(summary.whiskerHigh)}]. Outliers:{" "}
            {summary.outliers.length ? summary.outliers.map(formatNum).join(", ") : "none"}.
          </p>
          <BoxplotSvg summary={summary} />
        </>
      )}

      {feedback ? <p className={styles.answer}>{feedback}</p> : null}
      <div className={styles.tools}>
        {awaitingRetry ? (
          <button
            className={styles.toolBtn}
            type="button"
            onClick={() => {
              setFeedback("");
              setAwaitingRetry(false);
            }}
          >
            TRY AGAIN
          </button>
        ) : null}
        {step === "done" ? (
          <button className={styles.toolBtn} type="button" onClick={() => resetExample((exampleIndex + 1) % BOX_EXAMPLES.length)}>
            NEXT EXAMPLE
          </button>
        ) : null}
        <button className={styles.ghost} type="button" onClick={() => resetExample((exampleIndex + 1) % BOX_EXAMPLES.length)}>
          Skip example
        </button>
      </div>
    </SceneFrame>
  );
}

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
        <strong>Question 1:</strong> What do the data say about infections at UM? Explore daily positive counts by
        campus group (histograms / summaries). Download the CSV here, or open the Appendix explorer for adjustable bin
        widths and boxplots.
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
            Positives are right-skewed. Faculty/staff yearly total {FACULTY_YEARLY_POSITIVES} is the μ we use for
            Question 2 (Poisson) on the next slides.
          </p>
          {!print ? (
            <div className={styles.toolLinks}>
              <a href={`${import.meta.env.BASE_URL}appendix/UM_C19_2021.csv`} download>
                Download CSV
              </a>
              <a href={`${import.meta.env.BASE_URL}appendix/index.html`} target="_blank" rel="noreferrer">
                Open Appendix explorer
              </a>
            </div>
          ) : (
            <p className={styles.small}>Download CSV / Appendix explorer available on the live site.</p>
          )}
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
        <strong>Question 2:</strong> <InlineMath tex="X" /> = next year’s faculty/staff total positives, modeled as{" "}
        <InlineMath tex={`\\mathrm{Poisson}(\\mu)`} />. <strong>Question 3:</strong> <InlineMath tex="Y" /> = positives
        among <InlineMath tex="n" /> Statistics faculty/staff, modeled as{" "}
        <InlineMath tex={String.raw`\mathrm{Bin}(n,\hat p)`} /> with{" "}
        <InlineMath tex={`\\hat p=\\mu/${POPULATION.facultyStaff}`} />. Default μ from the CSV is{" "}
        <InlineMath tex={`${FACULTY_YEARLY_POSITIVES}`} />.
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
          <p className={styles.kicker}>Q2 · POISSON(μ) FOR X</p>
          <p>
            <InlineMath tex={`P(X\\le 800)=${poisLe800.toFixed(4)}`} />
          </p>
          <p>
            <InlineMath tex={`P(X>800)=${(1 - poisLe800).toFixed(4)}`} />
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>Q3 · BIN(n, p̂) FOR Y</p>
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

/* ── Gamma MLE vs MoM comparison ── */
export function GammaMomMleGame() {
  const print = usePrintMode();
  const [n, setN] = useState(50);
  const [shape, setShape] = useState(2);
  const [scale, setScale] = useState(1);
  const [reps, setReps] = useState(20);
  const [seed, setSeed] = useState(7);

  const result = useMemo(() => {
    const rng = createRng(seed);
    const mleShapes: number[] = [];
    const mleScales: number[] = [];
    const momShapes: number[] = [];
    const momScales: number[] = [];
    for (let r = 0; r < reps; r += 1) {
      const sample = Array.from({ length: n }, () => sampleGammaShapeScale(shape, scale, rng));
      const mle = gammaMleShapeScale(sample);
      const mom = gammaMomShapeScale(sample);
      if (Number.isFinite(mle.shape) && Number.isFinite(mle.scale)) {
        mleShapes.push(mle.shape);
        mleScales.push(mle.scale);
      }
      if (Number.isFinite(mom.shape) && Number.isFinite(mom.scale)) {
        momShapes.push(mom.shape);
        momScales.push(mom.scale);
      }
    }
    return {
      mle: {
        shapeAvg: mean(mleShapes),
        scaleAvg: mean(mleScales),
        shapeBias: biasOf(mleShapes, shape),
        scaleBias: biasOf(mleScales, scale),
        shapeMse: mseOf(mleShapes, shape),
        scaleMse: mseOf(mleScales, scale),
      },
      mom: {
        shapeAvg: mean(momShapes),
        scaleAvg: mean(momScales),
        shapeBias: biasOf(momShapes, shape),
        scaleBias: biasOf(momScales, scale),
        shapeMse: mseOf(momShapes, shape),
        scaleMse: mseOf(momScales, scale),
      },
    };
  }, [n, shape, scale, reps, seed]);

  const fmt = (value: number) => (Number.isFinite(value) ? value.toFixed(4) : "—");

  return (
    <SceneFrame kicker="Game" title="Gamma: MLE vs MoM" tone="gold">
      <p className={styles.lead}>
        Simulate i.i.d. samples from <InlineMath tex={String.raw`\mathrm{Gamma}(\theta_1,\theta_2)`} /> (shape–scale:
        mean <InlineMath tex={String.raw`\theta_1\theta_2`} />). Compare numerical MLE with closed-form MoM.
      </p>

      {!print ? (
        <div className={styles.tools} style={{ flexWrap: "wrap", gap: 12 }}>
          <label>
            <span className={styles.muted}>n </span>
            <input
              className={styles.numberInput}
              type="number"
              min={10}
              max={300}
              value={n}
              onChange={(e) => setN(Math.max(10, Math.min(300, Number(e.target.value) || 10)))}
            />
          </label>
          <label>
            <InlineMath tex={String.raw`\theta_1`} />{" "}
            <input
              className={styles.numberInput}
              type="number"
              min={0.2}
              max={20}
              step={0.1}
              value={shape}
              onChange={(e) => setShape(Math.max(0.2, Number(e.target.value) || 0.2))}
            />
          </label>
          <label>
            <InlineMath tex={String.raw`\theta_2`} />{" "}
            <input
              className={styles.numberInput}
              type="number"
              min={0.2}
              max={10}
              step={0.1}
              value={scale}
              onChange={(e) => setScale(Math.max(0.2, Number(e.target.value) || 0.2))}
            />
          </label>
          <label>
            <span className={styles.muted}>reps </span>
            <input
              className={styles.numberInput}
              type="number"
              min={1}
              max={100}
              value={reps}
              onChange={(e) => setReps(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
            />
          </label>
          <button className={styles.toolBtn} type="button" onClick={() => setSeed((s) => s + 1)}>
            RESIMULATE
          </button>
        </div>
      ) : (
        <p className={styles.muted}>
          Fixed demo: <InlineMath tex={`n=${n}`} />, <InlineMath tex={`\\theta_1=${shape}`} />,{" "}
          <InlineMath tex={`\\theta_2=${scale}`} />, {reps} replications.
        </p>
      )}

      <div className={styles.twoCol}>
        <Block title="MLE (numerical)">
          <p>
            Avg <InlineMath tex={String.raw`\hat\theta_1`} />: <strong>{fmt(result.mle.shapeAvg)}</strong>{" "}
            <span className={styles.muted}>(true {shape.toFixed(2)})</span>
          </p>
          <p>
            Avg <InlineMath tex={String.raw`\hat\theta_2`} />: <strong>{fmt(result.mle.scaleAvg)}</strong>{" "}
            <span className={styles.muted}>(true {scale.toFixed(2)})</span>
          </p>
          <p className={styles.muted}>
            Bias: {fmt(result.mle.shapeBias)}, {fmt(result.mle.scaleBias)}
          </p>
          <p className={styles.muted}>
            MSE: {fmt(result.mle.shapeMse)}, {fmt(result.mle.scaleMse)}
          </p>
        </Block>
        <Block title="MoM (closed form)">
          <p>
            Avg <InlineMath tex={String.raw`\tilde\theta_1`} />: <strong>{fmt(result.mom.shapeAvg)}</strong>{" "}
            <span className={styles.muted}>(true {shape.toFixed(2)})</span>
          </p>
          <p>
            Avg <InlineMath tex={String.raw`\tilde\theta_2`} />: <strong>{fmt(result.mom.scaleAvg)}</strong>{" "}
            <span className={styles.muted}>(true {scale.toFixed(2)})</span>
          </p>
          <p className={styles.muted}>
            Bias: {fmt(result.mom.shapeBias)}, {fmt(result.mom.scaleBias)}
          </p>
          <p className={styles.muted}>
            MSE: {fmt(result.mom.shapeMse)}, {fmt(result.mom.scaleMse)}
          </p>
        </Block>
      </div>

      <div className={styles.twoCol} style={{ marginTop: 12 }}>
        <Block title="MLE equations">
          <Formula
            tex={String.raw`\log\hat\theta_1-\psi(\hat\theta_1)=\log\bar X-\dfrac{1}{n}\sum\log X_i`}
          />
          <Formula tex={String.raw`\hat\theta_2=\bar X/\hat\theta_1`} />
          <p className={styles.muted}>
            <InlineMath tex={String.raw`\psi`} /> is the digamma function — solve numerically for{" "}
            <InlineMath tex={String.raw`\hat\theta_1`} />.
          </p>
        </Block>
        <Block title="MoM equations">
          <Formula tex={String.raw`V=\dfrac{1}{n}\sum(X_i-\bar X)^2`} />
          <Formula tex={String.raw`\tilde\theta_1=\bar X^2/V,\qquad \tilde\theta_2=V/\bar X`} />
          <p className={styles.muted}>Algebra only — no iterative solver.</p>
        </Block>
      </div>

      <p className={styles.note} style={{ marginTop: 12 }}>
        Takeaway: for Gamma, MoM is easy to compute by hand; MLE needs a computer. The averages above are over the
        chosen number of replications.
      </p>
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
