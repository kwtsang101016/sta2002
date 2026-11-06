import type { ReactNode } from "react";
import styles from "../Lecture.module.css";
import { BulletList, Figure, Formula, MathText, SceneFrame } from "./shared";

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

export function DiceDataScene() {
  return (
    <SceneFrame kicker="Motivating example" title="Fairness of a die">
      <P text="A die is rolled $n = 600$ times. The face counts are:" />
      <Table
        headers={["Face", "1", "2", "3", "4", "5", "6"]}
        rows={[["Observed frequency", "95", "102", "98", "101", "97", "107"]]}
      />
      <BulletList
        items={[
          "Can we test whether the die is fair?",
          "What statistic should we use, and what is its null distribution?",
        ]}
      />
    </SceneFrame>
  );
}

export function OneFaceScene() {
  return (
    <SceneFrame kicker="Motivating example" title="One face at a time">
      <P text="Suppose we only ask whether the probability of face 6 is $1/6$. Let $Y$ be the number of sixes in $n$ rolls, and let $p = \Pr(\text{face 6})$." />
      <Note text="$H_0: p = 1/6$ versus $H_1: p \neq 1/6$." />
      <BulletList
        items={[
          <MathText key="a" text="$Y \sim \mathrm{Bin}(n,p)$, with mean $np$ and variance $np(1-p)$." />,
          <MathText key="b" text="When $n$ is large, $Y \approx \mathrm{N}(np,\, np(1-p))$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function ChiSquareOneScene() {
  return (
    <SceneFrame kicker="Motivating example" title="Square of a standard normal">
      <BulletList
        items={[
          <MathText key="a" text="If $X \sim \mathrm{N}(0,1)$, then $X^2 \sim \chi^2(1)$." />,
          <MathText key="b" text="$(Y - np)/\sqrt{np(1-p)} \approx \mathrm{N}(0,1)$." />,
        ]}
      />
      <Formula tex={String.raw`Q(p)=\frac{(Y-np)^2}{np(1-p)}\overset{\text{approx}}{\sim}\chi^2(1).`} />
      <P text="Under $H_0$, take $p = 1/6$. A large value favors $H_1$, so reject when the realized value satisfies $q(1/6) \ge \chi^2_{\alpha}(1)$." />
    </SceneFrame>
  );
}

export function SixFaceScene() {
  return (
    <SceneFrame kicker="Motivating example" title="All six faces together">
      <P text="Let $p_k = \Pr(\text{face }k)$ and let $Y_k$ be the count of face $k$." />
      <Note text="$H_0: p_1 = p_2 = \cdots = p_6 = 1/6$ versus $H_1$: at least one $p_k \neq 1/6$." />
      <p>The one-face statistic has to be extended so that every face contributes.</p>
    </SceneFrame>
  );
}

export function TwoCellScene() {
  return (
    <SceneFrame kicker="Motivating example" title="From one cell to six cells">
      <P text="The one-face statistic splits into the face-6 cell and the pooled other-faces cell:" />
      <Formula
        tex={String.raw`Q(p)=\frac{(Y-np)^2}{np}+\frac{[(n-Y)-n(1-p)]^2}{n(1-p)}.`}
      />
      <P text="The same pattern, now with one term per face, is" />
      <Formula tex={String.raw`Q=\sum_{i=1}^{6}\frac{(Y_i-np_i)^2}{np_i}.`} />
      <P text="$Y_i$ is the observed count of face $i$, and $np_i$ is the expected count under $H_0$." />
    </SceneFrame>
  );
}

export function GofDefinitionScene() {
  return (
    <SceneFrame kicker="Goodness-of-fit" title="A specified distribution">
      <p>A goodness-of-fit test asks whether a sample comes from a specified distribution.</p>
      <BulletList
        items={[
          <MathText key="a" text="An experiment has $k$ possible results $A_1,\ldots,A_k$, with $p_i = \Pr(A_i)$ and $\sum_{i=1}^{k} p_i = 1$." />,
          <MathText key="b" text="$H_0: p_i = p_{i0}$ for $i = 1,\ldots,k$, where the $p_{i0}$ are fixed and also sum to 1." />,
          <MathText key="c" text="$H_1$: at least one $p_i \neq p_{i0}$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function MultinomialScene() {
  return (
    <SceneFrame kicker="Null model" title="Multinomial counts">
      <P text="Repeat the experiment $n$ times and let $Y_i$ be the number of times $A_i$ occurs. Then $(Y_1,\ldots,Y_k)$ is multinomial." />
      <Formula
        tex={String.raw`\Pr(Y_1=y_1,\ldots,Y_k=y_k)=\frac{n!}{y_1!\cdots y_k!}p_1^{y_1}\cdots p_k^{y_k},`}
      />
      <BulletList
        items={[
          <MathText key="a" text="$0 \le Y_i \le n$, $\sum Y_i = n$, $p_i \ge 0$, and $\sum p_i = 1$." />,
          <MathText key="b" text="Write $(Y_1,\ldots,Y_k) \sim \mathrm{Multinomial}(n; p_1,\ldots,p_k)$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TheoremScene() {
  return (
    <SceneFrame kicker="Null distribution" title="Pearson’s approximation">
      <P text="If $(Y_1,\ldots,Y_k)$ is multinomial, $n$ is large, and $np_i \ge 5$ for every $i$, then" />
      <Formula
        tex={String.raw`Q_k=\sum_{i=1}^{k}\frac{(Y_i-np_i)^2}{np_i}\overset{\text{approx}}{\sim}\chi^2(k-1).`}
      />
      <BulletList
        items={[
          "The proof is not required. It uses the covariances of the counts.",
          <MathText key="b" text="There are only $k-1$ free counts, because $Y_k = n - Y_1 - \cdots - Y_{k-1}$." />,
          <MathText key="c" text="That is why the chi-square distribution has $k-1$ degrees of freedom." />,
        ]}
      />
    </SceneFrame>
  );
}

export function RealizedScene() {
  return (
    <SceneFrame kicker="Test statistic" title="Observed and expected frequencies">
      <P text="The chi-square statistic for $H_0: p_i = p_{i0}$ is" />
      <Formula tex={String.raw`Q_k=\sum_{i=1}^{k}\frac{(Y_i-np_{i0})^2}{np_{i0}}.`} />
      <P text="After the data are observed, the realized value is" />
      <Formula tex={String.raw`q_k=\sum_{i=1}^{k}\frac{(O_i-E_i)^2}{E_i}.`} />
      <BulletList
        items={[
          <MathText key="a" text="$O_i = y_i$: observed frequency of $A_i$." />,
          <MathText key="b" text="$E_i = np_{i0}$: expected frequency of $A_i$ under $H_0$." />,
          <MathText key="c" text="The approximation $Q_k \approx \chi^2(k-1)$ needs large $n$ and $E_i \ge 5$ for every $i$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function DecisionScene() {
  return (
    <SceneFrame kicker="Decision" title="Large values favor the alternative">
      <P text="At significance level $\alpha$, the critical region is" />
      <Formula
        tex={String.raw`C=\bigl\{(y_1,\ldots,y_k): q_k \ge \chi^2_{\alpha}(k-1)\bigr\}.`}
      />
      <P text="$\chi^2_{\alpha}(k-1)$ is the $(1-\alpha)$-th quantile of $\chi^2(k-1)$. The $p$-value is" />
      <Formula tex={String.raw`\Pr(Q_k \ge q_k;\, Q_k\sim\chi^2(k-1)).`} />
    </SceneFrame>
  );
}

export function CoinsSetupScene() {
  return (
    <SceneFrame kicker="Example · four coins" title="A fully specified binomial">
      <P text="Let $X$ be the number of heads when four coins are tossed. The model to check is that the coins are independent and each has heads probability $1/2$:" />
      <Note text="$X \sim \mathrm{Binomial}(4, 1/2)$." />
      <P text="The experiment is repeated $100$ times. The counts of $0,1,2,3,4$ heads are $7, 18, 40, 31, 4$." />
      <p>Should we support or oppose that binomial model?</p>
    </SceneFrame>
  );
}

export function CoinsProbScene() {
  return (
    <SceneFrame kicker="Example · four coins" title="Cell probabilities under the model">
      <BulletList
        items={[
          <MathText key="a" text="$p_{00} = p_{40} = \binom{4}{0}(1/2)^4 = 1/16 = 0.0625$." />,
          <MathText key="b" text="$p_{10} = p_{30} = \binom{4}{1}(1/2)^4 = 4/16 = 0.25$." />,
          <MathText key="c" text="$p_{20} = \binom{4}{2}(1/2)^4 = 6/16 = 0.375$." />,
        ]}
      />
      <P text="If $Y_i$ is the number of trials with $i$ heads, then $(Y_0,\ldots,Y_4) \sim \mathrm{Multinomial}(100; p_{00},\ldots,p_{40})$." />
      <Table
        headers={["Heads $i$", "0", "1", "2", "3", "4"]}
        rows={[
          ["$E_i = 100 p_{i0}$", "6.25", "25", "37.5", "25", "6.25"],
          ["Observed $O_i$", "7", "18", "40", "31", "4"],
        ]}
      />
    </SceneFrame>
  );
}

export function CoinsStatisticScene() {
  return (
    <SceneFrame kicker="Example · four coins" title="Hypotheses and realized statistic">
      <Note text="$H_0: p_i = p_{i0}$ for $i = 0,1,2,3,4$, versus $H_1$: at least one probability differs." />
      <Formula tex={String.raw`Q_5=\sum_{i=0}^{4}\frac{(Y_i-np_{i0})^2}{np_{i0}}.`} />
      <P text="$q_5 = (7-6.25)^2/6.25 + (18-25)^2/25 + (40-37.5)^2/37.5 + (31-25)^2/25 + (4-6.25)^2/6.25 = 4.47$." />
    </SceneFrame>
  );
}

export function CoinsDecisionScene() {
  return (
    <SceneFrame kicker="Example · four coins" title="The binomial model is retained">
      <Note text="$q_5 = 4.47 < 9.488 = \chi^2_{0.05}(4)$." />
      <BulletList
        items={[
          "At α = 0.05 we cannot reject H₀.",
          <MathText key="b" text="The data support $\mathrm{Binomial}(4,1/2)$ as a reasonable model for $X$." />,
          <MathText key="c" text="A chi-square random variable has mean equal to its degrees of freedom, so $\mathbb{E}(Q_5) = 4$ under $H_0$." />,
          <MathText key="d" text="$q_5 = 4.47$ is only slightly larger than 4. The $p$-value is $\Pr(Q_5 \ge 4.47) = 0.346$." />,
        ]}
      />
    </SceneFrame>
  );
}

const CALL_ROWS = [
  "30  17  65   8  38  35   4  19   7  14  12   4   5   4   2",
  " 7   5  12  50  33  10  15   2  10   1   5  30  41  21  31",
  " 1  18  12   5  24   7   6  31   1   3   2  22   1  30   2",
  " 1   3  12  12   9  28   6  50  63   5  17  11  23   2  46",
  "90  13  21  55  43   5  19  47  24   4   6  27   4   6  37",
  "16  41  68   9   5  28  42   3  42   8  52   2  11  41   4",
  "35  21   3  17  10  16   1  68 105  45  23   5  10  12  17",
];

export function CallsDataScene() {
  return (
    <SceneFrame kicker="Continuous model" title="Times between 911 calls">
      <P text="There are $n = 105$ observations of the time, in minutes, between calls to 911." />
      <DataBlock>{CALL_ROWS.join("\n")}</DataBlock>
      <P text="Is an exponential distribution with $\theta = 20$ an appropriate model for the time $X$ between two calls?" />
    </SceneFrame>
  );
}

export function ContinuousPartitionScene() {
  return (
    <SceneFrame kicker="Continuous model" title="Turn the line into bins">
      <P text="The exponential CDF is $F(x;\theta) = 1 - e^{-x/\theta}$ for $x > 0$ and $\theta > 0$." />
      <BulletList
        items={[
          <MathText key="a" text="Partition $(0,\infty)$ by knots $a_1,\ldots,a_{k-1}$, with $a_0 = 0$ and $a_k = \infty$." />,
          <MathText key="b" text="$A_i = \{X \in (a_{i-1}, a_i]\}$ and $p_i = F(a_i;\theta) - F(a_{i-1};\theta)$." />,
          <MathText key="c" text="The bin counts are multinomial: $(Y_1,\ldots,Y_k) \sim \mathrm{Multinomial}(n; p_1,\ldots,p_k)$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function CallsNineScene() {
  return (
    <SceneFrame kicker="Continuous model" title="Nine bins, four of them too sparse">
      <P text="Here $\theta = 20$ is known. With $k = 9$:" />
      <Table
        compact
        headers={["Result", "$p_{i0}$", "$E_i = np_i$", "$O_i$"]}
        rows={[
          ["$A_1:[0,9]$", "0.3624", "38.0520", "41"],
          ["$A_2:(9,18]$", "0.2311", "24.2655", "22"],
          ["$A_3:(18,27]$", "0.1473", "15.4665", "11"],
          ["$A_4:(27,36]$", "0.0939", "9.8595", "10"],
          ["$A_5:(36,45]$", "0.0599", "6.2895", "9"],
          ["$A_6:(45,54]$", "0.0382", "4.0110", "5"],
          ["$A_7:(54,63]$", "0.0244", "2.5620", "2"],
          ["$A_8:(63,72]$", "0.0155", "1.6275", "3"],
          ["$A_9:(72,\\infty)$", "0.0273", "2.8665", "2"],
        ]}
      />
      <P text="$E_6, E_7, E_8$, and $E_9$ are all below 5, so the chi-square approximation does not apply to these nine cells." />
    </SceneFrame>
  );
}

export function CallsCombinedScene() {
  return (
    <SceneFrame kicker="Continuous model" title="Pool the sparse tail">
      <P text="Combine the last four intervals: $A_6^\ast = (45, \infty)$." />
      <Table
        compact
        headers={["Result", "$p_{i0}$", "$E_i = np_i$", "$O_i$"]}
        rows={[
          ["$A_1:[0,9]$", "0.3624", "38.0520", "41"],
          ["$A_2:(9,18]$", "0.2311", "24.2655", "22"],
          ["$A_3:(18,27]$", "0.1473", "15.4665", "11"],
          ["$A_4:(27,36]$", "0.0939", "9.8595", "10"],
          ["$A_5:(36,45]$", "0.0599", "6.2895", "9"],
          ["$A_6^\ast:(45,\\infty)$", "0.1054", "11.0669", "12"],
        ]}
      />
      <Note text="$H_0: p_i = p_{i0}$ for $i = 1,\ldots,6$, versus $H_1$: at least one $p_i \neq p_{i0}$." />
    </SceneFrame>
  );
}

export function CallsDecisionScene() {
  return (
    <SceneFrame kicker="Continuous model" title="The exponential fit is retained">
      <Formula tex={String.raw`Q_6=\sum_{i=1}^{6}\frac{(O_i-E_i)^2}{E_i}\overset{\text{approx}}{\sim}\chi^2(5)\quad\text{under }H_0.`} />
      <P text="$q_6 = (41-38.0520)^2/38.0520 + (22-24.2655)^2/24.2655 + \cdots + (12-11.0669)^2/11.0669 = 2.9797$." />
      <Note text="$q_6 = 2.9797 < 11.071 = \chi^2_{0.05}(5)$." />
      <P text="Retain $H_0$. The exponential distribution with $\theta = 20$ is a reasonable fit to these times. No parameter was estimated." />
    </SceneFrame>
  );
}

const BARIUM_ROWS = [
  ["7", "4", "3", "6", "4", "4"],
  ["5", "3", "5", "3", "5", "5"],
  ["3", "2", "5", "4", "3", "3"],
  ["7", "6", "6", "4", "3", "11"],
  ["9", "6", "7", "4", "5", "4"],
  ["7", "3", "2", "8", "6", "7"],
  ["4", "1", "9", "8", "4", "8"],
  ["9", "3", "9", "7", "7", "9"],
  ["3", "10", "", "", "", ""],
];

export function PoissonDataScene() {
  return (
    <SceneFrame kicker="Unknown parameter" title="Alpha particles from barium-133">
      <div style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: 14, alignItems: "start" }}>
        <Figure src="/figures/ba.png" alt="Barium-133" width="120px" />
        <div>
          <P text="Let $X$ be the number of alpha particles emitted by barium-133 in one tenth of a second. These $n = 50$ counts were taken with a Geiger counter." />
          <Table compact headers={["", "", "", "", "", ""]} rows={BARIUM_ROWS} />
        </div>
      </div>
      <P text="Test whether $X$ follows a Poisson distribution with unknown $\lambda$." />
    </SceneFrame>
  );
}

export function PoissonSetupScene() {
  return (
    <SceneFrame kicker="Unknown parameter" title="Bins, with λ still unknown">
      <Note text="$H_0: X \sim \mathrm{Poisson}(\lambda)$ for some $\lambda$, versus $H_1$: $X$ is not Poisson." />
      <P text="Partition the nonnegative integers into $A_1 = \{0,1,2,3\}$, $A_2 = \{4\}$, $A_3 = \{5\}$, $A_4 = \{6\}$, $A_5 = \{7\}$, and $A_6 = \{8,9,10,\ldots\}$." />
      <P text="The sample mean is $5.4$. These groups are chosen so that the fitted expected counts can satisfy $np_i \ge 5$. The parameter $\lambda$ is still unknown." />
    </SceneFrame>
  );
}

export function DegreesScene() {
  return (
    <SceneFrame kicker="Unknown parameter" title="Estimate, then lose degrees of freedom">
      <P text="To test whether the sample comes from $F$ with unknown parameter $\theta$ of dimension $d$:" />
      <BulletList
        items={[
          <MathText key="a" text="Partition the support into bins $A_1,\ldots,A_k$. Under $H_0$, the counts are multinomial with probabilities $p_i(\theta) = \Pr(X \in A_i)$." />,
          <MathText key="b" text="Find the MLE $\hat\theta$." />,
          <MathText key="c" text="Check $np_i(\hat\theta) \ge 5$. If not, combine bins until every expected count is at least 5." />,
          <MathText key="d" text="Then $Q_k(\hat\theta) = \sum_{i=1}^{k} (Y_i - np_i(\hat\theta))^2 / np_i(\hat\theta) \approx \chi^2(k-1-d)$ for large $n$." />,
        ]}
      />
      <P text="$d = 1$ for a Poisson distribution with unknown $\lambda$, and $d = 2$ for a normal distribution with unknown mean and variance." />
    </SceneFrame>
  );
}

export function PoissonDecisionScene() {
  return (
    <SceneFrame kicker="Unknown parameter" title="The fitted Poisson is retained">
      <P text="The MLE is $\hat\lambda = \bar x = 5.4$. The fitted table is" />
      <Table
        compact
        headers={["", "$A_1$", "$A_2$", "$A_3$", "$A_4$", "$A_5$", "$A_6$"]}
        rows={[
          ["$p_i(\\hat\\lambda)$", "0.213", "0.160", "0.173", "0.156", "0.120", "0.178"],
          ["$np_i(\\hat\\lambda)$", "10.65", "8.00", "8.65", "7.80", "6.00", "8.90"],
          ["$Y_i$", "13", "9", "6", "5", "7", "10"],
        ]}
      />
      <Note text="$q_6 = 2.763 < 9.488 = \chi^2_{0.05}(4)$, with degrees of freedom $6 - 1 - 1 = 4$." />
      <P text="We cannot reject $H_0$: the sample is compatible with a Poisson distribution." />
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Chi-square goodness-of-fit">
      <BulletList
        items={[
          <MathText key="a" text="$H_0$: the data follow a specified distribution $F$ with parameter $\theta$." />,
          <MathText key="b" text="Partition the support into $k$ bins and compute $Q_k = \sum_{i=1}^{k} (O_i - E_i)^2/E_i$." />,
          <MathText key="c" text="Require $E_i \ge 5$ for every bin before using the chi-square approximation." />,
          <MathText key="d" text="Under $H_0$, $Q_k \approx \chi^2(k-1)$ if $\theta$ is known, and $Q_k \approx \chi^2(k-1-d)$ if $\theta$ has $d$ unknown terms estimated by maximum likelihood." />,
          <MathText key="e" text="Reject $H_0$ if $q_k \ge \chi^2_{\alpha}(q)$, or if the $p$-value $\Pr(Q_k \ge q_k) \le \alpha$." />,
        ]}
      />
    </SceneFrame>
  );
}
