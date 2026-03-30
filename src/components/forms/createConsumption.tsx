import { useForm } from "react-hook-form";
interface ConsumptionProps {}

export function CreateConsumption({ children }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsumptionProps>();
  const onSubmit = async () => {};
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
        {errors.name && <span className="text-xs text-red-500">{}</span>}
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
        {errors.quantity && <span className="text-xs text-red-500">{}</span>}
        {children}
      </form>
    </div>
  );
}
