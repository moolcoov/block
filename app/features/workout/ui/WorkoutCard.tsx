import { getDifficultyIcon } from "~/shared/lib/difficulty";
import type { Workout } from "../model/types";

import { cn } from "~/shared/lib/utils";

interface WorkoutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  workout: Workout;
}

export const WorkoutCardBig = ({
  workout,
  className,
  ...props
}: WorkoutCardProps) => {
  const DifficultyIcon = getDifficultyIcon(workout.difficulty);

  return (
    <div
      className={cn(
        "relative flex aspect-6/7 w-full items-end overflow-hidden rounded-4xl border bg-[url(/exercise.png)] bg-cover bg-center px-[26px] py-5",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="from-background-200 absolute inset-0 bg-gradient-to-t from-15% to-transparent to-65%" />

      <div className="z-10 flex flex-col gap-2">
        <h2 className="font-medium-sans text-2xl text-balance break-words">
          {workout.title}
        </h2>
        <div className="text-muted-foreground text-var(--container-sm) flex items-center gap-2 text-sm font-medium">
          <span>{workout.workoutTime} мин</span>
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
  const DifficultyIcon = getDifficultyIcon(workout.difficulty);

  return (
    <div
      className={cn(
        "relative flex aspect-6/7 w-full items-end overflow-hidden rounded-2xl border bg-[url(/exercise.png)] bg-cover bg-center px-4 py-4",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="from-background-200 absolute inset-0 bg-gradient-to-t from-15% to-transparent to-65%" />

      <div className="z-10 flex flex-col gap-1.5">
        <h2 className="font-medium-sans text-[14px] text-balance break-words">
          {workout.title}
        </h2>
        <div className="text-muted-foreground text-var(--container-sm) flex items-center gap-1 text-xs font-medium">
          <span>{workout.workoutTime} мин</span>
          <span>·</span>
          <span>{<DifficultyIcon size={10} />}</span>
        </div>
      </div>
    </div>
  );
};
