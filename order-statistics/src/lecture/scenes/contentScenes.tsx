import styles from "../Lecture.module.css";
import { Block, BulletList, Formula, InlineMath, MathText, OrderedList, SceneFrame } from "./shared";

export function DefinitionScene() {
  return (
    <SceneFrame kicker="Definition" title="Order statistics">
      <Block title="Definition">
        <p>
          Suppose <MathText text="$X_1,\ldots,X_n$" /> are i.i.d. from a common distribution. For{" "}
          <MathText text="$k=1,2,\ldots,n$" />, the <em>k</em>th order statistic is
        </p>
        <Formula tex={String.raw`X_{(k)}=\text{the }k\text{th smallest of }X_1,\ldots,X_n.`} />
        <p>In particular,</p>
        <Formula
          tex={String.raw`X_{(1)}=\min\{X_1,\ldots,X_n\},\qquad
X_{(n)}=\max\{X_1,\ldots,X_n\}.`}
        />
      </Block>
      <p className={styles.note}>
        <strong>Ties are allowed.</strong> For <MathText text="$X_1=1$, $X_2=3$, $X_3=2$, $X_4=2$" />, the order
        statistics are <MathText text="$X_{(1)}=1$, $X_{(2)}=2$, $X_{(3)}=2$, $X_{(4)}=3$" />.
      </p>
    </SceneFrame>
  );
}

