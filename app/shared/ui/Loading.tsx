import { motion } from "motion/react";
import { Spinner } from "./Spinner";

export const Loading = () => {
  return (
    <motion.div
      className="bg-background-100 absolute inset-0 z-10 flex items-center justify-center"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 6 }}
    >
      <Spinner size={26} />
    </motion.div>
  );
};
