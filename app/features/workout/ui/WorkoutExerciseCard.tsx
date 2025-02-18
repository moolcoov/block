import { getEquipmentLabel } from "~/shared/lib/equipment";
import type { WorkoutExercise } from "../model/types";
import { AnimatePresence, motion } from "motion/react";
import { getMediaFromDB } from "~/features/media/model/db";
import { useDatabase } from "~/shared/lib/indexedDB";
import { Loading } from "~/shared/ui/Loading";

export const WorkoutExerciseCard = ({
  exercise,
}: {
  exercise: WorkoutExercise;
}) => {
  const { data: image, loading } = useDatabase(async () =>
    getMediaFromDB(exercise.image?.storedId),
  );

  return (
    <div className="flex h-[60px] w-full items-center gap-5 overflow-hidden">
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
      <div className="flex w-full flex-col gap-1.5 overflow-hidden">
        <h3 className="text-base">
          {exercise.sets.length > 1 && (
            <span className="mr-1.5 font-black">{exercise.sets.length}x</span>
          )}
          <span className="font-bold">{exercise.title}</span>
        </h3>
        <p className="text-muted-foreground overflow-hidden text-sm font-medium overflow-ellipsis whitespace-nowrap">
          Повторения:{" "}
          {exercise.sets.map((set) => set.reps ?? `${set.time} сек`).join(", ")}{" "}
          — {getEquipmentLabel(exercise.selectedEquipment)}{" "}
          {exercise.selectedEquipment != "body_weight" &&
            exercise.sets
              .map((set) => set.weight && `${set.weight} кг`)
              .join(", ")}
        </p>
      </div>
    </div>
  );
};
