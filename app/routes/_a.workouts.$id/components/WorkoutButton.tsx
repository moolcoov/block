import { Link } from "react-router";
import { buttonVariants } from "~/shared/ui/Button";
import { useWorkout } from "./WorkoutProvider";

export const WorkoutButton = () => {
  const workout = useWorkout();

  return (
    <div className="fixed bottom-0 w-full bg-gradient-to-t from-black/80 from-60% to-transparent px-4 pt-2 pb-(--bottom-button)">
      <Link to={`/workouts/${workout.id}/start`} className={buttonVariants()}>
        НАЧАТЬ ТРЕНИРОВКУ
      </Link>
    </div>
  );
};
