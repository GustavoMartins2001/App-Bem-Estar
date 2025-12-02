const { Router } = require('express');
const MetaController = require('../controllers/MetaController');

const metaRoutes = Router();

metaRoutes.post('/createMany', MetaController.createMany);
metaRoutes.post('/', MetaController.create);
metaRoutes.get('/', MetaController.getAll);
metaRoutes.put('/:id', MetaController.update);
metaRoutes.patch('/:id', MetaController.markAsComplete);
metaRoutes.delete('/:id', MetaController.delete);

module.exports = metaRoutes;