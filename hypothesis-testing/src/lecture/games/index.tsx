import { useMemo, useState } from "react";
import { formatNum, normCdf, zOneSided } from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";
import { ConceptQuiz } from "./ConceptQuiz";
import {
  ERRORS_QUIZ,
  ERRORS_QUIZ_INTRO,
  POWER_QUIZ,
  POWER_QUIZ_INTRO,
  PVALUE_QUIZ,
  PVALUE_QUIZ_INTRO,
} from "./quizBanks";

export function ErrorsConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="errors"
      title="Concept check: hypotheses and errors"
      intro={ERRORS_QUIZ_INTRO}
      questions={ERRORS_QUIZ}
    />
  );
}

export function PValueConceptQuiz() {
  return (
    <ConceptQuiz quizId="pvalue" title="Concept check: p-values" intro={PVALUE_QUIZ_INTRO} questions={PVALUE_QUIZ} />
  );
}

export function PowerConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="power"
      title="Concept check: power functions"
      intro={POWER_QUIZ_INTRO}
      questions={POWER_QUIZ}
    />
  );
}

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
            <InlineMath tex="n" />
            <input type="range" min={4} max={64} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="c" />
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
  const mu1 = 60 + delta;

  const muMin = 60;
  const muMax = 76;
  const padL = 58;
  const padR = 28;
  const padT = 22;
  const padB = 46;
  const width = 640;
  const height = 250;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const xOf = (mu: number) => padL + ((mu - muMin) / (muMax - muMin)) * plotW;
  const yOf = (k: number) => padT + (1 - Math.min(1, Math.max(0, k))) * plotH;

  const curve = useMemo(() => {
    return Array.from({ length: 81 }, (_, i) => {
      const mu = muMin + (i / 80) * (muMax - muMin);
      const k = normCdf((mu - 60) / (sigma / Math.sqrt(n)) - z);
      return { mu, k };
    });
  }, [n, z]);

  const xTicks = [60, 64, 68, 72, 76];
  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const pointX = xOf(mu1);
  const pointY = yOf(power);
  const alphaY = yOf(alpha);

  return (
    <SceneFrame kicker="Game" title="Power of an upper-tailed $z$ test" tone="gold">
      <p>
        <MathText text="$H_0:\mu\leq 60$ vs $H_1:\mu>60$, $\sigma=10$." />{" "}
        <MathText text="$K(\mu_1)=\Phi((\mu_1-60)/(\sigma/\sqrt{n})-z_\alpha)$." /> The orange curve is{" "}
        <InlineMath tex="K(\mu)" />; the dot marks your chosen <InlineMath tex="\mu_1" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex="n" />
            <input type="range" min={5} max={120} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="\mu_1-60" />
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
            <InlineMath tex="\alpha" />
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
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Power curve with axes">
          {/* Grid */}
          {yTicks.map((tick) => (
            <line
              key={`yg-${tick}`}
              x1={padL}
              y1={yOf(tick)}
              x2={padL + plotW}
              y2={yOf(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          {xTicks.map((tick) => (
            <line
              key={`xg-${tick}`}
              x1={xOf(tick)}
              y1={padT}
              x2={xOf(tick)}
              y2={padT + plotH}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          {/* Axes */}
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#111" strokeWidth="2" />
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#111" strokeWidth="2" />
          <polygon
            points={`${padL + plotW},${padT + plotH} ${padL + plotW - 8},${padT + plotH - 4} ${padL + plotW - 8},${padT + plotH + 4}`}
            fill="#111"
          />
          <polygon points={`${padL},${padT} ${padL - 4},${padT + 8} ${padL + 4},${padT + 8}`} fill="#111" />
          {/* Reference: K(μ)=α at μ=60 */}
          <line
            x1={padL}
            y1={alphaY}
            x2={padL + plotW}
            y2={alphaY}
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <line
            x1={xOf(60)}
            y1={padT}
            x2={xOf(60)}
            y2={padT + plotH}
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          {/* Power curve */}
          <polyline
            fill="none"
            stroke="#c45c26"
            strokeWidth="3"
            points={curve.map((row) => `${xOf(row.mu)},${yOf(row.k)}`).join(" ")}
          />
          {/* Current μ₁ marker */}
          <line
            x1={pointX}
            y1={padT + plotH}
            x2={pointX}
            y2={pointY}
            stroke="#111"
            strokeWidth="1.25"
            strokeDasharray="3 3"
          />
          <circle cx={pointX} cy={pointY} r="6" fill="#c45c26" stroke="#111" strokeWidth="1.5" />
          {/* Tick labels */}
          {xTicks.map((tick) => (
            <g key={`xt-${tick}`}>
              <line x1={xOf(tick)} y1={padT + plotH} x2={xOf(tick)} y2={padT + plotH + 6} stroke="#111" />
              <text x={xOf(tick)} y={padT + plotH + 20} textAnchor="middle" fontSize="12" fill="#374151">
                {tick}
              </text>
            </g>
          ))}
          {yTicks.map((tick) => (
            <g key={`yt-${tick}`}>
              <line x1={padL - 6} y1={yOf(tick)} x2={padL} y2={yOf(tick)} stroke="#111" />
              <text x={padL - 10} y={yOf(tick) + 4} textAnchor="end" fontSize="12" fill="#374151">
                {tick === 0 || tick === 1 ? String(tick) : tick.toFixed(2)}
              </text>
            </g>
          ))}
          <text x={padL + plotW / 2} y={height - 4} textAnchor="middle" fontSize="13" fill="#111">
            μ
          </text>
          <text
            x={14}
            y={padT + plotH / 2}
            textAnchor="middle"
            fontSize="13"
            fill="#111"
            transform={`rotate(-90 14 ${padT + plotH / 2})`}
          >
            K(μ)
          </text>
          <text x={padL + plotW - 4} y={alphaY - 6} textAnchor="end" fontSize="11" fill="#6366f1">
            {`α = ${formatNum(alpha, 3)}`}
          </text>
          <text x={pointX + 10} y={pointY - 10} fontSize="12" fill="#111">
            {`(μ₁, K) = (${formatNum(mu1, 1)}, ${formatNum(power, 3)})`}
          </text>
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
    <SceneFrame kicker="Game" title="One-proportion $z$ test" tone="gold">
      <p>
        <MathText text="$t=(\hat{p}-p_0)/\sqrt{p_0(1-p_0)/n}$." /> The dice example is the default.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex="n" />
            <input type="range" min={50} max={8000} step={50} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="y" />
            <input type="range" min={0} max={n} value={Math.min(y, n)} onChange={(e) => setY(Number(e.target.value))} />
            <span>{Math.min(y, n)}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex="p_0" />
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
