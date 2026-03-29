import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar usuário", error);
      toast.error("Erro ao entrar com usuário.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Entrar</h2>

      <div>
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input type="password" placeholder="Senha" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
