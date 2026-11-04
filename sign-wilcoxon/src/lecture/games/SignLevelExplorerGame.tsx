import { useMemo, useState } from "react";
import { binomRangeProb, formatNum, formatPct } from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/** Two-sided sign-test Type I error explorer for W ~ Bin(n, 1/2). */
export function SignLevelExplorerGame() {
  const print = usePrintMode();
  const [n, setN] = useState(20);
  const [lo, setLo] = useState(5);
  const [hi, setHi] = useState(15);

  const safeLo = clamp(lo, 0, Math.floor(n / 2));
  const safeHi = clamp(Math.max(hi, n - safeLo), Math.ceil(n / 2), n);

  const alpha = useMemo(() => {
    const left = binomRangeProb(n, 0, safeLo, 0.5);
    const right = binomRangeProb(n, safeHi, n, 0.5);
    return left + right;
  }, [n, safeLo, safeHi]);

  return (
    <SceneFrame kicker="Game" title="Sign-test level explorer" tone="gold">
      <p>
        For a two-sided sign test of <MathText text="$H_0:m=m_0$" />, let{" "}
        <MathText text="$W\sim\mathrm{Bin}(n,1/2)$" /> under <MathText text="$H_0$" /> and take critical region{" "}
        <MathText text="$\{W\le a\}\cup\{W\ge b\}$" />. The Type I error is{" "}
        <MathText text="$\alpha=\Pr(W\le a)+\Pr(W\ge b)$" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex="n" />
            <input
              type="range"
              min={8}
              max={40}
              value={n}
              onChange={(e) => {
                const next = Number(e.target.value);
                setN(next);
                setLo((cur) => clamp(cur, 0, Math.floor(next / 2)));
                setHi((cur) => clamp(cur, Math.ceil(next / 2), next));
              }}
            />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="a" />
            <input
              type="range"
              min={0}
              max={Math.floor(n / 2)}
              value={safeLo}
              onChange={(e) => setLo(Number(e.target.value))}
            />
            <span>{safeLo}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="b" />
            <input
              type="range"
              min={Math.ceil(n / 2)}
              max={n}
              value={safeHi}
              onChange={(e) => setHi(Number(e.target.value))}
            />
            <span>{safeHi}</span>
          </label>
        </div>
      ) : null}
      <Formula
        tex={String.raw`C=\{w\le ${safeLo}\}\cup\{w\ge ${safeHi}\},\qquad
\alpha=\Pr(W\le ${safeLo})+\Pr(W\ge ${safeHi})=${formatNum(alpha, 4)}.`}
      />
      <p>
        Approximate significance level: <strong>{formatPct(alpha)}</strong>
        {n === 20 && safeLo === 5 && safeHi === 15 ? (
          <>
            {" "}
            (matches the lecture example <MathText text="$\alpha\approx 0.0414$" />).
          </>
        ) : null}
        .
      </p>
    </SceneFrame>
  );
}
