import type { Difficulty } from "~/shared/types/difficulty";
import type { Equipment } from "~/shared/types/equipment";
import type { Tag } from "~/shared/types/tags";
import type { UUID } from "~/shared/types/uuid";

export interface Exercise {
  id: UUID;
  title: string;
  type: "quantity" | "timed";
  difficulty: Difficulty;
  equipment?: Equipment[];
  tags?: Tag[];

  createdAt: Date;
  editedAt?: Date;
}

export interface ExerciseFilters {
  tags?: UUID[];
  difficulty?: Difficulty[];
  equipment?: UUID[];
}
