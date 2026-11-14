import { ConceptQuiz } from "./ConceptQuiz";
import { TWO_WAY_ANOVA_QUIZ, TWO_WAY_ANOVA_QUIZ_INTRO } from "./quizBanks";

export function TwoWayAnovaConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="two-way-anova"
      title="Concept check: two-way ANOVA"
      intro={TWO_WAY_ANOVA_QUIZ_INTRO}
      questions={TWO_WAY_ANOVA_QUIZ}
    />
  );
}
