const { Suporte } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const suportes = await Suporte.findAll();
      res.json(suportes);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar suportes.' });
    }
  },

  async criar(req, res) {
    try {
      const novo = await Suporte.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao criar suporte.' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const suporte = await Suporte.findByPk(id);
      if (!suporte) return res.status(404).json({ error: 'Suporte não encontrado.' });

      await suporte.update(req.body);
      res.json(suporte);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao atualizar suporte.' });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;
      const suporte = await Suporte.findByPk(id);
      if (!suporte) return res.status(404).json({ error: 'Suporte não encontrado.' });

      await suporte.destroy();
      res.json({ message: 'Suporte removido.' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir suporte.' });
    }
  },
};
