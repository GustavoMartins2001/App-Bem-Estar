const { Op } = require("sequelize");
const Autoavaliacao = require("../models/Autoavaliacao");

exports.getRelatorioSemanal = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const hoje = new Date();
    const semanaPassada = new Date();
    semanaPassada.setDate(hoje.getDate() - 7);

    const avaliacoes = await Autoavaliacao.findAll({
      where: {
        usuario_id,
        createdAt: {
          [Op.between]: [semanaPassada, hoje],
        },
      },
    });

    if (!avaliacoes.length)
      return res.status(404).json({ message: "Nenhum registro encontrado nesta semana." });

    const medias = calcularMedias(avaliacoes);
    res.json({ periodo: "últimos 7 dias", ...medias });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatorioMensal = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const hoje = new Date();
    const mesPassado = new Date();
    mesPassado.setDate(hoje.getDate() - 30);

    const avaliacoes = await Autoavaliacao.findAll({
      where: {
        usuario_id,
        createdAt: {
          [Op.between]: [mesPassado, hoje],
        },
      },
    });

    if (!avaliacoes.length)
      return res.status(404).json({ message: "Nenhum registro encontrado neste mês." });

    const medias = calcularMedias(avaliacoes);
    res.json({ periodo: "últimos 30 dias", ...medias });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function calcularMedias(avaliacoes) {
  const total = avaliacoes.length;
  const soma = avaliacoes.reduce(
    (acc, a) => ({
      humor: acc.humor + a.humor,
      energia: acc.energia + a.energia,
      ansiedade: acc.ansiedade + a.ansiedade,
    }),
    { humor: 0, energia: 0, ansiedade: 0 }
  );

  return {
    media_humor: (soma.humor / total).toFixed(1),
    media_energia: (soma.energia / total).toFixed(1),
    media_ansiedade: (soma.ansiedade / total).toFixed(1),
    total_registros: total,
  };
}
