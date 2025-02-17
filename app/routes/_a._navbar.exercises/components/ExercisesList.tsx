import { useExercises } from "~/features/exercise/model/ExercisesProvider";
import type { Exercise } from "~/features/exercise/model/types";
import { ExerciseModal } from "~/features/exercise/ui/ExerciseModal";

export const ExercisesList = () => {
  const exercises = useExercises();

  return (
    <div className="flex flex-col gap-4">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
};

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <ExerciseModal id={exercise.id}>
      <div className="flex h-[60px] items-center gap-5">
        <div className="bg-background-200 aspect-square h-full rounded-2xl"></div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base">
            <span className="font-bold">{exercise.title}</span>
          </h3>
          {exercise.equipment && (
            <p className="text-muted-foreground text-sm font-medium">
              {exercise.equipment.map((e) => e.label).join(", ")}
            </p>
          )}
        </div>
      </div>
    </ExerciseModal>
  );
};
