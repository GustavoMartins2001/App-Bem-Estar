import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";

export default function Metas() {
	const { user, logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const userName = user?.name || "Usuário";

	const [novaMeta, setNovaMeta] = useState("");
	const [metas, setMetas] = useState([]);

	const STORAGE_KEY = "metas_checklist";

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login");
			return;
		}

		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setMetas(JSON.parse(raw));
		} catch (e) {
			console.error("Erro ao carregar metas:", e);
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
		} catch (e) {
			console.error("Erro ao salvar metas:", e);
		}
	}, [metas]);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const adicionarMeta = () => {
		const texto = (novaMeta || "").trim();
		if (!texto) return;

		const nova = {
			id: Date.now(),
			texto,
			concluida: false,
		};

		setMetas((prev) => [nova, ...prev]);
		setNovaMeta("");
	};

	const toggleConcluida = (id) => {
		setMetas((prev) => prev.map(m => m.id === id ? { ...m, concluida: !m.concluida } : m));
	};

	const removerMeta = (id) => {
		setMetas((prev) => prev.filter(m => m.id !== id));
	};

	return (
		<div className="min-h-screen bg-fundoPrimario pt-24 pb-20">
			<NavbarDashboard userName={userName} onLogout={handleLogout} />

			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-3xl font-extrabold text-textoEscuro mb-4">🎯 Checklist de Metas</h1>

					<div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
						<label className="block text-textoEscuro font-medium mb-2">Digite sua meta</label>
						<div className="flex gap-3">
							<input
								value={novaMeta}
								onChange={(e) => setNovaMeta(e.target.value)}
								placeholder="Ex: Fazer caminhada de 30 minutos"
								className="flex-1 p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-destaqueAcao transition"
							/>
							<button
								onClick={adicionarMeta}
								className="brilho bg-destaqueAcao hover:bg-destaqueAcao/80 text-textoEscuro font-bold py-3 px-5 rounded-2xl shadow-lg transition"
							>
								Completar
							</button>
						</div>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<h2 className="text-2xl font-bold text-textoEscuro mb-4">Minhas Metas</h2>

						{metas.length === 0 ? (
							<p className="text-textoEscuro/60">Nenhuma meta ainda. Adicione uma no campo acima.</p>
						) : (
							<ul className="space-y-3">
								{metas.map((m) => (
									<li key={m.id} className="flex items-center justify-between p-3 bg-fundoSecundario rounded-xl">
										<div className="flex items-center gap-3">
											<input
												type="checkbox"
												checked={m.concluida}
												onChange={() => toggleConcluida(m.id)}
												className="w-5 h-5 rounded"
											/>
											<span className={m.concluida ? "line-through text-textoEscuro/60" : "text-textoEscuro font-medium"}>
												{m.texto}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() => removerMeta(m.id)}
												className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full"
												aria-label={`Remover meta ${m.texto}`}
											>
												Remover
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

