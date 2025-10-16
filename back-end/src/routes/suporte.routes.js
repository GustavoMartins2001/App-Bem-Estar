const express = require('express');
const router = express.Router();
const suporteController = require('../controllers/suporte.controller');

router.get('/', suporteController.listar);
router.post('/', suporteController.criar);
router.put('/:id', suporteController.atualizar);
router.delete('/:id', suporteController.excluir);

module.exports = router;
