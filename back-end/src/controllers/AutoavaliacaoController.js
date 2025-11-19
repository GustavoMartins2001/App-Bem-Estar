const { Autoavaliacao } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const { usuario_id, humor, energia, ansiedade, anotacoes } = req.body;

      if (!usuario_id || !humor || !energia || !ansiedade) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
      }

      const avaliacao = await Autoavaliacao.create({
        usuario_id,
        humor,
        energia,
        ansiedade,
        anotacoes,
      });

      res.status(201).json(avaliacao);
    } catch (error) {
      console.error('Erro ao criar autoavaliação:', error);
      res.status(500).json({ message: 'Erro ao criar autoavaliação.' });
    }
  },

  async listarPorUsuario(req, res) {
    try {
      const { usuario_id } = req.params;
      const avaliacoes = await Autoavaliacao.findAll({
        where: { usuario_id },
        order: [['dataRegistro', 'DESC']],
      });

      res.json(avaliacoes);
    } catch (error) {
      console.error('Erro ao listar autoavaliações:', error);
      res.status(500).json({ message: 'Erro ao listar autoavaliações.' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const avaliacao = await Autoavaliacao.findByPk(id);

      if (!avaliacao) {
        return res.status(404).json({ message: 'Autoavaliação não encontrada.' });
      }

      res.json(avaliacao);
    } catch (error) {
      console.error('Erro ao buscar autoavaliação:', error);
      res.status(500).json({ message: 'Erro ao buscar autoavaliação.' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { humor, energia, ansiedade, anotacoes } = req.body;

      const avaliacao = await Autoavaliacao.findByPk(id);
      if (!avaliacao) {
        return res.status(404).json({ message: 'Autoavaliação não encontrada.' });
      }

      await avaliacao.update({ humor, energia, ansiedade, anotacoes });
      res.json(avaliacao);
    } catch (error) {
      console.error('Erro ao atualizar autoavaliação:', error);
      res.status(500).json({ message: 'Erro ao atualizar autoavaliação.' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const avaliacao = await Autoavaliacao.findByPk(id);
      if (!avaliacao) {
        return res.status(404).json({ message: 'Autoavaliação não encontrada.' });
      }

      await avaliacao.destroy();
      res.json({ message: 'Autoavaliação excluída com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar autoavaliação:', error);
      res.status(500).json({ message: 'Erro ao deletar autoavaliação.' });
    }
  },
};
