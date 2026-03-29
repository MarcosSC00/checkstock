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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Criar conta</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Informe um email válido.",
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            {...register("password", {
              required: "Senha obrigatória.",
              minLength: 6,
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Cadastrar"}
        </button>
      </form>
      <div>
        <span>
          Já possui cadatro?
          <Link className="text-blue-500" to={"/login"}>
            entrar
          </Link>
        </span>
      </div>
    </div>
  );
}
