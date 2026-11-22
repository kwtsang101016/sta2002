import type { CSSProperties } from "react";
import styles from "../Lecture.module.css";
import { BulletList, Formula, Figure, MathText, SceneFrame } from "./shared";

/** Prefer String.raw for KaTeX so escapes like \bar / \sum are not eaten by JS. */
const r = String.raw;

const dense: CSSProperties = { fontSize: 12, lineHeight: 1.25 };

function P({ text }: { text: string }) {
  return (
    <p>
      <MathText text={text} />
    </p>
  );
}

function Note({ text }: { text: string }) {
  return (
    <div className={styles.formula}>
      <MathText text={text} />
    </div>
  );
}

function Table({
  headers,
  rows,
  compact = false,
}: {
  headers: string[];
  rows: string[][];
  compact?: boolean;
}) {
  return (
    <div className={styles.tableWrap} style={compact ? { padding: 10 } : undefined}>
      <table style={compact ? dense : undefined}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                <MathText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <MathText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Why study two variables together">
      <BulletList
        items={[
          "Often we care about the relation between two variables — e.g. reaction temperature and chemical yield.",
          <MathText
            key="b"
            text={r`One variable $X$ may be known in advance; we want to predict a future response $Y$.`}
          />,
          "This lecture develops simple linear regression: least squares, a normal error model, and inference.",
        ]}
      />
      <p>
        <strong>Suggested reading:</strong> Chapters 6.5 and 7.6 of the textbook.
      </p>
    </SceneFrame>
  );
}

export function RolesScene() {
  return (
    <SceneFrame kicker="Introduction" title="Predictor, response, and a running example">
      <BulletList
        items={[
          <MathText key="a" text={r`$X$: explanatory / predictor / independent variable.`} />,
          <MathText key="b" text={r`$Y$: response / dependent variable.`} />,
          <MathText
            key="c"
            text={r`Example: $Y=$ exam score, $X=$ hours spent studying.`}
          />,
        ]}
      />
      <Table
        compact
        headers={[r`$x_i$`, "1.0", "2.0", "3.0", "4.0", "5.0"]}
        rows={[[r`$y_i$`, "1.0", "2.0", "1.3", "3.75", "2.25"]]}
      />
      <P text={r`Plot the pairs $(x_i,y_i)$ in a scatter plot.`} />
    </SceneFrame>
  );
}

export function ScatterScene() {
  return (
    <SceneFrame kicker="Introduction" title="Scatter plot">
      <Figure src="/figures/scatter_1.png" alt="Scatter plot of five (x,y) points" width="70%" />
      <P
        text={r`The relationship looks roughly linear, so a line $\hat y=\alpha+\beta x$ is a natural predictor.`}
      />
    </SceneFrame>
  );
}

export function TrialLineScene() {
  return (
    <SceneFrame kicker="Introduction" title={r`A trial line $\hat y=0.75x$`}>
      <Table
        compact
        headers={[r`$x_i$`, "1.0", "2.0", "3.0", "4.0", "5.0"]}
        rows={[
          [r`$y_i$`, "1.0", "2.0", "1.3", "3.75", "2.25"],
          [r`$\hat y_i$`, "0.75", "1.50", "2.25", "3.00", "3.75"],
        ]}
      />
      <Figure src="/figures/scatter_2.png" alt="Scatter plot with trial line y=0.75x" width="55%" />
      <P text={r`Residuals $\hat\epsilon_i=y_i-\hat y_i$ measure vertical misfit.`} />
    </SceneFrame>
  );
}

