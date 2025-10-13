module.exports = (sequelize, DataTypes) => {
const acessoRapido = sequelize.define('AcessoRapido', {
tipo: DataTypes.STRING,
contato: DataTypes.STRING,
link: DataTypes.STRING
});
return acessoRapido;
};