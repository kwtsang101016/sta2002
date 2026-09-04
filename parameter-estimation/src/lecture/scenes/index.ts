import type { ReactElement } from "react";
import {
  BernoulliLikelihoodGame,
  CovidEdaGame,
  CovidPredictionGame,
  PoissonMomGame,
  UniformMomGame,
  VarianceBiasGame,
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
  { id: "reading", chapter: "Welcome", label: "What we learn", Scene: course.ReadingScene },

  { id: "hist-1", chapter: "EDA", label: "Histogram", Scene: content.HistogramScene1 },
  { id: "hist-2", chapter: "EDA", label: "Bin width", Scene: content.HistogramScene2 },
  { id: "box-1", chapter: "EDA", label: "Boxplot", Scene: content.BoxplotScene1 },
  { id: "box-2", chapter: "EDA", label: "Reading boxplots", Scene: content.BoxplotScene2 },

  { id: "covid-intro", chapter: "COVID", label: "EDA questions", Scene: content.CovidIntroScene },
  { id: "covid-data", chapter: "COVID", label: "UM dataset", Scene: content.CovidDataScene },
  { id: "covid-eda-game", chapter: "Game", label: "COVID EDA", Scene: CovidEdaGame },
  { id: "covid-pred", chapter: "COVID", label: "Predictions", Scene: content.CovidPredictionScene },
  { id: "covid-pred-game", chapter: "Game", label: "COVID calculator", Scene: CovidPredictionGame },

  { id: "viz-est", chapter: "Estimation", label: "From viz to estimation", Scene: content.FromVizToEstimationScene },
  { id: "param-space", chapter: "Estimation", label: "Parameter space", Scene: content.ParameterSpaceScene },
  { id: "est-vs-est", chapter: "Estimation", label: "Estimator vs estimate", Scene: content.EstimatorEstimateScene },

  { id: "likelihood", chapter: "MLE", label: "Likelihood", Scene: content.LikelihoodScene },
  { id: "mle-def", chapter: "MLE", label: "MLE definition", Scene: content.MleDefinitionScene },
  { id: "mle-bern", chapter: "MLE", label: "Bernoulli", Scene: content.BernoulliMleScene },
  { id: "mle-bern-game", chapter: "Game", label: "Bernoulli ℓ(p)", Scene: BernoulliLikelihoodGame },
  { id: "mle-exp", chapter: "MLE", label: "Exponential", Scene: content.ExponentialMleScene },
  { id: "mle-geo", chapter: "MLE", label: "Geometric", Scene: content.GeometricMleScene },
  { id: "mle-unif", chapter: "MLE", label: "Uniform", Scene: content.UniformMleScene },
  { id: "why-mle", chapter: "MLE", label: "Why maximize L", Scene: content.WhyMaximizeLScene },

  { id: "part2", chapter: "Estimation II", label: "Part II intro", Scene: content.Part2IntroScene },
  { id: "normal-mle-1", chapter: "MLE", label: "Normal MLE setup", Scene: content.NormalMleScene1 },
  { id: "normal-mle-2", chapter: "MLE", label: "Normal MLE solution", Scene: content.NormalMleScene2 },
  { id: "unbiased", chapter: "Unbiasedness", label: "Definition", Scene: content.UnbiasednessScene },
  { id: "var-bias", chapter: "Unbiasedness", label: "Variance MLE bias", Scene: content.VarianceBiasScene },
  { id: "var-bias-game", chapter: "Game", label: "Bias demo", Scene: VarianceBiasGame },

  { id: "mom-def", chapter: "MoM", label: "Method of moments", Scene: content.MomDefinitionScene },
  { id: "mom-gamma", chapter: "MoM", label: "Gamma MoM", Scene: content.GammaMomScene },
  { id: "mom-pois", chapter: "MoM", label: "Poisson MoM", Scene: content.PoissonMomScene },
  { id: "mom-pois-game", chapter: "Game", label: "Poisson MoM sim", Scene: PoissonMomGame },
  { id: "mom-unif", chapter: "MoM", label: "Uniform MLE vs MoM", Scene: content.UniformMomScene },
  { id: "mom-unif-game", chapter: "Game", label: "Uniform compare", Scene: UniformMomGame },
  { id: "summary", chapter: "Summary", label: "Takeaways", Scene: content.SummaryScene },
];
