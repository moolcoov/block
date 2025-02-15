import type { Exercise } from "~/features/exercise/model/types";
import type { Difficulty } from "~/shared/types/difficulty";
import type { Equipment } from "~/shared/types/equipment";
import type { Tag } from "~/shared/types/tags";
import type { UUID } from "~/shared/types/uuid";

export interface Workout {
  id: UUID;
  title: string;
  workoutTime: number; // в мин
  difficulty: Difficulty;

  equipment?: Equipment[];
  tags?: Tag[];

  sections: WorkoutSection[];

  createdAt: Date;

  saved?: boolean;
}

export interface WorkoutSection {
  id: number;
  title: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise extends Exercise {
  sets: WorkoutExerciseSet[];
}

export interface WorkoutExerciseSet {
  id: number;
  reps: number;
  weight?: "bodyWeight" | number;
  time?: number;
}

export interface WorkoutFilters {
  tags?: UUID[];
  difficulty?: Difficulty[];
  equipment?: UUID[];
}
