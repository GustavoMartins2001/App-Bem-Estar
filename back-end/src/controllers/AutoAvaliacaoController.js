// eslint-disable-next-line no-undef
require('dotenv').config();
import AutoAvaliacao from '../models/AutoAvaliacao';

class AutoAvaliacaoController {
/**
 * Cria uma nova AutoAvaliacao.
 */
    async create(req, res) {
        try {
            const { usuarioId,
                 avaliacaoEnergia,
                 avaliacaoHumor,
                 avaliacaoAnsiedade,
                 feedback } = req.body;
                const autoAvaliacao = await AutoAvaliacao.create({
                usuarioId: usuarioId,
                avaliacaoEnergia: avaliacaoEnergia,
                avaliacaoHumor: avaliacaoHumor,
                avaliacaoAnsiedade: avaliacaoAnsiedade,
                feedback: feedback
            });
            return res.status(201).json(autoAvaliacao);
        } catch (error) {
            console.error('Erro ao criar AutoAvaliacao: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}