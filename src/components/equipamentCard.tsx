import { MonitorSmartphone, PenBox, Trash2 } from "lucide-react";
import type { EquipamentType } from "../types/equipamentType";

interface EquipamentCardProps extends EquipamentType {
  openEditModal?: () => void;
  userEmail: string;
}

export function EquipamentCard({
  name,
  quantity,
  updated_at,
  userEmail,
  openEditModal,
}: EquipamentCardProps) {
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
        <div className="border-l-2 border-gray-300 pl-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold">Ult. Atualização:</span>
            <span className="text-[9px]">{updated_at}</span>
          </div>
          <p className="text-[10px]">
            por <span className="text-blue-600 font-semibold">{userEmail}</span>
          </p>
        </div>
      </div>
      <span className="font-black text-gray-700">{quantity}</span>
      <div className="flex items-center gap-2">
        <button onClick={openEditModal}>
          <PenBox size={20} className="text-blue-700" />
        </button>
        <button onClick={openEditModal}>
          <Trash2 size={20} className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
