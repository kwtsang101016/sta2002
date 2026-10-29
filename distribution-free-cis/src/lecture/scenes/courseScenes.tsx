import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Distribution-free Confidence Intervals handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Distribution-free Confidence Intervals</h1>
        <p className={styles.lead}>
          Order-statistic CIs for quantiles · exact binomial coverage · CLT with continuity correction
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
          "Why distribution-free CIs for quantiles",
          "Median intervals from order statistics (exact binomial coverage)",
          "CLT / continuity-correction approximations",
          "CIs for a general percentile π_p",
          "Worked commute-time example",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 7.5.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Distribution-free confidence intervals">
      <BulletList
        items={[
          "Most CIs we have seen assume a named population (e.g. normal).",
          <>
            <strong>Distribution-free</strong> CIs: no assumption that the sample comes from a specific parametric family.
          </>,
          "We construct distribution-free CIs for quantiles using order statistics.",
          <>
            <strong>Suggested reading:</strong> Chapter 7.5 of the textbook.
          </>,
        ]}
      />
    </SceneFrame>
  );
}
