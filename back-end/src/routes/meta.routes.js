const express = require('express');
const router = express.Router();
const MetaController = require('../controllers/MetaController');

router.get('/', MetaController.listar);
router.get('/:id', MetaController.buscarPorId);
router.post('/', MetaController.criar);
router.put('/:id', MetaController.atualizar);
router.delete('/:id', MetaController.deletar);

module.exports = router;
