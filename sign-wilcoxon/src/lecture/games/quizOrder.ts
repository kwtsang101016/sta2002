export type QuizChoice = {
  text: string;
  /** Shown when a student picks this (wrong) choice. */
  why?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
  answer: number;
  explain: string;
};

function hashString(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic shuffle so every student (and the PDF) sees the same option order. */
function seededOrder(length: number, seed: number): number[] {
  let state = seed || 1;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function choiceOrder(quizId: string, question: QuizQuestion): number[] {
  return seededOrder(question.choices.length, hashString(`${quizId}:${question.id}`));
}
