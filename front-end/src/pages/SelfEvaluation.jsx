import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";
import { autoavaliacaoService } from '../services/api';

// padrão para os cards corrigido
const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-6">
    {children}
  </div>
);

// seleção de case
const LevelSelector = ({ label, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

// cases das cores dos niveis de humor
  const getColorClasses = (value) => {
    switch (value) {
      case 1: return 'bg-red-600 hover:bg-red-700';
      case 2: return 'bg-orange-400 hover:bg-orange-500';
      case 3: return 'bg-yellow-400 hover:bg-yellow-500';
      case 4: return 'bg-green-400 hover:bg-green-500';
      case 5: return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-300 hover:bg-gray-400';
    }
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  // estilo dos botões de seleção
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-textoEscuro mb-3">{label} <span className="text-red-500">*</span></h3>
      <div className="flex justify-between space-x-2">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          const selectedClasses = isSelected ? getColorClasses(opt.value) : 'bg-gray-300 hover:bg-gray-400 opacity-90';
          
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              aria-label={`${label}: ${opt.value} - ${opt.label}`}
              className={`
                flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition duration-150 ease-in-out
                text-sm font-bold shadow-md
                ${selectedClasses}
                ${isSelected
                  ? 'text-white ring-4 ring-offset-2 ring-destaqueAcao scale-105 shadow-xl'
                  : 'text-gray-700'
                }
              `}
              style={{ minWidth: '50px', minHeight: '50px' }}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-extrabold text-lg transition duration-300
                  ${isSelected ? 'bg-white/30 text-white' : 'bg-gray-400/50 text-gray-700'}
                `}
              >
                {opt.value}
              </div>
              <span className={`text-xs mt-1 font-medium text-center ${isSelected ? 'text-white' : 'text-gray-700'}`}>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};


export default function SelfEvaluation() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const [avaliacaoHumor, setAvaliacaoHumor] = useState(null);
  const [avaliacaoEnergia, setAvaliacaoEnergia] = useState(null);
  const [avaliacaoAnsiedade, setAvaliacaoAnsiedade] = useState(null);
  const [anotacoes, setAnotacoes] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  // verificadores d login e logout
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async() => {
    if (avaliacaoHumor === null || avaliacaoEnergia === null || avaliacaoAnsiedade === null) {
        showToast('Por favor, preencha todos os campos obrigatórios (Humor, Energia e Ansiedade).', 'error');
        return;
    }

    if(!user || !user.id) {
      showToast('Usuário não foi identificado, tente o login novamente.', 'error');
      return;
    }

    setLoading(true);

    // salvando dados nas variaveis pro banco de dados
    try {
      const autoAvDados = {
        usuario_id: user.id,
        avaliacaoHumor,
        avaliacaoEnergia,
        avaliacaoAnsiedade,
        anotacoes
      };

      await autoavaliacaoService.criar(autoAvDados);

      // Para o loading antes de mostrar o toast
      setLoading(false);
      showToast('Sua avaliação do dia foi salva!');

      // Dá um pequeno tempo para o usuário ver o toast antes de navegar
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Erro ao salvar a avaliação:', error);
      setLoading(false);
      showToast('Houve um erro ao salvar a avaliação! Tente novamente.', 'error');
    }
  };

// opções dos humores e etc
  const humorOptions = [
    { value: 1, label: 'Péssimo' },
    { value: 2, label: 'Mal' },
    { value: 3, label: 'Indiferente' },
    { value: 4, label: 'Bem' },
    { value: 5, label: 'Excelente' },
  ];

  const energiaOptions = [
    { value: 1, label: 'Exausto' },
    { value: 2, label: 'Cansado' },
    { value: 3, label: 'Normal' },
    { value: 4, label: 'Disposto' },
    { value: 5, label: 'Enérgico' },
  ];

  const ansiedadeOptions = [
    { value: 1, label: 'Nenhum' },
    { value: 2, label: 'Instável' },
    { value: 3, label: 'Moderado' },
    { value: 4, label: 'Estável' },
    { value: 5, label: 'Totalmente' },
  ];

  if (!isAuthenticated()) return null;

  //conteúdo geral da página (navbar, utilização dos cards pré-definidos, anotacoes e parte para salvar)
  return (
    <div className="min-h-screen bg-fundoPrimario pt-24 pb-20 relative">
      {toast && (
        <div
          className={`fixed top-24 right-6 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-opacity
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      <NavbarDashboard userName={user?.name || "Usuário"} onLogout={handleLogout} />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-textoEscuro mb-8 text-center">
          Como você se sente hoje?
        </h1>

        <Card>
          <LevelSelector
            label="1. Como você se sentiu emocionalmente hoje?"
            options={humorOptions}
            defaultValue={avaliacaoHumor}
            onChange={setAvaliacaoHumor}
          />
        </Card>

        <Card>
          <LevelSelector
            label="2. Qual seu nível de energia e disposição física hoje?"
            options={energiaOptions}
            defaultValue={avaliacaoEnergia}
            onChange={setAvaliacaoEnergia}
          />
        </Card>

        <Card>
          <LevelSelector
            label="3. Quão no controle você se sentiu?"
            options={ansiedadeOptions}
            defaultValue={avaliacaoAnsiedade}
            onChange={setAvaliacaoAnsiedade}
          />
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-textoEscuro mb-3">4. O que mais marcou seu dia hoje? Conte sobre ele! (Opcional)</h3>
          <textarea
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            rows="4"
            placeholder="Ex: Tive uma reunião produtiva e consegui terminar aquele projeto desafiador."
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-destaqueAcao focus:ring-1 transition duration-150 resize-none outline-none"
          ></textarea>
        </Card>

        <div className="mt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`w-full brilho bg-destaqueAcao text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition duration-300 transform 
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-destaqueAcao/80 hover:scale-[1.01]'}
            `}
          >
            {loading ? 'Salvando...' : 'Salvar Avaliação'}
          </button>
        </div>
      </div>
    </div>
  );
}