import { motion } from "motion/react";
import React from "react";
import { MagnifierIcon } from "~/components/icons";
import { useExercisesSearchQuery } from "~/features/workout/model/ExercisesProvider";

export const ExercisesHeader = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = useExercisesSearchQuery();

  return (
    <header className="bg-background-200 sticky top-0 w-full border-b px-5 py-6">
      <motion.h1
        className="font-medium-sans text-xl"
        animate={
          expanded
            ? { opacity: 0, transform: "translateX(-10px)" }
            : { opacity: 1, transform: "translateX(0px)" }
        }
      >
        УПРАЖНЕНИЯ
      </motion.h1>

      <div className="absolute top-4 right-0 flex w-[100dvw] justify-end gap-3 px-5">
        <motion.div
          className="bg-muted flex h-10 w-10 min-w-[40px] items-center gap-2 overflow-hidden rounded-full px-3"
          animate={expanded ? { width: "100%" } : { width: "40px" }}
        >
          <motion.button
            className="flex h-10 w-10 items-center justify-center"
            animate={expanded ? { width: "initial" } : { width: "40px" }}
            onClick={() => setExpanded(true)}
          >
            <MagnifierIcon size={20} />
          </motion.button>
          {expanded && (
            <input
              placeholder="Поиск по названию или оборудованию"
              className="h-full w-full overflow-ellipsis"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
          )}
        </motion.div>

        {expanded && (
          <button
            className="flex items-center justify-center px-2"
            onClick={() => {
              setExpanded(false);
              setSearchQuery("");
            }}
          >
            Отмена
          </button>
        )}
      </div>
    </header>
  );
};
