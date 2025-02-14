import type { Tag } from "./tags";

export interface Exercise {
  id: number;
  title: string;
  difficulty: ExerciseDifficulty;
  equipment: {
    id: number;
    label: string;
  }[];
  tags?: Tag[];
}

export enum ExerciseDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface ExerciseFilters {
  tags?: number[];
  difficulty?: ExerciseDifficulty[];
  equipment?: number[];
}
