import { create } from "zustand";
import type { Exercise } from "./types";
import { addExerciseToDB, getExercisesFromDB, updateExerciseInDB } from "./db";
import { Difficulty } from "~/shared/types/difficulty";
import { v4 as uuidv4 } from "uuid";

export const exercises: Exercise[] = [
  {
    title: "Жим гири",
    difficulty: Difficulty.HARD,
    equipment: [
      {
        id: "2",
        label: "Гиря",
      },
    ],
    tags: [
      {
        id: "1",
        label: "Штанга",
      },
      {
        id: "2",
        label: "Штанга",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Отжимания",
    difficulty: Difficulty.MEDIUM,
    equipment: [
      {
        id: "2",
        label: "Брусья",
      },
    ],
    tags: [
      {
        id: "2",
        label: "Штанга",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Приседания",
    difficulty: Difficulty.EASY,
    equipment: [
      {
        id: "3",
        label: "Штанга",
      },
    ],

    tags: [
      {
        id: "3",
        label: "Штанга",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Подтягивания",
    difficulty: Difficulty.HARD,
    equipment: [
      {
        id: "4",
        label: "Турник",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Пресс",
    difficulty: Difficulty.MEDIUM,
    equipment: [
      {
        id: "5",
        label: "Гимнастический коврик",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Бег",
    difficulty: Difficulty.EASY,
    equipment: [
      {
        id: "6",
        label: "Кроссовки",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Плавание",
    difficulty: Difficulty.MEDIUM,
    equipment: [
      {
        id: "7",
        label: "Очки для плавания",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Прыжки на скакалке",
    difficulty: Difficulty.HARD,
    equipment: [
      {
        id: "8",
        label: "Скакалка",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Штанга",
    difficulty: Difficulty.MEDIUM,
    equipment: [
      {
        id: "9",
        label: "Штанга",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Бокс",
    difficulty: Difficulty.HARD,
    equipment: [
      {
        id: "10",
        label: "Боксерские перчатки",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
  {
    title: "Велосипед",
    difficulty: Difficulty.EASY,
    equipment: [
      {
        id: "11",
        label: "Велосипед",
      },
    ],
    id: "",
    type: "quantity",
    createdAt: new Date(),
  },
];

interface ExercisesState {
  exercises: Exercise[];
  loading: boolean;

  fetchExercises: () => Promise<void>;
  addExercise: (exercise: Exercise) => Promise<void>;
  ins: () => Promise<void>;
  updateExercise: (exercise: Exercise) => Promise<void>;
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

  ins: async () => {
    exercises.map(async (exercise) => {
      await addExerciseToDB({ ...exercise, id: uuidv4() });
    });
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
}));

export { useExercisesStore };
