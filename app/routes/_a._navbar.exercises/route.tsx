import { ExercisesProvider } from "~/features/exercises/model/ExercisesProvider";
import { ExercisesList } from "./components/ExercisesList";
import { ExercisesInfo } from "./components/ExercisesInfo";
import { ExercisesHeader } from "./components/ExercisesHeader";
import { useExercisesStore } from "~/features/exercises/model/store";
import { useShallow } from "zustand/react/shallow";

export default function ExercisesPage() {
  const [exercises, loading] = useExercisesStore(
    useShallow((state) => [state.exercises, state.loading]),
  );

  return (
    <ExercisesProvider exercises={exercises}>
      <ExercisesHeader />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-5 px-5 pt-5">
          <ExercisesInfo />
          <ExercisesList />
        </div>
      )}
    </ExercisesProvider>
  );
}
