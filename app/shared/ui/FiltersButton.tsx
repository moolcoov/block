import { cn } from "~/shared/lib/utils";
import { FiltersIcon } from "./icons";

interface FiltersButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activeFilters?: number;
}

export const FiltersButton = ({
  activeFilters,
  ...props
}: FiltersButtonProps) => {
  return (
    <button
      className={cn(
        "bg-muted flex h-[35px] items-center gap-1.5 rounded-full px-3",
        { "text-background-100 bg-white": activeFilters && activeFilters > 0 },
      )}
      {...props}
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
