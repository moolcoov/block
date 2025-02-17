import { motion } from "motion/react";
import { ExerciseCreateModal } from "~/features/exercise/ui/ExerciseCreateModal";
import { PlusIcon } from "~/shared/ui/icons";

export const CreateExerciseButton = () => {
  return (
    <motion.div
      initial={{ height: "0" }}
      animate={{ height: "auto" }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
      className="fixed bottom-(--bottom-navbar-addition) left-0 w-full px-5"
    >
      <div className="back bg-muted w-full rounded-t-4xl pb-9">
        <button className="flex w-full items-center justify-center gap-2 rounded-[40px] py-5 transition-transform active:scale-[0.95]">
          <PlusIcon size={18} />
          <ExerciseCreateModal>
            <span className="font-medium">Новое упражнение</span>
          </ExerciseCreateModal>
        </button>
      </div>
    </motion.div>
  );
};
