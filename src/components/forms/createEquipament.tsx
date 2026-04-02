import { useForm, type SubmitHandler } from "react-hook-form";
import {
  createEquipament,
  incrementEquipament,
} from "../../services/equipaments";
import { toast } from "sonner";
import type { EquipamentType } from "../../types/equipamentType";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface EquipamentInputs {
  name: string;
  quantity: number;
}

interface CreateEquipamentProps {
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
  onLoading?: (loading: boolean) => void;
  isUpdate?: boolean;
  loadedData?: EquipamentType;
  children: any;
}

export function CreateEquipament({
  children,
  onSuccess,
  openModal,
  onLoading,
  isUpdate,
  loadedData,
}: CreateEquipamentProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EquipamentInputs>();

  const onSubmit: SubmitHandler<EquipamentInputs> = async ({
    name,
    quantity,
  }: EquipamentInputs) => {
    try {
      onLoading?.(true);
      if (isUpdate && loadedData) {
        await incrementEquipament(loadedData.id ?? "", quantity);
        toast.success("Equipamento atualizado com sucesso!", {
          id: "update-success-equipament",
        });
      } else {
        await createEquipament(user, { name, quantity });
        toast.success("Equipamento criado com sucesso!", {
          id: "create-success-equipament",
        });
      }

      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message, {
        id: "erroCreateEquipament",
      });
      console.log("Erro ao criar qeuipamento", error);
    } finally {
      openModal?.();
      onLoading?.(false);
      reset();
    }
  };

  useEffect(() => {
    reset({
      name: loadedData?.name,
      quantity: loadedData?.quantity,
    });
  }, [loadedData, reset]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <label htmlFor="name" className="font-semibold text-sm">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          className={`${isUpdate && "bg-gray-200"} outline-none border border-gray-200 rounded-sm p-2 text-sm`}
          readOnly={isUpdate}
          {...register("name", {
            required: "Informe o nome",
          })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
        {isUpdate && (
          <div className="w-full flex gap-2 items-baseline">
            <label htmlFor="phone" className="font-semibold text-sm mt-4">
              Quantidade Atual:
            </label>
            <input
              type="number"
              id="quantity"
              className="bg-gray-200 outline-none border border-gray-200 rounded-sm p-2 text-sm"
              readOnly={true}
              value={loadedData?.quantity}
            />
          </div>
        )}
        <label htmlFor="phone" className="font-semibold text-sm mt-4">
          {isUpdate ? "Adicionar:" : "Quantidade:"}
        </label>
        <input
          type="number"
          id="quantity"
          placeholder="Informe a quantidade"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("quantity", {
            required: "Informe a quantidade",
            valueAsNumber: true,
          })}
        />
        {errors.quantity && (
          <span className="text-xs text-red-500">
            {errors.quantity.message}
          </span>
        )}
        {children}
      </form>
    </div>
  );
}
