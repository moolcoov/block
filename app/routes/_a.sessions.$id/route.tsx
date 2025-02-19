import { redirect } from "react-router";
import {
  getSessionFromDB,
  updateSessionInDB,
} from "~/features/session/model/db";
import { SessionProvider } from "~/features/session/model/SessionProvider";
import type {
  WorkoutSession,
  WorkoutSessionResults,
} from "~/features/session/model/types";
import type { UUID } from "~/shared/types/uuid";
import { SessionHeader } from "./components/SessionHeader";
import { SessionTop } from "./components/SessionTop";
import { SessionButton } from "./components/SessionButton";
import { SessionBottom } from "./components/SessionBottom";
import { SessionCover } from "./components/SessionImage";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { SessionResults } from "./components/SessionResults";
import { getUser, updateUser } from "~/features/user/model/storage";
import { calculateXP } from "~/features/user/lib/xp";

export const easingFunction = [0.33, 1, 0.68, 1];

export const clientLoader = async ({
  params: { id },
}: {
  params: { id: UUID };
}) => {
  const session = await getSessionFromDB(id);

  if (!session) {
    return redirect("/workouts");
  }

  return { session };
};

export default function SessionPage({
  loaderData: { session },
}: {
  loaderData: { session: WorkoutSession };
}) {
  const [completed, setCompleted] = React.useState(session.completed);
  const [results, setResults] = React.useState<
    WorkoutSessionResults | undefined
  >(session.results);

  const onComplete = React.useCallback(
    (session: WorkoutSession) => {
      const trainingTime = Math.round(
        ((session.completedAt ?? new Date()).getTime() -
          (session.startedAt ?? new Date()).getTime()) /
          60000,
      );
      const totalWeight = session.workout.sections.reduce((acc, section) => {
        return section.exercises.reduce((acc, section) => {
          return section.sets.reduce((acc, set) => {
            return acc + (set.weight ?? 0);
          }, acc);
        }, acc);
      }, 0);

      const user = getUser();

      const results = {
        xp: {
          prev: user?.xp ?? 0,
          new: (user?.xp ?? 0) + calculateXP(trainingTime, totalWeight),
        },

        coins: {
          prev: user?.coins ?? 0,
          new: (user?.coins ?? 0) + calculateXP(trainingTime, totalWeight),
        },
      };

      if (user) {
        updateUser({ ...user, xp: results.xp.new, coins: results.coins.new });
      }

      setResults(results);

      updateSessionInDB({
        ...session,
        completed: true,
        completedAt: new Date(),
        results,
      }).then(() => setCompleted(true));
    },
    [setCompleted, setResults],
  );

  return (
    <SessionProvider session={session} onComplete={onComplete}>
      <AnimatePresence mode="wait">
        {!completed && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.5 } }}
            className="relative flex h-[100svh] flex-col overflow-hidden"
            key="session"
          >
            <SessionCover />
            <div className="z-10 flex h-full flex-col">
              <SessionHeader />
              <SessionTop />
              <SessionBottom />
              <SessionButton />
            </div>
          </motion.div>
        )}
        {completed && <SessionResults key="results" results={results} />}
      </AnimatePresence>
    </SessionProvider>
  );
}
