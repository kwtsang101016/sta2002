import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const TWO_WAY_ANOVA_QUIZ_INTRO = r`Check the main ideas: the additive two-way model, the partition $SS(TO)=SS(A)+SS(B)+SS(E)$, the $F_A$/$F_B$ tests, interaction with $c>1$, and the order of testing.`;

export const TWO_WAY_ANOVA_QUIZ: QuizQuestion[] = [
  {
    id: "additive-mean",
    prompt: r`In the one-observation-per-cell additive model, which form is assumed for the cell means?`,
    choices: [
      {
        text: r`$\mu_{ij}=\mu+\alpha_i+\beta_j$ with $\sum_i\alpha_i=0$ and $\sum_j\beta_j=0$`,
      },
      {
        text: r`$\mu_{ij}=\mu+\alpha_i+\beta_j+\gamma_{ij}$ with no constraints`,
        why: r`Interaction terms appear only when $c>1$; the additive case has no $\gamma_{ij}$.`,
      },
      {
        text: r`$\mu_{ij}=\alpha_i\beta_j$`,
        why: r`The lecture uses an additive decomposition, not a product of effects.`,
      },
      {
        text: r`$\mu_{ij}=\mu$ for every cell`,
        why: r`That would force both row and column effects to vanish; it is a special case of $H_A\cap H_B$, not the model itself.`,
      },
    ],
    answer: 0,
    explain: r`The additive model is $\mu_{ij}=\mu+\alpha_i+\beta_j$ with the usual zero-sum constraints on $\alpha_i$ and $\beta_j$.`,
  },
  {
    id: "partition",
    prompt: r`With one observation per cell, which identity holds?`,
    choices: [
      {
        text: r`$SS(TO)=SS(A)+SS(B)+SS(E)$`,
      },
      {
        text: r`$SS(TO)=SS(A)+SS(B)$ only`,
        why: r`There is also a residual $SS(E)$ with $(a-1)(b-1)$ degrees of freedom.`,
      },
      {
        text: r`$SS(TO)=SS(A)+SS(AB)+SS(E)$`,
        why: r`Without replicates, interaction is absorbed into error; $SS(AB)$ appears when $c>1$.`,
      },
      {
        text: r`$SS(E)=SS(A)\cdot SS(B)$`,
        why: r`Sums of squares add; they are not multiplied.`,
      },
    ],
    answer: 0,
    explain: r`Total variation splits into row, column, and residual pieces.`,
  },
  {
    id: "fa-dist",
    prompt: r`Under $H_A:\alpha_1=\cdots=\alpha_a=0$ (one observation per cell), what is the null law of $F_A$?`,
    choices: [
      {
        text: r`$F(a-1,(a-1)(b-1))$`,
      },
      {
        text: r`$F(a,b)$`,
        why: r`Numerator df is $a-1$ and denominator df is $(a-1)(b-1)$, not $a$ and $b$.`,
      },
      {
        text: r`$F(b-1,(a-1)(b-1))$`,
        why: r`That is the null law of $F_B$, not $F_A$.`,
      },
      {
        text: r`$\chi^2(ab-1)$`,
        why: r`That is the law of $SS(TO)/\sigma^2$ under both nulls, not of the $F$ ratio.`,
      },
    ],
    answer: 0,
    explain: r`$F_A=\mathrm{MS}(A)/\mathrm{MS}(E)$ has numerator df $a-1$ and denominator df $(a-1)(b-1)$ under $H_A$.`,
  },
  {
    id: "cars",
    prompt: r`In the cars–gasoline example, $f_B=15$ and $F_{0.01}(3,6)=9.78$. Conclusion at $\alpha=0.01$?`,
    choices: [
      {
        text: r`Reject $H_B$: the four gasoline brands do not all give the same mileage.`,
      },
      {
        text: r`Retain $H_B$, because $15>9.78$`,
        why: r`Exceeding the critical value means reject, not retain.`,
      },
      {
        text: r`The test is invalid because $SS(E)=4$ is small`,
        why: r`A small error SS (relative to SS(B)) is exactly what produces a large $F$ and a rejection.`,
      },
      {
        text: r`Only cars can be tested; brands require $c>1$`,
        why: r`With one observation per cell we can still test both $H_A$ and $H_B$; interaction needs $c>1$.`,
      },
    ],
    answer: 0,
    explain: r`$15>9.78$, so the upper-tailed $F_B$ test rejects equal brand effects at level $0.01$.`,
  },
  {
    id: "interaction-order",
    prompt: r`With $c>1$ observations per cell, which testing order is recommended?`,
    choices: [
      {
        text: r`Test $H_{AB}$ first; interpret $H_A$ and $H_B$ only when interaction is not significant`,
      },
      {
        text: r`Always test $H_A$ and $H_B$ first, then interaction`,
        why: r`Interaction changes how main effects should be interpreted; test $H_{AB}$ first.`,
      },
      {
        text: r`Skip $H_{AB}$ if $SS(A)$ is large`,
        why: r`Large main-effect SS does not remove the need to check interaction.`,
      },
      {
        text: r`Interaction can be tested only when $a=b$`,
        why: r`The $F_{AB}$ test requires $c>1$, not equal numbers of levels.`,
      },
    ],
    answer: 0,
    explain: r`Rejecting $H_{AB}$ means the additive main-effect story is incomplete; test interaction first.`,
  },
];
