import { useMemo, useState } from "react";
import {
  binomRangeNormalApprox,
  binomRangeProb,
  formatNum,
  formatPct,
} from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

export function CiLevelExplorerGame() {
  const print = usePrintMode();
  const [n, setN] = useState(16);
  const [p, setP] = useState(0.5);
  const [i, setI] = useState(4);
  const [j, setJ] = useState(13);

  const safeI = clamp(i, 1, n - 1);
  const safeJ = clamp(Math.max(j, safeI + 1), safeI + 1, n);

  const exact = useMemo(
    () => binomRangeProb(n, safeI, safeJ - 1, p),
    [n, safeI, safeJ, p],
  );
  const approx = useMemo(
    () => binomRangeNormalApprox(n, safeI, safeJ, p),
    [n, safeI, safeJ, p],
  );

  const mu = n * p;
  const sigma = Math.sqrt(n * p * (1 - p));

  return (
    <SceneFrame kicker="Game" title="CI level explorer" tone="gold">
      <p>
        Choose <InlineMath tex="n" />, percentile <InlineMath tex="p" />, and order indices{" "}
        <InlineMath tex="i < j" />. The confidence level of{" "}
        <MathText text="$(X_{(i)}, X_{(j)})$" /> for <MathText text="$\pi_p$" /> is{" "}
        <MathText text="$\Pr(i\le W\le j-1)$" /> with <MathText text="$W\sim\mathrm{Bin}(n,p)$" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex="n" />
            <input
              type="range"
              min={5}
              max={40}
              value={n}
              onChange={(e) => {
                const next = Number(e.target.value);
                setN(next);
                setI((cur) => clamp(cur, 1, next - 1));
                setJ((cur) => clamp(cur, 2, next));
              }}
            />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="p" />
            <input
              type="range"
              min={5}
              max={95}
              step={5}
              value={Math.round(p * 100)}
              onChange={(e) => setP(Number(e.target.value) / 100)}
            />
            <span>{formatNum(p, 2)}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="i" />
            <input
              type="range"
              min={1}
              max={n - 1}
              value={safeI}
              onChange={(e) => setI(Number(e.target.value))}
            />
            <span>{safeI}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="j" />
            <input
              type="range"
              min={2}
              max={n}
              value={safeJ}
              onChange={(e) => setJ(Number(e.target.value))}
            />
            <span>{safeJ}</span>
          </label>
        </div>
      ) : (
        <p className={styles.muted}>
          Print snapshot: <InlineMath tex="n" />={n}, <InlineMath tex="p" />={formatNum(p, 2)}, interval{" "}
          <MathText text={`$(X_{(${safeI})}, X_{(${safeJ})})$`} />.
        </p>
      )}
      <Formula
        tex={String.raw`W\sim\mathrm{Bin}(${n},${formatNum(p, 2)}),\quad
\mu=np=${formatNum(mu, 2)},\quad
\sigma=\sqrt{np(1-p)}=${formatNum(sigma, 3)}.`}
      />
      <div className={styles.card}>
        <p className={styles.kicker}>Confidence level</p>
        <p>
          Exact: <strong>{formatPct(exact, 2)}</strong>{" "}
          <span className={styles.muted}>(= {formatNum(exact, 4)})</span>
        </p>
        <p>
          Normal + half-unit: <strong>{formatPct(approx, 2)}</strong>{" "}
          <span className={styles.muted}>(= {formatNum(approx, 4)})</span>
        </p>
        <p className={styles.muted}>
          Difference |exact − approx| ≈ {formatNum(Math.abs(exact - approx), 4)}. Try median{" "}
          <InlineMath tex="p=0.5" /> with small <InlineMath tex="n" />, then increase{" "}
          <InlineMath tex="n" /> to see the CLT tighten.
        </p>
      </div>
    </SceneFrame>
  );
}
