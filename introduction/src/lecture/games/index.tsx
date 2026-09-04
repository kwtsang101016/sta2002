import { useMemo, useState, type ReactNode } from "react";
import { binomialPmf, createRng, normalCdf, normalPdf, poissonPmf, shuffle } from "../../utils";
import { LiveOnly, usePrintMode } from "../printContext";
import styles from "../Lecture.module.css";
import { Formula, InlineMath, MathText, SceneFrame } from "../scenes/shared";

/* ── Coin flip: Probability vs Statistics ── */
export function CoinFlipGame() {
  const print = usePrintMode();
  const [mode, setMode] = useState<"probability" | "statistics">("statistics");
  const [flips, setFlips] = useState<boolean[]>([]);
  const [seed, setSeed] = useState(0);
  const rng = useMemo(() => createRng(seed + 7), [seed]);
  const p = 0.5;

  const flip = () => {
    const next = rng() < p;
    setFlips((prev) => [...prev, next]);
  };

  const reset = () => {
    setFlips([]);
    setSeed((s) => s + 1);
  };

  const heads = flips.filter(Boolean).length;
  const n = flips.length;
  const tails = n - heads;

  const patternProb = n > 0 ? binomialPmf(n, p, heads) : 0;

  const formatPatternProb = () => {
    if (n === 0) return null;
    const coeff = Math.round(patternProb / p ** heads / (1 - p) ** tails);
    const allSameNote =
      heads === n || heads === 0
        ? ` (\\text{all same side — slide example: } P(\\text{all H or all T}) = 2 \\times 0.5^{${n}} = ${(2 * 0.5 ** n).toFixed(4)})`
        : "";
    return (
      <MathText
        text={`$P(${heads}\\text{H}, ${tails}\\text{T in ${n} flips}) = \\binom{${n}}{${heads}} p^{${heads}} (1-p)^{${tails}} = ${coeff} \\times ${p}^{${heads}} (1-${p})^{${tails}} = ${patternProb.toFixed(4)}${allSameNote}$`}
      />
    );
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Coin flip: probability vs statistics" tone="gold">
        <p className={styles.lead}>
          <MathText text="Probability: given a fair coin ($p = 0.5$), $P(k \text{ heads in } n \text{ flips}) = \binom{n}{k}(0.5)^n$." />{" "}
          <MathText text="Statistics: after observing data, infer whether the coin is fair and estimate $p = P(H)$." />
        </p>
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Coin flip: probability vs statistics" tone="gold">
      <LiveOnly>
        <div className={styles.tools}>
          <button
            className={`${styles.toolBtn} ${mode === "probability" ? styles.toolBtnActive : ""}`}
            type="button"
            onClick={() => setMode("probability")}
          >
            PROBABILITY MODE
          </button>
          <button
            className={`${styles.toolBtn} ${mode === "statistics" ? styles.toolBtnActive : ""}`}
            type="button"
            onClick={() => setMode("statistics")}
          >
            STATISTICS MODE
          </button>
        </div>
      </LiveOnly>
      <p className={styles.lead}>
        {mode === "probability" ? (
          <MathText text="Model known: fair coin ($p = P(H) = 0.5$). Flip and ask — how likely is this pattern?" />
        ) : (
          <MathText text="Data observed: flip and ask — is this coin fair? What is your estimate of $p = P(H)$?" />
        )}
      </p>
      <div className={styles.chips}>
        {flips.map((isHeads, i) => (
          <span key={i} className={`${styles.chip} ${isHeads ? styles.chipActive : ""}`}>
            {isHeads ? "H" : "T"}
          </span>
        ))}
        {flips.length === 0 ? <span className={styles.muted}>No flips yet</span> : null}
      </div>
      <LiveOnly>
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={flip}>
            FLIP COIN
          </button>
          <button className={styles.ghost} type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </LiveOnly>
      {n > 0 ? (
        <div className={styles.note}>
          {mode === "probability" ? (
            <>
              <strong>Probability answer:</strong> After {n} flip{n !== 1 ? "s" : ""}, observed {heads} head{heads !== 1 ? "s" : ""} and {tails} tail{tails !== 1 ? "s" : ""}.{" "}
              {formatPatternProb()}
            </>
          ) : (
            <>
              <strong>Statistics answer:</strong>{" "}
              <MathText text="Let $p = P(H)$ denote the probability of heads. From the data, estimate $\hat{p} = (\text{number of heads})/n$" />{" "}
              = {heads}/{n} = <strong>{(heads / n).toFixed(3)}</strong>.
              {n === 5 && heads === 5 ? (
                <> All heads in 5 flips — if <MathText text="$p = 0.5$" /> (fair coin), this is unusual, but not conclusive alone.</>
              ) : n >= 20 ? (
                <>
                  {" "}
                  With <MathText text="$n$" /> = {n}, <MathText text={`$\\hat{p} = ${(heads / n).toFixed(3)}$`} />. Larger <MathText text="$n$" /> → more confidence in the estimate of <MathText text="$p$" />.
                </>
              ) : (
                <> More flips needed for a reliable estimate of <MathText text="$p$" />.</>
              )}
            </>
          )}
        </div>
      ) : null}
    </SceneFrame>
  );
}

