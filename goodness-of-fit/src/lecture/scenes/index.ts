import type { ComponentType } from "react";
import { ChiSquareDiceGame, GoodnessOfFitConceptQuiz } from "../games";
import {
  CallsCombinedScene,
  CallsDataScene,
  CallsDecisionScene,
  CallsNineScene,
  ChiSquareOneScene,
  CoinsDecisionScene,
  CoinsProbScene,
  CoinsSetupScene,
  CoinsStatisticScene,
  ContinuousPartitionScene,
  DecisionScene,
  DegreesScene,
  DiceDataScene,
  GofDefinitionScene,
  MultinomialScene,
  OneFaceScene,
  PoissonDataScene,
  PoissonDecisionScene,
  PoissonSetupScene,
  RealizedScene,
  SixFaceScene,
  TakeawaysScene,
  TheoremScene,
  TwoCellScene,
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
  { id: "intro", chapter: "Welcome", label: "Pearson’s statistic", Scene: IntroScene },
  { id: "dice", chapter: "Die", label: "600 rolls", Scene: DiceDataScene },
  { id: "one-face", chapter: "Die", label: "One face", Scene: OneFaceScene },
  { id: "chi1", chapter: "Die", label: "Chi-square(1)", Scene: ChiSquareOneScene },
  { id: "six", chapter: "Die", label: "All six faces", Scene: SixFaceScene },
  { id: "two-cell", chapter: "Die", label: "Six-cell statistic", Scene: TwoCellScene },
  { id: "gof-def", chapter: "Model", label: "Goodness-of-fit", Scene: GofDefinitionScene },
  { id: "multi", chapter: "Model", label: "Multinomial", Scene: MultinomialScene },
  { id: "theorem", chapter: "Model", label: "Null distribution", Scene: TheoremScene },
  { id: "realized", chapter: "Model", label: "O and E", Scene: RealizedScene },
  { id: "decision", chapter: "Model", label: "Decision rule", Scene: DecisionScene },
  { id: "coins", chapter: "Binomial", label: "Four coins", Scene: CoinsSetupScene },
  { id: "coins-p", chapter: "Binomial", label: "Cell probabilities", Scene: CoinsProbScene },
  { id: "coins-q", chapter: "Binomial", label: "q₅ = 4.47", Scene: CoinsStatisticScene },
  { id: "coins-dec", chapter: "Binomial", label: "Retain H₀", Scene: CoinsDecisionScene },
  { id: "calls", chapter: "Exponential", label: "911 times", Scene: CallsDataScene },
  { id: "bins", chapter: "Exponential", label: "Continuous bins", Scene: ContinuousPartitionScene },
  { id: "nine", chapter: "Exponential", label: "Nine bins", Scene: CallsNineScene },
  { id: "pooled", chapter: "Exponential", label: "Pooled tail", Scene: CallsCombinedScene },
  { id: "exp-dec", chapter: "Exponential", label: "q₆ = 2.9797", Scene: CallsDecisionScene },
  { id: "barium", chapter: "Poisson", label: "Barium counts", Scene: PoissonDataScene },
  { id: "pois-setup", chapter: "Poisson", label: "Unknown λ", Scene: PoissonSetupScene },
  { id: "df", chapter: "Poisson", label: "Degrees of freedom", Scene: DegreesScene },
  { id: "pois-dec", chapter: "Poisson", label: "q₆ = 2.763", Scene: PoissonDecisionScene },
  { id: "game", chapter: "Game", label: "Die explorer", Scene: ChiSquareDiceGame },
  { id: "quiz", chapter: "Game", label: "Concept check", Scene: GoodnessOfFitConceptQuiz },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
