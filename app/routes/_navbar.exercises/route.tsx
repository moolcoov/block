import { ExercisesProvider } from "~/features/workout/model/ExercisesProvider";
import {
  ExerciseDifficulty,
  type Exercise,
} from "~/features/workout/types/exercises";
import { ExercisesList } from "./components/ExercisesList";
import { ExercisesInfo } from "./components/ExercisesInfo";
import { ExercisesHeader } from "./components/ExercisesHeader";

export const exercises: Exercise[] = [
  {
    title: "Жим гири",
    difficulty: ExerciseDifficulty.HARD,
    equipment: [
      {
        id: 2,
        label: "Гиря",
      },
    ],
    tags: [
      {
        id: 1,
        label: "Штанга",
      },
      {
        id: 2,
        label: "Штанга",
      },
    ],
  },
  {
    title: "Отжимания",
    difficulty: ExerciseDifficulty.MEDIUM,
    equipment: [
      {
        id: 2,
        label: "Брусья",
      },
    ],
    tags: [
      {
        id: 2,
        label: "Штанга",
      },
    ],
  },
  {
    title: "Приседания",
    difficulty: ExerciseDifficulty.EASY,
    equipment: [
      {
        id: 3,
        label: "Штанга",
      },
    ],

    tags: [
      {
        id: 3,
        label: "Штанга",
      },
    ],
  },
  {
    title: "Подтягивания",
    difficulty: ExerciseDifficulty.HARD,
    equipment: [
      {
        id: 4,
        label: "Турник",
      },
    ],
  },
  {
    title: "Пресс",
    difficulty: ExerciseDifficulty.MEDIUM,
    equipment: [
      {
        id: 5,
        label: "Гимнастический коврик",
      },
    ],
  },
  {
    title: "Бег",
    difficulty: ExerciseDifficulty.EASY,
    equipment: [
      {
        id: 6,
        label: "Кроссовки",
      },
    ],
  },
  {
    title: "Плавание",
    difficulty: ExerciseDifficulty.MEDIUM,
    equipment: [
      {
        id: 7,
        label: "Очки для плавания",
      },
    ],
  },
  {
    title: "Прыжки на скакалке",
    difficulty: ExerciseDifficulty.HARD,
    equipment: [
      {
        id: 8,
        label: "Скакалка",
      },
    ],
  },
  {
    title: "Штанга",
    difficulty: ExerciseDifficulty.MEDIUM,
    equipment: [
      {
        id: 9,
        label: "Штанга",
      },
    ],
  },
  {
    title: "Бокс",
    difficulty: ExerciseDifficulty.HARD,
    equipment: [
      {
        id: 10,
        label: "Боксерские перчатки",
      },
    ],
  },
  {
    title: "Велосипед",
    difficulty: ExerciseDifficulty.EASY,
    equipment: [
      {
        id: 11,
        label: "Велосипед",
      },
    ],
  },
];

export default function ExercisesPage() {
  return (
    <ExercisesProvider exercises={exercises}>
      <ExercisesHeader />
      <div className="flex flex-col gap-5 px-5 pt-5">
        <ExercisesInfo />
        <ExercisesList />
      </div>
    </ExercisesProvider>
  );
}
