import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginInputs {
  email: string;
  password: string;
}
export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit = async (data: LoginInputs) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      navigate("/app/home");
    } catch (error) {
      console.error("Erro ao logar usuário", error);
      toast.error("Erro ao entrar com usuário.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="max-w-80 w-full flex flex-col items-center
      border border-gray-200 rounded-md justify-self-center
      h-80 px-10 bg-white shadow-md"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <h2
            className="text-xl font-bold text-slate-800 mt-2
          mb-8"
          >
            Entrar
          </h2>

          <div className="flex flex-col w-full">
            <label
              htmlFor="emailLogin"
              className="text-sm font-bold
            text-slate-800"
            >
              Email:
            </label>
            <input
              id="emailLogin"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border border-gray-400 rounded-sm px-1 py-1 text-sm
              text-gray-500"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="flex flex-col w-full mt-4">
            <label
              htmlFor="passwordLogin"
              className="text-sm font-bold
            text-slate-800"
            >
              Senha:
            </label>
            <input
              id="passwordLogin"
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="border border-gray-400 rounded-sm px-1 py-1 text-sm
              text-gray-700"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-sm bg-blue-800 px-4 text-gray-200 font-semibold
            hover:bg-blue-900 transition-all duration-150 my-5 text-sm uppercase"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div>
          <span className="text-xs">
            Não possui cadastro?
            <Link
              className="text-blue-500 hover:text-blue-600"
              to={"/register"}
            >
              Registre-se
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
