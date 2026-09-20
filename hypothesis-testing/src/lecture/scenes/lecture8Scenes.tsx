import styles from "../Lecture.module.css";
import { Block, BulletList, DataTable, Formula, InlineMath, MathText, SceneFrame } from "./shared";

export function L8IntroScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing III" title="Introduction">
      <BulletList
        items={[
          "Continue hypothesis testing, now for proportions.",
          <>
            Already covered
            <BulletList items={["Pooled t-test", "Welch's t-test", "Paired t-test", "F-test"]} />
          </>,
          "Suggested reading: Chapter 8.3 of the textbook.",
        ]}
      />
    </SceneFrame>
  );
}

export function PropSetupScene() {
  return (
    <SceneFrame kicker="One proportion" title="Bernoulli sample">
      <BulletList
        items={[
          <MathText key="p" text="Let $p$ be the proportion of the population with a certain characteristic." />,
          <MathText key="x" text="Draw $X_1,\ldots,X_n\overset{\text{i.i.d.}}{\sim}\mathrm{Bernoulli}(p)$, with $X_i=1$ if the individual has the characteristic." />,
        ]}
      />
    </SceneFrame>
  );
}

export function PropCltScene() {
  return (
    <SceneFrame kicker="One proportion" title="Binomial count and the CLT">
      <p>
        <MathText text="$Y=\sum_{i=1}^n X_i\sim\mathrm{Binomial}(n,p)$, so $\mathbb{E}(Y)=np$ and $\mathrm{Var}(Y)=np(1-p)$." />
      </p>
      <p>If <InlineMath tex="n" /> is large, the CLT gives</p>
      <Formula tex={String.raw`\hat{p}=\frac{Y}{n}\overset{\text{approx}}{\sim} N\left(p,\frac{p(1-p)}{n}\right).`} />
    </SceneFrame>
  );
}

