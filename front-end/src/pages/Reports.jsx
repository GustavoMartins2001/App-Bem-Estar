import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";
import { dashboardService } from "../services/api";

export default function Reports() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const userName = user?.name || "Usuário";
    const userId = user?.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatorioSemanal, setRelatorioSemanal] = useState(null);
    const [relatorioMensal, setRelatorioMensal] = useState(null);
    const [humorSemanal, setHumorSemanal] = useState([]);

    const carregarDados = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [semanal, mensal, avaliacoes] = await Promise.all([
                dashboardService.getRelatorioSemanal(userId).catch(() => null),
                dashboardService.getRelatorioMensal(userId).catch(() => null),
                dashboardService.getAutoavaliacoes(userId).catch(() => []),
              ]);
            
            setRelatorioSemanal(semanal);
            setRelatorioMensal(mensal);

            if (Array.isArray(avaliacoes) && avaliacoes.length > 0) {
                const hoje = new Date();
                const semanaPassada = new Date();
                semanaPassada.setDate(hoje.getDate() - 7);
                
                const avaliacoesSemana = avaliacoes.filter((a) => {
                    const dataAval = new Date(a.data || a.createdAt || a.created_at);
                    return dataAval >= semanaPassada && dataAval <= hoje;
                  });
                
                const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
                const humorPorDia = Array(7).fill(null);

                avaliacoesSemana.forEach((avaliacao) => {
                    const data = new Date(avaliacao.data || avaliacao.createdAt || avaliacao.created_at);
                    const diaSemana = data.getDay(); // 0 = Domingo, 6 = Sábado
                    const humor = avaliacao.avaliacaoHumor || avaliacao.humor || 0;
                
                if (humorPorDia[diaSemana] !== null) {
                    humorPorDia[diaSemana] = (humorPorDia[diaSemana] + humor) / 2;
                    } else {
                    humorPorDia[diaSemana] = humor;
                    }
                });

                setHumorSemanal(humorPorDia);
            } else {
                setHumorSemanal(Array(7).fill(null));
            }
        } catch (err) {
            console.error("Erro ao carregar relatórios:", err);
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

    const calcularMelhoria = () => {
        if (!relatorioSemanal || !relatorioMensal) return null;
        
        const mediaSemanal = parseFloat(relatorioSemanal.media_humor || 0);
        const mediaMensal = parseFloat(relatorioMensal.media_humor || 0);
        
        // Evitar divisão por zero
        if (mediaMensal <= 0) return null;
        if (mediaSemanal <= 0) return null;
        
        const diferenca = ((mediaSemanal - mediaMensal) / mediaMensal) * 100;
        return Math.round(diferenca);
    };

    // Renderizar gráfico de linha
  const renderizarGrafico = () => {
    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const valores = humorSemanal.map((v) => (v !== null ? v : 0));
    
    // Verificar se há valores válidos
    const valoresValidos = valores.filter(v => v > 0);
    if (valoresValidos.length === 0) {
      return (
        <p className="text-textoEscuro/60 text-center py-8">
          Não há dados suficientes para exibir o gráfico.
        </p>
      );
    }
    
    const maxValor = Math.max(...valores, 5);
    const minValor = valoresValidos.length > 0 
      ? Math.min(...valoresValidos) 
      : 0;
    const range = maxValor - minValor || 5;
    const altura = 200;
    const largura = 600;
    const padding = 40;

    // Calcular pontos do gráfico
    const pontos = valores.map((valor, index) => {
      const x = padding + (index * (largura - 2 * padding)) / 6;
      const y = altura - padding - ((valor - minValor) / range) * (altura - 2 * padding);
      return { x, y, valor };
    });

    // Criar path para a linha (apenas pontos válidos)
    const pontosValidos = pontos.filter((p, i) => valores[i] > 0);
    const pathData = pontosValidos.length > 0
      ? pontosValidos
          .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
          .join(' ')
      : '';

    return (
      <div className="relative">
        <svg width={largura} height={altura} className="w-full h-auto">
          {/* Linha de fundo */}
          <line
            x1={padding}
            y1={altura - padding}
            x2={largura - padding}
            y2={altura - padding}
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          
          {/* Linha do gráfico */}
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          
          {/* Pontos */}
          {pontos.map((p, i) => (
            valores[i] > 0 && (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#a855f7"
                className="hover:r-7 transition-all"
              />
            )
          ))}
        </svg>
        
        {/* Labels dos dias */}
        <div className="flex justify-between mt-4 px-10">
          {diasSemana.map((dia, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-fundoPrimario/30 flex items-center justify-center text-sm font-semibold text-textoEscuro"
            >
              {dia}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-fundoPrimario via-fundoSecundario to-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-xl text-textoEscuro">Carregando relatórios...</p>
          </div>
        </div>
      );
    }
  
    const melhoria = calcularMelhoria();
  
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
              Relatórios 
            </h1>
            <p className="text-lg text-textoEscuro/70">
              Acompanhe sua evolução e compare seus resultados
            </p>
          </div>
  
          {/* Tabela Comparativa */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-textoEscuro mb-6">
              Comparativo de seus resultados
            </h2>
            
            {relatorioSemanal && relatorioMensal ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-fundoSecundario">
                      <th className="text-left py-4 px-4 text-textoEscuro font-semibold"></th>
                      <th className="text-center py-4 px-4 text-textoEscuro font-semibold">Semana</th>
                      <th className="text-center py-4 px-4 text-textoEscuro font-semibold">Mês</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-fundoSecundario/30">
                      <td className="py-4 px-4 text-textoEscuro font-medium">Humor</td>
                      <td className="py-4 px-4 text-center text-textoEscuro font-bold">
                        {parseFloat(relatorioSemanal.media_humor || 0).toFixed(1)}
                      </td>
                      <td className="py-4 px-4 text-center text-textoEscuro font-bold">
                        {parseFloat(relatorioMensal.media_humor || 0).toFixed(1)}
                      </td>
                    </tr>
                    <tr className="border-b border-fundoSecundario/30">
                      <td className="py-4 px-4 text-textoEscuro font-medium">Energia</td>
                      <td className="py-4 px-4 text-center text-textoEscuro font-bold">
                        {parseFloat(relatorioSemanal.media_energia || 0).toFixed(1)}
                      </td>
                      <td className="py-4 px-4 text-center text-textoEscuro font-bold">
                        {parseFloat(relatorioMensal.media_energia || 0).toFixed(1)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-textoEscuro font-medium">Ansiedade</td>
                      <td className="py-4 px-4 text-center text-textoEscuro font-bold">
                        {parseFloat(relatorioSemanal.media_ansiedade || 0).toFixed(1)}
                      </td>
                      <td className="py-4 px-4 text-center text-textoEscuro font-bold">
                        {parseFloat(relatorioMensal.media_ansiedade || 0).toFixed(1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-textoEscuro/60 text-center py-8">
                Não há dados suficientes para comparar. Registre mais avaliações!
              </p>
            )}
          </div>
  
          {/* Gráfico de Humor Semanal */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-textoEscuro mb-6">
              Seu humor semanal
            </h2>
            
            {humorSemanal.some(v => v !== null) ? (
              <div>
                {renderizarGrafico()}
                {melhoria !== null && (
                  <p className="text-center mt-6 text-textoEscuro/70 text-lg">
                    {melhoria > 0 ? (
                      <span className="text-green-600 font-semibold">
                        Melhorou {Math.abs(melhoria)}% desde a semana passada 📈
                      </span>
                    ) : melhoria < 0 ? (
                      <span className="text-orange-600 font-semibold">
                        Diminuiu {Math.abs(melhoria)}% desde a semana passada 📉
                      </span>
                    ) : (
                      <span className="text-blue-600 font-semibold">
                        Manteve-se estável desde a semana passada ➡️
                      </span>
                    )}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-textoEscuro/60 text-center py-8">
                Não há dados suficientes para exibir o gráfico. Registre avaliações diárias!
              </p>
            )}
          </div>
        </div>
      </div>
    );
}