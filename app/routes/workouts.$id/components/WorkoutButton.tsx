import { Button } from "~/components/Button";

export const WorkoutButton = () => {
  return (
    <div className="fixed bottom-0 w-full bg-gradient-to-t from-black/80 from-60% to-transparent px-4 pt-2 pb-(--bottom-button)">
      <Button>НАЧАТЬ ТРЕНИРОВКУ</Button>
    </div>
  );
};
