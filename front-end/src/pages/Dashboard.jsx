import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";
import { dashboardService, metaService } from "../services/api";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || "Usuário";
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    mediaHumor: 0,
    mediaEnergia: 0,
    mediaAnsiedade: 0,
    totalAvaliacoes: 0,
  });
  const [recentAvaliacoes, setRecentAvaliacoes] = useState([]);
  const [metasPendentes, setMetasPendentes] = useState([]);

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [avaliacoes, metas, relatorioSemanal] = await Promise.all([
        dashboardService.getAutoavaliacoes(userId).catch(() => []),
        dashboardService.getMetas(userId).catch(() => []),
        dashboardService.getRelatorioSemanal(userId).catch(() => null),
      ]); 

      if(Array.isArray(avaliacoes) && avaliacoes.length > 0){
        const avaliacoesOrdenadas = avaliacoes
        .sort((a, b) => {
          const dataA = new Date(a.data || a.createdAt || a.created_at);
          const dataB = new Date(b.data || b.createdAt || b.created_at);
          return dataB - dataA;
        })
        .slice(0, 5);

        setRecentAvaliacoes(avaliacoesOrdenadas);

        const total = avaliacoes.length;
        const soma = avaliacoes.reduce(
          (acc, a) => ({
            humor: acc.humor + (a.avaliacaoHumor || a.humor || 0),
            energia: acc.energia + (a.avaliacaoEnergia || a.energia || 0),
            ansiedade: acc.ansiedade + (a.avaliacaoAnsiedade || a.ansiedade || 0),
          }),
          { humor: 0, energia: 0, ansiedade: 0 }
        );

        setStats({
          mediaHumor: soma.humor / total,
          mediaEnergia: soma.energia / total,
          mediaAnsiedade: soma.ansiedade / total,
          totalAvaliacoes: total,
        });
      } else {
        setRecentAvaliacoes([]);
        setStats({
          mediaHumor: 0,
          mediaEnergia: 0,
          mediaAnsiedade: 0,
          totalAvaliacoes: 0,
        });
      }

      if (Array.isArray(metas)) {
        // As metas já vêm filtradas por usuário do backend
        const metasPendentesFiltradas = metas
          .filter(
            (meta) =>
              meta.status !== "concluida" &&
              meta.status !== "concluída"
          )
          .sort((a, b) => {
            const dataA = new Date(a.dataConclusaoDesejada || a.dataConcDesejada || 0);
            const dataB = new Date(b.dataConclusaoDesejada || b.dataConcDesejada || 0);
            return dataA - dataB;
          });

        setMetasPendentes(metasPendentesFiltradas);
      } else {
        setMetasPendentes([]);
      }

      if (relatorioSemanal && relatorioSemanal.media_humor) {
        setStats((prev) => ({
          ...prev,
          mediaHumor: parseFloat(relatorioSemanal.media_humor) || prev.mediaHumor,
          mediaEnergia: parseFloat(relatorioSemanal.media_energia) || prev.mediaEnergia,
          mediaAnsiedade: parseFloat(relatorioSemanal.media_ansiedade) || prev.mediaAnsiedade,
        }));
      }
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if(userId){
      carregarDados();
    }
  }, [isAuthenticated, navigate, userId, carregarDados]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const concluirMeta = async (metaId) => {
    try {
      await metaService.markAsComplete(metaId);
      await carregarDados();
    } catch (error) {
      console.error("Erro ao concluir meta:", error);
      setError("Erro ao concluir meta. Tente novamente.");
    }
  };

  const getHumorEmoji = (valor) => {
    const emojis = ["😢", "😕", "😐", "😊", "😄"];
    const index = Math.round(valor) - 1;
    return emojis[index] || emojis[2] || "😐";
  };

  const getEnergiaColor = (valor) => {
    const colors = ["#ef4444", "#f59e0b", "#eab308", "#84cc16", "#22c55e"];
    const index = Math.round(valor) - 1;
    return colors[index] || "#6b7280";
  };

  const formatarData = (data) => {
    if (!data) return "";
    try {
      return new Date(data).toLocaleDateString("pt-BR");
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fundoPrimario via-fundoSecundario to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-xl text-textoEscuro">Carregando dados...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-fundoPrimario via-fundoSecundario to-white">
      <NavbarDashboard userName={userName} onLogout={handleLogout} />

      <div className="container mx-auto px-4 pt-24 pb-12">
      {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-textoEscuro mb-2">
            Olá, {userName}! 👋
          </h1>
          <p className="text-lg text-textoEscuro/70">
            Como você está se sentindo hoje?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-destaqueAcao/20 rounded-xl">
                <span className="text-2xl">❤️</span>
              </div>
              <span className="text-3xl">
                {getHumorEmoji(stats.mediaHumor)}
              </span>
            </div>
            <h3 className="text-sm font-medium text-textoEscuro/60 mb-1">
              Humor Médio
            </h3>
            <p className="text-3xl font-bold text-textoEscuro">
            {stats.mediaHumor > 0 ? stats.mediaHumor.toFixed(1) : "0"}/5
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-alerta/20 rounded-xl">
                <span className="text-2xl">⚡</span>
              </div>
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  backgroundColor: getEnergiaColor(stats.mediaEnergia),
                }}
              ></div>
            </div>
            <h3 className="text-sm font-medium text-textoEscuro/60 mb-1">
              Energia Média
            </h3>
            <p className="text-3xl font-bold text-textoEscuro">
              {stats.mediaEnergia > 0 ? stats.mediaEnergia.toFixed(1) : "0"}/5
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-graficos/20 rounded-xl">
                <span className="text-2xl">🧠</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-textoEscuro/60 mb-1">
              Ansiedade Média
            </h3>
            <p className="text-3xl font-bold text-textoEscuro">
              {stats.mediaAnsiedade > 0 ? stats.mediaAnsiedade.toFixed(1) : "0"}/5
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-fundoPrimario/40 rounded-xl">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-textoEscuro/60 mb-1">
              Avaliações
            </h3>
            <p className="text-3xl font-bold text-textoEscuro">
              {stats.totalAvaliacoes}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button 
          onClick={() => navigate("/self-evaluation")}
          className="brilho bg-destaqueAcao hover:bg-destaqueAcao/80 text-textoEscuro font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
            <span className="text-2xl">➕</span>
            Nova Autoavaliação
          </button>
          <button 
          onClick={() => navigate("/meta")}
          className="brilho bg-alerta hover:bg-alerta/80 text-textoEscuro font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
            <span className="text-2xl">🎯</span>
            Gerenciar Metas
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-textoEscuro mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Avaliações Recentes
            </h2>

            {recentAvaliacoes.length > 0 ? (
              <div className="space-y-3">
                {recentAvaliacoes.map((avaliacao) => {
                  const humor = avaliacao.avaliacaoHumor || avaliacao.humor || 0;
                  const energia = avaliacao.avaliacaoEnergia || avaliacao.energia || 0;
                  const ansiedade = avaliacao.avaliacaoAnsiedade || avaliacao.ansiedade || 0;
                  const data = avaliacao.data || avaliacao.createdAt || avaliacao.created_at;
                  const anotacoes = avaliacao.anotacoes || "";

                  return (
                <div
                  key={avaliacao.id}
                  className="p-4 bg-fundoSecundario rounded-xl hover:bg-fundoSecundario/80 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-textoEscuro">
                      {formatarData(data)}
                    </span>
                    <span className="text-2xl">
                      {getHumorEmoji(humor)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-textoEscuro/70">
                      ⚡ Energia: {energia}/5
                    </span>
                    <span className="text-textoEscuro/70">
                      🧠 Ansiedade: {ansiedade}/5
                    </span>
                  </div>
                  {avaliacao.anotacoes && (
                    <p className="text-sm text-textoEscuro/60 mt-2 italic">
                      "{anotacoes}"
                    </p>
                  )}
                </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-textoEscuro/60 text-center py-8">
                Nenhuma avaliação registrada ainda.
              </p>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-textoEscuro mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Metas Pendentes
            </h2>

            {metasPendentes.length > 0 ? (
              <div className="space-y-3">
                {metasPendentes.map((meta) => (
                <div
                  key={meta.id}
                  className="p-4 bg-fundoPrimario/30 rounded-xl hover:bg-fundoPrimario/40 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-textoEscuro flex-1">
                      {meta.descricao}
                    </p>
                    <button 
                      onClick={() => concluirMeta(meta.id)}
                      className="ml-2 px-3 py-1 bg-destaqueAcao hover:bg-destaqueAcao/80 text-textoEscuro text-sm font-semibold rounded-full transition"
                    >
                      ✓ Concluir
                    </button>
                  </div>
                  {(meta.dataConclusaoDesejada || meta.dataConcDesejada) && (
                    <span className="text-sm text-textoEscuro/60">
                    📅 Meta: {formatarData(meta.dataConclusaoDesejada || meta.dataConcDesejada)}
                  </span>
                  )}
                </div>
                ))}
              </div>
            ) : (
              <p className="text-textoEscuro/60 text-center py-8"> Nenhuma meta pendente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
