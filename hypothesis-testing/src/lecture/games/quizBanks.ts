import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const ERRORS_QUIZ_INTRO = r`Steel bars: $X_1,\ldots,X_n\overset{\text{i.i.d.}}{\sim}N(\mu,36)$. Answer each question, read the explanation, then move on.`;

export const ERRORS_QUIZ: QuizQuestion[] = [
  {
    id: "null-alt",
    prompt: r`Process II is hoped to raise the mean breaking strength above the current $50$. Which pair of hypotheses is appropriate?`,
    choices: [
      { text: r`$H_0:\mu=50$ versus $H_1:\mu>50$` },
      {
        text: r`$H_0:\mu>50$ versus $H_1:\mu=50$`,
        why: r`The claim we want evidence for (an improvement) belongs in $H_1$, not $H_0$.`,
      },
      {
        text: r`$H_0:\bar{X}=50$ versus $H_1:\bar{X}>50$`,
        why: r`Hypotheses are statements about the population parameter $\mu$. The sample mean $\bar{X}$ is what we observe, so there is nothing to test about it.`,
      },
      {
        text: r`$H_0:\mu\neq 50$ versus $H_1:\mu=50$`,
        why: r`$H_0$ is the status quo ("no change"), so the equality goes in $H_0$.`,
      },
    ],
    answer: 0,
    explain: r`$H_0$ is the default claim we keep unless the data speak strongly against it (no improvement, $\mu=50$). $H_1$ is the claim we are looking for evidence of ($\mu>50$). Both are statements about the unknown parameter $\mu$.`,
  },
  {
    id: "composite",
    prompt: r`Which of these hypotheses is composite?`,
    choices: [
      { text: r`$H_0:\mu=50$`, why: r`It allows only one value of $\mu$, so it is simple.` },
      { text: r`$H_1:\mu=55$`, why: r`It allows only one value of $\mu$, so it is simple.` },
      { text: r`$H_1:\mu>55$` },
      {
        text: r`$H_0:\mu=\mu_0$ for a given number $\mu_0$`,
        why: r`$\mu_0$ is one fixed number, so this is still a single value: simple.`,
      },
    ],
    answer: 2,
    explain: r`A hypothesis is simple if it pins $\mu$ down to one value and composite if it allows a range of values. $\mu>55$ allows infinitely many values.`,
  },
  {
    id: "type1",
    prompt: r`Test $H_0:\mu=50$ against $H_1:\mu=55$. In words, what is a Type I error here?`,
    choices: [
      { text: r`Concluding that process II improves the strength when in fact $\mu=50$.` },
      {
        text: r`Concluding there is no improvement when in fact $\mu=55$.`,
        why: r`That is failing to reject a false $H_0$, which is a Type II error.`,
      },
      {
        text: r`Observing $\bar{x}\geq 53$ when in fact $\mu=55$.`,
        why: r`If $\mu=55$, then $H_1$ is true and rejecting $H_0$ is the correct decision.`,
      },
      {
        text: r`Using the wrong value of $\sigma$ in the calculation.`,
        why: "That is a modelling or calculation mistake. Type I and Type II errors are about the decision when the model is correct.",
      },
    ],
    answer: 0,
    explain: r`Type I error = reject $H_0$ when $H_0$ is true. Here that means declaring an improvement that is not there: a false alarm.`,
  },
  {
    id: "type2-prob",
    prompt: r`With $n=16$ and critical region $C=\{\bar{x}\geq 53\}$, which expression is the probability of a Type II error?`,
    choices: [
      { text: r`$\Pr(\bar{X}<53;\ \mu=55)$` },
      {
        text: r`$\Pr(\bar{X}\geq 53;\ \mu=50)$`,
        why: r`This is rejecting $H_0$ when $H_0$ is true: the Type I error probability $\alpha$.`,
      },
      {
        text: r`$\Pr(\bar{X}<53;\ \mu=50)$`,
        why: r`This is retaining $H_0$ when it is true, which is a correct decision (probability $1-\alpha$).`,
      },
      {
        text: r`$\Pr(\bar{X}\geq 53;\ \mu=55)$`,
        why: r`This is rejecting $H_0$ when $H_1$ is true, a correct decision. Its probability is $1-\beta$ (the power).`,
      },
    ],
    answer: 0,
    explain: r`Type II error = fail to reject $H_0$ when $H_1$ is true. We fail to reject when $\bar{X}<53$, and "$H_1$ true" means $\mu=55$. So $\beta=\Pr(\bar{X}<53;\mu=55)=\Pr(Z<-1.33)=0.0913$.`,
  },
  {
    id: "alpha-meaning",
    prompt: r`A test has significance level $\alpha=0.05$. Which statement is correct?`,
    choices: [
      { text: r`If $H_0$ is true, the test wrongly rejects $H_0$ with probability $0.05$.` },
      {
        text: r`If we reject $H_0$, the probability that $H_0$ is true is $0.05$.`,
        why: r`This reverses the conditioning. $\alpha$ is $\Pr(\text{reject}\mid H_0\text{ true})$, not $\Pr(H_0\text{ true}\mid\text{reject})$.`,
      },
      {
        text: r`The probability that $H_0$ is true is $0.05$.`,
        why: r`$\mu$ is a fixed (unknown) number, so $H_0$ is either true or false. $\alpha$ describes the test procedure, not the hypothesis.`,
      },
      {
        text: r`The probability of a Type II error is $0.95$.`,
        why: r`$\beta$ is not $1-\alpha$. It depends on the alternative value of $\mu$, the cutoff and $n$. In the steel example $\alpha=0.0228$ and $\beta=0.0913$.`,
      },
    ],
    answer: 0,
    explain: r`$\alpha=\Pr(\text{Type I error})=\Pr(T\in C;H_0)$. It is a long-run property of the procedure: among many data sets generated under $H_0$, about 5% would lead us to reject.`,
  },
  {
    id: "cutoff-tradeoff",
    prompt: r`Keep $n=16$ but raise the cutoff from $c=53$ to $c=54$ (reject when $\bar{x}\geq c$). What happens?`,
    choices: [
      { text: r`$\alpha$ decreases and $\beta$ increases.` },
      {
        text: r`Both $\alpha$ and $\beta$ decrease.`,
        why: r`With $n$ fixed, moving the cutoff always trades one error for the other.`,
      },
      {
        text: r`$\alpha$ increases and $\beta$ decreases.`,
        why: "A higher cutoff makes rejection harder, so false rejections become rarer, not more common.",
      },
      {
        text: r`Neither changes, because $n$ is unchanged.`,
        why: r`The error probabilities depend on the critical region, not only on $n$.`,
      },
    ],
    answer: 0,
    explain: r`A higher cutoff makes rejection harder. False alarms become rarer: $\alpha=\Pr(Z\geq 2.67)=0.0038$ (was $0.0228$). Misses become more common: $\beta=\Pr(Z<-0.67)=0.2525$ (was $0.0913$).`,
  },
  {
    id: "reduce-both",
    prompt: r`How can we make both $\alpha$ and $\beta$ smaller at the same time?`,
    choices: [
      { text: r`Increase the sample size $n$ (and choose the cutoff suitably).` },
      { text: r`Raise the cutoff $c$.`, why: r`That lowers $\alpha$ but raises $\beta$.` },
      { text: r`Lower the cutoff $c$.`, why: r`That lowers $\beta$ but raises $\alpha$.` },
      {
        text: "It is impossible in every situation.",
        why: r`It is impossible only when $n$ is fixed. More data make $\bar{X}$ less variable, which shrinks both errors.`,
      },
    ],
    answer: 0,
    explain: r`$\bar{X}$ has standard deviation $6/\sqrt{n}$, so the two sampling distributions overlap less as $n$ grows. For example, with $n=36$ and $c=52.5$: $\alpha=\Pr(Z\geq 2.5)=0.0062$ and $\beta=\Pr(Z<-2.5)=0.0062$. Both are smaller than with $n=16$.`,
  },
  {
    id: "fail-to-reject",
    prompt: r`For $H_0:\mu=50$ versus $H_1:\mu>50$, the data do not lead to rejection. What is the right conclusion?`,
    choices: [
      { text: r`The data do not provide enough evidence that $\mu>50$.` },
      {
        text: r`We have proved that $\mu=50$.`,
        why: r`Failing to reject is not proof. $\mu$ could be slightly above $50$ and the sample too small to show it.`,
      },
      {
        text: r`$\mu$ equals the observed sample mean $\bar{x}$.`,
        why: r`$\bar{x}$ estimates $\mu$ but is not equal to it, and this has nothing to do with the test decision.`,
      },
      {
        text: r`There is a 95% probability that $H_0$ is true.`,
        why: r`Tests do not give probabilities that a hypothesis is true. $H_0$ is either true or false.`,
      },
    ],
    answer: 0,
    explain: r`"Fail to reject $H_0$" means the data are consistent with $H_0$. It does not mean $H_0$ is shown to be true. That is why we say "fail to reject" rather than "accept".`,
  },
];

