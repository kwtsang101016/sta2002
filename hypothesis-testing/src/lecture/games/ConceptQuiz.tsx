import { useEffect, useMemo, useState } from "react";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { MathText, SceneFrame } from "../scenes/shared";
import { choiceOrder, type QuizQuestion } from "./quizOrder";

type QuizState = {
  answers: (number | null)[];
  /** `questions.length` means the results screen. */
  index: number;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function emptyAnswers(length: number): (number | null)[] {
  return Array.from({ length }, () => null);
}

function loadAnswers(key: string, questions: QuizQuestion[]): (number | null)[] {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return emptyAnswers(questions.length);
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== questions.length) return emptyAnswers(questions.length);
    return parsed.map((value, i) =>
      typeof value === "number" && Number.isInteger(value) && value >= 0 && value < questions[i].choices.length
        ? value
        : null,
    );
  } catch {
    return emptyAnswers(questions.length);
  }
}

function saveAnswers(key: string, answers: (number | null)[]): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(answers));
  } catch {
    /* storage unavailable: progress simply resets when the slide is left */
  }
}

function firstUnanswered(answers: (number | null)[]): number {
  const i = answers.findIndex((a) => a === null);
  return i === -1 ? answers.length : i;
}

export function ConceptQuiz({
  quizId,
  title,
  intro,
  questions,
}: {
  quizId: string;
  title: string;
  intro: string;
  questions: QuizQuestion[];
}) {
  const print = usePrintMode();
  const storageKey = `sta2002-hypothesis-quiz-${quizId}`;
  const [state, setState] = useState<QuizState>(() => {
    const answers = loadAnswers(storageKey, questions);
    return { answers, index: firstUnanswered(answers) };
  });

  const orders = useMemo(() => questions.map((q) => choiceOrder(quizId, q)), [quizId, questions]);
  const letterOf = (questionIndex: number, choiceIndex: number) =>
    LETTERS[orders[questionIndex].indexOf(choiceIndex)];

  useEffect(() => {
    saveAnswers(storageKey, state.answers);
  }, [storageKey, state.answers]);

  if (print) {
    return (
      <SceneFrame kicker="Game" title={title} tone="gold">
        <p className={styles.muted}>
          <MathText text={intro} />
        </p>
        <ol className={styles.quizPrintList}>
          {questions.map((q, qi) => (
            <li key={q.id}>
              <MathText text={q.prompt} />
              <br />
              <strong>
                Answer ({letterOf(qi, q.answer)}): <MathText text={q.choices[q.answer].text} />
              </strong>
            </li>
          ))}
        </ol>
      </SceneFrame>
    );
  }

  const { answers, index } = state;
  const total = questions.length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const correctCount = answers.filter((a, i) => a === questions[i].answer).length;
  const reachable = firstUnanswered(answers);

  const goTo = (next: number) => setState((s) => ({ ...s, index: Math.max(0, Math.min(total, next)) }));
  const choose = (choiceIndex: number) =>
    setState((s) => {
      if (s.answers[s.index] !== null) return s;
      const nextAnswers = [...s.answers];
      nextAnswers[s.index] = choiceIndex;
      return { ...s, answers: nextAnswers };
    });
  const restart = () => setState({ answers: emptyAnswers(total), index: 0 });

  const progressChips = (
    <div className={`${styles.chips} ${styles.quizChips}`} aria-label="Question progress">
      {questions.map((q, i) => {
        const a = answers[i];
        const status = a === null ? "" : a === q.answer ? styles.chipCorrect : styles.chipWrong;
        const current = i === index ? styles.chipActive : "";
        return (
          <button
            key={q.id}
            type="button"
            className={`${styles.chip} ${styles.quizChip} ${status} ${current}`.trim()}
            disabled={i > reachable}
            onClick={() => goTo(i)}
            aria-label={`Question ${i + 1}${a === null ? "" : a === q.answer ? ", correct" : ", incorrect"}`}
          >
            {i + 1}
          </button>
        );
      })}
      <span className={styles.quizScore}>
        {correctCount} / {answeredCount} correct
      </span>
    </div>
  );

  if (index >= total) {
    return (
      <SceneFrame kicker="Game" title={title} tone="gold">
        {progressChips}
        <div className={styles.card} style={{ marginTop: 16 }}>
          <p className={styles.kicker}>Results</p>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            You answered {correctCount} of {total} correctly.
          </p>
          <p className={styles.muted}>
            Click a numbered chip above to review any question and its explanation, especially the ones marked in red.
          </p>
        </div>
        <div className={styles.tools}>
          <button className={styles.toolBtn} type="button" onClick={() => goTo(total - 1)}>
            ← BACK TO LAST QUESTION
          </button>
          <button className={styles.primary} type="button" onClick={restart}>
            TRY AGAIN
          </button>
        </div>
      </SceneFrame>
    );
  }

  const q = questions[index];
  const picked = answers[index];
  const answered = picked !== null;
  const isCorrect = picked === q.answer;
  const choiceClass = (i: number) => {
    const base = `${styles.choice} ${styles.quizChoice}`;
    if (!answered) return base;
    if (i === q.answer) return `${base} ${styles.choiceCorrect}`;
    if (i === picked) return `${base} ${styles.choiceWrong} ${styles.choiceSelected}`;
    return `${base} ${styles.quizChoiceDim}`;
  };
  const isLast = index === total - 1;

  return (
    <SceneFrame kicker="Game" title={title} tone="gold">
      {progressChips}
      <p className={styles.quizCounter}>
        Question {index + 1} of {total}
      </p>
      <p className={styles.quizPrompt}>
        <MathText text={q.prompt} />
      </p>
      <div className={styles.choices}>
        {orders[index].map((choiceIndex, position) => (
          <button
            key={choiceIndex}
            className={choiceClass(choiceIndex)}
            type="button"
            disabled={answered}
            onClick={() => choose(choiceIndex)}
          >
            <span className={styles.quizLetter}>{LETTERS[position]}</span>
            <span>
              <MathText text={q.choices[choiceIndex].text} />
            </span>
          </button>
        ))}
      </div>

      {answered ? (
        <div className={styles.answer} role="status">
          <p className={styles.quizVerdict}>
            {isCorrect ? "✓ Correct." : `✗ Not quite. The answer is (${letterOf(index, q.answer)}).`}
          </p>
          <p>
            <MathText text={q.explain} />
          </p>
          {!isCorrect && picked !== null && q.choices[picked].why ? (
            <p>
              <strong>Why ({letterOf(index, picked)}) is wrong: </strong>
              <MathText text={q.choices[picked].why ?? ""} />
            </p>
          ) : null}
        </div>
      ) : (
        <p className={styles.muted} style={{ marginTop: 16 }}>
          Pick an answer to see the explanation.
        </p>
      )}

      <div className={`${styles.tools} ${styles.quizNav}`}>
        <button className={styles.toolBtn} type="button" disabled={index === 0} onClick={() => goTo(index - 1)}>
          ← PREVIOUS
        </button>
        <button className={styles.primary} type="button" disabled={!answered} onClick={() => goTo(index + 1)}>
          {isLast ? "SEE RESULTS →" : "NEXT QUESTION →"}
        </button>
        {answered ? <span className={styles.muted}>Read the explanation, then move on when you are ready.</span> : null}
      </div>
    </SceneFrame>
  );
}