export function LeastSquaresCriterionScene() {
  return (
    <SceneFrame kicker="Least squares" title="Minimize the sum of squared residuals">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Many lines $\hat y=\alpha+\beta x$ are possible; we choose the one that fits best in a squared-error sense.`}
          />,
          <MathText
            key="b"
            text={r`Find $(\alpha,\beta)$ minimizing $\displaystyle\sum_{i=1}^{n}(y_i-\hat y_i)^2=\sum_{i=1}^{n}\bigl(y_i-(\alpha+\beta x_i)\bigr)^2$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function LeastSquaresDefinitionScene() {
  return (
    <SceneFrame kicker="Least squares" title="Least squares regression line">
      <Note
        text={r`The least squares line is $\hat y=\alpha_{\mathrm{LS}}+\beta_{\mathrm{LS}}x$, where $(\alpha_{\mathrm{LS}},\beta_{\mathrm{LS}})$ minimizes
$\sum_{i=1}^{n}\bigl(Y_i-(\alpha+\beta x_i)\bigr)^2$.
The pair $(\alpha_{\mathrm{LS}},\beta_{\mathrm{LS}})$ is the least-squares estimator of $(\alpha,\beta)$.`}
      />
      <P text={r`Question: how do we solve this optimization problem?`} />
    </SceneFrame>
  );
}

export function CenteredFormScene() {
  return (
    <SceneFrame kicker="Least squares" title="Centered reparameterization">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Write $\hat y_i=\alpha_{\mathrm{new}}+\beta(x_i-\bar x)$, with $\alpha_{\mathrm{new}}-\beta\bar x=\alpha_{\mathrm{old}}$.`}
          />,
          <MathText
            key="b"
            text={r`Equivalent problem:
$(\alpha_{\mathrm{LS}},\beta_{\mathrm{LS}})=\arg\min_{\alpha,\beta}\sum_{i=1}^{n}\bigl(Y_i-\alpha-\beta(x_i-\bar x)\bigr)^2$.`}
          />,
        ]}
      />
      <P text={r`Centering decouples the intercept and slope equations.`} />
    </SceneFrame>
  );
}

export function NormalEquationsScene() {
  return (
    <SceneFrame kicker="Least squares" title="Normal equations">
      <Formula tex={r`H(\alpha,\beta)=\sum_{i=1}^{n}\bigl(y_i-\alpha-\beta(x_i-\bar x)\bigr)^2`} />
      <Formula
        tex={r`\frac{\partial H}{\partial\alpha}=2\sum_{i=1}^{n}\bigl(y_i-\alpha-\beta(x_i-\bar x)\bigr)(-1)\overset{\mathrm{set}}{=}0`}
      />
      <Formula
        tex={r`\frac{\partial H}{\partial\beta}=2\sum_{i=1}^{n}\bigl(y_i-\alpha-\beta(x_i-\bar x)\bigr)\bigl(-(x_i-\bar x)\bigr)\overset{\mathrm{set}}{=}0`}
      />
    </SceneFrame>
  );
}

export function LsSolutionsScene() {
  return (
    <SceneFrame kicker="Least squares" title={r`Solutions for $\alpha_{\mathrm{LS}}$ and $\beta_{\mathrm{LS}}$`}>
      <Formula tex={r`\sum_i y_i=n\alpha+\beta\sum_i(x_i-\bar x)=n\alpha\quad\Rightarrow\quad\alpha_{\mathrm{LS}}=\bar Y`} />
      <Formula
        tex={r`\beta_{\mathrm{LS}}=\dfrac{\sum_{i=1}^{n}Y_i(x_i-\bar x)}{\sum_{i=1}^{n}(x_i-\bar x)^2}`}
      />
      <P
        text={r`Using $Y_i$ (capital) stresses that the estimators are random; $y_i$ denotes a realized sample.`}
      />
    </SceneFrame>
  );
}

export function LsLineScene() {
  return (
    <SceneFrame kicker="Least squares" title="Fitted line in centered form">
      <Formula
        tex={r`\hat Y_i=\alpha_{\mathrm{LS}}+\beta_{\mathrm{LS}}(x_i-\bar x),\qquad
\alpha_{\mathrm{LS}}=\bar Y,\quad
\beta_{\mathrm{LS}}=\dfrac{\sum_i Y_i(x_i-\bar x)}{\sum_i(x_i-\bar x)^2}.`}
      />
      <P
        text={r`Equivalently $\hat Y=\hat\alpha+\hat\beta(x-\bar x)$ for a new predictor value $x$.`}
      />
    </SceneFrame>
  );
}

export function ModelScene() {
  return (
    <SceneFrame kicker="Model" title="Simple linear regression model">
      <Note
        text={r`Let $\epsilon_1,\ldots,\epsilon_n\overset{\mathrm{iid}}{\sim}\mathrm{N}(0,\sigma^2)$. The model
$Y_i=\alpha+\beta(x_i-\bar x)+\epsilon_i$
is a simple linear regression model.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`The $x_i$ (and $\bar x$) are treated as fixed, non-random numbers.`}
          />,
          <MathText
            key="b"
            text={r`The $Y_i$ are independent with $Y_i\sim\mathrm{N}\bigl(\alpha+\beta(x_i-\bar x),\sigma^2\bigr)$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function MleScene() {
  return (
    <SceneFrame kicker="MLEs" title="Maximum likelihood estimators">
      <Formula tex={r`\hat\alpha=\alpha_{\mathrm{LS}}=\bar Y`} />
      <Formula
        tex={r`\hat\beta=\beta_{\mathrm{LS}}=\dfrac{\sum_{i=1}^{n}Y_i(x_i-\bar x)}{\sum_{i=1}^{n}(x_i-\bar x)^2}`}
      />
      <Formula
        tex={r`\hat\sigma^2=\dfrac1n\sum_{i=1}^{n}\bigl[Y_i-\hat\alpha-\hat\beta(x_i-\bar x)\bigr]^2`}
      />
      <P text={r`So the MLEs of $\alpha$ and $\beta$ coincide with the least-squares estimators.`} />
    </SceneFrame>
  );
}

export function LikelihoodScene() {
  return (
    <SceneFrame kicker="MLEs" title="Likelihood and log-likelihood">
      <Formula
        tex={r`L(\alpha,\beta,\sigma^2)=\bigl(2\pi\sigma^2\bigr)^{-n/2}
\exp\Bigl\{-\dfrac1{2\sigma^2}\sum_i\bigl[y_i-\alpha-\beta(x_i-\bar x)\bigr]^2\Bigr\}`}
      />
      <Formula
        tex={r`\ell(\alpha,\beta,\sigma^2)=-\dfrac n2\log(2\pi\sigma^2)-\dfrac{H(\alpha,\beta)}{2\sigma^2}`}
      />
      <P
        text={r`For fixed $\sigma^2$, maximizing $\ell$ is the same as minimizing $H$, so $\hat\alpha=\alpha_{\mathrm{LS}}$ and $\hat\beta=\beta_{\mathrm{LS}}$.`}
      />
    </SceneFrame>
  );
}

export function SigmaMleScene() {
  return (
    <SceneFrame kicker="MLEs" title={r`MLE of $\sigma^2$`}>
      <Formula
        tex={r`\dfrac{\partial\ell}{\partial\sigma^2}=-\dfrac{n}{2\sigma^2}+\dfrac{\sum_i[y_i-\alpha-\beta(x_i-\bar x)]^2}{2(\sigma^2)^2}\overset{\mathrm{set}}{=}0`}
      />
      <Formula
        tex={r`\hat\sigma^2=\dfrac1n\sum_{i=1}^{n}\bigl[Y_i-\hat\alpha-\hat\beta(x_i-\bar x)\bigr]^2`}
      />
      <P text={r`The second-derivative check shows this critical point is the unique global maximizer.`} />
    </SceneFrame>
  );
}

export function ComputationalScene() {
  return (
    <SceneFrame kicker="MLEs" title="Computational formulas from moments">
      <P
        text={r`Given $\bar x$, $\bar y$, $\sum x_i^2$, $\sum y_i^2$, and $\sum x_i y_i$:`}
      />
      <Formula tex={r`\hat\alpha=\bar y`} />
      <Formula
        tex={r`\hat\beta=\dfrac{\sum_i x_i y_i-n\bar x\bar y}{\sum_i x_i^2-n\bar x^2}`}
      />
      <Formula
        tex={r`\hat\sigma^2=\dfrac1n\sum_i y_i^2-\bar y^2-\hat\beta\cdot\dfrac1n\sum_i x_i y_i+\hat\beta\,\bar x\,\bar y`}
      />
    </SceneFrame>
  );
}

export function ExampleFitScene() {
  return (
    <SceneFrame kicker="Example" title="Running example: fitted line">
      <Note
        text={r`$n=5$, $\sum x_i=15$, $\sum y_i=10.3$, $\sum x_i^2=55$, $\sum y_i^2=25.815$, $\sum x_i y_i=35.15$.`}
      />
      <Formula tex={r`\hat\alpha=2.06,\qquad\hat\beta=0.425,\qquad\hat\sigma^2=0.558`} />
      <Formula
        tex={r`\hat y=2.06+0.425(x-3)=0.785+0.425x`}
      />
    </SceneFrame>
  );
}

export function LinearComboTheoremScene() {
  return (
    <SceneFrame kicker="Distributions" title="Linear combinations of independent normals">
      <Note
        text={r`Theorem (book 5.5-1). If $Y_1,\ldots,Y_n$ are independent with $Y_i\sim\mathrm{N}(\mu_i,\sigma_i^2)$, then
$\sum_i c_i Y_i\sim\mathrm{N}\bigl(\sum_i c_i\mu_i,\;\sum_i c_i^2\sigma_i^2\bigr)$.`}
      />
      <P text={r`We use this to get the laws of $\hat\alpha$ and $\hat\beta$.`} />
    </SceneFrame>
  );
}

export function DistAlphaScene() {
  return (
    <SceneFrame kicker="Distributions" title={r`Distribution of $\hat\alpha$`}>
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`$\mathrm{E}(Y_i)=\alpha+\beta(x_i-\bar x)$ and $\mathrm{Var}(Y_i)=\sigma^2$.`}
          />,
          <MathText
            key="b"
            text={r`With $c_i=1/n$: $\mathrm{E}(\hat\alpha)=\alpha$ and $\mathrm{Var}(\hat\alpha)=\sigma^2/n$.`}
          />,
        ]}
      />
      <Formula tex={r`\hat\alpha=\bar Y\sim\mathrm{N}\bigl(\alpha,\sigma^2/n\bigr)`} />
    </SceneFrame>
  );
}

export function DistBetaScene() {
  return (
    <SceneFrame kicker="Distributions" title={r`Distribution of $\hat\beta$`}>
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Take $c_i=(x_i-\bar x)/\sum_j(x_j-\bar x)^2$.`}
          />,
          <MathText
            key="b"
            text={r`Then $\mathrm{E}(\hat\beta)=\beta$ and $\mathrm{Var}(\hat\beta)=\sigma^2/\sum_i(x_i-\bar x)^2$.`}
          />,
        ]}
      />
      <Formula
        tex={r`\hat\beta\sim\mathrm{N}\Bigl(\beta,\;\dfrac{\sigma^2}{\sum_{i=1}^{n}(x_i-\bar x)^2}\Bigr)`}
      />
    </SceneFrame>
  );
}

