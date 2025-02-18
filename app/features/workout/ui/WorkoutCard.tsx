import { getDifficultyIcon } from "~/shared/lib/difficulty";
import type { Workout } from "../model/types";

import { cn } from "~/shared/lib/utils";
import { secondsToMinutes } from "~/shared/lib/time";
import { getMediaFromDB } from "~/features/media/model/db";
import { useDatabase } from "~/shared/lib/indexedDB";
import { motion } from "motion/react";
import React from "react";

interface WorkoutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  workout: Workout;
}

export const WorkoutCardBig = ({
  workout,
  className,
  ...props
}: WorkoutCardProps) => {
  const { data: image } = useDatabase(async () =>
    getMediaFromDB(workout.image?.storedId),
  );
  const DifficultyIcon = getDifficultyIcon(workout.difficulty);

  const imageSrc = React.useMemo(
    () =>
      image ? URL.createObjectURL(image.data) : workout.image?.externalSrc,
    [image, workout.image?.externalSrc],
  );

  return (
    <div
      className={cn(
        "relative flex aspect-6/7 w-full items-end overflow-hidden rounded-4xl border px-[26px] py-5",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-[5] bg-black/20" />
      <div className="from-background-200 absolute inset-0 z-[5] bg-gradient-to-t from-15% to-transparent to-65%" />
      {imageSrc && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 aspect-6/7 h-full w-full object-cover object-center"
          src={imageSrc}
        />
      )}

      <div className="z-10 flex flex-col gap-2">
        <h2 className="font-medium-sans text-2xl text-balance break-words">
          {workout.title}
        </h2>
        <div className="text-muted-foreground text-var(--container-sm) flex items-center gap-2 text-sm font-medium">
          <span>{secondsToMinutes(workout.workoutTime)} мин</span>
          <span>·</span>
          <span>{<DifficultyIcon size={15} />}</span>
        </div>
      </div>
    </div>
  );
};

export const WorkoutCardSmall = ({
  workout,
  className,
  ...props
}: WorkoutCardProps) => {
  const { data: image } = useDatabase(async () =>
    getMediaFromDB(workout.image?.storedId),
  );
  const DifficultyIcon = getDifficultyIcon(workout.difficulty);

  const imageSrc = React.useMemo(
    () =>
      image ? URL.createObjectURL(image.data) : workout.image?.externalSrc,
    [image, workout.image?.externalSrc],
  );

  return (
    <div
      className={cn(
        "relative flex aspect-6/7 w-full items-end overflow-hidden rounded-2xl border px-4 py-4",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-[5] bg-black/20" />
      <div className="from-background-200 absolute inset-0 z-[5] bg-gradient-to-t from-15% to-transparent to-65%" />
      {imageSrc && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 aspect-6/7 h-full w-full object-cover object-center"
          src={imageSrc}
          alt={workout.title}
          loading="eager"
        />
      )}

      <div className="z-10 flex w-full flex-col gap-1.5">
        <h2 className="font-medium-sans w-full overflow-hidden text-[14px] text-balance overflow-ellipsis">
          {workout.title}
        </h2>
        <div className="text-muted-foreground text-var(--container-sm) flex items-center gap-1 text-xs font-medium">
          <span>{secondsToMinutes(workout.workoutTime)} мин</span>
          <span>·</span>
          <span>{<DifficultyIcon size={10} />}</span>
        </div>
      </div>
    </div>
  );
};
