const express = require('express');
const router = express.Router();
const controller = require('../controllers/autoavaliacao.controller');

router.post('/', controller.criar);
router.get('/:usuario_id', controller.listarPorUsuario);
router.get('/detalhe/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
