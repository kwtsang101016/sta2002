import { useMemo, useState } from "react";
import {
  createRng,
  formatNum,
  mean,
  sampleMeanSdSkew,
  sampleNormal,
  tCrit,
  varianceN1,
  zCrit,
} from "../../utils";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Block, Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

export function ZIntervalGame() {
  const print = usePrintMode();
  const [n, setN] = useState(27);
  const [sigma, setSigma] = useState(36);
  const [xbar, setXbar] = useState(1478);
  const [conf, setConf] = useState(0.95);

  const alpha = 1 - conf;
  const z = zCrit(alpha);
  const half = z * (sigma / Math.sqrt(n));
  const lo = xbar - half;
  const hi = xbar + half;

  return (
    <SceneFrame kicker="Game" title="z-interval explorer" tone="gold">
      <p>
        Explore Case&nbsp;1: <MathText text="$\bar x\pm z_{\alpha/2}\sigma/\sqrt{n}$" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={5} max={200} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`\sigma`} />
            <input
              type="range"
              min={5}
              max={80}
              value={sigma}
              onChange={(e) => setSigma(Number(e.target.value))}
            />
            <span>{sigma}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`\bar{x}`} />
            <input
              type="range"
              min={1400}
              max={1550}
              value={xbar}
              onChange={(e) => setXbar(Number(e.target.value))}
            />
            <span>{xbar}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`1-\alpha`} />
            <select value={conf} onChange={(e) => setConf(Number(e.target.value))}>
              <option value={0.9}>90%</option>
              <option value={0.95}>95%</option>
              <option value={0.99}>99%</option>
            </select>
          </label>
        </div>
      ) : null}
      <Formula
        tex={String.raw`z_{\alpha/2}=${formatNum(z, 3)},\quad
\text{CI}=[${formatNum(lo)},\,${formatNum(hi)}],\quad
\text{width}=${formatNum(2 * half)}`}
      />
      <CiBar lo={lo} hi={hi} center={xbar} domain={[1280, 1680]} />
      <p className={styles.muted}>The bar uses a fixed scale from 1280 to 1680, so its length and position change with the sliders.</p>
    </SceneFrame>
  );
}

export function CoverageGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(7);
  const [n, setN] = useState(20);
  const [reps, setReps] = useState(40);
  const mu = 50;
  const sigma = 10;
  const conf = 0.95;

  const intervals = useMemo(() => {
    const rng = createRng(seed);
    const z = zCrit(1 - conf);
    return Array.from({ length: reps }, () => {
      const sample = Array.from({ length: n }, () => sampleNormal(mu, sigma, rng));
      const xbar = mean(sample);
      const half = z * (sigma / Math.sqrt(n));
      const lo = xbar - half;
      const hi = xbar + half;
      return { lo, hi, covers: lo <= mu && mu <= hi };
    });
  }, [seed, n, reps]);

  const rate = intervals.filter((row) => row.covers).length / intervals.length;

  return (
    <SceneFrame kicker="Game" title="What does 95% coverage mean?" tone="gold">
      <p>
        True mean <MathText text="$\mu=50$" />, known <MathText text="$\sigma=10$" />, normal
        parent. Each bar is one simulated CI; green covers <MathText text="$\mu$" />, red misses.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={5} max={80} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            intervals
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
            />
            <span>{reps}</span>
          </label>
          <button type="button" className={styles.toolBtn} onClick={() => setSeed((s) => s + 1)}>
            Resample
          </button>
        </div>
      ) : null}
      <p>
        Empirical coverage: <strong>{formatNum(100 * rate, 1)}%</strong> (target ~ 95%)
      </p>
      <figure className={styles.chartCard}>
        <svg
          viewBox={`0 0 640 ${Math.max(120, reps * 6 + 20)}`}
          className={styles.chartSvg}
          role="img"
          aria-label="Simulated confidence intervals"
        >
          <line x1={320} y1={0} x2={320} y2={reps * 6 + 10} stroke="#333" strokeWidth={2} />
          {intervals.map((row, i) => {
            const scale = (v: number) => 320 + (v - mu) * 8;
            return (
              <line
                key={i}
                x1={scale(row.lo)}
                x2={scale(row.hi)}
                y1={10 + i * 6}
                y2={10 + i * 6}
                stroke={row.covers ? "#2a7a4b" : "#b33"}
                strokeWidth={3}
              />
            );
          })}
        </svg>
      </figure>
    </SceneFrame>
  );
}

/**
 * Case 1 vs Case 2 reliability: same z-interval formula, coverage depends on n and skewness.
 */
