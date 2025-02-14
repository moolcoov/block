import type { Difficulty } from "~/shared/types/difficulty";
import type { Tag } from "../../../shared/types/tags";
import type { UUID } from "~/shared/types/uuid";

export interface Exercise {
  id: UUID;
  title: string;
  difficulty: Difficulty;
  equipment: {
    id: number;
    label: string;
  }[];
  tags?: Tag[];
}

export interface ExerciseFilters {
  tags?: number[];
  difficulty?: Difficulty[];
  equipment?: number[];
}
