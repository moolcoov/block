import { motion } from "motion/react";
import React from "react";
import { useWorkoutsSearchQuery } from "~/features/workout/model/WorkoutsProvider";
import { HeaderSearch } from "~/shared/ui/HeaderSearch";
import { DumbBellColoredIcon, LottieCoinIcon } from "~/shared/ui/icons";

export const WorkoutsHeader = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = useWorkoutsSearchQuery();

  return (
    <header className="bg-background-200 sticky top-0 z-20 flex h-18 w-full border-b px-5">
      <motion.div
        className="flex gap-8"
        animate={
          expanded
            ? { opacity: 0, transform: "translateX(-10px)" }
            : { opacity: 1, transform: "translateX(0px)" }
        }
      >
        <div className="flex items-center gap-2">
          <DumbBellColoredIcon size={32} />
          <span className="font-bold text-[#5BC5F3]">3 ур</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold">2 нед</span>
        </div>
        <div className="flex items-center gap-2">
          <LottieCoinIcon size={26} />
          <span className="font-bold text-[#D9D9D9]">128</span>
        </div>
      </motion.div>

      <HeaderSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </header>
  );
};
