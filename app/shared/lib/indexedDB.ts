import { openDB } from "idb";
import React from "react";

const DB_NAME = "workoutDB";
const VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, 3, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("exercises")) {
        db.createObjectStore("exercises", {
          keyPath: "id",
        });
      }
      if (!db.objectStoreNames.contains("workouts")) {
        db.createObjectStore("workouts", {
          keyPath: "id",
        });
      }
    },
  });
};

export const useDatabase = <T>(fn: () => Promise<T>) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fn()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [fn]);

  return { loading, data, error };
};
