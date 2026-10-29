import { useMemo, useState } from "react";
import { createRng, formatNum, invNorm, sampleNormal } from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

type DistKind = "normal" | "exp" | "t3";

function sampleFrom(kind: DistKind, rng: () => number): number {
  if (kind === "normal") return sampleNormal(0, 1, rng);
  if (kind === "exp") return -Math.log(Math.max(1e-12, rng()));
  // Student-t with 3 df via normal / sqrt(chi^2_3 / 3)
  const z = sampleNormal(0, 1, rng);
  const g1 = sampleNormal(0, 1, rng);
  const g2 = sampleNormal(0, 1, rng);
  const g3 = sampleNormal(0, 1, rng);
  const chi = g1 * g1 + g2 * g2 + g3 * g3;
  return z / Math.sqrt(chi / 3);
}

export function QqExplorerGame() {
  const print = usePrintMode();
  const [kind, setKind] = useState<DistKind>("normal");
  const [n, setN] = useState(40);
  const [seed, setSeed] = useState(7);

  const points = useMemo(() => {
    const rng = createRng(seed * 10007 + n * 13 + (kind === "normal" ? 1 : kind === "exp" ? 2 : 3));
    const sample = Array.from({ length: n }, () => sampleFrom(kind, rng)).sort((a, b) => a - b);
    return sample.map((x, i) => {
      const p = (i + 1) / (n + 1);
      return { x, y: invNorm(p), p };
    });
  }, [kind, n, seed]);

  const pad = 36;
  const W = 520;
  const H = 360;
  const xs = points.map((p) => p.y);
  const ys = points.map((p) => p.x);
  const minX = Math.min(...xs, ...ys) - 0.5;
  const maxX = Math.max(...xs, ...ys) + 0.5;
  const minY = minX;
  const maxY = maxX;
  const sx = (v: number) => pad + ((v - minX) / (maxX - minX)) * (W - 2 * pad);
  const sy = (v: number) => H - pad - ((v - minY) / (maxY - minY)) * (H - 2 * pad);

  return (
    <SceneFrame kicker="Game" title="Q-Q explorer vs $N(0,1)$" tone="gold">
      <p>
        Draw a fresh sample and plot sample quantiles against standard normal theoretical quantiles{" "}
        <MathText text="$\Phi^{-1}(i/(n+1))$" />. When the data are (nearly) normal, points hug the
        diagonal.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            Data from
            <select value={kind} onChange={(e) => setKind(e.target.value as DistKind)}>
              <option value="normal">N(0,1)</option>
              <option value="exp">Exp(1)</option>
              <option value="t3">t (df = 3)</option>
            </select>
          </label>
          <label className={styles.small}>
            <InlineMath tex="n" />
            <input type="range" min={10} max={80} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <button className={styles.toolBtn} type="button" onClick={() => setSeed((s) => s + 1)}>
            Resample
          </button>
        </div>
      ) : null}
      <Formula
        tex={String.raw`\text{reference }=N(0,1),\quad
\text{sample from }=
${kind === "normal" ? "N(0,1)" : kind === "exp" ? "\\mathrm{Exp}(1)" : "t_3"}.`}
      />
      <figure className={styles.chartCard}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Interactive Q-Q plot">
          <line x1={sx(minX)} y1={sy(minY)} x2={sx(maxX)} y2={sy(maxY)} stroke="#6366f1" strokeWidth="2" strokeDasharray="5 4" />
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#111" strokeWidth="2" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#111" strokeWidth="2" />
          {points.map((pt, i) => (
            <circle key={i} cx={sx(pt.y)} cy={sy(pt.x)} r="3.5" fill="#c45c26" stroke="#111" strokeWidth="0.8" />
          ))}
          <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="13">
            Theoretical N(0,1) quantile
          </text>
          <text
            x={14}
            y={H / 2}
            textAnchor="middle"
            fontSize="13"
            transform={`rotate(-90 14 ${H / 2})`}
          >
            Sample quantile
          </text>
        </svg>
      </figure>
      <p className={styles.muted}>
        Tip: Exp(1) bends with a heavy right tail; <InlineMath tex="t_3" /> shows heavier extremes than{" "}
        <InlineMath tex="N(0,1)" />. First sample quantile ≈ {formatNum(points[0]?.x ?? 0, 2)}.
      </p>
    </SceneFrame>
  );
}
