import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useExercisesStore } from "~/features/exercise/model/store";
import { getUser } from "~/features/user/model/storage";

export default function AppLayout() {
  const { fetchExercises, ins } = useExercisesStore();
  const navigate = useNavigate();

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
