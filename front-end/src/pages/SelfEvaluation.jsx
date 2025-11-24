import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import { useAuth } from "../contexts/AuthContext";

// --- O Componente Card (Mantido fora para evitar o bug do scroll) ---
const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-6">
    {children}
  </div>
);

// --- Componente LevelSelector ---
const LevelSelector = ({ label, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

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

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-textoEscuro mb-3">{label} <span className="text-red-500">*</span></h3>
      <div className="flex justify-between space-x-2">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          const baseClasses = getColorClasses(opt.value);
          
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              aria-label={`${label}: ${opt.value} - ${opt.label}`}
              className={`
                flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition duration-150 ease-in-out
                text-sm font-bold text-white shadow-md
                ${baseClasses}
                ${isSelected
                  ? 'ring-4 ring-offset-2 ring-destaqueAcao scale-105 shadow-xl'
                  : 'opacity-80'
                }
              `}
              style={{ minWidth: '50px', minHeight: '50px' }}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-extrabold text-lg transition duration-300
                  ${isSelected ? 'bg-white/30' : 'bg-transparent'}
                `}
              >
                {opt.value}
              </div>
              <span className="text-xs mt-1 text-white font-medium text-center">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Componente Principal ---
export default function SelfEvaluation() {
  const [avaliacaoHumor, setAvaliacaoHumor] = useState(null);
  const [avaliacaoEnergia, setAvaliacaoEnergia] = useState(null);
  const [avaliacaoAnsiedade, setAvaliacaoAnsiedade] = useState(null);
  const [anotacoes, setAnotacoes] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || "Usuário";
  const userId = user?.id;
  
  // Simulação de dados do usuário para a Navbar
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    if (avaliacaoHumor === null || avaliacaoEnergia === null || avaliacaoAnsiedade === null) {
        alert('Por favor, preencha todos os campos obrigatórios (Humor, Energia e Ansiedade).');
        return;
    }

    console.log({
      avaliacaoHumor,
      avaliacaoEnergia,
      avaliacaoAnsiedade,
      anotacoes,
    });
    
    alert('Dados de autoavaliação salvos (Simulação)!');
  };

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

  return (
    // ATENÇÃO: Alterei 'pt-10' para 'pt-24' aqui embaixo para a Navbar não cobrir o título
    <div className="min-h-screen bg-fundoPrimario pt-24 pb-20">
      
      {/* Integração da Navbar */}
      <NavbarDashboard userName={userName} onLogout={handleLogout} />

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
            className="w-full brilho bg-destaqueAcao hover:bg-destaqueAcao/80 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition duration-300 transform hover:scale-[1.01]"
          >
            Salvar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}