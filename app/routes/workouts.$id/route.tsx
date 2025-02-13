import { WorkoutDifficulty, type Workout } from "~/types/workout";
import type { Route } from "./+types/route";
import { WorkoutProvider } from "./components/WorkoutProvider";
import { WorkoutHeader } from "./components/WorkoutHeader";

const workout: Workout = {
  id: "e3deb89b-5bed-4ddb-b12c-e18aeefe3d71",
  title: "ВЕРХ ТЕЛА НА СИЛУ",
  tags: [
    {
      id: 1,
      label: "Мышцы кора",
    },
    {
      id: 1,
      label: "Пресс",
    },
    {
      id: 1,
      label: "Для начинающих",
    },
  ],
  workoutTime: 28,
  difficulty: WorkoutDifficulty.EASY,
};

export default function WorkoutPage({ params }: Route.ComponentProps) {
  return (
    <WorkoutProvider workout={workout}>
      <WorkoutHeader />
    </WorkoutProvider>
  );
}
