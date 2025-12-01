'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meta.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendente', 'concluida', 'cancelada'),
      allowNull: false,
    },
    dataConcDesejada: {
      type: DataTypes.DATE,
      field: 'dataConcDesejada', // Nome da coluna no banco
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt', // Nome da coluna no banco
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Meta',
    tableName: 'Meta',
    timestamps: false, // Desabilitado porque usamos criado_em e atualizado_em manualmente
    underscored: false,
  });
  return Meta;
};

