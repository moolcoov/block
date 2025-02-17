import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "~/shared/ui/Drawer";
import { XmarkIcon } from "~/shared/ui/icons";
import { TagBadge } from "~/shared/ui/Tag";
import type { Tag } from "~/shared/types/tags";
import { InfoColumn } from "~/shared/ui/InfoColumn";
import { getDifficultyIcon } from "~/shared/lib/difficulty";
import type { UUID } from "~/shared/types/uuid";
import React from "react";
import { useDatabase } from "~/shared/lib/indexedDB";
import { getExerciseByIdFromDB } from "../model/db";
import { Button } from "~/shared/ui/Button";
import { Loading } from "~/shared/ui/Loading";
import { ExerciseNotesModal } from "./ExerciseNotesModal";
import { ExerciseProvider } from "../model/ExerciseProvider";
import type { Equipment } from "~/shared/types/equipment";

interface ExerciseModalProps {
  id: UUID;
  children: React.ReactNode;
}

export const ExerciseModal = ({ id, children }: ExerciseModalProps) => {
  return (
    <Drawer shouldScaleBackground={false}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[85vh] overflow-hidden">
        <DrawerClose asChild>
          <Button
            variant={"secondary"}
            size={"icon"}
            className="fixed top-5 left-5 z-40"
          >
            <XmarkIcon size={19} />
          </Button>
        </DrawerClose>
        <Content id={id} />
      </DrawerContent>
    </Drawer>
  );
};

const Content = ({ id }: { id: UUID }) => {
  const { data: exercise, loading } = useDatabase(async () =>
    getExerciseByIdFromDB(id),
  );

  if (loading) return <Loading />;

  if (!exercise) return <div>Exercise not found</div>;
  // TODO

  const DifficultyIcon = getDifficultyIcon(exercise.difficulty);

  return (
    <ExerciseProvider exercise={exercise}>
      <div className="relative">
        <div className="relative flex h-[50vh] w-full items-end justify-center bg-[url(/exercise.png)] bg-cover bg-center text-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="from-background-200 absolute inset-0 bg-gradient-to-t to-transparent to-30%" />
          <h1 className="z-10 text-3xl font-black">{exercise.title}</h1>
        </div>
        <div className="px-5">
          <div className="my-3 flex items-center justify-center gap-2.5">
            <ExerciseNotesModal>
              <ActionButton label="Заметки" onClick={() => {}} />
            </ExerciseNotesModal>
            <ActionButton label="История" onClick={() => {}} />
          </div>

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
      </div>
    </ExerciseProvider>
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

const Equipment = ({ equipment }: { equipment?: Equipment[] }) => {
  if (!equipment || equipment.length === 0) return null;

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

const Tags = ({ tags }: { tags?: Tag[] }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-1 flex-wrap content-start items-start gap-2">
      {tags.map((tag) => (
        <TagBadge key={tag.id} tag={tag} />
      ))}
    </div>
  );
};
