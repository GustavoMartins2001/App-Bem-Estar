import Navbar from "./components/Navbar";

export default function login() {
    return(
    
        <div className="flex flex-col items-center justify-center min-h-screen relative">
        <Navbar />

            <header className="text-center mb-16">
                <h1 className="text-7xl font-extrabold mb-2 text-textoEscuro">App Bem-Estar</h1>
                <h3 className="text-2xl font-bold text-textoEscuro">Plataforma de Monitoramento e Gestão de Saúde Mental</h3>
            </header>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-3xl">
            <div className="text-center md:text-left md:w-1/2">
                <p className="text-3xl font-bold mb-4 text-textoEscuro">Pronto para cuidar de você?</p>
                <p className="text-3xl font-bold text-textoEscuro">Entre e comece a monitorar seu humor!</p>
            </div>
    
            <div className="bg-fundoSecundario shadow-lg rounded-3xl p-10 md:w-1/2 w-full">
                <form className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none"
                    />
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Senha"
                            className="border-2 border-textoEscuro rounded-full px-5 py-3 w-full focus:outline-none"
                        />
                        <p className="text-1xl text-textoEscuro mt-1 text-center">
                            Esqueceu a senha? <span className="underline">Recupere aqui.</span>
                        </p>
                    </div>

                    <button className="brilho bg-destaqueAcao rounded-full py-2 text-textoEscuro font-semibold hover:bg-destaqueAcao/80 transition">
                        Entrar
                    </button>

                    <button className=" brilho bg-alerta rounded-full py-2 text-textoEscuro font-semibold hover:bg-alerta/80 transition">
                        Não possui conta? Clique aqui!
                    </button>
                </form>
                </div>
            </div>
        </div>
    )
}