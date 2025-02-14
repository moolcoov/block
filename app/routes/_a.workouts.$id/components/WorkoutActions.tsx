import { HeartIcon, ShareIcon, PencilIcon } from "~/shared/ui/icons";

export const WorkoutActions = () => {
  return (
    <div className="mt-8 flex items-center justify-center gap-8">
      <Action icon={<HeartIcon />} label="Сохранить" onClick={() => {}} />
      <Action icon={<ShareIcon />} label="Поделиться" onClick={() => {}} />
      <Action icon={<PencilIcon />} label="Изменить" onClick={() => {}} />
    </div>
  );
};

interface ActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const Action = ({ icon, label, onClick }: ActionProps) => {
  return (
    <button
      className="text-muted-foreground flex flex-col items-center gap-1.5"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
