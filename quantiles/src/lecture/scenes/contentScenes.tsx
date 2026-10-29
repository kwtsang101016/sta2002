import styles from "../Lecture.module.css";
import { Block, BulletList, Figure, Formula, InlineMath, MathText, SceneFrame } from "./shared";

export function QuantileDefScene() {
  return (
    <SceneFrame kicker="Quantile" title="Definition">
      <Block title="Definition">
        <p>
          The <strong>
            <MathText text="$p$" />
            -th quantile
          </strong>{" "}
          (or <MathText text="$100p$" />
          -th percentile) of a distribution with CDF <InlineMath tex="F" /> is the value{" "}
          <MathText text="$\pi_p$" /> such that
        </p>
        <Formula tex={String.raw`F(\pi_p)=\Pr(X\leq\pi_p;\,X\sim F)=p.`} />
      </Block>
      <BulletList
        items={[
          <MathText key="a" text="When $p=1/2$, $\pi_{1/2}$ is the median of $F$." />,
          <MathText
            key="b"
            text="When $p=1/4$ or $3/4$, $\pi_{1/4}$ and $\pi_{3/4}$ are the first and third quartiles."
          />,
          <MathText
            key="c"
            text="The critical value $z_\alpha$ is the $(1-\alpha)$-th quantile of the standard normal."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function NormalQuantileScene() {
  return (
    <SceneFrame kicker="Quantile" title="Normal distributions">
      <BulletList
        items={[
          <MathText key="a" text="Consider the $p$-th quantile of $X\sim N(\mu,\sigma^2)$:" />,
        ]}
      />
      <Formula
        tex={String.raw`p=\Pr(X\leq\pi_p)=\Pr\left(Z\leq\frac{\pi_p-\mu}{\sigma};\,Z\sim N(0,1)\right).`}
      />
      <p>Then</p>
      <Formula tex={String.raw`\frac{\pi_p-\mu}{\sigma}=z_{1-p},`} />
      <p>so</p>
      <Formula tex={String.raw`\pi_p=\mu+\sigma\,z_{1-p}.`} />
      <p>
        More generally, when the CDF is known and invertible,{" "}
        <MathText text="$F(\pi_p)=p\Rightarrow\pi_p=F^{-1}(p)$" />.
      </p>
      <p className={styles.note}>
        <strong>Question.</strong> Given a sample without knowing <InlineMath tex="F" />, how can we estimate{" "}
        <MathText text="$\pi_p$" />?
      </p>
    </SceneFrame>
  );
}

export function SampleQuantileMotivationScene() {
  return (
    <SceneFrame kicker="Sample quantile" title="Link to order statistics">
      <BulletList
        items={[
          <MathText
            key="a"
            text="Recall $F(X_{(k)})\sim\mathrm{Beta}(k,n-k+1)$, so $\mathbb{E}\bigl(F(X_{(k)})\bigr)=\dfrac{k}{n+1}$."
          />,
          <MathText
            key="b"
            text="For the $k$-th order statistic of the data, roughly $x_{(k)}\approx F^{-1}\!\left(\dfrac{k}{n+1}\right)$."
          />,
          <MathText
            key="c"
            text="A natural estimate of $\pi_{k/(n+1)}$ is therefore $\hat\pi_{k/(n+1)}=x_{(k)}$."
          />,
        ]}
      />
      <p className={styles.note}>
        <strong>Question.</strong> How do we define <MathText text="$\hat\pi_p$" /> when{" "}
        <MathText text="$\dfrac{k}{n+1}<p<\dfrac{k+1}{n+1}$" />?
      </p>
    </SceneFrame>
  );
}

export function SampleQuantileFormulaScene() {
  return (
    <SceneFrame kicker="Sample quantile" title="Linear interpolation">
      <BulletList
        items={[
          <MathText
            key="a"
            text="For $p\in\bigl[\tfrac{1}{n+1},\tfrac{n}{n+1}\bigr]$, let $k=\lfloor p(n+1)\rfloor$. Then $\tfrac{k}{n+1}\le p<\tfrac{k+1}{n+1}$."
          />,
          <span key="b">
            Interpolate linearly between <MathText text="$\hat\pi_{k/(n+1)}=x_{(k)}$" /> and{" "}
            <MathText text="$\hat\pi_{(k+1)/(n+1)}=x_{(k+1)}$" />:
          </span>,
        ]}
      />
      <Formula
        tex={String.raw`\frac{\hat\pi_p-x_{(k)}}{p-\frac{k}{n+1}}
=\frac{x_{(k+1)}-x_{(k)}}{\frac{k+1}{n+1}-\frac{k}{n+1}}.`}
      />
      <Block title="Definition">
        <p>
          The <MathText text="$p$" />-th sample quantile is
        </p>
        <Formula
          tex={String.raw`\hat\pi_p=x_{(k)}+\bigl(p(n+1)-k\bigr)\bigl(x_{(k+1)}-x_{(k)}\bigr),`}
        />
        <p>
          where <MathText text="$k=\lfloor p(n+1)\rfloor$" /> and{" "}
          <MathText text="$p\in\bigl[\tfrac{1}{n+1},\tfrac{n}{n+1}\bigr]$" />.
        </p>
      </Block>
      <p>
        Edge cases: <MathText text="$\hat\pi_p=x_{(1)}$" /> for{" "}
        <MathText text="$p<\tfrac{1}{n+1}$" />, and <MathText text="$\hat\pi_p=x_{(n)}$" /> for{" "}
        <MathText text="$p>\tfrac{n}{n+1}$" />.
      </p>
    </SceneFrame>
  );
}

export function SampleMedianScene() {
  return (
    <SceneFrame kicker="Sample quantile" title="Special case: the median">
      <p>
        For the median <MathText text="$\pi_{1/2}$" />:
      </p>
      <BulletList
        items={[
          <MathText
            key="a"
            text="If $n$ is odd, $p(n+1)=(n+1)/2$ is an integer, so $\hat\pi_{1/2}=X_{((n+1)/2)}$."
          />,
          <MathText
            key="b"
            text="If $n$ is even, $k=\lfloor(n+1)/2\rfloor=n/2$, so $\hat\pi_{1/2}=\dfrac{X_{(n/2)}+X_{(n/2+1)}}{2}$."
          />,
        ]}
      />
      <Formula
        tex={String.raw`\hat\pi_{1/2}=
\begin{cases}
X_{((n+1)/2)}, & n\text{ odd},\\[4pt]
\dfrac{X_{(n/2)}+X_{(n/2+1)}}{2}, & n\text{ even}.
\end{cases}`}
      />
    </SceneFrame>
  );
}

export function QuantileExampleSetupScene() {
  return (
    <SceneFrame kicker="Example" title="A small data set">
      <Block title="Example">
        <p>Suppose we have the following ordered data (<MathText text="$n=5$" />):</p>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>
                  <InlineMath tex="i" />
                </th>
                <th>
                  <InlineMath tex="x_{(i)}" />
                </th>
                <th>
                  <InlineMath tex="i/(n+1)" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>−3.9</td>
                <td>1/6</td>
              </tr>
              <tr>
                <td>2</td>
                <td>−2.0</td>
                <td>2/6</td>
              </tr>
              <tr>
                <td>3</td>
                <td>1.7</td>
                <td>3/6</td>
              </tr>
              <tr>
                <td>4</td>
                <td>7.3</td>
                <td>4/6</td>
              </tr>
              <tr>
                <td>5</td>
                <td>11.7</td>
                <td>5/6</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Compute the sample median and the sample quantile <MathText text="$\hat\pi_{0.4}$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function QuantileExampleSolutionScene() {
  return (
    <SceneFrame kicker="Example" title="Solution">
      <BulletList
        items={[
          <MathText key="a" text="Sample median: $\hat\pi_{1/2}=x_{(3)}=1.7$." />,
          <MathText key="b" text="For $p=0.4$, $k=\lfloor 0.4\times 6\rfloor=\lfloor 2.4\rfloor=2$, so" />,
        ]}
      />
      <Formula
        tex={String.raw`\hat\pi_{0.4}=x_{(2)}+(0.4\times 6-2)\bigl(x_{(3)}-x_{(2)}\bigr)
=-2+0.4\times 3.7=-0.52.`}
      />
    </SceneFrame>
  );
}

export function BiasIntroScene() {
  return (
    <SceneFrame kicker="Extended discussion" title="Unbiasedness?">
      <BulletList
        items={[
          <span key="a">
            We have <MathText text="$\mathbb{E}\bigl(F(X_{(k)})\bigr)=\dfrac{k}{n+1}$" />, but we do{" "}
            <strong>not</strong> have{" "}
            <MathText text="$\mathbb{E}(X_{(k)})=F^{-1}\!\left(\dfrac{k}{n+1}\right)$" /> in general.
          </span>,
          <MathText
            key="b"
            text="So the sample quantile $\hat\pi_p$ need not be an unbiased estimator of $\pi_p$."
          />,
        ]}
      />
      <Block title="Example">
        <p>
          Let <MathText text="$X_1,\ldots,X_5\overset{\mathrm{i.i.d.}}{\sim}\mathrm{Exp}(1)$" />. Show that the
          sample median <MathText text="$X_{(3)}$" /> is not unbiased for{" "}
          <MathText text="$m=\pi_{1/2}$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function BiasPdfScene() {
  return (
    <SceneFrame kicker="Extended discussion" title="PDF of $X_{(3)}$ for Exp(1)">
      <p>
        For Exp(1), <MathText text="$F(x)=1-e^{-x}$" />, <MathText text="$f(x)=e^{-x}$" /> (
        <MathText text="$x>0$" />). With <MathText text="$k=3$" />, <MathText text="$n=5$" />,
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
f_{X_{(3)}}(x)
&=\frac{5!}{2!\,2!}\,[1-e^{-x}]^2\,[e^{-x}]^2\,e^{-x}\\
&=30\,[1-e^{-x}]^2\,e^{-3x}
=30\bigl(e^{-3x}-2e^{-4x}+e^{-5x}\bigr).
\end{aligned}`}
      />
      <Formula
        tex={String.raw`\mathbb{E}[X_{(3)}]
=\int_0^\infty x\cdot 30\bigl(e^{-3x}-2e^{-4x}+e^{-5x}\bigr)\,dx
=30\Biggl[\int_0^\infty xe^{-3x}\,dx
-2\int_0^\infty xe^{-4x}\,dx
+\int_0^\infty xe^{-5x}\,dx\Biggr].`}
      />
    </SceneFrame>
  );
}

export function BiasResultScene() {
  return (
    <SceneFrame kicker="Extended discussion" title="Bias of the Exp(1) sample median">
      <p>
        Using <MathText text="$\displaystyle\int_0^\infty x e^{-ax}\,dx=\dfrac{1}{a^2}$" /> (
        <MathText text="$a>0$" />),
      </p>
      <Formula
        tex={String.raw`\mathbb{E}[X_{(3)}]
=30\left[\frac{1}{9}-\frac{2}{16}+\frac{1}{25}\right]
\approx 0.7833.`}
      />
      <p>True population median of Exp(1):</p>
      <Formula tex={String.raw`F(m)=1-e^{-m}=\tfrac12\quad\Rightarrow\quad m=\ln 2\approx 0.6931.`} />
      <p>
        Therefore <MathText text="$X_{(3)}$" /> is a <strong>biased</strong> estimator of{" "}
        <MathText text="$m$" />.
      </p>
    </SceneFrame>
  );
}

export function QqMotivationScene() {
  return (
    <SceneFrame kicker="Q-Q plots" title="Motivation">
      <BulletList
        items={[
          "Given a sample, we may suspect whether it comes from a named distribution (normal, exponential, gamma, …).",
          <MathText
            key="b"
            text="If $X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim} F$, then $\mathbb{E}\bigl(F(X_{(i)})\bigr)=\dfrac{i}{n+1}$."
          />,
          <MathText
            key="c"
            text="So the pairs $\bigl(F(x_{(i)}),\,i/(n+1)\bigr)$ should lie near the diagonal $y=x$."
          />,
          <span key="d">
            Applying <MathText text="$F^{-1}$" />, we instead plot
          </span>,
        ]}
      />
      <Formula
        tex={String.raw`\Bigl(
\underbrace{x_{(i)}}_{\text{sample quantile}},\;
\underbrace{F^{-1}\!\bigl(\tfrac{i}{n+1}\bigr)=\pi_{i/(n+1)}}_{\text{theoretical quantile}}
\Bigr)_{i=1}^n.`}
      />
    </SceneFrame>
  );
}

export function QqExampleTableScene() {
  return (
    <SceneFrame kicker="Q-Q plots" title="Making a Q-Q plot">
      <Block title="Example">
        <p>
          Using the same data, check whether the sample looks like{" "}
          <MathText text="$N(3,7^2)$" />. Theoretical quantiles use{" "}
          <MathText text="$\pi_p=\mu+\sigma z_{1-p}$" /> with <MathText text="$\mu=3$" />,{" "}
          <MathText text="$\sigma=7$" />.
        </p>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>
                  <InlineMath tex="i" />
                </th>
                <th>
                  <InlineMath tex="x_{(i)}" />
                </th>
                <th>
                  <InlineMath tex="p=i/(n+1)" />
                </th>
                <th>
                  <InlineMath tex="\pi_p" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>−3.9</td>
                <td>1/6</td>
                <td>−3.77</td>
              </tr>
              <tr>
                <td>2</td>
                <td>−2.0</td>
                <td>2/6</td>
                <td>−0.015</td>
              </tr>
              <tr>
                <td>3</td>
                <td>1.7</td>
                <td>3/6</td>
                <td>3.00</td>
              </tr>
              <tr>
                <td>4</td>
                <td>7.3</td>
                <td>4/6</td>
                <td>6.02</td>
              </tr>
              <tr>
                <td>5</td>
                <td>11.7</td>
                <td>5/6</td>
                <td>9.77</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Block>
    </SceneFrame>
  );
}

export function QqExamplePlotScene() {
  return (
    <SceneFrame kicker="Q-Q plots" title="Q-Q plot for $N(3,7^2)$">
      <Figure src="/figures/QQ1.png" alt="Q-Q plot of the example data against N(3, 7 squared)" width="72%" />
      <BulletList
        items={[
          "All five points lie close to the diagonal.",
          <MathText key="b" text="The sample is consistent with $N(3,7^2)$ on this visual check." />,
        ]}
      />
    </SceneFrame>
  );
}

export function QqGoodFitScene() {
  return (
    <SceneFrame kicker="Reading Q-Q plots" title="Good fit">
      <p>
        Hypothesis <MathText text="$H_0$" />: the data come from a standard normal distribution.
      </p>
      <Figure src="/figures/QQ2.png" alt="Q-Q plot showing a good fit to the standard normal" width="72%" />
      <p>This dataset looks like a good fit: points track the diagonal without systematic bending.</p>
    </SceneFrame>
  );
}

export function QqPoorRightTailScene() {
  return (
    <SceneFrame kicker="Reading Q-Q plots" title="Poor fit — heavy right tail">
      <p>
        Hypothesis <MathText text="$H_0$" />: the data come from a standard normal distribution.
      </p>
      <Figure
        src="/figures/QQ3.png"
        alt="Q-Q plot showing a poor fit with a heavier right tail than normal"
        width="72%"
      />
      <BulletList
        items={[
          "Poor fit: the data are clearly non-negative and tend to take larger values than a normal would.",
          'Larger "right tail" than the reference normal.',
        ]}
      />
    </SceneFrame>
  );
}

export function QqPoorHeavyTailsScene() {
  return (
    <SceneFrame kicker="Reading Q-Q plots" title="Poor fit — heavy tails">
      <p>
        Hypothesis <MathText text="$H_0$" />: the data come from a standard normal distribution.
      </p>
      <Figure
        src="/figures/QQ4.png"
        alt="Q-Q plot showing a poor fit with heavy tails relative to the normal"
        width="72%"
      />
      <BulletList
        items={[
          "Poor fit: extremes are more common than under a standard normal.",
          "Typical signature of a heavy-tailed distribution.",
        ]}
      />
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Takeaways">
      <BulletList
        items={[
          <MathText
            key="a"
            text="Theoretical $p$-th quantile: $F(\pi_p)=\Pr(X\le\pi_p;\,X\sim F)=p$."
          />,
          <MathText
            key="b"
            text="Sample $p$-th quantile: $\hat\pi_p=x_{(k)}+\bigl(p(n+1)-k\bigr)\bigl(x_{(k+1)}-x_{(k)}\bigr)$ with $k=\lfloor p(n+1)\rfloor$."
          />,
          "If a Q-Q plot of sample vs theoretical quantiles hugs the diagonal $y=x$, the data look consistent with the assumed distribution.",
          "A Q-Q plot is a visualization tool — not a formal hypothesis test by itself.",
        ]}
      />
    </SceneFrame>
  );
}
