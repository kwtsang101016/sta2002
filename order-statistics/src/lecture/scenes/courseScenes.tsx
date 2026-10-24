import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, MathText, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Order Statistics handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Order Statistics</h1>
        <p className={styles.lead}>
          Sorted samples · CDF and PDF of{" "}
          <MathText text="$X_{(k)}$" /> · Uniform and Beta · Probability integral transform
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
          "Motivation and definition of order statistics",
          <MathText key="2" text="Worked example: PDF $f(x)=2x$ on $(0,1)$" />,
          <MathText key="3" text="General CDF and PDF of $X_{(k)}$" />,
          <MathText key="4" text="Uniform$(0,1)$ order statistics and the Beta distribution" />,
          <MathText key="5" text="Distributions of $F(X_i)$ and $F(X_{(k)})$" />,
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 6.3.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Why order statistics?">
      <p>In this lecture we introduce the concept and distribution of order statistics.</p>
      <p>They are useful for examining distributional properties of data:</p>
      <BulletList
        items={[
          "Quality control: the minimum and maximum help flag outliers or defects on a production line.",
          "Finance: quantiles of potential losses (e.g. the 5th percentile of daily returns) relate to Value-at-Risk.",
          "Environmental studies: the sample median can describe typical pollution levels and is more robust to extremes than the mean.",
        ]}
      />
      <p>
        <strong>Suggested reading:</strong> Chapter 6.3 of the textbook.
      </p>
    </SceneFrame>
  );
}