export const PVALUE_QUIZ_INTRO = r`Unless stated otherwise: steel bars with $\sigma=6$ and $n=16$, so $\bar{X}$ has standard deviation $6/\sqrt{16}=1.5$. Answer each question, read the explanation, then move on.`;

export const PVALUE_QUIZ: QuizQuestion[] = [
  {
    id: "definition",
    prompt: r`Which statement defines the $p$-value?`,
    choices: [
      {
        text: r`The probability, computed assuming $H_0$ is true, of a test statistic at least as extreme as the one observed (in the direction of $H_1$).`,
      },
      {
        text: r`The probability that $H_0$ is true, given the data.`,
        why: r`The $p$-value is computed assuming $H_0$ is true, so it cannot be the probability that $H_0$ is true.`,
      },
      {
        text: "The probability that the result happened by chance alone.",
        why: r`This popular phrase is misleading. It mixes up "the data given $H_0$" with "$H_0$ given the data".`,
      },
      {
        text: r`The probability of a Type II error.`,
        why: r`$\beta$ is computed under $H_1$ and does not depend on the observed data. The $p$-value is computed under $H_0$ from the observed data.`,
      },
    ],
    answer: 0,
    explain: r`Three ingredients: (1) assume $H_0$; (2) look at the observed statistic; (3) add up the probability of everything at least as extreme, in the direction(s) that favour $H_1$.`,
  },
  {
    id: "interpret-003",
    prompt: r`A study reports $p=0.03$. Which interpretation is correct?`,
    choices: [
      { text: r`If $H_0$ were true, results at least this extreme would occur about 3% of the time.` },
      {
        text: r`There is a 3% chance that $H_0$ is true.`,
        why: r`This is the most common misreading. The $p$-value is a probability about the data, computed under $H_0$. It is not a probability about $H_0$.`,
      },
      {
        text: r`There is a 97% chance that $H_1$ is true.`,
        why: r`Same mistake in reverse: a $p$-value never gives the probability that a hypothesis is true.`,
      },
      {
        text: r`If we reject $H_0$, there is a 3% chance we made a Type II error.`,
        why: r`Rejecting $H_0$ can only produce a Type I error, and the $p$-value is not an error probability for this decision.`,
      },
    ],
    answer: 0,
    explain: r`$p=0.03$ says the observed data would be fairly surprising if $H_0$ were true. Surprising data under $H_0$ count as evidence against $H_0$.`,
  },
  {
    id: "decision",
    prompt: r`A test gives $p=0.03$. Which decision is correct?`,
    choices: [
      { text: r`Reject $H_0$ at $\alpha=0.05$, but not at $\alpha=0.01$.` },
      { text: r`Reject $H_0$ at both $\alpha=0.05$ and $\alpha=0.01$.`, why: r`$0.03>0.01$, so we do not reject at the 1% level.` },
      {
        text: r`Reject $H_0$ at $\alpha=0.01$, but not at $\alpha=0.05$.`,
        why: r`This is backwards. A smaller $\alpha$ is a stricter standard, so it is harder to reject.`,
      },
      {
        text: "We cannot decide without the value of the test statistic.",
        why: r`The $p$-value alone is enough: reject exactly when $p\leq\alpha$.`,
      },
    ],
    answer: 0,
    explain: r`Rule: reject $H_0$ if $p\leq\alpha$. $0.03\leq 0.05$ gives reject; $0.03>0.01$ gives fail to reject. The same data can lead to different decisions at different significance levels.`,
  },
  {
    id: "compute-upper",
    prompt: r`Test $H_0:\mu=55$ against $H_1:\mu>55$ and observe $\bar{x}=56$. What is the $p$-value?`,
    choices: [
      { text: r`$\Pr(\bar{X}\geq 56;\mu=55)\approx 0.25$` },
      {
        text: r`$\Pr(\bar{X}\leq 56;\mu=55)\approx 0.75$`,
        why: r`$H_1:\mu>55$ says large values are extreme, so we need the upper tail, not the lower tail.`,
      },
      {
        text: r`$\approx 0.50$`,
        why: r`That is the two-sided $p$-value (twice the tail). The alternative here is one-sided.`,
      },
      {
        text: r`$0.0228$`,
        why: r`That is $\alpha$ for the cutoff $c=53$ with $H_0:\mu=50$, a different question. The $p$-value depends on the observed $\bar{x}$.`,
      },
    ],
    answer: 0,
    explain: r`$z=\dfrac{56-55}{1.5}=0.67$, so $p=\Pr(Z\geq 0.67)\approx 0.25$. Data this far above $55$ are quite common when $\mu=55$, so this is weak evidence for $\mu>55$.`,
  },
  {
    id: "compute-lower",
    prompt: r`Same data ($\bar{x}=56$), but now $H_1:\mu<55$. What is the $p$-value?`,
    choices: [
      { text: r`$\Pr(\bar{X}\leq 56;\mu=55)\approx 0.75$` },
      {
        text: r`$\Pr(\bar{X}\geq 56;\mu=55)\approx 0.25$`,
        why: r`For $H_1:\mu<55$, small values are extreme, so we need the lower tail.`,
      },
      {
        text: r`$\approx 0.50$`,
        why: r`That would be the two-sided $p$-value, which is not this alternative.`,
      },
      {
        text: r`$0$, because $\bar{x}>55$`,
        why: r`A $p$-value is a tail probability, and here the tail contains most of the distribution.`,
      },
    ],
    answer: 0,
    explain: r`"Extreme" follows $H_1$: values at or below $56$. $p=\Pr(Z\leq 0.67)\approx 0.75$. The sample mean lies on the opposite side from $H_1$, so the $p$-value is large and there is no evidence that $\mu<55$.`,
  },
  {
    id: "two-sided",
    prompt: r`Same data ($\bar{x}=56$), now $H_1:\mu\neq 55$. Which outcomes count as "at least as extreme", and what is the $p$-value?`,
    choices: [
      { text: r`$\bar{X}\geq 56$ or $\bar{X}\leq 54$; $p\approx 0.50$` },
      { text: r`$\bar{X}\geq 56$ only; $p\approx 0.25$`, why: r`Under $H_1:\mu\neq 55$, departures in both directions count as extreme.` },
      { text: r`$\bar{X}\leq 56$; $p\approx 0.75$`, why: "This mixes the lower tail with the middle of the distribution." },
      {
        text: r`$54\leq\bar{X}\leq 56$; $p\approx 0.50$`,
        why: r`That is the middle region, the least extreme outcomes. Extreme means at least as far from $55$ as $56$ is.`,
      },
    ],
    answer: 0,
    explain: r`$56$ is $1$ unit above $55$, so "at least as far from $55$" means $\bar{X}\geq 56$ or $\bar{X}\leq 54$. By symmetry, $p=2\Pr(Z\geq 0.67)\approx 0.50$.`,
  },
  {
    id: "strength",
    prompt: r`Two studies test the same $H_0$. Study A reports $p=0.001$; study B reports $p=0.04$. Which statement is justified?`,
    choices: [
      { text: r`Study A gives stronger evidence against $H_0$ than study B.` },
      {
        text: "The true effect in study A must be larger than in study B.",
        why: r`A tiny $p$-value can come from a small effect with a large sample. The $p$-value measures evidence, not the size of the effect.`,
      },
      {
        text: r`Study B gives stronger evidence against $H_0$.`,
        why: r`A larger $p$-value means the data are less surprising under $H_0$, so the evidence against $H_0$ is weaker.`,
      },
      {
        text: r`The evidence is the same, since both $p$-values are below $0.05$.`,
        why: r`Both lead to rejection at 5%, but $0.001$ describes much more surprising data than $0.04$.`,
      },
    ],
    answer: 0,
    explain: r`The smaller the $p$-value, the more surprising the data would be under $H_0$, and the stronger the evidence against $H_0$. To judge how big an effect is, look at the estimate or a confidence interval instead.`,
  },
  {
    id: "random",
    prompt: r`We repeat the same experiment with a fresh random sample. What happens to the $p$-value?`,
    choices: [
      { text: r`It usually changes, because it is computed from the data. It is a statistic.` },
      { text: r`It stays the same, because $H_0$ is the same.`, why: r`The hypotheses are the same, but the data change, and the $p$-value is computed from the data.` },
      { text: "It must be smaller the second time.", why: r`There is no reason for that. A new sample can give a larger or a smaller $p$-value.` },
      { text: r`It equals $\alpha$.`, why: r`$\alpha$ is chosen before seeing the data. The $p$-value is computed from the data.` },
    ],
    answer: 0,
    explain: r`Like $\bar{X}$, the $p$-value varies from sample to sample. When $H_0$ is true, it falls at or below $0.05$ in about 5% of repeated samples. That is exactly why "reject when $p\leq\alpha$" has Type I error probability $\alpha$.`,
  },
  {
    id: "observed-level",
    prompt: r`A test gives $p=0.04$. For which significance levels $\alpha$ would we reject $H_0$?`,
    choices: [
      { text: r`Every $\alpha\geq 0.04$` },
      { text: r`Every $\alpha\leq 0.04$`, why: r`We reject when $p\leq\alpha$, that is, when $\alpha$ is at least $0.04$.` },
      { text: r`Only $\alpha=0.05$`, why: r`Any $\alpha$ of at least $0.04$ works: $0.04$, $0.05$, $0.10$, and so on.` },
      { text: r`None, because $0.04>0.01$`, why: r`That only rules out $\alpha=0.01$. Other levels, such as $0.05$, still lead to rejection.` },
    ],
    answer: 0,
    explain: r`The $p$-value is the smallest significance level at which the observed data lead to rejection. That is why it is also called the observed significance level.`,
  },
  {
    id: "large-p",
    prompt: r`A test gives $p=0.40$. What is the best conclusion?`,
    choices: [
      { text: r`Fail to reject $H_0$: the data are consistent with $H_0$, but this does not prove $H_0$.` },
      {
        text: r`Accept $H_0$: it is true with probability $0.40$.`,
        why: r`The $p$-value is not the probability that $H_0$ is true, and failing to reject is not proof.`,
      },
      { text: r`Reject $H_0$, because $p$ is large.`, why: r`A large $p$-value means the data are unsurprising under $H_0$. We reject for small $p$.` },
      { text: "The test has 40% power.", why: r`Power is $1-\beta$, computed under $H_1$. It is a different quantity.` },
    ],
    answer: 0,
    explain: r`$p=0.40$: data like ours would be common if $H_0$ were true, so there is no real evidence against $H_0$. The honest statement is "fail to reject", not "$H_0$ is true".`,
  },
];

