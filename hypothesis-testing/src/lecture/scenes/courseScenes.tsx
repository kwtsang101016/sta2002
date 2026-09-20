import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Block, BulletList, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE = "Use ← → or the jump menu · DOWNLOAD PDF for a handout";
const COVER_HINT_PRINT = "STA2002 · Hypothesis Testing handout";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`}>
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Hypothesis Testing</h1>
        <p className={styles.lead}>
          Concepts and tests for a mean · Two means and variances · Proportions · Power and sample size
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
          "Hypothesis Testing I — concepts, errors, p-values, tests for one normal mean",
          "Hypothesis Testing II — pooled, Welch, paired t-tests, and the F-test",
          "Hypothesis Testing III — one proportion and equality of two proportions",
          "Hypothesis Testing IV — power functions and sample size",
        ]}
      />
      <p className={styles.muted} style={{ marginTop: 16 }}>
        Suggested reading: Hogg, Tanis &amp; Zimmerman — Chapters 8.1–8.3 and 8.5.
      </p>
    </SceneFrame>
  );
}

export function Part1Scene() {
  return (
    <PartTitleScene
      part="Part I"
      subtitle="Hypothesis Testing I"
      items={[
        "Null and alternative hypotheses, critical regions, and decision rules",
        "Type I and Type II errors, significance level, and p-values",
        "Tests for a normal mean when σ² is known or unknown",
      ]}
    />
  );
}

export function Part2Scene() {
  return (
    <PartTitleScene
      part="Part II"
      subtitle="Hypothesis Testing II"
      items={[
        "Pooled, Welch, and paired t-tests for two means",
        "F-test for equality of two normal variances",
      ]}
    />
  );
}

export function Part3Scene() {
  return (
    <PartTitleScene
      part="Part III"
      subtitle="Hypothesis Testing III"
      items={["Tests for one proportion", "Tests for equality of two proportions"]}
    />
  );
}

export function Part4Scene() {
  return (
    <PartTitleScene
      part="Part IV"
      subtitle="Hypothesis Testing IV"
      items={["Power functions", "Sample size to control α and β"]}
    />
  );
}

function PartTitleScene({
  part,
  subtitle,
  items,
}: {
  part: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <SceneFrame kicker={part} title={subtitle}>
      <Block title="In this part">
        <BulletList items={items} />
      </Block>
    </SceneFrame>
  );
}