export function QuadraticSetupScene() {
  return (
    <SceneFrame kicker="Distributions" title={r`Quadratic forms for $\hat\sigma^2$`}>
      <Formula
        tex={r`Q=\sum_i\Bigl(\dfrac{Y_i-\alpha-\beta(x_i-\bar x)}{\sigma}\Bigr)^2\sim\chi^2(n)`}
      />
      <Formula
        tex={r`Q_1=\Bigl(\dfrac{\hat\alpha-\alpha}{\sigma/\sqrt n}\Bigr)^2\sim\chi^2(1),\qquad
Q_2=\Bigl(\dfrac{\hat\beta-\beta}{\sigma/\sqrt{\sum(x_i-\bar x)^2}}\Bigr)^2\sim\chi^2(1)`}
      />
      <P text={r`All are quadratic forms in the errors $\epsilon_i=Y_i-\alpha-\beta(x_i-\bar x)$.`} />
    </SceneFrame>
  );
}

export function QuadraticTheoremScene() {
  return (
    <SceneFrame kicker="Distributions" title="Quadratic-form decomposition theorem">
      <Note
        text={r`Theorem 9.3.1. If $Q=Q_1+\cdots+Q_k$ are quadratic forms in i.i.d. normals with common variance $\sigma^2$,
$Q/\sigma^2\sim\chi^2(r)$ and $Q_j/\sigma^2\sim\chi^2(r_j)$ for $j<k$, and $Q_k\ge 0$, then the $Q_j$ are independent and
$Q_k/\sigma^2\sim\chi^2\bigl(r-(r_1+\cdots+r_{k-1})\bigr)$.`}
      />
      <Formula
        tex={r`Q_3:=\dfrac{n\hat\sigma^2}{\sigma^2}=\dfrac1{\sigma^2}\sum_i\bigl(Y_i-\hat\alpha-\hat\beta(x_i-\bar x)\bigr)^2\ge 0`}
      />
    </SceneFrame>
  );
}