export function PropStatScene() {
  return (
    <SceneFrame kicker="One proportion" title="Test statistic">
      <p>
        For <MathText text="$H_0:p=p_0$" />,
      </p>
      <Formula tex={String.raw`T:=\frac{\hat{p}-p_0}{\sqrt{p_0(1-p_0)/n}}.`} />
      <BulletList
        items={[
          <MathText key="d" text="Under $H_0$, $T\sim N(0,1)$ approximately." />,
          <MathText key="t" text="Observed $t=(\hat{p}-p_0)/\sqrt{p_0(1-p_0)/n}$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function PropUpperScene() {
  return (
    <SceneFrame kicker="One proportion" title="H1: p > p0">
      <p>
        <MathText text="$p$-value $\Pr(T>t;H_0)=\Pr(Z>t)$." />
      </p>
      <Formula
        tex={String.raw`\Pr(Z>t)\leq\alpha
\iff t\geq z_\alpha
\iff \hat{p}\geq p_0+z_\alpha\sqrt{p_0(1-p_0)/n}.`}
      />
    </SceneFrame>
  );
}

export function PropLowerScene() {
  return (
    <SceneFrame kicker="One proportion" title="H1: p < p0">
      <p>
        <MathText text="$p$-value $\Pr(T<t;H_0)=\Pr(Z<t)$." />
      </p>
      <Formula
        tex={String.raw`\Pr(Z<t)\leq\alpha
\iff t\leq -z_\alpha
\iff \hat{p}\leq p_0-z_\alpha\sqrt{p_0(1-p_0)/n}.`}
      />
    </SceneFrame>
  );
}

export function PropTwoScene() {
  return (
    <SceneFrame kicker="One proportion" title="H1: p ≠ p0">
      <p>
        <MathText text="$p$-value $\Pr(|T|>|t|;H_0)=2\Pr(Z>|t|)$." />
      </p>
      <Formula
        tex={String.raw`2\Pr(Z>|t|)\leq\alpha
\iff |t|\geq z_{\alpha/2}
\iff \hat{p}\geq p_0+z_{\alpha/2}\sqrt{p_0(1-p_0)/n}
\quad\text{or}\quad
\hat{p}\leq p_0-z_{\alpha/2}\sqrt{p_0(1-p_0)/n}.`}
      />
    </SceneFrame>
  );
}

export function DiceSetupScene() {
  return (
    <SceneFrame kicker="One proportion" title="Dice example">
      <Block title="Example">
        <p>
          It was claimed that many commercially manufactured dice are not fair, because the spots are indentations, so
          the 6-side is lighter than the 1-side. Let <InlineMath tex="p" /> be the probability of rolling a 6. Test{" "}
          <MathText text="$H_0:p=1/6$ against $H_1:p\neq 1/6$" /> at <MathText text="$\alpha=5\%$" />. In{" "}
          <MathText text="$n=8000$" /> rolls, 6 appears 1389 times.
        </p>
      </Block>
      <Formula tex={String.raw`Z=\frac{Y/n-1/6}{\sqrt{(1/6)(5/6)/n}}\overset{\text{approx}}{\sim} N(0,1).`} />
    </SceneFrame>
  );
}

export function DiceDecisionScene() {
  return (
    <SceneFrame kicker="One proportion" title="Dice example: solution">
      <Formula tex={String.raw`t=\frac{1389/8000-1/6}{\sqrt{(1/6)(5/6)/8000}}=1.67,\qquad z_{0.025}=1.96.`} />
      <BulletList
        items={[
          <MathText key="c" text="Critical region: $|t|=1.67<1.96$, so fail to reject $H_0$ at 5%." />,
          <MathText key="p" text="$p$-value: $2\Pr(Z>1.67)=0.0949>0.05$, so fail to reject $H_0$ at 5%." />,
          <MathText key="a" text="If instead $\alpha=0.1$ and $z_{0.05}=1.64$, then we would reject $H_0$ at 10%." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TwoPropSetupScene() {
  return (
    <SceneFrame kicker="Two proportions" title="Equality of two proportions">
      <BulletList
        items={[
          "Two populations, with proportions p1 and p2 who have a certain characteristic.",
          <MathText key="h" text="Test $H_0:p_1=p_2$ against a possible alternative $H_1$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TwoPropSamplingScene() {
  return (
    <SceneFrame kicker="Two proportions" title="Sampling distributions">
      <p>
        <MathText text="$X_{1,1},\ldots,X_{1,n}\overset{\text{i.i.d.}}{\sim}\mathrm{Bernoulli}(p_1)$ and $X_{2,1},\ldots,X_{2,m}\overset{\text{i.i.d.}}{\sim}\mathrm{Bernoulli}(p_2)$, independent." />
      </p>
      <p>
        <MathText text="$Y_1\sim\mathrm{Binomial}(n,p_1)$, $Y_2\sim\mathrm{Binomial}(m,p_2)$, and $\hat{p}_1=Y_1/n$, $\hat{p}_2=Y_2/m$." />
      </p>
      <p>For large <InlineMath tex="n" /> and <InlineMath tex="m" />,</p>
      <Formula
        tex={String.raw`\hat{p}_1-\hat{p}_2\overset{\text{approx}}{\sim}
N\left(p_1-p_2,\frac{p_1(1-p_1)}{n}+\frac{p_2(1-p_2)}{m}\right).`}
      />
    </SceneFrame>
  );
}

export function TwoPropNullScene() {
  return (
    <SceneFrame kicker="Two proportions" title="Under H0: p1 = p2">
      <p>Only the two-sided test is derived; the one-sided test is the same pattern.</p>
      <Formula
        tex={String.raw`\hat{p}_1-\hat{p}_2\overset{\text{approx}}{\sim}
N\left(0,\ p_1(1-p_1)\left(\frac{1}{n}+\frac{1}{m}\right)\right).`}
      />
      <p>
        We know <MathText text="$p_1=p_2$" />, but not the common value.
      </p>
      <p className={styles.note}>Question: what is the distribution of Y1 + Y2 under H0?</p>
    </SceneFrame>
  );
}

export function TwoPropStatScene() {
  return (
    <SceneFrame kicker="Two proportions" title="Pooled proportion">
      <p>
        Approximate the common <InlineMath tex="p" /> by <MathText text="$\hat{p}=(Y_1+Y_2)/(n+m)$" />.
      </p>
      <Formula tex={String.raw`T:=\frac{\hat{p}_1-\hat{p}_2}{\sqrt{\hat{p}(1-\hat{p})(1/n+1/m)}}.`} />
      <BulletList
        items={[
          <MathText key="d" text="Under $H_0$, $T\overset{\text{approx}}{\sim} N(0,1)$." />,
          <MathText key="t" text="Observed $t=(y_1/n-y_2/m)/\sqrt{\hat{p}(1-\hat{p})(1/n+1/m)}$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TwoPropDecisionScene() {
  return (
    <SceneFrame kicker="Two proportions" title="H1: p1 ≠ p2">
      <p>
        <MathText text="$p$-value $\Pr(|T|>|t|;H_0)=2\Pr(Z>|t|)$." />
      </p>
      <Formula
        tex={String.raw`2\Pr(Z>|t|)\leq\alpha
\iff |t|\geq z_{\alpha/2}
\iff |\hat{p}_1-\hat{p}_2|\geq z_{\alpha/2}\sqrt{\hat{p}(1-\hat{p})(1/n+1/m)}.`}
      />
    </SceneFrame>
  );
}

export function BirthExampleScene() {
  return (
    <SceneFrame kicker="Two proportions" title="Low birth weight">
      <Block title="Example">
        <p>
          In a sample of <MathText text="$n=200$" />, <MathText text="$y_1=22$" /> low birth weight babies in Country
          1. In a sample of <MathText text="$m=100$" />, <MathText text="$y_2=16$" /> in Country 2. Test{" "}
          <MathText text="$H_0:p_1=p_2$ vs $H_1:p_1\neq p_2$" /> at 5%.
        </p>
      </Block>
      <Formula
        tex={String.raw`t=\frac{22/200-16/100}{\sqrt{(38/300)(1-38/300)(1/200+1/100)}}=-1.23.`}
      />
      <BulletList
        items={[
          <MathText key="c" text="Critical region: $|t|=1.23<z_{0.025}=1.96$." />,
          <MathText key="p" text="$p$-value: $2\Pr(Z>1.23)=0.219>0.05$." />,
          "Fail to reject H0 at the 5% significance level.",
        ]}
      />
    </SceneFrame>
  );
}

export function PropSummaryScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing III" title="Summary of proportion tests">
      <DataTable
        caption="One-sample · T ≈ N(0,1) · t = (p̂ − p0)/√(p0(1−p0)/n)"
        headers={["H0", "H1", "p-value", "Critical region"]}
        rows={[
          [<InlineMath key="a" tex="p=p_0" />, <InlineMath key="b" tex="p>p_0" />, <InlineMath key="c" tex={String.raw`\Pr(T>t)`} />, <InlineMath key="d" tex={String.raw`t\geq z_\alpha`} />],
          [<InlineMath key="a" tex="p=p_0" />, <InlineMath key="b" tex="p<p_0" />, <InlineMath key="c" tex={String.raw`\Pr(T<t)`} />, <InlineMath key="d" tex={String.raw`t\leq -z_\alpha`} />],
          [<InlineMath key="a" tex="p=p_0" />, <InlineMath key="b" tex={String.raw`p\neq p_0`} />, <InlineMath key="c" tex={String.raw`2\Pr(T>|t|)`} />, <InlineMath key="d" tex={String.raw`|t|\geq z_{\alpha/2}`} />],
        ]}
      />
      <DataTable
        caption="Two-sample · t = (p̂1 − p̂2)/√(p̂(1−p̂)(1/n+1/m)), p̂=(y1+y2)/(n+m)"
        headers={["H0", "H1", "p-value", "Critical region"]}
        rows={[
          [<InlineMath key="a" tex="p_1=p_2" />, <InlineMath key="b" tex="p_1>p_2" />, <InlineMath key="c" tex={String.raw`\Pr(T>t)`} />, <InlineMath key="d" tex={String.raw`t\geq z_\alpha`} />],
          [<InlineMath key="a" tex="p_1=p_2" />, <InlineMath key="b" tex="p_1<p_2" />, <InlineMath key="c" tex={String.raw`\Pr(T<t)`} />, <InlineMath key="d" tex={String.raw`t\leq -z_\alpha`} />],
          [<InlineMath key="a" tex="p_1=p_2" />, <InlineMath key="b" tex={String.raw`p_1\neq p_2`} />, <InlineMath key="c" tex={String.raw`2\Pr(T>|t|)`} />, <InlineMath key="d" tex={String.raw`|t|\geq z_{\alpha/2}`} />],
        ]}
      />
    </SceneFrame>
  );
}
