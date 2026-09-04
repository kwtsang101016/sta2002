import {
  COVID_SUMMARY,
  FACULTY_INFECTION_RATE,
  FACULTY_YEARLY_POSITIVES,
  POPULATION,
} from "../../covidData";
import styles from "../Lecture.module.css";
import { Block, BulletList, Figure, Formula, InlineMath, MathText, OrderedList, SceneFrame } from "./shared";

export function HistogramScene1() {
  return (
    <SceneFrame kicker="EDA" title="Histogram">
      <div className={styles.twoCol}>
        <Figure src="/figures/histogram_example1.png" alt="Table of 30 sample values in (0,1)" />
        <Figure src="/figures/histogram_example2.png" alt="Density histogram of the sample values" />
      </div>
      <BulletList
        items={[
          "Visualize continuous observations by grouping them into bins.",
          <span key="h">
            <strong>Height:</strong> relative frequency or density of data points.
          </span>,
          <span key="a">
            <strong>Area:</strong> proportional to the number of observations.
          </span>,
        ]}
      />
    </SceneFrame>
  );
}

export function HistogramScene2() {
  return (
    <SceneFrame kicker="EDA" title="Histogram — bin width">
      <p className={styles.lead}>The choice of bin size (or number of bins) matters.</p>
      <BulletList
        items={[
          <span key="s">
            <strong>Too small:</strong> artificial peaks and valleys — overfitting the data.
          </span>,
          <span key="l">
            <strong>Too large:</strong> hides important details and patterns.
          </span>,
        ]}
      />
      <Figure src="/figures/histogram_bins.png" alt="Beeswax melting-point histograms with three bin widths" width="72%" />
      <p className={styles.muted}>
        Melting points of beeswax: bin width (a) 0.1, (b) 0.2, (c) 0.5. Software (R/Python) can choose bins automatically.
      </p>
    </SceneFrame>
  );
}

export function BoxplotScene1() {
  return (
    <SceneFrame kicker="EDA" title="Boxplot">
      <p className={styles.lead}>
        A boxplot summarizes a sample with the <strong>five-number summary</strong>: min, Q1, median, Q3, max.
      </p>
      <Block title="Construction">
        <Formula tex={String.raw`\mathrm{IQR} = Q_3 - Q_1`} />
        <BulletList
          items={[
            <MathText key="i" text={String.raw`Inner fence: $1.5\times\mathrm{IQR}$ beyond the box.`} />,
            <MathText key="o" text={String.raw`Outer fence: $3\times\mathrm{IQR}$ beyond the box.`} />,
            "Whiskers reach the most extreme points still inside the inner fences.",
            "Points between the fences are suspected outliers; beyond the outer fence are outliers.",
          ]}
        />
      </Block>
      <Figure src="/figures/boxplot_example.png" alt="Annotated Tukey boxplot with fences" width="85%" />
    </SceneFrame>
  );
}

export function BoxplotScene2() {
  return (
    <SceneFrame kicker="EDA" title="Boxplot — reading the picture">
      <Figure src="/figures/boxplot_example.png" alt="Annotated Tukey boxplot" width="80%" />
      <BulletList
        items={[
          "The box is the middle 50% of the data.",
          <MathText key="w" text={String.raw`Whiskers cover “ordinary” points within $1.5\times\mathrm{IQR}$ of the box.`} />,
          "Dots beyond the outer fence are outliers.",
          "Compare whisker lengths to judge skewness; use boxplots to compare variance, skewness, and outliers across groups.",
        ]}
      />
    </SceneFrame>
  );
}

