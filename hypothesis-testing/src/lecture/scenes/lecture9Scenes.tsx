import styles from "../Lecture.module.css";
import { Block, BulletList, Caption, DataTable, Figure, Formula, InlineMath, KeepCase, MathText, OrderedList, SceneFrame } from "./shared";

export function L9IntroScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing IV" title="Introduction">
      <p>In this lecture we continue with</p>
      <BulletList items={["Power function", "Sample size in hypothesis testing"]} />
      <p>
        <strong>Suggested reading:</strong> Chapter 8.5 of the textbook.
      </p>
    </SceneFrame>
  );
}

export function PowerRecallScene() {
  return (
    <SceneFrame kicker="Power" title="Type II error and power">
      <DataTable
        headers={["", "H0 true", "H1 true"]}
        rows={[
          ["Reject H0", "Type I error", "Correct"],
          ["Fail to reject H0", "Correct", "Type II error"],
        ]}
      />
      <p>
        For <MathText text="$H_0:\mu=\mu_0$ versus $H_1:\mu=\mu_1$" />,
      </p>
      <Formula tex={String.raw`\beta(\mu_1):=\Pr(T\notin C;\mu=\mu_1).`} />
    </SceneFrame>
  );
}

export function PowerDefScene() {
  return (
    <SceneFrame kicker="Power" title="Power function K(μ)">
      <BulletList
        items={[
          <MathText key="a" text="The power function $K(\mu)$ is a function of $\mu\in\Omega$, the parameter space." />,
          <MathText key="b" text="Power is the probability of rejecting $H_0$ when the parameter equals $\mu$:" />,
        ]}
      />
      <Formula tex={String.raw`K(\mu):=\Pr(T\in C;\mu).`} />
      <p>
        The value at a specified <InlineMath tex="\mu" /> is the power of the test at that point. For example,{" "}
        <MathText text="$K(0.5)$" /> is the power at <MathText text="$\mu=0.5$" />.
      </p>
    </SceneFrame>
  );
}

export function PowerAlphaBetaScene() {
  return (
    <SceneFrame kicker="Power" title="Connection with α and β">
      <p>
        With <MathText text="$H_0:\mu=\mu_0$" />:
      </p>
      <BulletList
        items={[
          <MathText key="a" text="At $\mu=\mu_0$, $K(\mu_0)=\alpha$. The power at the null value is the significance level." />,
          <MathText key="b" text="At a value $\mu_1$ in $H_1$, $K(\mu_1)=1-\beta(\mu_1)$." />,
        ]}
      />
      <Formula tex={String.raw`K(\mu_1)=\Pr(T\in C;\mu=\mu_1)=1-\Pr(T\notin C;\mu=\mu_1)=1-\beta(\mu_1).`} />
    </SceneFrame>
  );
}

export function TeachingSetupScene() {
  return (
    <SceneFrame kicker="Example" title="Scores with a new teaching method">
      <Block title="Example">
        <p>
          Let <MathText text="$X_1,\ldots,X_n$" /> be a random sample from <MathText text="$N(\mu,100)$" />, a possible
          distribution of scores under a new teaching method. Decide between <MathText text="$H_0:\mu=60$" /> and{" "}
          <MathText text="$H_1:\mu>60$" />. Take <MathText text="$n=25$" /> and
        </p>
        <Formula tex={String.raw`C=\{(x_1,\ldots,x_n)\mid \bar{x}\geq 62\}.`} />
        <p>
          What is <MathText text="$K(\mu)$" />? What are <InlineMath tex="\alpha" /> and <InlineMath tex="\beta" />?
        </p>
      </Block>
    </SceneFrame>
  );
}

export function TeachingSolutionScene() {
  return (
    <SceneFrame kicker="Example" title="Power function of the score test">
      <p>
        <strong>Solution.</strong> <MathText text="$\bar{X}\sim N(\mu,4)$" />, so
      </p>
      <Formula
        tex={String.raw`K(\mu)=\Pr(\bar{X}\geq 62;\mu)
=\Pr\left(Z\geq\frac{62-\mu}{2}\right)
=1-\Phi\left(\frac{62-\mu}{2}\right).`}
      />
      <p>
        <InlineMath tex="Z\sim N(0,1)" /> and <InlineMath tex="\Phi" /> is the standard normal CDF.
      </p>
    </SceneFrame>
  );
}

