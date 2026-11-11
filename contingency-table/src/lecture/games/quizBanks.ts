import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const CONTINGENCY_QUIZ_INTRO = r`Check the main ideas: expected cell frequencies, degrees of freedom $(k-1)(h-1)$, homogeneity versus independence sampling, and how a realized $q$ is compared with the critical value.`;

export const CONTINGENCY_QUIZ: QuizQuestion[] = [
  {
    id: "expected",
    prompt: r`In a contingency table with row totals $n_{i\cdot}$ and column totals $n_{\cdot j}$, what is the expected count in cell $(i,j)$ under homogeneity or independence?`,
    choices: [
      {
        text: r`$E_{ij}=n_{i\cdot}n_{\cdot j}/n$`,
      },
      {
        text: r`$E_{ij}=n_{ij}/n$`,
        why: r`That is a sample proportion of one cell, not the expected frequency under the product/margin model.`,
      },
      {
        text: r`$E_{ij}=n/kh$`,
        why: r`Equal expected counts in every cell would require equal margins and equal cell probabilities. The lecture formula uses the observed margins.`,
      },
      {
        text: r`$E_{ij}=n_{i\cdot}/h$`,
        why: r`That ignores the column totals. Both the row and the column margin enter $E_{ij}$.`,
      },
    ],
    answer: 0,
    explain: r`Under $H_0$, the estimated cell probability is $(\text{row proportion})\times(\text{column proportion})$, so $E_{ij}=n\cdot(n_{i\cdot}/n)(n_{\cdot j}/n)=n_{i\cdot}n_{\cdot j}/n$.`,
  },
  {
    id: "df",
    prompt: r`A table has $k=3$ rows and $h=4$ columns. Assuming every $E_{ij}\ge 5$, what is the null reference distribution of Pearson’s $Q$?`,
    choices: [
      {
        text: r`$\chi^2(6)$`,
      },
      {
        text: r`$\chi^2(12)$`,
        why: r`$kh=12$ counts the cells, not the degrees of freedom. One constraint and the estimated margins leave $(k-1)(h-1)$.`,
      },
      {
        text: r`$\chi^2(7)$`,
        why: r`That would be $kh-1-4$, which is not the lecture’s formula.`,
      },
      {
        text: r`$\chi^2(3)$`,
        why: r`$(k-1)(h-1)=(2)(3)=6$, not $3$.`,
      },
    ],
    answer: 0,
    explain: r`Degrees of freedom are $(k-1)(h-1)=(3-1)(4-1)=6$, so $Q\approx\chi^2(6)$ under $H_0$.`,
  },
  {
    id: "sampling",
    prompt: r`Which statement correctly distinguishes the two tests?`,
    choices: [
      {
        text: r`Homogeneity uses independent samples with fixed group sizes; independence uses one sample of size $n$.`,
      },
      {
        text: r`Independence always has more degrees of freedom than homogeneity for the same table size.`,
        why: r`Both use $\mathrm{df}=(k-1)(h-1)$. The arithmetic is the same; the sampling story differs.`,
      },
      {
        text: r`Homogeneity estimates $kh$ free cell probabilities; independence estimates none.`,
        why: r`Under $H_0$, homogeneity estimates the shared category probabilities; independence estimates the two margins.`,
      },
      {
        text: r`Only the independence test uses $E_{ij}=(\text{row total})(\text{column total})/n$.`,
        why: r`The homogeneity test uses the same expected-count formula.`,
      },
    ],
    answer: 0,
    explain: r`Homogeneity: $k$ groups sampled separately with fixed $n_{i\cdot}$. Independence: one multinomial sample of size $n$ cross-classified by two attributes.`,
  },
  {
    id: "medical",
    prompt: r`In the $2\times 2$ medical-care table, $q=7.554$ and $\chi^2_{0.05}(1)=3.841$. What is the correct decision at $\alpha=0.05$?`,
    choices: [
      {
        text: r`Reject $H_0$: men and women do not share the same preference distribution.`,
      },
      {
        text: r`Retain $H_0$, because $7.554$ is less than $200$, the total sample size.`,
        why: r`Compare $q$ with the chi-square critical value, not with $n$.`,
      },
      {
        text: r`Retain $H_0$, because each row has $100$ observations.`,
        why: r`Equal row totals do not imply equal preferences. The test statistic is already larger than the critical value.`,
      },
      {
        text: r`Reject $H_0$ only if every cell has $O_{ij}=E_{ij}$.`,
        why: r`Equality of observed and expected would give $q=0$ and favor $H_0$, not rejection.`,
      },
    ],
    answer: 0,
    explain: r`$7.554>3.841$, so the upper-tailed test rejects homogeneity of preferences at level $0.05$.`,
  },
  {
    id: "college-df",
    prompt: r`Gender (2 levels) × college (5 levels) gives $q=18.93$. Which critical value is used at $\alpha=0.01$?`,
    choices: [
      {
        text: r`$\chi^2_{0.01}(4)=13.28$`,
      },
      {
        text: r`$\chi^2_{0.01}(5)=15.09$`,
        why: r`There are five colleges, but $\mathrm{df}=(2-1)(5-1)=4$, not $5$.`,
      },
      {
        text: r`$\chi^2_{0.01}(9)=21.67$`,
        why: r`$2\times 5-1=9$ would ignore the margin parameters estimated under $H_0$.`,
      },
      {
        text: r`$\chi^2_{0.05}(4)=9.49$`,
        why: r`The example uses significance level $0.01$, so the $0.01$ critical value is required.`,
      },
    ],
    answer: 0,
    explain: r`$\mathrm{df}=(2-1)(5-1)=4$. Since $18.93>13.28$, independence is rejected at $\alpha=0.01$.`,
  },
];
