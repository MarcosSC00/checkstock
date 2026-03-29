import { MonitorSmartphone, PenBox } from "lucide-react";
import type { EquipamentType } from "../types/equipamentType";
import { Link } from "react-router-dom";

export function EquipamentCard({ name, quantity }: EquipamentType) {
  return (
    <div
      className="flex items-center justify-between p-2 border-b
    border-gray-200 w-full"
    >
      <div className="flex w-fit gap-2 items-center">
        <div className="border border-gray-400 p-1 rounded-sm">
          <MonitorSmartphone size={20} />
        </div>
        <h2 className="text-sm text-gray-700 font-bold capitalize">{name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-black text-gray-700">{quantity}</span>
        <Link to={""}>
          <PenBox size={20} />
        </Link>
      </div>
    </div>
  );
}
