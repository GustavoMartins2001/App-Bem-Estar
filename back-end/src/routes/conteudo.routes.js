const express = require('express');
const router = express.Router();
const conteudoController = require('../controllers/ConteudoController');

router.get('/', conteudoController.listar);
router.post('/', conteudoController.criar);
router.put('/:id', conteudoController.atualizar);
router.delete('/:id', conteudoController.excluir);

module.exports = router;
