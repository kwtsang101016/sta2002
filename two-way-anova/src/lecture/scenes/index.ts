import type { ComponentType } from "react";
import { TwoWayAnovaConceptQuiz, TwoWayAnovaExplorerGame, ZeroSumEffectsGame } from "../games";
import {
  AdditiveModelScene,
  AnovaTableScene,
  CarsDataScene,
  CarsSolutionScene,
  ChiSquareScene,
  DigitsDataScene,
  DigitsSolutionScene,
  FAScene,
  FBScene,
  HypothesesScene,
  InteractionMeansScene,
  InteractionModelScene,
  InteractionMotifScene,
  InteractionSSScene,
  InteractionTableScene,
  InteractionTestsScene,
  MeansScene,
  OneObsSetupScene,
  PartitionScene,
  TakeawaysScene,
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
  { id: "intro", chapter: "Welcome", label: "Two factors", Scene: IntroScene },
  { id: "one-obs", chapter: "Additive", label: "One obs / cell", Scene: OneObsSetupScene },
  { id: "additive", chapter: "Additive", label: "Additive means", Scene: AdditiveModelScene },
  { id: "zero-sum", chapter: "Additive", label: "Why sum to 0", Scene: ZeroSumEffectsGame },
  { id: "hypotheses", chapter: "Additive", label: "HA and HB", Scene: HypothesesScene },
  { id: "means", chapter: "Additive", label: "Row / column means", Scene: MeansScene },
  { id: "partition", chapter: "SS", label: "SS partition", Scene: PartitionScene },
  { id: "chisq", chapter: "SS", label: "Chi-square laws", Scene: ChiSquareScene },
  { id: "fa", chapter: "F tests", label: "FA", Scene: FAScene },
  { id: "fb", chapter: "F tests", label: "FB", Scene: FBScene },
  { id: "anova-table", chapter: "Additive", label: "ANOVA table", Scene: AnovaTableScene },
  { id: "cars-data", chapter: "Example", label: "Cars–gas data", Scene: CarsDataScene },
  { id: "cars-sol", chapter: "Example", label: "Cars–gas decision", Scene: CarsSolutionScene },
  { id: "interact-why", chapter: "Interaction", label: "Why interaction", Scene: InteractionMotifScene },
  { id: "interact-model", chapter: "Interaction", label: "Interaction model", Scene: InteractionModelScene },
  { id: "interact-means", chapter: "Interaction", label: "Cell means", Scene: InteractionMeansScene },
  { id: "interact-ss", chapter: "Interaction", label: "SS with AB", Scene: InteractionSSScene },
  { id: "interact-f", chapter: "Interaction", label: "FAB, FA, FB", Scene: InteractionTestsScene },
  { id: "interact-table", chapter: "Interaction", label: "ANOVA + AB", Scene: InteractionTableScene },
  { id: "digits-data", chapter: "Example", label: "Digits data", Scene: DigitsDataScene },
  { id: "digits-sol", chapter: "Example", label: "Digits decision", Scene: DigitsSolutionScene },
  { id: "quiz", chapter: "Game", label: "Concept check", Scene: TwoWayAnovaConceptQuiz },
  { id: "anova-explorer", chapter: "Game", label: "ANOVA explorer", Scene: TwoWayAnovaExplorerGame },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
