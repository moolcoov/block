import React from "react";
import { Outlet } from "react-router";
import { useExercisesStore } from "~/features/exercise/model/store";

export default function AppLayout() {
  const { fetchExercises, ins } = useExercisesStore();

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchExercises();
    };
    fetchData();
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
