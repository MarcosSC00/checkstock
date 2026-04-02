import { useForm } from "react-hook-form";
import type { ConsumptionType } from "../../types/consumptionType";
import { useAuth } from "../../contexts/AuthContext";
import { consumeEquipament } from "../../services/consumptions";
import { toast } from "sonner";

interface ConsumptionProps {
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
  onLoading?: (loading: boolean) => void;
  equipament?: any;
  children: any;
}

export function CreateConsumption({
  children,
  openModal,
  onSuccess,
  onLoading,
  equipament,
}: ConsumptionProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsumptionType>();

  const onSubmit = async (data: ConsumptionType) => {
    try {
      onLoading?.(true);
      await consumeEquipament(data, user);
      onSuccess?.();
      toast.success("Consumo criado com sucesso.", {
        id: "successCreateConsumption",
      });
    } catch (error: any) {
      console.error("Erro ao executar tarefa", error);
      toast.error(error.message, {
        id: "errorCreateConsumption",
      });
    } finally {
      openModal?.();
      onLoading?.(false);
    }
  };
  console.log(equipament);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        <div className="flex flex-col">
          <label htmlFor="equipament" className="font-semibold text-sm">
            Equipamento:
          </label>
          <input
            id="equipament"
            type="text"
            readOnly
            value={equipament?.name || ""}
            className="pl-2 py-1 rounded-sm bg-gray-200 text-sm
          text-gray-700"
          />

          <input
            id="equipament"
            type="hidden"
            value={equipament?.id || ""}
            {...register("equipamentId")}
          />
        </div>
        {errors.equipamentId && (
          <span className="text-xs text-red-500">
            {errors.equipamentId.message}
          </span>
        )}
        <label htmlFor="quantity" className="font-semibold text-sm mt-4">
          Qunatidade:
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
        <label htmlFor="destination" className="font-semibold text-sm mt-4">
          Destino:
        </label>
        <input
          type="text"
          id="destination"
          placeholder="Ex.: Consultório 1"
          className="outline-none border border-gray-200 rounded-sm p-2 text-sm"
          {...register("destination")}
        />
        {errors.destination && (
          <span className="text-xs text-red-500">
            {errors.destination.message}
          </span>
        )}

        {children}
      </form>
    </div>
  );
}
