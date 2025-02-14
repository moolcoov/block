import React from "react";
import { Outlet } from "react-router";
import { useExercisesStore } from "~/features/exercises/model/store";

export default function AppLayout() {
  const { fetchExercises, ins } = useExercisesStore();

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchExercises();
    };
    fetchData();
  }, []);

  return (
    <>
      <Outlet />
      <button onClick={async () => await ins()}>INS</button>
    </>
  );
}
