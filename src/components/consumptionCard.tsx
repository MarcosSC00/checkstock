import { MonitorSmartphone } from "lucide-react";
import { Card } from "./card";
import { ProgressBar } from "./progressBar";

interface ConsumptionCardProps {
  name: string;
  totalQtd: number;
  usedQtd: number;
}
export function ConsumptionCard({
  name,
  totalQtd,
  usedQtd,
}: ConsumptionCardProps) {
  return (
    <div>
      <Card>
        <div className="w-full flex justify-between items-center">
          <p className="text-gray-700 text-md font-bold mb-2">{name}</p>
          <MonitorSmartphone
            width={30}
            height={30}
            className="p-1 bg-blue-600 text-gray-50 rounded-full"
          />
        </div>
        <div className="w-full mt-5">
          <ProgressBar total={totalQtd} consumed={usedQtd} />
        </div>
        <div className="w-full flex justify-end">
          <button
            className="text-xs uppercase font-semibold px-2 py-1
          bg-blue-700 rounded-sm text-gray-50 mt-5 hover:bg-blue-800"
          >
            atualizar uso
          </button>
        </div>
      </Card>
    </div>
  );
}
