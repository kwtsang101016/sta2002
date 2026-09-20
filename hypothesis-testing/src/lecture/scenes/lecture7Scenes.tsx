import styles from "../Lecture.module.css";
import { Block, BulletList, Caption, DataTable, Figure, Formula, InlineMath, MathText, OrderedList, SceneFrame } from "./shared";

export function L7IntroScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing II" title="Introduction">
      <p>In this lecture, we will</p>
      <BulletList
        items={[
          "Continue our journey in hypothesis testing",
          <>
            Discuss hypothesis testing for
            <BulletList items={["Equality of two means", "Equality of two variances"]} />
          </>,
          <>
            The procedures are
            <BulletList items={["Pooled t-test", "Welch's t-test", "Paired t-test", "F-test"]} />
          </>,
          "Suggested reading: Chapter 8.1, 8.2 of the textbook",
        ]}
      />
    </SceneFrame>
  );
}

export function RecapFrameworkScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing II" title="Recap of the framework">
      <OrderedList
        items={[
          <MathText key="1" text="Formulate $H_0$ and $H_1$, and choose $\alpha$ (for example 0.05 or 0.01)." />,
          <MathText key="2" text="Choose the test statistic $T$, its distribution under $H_0$, and compute the realized value $t$." />,
          <>
            Draw a conclusion
            <BulletList
              items={[
                <MathText key="p" text="$p$-value: reject $H_0$ if $p$-value $\leq\alpha$" />,
                <MathText key="c" text="Critical region: reject $H_0$ if $t\in C$" />,
                "Confidence interval: reject H0 if the CI excludes the null parameter value",
              ]}
            />
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function TwoMeansSetupScene() {
  return (
    <SceneFrame kicker="Two means" title="Test equality of two normal means">
      <BulletList
        items={[
          <>
            Two independent i.i.d. samples
            <BulletList
              items={[
                <MathText key="x" text="$X_1,\ldots,X_n\sim N(\mu_X,\sigma_X^2)$" />,
                <MathText key="y" text="$Y_1,\ldots,Y_m\sim N(\mu_Y,\sigma_Y^2)$" />,
              ]}
            />
          </>,
          <MathText key="h" text="Test $H_0:\mu_X=\mu_Y$ against a competing $H_1$." />,
        ]}
      />
      <p>Three cases:</p>
      <OrderedList
        items={[
          <MathText key="1" text="Pooled t-test: independent samples, $\sigma_X^2=\sigma_Y^2=\sigma^2$ unknown" />,
          <MathText key="2" text="Welch's t-test: independent samples, $\sigma_X^2\neq\sigma_Y^2$ unknown" />,
          <MathText key="3" text="Paired t-test: $n=m$ and $(X_i,Y_i)$ are independent pairs" />,
        ]}
      />
    </SceneFrame>
  );
}

export function PooledStatScene() {
  return (
    <SceneFrame kicker="Pooled t" title="Pooled statistic">
      <Formula tex={String.raw`T:=\frac{\bar{X}-\bar{Y}}{S_p\sqrt{1/n+1/m}},\qquad
S_p^2=\frac{(n-1)S_X^2+(m-1)S_Y^2}{n+m-2}.`} />
      <BulletList
        items={[
          <MathText key="d" text="Under $H_0$, $T\sim t(n+m-2)$." />,
          <MathText key="t" text="Observed value $t=(\bar{x}-\bar{y})/(s_p\sqrt{1/n+1/m})$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function PooledUpperScene() {
  return (
    <SceneFrame kicker="Pooled t" title="H1: μX > μY">
      <Formula tex={String.raw`p=\Pr(T>t;T\sim t(n+m-2)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff t\geq t_\alpha(n+m-2)
\iff 0\notin\left(\bar{x}-\bar{y}-t_\alpha(n+m-2)\,s_p\sqrt{\tfrac{1}{n}+\tfrac{1}{m}},\infty\right).`}
      />
    </SceneFrame>
  );
}

export function PooledLowerScene() {
  return (
    <SceneFrame kicker="Pooled t" title="H1: μX < μY">
      <Formula tex={String.raw`p=\Pr(T<t;T\sim t(n+m-2)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff t\leq -t_\alpha(n+m-2)
\iff 0\notin\left(-\infty,\ \bar{x}-\bar{y}+t_\alpha(n+m-2)\,s_p\sqrt{\tfrac{1}{n}+\tfrac{1}{m}}\right).`}
      />
    </SceneFrame>
  );
}

export function PooledTwoScene() {
  return (
    <SceneFrame kicker="Pooled t" title="H1: μX ≠ μY">
      <Formula tex={String.raw`p=2\Pr(T>|t|;T\sim t(n+m-2)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff |t|\geq t_{\alpha/2}(n+m-2)
\iff 0\notin\left(\bar{x}-\bar{y}\pm t_{\alpha/2}(n+m-2)\,s_p\sqrt{\tfrac{1}{n}+\tfrac{1}{m}}\right).`}
      />
      <p className={styles.note}>The last interval is the two-sided pooled t-interval.</p>
    </SceneFrame>
  );
}

export function PooledExampleScene() {
  return (
    <SceneFrame kicker="Pooled t" title="Example">
      <Block title="Data">
        <p>
          <MathText text="$X\sim N(\mu_X,\sigma^2)$, $Y\sim N(\mu_Y,\sigma^2)$." />{" "}
          <MathText text="$n=12$, $\bar{x}=1076.75$, $s_X^2=29.30$; $m=12$, $\bar{y}=1072.33$, $s_Y^2=26.24$." />{" "}
          Test <MathText text="$H_0:\mu_X=\mu_Y$ vs $H_1:\mu_X\neq\mu_Y$" /> at <MathText text="$\alpha=0.10$" />.
        </p>
      </Block>
      <Formula
        tex={String.raw`t=\frac{1076.75-1072.33}{\sqrt{\frac{11(29.30)+11(26.24)}{22}\left(\frac{1}{12}+\frac{1}{12}\right)}}=2.05.`}
      />
      <p>
        <MathText text="$|t|=2.05>t_{0.05}(22)=1.717$, and $p=2\Pr(T>2.05;T\sim t(22))=0.0525<0.1$." />
      </p>
      <p className={styles.note}>Reject H0 at the 10% significance level.</p>
    </SceneFrame>
  );
}

export function WelchStatScene() {
  return (
    <SceneFrame kicker="Welch t" title="Welch statistic">
      <Formula tex={String.raw`T=\frac{\bar{X}-\bar{Y}}{\sqrt{S_X^2/n+S_Y^2/m}}.`} />
      <p>
        Under <InlineMath tex="H_0" />, <MathText text="$T\sim t(r)$ approximately, with" />
      </p>
      <Formula
        tex={String.raw`r=\left\lfloor
\frac{(S_X^2/n+S_Y^2/m)^2}{\frac{1}{n-1}(S_X^2/n)^2+\frac{1}{m-1}(S_Y^2/m)^2}
\right\rfloor.`}
      />
      <p>
        Observed <MathText text="$t=(\bar{x}-\bar{y})/\sqrt{s_X^2/n+s_Y^2/m}$" />. Only the two-sided test is derived
        here; one-sided rules are the same pattern and appear in the summary table.
      </p>
    </SceneFrame>
  );
}

export function WelchTwoScene() {
  return (
    <SceneFrame kicker="Welch t" title="H1: μX ≠ μY">
      <Formula tex={String.raw`p=2\Pr(T>|t|;T\sim t(r)).`} />
      <Formula
        tex={String.raw`p\leq\alpha
\iff |t|\geq t_{\alpha/2}(r)
\iff 0\notin\left(\bar{x}-\bar{y}\pm t_{\alpha/2}(r)\sqrt{\frac{s_X^2}{n}+\frac{s_Y^2}{m}}\right).`}
      />
      <p className={styles.note}>The last interval is Welch&apos;s t-interval.</p>
    </SceneFrame>
  );
}

export function PairedStatScene() {
  return (
    <SceneFrame kicker="Paired t" title="Paired statistic">
      <p>
        Consider <MathText text="$H_0:\mu_X=\mu_Y$ vs $H_1:\mu_X\neq\mu_Y$" />. Define{" "}
        <MathText text="$D_i:=X_i-Y_i$" />.
      </p>
      <Formula tex={String.raw`T:=\frac{\bar{D}}{S_D/\sqrt{n}}=\frac{\bar{X}-\bar{Y}}{S_D/\sqrt{n}}.`} />
      <p>
        Under <MathText text="$H_0:\mu_X=\mu_Y$" />, <MathText text="$T\sim t(n-1)$" />. Only the two-sided derivation
        is written out; one-sided rules follow the one-sample pattern on the differences.
      </p>
    </SceneFrame>
  );
}

export function PairedDecisionScene() {
  return (
    <SceneFrame kicker="Paired t" title="Decision rules">
      <p>
        Observed <MathText text="$t=(\bar{x}-\bar{y})/(s_D/\sqrt{n})$" /> and{" "}
        <MathText text="$p=2\Pr(T>|t|;T\sim t(n-1))$" />.
      </p>
      <Formula
        tex={String.raw`p\leq\alpha
\iff |t|\geq t_{\alpha/2}(n-1)
\iff 0\notin\left(\bar{x}-\bar{y}\pm t_{\alpha/2}(n-1)\frac{s_D}{\sqrt{n}}\right).`}
      />
      <p className={styles.note}>The last interval is the paired t-interval.</p>
    </SceneFrame>
  );
}

export function PairedExampleSetupScene() {
  return (
    <SceneFrame kicker="Paired t" title="Rope-jumping example">
      <Block title="Example">
        <p>
          Twenty-four girls in the 9th and 10th grades were put on an ultraheavy rope-jumping program. Let{" "}
          <InlineMath tex="D" /> equal the difference in time to run the 40-yard dash — the before-program time (
          <InlineMath tex="X" />) minus the after-program time (<InlineMath tex="Y" />). Assume{" "}
          <MathText text="$D$ is approximately $N(\mu_D,\sigma_D^2)$" />. Test{" "}
          <MathText text="$H_0:\mu_D=0$ against $H_1:\mu_D>0$" /> at <MathText text="$\alpha=0.10$" />. Observed{" "}
          <MathText text="$n=24$, $\bar{d}=0.0788$, $s_D=0.2549$" />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function PairedExampleDecisionScene() {
  return (
    <SceneFrame kicker="Paired t" title="Rope-jumping decision">
      <BulletList
        items={[
          <MathText key="p" text="$p$-value: $p=\Pr(T>1.514;T\sim t(23))=0.0718<0.1$, so reject $H_0$ at 10%." />,
          <MathText key="c" text="Critical region: $t=1.514>1.319$, so reject $H_0$ at 10%." />,
          <MathText key="i" text="90% one-sided paired CI: $(0.0788-1.319\times 0.2549/\sqrt{24},\infty)=(0.0101,\infty)$, which excludes 0, so reject $H_0$ at 10%." />,
        ]}
      />
    </SceneFrame>
  );
}

export function VarianceSetupScene() {
  return (
    <SceneFrame kicker="F-test" title="Equality of two normal variances">
      <BulletList
        items={[
          <MathText key="x" text="Independent samples $X_1,\ldots,X_n\sim N(\mu_X,\sigma_X^2)$ and $Y_1,\ldots,Y_m\sim N(\mu_Y,\sigma_Y^2)$." />,
          <MathText key="h" text="Test $H_0:\sigma_X^2=\sigma_Y^2$ vs $H_1:\sigma_X^2\neq\sigma_Y^2$." />,
        ]}
      />
      <Formula tex={String.raw`U=\frac{(n-1)S_X^2}{\sigma_X^2}\sim\chi^2(n-1),\qquad
V=\frac{(m-1)S_Y^2}{\sigma_Y^2}\sim\chi^2(m-1).`} />
    </SceneFrame>
  );
}

export function FStatScene() {
  return (
    <SceneFrame kicker="F-test" title="The F statistic">
      <p>
        If <MathText text="$U\sim\chi^2(u)$ and $V\sim\chi^2(v)$ are independent" />, then{" "}
        <MathText text="$(U/u)/(V/v)\sim F(u,v)$" />.
      </p>
      <Formula tex={String.raw`F:=\frac{U/(n-1)}{V/(m-1)}=\frac{S_X^2/\sigma_X^2}{S_Y^2/\sigma_Y^2}.`} />
      <p>
        Under <InlineMath tex="H_0" />, <MathText text="$F=S_X^2/S_Y^2\sim F(n-1,m-1)$" />. Observed{" "}
        <MathText text="$f=s_X^2/s_Y^2$" />.
      </p>
    </SceneFrame>
  );
}

export function FCriticalScene() {
  return (
    <SceneFrame kicker="F-test" title="Critical region">
      <p>The data favour <InlineMath tex="H_1" /> when the ratio is either too small or too large.</p>
      <Figure src="/figures/Ftest_critical.png" alt="F distribution with both-tail critical region" width="72%" />
      <Caption>
        Reject <InlineMath tex="H_0" /> at level <InlineMath tex="\alpha" /> when{" "}
        <MathText text="$f\geq F_{\alpha/2}(n-1,m-1)$ or $f\leq F_{1-\alpha/2}(n-1,m-1)$." />
      </Caption>
      <p>
        <strong>Remark.</strong> <MathText text="$F_{1-\alpha/2}(n-1,m-1)=1/F_{\alpha/2}(m-1,n-1)$." />
      </p>
    </SceneFrame>
  );
}

export function FPvalueScene() {
  return (
    <SceneFrame kicker="F-test" title="Two-sided p-value">
      <p>
        For <MathText text="$H_0:\sigma_X^2=\sigma_Y^2$ vs $H_1:\sigma_X^2\neq\sigma_Y^2$" />:
      </p>
      <Figure src="/figures/Ftest_diagram.png" alt="Two-sided p-value diagram for the F test" width="78%" />
      <BulletList
        items={[
          <MathText key="g" text="When $f>1$, $p=2\Pr(F>f;F\sim F(n-1,m-1))$." />,
          <MathText key="l" text="When $f<1$, $p=2\Pr(F<f;F\sim F(n-1,m-1))$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function FDecisionScene() {
  return (
    <SceneFrame kicker="F-test" title="Three equivalent rules">
      <p>
        Reject <InlineMath tex="H_0" /> at level <InlineMath tex="\alpha" /> when
      </p>
      <Formula
        tex={String.raw`p=2\min\{\Pr(F>f),\Pr(F<f)\}\leq\alpha
\iff f\geq F_{\alpha/2}(n-1,m-1)\ \text{or}\ f\leq F_{1-\alpha/2}(n-1,m-1)
\iff 1\notin\left(\frac{s_Y^2}{s_X^2}F_{1-\alpha/2}(n-1,m-1),\ \frac{s_Y^2}{s_X^2}F_{\alpha/2}(n-1,m-1)\right).`}
      />
      <p>
        That interval is the two-sided <MathText text="$100(1-\alpha)\%$" /> CI for{" "}
        <MathText text="$\sigma_Y^2/\sigma_X^2$" />.
      </p>
    </SceneFrame>
  );
}

export function TwoSampleSummaryScene() {
  return (
    <SceneFrame kicker="Hypothesis Testing II" title="Summary">
      <DataTable
        caption="Pooled t · T ~ t(n+m−2)"
        headers={["H0", "H1", "p-value", "Critical region"]}
        rows={[
          [<InlineMath key="a" tex={String.raw`\mu_X=\mu_Y`} />, <InlineMath key="b" tex={String.raw`\mu_X>\mu_Y`} />, <InlineMath key="c" tex={String.raw`\Pr(T>t)`} />, <InlineMath key="d" tex={String.raw`t\geq t_\alpha(n+m-2)`} />],
          [<InlineMath key="a" tex={String.raw`\mu_X=\mu_Y`} />, <InlineMath key="b" tex={String.raw`\mu_X<\mu_Y`} />, <InlineMath key="c" tex={String.raw`\Pr(T<t)`} />, <InlineMath key="d" tex={String.raw`t\leq -t_\alpha(n+m-2)`} />],
          [<InlineMath key="a" tex={String.raw`\mu_X=\mu_Y`} />, <InlineMath key="b" tex={String.raw`\mu_X\neq\mu_Y`} />, <InlineMath key="c" tex={String.raw`2\Pr(T>|t|)`} />, <InlineMath key="d" tex={String.raw`|t|\geq t_{\alpha/2}(n+m-2)`} />],
        ]}
      />
      <DataTable
        caption="Welch t · T ≈ t(r) · Paired t · T ~ t(n−1), t = d̄/(sD/√n)"
        headers={["Test", "H1", "p-value", "Critical region"]}
        rows={[
          ["Welch >", <InlineMath key="b" tex={String.raw`\mu_X>\mu_Y`} />, <InlineMath key="c" tex={String.raw`\Pr(T>t)`} />, <InlineMath key="d" tex={String.raw`t\geq t_\alpha(r)`} />],
          ["Welch <", <InlineMath key="b" tex={String.raw`\mu_X<\mu_Y`} />, <InlineMath key="c" tex={String.raw`\Pr(T<t)`} />, <InlineMath key="d" tex={String.raw`t\leq -t_\alpha(r)`} />],
          ["Welch ≠", <InlineMath key="b" tex={String.raw`\mu_X\neq\mu_Y`} />, <InlineMath key="c" tex={String.raw`2\Pr(T>|t|)`} />, <InlineMath key="d" tex={String.raw`|t|\geq t_{\alpha/2}(r)`} />],
          ["Paired >", <InlineMath key="b" tex={String.raw`\mu_D>0`} />, <InlineMath key="c" tex={String.raw`\Pr(T>t)`} />, <InlineMath key="d" tex={String.raw`t\geq t_\alpha(n-1)`} />],
          ["Paired <", <InlineMath key="b" tex={String.raw`\mu_D<0`} />, <InlineMath key="c" tex={String.raw`\Pr(T<t)`} />, <InlineMath key="d" tex={String.raw`t\leq -t_\alpha(n-1)`} />],
          ["Paired ≠", <InlineMath key="b" tex={String.raw`\mu_D\neq 0`} />, <InlineMath key="c" tex={String.raw`2\Pr(T>|t|)`} />, <InlineMath key="d" tex={String.raw`|t|\geq t_{\alpha/2}(n-1)`} />],
        ]}
      />
    </SceneFrame>
  );
}
