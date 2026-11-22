import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { MathText, OrderedList, SceneFrame } from "./shared";

/** Prefer String.raw for KaTeX so escapes like \alpha / \beta are not eaten by JS. */
const r = String.raw;

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Linear Regression handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Linear Regression</h1>
        <p className={styles.lead}>
          Least squares · MLEs · confidence intervals · prediction
        </p>
        <div className={styles.coverMeta}>
          <p className={styles.coverAuthors}>Zhenxing Guo and Ka Wai Tsang</p>
          <p className={styles.coverAffiliation}>School of Data Science, CUHK(SZ)</p>
        </div>
        <p className={styles.hint}>{print ? COVER_HINT_PRINT : COVER_HINT_LIVE}</p>
      </div>
    </section>
  );
}

export function OutlineScene() {
  return (
    <SceneFrame kicker="Welcome" title="Outline">
      <OrderedList
        items={[
          "Why relate two variables: predictors, responses, and scatter plots",
          <MathText
            key="ls"
            text={r`Least squares and the simple linear model $Y_i=\alpha+\beta(x_i-\bar x)+\epsilon_i$`}
          />,
          <MathText
            key="mle"
            text={r`MLEs $\hat\alpha$, $\hat\beta$, $\hat\sigma^2$ and their sampling distributions`}
          />,
          <MathText
            key="ci"
            text={r`Confidence intervals for $\alpha$, $\beta$, and the mean response $\mu(x)$`}
          />,
          <MathText
            key="pi"
            text={r`Prediction intervals for a new $Y_{n+1}$, and a concept check`}
          />,
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapters 6.5 and 7.6.
      </p>
    </SceneFrame>
  );
}
