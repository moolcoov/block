import { create } from "zustand";
import type { Exercise } from "./types";
import {
  addExerciseToDB,
  deleteExerciseFromDB,
  getExercisesFromDB,
  updateExerciseInDB,
} from "./db";
import type { UUID } from "~/shared/types/uuid";

interface ExercisesState {
  exercises: Exercise[];
  loading: boolean;

  fetchExercises: () => Promise<void>;
  addExercise: (exercise: Exercise) => Promise<void>;
  updateExercise: (exercise: Exercise) => Promise<void>;
  deleteExercise: (id: UUID) => Promise<void>;
}

const useExercisesStore = create<ExercisesState>((set, get) => ({
  exercises: [],
  loading: false,

  fetchExercises: async () => {
    set({ loading: true });
    const exercises: Exercise[] = (await getExercisesFromDB()).sort(
      (a: Exercise, b: Exercise) =>
        (b.editedAt ?? b.createdAt).getTime() -
        (a.editedAt ?? a.createdAt).getTime(),
    );
    set({ exercises, loading: false });
  },

  addExercise: async (exercise) => {
    await addExerciseToDB(exercise);
    set((state) => ({
      exercises: [exercise, ...state.exercises],
    }));
  },

  updateExercise: async (exercise) => {
    await updateExerciseInDB(exercise);
    set((state) => ({
      exercises: state.exercises.map((e) =>
        e.id === exercise.id ? exercise : e,
      ),
    }));
  },

  deleteExercise: async (id: UUID) => {
    await deleteExerciseFromDB(id);
    set((state) => ({
      exercises: state.exercises.filter((e) => e.id !== id),
    }));
  },
}));

export { useExercisesStore };
