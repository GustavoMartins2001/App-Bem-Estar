import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";
import { supportService } from "../services/api";

export default function SupportResources() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const userName = user?.name || "Usuário";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recursos, setRecursos] = useState([]);

    const carregarDados = useCallback(async () => {
        try {
          setLoading(true);
          setError(null);
    
          const dados = await supportService.getRecursosApoio();
          const recursosArray = Array.isArray(dados) ? dados : [];
          
          // Se não houver recursos no banco, usar dados mockados
          if (recursosArray.length === 0) {
            setRecursos([
              {
                id: 1,
                nome: "Vittude",
                link: "https://www.vittude.com",
                tipo: "apoio",
                descricao: "Encontre profissionais online e agende sua consulta com praticidade!",
              },
              {
                id: 2,
                nome: "CVV - Centro de Valorização da Vida",
                link: "https://www.cvv.org.br",
                tipo: "emergencia",
              },
              {
                id: 3,
                nome: "Pode Falar",
                link: "https://www.podefalar.org.br",
                tipo: "apoio",
                descricao: "Canal de ajuda em saúde mental para crianças e adolescentes.",
              },
              {
                id: 4,
                nome: "ABP - Associação Brasileira de Psiquiatria",
                link: "https://www.abp.org.br",
                tipo: "informativo",
                descricao: "Informações e recursos sobre saúde mental e psiquiatria.",
              },
            ]);
          } else {
            setRecursos(recursosArray);
          }
        } catch (err) {
          console.error("Erro ao carregar recursos de apoio:", err);
          setError("Erro ao carregar recursos. Tente novamente.");
          // Em caso de erro, usar dados mockados como fallback
          setRecursos([
            {
              id: 1,
              nome: "Vittude",
              link: "https://www.vittude.com",
              tipo: "apoio",
              descricao: "Encontre profissionais online e agende sua consulta com praticidade!",
            },
            {
              id: 2,
              nome: "CVV - Centro de Valorização da Vida",
              link: "https://www.cvv.org.br",
              tipo: "emergencia",
            },
            {
              id: 3,
              nome: "Pode Falar",
              link: "https://www.podefalar.org.br",
              tipo: "apoio",
              descricao: "Canal de ajuda em saúde mental para crianças e adolescentes.",
            },
            {
              id: 4,
              nome: "ABP - Associação Brasileira de Psiquiatria",
              link: "https://www.abp.org.br",
              tipo: "informativo",
              descricao: "Informações e recursos sobre saúde mental e psiquiatria.",
            },
          ]);
        } finally {
          setLoading(false);
        }
      }, []);

      useEffect(() => {
        if (!isAuthenticated()) {
          navigate("/login");
          return;
        }
    
        carregarDados();
      }, [isAuthenticated, navigate, carregarDados]);
    
      const handleLogout = () => {
        logout();
        navigate("/login");
      };
    
      const getDescricao = (recurso) => {
        if (recurso.descricao) return recurso.descricao;
        
        switch (recurso.tipo) {
          case "emergencia":
            return "Atendimento 24 horas para situações de emergência.";
          case "apoio":
            return "Encontre profissionais online e agende sua consulta com praticidade!";
          case "informativo":
            return "Acesse informações e conteúdos sobre saúde mental.";
          default:
            return "Recurso de apoio para seu bem-estar mental.";
        }
      };
    
      const handleAcessarSite = (link) => {
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        }
      };
    
      if (loading) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-fundoPrimario via-fundoSecundario to-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-xl text-textoEscuro">Carregando recursos de apoio...</p>
            </div>
          </div>
        );
      }
      
      return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-fundoPrimario via-fundoSecundario to-white">
          <NavbarDashboard userName={userName} onLogout={handleLogout} />
    
          <div className="container mx-auto px-4 pt-20 pb-4 h-full overflow-y-auto">
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
    
            <div className="mb-4">
              <h1 className="text-4xl font-extrabold text-textoEscuro mb-2">
                Precisa de apoio?
              </h1>
              <p className="text-lg text-textoEscuro/70">
                Encontre recursos e profissionais para cuidar da sua saúde mental
              </p>
            </div>
    
            {recursos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recursos.map((recurso, index) => (
                  <div
                    key={recurso.id || index}
                    className="bg-alerta/30 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"

                  >
                    {/* Ícone */}
                    <div className="flex justify-center mb-2">
                      <div className="p-3 bg-alerta/50 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🤝</span>
                      </div>
                    </div>
    
                    {/* Título */}
                    <h3 className="text-xl font-bold text-textoEscuro text-center mb-2">
                      {recurso.nome}
                    </h3>
    
                    {/* Descrição */}
                    <p className="text-textoEscuro/70 text-center mb-4 text-sm min-h-[2.5rem]">
                      {getDescricao(recurso)}
                    </p>
    
                    {/* Botão */}
                    {recurso.link && (
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleAcessarSite(recurso.link)}
                          className="bg-alerta hover:bg-alerta/80 text-textoEscuro font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-sm"
                        >
                          Acessar site
                        </button>
                      </div>
                    )}
    
                    {/* Telefone se disponível */}
                    {recurso.telefone && (
                      <div className="mt-4 text-center">
                        <a
                          href={`tel:${recurso.telefone}`}
                          className="text-textoEscuro/70 hover:text-textoEscuro text-sm"
                        >
                          📞 {recurso.telefone}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <p className="text-textoEscuro/60 text-lg">
                  Nenhum recurso de apoio disponível no momento.
                </p>
              </div>
            )}
          </div>
        </div>
      );

}