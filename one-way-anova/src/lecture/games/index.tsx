import { ConceptQuiz } from "./ConceptQuiz";
import { ANOVA_QUIZ, ANOVA_QUIZ_INTRO } from "./quizBanks";

export function AnovaConceptQuiz() {
  return (
    <ConceptQuiz
      quizId="anova"
      title="Concept check: one-way ANOVA"
      intro={ANOVA_QUIZ_INTRO}
      questions={ANOVA_QUIZ}
    />
  );
}
