import { AnimatePresence, motion } from "motion/react";
import { useExercises } from "~/features/exercise/model/ExercisesProvider";
import type { Exercise } from "~/features/exercise/model/types";
import { ExerciseModal } from "~/features/exercise/ui/ExerciseModal";
import { getMediaFromDB } from "~/features/media/model/db";
import { getEquipmentLabel } from "~/shared/lib/equipment";
import { useDatabase } from "~/shared/lib/indexedDB";
import { Loading } from "~/shared/ui/Loading";

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
  const { data: image, loading } = useDatabase(async () =>
    getMediaFromDB(exercise.image?.storedId),
  );

  return (
    <ExerciseModal id={exercise.id}>
      <div className="flex h-[60px] items-center gap-5">
        <div className="bg-background-200 relative aspect-square h-full w-full max-w-[60px] min-w-[60px] overflow-hidden rounded-2xl object-cover object-center">
          <AnimatePresence>
            {loading && <Loading key="loading" />}
            {(image || exercise.image?.externalSrc) && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full w-full object-cover object-center"
                src={
                  image
                    ? URL.createObjectURL(image.data)
                    : exercise.image?.externalSrc
                }
              />
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1.5 overflow-hidden">
          <h3 className="text-base">
            <span className="font-bold">{exercise.title}</span>
          </h3>
          {exercise.equipment && (
            <p className="text-muted-foreground overflow-hidden text-sm font-medium overflow-ellipsis whitespace-nowrap">
              {exercise.equipment.map((e) => getEquipmentLabel(e)).join(", ")}
            </p>
          )}
        </div>
      </div>
    </ExerciseModal>
  );
};
