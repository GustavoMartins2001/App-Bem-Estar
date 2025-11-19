const Conteudo = require('../models/Conteudo');

module.exports = {
  async listar(req, res) {
    try {
      const conteudos = await Conteudo.findAll();
      res.json(conteudos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar conteúdos.' });
    }
  },

  async criar(req, res) {
    try {
      const novo = await Conteudo.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao criar conteúdo.' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const conteudo = await Conteudo.findByPk(id);
      if (!conteudo) return res.status(404).json({ error: 'Conteúdo não encontrado.' });

      await conteudo.update(req.body);
      res.json(conteudo);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao atualizar conteúdo.' });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;
      const conteudo = await Conteudo.findByPk(id);
      if (!conteudo) return res.status(404).json({ error: 'Conteúdo não encontrado.' });

      await conteudo.destroy();
      res.json({ message: 'Conteúdo removido.' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir conteúdo.' });
    }
  },
};
