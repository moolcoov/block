import { FiltersButton } from "~/shared/ui/FiltersButton";
import {
  useExercises,
  useExercisesFilters,
  useExercisesSearchQuery,
} from "~/features/exercises/model/ExercisesProvider";
import { ExercisesFiltersModal } from "~/features/exercises/ui/ExercisesFiltersModal";

export const ExercisesInfo = () => {
  const exercises = useExercises();
  const [searchQuery] = useExercisesSearchQuery();
  const [, , activeFilters] = useExercisesFilters();

  if (searchQuery !== "") {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-black">{exercises.length} УПРАЖНЕНИЙ</h2>
      <ExercisesFiltersModal asChild>
        <FiltersButton activeFilters={activeFilters} />
      </ExercisesFiltersModal>
    </div>
  );
};
