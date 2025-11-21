require('dotenv').config();
const { Meta } = require('../models');
module.exports = {

    /**
       * Cria uma nova meta.
       * @param {object} req - Requisição
       * @param {object} res - Resposta
       */
    async create(req, res) {
        try {
            const { usuario_id, titulo, descricao, dataConclusaoDesejada, status } = req.body;
            const meta = await Meta.create({
                usuario_id: usuario_id,
                titulo: titulo || null,
                descricao: descricao,
                dataConclusaoDesejada: dataConclusaoDesejada || null,
                status: status || 'pendente',
                criado_em: new Date(),
                atualizado_em: new Date()
            });
            return res.status(201).json(meta);
        } catch (error) {
            console.error('Erro ao criar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
       * Retorna todas as metas.
       * @param {object} req - Requisição
       * @param {object} res - Resposta
       */

    async getAll(req, res) {
        try {
            const metas = await Meta.findAll();
            return res.status(200).json(metas);
        } catch (error) {
            console.error('Erro ao buscar metas: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
       * Retorna uma meta pelo ID.
       * @param {object} req - Requisição
       * @param {object} res - Resposta
       */

    async getById(req, res) {
        try {
            const { id } = req.params;
            const meta = await Meta.findByPk(id);
            if (!meta) {
                return res.status(404).json({ error: 'Meta não encontrada' });
            }
            return res.status(200).json(meta);
        } catch (error) {
            console.error('Erro ao buscar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
       * Atualiza uma meta.
       * @param {object} req - Requisição
       * @param {object} res - Resposta
       */

    async update(req, res) {
        try {
            const { id } = req.params;
            const { usuario_id, titulo, descricao, dataConclusaoDesejada, status } = req.body;
            
            const updateData = {};
            if (usuario_id !== undefined) updateData.usuario_id = usuario_id;
            if (titulo !== undefined) updateData.titulo = titulo;
            if (descricao !== undefined) updateData.descricao = descricao;
            if (dataConclusaoDesejada !== undefined) updateData.dataConclusaoDesejada = dataConclusaoDesejada;
            if (status !== undefined) updateData.status = status;
            updateData.atualizado_em = new Date();

            const meta = await Meta.update(
                updateData,
                {
                    where: {
                        id: id
                    }
                }
            );
            return res.status(200).json(meta);
        } catch (error) {
            console.error('Erro ao atualizar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    /**
       * Marca uma meta como concluída.
       * @param {object} req - Requisição
       * @param {object} res - Resposta
       */
    async markAsComplete(req, res) {
        try {
            const { id } = req.params;
            const meta = await Meta.update(
                { 
                    status: 'concluida',
                    atualizado_em: new Date()
                },
                {
                    where: {
                        id: id
                    }
                }
            );
            return res.status(200).json(meta);
        } catch (error) {
            console.error('Erro ao atualizar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    /**
   * Deleta uma meta.
   * @param {object} req - Requisição
   * @param {object} res - Resposta
   */
    async delete(req, res) {
        try {
            const { id } = req.params;
            await Meta.destroy({
                where: {
                    id: id
                }
            });
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}