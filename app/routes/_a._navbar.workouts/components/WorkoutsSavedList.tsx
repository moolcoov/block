import { Link } from "react-router";
import { useSavedWorkouts } from "~/features/workout/model/WorkoutsProvider";
import { WorkoutCardBig } from "~/features/workout/ui/WorkoutCard";

export const WorkoutsSavedList = () => {
  const savedWorkouts = useSavedWorkouts();

  if (!savedWorkouts || savedWorkouts.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5">
      <h1 className="px-5 text-xl font-black">СОХРАНЁННЫЕ</h1>
      <div className="px-5">
        {savedWorkouts.map((workout) => (
          <Link key={workout.id} to={`/workouts/${workout.id}`}>
            <WorkoutCardBig workout={workout} />
          </Link>
        ))}
      </div>
    </section>
  );
};
