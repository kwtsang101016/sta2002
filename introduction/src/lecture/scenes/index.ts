import type { ReactElement } from "react";
import {
  BinomialExplorer,
  CltSimulation,
  CoinFlipGame,
  ContinuityCorrectionGame,
  DiscreteContinuousGame,
  DistributionMatchGame,
  ExpectationGame,
  LlnSimulation,
  PoissonQuiz,
  StudentTheoremQuiz,
  VarianceGame,
  WaitingTimeGame,
} from "../games";
import * as content from "./contentScenes";
import * as course from "./courseScenes";

export type SceneDef = {
  id: string;
  chapter: string;
  label: string;
  Scene: () => ReactElement;
};

export const SCENES: SceneDef[] = [
  { id: "cover", chapter: "Welcome", label: "Cover", Scene: course.CoverScene },
  { id: "outline", chapter: "Welcome", label: "Outline", Scene: course.OutlineScene },
  { id: "instructors", chapter: "Course", label: "Instructors", Scene: course.InstructorsScene },
  { id: "tas", chapter: "Course", label: "TAs & USTFs", Scene: course.TasScene },
  { id: "reference", chapter: "Course", label: "Reference book", Scene: course.ReferenceScene },
  { id: "assessment", chapter: "Course", label: "Assessment", Scene: course.AssessmentScene },
  { id: "notes", chapter: "Course", label: "Important notes", Scene: course.ImportantNotesScene },
  { id: "plan", chapter: "Course", label: "Tentative plan", Scene: course.TentativePlanScene },
  { id: "intro", chapter: "Review", label: "Introduction", Scene: course.IntroScene },
  { id: "prob-stat-1", chapter: "Review", label: "Prob vs Stat", Scene: course.ProbVsStatScene1 },
  { id: "prob-stat-2", chapter: "Review", label: "Prob vs Stat · Qs", Scene: course.ProbVsStatScene2 },
  { id: "prob-stat-3", chapter: "Review", label: "Prob vs Stat · concepts", Scene: course.ProbVsStatScene3 },
  { id: "coin-game", chapter: "Game", label: "Coin flip game", Scene: CoinFlipGame },
  { id: "rv-dist", chapter: "Review", label: "RV & CDF", Scene: content.RvDistScene },
  { id: "discrete", chapter: "Review", label: "Discrete case", Scene: content.DiscreteScene },
  { id: "continuous", chapter: "Review", label: "Continuous case", Scene: content.ContinuousScene },
  { id: "type-game", chapter: "Game", label: "Discrete vs continuous", Scene: DiscreteContinuousGame },
  { id: "expectation", chapter: "Review", label: "Expectation", Scene: content.ExpectationScene },
  { id: "exp-game", chapter: "Game", label: "E(X) calculator", Scene: ExpectationGame },
  { id: "variance", chapter: "Review", label: "Variance", Scene: content.VarianceScene },
  { id: "var-game", chapter: "Game", label: "Variance quiz", Scene: VarianceGame },
  { id: "mgf", chapter: "Review", label: "MGF", Scene: content.MgfScene },
  { id: "mgf-moments", chapter: "Review", label: "MGF moments", Scene: content.MgfMomentsScene },
  { id: "binomial", chapter: "Distributions", label: "Binomial", Scene: content.BinomialScene },
  { id: "binom-game", chapter: "Game", label: "Binomial explorer", Scene: BinomialExplorer },
  { id: "poisson", chapter: "Distributions", label: "Poisson", Scene: content.PoissonScene },
  { id: "poisson-moments", chapter: "Distributions", label: "Poisson · moments", Scene: content.PoissonMomentsScene },
  { id: "poisson-game", chapter: "Game", label: "Poisson MGF", Scene: PoissonQuiz },
  { id: "exponential", chapter: "Distributions", label: "Exponential", Scene: content.ExponentialScene },
  { id: "gamma-1", chapter: "Distributions", label: "Gamma", Scene: content.GammaScene1 },
  { id: "gamma-2", chapter: "Distributions", label: "Gamma · properties", Scene: content.GammaScene2 },
  { id: "waiting", chapter: "Application", label: "Waiting time", Scene: content.WaitingTimeScene },
  { id: "waiting-game", chapter: "Game", label: "Waiting time calc", Scene: WaitingTimeGame },
  { id: "chisq", chapter: "Distributions", label: "Chi-square", Scene: content.ChiSquareScene },
  { id: "normal", chapter: "Distributions", label: "Normal", Scene: content.NormalScene },
  { id: "normal-props", chapter: "Distributions", label: "Normal properties", Scene: content.NormalPropsScene },
  { id: "t-dist", chapter: "Distributions", label: "t-distribution", Scene: content.TDistScene },
  { id: "f-dist", chapter: "Distributions", label: "F-distribution", Scene: content.FDistScene },
  { id: "dist-game", chapter: "Game", label: "Match distributions", Scene: DistributionMatchGame },
  { id: "lln", chapter: "Theorems", label: "Law of Large Numbers", Scene: content.LlnScene },
  { id: "lln-game", chapter: "Game", label: "LLN simulator", Scene: LlnSimulation },
  { id: "clt", chapter: "Theorems", label: "CLT", Scene: content.CltScene },
  { id: "clt-bern", chapter: "Theorems", label: "CLT · Bernoulli", Scene: content.CltBernoulliScene },
  { id: "clt-game", chapter: "Game", label: "CLT simulator", Scene: CltSimulation },
  { id: "cc-idea", chapter: "Theorems", label: "CC · measurement", Scene: content.ContinuityCorrectionIdeaScene },
  { id: "cc", chapter: "Theorems", label: "Continuity correction", Scene: content.ContinuityCorrectionScene },
  { id: "cc-game", chapter: "Game", label: "CC comparison", Scene: ContinuityCorrectionGame },
  { id: "clt-ex", chapter: "Theorems", label: "CLT example", Scene: content.CltExampleScene },
  { id: "student", chapter: "Theorems", label: "Student's Theorem", Scene: content.StudentTheoremScene },
  { id: "student-game", chapter: "Game", label: "Student's quiz", Scene: StudentTheoremQuiz },
];
