import styles from "../Lecture.module.css";
import { Block, BulletList, Caption, DataTable, Figure, Formula, InlineMath, KeepCase, MathText, SceneFrame } from "./shared";

export function L6IntroScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Introduction">
      <p>In this lecture we will introduce</p>
      <BulletList
        items={[
          <>
            Important concepts in hypothesis testing
            <BulletList
              items={[
                <MathText key="h" text="Null hypothesis $H_0$ and alternative hypothesis $H_1$" />,
                <MathText key="c" text="Test statistic $T$ and critical region $C$" />,
                "Type I and Type II error",
                <MathText key="a" text="Significance level $\\alpha$" />,
                <MathText key="p" text="$p$-value" />,
              ]}
            />
          </>,
          "Hypothesis testing for mean",
          "Suggested reading: Chapter 8.1 of the textbook.",
        ]}
      />
    </SceneFrame>
  );
}

export function SteelExampleScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Motivating example">
      <Block title="Example">
        <p>
          Let <InlineMath tex="X" /> equal the breaking strength of a steel bar. If the bar is manufactured by process
          I, <MathText text="$X\sim N(50, 36)$" />. It is hoped that if process II (a new process) is used,{" "}
          <MathText text="$X\sim N(55, 36)$" />. Given a large number of steel bars manufactured by process II, how
          could we test whether the five-unit increase in the mean breaking strength was realized?
        </p>
      </Block>
      <BulletList
        items={[
          "Based on the observed breaking strength of steel bars under process II",
          "Make a judgment: five-unit increase or not",
        ]}
      />
    </SceneFrame>
  );
}

export function HypothesesScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Formulate H0 and H1">
      <p>
        Suppose we have <MathText text="$X_1,X_2,\cdots,X_n\overset{\text{i.i.d.}}{\sim} N(\mu, 36)$" />
      </p>
      <BulletList
        items={[
          <MathText key="0" text="Null hypothesis $H_0$: an initial belief/claim/assumption on the values that $\mu$ can take" />,
          <MathText key="1" text="Alternative hypothesis $H_1$: the competing belief against which we test the initial claim" />,
          <MathText key="s" text="Simple hypothesis: a hypothesis in which $\mu$ only takes on one value" />,
          <MathText key="c" text="Composite hypothesis: a hypothesis in which $\mu$ takes on a range of values" />,
        ]}
      />
      <Block title="Example">
        <p>
          <MathText text="Simple null $H_0:\mu=50$" />
          <br />
          <MathText text="Composite null $H_0:\mu\leq 50$" />
          <br />
          <MathText text="Simple alternative $H_1:\mu=55$" />
          <br />
          <MathText text="Composite alternative $H_1:\mu>55$" />
        </p>
      </Block>
    </SceneFrame>
  );
}

export function HypothesisTypesScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Types of hypotheses">
      <p>Different types of hypothesis</p>
      <BulletList
        items={[
          <MathText key="a" text="$H_0:\mu=50$, $H_1:\mu=55$" />,
          <MathText key="b" text="(One-sided) $H_0:\mu=55$, $H_1:\mu>55$" />,
          <MathText key="c" text="(One-sided) $H_0:\mu=55$, $H_1:\mu<55$" />,
          <MathText key="d" text="(Two-sided) $H_0:\mu=55$, $H_1:\mu\neq 55$" />,
          <MathText key="e" text="$H_0:\mu\leq 55$, $H_1:\mu>55$" />,
        ]}
      />
    </SceneFrame>
  );
}

export function CriticalRegionScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Critical region C and test statistic T">
      <BulletList
        items={[
          <>
            Denote the sample space by <InlineMath tex={String.raw`\mathcal{D}`} />:
            <Formula tex={String.raw`\mathcal{D}:=\{(x_1,\ldots,x_n)\mid x_i\in S_X,\ i=1,\ldots,n\}.`} />
          </>,
          <MathText key="c" text="A test of $H_0$ versus $H_1$ is based on a subset $C$ of $\mathcal{D}$. This set $C$, where we reject $H_0$, is the critical region." />,
          <MathText key="t" text="The region is usually specified in terms of a test statistic $T$." />,
        ]}
      />
      <Block title="Example">
        <p>
          <MathText text="Test statistic $T=\bar{X}\sim N(\mu,36/n)$" />
          <br />
          <MathText text="Critical region $C=\{(x_1,\ldots,x_n)\in\mathcal{D}\mid \bar{x}\geq 53\}$" />
        </p>
      </Block>
    </SceneFrame>
  );
}

