import { useWorkout } from "./WorkoutProvider";
import { DifficultyEasyIcon } from "~/components/icons";
import { TagBadge } from "~/components/Tag";
import { InfoColumn } from "~/components/InfoColumn";

export const WorkoutHeader = () => {
  const workout = useWorkout();

  return (
    <header className="relative flex h-[75svh] w-full flex-col items-center justify-end bg-[url(/hero.jpg)] bg-cover bg-center text-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-40%" />

      <div className="z-10 flex flex-col items-center">
        <h1 className="font-medium-sans text-3xl text-balance">
          {workout.title}
        </h1>
        {workout.tags && (
          <div className="mt-3 flex gap-2">
            {workout.tags.map((tag) => (
              <TagBadge dark key={tag.id} tag={tag} />
            ))}
          </div>
        )}
        <div className="mt-6 flex w-full items-center px-6">
          <InfoColumn
            info={
              <span className="text-xl font-black">
                {workout.workoutTime} мин
              </span>
            }
            label="Время тренировки"
          />
          <InfoColumn info={<DifficultyEasyIcon size={25} />} label="Легко" />
        </div>
      </div>
    </header>
  );
};
