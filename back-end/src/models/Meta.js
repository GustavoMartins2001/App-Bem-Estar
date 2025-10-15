'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
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
      foreignKey: true,
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
    },
    dataConcluida: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Meta',
  });
  return Meta;
};

