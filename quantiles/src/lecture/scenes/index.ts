import type { ComponentType } from "react";
import { QqExplorerGame } from "../games/QqExplorerGame";
import {
  BiasIntroScene,
  BiasPdfScene,
  BiasResultScene,
  NormalQuantileScene,
  QqExamplePlotScene,
  QqExampleTableScene,
  QqGoodFitScene,
  QqMotivationScene,
  QqPoorHeavyTailsScene,
  QqPoorRightTailScene,
  QuantileDefScene,
  QuantileExampleSetupScene,
  QuantileExampleSolutionScene,
  SampleMedianScene,
  SampleQuantileFormulaScene,
  SampleQuantileMotivationScene,
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
  { id: "q-def", chapter: "Quantile", label: "Definition", Scene: QuantileDefScene },
  { id: "q-normal", chapter: "Quantile", label: "Normal formula", Scene: NormalQuantileScene },
  { id: "sq-mot", chapter: "Sample quantile", label: "Order stats link", Scene: SampleQuantileMotivationScene },
  { id: "sq-formula", chapter: "Sample quantile", label: "Interpolation", Scene: SampleQuantileFormulaScene },
  { id: "sq-median", chapter: "Sample quantile", label: "Median", Scene: SampleMedianScene },
  { id: "ex-setup", chapter: "Example", label: "Data table", Scene: QuantileExampleSetupScene },
  { id: "ex-sol", chapter: "Example", label: "Median & π̂₀.₄", Scene: QuantileExampleSolutionScene },
  { id: "bias-intro", chapter: "Bias", label: "Unbiasedness?", Scene: BiasIntroScene },
  { id: "bias-pdf", chapter: "Bias", label: "Exp median PDF", Scene: BiasPdfScene },
  { id: "bias-result", chapter: "Bias", label: "Bias calculation", Scene: BiasResultScene },
  { id: "qq-mot", chapter: "Q-Q plots", label: "Motivation", Scene: QqMotivationScene },
  { id: "qq-table", chapter: "Q-Q plots", label: "Normal table", Scene: QqExampleTableScene },
  { id: "qq-plot", chapter: "Q-Q plots", label: "Example plot", Scene: QqExamplePlotScene },
  { id: "qq-good", chapter: "Reading Q-Q", label: "Good fit", Scene: QqGoodFitScene },
  { id: "qq-right", chapter: "Reading Q-Q", label: "Heavy right tail", Scene: QqPoorRightTailScene },
  { id: "qq-heavy", chapter: "Reading Q-Q", label: "Heavy tails", Scene: QqPoorHeavyTailsScene },
  { id: "game-qq", chapter: "Game", label: "Q-Q explorer", Scene: QqExplorerGame },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
