import { ConceptQuiz } from "./ConceptQuiz";
import { QUANTILES_QUIZ, QUANTILES_QUIZ_INTRO } from "./quizBanks";

export { QqExplorerGame } from "./QqExplorerGame";

export function QuantilesConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="quantiles"
      title="Concept check: quantiles & Q-Q plots"
      intro={QUANTILES_QUIZ_INTRO}
      questions={QUANTILES_QUIZ}
    />
  );
}
