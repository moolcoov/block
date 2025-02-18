import { WorkoutExerciseCard } from "~/features/workout/ui/WorkoutExerciseCard";
import { useWorkout } from "./WorkoutProvider";
import React from "react";
import { ExerciseProvider } from "~/features/exercise/model/ExerciseProvider";
import { ExerciseType } from "~/features/exercise/model/types";
import {
  ExerciseVideo,
  ExerciseActionButton,
} from "~/features/exercise/ui/ExerciseModal";
import { ExerciseNotesModal } from "~/features/exercise/ui/ExerciseNotesModal";
import { type WorkoutExercise } from "~/features/workout/model/types";
import { getEquipmentLabel } from "~/shared/lib/equipment";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "~/shared/ui/Drawer";
import { Button } from "~/shared/ui/Button";
import { XmarkIcon } from "~/shared/ui/icons";

export const WorkoutExercises = () => {
  const workout = useWorkout();

  return (
    <div className="mt-10 flex flex-col gap-10 px-4">
      {workout.sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-6">
          <h2 className="text-2xl font-black uppercase">{section.title}</h2>
          <div className="flex flex-col gap-5">
            {section.exercises.map((exercise) => (
              <WorkoutExerciseScreen key={exercise.id} exercise={exercise}>
                <WorkoutExerciseCard exercise={exercise} />
              </WorkoutExerciseScreen>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

const WorkoutExerciseScreen = ({
  exercise,
  children,
}: {
  exercise: WorkoutExercise;
  children?: React.ReactNode;
}) => {
  return (
    <Drawer shouldScaleBackground={false}>
      <DrawerTrigger className="outline-none">{children}</DrawerTrigger>
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
        <ExerciseProvider exercise={exercise}>
          <div className="bg-background-200 overflow-y-auto pb-4">
            <div className="overflow-x-hidden overflow-y-hidden pb-6">
              <div className="relative flex h-[45vh] w-full items-end justify-center bg-cover bg-center text-center">
                <ExerciseVideo videoSrc={exercise.video} />
                <h1 className="z-10 text-3xl font-black">{exercise.title}</h1>
              </div>
              <div className="px-5">
                <div className="my-3 flex items-center justify-center gap-2.5">
                  <ExerciseActionButton
                    label={
                      getEquipmentLabel(exercise.selectedEquipment) ??
                      "Собственный вес"
                    }
                    className="cursor-default"
                    onClick={() => {}}
                  />

                  <ExerciseNotesModal>
                    <ExerciseActionButton label="Заметки" onClick={() => {}} />
                  </ExerciseNotesModal>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-5">
              <table className="w-full table-fixed text-left">
                <thead className="text-muted-foreground border-b text-sm [&>th]:py-2 [&>th]:font-medium">
                  <th>Сет</th>
                  <th>Вес</th>
                  <th>
                    {exercise.type === ExerciseType.TIMED
                      ? "Время"
                      : "Повторений"}
                  </th>
                  <th></th>
                </thead>
                <tbody className="text-lg *:px-5 *:py-2 [&>tr>td]:py-3 [&>tr>td]:font-semibold [&>tr>td>input]:outline-none">
                  {exercise.sets.map((set) => (
                    <tr key={set.id}>
                      <td>{set.id}</td>
                      <td>
                        {exercise.selectedEquipment === "body_weight" ? (
                          <span className="text-muted-foreground">--</span>
                        ) : (
                          <>{set.weight} кг</>
                        )}
                      </td>
                      <td>
                        {exercise.type === ExerciseType.TIMED ? (
                          <>{set.time} сек</>
                        ) : (
                          set.reps
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ExerciseProvider>
      </DrawerContent>
    </Drawer>
  );
};
