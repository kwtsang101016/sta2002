import type { ReactNode } from "react";
import styles from "../Lecture.module.css";
import { BulletList, Formula, MathText, SceneFrame } from "./shared";

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
          ["Men", "51 ($n_{11}$)", "49 ($n_{12}$)", "100 ($n_{1\\cdot}$)"],
          ["Women", "70 ($n_{21}$)", "30 ($n_{22}$)", "100 ($n_{2\\cdot}$)"],
          ["Total", "121 ($n_{\\cdot 1}$)", "79 ($n_{\\cdot 2}$)", "200 ($n$)"],
        ]}
      />
      <BulletList
        items={[
          <MathText key="a" text="The data form a $2\\times 2$ contingency table." />,
          <MathText
            key="b"
            text="For each gender $i$, $(n_{i1},n_{i2})$ is multinomial with size $n_{i\\cdot}$ and probabilities $(p_{i1},p_{i2})$."
          />,
          "Do men and women have different preferences?",
        ]}
      />
    </SceneFrame>
  );
}

export function MedicalNullScene() {
  return (
    <SceneFrame kicker="Motivating example" title="Same preferences under $H_0$">
      <P text="If men and women had the same preference distribution, the table would look like the following under $H_0$." />
      <Note text="$H_0: p_{11}=p_{21},\ p_{12}=p_{22}$. Write $p_1=p_{11}=p_{21}$." />
      <BulletList
        items={[
          <MathText key="a" text="Then $n_{\\cdot 1}=n_{11}+n_{21}\\sim\\mathrm{Bin}(n,p_1)$." />,
          <MathText
            key="b"
            text="Row totals $n_{1\\cdot}$ and $n_{2\\cdot}$ are fixed by design; column totals $n_{\\cdot 1}$ and $n_{\\cdot 2}$ are random."
          />,
          <MathText key="c" text="Expected cell frequencies: $E_{ij}=n_{i\\cdot}n_{\\cdot j}/n$." />,
        ]}
      />
      <Table
        compact
        headers={["Gender", "Chinese", "Western", "Total"]}
        rows={[
          ["Men", "$E_{11}=n_{1\\cdot}n_{\\cdot1}/n$", "$E_{12}=n_{1\\cdot}n_{\\cdot2}/n$", "$n_{1\\cdot}$"],
          ["Women", "$E_{21}=n_{2\\cdot}n_{\\cdot1}/n$", "$E_{22}=n_{2\\cdot}n_{\\cdot2}/n$", "$n_{2\\cdot}$"],
          ["Total", "$n_{\\cdot1}$", "$n_{\\cdot2}$", "$n$"],
        ]}
      />
    </SceneFrame>
  );
}

