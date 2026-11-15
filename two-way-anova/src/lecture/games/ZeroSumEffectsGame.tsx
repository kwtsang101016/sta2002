import { useMemo, useState } from "react";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

const r = String.raw;

/** Default 2×2 additive means (exact fit with zero-sum effects). */
const DEFAULT_MU = [
  [12, 15],
  [8, 11],
];

function parseNum(raw: string): number {
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function fmt(value: number): string {
  const rounded = Math.round(value * 1000) / 1000;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

type Decomposition = {
  mu: number;
  alpha: number[];
  beta: number[];
  fitted: number[][];
  residual: number[][];
  maxAbsResidual: number;
};

function decompose(muTable: number[][]): Decomposition {
  const b = muTable[0]?.length ?? 0;
  const rowMeans = muTable.map((row) => mean(row));
  const colMeans = Array.from({ length: b }, (_, j) => mean(muTable.map((row) => row[j] ?? 0)));
  const mu = mean(rowMeans);
  const alpha = rowMeans.map((value) => value - mu);
  const beta = colMeans.map((value) => value - mu);
  const fitted = muTable.map((row, i) => row.map((_, j) => mu + alpha[i] + beta[j]));
  const residual = muTable.map((row, i) => row.map((value, j) => value - fitted[i][j]));
  const maxAbsResidual = Math.max(0, ...residual.flat().map((value) => Math.abs(value)));
  return { mu, alpha, beta, fitted, residual, maxAbsResidual };
}

/** Enter a 2×2 mean table; see the zero-sum additive decomposition. */
export function ZeroSumEffectsGame() {
  const print = usePrintMode();
  const [raw, setRaw] = useState(() => DEFAULT_MU.map((row) => row.map(String)));

  const muTable = useMemo(() => raw.map((row) => row.map(parseNum)), [raw]);
  const result = useMemo(() => decompose(muTable), [muTable]);
  const additive = result.maxAbsResidual < 1e-9;

  const setCell = (i: number, j: number, value: string) => {
    setRaw((current) =>
      current.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? value : cell)),
      ),
    );
  };

  return (
    <SceneFrame kicker="Game" title={r`Why $\sum\alpha_i=\sum\beta_j=0$?`} tone="gold">
      <p>
        Enter any <MathText text={r`$2\times 2$`} /> cell means <InlineMath tex={r`\mu_{ij}`} />. The additive
        fit{" "}
        <MathText text={r`$\hat\mu_{ij}=\mu+\alpha_i+\beta_j$`} /> with{" "}
        <MathText text={r`$\sum_i\alpha_i=0$`} /> and <MathText text={r`$\sum_j\beta_j=0$`} /> is unique: take{" "}
        <MathText text={r`$\mu$`} /> as the grand mean, <MathText text={r`$\alpha_i$`} /> as row mean minus{" "}
        <MathText text={r`$\mu$`} />, and <MathText text={r`$\beta_j$`} /> as column mean minus{" "}
        <MathText text={r`$\mu$`} />.
      </p>

      {!print ? (
        <div className={styles.tableWrap} style={{ padding: 10 }}>
          <table style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th />
                <th>
                  <InlineMath tex={r`j=1`} />
                </th>
                <th>
                  <InlineMath tex={r`j=2`} />
                </th>
              </tr>
            </thead>
            <tbody>
              {raw.map((row, i) => (
                <tr key={i}>
                  <th>
                    <InlineMath tex={r`i=${i + 1}`} />
                  </th>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <label className={styles.small} style={{ margin: 0, display: "block" }}>
                        <InlineMath tex={r`\mu_{${i + 1}${j + 1}}`} />
                        <input
                          className={styles.numberInput}
                          type="number"
                          step="any"
                          value={cell}
                          onChange={(event) => setCell(i, j, event.target.value)}
                          aria-label={`mu_${i + 1}${j + 1}`}
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.muted}>
          Print handout uses the default additive table{" "}
          <MathText text={r`$(\mu_{ij})=((12,15),(8,11))$`} />.
        </p>
      )}

      <Formula
        tex={r`\mu=${fmt(result.mu)},\quad
\alpha=(${fmt(result.alpha[0])},\,${fmt(result.alpha[1])}),\quad
\beta=(${fmt(result.beta[0])},\,${fmt(result.beta[1])}).`}
      />
      <Formula
        tex={r`\sum_i\alpha_i=${fmt(result.alpha[0] + result.alpha[1])},\qquad
\sum_j\beta_j=${fmt(result.beta[0] + result.beta[1])}.`}
      />

      <div className={styles.tableWrap} style={{ padding: 10 }}>
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr>
              <th>
                <InlineMath tex={r`\hat\mu_{ij}=\mu+\alpha_i+\beta_j`} />
              </th>
              <th>
                <InlineMath tex={r`j=1`} />
              </th>
              <th>
                <InlineMath tex={r`j=2`} />
              </th>
            </tr>
          </thead>
          <tbody>
            {result.fitted.map((row, i) => (
              <tr key={i}>
                <th>
                  <InlineMath tex={r`i=${i + 1}`} />
                </th>
                {row.map((value, j) => (
                  <td key={j}>{fmt(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        {additive ? (
          <>
            Exact match: this table is additive, so{" "}
            <MathText text={r`$\mu_{ij}=\mu+\alpha_i+\beta_j$`} /> with the zero-sum constraints.
          </>
        ) : (
          <>
            Largest residual{" "}
            <MathText text={r`$|\mu_{ij}-\hat\mu_{ij}|$`} /> is about {fmt(result.maxAbsResidual)}. The table is
            not purely additive (interaction); the zero-sum <MathText text={r`$\mu,\alpha_i,\beta_j$`} /> still give
            the unique best additive fit of this form.
          </>
        )}
      </p>
      <p className={styles.muted}>
        Without the zero-sum constraints, many <MathText text={r`$(\mu,\alpha,\beta)$`} /> triples give the same{" "}
        <MathText text={r`$\mu_{ij}$`} /> (shift constants between <MathText text={r`$\mu$`} /> and the effects).
        Setting the sums to zero removes that ambiguity.
      </p>
    </SceneFrame>
  );
}
