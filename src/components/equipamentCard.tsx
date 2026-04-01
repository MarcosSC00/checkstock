import { MonitorSmartphone, PenBox, Trash2 } from "lucide-react";
import type { EquipamentType } from "../types/equipamentType";
import { dateFormater } from "../utils/dateFormater";

interface EquipamentCardProps {
  openEditModal?: (equipament: EquipamentType) => void;
  data: EquipamentType[];
}

export function EquipamentCard({ data, openEditModal }: EquipamentCardProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr
          className="border-b text-xs border-gray-300 
            uppercase bg-blue-200/80 text-nowrap"
        >
          <th className="px-4 py-3 text-center">Nome</th>
          <th className="px-4 py-3 text-center">Atualização</th>
          <th className="px-4 py-3 text-center">Quantidade</th>
          <th className="px-4 py-3 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr
            key={d.id}
            className="border-b border-gray-300 
              text-gray-600"
          >
            <td>
              <div className="flex w-fit gap-2 items-center justify-self-center truncate">
                <div className="border border-gray-400 p-1 rounded-sm">
                  <MonitorSmartphone size={20} />
                </div>
                <h2 className="text-sm text-gray-700 font-bold capitalize">
                  {d.name}
                </h2>
              </div>
            </td>
            <td>
              <div className="flex flex-col justify-self-center py-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold">
                    Ult. Atualização:
                  </span>
                  <span className="text-[9px]">
                    {d.updated_at && dateFormater(d.updated_at)}
                  </span>
                </div>
                <p className="text-[10px]">
                  por{" "}
                  <span className="text-blue-600 font-semibold">
                    {d.users.email}
                  </span>
                </p>
              </div>
            </td>
            <td>
              <span className="flex justify-self-center">{d.quantity}</span>
            </td>
            <td>
              <div className="flex items-center gap-2 justify-center">
                <button onClick={() => openEditModal?.(d)}>
                  <PenBox size={20} className="text-blue-700" />
                </button>
                <button onClick={() => openEditModal?.(d)}>
                  <Trash2 size={20} className="text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
