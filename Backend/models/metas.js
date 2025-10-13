module.exports = (sequelize, DataTypes) => {
const Metas = sequelize.define('Metas', {
usuario_id: DataTypes.INTEGER,
descricao: DataTypes.STRING,
status: DataTypes.ENUM('pendente', 'concluida', 'cancelada'),
dataConcDesejada: DataTypes.DATE,
dataConcluida: DataTypes.DATE,
created_at: DataTypes.DATE,
});
return Metas;
};