/* ── Discrete vs Continuous classifier ── */
const TYPE_ITEMS = [
  { text: "Number of customers arriving per hour", answer: "discrete" },
  { text: "Waiting time until next customer (minutes)", answer: "continuous" },
  { text: "Number of heads in 10 coin flips", answer: "discrete" },
  { text: "Height of a randomly chosen student (cm)", answer: "continuous" },
  { text: "Score on a multiple-choice exam (0–100)", answer: "discrete" },
  { text: "Exact weight of a package (kg)", answer: "continuous" },
];

export function DiscreteContinuousGame() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(1);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const deck = useMemo(() => shuffle(TYPE_ITEMS, createRng(seed + 3)), [seed]);
  const current = deck[index % deck.length];

  const choose = (guess: string) => {
    const ok = guess === current.answer;
    if (ok) setScore((v) => v + 1);
    setFeedback(
      ok
        ? "Correct!"
        : `This is ${current.answer === "discrete" ? "discrete (countable values)" : "continuous (density on an interval)"}.`,
    );
    window.setTimeout(() => {
      setFeedback("");
      setIndex((v) => v + 1);
    }, 900);
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Discrete or continuous?" tone="gold">
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Random variable</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_ITEMS.map((item) => (
                <tr key={item.text}>
                  <td>{item.text}</td>
                  <td>{item.answer === "discrete" ? "Discrete" : "Continuous"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Discrete or continuous?" tone="gold">
      <p className={styles.lead}>{current.text}</p>
      <div className={styles.choices}>
        <button className={styles.choice} type="button" onClick={() => choose("discrete")}>
          Discrete · countable set
        </button>
        <button className={styles.choice} type="button" onClick={() => choose("continuous")}>
          Continuous · density
        </button>
      </div>
      {feedback ? <p className={styles.answer}>{feedback}</p> : null}
      <div className={styles.tools}>
        <button
          className={styles.ghost}
          type="button"
          onClick={() => {
            setSeed((v) => v + 1);
            setIndex(0);
            setScore(0);
          }}
        >
          New deck
        </button>
        <span className={styles.score}>{score} correct</span>
      </div>
    </SceneFrame>
  );
}

/* ── Expectation calculator ── */
const EXPECT_ITEMS = [
  {
    pmf: "X \\in \\{0,1,2\\},\\; \\Pr(X=0)=0.2,\\; \\Pr(X=1)=0.5,\\; \\Pr(X=2)=0.3",
    answer: 1.1,
    work: "\\mathbb{E}(X) = 0 \\times 0.2 + 1 \\times 0.5 + 2 \\times 0.3 = 1.1",
  },
  {
    pmf: "X \\in \\{1,3,5\\},\\; \\Pr(X=1)=0.25,\\; \\Pr(X=3)=0.5,\\; \\Pr(X=5)=0.25",
    answer: 3,
    work: "\\mathbb{E}(X) = 1 \\times 0.25 + 3 \\times 0.5 + 5 \\times 0.25 = 3",
  },
  {
    pmf: "X \\in \\{0,2,4\\},\\; \\Pr(X=0)=0.1,\\; \\Pr(X=2)=0.6,\\; \\Pr(X=4)=0.3",
    answer: 2.4,
    work: "\\mathbb{E}(X) = 0 \\times 0.1 + 2 \\times 0.6 + 4 \\times 0.3 = 2.4",
  },
];

export function ExpectationGame() {
  const print = usePrintMode();
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<ReactNode>("");
  const item = EXPECT_ITEMS[index % EXPECT_ITEMS.length];

  const check = () => {
    const val = parseFloat(guess);
    if (Number.isNaN(val)) {
      setFeedback("Enter a number.");
      return;
    }
    const ok = Math.abs(val - item.answer) < 0.01;
    setFeedback(
      ok ? (
        <>
          Correct! <Formula tex={item.work} />
        </>
      ) : (
        <>
          Not quite. <Formula tex={item.work} />
        </>
      ),
    );
    if (ok) {
      window.setTimeout(() => {
        setFeedback("");
        setGuess("");
        setIndex((v) => v + 1);
      }, 1500);
    }
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Compute E(X)" tone="gold">
        {EXPECT_ITEMS.map((q) => (
          <div key={q.pmf} className={styles.note}>
            <Formula tex={q.pmf} />
            <Formula tex={q.work} />
          </div>
        ))}
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Compute E(X)" tone="gold">
      <p className={styles.lead}>
        <MathText text="For discrete $X$: $\mathbb{E}(X) = \sum_k k \cdot \Pr(X = k)$" />
      </p>
      <Formula tex={item.pmf} />
      <div className={styles.sliderRow}>
        <label htmlFor="exp-guess">
          <MathText text="$\mathbb{E}(X) =$" />
        </label>
        <input
          id="exp-guess"
          className={styles.numberInput}
          type="number"
          step="0.1"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button className={styles.toolBtn} type="button" onClick={check}>
          CHECK
        </button>
      </div>
      {feedback ? <p className={styles.answer}>{feedback}</p> : null}
    </SceneFrame>
  );
}

/* ── Variance properties quiz ── */
const VAR_ITEMS = [
  {
    q: "If $\\mathrm{Var}(X) = 4$, what is $\\mathrm{Var}(3X + 7)$?",
    choices: ["4", "12", "36", "49"],
    answer: "36",
    explain: "\\mathrm{Var}(a + bX) = b^2 \\mathrm{Var}(X) = 9 \\times 4 = 36.",
  },
  {
    q: "$X$ and $Y$ are independent with $\\mathrm{Var}(X)=2$, $\\mathrm{Var}(Y)=5$. $\\mathrm{Var}(X + Y)$?",
    choices: ["3", "7", "10", "$\\sqrt{7}$"],
    answer: "7",
    explain: "\\text{Independent } \\Rightarrow \\mathrm{Cov}(X,Y)=0, \\text{ so } \\mathrm{Var}(X+Y) = 2 + 5 = 7.",
  },
  {
    q: "$\\mathrm{Var}(X) = \\mathbb{E}[(X - \\mu)^2]$ equals:",
    choices: [
      "$\\mathbb{E}(X)^2$",
      "$\\mathbb{E}(X^2) - (\\mathbb{E} X)^2$",
      "$\\mathbb{E}(X^2) + (\\mathbb{E} X)^2$",
      "$(\\mathbb{E} X)^2 - \\mathbb{E}(X^2)$",
    ],
    answer: "$\\mathbb{E}(X^2) - (\\mathbb{E} X)^2$",
    explain: "\\text{Computational formula: } \\mathrm{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2.",
  },
];

export function VarianceGame() {
  const print = usePrintMode();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<ReactNode>("");
  const item = VAR_ITEMS[index % VAR_ITEMS.length];

  const choose = (choice: string) => {
    const ok = choice === item.answer;
    setFeedback(
      ok ? (
        <>
          Correct! <MathText text={`$${item.explain}$`} />
        </>
      ) : (
        <>
          Answer: <MathText text={`$${item.answer}$`} />. <MathText text={`$${item.explain}$`} />
        </>
      ),
    );
    window.setTimeout(() => {
      setFeedback("");
      setIndex((v) => v + 1);
    }, 1400);
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Variance properties" tone="gold">
        {VAR_ITEMS.map((q) => (
          <div key={q.q} className={styles.note}>
            <p><MathText text={q.q} /></p>
            <p><MathText text={`$\\Rightarrow ${q.answer}$. $${q.explain}$`} /></p>
          </div>
        ))}
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Variance properties" tone="gold">
      <p className={styles.lead}><MathText text={item.q} /></p>
      <div className={styles.choices}>
        {item.choices.map((c) => (
          <button key={c} className={styles.choice} type="button" onClick={() => choose(c)}>
            <MathText text={c.startsWith("$") ? c : `$${c}$`} />
          </button>
        ))}
      </div>
      {feedback ? <p className={styles.answer}>{feedback}</p> : null}
    </SceneFrame>
  );
}

/* ── Binomial PMF explorer ── */
export function BinomialExplorer() {
  const print = usePrintMode();
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);

  const pmf = useMemo(() => {
    const values: { k: number; prob: number }[] = [];
    for (let k = 0; k <= n; k += 1) {
      values.push({ k, prob: binomialPmf(n, p, k) });
    }
    return values;
  }, [n, p]);

  const maxProb = Math.max(...pmf.map((v) => v.prob), 0.001);
  const mean = n * p;
  const variance = n * p * (1 - p);

  return (
    <SceneFrame kicker="Game" title="Binomial PMF explorer" tone="gold">
      <p className={styles.lead}>
        <MathText text={`$X \\sim \\mathrm{Bin}(n, p)$. Adjust $n$ and $p$ to see the PMF. Mean $= np = ${mean.toFixed(2)}$, $\\mathrm{Var} = np(1-p) = ${variance.toFixed(2)}$.`} />
      </p>
      {!print ? (
        <>
          <div className={styles.sliderRow}>
            <label htmlFor="binom-n"><MathText text="$n$" /></label>
            <input
              id="binom-n"
              type="range"
              min={1}
              max={30}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
            />
            <span className={styles.numberInput}>{n}</span>
          </div>
          <div className={styles.sliderRow}>
            <label htmlFor="binom-p"><MathText text="$p$" /></label>
            <input
              id="binom-p"
              type="range"
              min={0.05}
              max={0.95}
              step={0.05}
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
            />
            <span className={styles.numberInput}>{p.toFixed(2)}</span>
          </div>
        </>
      ) : null}
      <figure className={styles.chartCard}>
        <svg viewBox={`0 0 ${Math.max(400, n * 18 + 60)} 180`} role="img" aria-label="Binomial PMF">
          {pmf.map(({ k, prob }) => {
            const barW = Math.max(8, 360 / (n + 1));
            const x = 40 + k * (360 / (n + 1));
            const h = (prob / maxProb) * 130;
            return (
              <g key={k}>
                <rect
                  x={x}
                  y={150 - h}
                  width={barW - 2}
                  height={h}
                  fill="var(--blue)"
                  stroke="var(--ink)"
                  strokeWidth="1"
                />
                {n <= 15 ? (
                  <text x={x + barW / 2} y={168} textAnchor="middle" fontSize="9" fill="var(--ink)">
                    {k}
                  </text>
                ) : null}
              </g>
            );
          })}
          <line x1={30} y1={150} x2={400} y2={150} stroke="var(--ink)" strokeWidth="2" />
        </svg>
      </figure>
      <Formula tex="\Pr(X = k) = \binom{n}{k} p^{k}(1-p)^{n-k}, \quad k = 0, 1, \ldots, n" />
    </SceneFrame>
  );
}

/* ── Poisson MGF quiz ── */
export function PoissonQuiz() {
  const print = usePrintMode();
  const [lambda, setLambda] = useState(3);
  const [show, setShow] = useState(false);

  return (
    <SceneFrame kicker="Game" title="Poisson: mean and variance from MGF" tone="gold">
      <p className={styles.lead}>
        <MathText text="For $X \sim \mathrm{Pois}(\lambda)$, the MGF is $M_{X}(t) = \exp\!\big(\lambda(e^{t}-1)\big)$. Differentiate to find $\mathbb{E}(X)$ and $\mathrm{Var}(X)$." />
      </p>
      {!print ? (
        <div className={styles.sliderRow}>
          <label htmlFor="pois-lambda"><MathText text="$\lambda$" /></label>
          <input
            id="pois-lambda"
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={lambda}
            onChange={(e) => {
              setLambda(Number(e.target.value));
              setShow(false);
            }}
          />
          <span className={styles.numberInput}>{lambda.toFixed(1)}</span>
        </div>
      ) : null}
      <Formula tex={`M_{X}(t) = \\exp\\!\\big(${lambda}(e^{t}-1)\\big)`} />
      {!print ? (
        <button className={styles.toolBtn} type="button" onClick={() => setShow(true)}>
          REVEAL ANSWER
        </button>
      ) : null}
      {show || print ? (
        <div className={styles.note}>
          <p><MathText text={`$M'_{X}(0) = \\lambda = ${lambda} = \\mathbb{E}(X)$.`} /></p>
          <p><MathText text={`$M''_{X}(0) = \\lambda + \\lambda^2$, so $\\mathrm{Var}(X) = \\lambda + \\lambda^2 - \\lambda^2 = ${lambda}$.`} /></p>
          <p><MathText text="For Poisson: $\mathbb{E}(X) = \mathrm{Var}(X) = \lambda$." /></p>
        </div>
      ) : null}
      <figure className={styles.chartCard}>
        <svg viewBox="0 0 400 160" role="img" aria-label="Poisson PMF">
          {Array.from({ length: Math.min(20, Math.ceil(lambda * 3) + 5) }, (_, k) => {
            const prob = poissonPmf(lambda, k);
            const maxP = poissonPmf(lambda, Math.floor(lambda));
            const h = (prob / maxP) * 120;
            return (
              <rect
                key={k}
                x={30 + k * 16}
                y={130 - h}
                width={14}
                height={h}
                fill="var(--blue)"
                stroke="var(--ink)"
              />
            );
          })}
          <line x1={20} y1={130} x2={380} y2={130} stroke="var(--ink)" strokeWidth="2" />
        </svg>
      </figure>
    </SceneFrame>
  );
}

/* ── Distribution matching ── */
const DIST_MATCH = [
  { name: "\\mathrm{Exp}(\\theta)", formula: "f(x) = \\frac{1}{\\theta}e^{-x/\\theta},\\ x > 0", id: "exp" },
  { name: "\\mathrm{Gamma}(\\alpha, \\theta)", formula: "f(x) = \\frac{x^{\\alpha-1}e^{-x/\\theta}}{\\Gamma(\\alpha)\\theta^\\alpha},\\ x > 0", id: "gamma" },
  {
    name: "\\chi^2(r)",
    formula: "X \\sim \\mathrm{Gamma}(r/2,\\, 2);\\ \\text{sum of } r \\text{ standard normal squares}",
    id: "chi",
  },
  {
    name: "N(\\mu, \\sigma^2)",
    formula: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)",
    id: "normal",
  },
  {
    name: "t(r)",
    formula: "T = \\frac{Z}{\\sqrt{U/r}},\\ Z \\sim N(0,1),\\ U \\sim \\chi^2(r),\\ Z \\perp U",
    id: "t",
  },
  {
    name: "F(r_1, r_2)",
    formula: "F = \\frac{U/r_1}{V/r_2},\\ U \\sim \\chi^2(r_1),\\ V \\sim \\chi^2(r_2),\\ U \\perp V",
    id: "f",
  },
];

