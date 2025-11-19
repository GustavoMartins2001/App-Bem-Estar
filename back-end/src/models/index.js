const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const UserModel = require('./User');
const MetaModel = require('./Meta');
const AutoavaliacaoModel = require('./Autoavaliacao');
const RelatorioModel = require('./Relatorio');
const ConteudoModel = require('./Conteudo');
const SuporteModel = require('./Suporte');
const AcessoRapidoModel = require('./AcessoRapido');
const AutoAjudaModel = require('./AutoAjuda');

const User = UserModel(sequelize, DataTypes);
const Meta = MetaModel(sequelize, DataTypes);
const Autoavaliacao = AutoavaliacaoModel(sequelize, DataTypes);
const Relatorio = RelatorioModel(sequelize, DataTypes);
const Conteudo = ConteudoModel(sequelize, DataTypes);
const Suporte = SuporteModel(sequelize, DataTypes);
const AcessoRapido = AcessoRapidoModel(sequelize, DataTypes);
const AutoAjuda = AutoAjudaModel(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Meta,
  Autoavaliacao,
  Relatorio,
  Conteudo,
  Suporte,
  AcessoRapido,
  AutoAjuda,
};