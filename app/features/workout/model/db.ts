import { initDB } from "~/shared/lib/indexedDB";
import type { Workout } from "./types";
import type { UUID } from "~/shared/types/uuid";

const WORKOUTS_STORE_NAME = "workouts";

export const getWorkoutsFromDB = async () => {
  const db = await initDB();
  return db.getAll(WORKOUTS_STORE_NAME);
};

export const getWorkoutFromDB = async (id: UUID) => {
  const db = await initDB();
  return db.get(WORKOUTS_STORE_NAME, id);
};

export const addWorkoutToDB = async (workout: Workout) => {
  const db = await initDB();
  return db.add(WORKOUTS_STORE_NAME, workout);
};

export const updateWorkoutInDB = async (workout: Workout) => {
  const db = await initDB();
  return db.put(WORKOUTS_STORE_NAME, workout);
};