export function CovidIntroScene() {
  return (
    <SceneFrame kicker="EDA" title="Exploratory data analysis">
      <p className={styles.lead}>
        Real data: COVID-19 testing at the <strong>University of Miami</strong> (16 Aug 2020 – 15 Aug 2021), from{" "}
        <code>UM_C19_2021.csv</code>.
      </p>
      <Block title="Three questions">
        <OrderedList
          items={[
            "What do the data say about infections at UM? (histograms / boxplots)",
            "If next year’s faculty/staff positives arrive at last year’s rate, what about next year’s total?",
            "If the faculty infection rate stays the same, what about positives among 20 Statistics faculty/staff?",
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function CovidDataScene() {
  const fs = COVID_SUMMARY.facultyStaff;
  const ns = COVID_SUMMARY.nonResidentialStudents;
  const rs = COVID_SUMMARY.residentialStudents;
  return (
    <SceneFrame kicker="EDA" title="UM COVID data">
      <p>
        Daily test counts by campus group. Columns: <code>Date</code>, <code>Type</code>, <code>residence</code>,{" "}
        <code>Positive</code>, <code>Negative</code>. Define{" "}
        <InlineMath tex={String.raw`\mathrm{Total}=\mathrm{Positive}+\mathrm{Negative}`} />.
      </p>
      <div className={styles.three}>
        <article className={styles.card}>
          <p className={styles.kicker}>{fs.label}</p>
          <p>
            <MathText text={`$n=${fs.n}$ days`} />
          </p>
          <p>Population ≈ {fs.population.toLocaleString()}</p>
          <p>
            Yearly positives: <strong>{fs.positiveSum}</strong>
          </p>
          <p className={styles.muted}>
            Daily positive mean {fs.positiveMean}, max {fs.positiveMax}
          </p>
        </article>
        <article className={styles.card}>
          <p className={styles.kicker}>{ns.label}</p>
          <p>
            <MathText text={`$n=${ns.n}$ days`} />
          </p>
          <p>Population ≈ {ns.population.toLocaleString()}</p>
          <p>
            Yearly positives: <strong>{ns.positiveSum}</strong>
          </p>
          <p className={styles.muted}>
            Daily positive mean {ns.positiveMean}, max {ns.positiveMax}
          </p>
        </article>
        <article className={styles.card}>
          <p className={styles.kicker}>{rs.label}</p>
          <p>
            <MathText text={`$n=${rs.n}$ days`} />
          </p>
          <p>Population ≈ {rs.population.toLocaleString()}</p>
          <p>
            Yearly positives: <strong>{rs.positiveSum}</strong>
          </p>
          <p className={styles.muted}>
            Daily positive mean {rs.positiveMean}, max {rs.positiveMax}
          </p>
        </article>
      </div>
      <p className={styles.note}>
        Infection <em>rate</em> for a group:{" "}
        <InlineMath tex={String.raw`\mathrm{Rate}=\mathrm{Positive}/\mathrm{population}`} /> (incidence), not test
        positivity.
      </p>
    </SceneFrame>
  );
}

export function CovidPredictionScene() {
  const mu = FACULTY_YEARLY_POSITIVES;
  const p = FACULTY_INFECTION_RATE;
  return (
    <SceneFrame kicker="EDA" title="COVID predictions (setup)">
      <Block title="1. Next year’s faculty/staff total">
        <p>
          Estimate <InlineMath tex={`\\mu=${mu}`} /> as last year’s total faculty/staff positives. Model{" "}
          <InlineMath tex={`X\\sim\\mathrm{Poisson}(${mu})`} />.
        </p>
        <Formula tex={String.raw`P(X\le 800)\approx 0.674,\quad P(X>800)\approx 0.326`} />
      </Block>
      <Block title="2. Statistics department (n = 20)">
        <p>
          <InlineMath tex={`\\hat p = ${mu}/${POPULATION.facultyStaff} = ${p.toFixed(5)}`} />. Then{" "}
          <InlineMath tex={String.raw`Y\sim\mathrm{Bin}(20,\hat p)`} />.
        </p>
        <Formula tex={String.raw`P(Y=0)\approx 0.364,\quad P(Y\ge 2)\approx 0.259`} />
      </Block>
      <p className={styles.muted}>Interactive calculator on the next game slide uses the same CSV totals.</p>
    </SceneFrame>
  );
}

export function FromVizToEstimationScene() {
  return (
    <SceneFrame kicker="Estimation" title="From visualization to estimation">
      <p className={styles.lead}>
        Given a sample of size <InlineMath tex="n" />, the histogram may look roughly{" "}
        <InlineMath tex={String.raw`N(\mu,\sigma^2)`} />. How do we estimate{" "}
        <InlineMath tex={String.raw`(\mu,\sigma^2)`} />?
      </p>
      <Figure src="/figures/histogram_observations.png" alt="Roughly normal frequency histogram" width="70%" />
      <BulletList
        items={[
          "Assume the sample is representative of the population of interest.",
          "Assume (for now) that the data come from a normal distribution.",
          "We need a systematic method: maximum likelihood, and later method of moments.",
        ]}
      />
    </SceneFrame>
  );
}

export function ParameterSpaceScene() {
  return (
    <SceneFrame kicker="Estimation" title="Parameter space">
      <p>
        Sample <InlineMath tex={String.raw`X_1,\ldots,X_n`} /> i.i.d. with PMF/PDF{" "}
        <InlineMath tex={String.raw`f(x;\theta)`} />. The unknown parameter <InlineMath tex={String.raw`\theta`} /> lives
        in a <strong>parameter space</strong> <InlineMath tex={String.raw`\Omega`} />.
      </p>
      <Block title="Normal example">
        <Formula
          tex={String.raw`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right],\quad -\infty<x<\infty`}
        />
        <Formula tex={String.raw`\Omega=\{(\mu,\sigma^2):-\infty<\mu<\infty,\; 0<\sigma^2<\infty\}`} />
      </Block>
    </SceneFrame>
  );
}

export function EstimatorEstimateScene() {
  return (
    <SceneFrame kicker="Estimation" title="Estimator vs estimate">
      <BulletList
        items={[
          <MathText key="x" text={String.raw`Observed values: $x_1,\ldots,x_n$.`} />,
          <MathText
            key="u"
            text={String.raw`A statistic $u(X_1,\ldots,X_n)$ used to estimate $\theta$ is an estimator.`}
          />,
          <MathText
            key="e"
            text={String.raw`The number $u(x_1,\ldots,x_n)$ computed from data is an estimate.`}
          />,
          "A single-number estimator is a point estimator.",
          <MathText key="r" text={String.raw`$X_i$ are random; $x_i$ are realized values.`} />,
        ]}
      />
    </SceneFrame>
  );
}

export function LikelihoodScene() {
  return (
    <SceneFrame kicker="MLE" title="Likelihood function">
      <Block title="Definition">
        <p>
          The likelihood <InlineMath tex={String.raw`L:\Omega\to[0,\infty)`} /> is the joint density/mass of the sample,
          viewed as a function of <InlineMath tex={String.raw`\theta`} />:
        </p>
        <Formula tex={String.raw`L(\theta):=f(x_1,\ldots,x_n;\theta)=\prod_{i=1}^n f(x_i;\theta)`} />
        <Formula tex={String.raw`\ell(\theta):=\ln L(\theta)`} />
      </Block>
      <p className={styles.note}>
        We usually maximize the log-likelihood <InlineMath tex={String.raw`\ell`} /> because{" "}
        <InlineMath tex={String.raw`\ln`} /> is strictly increasing, so the maximizer is unchanged.
      </p>
    </SceneFrame>
  );
}

export function MleDefinitionScene() {
  return (
    <SceneFrame kicker="MLE" title="Maximum likelihood estimator">
      <Block title="Definition (MLE)">
        <p>
          An estimator <InlineMath tex={String.raw`\hat\theta`} /> that maximizes{" "}
          <InlineMath tex={String.raw`L(\theta)`} /> (equivalently <InlineMath tex={String.raw`\ell(\theta)`} />) is a{" "}
          <strong>maximum likelihood estimator</strong>.
        </p>
        <Formula tex={String.raw`\hat\theta=\operatorname{argmax}_{\theta\in\Omega} L(\theta;X_1,\ldots,X_n)`} />
      </Block>
      <p className={styles.muted}>Next: derive MLEs for Bernoulli, Exponential, Geometric, and Uniform models.</p>
    </SceneFrame>
  );
}

export function BernoulliMleScene() {
  return (
    <SceneFrame kicker="MLE" title="MLE — Bernoulli(p)">
      <Formula tex={String.raw`f(x;p)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad 0\le p\le 1`} />
      <Formula tex={String.raw`L(p)=p^{\sum x_i}(1-p)^{n-\sum x_i}`} />
      <p>
        Maximize <InlineMath tex={String.raw`\ell(p)=(\sum x_i)\ln p+(n-\sum x_i)\ln(1-p)`} />.
      </p>
      <div className={styles.note}>
        <MathText text={String.raw`Solution: $\hat p=\bar X=\dfrac{1}{n}\sum_{i=1}^n X_i$.`} />
      </div>
    </SceneFrame>
  );
}

export function ExponentialMleScene() {
  return (
    <SceneFrame kicker="MLE" title="MLE — Exponential(θ)">
      <p>
        Mean parameterization: <InlineMath tex={String.raw`\mathbb{E}(X)=\theta`} />.
      </p>
      <Formula tex={String.raw`f(x;\theta)=\frac{1}{\theta}e^{-x/\theta},\quad x>0,\quad \theta>0`} />
      <Formula tex={String.raw`\ell(\theta)=-n\ln\theta-\frac{1}{\theta}\sum_{i=1}^n x_i`} />
      <div className={styles.note}>
        <MathText text={String.raw`Solution: $\hat\theta=\bar X$.`} />
      </div>
    </SceneFrame>
  );
}

export function GeometricMleScene() {
  return (
    <SceneFrame kicker="MLE" title="MLE — Geometric(p)">
      <p>Trials until first success:</p>
      <Formula tex={String.raw`f(x;p)=(1-p)^{x-1}p,\quad x=1,2,\ldots,\quad p\in(0,1)`} />
      <Formula tex={String.raw`\ell(p)=n\ln p+\Big(\sum x_i-n\Big)\ln(1-p)`} />
      <div className={styles.note}>
        <MathText text={String.raw`Solution: $\hat p=1/\bar X$.`} />
      </div>
    </SceneFrame>
  );
}

export function UniformMleScene() {
  return (
    <SceneFrame kicker="MLE" title="MLE — Uniform[0, θ]">
      <Formula
        tex={String.raw`f(x;\theta)=\begin{cases}1/\theta,& 0\le x\le\theta,\\ 0,& \text{otherwise.}\end{cases}`}
      />
      <p>
        <MathText
          text={String.raw`For $\theta\ge X_{(n)}=\max_i X_i$, $L(\theta)=\theta^{-n}$ (and $0$ otherwise).`}
        />
      </p>
      <div className={styles.note}>
        <MathText text={String.raw`Solution: $\hat\theta=X_{(n)}=\max\{X_1,\ldots,X_n\}$.`} />
      </div>
      <p className={styles.muted}>
        Support depends on <InlineMath tex={String.raw`\theta`} />, so the usual interior score equation does not apply.
      </p>
    </SceneFrame>
  );
}

export function WhyMaximizeLScene() {
  return (
    <SceneFrame kicker="MLE" title="Why maximize the likelihood?">
      <Block title="Regularity conditions (sketch)">
        <BulletList
          items={[
            <MathText
              key="r1"
              text={String.raw`(R1) Distinct PDFs: $\theta\neq\theta'\Rightarrow f(\cdot;\theta)\neq f(\cdot;\theta')$.`}
            />,
            <MathText key="r2" text={String.raw`(R2) Common support for all $\theta$.`} />,
            <MathText key="r3" text={String.raw`(R3) True $\theta_0$ is interior to $\Omega$.`} />,
          ]}
        />
      </Block>
      <p>Under regularity (theorem not required in this course),</p>
      <Formula
        tex={String.raw`\lim_{n\to\infty}\mathbb{P}_{\theta_0}\!\big[L(\theta_0;x)>L(\theta;x)\big]=1\quad\forall\,\theta\neq\theta_0`}
      />
      <p className={styles.muted}>
        Asymptotically, likelihood is larger at the true parameter — so we maximize <InlineMath tex="L" />. Uniform{" "}
        <InlineMath tex={String.raw`[0,\theta]`} /> violates (R2).
      </p>
    </SceneFrame>
  );
}

export function Part2IntroScene() {
  return (
    <SceneFrame kicker="Estimation II" title="Parameter Estimation II">
      <BulletList
        items={[
          "Continue MLE for the two-parameter normal",
          "Introduce unbiasedness",
          "Introduce the method of moments (MoM)",
          "Suggested reading: Chapter 6.4",
        ]}
      />
      <p className={styles.lead}>Estimators are not unique — how should we compare them?</p>
    </SceneFrame>
  );
}

export function NormalMleScene1() {
  return (
    <SceneFrame kicker="MLE" title="Normal MLE — setup">
      <p>
        <InlineMath tex={String.raw`X_1,\ldots,X_n\sim N(\theta_1,\theta_2)`} />, with{" "}
        <InlineMath tex={String.raw`\theta=(\theta_1,\theta_2)`} /> and{" "}
        <InlineMath
          tex={String.raw`\Omega=\{(\theta_1,\theta_2):-\infty<\theta_1<\infty,\,0<\theta_2<\infty\}`}
        />
        .
      </p>
      <Formula
        tex={String.raw`f(x;\theta)=\frac{1}{\sqrt{2\pi\theta_2}}\exp\!\left[-\frac{(x-\theta_1)^2}{2\theta_2}\right]`}
      />
      <Formula
        tex={String.raw`\ell(\theta_1,\theta_2)=-\frac{n}{2}\ln(2\pi\theta_2)-\frac{1}{2\theta_2}\sum_{i=1}^n(x_i-\theta_1)^2`}
      />
    </SceneFrame>
  );
}

export function NormalMleScene2() {
  return (
    <SceneFrame kicker="MLE" title="Normal MLE — solution">
      <p>Score equations:</p>
      <Formula tex={String.raw`\frac{\partial\ell}{\partial\theta_1}=\frac{1}{\theta_2}\sum_{i=1}^n(x_i-\theta_1)=0`} />
      <Formula
        tex={String.raw`\frac{\partial\ell}{\partial\theta_2}=-\frac{n}{2\theta_2}+\frac{1}{2\theta_2^2}\sum_{i=1}^n(x_i-\theta_1)^2=0`}
      />
      <div className={styles.note}>
        <MathText
          text={String.raw`$\hat\theta_1=\bar X$, $\hat\theta_2=\dfrac{1}{n}\sum_{i=1}^n(X_i-\bar X)^2$ (empirical variance).`}
        />
      </div>
    </SceneFrame>
  );
}

export function UnbiasednessScene() {
  return (
    <SceneFrame kicker="Unbiasedness" title="Unbiased estimators">
      <Block title="Definition">
        <p>
          An estimator <InlineMath tex={String.raw`u(X_1,\ldots,X_n)`} /> is <strong>unbiased</strong> for{" "}
          <InlineMath tex={String.raw`\theta`} /> if
        </p>
        <Formula tex={String.raw`\mathbb{E}\big(u(X_1,\ldots,X_n)\big)=\theta`} />
        <p>Otherwise it is biased.</p>
      </Block>
    </SceneFrame>
  );
}

export function VarianceBiasScene() {
  return (
    <SceneFrame kicker="Unbiasedness" title="Bias of the normal variance MLE">
      <Formula tex={String.raw`\hat\theta_2=\frac{n-1}{n}S^2,\qquad S^2=\frac{1}{n-1}\sum_{i=1}^n(X_i-\bar X)^2`} />
      <p>
        Recall: <InlineMath tex={String.raw`\bar X\sim N(\theta_1,\theta_2/n)`} /> and{" "}
        <InlineMath tex={String.raw`(n-1)S^2/\theta_2\sim\chi^2(n-1)`} />.
      </p>
      <Formula
        tex={String.raw`\mathbb{E}(\hat\theta_1)=\theta_1,\qquad \mathbb{E}(S^2)=\theta_2,\qquad \mathbb{E}(\hat\theta_2)=\frac{n-1}{n}\theta_2`}
      />
      <p className={styles.note}>
        MLE of the mean is unbiased; MLE of the variance is biased. The unbiased variance estimator is{" "}
        <InlineMath tex={String.raw`S^2`} />.
      </p>
    </SceneFrame>
  );
}

export function MomDefinitionScene() {
  return (
    <SceneFrame kicker="MoM" title="Method of moments">
      <p className={styles.lead}>
        Maximizing <InlineMath tex="L" /> may need numerical optimization. MoM is another recipe for point estimators.
      </p>
      <p>
        If <InlineMath tex={String.raw`\theta=(\theta_1,\ldots,\theta_k)`} />,
      </p>
      <Formula
        tex={String.raw`\alpha_j(\theta)=\mathbb{E}_\theta(X^j),\qquad \hat\alpha_j=\frac{1}{n}\sum_{i=1}^n X_i^j`}
      />
      <Block title="Definition">
        <p>
          A MoM estimator <InlineMath tex={String.raw`\tilde\theta`} /> solves{" "}
          <InlineMath tex={String.raw`\alpha_j(\theta)=\hat\alpha_j`} /> for{" "}
          <InlineMath tex={String.raw`j=1,\ldots,k`} />.
        </p>
      </Block>
    </SceneFrame>
  );
}

export function GammaMomScene() {
  return (
    <SceneFrame kicker="MoM" title="MoM — Gamma(θ₁, θ₂)">
      <p>
        Shape–scale parameterization: <InlineMath tex={String.raw`\mathbb{E}(X)=\theta_1\theta_2`} />,{" "}
        <InlineMath tex={String.raw`\mathrm{Var}(X)=\theta_1\theta_2^2`} />.
      </p>
      <Formula tex={String.raw`V:=\frac{1}{n}\sum_{i=1}^n(X_i-\bar X)^2`} />
      <Formula tex={String.raw`\tilde\theta_2=\frac{V}{\bar X},\qquad \tilde\theta_1=\frac{\bar X^2}{V}`} />
      <p className={styles.muted}>
        Gamma MLE typically has no closed form; MoM gives an analytic estimator (MLE via numerical maximization).
      </p>
    </SceneFrame>
  );
}

export function PoissonMomScene() {
  return (
    <SceneFrame kicker="MoM" title="MoM — Poisson(λ), two estimators">
      <p>Mean-based (same as MLE):</p>
      <Formula tex={String.raw`\tilde\lambda_1=\bar X`} />
      <p>Variance / second-moment based:</p>
      <Formula tex={String.raw`\tilde\lambda_2=\frac{1}{n}\sum X_i^2-(\bar X)^2`} />
      <Figure src="/figures/MoM_comparison.png" alt="Sampling histograms of two Poisson MoM estimators" width="70%" />
      <p className={styles.note}>
        Simulation (1000 samples, <InlineMath tex="n=20" />): prefer the mean-based estimator — smaller variance.
      </p>
    </SceneFrame>
  );
}

export function UniformMomScene() {
  return (
    <SceneFrame kicker="MoM" title="Uniform(0, θ): MLE vs MoM">
      <Formula
        tex={String.raw`\hat\theta_{\mathrm{MLE}}=X_{(n)}=\max_i X_i,\qquad \tilde\theta_{\mathrm{MoM}}=2\bar X`}
      />
      <BulletList
        items={[
          <MathText key="neq" text={String.raw`$\hat\theta\neq\tilde\theta$ in general.`} />,
          <MathText
            key="bad"
            text={String.raw`MoM can be invalid: if $2\bar X < X_{(n)}$, some observations fall outside $(0,\tilde\theta)$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function SummaryScene() {
  return (
    <SceneFrame kicker="Summary" title="MLE vs MoM — takeaways">
      <BulletList
        items={[
          "Prefer MLE when it is available and tractable.",
          "MoM can be faster when computation is heavy.",
          "MoM may be closed-form when MLE is not (e.g. Gamma); then maximize L numerically for MLE.",
          "MoM is not unique — use lowest-order moments (more stable).",
          "MoM can be unrealistic (Uniform example).",
          "Check unbiasedness separately: MLE of normal variance is biased.",
        ]}
      />
    </SceneFrame>
  );
}