export function CltCoverageGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(11);
  const [n, setN] = useState(15);
  const [skew, setSkew] = useState(1.5);
  const [conf, setConf] = useState(0.95);
  const [trials, setTrials] = useState(400);
  const mu = 50;
  const sigma = 10;
  const showBars = 36;

  const sim = useMemo(() => {
    const rng = createRng(seed);
    const z = zCrit(1 - conf);
    const halfWidth = z * (sigma / Math.sqrt(n));
    let hits = 0;
    const bars: { lo: number; hi: number; covers: boolean }[] = [];
    for (let t = 0; t < trials; t += 1) {
      const sample = Array.from({ length: n }, () => sampleMeanSdSkew(mu, sigma, skew, rng));
      const xbar = mean(sample);
      const lo = xbar - halfWidth;
      const hi = xbar + halfWidth;
      const covers = lo <= mu && mu <= hi;
      if (covers) hits += 1;
      if (t < showBars) bars.push({ lo, hi, covers });
    }
    const histRng = createRng(seed + 999);
    const cloud = Array.from({ length: 1200 }, () => sampleMeanSdSkew(mu, sigma, skew, histRng));
    const loX = mu - 3.5 * sigma;
    const hiX = mu + 3.5 * sigma;
    const bins = 28;
    const width = (hiX - loX) / bins;
    const counts = Array.from({ length: bins }, () => 0);
    for (const value of cloud) {
      if (value < loX || value >= hiX) continue;
      counts[Math.min(bins - 1, Math.floor((value - loX) / width))] += 1;
    }
    const maxCount = Math.max(...counts, 1);
    return {
      rate: hits / trials,
      bars,
      halfWidth,
      hist: counts.map((count, i) => ({
        x0: loX + i * width,
        x1: loX + (i + 1) * width,
        h: count / maxCount,
      })),
    };
  }, [seed, n, skew, conf, trials]);

  const skewLabel =
    Math.abs(skew) < 0.12 ? "≈ normal (Case 1 exact)" : skew > 0 ? "right-skewed" : "left-skewed";

  return (
    <SceneFrame kicker="Game" title="CLT coverage explorer" tone="gold">
      <p>
        Cases 1 and 2 use the <strong>same</strong> formula{" "}
        <MathText text="$\bar x\pm z_{\alpha/2}\sigma/\sqrt{n}$" /> when{" "}
        <MathText text="$\sigma$" /> is known. Reliability under the CLT depends on{" "}
        <MathText text="$n$" /> and skewness of the parent. True{" "}
        <MathText text="$\mu=50$" />, <MathText text="$\sigma=10$" /> (known).
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={5} max={200} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            skewness
            <input
              type="range"
              min={-2}
              max={2}
              step={0.1}
              value={skew}
              onChange={(e) => setSkew(Number(e.target.value))}
            />
            <span>{formatNum(skew, 1)}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`1-\alpha`} />
            <select value={conf} onChange={(e) => setConf(Number(e.target.value))}>
              <option value={0.9}>90%</option>
              <option value={0.95}>95%</option>
              <option value={0.99}>99%</option>
            </select>
          </label>
          <label className={styles.small}>
            trials
            <input
              type="range"
              min={100}
              max={800}
              step={50}
              value={trials}
              onChange={(e) => setTrials(Number(e.target.value))}
            />
            <span>{trials}</span>
          </label>
          <button type="button" className={styles.toolBtn} onClick={() => setSeed((s) => s + 1)}>
            Resample
          </button>
        </div>
      ) : null}
      <p>
        Parent shape: <strong>{skewLabel}</strong>. Empirical coverage over {trials} samples:{" "}
        <strong>{formatNum(100 * sim.rate, 1)}%</strong> (target {formatNum(100 * conf, 0)}%).
      </p>
      <div className={styles.twoCol}>
        <figure className={styles.chartCard}>
          <p className={styles.kicker}>PARENT (sketch)</p>
          <svg viewBox="0 0 320 120" className={styles.chartSvg} role="img" aria-label="Parent histogram">
            {sim.hist.map((bin, i) => {
              const x = (i / sim.hist.length) * 300 + 10;
              const barW = 300 / sim.hist.length - 1;
              const h = bin.h * 90;
              return (
                <rect key={i} x={x} y={100 - h} width={barW} height={h} fill="#4c6ef5" opacity={0.85} />
              );
            })}
            <line x1={160} y1={8} x2={160} y2={105} stroke="#e11d48" strokeWidth={2} />
            <text x={164} y={18} fontSize={10} fill="#e11d48">
              mu
            </text>
          </svg>
        </figure>
        <figure className={styles.chartCard}>
          <p className={styles.kicker}>SAMPLE OF INTERVALS</p>
          <svg
            viewBox={`0 0 320 ${showBars * 5 + 16}`}
            className={styles.chartSvg}
            role="img"
            aria-label="Sample of confidence intervals"
          >
            <line x1={160} y1={0} x2={160} y2={showBars * 5 + 8} stroke="#333" strokeWidth={2} />
            {sim.bars.map((row, i) => {
              const scale = (v: number) => 160 + (v - mu) * 4;
              return (
                <line
                  key={i}
                  x1={scale(row.lo)}
                  x2={scale(row.hi)}
                  y1={8 + i * 5}
                  y2={8 + i * 5}
                  stroke={row.covers ? "#2a7a4b" : "#b33"}
                  strokeWidth={2.5}
                />
              );
            })}
          </svg>
        </figure>
      </div>
      <p className={styles.muted} style={{ marginTop: 12 }}>
        Try small <MathText text="$n$" /> with large |skewness|: coverage often drifts from the
        nominal level. Increase <MathText text="$n$" /> — CLT kicks in and coverage recovers. Near
        zero skewness, even modest <MathText text="$n$" /> looks like Case&nbsp;1.
      </p>
    </SceneFrame>
  );
}

