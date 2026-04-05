import { MonitorSmartphone, PenBox, Trash2 } from "lucide-react";
import type { EquipamentType } from "../types/equipamentType";
import { toast } from "sonner";
import { deleteEquipamentById } from "../services/equipaments";

interface EquipamentCardProps {
  openEditModal?: (equipament: EquipamentType) => void;
  onSuccess?: () => void;
  data: EquipamentType[];
}

export function EquipamentCard({
  data,
  onSuccess,
  openEditModal,
}: EquipamentCardProps) {
  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Deseja realmente excluir esse equipamento?",
    );
    if (confirm) {
      try {
        await deleteEquipamentById(id);
        toast.success("Equipamento deletado com sucesso.", {
          id: "successDeleteEquipament",
        });
        onSuccess?.();
      } catch (error) {
        console.error("Erro ao deletar equipamento", error);
        toast.error("Erro ao deletar equipamento.", {
          id: "errorDeleteEquipament",
        });
      }
    }
  };
  return (
    <table className="w-full text-sm">
      <thead>
        <tr
          className="border-b text-xs border-gray-300 
            uppercase bg-blue-200/80 text-nowrap"
        >
          <th className="px-4 py-3 text-center">Nome</th>
          <th className="px-4 py-3 text-center">Autor</th>
          <th className="px-4 py-3 text-center">Quantidade Disp.</th>
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
              <div
                className="flex px-4 gap-1 items-center 
              justify-self-center py-2"
              >
                <div className="border border-gray-400 p-1 rounded-sm">
                  <MonitorSmartphone size={20} />
                </div>
                <h2 className="text-sm text-gray-700 font-bold capitalize">
                  {d.name}
                </h2>
              </div>
            </td>
            <td className="max-w-10 md:max-w-20 truncate text-center">
              <span className="text-blue-600 font-semibold">
                {d.users.email}
              </span>
            </td>
            <td>
              <span className="flex justify-self-center">{d.quantity}</span>
            </td>
            <td>
              <div className="flex items-center gap-2 justify-center">
                <button onClick={() => openEditModal?.(d)}>
                  <PenBox size={20} className="text-blue-700" />
                </button>
                <button
                  onClick={() => {
                    d.id && handleDelete?.(d.id);
                  }}
                >
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
