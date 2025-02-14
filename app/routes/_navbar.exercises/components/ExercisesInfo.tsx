import React from "react";
import { FiltersButton } from "~/components/FiltersButton";
import {
  useExercises,
  useExercisesFilters,
} from "~/features/workout/model/ExercisesProvider";
import { ExercisesFiltersModal } from "~/features/workout/ui/ExercisesFiltersModal";

export const ExercisesInfo = () => {
  const exercises = useExercises();
  const [, , activeFilters] = useExercisesFilters();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-black">{exercises.length} УПРАЖНЕНИЙ</h2>
      <ExercisesFiltersModal asChild>
        <FiltersButton activeFilters={activeFilters} />
      </ExercisesFiltersModal>
    </div>
  );
};