export function TVsZGame() {
  const print = usePrintMode();
  const [df, setDf] = useState(19);
  const [conf, setConf] = useState(0.9);
  const alpha = 1 - conf;
  const z = zCrit(alpha);
  const t = tCrit(alpha, df);

  return (
    <SceneFrame kicker="Game" title="z vs t critical values" tone="gold">
      <p>
        For the same confidence level, <MathText text="$t_{\alpha/2}(\nu)>z_{\alpha/2}$" />; the gap
        shrinks as degrees of freedom grow.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex={String.raw`\nu=n-1`} />
            <input type="range" min={2} max={120} value={df} onChange={(e) => setDf(Number(e.target.value))} />
            <span>{df}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`1-\alpha`} />
            <select value={conf} onChange={(e) => setConf(Number(e.target.value))}>
              <option value={0.9}>90%</option>
              <option value={0.95}>95%</option>
              <option value={0.99}>99%</option>
            </select>
          </label>
        </div>
      ) : null}
      <Formula
        tex={String.raw`z_{\alpha/2}=${formatNum(z, 3)},\quad
t_{\alpha/2}(${df})=${formatNum(t, 3)},\quad
\text{ratio }t/z=${formatNum(t / z, 3)}`}
      />
    </SceneFrame>
  );
}

