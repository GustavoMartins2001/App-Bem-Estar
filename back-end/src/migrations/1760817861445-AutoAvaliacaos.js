module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AutoAvaliacaos", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      usuario_id: {
        type: Sequelize.INTEGER,
      },

      avaliacaoEnergia: {
        type: Sequelize.INTEGER,
      },

      avaliacaoHumor: {
        type: Sequelize.INTEGER,
      },

      avaliacaoAnsiedade: {
        type: Sequelize.INTEGER,
      },

      status: {
        type: Sequelize.ENUM( "PENDENTE", "CONCLUIDA" ),
      },

      data: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("AutoAvaliacaos");
  },
};

