export interface Exercise {
  title: string;
  difficulty: ExerciseDifficulty;
  equipment: [
    {
      id: number;
      label: string;
    },
  ];
}

export enum ExerciseDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface ExerciseTag {
  id: number;
  label: string;
}

export interface ExerciseFilters {
  tags?: ExerciseTag[];
  difficulty?: ExerciseDifficulty[];
}
