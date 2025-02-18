import { initDB } from "~/shared/lib/indexedDB";
import type { Workout } from "./types";

const WORKOUTS_STORE_NAME = "workouts";

export const getWorkoutsFromDB = async () => {
  const db = await initDB();
  return db.getAll(WORKOUTS_STORE_NAME);
};

export const addWorkoutToDB = async (workout: Workout) => {
  const db = await initDB();
  return db.add(WORKOUTS_STORE_NAME, workout);
};
