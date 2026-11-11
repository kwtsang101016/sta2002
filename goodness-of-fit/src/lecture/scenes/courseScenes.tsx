import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, Figure, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Goodness-of-fit Test handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Goodness-of-fit Test</h1>
        <p className={styles.lead}>
          Pearson’s chi-square statistic · multinomial counts · known and unknown parameters
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
          "A fair-die motivating example, from one face to all six",
          "Multinomial counts and Pearson’s chi-square statistic",
          "Decision rule when every expected count is at least 5",
          "Fitting a fully specified discrete or continuous model",
          "Unknown parameters: estimate, then lose degrees of freedom",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 9.1.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Pearson’s chi-square idea">
      <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 18, alignItems: "center" }}>
        <Figure src="/figures/karlpearson.png" alt="Karl Pearson" width="150px" />
        <BulletList
          items={[
            "Chi-square test statistic proposed by Karl Pearson in 1900.",
            "The same statistic is used for several different kinds of tests.",
            "Here we use it to test whether a specified probabilistic model fits the data.",
          ]}
        />
      </div>
      <p>
        <strong>Suggested reading:</strong> Chapter 9.1 of the textbook.
      </p>
    </SceneFrame>
  );
}
