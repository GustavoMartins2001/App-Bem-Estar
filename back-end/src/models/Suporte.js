module.exports = (sequelize, DataTypes) => {
  const Suporte = sequelize.define('Suporte', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.ENUM('emergencia', 'apoio', 'informativo'),
      defaultValue: 'apoio',
    },
  });

  return Suporte;
};
