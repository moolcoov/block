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

export default function WorkoutsPage() {
  const { workouts, loading } = useWorkoutsStore();

  return (
    <AnimatePresence>
      {loading && <Loading key={"loading"} />}
      {workouts && (
        <WorkoutsProvider workouts={workouts}>
          <WorkoutsHeader />
          <div className="flex flex-col pt-6">
            <Content />
          </div>
        </WorkoutsProvider>
      )}
    </AnimatePresence>
  );
}

const Content = () => {
  const [searchQuery] = useWorkoutsSearchQuery();

  if (searchQuery !== "") {
    return <WorkoutsList />;
  }

  return (
    <>
      <WorkoutsSavedList />
      <WorkoutsList />
    </>
  );
};
