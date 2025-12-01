module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Meta", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      usuario_id: {
        type: Sequelize.INTEGER,
      },

      descricao: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM( "pendente", "em progresso", "concluida" ),

        allowNull: false,
      },

      dataConcDesejada: {
        type: Sequelize.DATE,
      },

      dataConcluida: {
        type: Sequelize.DATE,
      },

      createdAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Meta");
  },
};

