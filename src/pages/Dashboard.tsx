import { useState } from "react";
import { PageWrapper } from "../components/pageWrapper";
import { Modal } from "../components/modal";
import { CreateEquipament } from "../components/forms/createEquipament";
import * as Dialog from "@radix-ui/react-dialog";

export function Dashboard() {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <PageWrapper>
      <button onClick={() => setOpenModal(true)}>Criar Equipamento</button>
      <Modal
        tiltle="Cadastro de Cliente"
        open={openModal}
        setOpen={setOpenModal}
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
    </PageWrapper>
  );
}
