interface ProgressBarProps {
  total: number;
  consumed: number;
  height?: string; // opcional (ex: "h-4")
}

export function ProgressBar({
  total,
  consumed,
  height = "h-4",
}: ProgressBarProps) {
  const percentage = total > 0 ? (consumed / total) * 100 : 0;

  const getColor = () => {
    if (percentage <= 50) return "bg-green-500";
    if (percentage <= 80) return "bg-yellow-400";
    return "bg-red-500";
  };
  return (
    <div>
      <div
        className={`w-full bg-gray-200 rounded-full relative overflow-hidden ${height}`}
      >
        <div
          className={`${getColor()} h-full rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className="text-[10px] absolute font-medium text-gray-500">
        {consumed} de {total}
      </span>
    </div>
  );
}