export function TeachingCurveScene() {
  return (
    <SceneFrame kicker="Example" title="Curve of K(μ)">
      <Figure src="/figures/power_curve_normal.png" alt="Power curve K(mu) = 1 - Phi((62-mu)/2)" width="78%" />
      <Caption>
        <MathText text="Power function $K(\mu)=1-\Phi((62-\mu)/2)$." /> Points mark <InlineMath tex="\mu=60" /> and{" "}
        <InlineMath tex="\mu=65" />.
      </Caption>
    </SceneFrame>
  );
}

export function At60Scene() {
  return (
    <SceneFrame kicker="Example" title="At μ = 60">
      <Formula tex={String.raw`K(60)=1-\Phi\left(\frac{62-60}{2}\right)=1-\Phi(1)=0.1587=\alpha.`} />
      <p>The significance level of this test is 15.87%.</p>
      <p>
        <strong>Question.</strong> If instead <MathText text="$H_0:\mu\leq 60$, $H_1:\mu>60$" />, how is{" "}
        <InlineMath tex="\alpha" /> calculated?
      </p>
      <p>
        <strong>Solution.</strong> Set <InlineMath tex="\alpha" /> to the highest Type I error probability for{" "}
        <MathText text="$\mu\leq 60$" />:
      </p>
      <Formula tex={String.raw`\alpha:=\max_{\mu\leq 60}K(\mu)=K(60).`} />
    </SceneFrame>
  );
}

export function CompositeNullScene() {
  return (
    <SceneFrame kicker="Example" title="Composite null, same critical region">
      <p>
        For <MathText text="$H_0:\mu\leq 60$ and $H_1:\mu>60$" />, build the critical region from{" "}
        <MathText text="$\mu=60$" />:
      </p>
      <Formula tex={String.raw`C=\left\{\bar{x}\geq 60+z_\alpha\frac{\sigma}{\sqrt{n}}\right\}.`} />
      <p>
        Then for any <MathText text="$\mu'<60$" />, <MathText text="$K(\mu')<K(60)=\alpha$" />. Type I error stays below{" "}
        <InlineMath tex="\alpha" /> throughout the null.
      </p>
      <p className={styles.note}>
        For a given <InlineMath tex="\alpha" />, the critical region of{" "}
        <MathText text="$H_0:\mu\leq\mu_0$ vs $H_1:\mu>\mu_0$" /> is the same as that of{" "}
        <MathText text="$H_0:\mu=\mu_0$ vs $H_1:\mu>\mu_0$" />.
      </p>
    </SceneFrame>
  );
}

export function At65Scene() {
  return (
    <SceneFrame kicker="Example" title="At μ = 65">
      <Formula tex={String.raw`K(65)=1-\Phi\left(\frac{62-65}{2}\right)=0.9332.`} />
      <p>
        If the true mean is 65, the probability of rejecting <InlineMath tex="H_0" /> is 93.32%. Then{" "}
        <MathText text="$\beta(65)=1-K(65)=0.0668$" />: about a 6.68% chance of failing to detect the difference.
      </p>
    </SceneFrame>
  );
}

export function AlphaFixedScene() {
  return (
    <SceneFrame kicker="Example" title="Power when α is fixed at 0.05">
      <p>
        Pre-assign <MathText text="$\alpha=0.05$" />. Solve
      </p>
      <Formula tex={String.raw`\alpha=\Pr(\bar{X}\geq c;\mu=60)=\Pr\left(\frac{\bar{X}-60}{2}\geq\frac{c-60}{2}\right)=0.05.`} />
      <p>
        So <MathText text="$(c-60)/2=z_{0.05}$" /> and <MathText text="$c=63.29$" />. The critical region is{" "}
        <MathText text="$\{\bar{x}\geq 63.29\}$" />.
      </p>
    </SceneFrame>
  );
}

