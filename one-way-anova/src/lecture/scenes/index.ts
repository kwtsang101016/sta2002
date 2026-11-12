import type { ComponentType } from "react";
import { AnovaConceptQuiz } from "../games";
import {
  ErrorChiScene,
  FStatScene,
  MeanSquaresScene,
  MeansSetupScene,
  PartitionScene,
  PulloutAnovaScene,
  PulloutBoxplotScene,
  PulloutDataScene,
  SampleMeansScene,
  TakeawaysScene,
  TheoremScene,
  TotalSSScene,
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
  { id: "intro", chapter: "Welcome", label: "Beyond two groups", Scene: IntroScene },
  { id: "means", chapter: "Model", label: "Several means", Scene: MeansSetupScene },
  { id: "samples", chapter: "Model", label: "Sample & grand mean", Scene: SampleMeansScene },
  { id: "ssto", chapter: "SS", label: "SS(TO)", Scene: TotalSSScene },
  { id: "partition", chapter: "SS", label: "SS(E) + SS(T)", Scene: PartitionScene },
  { id: "sse", chapter: "SS", label: "Within-group", Scene: ErrorChiScene },
  { id: "ms", chapter: "SS", label: "Mean squares", Scene: MeanSquaresScene },
  { id: "theorem", chapter: "F test", label: "Quadratic-form thm", Scene: TheoremScene },
  { id: "fstat", chapter: "F test", label: "F statistic", Scene: FStatScene },
  { id: "pullout", chapter: "Example", label: "Pullout data", Scene: PulloutDataScene },
  { id: "anova-table", chapter: "Example", label: "ANOVA table", Scene: PulloutAnovaScene },
  { id: "boxplot", chapter: "Example", label: "Boxplots", Scene: PulloutBoxplotScene },
  { id: "quiz", chapter: "Game", label: "Concept check", Scene: AnovaConceptQuiz },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
