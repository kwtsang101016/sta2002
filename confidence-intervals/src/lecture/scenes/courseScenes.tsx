import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Block, BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Confidence Intervals handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Confidence Intervals</h1>
        <p className={styles.lead}>
          Interval estimators for means · Two-sample &amp; paired designs · Proportions · Sample size
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
          "Definition of a confidence interval",
          "CI for a mean μ (four cases: normal / CLT, σ known / unknown)",
          "One-sided intervals",
          "CI for a difference of means (pooled, Welch, paired)",
          "CI for proportions and differences of proportions",
          "Sample size determination for a target margin of error",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapters 7.1–7.4.
      </p>
    </SceneFrame>
  );
}

export function ReadingScene() {
  return (
    <SceneFrame kicker="Course" title="What we will learn">
      <div className={styles.twoCol}>
        <Block title="Part I (means)">
          <BulletList
            items={[
              "What (L, U) means as a random interval",
              "z-intervals when σ is known",
              "t-intervals when σ is unknown",
              "One-sided bounds",
            ]}
          />
        </Block>
        <Block title="Part II (compare & proportions)">
          <BulletList
            items={[
              "Pooled / Welch / paired t-intervals",
              "CI for p and p₁ − p₂",
              "Choosing n for a given margin of error",
            ]}
          />
        </Block>
      </div>
    </SceneFrame>
  );
}
