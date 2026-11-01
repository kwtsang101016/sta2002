import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const QUANTILES_QUIZ_INTRO = r`Check the main ideas from this lecture: the definition of $\pi_p$, the sample-quantile formula via order statistics, bias of sample medians, and how to read a Q-Q plot.`;

export const QUANTILES_QUIZ: QuizQuestion[] = [
  {
    id: "def-pi-p",
    prompt: r`For a continuous CDF $F$, which statement defines the $p$-th quantile $\pi_p$?`,
    choices: [
      {
        text: r`$F(\pi_p)=\Pr(X\le\pi_p;\,X\sim F)=p$`,
      },
      {
        text: r`$\pi_p=p$ for every continuous $F$`,
        why: r`Only the Uniform$(0,1)$ CDF satisfies $F(p)=p$. In general $\pi_p=F^{-1}(p)$.`,
      },
      {
        text: r`$F(\pi_p)=1-p$`,
        why: r`That would define a $(1-p)$-quantile (e.g. a critical value $z_\alpha$ uses $1-\alpha$).`,
      },
      {
        text: r`$\pi_p$ is always the sample median of any data set of size $n$`,
        why: r`$\pi_p$ is a population quantity. The sample median estimates $\pi_{1/2}$, not every $\pi_p$.`,
      },
    ],
    answer: 0,
    explain: r`By definition $\pi_p$ is the value whose CDF equals $p$. When $F$ is continuous and strictly increasing, $\pi_p=F^{-1}(p)$. Special cases: median ($p=1/2$), quartiles ($p=1/4,3/4$).`,
  },
  {
    id: "normal-quantile",
    prompt: r`If $X\sim N(\mu,\sigma^2)$, which formula gives the $p$-th quantile $\pi_p$?`,
    choices: [
      {
        text: r`$\pi_p=\mu+\sigma\,z_{1-p}$`,
      },
      {
        text: r`$\pi_p=\mu+\sigma\,z_p$`,
        why: r`Our lecture writes $z_\alpha$ as the $(1-\alpha)$-quantile of $N(0,1)$, so $(\pi_p-\mu)/\sigma=z_{1-p}$.`,
      },
      {
        text: r`$\pi_p=\mu/\sigma+z_{1-p}$`,
        why: r`Standardization is $(\pi_p-\mu)/\sigma$, not $\mu/\sigma$.`,
      },
      {
        text: r`$\pi_p=z_p$ for every $\mu$ and $\sigma$`,
        why: r`That holds only for the standard normal $N(0,1)$ with the matching critical-value convention.`,
      },
    ],
    answer: 0,
    explain: r`Standardize: $p=\Pr\bigl(Z\le(\pi_p-\mu)/\sigma\bigr)$ with $Z\sim N(0,1)$. Hence $(\pi_p-\mu)/\sigma=z_{1-p}$ and $\pi_p=\mu+\sigma z_{1-p}$.`,
  },
  {
    id: "sample-quantile",
    prompt: r`For $p\in\bigl[\tfrac{1}{n+1},\tfrac{n}{n+1}\bigr]$ and $k=\lfloor p(n+1)\rfloor$, which expression is the sample $p$-th quantile used in this lecture?`,
    choices: [
      {
        text: r`$\hat\pi_p=x_{(k)}+\bigl(p(n+1)-k\bigr)\bigl(x_{(k+1)}-x_{(k)}\bigr)$`,
      },
      {
        text: r`$\hat\pi_p=x_{(k)}$ for every $p$ in that interval`,
        why: r`Only at the grid points $p=k/(n+1)$ do we set $\hat\pi_p=x_{(k)}$. Between grid points we interpolate.`,
      },
      {
        text: r`$\hat\pi_p=\dfrac{x_{(1)}+x_{(n)}}{2}$ for every $p$`,
        why: r`That midrange ignores $p$ and the ordered sample structure.`,
      },
      {
        text: r`$\hat\pi_p=x_{(np)}$ with $np$ always an integer`,
        why: r`Our convention uses $k=\lfloor p(n+1)\rfloor$ and linear interpolation between $x_{(k)}$ and $x_{(k+1)}$.`,
      },
    ],
    answer: 0,
    explain: r`Because $\mathbb{E}\bigl(F(X_{(k)})\bigr)=k/(n+1)$, we take $\hat\pi_{k/(n+1)}=x_{(k)}$ and interpolate linearly between neighbouring order statistics when $p$ falls between those fractions.`,
  },
  {
    id: "sample-median",
    prompt: r`Which description matches the sample median $\hat\pi_{1/2}$ in this lecture?`,
    choices: [
      {
        text: r`Odd $n$: $X_{((n+1)/2)}$; even $n$: average of $X_{(n/2)}$ and $X_{(n/2+1)}$`,
      },
      {
        text: r`Always $X_{(n)}$ regardless of $n$`,
        why: r`$X_{(n)}$ is the sample maximum, not the median.`,
      },
      {
        text: r`Always $X_{(1)}$ regardless of $n$`,
        why: r`$X_{(1)}$ is the sample minimum.`,
      },
      {
        text: r`Odd $n$: average of two middle values; even $n$: a single middle order statistic`,
        why: r`That swaps the odd/even cases.`,
      },
    ],
    answer: 0,
    explain: r`When $n$ is odd, $p(n+1)=(n+1)/2$ is an integer, so $\hat\pi_{1/2}=X_{((n+1)/2)}$. When $n$ is even, $k=\lfloor(n+1)/2\rfloor=n/2$ and interpolation averages the two central order statistics.`,
  },
  {
    id: "bias-qq",
    prompt: r`Which statement is correct?`,
    choices: [
      {
        text: r`In general $\mathbb{E}\bigl(F(X_{(k)})\bigr)=k/(n+1)$ does not imply $\mathbb{E}(X_{(k)})=\pi_{k/(n+1)}$; a Q-Q plot near $y=x$ is a visual check, not a formal test`,
      },
      {
        text: r`Sample quantiles are always unbiased for $\pi_p$`,
        why: r`The Exp(1) median example shows $\mathbb{E}[X_{(3)}]\approx 0.78\neq\ln 2\approx 0.69$.`,
      },
      {
        text: r`A Q-Q plot hugging $y=x$ is a formal level-$\alpha$ hypothesis test`,
        why: r`Q-Q plots are diagnostic visualizations. Formal tests need an explicit rejection rule and Type I error control.`,
      },
      {
        text: r`$\mathbb{E}(X_{(k)})=F^{-1}\!\bigl(k/(n+1)\bigr)$ for every continuous $F$`,
        why: r`Expectation does not pass inside a nonlinear $F^{-1}$. Only the probability-scale identity $\mathbb{E}[F(X_{(k)})]=k/(n+1)$ is general.`,
      },
    ],
    answer: 0,
    explain: r`Unbiasedness on the probability scale need not transfer to the data scale. Q-Q plots compare sample quantiles $x_{(i)}$ to theoretical quantiles $F^{-1}(i/(n+1))$; points near the diagonal suggest a plausible fit, but that is not itself a formal test.`,
  },
];
