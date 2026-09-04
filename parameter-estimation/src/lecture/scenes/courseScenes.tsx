import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Block, BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Parameter Estimation handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Parameter Estimation</h1>
        <p className={styles.lead}>Exploratory data analysis · Maximum likelihood · Unbiasedness · Method of moments</p>
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
          "Data visualization (histograms & boxplots)",
          "Exploratory data analysis — University of Miami COVID-19 tests",
          "Point estimation language: parameter space, estimator vs estimate",
          "Maximum likelihood estimation (MLE)",
          "Unbiasedness",
          "Method of moments (MoM)",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapters 6.1, 6.2, and 6.4.
      </p>
    </SceneFrame>
  );
}

export function ReadingScene() {
  return (
    <SceneFrame kicker="Course" title="What we will learn">
      <div className={styles.twoCol}>
        <Block title="Part I">
          <BulletList
            items={[
              "Histograms and bin width",
              "Boxplots, IQR, and outliers",
              "COVID EDA and simple predictions",
              "Likelihood and MLE examples",
            ]}
          />
        </Block>
        <Block title="Part II">
          <BulletList
            items={[
              "Normal MLE for mean and variance",
              "Unbiased vs biased estimators",
              "Method of moments",
              "Comparing MLE and MoM",
            ]}
          />
        </Block>
      </div>
    </SceneFrame>
  );
}
