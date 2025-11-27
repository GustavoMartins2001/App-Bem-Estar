import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function Metas() {
	const { user, logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const userName = user?.name || "Usuário";

	const [novaMeta, setNovaMeta] = useState("");
	const [metas, setMetas] = useState([]);

	// 🌟 Novo: objetivo para IA
	const [objetivo, setObjetivo] = useState("");

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

	// 🌟 Função nova: gerar metas com IA
	const gerarMetasIA = async () => {
		if (!objetivo.trim()) {
			alert("Digite o objetivo primeiro!");
			return;
		}

		try {
			// 1️⃣ Envia objetivo para IA
			const response = await api.post("/chatgpt", {
				userInput: objetivo
			});

			const metasGeradas = response.data; // JSON que a IA retorna

			// 2️⃣ Envia metas para o createMany no backend
			await api.post("/meta/createMany", {
				usuario_id: user?.id,
				metas: metasGeradas
			});

			alert("Metas geradas pela IA e salvas com sucesso!");

			// 3️⃣ Opcional: atualizar metas locais
			const convertidas = metasGeradas.map(meta => ({
				id: Date.now() + Math.random(),
				texto: meta.titulo,
				concluida: false,
			}));

			setMetas(prev => [...convertidas, ...prev]);

			setObjetivo("");

		} catch (error) {
			console.error("Erro ao gerar metas com IA:", error);
			alert("Erro ao gerar metas com IA.");
		}
	};

	return (
		<div className="min-h-screen bg-fundoPrimario pt-24 pb-20">
			<NavbarDashboard userName={userName} onLogout={handleLogout} />

			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto">

					<h1 className="text-3xl font-extrabold text-textoEscuro mb-4">🎯 Checklist de Metas</h1>

					{/* 🌟 BLOCO NOVO: objetivo para IA */}
					<div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
						<label className="block text-textoEscuro font-medium mb-2">
							Descreva seu objetivo para gerar metas automaticamente
						</label>

						<textarea
							value={objetivo}
							onChange={(e) => setObjetivo(e.target.value)}
							placeholder="Ex: Quero aprender violão em 6 meses"
							className="w-full p-3 border-2 border-gray-200 rounded-xl mb-3"
						/>

						<button
							onClick={gerarMetasIA}
							className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-5 rounded-xl shadow-md transition"
						>
							🤖 Gerar metas com IA
						</button>
					</div>

					{/* FORMULÁRIO NORMAL */}
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
								Adicionar
							</button>
						</div>
					</div>

					{/* LISTA DE METAS */}
					<div className="bg-white rounded-2xl p-6 shadow-lg">
						<h2 className="text-2xl font-bold text-textoEscuro mb-4">Minhas Metas</h2>

						{metas.length === 0 ? (
							<p className="text-textoEscuro/60">Nenhuma meta ainda. Adicione uma acima.</p>
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
										<button
											onClick={() => removerMeta(m.id)}
											className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full"
										>
											Remover
										</button>
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
