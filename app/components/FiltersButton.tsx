import { cn } from "~/lib/utils";
import { FiltersIcon } from "./icons";

interface FiltersButtonProps {
  activeFilters?: number;
}

export const FiltersButton = ({ activeFilters }: FiltersButtonProps) => {
  return (
    <button
      className={cn(
        "bg-muted flex h-[35px] items-center gap-1.5 rounded-full px-3",
      )}
    >
      <FiltersIcon size={12} />
      <span className="text-xs font-medium">
        {activeFilters && activeFilters > 0
          ? `${activeFilters} фильтров`
          : "Фильтры"}
      </span>
    </button>
  );
};
