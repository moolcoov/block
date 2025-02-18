import { create } from "zustand";
import type { Workout } from "./types";
import { addWorkoutToDB, getWorkoutsFromDB } from "./db";

interface WorkoutsState {
  workouts: Workout[];
  loading: boolean;

  fetchWorkouts: () => Promise<void>;
  addWorkout: (workout: Workout) => Promise<void>;
}

const useWorkoutsStore = create<WorkoutsState>((set, get) => ({
  workouts: [],
  loading: false,

  fetchWorkouts: async () => {
    set({ loading: true });
    const workouts: Workout[] = (await getWorkoutsFromDB()).sort(
      (a: Workout, b: Workout) =>
        (b.editedAt ?? b.createdAt).getTime() -
        (a.editedAt ?? a.createdAt).getTime(),
    );
    set({ workouts, loading: false });
  },

  addWorkout: async (workout) => {
    await addWorkoutToDB(workout);
    set((state) => ({
      workouts: [workout, ...state.workouts],
    }));
  },
}));

export { useWorkoutsStore };