export const POWER_QUIZ_INTRO = r`Upper-tailed $z$ test of $H_0:\mu\leq\mu_0$ vs $H_1:\mu>\mu_0$ with known $\sigma$, as in the Power explorer. Answer each question, read the explanation, then move on.`;

export const POWER_QUIZ: QuizQuestion[] = [
  {
    id: "k-def",
    prompt: r`What is the power function $K(\mu)$?`,
    choices: [
      {
        text: r`The probability of a Type II error when the true mean is $\mu$.`,
        why: r`That is $\beta(\mu)$. Power is the probability of rejecting $H_0$, so $K(\mu)=1-\beta(\mu)$ for $\mu$ in $H_1$.`,
      },
      {
        text: r`The probability that $H_0$ is false when the true mean is $\mu$.`,
        why: r`Whether $H_0$ is false is a fact about the parameter, not a probability computed from the test.`,
      },
      { text: r`The probability of rejecting $H_0$ when the true mean equals $\mu$.` },
      {
        text: r`The smallest significance level at which we reject $H_0$ for the observed data.`,
        why: r`That describes the $p$-value (observed significance level), which depends on the sample, not on a hypothesized true $\mu$.`,
      },
    ],
    answer: 2,
    explain: r`$K(\mu)=\Pr(T\in C;\mu)=\Pr(\text{reject }H_0\mid\text{true mean}=\mu)$. It is a function of the true parameter, for a fixed critical region.`,
  },
  {
    id: "at-null",
    prompt: r`For a level-$\alpha$ test of $H_0:\mu=\mu_0$, what is $K(\mu_0)$?`,
    choices: [
      {
        text: r`$1-\alpha$`,
        why: r`$1-\alpha$ is the probability of correctly retaining $H_0$ when $\mu=\mu_0$, not the power at $\mu_0$.`,
      },
      { text: r`$\alpha$` },
      {
        text: r`$0$`,
        why: r`At the null value the rejection probability is exactly the Type I error rate $\alpha$, not zero.`,
      },
      {
        text: r`$1$`,
        why: r`Power near $1$ only happens far into the alternative, not at $\mu=\mu_0$.`,
      },
    ],
    answer: 1,
    explain: r`By definition, $\alpha=\Pr(\text{reject }H_0\mid\mu=\mu_0)=K(\mu_0)$. On the Power explorer curve, that is the height at $\mu=60$.`,
  },
  {
    id: "link-beta",
    prompt: r`If $\mu_1$ lies in $H_1$, how are power and Type II error related?`,
    choices: [
      {
        text: r`$K(\mu_1)=\beta(\mu_1)$`,
        why: r`Power and Type II error are complementary: one rejects, the other fails to reject.`,
      },
      {
        text: r`$K(\mu_1)=\alpha+\beta(\mu_1)$`,
        why: r`$\alpha$ is computed under $H_0$; $\beta(\mu_1)$ under $\mu_1$. They do not add to the power.`,
      },
      {
        text: r`$K(\mu_1)=\alpha/\beta(\mu_1)$`,
        why: r`There is no such ratio formula. Power is simply $1-\beta(\mu_1)$.`,
      },
      { text: r`$K(\mu_1)=1-\beta(\mu_1)$` },
    ],
    answer: 3,
    explain: r`$\beta(\mu_1)=\Pr(\text{fail to reject }H_0\mid\mu=\mu_1)$, so the chance of correctly rejecting is $K(\mu_1)=1-\beta(\mu_1)$.`,
  },
  {
    id: "larger-delta",
    prompt: r`In the explorer, you increase $\mu_1-60$ while holding $n$ and $\alpha$ fixed. What happens?`,
    choices: [
      { text: r`Power $K(\mu_1)$ increases (the dot moves up the curve).` },
      {
        text: r`Power $K(\mu_1)$ decreases.`,
        why: r`A larger gap $\mu_1-\mu_0$ makes the alternative easier to detect, so power rises.`,
      },
      {
        text: r`$\alpha$ increases.`,
        why: r`$\alpha$ is fixed by the critical region under $H_0$. Changing $\mu_1$ does not change $\alpha$.`,
      },
      {
        text: r`The whole power curve $K(\mu)$ shifts upward.`,
        why: r`Changing $\mu_1$ only picks a different point on the same curve. The curve itself changes when $n$ or $\alpha$ changes.`,
      },
    ],
    answer: 0,
    explain: r`$K(\mu_1)=\Phi\big((\mu_1-\mu_0)/(\sigma/\sqrt{n})-z_\alpha\big)$. Larger $\mu_1-\mu_0$ raises the argument of $\Phi$, so power increases. Watch the labeled point $(\mu_1,K)$ on the axes.`,
  },
  {
    id: "smaller-alpha",
    prompt: r`You keep $n$ and $\mu_1$ fixed but decrease $\alpha$ (stricter Type I control). What happens to power at $\mu_1$?`,
    choices: [
      {
        text: r`Power increases, because a smaller $\alpha$ is always better.`,
        why: r`Smaller $\alpha$ means a harder-to-reach critical region, so it is also harder to reject when $H_1$ is true.`,
      },
      {
        text: r`Power stays the same, because $\mu_1$ did not change.`,
        why: r`The formula still involves $z_\alpha$. Changing $\alpha$ changes the cutoff and therefore the power.`,
      },
      { text: r`Power decreases (and $\beta(\mu_1)$ increases).` },
      {
        text: r`Power becomes equal to the new $\alpha$.`,
        why: r`$K(\mu)=\alpha$ only at the null value $\mu_0$, not at a fixed alternative $\mu_1$.`,
      },
    ],
    answer: 2,
    explain: r`Smaller $\alpha$ $\Rightarrow$ larger $z_\alpha$ $\Rightarrow$ smaller $\Phi\big((\mu_1-\mu_0)/(\sigma/\sqrt{n})-z_\alpha\big)$. There is a trade-off: fewer false alarms, but more misses at the same alternative.`,
  },
  {
    id: "larger-n",
    prompt: r`You increase the sample size $n$, with $\alpha$ and $\mu_1$ fixed. Which statement is correct?`,
    choices: [
      {
        text: r`Power at $\mu_1$ decreases because the standard error gets smaller.`,
        why: r`A smaller standard error makes $\mu_1$ stand out more clearly from $\mu_0$, so power increases.`,
      },
      { text: r`Power at $\mu_1$ increases; the curve rises more steeply away from $\mu_0$.` },
      {
        text: r`$\alpha$ automatically decreases.`,
        why: r`For a $z$ test with known $\sigma$, the critical value is set to keep $\alpha$ fixed when $n$ changes.`,
      },
      {
        text: r`Power at every $\mu$, including $\mu_0$, becomes $1$.`,
        why: r`At $\mu_0$ we still have $K(\mu_0)=\alpha$. Only alternatives get power approaching $1$ as $n\to\infty$.`,
      },
    ],
    answer: 1,
    explain: r`Larger $n$ shrinks $\sigma/\sqrt{n}$, so $(\mu_1-\mu_0)/(\sigma/\sqrt{n})$ grows and $K(\mu_1)$ rises. On the plot, the curve stays at height $\alpha$ at $\mu=60$ but climbs faster for $\mu>60$.`,
  },
];