export function ExampleSetupScene() {
  return (
    <SceneFrame kicker="Example" title="A triangular density on (0, 1)">
      <Block title="Example">
        <p>
          Let <MathText text="$X_1,\ldots,X_5$" /> be i.i.d. with PDF
        </p>
        <Formula tex={String.raw`f(x)=2x,\qquad 0<x<1.`} />
        <p>
          Its CDF on <MathText text="$(0,1)$" /> is{" "}
          <MathText text="$F(x)=\int_0^x 2y\,dy=x^2$" />. Observed values:
        </p>
        <Formula tex={String.raw`x_1=0.62,\ x_2=0.98,\ x_3=0.31,\ x_4=0.81,\ x_5=0.53.`} />
        <OrderedList
          items={[
            "What are the observed order statistics?",
            <MathText key="2" text="What are the CDFs of $X_{(4)}$ and $X_{(5)}$?" />,
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function ExampleOrderedScene() {
  return (
    <SceneFrame kicker="Example" title="Observed order statistics">
      <Formula
        tex={String.raw`\begin{aligned}
x_{(1)}&=\min\{x_1,\ldots,x_5\}=0.31,\\
x_{(2)}&=0.53,\\
x_{(3)}&=0.62,\\
x_{(4)}&=0.81,\\
x_{(5)}&=\max\{x_1,\ldots,x_5\}=0.98.
\end{aligned}`}
      />
    </SceneFrame>
  );
}

export function ExampleMaxCdfScene() {
  return (
    <SceneFrame kicker="Example" title="CDF and PDF of $X_{(5)}$">
      <p>
        <strong>Question.</strong> What is the CDF of <MathText text="$X_{(5)}=\max\{X_1,\ldots,X_5\}$" />?
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(5)}\le x)
&=\Pr(X_1\le x,\ldots,X_5\le x)\\
&=\prod_{i=1}^5\Pr(X_i\le x)=F(x)^5=x^{10}.
\end{aligned}`}
      />
      <p>
        Differentiate to get the PDF:{" "}
        <MathText text="$f_{X_{(5)}}(x)=10x^9=5F(x)^4 f(x)$" /> for <MathText text="$0<x<1$" />.
      </p>
    </SceneFrame>
  );
}

export function ExampleFourthCdfScene() {
  return (
    <SceneFrame kicker="Example" title="CDF of $X_{(4)}$">
      <p>
        Let <InlineMath tex="W" /> be the number of <MathText text="$X_i$" /> with{" "}
        <MathText text="$X_i\le x$" />. Then <MathText text="$W\sim\mathrm{Bin}(5,F(x))$" />.
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
\Pr(X_{(4)}\le x)
&=\Pr(\text{at least 4 of the }X_i\le x)\\
&=\Pr(W\ge 4)=\Pr(W=4)+\Pr(W=5)\\
&=\binom{5}{4}F(x)^4\bigl(1-F(x)\bigr)+F(x)^5.
\end{aligned}`}
      />
    </SceneFrame>
  );
}

export function ExampleFourthPdfScene() {
  return (
    <SceneFrame kicker="Example" title="PDF of $X_{(4)}$">
      <p>
        Differentiate the CDF with respect to <InlineMath tex="x" />:
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
f_{X_{(4)}}(x)
&=\binom{5}{4}4F(x)^3 f(x)\bigl(1-F(x)\bigr)\\
&\quad+\binom{5}{4}F(x)^4\bigl(-f(x)\bigr)+5F(x)^4 f(x)\\
&=\binom{5}{4}4F(x)^3 f(x)\bigl(1-F(x)\bigr)\\
&=\frac{5!}{3!\,1!\,1!}\,F(x)^3 f(x)\bigl(1-F(x)\bigr),\quad 0<x<1.
\end{aligned}`}
      />
    </SceneFrame>
  );
}

export function TheoremScene() {
  return (
    <SceneFrame kicker="General formula" title="CDF and PDF of $X_{(k)}$">
      <Block title="Theorem">
        <p>
          Let <MathText text="$X_1,\ldots,X_n$" /> be i.i.d. continuous with PDF <InlineMath tex="f" /> and CDF{" "}
          <InlineMath tex="F" />. For <MathText text="$k=1,\ldots,n$" />,
        </p>
        <Formula
          tex={String.raw`F_{X_{(k)}}(x)
=\sum_{l=k}^{n}\binom{n}{l}F(x)^l\bigl(1-F(x)\bigr)^{n-l},`}
        />
        <Formula
          tex={String.raw`f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!\,1!\,(n-k)!}\,[F(x)]^{k-1}f(x)\,[1-F(x)]^{n-k}.`}
        />
      </Block>
    </SceneFrame>
  );
}

export function TheoremInterpretScene() {
  return (
    <SceneFrame kicker="General formula" title="Reading the PDF formula">
      <BulletList
        items={[
          <MathText key="a" text="$[F(x)]^{k-1}$: probability mass for $k-1$ sample points below $x$." />,
          <MathText key="b" text="$f(x)$: density for one sample point near $x$ (namely $X_{(k)}$)." />,
          <MathText key="c" text="$[1-F(x)]^{n-k}$: probability mass for $n-k$ sample points above $x$." />,
          <MathText
            key="d"
            text="The multinomial coefficient $\dfrac{n!}{(k-1)!\,1!\,(n-k)!}$ counts the orderings of those three groups."
          />,
        ]}
      />
    </SceneFrame>
  );
}

export function ProofCdfScene() {
  return (
    <SceneFrame kicker="Proof" title="CDF via a binomial count">
      <p>
        Define <MathText text="$W\sim\mathrm{Bin}(n,F(x))$" /> as the number of{" "}
        <MathText text="$X_i$" /> with <MathText text="$X_i\le x$" />. Then
      </p>
      <Formula
        tex={String.raw`\begin{aligned}
F_{X_{(k)}}(x)
&=\Pr(X_{(k)}\le x)=\Pr(W\ge k)\\
&=\sum_{l=k}^{n}\Pr(W=l)
=\sum_{l=k}^{n}\binom{n}{l}F(x)^l\bigl(1-F(x)\bigr)^{n-l}.
\end{aligned}`}
      />
    </SceneFrame>
  );
}

export function ProofPdfScene() {
  return (
    <SceneFrame kicker="Proof" title="PDF by differentiating the CDF">
      <p>
        Differentiate <MathText text="$F_{X_{(k)}}(x)$" /> with respect to <InlineMath tex="x" />. After collecting
        terms, the sums telescope and leave only the <MathText text="$l=k$" /> contribution:
      </p>
      <Formula
        tex={String.raw`f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!\,1!\,(n-k)!}\,[F(x)]^{k-1}f(x)\,[1-F(x)]^{n-k}.`}
      />
    </SceneFrame>
  );
}

export function UniformOsScene() {
  return (
    <SceneFrame kicker="Uniform(0,1)" title="Order statistics of Uniform(0, 1)">
      <p>
        Let <MathText text="$U_1,\ldots,U_n\overset{\text{i.i.d.}}{\sim}\mathrm{Uniform}(0,1)$" />, so{" "}
        <MathText text="$F(x)=x$" /> and <MathText text="$f(x)=1$" /> on <MathText text="$(0,1)$" />. By the theorem,
      </p>
      <Formula
        tex={String.raw`f_{U_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}\,x^{k-1}(1-x)^{n-k}
=\frac{\Gamma(n+1)}{\Gamma(k)\Gamma(n-k+1)}\,x^{k-1}(1-x)^{n-k},`}
      />
      <p>
        for <MathText text="$0<x<1$" />, where{" "}
        <MathText text="$\Gamma(k)=\int_0^\infty x^{k-1}e^{-x}\,dx$" /> is the Gamma function. For any positive
        integer <InlineMath tex="m" />, <MathText text="$\Gamma(m)=(m-1)!$" />.
      </p>
    </SceneFrame>
  );
}

export function BetaDefScene() {
  return (
    <SceneFrame kicker="Beta" title="The Beta distribution">
      <Block title="Definition">
        <p>
          <MathText text="$X\sim\mathrm{Beta}(\alpha,\beta)$" /> for <MathText text="$\alpha,\beta>0$" /> if
        </p>
        <Formula
          tex={String.raw`f(x)=\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}\,x^{\alpha-1}(1-x)^{\beta-1},
