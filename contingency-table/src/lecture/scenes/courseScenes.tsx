import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Contingency Tables handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Contingency Tables</h1>
        <p className={styles.lead}>
          Homogeneity · independence · Pearson’s chi-square on two-way tables
        </p>
        <div className={styles.coverMeta}>
          <p className={styles.coverAuthors}>Fangda Song and Ka Wai Tsang</p>
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
          "Contingency tables and a medical-care motivating example",
          "Test for homogeneity of several multinomial distributions",
          "Expected frequencies, Pearson’s Q, and degrees of freedom (k−1)(h−1)",
          "Test for independence of two categorical attributes",
          "Worked examples and a concept-check quiz",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 9.2.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="What this lecture covers">
      <BulletList
        items={[
          "Contingency tables: cross-classified categorical counts",
          "Test for homogeneity: whether two or more multinomial distributions are the same",
          "Test for independence: whether two attributes are statistically independent",
        ]}
      />
      <p>Both tests use the same Pearson chi-square statistic and the same degrees of freedom.</p>
      <p>
        <strong>Suggested reading:</strong> Chapter 9.2 of the textbook.
      </p>
    </SceneFrame>
  );
}
