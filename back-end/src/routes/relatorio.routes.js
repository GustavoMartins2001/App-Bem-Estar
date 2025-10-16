const express = require("express");
const router = express.Router();
const relatorioController = require("../controllers/relatorio.controller");

router.get("/semana/:usuario_id", relatorioController.getRelatorioSemanal);
router.get("/mes/:usuario_id", relatorioController.getRelatorioMensal);

module.exports = router;
