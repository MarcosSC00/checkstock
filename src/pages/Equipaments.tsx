import { useEffect, useState } from "react";
import { EquipamentCard } from "../components/equipamentCard";
import { CreateEquipament } from "../components/forms/createEquipament";
import { Modal } from "../components/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, Search } from "lucide-react";
import { getEquipaments } from "../services/equipaments";
import { data } from "react-router-dom";
import { toast } from "sonner";
import type { EquipamentType } from "../types/equipamentType";
import { Loading } from "../components/loading";
import { dateFormater } from "../utils/dateFormater";

export function Equipaments() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEquipament, setSelectedEquipament] =
    useState<EquipamentType>();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [equipaments, setEquipaments] = useState<EquipamentType[] | null>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadEquipaments = async () => {
    try {
      setLoading(true);
      const result = await getEquipaments();
      setEquipaments(result);
      toast.success("Equipamentos carregados com sucesso!", {
        id: "loadSuccessEquipaments",
      });
    } catch (error) {
      toast.error("Erro ao carregar equipamentos", {
        id: "loadErrorEquipaments",
      });
      console.error("Erro ao carregar equipamentos", data);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (equipament: EquipamentType) => {
    setIsEditOpen(true);
    setSelectedEquipament(equipament);
    setOpenModal(false);
  };

  useEffect(() => {
    loadEquipaments();
  }, []);

  console.log(equipaments);
  return (
    <div>
      <div className="flex flex-col items-center mt-10 w-full">
        <div className="w-full flex flex-row-reverse md:flex-row mb-8 items-center justify-between">
          <button
            onClick={() => {
              (setOpenModal(true), setIsEditOpen(false));
            }}
            className="flex items-center px-4 bg-blue-700 rounded-md
                text-gray-50 font-bold justify-self-auto w-fit
               hover:bg-blue-800 transition-all duration-150
                text-sm shadow-md gap-2"
          >
            <span className="hidden md:block">Cadastrar Equipamento</span>
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
          <div className="w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <div
            className="p-1 w-full border border-gray-200 rounded-md
          shadow-md max-h-87.5 overflow-auto"
          >
            {equipaments && equipaments.length >= 1 ? (
              equipaments.map((e) => (
                <EquipamentCard
                  name={e.name}
                  created_at={e.created_at}
                  quantity={e.quantity}
                  updated_at={e.updated_at && dateFormater(e.updated_at)}
                  userEmail={e.userId ?? ""}
                  key={e.id}
                  openEditModal={() => handleEdit(e)}
                />
              ))
            ) : (
              <p>Nenhum equipamento cadastrado.</p>
            )}
          </div>
        )}
      </div>
      {/*Modal Create */}
      <Modal
        tiltle="Cadastro de Equipamento"
        open={openModal}
        setOpen={setOpenModal}
        trigger={<></>}
      >
        <CreateEquipament
          onLoading={setIsSubmiting}
          openModal={() => setOpenModal(false)}
          onSuccess={loadEquipaments}
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
        </CreateEquipament>
      </Modal>

      {/* Modal Update */}
      <Modal
        tiltle="Atualização de Equipamento"
        open={isEditOpen}
        setOpen={setIsEditOpen}
        trigger={<></>}
      >
        <CreateEquipament
          isUpdate={true}
          loadedData={selectedEquipament}
          onLoading={setIsSubmiting}
          openModal={() => setIsEditOpen(false)}
          onSuccess={loadEquipaments}
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
        </CreateEquipament>
      </Modal>
    </div>
  );
}