export function StatisticScene() {
  return (
    <SceneFrame kicker="Test statistic" title="Pearson’s chi-square on a $k\\times h$ table">
      <BulletList
        items={[
          <MathText key="a" text="Observed frequency $O_{ij}=n_{ij}$ for $i=1,\\ldots,k$ and $j=1,\\ldots,h$." />,
          <MathText key="b" text="Expected frequency $E_{ij}=n_{i\\cdot}n_{\\cdot j}/n$." />,
        ]}
      />
      <Formula
        tex={String.raw`Q=\sum_{i=1}^{k}\sum_{j=1}^{h}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}.`}
      />
      <BulletList
        items={[
          <MathText
            key="c"
            text="Each row is multinomial with $h-1$ free cells. Under $H_0$ the shared category probabilities cost another $h-1$ degrees of freedom."
          />,
          <MathText
            key="d"
            text="Degrees of freedom: $k(h-1)-(h-1)=(k-1)(h-1)$."
          />,
          <MathText
            key="e"
            text="Under $H_0$, $Q\\overset{\\text{approx}}{\\sim}\\chi^2((k-1)(h-1))$ when $n$ is large and every $E_{ij}\\ge 5$."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function MedicalDecisionScene() {
  return (
    <SceneFrame kicker="Motivating example" title="Medical care: compute $q$">
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
        tex={String.raw`q=\frac{(49-39.5)^2}{39.5}+\frac{(51-60.5)^2}{60.5}+\frac{(30-39.5)^2}{39.5}+\frac{(70-60.5)^2}{60.5}=7.554.`}
      />
      <BulletList
        items={[
          <MathText key="a" text="Critical value: $\\chi^2_{0.05}(1)=3.841$." />,
          <MathText key="b" text="$q=7.554>3.841$, so reject $H_0$ at $\\alpha=0.05$." />,
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
            text="$k$ independent groups; each observation falls into one of $h$ mutually exclusive categories."
          />,
          <MathText key="b" text="$p_{ij}=$ probability that an observation from group $i$ falls in category $j$." />,
          <MathText
            key="c"
            text="Homogeneity means $H_0: p_{1j}=p_{2j}=\\cdots=p_{kj}$ for every $j=1,\\ldots,h$."
          />,
          <MathText key="d" text="$H_1$: at least one inequality among those probabilities." />,
        ]}
      />
    </SceneFrame>
  );
}

export function HomogeneityStatScene() {
  return (
    <SceneFrame kicker="Homogeneity" title="Expected counts under $H_0$">
      <BulletList
        items={[
          <MathText key="a" text="Group sizes $n_{i\\cdot}$ are fixed by the design." />,
          <MathText key="b" text="$\\mathbb{E}(n_{ij})=n_{i\\cdot}p_{ij}$." />,
          <MathText
            key="c"
            text="Under $H_0$, $p_{ij}=p_{\\cdot j}$ is estimated by $\\hat p_{\\cdot j}=n_{\\cdot j}/n$."
          />,
        ]}
      />
      <Formula tex={String.raw`E_{ij}=n_{i\cdot}\hat p_{\cdot j}=\frac{n_{i\cdot}n_{\cdot j}}{n}.`} />
      <Formula
        tex={String.raw`Q=\sum_{i=1}^{k}\sum_{j=1}^{h}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}\overset{\text{approx}}{\sim}\chi^2((k-1)(h-1)).`}
      />
    </SceneFrame>
  );
}

export function DecisionRuleScene() {
  return (
    <SceneFrame kicker="Decision" title="Critical region and $p$-value">
      <P text="After the data are observed, write $q$ for the realized value of $Q$." />
      <BulletList
        items={[
          <MathText
            key="a"
            text="Reject $H_0$ at level $\\alpha$ if $q\\ge\\chi^2_{\\alpha}((k-1)(h-1))$."
          />,
          <MathText
            key="b"
            text="Critical region: $C=\\{q\\ge\\chi^2_{\\alpha}((k-1)(h-1))\\}$."
          />,
          <MathText
            key="c"
            text="$p$-value $\\approx\\Pr(Q\\ge q)$ under $\\chi^2((k-1)(h-1))$."
          />,
        ]}
      />
      <P text="Large $Q$ favors $H_1$, so the test is always upper-tailed." />
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
            text="The chi-square approximation needs $E_{ij}\\ge 5$, so choose two cutpoints that split the 60 cars fairly evenly."
          />,
          <MathText
            key="b"
            text="Cuts at $25.5$ and $32.5$ give $A_1=[0,25.5)$, $A_2=[25.5,32.5)$, $A_3=[32.5,\\infty)$."
          />,
        ]}
      />
      <Table
        headers={["", "$A_1$", "$A_2$", "$A_3$", "Total"]}
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
    <SceneFrame kicker="Homogeneity example" title="Three brands: reject $H_0$">
      <Note text="$H_0$: the three brands share the same distribution across intervals." />
      <Table
        compact
        headers={["", "$A_1$", "$A_2$", "$A_3$"]}
        rows={[
          ["Brand U", "6.67", "8.00", "5.33"],
          ["Brand V", "6.67", "8.00", "5.33"],
          ["Brand W", "6.67", "8.00", "5.33"],
        ]}
      />
      <BulletList
        items={[
          <MathText key="a" text="Realized $q=12.55$, with $\\mathrm{df}=(3-1)(3-1)=4$." />,
          <MathText key="b" text="$\\chi^2_{0.05}(4)=9.48<12.55$, so reject $H_0$." />,
          "Brand U looks most durable; Brand V least durable in this accelerated test.",
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceSetupScene() {
  return (
    <SceneFrame kicker="Independence" title="Two attributes, one sample">
      <P text="Each outcome is classified by two attributes: first into $A_1,\\ldots,A_k$, second into $B_1,\\ldots,B_h$." />
      <Table
        compact
        headers={["Frequency", "$B_1$", "$B_2$", "$\\cdots$", "$B_h$", "Total"]}
        rows={[
          ["$A_1$", "$y_{11}$", "$y_{12}$", "$\\cdots$", "$y_{1h}$", "$y_{1\\cdot}$"],
          ["$A_2$", "$y_{21}$", "$y_{22}$", "$\\cdots$", "$y_{2h}$", "$y_{2\\cdot}$"],
          ["$\\vdots$", "$\\vdots$", "$\\vdots$", "$\\ddots$", "$\\vdots$", "$\\vdots$"],
          ["$A_k$", "$y_{k1}$", "$y_{k2}$", "$\\cdots$", "$y_{kh}$", "$y_{k\\cdot}$"],
          ["Total", "$y_{\\cdot1}$", "$y_{\\cdot2}$", "$\\cdots$", "$y_{\\cdot h}$", "$n$"],
        ]}
      />
      <P text="Here $y_{ij}$ is the realized count in cell $(A_i,B_j)$." />
    </SceneFrame>
  );
}

export function IndependenceProbScene() {
  return (
    <SceneFrame kicker="Independence" title="Joint and marginal probabilities">
      <BulletList
        items={[
          <MathText key="a" text="$p_{ij}=\\Pr(A_i\\cap B_j)$, with $\\sum_i\\sum_j p_{ij}=1$." />,
          <MathText
            key="b"
            text="Independence means $\\Pr(A_i\\cap B_j)=\\Pr(A_i)\\Pr(B_j)$ for every $i,j$."
          />,
          <MathText
            key="c"
            text="Write $p_{i\\cdot}=\\sum_j p_{ij}=\\Pr(A_i)$ and $p_{\\cdot j}=\\sum_i p_{ij}=\\Pr(B_j)$."
          />,
          <MathText key="d" text="Then $\\sum_i p_{i\\cdot}=\\sum_j p_{\\cdot j}=1$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceHypScene() {
  return (
    <SceneFrame kicker="Independence" title="Hypotheses and sampling model">
      <Note text="$H_0: p_{ij}=p_{i\\cdot}p_{\\cdot j}$ for all $i,j$, versus $H_1$: some cell violates the product rule." />
      <BulletList
        items={[
          <MathText key="a" text="Repeat the experiment $n$ times independently (one population)." />,
          <MathText
            key="b"
            text="$Y_{ij}=$ frequency of $(A_i,B_j)$, with $\\sum_i\\sum_j Y_{ij}=n$."
          />,
          <MathText
            key="c"
            text="The $kh$ cell counts are multinomial, and $\\mathbb{E}(Y_{ij})=np_{ij}$."
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
        tex={String.raw`Q=\sum_{i=1}^{k}\sum_{j=1}^{h}\frac{(Y_{ij}-np_{i\cdot}p_{\cdot j})^2}{np_{i\cdot}p_{\cdot j}}.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text="Under $H_0$, $\\hat p_{i\\cdot}=y_{i\\cdot}/n$ and $\\hat p_{\\cdot j}=y_{\\cdot j}/n$."
          />,
          <MathText
            key="b"
            text="Fitted expectation $E_{ij}=n\\hat p_{i\\cdot}\\hat p_{\\cdot j}=y_{i\\cdot}y_{\\cdot j}/n$ — the same formula as in the homogeneity test."
          />,
          <MathText
            key="c"
            text="Free cells: $kh-1$. Estimate $k-1$ row margins and $h-1$ column margins, so lose $k+h-2$ degrees of freedom."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function IndependenceDfScene() {
  return (
    <SceneFrame kicker="Independence" title="Null distribution and decision">
      <Formula tex={String.raw`kh-1-(k+h-2)=(k-1)(h-1).`} />
      <BulletList
        items={[
          <MathText
            key="a"
            text="Under $H_0$, $Q\\overset{\\text{approx}}{\\sim}\\chi^2((k-1)(h-1))$."
          />,
          <MathText
            key="b"
            text="Reject at level $\\alpha$ if $q\\ge\\chi^2_{\\alpha}((k-1)(h-1))$."
          />,
          <MathText
            key="c"
            text="$p$-value $\\approx\\Pr(Q>q)$ under that chi-square law."
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
      <P text="At $\\alpha=0.01$, is college independent of gender?" />
    </SceneFrame>
  );
}

export function CollegeExpectedScene() {
  return (
    <SceneFrame kicker="Independence example" title="Expected table and $q=18.93$">
      <Table
        compact
        headers={["Gender", "Science", "Eng.", "Business", "Medicine", "Art", "Total"]}
        rows={[
          ["Male", "16.625", "9.5", "152", "7.125", "4.75", "190"],
          ["Female", "18.375", "10.5", "168", "7.875", "5.25", "210"],
          ["Total", "35", "20", "320", "15", "10", "400"],
        ]}
      />
      <P text="Each $E_{ij}=(\\text{row total})(\\text{column total})/400$. Summing $(O-E)^2/E$ over the ten cells gives $q=18.93$." />
    </SceneFrame>
  );
}

export function CollegeDecisionScene() {
  return (
    <SceneFrame kicker="Independence example" title="Gender and college: reject $H_0$">
      <BulletList
        items={[
          <MathText key="a" text="Degrees of freedom: $(2-1)(5-1)=4$." />,
          <MathText key="b" text="Critical value: $\\chi^2_{0.01}(4)=13.28$." />,
          <MathText key="c" text="Since $q=18.93>13.28$, reject independence at $\\alpha=0.01$." />,
          "Engineering and medicine contribute the most to $q$, so those colleges drive the association.",
          <MathText
            key="e"
            text="One expected count is below 5, but that cell does not dominate $q$, so the approximation is still used with caution."
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
          ["Setting", "$k$ groups, $h$ shared categories", "$k$ levels × $h$ levels of two attributes"],
          ["Purpose", "Equal multinomial probabilities across groups", "Two attributes are independent"],
          ["Sampling", "Independent samples; fixed row totals", "One sample of size $n$"],
          ["Null model", "Separate multinomials, common $p_{\\cdot j}$", "Joint multinomial with $p_{ij}=p_{i\\cdot}p_{\\cdot j}$"],
        ]}
      />
      <Note text="$Q=\\sum_i\\sum_j (Y_{ij}-E_{ij})^2/E_{ij}$ with $E_{ij}=n_{i\\cdot}n_{\\cdot j}/n$ (or $Y_{i\\cdot}Y_{\\cdot j}/n$), and $Q\\approx\\chi^2((k-1)(h-1))$." />
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
            text="Homogeneity: same category probabilities across $k$ independent groups."
          />,
          <MathText
            key="c"
            text="Independence: $p_{ij}=p_{i\\cdot}p_{\\cdot j}$ for two attributes in one population."
          />,
          <MathText
            key="d"
            text="Both use $Q=\\sum(O-E)^2/E$ with $E_{ij}=(\\text{row})(\\text{column})/n$ and $\\mathrm{df}=(k-1)(h-1)$."
          />,
          <MathText
            key="e"
            text="Prefer every $E_{ij}\\ge 5$; reject for large $q$ against $\\chi^2_{\\alpha}((k-1)(h-1))$."
          />,
        ]}
      />
    </SceneFrame>
  );
}