export function TwoSampleGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(21);
  const [rho, setRho] = useState(0.7);
  const [nPairs, setNPairs] = useState(12);
  const muX = 0.37;
  const muY = 0.43;
  const sigmaX = 0.11;
  const sigmaY = 0.12;
  const conf = 0.95;
  const alpha = 1 - conf;

  const sim = useMemo(() => {
    const rng = createRng(seed);
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i < nPairs; i += 1) {
      const z1 = sampleNormal(0, 1, rng);
      const z2 = sampleNormal(0, 1, rng);
      const e1 = z1;
      const e2 = rho * z1 + Math.sqrt(Math.max(0, 1 - rho * rho)) * z2;
      x.push(muX + sigmaX * e1);
      y.push(muY + sigmaY * e2);
    }
    const d = x.map((xi, i) => xi - y[i]);
    const n = x.length;
    const m = y.length;
    const xbar = mean(x);
    const ybar = mean(y);
    const sx2 = varianceN1(x);
    const sy2 = varianceN1(y);
    const dbar = mean(d);
    const sd = Math.sqrt(varianceN1(d));
    const sp = Math.sqrt(((n - 1) * sx2 + (m - 1) * sy2) / (n + m - 2));
    const sePooled = sp * Math.sqrt(1 / n + 1 / m);
    const seWelch = Math.sqrt(sx2 / n + sy2 / m);
    const rWelch = Math.max(
      1,
      Math.floor(seWelch ** 4 / ((1 / (n - 1)) * (sx2 / n) ** 2 + (1 / (m - 1)) * (sy2 / m) ** 2)),
    );

    let cov = 0;
    for (let i = 0; i < n; i += 1) cov += (x[i] - xbar) * (y[i] - ybar);
    cov /= n - 1;
    const empRho = cov / Math.sqrt(sx2 * sy2);

    const halfPooled = tCrit(alpha, n + m - 2) * sePooled;
    const halfWelch = tCrit(alpha, rWelch) * seWelch;
    const halfPaired = tCrit(alpha, n - 1) * (sd / Math.sqrt(n));
    const center = dbar;

    return {
      empRho,
      sd,
      center,
      halfPooled,
      halfWelch,
      halfPaired,
      widthPooled: 2 * halfPooled,
      widthWelch: 2 * halfWelch,
      widthPaired: 2 * halfPaired,
      rWelch,
      n,
    };
  }, [seed, rho, nPairs, alpha]);

  const narrowest =
    sim.widthPaired <= sim.widthPooled && sim.widthPaired <= sim.widthWelch
      ? "paired"
      : sim.widthPooled <= sim.widthWelch
        ? "pooled"
        : "Welch";

  const tip =
    rho > 0.25
      ? "Positive correlation shrinks Var(X−Y); pairing usually wins."
      : rho < -0.25
        ? "Negative correlation inflates Var(X−Y); pairing can be wider than unpaired methods."
        : "Near-zero correlation: pairing gives little (or no) width gain.";

  return (
    <SceneFrame kicker="Game" title="Pooled vs Welch vs paired" tone="gold">
      <p>
        Simulate paired outcomes with correlation <MathText text="$\rho=\mathrm{Corr}(X,Y)$" />.
        Recall <MathText text="$\mathrm{Var}(X-Y)=\sigma_X^2+\sigma_Y^2-2\rho\sigma_X\sigma_Y$" /> —
        positive <MathText text="$\rho$" /> makes paired CIs narrower; negative{" "}
        <MathText text="$\rho$" /> can make them wider.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex={String.raw`\rho`} />
            <input
              type="range"
              min={-0.9}
              max={0.9}
              step={0.05}
              value={rho}
              onChange={(e) => setRho(Number(e.target.value))}
            />
            <span>{formatNum(rho, 2)}</span>
          </label>
          <label className={styles.small}>
            n pairs
            <input
              type="range"
              min={6}
              max={40}
              value={nPairs}
              onChange={(e) => setNPairs(Number(e.target.value))}
            />
            <span>{nPairs}</span>
          </label>
          <button type="button" className={styles.toolBtn} onClick={() => setSeed((s) => s + 1)}>
            Resample
          </button>
        </div>
      ) : null}
      <p>
        Sample corr ≈ <strong>{formatNum(sim.empRho, 2)}</strong> ·{" "}
        <InlineMath tex={String.raw`s_D=${formatNum(sim.sd, 4)}`} /> · narrowest this draw:{" "}
        <strong>{narrowest}</strong>
      </p>
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>95% CI WIDTHS</p>
          <WidthRow label={`Pooled (df=${2 * sim.n - 2})`} width={sim.widthPooled} max={Math.max(sim.widthPooled, sim.widthWelch, sim.widthPaired)} />
          <WidthRow label={`Welch (df≈${sim.rWelch})`} width={sim.widthWelch} max={Math.max(sim.widthPooled, sim.widthWelch, sim.widthPaired)} />
          <WidthRow label={`Paired (df=${sim.n - 1})`} width={sim.widthPaired} max={Math.max(sim.widthPooled, sim.widthWelch, sim.widthPaired)} />
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>PAIRED INTERVAL</p>
          <p>
            [{formatNum(sim.center - sim.halfPaired, 4)}, {formatNum(sim.center + sim.halfPaired, 4)}]
          </p>
          <CiBar
            lo={sim.center - sim.halfPaired}
            hi={sim.center + sim.halfPaired}
            center={sim.center}
          />
          <p className={styles.muted} style={{ marginTop: 10 }}>
            {tip}
          </p>
        </div>
      </div>
    </SceneFrame>
  );
}

function WidthRow({ label, width, max }: { label: string; width: number; max: number }) {
  const pct = max > 0 ? (100 * width) / max : 0;
  return (
    <div className={styles.metricRow}>
      <b>{label}</b>
      <div>
        <div className={styles.barTrack}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.small}>{formatNum(width, 4)}</span>
      </div>
    </div>
  );
}

