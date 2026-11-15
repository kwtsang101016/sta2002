import { useMemo, useState } from "react";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

const r = String.raw;

/** Unconstrained defaults: sums of α and β are not zero. */
const DEFAULT = {
  mu: "10",
  alpha: ["3", "-1"],
  beta: ["2", "5"],
};

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

function meanTable(mu: number, alpha: number[], beta: number[]): number[][] {
  return alpha.map((ai) => beta.map((bj) => mu + ai + bj));
}

function MuTable({
  caption,
  table,
}: {
  caption: string;
  table: number[][];
}) {
  return (
    <div className={styles.tableWrap} style={{ padding: 10 }}>
      <table style={{ fontSize: 13 }}>
        <thead>
          <tr>
            <th>
              <MathText text={caption} />
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
          {table.map((row, i) => (
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
  );
}

/**
 * Adjust unconstrained μ, α_i, β_j; see that an equivalent zero-sum
 * parameterization yields the same μ_ij table.
 */
export function ZeroSumEffectsGame() {
  const print = usePrintMode();
  const [muRaw, setMuRaw] = useState(DEFAULT.mu);
  const [alphaRaw, setAlphaRaw] = useState(DEFAULT.alpha);
  const [betaRaw, setBetaRaw] = useState(DEFAULT.beta);

  const mu = parseNum(muRaw);
  const alpha = alphaRaw.map(parseNum);
  const beta = betaRaw.map(parseNum);

  const table = useMemo(() => meanTable(mu, alpha, beta), [mu, alpha, beta]);

  const centered = useMemo(() => {
    const alphaBar = mean(alpha);
    const betaBar = mean(beta);
    const muPrime = mu + alphaBar + betaBar;
    const alphaPrime = alpha.map((value) => value - alphaBar);
    const betaPrime = beta.map((value) => value - betaBar);
    return {
      muPrime,
      alphaPrime,
      betaPrime,
      table: meanTable(muPrime, alphaPrime, betaPrime),
      sumAlpha: alpha.reduce((sum, value) => sum + value, 0),
      sumBeta: beta.reduce((sum, value) => sum + value, 0),
      sumAlphaPrime: alphaPrime.reduce((sum, value) => sum + value, 0),
      sumBetaPrime: betaPrime.reduce((sum, value) => sum + value, 0),
    };
  }, [mu, alpha, beta]);

  return (
    <SceneFrame kicker="Game" title={r`Why $\sum\alpha_i=\sum\beta_j=0$?`} tone="gold">
      <p>
        Pick any <InlineMath tex={r`\mu`} />, <InlineMath tex={r`\alpha_i`} />, and{" "}
        <InlineMath tex={r`\beta_j`} /> (sums need not be zero). The cell means{" "}
        <MathText text={r`$\mu_{ij}=\mu+\alpha_i+\beta_j$`} /> do not change if we recentre the effects:
      </p>
      <Formula
        tex={r`\mu'=\mu+\bar\alpha+\bar\beta,\quad
\alpha_i'=\alpha_i-\bar\alpha,\quad
\beta_j'=\beta_j-\bar\beta
\quad\Rightarrow\quad
\sum_i\alpha_i'=0,\;\sum_j\beta_j'=0.`}
      />

      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex={r`\mu`} />
            <input
              className={styles.numberInput}
              type="number"
              step="any"
              value={muRaw}
              onChange={(event) => setMuRaw(event.target.value)}
              aria-label="mu"
            />
          </label>
          {alphaRaw.map((value, index) => (
            <label key={`a${index}`} className={styles.small}>
              <InlineMath tex={r`\alpha_{${index + 1}}`} />
              <input
                className={styles.numberInput}
                type="number"
                step="any"
                value={value}
                onChange={(event) => {
                  const next = event.target.value;
                  setAlphaRaw((current) => current.map((entry, i) => (i === index ? next : entry)));
                }}
                aria-label={`alpha_${index + 1}`}
              />
            </label>
          ))}
          {betaRaw.map((value, index) => (
            <label key={`b${index}`} className={styles.small}>
              <InlineMath tex={r`\beta_{${index + 1}}`} />
              <input
                className={styles.numberInput}
                type="number"
                step="any"
                value={value}
                onChange={(event) => {
                  const next = event.target.value;
                  setBetaRaw((current) => current.map((entry, i) => (i === index ? next : entry)));
                }}
                aria-label={`beta_${index + 1}`}
              />
            </label>
          ))}
        </div>
      ) : (
        <p className={styles.muted}>
          Print handout uses <MathText text={r`$\mu=10$, $\alpha=(3,-1)$, $\beta=(2,5)$`} />.
        </p>
      )}

      <Formula
        tex={r`\sum_i\alpha_i=${fmt(centered.sumAlpha)},\qquad
\sum_j\beta_j=${fmt(centered.sumBeta)}
\quad\text{(your choice; need not be zero)}.`}
      />
      <MuTable caption={r`$\mu_{ij}=\mu+\alpha_i+\beta_j$`} table={table} />

      <Formula
        tex={r`\mu'=${fmt(centered.muPrime)},\quad
\alpha'=(${fmt(centered.alphaPrime[0])},\,${fmt(centered.alphaPrime[1])}),\quad
\beta'=(${fmt(centered.betaPrime[0])},\,${fmt(centered.betaPrime[1])}).`}
      />
      <Formula
        tex={r`\sum_i\alpha_i'=${fmt(centered.sumAlphaPrime)},\qquad
\sum_j\beta_j'=${fmt(centered.sumBetaPrime)}.`}
      />
      <MuTable caption={r`$\mu_{ij}=\mu'+\alpha_i'+\beta_j'$ (same table)`} table={centered.table} />

      <p>
        Same <MathText text={r`$\mu_{ij}$`} /> table both ways. So requiring{" "}
        <MathText text={r`$\sum_i\alpha_i=0$`} /> and <MathText text={r`$\sum_j\beta_j=0$`} /> is without loss of
        generality — it just picks one convenient parameterization.
      </p>
    </SceneFrame>
  );
}
