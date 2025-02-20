import {
  useWorkoutsSearchQuery,
  WorkoutsProvider,
} from "~/features/workout/model/WorkoutsProvider";
import { WorkoutsSavedList } from "./components/WorkoutsSavedList";
import { WorkoutsList } from "./components/WorkoutsList";
import { WorkoutsHeader } from "./components/WorkoutsHeader";
import { useWorkoutsStore } from "~/features/workout/model/store";
import { AnimatePresence } from "motion/react";
import { Loading } from "~/shared/ui/Loading";
import { SessionResumeButton } from "~/features/session/ui/SessionResumeButton";
import { useSessionsStore } from "~/features/session/model/store";

export default function WorkoutsPage() {
  const { workouts, loading } = useWorkoutsStore();

  return (
    <AnimatePresence>
      {loading && <Loading key={"loading"} />}
      {workouts && (
        <WorkoutsProvider workouts={workouts}>
          <WorkoutsHeader />
          <div className="flex flex-col gap-8 pt-6">
            <Content />
          </div>
        </WorkoutsProvider>
      )}
    </AnimatePresence>
  );
}

const Content = () => {
  const [searchQuery] = useWorkoutsSearchQuery();
  const sessions = useSessionsStore((state) => state.sessions);

  if (searchQuery !== "") {
    return <WorkoutsList />;
  }

  return (
    <>
      {sessions.at(0) && !sessions[0].completed && !sessions[0].canceled && (
        <div className="px-5">
          <SessionResumeButton session={sessions[0]} />
        </div>
      )}

      <WorkoutsSavedList />
      <WorkoutsList />
    </>
  );
};