export function AlphaFixedPowerScene() {
  return (
    <SceneFrame kicker="Example" title="Power at 65 after fixing α">
      <Formula tex={String.raw`K(65)=\Pr(\bar{X}\geq 63.29;\mu=65)=1-\Phi\left(\frac{63.29-65}{2}\right)=0.804.`} />
      <p>
        <MathText text="$\beta(65)=1-0.804=0.196$" />. If <MathText text="$\mu=65$" />, there is about a 19.6% chance of
        failing to detect the difference at the 5% level.
      </p>
    </SceneFrame>
  );
}

export function UpperPowerDeriveScene() {
  return (
    <SceneFrame kicker="One-sided power" title="Power when α is given">
      <Block title="Example">
        <p>
          <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim} N(\mu,\sigma^2)$ with known $\sigma^2$." /> Derive{" "}
          <MathText text="$K(\mu)$" /> for <MathText text="$H_0:\mu\leq\mu_0$ versus $H_1:\mu>\mu_0$" /> at{" "}
          <MathText text="$\alpha=0.05$" />.
        </p>
      </Block>
      <p>
        Critical region <MathText text="$\{\bar{x}>\mu_0+z_\alpha\sigma/\sqrt{n}\}$" />, so
      </p>
      <Formula
        tex={String.raw`K(\mu_1)=\Pr\left(\bar{X}>\mu_0+z_\alpha\frac{\sigma}{\sqrt{n}};\mu=\mu_1\right)
=\Pr\left(\frac{\bar{X}-\mu_1}{\sigma/\sqrt{n}}>\frac{\mu_0-\mu_1}{\sigma/\sqrt{n}}+z_\alpha\right).`}
      />
    </SceneFrame>
  );
}

export function UpperPowerPhiScene() {
  return (
    <SceneFrame kicker="One-sided power" title="Closed form">
      <p>
        Let <MathText text="$Z^*=(\bar{X}-\mu_1)/(\sigma/\sqrt{n})\sim N(0,1)$ at $\mu=\mu_1$" />. Then
      </p>
      <Formula tex={String.raw`K(\mu_1)=\Phi\left(\frac{\mu_1-\mu_0}{\sigma/\sqrt{n}}-z_\alpha\right).`} />
      <p className={styles.note}>
        Power depends on <MathText text="$\alpha$, $\mu_0$, $\mu_1$, and $n$" />.
      </p>
    </SceneFrame>
  );
}

export function PowerFactorsScene() {
  return (
    <SceneFrame kicker="One-sided power" title="Factors affecting the power">
      <BulletList
        items={[
          <MathText key="a" text="If $\alpha$ gets smaller, $z_\alpha$ increases and the power decreases." />,
          <MathText key="b" text="If $\mu_1-\mu_0$ gets larger, the power increases." />,
          <MathText key="c" text="If $\sigma$ increases, the power decreases." />,
          <MathText key="d" text="If $n$ increases, the power increases." />,
        ]}
      />
      <Formula tex={String.raw`\alpha\downarrow \Rightarrow z_\alpha\uparrow \Rightarrow K(\mu_1)\downarrow \Rightarrow \beta(\mu_1)\uparrow.`} />
    </SceneFrame>
  );
}

export function LowerPowerScene() {
  return (
    <SceneFrame kicker="One-sided power" title="Lower-tailed alternative">
      <p>
        For <MathText text="$H_0:\mu\geq\mu_0$ versus $H_1:\mu<\mu_0$" />, the critical region is{" "}
        <MathText text="$\{(\bar{X}-\mu_0)/(\sigma/\sqrt{n})<-z_\alpha\}$" />, and
      </p>
      <Formula tex={String.raw`K(\mu_1)=\Phi\left(\frac{\mu_0-\mu_1}{\sigma/\sqrt{n}}-z_\alpha\right).`} />
    </SceneFrame>
  );
}

