import type { ComponentType } from "react";
import { CiLevelExplorerGame } from "../games/CiLevelExplorerGame";
import {
  CltApproxScene,
  CltSetupScene,
  CommuteCiScene,
  CommutePointScene,
  CommuteSetupScene,
  GeneralCltScene,
  GeneralMedianIjScene,
  GeneralMinMaxScene,
  GeneralPiPScene,
  MedianN5LevelScene,
  MedianN5SetupScene,
  N16BinomialScene,
  N16SetupScene,
  OtherQuantileApproxScene,
  OtherQuantileSetupScene,
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
  { id: "med-n5", chapter: "Median CI", label: "n=5 setup", Scene: MedianN5SetupScene },
  { id: "med-n5-level", chapter: "Median CI", label: "94% level", Scene: MedianN5LevelScene },
  { id: "med-minmax", chapter: "Median CI", label: "(X₍₁₎, X₍ₙ₎)", Scene: GeneralMinMaxScene },
  { id: "n16-setup", chapter: "Median CI", label: "n=16 setup", Scene: N16SetupScene },
  { id: "n16-bin", chapter: "Median CI", label: "Bin(16,½)", Scene: N16BinomialScene },
  { id: "med-ij", chapter: "Median CI", label: "General (i,j)", Scene: GeneralMedianIjScene },
  { id: "clt-setup", chapter: "CLT", label: "Large-n idea", Scene: CltSetupScene },
  { id: "clt-approx", chapter: "CLT", label: "n=27 approx", Scene: CltApproxScene },
  { id: "q25-setup", chapter: "Other πₚ", label: "π₀.₂₅ setup", Scene: OtherQuantileSetupScene },
  { id: "q25-approx", chapter: "Other πₚ", label: "π₀.₂₅ level", Scene: OtherQuantileApproxScene },
  { id: "gen-exact", chapter: "General πₚ", label: "Exact Bin(n,p)", Scene: GeneralPiPScene },
  { id: "gen-clt", chapter: "General πₚ", label: "CLT formula", Scene: GeneralCltScene },
  { id: "commute-data", chapter: "Example", label: "Commute data", Scene: CommuteSetupScene },
  { id: "commute-pt", chapter: "Example", label: "π̂₀.₃", Scene: CommutePointScene },
  { id: "commute-ci", chapter: "Example", label: "CI level", Scene: CommuteCiScene },
  { id: "game-level", chapter: "Game", label: "CI level explorer", Scene: CiLevelExplorerGame },
  { id: "takeaways", chapter: "Summary", label: "Takeaways", Scene: TakeawaysScene },
];
