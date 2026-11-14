import type { ReactNode } from "react";
import styles from "../Lecture.module.css";
import { BulletList, Formula, MathText, SceneFrame } from "./shared";

/** Prefer String.raw for KaTeX so escapes like \times are not eaten by JS/Vite. */
const r = String.raw;

const dense: React.CSSProperties = { fontSize: 12, lineHeight: 1.25 };
const dataGrid: React.CSSProperties = {
  font: "700 12px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace",
  margin: 0,
  whiteSpace: "pre-wrap",
};

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

function DataBlock({ children }: { children: ReactNode }) {
  return (
    <div className={styles.tableWrap} style={{ padding: 10 }}>
      <pre style={dataGrid}>{children}</pre>
    </div>
  );
}

export function MedicalDataScene() {
  return (
    <SceneFrame kicker="Motivating example" title="Medical care preference by gender">
      <P text="Researchers recruited 100 male and 100 female outpatients and asked each for a preferred type of medical care: Chinese or Western." />
      <Table
        headers={["Gender", "Chinese", "Western", "Total"]}
        rows={[
          ["Men", r`51 ($n_{11}$)`, r`49 ($n_{12}$)`, r`100 ($n_{1\cdot}$)`],
          ["Women", r`70 ($n_{21}$)`, r`30 ($n_{22}$)`, r`100 ($n_{2\cdot}$)`],
          ["Total", r`121 ($n_{\cdot 1}$)`, r`79 ($n_{\cdot 2}$)`, r`200 ($n$)`],
        ]}
      />
      <BulletList
        items={[
          <MathText key="a" text={r`The data form a $2\times 2$ contingency table.`} />,
          <MathText
            key="b"
            text={r`For each gender $i$, $(n_{i1},n_{i2})$ is multinomial with size $n_{i\cdot}$ and probabilities $(p_{i1},p_{i2})$.`}
          />,
          "Do men and women have different preferences?",
        ]}
      />
    </SceneFrame>
  );
}

export function MedicalNullScene() {
  return (
    <SceneFrame kicker="Motivating example" title={r`Same preferences under $H_0$`}>
      <P text={r`If men and women had the same preference distribution, the table would look like the following under $H_0$.`} />
      <Note text={r`$H_0: p_{11}=p_{21},\ p_{12}=p_{22}$. Write $p_1=p_{11}=p_{21}$.`} />
      <BulletList
        items={[
          <MathText key="a" text={r`Then $n_{\cdot 1}=n_{11}+n_{21}\sim\mathrm{Bin}(n,p_1)$.`} />,
          <MathText
            key="b"
            text={r`Row totals $n_{1\cdot}$ and $n_{2\cdot}$ are fixed by design; column totals $n_{\cdot 1}$ and $n_{\cdot 2}$ are random.`}
          />,
          <MathText key="c" text={r`Expected cell frequencies: $E_{ij}=n_{i\cdot}n_{\cdot j}/n$.`} />,
        ]}
      />
      <Table
        compact
        headers={["Gender", "Chinese", "Western", "Total"]}
        rows={[
          ["Men", r`$E_{11}=n_{1\cdot}n_{\cdot1}/n$`, r`$E_{12}=n_{1\cdot}n_{\cdot2}/n$`, r`$n_{1\cdot}$`],
          ["Women", r`$E_{21}=n_{2\cdot}n_{\cdot1}/n$`, r`$E_{22}=n_{2\cdot}n_{\cdot2}/n$`, r`$n_{2\cdot}$`],
          ["Total", r`$n_{\cdot1}$`, r`$n_{\cdot2}$`, r`$n$`],
        ]}
      />
    </SceneFrame>
  );
}

