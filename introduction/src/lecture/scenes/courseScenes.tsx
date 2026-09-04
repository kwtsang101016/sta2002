import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { Block, BulletList, Figure, OrderedList, SceneFrame } from "./shared";

const COVER_HINT_LIVE =
  "Use ← → or the buttons above. Interactive games reinforce key concepts. Download PDF for a printable handout.";
const COVER_HINT_PRINT = "Printed handout · interactive examples on the website";

export function CoverScene() {
  const print = usePrintMode();
  return (
    <section className={`${styles.scene} ${styles.cover}`} id="cover">
      <div className={styles.coverInner}>
        <p className={styles.kicker}>STA2002 · Probability and Statistics II</p>
        <h1 className={styles.coverTitle}>Introduction and Preliminary</h1>
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
    <SceneFrame kicker="Lecture 1" title="Outline">
      <OrderedList
        items={[
          "Course Arrangement",
          "Probability vs Statistics",
          "Random variable and distribution function",
          "Discrete Distributions",
          "Continuous Distributions",
          "Two Limit Theorems",
          "Student's Theorem",
        ]}
      />
    </SceneFrame>
  );
}

export function InstructorsScene() {
  return (
    <SceneFrame kicker="Course arrangement" title="Course Instructors">
      <BulletList
        items={[
          <>
            <strong>Zhenxing Guo</strong>
            <ul>
              <li>Lecture time: Mon/Wed 10:30–11:50</li>
              <li>Office/OH: Rm 320a, Daoyuan Building / Wed 15:00–16:00</li>
              <li>Email: guozhenxing@cuhk.edu.cn</li>
            </ul>
          </>,
          <>
            <strong>Ka Wai Tsang</strong>
            <ul>
              <li>Lecture time: Tue/Thu 15:30–16:50</li>
              <li>Office/OH: Rm 505b, Daoyuan Building / Tue 17:00–18:00</li>
              <li>Email: kwtsang@cuhk.edu.cn</li>
            </ul>
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function TasScene() {
  return (
    <SceneFrame kicker="Course arrangement" title="Teaching Assistants and UG Teaching Fellows">
      <BulletList
        items={[
          <>
            <strong>Yaohui Guo (TA)</strong> — DY324 (No. 4) / Mon 19:00–20:00 · 225040463@link.cuhk.edu.cn
          </>,
          <>
            <strong>Jinyi Li (TA)</strong> — DY 324 (No. 5) / Thu 14:00–15:00 · 121090268@link.cuhk.edu.cn
          </>,
          <>
            <strong>Ziming Wang (TA)</strong> — Zhixin 412 (No. 86) / Mon 15:00–16:00 · 224040336@link.cuhk.edu.cn
          </>,
          <>
            <strong>Chenyu Yang (TA)</strong> — RB311 / Fri 17:00–18:00 · 224040354@link.cuhk.edu.cn
          </>,
          <>
            <strong>Xiaoxia Sheng (USTF)</strong> — 123090494@link.cuhk.edu.cn
          </>,
          <>
            <strong>Runkai Zhao (USTF)</strong> — 123090863@link.cuhk.edu.cn
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function ReferenceScene() {
  return (
    <SceneFrame kicker="Course arrangement" title="Reference book and Tutorials">
      <p className={styles.lead}>
        Hogg, R. V., Tanis, E. A., Zimmerman, D. L. (2015) <em>Probability and Statistical Inference</em>, 9th edition, Pearson
      </p>
      <Figure src="/figures/RefBook.jpg" alt="Reference textbook cover" width="120px" />
      <BulletList
        items={[
          "The first two lectures will review some essential concepts from STA2001, which corresponds to Chapter 1 to 5.",
          "This course will focus on Chapter 6 to Chapter 9",
          <>
            Tutorials begin on the <span className={styles.highlight}>second</span> week, i.e. the week of Sept 14th
          </>,
        ]}
      />
    </SceneFrame>
  );
}

export function AssessmentScene() {
  return (
    <SceneFrame kicker="Course arrangement" title="Assessment scheme">
      <Figure src="/figures/Assess_table.png" alt="Assessment scheme table" width="80%" />
      <BulletList
        items={[
          <>
            You are expected to work on all assignments on your own. <strong>No late assignment will be accepted.</strong> No exceptions. The lowest assignment score will be dropped.
          </>,
          "Both the midterm and final exams will be closed book, closed notes and no devices. However, you are allowed to bring in one cheat sheet for the midterm and up to two cheat sheets for the final. The cheat sheets should be handwritten and in A4 size. You can write on both the front and back of the cheat sheet(s).",
        ]}
      />
    </SceneFrame>
  );
}

export function ImportantNotesScene() {
  return (
    <SceneFrame kicker="Course arrangement" title="Important notes">
      <BulletList
        items={[
          "A makeup exam is allowed ONLY under provable unforeseen circumstances beyond the control of the student. Only a written request for a makeup exam that is sent BEFORE the exam date and is accompanied by all relevant supporting documentation will be considered.",
          "Any form of academic dishonesty, which includes, but is not limited to, cheating in examinations, plagiarism and sharing of assignments with others, will NOT be tolerated. Any related offense will lead to disciplinary action including termination of studies at the University.",
        ]}
      />
    </SceneFrame>
  );
}

export function TentativePlanScene() {
  return (
    <SceneFrame kicker="Course arrangement" title="Tentative plan">
      <Figure src="/figures/tentative_plan.png" alt="Tentative course plan" width="70%" />
    </SceneFrame>
  );
}

export function IntroScene() {
  return (
    <SceneFrame kicker="Introduction" title="Introduction">
      <BulletList
        items={[
          "Our first two lectures are warm-up lectures.",
          "We will review some essential concepts from STA2001, which will serve as our foundation in learning various advanced statistical concepts in STA2002 later on.",
          "Suggested reading: Chapter 1 to Chapter 5 in the book.",
        ]}
      />
    </SceneFrame>
  );
}

export function ProbVsStatScene1() {
  return (
    <SceneFrame kicker="Probability vs Statistics" title="Probability vs Statistics">
      <Block title="Probability">
        <p>Given a <strong>mathematical model</strong> of real world, figure out <strong>what will happen</strong>.</p>
      </Block>
      <Block title="Statistics">
        <p>Given <strong>data/observations</strong> of what happened, figure out <strong>what model or process explains what happened</strong>.</p>
      </Block>
    </SceneFrame>
  );
}

export function ProbVsStatScene2() {
  return (
    <SceneFrame kicker="Probability vs Statistics" title="Probability vs Statistics">
      <Block title="Questions in Probability">
        <p>
          When we flip a fair coin five times, what is the probability of observing the same side coming up all five times?
        </p>
      </Block>
      <Block title="Questions in Statistics">
        <BulletList
          items={[
            "You flip the coin five times and see it landed on Heads each time. Should you conclude the coin is not a fair coin?",
            "You flip the coin 20 times and see Heads 14 times. What is your estimate of the probability of landing on Heads?",
            "What if you flip the coin 1000 times and see Heads 700 times? Do you feel equally confident about the estimates in these two scenarios?",
          ]}
        />
      </Block>
    </SceneFrame>
  );
}

export function ProbVsStatScene3() {
  return (
    <SceneFrame kicker="Probability vs Statistics" title="Probability vs Statistics">
      <p className={styles.lead}>In statistics,</p>
      <BulletList
        items={[
          "Compare statistical measurements with what probability predicts;",
          "Use statistical measurements to make inferences about the probabilistic model;",
          "Evaluate how much confidence we have in these inferences.",
        ]}
      />
      <p className={styles.lead} style={{ marginTop: 20 }}>Key concepts:</p>
      <BulletList items={["Hypothesis testing", "Parameter estimation", "Confidence interval"]} />
    </SceneFrame>
  );
}
