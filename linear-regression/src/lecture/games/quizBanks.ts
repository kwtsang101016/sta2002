import type { QuizQuestion } from "./quizOrder";

const r = String.raw;

export const LINEAR_REGRESSION_QUIZ_INTRO = r`Check the main ideas: the centered simple linear model, least-squares / MLE formulas, sampling laws, confidence intervals for $\alpha$ and $\beta$, and how a prediction interval differs from a CI for $\mu(x)$.`;

export const LINEAR_REGRESSION_QUIZ: QuizQuestion[] = [
  {
    id: "model",
    prompt: r`In the lecture’s centered parameterization, which model is used?`,
    choices: [
      {
        text: r`$Y_i=\alpha+\beta(x_i-\bar x)+\epsilon_i$ with $\epsilon_i\overset{\mathrm{iid}}{\sim}\mathrm{N}(0,\sigma^2)$`,
      },
      {
        text: r`$Y_i=\alpha+\beta x_i$ with no error term`,
        why: r`The statistical model includes random errors $\epsilon_i$.`,
      },
      {
        text: r`$Y_i=\beta x_i+\epsilon_i$ only (no intercept)`,
        why: r`The intercept $\alpha$ is part of the model; after centering, $\alpha=\mathrm{E}(\bar Y)$.`,
      },
      {
        text: r`$Y_i=\alpha+\beta(x_i-\bar x)+\gamma x_i^2+\epsilon_i$`,
        why: r`That is a quadratic model; this lecture is simple linear regression.`,
      },
    ],
    answer: 0,
    explain: r`The centered simple linear model is $Y_i=\alpha+\beta(x_i-\bar x)+\epsilon_i$ with i.i.d. normal errors.`,
  },
  {
    id: "beta-ls",
    prompt: r`The least-squares / MLE slope is`,
    choices: [
      {
        text: r`$\hat\beta=\dfrac{\sum_i Y_i(x_i-\bar x)}{\sum_i(x_i-\bar x)^2}$`,
      },
      {
        text: r`$\hat\beta=\bar Y/\bar x$`,
        why: r`That ignores the covariation structure of the pairs $(x_i,Y_i)$.`,
      },
      {
        text: r`$\hat\beta=\sum_i(x_i-\bar x)^2/\sum_i Y_i(x_i-\bar x)$`,
        why: r`Numerator and denominator are swapped.`,
      },
      {
        text: r`$\hat\beta=\sum_i x_i Y_i$`,
        why: r`Missing the centering and the denominator $\sum(x_i-\bar x)^2$.`,
      },
    ],
    answer: 0,
    explain: r`Minimizing $\sum(Y_i-\alpha-\beta(x_i-\bar x))^2$ yields $\hat\alpha=\bar Y$ and that formula for $\hat\beta$.`,
  },
  {
    id: "sigma-df",
    prompt: r`Under the normal simple linear model, which law holds?`,
    choices: [
      {
        text: r`$\dfrac{(n-2)S_R^2}{\sigma^2}\sim\chi^2(n-2)$, and $S_R^2$ is independent of $(\hat\alpha,\hat\beta)$`,
      },
      {
        text: r`$\dfrac{n\hat\sigma^2}{\sigma^2}\sim\chi^2(n)$`,
        why: r`Two parameters are estimated; the residual chi-square has $n-2$ degrees of freedom.`,
      },
      {
        text: r`$S_R^2$ is biased for $\sigma^2$`,
        why: r`$S_R^2=n\hat\sigma^2/(n-2)$ is unbiased; $\hat\sigma^2$ itself is biased.`,
      },
      {
        text: r`$\hat\alpha$ and $\hat\beta$ are dependent when $\sigma^2$ is unknown`,
        why: r`In the centered model they are independent (and both independent of $S_R^2$).`,
      },
    ],
    answer: 0,
    explain: r`The quadratic-form decomposition gives residual df $n-2$ and mutual independence of $\hat\alpha$, $\hat\beta$, and $S_R^2$.`,
  },
  {
    id: "ci-alpha",
    prompt: r`A two-sided $100(1-\alpha)\%$ CI for the intercept $\alpha$ (unknown $\sigma^2$) is`,
    choices: [
      {
        text: r`$\hat\alpha\pm t_{\alpha/2}(n-2)\,S_R\sqrt{1/n}$`,
      },
      {
        text: r`$\hat\alpha\pm z_{\alpha/2}\,S_R\sqrt{1/n}$`,
        why: r`With unknown $\sigma^2$ use a $t$ critical value on $n-2$ df, not $z$.`,
      },
      {
        text: r`$\hat\alpha\pm t_{\alpha/2}(n-1)\,S_R\sqrt{1/n}$`,
        why: r`Residual degrees of freedom are $n-2$, not $n-1$.`,
      },
      {
        text: r`$\hat\beta\pm t_{\alpha/2}(n-2)\,S_R\sqrt{1/n}$`,
        why: r`That mixes the slope estimator with the intercept SE.`,
      },
    ],
    answer: 0,
    explain: r`Use $\hat\alpha\sim\mathrm{N}(\alpha,\sigma^2/n)$ with $S_R$ and $t_{\alpha/2}(n-2)$.`,
  },
  {
    id: "pi-vs-ci",
    prompt: r`Compared with a CI for $\mu(x_{n+1})=\alpha+\beta(x_{n+1}-\bar x)$, a prediction interval for $Y_{n+1}$ is wider because`,
    choices: [
      {
        text: r`it also accounts for the new noise $\epsilon_{n+1}$ (an extra $1$ under the square root)`,
      },
      {
        text: r`it uses $z$ instead of $t$`,
        why: r`Both use the same $t_{\alpha/2}(n-2)$ critical value in this lecture.`,
      },
      {
        text: r`it ignores uncertainty in $\hat\alpha$ and $\hat\beta$`,
        why: r`The PI still includes the parameter-uncertainty terms $1/n$ and $(x-\bar x)^2/\sum(x_i-\bar x)^2$.`,
      },
      {
        text: r`$\mu(x)$ is random while $Y_{n+1}$ is fixed`,
        why: r`Opposite: $\mu(x)$ is a fixed mean; $Y_{n+1}$ is a future random response.`,
      },
    ],
    answer: 0,
    explain: r`$\mathrm{Var}(Y_{n+1}-\hat Y)$ has an extra $\sigma^2$ from $\epsilon_{n+1}$, so the PI SE has $1+1/n+\cdots$.`,
  },
];