export function PropCiGame() {
  const print = usePrintMode();
  const [n, setN] = useState(40);
  const [y, setY] = useState(22);
  const [conf, setConf] = useState(0.95);
  const yClamped = Math.min(y, n);
  const phat = n > 0 ? yClamped / n : 0;
  const plugIn = phat * (1 - phat); // Bernoulli / MLE variance of one X_i
  const s2 = n > 1 ? (n / (n - 1)) * plugIn : 0; // sample variance of 0-1 data
  const alpha = 1 - conf;
  const z = zCrit(alpha);
  const t = tCrit(alpha, Math.max(1, n - 1));

  const seWald = Math.sqrt(plugIn / n);
  const halfWald = z * seWald;
  const seMean = Math.sqrt(s2 / n); // = sqrt(plugIn/(n-1))
  const halfMeanZ = z * seMean;
  const halfMeanT = t * seMean;

  return (
    <SceneFrame kicker="Game" title="Proportion CI: plug-in vs sample variance" tone="gold">
      <p>
        For 0–1 data, the usual proportion CI plugs in the Bernoulli variance{" "}
        <MathText text="$\hat p(1-\hat p)$" />. Treating the same data as a mean with unknown
        variance uses the sample variance{" "}
        <MathText text="$s^2=\frac{1}{n-1}\sum(X_i-\bar X)^2$" /> instead.
      </p>
      <Formula
        tex={String.raw`\text{For binary data:}\quad
s^2=\dfrac{n}{n-1}\hat p(1-\hat p)
\;\ge\;
\hat p(1-\hat p).`}
      />
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            n
            <input type="range" min={10} max={400} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            successes y
            <input
              type="range"
              min={0}
              max={n}
              value={yClamped}
              onChange={(e) => setY(Number(e.target.value))}
            />
            <span>{yClamped}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`1-\alpha`} />
            <select value={conf} onChange={(e) => setConf(Number(e.target.value))}>
              <option value={0.9}>90%</option>
              <option value={0.95}>95%</option>
              <option value={0.99}>99%</option>
            </select>
          </label>
        </div>
      ) : null}
      <p>
        <InlineMath tex={String.raw`\hat p=${formatNum(phat, 3)}`} /> ·{" "}
        <InlineMath tex={String.raw`\hat p(1-\hat p)=${formatNum(plugIn, 4)}`} /> ·{" "}
        <InlineMath tex={String.raw`s^2=${formatNum(s2, 4)}`} />{" "}
        <span className={styles.muted}>
          (ratio s² / plug-in = {n > 1 ? formatNum(n / (n - 1), 3) : "—"})
        </span>
      </p>
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>PROPORTION (WALD)</p>
          <Formula tex={String.raw`\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}`} />
          <p>
            [{formatNum(phat - halfWald, 4)}, {formatNum(phat + halfWald, 4)}]
          </p>
          <p className={styles.small}>width {formatNum(2 * halfWald, 4)}</p>
          <CiBar lo={phat - halfWald} hi={phat + halfWald} center={phat} />
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>MEAN-STYLE (USE s)</p>
          <Formula tex={String.raw`\hat p\pm t_{\alpha/2}(n-1)\,s/\sqrt{n}`} />
          <p>
            [{formatNum(phat - halfMeanT, 4)}, {formatNum(phat + halfMeanT, 4)}]
          </p>
          <p className={styles.small}>
            width {formatNum(2 * halfMeanT, 4)} · if z not t: width {formatNum(2 * halfMeanZ, 4)}
          </p>
          <CiBar lo={phat - halfMeanT} hi={phat + halfMeanT} center={phat} />
        </div>
      </div>
      <p className={styles.muted} style={{ marginTop: 12 }}>
        So yes: on binary data the plug-in Bernoulli variance is always ≤ the unbiased sample
        variance (factor <MathText text="$(n-1)/n$" />). The usual proportion CI is therefore a bit
        shorter than a Case&nbsp;4–style mean CI on the same 0–1 sample; the gap shrinks as{" "}
        <MathText text="$n$" /> grows. (Compared with the <em>true</em>{" "}
        <MathText text="$p(1-p)$" />, the random <MathText text="$s^2$" /> can go either way.)
      </p>
    </SceneFrame>
  );
}

export function SampleSizeGame() {
  const print = usePrintMode();
  const [sigma, setSigma] = useState(12);
  const [eps, setEps] = useState(2);
  const [conf, setConf] = useState(0.95);
  const z = zCrit(1 - conf);
  const nRaw = (z * z * sigma * sigma) / (eps * eps);
  const n = Math.ceil(nRaw);

  return (
    <SceneFrame kicker="Game" title="Sample size planner" tone="gold">
      <p>
        Minimum <MathText text="$n$" /> so that{" "}
        <MathText text="$z_{\alpha/2}\sigma/\sqrt{n}\le\varepsilon$" />.
      </p>
      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex={String.raw`\sigma`} />
            <input
              type="range"
              min={1}
              max={30}
              value={sigma}
              onChange={(e) => setSigma(Number(e.target.value))}
            />
            <span>{sigma}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`\varepsilon`} />
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.1}
              value={eps}
              onChange={(e) => setEps(Number(e.target.value))}
            />
            <span>{eps}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`1-\alpha`} />
            <select value={conf} onChange={(e) => setConf(Number(e.target.value))}>
              <option value={0.9}>90%</option>
              <option value={0.95}>95%</option>
              <option value={0.99}>99%</option>
            </select>
          </label>
        </div>
      ) : null}
      <Formula
        tex={String.raw`n\ge ${formatNum(nRaw, 2)}\;\Longrightarrow\; n=${n}`}
      />
    </SceneFrame>
  );
}