export function StatisticScene() {
  return (
    <SceneFrame kicker="Test statistic" title={r`Pearson’s chi-square on a $k\times h$ table`}>
      <BulletList
        items={[
          <MathText key="a" text={r`Observed frequency $O_{ij}=n_{ij}$ for $i=1,\ldots,k$ and $j=1,\ldots,h$.`} />,
          <MathText key="b" text={r`Expected frequency $E_{ij}=n_{i\cdot}n_{\cdot j}/n$.`} />,
        ]}
      />
      <Formula tex={r`Q=\sum_{i=1}^{k}\sum_{j=1}^{h}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}.`} />
      <BulletList
        items={[
          <MathText
            key="c"
            text={r`Each row is multinomial with $h-1$ free cells. Under $H_0$ the shared category probabilities cost another $h-1$ degrees of freedom.`}
          />,
          <MathText key="d" text={r`Degrees of freedom: $k(h-1)-(h-1)=(k-1)(h-1)$.`} />,
          <MathText
            key="e"
            text={r`Under $H_0$, $Q\overset{\text{approx}}{\sim}\chi^2((k-1)(h-1))$ when $n$ is large and every $E_{ij}\ge 5$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function MedicalDecisionScene() {
  return (
    <SceneFrame kicker="Motivating example" title={r`Medical care: compute $q$`}>
      <Table
        headers={["Cell", "Observed", "Expected"]}
        rows={[
          ["Men–Chinese", "51", "60.5"],
          ["Men–Western", "49", "39.5"],
          ["Women–Chinese", "70", "60.5"],
          ["Women–Western", "30", "39.5"],
        ]}
      />
      <Formula
        tex={r`q=\frac{(49-39.5)^2}{39.5}+\frac{(51-60.5)^2}{60.5}+\frac{(30-39.5)^2}{39.5}+\frac{(70-60.5)^2}{60.5}=7.554.`}
      />
      <BulletList
        items={[
          <MathText key="a" text={r`Critical value: $\chi^2_{0.05}(1)=3.841$.`} />,
          <MathText key="b" text={r`$q=7.554>3.841$, so reject $H_0$ at $\alpha=0.05$.`} />,
          "Men and women differ in preference; women lean more toward Chinese medicine in this sample.",
        ]}
      />
    </SceneFrame>
  );
}

export function HomogeneityDefScene() {
  return (
    <SceneFrame kicker="Homogeneity" title="Equal multinomials across groups">
      <P text="We ask whether data from different groups follow the same categorical distribution." />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`$k$ independent groups; each observation falls into one of $h$ mutually exclusive categories.`}
          />,
          <MathText key="b" text={r`$p_{ij}=$ probability that an observation from group $i$ falls in category $j$.`} />,
          <MathText
            key="c"
            text={r`Homogeneity means $H_0: p_{1j}=p_{2j}=\cdots=p_{kj}$ for every $j=1,\ldots,h$.`}
          />,
          <MathText key="d" text={r`$H_1$: at least one inequality among those probabilities.`} />,
        ]}
      />
    </SceneFrame>
  );
}

export function HomogeneityStatScene() {
  return (
    <SceneFrame kicker="Homogeneity" title={r`Expected counts under $H_0$`}>
      <BulletList
        items={[
          <MathText key="a" text={r`Group sizes $n_{i\cdot}$ are fixed by the design.`} />,
          <MathText key="b" text={r`$\mathbb{E}(n_{ij})=n_{i\cdot}p_{ij}$.`} />,
          <MathText
            key="c"
            text={r`Under $H_0$, $p_{ij}=p_{\cdot j}$ is estimated by $\hat p_{\cdot j}=n_{\cdot j}/n$.`}
          />,
        ]}
      />
      <Formula tex={r`E_{ij}=n_{i\cdot}\hat p_{\cdot j}=\frac{n_{i\cdot}n_{\cdot j}}{n}.`} />
      <Formula
        tex={r`Q=\sum_{i=1}^{k}\sum_{j=1}^{h}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}\overset{\text{approx}}{\sim}\chi^2((k-1)(h-1)).`}
      />
    </SceneFrame>
  );
}

export function DecisionRuleScene() {
  return (
    <SceneFrame kicker="Decision" title={r`Critical region and $p$-value`}>
      <P text={r`After the data are observed, write $q$ for the realized value of $Q$.`} />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Reject $H_0$ at level $\alpha$ if $q\ge\chi^2_{\alpha}((k-1)(h-1))$.`}
          />,
          <MathText
            key="b"
            text={r`Critical region: $C=\{q\ge\chi^2_{\alpha}((k-1)(h-1))\}$.`}
          />,
          <MathText
            key="c"
            text={r`$p$-value $\approx\Pr(Q\ge q)$ under $\chi^2((k-1)(h-1))$.`}
          />,
        ]}
      />
      <P text={r`Large $Q$ favors $H_1$, so the test is always upper-tailed.`} />
    </SceneFrame>
  );
}

