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
          <>
            <strong>Yanxiang Xi (USTF)</strong> — 124090713@link.cuhk.edu.cn
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
      <p className={styles.muted} style={{ marginTop: 8 }}>
        The schedule and topics may be adjusted during the semester according to course progress.
      </p>
      <div className={styles.scheduleGrid}>
        <ScheduleTable rows={SCHEDULE_LEFT} />
        <ScheduleTable rows={SCHEDULE_RIGHT} />
      </div>
      <p className={styles.lead} style={{ marginTop: 16 }}>
        Final exam will be arranged by the school.
      </p>
    </SceneFrame>
  );
}

type ScheduleRow = {
  week: string;
  date: string;
  topic: string;
  highlight?: boolean;
};

const SCHEDULE_LEFT: ScheduleRow[] = [
  { week: "1", date: "8 Sep (Tue)", topic: "Introduction" },
  { week: "", date: "10 Sep (Thu)", topic: "Review of common distributions, MGF, CLT" },
  { week: "2", date: "15 Sep (Tue)", topic: "Maximum Likelihood Estimation" },
  { week: "", date: "17 Sep (Thu)", topic: "Method of moments, Unbiased estimation" },
  { week: "3", date: "22 Sep (Tue)", topic: "Confidence intervals for means" },
  { week: "", date: "24 Sep (Thu)", topic: "CIs for difference of two means, CIs for proportions" },
  { week: "4", date: "29 Sep (Tue)", topic: "Tests of statistical hypotheses" },
  { week: "", date: "8 Oct (Thu)", topic: "Critical region, p-values" },
  { week: "5", date: "13 Oct (Tue)", topic: "Student's t-tests" },
  { week: "", date: "15 Oct (Thu)", topic: "Tests about proportions" },
  { week: "6", date: "20 Oct (Tue)", topic: "Review session" },
  { week: "", date: "24 Oct (Sat)", topic: "Midterm 09:00–11:30", highlight: true },
  { week: "7", date: "27 Oct (Tue)", topic: "Power of a statistical test" },
  { week: "", date: "29 Oct (Thu)", topic: "Power of a statistical test" },
];

const SCHEDULE_RIGHT: ScheduleRow[] = [
  { week: "8", date: "3 Nov (Tue)", topic: "Order statistics" },
  { week: "", date: "5 Nov (Thu)", topic: "Nonparametric CIs and tests" },
  { week: "9", date: "10 Nov (Tue)", topic: "Chi-square goodness-of-fit tests" },
  { week: "", date: "12 Nov (Thu)", topic: "Tests for homogeneity and independence" },
  { week: "10", date: "17 Nov (Tue)", topic: "One-way ANOVA" },
  { week: "", date: "19 Nov (Thu)", topic: "F-tests" },
  { week: "11", date: "24 Nov (Tue)", topic: "Two-way ANOVA" },
  { week: "", date: "26 Nov (Thu)", topic: "Introduction to regression" },
  { week: "12", date: "1 Dec (Tue)", topic: "More regression" },
  { week: "", date: "3 Dec (Thu)", topic: "Tests concerning regression" },
  { week: "13", date: "8 Dec (Tue)", topic: "Likelihood ratio tests" },
  { week: "", date: "10 Dec (Thu)", topic: "Review session" },
  { week: "14", date: "15 Dec (Tue)", topic: "Study break" },
  { week: "", date: "17 Dec (Thu)", topic: "Study break" },
];

function ScheduleTable({ rows }: { rows: ScheduleRow[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.week}-${row.date}`} className={row.highlight ? styles.scheduleHighlight : undefined}>
              <td className={styles.scheduleWeek}>{row.week}</td>
              <td className={styles.scheduleDate}>{row.date}</td>
              <td>{row.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