type CaseId = 1 | 2 | 3 | 4;

const CASE_LABEL: Record<CaseId, string> = {
  1: "Case 1 · normal, σ known",
  2: "Case 2 · not normal, σ known",
  3: "Case 3 · normal, σ unknown",
  4: "Case 4 · not normal, σ unknown",
};

const CASE_SITUATIONS: {
  title: string;
  story: string;
  bins: number[];
  answer: CaseId;
  why: string;
}[] = [
  {
    title: "Bolt diameters",
    bins: [2, 5, 12, 22, 28, 22, 12, 5, 2],
    story:
      "A plant has measured this bolt for years. Engineers trust the historical standard deviation and believe the spread has not changed. Today’s sample is only a check on the mean. The histogram of the new measurements is roughly symmetric.",
    answer: 1,
    why: "Roughly symmetric → willing to assume normal. A trusted, unchanged historical σ → treat variance as known.",
  },
  {
    title: "New lab assay",
    bins: [1, 4, 10, 18, 26, 20, 12, 6, 3],
    story:
      "A new instrument was installed last week. There is no long history of its variability — the only spread information is this sample. The histogram of the 12 readings is roughly symmetric.",
    answer: 3,
    why: "Roughly symmetric → willing to assume normal. No trustworthy out-of-sample σ → variance unknown, so use s from this sample.",
  },
  {
    title: "Daily coffee spend",
    bins: [28, 22, 14, 9, 6, 4, 3, 2, 1],
    story:
      "A chain has years of transactions. The day-to-day standard deviation is well estimated and believed stable, so they do not re-estimate it from this survey. The histogram is strongly right-skewed: many small spends, a few very large ones.",
    answer: 2,
    why: "Clearly skewed → do not assume normal (CLT can still justify a z interval if n is large). Historical σ we believe is unchanged → variance known.",
  },
  {
    title: "New clinic wait times",
    bins: [26, 18, 12, 8, 5, 4, 3, 2, 1],
    story:
      "A clinic opened this month. There is no historical standard deviation. This week’s waits are all the data we have, and the histogram has a long right tail.",
    answer: 4,
    why: "Skewed → do not assume normal. No trusted out-of-sample σ → variance unknown. This is the Case 4 fallback.",
  },
];

function MiniHistogram({ bins }: { bins: number[] }) {
  const width = 320;
  const height = 110;
  const gap = 4;
  const max = Math.max(...bins);
  const barW = (width - gap * (bins.length - 1)) / bins.length;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg} role="img" aria-label="Histogram of the sample">
      {bins.map((value, index) => {
        const barH = (value / max) * (height - 8);
        return (
          <rect
            key={index}
            x={index * (barW + gap)}
            y={height - barH}
            width={barW}
            height={barH}
            fill="#5b2a86"
          />
        );
      })}
    </svg>
  );
}

export function WhichCaseGame() {
  const print = usePrintMode();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<CaseId | null>(null);
  const situation = CASE_SITUATIONS[index]!;
  const correct = picked === situation.answer;

  const go = (next: number) => {
    setIndex(next);
    setPicked(null);
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Which case for μ?" tone="gold">
        <p>
          Two checks: is the histogram roughly symmetric (willing to assume normal)? Is there a trusted
          out-of-sample <MathText text="$\sigma$" /> we believe is unchanged (treat variance as known)?
        </p>
        {CASE_SITUATIONS.map((item) => (
          <Block key={item.title} title={item.title}>
            <MiniHistogram bins={item.bins} />
            <p>{item.story}</p>
            <p>
              <strong>{CASE_LABEL[item.answer]}.</strong> {item.why}
            </p>
          </Block>
        ))}
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Which case for μ?" tone="gold">
      <p>
        The true distribution and variance are unknown. Decide from the histogram and the story.
        Symmetric histogram → willing to assume normal. A good out-of-sample estimate of{" "}
        <MathText text="$\sigma$" />, which we believe is unchanged → treat the variance as known.
      </p>
      <p className={styles.muted}>
        Situation {index + 1} of {CASE_SITUATIONS.length}
      </p>
      <Block title={situation.title}>
        <MiniHistogram bins={situation.bins} />
        <p>{situation.story}</p>
      </Block>
      <div className={styles.tools}>
        {([1, 2, 3, 4] as CaseId[]).map((caseId) => (
          <button
            key={caseId}
            type="button"
            className={picked === caseId ? styles.toolBtnActive : styles.toolBtn}
            onClick={() => setPicked(caseId)}
          >
            {CASE_LABEL[caseId]}
          </button>
        ))}
      </div>
      {picked !== null ? (
        <p>
          {correct ? "Right. " : `Not quite — this is ${CASE_LABEL[situation.answer]}. `}
          {situation.why}
        </p>
      ) : null}
      <div className={styles.tools}>
        <button type="button" className={styles.toolBtn} disabled={index === 0} onClick={() => go(index - 1)}>
          Previous
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          disabled={index === CASE_SITUATIONS.length - 1}
          onClick={() => go(index + 1)}
        >
          Next
        </button>
      </div>
    </SceneFrame>
  );
}