export function BrandsDataScene() {
  return (
    <SceneFrame kicker="Homogeneity example" title="Three brands of cars">
      <P text="Select 20 cars of each of three brands (U, V, W). Record lifetime (weeks) under accelerated wear." />
      <DataBlock>{`Brand U: 25 31 20 42 39 19 35 36 44 26
         38 31 29 41 43 36 28 31 25 38
Brand V: 28 17 33 25 31 21 16 19 31 27
         23 19 25 22 29 32 24 20 34 26
Brand W: 30 22 27 35 29 24 32 26 37 21
         28 25 31 23 33 27 29 30 26 34`}</DataBlock>
      <P text="Do the three brands have different lifetime distributions? Is one brand more durable?" />
    </SceneFrame>
  );
}

export function BrandsTableScene() {
  return (
    <SceneFrame kicker="Homogeneity example" title="Bin lifetimes into three intervals">
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`The chi-square approximation needs $E_{ij}\ge 5$, so choose two cutpoints that split the 60 cars fairly evenly.`}
          />,
          <MathText
            key="b"
            text={r`Cuts at $25.5$ and $32.5$ give $A_1=[0,25.5)$, $A_2=[25.5,32.5)$, $A_3=[32.5,\infty)$.`}
          />,
        ]}
      />
      <Table
        headers={["", r`$A_1$`, r`$A_2$`, r`$A_3$`, "Total"]}
        rows={[
          ["Brand U", "4", "6", "10", "20"],
          ["Brand V", "11", "7", "2", "20"],
          ["Brand W", "5", "11", "4", "20"],
          ["Total", "20", "24", "16", "60"],
        ]}
      />
    </SceneFrame>
  );
}

