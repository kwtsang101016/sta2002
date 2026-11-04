import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Sign Test & Wilcoxon Signed-Rank Test handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Sign Test &amp; Wilcoxon Signed-Rank Test</h1>
        <p className={styles.lead}>
          Distribution-free tests for a median · binomial null · signed ranks · normal approximation
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
          "Sign test for the median (exact Binomial null)",
          "Type I error for two-sided sign-test critical regions",
          "Motivation and construction of the Wilcoxon signed-rank statistic",
          "Null distribution and normal approximation (with continuity correction)",
          "Handling ties in practice",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 8.4.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Distribution-free hypothesis tests">
      <p>In this lecture we learn two distribution-free tests for a population median:</p>
      <BulletList items={["Sign test", "Wilcoxon signed-rank test"]} />
      <p>
        <strong>Suggested reading:</strong> Chapter 8.4 of the textbook.
      </p>
    </SceneFrame>
  );
}
