import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const ANOVA_QUIZ_INTRO = r`Check the main ideas: the one-way ANOVA model, the partition $SS(TO)=SS(T)+SS(E)$, degrees of freedom, the $F$ ratio, and how a realized $f$ is compared with the critical value.`;

export const ANOVA_QUIZ: QuizQuestion[] = [
  {
    id: "assumptions",
    prompt: r`Which set of assumptions is used for classical one-way ANOVA in this lecture?`,
    choices: [
      {
        text: r`Independent normal samples with a common variance $\sigma^2$`,
      },
      {
        text: r`Independent samples with arbitrary variances and no normality`,
        why: r`The $F$ reference distribution here needs normality and a shared $\sigma^2$.`,
      },
      {
        text: r`Paired observations across all $m$ groups`,
        why: r`One-way ANOVA uses independent samples from each treatment, not pairing.`,
      },
      {
        text: r`Only that the group medians are equal`,
        why: r`The hypotheses concern means $\mu_i$, under a normal model.`,
      },
    ],
    answer: 0,
    explain: r`The model is $X_{ij}\sim\mathrm{N}(\mu_i,\sigma^2)$ with independent samples and a shared $\sigma^2$.`,
  },
  {
    id: "partition",
    prompt: r`Which identity is the ANOVA decomposition?`,
    choices: [
      {
        text: r`$SS(TO)=SS(T)+SS(E)$`,
      },
      {
        text: r`$SS(TO)=SS(T)-SS(E)$`,
        why: r`Both treatment and error sums of squares are nonnegative contributions to the total.`,
      },
      {
        text: r`$SS(E)=SS(T)+SS(TO)$`,
        why: r`The total is the sum of between-group and within-group pieces.`,
      },
      {
        text: r`$SS(T)=n\cdot SS(E)$`,
        why: r`There is no such scaling identity; $SS(T)$ and $SS(E)$ are separate quadratic forms.`,
      },
    ],
    answer: 0,
    explain: r`$SS(TO)$ splits into within-group error $SS(E)$ and between-group treatment $SS(T)$.`,
  },
  {
    id: "df",
    prompt: r`There are $m$ groups and $n$ total observations. Under $H_0$, what is the null distribution of the ANOVA $F$?`,
    choices: [
      {
        text: r`$F(m-1,\,n-m)$`,
      },
      {
        text: r`$F(m,\,n)$`,
        why: r`Treatment df is $m-1$ and error df is $n-m$, not $m$ and $n$.`,
      },
      {
        text: r`$\chi^2(n-1)$`,
        why: r`That is the law of $SS(TO)/\sigma^2$ under $H_0$, not of the $F$ ratio.`,
      },
      {
        text: r`$t(n-m)$`,
        why: r`A two-sample $t$ is the $m=2$ special case; for general $m$ the reference is $F$.`,
      },
    ],
    answer: 0,
    explain: r`$SS(T)/\sigma^2\sim\chi^2(m-1)$ and $SS(E)/\sigma^2\sim\chi^2(n-m)$ are independent under $H_0$, so their mean-square ratio is $F(m-1,n-m)$.`,
  },
  {
    id: "when-reject",
    prompt: r`When do we reject $H_0:\mu_1=\cdots=\mu_m$ at level $\alpha$?`,
    choices: [
      {
        text: r`When the realized $f$ satisfies $f\ge F_{\alpha}(m-1,n-m)$`,
      },
      {
        text: r`When $f$ is smaller than $1$`,
        why: r`Small $f$ means the between-group mean square is not large relative to error; that favors $H_0$.`,
      },
      {
        text: r`When $SS(E)$ exceeds $SS(T)$`,
        why: r`Large error relative to treatment does not favor unequal means.`,
      },
      {
        text: r`Only when every pairwise two-sample test rejects`,
        why: r`ANOVA is a single overall test; it does not require every pair to differ.`,
      },
    ],
    answer: 0,
    explain: r`Large $F$ favors unequal means. The critical region is upper-tailed against $F_{\alpha}(m-1,n-m)$.`,
  },
  {
    id: "pullout",
    prompt: r`In the pullout example, $f=44.20$ and $F_{0.01}(4,30)=4.02$. What is the conclusion at $\alpha=0.01$?`,
    choices: [
      {
        text: r`Reject $H_0$: the five position means are not all equal.`,
      },
      {
        text: r`Retain $H_0$, because $44.20$ is larger than $4.02$`,
        why: r`Larger than the critical value means reject, not retain.`,
      },
      {
        text: r`Retain $H_0$, because error df is $30$`,
        why: r`The error degrees of freedom enter the critical value, which is already $4.02$; $f$ still exceeds it.`,
      },
      {
        text: r`The test is inconclusive until every pairwise CI is checked`,
        why: r`The overall ANOVA decision is already a rejection at level $0.01$.`,
      },
    ],
    answer: 0,
    explain: r`$44.20>4.02$, so the upper-tailed $F$ test rejects equality of the five means at level $0.01$.`,
  },
];