export function BrandsDecisionScene() {
  return (
    <SceneFrame kicker="Homogeneity example" title={r`Three brands: reject $H_0$`}>
      <Note text={r`$H_0$: the three brands share the same distribution across intervals.`} />
      <P text={r`Expected counts use $E_{ij}=n_{i\cdot}n_{\cdot j}/n$ on the Page 12 table (same formula as Page 09). Each brand has row total $20$, so`} />
      <Formula
        tex={r`E_{i1}=\frac{20\cdot 20}{60}\approx 6.67,\quad E_{i2}=\frac{20\cdot 24}{60}=8,\quad E_{i3}=\frac{20\cdot 16}{60}\approx 5.33.`}
      />
      <Table
        compact
        headers={["", r`$A_1$`, r`$A_2$`, r`$A_3$`]}
        rows={[
          ["Brand U", "6.67", "8.00", "5.33"],
          ["Brand V", "6.67", "8.00", "5.33"],
          ["Brand W", "6.67", "8.00", "5.33"],
        ]}
      />
      <Formula
        tex={r`q=\sum_{i,j}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}=\frac{(4-6.67)^2}{6.67}+\frac{(6-8)^2}{8}+\frac{(10-5.33)^2}{5.33}+\cdots=12.55.`}
      />
      <BulletList
        items={[
          <MathText key="a" text={r`Degrees of freedom: $(3-1)(3-1)=4$. Critical value $\chi^2_{0.05}(4)=9.48$.`} />,
          <MathText key="b" text={r`Since $12.55>9.48$, reject $H_0$. Brand U looks most durable; Brand V least durable.`} />,
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceSetupScene() {
  return (
    <SceneFrame kicker="Independence" title="Two attributes, one sample">
      <P text={r`Each outcome is classified by two attributes: first into $A_1,\ldots,A_k$, second into $B_1,\ldots,B_h$.`} />
      <Table
        compact
        headers={["Frequency", r`$B_1$`, r`$B_2$`, r`$\cdots$`, r`$B_h$`, "Total"]}
        rows={[
          [r`$A_1$`, r`$y_{11}$`, r`$y_{12}$`, r`$\cdots$`, r`$y_{1h}$`, r`$y_{1\cdot}$`],
          [r`$A_2$`, r`$y_{21}$`, r`$y_{22}$`, r`$\cdots$`, r`$y_{2h}$`, r`$y_{2\cdot}$`],
          [r`$\vdots$`, r`$\vdots$`, r`$\vdots$`, r`$\ddots$`, r`$\vdots$`, r`$\vdots$`],
          [r`$A_k$`, r`$y_{k1}$`, r`$y_{k2}$`, r`$\cdots$`, r`$y_{kh}$`, r`$y_{k\cdot}$`],
          ["Total", r`$y_{\cdot1}$`, r`$y_{\cdot2}$`, r`$\cdots$`, r`$y_{\cdot h}$`, r`$n$`],
        ]}
      />
      <P text={r`Here $y_{ij}$ is the realized count in cell $(A_i,B_j)$.`} />
    </SceneFrame>
  );
}

export function IndependenceProbScene() {
  return (
    <SceneFrame kicker="Independence" title="Joint and marginal probabilities">
      <BulletList
        items={[
          <MathText key="a" text={r`$p_{ij}=\Pr(A_i\cap B_j)$, with $\sum_i\sum_j p_{ij}=1$.`} />,
          <MathText
            key="b"
            text={r`Independence means $\Pr(A_i\cap B_j)=\Pr(A_i)\Pr(B_j)$ for every $i,j$.`}
          />,
          <MathText
            key="c"
            text={r`Write $p_{i\cdot}=\sum_j p_{ij}=\Pr(A_i)$ and $p_{\cdot j}=\sum_i p_{ij}=\Pr(B_j)$.`}
          />,
          <MathText key="d" text={r`Then $\sum_i p_{i\cdot}=\sum_j p_{\cdot j}=1$.`} />,
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceHypScene() {
  return (
    <SceneFrame kicker="Independence" title="Hypotheses and sampling model">
      <Note text={r`$H_0: p_{ij}=p_{i\cdot}p_{\cdot j}$ for all $i,j$, versus $H_1$: some cell violates the product rule.`} />
      <BulletList
        items={[
          <MathText key="a" text={r`Repeat the experiment $n$ times independently (one population).`} />,
          <MathText
            key="b"
            text={r`$Y_{ij}=$ frequency of $(A_i,B_j)$, with $\sum_i\sum_j Y_{ij}=n$.`}
          />,
          <MathText
            key="c"
            text={r`The $kh$ cell counts are multinomial, and $\mathbb{E}(Y_{ij})=np_{ij}$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceStatScene() {
  return (
    <SceneFrame kicker="Independence" title="Plug in MLEs for the margins">
      <Formula
        tex={r`Q=\sum_{i=1}^{k}\sum_{j=1}^{h}\frac{(Y_{ij}-np_{i\cdot}p_{\cdot j})^2}{np_{i\cdot}p_{\cdot j}}.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Under $H_0$, $\hat p_{i\cdot}=y_{i\cdot}/n$ and $\hat p_{\cdot j}=y_{\cdot j}/n$.`}
          />,
          <MathText
            key="b"
            text={r`Fitted expectation $E_{ij}=n\hat p_{i\cdot}\hat p_{\cdot j}=y_{i\cdot}y_{\cdot j}/n$ — the same formula as in the homogeneity test.`}
          />,
          <MathText
            key="c"
            text={r`Free cells: $kh-1$. Estimate $k-1$ row margins and $h-1$ column margins, so lose $k+h-2$ degrees of freedom.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceDfScene() {
  return (
    <SceneFrame kicker="Independence" title="Null distribution and decision">
      <Formula tex={r`kh-1-(k+h-2)=(k-1)(h-1).`} />
      <BulletList
        items={[
          <MathText
            key="a"
            text={r`Under $H_0$, $Q\overset{\text{approx}}{\sim}\chi^2((k-1)(h-1))$.`}
          />,
          <MathText
            key="b"
            text={r`Reject at level $\alpha$ if $q\ge\chi^2_{\alpha}((k-1)(h-1))$.`}
          />,
          <MathText
            key="c"
            text={r`$p$-value $\approx\Pr(Q>q)$ under that chi-square law.`}
          />,
        ]}
      />
      <P text="Same critical-value formula as the homogeneity test — the sampling story differs, the arithmetic does not." />
    </SceneFrame>
  );
}

export function CollegeDataScene() {
  return (
    <SceneFrame kicker="Independence example" title="Gender and college enrollment">
      <P text="A random sample of 400 undergraduates is cross-classified by gender and college." />
      <Table
        compact
        headers={["Gender", "Science", "Eng.", "Business", "Medicine", "Art", "Total"]}
        rows={[
          ["Male", "21", "16", "145", "2", "6", "190"],
          ["Female", "14", "4", "175", "13", "4", "210"],
          ["Total", "35", "20", "320", "15", "10", "400"],
        ]}
      />
      <P text={r`At $\alpha=0.01$, is college independent of gender?`} />
    </SceneFrame>
  );
}

export function CollegeExpectedScene() {
  return (
    <SceneFrame kicker="Independence example" title={r`Expected table and $q=18.93$`}>
      <Table
        compact
        headers={["Gender", "Science", "Eng.", "Business", "Medicine", "Art", "Total"]}
        rows={[
          ["Male", "16.625", "9.5", "152", "7.125", "4.75", "190"],
          ["Female", "18.375", "10.5", "168", "7.875", "5.25", "210"],
          ["Total", "35", "20", "320", "15", "10", "400"],
        ]}
      />
      <P text={r`Each $E_{ij}=(\text{row total})(\text{column total})/400$. Summing $(O-E)^2/E$ over the ten cells gives $q=18.93$.`} />
    </SceneFrame>
  );
}

export function CollegeDecisionScene() {
  return (
    <SceneFrame kicker="Independence example" title={r`Gender and college: reject $H_0$`}>
      <BulletList
        items={[
          <MathText key="a" text={r`Degrees of freedom: $(2-1)(5-1)=4$.`} />,
          <MathText key="b" text={r`Critical value: $\chi^2_{0.01}(4)=13.28$.`} />,
          <MathText key="c" text={r`Since $q=18.93>13.28$, reject independence at $\alpha=0.01$.`} />,
          <MathText
            key="d"
            text={r`Engineering and medicine contribute the most to $q$, so those colleges drive the association.`}
          />,
          <MathText
            key="e"
            text={r`One expected count is below 5, but that cell does not dominate $q$, so the approximation is still used with caution.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function CompareScene() {
  return (
    <SceneFrame kicker="Summary" title="Homogeneity versus independence">
      <Table
        compact
        headers={["Aspect", "Homogeneity", "Independence"]}
        rows={[
          ["Setting", r`$k$ groups, $h$ shared categories`, r`$k$ levels $\times$ $h$ levels of two attributes`],
          ["Purpose", "Equal multinomial probabilities across groups", "Two attributes are independent"],
          ["Sampling", "Independent samples; fixed row totals", r`One sample of size $n$`],
          ["Null model", r`Separate multinomials, common $p_{\cdot j}$`, r`Joint multinomial with $p_{ij}=p_{i\cdot}p_{\cdot j}$`],
        ]}
      />
      <Note
        text={r`$Q=\sum_i\sum_j (Y_{ij}-E_{ij})^2/E_{ij}$ with $E_{ij}=n_{i\cdot}n_{\cdot j}/n$ (or $Y_{i\cdot}Y_{\cdot j}/n$), and $Q\approx\chi^2((k-1)(h-1))$.`}
      />
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Takeaways">
      <BulletList
        items={[
          "A contingency table records how often each combination of categories appears.",
          <MathText
            key="b"
            text={r`Homogeneity: same category probabilities across $k$ independent groups.`}
          />,
          <MathText
            key="c"
            text={r`Independence: $p_{ij}=p_{i\cdot}p_{\cdot j}$ for two attributes in one population.`}
          />,
          <MathText
            key="d"
            text={r`Both use $Q=\sum(O-E)^2/E$ with $E_{ij}=(\text{row})(\text{column})/n$ and $\mathrm{df}=(k-1)(h-1)$.`}
          />,
          <MathText
            key="e"
            text={r`Prefer every $E_{ij}\ge 5$; reject for large $q$ against $\chi^2_{\alpha}((k-1)(h-1))$.`}
          />,
        ]}
      />
    </SceneFrame>
  );
}
