export const InfoColumn = ({
  info,
  label,
}: {
  info: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-between gap-2">
      {info}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
