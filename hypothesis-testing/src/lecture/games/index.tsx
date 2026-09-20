import { useMemo, useState } from "react";
import { formatNum, normCdf, zOneSided } from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

export function SteelCutoffGame() {
  const print = usePrintMode();
  const [cutoff, setCutoff] = useState(53);
  const [n, setN] = useState(16);
  const se = 6 / Math.sqrt(n);
  const alpha = 1 - normCdf((cutoff - 50) / se);
  const beta = normCdf((cutoff - 55) / se);

  return (
    <SceneFrame kicker="Game" title="Steel bars: move the cutoff" tone="gold">
      <p>
        <MathText text="$H_0:\mu=50$ vs $H_1:\mu=55$, $\sigma=6$, reject when $\bar{x}\geq c$." /> Moving{" "}
        <InlineMath tex="c" /> trades <InlineMath tex="\alpha" /> against <InlineMath tex="\beta" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={4} max={64} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            c
            <input
              type="range"
              min={50}
              max={58}
              step={0.1}
              value={cutoff}
              onChange={(e) => setCutoff(Number(e.target.value))}
            />
            <span>{formatNum(cutoff, 1)}</span>
          </label>
        </div>
      ) : null}
      <Formula
        tex={String.raw`\alpha=${formatNum(alpha, 4)},\quad \beta=${formatNum(beta, 4)},\quad 1-\beta=${formatNum(1 - beta, 4)}.`}
      />
    </SceneFrame>
  );
}

export function PowerExplorerGame() {
  const print = usePrintMode();
  const [n, setN] = useState(25);
  const [delta, setDelta] = useState(5);
  const [alpha, setAlpha] = useState(0.05);
  const sigma = 10;
  const z = zOneSided(alpha);
  const power = normCdf(delta / (sigma / Math.sqrt(n)) - z);

  const curve = useMemo(() => {
    return Array.from({ length: 41 }, (_, i) => {
      const mu = 60 + i * 0.4;
      const k = normCdf((mu - 60) / (sigma / Math.sqrt(n)) - z);
      return { mu, k };
    });
  }, [n, z]);

  return (
    <SceneFrame kicker="Game" title="Power of an upper-tailed z test" tone="gold">
      <p>
        <MathText text="$H_0:\mu\leq 60$ vs $H_1:\mu>60$, $\sigma=10$." />{" "}
        <MathText text="$K(\mu_1)=\Phi((\mu_1-60)/(\sigma/\sqrt{n})-z_\alpha)$." />
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={5} max={120} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            μ₁ − 60
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={delta}
              onChange={(e) => setDelta(Number(e.target.value))}
            />
            <span>{delta}</span>
          </label>
          <label className={styles.small}>
            α
            <select value={alpha} onChange={(e) => setAlpha(Number(e.target.value))}>
              <option value={0.1}>0.10</option>
              <option value={0.05}>0.05</option>
              <option value={0.025}>0.025</option>
              <option value={0.01}>0.01</option>
            </select>
          </label>
        </div>
      ) : null}
      <Formula tex={String.raw`K(60+\Delta)=\Phi\left(\frac{${delta}}{10/\sqrt{${n}}}-${formatNum(z, 3)}\right)=${formatNum(power, 3)}.`} />
      <figure className={styles.chartCard}>
        <svg viewBox="0 0 640 220" role="img" aria-label="Power curve">
          <line x1="40" y1="180" x2="600" y2="180" stroke="#111" />
          <polyline
            fill="none"
            stroke="#c45c26"
            strokeWidth="3"
            points={curve.map((row, i) => `${40 + i * 14},${180 - row.k * 150}`).join(" ")}
          />
        </svg>
      </figure>
    </SceneFrame>
  );
}

export function ProportionTestGame() {
  const print = usePrintMode();
  const [n, setN] = useState(8000);
  const [y, setY] = useState(1389);
  const [p0, setP0] = useState(1 / 6);
  const phat = y / n;
  const se = Math.sqrt((p0 * (1 - p0)) / n);
  const t = (phat - p0) / se;
  const pTwo = 2 * (1 - normCdf(Math.abs(t)));

  return (
    <SceneFrame kicker="Game" title="One-proportion z test" tone="gold">
      <p>
        <MathText text="$t=(\hat{p}-p_0)/\sqrt{p_0(1-p_0)/n}$." /> The dice example is the default.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={50} max={8000} step={50} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            y
            <input type="range" min={0} max={n} value={Math.min(y, n)} onChange={(e) => setY(Number(e.target.value))} />
            <span>{Math.min(y, n)}</span>
          </label>
          <label className={styles.small}>
            p₀
            <input
              type="range"
              min={0.05}
              max={0.95}
              step={0.01}
              value={p0}
              onChange={(e) => setP0(Number(e.target.value))}
            />
            <span>{formatNum(p0, 2)}</span>
          </label>
        </div>
      ) : null}
      <Formula
        tex={String.raw`\hat{p}=${formatNum(phat, 4)},\quad t=${formatNum(t, 3)},\quad 2\Pr(Z>|t|)=${formatNum(pTwo, 4)}.`}
      />
    </SceneFrame>
  );
}
