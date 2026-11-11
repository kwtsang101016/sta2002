import { ConceptQuiz } from "./ConceptQuiz";
import { CONTINGENCY_QUIZ, CONTINGENCY_QUIZ_INTRO } from "./quizBanks";

export function ContingencyConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="contingency"
      title="Concept check: contingency tables"
      intro={CONTINGENCY_QUIZ_INTRO}
      questions={CONTINGENCY_QUIZ}
    />
  );
}
