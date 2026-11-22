import { ConceptQuiz } from "./ConceptQuiz";
import { LINEAR_REGRESSION_QUIZ, LINEAR_REGRESSION_QUIZ_INTRO } from "./quizBanks";

export function LinearRegressionConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="linear-regression"
      title="Concept check: linear regression"
      intro={LINEAR_REGRESSION_QUIZ_INTRO}
      questions={LINEAR_REGRESSION_QUIZ}
    />
  );
}
