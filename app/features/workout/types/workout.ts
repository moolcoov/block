import type { UUID } from "crypto";

export interface Workout {
  id: UUID;
  title: string;
  tags?: WorkoutTag[];
  workoutTime: number;
  difficulty: WorkoutDifficulty;

  // sections: [
  //   {
  //     title: "JISDJskd";

  //     exersizes: [];
  //   },
  // ];
}

export enum WorkoutDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// type WorkoutDifficulty = "easy" | "medium" | "hard";

export interface WorkoutTag {
  id: number;
  label: string;
}
