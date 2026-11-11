import type { ComponentType } from "react";
import { ContingencyConceptQuiz } from "../games";
import {
  BrandsDataScene,
  BrandsDecisionScene,
  BrandsTableScene,
  CollegeDataScene,
  CollegeDecisionScene,
  CollegeExpectedScene,
  CompareScene,
  DecisionRuleScene,
  HomogeneityDefScene,
  HomogeneityStatScene,
  IndependenceDfScene,
  IndependenceHypScene,
  IndependenceProbScene,
  IndependenceSetupScene,
  IndependenceStatScene,
  MedicalDataScene,
  MedicalDecisionScene,
  MedicalNullScene,
  StatisticScene,
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
  { id: "intro", chapter: "Welcome", label: "Topics", Scene: IntroScene },
  { id: "medical", chapter: "Example", label: "Medical care", Scene: MedicalDataScene },
  { id: "medical-null", chapter: "Example", label: "Same preferences", Scene: MedicalNullScene },
  { id: "statistic", chapter: "Model", label: "Chi-square Q", Scene: StatisticScene },
  { id: "medical-dec", chapter: "Example", label: "q = 7.554", Scene: MedicalDecisionScene },
  { id: "homog", chapter: "Homogeneity", label: "Definition", Scene: HomogeneityDefScene },
  { id: "homog-stat", chapter: "Homogeneity", label: "Expected counts", Scene: HomogeneityStatScene },
  { id: "decision", chapter: "Homogeneity", label: "Decision rule", Scene: DecisionRuleScene },
  { id: "brands", chapter: "Homogeneity", label: "Three brands", Scene: BrandsDataScene },
  { id: "brands-table", chapter: "Homogeneity", label: "Binned table", Scene: BrandsTableScene },
  { id: "brands-dec", chapter: "Homogeneity", label: "q = 12.55", Scene: BrandsDecisionScene },
  { id: "indep", chapter: "Independence", label: "Two attributes", Scene: IndependenceSetupScene },
  { id: "indep-prob", chapter: "Independence", label: "Probabilities", Scene: IndependenceProbScene },
  { id: "indep-hyp", chapter: "Independence", label: "Hypotheses", Scene: IndependenceHypScene },
  { id: "indep-stat", chapter: "Independence", label: "MLEs for margins", Scene: IndependenceStatScene },
  { id: "indep-df", chapter: "Independence", label: "df = (k−1)(h−1)", Scene: IndependenceDfScene },
  { id: "college", chapter: "Independence", label: "Gender × college", Scene: CollegeDataScene },
  { id: "college-e", chapter: "Independence", label: "Expected & q", Scene: CollegeExpectedScene },
  { id: "college-dec", chapter: "Independence", label: "Reject at 0.01", Scene: CollegeDecisionScene },
  { id: "compare", chapter: "Summary", label: "Compare tests", Scene: CompareScene },
  { id: "quiz", chapter: "Game", label: "Concept check", Scene: ContingencyConceptQuiz },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
