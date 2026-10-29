import styles from "../Lecture.module.css";
import { Block, BulletList, Formula, MathText, SceneFrame } from "./shared";

export function MedianN5SetupScene() {
  return (
    <SceneFrame kicker="Median CI" title="Intuitive example: $n=5$">
      <Block title="Goal">
        <p>
          Random sample <MathText text="$X_1,\dots,X_5\overset{\mathrm{i.i.d.}}{\sim} F$" /> with unknown continuous{" "}
          <MathText text="$F$" />. Infer the median <MathText text="$m=\pi_{0.5}$" />.
        </p>
      </Block>
      <BulletList
        items={[
          <>
            Order statistics: <MathText text="$X_{(1)},X_{(2)},\dots,X_{(5)}$" />.
          </>,
          <>
            Point estimator: sample median <MathText text="$X_{(3)}$" />, with{" "}
            <MathText text="$\mathbb{E}(F(X_{(3)}))=\tfrac12$" />.
          </>,
          <>
            Consider the interval <MathText text="$(X_{(1)}, X_{(5)})$" /> as a CI for <MathText text="$m$" />.
          </>,
          <>
            <strong>Question:</strong> what is the confidence level?
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function MedianN5LevelScene() {
  return (
    <SceneFrame kicker="Median CI" title="Coverage of $(X_{(1)}, X_{(5)})$">
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(1)} < m < X_{(5)})
&= 1 - \Pr(X_{(1)}\ge m) - \Pr(X_{(5)}\le m)\\
&= 1 - 0.5^5 - 0.5^5 = \frac{15}{16}\approx 94\%.
\end{aligned}`}
      />
      <BulletList
        items={[
          <>
            So <MathText text="$(X_{(1)}, X_{(5)})$" /> is a <strong>94%</strong> CI for <MathText text="$m$" />.
          </>,
          <>
            Observed sample <MathText text="$\{8.7,0.1,4.4,3.1,6.0\}$" /> → realized CI{" "}
            <MathText text="$(0.1, 8.7)$" />.
          </>,
          <>
            <strong>Remark:</strong> only i.i.d. continuous <MathText text="$F$" /> was used — no parametric form.
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function GeneralMinMaxScene() {
  return (
    <SceneFrame kicker="Median CI" title="General result: $(X_{(1)}, X_{(n)})$">
      <p>
        For <MathText text="$X_1,\dots,X_n\overset{\mathrm{i.i.d.}}{\sim} F$" /> continuous with median{" "}
        <MathText text="$m$" />,
      </p>
      <Formula tex={String.raw`(X_{(1)}, X_{(n)})\text{ is a }100\bigl(1-\tfrac{1}{2^{n-1}}\bigr)\%\text{ CI for }m.`} />
      <Formula
        tex={String.raw`\Pr(X_{(1)} < m < X_{(n)}) = 1 - \tfrac{1}{2^n} - \tfrac{1}{2^n} = 1 - \tfrac{1}{2^{n-1}}.`}
      />
    </SceneFrame>
  );
}

export function N16SetupScene() {
  return (
    <SceneFrame kicker="Median CI" title="Example: $n=16$, interval $(X_{(4)}, X_{(11)})$">
      <p>
        What is the confidence level of <MathText text="$(X_{(4)}, X_{(11)})$" /> for the median{" "}
        <MathText text="$m=\pi_{0.5}$" />?
      </p>
      <BulletList
        items={[
          <>
            Let <MathText text="$W$" /> = number of <MathText text="$X_i$" /> that are less than{" "}
            <MathText text="$m$" />.
          </>,
          <>
            <MathText text="$\Pr(X_{(4)} < m < X_{(11)}) = \Pr(4 \le W \le 10)$" />.
          </>,
          <>
            Indicator: <MathText text="$\mathbf{1}(X_i < m)$" />; then{" "}
            <MathText text="$W=\sum_{i=1}^{16}\mathbf{1}(X_i < m)$" />.
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function N16BinomialScene() {
  return (
    <SceneFrame kicker="Median CI" title="Binomial coverage for $n=16$">
      <p>
        Since <MathText text="$\Pr(X_i < m)=1/2$" />,
      </p>
      <Formula tex={String.raw`W\sim\mathrm{Bin}(16,1/2).`} />
      <Formula
        tex={String.raw`\Pr(X_{(4)} < m < X_{(11)}) = \Pr(4\le W\le 10)=\sum_{k=4}^{10}\binom{16}{k}\Bigl(\tfrac12\Bigr)^{16}=0.8843.`}
      />
      <BulletList
        items={[
          <>
            Thus <MathText text="$(X_{(4)}, X_{(11)})$" /> is an <strong>88.43%</strong> CI for{" "}
            <MathText text="$m$" />.
          </>,
          <>
            Compute via CDF: <MathText text="$\Pr(4\le W\le 10)=\Pr(W\le 10)-\Pr(W\le 3)$" /> (R{" "}
            <code>pbinom</code> / Python).
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function GeneralMedianIjScene() {
  return (
    <SceneFrame kicker="Median CI" title="General: $(X_{(i)}, X_{(j)})$ for the median">
      <p>
        For continuous i.i.d. sample with median <MathText text="$m$" />, and <MathText text="$i < j$" />,
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(i)} < m < X_{(j)})
&= \Pr(i \le W \le j-1)\\
&= \sum_{k=i}^{j-1}\binom{n}{k}\Bigl(\tfrac12\Bigr)^n,
\end{aligned}`}
      />
      <p>
        where <MathText text="$W=\sum_{i=1}^{n}\mathbf{1}(X_i < m)\sim\mathrm{Bin}(n,1/2)$" />.
      </p>
    </SceneFrame>
  );
}

export function CltSetupScene() {
  return (
    <SceneFrame kicker="CLT approximation" title="When $n$ is large">
      <BulletList
        items={[
          <>
            Exact sum <MathText text="$\sum_{k=i}^{j-1}\binom{n}{k}(1/2)^n$" /> gets tedious for large{" "}
            <MathText text="$n$" />.
          </>,
          "Approximate the binomial with a normal via the CLT.",
        ]}
      />
      <Block title="Example">
        <p>
          <MathText text="$n=27$" />. Approximate confidence level of <MathText text="$(X_{(10)}, X_{(18)})$" /> for{" "}
          <MathText text="$m$" />?
        </p>
      </Block>
    </SceneFrame>
  );
}

export function CltApproxScene() {
  return (
    <SceneFrame kicker="CLT approximation" title="Half-unit correction ($n=27$)">
      <p>
        <MathText text="$W\sim\mathrm{Bin}(27,1/2)$" /> with <MathText text="$\mathbb{E}(W)=13.5$" />,{" "}
        <MathText text="$\mathrm{Var}(W)=27/4$" />. By CLT, <MathText text="$W\overset{\mathrm{approx}}{\sim} N(13.5,27/4)$" />.
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(10)} < m < X_{(18)})
&= \Pr(10\le W\le 17)=\Pr(9.5 < W < 17.5)\\
&\approx \Phi(1.5396)-\Phi(-1.5396)=0.8764.
\end{aligned}`}
      />
      <p className={styles.muted}>Exact probability is 0.8779 — the normal approximation is close.</p>
    </SceneFrame>
  );
}

export function OtherQuantileSetupScene() {
  return (
    <SceneFrame kicker="Other quantiles" title="CI for $\pi_{0.25}$ ($n=25$)">
      <BulletList
        items={[
          <>
            Same idea for a general percentile <MathText text="$\pi_p$" />, not only the median.
          </>,
          <>
            <MathText text="$p(n+1)=0.25\times 26=6.5$" /> → point estimator{" "}
            <MathText text="$\hat\pi_{0.25}=\tfrac12 x_{(6)}+\tfrac12 x_{(7)}$" />.
          </>,
          <>
            Let <MathText text="$W$" /> = number of <MathText text="$X_i$" /> less than{" "}
            <MathText text="$\pi_{0.25}$" />. Then <MathText text="$W\sim\mathrm{Bin}(25,0.25)$" />.
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function OtherQuantileApproxScene() {
  return (
    <SceneFrame kicker="Other quantiles" title="Level of $(X_{(3)}, X_{(10)})$ for $\pi_{0.25}$">
      <Formula
        tex={String.raw`\Pr(X_{(3)} < \pi_{0.25} < X_{(10)}) = \Pr(3\le W\le 9)=\sum_{k=3}^{9}\binom{25}{k}(0.25)^k(0.75)^{25-k}.`}
      />
      <p>With half-unit correction and <MathText text="$\mu=6.25$" />, <MathText text="$\sigma^2=4.6875$" />:</p>
      <Formula
        tex={String.raw`\Pr(2.5 < W < 9.5)\approx \Phi\!\Bigl(\frac{9.5-6.25}{\sqrt{4.6875}}\Bigr)-\Phi\!\Bigl(\frac{2.5-6.25}{\sqrt{4.6875}}\Bigr)=0.8917.`}
      />
      <p>
        Realized <MathText text="$(x_{(3)}, x_{(10)})$" /> is an approximate <strong>89.17%</strong> CI for{" "}
        <MathText text="$\pi_{0.25}$" />.
      </p>
    </SceneFrame>
  );
}

export function GeneralPiPScene() {
  return (
    <SceneFrame kicker="General $\pi_p$" title="Exact coverage for any percentile">
      <p>
        For <MathText text="$\pi_p$" />, <MathText text="$p\in[0,1]$" />, let{" "}
        <MathText text="$W=\sum_{i=1}^{n}\mathbf{1}(X_i < \pi_p)\sim\mathrm{Bin}(n,p)$" />.
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(i)} < \pi_p < X_{(j)})
&= \Pr(i\le W\le j-1)\\
&= \sum_{k=i}^{j-1}\binom{n}{k}p^k(1-p)^{n-k}.
\end{aligned}`}
      />
      <p>Use the exact binomial sum or a normal approximation.</p>
    </SceneFrame>
  );
}

