module.exports = (sequelize, DataTypes) => {
const autoAjuda = sequelize.define('AutoAjuda', {
descricao: DataTypes.STRING,
status: DataTypes.ENUM('ativo', 'avaliada'),
link: DataTypes.STRING,
created_at: DataTypes.DATE,
});
return autoAjuda;
};