import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "~/components/Drawer";
import { XmarkIcon } from "~/components/icons";
import { ExerciseDifficulty, type Exercise } from "../types/exercises";
import { TagBadge } from "~/components/Tag";
import type { Tag } from "../types/tags";
import { InfoColumn } from "~/components/InfoColumn";
import { getDifficultyIcon } from "../utils/difficulty";

interface ExerciseModalProps {
  id: number;
  children: React.ReactNode;
}

const exercise: Exercise = {
  id: 1,
  title: "Подтягивания",
  difficulty: ExerciseDifficulty.MEDIUM,
  equipment: [
    {
      id: 1,
      label: "Брусья",
    },
    {
      id: 2,
      label: "Штанга",
    },
  ],
  tags: [
    {
      id: 1,
      label: "Штанга",
    },
    {
      id: 2,
      label: "Бокс",
    },
    {
      id: 3,
      label: "Брусья",
    },
  ],
};

export const ExerciseModal = ({ children }: ExerciseModalProps) => {
  const DifficultyIcon = getDifficultyIcon(exercise.difficulty);

  return (
    <Drawer shouldScaleBackground={false}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-hidden">
        <DrawerClose asChild>
          <button className="bg-muted/50 absolute top-5 left-5 z-30 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-xs">
            <XmarkIcon size={19} />
          </button>
        </DrawerClose>

        <div className="relative flex h-[50vh] w-full items-end justify-center bg-[url(/exercise.png)] bg-cover bg-center text-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="from-background-200 absolute inset-0 bg-gradient-to-t to-transparent to-30%" />
          <h1 className="z-10 text-3xl font-black">{exercise.title}</h1>
        </div>

        <div className="px-5">
          <ActionButtons />
          <div className="mt-6 flex w-full items-center px-3">
            <InfoColumn
              info={<span className="text-xl font-black">22 раза</span>}
              label="Рекорд за день"
            />
            <InfoColumn info={<DifficultyIcon size={25} />} label="Легко" />
          </div>
          <div className="my-8 flex gap-2.5 px-2">
            <Equipment equipment={exercise.equipment} />
            {exercise.tags && <Tags tags={exercise.tags} />}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const ActionButtons = () => {
  return (
    <div className="my-3 flex items-center justify-center gap-2.5">
      <ActionButton label="Заметки" onClick={() => {}} />
      <ActionButton label="История" onClick={() => {}} />
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton = ({ label, onClick }: ActionButtonProps) => {
  return (
    <button
      className="bg-muted flex h-[35px] items-center gap-1.5 rounded-full px-3"
      onClick={onClick}
    >
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const Equipment = ({
  equipment,
}: {
  equipment: {
    id: number;
    label: string;
  }[];
}) => {
  return (
    <section className="flex flex-1 flex-col gap-3">
      <h2 className="font-bold">Оборудование</h2>
      <div className="flex flex-col gap-2">
        {equipment.map((item) => (
          <p key={item.id} className="text-sm font-medium">
            {item.label}
          </p>
        ))}
      </div>
    </section>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex flex-1 flex-wrap content-start items-start gap-2">
      {tags.map((tag) => (
        <TagBadge key={tag.id} tag={tag} />
      ))}
    </div>
  );
};
