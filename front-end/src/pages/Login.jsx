import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // lógica de login e autenticação
  useEffect(() => {
    if(isAuthenticated()){
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if(result.success){
      navigate("/dashboard");
    } else {
      setError(result.error || "Erro ao fazer login. Tente novamente.");
    }

    setIsLoading(false);
  };

  // conteúdo da página
  return (
    <div className="bg-gradiente flex flex-col items-center justify-center min-h-screen relative pt-20">
      <Navbar />

      <header className="text-center mb-16">
        <h1 className="text-7xl font-extrabold mb-2 text-textoEscuro">
          App Bem-Estar
        </h1>
        <h3 className="text-2xl font-bold text-textoEscuro">
          Plataforma de Monitoramento e Gestão de Saúde Mental
        </h3>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-3xl px-4">
        <div className="text-center md:text-left md:w-1/2">
          <p className="text-3xl font-bold mb-4 text-textoEscuro">
            Pronto para cuidar de você?
          </p>
          <p className="text-3xl font-bold text-textoEscuro">
            Entre e comece a monitorar seu humor!
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none focus:border-destaqueAcao transition"
              required
              disabled={isLoading}
            />
            <div>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none focus:border-destaqueAcao transition"
                required
                disabled={isLoading}
              />
              <p className="text-sm text-textoEscuro mt-2 text-center">
                Esqueceu a senha?{" "}
                <span className="underline cursor-pointer hover:text-destaqueAcao transition">
                  Recupere aqui.
                </span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="brilho bg-destaqueAcao rounded-full py-3 text-textoEscuro font-semibold hover:bg-destaqueAcao/80 transition"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="brilho bg-alerta rounded-full py-3 text-textoEscuro font-semibold hover:bg-alerta/80 transition"
            >
              Não possui conta? Clique aqui!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
