import type { ComponentType } from "react";
import { SignLevelExplorerGame, SignWilcoxonConceptQuiz } from "../games";
import {
  LyapunovNoteScene,
  SignExampleSetupScene,
  SignExampleSolutionScene,
  SignSetupScene,
  SignTypeIScene,
  TakeawaysScene,
  TiesExampleConclusionScene,
  TiesExampleRanksScene,
  TiesExampleSetupScene,
  TiesRulesScene,
  WilcoxonAssumptionsScene,
  WilcoxonContinuityScene,
  WilcoxonMotivationScene,
  WilcoxonNormalApproxScene,
  WilcoxonNullDistScene,
  WilcoxonProcedureScene,
  WilcoxonSunfishPvalueScene,
  WilcoxonSunfishSetupScene,
  WilcoxonSunfishTableScene,
} from "./contentScenes";
import { CoverScene, IntroScene, OutlineScene } from "./courseScenes";

export type SceneDef = {
  id: string;
  chapter: string;
  label: string;
  Scene: ComponentType;
};

export const SCENES: SceneDef[] = [
  { id: "cover", chapter: "Welcome", label: "Cover", Scene: CoverScene },
  { id: "outline", chapter: "Welcome", label: "Outline", Scene: OutlineScene },
  { id: "intro", chapter: "Welcome", label: "Topics", Scene: IntroScene },
  { id: "sign-setup", chapter: "Sign test", label: "Setup", Scene: SignSetupScene },
  { id: "sign-ex", chapter: "Sign test", label: "Call-center data", Scene: SignExampleSetupScene },
  { id: "sign-sol", chapter: "Sign test", label: "Solution", Scene: SignExampleSolutionScene },
  { id: "sign-typeI", chapter: "Sign test", label: "Type I error", Scene: SignTypeIScene },
  { id: "w-mot", chapter: "Wilcoxon", label: "Why ranks?", Scene: WilcoxonMotivationScene },
  { id: "w-assume", chapter: "Wilcoxon", label: "Assumptions", Scene: WilcoxonAssumptionsScene },
  { id: "w-proc", chapter: "Wilcoxon", label: "Procedure", Scene: WilcoxonProcedureScene },
  { id: "w-fish", chapter: "Wilcoxon", label: "Sunfish data", Scene: WilcoxonSunfishSetupScene },
  { id: "w-table", chapter: "Wilcoxon", label: "Signed ranks", Scene: WilcoxonSunfishTableScene },
  { id: "w-null", chapter: "Wilcoxon", label: "Null law", Scene: WilcoxonNullDistScene },
  { id: "w-lyap", chapter: "Wilcoxon", label: "Lyapunov note", Scene: LyapunovNoteScene },
  { id: "w-norm", chapter: "Wilcoxon", label: "Normal approx", Scene: WilcoxonNormalApproxScene },
  { id: "w-cc", chapter: "Wilcoxon", label: "Continuity corr.", Scene: WilcoxonContinuityScene },
  { id: "w-pval", chapter: "Wilcoxon", label: "Sunfish p-value", Scene: WilcoxonSunfishPvalueScene },
  { id: "ties-rules", chapter: "Ties", label: "Rules", Scene: TiesRulesScene },
  { id: "ties-setup", chapter: "Ties", label: "Example setup", Scene: TiesExampleSetupScene },
  { id: "ties-ranks", chapter: "Ties", label: "Average ranks", Scene: TiesExampleRanksScene },
  { id: "ties-end", chapter: "Ties", label: "Conclusion", Scene: TiesExampleConclusionScene },
  { id: "game-sign", chapter: "Game", label: "Sign-test explorer", Scene: SignLevelExplorerGame },
  { id: "quiz-sw", chapter: "Game", label: "Concept check", Scene: SignWilcoxonConceptQuiz },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