\quad 0<x<1.`}
        />
      </Block>
      <Formula
        tex={String.raw`\mathbb{E}(X)=\frac{\alpha}{\alpha+\beta},\qquad
\mathrm{Var}(X)=\frac{\alpha\beta}{(\alpha+\beta+1)(\alpha+\beta)^2}.`}
      />
    </SceneFrame>
  );
}

export function UniformBetaScene() {
  return (
    <SceneFrame kicker="Uniform(0,1)" title="$U_{(k)}$ is Beta">
      <p>
        Comparing PDFs shows
      </p>
      <Formula tex={String.raw`U_{(k)}\sim\mathrm{Beta}(k,\ n-k+1).`} />
      <p>Hence</p>
      <Formula
        tex={String.raw`\mathbb{E}(U_{(k)})=\frac{k}{n+1},\qquad
\mathrm{Var}(U_{(k)})=\frac{k(n-k+1)}{(n+1)^2(n+2)}.`}
      />
    </SceneFrame>
  );
}

export function PitSingleScene() {
  return (
    <SceneFrame kicker="Probability integral transform" title="Distribution of $F(X_i)$">
      <p>
        Let <MathText text="$X_1,\ldots,X_n$" /> be i.i.d. continuous with a strictly increasing CDF{" "}
        <InlineMath tex="F" />. Show that <MathText text="$F(X_i)\sim\mathrm{Uniform}(0,1)$" />.
      </p>
      <p>
        Let <MathText text="$Y=F(X_i)$" />. For <MathText text="$0<y<1$" />,
      </p>
      <Formula
        tex={String.raw`\Pr(Y\le y)=\Pr\bigl(F(X_i)\le y\bigr)
=\Pr\bigl(X_i\le F^{-1}(y)\bigr)
=F\bigl(F^{-1}(y)\bigr)=y,`}
      />
      <p>which is the CDF of Uniform(0, 1).</p>
    </SceneFrame>
  );
}

export function PitOrderScene() {
  return (
    <SceneFrame kicker="Probability integral transform" title="Distribution of $F(X_{(k)})$">
      <p>
        With the same assumptions, show that{" "}
        <MathText text="$F(X_{(k)})\sim\mathrm{Beta}(k,\ n-k+1)$" />.
      </p>
      <BulletList
        items={[
          <MathText key="a" text="Because $F$ is strictly increasing, $X_i<X_j\Leftrightarrow F(X_i)<F(X_j)$." />,
          <MathText
            key="b"
            text="Thus $F(X_{(k)})$ is the $k$th smallest among $F(X_1),\ldots,F(X_n)$."
          />,
          <MathText key="c" text="Each $U_i=F(X_i)$ is i.i.d. Uniform(0,1), so $F(X_{(k)})$ has the same law as $U_{(k)}$." />,
          <MathText key="d" text="Therefore $F(X_{(k)})\sim\mathrm{Beta}(k,\ n-k+1)$." />,
        ]}
      />
    </SceneFrame>
  );
}

export function TakeawaysScene() {
  return (
    <SceneFrame kicker="Summary" title="Takeaways" tone="dark">
      <BulletList
        items={[
          <MathText key="a" text="$X_{(k)}$ is the $k$th smallest among i.i.d. $X_1,\ldots,X_n$." />,
          <MathText
            key="b"
            text="CDF: $F_{X_{(k)}}(x)=\Pr(W\ge k)$ with $W\sim\mathrm{Bin}(n,F(x))$."
          />,
          <MathText
            key="c"
            text="PDF: multinomial factor $\times[F]^{k-1}f[1-F]^{n-k}$."
          />,
          <MathText key="d" text="For Uniform(0,1), $U_{(k)}\sim\mathrm{Beta}(k,n-k+1)$ with mean $k/(n+1)$." />,
          <MathText
            key="e"
            text="If $F$ is continuous and strictly increasing, $F(X_i)\sim U(0,1)$ and $F(X_{(k)})\sim\mathrm{Beta}(k,n-k+1)$."
          />,
        ]}
      />
    </SceneFrame>
  );
}
