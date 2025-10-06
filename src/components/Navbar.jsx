export default function Navbar({ onNavigate }) {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-textoEscuro z-50">
      <h1 className="text-3xl text-fundoSecundario font-extrabold">
        🌱 Bem-Estar
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => onNavigate("login")}
          className="brilho px-4 py-2 rounded-full border-2 border-destaqueAcao text-destaqueAcao font-semibold hover:bg-destaqueAcao hover:text-textoEscuro transition"
        >
          Login
        </button>
        <button
          onClick={() => onNavigate("register")}
          className="brilho px-4 py-2 rounded-full bg-alerta text-textoEscuro font-semibold hover:bg-[#ffedcb] transition"
        >
          Cadastro
        </button>
      </div>
    </nav>
  );
}
