import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const SW_QUIZ_INTRO = r`Check the main ideas: the sign test’s binomial null, when Wilcoxon needs symmetry, how signed ranks are formed, the normal variance formula, and how to handle ties.`;

export const SW_QUIZ: QuizQuestion[] = [
  {
    id: "sign-null",
    prompt: r`For continuous i.i.d. data and $H_0:m=m_0$, what is the null distribution of the sign statistic $W=\sum_{i=1}^n\mathbf{1}(X_i<m_0)$?`,
    choices: [
      {
        text: r`$W\sim\mathrm{Bin}(n,1/2)$`,
      },
      {
        text: r`$W\sim\mathrm{Bin}(n,m_0)$`,
        why: r`$m_0$ is a data-scale constant, not a success probability. Continuity gives $\Pr(X_i<m_0)=1/2$ under $H_0$.`,
      },
      {
        text: r`$W\sim N(0,1)$ exactly for every $n$`,
        why: r`The exact null is binomial; a normal approximation is optional and not exact for small $n$.`,
      },
      {
        text: r`$W\sim\mathrm{Poisson}(n/2)$`,
        why: r`Each indicator is Bernoulli($1/2$), so the sum is binomial, not Poisson.`,
      },
    ],
    answer: 0,
    explain: r`Under $H_0$, $m_0$ is the median of a continuous law, so each $\mathbf{1}(X_i<m_0)$ is Bernoulli($1/2$) and independent across $i$.`,
  },
  {
    id: "wilcoxon-assume",
    prompt: r`Which assumption is needed for the Wilcoxon signed-rank test (beyond i.i.d. continuous sampling)?`,
    choices: [
      {
        text: r`The population distribution is symmetric (about its median)`,
      },
      {
        text: r`The population is exactly normal with known variance`,
        why: r`Wilcoxon is distribution-free under symmetry; normality is not required.`,
      },
      {
        text: r`Only that $F$ is continuous — symmetry is never used`,
        why: r`The sign test needs only continuity. Wilcoxon uses symmetry so that signs of $X_k-m_0$ are fair under $H_0$.`,
      },
      {
        text: r`The sample size must be even`,
        why: r`The procedure works for any $n$ (after deleting zeros when $x_k=m_0$).`,
      },
    ],
    answer: 0,
    explain: r`Symmetry about $m$ makes $\mathrm{sign}(X_k-m)$ equally likely to be $\pm 1$ under $H_0:m=m_0$, which yields the signed-integer null for $W$.`,
  },
  {
    id: "signed-rank-def",
    prompt: r`How is the Wilcoxon signed-rank statistic formed?`,
    choices: [
      {
        text: r`Rank $|X_k-m_0|$, then multiply each rank by $\mathrm{sign}(X_k-m_0)$ and sum`,
      },
      {
        text: r`Sum only the positive differences $X_k-m_0$`,
        why: r`That ignores ranks. Wilcoxon combines ranks of absolute differences with their signs.`,
      },
      {
        text: r`Count how many $X_k$ exceed the sample mean`,
        why: r`That is closer to a sign-type count about a different center, not signed ranks about $m_0$.`,
      },
      {
        text: r`Replace each $X_k$ by its order statistic $X_{(k)}$ and sum`,
        why: r`Order statistics alone do not encode signs relative to $m_0$.`,
      },
    ],
    answer: 0,
    explain: r`$W=\sum_k\mathrm{sign}(X_k-m_0)R_k$ with $R_k=\mathrm{rank}(|X_k-m_0|)$. Large positive $W$ favors alternatives with median above $m_0$.`,
  },
  {
    id: "wilcoxon-var",
    prompt: r`Under $H_0$, the normal approximation uses which variance for $W$?`,
    choices: [
      {
        text: r`$\mathrm{Var}(W)=\dfrac{n(n+1)(2n+1)}{6}$`,
      },
      {
        text: r`$\mathrm{Var}(W)=n/4$`,
        why: r`That is $\mathrm{Var}$ of a $\mathrm{Bin}(n,1/2)$ sign count, not of the signed-rank sum.`,
      },
      {
        text: r`$\mathrm{Var}(W)=n(n+1)/2$`,
        why: r`$\sum k=n(n+1)/2$ is a sum of ranks, not the sum of $k^2$ that appears for signed ranks.`,
      },
      {
        text: r`$\mathrm{Var}(W)=1$ after studentization is unnecessary`,
        why: r`We standardize by $\sqrt{n(n+1)(2n+1)/6}$ before referring to $N(0,1)$.`,
      },
    ],
    answer: 0,
    explain: r`Represent $W$ as $\sum V_k$ with $V_k=\pm k$ equally likely. Then $\mathrm{Var}(V_k)=k^2$ and $\sum_{k=1}^n k^2=n(n+1)(2n+1)/6$.`,
  },
  {
    id: "ties",
    prompt: r`In the Wilcoxon procedure, how should ties be handled?`,
    choices: [
      {
        text: r`Drop observations with $x_k=m_0$; assign average ranks when $|x_k-m_0|$ values tie`,
      },
      {
        text: r`Always keep $x_k=m_0$ and give them rank $0$`,
        why: r`Zeros contribute no signed-rank information; the lecture deletes them and reduces $n$.`,
      },
      {
        text: r`Break every absolute-difference tie by coin flip only — never average ranks`,
        why: r`The standard course rule for tied $|x_k-m_0|$ is average ranks (e.g. ranks $2$ and $3$ → $2.5$).`,
      },
      {
        text: r`Ties mean the test cannot be used at all`,
        why: r`Ties are handled routinely by deletion / average ranks; the test remains usable.`,
      },
    ],
    answer: 0,
    explain: r`Continuous theory forbids ties almost surely, but practice needs rules: remove exact $m_0$ matches; midranks for tied absolute deviations.`,
  },
];
