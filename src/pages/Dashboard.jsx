import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName] = useState("Leila");

  const stats = {
    mediaHumor: 4.2,
    mediaEnergia: 3.8,
    mediaAnsiedade: 2.5,
    totalAvaliacoes: 15,
  };

  const recentAvaliacoes = [
    {
      id: 1,
      data: "2025-10-15",
      humor: 5,
      energia: 4,
      ansiedade: 2,
      anotacoes: "Dia produtivo e tranquilo",
    },
    {
      id: 2,
      data: "2025-10-14",
      humor: 4,
      energia: 4,
      ansiedade: 3,
      anotacoes: "Bem disposta",
    },
    {
      id: 3,
      data: "2025-10-13",
      humor: 3,
      energia: 3,
      ansiedade: 3,
      anotacoes: "Dia normal",
    },
    {
      id: 4,
      data: "2025-10-12",
      humor: 5,
      energia: 5,
      ansiedade: 1,
      anotacoes: "Excelente dia!",
    },
    {
      id: 5,
      data: "2025-10-11",
      humor: 4,
      energia: 3,
      ansiedade: 2,
      anotacoes: "Consegui descansar",
    },
  ];

  const metasPendentes = [
    {
      id: 1,
      descricao: "Meditar 10 minutos por dia",
      dataDesejada: "2025-12-31",
    },
    {
      id: 2,
      descricao: "Fazer caminhada 3x por semana",
      dataDesejada: "2025-11-30",
    },
    { id: 3, descricao: "Ler um livro por mês", dataDesejada: "2025-10-31" },
    {
      id: 4,
      descricao: "Dormir 8 horas por noite",
      dataDesejada: "2025-12-31",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const getHumorEmoji = (valor) => {
    const emojis = ["😢", "😕", "😐", "😊", "😄"];
    return emojis[valor - 1] || "😐";
  };

  const getEnergiaColor = (valor) => {
    const colors = ["#ef4444", "#f59e0b", "#eab308", "#84cc16", "#22c55e"];
    return colors[valor - 1] || "#6b7280";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fundoPrimario via-fundoSecundario to-white">
      <NavbarDashboard userName={userName} onLogout={handleLogout} />

      <div className="container mx-auto px-4 pt-24 pb-12">
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
                {getHumorEmoji(Math.round(stats.mediaHumor))}
              </span>
            </div>
            <h3 className="text-sm font-medium text-textoEscuro/60 mb-1">
              Humor Médio
            </h3>
            <p className="text-3xl font-bold text-textoEscuro">
              {stats.mediaHumor.toFixed(1)}/5
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
                  backgroundColor: getEnergiaColor(
                    Math.round(stats.mediaEnergia)
                  ),
                }}
              ></div>
            </div>
            <h3 className="text-sm font-medium text-textoEscuro/60 mb-1">
              Energia Média
            </h3>
            <p className="text-3xl font-bold text-textoEscuro">
              {stats.mediaEnergia.toFixed(1)}/5
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
              {stats.mediaAnsiedade.toFixed(1)}/5
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
          <button className="brilho bg-destaqueAcao hover:bg-destaqueAcao/80 text-textoEscuro font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
            <span className="text-2xl">➕</span>
            Nova Autoavaliação
          </button>
          <button className="brilho bg-alerta hover:bg-alerta/80 text-textoEscuro font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3">
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

            <div className="space-y-3">
              {recentAvaliacoes.map((avaliacao) => (
                <div
                  key={avaliacao.id}
                  className="p-4 bg-fundoSecundario rounded-xl hover:bg-fundoSecundario/80 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-textoEscuro">
                      {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-2xl">
                      {getHumorEmoji(avaliacao.humor)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-textoEscuro/70">
                      ⚡ Energia: {avaliacao.energia}/5
                    </span>
                    <span className="text-textoEscuro/70">
                      🧠 Ansiedade: {avaliacao.ansiedade}/5
                    </span>
                  </div>
                  {avaliacao.anotacoes && (
                    <p className="text-sm text-textoEscuro/60 mt-2 italic">
                      "{avaliacao.anotacoes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-textoEscuro mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Metas Pendentes
            </h2>

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
                    <button className="ml-2 px-3 py-1 bg-destaqueAcao hover:bg-destaqueAcao/80 text-textoEscuro text-sm font-semibold rounded-full transition">
                      ✓ Concluir
                    </button>
                  </div>
                  {meta.dataDesejada && (
                    <span className="text-sm text-textoEscuro/60">
                      📅 Meta:{" "}
                      {new Date(meta.dataDesejada).toLocaleDateString("pt-BR")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
