import styles from "../Lecture.module.css";
import { BulletList, Figure, Formula, MathText, SceneFrame } from "./shared";

const r = String.raw;

const dense: React.CSSProperties = { fontSize: 12, lineHeight: 1.25 };

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

export function MeansSetupScene() {
  return (
    <SceneFrame kicker="Model" title="Equality of several normal means">
      <BulletList
        items={[
          "We already know how to compare two normal means.",
          <MathText
            key="b"
            text="Now take $m$ normal distributions with means $\mu_1,\ldots,\mu_m$ and a common unknown variance $\sigma^2$."
          />,
        ]}
      />
      <Note text={r`$H_0: \mu_1=\mu_2=\cdots=\mu_m=\mu$ (with $\mu$ unspecified).`} />
      <P text={r`$H_1$: at least two of the means are unequal.`} />
    </SceneFrame>
  );
}

export function SampleMeansScene() {
  return (
    <SceneFrame kicker="Model" title="Sample means and the grand mean">
      <BulletList
        items={[
          <MathText
            key="a"
            text="Take independent samples: $X_{i1},\ldots,X_{in_i}$ from group $i$, for $i=1,\ldots,m$."
          />,
          <MathText key="b" text="Assume $X_{ij}\overset{\mathrm{iid}}{\sim}\mathrm{N}(\mu_i,\sigma^2)$." />,
        ]}
      />
      <Formula tex={r`\bar X_{i\cdot}=\frac1{n_i}\sum_{j=1}^{n_i}X_{ij},\qquad
\bar X_{\cdot\cdot}=\frac1{n}\sum_{i=1}^{m}\sum_{j=1}^{n_i}X_{ij},
\qquad n=n_1+\cdots+n_m.`} />
      <P text={r`$\bar X_{i\cdot}$ is the $i$-th group mean; $\bar X_{\cdot\cdot}$ is the grand mean.`} />
    </SceneFrame>
  );
}

