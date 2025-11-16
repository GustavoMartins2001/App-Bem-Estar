import { useLocation } from "react-router-dom";

export default function NavbarDashboard({ userName, onLogout }) {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-textoEscuro z-50 shadow-lg">
      <h1 className="text-3xl text-fundoSecundario font-extrabold cursor-pointer hover:text-destaqueAcao transition">
        🌱 Bem-Estar
      </h1>

      <div className="flex items-center space-x-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            location.pathname === "/dashboard"
              ? "bg-destaqueAcao text-textoEscuro"
              : "text-fundoSecundario hover:text-destaqueAcao"
          }`}
        >
          Dashboard
        </button>

        <button className="px-4 py-2 rounded-full font-semibold transition text-fundoSecundario hover:text-destaqueAcao">
          Avaliação
        </button>

        <button className="px-4 py-2 rounded-full font-semibold transition text-fundoSecundario hover:text-destaqueAcao">
          Metas
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-fundoPrimario/20 rounded-full">
          <span className="text-xl">👤</span>
          <span className="text-fundoSecundario font-medium">{userName}</span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-alerta text-textoEscuro font-semibold hover:bg-alerta/80 transition"
        >
          <span className="text-lg">🚪</span>
          Sair
        </button>
      </div>
    </nav>
  );
}
