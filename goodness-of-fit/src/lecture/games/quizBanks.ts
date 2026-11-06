import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const GOF_QUIZ_INTRO = r`Check the main ideas: the one-cell chi-square, why the degrees of freedom are $k-1$, the $E_i\ge 5$ rule, what changes after maximum likelihood, and how a realized $q_k$ is compared with the critical value.`;

export const GOF_QUIZ: QuizQuestion[] = [
  {
    id: "one-cell",
    prompt: r`For $Y\sim\mathrm{Bin}(n,p)$ with $n$ large, which statistic is approximately $\chi^2(1)$?`,
    choices: [
      {
        text: r`$Q(p)=(Y-np)^2/[np(1-p)]$`,
      },
      {
        text: r`$(Y-np)/\sqrt{np(1-p)}$`,
        why: r`That standardized count is approximately $\mathrm{N}(0,1)$. Squaring it produces the chi-square statistic.`,
      },
      {
        text: r`$(Y-np)^2/n$`,
        why: r`The denominator of the one-cell statistic is the null variance $np(1-p)$, not the sample size alone.`,
      },
      {
        text: r`$\sum_{i=1}^{k}(O_i-E_i)/E_i$`,
        why: r`Pearson’s statistic squares each difference. An unsquared sum of relative errors is not $\chi^2(1)$.`,
      },
    ],
    answer: 0,
    explain: r`$(Y-np)/\sqrt{np(1-p)}\approx\mathrm{N}(0,1)$, and the square of a standard normal is $\chi^2(1)$.`,
  },
  {
    id: "df-known",
    prompt: r`The cell probabilities are fully specified, there are $k$ bins, and every $E_i\ge 5$. What is the null reference distribution of $Q_k$?`,
    choices: [
      {
        text: r`$\chi^2(k-1)$`,
      },
      {
        text: r`$\chi^2(k)$`,
        why: r`The counts sum to $n$, so only $k-1$ of them are free.`,
      },
      {
        text: r`$\chi^2(k-2)$`,
        why: r`An extra degree of freedom is lost only when a parameter is estimated from the same data. None is estimated here.`,
      },
      {
        text: r`$\mathrm{N}(0,1)$`,
        why: r`$Q_k$ is a sum of squared standardized counts, so the reference law is chi-square, not standard normal.`,
      },
    ],
    answer: 0,
    explain: r`$Y_k=n-Y_1-\cdots-Y_{k-1}$, so Pearson’s theorem gives $Q_k\approx\chi^2(k-1)$ when $n$ is large and $np_i\ge 5$.`,
  },
  {
    id: "sparse-bins",
    prompt: r`A proposed binning has some expected counts below 5. What should be done before comparing $q_k$ with a chi-square critical value?`,
    choices: [
      {
        text: r`Combine adjacent bins until every expected count is at least 5`,
      },
      {
        text: r`Delete the observations in the sparse bins and keep the original degrees of freedom`,
        why: r`Deleting observations changes the sample. The notes pool sparse bins and then recompute $k$.`,
      },
      {
        text: r`Keep the bins and use $\chi^2(k)$ instead of $\chi^2(k-1)$`,
        why: r`The condition $E_i\ge 5$ is about the quality of the approximation, not a change of the critical-value formula.`,
      },
      {
        text: r`Replace each small $E_i$ by 5 and leave $O_i$ unchanged`,
        why: r`Expected counts come from $np_{i0}$ (or $np_i(\hat\theta)$). They are not rounded up to 5.`,
      },
    ],
    answer: 0,
    explain: r`The chi-square approximation used in this lecture needs $E_i\ge 5$ in every bin. Pooling sparse cells, as in the 911 example, restores that condition.`,
  },
  {
    id: "estimated-df",
    prompt: r`The model has $d$ unknown parameters, replaced by their MLEs, and the fitted binning has $k$ cells with every fitted $E_i\ge 5$. Which critical value is used at level $\alpha$?`,
    choices: [
      {
        text: r`$\chi^2_{\alpha}(k-1-d)$`,
      },
      {
        text: r`$\chi^2_{\alpha}(k-1)$`,
        why: r`Each parameter estimated from these data removes one more degree of freedom.`,
      },
      {
        text: r`$\chi^2_{\alpha}(k-d)$`,
        why: r`The “$-1$” from $\sum Y_i=n$ is still there, and then $d$ further degrees of freedom are lost.`,
      },
      {
        text: r`$\chi^2_{\alpha}(d)$`,
        why: r`$d$ is the number of estimated parameters, not the degrees of freedom of $Q_k$.`,
      },
    ],
    answer: 0,
    explain: r`The lecture’s rule is $Q_k(\hat\theta)\approx\chi^2(k-1-d)$. For the barium counts, $k=6$ and $d=1$, so the reference is $\chi^2(4)$.`,
  },
  {
    id: "decision",
    prompt: r`Four coins give $q_5=4.47$, and $\chi^2_{0.05}(4)=9.488$. Which conclusion matches the decision rule?`,
    choices: [
      {
        text: r`Do not reject $H_0$ at $\alpha=0.05$, because $4.47<9.488$`,
      },
      {
        text: r`Reject $H_0$, because $4.47>\mathbb{E}(Q_5)=4$`,
        why: r`The mean of $\chi^2(4)$ is 4, but the 5% critical value is 9.488. Being slightly above the mean is not a rejection.`,
      },
      {
        text: r`Reject $H_0$, because the $p$-value $0.346$ is larger than $0.05$`,
        why: r`A large $p$-value is compatible with $H_0$. Reject when the $p$-value is at most $\alpha$.`,
      },
      {
        text: r`Compare $4.47$ with $\chi^2_{0.05}(5)$, because there are five cells`,
        why: r`Five fully specified cells give $5-1=4$ degrees of freedom. No parameter was estimated.`,
      },
    ],
    answer: 0,
    explain: r`Reject only when $q_k\ge\chi^2_{\alpha}(q)$. Here $4.47<9.488$, and the upper-tail probability under $\chi^2(4)$ is about $0.346$.`,
  },
];
