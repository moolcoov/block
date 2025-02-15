import { ExercisesProvider } from "~/features/exercise/model/ExercisesProvider";
import { ExercisesList } from "./components/ExercisesList";
import { ExercisesInfo } from "./components/ExercisesInfo";
import { ExercisesHeader } from "./components/ExercisesHeader";
import { useExercisesStore } from "~/features/exercise/model/store";
import { useShallow } from "zustand/react/shallow";
import { Loading } from "~/shared/ui/Loading";
import { AnimatePresence } from "motion/react";

export default function ExercisesPage() {
  const [exercises, loading] = useExercisesStore(
    useShallow((state) => [state.exercises, state.loading]),
  );

  return (
    <ExercisesProvider exercises={exercises}>
      <ExercisesHeader />

      <AnimatePresence>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-5 px-5 pt-5">
            <ExercisesInfo />
            <ExercisesList />
          </div>
        )}
      </AnimatePresence>
    </ExercisesProvider>
  );
}
