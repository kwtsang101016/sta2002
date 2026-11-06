import { ConceptQuiz } from "./ConceptQuiz";
import { GOF_QUIZ, GOF_QUIZ_INTRO } from "./quizBanks";

export { ChiSquareDiceGame } from "./ChiSquareDiceGame";

export function GoodnessOfFitConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="gof"
      title="Concept check: goodness-of-fit"
      intro={GOF_QUIZ_INTRO}
      questions={GOF_QUIZ}
    />
  );
}
