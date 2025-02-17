import React from "react";
import { useNavigate } from "react-router";
import { getUser } from "~/features/user/model/storage";

export default function IndexPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getUser()) {
      navigate("/workouts");
    } else {
      navigate("/onboarding");
    }
  }, []);

  return null;
}