export function GeneralCltScene() {
  return (
    <SceneFrame kicker="General $\pi_p$" title="CLT + continuity correction">
      <Formula tex={String.raw`W\overset{\mathrm{approx}}{\sim} N\bigl(np,\ np(1-p)\bigr).`} />
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(i)} < \pi_p < X_{(j)})
&= \Pr(i-0.5 < W < j-0.5)\\
&\approx \Phi\!\Bigl(\frac{j-0.5-np}{\sqrt{np(1-p)}}\Bigr)
-\Phi\!\Bigl(\frac{i-0.5-np}{\sqrt{np(1-p)}}\Bigr).
\end{aligned}`}
      />
    </SceneFrame>
  );
}

export function CommuteSetupScene() {
  return (
    <SceneFrame kicker="Example" title="Commute times ($n=16$)">
      <p>
        Sorted one-way commute times (minutes) for 16 employees:
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
&13.3,\ 17.4,\ 20.7,\ 27.6,\ 28.8,\ 29.6,\ 35.8,\ 38.2,\\
&41.1,\ 42.2,\ 43.8,\ 50.4,\ 50.6,\ 72.0,\ 78.1,\ 84.7.
\end{aligned}`}
      />
      <BulletList
        items={[
          <>
            Estimate the 30th percentile <MathText text="$\pi_{0.3}$" />.
          </>,
          <>
            Confidence level of <MathText text="$(x_{(2)}, x_{(9)})=(17.4, 41.1)$" />.
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function CommutePointScene() {
  return (
    <SceneFrame kicker="Example" title="Point estimate of $\pi_{0.3}$">
      <Formula tex={String.raw`(n+1)p = 17\times 0.3 = 5.1.`} />
      <Formula
        tex={String.raw`\hat\pi_{0.3}=x_{(5)}+0.1(x_{(6)}-x_{(5)})=28.8+0.1(29.6-28.8)=28.88.`}
      />
      <p>About 70% of employees have commute time above 28.88 minutes.</p>
    </SceneFrame>
  );
}

export function CommuteCiScene() {
  return (
    <SceneFrame kicker="Example" title="Approximate level of $(17.4, 41.1)$">
      <p>
        <MathText text="$W\sim\mathrm{Bin}(16,0.3)$" />; level of <MathText text="$(X_{(2)}, X_{(9)})$" /> is{" "}
        <MathText text="$\Pr(2\le W\le 8)$" />.
      </p>
      <Formula tex={String.raw`W\overset{\mathrm{approx}}{\sim} N(4.8,\ 3.36).`} />
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(1.5 < W < 8.5)
&\approx \Phi(2.019)-\Phi(-1.800)=0.9423.
\end{aligned}`}
      />
      <p>
        Approximate <strong>94.23%</strong> chance that <MathText text="$\pi_{0.3}$" /> lies between 17.4 and 41.1
        minutes.
      </p>
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Takeaways" tone="gold">
      <BulletList
        items={[
          <>
            Infer quantile <MathText text="$\pi_p$" /> using order statistics — distribution-free for continuous{" "}
            <MathText text="$F$" />.
          </>,
          <>
            Point estimate:{" "}
            <MathText text="$\hat\pi_p=X_{(a)}+(p(n+1)-a)(X_{(a+1)}-X_{(a)})$" />,{" "}
            <MathText text="$a=\lfloor p(n+1)\rfloor$" />.
          </>,
          <>
            Interval: for <MathText text="$i < a < j$" />, <MathText text="$(X_{(i)}, X_{(j)})$" /> has level{" "}
            <MathText text="$\Pr(i\le W\le j-1)$" />.
          </>,
          <>
            <MathText text="$W=\sum\mathbf{1}(X_i < \pi_p)\sim\mathrm{Bin}(n,p)$" />, or approx.{" "}
            <MathText text="$N(np, np(1-p))$" /> with continuity correction.
          </>,
        ]}
      />
    </SceneFrame>
  );
}
