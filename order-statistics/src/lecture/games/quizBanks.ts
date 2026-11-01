import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const OS_QUIZ_INTRO = r`Check the main ideas from this lecture: definition of $X_{(k)}$, CDF/PDF via binomial counts, Uniform–Beta, and the probability integral transform.`;

export const OS_QUIZ: QuizQuestion[] = [
  {
    id: "def-xk",
    prompt: r`Let $X_1,\ldots,X_n$ be i.i.d. For $1\le k\le n$, what is the order statistic $X_{(k)}$?`,
    choices: [
      {
        text: r`The $k$th smallest among $X_1,\ldots,X_n$`,
      },
      {
        text: r`The sample mean of the first $k$ observations`,
        why: r`Order statistics sort the whole sample; they are not running means.`,
      },
      {
        text: r`The $k$th largest among $X_1,\ldots,X_n$`,
        why: r`That would be $X_{(n-k+1)}$. By definition $X_{(k)}$ is the $k$th smallest.`,
      },
      {
        text: r`Always equal to the population $k/(n+1)$-quantile`,
        why: r`$X_{(k)}$ is a random estimator related to that quantile, not identically equal to it.`,
      },
    ],
    answer: 0,
    explain: r`$X_{(1)}\le\cdots\le X_{(n)}$ is the sorted sample, so $X_{(k)}$ is the $k$th smallest. In particular $X_{(1)}=\min$ and $X_{(n)}=\max$.`,
  },
  {
    id: "cdf-max",
    prompt: r`If $X_1,\ldots,X_n$ are i.i.d. with continuous CDF $F$, which formula gives the CDF of $X_{(n)}=\max\{X_1,\ldots,X_n\}$?`,
    choices: [
      {
        text: r`$F_{X_{(n)}}(x)=F(x)^n$`,
      },
      {
        text: r`$F_{X_{(n)}}(x)=1-[1-F(x)]^n$`,
        why: r`That is the CDF of the minimum $X_{(1)}$, not the maximum.`,
      },
      {
        text: r`$F_{X_{(n)}}(x)=n F(x)[1-F(x)]^{n-1}$`,
        why: r`That expression (times $f(x)$) is a PDF form for extremes, not the CDF of the max.`,
      },
      {
        text: r`$F_{X_{(n)}}(x)=F(x)/n$`,
        why: r`The max is stochastically larger than a single $X_i$; its CDF is $F^n$, not $F/n$.`,
      },
    ],
    answer: 0,
    explain: r`$X_{(n)}\le x$ iff every $X_i\le x$. Independence gives $\Pr(X_{(n)}\le x)=F(x)^n$.`,
  },
  {
    id: "bin-cdf",
    prompt: r`Let $W=\#\{i:X_i\le x\}$. Under continuous i.i.d. sampling, which statement is correct?`,
    choices: [
      {
        text: r`$W\sim\mathrm{Bin}(n,F(x))$ and $F_{X_{(k)}}(x)=\Pr(W\ge k)$`,
      },
      {
        text: r`$W\sim\mathrm{Bin}(n,F(x))$ and $F_{X_{(k)}}(x)=\Pr(W\le k)$`,
        why: r`$X_{(k)}\le x$ means at least $k$ observations are $\le x$, i.e. $W\ge k$, not $W\le k$.`,
      },
      {
        text: r`$W\sim\mathrm{Poi}(F(x))$ and $F_{X_{(k)}}(x)=\Pr(W=k)$`,
        why: r`Each indicator is Bernoulli with success probability $F(x)$, so $W$ is binomial, not Poisson.`,
      },
      {
        text: r`$W\sim\mathrm{Bin}(k,F(x))$ with $k$ fixed by the order index`,
        why: r`There are $n$ sample points, so $W$ has $n$ trials.`,
      },
    ],
    answer: 0,
    explain: r`Each $X_i$ falls at most $x$ independently with probability $F(x)$. Then $X_{(k)}\le x$ iff at least $k$ of the $X_i$ are $\le x$.`,
  },
  {
    id: "unif-beta",
    prompt: r`If $U_1,\ldots,U_n$ are i.i.d. Uniform$(0,1)$, what is the distribution of $U_{(k)}$?`,
    choices: [
      {
        text: r`$\mathrm{Beta}(k,\ n-k+1)$`,
      },
      {
        text: r`$\mathrm{Beta}(n-k+1,\ k)$`,
        why: r`Those parameters are swapped. Mean would be $(n-k+1)/(n+1)$ instead of $k/(n+1)$.`,
      },
      {
        text: r`$\mathrm{Uniform}(0,1)$ for every $k$`,
        why: r`Only a single $U_i$ is Uniform$(0,1)$. Order statistics are Beta (more peaked near $k/(n+1)$).`,
      },
      {
        text: r`$\mathrm{Bin}(n,k/(n+1))$`,
        why: r`$U_{(k)}$ is continuous on $(0,1)$; binomial is discrete.`,
      },
    ],
    answer: 0,
    explain: r`The Uniform order-statistic PDF matches the Beta$(k,n-k+1)$ density, so $\mathbb{E}(U_{(k)})=k/(n+1)$.`,
  },
  {
    id: "pit",
    prompt: r`Assume $F$ is continuous and strictly increasing. Which conclusion follows from the probability integral transform?`,
    choices: [
      {
        text: r`$F(X_i)\sim U(0,1)$ i.i.d., and $F(X_{(k)})\sim\mathrm{Beta}(k,n-k+1)$`,
      },
      {
        text: r`$F(X_{(k)})$ is always Uniform$(0,1)$`,
        why: r`$F(X_i)$ is Uniform; $F(X_{(k)})$ is the $k$th Uniform order statistic, hence Beta.`,
      },
      {
        text: r`$X_{(k)}$ itself is Uniform$(0,1)$ for any continuous $F$`,
        why: r`Only after applying $F$ (or when $F$ is already Uniform) do we get Uniform margins.`,
      },
      {
        text: r`$F(X_i)$ has the same distribution as $X_i$`,
        why: r`PIT maps $X_i$ to Uniform$(0,1)$; that equals the law of $X_i$ only in the Uniform case.`,
      },
    ],
    answer: 0,
    explain: r`PIT gives $U_i=F(X_i)\sim U(0,1)$. Strictly increasing $F$ preserves order, so $F(X_{(k)})=U_{(k)}\sim\mathrm{Beta}(k,n-k+1)$.`,
  },
];
