import type { CSSProperties } from "react";
import styles from "../Lecture.module.css";
import { BulletList, Formula, MathText, SceneFrame } from "./shared";

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

export function OneObsSetupScene() {
  return (
    <SceneFrame kicker="Additive model" title="One observation per cell">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Factor A has $a$ levels (rows); factor B has $b$ levels (columns).`}
          />,
          <MathText
            key="b"
            text={r`There are $n=ab$ cells. Take one observation $X_{ij}$ in row $i$, column $j$.`}
          />,
          <MathText
            key="c"
            text={r`Assume $X_{ij}\sim\mathrm{N}(\mu_{ij},\sigma^2)$, mutually independent.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function AdditiveModelScene() {
  return (
    <SceneFrame kicker="Additive model" title={r`Means: $\mu_{ij}=\mu+\alpha_i+\beta_j$`}>
      <Formula tex={r`\mu_{ij}=\mu+\alpha_i+\beta_j.`} />
      <BulletList
        items={[
          <MathText key="a" text={r`$\alpha_i$: $i$th row (factor A) effect, with $\sum_{i=1}^{a}\alpha_i=0$.`} />,
          <MathText key="b" text={r`$\beta_j$: $j$th column (factor B) effect, with $\sum_{j=1}^{b}\beta_j=0$.`} />,
          "No interaction yet: the row shift is the same in every column.",
        ]}
      />
    </SceneFrame>
  );
}

export function HypothesesScene() {
  return (
    <SceneFrame kicker="Additive model" title="Null hypotheses for rows and columns">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`No row effect: $H_A:\alpha_1=\cdots=\alpha_a=0$ (the zero-sum constraint forces this form).`}
          />,
          <MathText
            key="b"
            text={r`No column effect: $H_B:\beta_1=\cdots=\beta_b=0$.`}
          />,
          "We need test statistics and upper-tailed critical regions for each hypothesis.",
        ]}
      />
    </SceneFrame>
  );
}

export function MeansScene() {
  return (
    <SceneFrame kicker="Additive model" title="Row, column, and grand means">
      <Formula
        tex={r`\bar X_{i\cdot}=\frac1b\sum_{j=1}^{b}X_{ij}\sim\mathrm{N}(\mu+\alpha_i,\sigma^2/b)`}
      />
      <Formula
        tex={r`\bar X_{\cdot j}=\frac1a\sum_{i=1}^{a}X_{ij}\sim\mathrm{N}(\mu+\beta_j,\sigma^2/a)`}
      />
      <Formula
        tex={r`\bar X_{\cdot\cdot}=\frac1{ab}\sum_{i=1}^{a}\sum_{j=1}^{b}X_{ij}\sim\mathrm{N}(\mu,\sigma^2/(ab))`}
      />
    </SceneFrame>
  );
}

export function PartitionScene() {
  return (
    <SceneFrame kicker="Sums of squares" title={r`$SS(TO)=SS(A)+SS(B)+SS(E)$`}>
      <Formula
        tex={r`SS(TO)=\sum_{i=1}^{a}\sum_{j=1}^{b}(X_{ij}-\bar X_{\cdot\cdot})^2.`}
      />
      <Formula
        tex={r`SS(A)=b\sum_{i=1}^{a}(\bar X_{i\cdot}-\bar X_{\cdot\cdot})^2,\quad
SS(B)=a\sum_{j=1}^{b}(\bar X_{\cdot j}-\bar X_{\cdot\cdot})^2.`}
      />
      <Formula
        tex={r`SS(E)=\sum_{i=1}^{a}\sum_{j=1}^{b}(X_{ij}-\bar X_{i\cdot}-\bar X_{\cdot j}+\bar X_{\cdot\cdot})^2.`}
      />
      <P text={r`$SS(A)$: among rows. $SS(B)$: among columns. $SS(E)$: residual (interaction-like) error.`} />
    </SceneFrame>
  );
}

