import { useMemo, useState } from "react";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { InlineMath, MathText, SceneFrame } from "../scenes/shared";

const CRITICAL_05_DF5 = 11.07;
const DEFAULT_COUNTS = [95, 102, 98, 101, 97, 107];

function parseCount(raw: string): number {
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

function formatNum(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(3);
}

/** Pearson chi-square for a fair six-faced die. Counts are editable; H0 is p_i = 1/6. */
export function ChiSquareDiceGame() {
  const print = usePrintMode();
  const [rawCounts, setRawCounts] = useState(() => DEFAULT_COUNTS.map(String));

  const counts = useMemo(() => rawCounts.map(parseCount), [rawCounts]);
  const summary = useMemo(() => {
    const n = counts.reduce((sum, count) => sum + count, 0);
    const expected = n / 6;
    const terms = counts.map((count) => (expected > 0 ? (count - expected) ** 2 / expected : Number.NaN));
    const q = terms.reduce((sum, term) => sum + term, 0);
    return { n, expected, terms, q };
  }, [counts]);

  const ready = summary.n > 0 && summary.expected >= 5;
  const reject = ready && summary.q >= CRITICAL_05_DF5;

  return (
    <SceneFrame kicker="Game" title="Fair-die chi-square explorer" tone="gold">
      <p>
        Edit the six face counts. Under <MathText text="$H_0: p_i = 1/6$" />, each expected count is{" "}
        <MathText text="$E = n/6$" />, and{" "}
        <MathText text="$q_6 = \sum_{i=1}^{6}(O_i-E)^2/E$" /> is compared with{" "}
        <MathText text="$\chi^2_{0.05}(5) = 11.070$" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          {rawCounts.map((raw, index) => (
            <label key={index} className={styles.small}>
              Face {index + 1}
              <input
                type="number"
                min={0}
                step={1}
                value={raw}
                onChange={(event) => {
                  const next = event.target.value;
                  setRawCounts((current) => current.map((value, i) => (i === index ? next : value)));
                }}
              />
            </label>
          ))}
        </div>
      ) : null}
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Face</th>
              {counts.map((_, index) => (
                <th key={index}>{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InlineMath tex="O_i" />
              </td>
              {counts.map((count, index) => (
                <td key={index}>{count}</td>
              ))}
            </tr>
            <tr>
              <td>
                <InlineMath tex="(O_i-E)^2/E" />
              </td>
              {summary.terms.map((term, index) => (
                <td key={index}>{formatNum(term)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.formula}>
        <MathText
          text={`$n = ${summary.n}$, $E = ${formatNum(summary.expected)}$, $q_6 = ${formatNum(summary.q)}$.`}
        />
      </div>
      <p>
        {summary.n === 0
          ? "Enter at least one positive count."
          : summary.expected < 5
            ? "At least one expected count is below 5, so this chi-square critical value is not appropriate yet."
            : reject
              ? "Reject the fair-die hypothesis at α = 0.05."
              : "Do not reject the fair-die hypothesis at α = 0.05."}
      </p>
    </SceneFrame>
  );
}
