const Meta = require('../models/Meta');

module.exports = {
  async listar(req, res) {
    try {
      const metas = await Meta.findAll();
      res.json(metas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar metas' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const meta = await Meta.findByPk(req.params.id);
      if (!meta) return res.status(404).json({ error: 'Meta não encontrada' });
      res.json(meta);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar meta' });
    }
  },

  async criar(req, res) {
    try {
      const novaMeta = await Meta.create(req.body);
      res.status(201).json(novaMeta);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar meta', details: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const meta = await Meta.findByPk(req.params.id);
      if (!meta) return res.status(404).json({ error: 'Meta não encontrada' });

      await meta.update(req.body);
      res.json(meta);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar meta', details: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const meta = await Meta.findByPk(req.params.id);
      if (!meta) return res.status(404).json({ error: 'Meta não encontrada' });

      await meta.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar meta' });
    }
  },
};
