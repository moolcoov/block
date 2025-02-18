import { getUser } from "~/features/user/model/storage";
import type { Difficulty } from "~/shared/types/difficulty";

const difficultyBaseFactors: Record<Difficulty, number> = {
  easy: 1.1,
  medium: 1.0,
  hard: 0.9,
};

const difficultyLoadFactors: Record<Difficulty, number> = {
  easy: 0.8,
  medium: 1.0,
  hard: 1.2,
};

const sexFactors: Record<UserSex, number> = {
  male: 1.0,
  female: 0.95,
};

export function calculateReps(
  userWeight: number,
  equipmentWeight: number = 0,
  difficulty: Difficulty,
  sex: UserSex,
  baseReps: number,
  refWeight: number = 70,
): number {
  const basePerformance =
    baseReps *
    (userWeight / refWeight) *
    sexFactors[sex] *
    difficultyBaseFactors[difficulty];

  const loadRatio = equipmentWeight / userWeight;
  const penalty = loadRatio * difficultyLoadFactors[difficulty];

  const reps = basePerformance * (1 - penalty);
  return Math.max(1, Math.round(reps));
}

export function calculateTime(
  userWeight: number,
  equipmentWeight: number = 0,
  difficulty: Difficulty,
  sex: UserSex,
  baseTime: number,
  refWeight: number = 70,
): number {
  const basePerformance =
    baseTime *
    (userWeight / refWeight) *
    sexFactors[sex] *
    difficultyBaseFactors[difficulty];

  const loadRatio = equipmentWeight / userWeight;
  const penalty = loadRatio * difficultyLoadFactors[difficulty];

  const time = basePerformance * (1 - penalty);
  return Math.max(1, Math.round(time));
}

export function calculateUserReps(
  baseReps: number,
  difficulty: Difficulty,
  equipmentWeight: number = 0,
): number {
  const user = getUser();

  if (!user) {
    return 10;
  }

  return calculateReps(
    user.weight.value,
    equipmentWeight,
    difficulty,
    user.sex,
    baseReps,
  );
}

export function calculateUserTime(
  baseTime: number,
  difficulty: Difficulty,
  equipmentWeight: number = 0,
): number {
  const user = getUser();

  if (!user) {
    return 10;
  }

  return calculateTime(
    user.weight.value,
    equipmentWeight,
    difficulty,
    user.sex,
    baseTime,
  );
}
