import { dateFormater } from "../utils/dateFormater";

interface RecentConsumptionCardProps {
  name: string;
  date: string;
  quantity: number;
}

export function RecentConsumptionCard({
  date,
  name,
  quantity,
}: RecentConsumptionCardProps) {
  return (
    <div
      className="flex items-center justify-between
        border-b border-gray-200 text-slate-700 py-2"
    >
      <h4 className="font-bold capitalize">{name}</h4>
      <p className="text-sm font-bold">{dateFormater(date)}</p>
      <p className="font-bold">{quantity}</p>
    </div>
  );
}