type Side = "two" | "lower" | "upper";

/**
 * Coverage lab for the four mean cases and one-sided bounds.
 * Critical values: two-sided uses z_{α/2} or t_{α/2}; one-sided uses z_α or t_α.
 */
export function CaseLabGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(3);
  const [n, setN] = useState(30);
  const [conf, setConf] = useState(0.95);
  const [normal, setNormal] = useState(true);
  const [known, setKnown] = useState(true);
  const [side, setSide] = useState<Side>("two");
  const mu = 0;
  const sigma = 1;
  const skew = 1.6;
  const trials = 400;
  const showBars = 28;

  const caseId = normal && known ? 1 : !normal && known ? 2 : normal && !known ? 3 : 4;
  const alpha = 1 - conf;
  const crit = known
    ? side === "two"
      ? zCrit(alpha)
      : zCrit(2 * alpha)
    : side === "two"
      ? tCrit(alpha, n - 1)
      : tCrit(2 * alpha, n - 1);

  const sim = useMemo(() => {
    const rng = createRng(seed);
    let hits = 0;
    const bars: { lo: number; hi: number; covers: boolean }[] = [];
    for (let t = 0; t < trials; t += 1) {
      const sample = Array.from({ length: n }, () =>
        normal ? sampleNormal(mu, sigma, rng) : sampleMeanSdSkew(mu, sigma, skew, rng),
      );
      const xbar = mean(sample);
      const scale = known ? sigma : Math.sqrt(varianceN1(sample));
      const se = scale / Math.sqrt(n);
      const margin = crit * se;
      let lo = xbar - margin;
      let hi = xbar + margin;
      if (side === "lower") hi = Infinity;
      if (side === "upper") lo = -Infinity;
      const covers =
        side === "lower" ? mu >= lo : side === "upper" ? mu <= hi : lo <= mu && mu <= hi;
      if (covers) hits += 1;
      if (t < showBars) bars.push({ lo, hi, covers });
    }
    return { hits, bars, rate: hits / trials };
  }, [seed, n, normal, known, side, crit]);

  const formula =
    side === "two"
      ? known
        ? String.raw`\bar x\pm z_{\alpha/2}\sigma/\sqrt{n}`
        : String.raw`\bar x\pm t_{\alpha/2}(n-1)\,s/\sqrt{n}`
      : side === "lower"
        ? known
          ? String.raw`\bigl[\bar x-z_{\alpha}\sigma/\sqrt{n},\,\infty\bigr)`
          : String.raw`\bigl[\bar x-t_{\alpha}(n-1)\,s/\sqrt{n},\,\infty\bigr)`
        : known
          ? String.raw`\bigl(-\infty,\,\bar x+z_{\alpha}\sigma/\sqrt{n}\bigr]`
          : String.raw`\bigl(-\infty,\,\bar x+t_{\alpha}(n-1)\,s/\sqrt{n}\bigr]`;

  const windowHalf = Math.max(0.35, 4 * crit * (sigma / Math.sqrt(n)));
  const yOf = (value: number) => {
    const clipped = Math.min(mu + windowHalf, Math.max(mu - windowHalf, value));
    return 16 + ((mu + windowHalf - clipped) / (2 * windowHalf)) * 150;
  };

  return (
    <SceneFrame kicker="Part I" title="Try the four cases" tone="gold">
      <p>
        Each bar is one simulated interval for <MathText text="$\mu=0$" />. Green covers{" "}
        <MathText text="$\mu$" />; red misses. Non-normal draws are skewed but still have variance{" "}
        <MathText text="$\sigma^2=1$" />. Case {caseId}
        {caseId === 2 || caseId === 4 ? " is an approximation — coverage can slip when n is small." : " should land near the nominal level."}
      </p>
      {!print ? (
        <div className={styles.tools}>
          <button type="button" className={normal ? styles.toolBtnActive : styles.toolBtn} onClick={() => setNormal(true)}>
            Normal
          </button>
          <button type="button" className={!normal ? styles.toolBtnActive : styles.toolBtn} onClick={() => setNormal(false)}>
            Skewed
          </button>
          <button type="button" className={known ? styles.toolBtnActive : styles.toolBtn} onClick={() => setKnown(true)}>
            σ known
          </button>
          <button type="button" className={!known ? styles.toolBtnActive : styles.toolBtn} onClick={() => setKnown(false)}>
            σ unknown
          </button>
          <button type="button" className={side === "two" ? styles.toolBtnActive : styles.toolBtn} onClick={() => setSide("two")}>
            Two-sided
          </button>
          <button type="button" className={side === "lower" ? styles.toolBtnActive : styles.toolBtn} onClick={() => setSide("lower")}>
            Lower bound
          </button>
          <button type="button" className={side === "upper" ? styles.toolBtnActive : styles.toolBtn} onClick={() => setSide("upper")}>
            Upper bound
          </button>
          <label className={styles.small}>
            n
            <input type="range" min={8} max={80} value={n} onChange={(e) => setN(Number(e.target.value))} />
            <span>{n}</span>
          </label>
          <label className={styles.small}>
            <InlineMath tex={String.raw`1-\alpha`} />
            <select value={conf} onChange={(e) => setConf(Number(e.target.value))}>
              <option value={0.9}>90%</option>
              <option value={0.95}>95%</option>
              <option value={0.99}>99%</option>
            </select>
          </label>
          <button type="button" className={styles.toolBtn} onClick={() => setSeed((s) => s + 1)}>
            Resample
          </button>
        </div>
      ) : null}
      <Formula tex={formula} />
      <p>
        Critical value {formatNum(crit, 3)} · empirical coverage{" "}
        <strong>{formatNum(100 * sim.rate, 1)}%</strong> of {trials} (target {formatNum(100 * conf, 0)}%)
      </p>
      <figure className={styles.chartCard}>
        <svg viewBox="0 0 640 182" className={styles.chartSvg} role="img" aria-label="Simulated confidence intervals">
          <line x1={24} x2={620} y1={yOf(mu)} y2={yOf(mu)} stroke="#333" strokeDasharray="6 4" strokeWidth={1.5} />
          {sim.bars.map((row, i) => {
            const x = 36 + i * 21;
            const y1 = yOf(row.lo);
            const y2 = yOf(row.hi);
            return (
              <line
                key={i}
                x1={x}
                x2={x}
                y1={Math.min(y1, y2)}
                y2={Math.max(y1, y2)}
                stroke={row.covers ? "#2a7a4b" : "#b33"}
                strokeWidth={4}
              />
            );
          })}
        </svg>
      </figure>
      <p className={styles.muted}>
        Dashed line is <MathText text="$\mu$" />. A one-sided bar is cut at the edge of the window; the open side continues to{" "}
        <MathText text="$\pm\infty$" />.
      </p>
    </SceneFrame>
  );
}

function CiBar({
  lo,
  hi,
  center,
  domain,
}: {
  lo: number;
  hi: number;
  center: number;
  /** Fixed axis. Without it the bar is rescaled to itself and never changes shape. */
  domain?: [number, number];
}) {
  const span = hi - lo;
  const pad = span * 0.15 || 1;
  const min = domain ? domain[0] : lo - pad;
  const max = domain ? domain[1] : hi + pad;
  const x = (v: number) => ((v - min) / (max - min)) * 100;
  const left = Math.min(100, Math.max(0, x(lo)));
  const right = Math.min(100, Math.max(0, x(hi)));
  return (
    <div>
      <div className={styles.ciBarTrack} aria-hidden="true">
        <i className={styles.ciBarFill} style={{ left: `${left}%`, width: `${Math.max(0, right - left)}%` }} />
        <i className={styles.ciBarCenter} style={{ left: `${Math.min(100, Math.max(0, x(center)))}%` }} />
      </div>
      {domain ? (
        <p className={styles.muted} style={{ display: "flex", justifyContent: "space-between", margin: 0 }}>
          <span>{domain[0]}</span>
          <span>{domain[1]}</span>
        </p>
      ) : null}
    </div>
  );
}
