import { FiltersButton } from "~/components/FiltersButton";
import {
  useExercises,
  useExercisesFilters,
} from "~/features/workout/model/ExercisesProvider";

export const ExercisesInfo = () => {
  const exercises = useExercises();
  const [filters] = useExercisesFilters();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-black">{exercises.length} УПРАЖНЕНИЙ</h2>
      <FiltersButton />
    </div>
  );
};
