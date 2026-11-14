import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Two-way ANOVA handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Two-way ANOVA</h1>
        <p className={styles.lead}>
          Two factors · additive effects · interaction · F tests
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
          "Why study two factors at once",
          "One observation per cell: additive model and F tests for rows and columns",
          "ANOVA table and the cars–gasoline example",
          "Interaction: c > 1 observations per cell",
          "Digits–array example and a concept check",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 9.4.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Two factors that influence an outcome">
      <BulletList
        items={[
          "One-way ANOVA changes a single factor. Often two factors matter at once.",
          "Examples: car type and gasoline grade → miles per gallon; teaching method and content difficulty → test score.",
          "This lecture builds two-way ANOVA, which extends naturally to three or more factors.",
        ]}
      />
      <p>
        <strong>Suggested reading:</strong> Chapter 9.4 of the textbook.
      </p>
    </SceneFrame>
  );
}
