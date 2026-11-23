import { useMemo, useState, type CSSProperties } from "react";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";
import { fPValue } from "./fDist";

const r = String.raw;

type Mode = "additive" | "interaction";

/** Levels of factor A (rows) and B (columns); fixed for this explorer. */
const A_LEVELS = 2;
const B_LEVELS = 3;
/** Replicates per cell in each mode. */
const REPLICATES: Record<Mode, number> = { additive: 1, interaction: 4 };
const MAX_REPLICATES = REPLICATES.interaction;
/** Fixed seed: live page start and print handout show the same table. */
const PRINT_SEED = 2026;

const DEFAULTS = {
  mu: "10",
  sigma: "1",
  alpha: ["2", "-2"],
  beta: ["1", "0", "-1"],
  gamma: [
    ["0.5", "0", "-0.5"],
    ["-0.5", "0", "0.5"],
  ],
};

const TABLE_STYLE: CSSProperties = { fontSize: 12, borderCollapse: "collapse", width: "100%" };
const STACK_STYLE: CSSProperties = { fontSize: 11, lineHeight: 1.3 };
const WRAP_STYLE: CSSProperties = { padding: 10, overflowX: "auto" };

/** One standard-normal draw per (i, j, k); scaled by σ when data are built. */
type NoiseGrid = number[][][];

type Params = {
  mu: number;
  sigma: number;
  alpha: number[];
  beta: number[];
  gamma: number[][];
};

type AnovaRow = {
  key: string;
  source: string;
  ss: number;
  df: number;
  ms: number | null;
  f: number | null;
  p: number | null;
};

type Analysis = {
  c: number;
  cells: number[][][];
  rowMeans: number[];
  colMeans: number[];
  cellMeans: number[][];
  grandMean: number;
  rows: AnovaRow[];
};

