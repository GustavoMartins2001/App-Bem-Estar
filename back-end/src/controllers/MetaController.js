require('dotenv').config();
const { Meta } = require('../models');

module.exports = {

    /**
     * Cria uma nova meta.
     */
    async create(req, res) {
        try {
            const { usuario_id, meta} = req.body;
            const newMeta = await Meta.create({
                usuario_id: usuario_id,
                descricao: meta,
                status: 'pendente',
                createdAt: new Date(),
            });

            return res.status(201).json(newMeta);

        } catch (error) {
            console.error('Erro ao criar meta:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
     * Cria várias metas de uma vez (usado pela IA)
     */
    async createMany(req, res) {
        try {
            const { usuario_id, metas } = req.body;

            if (!metas || metas.length === 0) {
                return res.status(400).json({ error: "Nenhuma meta enviada." });
            }

            const novasMetas = [];

            for (const meta of metas) {
                
            const [day, month, year] = meta.dataConclusao.split("-");
            const dataConcDesejada = new Date(`${year}-${month}-${day}`);

                const nova = await Meta.create({
                    usuario_id,
                    descricao: meta.descricao,
                    dataConcDesejada: dataConcDesejada || null,
                    status: "pendente",
                    createdAt: new Date(),
                });

                novasMetas.push(nova);
            }

            return res.status(201).json(novasMetas);

        } catch (error) {
            console.error("Erro ao criar metas:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    /**
     * Retorna todas as metas.
     */
    async getAll(req, res) {
        try {
            const metas = await Meta.findAll();
            return res.status(200).json(metas);
        } catch (error) {
            console.error('Erro ao buscar metas:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
     * Retorna uma meta pelo ID.
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
            console.error('Erro ao buscar meta:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
     * Atualiza uma meta.
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
                { where: { id } }
            );

            return res.status(200).json(meta);

        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
     * Marca meta como concluída.
     */
    async markAsComplete(req, res) {
        try {
            const { id } = req.params;

            const meta = await Meta.update(
                {
                    status: 'concluida',
                    atualizado_em: new Date()
                },
                { where: { id } }
            );

            return res.status(200).json(meta);

        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    /**
     * Deleta meta pelo ID.
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            await Meta.destroy({ where: { id } });

            return res.status(204).send();

        } catch (error) {
            console.error('Erro ao deletar meta:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};
