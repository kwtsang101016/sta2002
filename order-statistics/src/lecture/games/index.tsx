import { ConceptQuiz } from "./ConceptQuiz";
import { OS_QUIZ, OS_QUIZ_INTRO } from "./quizBanks";

export function OrderStatsConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="order-stats"
      title="Concept check: order statistics"
      intro={OS_QUIZ_INTRO}
      questions={OS_QUIZ}
    />
  );
}