export function DistSigmaScene() {
  return (
    <SceneFrame kicker="Distributions" title={r`$Q=Q_1+Q_2+Q_3$ and the law of $\hat\sigma^2$`}>
      <Formula
        tex={r`Q=Q_1+Q_2+Q_3=\dfrac{n}{\sigma^2}(\hat\alpha-\alpha)^2
+\dfrac{\sum(x_i-\bar x)^2}{\sigma^2}(\hat\beta-\beta)^2
+\dfrac{n\hat\sigma^2}{\sigma^2}`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Hence $\hat\alpha$, $\hat\beta$, and $\hat\sigma^2$ are mutually independent.`}
          />,
          <MathText
            key="b"
            text={r`$\dfrac{n\hat\sigma^2}{\sigma^2}\sim\chi^2(n-2)$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function UnbiasedSigmaScene() {
  return (
    <SceneFrame kicker="Distributions" title={r`Bias of $\hat\sigma^2$ and the residual MSE`}>
      <Formula tex={r`\mathrm{E}(\hat\sigma^2)=\sigma^2\cdot\dfrac{n-2}{n}`} />
      <Formula
        tex={r`S_R^2=\dfrac{n\hat\sigma^2}{n-2}=\dfrac1{n-2}\sum_i\bigl(Y_i-\hat\alpha-\hat\beta(x_i-\bar x)\bigr)^2`}
      />
      <BulletList
        items={[
          <MathText key="a" text={r`$S_R^2$ is unbiased for $\sigma^2$.`} />,
          <MathText
            key="b"
            text={r`$\dfrac{(n-2)S_R^2}{\sigma^2}\sim\chi^2(n-2)$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function PartOneSummaryScene() {
  return (
    <SceneFrame kicker="Summary" title="Estimation summary">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Model: $Y_i=\alpha+\beta(x_i-\bar x)+\epsilon_i$, $\epsilon_i\sim\mathrm{N}(0,\sigma^2)$ i.i.d.`}
          />,
          <MathText
            key="b"
            text={r`$\hat\alpha=\bar Y\sim\mathrm{N}(\alpha,\sigma^2/n)$; $\hat\beta\sim\mathrm{N}\bigl(\beta,\sigma^2/\sum(x_i-\bar x)^2\bigr)$.`}
          />,
          <MathText
            key="c"
            text={r`$\hat\sigma^2$ is biased; $S_R^2=n\hat\sigma^2/(n-2)$ is unbiased and independent of $(\hat\alpha,\hat\beta)$.`}
          />,
          <MathText
            key="d"
            text={r`Next: confidence intervals for $\alpha$, $\beta$, and $\mu(x)$, plus prediction intervals.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function EstimatorReviewScene() {
  return (
    <SceneFrame kicker="Inference" title="Distributions used for intervals">
      <Formula tex={r`\hat\alpha=\bar Y\sim\mathrm{N}\bigl(\alpha,\sigma^2/n\bigr)`} />
      <Formula
        tex={r`\hat\beta\sim\mathrm{N}\Bigl(\beta,\;\dfrac{\sigma^2}{\sum_i(x_i-\bar x)^2}\Bigr)`}
      />
      <Formula
        tex={r`S_R^2=\dfrac{n\hat\sigma^2}{n-2},\qquad\dfrac{(n-2)S_R^2}{\sigma^2}\sim\chi^2(n-2)`}
      />
      <P text={r`$\hat\alpha$, $\hat\beta$, and $S_R^2$ are mutually independent and unbiased for $\alpha$, $\beta$, and $\sigma^2$.`} />
    </SceneFrame>
  );
}

export function CiTheoremScene() {
  return (
    <SceneFrame kicker="Inference" title="A useful CI theorem">
      <Note
        text={r`Let $\hat\theta\sim\mathrm{N}(\theta,c\sigma^2)$ for a known $c>0$.
If $\sigma^2$ is known: $\hat\theta\pm z_{\alpha/2}\,\sigma\sqrt{c}$.
If $\sigma^2$ is unknown, $S^2$ unbiased and independent of $\hat\theta$ with $rS^2/\sigma^2\sim\chi^2(r)$:
$\hat\theta\pm t_{\alpha/2}(r)\,S\sqrt{c}$.`}
      />
    </SceneFrame>
  );
}

export function CiAlphaScene() {
  return (
    <SceneFrame kicker="Inference" title={r`Confidence interval for $\alpha$`}>
      <BulletList
        items={[
          <MathText key="a" text={r`$\hat\alpha\sim\mathrm{N}(\alpha,\sigma^2/n)$ so $c=1/n$.`} />,
          <MathText
            key="b"
            text={r`$S_R^2$ independent of $\hat\alpha$ with $(n-2)S_R^2/\sigma^2\sim\chi^2(n-2)$.`}
          />,
        ]}
      />
      <Formula
        tex={r`\hat\alpha\pm t_{\alpha/2}(n-2)\,S_R\sqrt{\dfrac1n}`}
      />
    </SceneFrame>
  );
}

export function CiBetaScene() {
  return (
    <SceneFrame kicker="Inference" title={r`Confidence interval for $\beta$`}>
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`$c=1/\sum_i(x_i-\bar x)^2$ and $r=n-2$.`}
          />,
        ]}
      />
      <Formula
        tex={r`\hat\beta\pm t_{\alpha/2}(n-2)\,S_R\sqrt{\dfrac{1}{\sum_{i=1}^{n}(x_i-\bar x)^2}}`}
      />
    </SceneFrame>
  );
}

export function CiExampleAlphaScene() {
  return (
    <SceneFrame kicker="Example" title={r`95\% CI for $\alpha$`}>
      <Note text={r`$n=5$, $\hat\alpha=2.06$, $\hat\beta=0.425$, $\hat\sigma^2=0.558$.`} />
      <Formula tex={r`S_R^2=\dfrac{n}{n-2}\hat\sigma^2=0.93,\qquad t_{0.025}(3)=3.182`} />
      <Formula tex={r`2.06\pm 3.182\cdot\sqrt{0.93/5}=2.06\pm 1.37`} />
    </SceneFrame>
  );
}

export function CiExampleBetaScene() {
  return (
    <SceneFrame kicker="Example" title={r`95\% CI for $\beta$`}>
      <Formula
        tex={r`\sum_i(x_i-\bar x)^2=\sum_i x_i^2-n\bar x^2=55-5\cdot 3^2=10`}
      />
      <Formula tex={r`0.425\pm 3.182\cdot\sqrt{0.93/10}=0.425\pm 0.97`} />
    </SceneFrame>
  );
}

export function MeanResponseSetupScene() {
  return (
    <SceneFrame kicker="Inference" title={r`Mean response $\mu(x)=\alpha+\beta(x-\bar x)$`}>
      <Formula tex={r`\hat Y=\hat\alpha+\hat\beta(x-\bar x)`} />
      <Formula
        tex={r`\mathrm{E}(\hat Y)=\alpha+\beta(x-\bar x),\qquad
\mathrm{Var}(\hat Y)=\sigma^2\Bigl[\dfrac1n+\dfrac{(x-\bar x)^2}{\sum_i(x_i-\bar x)^2}\Bigr]`}
      />
      <P text={r`So $\hat Y$ is normal with that mean and variance (using independence of $\hat\alpha$ and $\hat\beta$).`} />
    </SceneFrame>
  );
}

export function MeanResponseCiScene() {
  return (
    <SceneFrame kicker="Inference" title={r`CI for $\mu(x)$`}>
      <Formula
        tex={r`\hat\alpha+\hat\beta(x-\bar x)\pm t_{\alpha/2}(n-2)\,S_R
\sqrt{\dfrac1n+\dfrac{(x-\bar x)^2}{\sum_i(x_i-\bar x)^2}}`}
      />
      <P
        text={r`This is a CI for the mean of $Y$ at a fixed $x$, not a prediction band for a new observation.`}
      />
    </SceneFrame>
  );
}

export function MeanResponseExampleScene() {
  return (
    <SceneFrame kicker="Example" title={r`95\% CI for $\mu(2.5)$`}>
      <Formula tex={r`\hat\alpha+\hat\beta(2.5-3)=1.8475,\qquad\sum(x_i-\bar x)^2=10`} />
      <Formula
        tex={r`1.8475\pm 3.182\cdot\sqrt{0.93\bigl(\tfrac15+\tfrac{(2.5-3)^2}{10}\bigr)}=1.8475\pm 1.456`}
      />
    </SceneFrame>
  );
}

export function PredictionIntroScene() {
  return (
    <SceneFrame kicker="Prediction" title="Confidence vs prediction">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`A confidence interval targets a fixed unknown parameter (e.g. $\alpha$, $\beta$, or $\mu(x)$).`}
          />,
          <MathText
            key="b"
            text={r`A prediction interval targets a future random response
$Y_{n+1}=\alpha+\beta(x_{n+1}-\bar x)+\epsilon_{n+1}$.`}
          />,
          <MathText
            key="c"
            text={r`We center the interval at $\hat Y=\hat\alpha+\hat\beta(x_{n+1}-\bar x)$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function PredictionDiffScene() {
  return (
    <SceneFrame kicker="Prediction" title={r`Law of $Y_{n+1}-\hat Y$`}>
      <Formula
        tex={r`Y_{n+1}\sim\mathrm{N}\bigl(\alpha+\beta(x_{n+1}-\bar x),\sigma^2\bigr)`}
      />
      <Formula
        tex={r`\hat Y\sim\mathrm{N}\Bigl(\alpha+\beta(x_{n+1}-\bar x),\;
\sigma^2\bigl[\tfrac1n+\tfrac{(x_{n+1}-\bar x)^2}{\sum(x_i-\bar x)^2}\bigr]\Bigr)`}
      />
      <Formula
        tex={r`Y_{n+1}-\hat Y\sim\mathrm{N}\Bigl(0,\;
\sigma^2\bigl[1+\tfrac1n+\tfrac{(x_{n+1}-\bar x)^2}{\sum(x_i-\bar x)^2}\bigr]\Bigr)`}
      />
      <P text={r`Independence of $\epsilon_{n+1}$ and the training errors gives the extra $1$ under the variance.`} />
    </SceneFrame>
  );
}

export function PredictionIntervalScene() {
  return (
    <SceneFrame kicker="Prediction" title={r`Prediction interval for $Y_{n+1}$`}>
      <Formula
        tex={r`T=\dfrac{Y_{n+1}-\hat\alpha-\hat\beta(x_{n+1}-\bar x)}{S_R\sqrt{1+\tfrac1n+\tfrac{(x_{n+1}-\bar x)^2}{\sum(x_i-\bar x)^2}}}\sim t(n-2)`}
      />
      <Formula
        tex={r`\hat\alpha+\hat\beta(x_{n+1}-\bar x)\pm t_{\alpha/2}(n-2)\,S_R
\sqrt{1+\dfrac1n+\dfrac{(x_{n+1}-\bar x)^2}{\sum_i(x_i-\bar x)^2}}`}
      />
    </SceneFrame>
  );
}

export function PredictionExampleScene() {
  return (
    <SceneFrame kicker="Example" title={r`PI vs CI at $x_6=2.5$`}>
      <Formula
        tex={r`\text{95\% PI for }Y_6:\quad 1.8475\pm 3.182\cdot\sqrt{0.93\bigl(1+\tfrac15+\tfrac{(0.5)^2}{10}\bigr)}=1.8475\pm 3.399`}
      />
      <Formula
        tex={r`\text{95\% CI for }\mu(2.5):\quad 1.8475\pm 1.456`}
      />
      <BulletList
        items={[
          "CI for μ(x): narrower — only parameter uncertainty.",
          "PI for Y: wider — parameter uncertainty plus new noise ε.",
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
            text={r`Fit by least squares / MLE: $\hat\alpha=\bar Y$, $\hat\beta=\sum Y_i(x_i-\bar x)/\sum(x_i-\bar x)^2$.`}
          />,
          <MathText
            key="b"
            text={r`Use $S_R^2$ (df $n-2$) for intervals; $\hat\alpha$, $\hat\beta$, $S_R^2$ are independent.`}
          />,
          <MathText
            key="c"
            text={r`CIs: $\hat\alpha\pm t_{\alpha/2}(n-2)S_R/\sqrt n$ and analogously for $\hat\beta$ and $\mu(x)$.`}
          />,
          <MathText
            key="d"
            text={r`A PI for $Y_{n+1}$ adds a $1$ under the square root compared with the CI for $\mu(x_{n+1})$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}