export function ChiSquareScene() {
  return (
    <SceneFrame kicker="Sums of squares" title="Chi-square laws">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Under both $H_A$ and $H_B$, all $X_{ij}$ are i.i.d. $\mathrm{N}(\mu,\sigma^2)$, so $SS(TO)/\sigma^2\sim\chi^2(ab-1)$.`}
          />,
          <MathText
            key="b"
            text={r`Under $H_A$: $SS(A)/\sigma^2\sim\chi^2(a-1)$.`}
          />,
          <MathText
            key="c"
            text={r`Under $H_B$: $SS(B)/\sigma^2\sim\chi^2(b-1)$.`}
          />,
          <MathText
            key="d"
            text={r`By the quadratic-form theorem (with $SS(E)\ge 0$), under both nulls $SS(E)/\sigma^2\sim\chi^2((a-1)(b-1))$, and $SS(A)$, $SS(B)$, $SS(E)$ are mutually independent.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function FAScene() {
  return (
    <SceneFrame kicker="F tests" title={r`Testing $H_A$ (no row effect)`}>
      <Formula
        tex={r`F_A=\dfrac{SS(A)/(a-1)}{SS(E)/[(a-1)(b-1)]}.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Under $H_A$: $F_A\sim F(a-1,(a-1)(b-1))$.`}
          />,
          <MathText
            key="b"
            text={r`Large $f_A$ favors unequal row effects. Reject at level $\alpha$ if $f_A\ge F_{\alpha}(a-1,(a-1)(b-1))$.`}
          />,
          <MathText
            key="c"
            text={r`$p$-value $=\Pr(F_A>f_A)$ under that $F$ law.`}
          />,
        ]}
      />
      <P
        text={r`Key fact: $SS(A)$ and $SS(E)$ do not depend on the $\beta_j$, so the $F_A$ reference law does not require $H_B$.`}
      />
    </SceneFrame>
  );
}

