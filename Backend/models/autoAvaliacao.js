module.exports = (sequelize, DataTypes) => {
const AutoAvaliacao = sequelize.define('AutoAvaliacao', {
usuario_id: DataTypes.INTEGER,
avaliacaoEnergia: DataTypes.INTEGER,
avaliacaoHumor: DataTypes.INTEGER,
AvaliacaoAnsiedade: DataTypes.INTEGER,
status: DataTypes.ENUM('pendente', 'avaliada'),
data: DataTypes.DATE,
created_at: DataTypes.DATE,
});
return AutoAvaliacao;
};