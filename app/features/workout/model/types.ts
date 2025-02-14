import type { UUID } from "crypto";
import type { Difficulty } from "~/shared/types/difficulty";

export interface Workout {
  id: UUID;
  title: string;
  tags?: WorkoutTag[];
  workoutTime: number;
  difficulty: Difficulty;

  // sections: [
  //   {
  //     title: "JISDJskd";

  //     exersizes: [];
  //   },
  // ];
}

// type Difficulty = "easy" | "medium" | "hard";

export interface WorkoutTag {
  id: number;
  label: string;
}
