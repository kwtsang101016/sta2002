import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const DF_CIS_QUIZ_INTRO = r`Check the main ideas from this lecture: what “distribution-free” means, order-statistic CIs for the median and for a general $\pi_p$, exact binomial coverage, and the CLT with continuity correction.`;

export const DF_CIS_QUIZ: QuizQuestion[] = [
  {
    id: "what-df",
    prompt: r`In this lecture, what does a distribution-free CI for a quantile require?`,
    choices: [
      {
        text: r`i.i.d. continuous observations (no named parametric family for $F$)`,
      },
      {
        text: r`That $F$ is exactly normal with known variance`,
        why: r`That would be a parametric normal CI. Distribution-free CIs avoid naming $F$ beyond continuity.`,
      },
      {
        text: r`That the sample size equals $30$`,
        why: r`Exact binomial coverage works for any $n$; CLT approximations are optional for large $n$.`,
      },
      {
        text: r`That $\pi_p$ equals the sample mean`,
        why: r`We target a quantile $\pi_p$, estimated and intervalled via order statistics—not via the mean.`,
      },
    ],
    answer: 0,
    explain: r`Coverage identities such as $\Pr(X_{(i)}<\pi_p<X_{(j)})=\Pr(i\le W\le j-1)$ use only i.i.d. continuous sampling, so the level does not depend on a parametric form for $F$.`,
  },
  {
    id: "minmax-level",
    prompt: r`For continuous i.i.d. data, what is the confidence level of $(X_{(1)},X_{(n)})$ for the median $m=\pi_{1/2}$?`,
    choices: [
      {
        text: r`$1-1/2^{n-1}$`,
      },
      {
        text: r`$1-1/2^{n}$`,
        why: r`Each tail has probability $1/2^{n}$, so the two tails together give $1/2^{n-1}$, and the level is $1-1/2^{n-1}$.`,
      },
      {
        text: r`$n/(n+1)$`,
        why: r`That fraction appears for Uniform order-statistic means, not for this CI level.`,
      },
      {
        text: r`$1-\alpha$ for a user-chosen $\alpha$ independent of $n$`,
        why: r`With fixed endpoints $(1,n)$, the level is locked to $n$: it grows toward $1$ as $n$ increases.`,
      },
    ],
    answer: 0,
    explain: r`$\Pr(X_{(1)}<m<X_{(n)})=1-\Pr(\text{all }X_i>m)-\Pr(\text{all }X_i<m)=1-2\cdot(1/2)^n=1-1/2^{n-1}$. For $n=5$ this is $15/16\approx 94\%$.`,
  },
  {
    id: "median-bin",
    prompt: r`Let $W=\#\{i:X_i<m\}$ for the continuous median $m$. Which statement gives the exact level of $(X_{(i)},X_{(j)})$ with $i<j$?`,
    choices: [
      {
        text: r`$W\sim\mathrm{Bin}(n,1/2)$ and $\Pr(X_{(i)}<m<X_{(j)})=\Pr(i\le W\le j-1)$`,
      },
      {
        text: r`$W\sim\mathrm{Bin}(n,1/2)$ and the level equals $\Pr(W=i)$`,
        why: r`Coverage needs the whole range from $i$ through $j-1$, not a single binomial point mass.`,
      },
      {
        text: r`$W\sim\mathrm{Bin}(n,p)$ with unknown $p$, so the level cannot be computed`,
        why: r`For the median, $p=F(m)=1/2$ is known, so the binomial probabilities are fully determined.`,
      },
      {
        text: r`$W\sim N(0,1)$ exactly for every $n$`,
        why: r`$W$ is exactly binomial; a normal is only an optional large-$n$ approximation.`,
      },
    ],
    answer: 0,
    explain: r`$X_{(i)}<m$ iff at least $i$ observations are $<m$, and $m<X_{(j)}$ iff fewer than $j$ are $<m$, i.e. $W\le j-1$. Continuity gives $\Pr(X_i<m)=1/2$.`,
  },
  {
    id: "general-pip",
    prompt: r`For a general percentile $\pi_p$ ($0<p<1$), which coverage formula is correct?`,
    choices: [
      {
        text: r`With $W\sim\mathrm{Bin}(n,p)$, $\Pr(X_{(i)}<\pi_p<X_{(j)})=\Pr(i\le W\le j-1)$`,
      },
      {
        text: r`Always use $W\sim\mathrm{Bin}(n,1/2)$, even when $p\neq 1/2$`,
        why: r`$\Pr(X_i<\pi_p)=p$, so $W\sim\mathrm{Bin}(n,p)$. The median case $p=1/2$ is the special case.`,
      },
      {
        text: r`$\Pr(X_{(i)}<\pi_p<X_{(j)})=\Pr(W=j)-\Pr(W=i)$`,
        why: r`That is not the event $i\le W\le j-1$; subtract CDFs as $\Pr(W\le j-1)-\Pr(W\le i-1)$ instead.`,
      },
      {
        text: r`The level equals $p$ for every choice of $i$ and $j$`,
        why: r`The level depends on $n$, $p$, and the indices $(i,j)$, not simply on $p$ alone.`,
      },
    ],
    answer: 0,
    explain: r`Define $W=\sum\mathbf{1}(X_i<\pi_p)$. Then $W\sim\mathrm{Bin}(n,p)$ and the same order-statistic counting argument yields $\Pr(i\le W\le j-1)$.`,
  },
  {
    id: "clt-cc",
    prompt: r`Using the CLT with half-unit (continuity) correction, which approximation is used for $\Pr(X_{(i)}<\pi_p<X_{(j)})$?`,
    choices: [
      {
        text: r`$\Phi\!\bigl((j-0.5-np)/\sqrt{np(1-p)}\bigr)-\Phi\!\bigl((i-0.5-np)/\sqrt{np(1-p)}\bigr)$`,
      },
      {
        text: r`$\Phi\!\bigl((j-np)/\sqrt{np(1-p)}\bigr)-\Phi\!\bigl((i-np)/\sqrt{np(1-p)}\bigr)$ with no $\pm 0.5$`,
        why: r`The lecture maps $\Pr(i\le W\le j-1)$ to $\Pr(i-0.5<W<j-0.5)$ before standardizing.`,
      },
      {
        text: r`$\Phi(np)-\Phi(i/j)$`,
        why: r`That expression ignores the binomial mean/variance scaling and the continuity correction.`,
      },
      {
        text: r`Always exactly $1-\alpha$ with $z_{\alpha/2}$ endpoints on the data scale`,
        why: r`Here we approximate the binomial coverage of fixed order-statistic endpoints, not a normal CI for a mean.`,
      },
    ],
    answer: 0,
    explain: r`Approximate $W\sim\mathrm{Bin}(n,p)$ by $N\bigl(np,np(1-p)\bigr)$, then replace the discrete event $i\le W\le j-1$ by the continuity-corrected interval $(i-0.5,j-0.5)$ before applying $\Phi$.`,
  },
];
