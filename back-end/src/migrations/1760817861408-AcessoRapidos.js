module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AcessoRapidos", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      descricao: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      link: {
        type: Sequelize.STRING,
      },

      contato: {
        type: Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,

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
    await queryInterface.dropTable("AcessoRapidos");
  },
};

