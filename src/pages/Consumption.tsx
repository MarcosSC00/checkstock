import { Calendar, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "../components/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateConsumption } from "../components/forms/createConsumption";
import { getConsumptions } from "../services/consumptions";
import { toast } from "sonner";
import { ConsumptionCard } from "../components/consumptionCard";
import { Loading } from "../components/loading";

export function Consumption() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [selectedEquipament, setSelectedEquipament] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [consumptions, setConsumptions] = useState<any[] | null>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const loadConsumptions = async (month: number, year: number) => {
    try {
      setLoading(true);
      const result = await getConsumptions(month, year);
      setConsumptions(result);
      toast.success("Dados carregados com sucesso.", {
        id: "successConsumptionLoad",
      });
    } catch (error) {
      console.error("Erro ao carregar consumos", error);
      toast.error("Erro ao executar tarefa", {
        id: "errorConsumptionLoad",
      });
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();

  const handleSelectEquipament = (data: any) => {
    setSelectedEquipament(data);
  };

  useEffect(() => {
    if (month) {
      loadConsumptions(month, year);
    }
  }, [month]);

  return (
    <div className="w-full">
      <div
        className="w-full flex flex-row-reverse items-center 
        justify-between mt-10 text-sm md:flex-row"
      >
        <div
          className="flex items-center gap-2
        rounded-sm p-2 shadow-sm"
        >
          <Calendar className="text-blue-700" />
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="font-bold text-blue-700"
          >
            <option value={1}>Janeiro</option>
            <option value={2}>Fevereiro</option>
            <option value={3}>Março</option>
            <option value={4}>Abril</option>
            <option value={5}>Maio</option>
            <option value={6}>Junho</option>
            <option value={7}>Julho</option>
            <option value={8}>Agosto</option>
            <option value={9}>Setembro</option>
            <option value={10}>Outubro</option>
            <option value={11}>Novembro</option>
            <option value={12}>Dezembro</option>
          </select>
        </div>
        <div
          className="flex items-center border border-gray-200
        rounded-md w-fit justify-self-end"
        >
          <input
            type="text"
            placeholder="pesquisar..."
            className="pl-1 text-sm text-gray-600"
          />
          <Search className="p-1 bg-blue-700 text-gray-50 rounded-e-md" />
        </div>
      </div>
      {loading ? (
        <div className="w-full flex justify-center mt-10">
          <Loading />
        </div>
      ) : consumptions && consumptions.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-3 
      lg:grid-cols-[auto_auto_auto_auto] gap-6 mt-10"
        >
          {consumptions.map((c, index) => (
            <ConsumptionCard
              key={index}
              name={c.name}
              totalQtd={c.total_qtd + c.used_qtd}
              usedQtd={c.used_qtd}
              openModal={() => setOpenModal(true)}
              onSelectEquipament={() =>
                handleSelectEquipament({
                  id: c.id,
                  name: c.name,
                })
              }
            />
          ))}
        </div>
      ) : (
        <span
          className="w-full flex justify-center mt-10
        text-gray-600 font-bold"
        >
          Nenhum consumo encontrado.
        </span>
      )}
      <Modal
        tiltle="Cadastro de consumo"
        open={openModal}
        setOpen={setOpenModal}
        trigger={<></>}
      >
        <CreateConsumption
          onLoading={setIsSubmiting}
          openModal={() => setOpenModal(false)}
          onSuccess={() => loadConsumptions(month, year)}
          equipament={selectedEquipament}
        >
          <div className="flex justify-end gap-2 mt-5">
            <Dialog.Close
              className="p-1 border border-gray-300 rounded-md text-[#031D3B] font-semibold
                             hover:bg-gray-200 transition-colors duration-150
                             hover:cursor-pointer text-sm"
            >
              CANCELAR
            </Dialog.Close>
            <button
              type="submit"
              disabled={isSubmiting}
              className={`p-1 ${
                isSubmiting
                  ? "bg-[#85a0bf] hover:cursor-none border-[#85a0bf]"
                  : "bg-[#031D3B]  hover:bg-[#020F1F]"
              } border border-[#031D3B] rounded-md text-gray-50 font-semibold
                            transition-colors duration-150
                             hover:cursor-pointer text-sm`}
            >
              {isSubmiting ? "SALVANDO..." : "SALVAR"}
            </button>
          </div>
        </CreateConsumption>
      </Modal>
    </div>
  );
}