export function EmsSetupScene() {
  return (
    <SceneFrame kicker="One-sided power" title="Emergency response times">
      <Block title="Example">
        <p>
          A city emergency service aims to respond in 12 minutes or less. A sample of 40 records has mean 13.25
          minutes, with known standard deviation 3.2 minutes, at level 0.05. Derive the power function and give the
          power at <MathText text="$\mu_1=13.5$" /> minutes.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function EmsSolutionScene() {
  return (
    <SceneFrame kicker="One-sided power" title="Emergency response: solution">
      <p>
        <MathText text="$H_0:\mu\leq 12$ and $H_1:\mu>12$" />, with <MathText text="$\sigma=3.2$, $n=40$, $\alpha=0.05$." />
      </p>
      <Formula tex={String.raw`K(\mu_1)=\Phi\left(\frac{\mu_1-12}{3.2/\sqrt{40}}-1.645\right).`} />
      <p>
        <MathText text="$K(13.5)=\Phi(1.3196)=0.907$" />. If the alternative is true, there is about a 90.7% chance of
        detecting the difference at the 5% level.
      </p>
    </SceneFrame>
  );
}

export function TwoSidedPowerSetupScene() {
  return (
    <SceneFrame kicker="Two-sided power" title="Setup">
      <Block title="Example">
        <p>
          <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim} N(\mu,\sigma^2)$ with known $\sigma^2$." /> Derive the
          power of <MathText text="$H_0:\mu=\mu_0$ versus $H_1:\mu\neq\mu_0$" /> at <MathText text="$\alpha=0.05$" />.
        </p>
      </Block>
      <p>
        Critical region <MathText text="$|(\bar{x}-\mu_0)/(\sigma/\sqrt{n})|>z_{\alpha/2}$" />. At{" "}
        <MathText text="$\mu=\mu_1$" />, <MathText text="$Z^*\sim N(0,1)$" />, and
      </p>
      <Formula tex={String.raw`K(\mu_1)=\Pr\left(\left|\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}\right|>z_{\alpha/2};\mu=\mu_1\right).`} />
    </SceneFrame>
  );
}

export function TwoSidedPowerDeriveScene() {
  return (
    <SceneFrame kicker="Two-sided power" title="Derivation">
      <Formula
        tex={String.raw`K(\mu_1)
=\Pr\left(\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}>z_{\alpha/2}\right)
+\Pr\left(\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}<-z_{\alpha/2}\right).`}
      />
      <Formula
        tex={String.raw`=\Pr\left(Z^*>\frac{\mu_0-\mu_1}{\sigma/\sqrt{n}}+z_{\alpha/2}\right)
+\Pr\left(Z^*<\frac{\mu_0-\mu_1}{\sigma/\sqrt{n}}-z_{\alpha/2}\right).`}
      />
      <Formula
        tex={String.raw`K(\mu_1)
=\Phi\left(\frac{\mu_1-\mu_0}{\sigma/\sqrt{n}}-z_{\alpha/2}\right)
+\Phi\left(\frac{\mu_0-\mu_1}{\sigma/\sqrt{n}}-z_{\alpha/2}\right).`}
      />
      <p>
        <MathText text="$K(\mu_1)$ is dominated by one of the two terms, and $K(\mu_1)\approx\Phi(|\mu_1-\mu_0|/(\sigma/\sqrt{n})-z_{\alpha/2})$." />
      </p>
    </SceneFrame>
  );
}

export function ToothpasteSetupScene() {
  return (
    <SceneFrame kicker="Two-sided power" title="Glow toothpaste">
      <Block title="Example">
        <p>
          Tubes are designed to hold a mean of 6 ounces. A sample of 30 tubes will check the process; it continues if
          the results are consistent with mean 6, and stops otherwise. A sample mean of 6.1 ounces is observed, with
          population standard deviation 0.2 ounces. What power does the procedure have, at 5%, of detecting a true mean
          that is 0.5 ounces above or below 6?
        </p>
      </Block>
    </SceneFrame>
  );
}

export function ToothpasteSolutionScene() {
  return (
    <SceneFrame kicker="Two-sided power" title="Glow toothpaste: solution">
      <p>
        Test <MathText text="$H_0:\mu=6$ vs $H_1:\mu\neq 6$" />, with <MathText text="$\sigma=0.2$, $n=30$, $|\mu_1-6|=0.5$." />
      </p>
      <Formula
        tex={String.raw`K(\mu_1)=\Phi\left(\frac{0.5}{0.2/\sqrt{30}}-z_{0.025}\right)+\Phi\left(\frac{-0.5}{0.2/\sqrt{30}}-z_{0.025}\right)
=\Phi(11.73)+\Phi(-15.65)\approx 1.`}
      />
      <p>The procedure would be almost certain of detecting that difference at level 0.05.</p>
    </SceneFrame>
  );
}

export function WhyKnownSigmaScene() {
  return (
    <SceneFrame kicker="Power" title="Why we assume known σ">
      <p>
        For <MathText text="$H_0:\mu=\mu_0$ vs $H_1:\mu=\mu_1$ with $\mu_0<\mu_1$" />, the critical region uses{" "}
        <MathText text="$t_\alpha(n-1)$" /> and <InlineMath tex="S" />. Then
      </p>
      <Formula tex={String.raw`\Pr\left(T^*>z_\alpha+\frac{\mu_0-\mu_1}{S/\sqrt{n}}\right)`} />
      <p>
        still depends on the random <InlineMath tex="S" />. Even with <InlineMath tex="\mu_1" /> fixed, the power varies
        with <InlineMath tex="S" />.
      </p>
    </SceneFrame>
  );
}

export function SampleSizeMotivationScene() {
  return (
    <SceneFrame kicker="Sample size" title="Controlling both errors">
      <p>
        For <MathText text="$H_0:\mu=60$ vs $H_1:\mu>60$" />:
      </p>
      <BulletList
        items={[
          <MathText key="a" text="$C=\{\bar{X}\geq 62\}$ gives $\alpha=0.1587$ and $\beta(65)=0.0668$." />,
          <MathText key="b" text="$C=\{\bar{X}\geq 63.29\}$ gives $\alpha=0.05$ and $\beta(65)=0.196$." />,
        ]}
      />
      <p className={styles.note}>How could we control Type I and Type II errors simultaneously?</p>
      <Block title="Example">
        <p>
          Suppose we want <MathText text="$\alpha=0.025$ and $\beta(65)=0.05$" />. How many samples are required?
        </p>
      </Block>
      <p>
        With <MathText text="$C=\{\bar{X}\geq c\}$ and $\bar{X}\sim N(\mu,100/n)$" />,
      </p>
      <Formula
        tex={String.raw`\alpha=1-\Phi\left(\frac{c-60}{10/\sqrt{n}}\right),\qquad
\beta=\Phi\left(\frac{c-65}{10/\sqrt{n}}\right).`}
      />
    </SceneFrame>
  );
}

export function SampleSizeSolveScene() {
  return (
    <SceneFrame kicker="Sample size" title="Solving for c and n">
      <Formula tex={String.raw`\frac{c-60}{10/\sqrt{n}}=z_{0.025}=1.96,\qquad
\frac{c-65}{10/\sqrt{n}}=-z_{0.05}=-1.645.`} />
      <p>
        Solving gives <MathText text="$c=62.718$ and $n=51.98$" />. Round up to <MathText text="$n=52$" /> so that{" "}
        <MathText text="$\alpha\approx 0.025$ and $\beta\approx 0.05$" />.
      </p>
    </SceneFrame>
  );
}

export function SampleSizeFormulaScene() {
  return (
    <SceneFrame kicker="Sample size" title="Using the power function">
      <Formula tex={String.raw`K(\mu_1)=\Phi\left(\frac{\mu_1-\mu_0}{\sigma/\sqrt{n}}-z_\alpha\right)=1-\beta.`} />
      <p>
        Since <MathText text="$\Phi(z_\beta)=1-\beta$" />,
      </p>
      <Formula tex={String.raw`n\approx\left(\frac{\sigma(z_\alpha+z_\beta)}{\mu_1-\mu_0}\right)^2
=\left(\frac{(1.960+1.645)\cdot 10}{65-60}\right)^2=51.98.`} />
      <p>
        With 52 samples and <MathText text="$\mu=65$" />, we control <MathText text="$\alpha\approx 0.025$" /> and{" "}
        <MathText text="$\beta\approx 0.05$" /> together.
      </p>
    </SceneFrame>
  );
}

export function TwoSidedNSetupScene() {
  return (
    <SceneFrame kicker="Sample size" title="Two-sided test for a mean">
      <Block title="Example">
        <p>
          <MathText text="$X_i\sim N(\mu,\sigma^2)$ with known $\sigma$." /> For{" "}
          <MathText text="$H_0:\mu=\mu_0$ versus $H_1:\mu\neq\mu_0$" />, how many samples detect a true mean{" "}
          <InlineMath tex="\mu_1" /> at level <InlineMath tex="\alpha" /> with Type II error <InlineMath tex="\beta" />?
        </p>
      </Block>
      <Formula
        tex={String.raw`K(\mu_1)=\Phi\left(\frac{\mu_1-\mu_0}{\sigma/\sqrt{n}}-z_{\alpha/2}\right)
+\Phi\left(\frac{\mu_0-\mu_1}{\sigma/\sqrt{n}}-z_{\alpha/2}\right)
\approx\Phi\left(\frac{|\mu_1-\mu_0|}{\sigma/\sqrt{n}}-z_{\alpha/2}\right).`}
      />
    </SceneFrame>
  );
}

export function TwoSidedNFormulaScene() {
  return (
    <SceneFrame kicker="Sample size" title="Two-sided sample size">
      <p>
        Set <MathText text="$\Phi(|\mu_1-\mu_0|/(\sigma/\sqrt{n})-z_{\alpha/2})=1-\beta$" />. Then
      </p>
      <Formula tex={String.raw`n\approx\frac{\sigma^2(z_{\alpha/2}+z_\beta)^2}{(\mu_1-\mu_0)^2}.`} />
      <p>
        About that many samples give power <MathText text="$1-\beta$" /> at level <InlineMath tex="\alpha" /> when the
        true mean is <InlineMath tex="\mu_1" />.
      </p>
    </SceneFrame>
  );
}

export function TwoSamplePowerSetupScene() {
  return (
    <SceneFrame kicker="Two-sample power" title="Equal known variances">
      <p>
        <MathText text="$X_1,\ldots,X_n\overset{\text{iid}}{\sim} N(\mu_X,\sigma^2)$ and $Y_1,\ldots,Y_n\overset{\text{iid}}{\sim} N(\mu_Y,\sigma^2)$, independent." />{" "}
        Test <MathText text="$H_0:\mu_X=\mu_Y$ vs $H_1:\mu_X\neq\mu_Y$" />, or with{" "}
        <MathText text="$\Delta:=\mu_X-\mu_Y$" />, <MathText text="$H_0:\Delta=0$ vs $H_1:\Delta\neq 0$" />. Assume{" "}
        <InlineMath tex="\sigma^2" /> known.
      </p>
      <Formula tex={String.raw`T:=\frac{\bar{X}-\bar{Y}}{\sqrt{2\sigma^2/n}}.`} />
      <BulletList
        items={[
          <MathText key="0" text="Under $H_0$, $T\sim N(0,1)$." />,
          <MathText key="1" text="Under $H_1$ with $\Delta=\Delta_1$, $T\sim N(\Delta_1/\sqrt{2\sigma^2/n},\ 1)$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TwoSamplePowerFnScene() {
  return (
    <SceneFrame kicker="Two-sample power" title="Power function">
      <p>
        Critical region <MathText text="$\{|t|>z_{\alpha/2}\}$" />. Then
      </p>
      <Formula
        tex={String.raw`K(\Delta)=\Phi\left(-z_{\alpha/2}+\frac{\Delta}{\sqrt{2\sigma^2/n}}\right)
+\Phi\left(-z_{\alpha/2}-\frac{\Delta}{\sqrt{2\sigma^2/n}}\right).`}
      />
    </SceneFrame>
  );
}

export function TwoSampleNScene() {
  return (
    <SceneFrame kicker="Two-sample power" title="Sample size">
      <p>
        For large <MathText text="$|\Delta|$" />, <MathText text="$K(\Delta)\approx\Phi(-z_{\alpha/2}+|\Delta|/\sqrt{2\sigma^2/n})$" />.
        Set this equal to <MathText text="$1-\beta$" />:
      </p>
      <Formula tex={String.raw`n\approx\frac{2(z_{\alpha/2}+z_\beta)^2\sigma^2}{\Delta^2}.`} />
      <p>The one-sided derivation is similar.</p>
    </SceneFrame>
  );
}

export function PowerSummaryScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing IV" title="Power and sample size">
      <DataTable
        caption={<>One-sample, <KeepCase>σ²</KeepCase> known, Δ = μ1 − μ0</>}
        headers={["Test", "Power (approx.)", "Sample size"]}
        rows={[
          [
            "Two-sided",
            <InlineMath key="k" tex={String.raw`\Phi(-z_{\alpha/2}+|\Delta|/(\sigma/\sqrt{n}))+\Phi(-z_{\alpha/2}-|\Delta|/(\sigma/\sqrt{n}))`} />,
            <InlineMath key="n" tex={String.raw`\sigma^2(z_{\alpha/2}+z_\beta)^2/\Delta^2`} />,
          ],
          [
            "One-sided >",
            <InlineMath key="k" tex={String.raw`\Phi(-z_\alpha+\Delta/(\sigma/\sqrt{n}))`} />,
            <InlineMath key="n" tex={String.raw`\sigma^2(z_\alpha+z_\beta)^2/\Delta^2`} />,
          ],
          [
            "One-sided <",
            <InlineMath key="k" tex={String.raw`\Phi(-z_\alpha-\Delta/(\sigma/\sqrt{n}))`} />,
            <InlineMath key="n" tex={String.raw`\sigma^2(z_\alpha+z_\beta)^2/\Delta^2`} />,
          ],
        ]}
      />
      <DataTable
        caption={<>Two-sample, equal known <KeepCase>σ²</KeepCase>, equal n, Δ = μX − μY</>}
        headers={["Test", "Power (approx.)", "Sample size"]}
        rows={[
          [
            "Two-sided",
            <InlineMath key="k" tex={String.raw`\Phi(-z_{\alpha/2}+|\Delta|/\sqrt{2\sigma^2/n})+\Phi(-z_{\alpha/2}-|\Delta|/\sqrt{2\sigma^2/n})`} />,
            <InlineMath key="n" tex={String.raw`2(z_{\alpha/2}+z_\beta)^2\sigma^2/\Delta^2`} />,
          ],
          [
            "One-sided >",
            <InlineMath key="k" tex={String.raw`\Phi(-z_\alpha+\Delta/\sqrt{2\sigma^2/n})`} />,
            <InlineMath key="n" tex={String.raw`2(z_\alpha+z_\beta)^2\sigma^2/\Delta^2`} />,
          ],
          [
            "One-sided <",
            <InlineMath key="k" tex={String.raw`\Phi(-z_\alpha-\Delta/\sqrt{2\sigma^2/n})`} />,
            <InlineMath key="n" tex={String.raw`2(z_\alpha+z_\beta)^2\sigma^2/\Delta^2`} />,
          ],
        ]}
      />
    </SceneFrame>
  );
}

export function BinomialSetupScene() {
  return (
    <SceneFrame kicker="Proportion power" title="A binomial test">
      <Block title="Example">
        <p>
          <MathText text="$X_1,\ldots,X_{20}$ are i.i.d. Bernoulli($p$)." /> Test{" "}
          <MathText text="$H_0:p=1/2$ vs $H_1:p<1/2$" /> with{" "}
          <MathText text="$Y=\sum X_i\sim\mathrm{Binomial}(20,p)$" /> and critical region{" "}
          <MathText text="$C=\{Y\leq 6\}$" />.
        </p>
        <OrderedList
          items={[
            <MathText key="1" text="Derive $K(p)$, and compute $\alpha$ and $\beta$ at $p=1/4$." />,
            <MathText key="2" text="How many samples control $\alpha=0.05$ and $\beta(1/4)=0.1$?" />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function BinomialPowerScene() {
  return (
    <SceneFrame kicker="Proportion power" title="Power function K(p)">
      <Formula tex={String.raw`K(p)=\Pr(Y\leq 6;Y\sim\mathrm{Bin}(20,p))=\sum_{y=0}^{6}\binom{20}{y}p^y(1-p)^{20-y}.`} />
      <Figure src="/figures/power_curve_binomial.png" alt="Power curve of the binomial test Y less than or equal to 6" width="62%" />
      <Caption>Power curve of the test that rejects when Y ≤ 6, n = 20.</Caption>
    </SceneFrame>
  );
}

export function BinomialAlphaScene() {
  return (
    <SceneFrame kicker="Proportion power" title="α and β(1/4)">
      <Formula tex={String.raw`K(1/2)=\sum_{y=0}^{6}\binom{20}{y}(1/2)^{20}=0.0577=\alpha.`} />
      <p>The significance level is 5.77%.</p>
      <Formula tex={String.raw`K(1/4)=0.7858,\qquad \beta(1/4)=1-K(1/4)=0.2142.`} />
      <p>If the true value is p = 1/4, the Type II error probability is 21.42%.</p>
    </SceneFrame>
  );
}

export function BinomialNSetupScene() {
  return (
    <SceneFrame kicker="Proportion sample size" title="Target α = 0.05 and β = 0.1">
      <p>
        Want <MathText text="$K(1/4)=0.9$" /> as well. Let <MathText text="$Y=\sum_{i=1}^n X_i$" /> and{" "}
        <MathText text="$C=\{Y\leq c\}$" />. The exact binomial equations are hard to solve, so use the CLT:
      </p>
      <Formula tex={String.raw`\frac{Y-np}{\sqrt{np(1-p)}}\overset{\text{approx}}{\sim} N(0,1).`} />
    </SceneFrame>
  );
}

export function BinomialEq1Scene() {
  return (
    <SceneFrame kicker="Proportion sample size" title="Controlling Type I error">
      <Formula
        tex={String.raw`\alpha=\Pr(Y\leq c;p=1/2)
\approx\Pr\left(Z\leq\frac{c-n/2}{\sqrt{n/4}}\right).`}
      />
      <Formula tex={String.raw`\frac{c-n/2}{\sqrt{n/4}}\approx -z_{0.05}=-1.645.\qquad (1)`} />
    </SceneFrame>
  );
}

export function BinomialEq2Scene() {
  return (
    <SceneFrame kicker="Proportion sample size" title="Controlling Type II error">
      <Formula
        tex={String.raw`\beta(1/4)=\Pr(Y>c;p=1/4)
=\Pr\left(\frac{Y-n/4}{\sqrt{3n/16}}>\frac{c-n/4}{\sqrt{3n/16}}\right).`}
      />
      <Formula tex={String.raw`\frac{c-n/4}{\sqrt{3n/16}}\approx z_{0.1}=1.282.\qquad (2)`} />
      <p>
        Solving (1) and (2) gives <MathText text="$n\approx 30.4$ and $c\approx 10.9$" />. Round <InlineMath tex="n" />{" "}
        up to 31. Since <InlineMath tex="Y" /> is an integer, take <MathText text="$c=10.5$" />.
      </p>
    </SceneFrame>
  );
}

export function BinomialCheck1Scene() {
  return (
    <SceneFrame kicker="Proportion sample size" title="Check nearby (n, c)">
      <p>
        For <MathText text="$(n,c)=(31,10.5)$" />: <MathText text="$\alpha=0.0354$" /> and{" "}
        <MathText text="$K(1/4)=0.872$" />.
      </p>
      <p>
        For <MathText text="$(n,c)=(32,11.5)$" />: <MathText text="$\alpha=0.0551$" /> and{" "}
        <MathText text="$K(1/4)=0.920$" />.
      </p>
    </SceneFrame>
  );
}

export function BinomialCheck2Scene() {
  return (
    <SceneFrame kicker="Proportion sample size" title="A pair that meets both targets">
      <p>
        For <MathText text="$(n,c)=(33,10.5)$" />: <MathText text="$\alpha=0.0175$" /> and{" "}
        <MathText text="$K(1/4)=0.819$" />.
      </p>
      <p>
        For <MathText text="$(n,c)=(33,11.5)$" />: <MathText text="$\alpha=0.0401$" /> and{" "}
        <MathText text="$K(1/4)=0.901$" />.
      </p>
      <p className={styles.note}>
        To keep Type I error at most 0.05 and Type II error at most 0.1, take n = 33 and reject when the sum is at most
        11.5.
      </p>
    </SceneFrame>
  );
}

export function ProportionTakeawaysScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing IV" title="Proportion power, in short">
      <BulletList
        items={[
          "Derive the power function with the binomial CDF.",
          "To choose n for given α and β, approximate the binomial by a normal.",
          "Because of that approximation, the n you get may not control α and β exactly.",
          "In practice, check Type I and Type II errors with the exact distribution.",
        ]}
      />
    </SceneFrame>
  );
}
