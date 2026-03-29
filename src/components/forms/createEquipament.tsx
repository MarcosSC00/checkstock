import { useForm, type SubmitHandler } from "react-hook-form";
import { createEquipament } from "../../services/equipaments";
import { toast } from "sonner";

interface EquipamentInputs {
  name: string;
  quantity: number;
}

interface CreateEquipamentProps {
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
  onLoading?: (loading: boolean) => void;
  children: any;
}

export function CreateEquipament({
  children,
  onSuccess,
  openModal,
  onLoading,
}: CreateEquipamentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipamentInputs>();

  const onSubmit: SubmitHandler<EquipamentInputs> = async ({
    name,
    quantity,
  }: EquipamentInputs) => {
    try {
      onLoading?.(true);
      await createEquipament({ name, quantity });
      toast.success("Equipamento criado com sucesso!", {
        id: "create-success-equipament",
      });
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao criar quipamento.");
      console.log("Erro ao criar qeuipamento", error);
    } finally {
      openModal?.();
      onLoading?.(true);
    }
  };
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
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("name", {
            required: "Informe o nome",
          })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
        <label htmlFor="phone" className="font-semibold text-sm mt-4">
          Qunatidade:
        </label>
        <input
          type="number"
          id="quantity"
          placeholder="Informe a quantidade"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("quantity", {
            required: "Informe a quantidade",
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