function buildDistChoices(targetId: string, round: number) {
  const target = DIST_MATCH.find((d) => d.id === targetId);
  if (!target) return DIST_MATCH.slice(0, 4);
  const others = DIST_MATCH.filter((d) => d.id !== targetId);
  const rng = createRng(round + 5);
  const distractors = shuffle(others, rng).slice(0, 3);
  return shuffle([target, ...distractors], rng);
}

export function DistributionMatchGame() {
  const print = usePrintMode();
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [feedback, setFeedback] = useState<ReactNode>("");
  const target = DIST_MATCH[targetIndex % DIST_MATCH.length];
  const choices = useMemo(() => buildDistChoices(target.id, round), [target.id, round]);

  const nextRound = () => {
    setTargetIndex((i) => (i + 1) % DIST_MATCH.length);
    setRound((r) => r + 1);
    setSelected(null);
    setFeedback("");
  };

  const pick = (id: string) => {
    if (selected) return;
    setSelected(id);
    const ok = id === target.id;
    if (ok) {
      setScore((s) => s + 1);
      setFeedback("Correct!");
      window.setTimeout(nextRound, 1200);
    } else {
      const picked = DIST_MATCH.find((d) => d.id === id);
      setFeedback(
        <>
          Not quite — you chose{" "}
          {picked ? <MathText text={`$${picked.name}$`} /> : "that option"}. The correct answer is{" "}
          <MathText text={`$${target.name}$`} />.
        </>,
      );
    }
  };

  const choiceClass = (id: string) => {
    if (!selected) return styles.choice;
    if (id === target.id) return `${styles.choice} ${styles.choiceCorrect}`;
    if (id === selected) return `${styles.choice} ${styles.choiceWrong}`;
    return styles.choice;
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Match the distribution" tone="gold">
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Distribution</th>
                <th>Key formula / definition</th>
              </tr>
            </thead>
            <tbody>
              {DIST_MATCH.map((d) => (
                <tr key={d.id}>
                  <td><MathText text={`$${d.name}$`} /></td>
                  <td><MathText text={`$${d.formula}$`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Match the distribution" tone="gold">
      <p className={styles.lead}>Which distribution matches this description?</p>
      <Formula tex={target.formula} />
      <div className={styles.choices}>
        {choices.map((d) => (
          <button
            key={d.id}
            className={choiceClass(d.id)}
            type="button"
            disabled={selected !== null}
            onClick={() => pick(d.id)}
          >
            <MathText text={`$${d.name}$`} />
          </button>
        ))}
      </div>
      {feedback ? <p className={styles.answer}>{feedback}</p> : null}
      {selected && selected !== target.id ? (
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={nextRound}>
            NEXT QUESTION
          </button>
        </div>
      ) : null}
      <span className={styles.score}>{score} correct</span>
    </SceneFrame>
  );
}

/* ── Waiting time (Gamma application) ── */
function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

function gammaTailProb(t: number, alpha: number, theta: number): number {
  if (t <= 0) return 1;
  const gammaAlpha = factorial(alpha - 1);
  const pdf = (x: number) =>
    (x ** (alpha - 1) * Math.exp(-x / theta)) / (gammaAlpha * theta ** alpha);
  let sum = 0;
  const steps = 2000;
  const end = t + Math.max(80, 20 * theta);
  const dx = (end - t) / steps;
  for (let i = 0; i < steps; i += 1) {
    const x = t + (i + 0.5) * dx;
    sum += pdf(x) * dx;
  }
  return Math.min(1, Math.max(0, sum));
}

function ordinal(n: number): string {
  const suffix =
    n % 10 === 1 && n % 100 !== 11 ? "st" : n % 10 === 2 && n % 100 !== 12 ? "nd" : n % 10 === 3 && n % 100 !== 13 ? "rd" : "th";
  return `${n}${suffix}`;
}

export function WaitingTimeGame() {
  const print = usePrintMode();
  const [minutes, setMinutes] = useState(5);
  const [ratePerHour, setRatePerHour] = useState(30);
  const [customerRank, setCustomerRank] = useState(2);

  const alpha = customerRank;
  const theta = 60 / ratePerHour;
  const prob = useMemo(
    () => gammaTailProb(minutes, alpha, theta),
    [minutes, alpha, theta],
  );

  const rankLabel = ordinal(customerRank);

  return (
    <SceneFrame kicker="Game" title="Waiting time: Gamma application" tone="gold">
      <p className={styles.lead}>
        <MathText
          text={`Customers arrive at rate $\\lambda = ${ratePerHour}$/hour (Poisson). Waiting time until the ${rankLabel} customer is $X \\sim \\mathrm{Gamma}(\\alpha=${alpha}, \\theta=${theta.toFixed(2)})$ minutes. Find $P(X > t)$.`}
        />
      </p>
      {!print ? (
        <>
          <div className={styles.sliderRow}>
            <label htmlFor="wait-rate"><MathText text="$\lambda$ (per hour)" /></label>
            <input
              id="wait-rate"
              type="range"
              min={5}
              max={120}
              step={5}
              value={ratePerHour}
              onChange={(e) => setRatePerHour(Number(e.target.value))}
            />
            <span className={styles.numberInput}>{ratePerHour}</span>
          </div>
          <div className={styles.sliderRow}>
            <label htmlFor="wait-rank">Customer rank</label>
            <input
              id="wait-rank"
              type="range"
              min={1}
              max={10}
              step={1}
              value={customerRank}
              onChange={(e) => setCustomerRank(Number(e.target.value))}
            />
            <span className={styles.numberInput}>{rankLabel}</span>
          </div>
          <div className={styles.sliderRow}>
            <label htmlFor="wait-t"><MathText text="$t$ (minutes)" /></label>
            <input
              id="wait-t"
              type="range"
              min={0.5}
              max={20}
              step={0.5}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
            <span className={styles.numberInput}>{minutes.toFixed(1)}</span>
          </div>
        </>
      ) : null}
      <div className={styles.note}>
        <InlineMath tex={`P(X > ${minutes}) \\approx ${prob.toFixed(3)}`} />
      </div>
      <p className={styles.small}>
        <MathText
          text={`Mean inter-arrival time $\\theta = 60/\\lambda = ${theta.toFixed(2)}$ min. Waiting until customer ${customerRank} $\\Rightarrow X \\sim \\mathrm{Gamma}(${alpha}, ${theta.toFixed(2)})$.`}
        />
      </p>
    </SceneFrame>
  );
}

/* ── Law of Large Numbers simulation ── */
export function LlnSimulation() {
  const print = usePrintMode();
  const [n, setN] = useState(0);
  const [seed, setSeed] = useState(0);
  const mu = 0.6;
  const rng = useMemo(() => createRng(seed), [seed]);
  const [flips, setFlips] = useState<number[]>([]);

  const run = (count: number) => {
    const newFlips: number[] = [];
    for (let i = 0; i < count; i += 1) {
      newFlips.push(rng() < mu ? 1 : 0);
    }
    setFlips((prev) => {
      const combined = [...prev, ...newFlips];
      setN(combined.length);
      return combined;
    });
  };

  const reset = () => {
    setFlips([]);
    setN(0);
    setSeed((s) => s + 1);
  };

  const runningMean = n > 0 ? flips.reduce((a, b) => a + b, 0) / n : 0;

  return (
    <SceneFrame kicker="Game" title="Law of Large Numbers simulator" tone="gold">
      <p className={styles.lead}>
        <MathText text="$X_i \sim \mathrm{Bernoulli}(0.6)$, $\mu = 0.6$. Watch $\bar{X}_n$ converge to $\mu$ as $n$ grows." />
      </p>
      {!print ? (
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={() => run(10)}>
            +10 flips
          </button>
          <button className={styles.toolBtn} type="button" onClick={() => run(100)}>
            +100 flips
          </button>
          <button className={styles.ghost} type="button" onClick={reset}>
            Reset
          </button>
        </div>
      ) : null}
      <Formula tex={`n = ${n},\\ \\bar{X}_n = ${runningMean.toFixed(4)},\\ \\text{true } \\mu = ${mu}`} />
      <figure className={styles.chartCard}>
        <svg viewBox="0 0 400 160" role="img" aria-label="Running mean">
          <line x1={30} y1={130} x2={380} y2={130} stroke="var(--ink)" strokeWidth="2" />
          <line x1={30} y1={130 - mu * 100} x2={380} y2={130 - mu * 100} stroke="var(--red)" strokeDasharray="4 4" />
          {flips.length > 1
            ? flips.map((_, i) => {
                const mean =
                  flips.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1);
                const x = 30 + (i / (flips.length - 1)) * 350;
                const y = 130 - mean * 100;
                return i === 0 ? null : (
                  <line
                    key={i}
                    x1={30 + ((i - 1) / (flips.length - 1)) * 350}
                    y1={
                      130 -
                      (flips.slice(0, i).reduce((a, b) => a + b, 0) / i) * 100
                    }
                    x2={x}
                    y2={y}
                    stroke="var(--blue)"
                    strokeWidth="2"
                  />
                );
              })
            : null}
          <text x={35} y={130 - mu * 100 - 4} fontSize="10" fill="var(--red)">
            μ = 0.6
          </text>
        </svg>
      </figure>
      <p className={styles.note}>
        <MathText text="As $n \to \infty$, $P(|\bar{X}_n - \mu| > \varepsilon) \to 0$. The sample mean converges in probability to $\mu$." />
      </p>
    </SceneFrame>
  );
}

/* ── CLT simulation ── */
export function CltSimulation() {
  const print = usePrintMode();
  const [seed, setSeed] = useState(0);
  const sampleSize = 30;
  const p = 0.5;
  const mu = p;
  const sigma = Math.sqrt((p * (1 - p)) / sampleSize);
  const rng = useMemo(() => createRng(seed), [seed]);
  const [means, setMeans] = useState<number[]>([]);

  const run = () => {
    const newMeans: number[] = [];
    for (let s = 0; s < 500; s += 1) {
      let sum = 0;
      for (let i = 0; i < sampleSize; i += 1) {
        sum += rng() < p ? 1 : 0;
      }
      newMeans.push(sum / sampleSize);
    }
    setMeans((prev) => [...prev, ...newMeans]);
  };

  const reset = () => {
    setMeans([]);
    setSeed((s) => s + 1);
  };

  const chart = useMemo(() => {
    const lo = mu - 4 * sigma;
    const hi = mu + 4 * sigma;
    const span = hi - lo;
    const n = means.length;
    const barWidth = 1 / sampleSize;

    const counts = Array(sampleSize + 1).fill(0);
    for (const m of means) {
      const k = Math.round(m * sampleSize);
      if (k >= 0 && k <= sampleSize) counts[k] += 1;
    }

    const visibleKs = Array.from({ length: sampleSize + 1 }, (_, k) => k).filter(
      (k) => k / sampleSize >= lo && k / sampleSize <= hi,
    );

    const expectedHeights = visibleKs.map((k) => n * barWidth * normalPdf(k / sampleSize, mu, sigma));
    const maxCount = Math.max(...counts, ...expectedHeights, 1);

    const toX = (val: number) => 30 + ((val - lo) / span) * 350;
    const barPxWidth = Math.max(1, (350 / span) * barWidth * 0.9);

    const curveSamples = 80;
    const curvePoints: string[] = [];
    for (let i = 0; i <= curveSamples; i += 1) {
      const x = lo + (i / curveSamples) * span;
      const expectedHeight = n * barWidth * normalPdf(x, mu, sigma);
      curvePoints.push(`${i === 0 ? "M" : "L"}${toX(x).toFixed(1)},${(140 - (expectedHeight / maxCount) * 120).toFixed(1)}`);
    }

    return { counts, visibleKs, lo, hi, span, maxCount, curvePath: curvePoints.join(" "), toX, barPxWidth };
  }, [means, mu, sigma, sampleSize]);

  return (
    <SceneFrame kicker="Game" title="Central Limit Theorem simulator" tone="gold">
      <p className={styles.lead}>
        <MathText
          text={`Draw samples of $n = ${sampleSize}$ $\\mathrm{Bernoulli}(0.5)$ values. The histogram of $\\bar{X}$ should track the Normal curve $N(\\mu, \\sigma^2/n)$ with $\\mu=${mu}$, $\\sigma\\approx${sigma.toFixed(3)}$.`}
        />
      </p>
      {!print ? (
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={run}>
            DRAW 500 SAMPLE MEANS
          </button>
          <button className={styles.ghost} type="button" onClick={reset}>
            Reset
          </button>
        </div>
      ) : null}
      <p className={styles.small}>Total sample means collected: {means.length}</p>
      <figure className={styles.chartCard}>
        <svg viewBox="0 0 400 180" role="img" aria-label="CLT histogram with normal curve">
          {chart.visibleKs.map((k) => {
            const count = chart.counts[k];
            const h = (count / chart.maxCount) * 120;
            const cx = chart.toX(k / sampleSize);
            return (
              <rect
                key={k}
                x={cx - chart.barPxWidth / 2}
                y={140 - h}
                width={chart.barPxWidth}
                height={h}
                fill="var(--blue)"
                stroke="var(--ink)"
                strokeWidth="0.5"
              />
            );
          })}
          {means.length > 0 ? (
            <path
              d={chart.curvePath}
              fill="none"
              stroke="var(--red)"
              strokeWidth="2.5"
            />
          ) : null}
          <line x1={30} y1={140} x2={380} y2={140} stroke="var(--ink)" strokeWidth="2" />
          <text x={30} y={158} fontSize="9" fill="var(--ink)">
            {(chart.lo).toFixed(2)}
          </text>
          <text x={195} y={158} textAnchor="middle" fontSize="9" fill="var(--ink)">
            {mu.toFixed(2)}
          </text>
          <text x={380} y={158} textAnchor="end" fontSize="9" fill="var(--ink)">
            {(chart.hi).toFixed(2)}
          </text>
          <text x={378} y={24} textAnchor="end" fontSize="9" fill="var(--red)">
            N(μ, σ²/n)
          </text>
          <text x={35} y={24} fontSize="9" fill="var(--blue)">
            Histogram of X̄
          </text>
        </svg>
      </figure>
      <p className={styles.note}>
        <MathText text="$W = (\bar{X} - \mu)/(\sigma/\sqrt{n}) \to N(0, 1)$ as $n \to \infty$. Click repeatedly — the blue bars should hug the red Normal curve more closely as you collect more sample means." />
      </p>
    </SceneFrame>
  );
}

/* ── Continuity correction game ── */
export function ContinuityCorrectionGame() {
  const print = usePrintMode();
  const n = 100;
  const p = 0.3;
  const x = 25;
  const mu = n * p;
  const sigma = Math.sqrt(n * p * (1 - p));
  const zNoCc = (x - mu) / sigma;
  const zWithCc = (x + 0.5 - mu) / sigma;
  const probNoCc = normalCdf(zNoCc);
  const probWithCc = normalCdf(zWithCc);
  const exact = Array.from({ length: x + 1 }, (_, k) => binomialPmf(n, p, k)).reduce((a, b) => a + b, 0);

  return (
    <SceneFrame kicker="Game" title="Half-unit continuity correction" tone="gold">
      <p className={styles.lead}>
        <MathText text={`$X \\sim \\mathrm{Bin}(${n}, ${p})$. Estimate $\\Pr(X \\le ${x})$ using Normal approximation.`} />
      </p>
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <p className={styles.kicker}>WITHOUT CC</p>
          <p><MathText text={`$z = \\frac{${x} - ${mu}}{${sigma.toFixed(2)}} = ${zNoCc.toFixed(3)}$`} /></p>
          <p><MathText text={`$\\Pr(X \\le ${x}) \\approx \\Phi(z) = ${probNoCc.toFixed(4)}$`} /></p>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>WITH CC (+0.5)</p>
          <p><MathText text={`$z = \\frac{${x + 0.5} - ${mu}}{${sigma.toFixed(2)}} = ${zWithCc.toFixed(3)}$`} /></p>
          <p><MathText text={`$\\Pr(X \\le ${x}) \\approx \\Phi(z) = ${probWithCc.toFixed(4)}$`} /></p>
        </div>
      </div>
      <p className={styles.note}>
        <MathText text={`Exact Binomial $\\Pr(X \\le ${x}) = ${exact.toFixed(4)}$. Continuity correction moves the cutoff to ${x + 0.5}$ for better approximation.`} />
      </p>
      {print ? null : (
        <p className={styles.small}>
          <MathText text="Rules: $\Pr(X \le x) \approx \Phi\!\left(\frac{x + 0.5 - \mu}{\sigma}\right)$, $\Pr(X \ge x) \approx 1 - \Phi\!\left(\frac{x - 0.5 - \mu}{\sigma}\right)$." />
        </p>
      )}
    </SceneFrame>
  );
}

/* ── Student's Theorem quiz ── */
const STUDENT_ITEMS = [
  {
    q: "$X_1,\\ldots,X_n$ i.i.d. $N(\\mu,\\sigma^2)$. What is the distribution of $\\bar{X}$?",
    choices: ["$N(\\mu, \\sigma^2)$", "$N(\\mu, \\sigma^2/n)$", "$t(n-1)$", "$\\chi^2(n)$"],
    answer: "$N(\\mu, \\sigma^2/n)$",
  },
  {
    q: "Are $\\bar{X}$ and $S^2$ independent for normal samples?",
    choices: ["Yes", "No", "Only if $n > 30$", "Only if $\\mu = 0$"],
    answer: "Yes",
  },
  {
    q: "$(n-1)S^2/\\sigma^2$ follows which distribution?",
    choices: ["$N(0,1)$", "$t(n-1)$", "$\\chi^2(n-1)$", "$F(n-1,n)$"],
    answer: "$\\chi^2(n-1)$",
  },
  {
    q: "$T = (\\bar{X} - \\mu) / (S/\\sqrt{n})$ follows:",
    choices: ["$N(0,1)$", "$t(n-1)$", "$\\chi^2(n)$", "$\\mathrm{Bin}(n, \\mu)$"],
    answer: "$t(n-1)$",
  },
];

export function StudentTheoremQuiz() {
  const print = usePrintMode();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<ReactNode>("");
  const item = STUDENT_ITEMS[index % STUDENT_ITEMS.length];

  const choose = (choice: string) => {
    const ok = choice === item.answer;
    setFeedback(
      ok ? (
        "Correct — part of Student's Theorem!"
      ) : (
        <>
          Answer:{" "}
          {item.answer.startsWith("$") ? <MathText text={item.answer} /> : item.answer}
        </>
      ),
    );
    window.setTimeout(() => {
      setFeedback("");
      setIndex((v) => v + 1);
    }, 1200);
  };

  if (print) {
    return (
      <SceneFrame kicker="Game" title="Student's Theorem quiz" tone="gold">
        {STUDENT_ITEMS.map((q) => (
          <div key={q.q} className={styles.note}>
            <p><MathText text={q.q} /></p>
            <p><MathText text={`$\\Rightarrow ${q.answer}$`} /></p>
          </div>
        ))}
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker="Game" title="Student's Theorem quiz" tone="gold">
      <p className={styles.lead}><MathText text={item.q} /></p>
      <div className={styles.choices}>
        {item.choices.map((c) => (
          <button key={c} className={styles.choice} type="button" onClick={() => choose(c)}>
            <MathText text={c.startsWith("$") ? c : c} />
          </button>
        ))}
      </div>
      {feedback ? <p className={styles.answer}>{feedback}</p> : null}
    </SceneFrame>
  );
}
