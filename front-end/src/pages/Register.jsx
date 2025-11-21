import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (data.password !== data.confirmPassword) {
      setError("As senhas não coincidem!");
      setIsLoading(false);
      return;
    }
    
    const result = await register(data.name, data.email, data.password); 
    if(result.success){
      navigate("/dashboard");
    } else {
      setError(result.error || "Erro ao criar conta. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gradiente flex flex-col items-center justify-center min-h-screen">
      <Navbar />

      <header className="text-center mb-10 mt-20">
        <h1 className="text-6xl font-extrabold mb-2 text-textoEscuro">
          Criar Conta
        </h1>
        <h3 className="text-xl font-medium text-textoEscuro">
          Comece sua jornada de autocuidado hoje!
        </h3>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl px-4">
        <div className="text-center md:text-left md:w-1/2">
          <p className="text-2xl font-bold mb-4 text-textoEscuro">
            ✨ Monitore seu humor diariamente
          </p>
          <p className="text-2xl font-bold mb-4 text-textoEscuro">
            📊 Visualize sua evolução
          </p>
          <p className="text-2xl font-bold text-textoEscuro">
            🎯 Defina metas de autocuidado
          </p>
        </div>

        <div className="bg-fundoSecundario shadow-lg rounded-3xl p-10 md:w-1/2 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Nome Completo"
              className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none focus:border-destaqueAcao transition"
              required
              disabled={isLoading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none focus:border-destaqueAcao transition"
              required
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha (mínimo 6 caracteres)"
              className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none focus:border-destaqueAcao transition"
              required
              minLength="6"
              disabled={isLoading}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Senha"
              className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none focus:border-destaqueAcao transition"
              required
              minLength="6"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="brilho bg-destaqueAcao rounded-full py-3 text-textoEscuro font-semibold hover:bg-destaqueAcao/80 transition"
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="brilho bg-fundoPrimario border-2 border-textoEscuro rounded-full py-3 text-textoEscuro font-semibold hover:bg-fundoPrimario/80 transition"
            >
              Já possui conta? Faça login!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
