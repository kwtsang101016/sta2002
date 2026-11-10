import { SignedRankStepGame } from "../games/SignedRankStepGame";
import styles from "../Lecture.module.css";
import { Block, BulletList, Formula, InlineMath, MathText, OrderedList, SceneFrame } from "./shared";

export function SignSetupScene() {
  return (
    <SceneFrame kicker="Sign test" title="Testing a median">
      <BulletList
        items={[
          <MathText
            key="a"
            text="Let $X_1,\ldots,X_n$ be i.i.d. from a continuous distribution with median $m$."
          />,
          <MathText
            key="b"
            text="We test $H_0: m=m_0$ against $H_1: m>m_0$, or $H_1: m<m_0$, or $H_1: m\neq m_0$."
          />,
          <MathText
            key="c"
            text="The sign test counts how many observations fall on the side of $m_0$ that favors $H_1$."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function SignExampleSetupScene() {
  return (
    <SceneFrame kicker="Sign test" title="Call-center example">
      <Block title="Example">
        <p>
          Let <InlineMath tex="X" /> be the time (seconds) between two calls entering a call center, with median{" "}
          <InlineMath tex="m" />. A sample of size <InlineMath tex="n=20" /> is
        </p>
        <Formula
          tex={String.raw`\begin{aligned}
&6.8,\ 5.7,\ 6.9,\ 5.3,\ 4.1,\ 9.8,\ 1.7,\ 7.0,\ 2.1,\ 19.0,\\
&18.9,\ 16.9,\ 10.4,\ 44.1,\ 2.9,\ 2.4,\ 4.8,\ 18.9,\ 4.8,\ 7.9.
\end{aligned}`}
        />
        <p>
          Test <MathText text="$H_0: m=6.2$ vs $H_1: m<6.2$" /> at <MathText text="$\alpha=0.05$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function SignExampleSolutionScene() {
  return (
    <SceneFrame kicker="Sign test" title="Solution">
      <BulletList
        items={[
          <MathText
            key="a"
            text="Let $W=\sum_{i=1}^{20}\mathbf{1}(X_i<6.2)$ be the number of intervals shorter than $6.2$."
          />,
          <MathText
            key="b"
            text="Under $H_0$, $m=6.2$ is the median, so $\Pr(X_i<6.2)=1/2$ and $W\sim\mathrm{Bin}(20,1/2)$."
          />,
          <MathText key="c" text="From the data, the realized value is $w=9$." />,
          <MathText
            key="d"
            text="Large $W$ favors $H_1:m<6.2$, so the $p$-value is $\Pr(W\ge 9;\,W\sim\mathrm{Bin}(20,1/2))=0.748>0.05$."
          />,
        ]}
      />
      <p>
        Fail to reject <MathText text="$H_0$" /> at the 5% level.
      </p>
    </SceneFrame>
  );
}

export function SignTypeIScene() {
  return (
    <SceneFrame kicker="Sign test" title="Type I error of a two-sided critical region">
      <BulletList
        items={[
          <MathText key="a" text="Consider $H_0: m=7.2$ vs $H_1: m\neq 7.2$ with $n=20$." />,
          <MathText
            key="b"
            text="Both large and small values of $W=\#\{i:X_i<7.2\}$ favor $H_1$."
          />,
          <MathText
            key="c"
            text="Critical region $C=\{w\le 5\text{ or }w\ge 15\}$."
          />,
        ]}
      />
      <p>
        Under <MathText text="$H_0$" />, <MathText text="$W\sim\mathrm{Bin}(20,1/2)$" />, so
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
\alpha
&=\Pr(W\le 5\text{ or }W\ge 15;\,H_0)\\
&=\Pr(W\le 5)+\Pr(W\ge 15)=0.0414.
\end{aligned}`}
      />
    </SceneFrame>
  );
}

export function WilcoxonMotivationScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Beyond signs alone">
      <BulletList
        items={[
          <MathText
            key="a"
            text="The sign statistic $W=\sum_{i=1}^n\mathbf{1}(X_i<m_0)$ uses only whether each $X_i$ is below $m_0$."
          />,
          <MathText key="b" text="Limitation: magnitudes $|X_i-m_0|$ are ignored." />,
          "The Wilcoxon signed-rank test uses both the sign and the magnitude of each difference.",
        ]}
      />
    </SceneFrame>
  );
}

export function WilcoxonAssumptionsScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Assumptions and sign function">
      <BulletList
        items={[
          <MathText
            key="a"
            text="Assumption: $X_1,\ldots,X_n$ i.i.d. from a symmetric continuous distribution with median $m$."
          />,
          <MathText key="b" text="Null hypothesis: $H_0: m=m_0$ for a given constant $m_0$." />,
        ]}
      />
      <p>Define</p>
      <Formula
        tex={String.raw`\mathrm{sign}(z)=\begin{cases}
1,& z\ge 0,\\
-1,& z<0.
\end{cases}`}
      />
    </SceneFrame>
  );
}

export function WilcoxonProcedureScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Building the signed-rank statistic">
      <OrderedList
        items={[
          <MathText
            key="a"
            text="Rank $|X_1-m_0|,\ldots,|X_n-m_0|$ in ascending order. Let $R_k$ be the rank of $|X_k-m_0|$."
          />,
          <span key="b">
            Attach the sign of <MathText text="$X_k-m_0$" />: use{" "}
            <MathText text="$+R_k$" /> if <MathText text="$X_k>m_0$" />, and{" "}
            <MathText text="$-R_k$" /> if <MathText text="$X_k<m_0$" />. These are the signed ranks.
          </span>,
          <MathText
            key="c"
            text="Test statistic $W:=\sum_{k=1}^n\mathrm{sign}(X_k-m_0)\cdot R_k$ (Wilcoxon signed-rank statistic)."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function WilcoxonSunfishSetupScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Sunfish lengths — setup">
      <Block title="Example">
        <p>
          Lengths of <InlineMath tex="n=10" /> sunfish:
        </p>
        <Formula tex={String.raw`5.0,\ 3.9,\ 5.2,\ 5.5,\ 2.8,\ 6.1,\ 6.4,\ 2.6,\ 1.7,\ 4.3.`} />
        <p>
          Test <MathText text="$H_0: m=3.7$ vs $H_1: m>3.7$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function WilcoxonSunfishTableScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Sunfish lengths — signed ranks">
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th />
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InlineMath tex="x_k-m_0" />
              </td>
              <td>1.3</td>
              <td>0.2</td>
              <td>1.5</td>
              <td>1.8</td>
              <td>−0.9</td>
              <td>2.4</td>
              <td>2.7</td>
              <td>−1.1</td>
              <td>−2.0</td>
              <td>0.6</td>
            </tr>
            <tr>
              <td>
                <InlineMath tex="|x_k-m_0|" />
              </td>
              <td>1.3</td>
              <td>0.2</td>
              <td>1.5</td>
              <td>1.8</td>
              <td>0.9</td>
              <td>2.4</td>
              <td>2.7</td>
              <td>1.1</td>
              <td>2.0</td>
              <td>0.6</td>
            </tr>
            <tr>
              <td>Ranks</td>
              <td>5</td>
              <td>1</td>
              <td>6</td>
              <td>7</td>
              <td>3</td>
              <td>9</td>
              <td>10</td>
              <td>4</td>
              <td>8</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Signed ranks</td>
              <td>5</td>
              <td>1</td>
              <td>6</td>
              <td>7</td>
              <td>−3</td>
              <td>9</td>
              <td>10</td>
              <td>−4</td>
              <td>−8</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Formula tex={String.raw`w=5+1+6+7-3+9+10-4-8+2=25.`} />
      <p className={styles.note}>
        <strong>Question.</strong> What is the distribution of <InlineMath tex="W" /> under{" "}
        <MathText text="$H_0$" />?
      </p>
    </SceneFrame>
  );
}

export function WilcoxonNullDistScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Null distribution via signed integers">
      <p>
        Consider <MathText text="$V=\sum_{k=1}^n V_k$" />, where the <MathText text="$V_k$" /> are independent and
      </p>
      <Formula
        tex={String.raw`V_k=\begin{cases}
k,&\text{with probability }1/2,\\
-k,&\text{with probability }1/2.
\end{cases}`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text="Under $H_0$, $W$ has the same distribution as $V$: it is a sum of $\{1,\ldots,n\}$ each with an independent $\pm$ sign."
          />,
          <MathText key="b" text="Independence of signs follows from independence of the $X_k$." />,
          <MathText key="c" text="Under $H_0$, each sign is $+1$ or $-1$ with equal probability $1/2$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function LyapunovNoteScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Lyapunov’s CLT (background)">
      <Block title="Theorem (Lyapunov)">
        <p>
          For independent <MathText text="$X_k$" /> with means <MathText text="$\mu_k$" />, variances{" "}
          <MathText text="$\sigma_k^2$" />, and finite <MathText text="$(2+\delta)$" />-th moments for some{" "}
          <MathText text="$\delta>0$" />,
        </p>
        <Formula
          tex={String.raw`\frac{\sum_{k=1}^n(X_k-\mu_k)}{\sqrt{\sum_{k=1}^n\sigma_k^2}}\xrightarrow{d} N(0,1).`}
        />
      </Block>
      <p className={styles.muted}>
        Lyapunov’s CLT is not required for this course; we only need the resulting normal approximation for{" "}
        <InlineMath tex="W" />.
      </p>
    </SceneFrame>
  );
}

export function WilcoxonNormalApproxScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Normal approximation under $H_0$">
      <BulletList
        items={[
          <MathText
            key="a"
            text="For each $V_k$: $\mathbb{E}(V_k)=0$, $\mathrm{Var}(V_k)=k^2$, and $\mathbb{E}(V_k^3)=0$."
          />,
          <MathText
            key="b"
            text="Thus the three conditions of Lyapunov’s CLT hold for $V$ (take $\delta=1$)."
          />,
          <MathText
            key="c"
            text="Hence $T_n=V$ and $s_n^2=\mathrm{Var}(V)=\sum_{k=1}^n k^2=\dfrac{n(n+1)(2n+1)}{6}$."
          />,
        ]}
      />
      <p>Apply Lyapunov’s CLT:</p>
      <Formula
        tex={String.raw`\boxed{\displaystyle
\frac{W}{\sqrt{\dfrac{n(n+1)(2n+1)}{6}}}\overset{\mathrm{approx}}{\sim} N(0,1)
\quad\text{under }H_0.}`}
      />
    </SceneFrame>
  );
}

export function WilcoxonContinuityScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Whole-unit continuity correction">
      <BulletList
        items={[
          <MathText
            key="a"
            text="For binomial counts, half-unit correction approximates $\Pr(X\le k)$ by $\Pr(X\le k+0.5)$."
          />,
          <MathText
            key="b"
            text="The signed-rank statistic $W$ moves in steps of $2$, so we use a whole-unit correction:"
          />,
        ]}
      />
      <Formula
        tex={String.raw`\Pr(W\le k)\approx\Phi\!\left(
\frac{k+1}{\sqrt{\dfrac{n(n+1)(2n+1)}{6}}}
\right).`}
      />
      <p>
        <MathText text="Use this form when computing approximate significance levels and $p$-values." />
      </p>
      <SignedRankStepGame />
    </SceneFrame>
  );
}

export function WilcoxonSunfishPvalueScene() {
  return (
    <SceneFrame kicker="Wilcoxon" title="Sunfish example — $p$-value">
      <BulletList
        items={[
          <MathText key="a" text="Test $H_0: m=3.7$ vs $H_1: m>3.7$ with $n=10$ and $w=25$." />,
          <MathText
            key="b"
            text="Variance $\dfrac{n(n+1)(2n+1)}{6}=385$, so $W\overset{\mathrm{approx}}{\sim} N(0,385)$ under $H_0$."
          />,
          <MathText
            key="c"
            text="Large $W$ favors $H_1$, so $p=\Pr(W\ge 25;H_0)=1-\Pr(W\le 23;H_0)$."
          />,
        ]}
      />
      <Formula
        tex={String.raw`p\approx 1-\Phi\!\left(\frac{24}{\sqrt{385}}\right)=0.11.`}
      />
      <p>
        Fail to reject <MathText text="$H_0$" /> at the 5% level.
      </p>
    </SceneFrame>
  );
}

export function TiesRulesScene() {
  return (
    <SceneFrame kicker="Ties" title="Data with ties">
      <BulletList
        items={[
          "Under a continuous model, ties have probability zero — but they appear in practice.",
          <MathText
            key="b"
            text="If $x_k=m_0$ for some $k$: delete those observations and continue with the reduced sample size."
          />,
          <MathText
            key="c"
            text="If $|x_k-m_0|=|x_j-m_0|$ for $k\neq j$: assign the average of the corresponding ranks to each tied observation."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function TiesExampleSetupScene() {
  return (
    <SceneFrame kicker="Ties" title="Example with $x_k=m_0$ and tied $|x_k-m_0|$">
      <Block title="Example">
        <p>
          Symmetric continuous median <InlineMath tex="m" />. Test{" "}
          <MathText text="$H_0: m=160$ vs $H_1: m>160$" /> with <InlineMath tex="n=16" />:
        </p>
        <Formula
          tex={String.raw`\begin{aligned}
&176.9,\ 158.3,\ 152.1,\ 158.8,\ 172.4,\ 169.8,\ 159.7,\ 161.2,\\
&156.6,\ 174.5,\ 184.4,\ 165.2,\ 147.8,\ 177.8,\ \mathbf{160.0},\ \mathbf{160.0}.
\end{aligned}`}
        />
        <p>
          Two observations equal <InlineMath tex="m_0=160" />; also{" "}
          <MathText text="$|158.8-160|=|161.2-160|=1.2$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function TiesExampleRanksScene() {
  return (
    <SceneFrame kicker="Ties" title="Reduced sample and average ranks">
      <p>
        Delete the two <InlineMath tex="160.0" /> values → <InlineMath tex="n=14" />. Average ranks for the tied
        absolute differences of <InlineMath tex="1.2" />: <InlineMath tex="(2+3)/2=2.5" />. Underlined absolute
        differences correspond to <MathText text="$x_k-160<0$" />.
      </p>
      <div className={styles.tableWrap}>
        <table>
          <tbody>
            <tr>
              <th>
                <InlineMath tex="x_k" />
              </th>
              <td>159.7</td>
              <td>158.8</td>
              <td>161.2</td>
              <td>158.3</td>
              <td>156.6</td>
              <td>165.2</td>
              <td>169.8</td>
            </tr>
            <tr>
              <th>
                <InlineMath tex="|x_k-160|" />
              </th>
              <td>
                <u>0.3</u>
              </td>
              <td>
                <u>1.2</u>
              </td>
              <td>1.2</td>
              <td>
                <u>1.7</u>
              </td>
              <td>
                <u>3.4</u>
              </td>
              <td>5.2</td>
              <td>9.8</td>
            </tr>
            <tr>
              <th>Rank</th>
              <td>1</td>
              <td>2.5</td>
              <td>2.5</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <th>Signed rank</th>
              <td>−1</td>
              <td>−2.5</td>
              <td>+2.5</td>
              <td>−4</td>
              <td>−5</td>
              <td>+6</td>
              <td>+7</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.tableWrap} style={{ marginTop: 12 }}>
        <table>
          <tbody>
            <tr>
              <th>
                <InlineMath tex="x_k" />
              </th>
              <td>172.4</td>
              <td>174.5</td>
              <td>176.9</td>
              <td>177.8</td>
              <td>184.4</td>
              <td>152.1</td>
              <td>147.8</td>
            </tr>
            <tr>
              <th>
                <InlineMath tex="|x_k-160|" />
              </th>
              <td>12.4</td>
              <td>14.5</td>
              <td>16.9</td>
              <td>17.8</td>
              <td>24.4</td>
              <td>
                <u>7.9</u>
              </td>
              <td>
                <u>12.2</u>
              </td>
            </tr>
            <tr>
              <th>Rank</th>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <th>Signed rank</th>
              <td>+8</td>
              <td>+9</td>
              <td>+10</td>
              <td>+11</td>
              <td>+12</td>
              <td>−13</td>
              <td>−14</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SceneFrame>
  );
}

export function TiesExampleConclusionScene() {
  return (
    <SceneFrame kicker="Ties" title="Conclusion at $\alpha=0.05$">
      <Formula
        tex={String.raw`\begin{aligned}
w&=-1-2.5+2.5-4-5+6+7+8+9+10+11+12-13-14\\
&=26.
\end{aligned}`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text="$\sigma_W^2=\dfrac{14\cdot 15\cdot 29}{6}=1015$, so $\sigma_W=\sqrt{1015}\approx 31.86$."
          />,
          <MathText
            key="b"
            text="One-sided 5% critical value: reject if $w\ge z_{0.05}\sigma_W\approx 1.645\cdot 31.86\approx 52.41$."
          />,
          <MathText key="c" text="Since $w=26<52.41$, fail to reject $H_0$ at $\alpha=0.05$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Takeaways" tone="gold">
      <BulletList
        items={[
          <span key="a">
            <strong>Sign test</strong> (continuous i.i.d.):{" "}
            <MathText text="$W=\sum\mathbf{1}(X_i<m_0)\sim\mathrm{Bin}(n,1/2)$" /> under{" "}
            <MathText text="$H_0:m=m_0$" />.
          </span>,
          <span key="b">
            <strong>Wilcoxon signed-rank</strong> (symmetric continuous i.i.d.):{" "}
            <MathText text="$W=\sum\mathrm{sign}(X_k-m_0)R_k$" /> with{" "}
            <MathText text="$W\overset{\mathrm{approx}}{\sim} N\!\bigl(0,\tfrac{n(n+1)(2n+1)}{6}\bigr)$" /> under{" "}
            <MathText text="$H_0$" />.
          </span>,
          <MathText
            key="c"
            text="Use whole-unit continuity correction when approximating tail probabilities for $W$."
          />,
          <MathText
            key="d"
            text="Ties: drop $x_k=m_0$; average ranks for tied $|x_k-m_0|$."
          />,
        ]}
      />
    </SceneFrame>
  );
}
