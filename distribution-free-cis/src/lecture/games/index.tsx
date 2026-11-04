import { ConceptQuiz } from "./ConceptQuiz";
import { DF_CIS_QUIZ, DF_CIS_QUIZ_INTRO } from "./quizBanks";

export { CiLevelExplorerGame } from "./CiLevelExplorerGame";

export function DfCisConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="df-cis"
      title="Concept check: distribution-free CIs"
      intro={DF_CIS_QUIZ_INTRO}
      questions={DF_CIS_QUIZ}
    />
  );
}
