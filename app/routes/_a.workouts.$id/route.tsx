import { type Workout } from "~/features/workout/model/types";
import { WorkoutProvider } from "./components/WorkoutProvider";
import { WorkoutHeader } from "./components/WorkoutHeader";
import { WorkoutButton } from "./components/WorkoutButton";
import { WorkoutActions } from "./components/WorkoutActions";
import { WorkoutExercises } from "./components/WorkoutExercises";
import { Difficulty } from "~/shared/types/difficulty";
import { Button } from "~/shared/ui/Button";
import { XmarkIcon } from "~/shared/ui/icons";
import { useNavigate, useNavigationType } from "react-router";
import type { UUID } from "~/shared/types/uuid";
import { getWorkoutFromDB } from "~/features/workout/model/db";
import { useDatabase } from "~/shared/lib/indexedDB";
import { AnimatePresence } from "motion/react";
import { Loading } from "~/shared/ui/Loading";

const workout: Workout = {
  id: "e3deb89b-5bed-4ddb-b12c-e18aeefe3d71",
  title: "ВЕРХ ТЕЛА НА СИЛУ",
  tags: [
    {
      id: "1",
      label: "Мышцы кора",
    },
    {
      id: "2",
      label: "Пресс",
    },
    {
      id: "3",
      label: "Для начинающих",
    },
  ],
  workoutTime: 28,
  difficulty: Difficulty.EASY,
  sections: [],
  createdAt: new Date(),
};

export default function WorkoutPage({
  params: { id },
}: {
  params: { id: UUID };
}) {
  const { data: workout, loading } = useDatabase(async () =>
    getWorkoutFromDB(id),
  );

  const navigate = useNavigate();
  const navigationType = useNavigationType();

  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence>
        {loading && <Loading key={"loading"} className="h-screen w-screen" />}
        {workout && (
          <WorkoutProvider workout={workout}>
            <Button
              variant={"secondary"}
              size={"icon"}
              className="fixed top-5 left-5 z-30"
              onClick={() => {
                if (navigationType === "POP") {
                  navigate("/workouts");
                  return;
                }

                navigate(-1);
              }}
            >
              <XmarkIcon size={19} />
            </Button>

            <div className="pb-[84px]">
              <WorkoutHeader />
              <WorkoutActions />
              <WorkoutExercises />
              <WorkoutButton />
            </div>
          </WorkoutProvider>
        )}
      </AnimatePresence>
    </div>
  );
}
