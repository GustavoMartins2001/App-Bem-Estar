import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-textoEscuro z-50">
      <h1
        className="text-3xl text-fundoSecundario font-extrabold cursor-pointer"
        onClick={() => navigate("/")}
      >
        🌱 Bem-Estar
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className={`brilho px-4 py-2 rounded-full border-2 border-destaqueAcao font-semibold transition ${
            location.pathname === "/login"
              ? "bg-destaqueAcao text-textoEscuro"
              : "text-destaqueAcao hover:bg-destaqueAcao hover:text-textoEscuro"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className={`brilho px-4 py-2 rounded-full font-semibold transition ${
            location.pathname === "/register"
              ? "bg-[#ffedcb] text-textoEscuro"
              : "bg-alerta text-textoEscuro hover:bg-[#ffedcb]"
          }`}
        >
          Cadastro
        </button>
      </div>
    </nav>
  );
}
