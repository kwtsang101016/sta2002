import type { ComponentType } from "react";
import {
  BetaDefScene,
  DefinitionScene,
  ExampleFourthCdfScene,
  ExampleFourthPdfScene,
  ExampleMaxCdfScene,
  ExampleOrderedScene,
  ExampleSetupScene,
  PitOrderScene,
  PitSingleScene,
  ProofCdfScene,
  ProofPdfScene,
  TakeawaysScene,
  TheoremInterpretScene,
  TheoremScene,
  UniformBetaScene,
  UniformOsScene,
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
  { id: "intro", chapter: "Welcome", label: "Why order stats", Scene: IntroScene },
  { id: "def", chapter: "Definition", label: "Order stats def", Scene: DefinitionScene },
  { id: "ex-setup", chapter: "Example", label: "f(x)=2x setup", Scene: ExampleSetupScene },
  { id: "ex-order", chapter: "Example", label: "Observed order", Scene: ExampleOrderedScene },
  { id: "ex-max", chapter: "Example", label: "CDF of max", Scene: ExampleMaxCdfScene },
  { id: "ex-4cdf", chapter: "Example", label: "CDF of X_{(4)}", Scene: ExampleFourthCdfScene },
  { id: "ex-4pdf", chapter: "Example", label: "PDF of X_{(4)}", Scene: ExampleFourthPdfScene },
  { id: "thm", chapter: "General", label: "CDF / PDF theorem", Scene: TheoremScene },
  { id: "thm-read", chapter: "General", label: "Reading the PDF", Scene: TheoremInterpretScene },
  { id: "proof-cdf", chapter: "Proof", label: "CDF via Binomial", Scene: ProofCdfScene },
  { id: "proof-pdf", chapter: "Proof", label: "PDF by derivative", Scene: ProofPdfScene },
  { id: "unif", chapter: "Uniform", label: "U_{(k)} PDF", Scene: UniformOsScene },
  { id: "beta", chapter: "Beta", label: "Beta definition", Scene: BetaDefScene },
  { id: "unif-beta", chapter: "Uniform", label: "U_{(k)} ~ Beta", Scene: UniformBetaScene },
  { id: "pit", chapter: "PIT", label: "F(X_i) ~ U(0,1)", Scene: PitSingleScene },
  { id: "pit-os", chapter: "PIT", label: "F(X_{(k)}) ~ Beta", Scene: PitOrderScene },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