export function DecisionRuleScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Decision rule">
      <BulletList
        items={[
          <MathText key="d" text="Once $H_0$ and $H_1$ are formulated, collect data $x_1,\ldots,x_n$ and see which hypothesis is favoured." />,
          <>
            Decision rule based on <MathText text="$x_1,\ldots,x_n$" />:
            <BulletList
              items={[
                <MathText key="r" text="Reject $H_0$ (accept $H_1$) if $(x_1,\ldots,x_n)\in C$" />,
                <MathText key="k" text="Retain $H_0$ (reject $H_1$) if $(x_1,\ldots,x_n)\notin C$" />,
              ]}
            />
          </>,
        ]}
      />
      <Block title="Example">
        <p>
          If <MathText text="$\bar{x}\geq 53$" />, reject <InlineMath tex="H_0" />. Otherwise, if{" "}
          <MathText text="$\bar{x}<53$" />, fail to reject <InlineMath tex="H_0" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function RecallSteelScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Recall the example">
      <Block title="Example">
        <p>
          Let <InlineMath tex="X" /> equal the breaking strength of a steel bar. Process I:{" "}
          <MathText text="$X\sim N(50,36)$" />. Process II is hoped to give <MathText text="$X\sim N(55,36)$" />. How
          do we test whether the five-unit increase was realized?
        </p>
      </Block>
      <p>
        Suppose <MathText text="$X_1,\ldots,X_n\overset{\text{i.i.d.}}{\sim} N(\mu,36)$" />
      </p>
      <BulletList
        items={[
          <MathText key="0" text="Simple null $H_0:\mu=50$" />,
          <MathText key="1" text="Simple alternative $H_1:\mu=55$" />,
          <MathText text="Critical region $C=\{\bar{x}\geq 53\}$" key="c" />,
          <MathText text="Test statistic $\bar{X}\sim N(\mu,36/n)$" key="t" />,
          <MathText text="If $\bar{x}\geq 53$, reject $H_0$; if $\bar{x}<53$, fail to reject $H_0$." key="d" />,
        ]}
      />
    </SceneFrame>
  );
}

export function ErrorTableScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Errors in hypothesis testing">
      <p>We may draw an incorrect conclusion in two ways:</p>
      <DataTable
        headers={["", "H0 true", "H1 true"]}
        rows={[
          ["Reject H0", "Type I error", "Correct"],
          ["Fail to reject H0", "Correct", "Type II error"],
        ]}
      />
      <BulletList
        items={[
          <MathText key="1" text="Type I error: reject $H_0$ when $H_0$ is true." />,
          <MathText key="2" text="Type II error: fail to reject $H_0$ when $H_0$ is false." />,
        ]}
      />
    </SceneFrame>
  );
}

export function AlphaBetaScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Probabilities of the two errors">
      <p>The probability of a Type I error</p>
      <Formula tex={String.raw`\alpha=\Pr(\text{Type I error})=\Pr(T\in C;H_0).`} />
      <p>The probability of a Type II error</p>
      <Formula tex={String.raw`\beta=\Pr(\text{Type II error})=\Pr(T\notin C;H_1).`} />
      <Block title="Example">
        <p>
          <MathText text="$X_1,\ldots,X_n\stackrel{\text{i.i.d.}}{\sim} N(\mu,36)$ with $n=16$, and $C=\{\bar{x}\geq 53\}$." />{" "}
          What are <InlineMath tex="\alpha" /> and <InlineMath tex="\beta" /> for{" "}
          <MathText text="$H_0:\mu=50$ against $H_1:\mu=55$?" />
        </p>
      </Block>
    </SceneFrame>
  );
}

