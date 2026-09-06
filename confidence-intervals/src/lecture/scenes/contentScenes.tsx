import styles from "../Lecture.module.css";
import { Block, BulletList, Formula, MathText, OrderedList, SceneFrame } from "./shared";

export function CiDefinitionScene() {
  return (
    <SceneFrame kicker="Foundations" title="Confidence interval">
      <Block title="Definition">
        <p>
          Let <MathText text="$X_1,\ldots,X_n$" /> be a sample from a distribution with PDF{" "}
          <MathText text="$f(x;\theta)$" />, <MathText text="$\theta\in\Omega$" />. Let{" "}
          <MathText text="$L=L(X_1,\ldots,X_n)$" /> and <MathText text="$U=U(X_1,\ldots,X_n)$" /> be
          statistics. For a level <MathText text="$\alpha\in(0,1)$" />, we say{" "}
          <MathText text="$(L,U)$" /> is a <MathText text="$(1-\alpha)100\%$" /> confidence interval
          for <MathText text="$\theta$" /> if
        </p>
        <Formula tex={String.raw`1-\alpha = P_\theta\bigl[\theta\in(L,U)\bigr].`} />
        <p>
          The probability that the random interval covers <MathText text="$\theta$" /> is{" "}
          <MathText text="$1-\alpha$" /> — the <strong>confidence coefficient</strong>.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function FourCasesScene() {
  return (
    <SceneFrame kicker="CI for a mean" title="Four cases for μ">
      <p>
        i.i.d. sample <MathText text="$X_1,\ldots,X_n$" /> for estimating{" "}
        <MathText text="$\mu=E(X_1)$" />:
      </p>
      <OrderedList
        items={[
          <>
            <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim}N(\mu,\sigma^2)$" />,{" "}
            <MathText text="$\sigma^2$" /> known
          </>,
          <>
            i.i.d. with mean <MathText text="$\mu$" />, variance <MathText text="$\sigma^2$" /> known
            (not necessarily normal)
          </>,
          <>
            <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim}N(\mu,\sigma^2)$" />,{" "}
            <MathText text="$\sigma^2$" /> unknown
          </>,
          <>
            i.i.d. with mean <MathText text="$\mu$" />, variance unknown (not necessarily normal)
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function Case1DeriveScene() {
  return (
    <SceneFrame kicker="Case 1" title="Normal, σ² known — derivation">
      <p>
        If <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim}N(\mu,\sigma^2)$" /> with{" "}
        <MathText text="$\sigma^2$" /> known, then{" "}
        <MathText text="$\bar X\sim N(\mu,\sigma^2/n)$" /> and
      </p>
      <Formula tex={String.raw`Z=\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}\sim N(0,1).`} />
      <p>
        Let <MathText text="$z_{\alpha/2}$" /> satisfy <MathText text="$P(Z>z_{\alpha/2})=\alpha/2$" />.
        Then
      </p>
      <Formula
        tex={String.raw`P\Bigl(-z_{\alpha/2}\le \dfrac{\bar X-\mu}{\sigma/\sqrt{n}}\le z_{\alpha/2}\Bigr)=1-\alpha`}
      />
      <Formula
        tex={String.raw`\Longrightarrow\;
P\Bigl(\bar X-z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}\le\mu\le
\bar X+z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}\Bigr)=1-\alpha.`}
      />
    </SceneFrame>
  );
}

export function Case1PropsScene() {
  return (
    <SceneFrame kicker="Case 1" title="Normal, σ² known — observed CI">
      <p>
        After observing <MathText text="$\bar x$" />, the realized interval
      </p>
      <Formula
        tex={String.raw`\bar x\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}
\quad\text{or}\quad
\Bigl[\bar x-z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}},\;
\bar x+z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}\Bigr]`}
      />
      <p>
        is a <MathText text="$100(1-\alpha)\%$" /> (two-sided) CI for <MathText text="$\mu$" />.
      </p>
      <BulletList
        items={[
          <>
            Centered at <MathText text="$\bar x$" />, a point estimate of <MathText text="$\mu$" />
          </>,
          <>
            Width <MathText text="$2\,z_{\alpha/2}\sigma/\sqrt{n}$" />
          </>,
          <>
            Larger <MathText text="$n$" /> ⇒ shorter CI
          </>,
          <>
            Larger <MathText text="$\alpha$" /> ⇒ smaller <MathText text="$z_{\alpha/2}$" /> ⇒ shorter
            CI
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function Case1ExampleScene() {
  return (
    <SceneFrame kicker="Case 1" title="Example — light bulb lifetimes">
      <Block title="The story">
        <p>
          A lighting manufacturer claims its bulbs last about 1,500 hours on average. Lifetime{" "}
          <MathText text="$X$" /> is modeled as <MathText text="$N(\mu,1296)$" /> — so{" "}
          <MathText text="$\sigma=36$" /> hours is known from long production history, but the true
          mean <MathText text="$\mu$" /> may have drifted. Quality control tests{" "}
          <MathText text="$n=27$" /> bulbs and observes <MathText text="$\bar x=1478$" /> hours.
        </p>
        <p>
          They want a <strong>95%</strong> CI for <MathText text="$\mu$" /> to see whether the
          process still matches the advertised lifetime.
        </p>
      </Block>
      <p>
        With <MathText text="$z_{0.025}=1.96$" />,
      </p>
      <Formula
        tex={String.raw`1478\pm 1.96\cdot\dfrac{36}{\sqrt{27}}=[1464.42,\,1491.58].`}
      />
      <p className={styles.muted}>
        The interval sits a bit below 1,500 — useful for deciding whether to investigate the line
        further. In R: <code>qnorm(0.975)</code> returns <MathText text="$z_{0.025}$" />.
      </p>
    </SceneFrame>
  );
}

export function Case2Scene() {
  return (
    <SceneFrame kicker="Case 2" title="Non-normal, σ² known (CLT)">
      <p>
        Drop normality: i.i.d. with mean <MathText text="$\mu$" /> and known variance{" "}
        <MathText text="$\sigma^2$" />. For large <MathText text="$n$" />, CLT gives
      </p>
      <Formula tex={String.raw`\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}\;\stackrel{\text{approx}}{\sim}\;N(0,1).`} />
      <p>Approximate two-sided CI:</p>
      <Formula tex={String.raw`\bar x\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}.`} />
    </SceneFrame>
  );
}

export function Case2ExampleScene() {
  return (
    <SceneFrame kicker="Case 2" title="Example — orange juice">
      <Block title="The story">
        <p>
          A beverage company wants a sense of how much orange juice an American drinks on a
          typical day. Let <MathText text="$X$" /> be that daily amount (in a fixed unit). Past
          industry studies suggest the day-to-day variation is large, with known standard
          deviation <MathText text="$\sigma=96$" />, but the distribution of{" "}
          <MathText text="$X$" /> itself need <strong>not</strong> be normal — some people drink
          none, others drink a lot.
        </p>
        <p>
          The company surveys <MathText text="$n=576$" /> adults (large enough for the CLT) and
          gets sample mean <MathText text="$\bar x=133$" />. They want an approximate{" "}
          <strong>90%</strong> confidence interval for the population mean{" "}
          <MathText text="$\mu=E(X)$" />.
        </p>
      </Block>
      <p>
        With <MathText text="$z_{0.05}=1.645$" /> and{" "}
        <MathText text="$\sqrt{576}=24$" />,
      </p>
      <Formula
        tex={String.raw`133\pm 1.645\cdot\dfrac{96}{\sqrt{576}}
=133\pm 1.645\cdot 4
=[126.42,\,139.58].`}
      />
      <p className={styles.muted}>
        So we are about 90% confident that average daily orange-juice consumption lies between
        126.42 and 139.58 (same units as the data).
      </p>
    </SceneFrame>
  );
}

export function Case3IntroScene() {
  return (
    <SceneFrame kicker="Case 3" title="Normal, σ² unknown">
      <p>
        If <MathText text="$\sigma$" /> is unknown we cannot plug it into the Case&nbsp;1 formula.
        Use the sample variance
      </p>
      <Formula
        tex={String.raw`S^2=\dfrac{1}{n-1}\sum_{i=1}^n(X_i-\bar X)^2.`}
      />
      <p>
        From Student&apos;s Theorem,
      </p>
      <Formula tex={String.raw`\dfrac{\bar X-\mu}{S/\sqrt{n}}\sim t(n-1).`} />
    </SceneFrame>
  );
}

export function Case3FormulaScene() {
  return (
    <SceneFrame kicker="Case 3" title="t-interval for μ">
      <Formula
        tex={String.raw`P\Bigl(
-t_{\alpha/2}(n-1)\le
\dfrac{\bar X-\mu}{S/\sqrt{n}}\le
t_{\alpha/2}(n-1)
\Bigr)=1-\alpha`}
      />
      <p>
        Observed <MathText text="$100(1-\alpha)\%$" /> CI (with realized <MathText text="$s$" />):
      </p>
      <Formula
        tex={String.raw`\Bigl[
\bar x-t_{\alpha/2}(n-1)\dfrac{s}{\sqrt{n}},\;
\bar x+t_{\alpha/2}(n-1)\dfrac{s}{\sqrt{n}}
\Bigr].`}
      />
    </SceneFrame>
  );
}

export function Case3ExampleScene() {
  return (
    <SceneFrame kicker="Case 3" title="Example — entrance exam scores">
      <Block title="The story">
        <p>
          An admissions office treats a standardized entrance-exam score{" "}
          <MathText text="$X$" /> as approximately normal, but neither the mean{" "}
          <MathText text="$\mu$" /> nor the variance is known in advance for this year&apos;s
          applicant pool. From a random sample of <MathText text="$n=20$" /> applicants they
          compute <MathText text="$\bar x=507.50$" /> and <MathText text="$s=89.75$" />.
        </p>
        <p>
          They want a <strong>90%</strong> CI for the population mean score — Case&nbsp;3, because{" "}
          <MathText text="$\sigma$" /> must be estimated from the same sample.
        </p>
      </Block>
      <p>
        With <MathText text="$t_{0.05}(19)=1.729$" />,
      </p>
      <Formula
        tex={String.raw`507.50\pm 1.729\cdot\dfrac{89.75}{\sqrt{20}}=[472.80,\,542.20].`}
      />
      <p className={styles.muted}>
        In R: <code>qt(0.95, 19)</code> for the upper 5% point of <MathText text="$t(19)$" />.
      </p>
    </SceneFrame>
  );
}

export function Case4Scene() {
  return (
    <SceneFrame kicker="Case 4" title="Non-normal, σ² unknown">
      <p>
        If <MathText text="$n$" /> is large (say <MathText text="$n\ge 100$" />) or each{" "}
        <MathText text="$X_i$" /> is approximately normal,
      </p>
      <Formula
        tex={String.raw`\dfrac{\bar X-\mu}{S/\sqrt{n}}\;\stackrel{\text{approx}}{\sim}\;t(n-1).`}
      />
      <p>Approximate CI:</p>
      <Formula
        tex={String.raw`\bar x\pm t_{\alpha/2}(n-1)\dfrac{s}{\sqrt{n}}.`}
      />
      <BulletList
        items={[
          <>
            For large <MathText text="$n$" />, <MathText text="$t_{\alpha/2}(n-1)\approx z_{\alpha/2}$" />,
            so <MathText text="$\bar x\pm z_{\alpha/2}s/\sqrt{n}$" /> is also used
          </>,
          <>
            Caution if <MathText text="$n$" /> is small or the data are heavily skewed
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function OneSidedScene() {
  return (
    <SceneFrame kicker="One-sided" title="One-sided confidence intervals">
      <p>
        Two-sided intervals are of the form <MathText text="$\bar x\pm a$" />. Sometimes only a
        lower or upper bound on <MathText text="$\mu$" /> matters.
      </p>
      <p>
        For <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim}N(\mu,\sigma^2)$" /> with{" "}
        <MathText text="$\sigma^2$" /> known:
      </p>
      <Formula
        tex={String.raw`P\Bigl(\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}\le z_\alpha\Bigr)=1-\alpha
\;\Longrightarrow\;
P\Bigl(\mu\ge \bar X-z_\alpha\dfrac{\sigma}{\sqrt{n}}\Bigr)=1-\alpha.`}
      />
    </SceneFrame>
  );
}

export function OneSidedFormulaScene() {
  return (
    <SceneFrame kicker="One-sided" title="Lower and upper bounds">
      <Formula
        tex={String.raw`\Bigl[\bar x-z_\alpha\dfrac{\sigma}{\sqrt{n}},\;\infty\Bigr)
\quad\text{and}\quad
\Bigl(-\infty,\;\bar x+z_\alpha\dfrac{\sigma}{\sqrt{n}}\Bigr]`}
      />
      <p>
        are one-sided <MathText text="$100(1-\alpha)\%$" /> CIs for <MathText text="$\mu$" />.
      </p>
      <Block title="When one side is enough">
        <p>
          A manufacturer may only care that mean bulb life is <em>at least</em> some warranty
          threshold (lower bound). A hospital monitoring wait times may only care that the mean is{" "}
          <em>not too large</em> (upper bound). Two-sided intervals waste half their error budget
          on the side nobody will use.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function Part1SummaryScene() {
  return (
    <SceneFrame kicker="Summary" title="Two-sided CI for μ">
      <div className={styles.tableWrap}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Setting</th>
              <th>Pivot</th>
              <th>CI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <MathText text="$N(\mu,\sigma^2)$" />, <MathText text="$\sigma^2$" /> known
              </td>
              <td>
                <MathText text="$Z\sim N(0,1)$" />
              </td>
              <td>
                <MathText text="$\bar x\pm z_{\alpha/2}\sigma/\sqrt{n}$" />
              </td>
            </tr>
            <tr>
              <td>
                Large <MathText text="$n$" />, <MathText text="$\sigma^2$" /> known
              </td>
              <td>
                <MathText text="$Z$" /> approx.
              </td>
              <td>
                <MathText text="$\bar x\pm z_{\alpha/2}\sigma/\sqrt{n}$" />
              </td>
            </tr>
            <tr>
              <td>
                <MathText text="$N$" />, <MathText text="$\sigma^2$" /> unknown
              </td>
              <td>
                <MathText text="$t(n-1)$" />
              </td>
              <td>
                <MathText text="$\bar x\pm t_{\alpha/2}(n-1)s/\sqrt{n}$" />
              </td>
            </tr>
            <tr>
              <td>
                Large <MathText text="$n$" />, <MathText text="$\sigma^2$" /> unknown
              </td>
              <td>
                <MathText text="$t$" /> / <MathText text="$z$" /> approx.
              </td>
              <td>
                <MathText text="$\bar x\pm t_{\alpha/2}(n-1)s/\sqrt{n}$" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SceneFrame>
  );
}

export function Part2IntroScene() {
  return (
    <SceneFrame kicker="Part II" title="Beyond a single mean" tone="gold">
      <BulletList
        items={[
          "Confidence intervals for a difference of two means",
          "Confidence intervals for proportions",
          "Sample size determination for a given margin of error",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 12 }}>
        Reading: Chapters 7.2–7.4.
      </p>
    </SceneFrame>
  );
}

export function DiffMeansSetupScene() {
  return (
    <SceneFrame kicker="Two means" title="CI for μX − μY">
      <p>Independent normal samples</p>
      <Formula
        tex={String.raw`X_1,\ldots,X_n\sim N(\mu_X,\sigma_X^2),\qquad
Y_1,\ldots,Y_m\sim N(\mu_Y,\sigma_Y^2).`}
      />
      <OrderedList
        items={[
          <>
            <strong>Pooled t:</strong> independent samples, <MathText text="$\sigma_X^2=\sigma_Y^2=\sigma^2$" />{" "}
            unknown
          </>,
          <>
            <strong>Welch t:</strong> independent samples, unequal unknown variances
          </>,
          <>
            <strong>Paired t:</strong> within-pair dependence; pairs independent; work with{" "}
            <MathText text="$D_i=X_i-Y_i$" />
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function PooledTheoremScene() {
  return (
    <SceneFrame kicker="Pooled t" title="Equal variances">
      <p>
        Independent <MathText text="$N(\mu_X,\sigma^2)$" /> and <MathText text="$N(\mu_Y,\sigma^2)$" />{" "}
        samples. A <MathText text="$100(1-\alpha)\%$" /> CI for <MathText text="$\mu_X-\mu_Y$" /> is
      </p>
      <Formula
        tex={String.raw`\bar X-\bar Y\pm t_{\alpha/2}(n+m-2)\,S_p\sqrt{\dfrac{1}{n}+\dfrac{1}{m}},`}
      />
      <p>with pooled variance estimator</p>
      <Formula
        tex={String.raw`S_p^2=\dfrac{(n-1)S_X^2+(m-1)S_Y^2}{n+m-2}.`}
      />
      <p>
        <MathText text="$S_p^2$" /> is unbiased for <MathText text="$\sigma^2$" />.
      </p>
    </SceneFrame>
  );
}

export function PooledExampleScene() {
  return (
    <SceneFrame kicker="Pooled t" title="Example — two schools">
      <Block title="The story">
        <p>
          An education researcher compares mean scores on the same standardized test in a{" "}
          <strong>large</strong> high school (<MathText text="$X$" />) and a <strong>small</strong>{" "}
          one (<MathText text="$Y$" />). Scores are modeled as normal with a common unknown
          variance (similar classrooms and grading). Samples:
        </p>
        <BulletList
          items={[
            <>
              Large school: <MathText text="$n=9$" />, <MathText text="$\bar x=81.31$" />,{" "}
              <MathText text="$s_x^2=60.76$" />
            </>,
            <>
              Small school: <MathText text="$m=15$" />, <MathText text="$\bar y=78.61$" />,{" "}
              <MathText text="$s_y^2=48.24$" />
            </>,
          ]}
        />
        <p>
          Goal: a <strong>95%</strong> CI for <MathText text="$\mu_X-\mu_Y$" /> — is there a clear
          mean gap between schools?
        </p>
      </Block>
      <p>
        With <MathText text="$t_{0.025}(22)=2.074$" />,
      </p>
      <Formula
        tex={String.raw`s_p=\sqrt{\dfrac{8\cdot60.76+14\cdot48.24}{22}},`}
      />
      <Formula
        tex={String.raw`81.31-78.61\pm 2.074\,s_p\sqrt{\tfrac{1}{9}+\tfrac{1}{15}}
=[\,-3.65,\,9.05\,].`}
      />
      <p className={styles.muted}>
        The interval covers 0, so these data do not show a clear mean difference under the pooled
        model.
      </p>
    </SceneFrame>
  );
}

export function WelchTheoremScene() {
  return (
    <SceneFrame kicker="Welch t" title="Unequal variances">
      <p>Approximate CI:</p>
      <Formula
        tex={String.raw`\bar X-\bar Y\pm t_{\alpha/2}(r)
\sqrt{\dfrac{S_X^2}{n}+\dfrac{S_Y^2}{m}},`}
      />
      <p>
        where the (floored) Welch–Satterthwaite degrees of freedom are
      </p>
      <Formula
        tex={String.raw`r=\left\lfloor
\dfrac{\bigl(S_X^2/n+S_Y^2/m\bigr)^2}
{\frac{1}{n-1}(S_X^2/n)^2+\frac{1}{m-1}(S_Y^2/m)^2}
\right\rfloor.`}
      />
    </SceneFrame>
  );
}

export function WelchExampleScene() {
  return (
    <SceneFrame kicker="Welch t" title="Example — same schools, σ² unequal">
      <Block title="The story">
        <p>
          Same two schools and the same sample summaries — but now the researcher doubts that the
          score variances are equal (different class sizes, different tutoring access). Welch&apos;s
          method does not pool the variances.
        </p>
      </Block>
      <p>
        Then <MathText text="$r=15$" />, <MathText text="$t_{0.025}(15)=2.131$" />, and
      </p>
      <Formula
        tex={String.raw`\mathrm{SE}=\sqrt{\dfrac{60.76}{9}+\dfrac{48.24}{15}}\approx 3.157.`}
      />
      <Formula
        tex={String.raw`81.31-78.61\pm 2.131\times 3.157
\approx[\,-4.03,\,9.43\,].`}
      />
      <p className={styles.muted}>
        Still covers 0. Compared with the pooled interval <MathText text="$[-3.65,\,9.05]$" />: same
        center, slightly wider CI when we refuse to assume equal variances.
      </p>
    </SceneFrame>
  );
}

export function PairedDefScene() {
  return (
    <SceneFrame kicker="Paired t" title="Paired samples">
      <Block title="Definition">
        <p>
          Samples are <strong>paired</strong> when each observation in the first sample is matched
          to a unique observation in the second.
        </p>
      </Block>
      <BulletList
        items={[
          "Weight before vs after a drug",
          "Test scores before vs after an online course",
          "Same subject reacts to red vs green light",
        ]}
      />
    </SceneFrame>
  );
}

export function DesignActivityScene() {
  return (
    <SceneFrame kicker="Design" title="Activity — two hair styles" tone="gold">
      <Block title="The story">
        <p>
          A stylist wants public opinion on two looks for a celebrity client: “going chestnut” vs
          “daddy look.” How you recruit raters changes which CI you should use later.
        </p>
      </Block>
      <OrderedList
        items={[
          <>
            <strong>Design 1:</strong> 100 people rate chestnut only; another 100 rate daddy look
            only. (Independent samples → pooled or Welch)
          </>,
          <>
            <strong>Design 2:</strong> 100 people rate <em>both</em> styles. (Paired differences —
            each person is their own control)
          </>,
        ]}
      />
      <p>
        How do the comparisons differ? Which design removes more person-to-person taste variation?
      </p>
    </SceneFrame>
  );
}

export function PairedTheoremScene() {
  return (
    <SceneFrame kicker="Paired t" title="Paired t-interval">
      <p>
        Let <MathText text="$D_i=X_i-Y_i$" /> with{" "}
        <MathText text="$D_i\stackrel{\text{i.i.d.}}{\sim}N(\mu_D,\sigma_D^2)$" /> and{" "}
        <MathText text="$\mu_D=\mu_X-\mu_Y$" />. Then
      </p>
      <Formula
        tex={String.raw`\bar D\pm t_{\alpha/2}(n-1)\dfrac{S_D}{\sqrt{n}},`}
      />
      <Formula
        tex={String.raw`\bar D=\dfrac{1}{n}\sum D_i,\qquad
S_D^2=\dfrac{1}{n-1}\sum(D_i-\bar D)^2.`}
      />
    </SceneFrame>
  );
}

export function PairedProofScene() {
  return (
    <SceneFrame kicker="Paired t" title="Why it is a t-interval">
      <Formula
        tex={String.raw`\bar D\sim N(\mu_D,\sigma_D^2/n),\qquad
\dfrac{(n-1)S_D^2}{\sigma_D^2}\sim\chi^2(n-1)`}
      />
      <p>hence</p>
      <Formula
        tex={String.raw`\dfrac{\bar D-(\mu_X-\mu_Y)}{S_D/\sqrt{n}}\sim t(n-1),`}
      />
      <p>which rearranges to the paired CI coverage probability <MathText text="$1-\alpha$" />.</p>
    </SceneFrame>
  );
}

export function PairedExampleScene() {
  return (
    <SceneFrame kicker="Paired t" title="Example — red vs green reaction times">
      <Block title="The story">
        <p>
          A human-factors lab studies whether people hit a brake-style switch faster for a{" "}
          <strong>red</strong> light than for a <strong>green</strong> one. Each of{" "}
          <MathText text="$n=8$" /> subjects sees both colors; the natural unit of analysis is the
          within-person difference <MathText text="$D_i=X_i-Y_i$" /> (red minus green, in seconds).
        </p>
        <p>
          Summaries: <MathText text="$\bar d=-0.0625$" />, <MathText text="$s_d=0.0765$" />. A{" "}
          <strong>95%</strong> paired CI for <MathText text="$\mu_X-\mu_Y$" />:
        </p>
      </Block>
      <Formula
        tex={String.raw`-0.0625\pm t_{0.025}(7)\dfrac{0.0765}{\sqrt{8}}
=[\,-0.1265,\,0.0015\,].`}
      />
      <p className={styles.muted}>
        Barely covers 0 — pairing was essential: the same eight people also give{" "}
        <MathText text="$\bar x=0.3700$" />, <MathText text="$\bar y=0.4325$" />,{" "}
        <MathText text="$s_X=0.1124$" />, <MathText text="$s_Y=0.1173$" /> for unpaired analyses.
      </p>
    </SceneFrame>
  );
}

export function UnpairedOnPairedDataScene() {
  return (
    <SceneFrame kicker="Paired t" title="Same data, unpaired CIs">
      <p>
        If we ignore pairing and treat the eight red times and eight green times as two independent
        samples, the CIs get wider — we throw away the within-subject structure:
      </p>
      <BulletList
        items={[
          <>
            Pooled (<MathText text="$t_{0.025}(14)=2.145$" />, <MathText text="$s_p=0.1149$" />):{" "}
            <MathText text="$[\,-0.1857,\,0.0607\,]$" />
          </>,
          <>
            Welch (<MathText text="$r=13$" />, <MathText text="$t=2.160$" />, SE{" "}
            <MathText text="$0.0574$" />): <MathText text="$[\,-0.1865,\,0.0615\,]$" />
          </>,
        ]}
      />
      <p>
        All three share the center <MathText text="$\bar d=\bar x-\bar y$" />, but the paired
        interval is the narrowest — the design that matches the experiment.
      </p>
    </SceneFrame>
  );
}

export function DiffCompareScene() {
  return (
    <SceneFrame kicker="Two means" title="Comparing the three CIs">
      <BulletList
        items={[
          <>
            Same center <MathText text="$\bar d=\bar x-\bar y$" />
          </>,
          <>
            Widths depend on design and on <MathText text="$\mathrm{Corr}(X,Y)$" />:{" "}
            <MathText text="$\mathrm{Var}(X-Y)=\sigma_X^2+\sigma_Y^2-2\rho\sigma_X\sigma_Y$" />
          </>,
          <>
            Typical order when pairing is valid and <MathText text="$\rho>0$" />:{" "}
            <strong>paired &lt; pooled &lt; Welch</strong>
          </>,
          <>
            If <MathText text="$\rho\approx 0$" />, pairing helps little; if{" "}
            <MathText text="$\rho<0$" />, a paired CI can be <em>wider</em> than unpaired ones
          </>,
          <>
            If <MathText text="$s_X^2\approx s_Y^2$" />, pooled and Welch widths are similar
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function DesignMapScene() {
  return (
    <SceneFrame kicker="Design" title="Hair styles — which CI?">
      <p>Returning to the stylist&apos;s study:</p>
      <OrderedList
        items={[
          <>
            Design 1 (separate raters) → <strong>pooled or Welch</strong> t-interval for the
            difference of means
          </>,
          <>
            Design 2 (same raters, both styles) → <strong>paired</strong> t-interval on score
            differences
          </>,
        ]}
      />
      <p className={styles.muted}>
        Same research question; the sampling design picks the method.
      </p>
    </SceneFrame>
  );
}

export function PropSetupScene() {
  return (
    <SceneFrame kicker="Proportions" title="CI for a proportion p">
      <Block title="The story">
        <p>
          In a political campaign, managers need the population supporting rate{" "}
          <MathText text="$p$" /> for candidate A. A poll interviews{" "}
          <MathText text="$n=351$" /> voters; <MathText text="$y=185$" /> favor A (the rest favor
          B).
        </p>
      </Block>
      <p>
        Let <MathText text="$X_i=1$" /> if voter <MathText text="$i$" /> favors A, else 0, so{" "}
        <MathText text="$X_i\stackrel{\text{i.i.d.}}{\sim}\mathrm{Bernoulli}(p)$" /> and{" "}
        <MathText text="$Y=\sum X_i$" />.
      </p>
      <Formula
        tex={String.raw`E(Y)=np,\qquad \mathrm{Var}(Y)=np(1-p).`}
      />
      <p>For large n, CLT:</p>
      <Formula
        tex={String.raw`\hat p=\dfrac{Y}{n}\;\stackrel{\text{approx}}{\sim}\;
N\Bigl(p,\dfrac{p(1-p)}{n}\Bigr).`}
      />
    </SceneFrame>
  );
}

export function PropDeriveScene() {
  return (
    <SceneFrame kicker="Proportions" title="From CLT to a CI">
      <Formula
        tex={String.raw`P\Bigl(
-z_{\alpha/2}\le
\dfrac{\hat p-p}{\sqrt{p(1-p)/n}}
\le z_{\alpha/2}
\Bigr)\approx 1-\alpha.`}
      />
      <p>
        Replace unknown <MathText text="$p$" /> by <MathText text="$\hat p$" /> (LLN). Approximate
        CI:
      </p>
      <Formula
        tex={String.raw`\hat p\pm z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}.`}
      />
    </SceneFrame>
  );
}

export function PropExampleScene() {
  return (
    <SceneFrame kicker="Proportions" title="Example — campaign survey">
      <Block title="Back to the poll">
        <p>
          With <MathText text="$185$" /> supporters out of <MathText text="$351$" /> voters, the
          campaign&apos;s point estimate is just over half. How uncertain is that in a 95% sense?
        </p>
      </Block>
      <Formula tex={String.raw`\hat p=185/351\approx 0.527`} />
      <p>Approximate 95% CI:</p>
      <Formula
        tex={String.raw`0.527\pm 1.96\sqrt{\dfrac{0.527(1-0.527)}{351}}
=[0.475,\,0.579].`}
      />
      <p className={styles.muted}>
        A lead near 53% still has a CI that dips below 50% — the race is not safely called from
        this poll alone.
      </p>
    </SceneFrame>
  );
}

export function PropDiffScene() {
  return (
    <SceneFrame kicker="Proportions" title="Difference p₁ − p₂">
      <p>Independent samples from two populations:</p>
      <Formula
        tex={String.raw`E(\hat p_1-\hat p_2)=p_1-p_2,\quad
\mathrm{Var}(\hat p_1-\hat p_2)=
\dfrac{p_1(1-p_1)}{n_1}+\dfrac{p_2(1-p_2)}{n_2}.`}
      />
      <p>Large-sample CI (plug in <MathText text="$\hat p_i$" />):</p>
      <Formula
        tex={String.raw`\hat p_1-\hat p_2\pm z_{\alpha/2}
\sqrt{\dfrac{\hat p_1(1-\hat p_1)}{n_1}+\dfrac{\hat p_2(1-\hat p_2)}{n_2}}.`}
      />
    </SceneFrame>
  );
}

export function PropDiffExampleScene() {
  return (
    <SceneFrame kicker="Proportions" title="Example — gaming interest">
      <Block title="The story">
        <p>
          A campus newspaper asks whether male and female students report different rates of
          regular gaming. Large independent samples give{" "}
          <MathText text="$\hat p_1=0.6$" /> (males, <MathText text="$n_1=2000$" />) and{" "}
          <MathText text="$\hat p_2=0.4$" /> (females, <MathText text="$n_2=2200$" />).
        </p>
        <p>
          Interest is in <MathText text="$p_1-p_2$" /> — the difference in population proportions —
          with an approximate <strong>95%</strong> CI.
        </p>
      </Block>
      <Formula
        tex={String.raw`0.6-0.4\pm 1.96
\sqrt{\dfrac{0.6\cdot0.4}{2000}+\dfrac{0.4\cdot0.6}{2200}}
=[0.17,\,0.23].`}
      />
      <p className={styles.muted}>
        The entire interval is positive and away from 0, so these data support a real gender gap in
        reported gaming rates (under the survey&apos;s sampling assumptions).
      </p>
    </SceneFrame>
  );
}

export function SampleSizeMeanScene() {
  return (
    <SceneFrame kicker="Sample size" title="Margin of error for a mean">
      <p>
        For <MathText text="$N(\mu,\sigma^2)$" /> with <MathText text="$\sigma$" /> known, half-width
        (margin of error) is <MathText text="$z_{\alpha/2}\sigma/\sqrt{n}$" />. Require{" "}
        <MathText text="$\le\varepsilon$" />:
      </p>
      <Formula
        tex={String.raw`n\ge\dfrac{z_{\alpha/2}^2\sigma^2}{\varepsilon^2}.`}
      />
      <p>
        If <MathText text="$\sigma$" /> unknown: approximate with <MathText text="$z$" /> and a pilot{" "}
        <MathText text="$s_p$" /> —
        <MathText text="$n\ge z_{\alpha/2}^2 s_p^2/\varepsilon^2$" />.
      </p>
    </SceneFrame>
  );
}

export function SampleSizeMeanExampleScene() {
  return (
    <SceneFrame kicker="Sample size" title="Example — memory test">
      <Block title="The story">
        <p>
          A psychology team plans a study with a standardized memory test whose score SD is known
          from norms to be <MathText text="$\sigma=12$" />. Before recruiting, they ask: how many
          participants do we need so a <strong>95%</strong> CI for mean score has margin of error at
          most <MathText text="$2$" /> points?
        </p>
      </Block>
      <Formula
        tex={String.raw`1.96\cdot\dfrac{12}{\sqrt{n}}\le 2
\;\Longrightarrow\; n\ge 138.3
\;\Longrightarrow\; n=139.`}
      />
      <p className={styles.muted}>
        Always round <em>up</em> — a fractional person is not recruitable, and undershooting{" "}
        <MathText text="$n$" /> would miss the precision target.
      </p>
    </SceneFrame>
  );
}

export function SampleSizePropScene() {
  return (
    <SceneFrame kicker="Sample size" title="Sample size for a proportion">
      <Formula
        tex={String.raw`n\ge\dfrac{z_{\alpha/2}^2\,\hat p(1-\hat p)}{\varepsilon^2}.`}
      />
      <p>
        Before sampling, use a prior <MathText text="$p^*$" />, or the worst case{" "}
        <MathText text="$p(1-p)\le 1/4$" />:
      </p>
      <Formula tex={String.raw`n\ge\dfrac{z_{\alpha/2}^2}{4\varepsilon^2}.`} />
    </SceneFrame>
  );
}

export function SampleSizeAptScene() {
  return (
    <SceneFrame kicker="Sample size" title="Example — apartment owners">
      <Block title="The story">
        <p>
          A district contains <MathText text="$N=8000$" /> apartment units. City planners want the{" "}
          <em>number</em> of owners who plan to sell within a year. A quick pilot suggests about{" "}
          <MathText text="$12\%$" /> (<MathText text="$p^*=0.12$" />). They need a{" "}
          <strong>95%</strong> CI for that count with half-width less than{" "}
          <MathText text="$200$" /> units — how many owners must they survey?
        </p>
      </Block>
      <Formula
        tex={String.raw`N\hat p\pm N z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}},`}
      />
      <Formula
        tex={String.raw`1.96\cdot N\sqrt{\dfrac{p^*(1-p^*)}{n}}\le 200
\;\Longrightarrow\; n\ge 649.1
\;\Longrightarrow\; n=650.`}
      />
      <p className={styles.muted}>
        Scaling by <MathText text="$N$" /> turns a CI for a proportion into a CI for a population
        total — common in survey sampling for planning.
      </p>
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Takeaways" tone="dark">
      <BulletList
        items={[
          <>
            A CI is a <strong>random</strong> interval with coverage probability{" "}
            <MathText text="$1-\alpha$" />
          </>,
          <>
            Choose <MathText text="$z$" /> vs <MathText text="$t$" /> from normality / large-n and
            whether <MathText text="$\sigma$" /> is known
          </>,
          <>
            For two means: match the design — pooled, Welch, or paired
          </>,
          <>
            Proportions use CLT + plug-in SE; sample size from the target margin of error
          </>,
        ]}
      />
    </SceneFrame>
  );
}
