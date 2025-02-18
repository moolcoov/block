import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useExercisesStore } from "~/features/exercise/model/store";
import { getUser } from "~/features/user/model/storage";
import { useWorkoutsStore } from "~/features/workout/model/store";

export default function AppLayout() {
  const { fetchExercises } = useExercisesStore();
  const { fetchWorkouts } = useWorkoutsStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchExercises();
      await fetchWorkouts();
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then((persistent) => {
        if (persistent) {
          console.log(
            "This app uses IndexedDB, your data won't wipe except by your explicit action.",
          );
        } else {
          console.warn(
            "This app uses IndexedDB, storage may be cleared by the UA under storage pressure.",
          );
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (!getUser()) {
      navigate("/onboarding");
    }
  }, []);

  return (
    <>
      <Outlet />
      {/* <button onClick={async () => await ins()}>INS</button> */}
    </>
  );
}
