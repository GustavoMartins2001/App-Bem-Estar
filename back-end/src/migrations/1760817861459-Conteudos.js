module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Conteudos", {
      id: {
        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true,
      },

      titulo: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      descricao: {
        type: Sequelize.TEXT,

        allowNull: false,
      },

      link: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      tipo: {
        type: Sequelize.ENUM( "ARTIGO", "VIDEO", "AUDIO" ),

      },

      createdAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Conteudos");
  },
};

