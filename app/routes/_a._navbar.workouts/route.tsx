import type { Workout } from "~/features/workout/model/types";
import {
  useWorkoutsSearchQuery,
  WorkoutsProvider,
} from "~/features/workout/model/WorkoutsProvider";
import { Difficulty } from "~/shared/types/difficulty";
import { WorkoutsSavedList } from "./components/WorkoutsSavedList";
import { WorkoutsList } from "./components/WorkoutsList";
import { WorkoutsHeader } from "./components/WorkoutsHeader";

export default function WorkoutsPage() {
  return (
    <WorkoutsProvider workouts={workouts}>
      <WorkoutsHeader />
      <div className="flex flex-col pt-6">
        <Content />
      </div>
    </WorkoutsProvider>
  );
}

const Content = () => {
  const [searchQuery] = useWorkoutsSearchQuery();

  if (searchQuery !== "") {
    return <WorkoutsList />;
  }

  return (
    <>
      <WorkoutsSavedList />
      <WorkoutsList />
    </>
  );
};

const workouts: Workout[] = [
  {
    id: "1",
    title: "ВЕРХ ТЕЛА НА СИЛУ",
    workoutTime: 28,
    difficulty: Difficulty.MEDIUM,
    saved: true,
    sections: [],
    createdAt: new Date(),
    tags: [
      {
        id: "1",
        label: "Тег 1",
      },
    ],
    equipment: [
      {
        id: "1",
        label: "Брусья",
      },
      {
        id: "2",
        label: "Бутерброд",
      },
    ],
  },
  {
    id: "2",
    title: "Легко",
    workoutTime: 28,
    difficulty: Difficulty.EASY,
    saved: false,
    sections: [],
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Средне",
    workoutTime: 28,
    difficulty: Difficulty.MEDIUM,
    saved: false,
    sections: [],
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Сложно",
    workoutTime: 28,
    difficulty: Difficulty.HARD,
    saved: false,
    sections: [],
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Тег 1",
    workoutTime: 28,
    difficulty: Difficulty.MEDIUM,
    saved: false,
    sections: [],
    createdAt: new Date(),
    tags: [
      {
        id: "1",
        label: "Тег 1",
      },
    ],
  },
  {
    id: "6",
    title: "Тег 2",
    workoutTime: 28,
    difficulty: Difficulty.MEDIUM,
    saved: false,
    sections: [],
    createdAt: new Date(),
    tags: [
      {
        id: "2",
        label: "Тег 1",
      },
    ],
  },
];
