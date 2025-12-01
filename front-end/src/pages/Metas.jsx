import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";
import { chatgptService } from "../services/api";
import { metaService } from "../services/api";

export default function Metas() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || "Usuário";

  const [novaMeta, setNovaMeta] = useState("");
  const [metas, setMetas] = useState([]);

  // 🌟 Novo: objetivo para IA
  const [objetivo, setObjetivo] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    if (user?.id) {
      getMetas();
    }
  }, [isAuthenticated, navigate, user?.id]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
	
  const adicionarMeta = async () => {
    const texto = novaMeta.trim();
    if (!texto || !user?.id) return;

    try {
      const meta = await metaService.create(user.id, texto); // Salva no backend
      
      // Recarrega as metas para garantir que está sincronizado
      await getMetas();
      setNovaMeta("");
    } catch (error) {
      console.error("Erro ao adicionar meta:", error);
      alert("Erro ao adicionar meta. Tente novamente.");
    }
  };

  const toggleConcluida = async (id) => {
    try {
      // Busca a meta atual para verificar o status
      const meta = metas.find((m) => m.id === id);
      if (!meta) return;

      // Se está concluída, marca como pendente, senão marca como concluída
      if (meta.concluida) {
        // Se quiser implementar desmarcar como concluída, precisaria de um endpoint PUT
        // Por enquanto, apenas atualiza localmente
        setMetas((prev) =>
          prev.map((m) => (m.id === id ? { ...m, concluida: false } : m))
        );
      } else {
        // Marca como concluída no backend
        await metaService.markAsComplete(id);
        // Recarrega as metas
        await getMetas();
      }
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
      alert("Erro ao atualizar meta. Tente novamente.");
    }
  };

  const removerMeta = async (id) => {
    try {
      await deletarMeta(id); // Deleta do backend
      // Recarrega as metas para garantir que está sincronizado
      await getMetas();
    } catch (error) {
      console.error("Erro ao remover meta:", error);
      alert("Erro ao remover meta. Tente novamente.");
    }
  };

  // 🌟 Função nova: gerar metas com IA
  const gerarMetasIA = async () => {
    if (!objetivo.trim()) {
      alert("Digite o objetivo primeiro!");
      return;
    }

    try {
      // 1️⃣ Envia objetivo para IA
      const response = await chatgptService.generateMetas(objetivo.trim());
      const metasGeradas = response.meta; // JSON que a IA retorna
      // console.log("Metas geradas pela IA:", metasGeradas);
      // 2️⃣ Envia metas para o createMany no backend
      const novasMetas = await metaService.createMany(user?.id, metasGeradas);

      alert("Metas geradas pela IA e salvas com sucesso!");

      // Recarrega as metas para garantir que está sincronizado
      await getMetas();

      setObjetivo("");
    } catch (error) {
      console.error("Erro ao gerar metas com IA:", error);
      alert("Erro ao gerar metas com IA.");
    }
  };

  const deletarMeta = async (metaId) => {
      await metaService.delete(metaId)
  }

  const getMetas = async () => {
    try {
      if (!user?.id) return;
      
      // Sempre busca as metas do usuário logado
      const response = await metaService.getAll(user.id);
      
      // Filtra novamente no frontend para garantir que são apenas do usuário logado
      const userIdNum = Number(user.id);
      const metasFiltradas = response
        .filter((el) => Number(el.usuario_id) === userIdNum)
        .map((el) => ({
          id: el.id,
          texto: el.descricao,
          concluida: el.status === "concluida" || el.status === "concluída",
        }));

      // Substitui completamente o array ao invés de adicionar
      setMetas(metasFiltradas);
      console.log("Metas do backend:", response);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    }
  };

  return (
    <div className="min-h-screen bg-fundoPrimario pt-24 pb-20">
      <NavbarDashboard userName={userName} onLogout={handleLogout} />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-textoEscuro mb-4">
            🎯 Checklist de Metas
          </h1>

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
            <label className="block text-textoEscuro font-medium mb-2">
              Digite sua meta
            </label>
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
            <h2 className="text-2xl font-bold text-textoEscuro mb-4">
              Minhas Metas
            </h2>

            {metas.length === 0 ? (
              <p className="text-textoEscuro/60">
                Nenhuma meta ainda. Adicione uma acima.
              </p>
            ) : (
              <ul className="space-y-3">
                {metas.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between p-3 bg-fundoSecundario rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={m.concluida}
                        onChange={() => toggleConcluida(m.id)}
                        className="w-5 h-5 rounded"
                      />
                      <span
                        className={
                          m.concluida
                            ? "line-through text-textoEscuro/60"
                            : "text-textoEscuro font-medium"
                        }
                      >
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
