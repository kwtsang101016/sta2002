import styles from "../Lecture.module.css";
import { Block, BulletList, Figure, Formula, MathText, MotivatingQuestion, OrderedList, SceneFrame } from "./shared";

export function RvDistScene() {
  return (
    <SceneFrame kicker="Review" title="Random variable and distribution function">
      <Block title="Definition">
        <p>
          A random variable <MathText text="$X$" /> is a function from the sample space <MathText text="$\Omega$" /> to{" "}
          <MathText text="$\mathbb{R}$" />. Common types:
        </p>
        <BulletList
          items={[
            <MathText key="d" text="Discrete: takes values in a countable set $S_X$;" />,
            "Continuous: described by a density.",
          ]}
        />
        <Formula tex="F_{X}(x) = \Pr(X \le x)" />
        <p className={styles.muted}>
          The cumulative distribution function (CDF) of <MathText text="$X$" />.
        </p>
      </Block>
      <p className={styles.note}>
        <MathText text="Property: $F_{X}(x)$ is non-decreasing, right-continuous, and $\lim_{x\to-\infty} F_{X}(x) = 0$, $\lim_{x\to\infty} F_{X}(x) = 1$." />
      </p>
      <Block title="Support of a random variable">
        <BulletList
          items={[
            <MathText key="ds" text="Discrete: $S_X = \{x : \Pr(X = x) > 0\}$" />,
            <MathText key="cs" text="Continuous: $S_X = \{x : f_{X}(x) > 0\}$" />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function DiscreteScene() {
  return (
    <SceneFrame kicker="Review" title="Discrete case">
      <Block title="Definition and properties">
        <p>
          For a discrete <MathText text="$X$" />, the probability mass function (PMF) is
        </p>
        <Formula tex="p_{X}(k) = \Pr(X = k), \qquad k \in S_X" />
        <p>Properties:</p>
        <BulletList
          items={[
            <MathText key="a" text="$0 \le p_{X}(k) \le 1$;" />,
            <MathText key="b" text="$\displaystyle \sum_{k \in S_X} p_{X}(k) = 1$;" />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function ContinuousScene() {
  return (
    <SceneFrame kicker="Review" title="Continuous case">
      <Block title="Definition and properties">
        <p>
          If <MathText text="$X$" /> is continuous, the probability density function (PDF) <MathText text="$f_{X}(x)$" /> satisfies
        </p>
        <Formula tex="\Pr(a < X \le b) = \int_a^b f_{X}(x)\,dx" />
        <p>
          <MathText text="In other words, $F_{X}(x) = \int_{-\infty}^{x} f_{X}(t)\,dt$. When $F_{X}$ is differentiable, $f_{X}(x) = F_{X}'(x)$." />
        </p>
      </Block>
    </SceneFrame>
  );
}

export function ExpectationScene() {
  return (
    <SceneFrame kicker="Review" title="Expectation">
      <Block title="Definition">
        <Formula tex="\mathbb{E}(X) = \begin{cases} \displaystyle \sum_{k \in S_X} k\,p_{X}(k), & X \text{ discrete}, \\[1ex] \displaystyle \int_{-\infty}^{\infty} x\,f_{X}(x)\,dx, & X \text{ continuous}. \end{cases}" />
      </Block>
      <Block title="Linearity of expectation">
        <p>
          For constants <MathText text="$a, b$" />:
        </p>
        <Formula tex="\mathbb{E}(a + bX) = a + b\,\mathbb{E}(X)" />
        <Formula tex="\mathbb{E}\!\left(\sum_i b_i X_i\right) = \sum_i b_i\,\mathbb{E}(X_i)" />
      </Block>
    </SceneFrame>
  );
}

export function VarianceScene() {
  return (
    <SceneFrame kicker="Review" title="Variance">
      <Block title="Definition">
        <Formula tex="\mathrm{Var}(X) = \mathbb{E}\big[(X - \mathbb{E} X)^2\big] = \mathbb{E}[X^2] - (\mathbb{E} X)^2" />
      </Block>
      <Block title="Property of variance">
        <Formula tex="\mathrm{Var}(a + bX) = b^2\,\mathrm{Var}(X)" />
        <p>
          If <MathText text="$X, Y$" /> have finite variances:
        </p>
        <Formula tex="\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2\,\mathrm{Cov}(X, Y)" />
        <p>
          <MathText text="where $\mathrm{Cov}(X, Y) = \mathbb{E}[(X - \mathbb{E}(X))(Y - \mathbb{E}(Y))]$." />
        </p>
        <p>
          <MathText text="If $X$ and $Y$ are independent, then $\mathrm{Cov}(X, Y) = 0$, hence" />
        </p>
        <Formula tex="\mathrm{Var}\!\left(\sum_{i=1}^{n} X_i\right) = \sum_{i=1}^{n} \mathrm{Var}(X_i) \quad \text{(independent)}" />
      </Block>
    </SceneFrame>
  );
}

export function BinomialScene() {
  return (
    <SceneFrame kicker="Discrete distributions" title="Binomial distribution">
      <MotivatingQuestion>
        <MathText text="If each independent trial succeeds with probability $p$, what is the probability of getting exactly $k$ successes in $n$ trials?" />
      </MotivatingQuestion>
      <Block title="Binomial distribution">
        <p>
          Call that count <MathText text="$X$" />. Then <MathText text="$X \sim \mathrm{Bin}(n, p)$" /> with{" "}
          <MathText text="$n \in \mathbb{N}$" />, <MathText text="$p \in (0, 1)$" />, and PMF
        </p>
        <Formula tex="\Pr(X = k) = \binom{n}{k} p^{k}(1-p)^{n-k}, \qquad k = 0, 1, \ldots, n" />
      </Block>
      <p className={styles.lead}>
        <MathText text="The mean and variance of $X$ are $\mathbb{E}(X) = np$, $\mathrm{Var}(X) = np(1-p)$." />
      </p>
      <Figure src="/figures/binomial_dist.png" alt="Binomial distribution plot" width="50%" />
    </SceneFrame>
  );
}

export function PoissonScene() {
  return (
    <SceneFrame kicker="Discrete distributions" title="Poisson distribution">
      <MotivatingQuestion>
        <MathText text="Events occur independently at average rate $\lambda$ per unit time. What is the probability of observing exactly $k$ events in that unit of time?" />
      </MotivatingQuestion>
      <Block title="Poisson distribution">
        <p>
          Call that count <MathText text="$X$" />. Then <MathText text="$X \sim \mathrm{Pois}(\lambda)$" /> (
          <MathText text="$\lambda > 0$" />) with PMF
        </p>
        <Formula tex="\Pr(X = k) = \frac{\lambda^{k}}{k!} e^{-\lambda}, \qquad k = 0, 1, 2, \ldots" />
        <p>Its moment generating function (MGF) is</p>
        <Formula tex="M_{X}(t) = \mathbb{E}\!\left(e^{tX}\right) = \exp\!\big(\lambda(e^{t}-1)\big), \qquad t \in \mathbb{R}" />
      </Block>
      <BulletList
        items={[
          <MathText key="q" text="What are the mean $\mathbb{E}(X)$ and the variance $\mathrm{Var}(X)$ of $X$?" />,
        ]}
      />
    </SceneFrame>
  );
}

export function MgfScene() {
  return (
    <SceneFrame kicker="Review" title="Moment Generating Function">
      <Block title="Definition">
        <p>
          For a random variable <MathText text="$X$" />, the moment generating function (MGF) is
        </p>
        <Formula tex="M_{X}(t) = \mathbb{E}\!\left(e^{tX}\right), \qquad t \in \mathbb{R}" />
      </Block>
      <Block title="Properties">
        <BulletList
          items={[
            <MathText key="a" text="$M_{X}(0) = \mathbb{E}(e^{0}) = 1$." />,
            <MathText key="b" text="If $M_{X}(t)$ is finite on an open interval containing $0$, then $M_{X}$ uniquely determines the distribution of $X$." />,
            <MathText key="c" text="For continuous $X$, $M_{X}(t) = \int_{-\infty}^{\infty} e^{tx} f_{X}(x)\,dx$." />,
            <MathText key="d" text="For discrete $X$, $M_{X}(t) = \sum_x e^{tx} p_{X}(x)$." />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function MgfMomentsScene() {
  return (
    <SceneFrame kicker="Review" title="Moments from the MGF">
      <Block title="Moments as derivatives">
        <p>
          <MathText text="If $M_{X}$ exists in a neighborhood of $0$ and is differentiable there, then for $k \ge 1$:" />
        </p>
        <Formula tex="M_{X}^{(k)}(0) = \mathbb{E}\!\left(X^k\right)" />
      </Block>
      <Block title="Mean and variance">
        <Formula tex="\mathbb{E}[X] = M_{X}'(0)" />
        <Formula tex="\mathrm{Var}(X) = M_{X}''(0) - \big(M_{X}'(0)\big)^2" />
      </Block>
      <Block title="Moments of Poisson distributions">
        <p>
          <MathText text="For $X \sim \mathrm{Pois}(\lambda)$, differentiate $M_{X}(t) = \exp\!\big(\lambda(e^{t}-1)\big)$:" />
        </p>
        <Formula tex="M_{X}'(t) = \lambda e^{t} M_{X}(t), \quad M_{X}''(t) = \lambda e^{t} M_{X}(t) + \lambda^2 e^{2t} M_{X}(t)" />
        <p>
          <MathText text="At $t = 0$: $M_{X}'(0) = \lambda$, $M_{X}''(0) = \lambda + \lambda^2$. Thus, $\mathbb{E}(X) = \lambda$, $\mathrm{Var}(X) = \lambda$." />
        </p>
      </Block>
    </SceneFrame>
  );
}

export function ExponentialScene() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Exponential distribution">
      <MotivatingQuestion>
        <MathText text="In a Poisson process with mean inter-arrival time $\theta > 0$, what is the distribution of the waiting time until the next event?" />
      </MotivatingQuestion>
      <Block title="Exponential distribution">
        <p>
          Call that waiting time <MathText text="$X$" />. Then <MathText text="$X \sim \mathrm{Exp}(\theta)$" /> with PDF
        </p>
        <Formula tex="f(x) = \frac{1}{\theta} e^{-x/\theta}, \quad x > 0" />
        <p>Its MGF is</p>
        <Formula tex="M(t) = \mathbb{E}(e^{tX}) = \frac{1}{1 - \theta t}, \quad t < \frac{1}{\theta}" />
      </Block>
      <BulletList
        items={[
          <MathText key="q" text="What is the mean $\mathbb{E}(X)$ and the variance $\mathrm{Var}(X)$ of $X$?" />,
        ]}
      />
    </SceneFrame>
  );
}

export function GammaScene1() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Gamma distribution">
      <MotivatingQuestion>
        <MathText text="Still in a Poisson process with mean inter-arrival $\theta$: what is the distribution of the waiting time until the $\alpha$-th event (for integer $\alpha$)?" />
      </MotivatingQuestion>
      <Block title="Gamma distribution">
        <p>
          That waiting time is <MathText text="$X \sim \mathrm{Gamma}(\alpha, \theta)$" /> (shape{" "}
          <MathText text="$\alpha > 0$" />, scale <MathText text="$\theta > 0$" />; the model also
          allows non-integer <MathText text="$\alpha$" />) with PDF
        </p>
        <Formula tex="f(x) = \frac{1}{\Gamma(\alpha)\theta^\alpha} x^{\alpha-1} e^{-x/\theta}, \quad x > 0" />
        <p>Its MGF is</p>
        <Formula tex="M(t) = \mathbb{E}(e^{tX}) = \frac{1}{(1 - \theta t)^\alpha}, \quad t < \frac{1}{\theta}" />
      </Block>
      <p className={styles.lead}>
        <MathText text="$\mathbb{E}(X) = \alpha\theta$, $\mathrm{Var}(X) = \alpha\theta^2$." />
      </p>
    </SceneFrame>
  );
}

export function GammaScene2() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Continuous distributions">
      <Figure src="/figures/gamma_dist.png" alt="Gamma distribution plot" width="80%" />
      <BulletList
        items={[
          <MathText key="a" text="Connection to exponential: $X \sim \mathrm{Exp}(\theta) \Leftrightarrow X \sim \mathrm{Gamma}(1, \theta)$" />,
          <MathText
            key="b"
            text="Summation: $X_1 \sim \mathrm{Gamma}(\alpha_1, \theta)$, $X_2 \sim \mathrm{Gamma}(\alpha_2, \theta) \Rightarrow X_1 + X_2 \sim \mathrm{Gamma}(\alpha_1 + \alpha_2, \theta)$"
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function WaitingTimeScene() {
  return (
    <SceneFrame kicker="Application" title="Application Example: Waiting time">
      <Block title="Waiting time">
        <p>
          Customers per hour follow a Poisson process with mean 30. Waiting time in minutes between any two customers follows Exponential with{" "}
          <MathText text="$\theta = \frac{1}{30/60} = 2$" />. What is <MathText text="$P(\text{wait} > 5 \text{ minutes before the first two customers arrive})$" />?
        </p>
      </Block>
      <p className={styles.lead}>
        <strong>Solution:</strong>{" "}
        <MathText text="Let $X$ = waiting time until the 2nd customer. $X \sim \mathrm{Gamma}(\alpha = 2, \theta = 2)$." />
      </p>
      <Formula tex="P(X > 5) = \int_{5}^{\infty} \frac{x e^{-x/2}}{4}\,dx = \frac{1}{4}\left[ (-2x) e^{-x/2} - 4e^{-x/2} \right]_{5}^{\infty} = \frac{7}{2} e^{-5/2} \approx 0.287" />
    </SceneFrame>
  );
}

export function ChiSquareScene() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Chi-square distribution">
      <MotivatingQuestion>
        <MathText text="If $Z_1,\ldots,Z_r$ are i.i.d. $N(0,1)$, what is the distribution of $X = Z_1^2 + \cdots + Z_r^2$?" />
      </MotivatingQuestion>
      <Block title="Chi-square distribution">
        <p>
          That sum follows <MathText text="$X \sim \chi^2(r)$" /> (<MathText text="$r$" /> degrees of
          freedom), which is the special case <MathText text="$\mathrm{Gamma}(r/2, 2)$" />:
        </p>
        <Formula tex="f(x) = \frac{1}{\Gamma(r/2)\,2^{r/2}} x^{r/2-1} e^{-x/2}, \quad x > 0" />
        <p>MGF:</p>
        <Formula tex="M(t) = \mathbb{E}(e^{tX}) = \frac{1}{(1 - 2t)^{r/2}}, \quad t < \frac{1}{2}" />
      </Block>
      <p className={styles.lead}>
        <MathText text="$\mathbb{E}(X) = r$, $\mathrm{Var}(X) = 2r$." />
      </p>
    </SceneFrame>
  );
}

export function NormalScene() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Normal distribution">
      <MotivatingQuestion>
        <MathText text="A continuous measurement is concentrated around a center $\mu$ with typical spread $\sigma$. What density gives the classic symmetric “bell curve”?" />
      </MotivatingQuestion>
      <Block title="Normal distribution">
        <p>
          That model is <MathText text="$X \sim N(\mu, \sigma^2)$" /> with PDF
        </p>
        <Formula tex="f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left[ -\frac{(x - \mu)^2}{2\sigma^2} \right], \quad -\infty < x < \infty" />
        <p>MGF:</p>
        <Formula tex="M(t) = \mathbb{E}(e^{tX}) = e^{\mu t + \frac{1}{2}\sigma^2 t^2}, \quad t \in \mathbb{R}" />
      </Block>
      <p className={styles.lead}>
        <MathText text="$\mathbb{E}(X) = \mu$, $\mathrm{Var}(X) = \sigma^2$. $Z \sim N(0, 1)$ is standard normal." />
      </p>
    </SceneFrame>
  );
}

export function NormalPropsScene() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Property of Normal distributions">
      <Block title="Theorem 7 (Theorem 3.3-1 in book)">
        <p>
          <MathText text="If $X \sim N(\mu, \sigma^2)$, then $Z = (X - \mu)/\sigma \sim N(0, 1)$." />
        </p>
      </Block>
      <Block title="Theorem 8 (Theorem 3.3-2 in book)">
        <p>
          <MathText text="If $X \sim N(\mu, \sigma^2)$, then $Z^2 = (X - \mu)^2/\sigma^2 \sim \chi^2(1)$." />
        </p>
      </Block>
      <p className={styles.note}>These two theorems will be discussed more in class.</p>
    </SceneFrame>
  );
}

export function TDistScene() {
  return (
    <SceneFrame kicker="Continuous distributions" title="Student t-distribution">
      <MotivatingQuestion>
        <MathText text="If $Z \sim N(0,1)$ is independent of $U \sim \chi^2(r)$, what is the distribution of $T = Z / \sqrt{U/r}$? (This is the pivotal quantity when a normal mean is studentized by $S$.)" />
      </MotivatingQuestion>
      <Block title="Student t-distribution">
        <Formula tex="T := \frac{Z}{\sqrt{U/r}}" />
        <p>
          <MathText text="Then $T$ follows the $t$-distribution with $r$ degrees of freedom." />
        </p>
      </Block>
      <Figure src="/figures/t_dist.png" alt="t-distribution plot" width="70%" />
    </SceneFrame>
  );
}

export function FDistScene() {
  return (
    <SceneFrame kicker="Continuous distributions" title="F-distribution">
      <MotivatingQuestion>
        <MathText text="If $U \sim \chi^2(r_1)$ and $V \sim \chi^2(r_2)$ are independent, what is the distribution of the scaled ratio $F = (U/r_1)/(V/r_2)$?" />
      </MotivatingQuestion>
      <Block title="F-distribution">
        <Formula tex="F := \frac{U/r_1}{V/r_2}" />
        <p>
          <MathText text="Then $F$ follows the $F$-distribution with $r_1$ and $r_2$ degrees of freedom." />
        </p>
      </Block>
      <Figure src="/figures/F_dist.png" alt="F-distribution plot" width="70%" />
    </SceneFrame>
  );
}

export function LlnScene() {
  return (
    <SceneFrame kicker="Limit theorems" title="Law of Large Numbers">
      <Block title="Theorem 9 (Law of Large Number, Section 5.8 in textbook)">
        <p>
          <MathText text="Suppose $X_1, X_2, \ldots, X_n$ are i.i.d. with common mean $\mu$ and finite variance $\sigma^2$. Let $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$. Then, for any $\varepsilon > 0$," />
        </p>
        <Formula tex="\lim_{n \to \infty} P(|\bar{X} - \mu| > \varepsilon) = 0" />
        <p>
          <MathText text="We say that the sample mean $\bar{X}$ converges in probability to the expected value $\mu$." />
        </p>
      </Block>
      <p className={styles.lead}>
        The law of large numbers says that as you repeat an experiment many times, the average of the results gets closer and closer to the true expected value.
      </p>
    </SceneFrame>
  );
}

export function CltScene() {
  return (
    <SceneFrame kicker="Limit theorems" title="Central Limit Theorem (CLT)">
      <Block title="Theorem 10 (Central Limit Theorem, Theorem 5.6-1 in textbook)">
        <p>
          <MathText text="Suppose $X_1, X_2, \ldots, X_n$ are i.i.d. with common mean $\mu$ and finite variance $\sigma^2$. Then the distribution of" />
        </p>
        <Formula tex="W = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}} = \frac{\sum_{i=1}^n X_i - n\mu}{\sqrt{n}\,\sigma}" />
        <p>
          <MathText text="is $N(0, 1)$ in the limit as $n \to \infty$. We say $W$ converges in distribution to a standard normal distribution." />
        </p>
      </Block>
      <p className={styles.lead}>
        A large sum of identical and independently distributed (i.i.d.) random variables, properly normalized, will always have approximately a normal distribution.
      </p>
    </SceneFrame>
  );
}

export function CltBernoulliScene() {
  return (
    <SceneFrame kicker="Limit theorems" title="Central Limit Theorem">
      <p className={styles.lead}>
        <MathText text="Let $X_1, X_2, \ldots$ be i.i.d. $\mathrm{Bernoulli}(\theta)$ with $\mathbb{E}(X_i) = \theta$, $\mathrm{Var}(X_i) = \theta(1-\theta)$. The binomial $\mathrm{Bin}(n, \theta)$ is the sum of $n$ Bernoulli variables $\Rightarrow$ we can use the CLT." />
      </p>
      <p>
        <MathText text="Let $Y_n = \sum_{i=1}^n X_i \sim \mathrm{Bin}(n, \theta)$. As $n \to \infty$:" />
      </p>
      <Formula tex="\frac{Y_n - n\theta}{\sqrt{n\theta(1-\theta)}} \to N(0, 1)" />
      <p>
        Therefore, for any <MathText text="$y$" />:
      </p>
      <Formula tex="\Pr(Y_n \le y) \approx \Phi\!\left(\frac{y - n\theta}{\sqrt{n\theta(1-\theta)}}\right)" />
      <p className={styles.muted}>
        <MathText text="where $\Phi$ is the CDF of $N(0, 1)$." />
      </p>
    </SceneFrame>
  );
}

function RoundingBins({
  y,
  title,
  subtitle,
  binLabels,
  edgeLabels,
  cutoffLabel,
}: {
  y: number;
  title: string;
  subtitle: string;
  binLabels: string[];
  edgeLabels: string[];
  cutoffLabel: string;
}) {
  const padL = 92;
  const padR = 18;
  const width = 640 - padL - padR;
  const n = binLabels.length;
  const binW = width / n;
  const h = 40;
  const cutoffX = padL + 2 * binW;

  return (
    <g>
      <text x="10" y={y + 16} fontSize="11" fontWeight="800" fill="var(--ink)">
        {title}
      </text>
      <text x="10" y={y + 30} fontSize="9" fill="var(--muted)">
        {subtitle}
      </text>
      <rect x={padL} y={y} width={2 * binW} height={h} fill="var(--blue)" fillOpacity="0.22" />
      {binLabels.map((label, i) => (
        <g key={`${title}-${label}`}>
          <rect
            x={padL + i * binW}
            y={y}
            width={binW}
            height={h}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.6"
          />
          <text
            x={padL + (i + 0.5) * binW}
            y={y + 26}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill="var(--ink)"
          >
            {label}
          </text>
        </g>
      ))}
      {edgeLabels.map((edge, i) => (
        <text
          key={`${title}-e-${edge}`}
          x={padL + i * binW}
          y={y + h + 16}
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted)"
        >
          {edge}
        </text>
      ))}
      <line
        x1={cutoffX}
        y1={y - 6}
        x2={cutoffX}
        y2={y + h}
        stroke="var(--red)"
        strokeWidth="2.2"
        strokeDasharray="5 3"
      />
      <text x={cutoffX + 6} y={y - 10} textAnchor="start" fontSize="11" fontWeight="800" fill="var(--red)">
        {cutoffLabel}
      </text>
    </g>
  );
}

export function ContinuityCorrectionIdeaScene() {
  return (
    <SceneFrame kicker="Limit theorems" title="Half-unit correction — a measurement view">
      <Block title="Height is continuous; the ruler is not">
        <p>
          Height <MathText text="$H$" /> is continuous. A ruler records it to the nearest centimetre, so the reading{" "}
          <MathText text="$R$" /> is discrete (1.71 m, 1.53 m, …). A reading of 1.75 m means{" "}
          <MathText text="$H \in [1.745,\, 1.755)$" />. Therefore
        </p>
        <Formula tex="\Pr(R \le 1.75) = \Pr(H < 1.755)" />
        <p className={styles.muted}>
          The recording unit is 0.01 m, so the half-unit is 0.005 m. Shaded bins: the <MathText text="$\le$" /> event,
          up to the red cutoff.
        </p>
      </Block>
      <figure className={styles.chartCard} style={{ marginTop: 16 }}>
        <svg
          viewBox="0 0 640 216"
          role="img"
          aria-label="Rounding bins for height readings and integer counts"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          <RoundingBins
            y={32}
            title="Height H"
            subtitle="reading R"
            binLabels={["1.74", "1.75", "1.76"]}
            edgeLabels={["1.735", "1.745", "1.755", "1.765"]}
            cutoffLabel="cutoff 1.755"
          />
          <RoundingBins
            y={128}
            title="Count X"
            subtitle="integer"
            binLabels={["14", "15", "16"]}
            edgeLabels={["13.5", "14.5", "15.5", "16.5"]}
            cutoffLabel="cutoff 15.5"
          />
        </svg>
      </figure>
      <p className={styles.note}>
        When we approximate a discrete law by a continuous curve, treat the discrete value as a rounded measurement
        and restore the half-unit. (The Normal approximates the <em>shape</em> of the discrete distribution — not that{" "}
        <MathText text="$X$" /> was a rounded continuous height.)
      </p>
    </SceneFrame>
  );
}

export function ContinuityCorrectionScene() {
  return (
    <SceneFrame kicker="Limit theorems" title="Half-unit (Continuity) Correction">
      <p className={styles.lead}>
        For integer-valued <MathText text="$X$" />, the measurement unit is 1, so the half-unit is 0.5. Each integer mass
        is a bar of width 1; the Normal approximation uses the area of that bar.
      </p>
      <Block title="Rules of thumb (for X approximately N(μ, σ²))">
        <Formula tex="\Pr(X \le x) \approx \Phi\!\left(\frac{x + 0.5 - \mu}{\sigma}\right)" />
        <Formula tex="\Pr(X \ge x) \approx 1 - \Phi\!\left(\frac{x - 0.5 - \mu}{\sigma}\right)" />
        <Formula tex="\Pr(a \le X \le b) \approx \Phi\!\left(\frac{b + 0.5 - \mu}{\sigma}\right) - \Phi\!\left(\frac{a - 0.5 - \mu}{\sigma}\right)" />
        <p className={styles.muted}>
          <MathText text="Here $\Phi$ is the standard Normal CDF. Same logic as $\Pr(R\le 1.75)=\Pr(H<1.755)$." />
        </p>
      </Block>
    </SceneFrame>
  );
}

export function CltExampleScene() {
  return (
    <SceneFrame kicker="Limit theorems" title="Central Limit Theorem — Example">
      <Block title="Example">
        <p>
          Biased coin with head probability <MathText text="$\theta = 0.6$" />. Toss <MathText text="$n = 1000$" /> times. Approximately calculate{" "}
          <MathText text="$P(550 \le \text{heads} \le 625)$" />.
        </p>
      </Block>
      <p>
        <MathText text="Let $Y \sim \mathrm{Bin}(1000, 0.6)$. $\mathbb{E}(Y) = 600$, $\mathrm{Var}(Y) = 240$." />
      </p>
      <Formula tex="P(550 \le Y \le 625) \approx P(-3.2598 \le Z \le 1.646) = \Phi(1.646) - \Phi(-3.2598) \approx 0.9496" />
      <p className={styles.muted}>
        <MathText text="where $Z \sim N(0, 1)$. Same idea as the ruler: $Y \ge 550$ uses cutoff $549.5$, and $Y \le 625$ uses cutoff $625.5$." />
      </p>
    </SceneFrame>
  );
}

export function StudentTheoremScene() {
  return (
    <SceneFrame kicker="Student's Theorem" title="Student's Theorem">
      <Block title="Theorem 11 (Student's Theorem)">
        <p>
          <MathText text="Let $X_1, \ldots, X_n$ be i.i.d. $N(\mu, \sigma^2)$. Define" />
        </p>
        <Formula tex="\bar{X} := \frac{1}{n} \sum_{i=1}^n X_i, \quad S^2 := \frac{1}{n - 1} \sum_{i=1}^n (X_i - \bar{X})^2" />
        <p>Then:</p>
        <OrderedList
          items={[
            <MathText key="1" text="$\bar{X}$ has a $N\!\left(\mu, \frac{\sigma^2}{n}\right)$ distribution." />,
            <MathText key="2" text="$\bar{X}$ and $S^2$ are independent." />,
            <MathText key="3" text="$(n - 1)S^2/\sigma^2$ has a $\chi^2(n - 1)$ distribution." />,
            <MathText key="4" text="$T = \dfrac{\bar{X} - \mu}{S/\sqrt{n}}$ has a Student $t$-distribution with $n - 1$ degrees of freedom." />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}
