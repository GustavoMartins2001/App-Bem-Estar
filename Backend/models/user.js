module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
usuario: DataTypes.STRING,
email: DataTypes.STRING,
senha: DataTypes.STRING,
created_at: DataTypes.DATE,
});
return User;
};