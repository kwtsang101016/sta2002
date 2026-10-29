import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Quantiles and Q-Q Plots handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Quantiles and Q-Q Plots</h1>
        <p className={styles.lead}>
          Theoretical and sample quantiles · linear interpolation · checking a distribution with a Q-Q plot
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
          "Quantiles (percentiles) of a distribution",
          "Sample quantiles from order statistics",
          "Worked numerical example and a bias discussion",
          "Motivation and construction of Q-Q plots",
          "Reading good vs poor Q-Q fits",
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
    <SceneFrame kicker="Introduction" title="What this lecture covers">
      <p>In this lecture we will discuss</p>
      <BulletList items={["Quantile or percentile", "Quantile–Quantile (Q-Q) plots"]} />
      <p>
        <strong>Suggested reading:</strong> Chapter 6.3 of the textbook.
      </p>
    </SceneFrame>
  );
}
