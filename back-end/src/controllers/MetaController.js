require('dotenv').config();
const MetaModel = require('../models/Meta');
class MetaController {

    async create(req, res) {
        try {
            const { descricao, link, dataConcDesejada } = req.body;
            const meta = await MetaModel.create({
                descricao: descricao,
                link: link,
                dataConcDesejada: dataConcDesejada,
                dataConcluida: null,
                created_at: new Date.now()
            });
            return res.status(201).json(meta);
        } catch (error) {
            console.error('Erro ao criar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getAll(req, res) {
        try {
            const metas = await MetaModel.findAll();
            return res.status(200).json(metas);
        } catch (error) {
            console.error('Erro ao buscar metas: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const meta = await MetaModel.findByPk(id);
            if (!meta) {
                return res.status(404).json({ error: 'Meta não encontrada' });
            }
            return res.status(200).json(meta);
        } catch (error) {
            console.error('Erro ao buscar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async update(req, res) {
        try {
            const { user_id, descricao, link, dataConcDesejada, status } = req.body;
            const meta = await MetaModel.update(
                {   descricao: descricao,
                    link: link,
                    dataConcDesejada: dataConcDesejada,
                    status: status },
                {
                    where: {
                        user_id: user_id
                    }
                }
            );
            return res.status(201).json(meta);
        }

        catch (error) {
            console.error('Erro ao atualizar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async markAsComplete(req, res){
        try {
            const { user_id } = req.body;
            const meta = await MetaModel.update(
                { dataConcluida: Date.now() },
                {
                    where: {
                        user_id: user_id
                    }
                }
            );
            return res.status(201).json(meta);
        }

        catch (error) {
            console.error('Erro ao atualizar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const { user_id } = req.body;
            await MetaModel.destroy({
                where: {
                    user_id: user_id
                }
            });
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar meta: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}