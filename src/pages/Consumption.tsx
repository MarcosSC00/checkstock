import { Plus, Search } from "lucide-react";
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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [consumptions, setConsumptions] = useState<any[] | null>([]);
  const loadConsumptions = async () => {
    try {
      setLoading(true);
      const result = await getConsumptions();
      setConsumptions(result);
      setLoading(true);
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

  useEffect(() => {
    loadConsumptions();
  }, []);
  return (
    <div className="w-full">
      <div
        className="w-full flex flex-row-reverse items-center 
        justify-between mt-10 text-sm md:flex-row"
      >
        <button
          onClick={() => setOpenModal(true)}
          className="flex gap-2 items-center px-4 rounded-sm bg-blue-700
        text-gray-50 font-bold hover:bg-blue-800 transition-all duration-150"
        >
          <span className="hidden md:block">Novo Consumo</span>
          <Plus />
        </button>
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
              totalQtd={c.total_qtd}
              usedQtd={c.used_qtd}
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
          onSuccess={loadConsumptions}
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