function parseNum(raw: string): number {
  const value = Number(raw);
  return raw.trim() !== "" && Number.isFinite(value) ? value : 0;
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function mean(values: number[]): number {
  return sum(values) / values.length;
}

function fmt(value: number, digits = 2): string {
  if (Number.isNaN(value)) return "—";
  if (!Number.isFinite(value)) return value > 0 ? "∞" : "−∞";
  const text = value.toFixed(digits);
  return Number(text) === 0 ? (0).toFixed(digits) : text;
}

/** Deterministic uniform(0,1) generator (mulberry32). */
function seededUniform(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Box–Muller transform: two uniforms → one N(0,1) draw. */
function boxMuller(uniform: () => number): number {
  const u1 = 1 - uniform(); // in (0, 1], avoids log(0)
  const u2 = uniform();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function makeNoise(uniform: () => number): NoiseGrid {
  return Array.from({ length: A_LEVELS }, () =>
    Array.from({ length: B_LEVELS }, () => Array.from({ length: MAX_REPLICATES }, () => boxMuller(uniform))),
  );
}

function anovaRow(
  key: string,
  source: string,
  ss: number,
  df: number,
  msError: number,
  dfError: number,
): AnovaRow {
  const ms = ss / df;
  const f = msError > 1e-12 ? ms / msError : ms > 1e-12 ? Infinity : 0;
  return { key, source, ss, df, ms, f, p: fPValue(f, df, dfError) };
}

function analyze(mode: Mode, params: Params, noise: NoiseGrid): Analysis {
  const a = A_LEVELS;
  const b = B_LEVELS;
  const c = REPLICATES[mode];
  const isInteraction = mode === "interaction";

  const cells = Array.from({ length: a }, (_, i) =>
    Array.from({ length: b }, (_, j) =>
      Array.from({ length: c }, (_, k) => {
        const mean_ij =
          params.mu + params.alpha[i] + params.beta[j] + (isInteraction ? params.gamma[i][j] : 0);
        return mean_ij + params.sigma * noise[i][j][k];
      }),
    ),
  );

  const cellMeans = cells.map((row) => row.map(mean));
  const rowMeans = cellMeans.map(mean);
  const colMeans = Array.from({ length: b }, (_, j) => mean(cellMeans.map((row) => row[j])));
  const grandMean = mean(rowMeans);

  const ssTotal = sum(cells.flat(2).map((x) => (x - grandMean) ** 2));
  const ssA = b * c * sum(rowMeans.map((m) => (m - grandMean) ** 2));
  const ssB = a * c * sum(colMeans.map((m) => (m - grandMean) ** 2));
  const ssAB = isInteraction
    ? c *
      sum(
        cellMeans.flatMap((row, i) =>
          row.map((m, j) => (m - rowMeans[i] - colMeans[j] + grandMean) ** 2),
        ),
      )
    : 0;
  const ssError = Math.max(0, ssTotal - ssA - ssB - ssAB);

  const dfA = a - 1;
  const dfB = b - 1;
  const dfAB = (a - 1) * (b - 1);
  const dfError = isInteraction ? a * b * (c - 1) : (a - 1) * (b - 1);
  const msError = ssError / dfError;

  const rows: AnovaRow[] = [
    anovaRow("A", "Factor A", ssA, dfA, msError, dfError),
    anovaRow("B", "Factor B", ssB, dfB, msError, dfError),
    ...(isInteraction ? [anovaRow("AB", "Interaction AB", ssAB, dfAB, msError, dfError)] : []),
    { key: "E", source: "Error", ss: ssError, df: dfError, ms: msError, f: null, p: null },
    {
      key: "TO",
      source: "Total",
      ss: ssTotal,
      df: a * b * c - 1,
      ms: null,
      f: null,
      p: null,
    },
  ];

  return { c, cells, rowMeans, colMeans, cellMeans, grandMean, rows };
}

function PValue({ p }: { p: number | null }) {
  if (p === null) return <>—</>;
  if (p < 0.0001) return <InlineMath tex={r`<0.0001`} />;
  return <>{fmt(p, 4)}</>;
}

function NumberField({
  tex,
  value,
  label,
  onChange,
}: {
  tex: string;
  value: string;
  label: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className={styles.small}>
      <InlineMath tex={tex} />
      <input
        className={styles.numberInput}
        type="number"
        step="any"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        style={{ width: 72, minHeight: 32, fontSize: 14 }}
      />
    </label>
  );
}

function DataTable({ analysis }: { analysis: Analysis }) {
  const { c, cells, rowMeans, colMeans, cellMeans, grandMean } = analysis;
  const showReplicates = c > 1;
  const rowMeanLabel = showReplicates ? r`Row mean $\bar X_{i\cdot\cdot}$` : r`Row mean $\bar X_{i\cdot}$`;
  const colMeanLabel = showReplicates ? r`Col mean $\bar X_{\cdot j\cdot}$` : r`Col mean $\bar X_{\cdot j}$`;
  return (
    <div className={styles.tableWrap} style={WRAP_STYLE}>
      <table style={TABLE_STYLE}>
        <thead>
          <tr>
            <th />
            {colMeans.map((_, j) => (
              <th key={j}>
                <InlineMath tex={r`j=${j + 1}`} />
              </th>
            ))}
            <th>
              <MathText text={rowMeanLabel} />
            </th>
          </tr>
        </thead>
        <tbody>
          {cells.map((row, i) => (
            <tr key={i}>
              <th>
                <InlineMath tex={r`i=${i + 1}`} />
              </th>
              {row.map((values, j) => (
                <td key={j}>
                  {showReplicates ? (
                    <div style={STACK_STYLE}>
                      {values.map((x, k) => (
                        <div key={k}>{fmt(x)}</div>
                      ))}
                      <div className={styles.muted} style={{ fontSize: 11 }}>
                        mean {fmt(cellMeans[i][j])}
                      </div>
                    </div>
                  ) : (
                    fmt(values[0])
                  )}
                </td>
              ))}
              <td>
                <b>{fmt(rowMeans[i])}</b>
              </td>
            </tr>
          ))}
          <tr>
            <th>
              <MathText text={colMeanLabel} />
            </th>
            {colMeans.map((m, j) => (
              <td key={j}>
                <b>{fmt(m)}</b>
              </td>
            ))}
            <td>
              <b>{fmt(grandMean)}</b> <span className={styles.muted}>(grand)</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function AnovaTable({ rows }: { rows: AnovaRow[] }) {
  return (
    <div className={styles.tableWrap} style={WRAP_STYLE}>
      <table style={TABLE_STYLE}>
        <thead>
          <tr>
            <th>Source</th>
            <th>
              <InlineMath tex={r`SS`} />
            </th>
            <th>df</th>
            <th>
              <InlineMath tex={r`MS`} />
            </th>
            <th>
              <InlineMath tex={r`F`} />
            </th>
            <th>p-value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <th>
                <MathText text={row.source} />
              </th>
              <td>{fmt(row.ss, 3)}</td>
              <td>{row.df}</td>
              <td>{row.ms === null ? "—" : fmt(row.ms, 3)}</td>
              <td>{row.f === null ? "—" : fmt(row.f, 3)}</td>
              <td>
                <PValue p={row.p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MODEL_TEX: Record<Mode, string> = {
  additive: r`X_{ij}=\mu+\alpha_i+\beta_j+\varepsilon_{ij},\quad \varepsilon_{ij}\sim N(0,\sigma^2),\quad c=1`,
  interaction: r`X_{ijk}=\mu+\alpha_i+\beta_j+\gamma_{ij}+\varepsilon_{ijk},\quad \varepsilon_{ijk}\sim N(0,\sigma^2),\quad c=4`,
};

const SS_TEX: Record<Mode, string> = {
  additive: r`SS(A)=b\sum_i(\bar X_{i\cdot}-\bar X_{\cdot\cdot})^2,\;
SS(B)=a\sum_j(\bar X_{\cdot j}-\bar X_{\cdot\cdot})^2,\;
SS(E)=SS(TO)-SS(A)-SS(B)`,
  interaction: r`SS(A)=bc\sum_i(\bar X_{i\cdot\cdot}-\bar X_{\cdots})^2,\;
SS(B)=ac\sum_j(\bar X_{\cdot j\cdot}-\bar X_{\cdots})^2,\;
SS(AB)=c\sum_{i,j}(\bar X_{ij\cdot}-\bar X_{i\cdot\cdot}-\bar X_{\cdot j\cdot}+\bar X_{\cdots})^2`,
};

/**
 * Simulate two-way ANOVA data (additive c=1 or interaction c=4) and see SS, F, and p-values.
 */
export function TwoWayAnovaExplorerGame() {
  const print = usePrintMode();
  const [mode, setMode] = useState<Mode>("additive");
  const [muRaw, setMuRaw] = useState(DEFAULTS.mu);
  const [sigmaRaw, setSigmaRaw] = useState(DEFAULTS.sigma);
  const [alphaRaw, setAlphaRaw] = useState(DEFAULTS.alpha);
  const [betaRaw, setBetaRaw] = useState(DEFAULTS.beta);
  const [gammaRaw, setGammaRaw] = useState(DEFAULTS.gamma);
  const [noise, setNoise] = useState<NoiseGrid>(() => makeNoise(seededUniform(PRINT_SEED)));

  const params = useMemo<Params>(
    () => ({
      mu: parseNum(muRaw),
      sigma: Math.abs(parseNum(sigmaRaw)),
      alpha: alphaRaw.map(parseNum),
      beta: betaRaw.map(parseNum),
      gamma: gammaRaw.map((row) => row.map(parseNum)),
    }),
    [muRaw, sigmaRaw, alphaRaw, betaRaw, gammaRaw],
  );

  const analysis = useMemo(() => analyze(mode, params, noise), [mode, params, noise]);
  const isInteraction = mode === "interaction";

  const regenerate = () => setNoise(makeNoise(Math.random));

  const updateAt = (setter: typeof setAlphaRaw, index: number, next: string) =>
    setter((current) => current.map((entry, i) => (i === index ? next : entry)));

  return (
    <SceneFrame kicker="Game" title={r`Two-way ANOVA explorer: $SS$ and $F$ from simulated data`} tone="gold">
      {!print && (
        <div className={styles.tools} style={{ margin: "8px 0" }}>
          {(["additive", "interaction"] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.toolBtn} ${mode === option ? styles.toolBtnActive : ""}`.trim()}
              onClick={() => setMode(option)}
              aria-pressed={mode === option}
            >
              {option === "additive" ? "Additive (c=1)" : "Interaction (c=4)"}
            </button>
          ))}
          <button type="button" className={styles.primary} onClick={regenerate}>
            Generate new errors
          </button>
        </div>
      )}

      <Formula tex={MODEL_TEX[mode]} />

      {!print ? (
        <div className={styles.tools} style={{ margin: "8px 0", gap: 6 }}>
          <NumberField tex={r`\mu`} label="mu" value={muRaw} onChange={setMuRaw} />
          <NumberField tex={r`\sigma`} label="sigma" value={sigmaRaw} onChange={setSigmaRaw} />
          {alphaRaw.map((value, i) => (
            <NumberField
              key={`a${i}`}
              tex={r`\alpha_{${i + 1}}`}
              label={`alpha_${i + 1}`}
              value={value}
              onChange={(next) => updateAt(setAlphaRaw, i, next)}
            />
          ))}
          {betaRaw.map((value, j) => (
            <NumberField
              key={`b${j}`}
              tex={r`\beta_{${j + 1}}`}
              label={`beta_${j + 1}`}
              value={value}
              onChange={(next) => updateAt(setBetaRaw, j, next)}
            />
          ))}
          {isInteraction &&
            gammaRaw.map((row, i) =>
              row.map((value, j) => (
                <NumberField
                  key={`g${i}${j}`}
                  tex={r`\gamma_{${i + 1}${j + 1}}`}
                  label={`gamma_${i + 1}${j + 1}`}
                  value={value}
                  onChange={(next) =>
                    setGammaRaw((current) =>
                      current.map((rowRaw, ri) => (ri === i ? rowRaw.map((e, ci) => (ci === j ? next : e)) : rowRaw)),
                    )
                  }
                />
              )),
            )}
        </div>
      ) : (
        <p className={styles.muted}>
          Printed example (additive, fixed random errors):{" "}
          <MathText
            text={r`$\mu=10$, $\alpha=(2,-2)$, $\beta=(1,0,-1)$, $\sigma=1$, $a=2$, $b=3$, $c=1$.`}
          />
        </p>
      )}

      <div className={styles.twoCol} style={{ gap: 12, alignItems: "start" }}>
        <DataTable analysis={analysis} />
        <AnovaTable rows={analysis.rows} />
      </div>

      <p className={styles.muted} style={{ fontSize: 12, marginTop: 8 }}>
        <MathText text={`$${SS_TEX[mode].replace(/\n/g, " ")}$`} /> with{" "}
        <MathText text={r`$F=MS/MS(E)$`} /> on <MathText text={r`$(df,\,df_E)$`} /> degrees of freedom.
        {!print && " Change the parameters or draw new errors to see how SS, F, and p respond."}
      </p>
    </SceneFrame>
  );
}
