import {
  DifficultyEasyIcon,
  DifficultyHardIcon,
  DifficultyMediumIcon,
} from "~/components/icons";
import { ExerciseDifficulty } from "../types/exercises";

export const getDifficultyLabel = (difficulty: ExerciseDifficulty) => {
  switch (difficulty) {
    case ExerciseDifficulty.EASY:
      return "Легко";
    case ExerciseDifficulty.MEDIUM:
      return "Средне";
    case ExerciseDifficulty.HARD:
      return "Тяжело";
  }
};

export const getDifficultyIcon = (difficulty: ExerciseDifficulty) => {
  switch (difficulty) {
    case ExerciseDifficulty.EASY:
      return DifficultyEasyIcon;
    case ExerciseDifficulty.MEDIUM:
      return DifficultyMediumIcon;
    case ExerciseDifficulty.HARD:
      return DifficultyHardIcon;
  }
};
