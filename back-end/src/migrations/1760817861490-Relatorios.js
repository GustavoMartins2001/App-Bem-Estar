module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Relatorios", {
      id: {
        type: Sequelize.INTEGER,

        allowNull: false,

        primaryKey: true,

        autoIncrement: true,
      },

      usuario_id: {
        type: Sequelize.INTEGER,

        allowNull: false,
      },

      periodo: {
        type: Sequelize.ENUM( "semanal", "mensal", "anual" ),

        allowNull: false,
      },

      mediaHumor: {
        type: Sequelize.FLOAT,

        allowNull: true,
      },

      mediaEnergia: {
        type: Sequelize.FLOAT,

        allowNull: true,
      },

      mediaAnsiedade: {
        type: Sequelize.FLOAT,

        allowNull: true,
      },

      resumo: {
        type: Sequelize.TEXT,

        allowNull: true,
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
    await queryInterface.dropTable("Relatorios");
  },
};