export function AlphaBetaSolutionScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Computing α and β">
      <p>
        <strong>Solution.</strong> <MathText text="$T=\bar{X}\sim N(\mu,36/n)$." /> Under <InlineMath tex="H_0" />,{" "}
        <MathText text="$\bar{X}\sim N(50,36/16)$" />; under <InlineMath tex="H_1" />,{" "}
        <MathText text="$\bar{X}\sim N(55,36/16)$" />.
      </p>
      <Formula tex={String.raw`\alpha=\Pr(\bar{X}\geq 53;H_0)=\Pr\left(Z\geq \frac{53-50}{\sqrt{36/16}}\right)=0.0228.`} />
      <Formula tex={String.raw`\beta=\Pr(\bar{X}<53;H_1)=\Pr\left(Z<\frac{53-55}{\sqrt{36/16}}\right)=0.0913.`} />
      <p className={styles.note}>
        By changing <InlineMath tex="C" />, <InlineMath tex="\alpha" /> and <InlineMath tex="\beta" /> move in opposite
        directions. Both errors cannot be reduced at the same time.
      </p>
    </SceneFrame>
  );
}

export function TypeErrorPlotScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="The two error regions">
      <Figure src="/figures/type_error.png" alt="PDFs of x-bar under H0 mu=50 and H1 mu=55" width="78%" />
      <Caption>
        PDF of <InlineMath tex={String.raw`\bar{X}`} /> under <MathText text="$H_0:\mu=50$" /> and{" "}
        <MathText text="$H_1:\mu=55$" />.
      </Caption>
    </SceneFrame>
  );
}

export function SignificanceScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Significance level">
      <BulletList
        items={[
          <MathText key="a" text="Usually we fix the Type I error probability $\alpha$, for example $\alpha=0.05$, and then determine the critical region." />,
          <MathText key="b" text="The value of $\alpha$ is the significance level of the test." />,
          <MathText key="c" text="A more conservative choice is $\alpha=0.01$." />,
        ]}
      />
      <Block title="Example">
        <p>
          <MathText text="$\Pr(\bar{X}\geq c;H_0)=\Pr\left(Z\geq\frac{c-50}{\sqrt{36/16}}\right)=0.05$" /> gives{" "}
          <MathText text="$\frac{c-50}{\sqrt{36/16}}=z_{0.05}$" />, so <MathText text="$c=52.48$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function PValueScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="p-value: observed significance level">
      <BulletList
        items={[
          <MathText key="a" text="The $p$-value is the probability of a test statistic at least as extreme (in the direction that favours $H_1$) as the one observed, given $H_0$ is true." />,
          <MathText key="b" text="A small $p$-value means the data are unlikely under $H_0$, and perhaps better explained by $H_1$." />,
          <MathText key="c" text="Reject $H_0$ if the $p$-value $\leq\alpha$." />,
          <MathText key="d" text="The $p$-value is also called the observed significance level." />,
        ]}
      />
      <Block title="Example · observed x̄ = 56">
        <BulletList
          items={[
            <MathText key="1" text="$\bar{X}\geq 56$ for $H_0:\mu=50$ versus $H_1:\mu=55$" />,
            <MathText key="2" text="$\bar{X}\geq 56$ for $H_0:\mu=55$ versus $H_1:\mu>55$" />,
            <MathText key="3" text="$\bar{X}\leq 56$ for $H_0:\mu=55$ versus $H_1:\mu<55$" />,
            <MathText key="4" text="$\bar{X}\geq 56$ or $\bar{X}\leq 54$ for $H_0:\mu=55$ versus $H_1:\mu\neq 55$" />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function MeanSetupScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Hypothesis testing for a normal mean">
      <p>
        Suppose <MathText text="$X_1,\ldots,X_n\stackrel{\text{i.i.d.}}{\sim} N(\mu,\sigma^2)$" />. Tests of{" "}
        <InlineMath tex="\mu" /> split into two cases:
      </p>
      <BulletList
        items={[
          <MathText key="1" text="Case 1: $\sigma^2$ is known" />,
          <MathText key="2" text="Case 2: $\sigma^2$ is unknown" />,
        ]}
      />
    </SceneFrame>
  );
}

