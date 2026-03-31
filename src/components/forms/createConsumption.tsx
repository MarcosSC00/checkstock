import { useForm } from "react-hook-form";
import type { ConsumptionType } from "../../types/consumptionType";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getEquipamentsNames } from "../../services/equipaments";
import { Loading } from "../loading";
import { consumeEquipament } from "../../services/consumptions";
import { toast } from "sonner";

interface ConsumptionProps {
  openModal?: () => void;
  onSuccess?: () => Promise<void>;
  onLoading?: (loading: boolean) => void;
  children: any;
}

export function CreateConsumption({
  children,
  openModal,
  onSuccess,
  onLoading,
}: ConsumptionProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [equipamentsNames, setEquipamentsNames] = useState<any[] | null>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsumptionType>();

  const loadEquipamentsName = async () => {
    try {
      setLoading(true);
      const result = await getEquipamentsNames();
      setEquipamentsNames(result);
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error("Erro ao criar comsumo", error);
      toast.error("Erro ao executar tarefa.", {
        id: "errorCreateConsumption",
      });
    } finally {
      openModal?.();
      onLoading?.(false);
    }
  };
  useEffect(() => {
    loadEquipamentsName();
  }, []);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-y-auto"
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col">
            <label htmlFor="equipament" className="font-semibold text-sm">
              Equipamento:
            </label>
            {equipamentsNames && equipamentsNames?.length > 0 ? (
              <select
                id="equipament"
                {...register("equipamentId", {
                  required: "informe o equipamento.",
                })}
                className="w-fit pr-2 py-1 border border-gray-200 rounded-sm
                text-sm text-gray-600"
              >
                <option value="">Selecione um equipamento</option>
                {equipamentsNames.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-xs text-red-500">
                Nenhum equipamento cadastrado.
              </span>
            )}
            {errors.equipamentId && (
              <span className="text-xs text-red-500">
                {errors.equipamentId.message}
              </span>
            )}
          </div>
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
