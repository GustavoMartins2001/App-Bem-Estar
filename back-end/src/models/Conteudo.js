module.exports = (sequelize, DataTypes) => {
  const Conteudo = sequelize.define('Conteudo', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('artigo', 'video', 'podcast'),
      defaultValue: 'artigo',
    },
  });

  return Conteudo;
};
