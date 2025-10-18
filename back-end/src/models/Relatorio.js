module.exports = (sequelize, DataTypes) => {
  const Relatorio = sequelize.define('Relatorio', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    periodo: {
      type: DataTypes.ENUM('semanal', 'mensal'),
      allowNull: false,
    },
    mediaHumor: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    mediaEnergia: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    mediaAnsiedade: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    resumo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Relatorio;
};