export function FBScene() {
  return (
    <SceneFrame kicker="F tests" title={r`Testing $H_B$ (no column effect)`}>
      <Formula
        tex={r`F_B=\dfrac{SS(B)/(b-1)}{SS(E)/[(a-1)(b-1)]}.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Under $H_B$: $F_B\sim F(b-1,(a-1)(b-1))$.`}
          />,
          <MathText
            key="b"
            text={r`Reject at level $\alpha$ if $f_B\ge F_{\alpha}(b-1,(a-1)(b-1))$.`}
          />,
          <MathText
            key="c"
            text={r`$SS(B)$ and $SS(E)$ do not depend on the $\alpha_i$, so $F_B$ does not require $H_A$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function AnovaTableScene() {
  return (
    <SceneFrame kicker="Additive model" title="ANOVA table (one observation per cell)">
      <Table
        compact
        headers={["Source", "SS", "df", "MS", r`$F$`]}
        rows={[
          ["Factor A", "SS(A)", r`$a-1$`, r`$\mathrm{MS}(A)=\mathrm{SS}(A)/(a-1)$`, r`$\mathrm{MS}(A)/\mathrm{MS}(E)$`],
          ["Factor B", "SS(B)", r`$b-1$`, r`$\mathrm{MS}(B)=\mathrm{SS}(B)/(b-1)$`, r`$\mathrm{MS}(B)/\mathrm{MS}(E)$`],
          ["Error", "SS(E)", r`$(a-1)(b-1)$`, r`$\mathrm{MS}(E)=\mathrm{SS}(E)/[(a-1)(b-1)]$`, ""],
          ["Total", "SS(TO)", r`$ab-1$`, "", ""],
        ]}
      />
      <P text={r`Mean square = SS / df. Each $F$ compares a factor MS to the error MS.`} />
    </SceneFrame>
  );
}

export function CarsDataScene() {
  return (
    <SceneFrame kicker="Example" title="Cars and gasoline brands">
      <P
        text={r`Three cars $\times$ four gasoline brands; miles per gallon for each of the $ab=12$ cells. Test whether the four brands give the same mileage ($\alpha=0.01$).`}
      />
      <Table
        compact
        headers={["Car", "Gas 1", "Gas 2", "Gas 3", "Gas 4", r`$\bar X_{i\cdot}$`]}
        rows={[
          ["1", "26", "28", "31", "31", "29"],
          ["2", "24", "25", "28", "27", "26"],
          ["3", "25", "25", "28", "26", "26"],
          [r`$\bar X_{\cdot j}$`, "25", "26", "29", "28", "27"],
        ]}
      />
    </SceneFrame>
  );
}

export function CarsSolutionScene() {
  return (
    <SceneFrame kicker="Example" title="Cars–gasoline: ANOVA and decision">
      <Note text={r`$H_B:\beta_1=\beta_2=\beta_3=\beta_4=0$ (no gasoline-brand effect).`} />
      <Table
        compact
        headers={["Source", "SS", "df", "MS", r`$F$`, r`$p$`]}
        rows={[
          ["Car (A)", "24", "2", "12", "18", "0.003"],
          ["Gasoline (B)", "30", "3", "10", "15", "0.003"],
          ["Error", "4", "6", r`$2/3$`, "", ""],
          ["Total", "58", "11", "", "", ""],
        ]}
      />
      <Formula tex={r`f_B=\dfrac{30/3}{4/6}=15 > F_{0.01}(3,6)=9.78.`} />
      <P
        text={r`Reject $H_B$ at $0.01$: brands differ. Also $f_A=18>F_{0.01}(2,6)$, so cars differ too.`}
      />
    </SceneFrame>
  );
}

export function InteractionMotifScene() {
  return (
    <SceneFrame kicker="Interaction" title="When additivity fails">
      <BulletList
        items={[
          "In the car–gas data, brand 3 and car 1 look best separately — but the best combination need not be “best × best”.",
          "Sometimes a poor level of each factor works well together.",
          "That non-additive pattern is interaction (common in chemistry and many experiments).",
          <MathText
            key="d"
            text={r`To test interaction we need $c>1$ independent observations in each cell.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function InteractionModelScene() {
  return (
    <SceneFrame kicker="Interaction" title={r`Model with $\gamma_{ij}$ and $c>1$`}>
      <Formula
        tex={r`X_{ijk}\sim\mathrm{N}(\mu+\alpha_i+\beta_j+\gamma_{ij},\sigma^2),\quad
i=1,\ldots,a,\; j=1,\ldots,b,\; k=1,\ldots,c.`}
      />
      <BulletList
        items={[
          <MathText key="a" text={r`$n=abc$ mutually independent observations; common $\sigma^2$.`} />,
          <MathText key="b" text={r`$\sum_i\alpha_i=0$, $\sum_j\beta_j=0$.`} />,
          <MathText
            key="c"
            text={r`Interaction $\gamma_{ij}$ with $\sum_i\gamma_{ij}=0$ and $\sum_j\gamma_{ij}=0$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function InteractionMeansScene() {
  return (
    <SceneFrame kicker="Interaction" title="Cell, row, column, and grand means">
      <Formula tex={r`\bar X_{ij\cdot}=\frac1c\sum_{k=1}^{c}X_{ijk}`} />
      <Formula
        tex={r`\bar X_{i\cdot\cdot}=\frac1{bc}\sum_{j,k}X_{ijk},\qquad
\bar X_{\cdot j\cdot}=\frac1{ac}\sum_{i,k}X_{ijk},\qquad
\bar X_{\cdot\cdot\cdot}=\frac1{abc}\sum_{i,j,k}X_{ijk}.`}
      />
    </SceneFrame>
  );
}

export function InteractionSSScene() {
  return (
    <SceneFrame kicker="Interaction" title={r`$SS(TO)=SS(A)+SS(B)+SS(AB)+SS(E)$`}>
      <Formula
        tex={r`SS(A)=bc\sum_i(\bar X_{i\cdot\cdot}-\bar X_{\cdot\cdot\cdot})^2,\quad
SS(B)=ac\sum_j(\bar X_{\cdot j\cdot}-\bar X_{\cdot\cdot\cdot})^2.`}
      />
      <Formula
        tex={r`SS(AB)=c\sum_{i,j}(\bar X_{ij\cdot}-\bar X_{i\cdot\cdot}-\bar X_{\cdot j\cdot}+\bar X_{\cdot\cdot\cdot})^2.`}
      />
      <Formula
        tex={r`SS(E)=\sum_{i,j,k}(X_{ijk}-\bar X_{ij\cdot})^2.`}
      />
      <P text={r`$SS(AB)$ measures interaction; $SS(E)$ is pure within-cell error.`} />
    </SceneFrame>
  );
}

export function InteractionTestsScene() {
  return (
    <SceneFrame kicker="Interaction" title="F tests with replicates">
      <Formula
        tex={r`F_{AB}=\dfrac{SS(AB)/[(a-1)(b-1)]}{SS(E)/[ab(c-1)]}\overset{H_{AB}}{\sim} F((a-1)(b-1),ab(c-1)).`}
      />
      <Formula
        tex={r`F_A=\dfrac{SS(A)/(a-1)}{SS(E)/[ab(c-1)]},\qquad
F_B=\dfrac{SS(B)/(b-1)}{SS(E)/[ab(c-1)]}.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`$H_{AB}:\gamma_{ij}=0$ for all $i,j$. Reject for large $f_{AB}$.`}
          />,
          <MathText
            key="b"
            text={r`Under $H_A$: $F_A\sim F(a-1,ab(c-1))$; under $H_B$: $F_B\sim F(b-1,ab(c-1))$.`}
          />,
          <MathText
            key="c"
            text={r`Test $H_{AB}$ first. If interaction is present, do not interpret main-effect tests in the usual way.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function InteractionTableScene() {
  return (
    <SceneFrame kicker="Interaction" title={r`ANOVA table ($c$ observations per cell)`}>
      <Table
        compact
        headers={["Source", "SS", "df", "MS", r`$F$`]}
        rows={[
          ["Factor A", "SS(A)", r`$a-1$`, r`$\mathrm{MS}(A)$`, r`$\mathrm{MS}(A)/\mathrm{MS}(E)$`],
          ["Factor B", "SS(B)", r`$b-1$`, r`$\mathrm{MS}(B)$`, r`$\mathrm{MS}(B)/\mathrm{MS}(E)$`],
          ["Interaction", "SS(AB)", r`$(a-1)(b-1)$`, r`$\mathrm{MS}(AB)$`, r`$\mathrm{MS}(AB)/\mathrm{MS}(E)$`],
          ["Error", "SS(E)", r`$ab(c-1)$`, r`$\mathrm{MS}(E)$`, ""],
          ["Total", "SS(TO)", r`$abc-1$`, "", ""],
        ]}
      />
    </SceneFrame>
  );
}

export function DigitsDataScene() {
  return (
    <SceneFrame kicker="Example" title="Array type × number of digits">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`$108$ people in $6$ groups of $18$ ($a=2$, $b=3$, $c=18$).`}
          />,
          "Factor A: down vs across array. Factor B: 1-, 2-, or 3-digit addends.",
          "Response: average number of problems solved correctly in 90 seconds.",
        ]}
      />
      <Table
        compact
        headers={["Array", "1 digit", "2 digits", "3 digits", "Row mean"]}
        rows={[
          ["Down", "23.806", "10.694", "6.278", "13.593"],
          ["Across", "26.056", "6.750", "3.944", "12.250"],
          ["Column mean", "24.931", "8.722", "5.111", ""],
        ]}
      />
    </SceneFrame>
  );
}

export function DigitsSolutionScene() {
  return (
    <SceneFrame kicker="Example" title="Digits–array: ANOVA conclusions">
      <Table
        compact
        headers={["Source", "SS", "df", "MS", r`$F$`, r`$p$`]}
        rows={[
          ["A (array)", "48.678", "1", "48.669", "2.885", "0.0925"],
          ["B (digits)", "8022.73", "2", "4011.36", "237.78", r`$<0.0001$`],
          ["Interaction", "185.92", "2", "92.961", "5.510", "0.0053"],
          ["Error", "1720.76", "102", "16.870", "", ""],
          ["Total", "9978.08", "107", "", "", ""],
        ]}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Interaction: $f_{AB}=5.51$, $p=0.0053$ — reject $H_{AB}$ at $5\%$ or $1\%$, but not at $0.1\%$.`}
          />,
          <MathText
            key="b"
            text={r`At $\alpha=0.001$ (retain $H_{AB}$): reject $H_B$ ($p\approx 0$); retain $H_A$ ($p=0.0925$).`}
          />,
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
            text={r`Assumptions: independence, normality in each cell, common $\sigma^2$, and the additive (or interaction) mean structure with zero-sum constraints.`}
          />,
          <MathText
            key="b"
            text={r`One observation per cell: $SS(TO)=SS(A)+SS(B)+SS(E)$ with error df $(a-1)(b-1)$.`}
          />,
          <MathText
            key="c"
            text={r`With $c>1$: also $SS(AB)$; error df $ab(c-1)$. Hypotheses $H_{AB}$, $H_A$, $H_B$.`}
          />,
          <MathText
            key="d"
            text={r`Each $F_x=\mathrm{MS}(x)/\mathrm{MS}(E)$ is compared with an upper $F$ critical value.`}
          />,
          <MathText
            key="e"
            text={r`Test interaction first; only then interpret main effects when $H_{AB}$ is retained.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}
