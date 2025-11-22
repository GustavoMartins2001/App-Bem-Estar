const express = require('express');
const router = express.Router();
const ChatgptController = require('../controllers/ChatgptController');

module.exports = (ChatGptClient) => {
    router.get('/', (req, res, next) => ChatgptController.gerarMetas(req, res, next, ChatGptClient));
    return router;
};