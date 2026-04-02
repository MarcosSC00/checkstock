import { useForm } from "react-hook-form";
import type { ConsumptionType } from "../../types/consumptionType";
import { useAuth } from "../../contexts/AuthContext";
import { consumeEquipament } from "../../services/consumptions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getEquipamentsNames } from "../../services/equipaments";
import { Loading } from "../loading";

interface ConsumptionProps {
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
  onLoading?: (loading: boolean) => void;
  isUpdate?: boolean;
  equipament?: any;
  children: any;
}

export function CreateConsumption({
  children,
  openModal,
  onSuccess,
  onLoading,
  equipament,
  isUpdate,
}: ConsumptionProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsumptionType>();
  const [equipamentNames, setEquipamentNames] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);

  const loadEquipamentNames = async () => {
    try {
      setLoading(false);
      const result = await getEquipamentsNames();
      setEquipamentNames(result);
    } catch (error) {
      console.error("Erro ao carregar equipamentos", error);
      toast.error("Erro ao carregar equipamentos", {
        id: "erroLoadEquipaments",
      });
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    loadEquipamentNames();
  }, []);

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
          {isUpdate ? (
            <div>
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
          ) : loading ? (
            <Loading />
          ) : (
            <select
              id="equipament"
              className="py-1 pl-1 border border-gray-200 
            rounded-sm text-gray-500 text-sm"
              {...register("equipamentId", {
                required: "informe o equipamento.",
              })}
            >
              <option value="">selecione um equipamento</option>
              {equipamentNames &&
                equipamentNames.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          )}
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
