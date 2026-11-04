import { ConceptQuiz } from "./ConceptQuiz";
import { SW_QUIZ, SW_QUIZ_INTRO } from "./quizBanks";

export { SignLevelExplorerGame } from "./SignLevelExplorerGame";

export function SignWilcoxonConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="sign-wilcoxon"
      title="Concept check: sign & Wilcoxon tests"
      intro={SW_QUIZ_INTRO}
      questions={SW_QUIZ}
    />
  );
}
