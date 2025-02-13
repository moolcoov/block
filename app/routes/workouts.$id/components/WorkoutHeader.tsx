import type { WorkoutTag } from "~/features/workout/types/workout";
import { useWorkout } from "./WorkoutProvider";
import { DifficultyEasyIcon } from "~/components/icons";

export const WorkoutHeader = () => {
  const workout = useWorkout();

  return (
    <header className="relative flex h-[75svh] w-full flex-col items-center justify-end bg-gradient-to-t bg-[url(/hero.jpg)] bg-cover bg-center text-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-40%" />

      <div className="z-10 flex flex-col items-center">
        <h1 className="font-medium-sans text-3xl text-balance">
          {workout.title}
        </h1>
        {workout.tags && (
          <div className="mt-3 flex gap-2">
            {workout.tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </div>
        )}
        <div className="mt-6 flex w-full items-center gap-2 px-6">
          <InfoCard
            info={
              <span className="text-lg font-bold">
                {workout.workoutTime} мин
              </span>
            }
            label="Время тренировки"
          />
          <span className="bg-border h-10 w-[1px]" />
          <InfoCard info={<DifficultyEasyIcon size={22} />} label="Легко" />
        </div>
      </div>
    </header>
  );
};

const Tag = ({ tag }: { tag: WorkoutTag }) => {
  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.4)" }}
      className="flex h-[27px] items-center rounded-md px-2.5 text-xs font-medium backdrop-blur-sm"
    >
      {tag.label}
    </div>
  );
};

const InfoCard = ({
  info,
  label,
}: {
  info: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-between gap-1">
      {info}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
