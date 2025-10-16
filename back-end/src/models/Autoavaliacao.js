module.exports = (sequelize, DataTypes) => {
  const Autoavaliacao = sequelize.define('Autoavaliacao', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    humor: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    energia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ansiedade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    anotacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dataRegistro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'autoavaliacoes',
    timestamps: false,
  });

  return Autoavaliacao;
};
