import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterInputs {
  email: string;
  password: string;
}
export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const onSubmit = async (data: RegisterInputs) => {
    try {
      setLoading(true);
      await registerUser(data.email, data.password);
      toast.success("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      toast.error("Erro ao cdastrar usuário.");
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
            Criar conta
          </h2>

          <div className="flex flex-col w-full">
            <label
              htmlFor="emailRegister"
              className="text-sm font-bold
            text-slate-800"
            >
              Email:
            </label>
            <input
              id="emailRegister"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Informe um email válido.",
              })}
              className="border border-gray-400 rounded-sm px-1 py-1 text-sm"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="flex flex-col w-full mt-4">
            <label
              htmlFor="passwordRegister"
              className="text-sm font-bold
            text-slate-800"
            >
              Senha:
            </label>
            <input
              id="passwordRegister"
              type="password"
              placeholder="Senha"
              {...register("password", {
                required: "Senha obrigatória.",
                minLength: 6,
              })}
              className="border border-gray-400 rounded-sm px-1 py-1 text-sm"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-sm bg-blue-800 px-4 text-gray-200 font-semibold
            hover:bg-blue-900 transition-all duration-150 my-5"
          >
            {loading ? "Criando..." : "Cadastrar"}
          </button>
        </form>
        <div>
          <span className="text-xs">
            Já possui cadatro?
            <Link className="text-blue-500 hover:text-blue-600" to={"/login"}>
              entrar
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
