import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · One-way ANOVA handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>One-way ANOVA</h1>
        <p className={styles.lead}>
          Several normal means · sums of squares · the F test
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
          "Why compare more than two treatment means",
          "Model: independent normal samples with common variance",
          "Partition SS(TO) = SS(T) + SS(E)",
          "The ANOVA F statistic and F(m−1, n−m)",
          "Pullout-force example and a concept check",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapter 9.3.
      </p>
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Beyond two groups">
      <BulletList
        items={[
          "Experimenters often compare more than two treatments: corn hybrids, teaching methods, drug doses, …",
          "Changing the level of one factor produces several groups.",
          "One-way ANOVA tests equality of the means across those levels.",
        ]}
      />
      <p>
        <strong>Suggested reading:</strong> Chapter 9.3 of the textbook.
      </p>
    </SceneFrame>
  );
}
