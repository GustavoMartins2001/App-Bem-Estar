
'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class AutoAvaliacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  AutoAvaliacao.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  avaliacaoEnergia: {
    type: DataTypes.INTEGER,
  },
  avaliacaoHumor: {
    type: DataTypes.INTEGER,
  },
  avaliacaoAnsiedade: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'avaliada'),
  },
  data: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  }, {
    sequelize,
    modelName: 'AutoAvaliacao',
  });
  return AutoAvaliacao;
};