export function ThreeApproachesScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Three approaches">
      <BulletList
        items={[
          <>
            <MathText text="$p$-value approach" />
            <BulletList
              items={[
                <MathText key="a" text="Compute the $p$-value and compare it with $\alpha$" />,
                <MathText key="b" text="Reject $H_0$ if the $p$-value $\leq\alpha$" />,
              ]}
            />
          </>,
          <>
            Critical region approach
            <BulletList
              items={[
                "Define the rejection region under H0 and calculate the test statistic",
                "Reject H0 if the statistic falls in the critical region",
              ]}
            />
          </>,
          <>
            Confidence interval approach
            <BulletList
              items={[
                <MathText key="a" text="Construct a $(1-\alpha)$ confidence interval and check whether the null value is inside" />,
                "Reject H0 if the null value is not included in the CI",
              ]}
            />
          </>,
        ]}
      />
      <p className={styles.note}>These three approaches are equivalent.</p>
    </SceneFrame>
  );
}

export function Case1StatScene() {
  return (
    <SceneFrame kicker={<>Case 1 · <KeepCase>σ²</KeepCase> known</>} title="z statistic">
      <BulletList
        items={[
          <>
            Test statistic
            <Formula tex={String.raw`T:=\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}.`} />
          </>,
          <MathText key="h" text="Under $H_0:\mu=\mu_0$, $T\sim N(0,1)$." />,
          <>
            Observed value
            <Formula tex={String.raw`z=\frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}.`} />
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function Case1UpperScene() {
  return (
    <SceneFrame kicker={<>Case 1 · <KeepCase>σ²</KeepCase> known</>} title="One-sided test, H1: μ > μ0">
      <p>
        <MathText text="$p$-value $p=\Pr(T>z;H_0)=\Pr(Z>z)$." />
      </p>
      <p>Reject <InlineMath tex="H_0" /> at level <InlineMath tex="\alpha" /> when</p>
      <Formula
        tex={String.raw`\Pr(Z>z)\leq\alpha
\iff z\geq z_\alpha
\iff \mu_0\notin\left(\bar{x}-z_\alpha\frac{\sigma}{\sqrt{n}},\infty\right).`}
      />
    </SceneFrame>
  );
}

export function Case1LowerScene() {
  return (
    <SceneFrame kicker={<>Case 1 · <KeepCase>σ²</KeepCase> known</>} title="One-sided test, H1: μ < μ0">
      <p>
        <MathText text="$p$-value $p=\Pr(T<z;H_0)=\Pr(Z<z)$." />
      </p>
      <p>Reject <InlineMath tex="H_0" /> at level <InlineMath tex="\alpha" /> when</p>
      <Formula
        tex={String.raw`\Pr(Z<z)\leq\alpha
\iff z\leq -z_\alpha
\iff \mu_0\notin\left(-\infty,\ \bar{x}+z_\alpha\frac{\sigma}{\sqrt{n}}\right).`}
      />
    </SceneFrame>
  );
}

export function Case1TwoScene() {
  return (
    <SceneFrame kicker={<>Case 1 · <KeepCase>σ²</KeepCase> known</>} title="Two-sided test, H1: μ ≠ μ0">
      <Formula tex={String.raw`p=\Pr(|T|>|z|;H_0)=2\Pr(Z>|z|).`} />
      <p>Reject <InlineMath tex="H_0" /> at level <InlineMath tex="\alpha" /> when</p>
      <Formula
        tex={String.raw`2\Pr(Z>|z|)\leq\alpha
\iff |z|\geq z_{\alpha/2}
\iff \mu_0\notin\left(\bar{x}-z_{\alpha/2}\frac{\sigma}{\sqrt{n}},\ \bar{x}+z_{\alpha/2}\frac{\sigma}{\sqrt{n}}\right).`}
      />
    </SceneFrame>
  );
}

export function Case1FigureScene() {
  return (
    <SceneFrame kicker={<>Case 1 · <KeepCase>σ²</KeepCase> known</>} title="Rejection regions">
      <Figure src="/figures/hypothesis_mean_case1.png" alt="Rejection regions for the three tests of a normal mean" width="92%" />
      <Caption>
        Shaded regions are the critical regions of the standard normal test statistic, for the upper, lower, and
        two-sided alternatives.
      </Caption>
    </SceneFrame>
  );
}

export function Case2StatScene() {
  return (
    <SceneFrame kicker={<>Case 2 · <KeepCase>σ²</KeepCase> unknown</>} title="t statistic">
      <BulletList
        items={[
          <MathText key="a" text="Replace the standard normal by $t(n-1)$ and $\sigma^2$ by $S^2$." />,
          <>
            Test statistic
            <Formula tex={String.raw`T:=\frac{\bar{X}-\mu_0}{S/\sqrt{n}}.`} />
          </>,
          <MathText key="b" text="Under $H_0:\mu=\mu_0$, $T\sim t(n-1)$." />,
          <>
            Observed value
            <Formula tex={String.raw`t=\frac{\bar{x}-\mu_0}{s/\sqrt{n}}.`} />
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function Case2UpperScene() {
  return (
    <SceneFrame kicker={<>Case 2 · <KeepCase>σ²</KeepCase> unknown</>} title="One-sided test, H1: μ > μ0">
      <Formula tex={String.raw`p=\Pr(T>t;T\sim t(n-1)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff t\geq t_\alpha(n-1)
\iff \mu_0\notin\left(\bar{x}-t_\alpha(n-1)\frac{s}{\sqrt{n}},\infty\right).`}
      />
    </SceneFrame>
  );
}

export function Case2LowerScene() {
  return (
    <SceneFrame kicker={<>Case 2 · <KeepCase>σ²</KeepCase> unknown</>} title="One-sided test, H1: μ < μ0">
      <Formula tex={String.raw`p=\Pr(T<t;T\sim t(n-1)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff t\leq -t_\alpha(n-1)
\iff \mu_0\notin\left(-\infty,\ \bar{x}+t_\alpha(n-1)\frac{s}{\sqrt{n}}\right).`}
      />
    </SceneFrame>
  );
}

export function Case2TwoScene() {
  return (
    <SceneFrame kicker={<>Case 2 · <KeepCase>σ²</KeepCase> unknown</>} title="Two-sided test, H1: μ ≠ μ0">
      <Formula tex={String.raw`p=2\Pr(T>|t|;T\sim t(n-1)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff |t|\geq t_{\alpha/2}(n-1)
\iff \mu_0\notin\left(\bar{x}-t_{\alpha/2}(n-1)\frac{s}{\sqrt{n}},\ \bar{x}+t_{\alpha/2}(n-1)\frac{s}{\sqrt{n}}\right).`}
      />
    </SceneFrame>
  );
}

export function TumorSetupScene() {
  return (
    <SceneFrame kicker="Case 2 · example" title="Two-sided test: tumor growth">
      <Block title="Example">
        <p>
          Let <InlineMath tex="X" /> (in millimeters) equal the growth in 15 days of a tumor induced in a mouse. Assume{" "}
          <MathText text="$X\sim N(\mu,\sigma^2)$" />. Test <MathText text="$H_0:\mu=4.0$" /> against{" "}
          <MathText text="$H_1:\mu\neq 4.0$" />. We observe <MathText text="$n=9$, $\bar{x}=4.3$, $s=1.2$" /> and take{" "}
          <MathText text="$\alpha=0.10$" />.
        </p>
      </Block>
      <Formula tex={String.raw`t=\frac{4.3-4}{1.2/\sqrt{9}}=0.75,\qquad t_{0.05}(8)=1.86.`} />
    </SceneFrame>
  );
}

export function TumorDecisionScene() {
  return (
    <SceneFrame kicker="Case 2 · example" title="Tumor growth: three equivalent decisions">
      <BulletList
        items={[
          <MathText key="p" text="$p$-value: $p=2\Pr(T>0.75;T\sim t(8))=0.4747>0.1$, so fail to reject $H_0$ at 10%." />,
          <MathText key="c" text="Critical region: $|t|=0.75<1.86$, so fail to reject $H_0$ at 10%." />,
          <MathText key="i" text="90% CI: $4.3\pm 1.86\cdot 1.2/\sqrt{9}=[3.556,5.044]$, which includes 4, so fail to reject $H_0$ at 10%." />,
        ]}
      />
    </SceneFrame>
  );
}

export function OneSidedSetupScene() {
  return (
    <SceneFrame kicker="Case 2 · example" title="One-sided test">
      <Block title="Example">
        <p>
          Suppose <MathText text="$n=25$, $\bar{x}=308.8$, $s=115.15$" />. Test{" "}
          <MathText text="$H_0:\mu=500$ against $H_1:\mu<500$" /> at <MathText text="$\alpha=0.01$" />.
        </p>
      </Block>
      <Formula tex={String.raw`t=\frac{308.8-500}{115.15/\sqrt{25}}=-8.30,\qquad t_{0.01}(24)=2.492.`} />
    </SceneFrame>
  );
}

export function OneSidedDecisionScene() {
  return (
    <SceneFrame kicker="Case 2 · example" title="One-sided test: three equivalent decisions">
      <BulletList
        items={[
          <MathText key="p" text="$p$-value: $p=\Pr(T<-8.30;T\sim t(24))=8.17\times 10^{-9}<0.01$, so reject $H_0$ at 1%." />,
          <MathText key="c" text="Critical region: $t=-8.30<-2.492$, so reject $H_0$ at 1%." />,
          <MathText key="i" text="99% one-sided CI: $(-\infty,\ 308.8+2.492\times 115.15/\sqrt{25}]=(-\infty,366.191]$, which excludes 500, so reject $H_0$ at 1%." />,
        ]}
      />
    </SceneFrame>
  );
}

export function OneMeanSummaryScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing I" title="Tests for one mean">
      <DataTable
        caption={<>
          <KeepCase>σ²</KeepCase> known · Z ~ N(0,1) · z = (x̄ − μ0)/(<KeepCase>σ</KeepCase>/√n)
        </>}
        headers={["H0", "H1", "p-value", "Critical region"]}
        rows={[
          [<InlineMath key="a" tex={String.raw`\mu=\mu_0`} />, <InlineMath key="b" tex={String.raw`\mu>\mu_0`} />, <InlineMath key="c" tex={String.raw`\Pr(Z>z)`} />, <InlineMath key="d" tex={String.raw`z\geq z_\alpha`} />],
          [<InlineMath key="a" tex={String.raw`\mu=\mu_0`} />, <InlineMath key="b" tex={String.raw`\mu<\mu_0`} />, <InlineMath key="c" tex={String.raw`\Pr(Z<z)`} />, <InlineMath key="d" tex={String.raw`z\leq -z_\alpha`} />],
          [<InlineMath key="a" tex={String.raw`\mu=\mu_0`} />, <InlineMath key="b" tex={String.raw`\mu\neq\mu_0`} />, <InlineMath key="c" tex={String.raw`2\Pr(Z>|z|)`} />, <InlineMath key="d" tex={String.raw`|z|\geq z_{\alpha/2}`} />],
        ]}
      />
      <DataTable
        caption={<>
          <KeepCase>σ²</KeepCase> unknown · T ~ t(n−1) · t = (x̄ − μ0)/(s/√n)
        </>}
        headers={["H0", "H1", "p-value", "Critical region"]}
        rows={[
          [<InlineMath key="a" tex={String.raw`\mu=\mu_0`} />, <InlineMath key="b" tex={String.raw`\mu>\mu_0`} />, <InlineMath key="c" tex={String.raw`\Pr(T>t)`} />, <InlineMath key="d" tex={String.raw`t\geq t_\alpha(n-1)`} />],
          [<InlineMath key="a" tex={String.raw`\mu=\mu_0`} />, <InlineMath key="b" tex={String.raw`\mu<\mu_0`} />, <InlineMath key="c" tex={String.raw`\Pr(T<t)`} />, <InlineMath key="d" tex={String.raw`t\leq -t_\alpha(n-1)`} />],
          [<InlineMath key="a" tex={String.raw`\mu=\mu_0`} />, <InlineMath key="b" tex={String.raw`\mu\neq\mu_0`} />, <InlineMath key="c" tex={String.raw`2\Pr(T>|t|)`} />, <InlineMath key="d" tex={String.raw`|t|\geq t_{\alpha/2}(n-1)`} />],
        ]}
      />
      <BulletList
        items={[
          <MathText key="p" text="$p$-value: reject $H_0$ if $p$-value $\leq\alpha$" />,
          "Critical region: reject H0 if z or t belongs to the critical region",
          <MathText key="c" text="Confidence interval: reject $H_0$ if the CI excludes $\mu_0$" />,
        ]}
      />
    </SceneFrame>
  );
}
