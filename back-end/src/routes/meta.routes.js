const { Router } = require('express');
const MetaController = require('../controllers/MetaController');

const metaRoutes = Router();

metaRoutes.post('/meta', MetaController.create);
metaRoutes.get('/meta', MetaController.getAll);
metaRoutes.get('/meta/:id', MetaController.getById);
metaRoutes.put('/meta/:id', MetaController.update);
metaRoutes.patch('/meta/:id', MetaController.markAsComplete);
metaRoutes.delete('/meta/:id', MetaController.delete);

module.exports = metaRoutes;