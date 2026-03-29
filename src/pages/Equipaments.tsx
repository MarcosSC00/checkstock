import { useState } from "react";
import { EquipamentCard } from "../components/equipamentCard";
import { CreateEquipament } from "../components/forms/createEquipament";
import { Modal } from "../components/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { Search } from "lucide-react";

export function Equipaments() {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-col items-center mt-10 w-full">
        <div className="w-full mb-8">
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
        <div
          className="p-1 w-full border border-gray-200 rounded-md
          shadow-md max-h-87.5 overflow-auto"
        >
          <EquipamentCard name="mouse" created_at="29/032026" quantity={10} />
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="px-2 py-1 bg-blue-700 rounded-md
                text-gray-50 font-bold justify-self-auto w-fit
                mt-5 hover:bg-blue-800 transition-all duration-150
                text-sm shadow-md"
        >
          Cadastrar Equipamento
        </button>
      </div>
      <Modal
        tiltle="Cadastro de Equipamento"
        open={openModal}
        setOpen={setOpenModal}
        trigger={<></>}
      >
        <CreateEquipament
          onLoading={setIsSubmiting}
          openModal={() => setOpenModal(false)}
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
