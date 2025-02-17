import type { ResourceMedia } from "~/features/media/model/types";
import type { Difficulty } from "~/shared/types/difficulty";
import type { Equipment } from "~/shared/types/equipment";
import type { Tag } from "~/shared/types/tags";
import type { UUID } from "~/shared/types/uuid";

export interface Exercise {
  id: UUID;
  title: string;
  type: ExerciseType;
  difficulty: Difficulty;
  equipment?: Equipment[];
  tags?: Tag[];

  notes?: string;

  createdAt: Date;
  editedAt?: Date;

  image?: ResourceMedia;
  video?: ResourceMedia;
}

export enum ExerciseType {
  QUANTITY = "quantity",
  TIMED = "timed",
}

export interface ExerciseFilters {
  tags?: UUID[];
  difficulty?: Difficulty[];
  equipment?: UUID[];
}
