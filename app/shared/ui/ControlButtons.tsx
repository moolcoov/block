import { Button } from "./Button";
import { ArrowLeftIcon } from "./icons";

interface ControlButtonsProps {
  withBackButton?: boolean;
  disabled?: boolean;
  label: string;

  onNext: () => void;
  onBack?: () => void;
}

export const ControlButtons = ({
  withBackButton,
  disabled,
  label,
  onNext,
  onBack,
}: ControlButtonsProps) => {
  return (
    <div className="flex w-full gap-2">
      {withBackButton && (
        <button
          className="bg-muted flex h-14 w-full max-w-14 items-center justify-center rounded-full transition-transform active:scale-[0.95]"
          onClick={onBack}
        >
          <ArrowLeftIcon size={28} />
        </button>
      )}
      <Button disabled={disabled} onClick={onNext}>
        {label}
      </Button>
    </div>
  );
};