export function TotalSSScene() {
  return (
    <SceneFrame kicker="Sums of squares" title="Total sum of squares">
      <P text={r`Under $H_0$, all $n$ observations come from $\mathrm{N}(\mu,\sigma^2)$. Student’s theorem then gives a chi-square law for the sample variance.`} />
      <Formula tex={r`SS(TO)=\sum_{i=1}^{m}\sum_{j=1}^{n_i}(X_{ij}-\bar X_{\cdot\cdot})^2.`} />
      <BulletList
        items={[
          <MathText
            key="a"
            text="Under $H_0$, $SS(TO)/(n-1)$ is the usual sample variance of all $n$ points."
          />,
          <MathText key="b" text="Hence $SS(TO)/\sigma^2\sim\chi^2(n-1)$ under $H_0$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function PartitionScene() {
  return (
    <SceneFrame kicker="Sums of squares" title={r`$SS(TO)=SS(E)+SS(T)$`}>
      <Formula
        tex={r`SS(TO)=\sum_{i=1}^{m}\sum_{j=1}^{n_i}(X_{ij}-\bar X_{i\cdot})^2
+\sum_{i=1}^{m}n_i(\bar X_{i\cdot}-\bar X_{\cdot\cdot})^2.`}
      />
      <BulletList
        items={[
          <MathText
            key="a"
            text="$SS(E)=\sum_i\sum_j(X_{ij}-\bar X_{i\cdot})^2$: error / within-group sum of squares."
          />,
          <MathText
            key="b"
            text="$SS(T)=\sum_i n_i(\bar X_{i\cdot}-\bar X_{\cdot\cdot})^2$: treatment / between-group sum of squares."
          />,
          "Each is a quadratic form in the observations $X_{ij}$.",
        ]}
      />
    </SceneFrame>
  );
}

export function ErrorChiScene() {
  return (
    <SceneFrame kicker="Sums of squares" title={r`Within-group variance $SS(E)$`}>
      <P text={r`Let $W_i$ be the sample variance in group $i$:`} />
      <Formula tex={r`W_i=\frac1{n_i-1}\sum_{j=1}^{n_i}(X_{ij}-\bar X_{i\cdot})^2.`} />
      <BulletList
        items={[
          <MathText key="a" text="$(n_i-1)W_i/\sigma^2\sim\chi^2(n_i-1)$, and the $W_i$ are independent." />,
          <MathText key="b" text="$SS(E)=\sum_{i=1}^{m}(n_i-1)W_i$, so $SS(E)/\sigma^2\sim\chi^2(n-m)$." />,
          <MathText
            key="c"
            text="This chi-square law for $SS(E)$ holds whether or not $H_0$ is true."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function MeanSquaresScene() {
  return (
    <SceneFrame kicker="Sums of squares" title="Why “analysis of variance”">
      <BulletList
        items={[
          <MathText
            key="a"
            text="$\mathbb{E}[SS(E)/(n-m)]=\sigma^2$: the within-group mean square is always unbiased for $\sigma^2$."
          />,
          <MathText
            key="b"
            text="Under $H_0$, $\mathbb{E}[SS(T)/(m-1)]=\sigma^2$ as well: the between-group mean square also estimates $\sigma^2$."
          />,
          "The test compares these two variance estimators — hence ANalysis Of VAriance.",
        ]}
      />
      <Note text={r`Under $H_0$: $\displaystyle\frac{SS(TO)}{\sigma^2}=\frac{SS(E)}{\sigma^2}+\frac{SS(T)}{\sigma^2}$.`} />
    </SceneFrame>
  );
}

export function TheoremScene() {
  return (
    <SceneFrame kicker="Null distribution" title="A useful theorem for quadratic forms">
      <P text={r`Let $Q=Q_1+\cdots+Q_k$ be real quadratic forms in $n$ i.i.d.\ normals with common variance $\sigma^2$. If $Q/\sigma^2\sim\chi^2(r)$ and $Q_i/\sigma^2\sim\chi^2(r_i)$ for $i=1,\ldots,k-1$, and $Q_k\ge 0$, then:`} />
      <BulletList
        items={[
          <MathText key="a" text="$Q_1,\ldots,Q_k$ are mutually independent, and" />,
          <MathText
            key="b"
            text="$Q_k/\sigma^2\sim\chi^2\bigl(r-(r_1+\cdots+r_{k-1})\bigr)$."
          />,
        ]}
      />
      <P text={r`Apply with $k=2$ under $H_0$: $SS(T)/\sigma^2\sim\chi^2(m-1)$, and $SS(T)$ is independent of $SS(E)$.`} />
    </SceneFrame>
  );
}

export function FStatScene() {
  return (
    <SceneFrame kicker="F test" title="The ANOVA test statistic">
      <Formula tex={r`F=\frac{SS(T)/(m-1)}{SS(E)/(n-m)}.`} />
      <BulletList
        items={[
          <MathText key="a" text="Under $H_0$, $F\sim F(m-1,\,n-m)$." />,
          "When the means differ, $SS(T)$ tends to grow, so large $F$ favors $H_1$.",
          <MathText
            key="c"
            text="Reject at level $\alpha$ if $f\ge F_{\alpha}(m-1,n-m)$."
          />,
          <MathText
            key="d"
            text="$p$-value $=\Pr(F>f)$ under $F(m-1,n-m)$."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function PulloutDataScene() {
  return (
    <SceneFrame kicker="Example" title="Automobile window pullout tests">
      <P text={r`Five stud positions; seven pullout-force trials each. Assume $X_{ij}\sim\mathrm{N}(\mu_i,\sigma^2)$. At $\alpha=0.01$, are the five position means equal?`} />
      <Table
        compact
        headers={["", "Data (7 trials)", r`$\sum x_{ij}$`, r`$\sum x_{ij}^2$`]}
        rows={[
          [r`$x_{1j}$`, "92 90 87 105 86 83 102", "645", "59847"],
          [r`$x_{2j}$`, "100 108 98 110 114 97 94", "721", "74609"],
          [r`$x_{3j}$`, "143 149 138 136 139 120 145", "970", "134936"],
          [r`$x_{4j}$`, "147 144 160 149 152 131 134", "1017", "148367"],
          [r`$x_{5j}$`, "142 155 119 134 133 146 152", "981", "138415"],
          ["Totals", "", "4334", "556174"],
        ]}
      />
    </SceneFrame>
  );
}

export function PulloutAnovaScene() {
  return (
    <SceneFrame kicker="Example" title="ANOVA table and decision">
      <Note text={r`$H_0:\mu_1=\mu_2=\mu_3=\mu_4=\mu_5$, with $m=5$, $n=35$.`} />
      <Table
        compact
        headers={["Source", "SS", "df", "MS", r`$F$`]}
        rows={[
          ["Treatment", "16672.11", "4", "4168.03", "44.20"],
          ["Error", "2828.86", "30", "94.30", ""],
          ["Total", "19500.97", "34", "", ""],
        ]}
      />
      <Formula tex={r`f=\frac{16672.11/4}{2828.86/30}=44.20 > F_{0.01}(4,30)=4.02.`} />
      <P text="Reject $H_0$ at level 0.01: pullout force differs by stud position." />
    </SceneFrame>
  );
}

export function PulloutBoxplotScene() {
  return (
    <SceneFrame kicker="Example" title="What the boxplots suggest">
      <Figure src="/figures/boxplot_ex.png" alt="Boxplots of pullout force by stud position" width="70%" />
      <BulletList
        items={[
          "Positions 1 and 2 look similar to each other.",
          "Positions 3, 4, and 5 look similar to each other, but larger than 1 and 2.",
          "ANOVA rejects overall equality; pairwise follow-ups would refine which means differ.",
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
            text="Assumptions: independent observations, normality, common variance $\sigma^2$."
          />,
          <MathText
            key="b"
            text="$H_0:\mu_1=\cdots=\mu_m$ vs $H_1$: at least two means differ."
          />,
          <MathText
            key="c"
            text="$SS(TO)=SS(T)+SS(E)$, with $SS(E)/\sigma^2\sim\chi^2(n-m)$ always."
          />,
          <MathText
            key="d"
            text="Under $H_0$, $F=\dfrac{SS(T)/(m-1)}{SS(E)/(n-m)}\sim F(m-1,n-m)$."
          />,
          <MathText
            key="e"
            text="Reject for large $f$: $f\ge F_{\alpha}(m-1,n-m)$, or $p$-value $\le\alpha$."
          />,
        ]}
      />
    </SceneFrame>
  );
}
